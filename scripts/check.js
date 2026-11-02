#!/usr/bin/env node
// ═══════════════════════════════════════════════════════
// CHECK: the one preflight for Obiana
// ═══════════════════════════════════════════════════════
//   node scripts/check.js              lint + fingerprints + render every surface
//   node scripts/check.js --baseline   ...and save the render as the baseline
//   node scripts/check.js --compare    ...and diff the render against the baseline
//
// The render loads the REAL runtime files (i18n.js, body-templates.js, every
// locale, every app/ script) into a Node vm with a
// stub DOM, then for every locale records:
//   - every guide card: title, sub, body HTML, exactly as cardBody() builds it
//   - every ui.* string as t() resolves it (with English fallback)
//   - the first screen of every tool, as its TOOL_INITS entry writes it
//
// A refactor that is meant to change nothing must produce zero diff under
// --compare. A content edit should show exactly the slots it meant to touch.
// Snapshots live in scripts/.snapshots/ (gitignored).

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
// Paths are listed once here so the planned move into public/ is a one-line change.
const P = {
  web: path.join(ROOT, 'public'),
  translation: path.join(ROOT, 'translation'),
};
const SNAP = path.join(__dirname, '.snapshots');
const args = new Set(process.argv.slice(2));

let failed = false;
function step(name, fn) {
  process.stdout.write(`• ${name} ... `);
  try {
    const r = fn();
    if (r === false) { failed = true; console.log('FAIL'); }
    else console.log('ok' + (typeof r === 'string' ? '  ' + r : ''));
  } catch (e) {
    failed = true;
    console.log('FAIL\n  ' + (e.stack || e).toString().split('\n').slice(0, 6).join('\n  '));
  }
}
function runNode(script, ...a) {
  const r = spawnSync(process.execPath, [path.join(P.translation, script), ...a], { encoding: 'utf8' });
  if (r.status !== 0) { console.log('\n' + (r.stdout + r.stderr).trim()); return false; }
  return true;
}


