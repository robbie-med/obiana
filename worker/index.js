// ═══════════════════════════════════════════════════════
// OBIANA WORKER — translation suggestion intake
// ═══════════════════════════════════════════════════════
// Everything except /api/* is served straight from static assets; this code is
// only invoked for the API (see run_worker_first in wrangler.jsonc).
//
// Design notes:
//
// * Suggestions are written to D1, not pushed at a home machine. A direct push
//   loses the submission whenever that machine is asleep, and a contributor
//   gets no way to know. D1 holds it until the PC pulls. The Telegram post is
//   a notification, never the transport.
//
// * The endpoint is public, so it is treated as hostile input: keys are
//   validated against the SHIPPED English catalog (read through the ASSETS
//   binding, so there is no second list to drift), lengths are capped, and a
//   per-IP hourly cap applies.
//
// * No patient data crosses this boundary. The client sends a translation key,
//   the English source and a proposed wording — nothing from any tracker. The
//   app's promise that health data never leaves the device still holds.
//
// * Two kinds of row: 'suggest' (a new wording) and 'confirm' (a translator
//   tapped Looks right on what is shipped). A confirmation is a signal for the
//   review app, never an automatic merge: the endpoint is open to anyone.
//
// * Telegram gets no message per sentence. A translator working through a
//   language sends hundreds; the hourly Cron Trigger (scheduled() below) posts
//   one digest instead. It needs no state: each run counts the rows created in
//   the clock hour that just ended.

// Guide card bodies run to ~2400 characters in English and translations are
// often longer, so a 2000 cap silently truncated the longest cards.
const MAX_SUGGESTION = 8000;
const MAX_MESSAGE = 4000;
const FEEDBACK_KINDS = ['culture', 'question', 'unclear'];
const FEEDBACK_HOURLY = 20;
const MAX_NOTE = 500;
const MAX_BODY = 8 * 1024;
const SUGGEST_KINDS = ['suggest', 'confirm'];
const HOURLY_LIMIT = 360;         // per IP; a reviewer working a language hit 59 in an hour at 60

// Must match LOCALES in i18n/i18n.js (minus 'en', which needs no suggestions).
const LOCALES = ['es', 'fr', 'ko', 'ar', 'ru', 'zh', 'zom',
                 'ja', 'tl', 'pt-BR', 'ps', 'prs', 'vi', 'th', 'de', 'pl'];

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'no-referrer',
  },
});

// Only the app itself posts here. Browsers always send Origin on a POST, so a
// missing or foreign Origin is a script or another site, not a reader.
// Compared with the request's own origin, so preview and local runs work too.
function sameOrigin(request) {
  const origin = request.headers.get('origin');
  return !!origin && origin === new URL(request.url).origin;
}

// The body, read with a hard cap. content-length is advisory: a chunked
// request leaves it off, so a cap that trusts it caps nothing. Returns null
// once more than `limit` bytes have arrived, without reading the rest.
async function readCapped(request, limit) {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) { try { await reader.cancel(); } catch (e) {} return null; }
    chunks.push(value);
  }
  const all = new Uint8Array(size);
  let at = 0;
  for (const c of chunks) { all.set(c, at); at += c.byteLength; }
  return new TextDecoder().decode(all);
}

// Shared gate for both POST endpoints: method, origin, content type, size,
// then JSON. Returns { body } or { res } with the error response to send.
async function readJsonPost(request) {
  if (request.method !== 'POST') return { res: json({ error: 'method_not_allowed' }, 405) };
  if (!sameOrigin(request)) return { res: json({ error: 'bad_origin' }, 403) };
  const type = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') return { res: json({ error: 'unsupported_media_type' }, 415) };
  const text = await readCapped(request, MAX_BODY);
  if (text === null) return { res: json({ error: 'too_large' }, 413) };
  try { return { body: JSON.parse(text) }; } catch (e) { return { res: json({ error: 'bad_json' }, 400) }; }
}

// Logged to Cloudflare so a broken deploy is visible. The error's name and
// message only: never the request, its body or its headers. Nothing is sent
// from the app itself.
function logFailure(where, e) {
  console.error(`${where}: ${(e && e.name) || 'Error'}: ${String((e && e.message) || e).slice(0, 200)}`);
}

