// ═══════════════════════════════════════════════════════
// BATCH NAMES: which files in translation/out/ are batches, for which locale
// ═══════════════════════════════════════════════════════
// validate.js and merge.js both decide what a file is from its name. They used
// to do it with /^[a-z]{2,3}\./, which silently skipped every pt-BR batch. The
// locale list now comes from the worker, the one place that already has to
// list every code a reader can send a suggestion for.
//
//   <lang>.ui.<n>.json        full-pipeline ui batch n        (prepare.js)
//   <lang>.content.<n>.json   full-pipeline content batch n   (prepare.js)
//   <lang>.keys.<tag>.json    key-list batch                  (prepare.js --keys)
//
// A key-list batch is flat, keyed the way stamp.js and the Translation Helper
// name things: "ui.<dot.key>", "content.<card>.title|sub", "content.<card>.t.<n>".
// Its expected keys, their English and their fingerprints are fixed at prepare
// time in translation/prompts/<lang>.keys.<tag>.expect.json.

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let cached = null;

function workerLocales() {
  if (cached) return cached;
  const src = fs.readFileSync(path.join(ROOT, 'worker/index.js'), 'utf8');
  const m = /const LOCALES = \[([^\]]*)\]/.exec(src);
  if (!m) throw new Error('worker/index.js: const LOCALES = [...] not found');
  cached = [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
  return cached;
}

// → { lang, kind: 'ui'|'content', n } | { lang, kind: 'keys', tag } | null
function parseBatch(file) {
  const base = path.basename(file);
  const m = /^(.+)\.(ui|content)\.(\d+)\.json$/.exec(base) || /^(.+)\.(keys)\.([\w-]+)\.json$/.exec(base);
  if (!m || !workerLocales().includes(m[1])) return null;
  return m[2] === 'keys'
    ? { lang: m[1], kind: 'keys', tag: m[3] }
    : { lang: m[1], kind: m[2], n: parseInt(m[3], 10) };
}

const expectPath = (lang, tag) => path.join(__dirname, 'prompts', `${lang}.keys.${tag}.expect.json`);

// English for a flat key, from the translation/source snapshot. undefined for
// anything that is not a translatable slot: unknown keys, blanked sentences,
// and the EPDS, which is never machine-translated.
function englishOf(key, ui, content) {
  let m;
  if ((m = /^ui\.(.+)$/.exec(key))) {
    if (/^epds\b/.test(m[1]) || !Object.prototype.hasOwnProperty.call(ui, m[1])) return undefined;
    return ui[m[1]] === '' ? undefined : ui[m[1]];
  }
  if ((m = /^content\.(.+)\.(title|sub)$/.exec(key))) {
    const c = content[m[1]]; return c && c[m[2]] ? c[m[2]] : undefined;
  }
  if ((m = /^content\.(.+)\.t\.(\d+)$/.exec(key))) {
    const c = content[m[1]]; return c && c.t && c.t[+m[2]] ? c.t[+m[2]] : undefined;
  }
  return undefined;
}

// Where a flat key lives in a parsed locale object.
//   slot: the place exists (ui always; content only inside a card the locale has)
//   text: what the locale currently says there, or undefined
function slotOf(obj, key) {
  let m;
  if ((m = /^ui\.(.+)$/.exec(key))) {
    let d = obj.ui;
    for (const p of m[1].split('.')) d = d && typeof d === 'object' ? d[p] : undefined;
    return { slot: true, text: d === '' ? undefined : d };
  }
  if ((m = /^content\.(.+)\.(title|sub)$/.exec(key))) {
    const c = (obj.content || {})[m[1]];
    return { slot: !!c, text: c && c[m[2]] ? c[m[2]] : undefined };
  }
  if ((m = /^content\.(.+)\.t\.(\d+)$/.exec(key))) {
    const c = (obj.content || {})[m[1]], i = +m[2];
    return { slot: !!(c && c.t && i < c.t.length), text: c && c.t && c.t[i] ? c.t[i] : undefined };
  }
  return { slot: false, text: undefined };
}

// Write one flat key into a parsed locale object. Throws rather than create a
// content slot the locale does not have: a sparse t array shifts nothing, but a
// card invented here would carry only the patched sentences.
function setSlot(obj, key, value) {
  let m;
  if ((m = /^ui\.(.+)$/.exec(key))) {
    const parts = m[1].split('.');
    let d = (obj.ui ||= {});
    for (const p of parts.slice(0, -1)) {
      if (d[p] === undefined) d[p] = {};
      else if (typeof d[p] !== 'object') throw new Error(`${key}: ui.${p} is a string, not a group`);
      d = d[p];
    }
    d[parts[parts.length - 1]] = value;
    return;
  }
  if (!slotOf(obj, key).slot) throw new Error(`${key}: this locale has no such card or sentence`);
  if ((m = /^content\.(.+)\.(title|sub)$/.exec(key))) { obj.content[m[1]][m[2]] = value; return; }
  m = /^content\.(.+)\.t\.(\d+)$/.exec(key);
  obj.content[m[1]].t[+m[2]] = value;
}

// `window.MYOB_LOCALES.es` but `window.MYOB_LOCALES["pt-BR"]`.
const localeRef = lang => /^[A-Za-z_$][\w$]*$/.test(lang)
  ? `window.MYOB_LOCALES.${lang}` : `window.MYOB_LOCALES[${JSON.stringify(lang)}]`;

module.exports = { workerLocales, parseBatch, localeRef, expectPath, englishOf, slotOf, setSlot };