// ─── Slot ids are permanent ─────────────────────────────
// content.<id>.t[n] is an id shared by the template ({{n}}), every locale's
// translation, every srcHash entry and every pending reader suggestion in D1.
// Inserting a sentence mid-array shifts all later ids and silently attaches
// every translation to the wrong sentence. So the rule is: append new
// sentences at the end and place {{n}} wherever it belongs in the template;
// blank a removed sentence to "" rather than deleting it.
// Compared against the last committed snapshot of English (translation/source).
function slotGuard() {
  const r = spawnSync('git', ['show', 'HEAD:translation/source/content.en.json'], { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0) return 'skipped (no committed snapshot)';
  const before = JSON.parse(r.stdout);
  global.window = { MYOB_LOCALES: {} };
  const enFile = path.join(P.web, 'i18n', 'locale.en.js');
  delete require.cache[require.resolve(enFile)];
  require(enFile);
  const now = global.window.MYOB_LOCALES.en.content;
  const bad = [];
  for (const [id, old] of Object.entries(before)) {
    const cur = now[id];
    if (!cur) continue;                        // card removed: allowed
    const a = old.t || [], b = cur.t || [];
    if (b.length < a.length) bad.push(`${id}: ${a.length} slots before, ${b.length} now. Blank a removed sentence to "" instead of deleting it.`);
    a.forEach((txt, i) => {
      if (!txt || b[i] === txt) return;
      const j = b.indexOf(txt);
      if (j !== -1 && j !== i) bad.push(`${id}: the sentence in t.${i} is now t.${j}. Slots must not move; append new ones at the end.`);
    });
  }
  if (bad.length) { console.log('\n  ' + bad.slice(0, 20).join('\n  ')); return false; }
  return `${Object.keys(before).length} cards, no slot moved or removed`;
}


// ─── Offline completeness ───────────────────────────────
// Every script and stylesheet index.html loads must be precached by sw.js, at
// the same ?v=, or the installed app breaks the first time it opens offline.
function precacheGuard() {
  const html = fs.readFileSync(path.join(P.web, 'index.html'), 'utf8');
  const sw = fs.readFileSync(path.join(P.web, 'sw.js'), 'utf8');
  const wanted = [...html.matchAll(/<(?:script[^>]*\ssrc|link[^>]*rel="stylesheet"[^>]*\shref)="\.?\/?([^"]+)"/g)]
    .map(m => m[1]).filter(u => !/^https?:/.test(u));
  const missing = wanted.filter(u => !sw.includes(`'./${u}'`));
  if (missing.length) { console.log('\n  not precached by sw.js: ' + missing.join(', ')); return false; }
  return `${wanted.length} files`;
}

// ─── US English ─────────────────────────────────────────
// The readers get their care in the US, so the English is American: spelling,
// idiom and units. These have all slipped in before.
const BRITISH = /\b(centre|colour\w*|favour\w*|behaviour\w*|labour\w*|anaemi\w*|haemo\w*|oedema|foetus|paediatr\w*|oestrogen|diarrhoea|gynaecolog\w*|caesarean|manoeuvre|grey|litres?|metres?|fibre|towards|travell\w*|whilst|amongst|programme|practise|ageing|judgement|mum|mums|nappy|nappies|paracetamol|in hospital|straight away|late on|a great deal|fortnight|counsell\w*|anaesth\w*|expiry|(?:organ|recogn|real|minim|emphas|apolog|summar|priorit|visual|stabil|steril|special)is(?:e|ed|es|ing|ation))\b/i;
function usEnglishGuard() {
  const src = fs.readFileSync(path.join(P.web, 'i18n', 'locale.en.js'), 'utf8');
  const bad = [];
  src.split('\n').forEach((line, i) => {
    if (/^\s*\/\//.test(line)) return;
    const m = BRITISH.exec(line);
    if (m) bad.push(`locale.en.js:${i + 1} "${m[0]}"`);
  });
  if (bad.length) { console.log('\n  British English: ' + bad.join(', ')); return false; }
  return 'no British spelling or idiom';
}

// ─── Stub DOM ───────────────────────────────────────────
// A Proxy that absorbs any property read, write or call, so top-level DOM code
// in the runtime files executes without a browser. Elements fetched by id are
// cached and remember what is written to them, which is how tool screens are
// captured (they render with el.innerHTML = `...`).
function stub(store = Object.create(null)) {
  const target = function () {};
  return new Proxy(target, {
    get(_, p) {
      if (p in store) return store[p];
      if (p === Symbol.toPrimitive) return () => '';
      if (p === Symbol.iterator) return function* () {};
      if (p === 'then') return undefined;               // not a thenable
      if (p === 'length') return 0;
      if (p === 'checked' || p === 'hidden' || p === 'disabled') return false;
      if (p === 'value' || p === 'textContent' || p === 'innerHTML') return '';
      return stub();
    },
    set(_, p, v) { store[p] = v; return true; },
    apply() { return stub(); },
    construct() { return stub(); },
  });
}

function makeContext() {
  const els = new Map();
  const byId = id => {
    if (!els.has(id)) { const s = Object.create(null); s.id = id; els.set(id, { store: s, el: stub(s) }); }
    return els.get(id).el;
  };
  const storage = new Map();
  const localStorage = {
    getItem: k => (storage.has(k) ? storage.get(k) : null),
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: k => storage.delete(k),
    clear: () => storage.clear(),
    key: i => [...storage.keys()][i] ?? null,
    get length() { return storage.size; },
  };
  const document = stub();
  const docStore = Object.create(null);
  const doc = new Proxy(document, {
    get(t, p) {
      if (p === 'getElementById') return byId;
      if (p in docStore) return docStore[p];
      return t[p];
    },
    set(_, p, v) { docStore[p] = v; return true; },
  });
  // Frozen clock: tools that print "today" must render identically every run.
  const FIXED = Date.UTC(2026, 0, 15, 12, 0, 0);
  class FixedDate extends Date {
    constructor(...a) { if (a.length) super(...a); else super(FIXED); }
    static now() { return FIXED; }
  }
  const sandbox = {
    console: { log() {}, warn() {}, error() {}, info() {} },
    document: doc, localStorage, sessionStorage: localStorage,
    navigator: { languages: ['en'], language: 'en', onLine: true, serviceWorker: stub(), clipboard: stub() },
    location: { search: '', hash: '', href: 'http://localhost/', origin: 'http://localhost', pathname: '/' },
    history: stub(), matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }),
    setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    requestAnimationFrame: () => 0, fetch: () => new Promise(() => {}),
    URLSearchParams, TextEncoder, Intl, Date: FixedDate, Math, JSON, Promise,
    Blob: function () {}, FileReader: function () {}, URL: { createObjectURL: () => '', revokeObjectURL() {} },
    alert() {}, confirm: () => false, prompt: () => null,
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.addEventListener = () => {};
  sandbox.removeEventListener = () => {};
  const ctx = vm.createContext(sandbox);
  return { ctx, els, storage };
}

function load(ctx, rel) {
  const file = path.join(P.web, rel);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: rel });
}

