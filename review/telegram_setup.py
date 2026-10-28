#!/usr/bin/env python3
"""
One-time Telegram setup for submission notifications.

Obiana's OWN Telethon login on the user's work account, used only to create the
bot (via @BotFather), the private channel the worker posts to, and to give the
bot admin rights there. The worker itself talks to the Bot API with the token;
nothing here runs on a schedule.

    python3 review/telegram_setup.py send-code       # Telegram sends a login code to the work account
    python3 review/telegram_setup.py sign-in <code>  # 2FA: add --password-file <path>, or sign-in-2fa
    python3 review/telegram_setup.py sign-in-2fa     # interactive 2FA prompt (run in a real terminal)
    python3 review/telegram_setup.py whoami
    python3 review/telegram_setup.py setup           # bot, channel, admin rights, worker secrets
    python3 review/telegram_setup.py test            # post a test message through the bot

Copied from gtfr/gtfr/tglogin.py. Never copy another project's session here: one
auth key used by two clients at once gets revoked. The app id/hash are read at
call time from ~/Projects/connect w fam/.env, in place. The bot token lives in
review/data/telegram.json (gitignored, 0600) and in the worker's secrets; it is
never printed.
"""

import asyncio
import json
import os
import re
import secrets
import subprocess
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from server import node_env, ROOT  # noqa: E402  (wrangler needs Node >= 22)

WORK_PHONE = "+16033221480"
DATA = Path(__file__).resolve().parent / "data"
SESSION = DATA / "telethon_obiana"               # Telethon appends .session
STATE = DATA / "telegram.json"
PENDING = DATA / "tg_login_pending.json"
APP_ENV = Path.home() / "Projects" / "connect w fam" / ".env"
TOKEN_RE = re.compile(r"(\d{6,}:[A-Za-z0-9_-]{30,})")
BOT_NAME = "Obiana submissions"
CHANNEL_TITLE = "Obiana submissions"
CHANNEL_ABOUT = "Translation suggestions and reader messages from obiana.app."
WORKER = "obiana"


def _state():
    return json.loads(STATE.read_text()) if STATE.exists() else {}


def _save(**kv):
    s = _state()
    s.update(kv)
    old = os.umask(0o077)
    try:
        STATE.write_text(json.dumps(s, indent=2))
    finally:
        os.umask(old)


def _secure():
    for p in DATA.glob("*"):
        p.chmod(0o600)


def _app():
    vals = {}
    for line in APP_ENV.read_text().splitlines():
        if "=" in line and not line.lstrip().startswith("#"):
            k, v = line.split("=", 1)
            vals[k.strip()] = v.strip().strip('"').strip("'")
    return int(vals["TELEGRAM_API_ID"]), vals["TELEGRAM_API_HASH"]


def _client():
    from telethon import TelegramClient
    DATA.mkdir(parents=True, exist_ok=True)
    api_id, api_hash = _app()
    return TelegramClient(str(SESSION), api_id, api_hash)


