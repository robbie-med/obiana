#!/usr/bin/env node
// Validates one translated batch against its English source.
//
//   node translation/validate.js translation/out/es.ui.1.json
//   node translation/validate.js            # validate everything present
//
// Exit 0 = usable. Exit 1 = reject and re-run that batch.
//
// This exists because an LLM will happily return fluent text that has quietly
// dropped a key, mangled a {placeholder}, or unbalanced an HTML tag — none of
// which is visible by reading the translation, and all of which break the app.

const fs = require('fs');
const path = require('path');

const T = __dirname;
const ui = JSON.parse(fs.readFileSync(path.join(T, 'source/ui.en.json'), 'utf8'));
const content = JSON.parse(fs.readFileSync(path.join(T, 'source/content.en.json'), 'utf8'));

const PLURAL_CATS = ['zero', 'one', 'two', 'few', 'many', 'other'];

// Scripts that must NOT appear in a given language's output. A model (or a
// human working across several languages in one sitting) will occasionally
// drop a word of the wrong language into a string; it reads as fluent to
// anyone who does not know both scripts, so check mechanically.
const FOREIGN_SCRIPT = {
  ru:  { re: /[\u4E00-\u9FFF\uAC00-\uD7AF\u0600-\u06FF]/, label: 'CJK/Hangul/Arabic' },
  zh:  { re: /[\u0400-\u04FF\uAC00-\uD7AF\u0600-\u06FF]/, label: 'Cyrillic/Hangul/Arabic' },
  ko:  { re: /[\u0400-\u04FF\u0600-\u06FF]/,                label: 'Cyrillic/Arabic' },
  ar:  { re: /[\u0400-\u04FF\u4E00-\u9FFF\uAC00-\uD7AF]/, label: 'Cyrillic/CJK/Hangul' },
  es:  { re: /[\u0400-\u04FF\u4E00-\u9FFF\uAC00-\uD7AF\u0600-\u06FF]/, label: 'non-Latin' },
  fr:  { re: /[\u0400-\u04FF\u4E00-\u9FFF\uAC00-\uD7AF\u0600-\u06FF]/, label: 'non-Latin' },
  zom: { re: /[\u0400-\u04FF\u4E00-\u9FFF\uAC00-\uD7AF\u0600-\u06FF]/, label: 'non-Latin' },
};

const placeholders = s => (String(s).match(/\{(\w+)\}/g) || []).sort();
const tags = s => (String(s).match(/<\/?[a-zA-Z][^>]*>/g) || [])
  .map(t => t.replace(/\s+/g, ' ').toLowerCase()).sort();