// Fire-and-forget post to the private "Obiana submissions" Telegram channel
// (set up by review/telegram_setup.py). The submission is already safe in D1
// by the time this runs, so a failure here must never affect the response.
// Plain text, no parse_mode: contributor text would need escaping otherwise.
function notify(env, ctx, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  ctx.waitUntil(
    fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: text.slice(0, 4000),
        disable_web_page_preview: true,
      }),
    }).catch(() => {})
  );
}

// Hashed, never stored raw: enough to rate-limit, not enough to identify.
async function hash(value, salt) {
  const data = new TextEncoder().encode(`${salt || ''}:${value}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Valid keys come from the English locale that is actually deployed, read via
// the ASSETS binding. Keeps this from becoming a free key/value store while
// never needing a copy of the key list.
// Cached per isolate, but not forever: a deploy that adds guide cards adds new
// content.<id>.t.<n> keys, and a warm isolate holding the pre-deploy set would
// reject every suggestion against them as unknown_key for an unpredictable
// stretch. Five minutes bounds that without re-reading the file per request.
let KEY_CACHE = null;
let KEY_CACHE_AT = 0;
const KEY_CACHE_TTL = 5 * 60 * 1000;
async function validKeys(env, origin) {
  if (KEY_CACHE && (Date.now() - KEY_CACHE_AT) < KEY_CACHE_TTL) return KEY_CACHE;
  const res = await env.ASSETS.fetch(new URL('/i18n/locale.en.js', origin));
  // Serve the stale set rather than rejecting everything if the fetch fails.
  if (!res.ok) return KEY_CACHE;
  const src = await res.text();
  const start = src.indexOf('{', src.indexOf('window.MYOB_LOCALES.en'));
  let obj;
  try { obj = JSON.parse(src.slice(start, src.lastIndexOf('}') + 1)); }
  catch (e) { return KEY_CACHE; }
  const keys = new Set();
  const walk = (o, pre) => {
    for (const [k, v] of Object.entries(o || {})) {
      const key = pre ? `${pre}.${k}` : k;
      if (v && typeof v === 'object') walk(v, key); else keys.add(key);
    }
  };
  // UI strings keep their bare dot-path. Guide cards are namespaced under
  // "content." so the two can never collide; ui has no top-level "content".
  walk(obj.ui, '');
  walk(obj.content, 'content');
  KEY_CACHE = keys;
  KEY_CACHE_AT = Date.now();
  return keys;
}

async function handleSuggest(request, env, ctx) {
  const gate = await readJsonPost(request);
  if (gate.res) return gate.res;
  const body = gate.body || {};

  // D1 is bound only once the operator has created the database. Until then
  // say so plainly — the client falls back to local save + Export, and the
  // rest of the site is unaffected.
  if (!env.DB) return json({ error: 'not_configured' }, 503);

  const lang = String(body.lang || '');
  const key = String(body.key || '');
  const suggestion = String(body.suggestion || '').trim();
  const source = String(body.source || '').slice(0, MAX_SUGGESTION);
  const current = String(body.current || '').slice(0, MAX_SUGGESTION);
  const note = String(body.note || '').slice(0, MAX_NOTE);
  const kind = body.kind === undefined ? 'suggest' : String(body.kind);

  if (!LOCALES.includes(lang)) return json({ error: 'bad_lang' }, 400);
  if (!SUGGEST_KINDS.includes(kind)) return json({ error: 'bad_kind' }, 400);
  if (!suggestion) return json({ error: 'empty_suggestion' }, 400);
  // "Looks right" confirms what is shipped, so it carries it unchanged.
  if (kind === 'confirm' && suggestion !== current.trim()) return json({ error: 'confirm_mismatch' }, 400);
  if (suggestion.length > MAX_SUGGESTION) return json({ error: 'suggestion_too_long' }, 400);

  const keys = await validKeys(env, request.url);
  if (!keys) return json({ error: 'unavailable' }, 503);
  if (!keys.has(key)) return json({ error: 'unknown_key' }, 400);

  const ip = request.headers.get('cf-connecting-ip') || '';
  const ipHash = await hash(ip, env.HASH_SALT);

  // Per-IP hourly cap, counted from the same table — no extra binding needed.
  const recent = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM suggestions
      WHERE ip_hash = ?1 AND created_at > datetime('now', '-1 hour')`
  ).bind(ipHash).first();
  if (recent && recent.n >= HOURLY_LIMIT) return json({ error: 'rate_limited' }, 429);

  await env.DB.prepare(
    `INSERT INTO suggestions (lang, key, source, current, suggestion, note, ip_hash, country, kind)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
  ).bind(lang, key, source, current, suggestion, note, ipHash,
         request.headers.get('cf-ipcountry') || '', kind).run();

  return json({ ok: true });
}

// Reader contributions: cultural practice, a question, or a passage that did
// not read clearly. Deliberately not a support queue — this is how the guide
// gets better, and the UI says so.
async function handleFeedback(request, env, ctx) {
  const gate = await readJsonPost(request);
  if (gate.res) return gate.res;
  const body = gate.body || {};
  if (!env.DB) return json({ error: 'not_configured' }, 503);

  const lang = String(body.lang || '');
  const kind = String(body.kind || '');
  const topic = String(body.topic || '').slice(0, 120);
  const message = String(body.message || '').trim();

  if (!LOCALES.includes(lang) && lang !== 'en') return json({ error: 'bad_lang' }, 400);
  if (!FEEDBACK_KINDS.includes(kind)) return json({ error: 'bad_kind' }, 400);
  if (!message) return json({ error: 'empty_message' }, 400);
  if (message.length > MAX_MESSAGE) return json({ error: 'message_too_long' }, 400);

  const ipHash = await hash(request.headers.get('cf-connecting-ip') || '', env.HASH_SALT);
  const recent = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM feedback
      WHERE ip_hash = ?1 AND created_at > datetime('now', '-1 hour')`
  ).bind(ipHash).first();
  if (recent && recent.n >= FEEDBACK_HOURLY) return json({ error: 'rate_limited' }, 429);

  await env.DB.prepare(
    `INSERT INTO feedback (lang, kind, topic, message, ip_hash, country)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
  ).bind(lang, kind, topic, message, ipHash,
         request.headers.get('cf-ipcountry') || '').run();

  notify(env, ctx, `💬 ${kind} (${lang})\n${topic ? topic + '\n' : ''}\n${message.slice(0, 3000)}`);

  return json({ ok: true });
}

// D1 stores created_at as 'YYYY-MM-DD HH:MM:SS' in UTC.
const d1Time = ms => new Date(ms).toISOString().slice(0, 19).replace('T', ' ');

// One Telegram message for the clock hour that just ended, only if something
// came in: "es: 23 sentences, 4 confirmations · fr: 2 sentences".
async function hourlyDigest(env, scheduledTime) {
  if (!env.DB || !env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return null;
  const end = Math.floor(scheduledTime / 3600000) * 3600000;
  const { results } = await env.DB.prepare(
    `SELECT lang, kind, COUNT(*) AS n FROM suggestions
      WHERE created_at >= ?1 AND created_at < ?2 GROUP BY lang, kind ORDER BY lang`
  ).bind(d1Time(end - 3600000), d1Time(end)).all();
  if (!results || !results.length) return null;
  const by = {};
  for (const r of results) (by[r.lang] = by[r.lang] || {})[r.kind || 'suggest'] = r.n;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const line = Object.entries(by).map(([lang, k]) => `${lang}: ` + [
    k.suggest ? plural(k.suggest, 'sentence', 'sentences') : '',
    k.confirm ? plural(k.confirm, 'confirmation', 'confirmations') : '',
  ].filter(Boolean).join(', ')).join(' · ');
  const text = `🌐 Translations, last hour\n${line}`;
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
  });
  return text;
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(hourlyDigest(env, event.scheduledTime).catch(e => logFailure('digest', e)));
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/suggest') {
      try { return await handleSuggest(request, env, ctx); }
      catch (e) { logFailure('suggest', e); return json({ error: 'server_error' }, 500); }
    }

    if (url.pathname === '/api/feedback') {
      try { return await handleFeedback(request, env, ctx); }
      catch (e) { logFailure('feedback', e); return json({ error: 'server_error' }, 500); }
    }

    // A trivial query, so "ok" means the database answers, not just that the
    // binding exists.
    if (url.pathname === '/api/health') {
      if (!env.DB) return json({ ok: true, suggestions: 'not_configured' });
      try {
        const r = await env.DB.prepare('SELECT 1 AS ok').first();
        return json({ ok: !!(r && r.ok === 1), suggestions: 'enabled' });
      } catch (e) {
        logFailure('health', e);
        return json({ ok: false, suggestions: 'db_error' }, 503);
      }
    }

    // Not an API path: fall through to static assets.
    return env.ASSETS.fetch(request);
  },
};
