#!/usr/bin/env python3
"""
Local English content editor for Obiana.

    bash editor/start.sh        # or double-click the desktop shortcut
    http://127.0.0.1:3906

Serves the real app off disk with an edit layer on top. Click any sentence,
card title or subtitle, change it, save. The change is written straight into
i18n/locale.en.js, which is the source of truth for the whole app.

Why editing in the page rather than in a list: guide content is stored as one
entry per sentence, keyed content.<card>.t.<n>, and the shared card template
fills those into fixed slots. So a sentence on screen already corresponds to
exactly one entry in the locale file, and editing it where you read it means
you see the sentence before and after it while you work.

Publishing is a separate, deliberate step. It regenerates the translation
pipeline's English snapshot, bumps the cache version, commits and pushes to
the obiana remote. Editing alone changes nothing outside this machine.

Localhost only: it writes to the repo and pushes to GitHub, so it must never
be reachable from the LAN.
"""

import io
import json
import os
import re
import subprocess
import sys
import unicodedata
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, unquote

PORT = 3906                      # claimed in /home/user/Projects/PORTS.md
HOST = "127.0.0.1"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REMOTE = "obiana"                # never origin: see the note in start.sh
BRANCH = "obiana-main"

MIME = {
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon",
    ".webmanifest": "application/manifest+json",
}


# ─── locale file access ─────────────────────────────────
# Same slicing rule the worker, the review app and the node tooling all use.
def locale_path(lang="en"):
    return os.path.join(ROOT, "i18n", f"locale.{lang}.js")


def read_locale(lang="en"):
    src = io.open(locale_path(lang), encoding="utf-8").read()
    for cand in (f"window.MYOB_LOCALES.{lang} =", f'window.MYOB_LOCALES["{lang}"] ='):
        i = src.find(cand)
        if i >= 0:
            head = src[:i]
            obj = json.loads(src[src.find("{", i): src.rfind("}") + 1])
            return head, cand, obj
    raise ValueError(f"no assignment found for {lang}")


