// ═══════════════════════════════════════════════════════
// SOURCE FINGERPRINTS
// ═══════════════════════════════════════════════════════
// A translated sentence is only as good as the English it was made from. When
// the English changes, the translation is not wrong-looking, it is silently
// out of date, and on clinical content that is the dangerous kind of wrong.
//
// So every non-English locale records, per key, a fingerprint of the English
// it was translated from. English itself records nothing and is hashed at
// runtime, which means the English side of the comparison can never be stale.
// Forget to run a tool and the app over-reports staleness (English shows
// through, which is safe) rather than under-reporting it (a stale translation
// keeps rendering, which is what we are fixing).
//
// This file is the JS source of truth. Two mirrors exist and MUST agree:
//   - content.js       srcHashOf()   the render path cannot require() this
//   - review/server.py src_hash()    the click-to-merge review app
// translation/lint-locales.js re-runs SRC_HASH_VECTORS through every copy, so
// a divergence fails the lint rather than quietly mis-stamping a locale.

'use strict';

// Two-lane FNV-1a over NFC-normalised UTF-8 bytes, 16 lowercase hex chars.
//
// UTF-8 is not incidental: it is the only representation JS (UTF-16, surrogate
// pairs) and Python 3 (unicode scalars) agree on byte for byte. Nothing here
// ever touches a code unit.
//
// NFC is not incidental either. An editor that saves a decomposed "café" or
// conjoining Hangul jamo would otherwise mark every affected sentence stale
// with no semantic change at all.
//
// Two 32-bit lanes rather than one 64-bit: Math.imul keeps the whole thing in
// Number space, so there is no BigInt allocation per byte and no async. The
// render path is synchronous, which also rules out crypto.subtle.digest.
function srcHashOf(s) {
  const bytes = new TextEncoder().encode(String(s).normalize('NFC'));
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  for (let i = 0; i < bytes.length; i++) {
    h1 = Math.imul(h1 ^ bytes[i], 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ bytes[i], 0x85ebca6b) >>> 0;
  }
  return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0');
}

// Deliberately spans the cases where the two implementations could drift:
// empty input, plain ASCII, Hangul, Arabic (RTL), Latin-1 supplement plus a
// punctuation dash, an astral-plane emoji with a skin-tone modifier (two
// surrogate pairs in JS, two scalars in Python), and both normalisation forms.
const SRC_HASH_VECTORS = [
  ['', '811c9dc501000193'],
  ['a', 'e40c292cefafc426'],
  ['Call your doctor.', '5a16f09f008281e1'],
  ['약을 드세요', '956d9382b1cdd1cc'],
  ['اتصلي بطبيبك', '5d77eeebe9f7d6dd'],
  ['About 1 in 3', '494265998e0538d7'],
  ['résumé — café', '7cfec620133bf2fe'],
  ['👶🏽 emoji', '8b4976d03bb3fbe6'],
  // NFC equivalence: composed and decomposed must agree.
  ['café', 'a82b5049454630df'],
  ['café', 'a82b5049454630df'],
  ['가', 'cdd08b156e569acb'],
  ['가', 'cdd08b156e569acb'],
];

function checkVectors(fn) {
  const bad = [];
  for (const [input, want] of SRC_HASH_VECTORS) {
    const got = fn(input);
    if (got !== want) bad.push({ input, want, got });
  }
  return bad;
}

// The canonical key enumerator. Every consumer that flattens guide content
// must produce these exact strings: translate-tool.js flattenLocale(), the
// worker's validKeys(), and review/server.py load_locale() all independently
// arrive at the same shape, and the fingerprint map is keyed by it too.
//
// Order is card order, then title, sub, runs. Empty title/sub are skipped
// (nothing to translate); runs are emitted unconditionally, including empty
// ones, so an index never shifts.
function flattenContent(locale) {
  const out = {};
  const content = (locale || {}).content || {};
  for (const [id, card] of Object.entries(content)) {
    for (const f of ['title', 'sub']) {
      if (typeof card[f] === 'string' && card[f] !== '') out['content.' + id + '.' + f] = card[f];
    }
    (card.t || []).forEach((run, i) => { out['content.' + id + '.t.' + i] = run; });
  }
  return out;
}

// Locale files are plain <script> tags, not modules, so they are read by
// slicing the JSON out of the assignment. The worker and the review server do
// the same thing; keeping it in one place here means the three cannot drift on
// the parsing rule either.
function readLocale(fs, path, lang) {
  const src = fs.readFileSync(path, 'utf8');
  const marker = new RegExp('window\\.MYOB_LOCALES(?:\\.' + lang.replace(/[-.]/g, '\\$&') +
                            '|\\["' + lang + '"\\])\\s*=');
  const m = marker.exec(src);
  if (!m) throw new Error('no assignment found in ' + path);
  const start = src.indexOf('{', m.index);
  const end = src.lastIndexOf('}');
  return { head: src.slice(0, m.index), marker: m[0], obj: JSON.parse(src.slice(start, end + 1)) };
}

// Byte-for-byte the format review/server.py writes, so whichever tool touched
// a locale last, the next diff stays clean.
function writeLocale(fs, path, parsed) {
  fs.writeFileSync(path, parsed.head + parsed.marker + ' ' +
    JSON.stringify(parsed.obj, null, 2) + ';\n');
}

module.exports = { srcHashOf, SRC_HASH_VECTORS, checkVectors, flattenContent, readLocale, writeLocale };
