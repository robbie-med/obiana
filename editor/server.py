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
# The deployed site. Only this folder is uploaded to Cloudflare.
WEB = os.path.join(ROOT, "public")
# Files the editor reads or rewrites inside public/.
STRUCTURE_JS = "app/guide/structure.js"   # CONTENT_STRUCTURE (card order, icons)
SW_REG_JS = "app/core/pwa.js"             # service worker registration, stripped in transit
REMOTE = "obiana"                # never origin: see the note in start.sh
BRANCH = "obiana-main"

# Everything Publish may commit: what the editor writes (English locale, card
# structure, templates), what snapshot.js regenerates, and what bump_version()
# touches. Nothing outside this list is ever staged.
PUBLISH_PATHS = [
    "public/i18n/locale.en.js",
    "public/i18n/body-templates.js",
    "public/app/guide/structure.js",
    "translation/source",
    "public/i18n/i18n.js",
    "public/sw.js",
    "public/index.html",
]

MIME = {
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon",
    ".webmanifest": "application/manifest+json",
}


# ─── locale file access ─────────────────────────────────
# Same slicing rule the worker, the review app and the node tooling all use.
def locale_path(lang="en"):
    return os.path.join(WEB, "i18n", f"locale.{lang}.js")


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


# ─── card structure (content tree) ──────────────────────
# CONTENT_STRUCTURE in app/guide/structure.js and MYOB_BODY_TPL in body-templates.js are
# both plain JSON inside a JS assignment, and both round-trip byte-identically
# through json.dumps(indent=2), so rewriting them leaves no formatting noise.
SECTIONS = ("pregnancy", "labor", "recovery", "baby", "faq")

# Each section tints its cards: the icon stroke, the lead paragraph, table
# headers and its own callouts. Gold callouts ("ask at this visit") and alert
# callouts mean the same thing in every section and are left alone.
ICON_INK = {"pregnancy": "teal", "labor": "gold", "recovery": "rose", "baby": "navy"}
TINT = {"pregnancy": "", "labor": "gold", "recovery": "rose", "baby": "navy"}
CALLOUT_TINT = {"pregnancy": "", "labor": "", "recovery": "rose", "baby": "navy"}


def _json_block(rel, marker):
    path = os.path.join(WEB, rel)
    src = io.open(path, encoding="utf-8").read()
    a = src.index(marker) + len(marker)
    b = src.index("\n};", a) + 2 if rel == STRUCTURE_JS else src.rindex("}") + 1
    return path, src, a, b, json.loads(src[a:b])


def read_structure():
    return _json_block(STRUCTURE_JS, "const CONTENT_STRUCTURE = ")


def read_templates():
    return _json_block("i18n/body-templates.js", "window.MYOB_BODY_TPL = ")


def _write_block(path, src, a, b, obj):
    io.open(path, "w", encoding="utf-8").write(
        src[:a] + json.dumps(obj, indent=2, ensure_ascii=False) + src[b:])


