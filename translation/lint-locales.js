#!/usr/bin/env node
// Lints the SHIPPED locale files for foreign-script leakage.
//
//   node translation/lint-locales.js
//
// translation/validate.js only sees batches coming out of the translation
// pipeline. Strings added by hand go straight into i18n/locale.*.js and skip
// it entirely — which is exactly how a stray CJK character ended up inside a
// Russian sentence twice. This closes that path.

const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'i18n');

const FOREIGN = {
  ru:  { re: /[一-鿿가-힯؀-ۿ]/, label: 'CJK/Hangul/Arabic' },
  zh:  { re: /[Ѐ-ӿ가-힯؀-ۿ]/, label: 'Cyrillic/Hangul/Arabic' },
  ko:  { re: /[Ѐ-ӿ؀-ۿ]/,              label: 'Cyrillic/Arabic' },
  ar:  { re: /[Ѐ-ӿ一-鿿가-힯]/, label: 'Cyrillic/CJK/Hangul' },
  es:  { re: /[Ѐ-ӿ一-鿿가-힯؀-ۿ]/, label: 'non-Latin' },
  fr:  { re: /[Ѐ-ӿ一-鿿가-힯؀-ۿ]/, label: 'non-Latin' },
  en:  { re: /[Ѐ-ӿ一-鿿가-힯؀-ۿ]/, label: 'non-Latin' },
  zom: { re: /[Ѐ-ӿ一-鿿가-힯؀-ۿ]/, label: 'non-Latin' },
};

// Language names shown in the picker are legitimately in their own script.
const EXEMPT = /^(lang|app)\.|native|LOCALES/;

// Latin embedded INSIDE a CJK word. A blanket ban is wrong (B6, PKU, GBS, P6
// are all legitimate), but Latin flanked by Han/Kana/Hangul on both sides with
// no separator is almost always a word that slipped through untranslated.
// This is how "凉water果" survived the script check, which only looks for
// Cyrillic, Hangul and Arabic inside Chinese.
const CJK_CHAR = '[\\u3040-\\u30FF\\u4E00-\\u9FFF\\uAC00-\\uD7AF]';
const EMBEDDED_LATIN = new RegExp(CJK_CHAR + '[A-Za-z]{2,}' + CJK_CHAR);

let problems = 0;
for (const file of fs.readdirSync(DIR).filter(f => /^locale\.[a-z]{2,3}(?:-[A-Za-z]{2,4})?\.js$/.test(f))) {
  const lang = file.match(/^locale\.([a-z]{2,3}(?:-[A-Za-z]{2,4})?)\.js$/)[1];
  const rule = FOREIGN[lang];
  if (!rule) continue;
  global.window = { MYOB_LOCALES: {} };
  delete require.cache[require.resolve(path.join(DIR, file))];
  require(path.join(DIR, file));
  const L = global.window.MYOB_LOCALES[lang];
  const hits = [];
  (function walk(o, pre) {
    for (const [k, v] of Object.entries(o || {})) {
      const key = pre ? pre + '.' + k : k;
      if (v && typeof v === 'object') { walk(v, key); continue; }
      if (typeof v !== 'string' || EXEMPT.test(key)) continue;
      if (rule.re.test(v)) hits.push(`${key}: ${v.slice(0, 60)}`);
      else if (['zh', 'ja', 'ko'].includes(lang) && EMBEDDED_LATIN.test(v))
        hits.push(`${key}: Latin embedded mid-word: ${v.slice(0, 60)}`);
    }
  })(L.ui, '');
  // Content too. This walked ui only, so the guide itself, which is most of
  // the words, was never checked.
  (function walk(o, pre) {
    for (const [k, v] of Object.entries(o || {})) {
      const key = pre ? pre + '.' + k : k;
      if (v && typeof v === 'object') { walk(v, key); continue; }
      if (typeof v !== 'string' || EXEMPT.test(key)) continue;
      if (rule.re.test(v)) hits.push(`${key}: ${v.slice(0, 60)}`);
      else if (['zh', 'ja', 'ko'].includes(lang) && EMBEDDED_LATIN.test(v))
        hits.push(`${key}: Latin embedded mid-word: ${v.slice(0, 60)}`);
    }
  })(L.content, 'content');
  if (hits.length) {
    problems++;
    console.log(`✗ ${lang}: ${hits.length} string(s) with ${rule.label} characters`);
    hits.slice(0, 8).forEach(h => console.log('    ' + h));
  } else {
    console.log(`✓ ${lang}`);
  }
}
console.log(problems ? `\n${problems} locale(s) with leakage` : '\nNo foreign-script leakage.');

// ─── Fingerprint implementations must not drift ─────────
// srcHashOf exists three times: translation/hash.js, content.js (the render
// path cannot require()) and review/server.py. If they disagree, accepted
// suggestions get fingerprints the app will never match and read as
// permanently stale. Re-run the shared vectors through every copy.
const { srcHashOf, SRC_HASH_VECTORS, checkVectors } = require('./hash.js');
let hashProblems = 0;

const canonBad = checkVectors(srcHashOf);
if (canonBad.length) {
  hashProblems++;
  console.log(`\n✗ translation/hash.js: ${canonBad.length} vector(s) wrong`);
}

// Extract and run content.js's copy without executing the whole file.
const contentSrc = fs.readFileSync(path.join(DIR, '..', 'content.js'), 'utf8');
const m = contentSrc.match(/function srcHashOf\(s\) \{[\s\S]*?\n\}/);
if (!m) {
  hashProblems++;
  console.log('\n✗ content.js: srcHashOf not found');
} else {
  const mirror = new Function(m[0] + '; return srcHashOf;')();
  const bad = checkVectors(mirror);
  if (bad.length) {
    hashProblems++;
    console.log(`\n✗ content.js srcHashOf disagrees on ${bad.length} vector(s)`);
    bad.slice(0, 3).forEach(b => console.log(`    ${JSON.stringify(b.input)}: got ${b.got}, want ${b.want}`));
  }
}

// review/server.py refuses to start on a mismatch, so just confirm the
// vectors it asserts are the same ones.
const pySrc = fs.readFileSync(path.join(DIR, '..', 'review', 'server.py'), 'utf8');
for (const [input, want] of SRC_HASH_VECTORS) {
  if (input === '' || input.length > 20) continue;      // long/empty are awkward to grep
  if (!pySrc.includes(want)) {
    hashProblems++;
    console.log(`\n✗ review/server.py is missing vector ${JSON.stringify(input)} -> ${want}`);
    break;
  }
}

if (!hashProblems) console.log('Fingerprint implementations agree (hash.js, content.js, server.py).');

process.exit(problems || hashProblems ? 1 : 0);
