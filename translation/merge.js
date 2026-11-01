#!/usr/bin/env node
// Merges validated batches into i18n/locale.<lang>.js.
//
//   node translation/merge.js           # every language with valid output
//   node translation/merge.js es fr
//   node translation/merge.js --keys <tag> [lang ...]   # key-list batches only
//
// Refuses to merge a language with any failing batch — a half-merged locale is
// harder to reason about than an untranslated one, and the English fallback
// means an untranslated locale is already perfectly usable.

const fs = require('fs');
const path = require('path');
const { flattenContent, readLocale, writeLocale } = require('./hash.js');
const { parseBatch, localeRef, expectPath, setSlot } = require('./batch.js');
const { execFileSync } = require('child_process');

const T = __dirname;
const ROOT = path.join(T, '..');
const OUT = path.join(T, 'out');

const want = process.argv.slice(2);
if (want[0] === '--keys') { mergeKeys(want.slice(1)); process.exit(0); }

// ─── Key-list batches ───────────────────────────────────
// Patched into the locale in place: every key the batch does not name, the
// epds block, reviewed/translationStatus and the file header stay exactly as
// they are. Content sentences are stamped with the fingerprint of the English
// the prompt was written from (kept in the .expect.json), so if English moved
// again since, stamp.js report shows them stale rather than certifying them.
function mergeKeys([tag, ...langs]) {
  if (!tag) { console.error('usage: node translation/merge.js --keys <tag> [lang ...]'); process.exit(2); }
  const batches = (fs.existsSync(OUT) ? fs.readdirSync(OUT) : [])
    .map(f => ({ f, b: parseBatch(f) }))
    .filter(({ b }) => b && b.kind === 'keys' && b.tag === tag && (!langs.length || langs.includes(b.lang)));
  if (!batches.length) { console.log(`no translation/out/*.keys.${tag}.json to merge`); return; }

  for (const { f, b: { lang } } of batches) {
    const file = path.join(OUT, f);
    try {
      execFileSync('node', [path.join(T, 'validate.js'), file], { stdio: 'pipe' });
    } catch (e) {
      console.log(`✗ ${lang}: skipped, fails validation. Run: node translation/validate.js translation/out/${f}`);
      continue;
    }
    const man = JSON.parse(fs.readFileSync(expectPath(lang, tag), 'utf8'));
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const localeFile = path.join(ROOT, `public/i18n/locale.${lang}.js`);
    const parsed = readLocale(fs, localeFile, lang);
    // A draft batch (prepare.js --draft) may fill a card this locale does not
    // have yet: it is created with every sentence blank, which reads as English
    // slot by slot, then the drafted ones are written in.
    try {
      for (const [k, v] of Object.entries(data)) {
        if (man.draft) ensureCard(parsed.obj, k);
        setSlot(parsed.obj, k, v);
      }
    } catch (e) {
      console.log(`✗ ${lang}: skipped, nothing written. ${e.message}`);
      continue;
    }
    const stamps = Object.keys(man.srcHash || {}).length;
    if (stamps) parsed.obj.srcHash = Object.assign(parsed.obj.srcHash || {}, man.srcHash);
    // Machine drafts are marked, keyed like /api/suggest keys (bare ui path,
    // content.<id>.…), so the Translate page puts them in front of a
    // translator. The review app clears a mark when a person has checked it.
    if (man.draft) {
      const marks = parsed.obj.unreviewed || {};
      for (const k of Object.keys(data)) marks[k.replace(/^ui\./, '')] = 1;
      parsed.obj.unreviewed = marks;
    }
    writeLocale(fs, localeFile, parsed);
    const nUi = Object.keys(data).filter(k => k.startsWith('ui.')).length;
    console.log(`✓ ${lang}: ${nUi} ui, ${Object.keys(data).length - nUi} content (${stamps} stamped) -> public/i18n/locale.${lang}.js`);
  }
  console.log('\nThen: node scripts/check.js --compare, and node scripts/bump.js before pushing.');
}

function ensureCard(obj, key) {
  const m = /^content\.([^.]+)\./.exec(key);
  if (!m || (obj.content && obj.content[m[1]])) return;
  const en = EN().content[m[1]];
  if (!en) throw new Error(`${key}: no such card in English`);
  (obj.content ||= {})[m[1]] = { title: '', sub: '', t: (en.t || []).map(() => '') };
}
var _en = null;   // var, not let: mergeKeys() runs before this line is reached
function EN() { return _en || (_en = readLocale(fs, path.join(ROOT, 'public/i18n/locale.en.js'), 'en').obj); }

const files = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter(f => f.endsWith('.json')) : [];
if (!files.length) { console.log('translation/out/ is empty — run run-kimi.sh first'); process.exit(0); }