def retint(entry, tpl, frm, to):
    """Re-colour a card moved from section `frm` to section `to`."""
    entry = dict(entry)
    if entry.get("icon") and frm in ICON_INK and to in ICON_INK:
        entry["icon"] = entry["icon"].replace(f"var(--{ICON_INK[frm]})", f"var(--{ICON_INK[to]})")
    if "color" in entry and to in TINT:
        entry["color"] = TINT[to]          # icon background: "" for Prenatal
    if tpl:
        lead = ("lead " + TINT[to]).strip()
        tpl = re.sub(r'class="lead(?: (?:gold|rose|navy|plum))?"', f'class="{lead}"', tpl)
        th = f'<th class="{TINT[to]}">' if TINT[to] else "<th>"
        tpl = re.sub(r'<th class="(?:gold|rose|navy)">', th, tpl)
        callout = ("callout " + CALLOUT_TINT[to]).strip()
        tpl = re.sub(r'class="callout (?:rose|navy)"', f'class="{callout}"', tpl)
    return entry, tpl


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
    """Stop the app registering a service worker under the editor.

    The registration lives in app/core/pwa.js, not index.html. Left alone, the
    worker caches its own copies of the app scripts and the locale file, so an edit
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

        if path in ("/__editor/tree", "/tree"):
            f = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tree.html")
            return self._raw(200, io.open(f, encoding="utf-8").read(), MIME[".html"])

        if path == "/api/tree":
            try:
                structure = read_structure()[4]
                templates = read_templates()[4]
            except Exception as e:
                return self._send(500, {"error": str(e)})
            mp = os.path.join(ROOT, "docs", "CONTENT_MAP.md")
            cmap = io.open(mp, encoding="utf-8").read() if os.path.isfile(mp) else ""
            return self._send(200, {"structure": structure, "templates": templates, "map": cmap})

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
        full = os.path.normpath(os.path.join(WEB, rel))
        if not full.startswith(WEB + os.sep) or not os.path.isfile(full):
            return self._raw(404, "not found", "text/plain")
        ext = os.path.splitext(full)[1]
        if ext == ".html":
            return self._raw(200, inject_html(io.open(full, encoding="utf-8").read()), MIME[".html"])
        if os.path.relpath(full, WEB) == SW_REG_JS:
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
        if u.path == "/api/structure":
            return self.save_structure(body)
        return self._send(404, {"error": "not found"})

    def save_structure(self, body):
        """Reorder cards, or move them between the four guide sections.

        FAQ entries render as question rows with no icon, and guide cards as
        accordions with one, so neither may cross into the other's section.
        """
        order = body.get("order")
        if not isinstance(order, dict) or set(order) != set(SECTIONS):
            return self._send(400, {"error": "order must list every section"})
        try:
            cpath, csrc, ca, cb, structure = read_structure()
            tpath, tsrc, ta, tb, templates = read_templates()
            home = {e["id"]: (sec, e) for sec, lst in structure.items() for e in lst}
            seen = [i for sec in SECTIONS for i in order[sec]]
            if sorted(seen) != sorted(home) or len(seen) != len(set(seen)):
                return self._send(400, {"error": "every card must appear exactly once"})
            new, moved, tpl_changed = {}, [], False
            for sec in SECTIONS:
                new[sec] = []
                for cid in order[sec]:
                    frm, entry = home[cid]
                    if (frm == "faq") != (sec == "faq"):
                        return self._send(400, {"error": f"{cid}: FAQ entries and guide cards cannot swap sections"})
                    if frm != sec:
                        entry, tpl = retint(entry, templates.get(cid), frm, sec)
                        if tpl is not None and tpl != templates.get(cid):
                            templates[cid] = tpl
                            tpl_changed = True
                        moved.append({"id": cid, "from": frm, "to": sec})
                    new[sec].append(entry)
            if new == structure:
                return self._send(200, {"ok": True, "moved": [], "unchanged": True, "status": self.status()})
            _write_block(cpath, csrc, ca, cb, new)
            if tpl_changed:
                _write_block(tpath, tsrc, ta, tb, templates)
        except Exception as e:
            return self._send(500, {"error": str(e)})
        return self._send(200, {"ok": True, "moved": moved, "status": self.status()})

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
            # Only the files this editor writes are ever staged. Publish used to
            # run `git add -A`, which swept in whatever else was lying in the
            # working tree: private notes, half-finished work from another
            # session, anything. Everything else stays uncommitted.
            if not git("status", "--porcelain", "--", *PUBLISH_PATHS):
                return self._send(400, {"error": "nothing to publish"})

            # The pipeline's English input is generated, not hand-kept. If this
            # is skipped, the next translation run works from stale English.
            rc, out = node("translation/snapshot.js")
            steps.append({"step": "snapshot", "ok": rc == 0, "out": out})
            if rc != 0:
                return self._send(500, {"error": "snapshot failed", "steps": steps})

            # One preflight: locale lint, fingerprint verify, and a render of
            # every card, ui string and tool in every locale (scripts/check.js).
            rc, out = node("scripts/check.js")
            steps.append({"step": "check", "ok": rc == 0, "out": out})
            if rc != 0:
                return self._send(500, {"error": "check failed", "steps": steps})

            v = bump_version()
            steps.append({"step": "cache version", "ok": True, "out": f"now v{v}"})

            git("add", "--", *PUBLISH_PATHS)
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
    """ASSET_VERSION, CACHE_NAME and every ?v= move together: scripts/bump.js."""
    rc, out = node("scripts/bump.js")
    if rc != 0:
        raise RuntimeError(f"version bump failed: {out}")
    return int(out.strip().split()[-1])

if __name__ == "__main__":
    if not os.path.isdir(os.path.join(ROOT, ".git")):
        sys.exit(f"{ROOT} is not a git repository")
    print(f"Obiana English editor  ->  http://{HOST}:{PORT}")
    print(f"  repo:   {ROOT}")
    print(f"  pushes: {REMOTE}/main  (never origin)")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