// Script order mirrors index.html. Reading it from there means a new script
// tag is picked up automatically instead of silently going unchecked.
function scriptOrder() {
  const html = fs.readFileSync(path.join(P.web, 'index.html'), 'utf8');
  return [...html.matchAll(/<script[^>]*\ssrc="\.?\/?([^"?]+)(?:\?[^"]*)?"/g)].map(m => m[1]);
}
function localeCodes() {
  return fs.readdirSync(path.join(P.web, 'i18n'))
    .map(f => (f.match(/^locale\.([A-Za-z-]+)\.js$/) || [])[1]).filter(Boolean)
    .sort((a, b) => (a === 'en' ? -1 : b === 'en' ? 1 : a.localeCompare(b)));
}

async function render() {
  const { ctx, els, storage } = makeContext();
  const order = scriptOrder();
  const langs = localeCodes();
  // Locales are injected by I18n.boot() at runtime; here they load up front,
  // straight after i18n.js, so every one is available synchronously.
  for (const rel of order) {
    load(ctx, rel);
    if (/i18n\/i18n\.js$/.test(rel)) langs.forEach(l => load(ctx, `i18n/locale.${l}.js`));
    // The mood tool loads its questionnaires on demand; here they load up front
    // so every form is rendered and checked.
    if (/i18n\/i18n\.js$/.test(rel)) fs.readdirSync(path.join(P.web, 'i18n', 'epds')).filter(f => f.endsWith('.js')).forEach(f => load(ctx, `i18n/epds/${f}`));
  }
  const run = code => vm.runInContext(code, ctx);
  const sections = run('Object.keys(CONTENT_STRUCTURE)');
  const toolIds = run('Object.keys(TOOL_INITS)').sort();
  const uiKeys = [];
  (function walk(o, pre) {
    for (const [k, v] of Object.entries(o || {})) {
      const key = pre ? pre + '.' + k : k;
      if (v && typeof v === 'object') walk(v, key); else uiKeys.push(key);
    }
  })(run('MYOB_LOCALES.en.ui'), '');

  const out = {};
  const problems = [];
  for (const lang of langs) {
    await run(`I18n.setLocale(${JSON.stringify(lang)}, { notify: false })`);
    if (run('I18n.lang') !== lang) { problems.push(`${lang}: setLocale refused`); continue; }
    const snap = { cards: {}, ui: {}, tools: {} };
    for (const sec of sections) {
      for (const c of run(`getCards(${JSON.stringify(sec)})`)) {
        snap.cards[`${sec}/${c.id}`] = { title: c.title, sub: c.sub, body: c.body };
        const blob = c.title + c.sub + c.body;
        if (/\{\{\w+\}\}/.test(blob)) problems.push(`${lang} ${c.id}: unfilled {{slot}}`);
        if (/\bundefined\b/.test(blob)) problems.push(`${lang} ${c.id}: "undefined" in output`);
        if (!c.body) problems.push(`${lang} ${c.id}: empty body`);
      }
    }
    for (const k of uiKeys) {
      const v = run(`I18n.t(${JSON.stringify(k)})`);
      snap.ui[k] = v;
    }
    for (const id of toolIds) {
      storage.clear();
      storage.set('myob.lang', lang);
      els.clear();
      try { run(`TOOL_INITS[${JSON.stringify(id)}]()`); }
      catch (e) { problems.push(`${lang} ${id}: threw ${e.message}`); continue; }
      const written = {};
      for (const [eid, { store }] of els) {
        if (typeof store.innerHTML === 'string' && store.innerHTML) written[eid] = store.innerHTML;
      }
      snap.tools[id] = written;
    }
    out[lang] = snap;
  }
  return { out, problems, langs, cards: Object.keys(out.en.cards).length, tools: toolIds.length };
}

function writeSnap(dir, out) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  for (const [lang, snap] of Object.entries(out)) {
    fs.writeFileSync(path.join(dir, lang + '.json'), JSON.stringify(snap, null, 1));
  }
}

function compare(baseDir, out) {
  if (!fs.existsSync(baseDir)) throw new Error('no baseline: run with --baseline first');
  const diffs = [];
  const langs = new Set([...fs.readdirSync(baseDir).map(f => f.replace(/\.json$/, '')), ...Object.keys(out)]);
  for (const lang of langs) {
    const f = path.join(baseDir, lang + '.json');
    const a = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
    const b = out[lang] || null;
    if (!a || !b) { diffs.push(`${lang}: ${a ? 'missing now' : 'new locale'}`); continue; }
    for (const kind of ['cards', 'ui', 'tools']) {
      const keys = new Set([...Object.keys(a[kind]), ...Object.keys(b[kind])]);
      for (const k of keys) {
        const x = JSON.stringify(a[kind][k]), y = JSON.stringify(b[kind][k]);
        if (x !== y) diffs.push(`${lang} ${kind} ${k}` + (x === undefined ? ' (added)' : y === undefined ? ' (removed)' : ''));
      }
    }
  }
  return diffs;
}