const byLang = {};
for (const f of files) {
  const b = parseBatch(f);
  if (!b) { if (!f.startsWith('_')) console.log(`  ignored ${f}: not <locale>.ui|content.<n>.json or <locale>.keys.<tag>.json for a locale in worker/index.js LOCALES`); continue; }
  const { lang, kind } = b;
  if (kind === 'keys') continue;   // merge.js --keys <tag>
  if (want.length && !want.includes(lang)) continue;
  (byLang[lang] ||= { ui: [], content: [] })[kind].push(f);
}

// Rebuild a nested object from dot-notation keys.
function nest(flat) {
  const out = {};
  for (const [k, v] of Object.entries(flat)) {
    const parts = k.split('.');
    let d = out;
    for (const p of parts.slice(0, -1)) d = (d[p] ||= {});
    d[parts[parts.length - 1]] = v;
  }
  return out;
}

for (const [lang, groups] of Object.entries(byLang)) {
  const all = [...groups.ui, ...groups.content].map(f => path.join(OUT, f));
  try {
    execFileSync('node', [path.join(T, 'validate.js'), ...all], { stdio: 'pipe' });
  } catch (e) {
    console.log(`✗ ${lang}: skipped — some batches fail validation. Run:`);
    console.log(`    node translation/validate.js translation/out/${lang}.*.json`);
    continue;
  }

  const uiFlat = {}, content = {};
  groups.ui.forEach(f => Object.assign(uiFlat, JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'))));
  groups.content.forEach(f => Object.assign(content, JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'))));

  const localeFile = path.join(ROOT, `public/i18n/locale.${lang}.js`);

  // Preserve any hand-written epds block: it is an officially validated
  // instrument and never comes from this pipeline. Same for the srcHash map
  // and any existing content: this file rewrites the locale wholesale, so
  // anything not carried across here is destroyed.
  let existingEpds = null, existingHashes = null, existingContent = null;
  if (fs.existsSync(localeFile)) {
    global.window = { MYOB_LOCALES: {} };
    delete require.cache[require.resolve(localeFile)];
    try {
      require(localeFile);
      const prev = global.window.MYOB_LOCALES[lang] || {};
      existingEpds = prev.epds || null;
      existingHashes = prev.srcHash || null;
      existingContent = prev.content || null;
    } catch (e) {}
  }

  const obj = {
    // Still false: machine translation, not clinician-reviewed. Set to true by
    // hand only after a clinician has read this language's content.
    reviewed: false,
    translationStatus: 'machine',
    ui: nest(uiFlat),
  };
  // Running with only ui batches present must not silently drop the guide.
  if (Object.keys(content).length) obj.content = content;
  else if (existingContent) obj.content = existingContent;
  if (existingEpds) obj.epds = existingEpds;

  // Fingerprint whatever this run actually translated, using the English
  // SNAPSHOT the prompts were generated from, not live English. If English
  // moved between prepare and merge, hashing live English here would certify
  // a translation of the older text as current, which is exactly the silent
  // divergence the map exists to catch. Keys this run did not touch keep the
  // fingerprint they already had.
  const hashes = Object.assign({}, existingHashes || {});
  if (Object.keys(content).length) {
    const snapPath = path.join(__dirname, 'source/srcHash.en.json');
    if (!fs.existsSync(snapPath)) {
      console.error('missing translation/source/srcHash.en.json — run: node translation/snapshot.js');
      process.exit(1);
    }
    const snap = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
    for (const key of Object.keys(flattenContent(obj))) {
      if (snap[key]) hashes[key] = snap[key];
    }
  }
  if (Object.keys(hashes).length) obj.srcHash = hashes;

  fs.writeFileSync(localeFile,
`// ═══════════════════════════════════════════════════════
// LOCALE: ${lang}
// ═══════════════════════════════════════════════════════
// MACHINE TRANSLATED — generated by translation/run-kimi.sh and merged by
// translation/merge.js. Not yet reviewed by a clinician.
//
// reviewed:false drives the machine-translation notice shown to the patient.
// Do NOT flip it to true until someone qualified has read this content.
//
// Any key omitted here falls back to English at runtime.
//
// ${existingEpds ? 'An epds block is present and was preserved.' : 'No `epds` block: the Edinburgh scale is gated off for this language.'}
// Never machine-translate the EPDS — see TRANSLATING.md.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

${localeRef(lang)} = ${JSON.stringify(obj, null, 2)};
`);

  const uiCount = Object.keys(uiFlat).length;
  console.log(`✓ ${lang}: ${uiCount} ui strings, ${Object.keys(content).length} cards -> public/i18n/locale.${lang}.js`);
}

console.log('\nAfter merging, bump the cache version so users get the update:');
console.log('  node scripts/bump.js (sw.js CACHE_NAME, index.html ?v=, i18n.js ASSET_VERSION)');
