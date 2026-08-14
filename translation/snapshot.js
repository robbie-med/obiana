#!/usr/bin/env node
// ═══════════════════════════════════════════════════════
// SNAPSHOT — regenerate the translation pipeline's English input
// ═══════════════════════════════════════════════════════
//   node translation/snapshot.js
//
// translation/source/*.json is what prepare.js hands to the model and what
// validate.js checks the results against. It is NOT generated from anywhere:
// it was hand-maintained, and it fell behind.
//
// How far behind mattered. The snapshot still held 45 cards shaped
// { title, sub, body } with body as an HTML blob, from before card bodies were
// split into per-sentence keys. The live English has 55 cards shaped
// { title, sub, t: [...] }. Running merge.js against the old snapshot would
// have written body-shaped cards into es, fr and ko, and because cardBody()
// reads card.t, every one of the 700+ slots would have fallen back to English.
// Three complete translations destroyed by one command, with no error, and the
// app still rendering as though nothing had happened.
//
// Generating it from locale.en.js removes the drift by construction. Re-run it
// whenever English changes and commit the result, so a diff on source/ is the
// visible record that the translation input moved.

'use strict';
const fs = require('fs');
const path = require('path');
const { srcHashOf, flattenContent, readLocale } = require('./hash.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'source');

const en = readLocale(fs, path.join(ROOT, 'i18n/locale.en.js'), 'en').obj;

// ─── ui ─────────────────────────────────────────────────
// Flat dot-keyed, matching what translate-tool.js and the worker derive. A
// node whose children are all CLDR plural categories is kept whole, because
// prepare.js and validate.js both special-case plural objects.
const PLURAL = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);
function flattenUi(o, pre = '', out = {}) {
  for (const [k, v] of Object.entries(o || {})) {
    const key = pre ? pre + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const keys = Object.keys(v);
      if (keys.length && keys.every(x => PLURAL.has(x))) { out[key] = v; continue; }
      flattenUi(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}

const ui = flattenUi(en.ui);

// ─── content ────────────────────────────────────────────
// Card-shaped, not flattened. merge.js assigns content batches straight into
// obj.content, and its nest() builds objects rather than arrays, so a flat
// "content.<id>.t.0" key would become { t: { "0": ... } } and break
// flattenLocale's card.t.forEach. Keeping batches card-shaped avoids that
// entirely.
const content = {};
for (const [id, card] of Object.entries(en.content)) {
  content[id] = { title: card.title, sub: card.sub || '', t: (card.t || []).slice() };
}

// ─── fingerprints ───────────────────────────────────────
// The English each batch was generated from, so merge.js can stamp what it
// merged against THIS snapshot rather than against whatever English happens to
// be on disk when the merge runs. If English moved in between, stamping live
// English would certify a translation of text that no longer exists.
const srcHash = {};
for (const [k, v] of Object.entries(flattenContent(en))) srcHash[k] = srcHashOf(v);

fs.mkdirSync(OUT, { recursive: true });
const write = (name, obj) => {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 2) + '\n');
  return Object.keys(obj).length;
};

const nUi = write('ui.en.json', ui);
const nContent = write('content.en.json', content);
const nHash = write('srcHash.en.json', srcHash);

const runs = Object.values(content).reduce((n, c) => n + c.t.length, 0);
console.log(`ui.en.json       ${nUi} keys`);
console.log(`content.en.json  ${nContent} cards, ${runs} sentences`);
console.log(`srcHash.en.json  ${nHash} fingerprints`);