def write_locale(lang, head, marker, obj):
    io.open(locale_path(lang), "w", encoding="utf-8").write(
        head + marker + " " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n")


def dig_set(obj, key, value):
    """Write one dotted key. A sentence slot is a list index, not a property."""
    parts = key.split(".")
    if parts[0] == "content":
        node = obj.setdefault("content", {})
        parts = parts[1:]
    elif parts[0] == "ui":
        node = obj.setdefault("ui", {})
        parts = parts[1:]
    else:
        node = obj.setdefault("ui", {})
    for p in parts[:-1]:
        node = node[int(p)] if isinstance(node, list) else node.setdefault(p, {})
    last = parts[-1]
    if isinstance(node, list):
        i = int(last)
        if i >= len(node):
            raise IndexError(f"{key}: index {i} beyond the {len(node)} slots this card has")
        node[i] = value
    else:
        node[last] = value


def dig_get(obj, key):
    parts = key.split(".")
    node = obj.get("content" if parts[0] == "content" else "ui", {})
    if parts[0] in ("content", "ui"):
        parts = parts[1:]
    for p in parts:
        if isinstance(node, list):
            i = int(p) if p.lstrip("-").isdigit() else -1
            if i < 0 or i >= len(node):
                return None            # out of range reads as "no such key"
            node = node[i]
        else:
            node = node.get(p) if isinstance(node, dict) else None
        if node is None:
            return None
    return node


# ─── shell helpers ──────────────────────────────────────
def run(args, **kw):
    return subprocess.run(args, cwd=ROOT, capture_output=True, text=True, timeout=180, **kw)


def git(*args):
    p = run(["git", *args])
    if p.returncode != 0:
        raise RuntimeError((p.stderr or p.stdout).strip()[:600])
    return p.stdout.strip()


def node(script, *args):
    p = run(["node", script, *args])
    return p.returncode, (p.stdout + p.stderr).strip()


# ─── edit layer injection ───────────────────────────────
EDIT_TAG = '<script src="/__editor/edit-mode.js"></script>\n</body>'


def inject_html(html):
    """Add the edit layer to the page."""
    if "</body>" in html:
        return html.replace("</body>", EDIT_TAG, 1)
    return html + EDIT_TAG


def strip_sw(js):
    """Stop content.js registering a service worker under the editor.

    The registration lives in content.js, not index.html. Left alone, the
    worker caches its own copies of content.js and the locale file, so an edit
    saves to disk and then does not appear on reload. That is the difference
    between a tool you trust and one you fight.
    """
    return js.replace("if ('serviceWorker' in navigator) {",
                      "if (false) {   /* editor: service worker disabled */", 1)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _send(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _raw(self, code, body, ctype):
        if isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(code)
        self.send_header("content-type", ctype)
        self.send_header("content-length", str(len(body)))
        self.send_header("cache-control", "no-store")   # always read from disk
        self.end_headers()
        self.wfile.write(body)

    # ─── GET ────────────────────────────────────────────
    def do_GET(self):
        u = urlparse(self.path)
        path = unquote(u.path)

        if path == "/__editor/edit-mode.js":
            f = os.path.join(os.path.dirname(os.path.abspath(__file__)), "edit-mode.js")
            return self._raw(200, io.open(f, encoding="utf-8").read(), MIME[".js"])

        if path == "/api/status":
            return self._send(200, self.status())

        if path == "/api/keys":
            try:
                _, _, obj = read_locale("en")
            except Exception as e:
                return self._send(500, {"error": str(e)})
            return self._send(200, {"content": obj.get("content", {}), "ui": obj.get("ui", {})})

        # Everything else: the real site, off disk.
        rel = path.lstrip("/") or "index.html"
        full = os.path.normpath(os.path.join(ROOT, rel))
        if not full.startswith(ROOT) or not os.path.isfile(full):
            return self._raw(404, "not found", "text/plain")
        ext = os.path.splitext(full)[1]
        if ext == ".html":
            return self._raw(200, inject_html(io.open(full, encoding="utf-8").read()), MIME[".html"])
        if os.path.basename(full) == "content.js":
            return self._raw(200, strip_sw(io.open(full, encoding="utf-8").read()), MIME[".js"])
        return self._raw(200, io.open(full, "rb").read(), MIME.get(ext, "application/octet-stream"))

    # ─── POST ───────────────────────────────────────────
    def do_POST(self):
        u = urlparse(self.path)
        try:
            n = int(self.headers.get("content-length") or 0)
            body = json.loads(self.rfile.read(n) or "{}")
        except Exception:
            return self._send(400, {"error": "bad json"})

        if u.path == "/api/save":
            return self.save(body)
        if u.path == "/api/publish":
            return self.publish(body)
        return self._send(404, {"error": "not found"})

    def save(self, body):
        edits = body.get("edits")
        if not isinstance(edits, list) or not edits:
            return self._send(400, {"error": "no edits"})
        try:
            head, marker, obj = read_locale("en")
            applied = []
            for e in edits:
                key, value = e.get("key"), e.get("value")
                if not isinstance(key, str) or not isinstance(value, str):
                    return self._send(400, {"error": f"bad edit: {key!r}"})
                # NFC so an editor that pastes decomposed accents does not
                # change every fingerprint for no semantic reason.
                value = unicodedata.normalize("NFC", value).strip()
                before = dig_get(obj, key)
                if before is None:
                    return self._send(400, {"error": f"unknown key: {key}"})
                if before == value:
                    continue
                dig_set(obj, key, value)
                applied.append({"key": key, "before": before, "after": value})
            if applied:
                write_locale("en", head, marker, obj)
        except Exception as e:
            return self._send(500, {"error": str(e)})
        return self._send(200, {"ok": True, "applied": applied, "status": self.status()})

    def publish(self, body):
        """Snapshot, verify, version-bump, commit, push. In that order."""
        message = (body.get("message") or "").strip()
        if not message:
            return self._send(400, {"error": "a commit message is required"})
        steps = []
        try:
            if not git("status", "--porcelain"):
                return self._send(400, {"error": "nothing to publish"})

            # The pipeline's English input is generated, not hand-kept. If this
            # is skipped, the next translation run works from stale English.
            rc, out = node("translation/snapshot.js")
            steps.append({"step": "snapshot", "ok": rc == 0, "out": out})
            if rc != 0:
                return self._send(500, {"error": "snapshot failed", "steps": steps})

            rc, out = node("translation/stamp.js", "verify")
            steps.append({"step": "verify fingerprints", "ok": rc == 0, "out": out})
            if rc != 0:
                return self._send(500, {"error": "fingerprint verify failed", "steps": steps})

            rc, out = node("translation/lint-locales.js")
            steps.append({"step": "lint locales", "ok": rc == 0, "out": out})
            if rc != 0:
                return self._send(500, {"error": "locale lint failed", "steps": steps})

            v = bump_version()
            steps.append({"step": "cache version", "ok": True, "out": f"now v{v}"})

            git("add", "-A")
            git("commit", "-m", message)
            head = git("rev-parse", "--short", "HEAD")
            git("push", REMOTE, f"{BRANCH}:main")
            steps.append({"step": "push", "ok": True, "out": f"{REMOTE}/main <- {head}"})
        except Exception as e:
            return self._send(500, {"error": str(e), "steps": steps})
        return self._send(200, {"ok": True, "steps": steps, "status": self.status()})

    def status(self):
        try:
            branch = git("rev-parse", "--abbrev-ref", "HEAD")
            dirty = [l for l in git("status", "--porcelain").splitlines() if l.strip()]
        except Exception as e:
            return {"error": str(e)}
        rc, out = node("translation/stamp.js", "report")
        stale = {}
        for line in out.splitlines():
            m = re.match(r"\s+([\w-]+)\s+(\d+) current\s+(\d+) stale\s+(\d+) unstamped\s+(\d+) untranslated", line)
            if m:
                stale[m.group(1)] = {"current": int(m.group(2)), "stale": int(m.group(3)),
                                     "untranslated": int(m.group(5))}
        return {"branch": branch, "uncommitted": len(dirty), "files": dirty[:20],
                "remote": REMOTE, "translations": stale}


def bump_version():
    """ASSET_VERSION, CACHE_NAME and every ?v= move together or not at all."""
    ip = os.path.join(ROOT, "i18n/i18n.js")
    src = io.open(ip, encoding="utf-8").read()
    m = re.search(r"const ASSET_VERSION = '(\d+)';", src)
    if not m:
        raise RuntimeError("ASSET_VERSION not found")
    old, new = int(m.group(1)), int(m.group(1)) + 1
    io.open(ip, "w", encoding="utf-8").write(
        src.replace(f"const ASSET_VERSION = '{old}';", f"const ASSET_VERSION = '{new}';", 1))
    for rel in ("sw.js", "index.html"):
        p = os.path.join(ROOT, rel)
        s = io.open(p, encoding="utf-8").read()
        s = s.replace(f"?v={old}", f"?v={new}")
        s = s.replace(f"birth-guide-v{old}-i18n", f"birth-guide-v{new}-i18n")
        io.open(p, "w", encoding="utf-8").write(s)
    return new


if __name__ == "__main__":
    if not os.path.isdir(os.path.join(ROOT, ".git")):
        sys.exit(f"{ROOT} is not a git repository")
    print(f"Obiana English editor  ->  http://{HOST}:{PORT}")
    print(f"  repo:   {ROOT}")
    print(f"  pushes: {REMOTE}/main  (never origin)")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