const entities = s => (String(s).match(/&[a-zA-Z]+;|&#\d+;/g) || []).sort();

function compareString(key, en, tr, errs, warns, lang) {
  const foreign = lang && FOREIGN_SCRIPT[lang];
  if (foreign && typeof tr === 'string' && foreign.re.test(tr))
    errs.push(`${key}: ${foreign.label} characters leaked into ${lang} ("${String(tr).slice(0, 40)}")`);
  if (typeof tr !== 'string') { errs.push(`${key}: expected string, got ${typeof tr}`); return; }
  if (!tr.trim() && String(en).trim()) { errs.push(`${key}: empty translation`); return; }

  const pe = placeholders(en), pt = placeholders(tr);
  if (pe.join('|') !== pt.join('|'))
    errs.push(`${key}: placeholders changed  ${JSON.stringify(pe)} -> ${JSON.stringify(pt)}`);

  const te = tags(en), tt = tags(tr);
  if (te.join('|') !== tt.join('|'))
    errs.push(`${key}: HTML tags changed (${te.length} -> ${tt.length})`);

  const ee = entities(en), et = entities(tr);
  if (ee.join('|') !== et.join('|'))
    warns.push(`${key}: HTML entities changed ${JSON.stringify(ee)} -> ${JSON.stringify(et)}`);

  // Units and clinical abbreviations that must survive verbatim.
  for (const unit of ['°F', 'mg', ' cm', ' lb']) {
    const c = s => String(s).split(unit).length - 1;
    if (c(en) !== c(tr)) warns.push(`${key}: "${unit.trim()}" count ${c(en)} -> ${c(tr)}`);
  }
  for (const abbr of ['GBS','NIPT','ACOG','AAP','VBAC','Tdap','RhoGAM','BMI','NST','IOM','MFM','Rh']) {
    const re = new RegExp('\\b' + abbr + '\\b', 'g');
    if ((String(en).match(re) || []).length && !(String(tr).match(re) || []).length)
      warns.push(`${key}: lost abbreviation "${abbr}"`);
  }
  // Untranslated passthrough — fine for short/technical strings, suspicious for prose.
  if (en === tr && String(en).split(/\s+/).length > 6)
    warns.push(`${key}: identical to English (${String(en).slice(0, 40)}…)`);
}

function validateFile(file) {
  const base = path.basename(file);
  const m = base.match(/^([a-z]{2,3})\.(ui|content)\.(\d+)\.json$/);
  if (!m) return { file: base, errs: [`unrecognised filename`], warns: [] };
  const [, lang, kind] = m;

  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { return { file: base, errs: [`not valid JSON: ${e.message}`], warns: [] }; }

  const errs = [], warns = [];
  const source = kind === 'ui' ? ui : content;

  // Which source keys did this batch cover? Derived from the prompt's slice,
  // recomputed here so the check does not trust the model's key list.
  const SIZE = kind === 'ui' ? 80 : 6;
  const idx = parseInt(m[3], 10) - 1;
  const expected = Object.keys(source).slice(idx * SIZE, (idx + 1) * SIZE);
  const got = Object.keys(data);

  const missing = expected.filter(k => !got.includes(k));
  const extra = got.filter(k => !expected.includes(k));
  if (missing.length) errs.push(`missing ${missing.length} key(s): ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''}`);
  if (extra.length) errs.push(`unexpected ${extra.length} key(s): ${extra.slice(0, 5).join(', ')}${extra.length > 5 ? '…' : ''}`);

  for (const k of expected) {
    if (!(k in data)) continue;
    const en = source[k], tr = data[k];

    if (kind === 'content') {
      if (!tr || typeof tr !== 'object') { errs.push(`${k}: expected {title,sub,body}`); continue; }
      for (const f of ['title', 'sub', 'body']) {
        if (!(f in tr)) { errs.push(`${k}.${f}: missing`); continue; }
        if (f === 'sub' && !String(en.sub).trim()) continue;   // legitimately empty
        compareString(`${k}.${f}`, en[f], tr[f], errs, warns, lang);
      }
    } else if (en && typeof en === 'object') {
      // plural form: categories may legitimately differ from English
      if (!tr || typeof tr !== 'object') { errs.push(`${k}: expected plural object`); continue; }
      const cats = Object.keys(tr);
      if (!cats.length) errs.push(`${k}: no plural categories`);
      if (cats.some(c => !PLURAL_CATS.includes(c)))
        errs.push(`${k}: invalid plural category (${cats.join(',')})`);
      if (!cats.includes('other')) errs.push(`${k}: missing required "other" form`);
      for (const c of cats) compareString(`${k}.${c}`, en.other || en.one, tr[c], errs, warns, lang);
    } else {
      compareString(k, en, tr, errs, warns, lang);
    }
  }
  return { file: base, errs, warns };
}

const args = process.argv.slice(2);
const files = args.length
  ? args
  : fs.readdirSync(path.join(T, 'out')).filter(f => f.endsWith('.json')).map(f => path.join(T, 'out', f));

if (!files.length) { console.log('no output files to validate'); process.exit(0); }

let bad = 0, totalWarn = 0;
for (const f of files) {
  if (!fs.existsSync(f)) { console.log(`✗ ${path.basename(f)}: not found`); bad++; continue; }
  const r = validateFile(f);
  totalWarn += r.warns.length;
  if (r.errs.length) {
    bad++;
    console.log(`✗ ${r.file}`);
    r.errs.slice(0, 10).forEach(e => console.log(`    ERROR  ${e}`));
    if (r.errs.length > 10) console.log(`    … ${r.errs.length - 10} more errors`);
  } else {
    console.log(`✓ ${r.file}${r.warns.length ? `  (${r.warns.length} warning${r.warns.length > 1 ? 's' : ''})` : ''}`);
  }
  if (args.length === 1) r.warns.slice(0, 20).forEach(w => console.log(`    warn   ${w}`));
}

if (files.length > 1) {
  console.log(`\n${files.length - bad}/${files.length} batches valid, ${totalWarn} warnings total`);
  console.log('Warnings do not block merging — review them, they are usually');
  console.log('lost units or abbreviations worth fixing by hand.');
}
process.exit(bad ? 1 : 0);
