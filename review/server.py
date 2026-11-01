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
import unicodedata
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
# Must match LOCALES in worker/index.js.
LOCALES = ["es", "fr", "ko", "ar", "ru", "zh", "zom",
           "ja", "tl", "pt-BR", "ps", "prs", "vi", "th", "de", "pl"]


def src_hash(s):
    """Mirror of srcHashOf() in translation/hash.js and public/app/guide/cards.js.

    Two-lane FNV-1a over NFC-normalised UTF-8 bytes. UTF-8 is what makes this
    agree with the JavaScript byte for byte; NFC stops a decomposed accent from
    marking a sentence stale for nothing. See translation/hash.js for why the
    fingerprints exist at all.
    """
    b = unicodedata.normalize("NFC", str(s)).encode("utf-8")
    h1, h2 = 0x811C9DC5, 0x01000193
    for c in b:
        h1 = ((h1 ^ c) * 0x01000193) & 0xFFFFFFFF
        h2 = ((h2 ^ c) * 0x85EBCA6B) & 0xFFFFFFFF
    return f"{h1:08x}{h2:08x}"


# Refuse to start rather than silently mis-stamp a locale. If this drifts from
# the JS, accepted suggestions get fingerprints the app will never match, and
# every one of them reads as permanently stale.
_HASH_VECTORS = [
    ("", "811c9dc501000193"),
    ("a", "e40c292cefafc426"),
    ("Call your doctor.", "5a16f09f008281e1"),
    ("\uc57d\uc744 \ub4dc\uc138\uc694", "956d9382b1cdd1cc"),
    ("\u0627\u062a\u0635\u0644\u064a \u0628\u0637\u0628\u064a\u0628\u0643", "5d77eeebe9f7d6dd"),
    ("About 1 in 3", "494265998e0538d7"),
    ("r\u00e9sum\u00e9, caf\u00e9", "d831207604bb4514"),
    ("\U0001f476\U0001f3fd emoji", "8b4976d03bb3fbe6"),
    ("caf\u00e9", "a82b5049454630df"),
    ("cafe\u0301", "a82b5049454630df"),
    ("\uac00", "cdd08b156e569acb"),
    ("\u1100\u1161", "cdd08b156e569acb"),
]
for _in, _want in _HASH_VECTORS:
    if src_hash(_in) != _want:
        sys.exit(f"src_hash mismatch for {_in!r}: got {src_hash(_in)}, want {_want}\n"
                 "This must agree with translation/hash.js. Refusing to start.")


def locale_marker(src, lang):
    """Locate the assignment. pt-BR needs bracket notation: a hyphen is not a
    valid identifier, so window.MYOB_LOCALES.pt-BR is a syntax error."""
    for cand in (f"window.MYOB_LOCALES.{lang} =", f'window.MYOB_LOCALES["{lang}"] ='):
        i = src.find(cand)
        if i >= 0:
            return i, cand
    raise ValueError(f"no locale assignment found for {lang}")


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
    """Run a query against the remote D1 database and return rows.

    OBIANA_D1_LOCAL=<dir> runs against a local copy instead (wrangler
    --local --persist-to <dir>), for testing without touching production."""
    local = os.environ.get("OBIANA_D1_LOCAL")
    where = ["--local", "--persist-to", local] if local else ["--remote"]
    proc = subprocess.run(
        ["npx", "wrangler", "d1", "execute", DB, *where, "--json", "--command", sql],
        cwd=ROOT, capture_output=True, text=True, env=node_env(), timeout=90)
    out = proc.stdout.strip()
    start = out.find("[")
    if start == -1:
        raise RuntimeError((proc.stderr or out or "no output from wrangler").strip()[:400])
    data = json.loads(out[start:])
    return data[0].get("results", []) if data else []


def load_locale(lang):
    """Parse i18n/locale.<lang>.js into a flat dot-notation dict."""
    path = os.path.join(ROOT, "public", "i18n", f"locale.{lang}.js")
    if not os.path.exists(path):
        return {}
    src = open(path, encoding="utf-8").read()
    try:
        i, _ = locale_marker(src, lang)
    except ValueError:
        return {}
    body = src[src.find("{", i): src.rfind("}") + 1]
    try:
        obj = json.loads(body)
    except Exception:
        return {}
    flat = {}

    def walk(o, pre=""):
        items = enumerate(o) if isinstance(o, list) else (o or {}).items()
        for k, v in items:
            key = f"{pre}.{k}" if pre else str(k)
            if isinstance(v, (dict, list)):
                walk(v, key)
            else:
                flat[key] = v
    walk(obj.get("ui", {}))
    # Guide cards are namespaced so they cannot collide with a ui path.
    walk(obj.get("content", {}), "content")
    return flat


