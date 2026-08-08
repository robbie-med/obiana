#!/usr/bin/env python3
"""
Local review UI for contributor translation suggestions.

    bash review/start.sh          # or double-click the desktop shortcut

Reads Cloudflare D1 through wrangler (using the Cloudflare login already on
this machine — no token is stored here) and serves a small page on
127.0.0.1:3905 where each translation key shows every suggestion submitted
for it.

Localhost only, by design: it can edit the locale files and mark rows in a
production database, so it must never be reachable from the LAN.
"""

import json
import os
import re
import shutil
import subprocess
import sys
import glob
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

PORT = 3905                       # claimed in /home/user/Projects/PORTS.md
HOST = "127.0.0.1"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = "obiana-suggestions"


def node_env():
    """Wrangler 4 needs Node >= 22; the default node here is 18."""
    env = dict(os.environ)
    try:
        v = subprocess.run(["node", "-v"], capture_output=True, text=True).stdout.strip()
        if int(v.lstrip("v").split(".")[0]) >= 22:
            return env
    except Exception:
        pass
    for pattern in (os.path.expanduser("~/.nvm/versions/node/v*/bin"),
                    os.path.expanduser("~/.local/share/pi-node/node-v*/bin")):
        for path in sorted(glob.glob(pattern), reverse=True):
            exe = os.path.join(path, "node")
            if not os.path.exists(exe):
                continue
            try:
                v = subprocess.run([exe, "-v"], capture_output=True, text=True).stdout.strip()
                if int(v.lstrip("v").split(".")[0]) >= 22:
                    env["PATH"] = path + os.pathsep + env.get("PATH", "")
                    return env
            except Exception:
                continue
    return env


def d1(sql):
    """Run a query against the remote D1 database and return rows."""
    proc = subprocess.run(
        ["npx", "wrangler", "d1", "execute", DB, "--remote", "--json", "--command", sql],
        cwd=ROOT, capture_output=True, text=True, env=node_env(), timeout=90)
    out = proc.stdout.strip()
    start = out.find("[")
    if start == -1:
        raise RuntimeError((proc.stderr or out or "no output from wrangler").strip()[:400])
    data = json.loads(out[start:])
    return data[0].get("results", []) if data else []


def load_locale(lang):
    """Parse i18n/locale.<lang>.js into a flat dot-notation dict."""
    path = os.path.join(ROOT, "i18n", f"locale.{lang}.js")
    if not os.path.exists(path):
        return {}
    src = open(path, encoding="utf-8").read()
    marker = f"window.MYOB_LOCALES.{lang} ="
    i = src.find(marker)
    if i == -1:
        return {}
    body = src[src.find("{", i): src.rfind("}") + 1]
    try:
        obj = json.loads(body)
    except Exception:
        return {}
    flat = {}

    def walk(o, pre=""):
        for k, v in (o or {}).items():
            key = f"{pre}.{k}" if pre else k
            if isinstance(v, dict):
                walk(v, key)
            else:
                flat[key] = v
    walk(obj.get("ui", {}))
    return flat


def write_locale_key(lang, key, value):
    """Apply an accepted suggestion straight into the locale file."""
    path = os.path.join(ROOT, "i18n", f"locale.{lang}.js")
    src = open(path, encoding="utf-8").read()
    marker = f"window.MYOB_LOCALES.{lang} ="
    i = src.find(marker)
    head, body = src[:i], src[src.find("{", i): src.rfind("}") + 1]
    obj = json.loads(body)
    node = obj.setdefault("ui", {})
    parts = key.split(".")
    for p in parts[:-1]:
        node = node.setdefault(p, {})
    node[parts[-1]] = value
    open(path, "w", encoding="utf-8").write(
        head + marker + " " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n")


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass                                    # keep the terminal readable

    def _send(self, code, body, ctype="application/json; charset=utf-8"):
        payload = body if isinstance(body, bytes) else json.dumps(body).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        u = urlparse(self.path)

        if u.path in ("/", "/index.html"):
            page = open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                     "index.html"), "rb").read()
            return self._send(200, page, "text/html; charset=utf-8")

        if u.path == "/api/languages":
            try:
                rows = d1("SELECT lang, COUNT(*) AS n, "
                          "SUM(CASE WHEN status='new' THEN 1 ELSE 0 END) AS pending "
                          "FROM suggestions GROUP BY lang ORDER BY lang")
                return self._send(200, {"languages": rows})
            except Exception as e:
                return self._send(500, {"error": str(e)})

        if u.path == "/api/suggestions":
            lang = (parse_qs(u.query).get("lang") or ["es"])[0]
            if not re.fullmatch(r"[a-z]{2,3}(?:-[A-Za-z]{2,4})?", lang):
                return self._send(400, {"error": "bad lang"})
            try:
                rows = d1("SELECT id, lang, key, source, current, suggestion, note, "
                          "country, status, created_at FROM suggestions "
                          f"WHERE lang = '{lang}' ORDER BY key, created_at DESC")
            except Exception as e:
                return self._send(500, {"error": str(e)})

            shipped = load_locale(lang)
            english = load_locale("en")
            # Group every submission under its key, so one entry shows them all.
            groups = {}
            for r in rows:
                g = groups.setdefault(r["key"], {
                    "key": r["key"],
                    "english": english.get(r["key"], r.get("source") or ""),
                    "shipped": shipped.get(r["key"], ""),
                    "submissions": [],
                })
                g["submissions"].append(r)
            ordered = sorted(groups.values(),
                             key=lambda g: (not any(s["status"] == "new" for s in g["submissions"]),
                                            g["key"]))
            return self._send(200, {"lang": lang, "groups": ordered})

        return self._send(404, {"error": "not found"})

    def do_POST(self):
        u = urlparse(self.path)
        length = int(self.headers.get("content-length") or 0)
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except Exception:
            return self._send(400, {"error": "bad json"})

        if u.path == "/api/accept":
            sid, lang, key = body.get("id"), body.get("lang"), body.get("key")
            text = body.get("suggestion", "")
            if not all([sid, lang, key]) or not isinstance(text, str):
                return self._send(400, {"error": "missing fields"})
            try:
                write_locale_key(lang, key, text)
                d1(f"UPDATE suggestions SET status='accepted' WHERE id={int(sid)}")
                # Other pending suggestions for the same key are now moot.
                d1("UPDATE suggestions SET status='superseded' "
                   f"WHERE key='{key}' AND lang='{lang}' AND status='new' AND id<>{int(sid)}")
                return self._send(200, {"ok": True, "applied": True})
            except Exception as e:
                return self._send(500, {"error": str(e)})

        if u.path == "/api/reject":
            sid = body.get("id")
            if not sid:
                return self._send(400, {"error": "missing id"})
            try:
                d1(f"UPDATE suggestions SET status='rejected' WHERE id={int(sid)}")
                return self._send(200, {"ok": True})
            except Exception as e:
                return self._send(500, {"error": str(e)})

        return self._send(404, {"error": "not found"})


if __name__ == "__main__":
    if not shutil.which("npx"):
        sys.exit("npx not found — install Node, then: npm install -D wrangler")
    print(f"Obiana translation review → http://{HOST}:{PORT}")
    print("Reading Cloudflare D1 via wrangler. Ctrl+C to stop.")
    try:
        ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")