// ─── Unit tokens ────────────────────────────────────────
// A measured value is written as a token ({temp:100.4}, {vol:4-6}, {wt:12},
// {lb:25-35}) so it can be drawn in US or metric units. English may not spell
// one out bare, and every translation must carry exactly the tokens its English
// has: a dropped or altered token would show her the wrong number, or a number
// that no longer follows her unit setting.
function unitTokenGuard() {
  const { readLocale } = require(path.join(ROOT, 'translation', 'hash.js'));
  const TOK = /\{(?:temp|vol|wt|lb):[\d.]+(?:-[\d.]+)?(?:=[\d.]+(?:-[\d.]+)?)?\}/g;
  const BARE = /\d\s?°\s?[FC]\b|°F|\d\s?(?:oz|ounces?|lbs?|pounds?)\b/;
  const toks = s => (String(s).match(TOK) || []).sort().join(' ');
  const flat = (o, pre, out) => {
    if (typeof o === 'string') out[pre] = o;
    else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) flat(v, pre ? pre + '.' + k : k, out);
    return out;
  };
  const dir = path.join(P.web, 'i18n');
  const en = flat({ ui: readLocale(fs, path.join(dir, 'locale.en.js'), 'en').obj.ui,
                    content: readLocale(fs, path.join(dir, 'locale.en.js'), 'en').obj.content }, '', {});
  const bad = [];
  for (const [k, v] of Object.entries(en)) {
    if (BARE.test(v.replace(TOK, ''))) bad.push(`en ${k}: bare unit value, use a token`);
  }
  for (const f of fs.readdirSync(dir)) {
    const m = /^locale\.(.+)\.js$/.exec(f);
    if (!m || m[1] === 'en') continue;
    const o = readLocale(fs, path.join(dir, f), m[1]).obj;
    const mine = flat({ ui: o.ui || {}, content: o.content || {} }, '', {});
    for (const [k, v] of Object.entries(mine)) {
      if (!v || !(k in en)) continue;
      if (toks(v) !== toks(en[k])) bad.push(`${m[1]} ${k}: tokens "${toks(v)}" but English has "${toks(en[k])}"`);
    }
  }
  if (bad.length) { console.log('\n  ' + bad.slice(0, 30).join('\n  ')); return false; }
  return 'every measured value is a token, in every locale';
}

(async () => {
  step('locale lint', () => runNode('lint-locales.js'));
  step('translation fingerprints', () => runNode('stamp.js', 'verify'));
  step('card slot ids', slotGuard);
  step('index.html assets precached', precacheGuard);
  step('US English', usEnglishGuard);
  step('unit tokens', unitTokenGuard);
  let result;
  process.stdout.write('• render every card, ui string and tool in every locale ... ');
  try {
    result = await render();
    if (result.problems.length) {
      failed = true;
      console.log(`FAIL\n  ${result.problems.slice(0, 40).join('\n  ')}` +
        (result.problems.length > 40 ? `\n  ...and ${result.problems.length - 40} more` : ''));
    } else {
      console.log(`ok  ${result.langs.length} locales × ${result.cards} cards, ${result.tools} tools`);
    }
  } catch (e) {
    failed = true;
    console.log('FAIL\n  ' + String(e.stack || e).split('\n').slice(0, 8).join('\n  '));
  }
  if (result) {
    writeSnap(path.join(SNAP, 'current'), result.out);
    if (args.has('--baseline')) {
      writeSnap(path.join(SNAP, 'baseline'), result.out);
      console.log('• baseline saved to scripts/.snapshots/baseline');
    }
    if (args.has('--compare')) {
      const diffs = compare(path.join(SNAP, 'baseline'), result.out);
      fs.writeFileSync(path.join(SNAP, 'diff.txt'), diffs.join('\n') + '\n');
      if (diffs.length) {
        failed = true;
        console.log(`• compare to baseline ... ${diffs.length} difference(s)\n  ` +
          diffs.slice(0, 60).join('\n  ') + (diffs.length > 60 ? `\n  ...and ${diffs.length - 60} more (full list: scripts/.snapshots/diff.txt)` : ''));
      } else console.log('• compare to baseline ... identical');
    }
  }
  process.exit(failed ? 1 : 0);
})();
