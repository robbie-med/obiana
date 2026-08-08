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
//   gets no way to know. D1 holds it until the PC pulls. The ntfy ping is a
//   notification, never the transport.
//
// * The endpoint is public, so it is treated as hostile input: keys are
//   validated against the SHIPPED English catalog (read through the ASSETS
//   binding, so there is no second list to drift), lengths are capped, and a
//   per-IP hourly cap applies.
//
// * No patient data crosses this boundary. The client sends a translation key,
//   the English source and a proposed wording — nothing from any tracker. The
//   app's promise that health data never leaves the device still holds.

const MAX_SUGGESTION = 2000;
const MAX_NOTE = 500;
const MAX_BODY = 8 * 1024;
const HOURLY_LIMIT = 60;          // per IP, generous for a genuine reviewer

// Must match LOCALES in i18n/i18n.js (minus 'en', which needs no suggestions).
const LOCALES = ['es', 'fr', 'ko', 'ar', 'ru', 'zh', 'zom',
                 'ja', 'tl', 'pt-BR', 'ps', 'prs', 'vi', 'th', 'de', 'pl'];

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

// Hashed, never stored raw: enough to rate-limit, not enough to identify.
async function hash(value, salt) {
  const data = new TextEncoder().encode(`${salt || ''}:${value}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Valid keys come from the English locale that is actually deployed, read via
// the ASSETS binding. Keeps this from becoming a free key/value store while
// never needing a copy of the key list.
let KEY_CACHE = null;
async function validKeys(env, origin) {
  if (KEY_CACHE) return KEY_CACHE;
  const res = await env.ASSETS.fetch(new URL('/i18n/locale.en.js', origin));
  if (!res.ok) return null;
  const src = await res.text();
  const start = src.indexOf('{', src.indexOf('window.MYOB_LOCALES.en'));
  let obj;
  try { obj = JSON.parse(src.slice(start, src.lastIndexOf('}') + 1)); }
  catch (e) { return null; }
  const keys = new Set();
  (function walk(o, pre) {
    for (const [k, v] of Object.entries(o || {})) {
      const key = pre ? `${pre}.${k}` : k;
      if (v && typeof v === 'object') walk(v, key); else keys.add(key);
    }
  })(obj.ui, '');
  KEY_CACHE = keys;
  return keys;
}

async function handleSuggest(request, env, ctx) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  // D1 is bound only once the operator has created the database. Until then
  // say so plainly — the client falls back to local save + Export, and the
  // rest of the site is unaffected.
  if (!env.DB) return json({ error: 'not_configured' }, 503);

  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_BODY) return json({ error: 'too_large' }, 413);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad_json' }, 400); }

  const lang = String(body.lang || '');
  const key = String(body.key || '');
  const suggestion = String(body.suggestion || '').trim();
  const source = String(body.source || '').slice(0, MAX_SUGGESTION);
  const current = String(body.current || '').slice(0, MAX_SUGGESTION);
  const note = String(body.note || '').slice(0, MAX_NOTE);

  if (!LOCALES.includes(lang)) return json({ error: 'bad_lang' }, 400);
  if (!suggestion) return json({ error: 'empty_suggestion' }, 400);
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
    `INSERT INTO suggestions (lang, key, source, current, suggestion, note, ip_hash, country)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
  ).bind(lang, key, source, current, suggestion, note, ipHash,
         request.headers.get('cf-ipcountry') || '').run();

  // Fire-and-forget notification. If it fails the suggestion is already safe
  // in D1, so it must never affect the response.
  if (env.NTFY_URL) {
    ctx.waitUntil(
      fetch(env.NTFY_URL, {
        method: 'POST',
        headers: { Title: `Obiana: ${lang} suggestion`, Tags: 'globe_with_meridians' },
        body: `${key}\n\nEN: ${source.slice(0, 200)}\nNEW: ${suggestion.slice(0, 400)}`,
      }).catch(() => {})
    );
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/suggest') {
      try { return await handleSuggest(request, env, ctx); }
      catch (e) { return json({ error: 'server_error' }, 500); }
    }

    if (url.pathname === '/api/health') {
      return json({ ok: true, suggestions: env.DB ? 'enabled' : 'not_configured' });
    }

    // Not an API path: fall through to static assets.
    return env.ASSETS.fetch(request);
  },
};