def bot_call(method, **params):
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{_state()['bot_token']}/{method}",
        data=json.dumps(params).encode(), headers={"content-type": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as r:
        body = json.loads(r.read())
    if not body.get("ok"):
        raise SystemExit(f"Bot API {method} failed: {body.get('description')}")
    return body["result"]


async def _send_code(phone):
    c = _client()
    await c.connect()
    if await c.is_user_authorized():
        me = await c.get_me()
        print(f"already logged in as @{me.username} (+{me.phone})")
        await c.disconnect()
        return
    sent = await c.send_code_request(phone)
    old = os.umask(0o077)
    try:
        PENDING.write_text(json.dumps({"phone": phone, "hash": sent.phone_code_hash}))
    finally:
        os.umask(old)
    _secure()
    print(f"code sent to {phone} (check Telegram on that account; type: {type(sent.type).__name__})")
    await c.disconnect()


async def _sign_in(code, password_file):
    from telethon.errors import SessionPasswordNeededError
    p = json.loads(PENDING.read_text())
    c = _client()
    await c.connect()
    try:
        try:
            await c.sign_in(phone=p["phone"], code=code, phone_code_hash=p["hash"])
        except SessionPasswordNeededError:
            if not password_file:
                print("2FA is on: run `python3 review/telegram_setup.py sign-in-2fa` in a real terminal, "
                      "or re-run sign-in with --password-file <path>.")
                return
            await c.sign_in(password=Path(os.path.expanduser(password_file)).read_text().strip())
        await _finish_login(c, p["phone"])
    finally:
        await c.disconnect()


async def _sign_in_2fa():
    import getpass
    p = json.loads(PENDING.read_text())
    c = _client()
    await c.connect()
    try:
        await c.sign_in(password=getpass.getpass("Telegram 2FA password (hidden): "))
        await _finish_login(c, p["phone"])
    finally:
        await c.disconnect()


async def _finish_login(c, phone):
    me = await c.get_me()
    if "+" + (me.phone or "") != phone:
        await c.log_out()
        raise SystemExit(f"WRONG ACCOUNT (@{me.username}); logged that session out, nothing saved.")
    PENDING.unlink(missing_ok=True)
    _secure()
    print(f"✓ logged in as @{me.username} id={me.id}")


async def _whoami():
    c = _client()
    await c.connect()
    print(f"@{(await c.get_me()).username}" if await c.is_user_authorized() else "not logged in")
    await c.disconnect()


async def _create_bot(c):
    cands = ["obiana_submissions_bot", "obiana_notify_bot", f"obiana_{secrets.token_hex(2)}_bot",
             f"obiana_{secrets.token_hex(3)}_bot"]
    async with c.conversation("BotFather", timeout=60) as conv:
        await conv.send_message("/newbot")
        await conv.get_response()
        await conv.send_message(BOT_NAME)
        await conv.get_response()
        for cand in cands:
            await conv.send_message(cand)
            reply = (await conv.get_response()).raw_text
            m = TOKEN_RE.search(reply)
            if m:
                _save(bot_token=m.group(1), bot_username=cand)
                print(f"✓ created @{cand} (token saved, not printed)")
                return
            low = reply.lower()
            if not any(w in low for w in ("taken", "invalid", "try", "different", "occupied")):
                raise SystemExit("BotFather said:\n" + reply)
    raise SystemExit("every candidate bot username was rejected; nothing saved")


def _put_secret(name, value):
    proc = subprocess.run(["npx", "wrangler", "secret", "put", name, "--name", WORKER],
                          input=value, cwd=ROOT, capture_output=True, text=True,
                          env=node_env(), timeout=120)
    if proc.returncode != 0:
        raise SystemExit(f"wrangler secret put {name} failed:\n{proc.stderr[-400:]}")
    print(f"✓ worker secret {name} set")


async def _setup():
    from telethon import functions, types
    c = _client()
    await c.connect()
    if not await c.is_user_authorized():
        raise SystemExit("not logged in: run send-code, then sign-in <code>")
    me = await c.get_me()
    if not _state().get("bot_token"):
        await _create_bot(c)
    bot = bot_call("getMe")

    if not _state().get("chat_id"):
        res = await c(functions.channels.CreateChannelRequest(
            title=CHANNEL_TITLE, about=CHANNEL_ABOUT, broadcast=True))
        _save(chat_id=f"-100{res.chats[0].id}")
        print(f"✓ created private channel “{CHANNEL_TITLE}” owned by @{me.username}")
    channel = await c.get_entity(int(_state()["chat_id"]))
    rights = types.ChatAdminRights(post_messages=True, edit_messages=True, delete_messages=True)
    await c(functions.channels.EditAdminRequest(
        channel=channel, user_id=bot["username"], admin_rights=rights, rank="obiana"))
    print(f"✓ @{bot['username']} can post in the channel")
    await c.disconnect()

    _put_secret("TELEGRAM_BOT_TOKEN", _state()["bot_token"])
    _put_secret("TELEGRAM_CHAT_ID", _state()["chat_id"])
    _secure()


def _test():
    bot_call("sendMessage", chat_id=_state()["chat_id"],
             text="Obiana: notifications are on. Each translation suggestion and reader message lands here.")
    print("✓ test message posted to the channel")


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    action, rest = args[0], args[1:]
    pw = None
    if "--password-file" in rest:
        i = rest.index("--password-file")
        pw = rest[i + 1]
        rest = rest[:i] + rest[i + 2:]
    if action == "send-code":
        asyncio.run(_send_code(rest[0] if rest else WORK_PHONE))
    elif action == "sign-in":
        asyncio.run(_sign_in(rest[0], pw))
    elif action == "sign-in-2fa":
        asyncio.run(_sign_in_2fa())
    elif action == "whoami":
        asyncio.run(_whoami())
    elif action == "setup":
        asyncio.run(_setup())
    elif action == "test":
        _test()
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