def clear_unreviewed(lang, key):
    """Mark a machine draft as reviewed without changing its wording: what a
    translator's "Looks right" means once a reviewer agrees."""
    path = os.path.join(ROOT, "public", "i18n", f"locale.{lang}.js")
    src = open(path, encoding="utf-8").read()
    i, marker = locale_marker(src, lang)
    head, body = src[:i], src[src.find("{", i): src.rfind("}") + 1]
    obj = json.loads(body)
    drafts = obj.get("unreviewed")
    if not isinstance(drafts, dict) or key not in drafts:
        return False
    del drafts[key]
    if not drafts:
        del obj["unreviewed"]
    open(path, "w", encoding="utf-8").write(
        head + marker + " " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n")
    return True


def load_unreviewed(lang):
    path = os.path.join(ROOT, "public", "i18n", f"locale.{lang}.js")
    if not os.path.exists(path):
        return {}
    src = open(path, encoding="utf-8").read()
    try:
        i, _ = locale_marker(src, lang)
        obj = json.loads(src[src.find("{", i): src.rfind("}") + 1])
    except Exception:
        return {}
    drafts = obj.get("unreviewed")
    return drafts if isinstance(drafts, dict) else {}


TOKEN = re.compile(r"\{[^{}\s]+\}")
TAG = re.compile(r"</?[a-zA-Z][^>]*>")
ALLOWED_TAG = re.compile(r"^</?(br|strong|em)\s*/?>$", re.I)


def wording_problem(english, text):
    """Why a wording cannot go into a locale, or None (NEXT.md §4): plain text
    plus <br> <strong> <em>, and every {placeholder} or unit token kept."""
    stray = [t for t in TAG.findall(text) if not ALLOWED_TAG.match(t)]
    if stray:
        return "markup other than <br> <strong> <em>: " + " ".join(sorted(set(stray)))
    if sorted(TOKEN.findall(english or "")) != sorted(TOKEN.findall(text)):
        return "placeholders differ from the English: " + " ".join(sorted(TOKEN.findall(english or "")))
    return None


def sentence_count():
    """Every English string a translator can work on (same set as the app's
    Translate page: ui strings and card fields, blank slots excluded)."""
    return sum(1 for v in load_locale("en").values() if isinstance(v, str) and v != "")


def write_locale_key(lang, key, value, source=None):
    """Apply an accepted suggestion straight into the locale file.

    `source` is the English the contributor actually had in front of them. It
    matters: a suggestion can sit in the database for weeks while English moves
    underneath it. Stamping today's English would certify a translation of a
    sentence that no longer exists, so we stamp what they saw, and the key
    stays flagged stale and comes back round for retranslation.
    """
    path = os.path.join(ROOT, "public", "i18n", f"locale.{lang}.js")
    src = open(path, encoding="utf-8").read()
    i, marker = locale_marker(src, lang)
    head, body = src[:i], src[src.find("{", i): src.rfind("}") + 1]
    obj = json.loads(body)
    parts = key.split(".")
    # "content.<card>.<field>" writes into the card set, everything else into ui.
    if parts[0] == "content":
        node = obj.setdefault("content", {})
        parts = parts[1:]
    else:
        node = obj.setdefault("ui", {})
    for p in parts[:-1]:
        if isinstance(node, list):
            node = node[int(p)]
        else:
            node = node.setdefault(p, {})
    # A sentence slot lives in a list, so the last step may be an index.
    if isinstance(node, list):
        node[int(parts[-1])] = value
    else:
        node[parts[-1]] = value

    # Record which English this was translated from. Without it the accepted
    # string is indistinguishable from one written against today's English,
    # and the next correction to this sentence would be invisible here.
    # A reviewed wording is no longer a machine draft (NEXT.md §4).
    if isinstance(obj.get("unreviewed"), dict) and key in obj["unreviewed"]:
        del obj["unreviewed"][key]
        if not obj["unreviewed"]:
            del obj["unreviewed"]

    if key.startswith("content."):
        english = load_locale("en").get(key)
        basis = source if isinstance(source, str) and source else english
        if isinstance(basis, str):
            obj.setdefault("srcHash", {})[key] = src_hash(basis)

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
            # Progress per language: translated sentences against English,
            # how many of those a translator has confirmed as they ship now,
            # and suggestions still waiting for a decision.
            try:
                rows = d1("SELECT lang, "
                          "SUM(CASE WHEN kind='suggest' THEN 1 ELSE 0 END) AS n, "
                          "SUM(CASE WHEN kind='suggest' AND status='new' THEN 1 ELSE 0 END) AS pending "
                          "FROM suggestions GROUP BY lang")
                confirms = d1("SELECT DISTINCT lang, key, current FROM suggestions WHERE kind='confirm'")
            except Exception as e:
                return self._send(500, {"error": str(e)})
            by = {r["lang"]: r for r in rows}
            total = sentence_count()
            english = load_locale("en")
            out = []
            for lang in LOCALES:
                shipped = load_locale(lang)
                translated = sum(1 for k, v in english.items()
                                 if isinstance(v, str) and v and isinstance(shipped.get(k), str) and shipped[k])
                confirmed = len({c["key"] for c in confirms
                                 if c["lang"] == lang and c["current"] == shipped.get(c["key"])})
                r = by.get(lang, {})
                out.append({"lang": lang, "n": r.get("n") or 0, "pending": r.get("pending") or 0,
                            "translated": translated, "confirmed": confirmed, "total": total})
            return self._send(200, {"languages": out})

        if u.path == "/api/suggestions":
            lang = (parse_qs(u.query).get("lang") or ["es"])[0]
            if not re.fullmatch(r"[a-z]{2,3}(?:-[A-Za-z]{2,4})?", lang):
                return self._send(400, {"error": "bad lang"})
            try:
                rows = d1("SELECT id, lang, key, source, current, suggestion, note, "
                          "country, status, created_at, kind FROM suggestions "
                          f"WHERE lang = '{lang}' ORDER BY key, created_at DESC")
            except Exception as e:
                return self._send(500, {"error": str(e)})

            shipped = load_locale(lang)
            english = load_locale("en")
            drafts = load_unreviewed(lang)
            # Group every submission under its key, so one entry shows them all.
            # "Looks right" rows are not suggestions: they are counted, and
            # only while what they confirmed is still what ships.
            groups = {}
            for r in rows:
                g = groups.setdefault(r["key"], {
                    "key": r["key"],
                    "english": english.get(r["key"], r.get("source") or ""),
                    "shipped": shipped.get(r["key"], ""),
                    "draft": r["key"] in drafts,
                    "submissions": [],
                    "confirmations": 0,
                    "confirmationsPending": 0,
                })
                if r.get("kind") == "confirm":
                    if r.get("current") == g["shipped"]:
                        g["confirmations"] += 1
                        if r["status"] == "new":
                            g["confirmationsPending"] += 1
                else:
                    g["submissions"].append(r)
            # Waiting for a decision first: a pending suggestion, or a
            # confirmed machine draft that can be marked reviewed.
            def waiting(g):
                return any(s["status"] == "new" for s in g["submissions"]) or \
                    (g["draft"] and g["confirmations"] > 0)
            ordered = sorted((g for g in groups.values() if g["submissions"] or g["confirmations"]),
                             key=lambda g: (not waiting(g), -g["confirmations"], g["key"]))
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
            if lang not in LOCALES or not re.fullmatch(r"[\w.-]+", key):
                return self._send(400, {"error": "bad lang or key"})
            problem = wording_problem(load_locale("en").get(key, ""), text)
            if problem:
                return self._send(400, {"error": problem})
            try:
                # From the row, not the request: a page left open for a week
                # would post whatever English it loaded back then.
                rows = d1(f"SELECT source FROM suggestions WHERE id={int(sid)}")
                source = (rows[0].get("source") if rows else None)
                write_locale_key(lang, key, text, source)
                d1(f"UPDATE suggestions SET status='accepted' WHERE id={int(sid)}")
                # Other pending suggestions for the same key are now moot.
                d1("UPDATE suggestions SET status='superseded' "
                   f"WHERE key='{key}' AND lang='{lang}' AND status='new' AND kind='suggest' AND id<>{int(sid)}")
                return self._send(200, {"ok": True, "applied": True})
            except Exception as e:
                return self._send(500, {"error": str(e)})

        if u.path == "/api/accept-confirm":
            # A reviewer agrees with translators' "Looks right": the shipped
            # wording stays, the machine-draft mark goes, the rows are closed.
            lang, key = body.get("lang"), body.get("key")
            if lang not in LOCALES or not isinstance(key, str) or not re.fullmatch(r"[\w.-]+", key):
                return self._send(400, {"error": "bad lang or key"})
            try:
                cleared = clear_unreviewed(lang, key)
                d1("UPDATE suggestions SET status='accepted' "
                   f"WHERE kind='confirm' AND lang='{lang}' AND key='{key}' AND status='new'")
                return self._send(200, {"ok": True, "cleared": cleared})
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
