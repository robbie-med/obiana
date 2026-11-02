#!/usr/bin/env node
// Generates one self-contained prompt file per (language, batch) plus a shell
// script that runs them all through kimi. Each prompt embeds its own input
// JSON and names its own output path, so a run is reproducible and a single
// failed batch can be re-run alone.
//
//   node translation/prepare.js
//   bash translation/run-kimi.sh          # all languages
//   bash translation/run-kimi.sh es fr    # just these
//
// Key-list mode re-translates named keys only (after an English correction):
//   node translation/prepare.js --keys <keyfile> [lang ...]
// run-kimi.sh --keys calls this for you; see translation/RUN.md.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const T = __dirname;

const LANGS = {
  es:  { name: 'Spanish',  native: 'Español'  },
  fr:  { name: 'French',   native: 'Français' },
  ko:  { name: 'Korean',   native: '한국어'    },
  ar:  { name: 'Arabic',   native: 'العربية'  },
  ru:  { name: 'Russian',  native: 'Русский'  },
  zh:  { name: 'Chinese (Simplified)', native: '中文' },
  zom: { name: 'Zomi (Tedim Chin)',    native: 'Zomi' },
};

// Key-list mode can target any locale the worker accepts, not only the seven
// the full pipeline drafts.
const NAMES = Object.assign({
  ja: { name: 'Japanese', native: '日本語' },
  tl: { name: 'Tagalog', native: 'Tagalog' },
  'pt-BR': { name: 'Portuguese (Brazil)', native: 'Português (Brasil)' },
  ps: { name: 'Pashto', native: 'پښتو' },
  prs: { name: 'Dari', native: 'دری' },
  vi: { name: 'Vietnamese', native: 'Tiếng Việt' },
  th: { name: 'Thai', native: 'ไทย' },
  de: { name: 'German', native: 'Deutsch' },
  pl: { name: 'Polish', native: 'Polski' },
}, LANGS);

// Batch sizes chosen so each prompt stays well inside a single model context
// and one bad batch is cheap to redo.
const UI_BATCH = 80;      // ~4 batches
const CONTENT_BATCH = 6;  // ~8 batches, roughly 900 words each

const ui = JSON.parse(fs.readFileSync(path.join(T, 'source/ui.en.json'), 'utf8'));
const content = JSON.parse(fs.readFileSync(path.join(T, 'source/content.en.json'), 'utf8'));

function chunk(entries, size) {
  const out = [];
  for (let i = 0; i < entries.length; i += size) out.push(entries.slice(i, i + size));
  return out;
}

// ─── Shared rules ───────────────────────────────────────
// These are the rules the validator actually enforces. Keep the two in sync.
function rules(code, meta) {
  const zomi = code === 'zom' ? `

## Zomi-specific

Zomi (Tedim Chin) is a low-resource language with little settled medical
vocabulary. Do NOT invent clinical terms. Where no established Zomi word
exists, keep the English term and add a short plain-language Zomi gloss in
parentheses — for example "epidural (na nate' damdawi)". A borrowed English
term a patient can ask their nurse about is far more useful than a coined word
nobody recognises. Prefer short, everyday sentences.` : '';

  return `You are translating patient-facing medical education content for a
pregnancy and childbirth guide, from English into ${meta.name} (${meta.native}).

The readers are pregnant patients receiving care **in the United States**.

## Absolute output contract

- Write ONLY a single JSON object to the output file named at the end of this prompt.
- No commentary, no markdown fences, no explanation — the file must parse with JSON.parse().
- The output object MUST have EXACTLY the same keys as the input object. Same
  number, same spelling, same order. Never add, drop, rename, split or merge a key.
- Translate only the VALUES.

## What must survive translation untouched

1. **Placeholders** like {count}, {q}, {n}, {total}, {langs}, {date}, {range}.
   Copy them character-for-character. Never translate the word inside the braces.
   They are replaced with live values at runtime.
   **Unit tokens** such as {temp:100.4}, {temp:102=39}, {vol:4-6}, {wt:12} and {lb:25-35} are
   measured values. Copy them exactly, number included, and never write the
   unit yourself (no °F, oz, mL, lbs): the app draws each token in the unit
   the reader chose.
2. **HTML tags** — <p>, <ul>, <li>, <h4>, <strong>, <em>, <br>, <table>, <tr>,
   <td>, <th>, and any class attributes such as <p class="lead"> or
   <div class="callout gold">. Keep the same tags in the same order and nesting.
   Translate only the text between them.
3. **HTML entities** — &amp; &gt; &lt; &nbsp; &#39; — leave exactly as-is.
4. **Numbers, units and measurements** — 10 cm, 140/90, 100.4°F, 200 mg, 8–12,
   weeks 4–14. Keep the numerals and the units. Do NOT convert °F to °C or lb to
   kg: these patients read US charts and hear US units from their care team.
5. **Clinical abbreviations** that a US care team will actually say out loud —
   GBS, NIPT, EPDS, IOM, ACOG, AAP, VBAC, L&D, MFM, Rh, Tdap, RhoGAM, BMI, NST.
   Keep the abbreviation; you may add a short gloss in the target language on
   first use inside that same string.

## What must NOT be adapted

Do not localise the medical guidance itself. This describes the US care model:
visit schedules, which screenings are offered and when, "call 911", US
insurance framing, ACOG/AAP/FDA recommendations. Translate the words. Do not
substitute another country's guidelines, phone numbers or care pathways, and do
not add or remove clinical advice.

## Register

Plain, warm, direct — as if speaking to a patient, not to a clinician. Aim for
roughly a 6th-grade reading level in the target language. Use the form of
address a clinic would use with an adult patient (formal "usted"/"vous"/"Вы"
where that language distinguishes). Keep sentences short.${zomi}

## Plural forms

A few values are objects with keys like {"one": "...", "other": "..."}. Replace
the KEY SET with the plural categories ${meta.name} actually uses (CLDR
categories: zero, one, two, few, many, other) and give the correct wording for
each. Keep the {count} placeholder in every form.
`;
}

if (process.argv[2] === '--keys') { prepareKeys(process.argv.slice(3)); process.exit(0); }

// ─── Key-list mode ──────────────────────────────────────
// One prompt per locale, holding only the named keys that locale has.
//   default            each locale that already has a translation of the key:
//                      a corrected English sentence is re-translated wherever
//                      the old wording is still being shown
//   explicit [lang …]  every named key that has a place in that locale, so a
//                      missing ui string can be drafted too; content sentences
//                      still need the card to exist there
function prepareKeys(argv) {
  const { readLocale, srcHashOf } = require('./hash.js');
  const { workerLocales, expectPath, englishOf, slotOf } = require('./batch.js');
  const die = msg => { console.error(msg); process.exit(1); };

  // --draft (NEXT.md §4): machine drafts for what is NOT translated yet. Only
  // keys missing in that locale, including whole cards it does not have;
  // nothing already there is touched. merge.js marks each one unreviewed.
  let [file, ...langArgs] = argv;
  const draft = langArgs[0] === '--draft';
  if (draft) langArgs = langArgs.slice(1);
  if (!file || !fs.existsSync(file)) die('usage: node translation/prepare.js --keys <keyfile> [lang ...]');
  const tag = path.basename(file).replace(/\.[^.]*$/, '');
  if (!/^[\w-]+$/.test(tag)) die(`key file name must be letters, digits, - or _ (it becomes the batch tag): ${tag}`);

  const keys = [...new Set(fs.readFileSync(file, 'utf8').split('\n')
    .map(l => l.replace(/#.*/, '').trim()).filter(Boolean))];
  if (!keys.length) die(`${file}: no keys`);
  const english = {}, bad = [];
  for (const k of keys) {
    const en = englishOf(k, ui, content);
    if (en === undefined) bad.push(k); else english[k] = en;
  }
  if (bad.length) die(`not a translatable English key in translation/source/ ` +
    `(typo, blanked sentence, EPDS, or run node translation/snapshot.js first):\n  ${bad.join('\n  ')}`);

  const all = workerLocales().filter(l => fs.existsSync(path.join(ROOT, `public/i18n/locale.${l}.js`)));
  const unknown = langArgs.filter(l => !all.includes(l));
  if (unknown.length) die(`no such locale (worker LOCALES with a public/i18n file): ${unknown.join(', ')}`);
  const langs = langArgs.length ? langArgs : all;

  // Clear this tag's earlier prompts, remembering them: an output whose prompt
  // is unchanged is still good (run-kimi skips it), anything else is redone.
  const PROMPTS = path.join(T, 'prompts'), OUTDIR = path.join(T, 'out');
  fs.mkdirSync(PROMPTS, { recursive: true });
  const before = {};
  for (const f of fs.readdirSync(PROMPTS)) {
    const m = new RegExp(`^(.+)\\.keys\\.${tag}\\.md$`).exec(f);
    if (!m) continue;
    before[m[1]] = fs.readFileSync(path.join(PROMPTS, f), 'utf8');
    fs.unlinkSync(path.join(PROMPTS, f));
    fs.rmSync(expectPath(m[1], tag), { force: true });
  }

  const made = [];
  for (const lang of langs) {
    const meta = NAMES[lang];
    if (!meta) die(`no language name for ${lang} in prepare.js NAMES`);
    const obj = readLocale(fs, path.join(ROOT, `public/i18n/locale.${lang}.js`), lang).obj;
    const mine = keys.filter(k => {
      const s = slotOf(obj, k);
      if (draft) return s.text === undefined;
      return langArgs.length ? s.slot : s.text !== undefined;
    });
    const outRel = `translation/out/${lang}.keys.${tag}.json`;
    if (!mine.length) { fs.rmSync(path.join(ROOT, outRel), { force: true }); continue; }

    const input = Object.fromEntries(mine.map(k => [k, english[k]]));
    const srcHash = Object.fromEntries(mine.filter(k => k.startsWith('content.')).map(k => [k, srcHashOf(english[k])]));
    const prompt = `${rules(lang, meta)}
## This batch

${draft ? `${mine.length} strings with no ${meta.name} translation yet. Translate each one from
the English. The keys say where each one lives:` : `${mine.length} strings the English has just been corrected in. Translate the
English as it stands now, from scratch. The keys say where each one lives:`}

- "ui.…"                short interface text: buttons, labels, headings, short
                        lines on a phone screen. Keep them SHORT. Some contain
                        HTML like <br> or <strong>; keep it.
- "content.<card>.title" / ".sub"   a guide card's heading and subtitle
- "content.<card>.t.<n>"            one sentence or fragment from a guide card,
                        plain text, no HTML. Translate it as exactly one
                        sentence or fragment; never merge it with another.

Input (${mine.length} keys):

\`\`\`json
${JSON.stringify(input, null, 2)}
\`\`\`

Write the translated JSON object, the same ${mine.length} keys, to:
${outRel}
`;
    fs.writeFileSync(path.join(PROMPTS, `${lang}.keys.${tag}.md`), prompt);
    fs.writeFileSync(expectPath(lang, tag), JSON.stringify({ tag, lang, draft, keys: input, srcHash }, null, 2) + '\n');
    if (before[lang] !== prompt) fs.rmSync(path.join(ROOT, outRel), { force: true });
    made.push(`${lang}:${mine.length}`);
  }
  // Locales dropped from this tag lose their stale output too.
  for (const f of fs.existsSync(OUTDIR) ? fs.readdirSync(OUTDIR) : []) {
    const m = new RegExp(`^(.+)\\.keys\\.${tag}\\.json$`).exec(f);
    if (m && !fs.existsSync(expectPath(m[1], tag))) fs.unlinkSync(path.join(OUTDIR, f));
  }
  console.log(`keys "${tag}": ${keys.length} key(s); prompts for ${made.length ? made.join(' ') : 'no locale'}`);
}

const runLines = [];
let promptCount = 0;

for (const [code, meta] of Object.entries(LANGS)) {
  const uiBatches = chunk(Object.entries(ui), UI_BATCH);
  const contentBatches = chunk(Object.entries(content), CONTENT_BATCH);

  uiBatches.forEach((entries, i) => {
    const inputObj = Object.fromEntries(entries);
    const outRel = `translation/out/${code}.ui.${i + 1}.json`;
    const file = path.join(T, `prompts/${code}.ui.${i + 1}.md`);
    fs.writeFileSync(file, `${rules(code, meta)}
## This batch

Short interface strings: buttons, labels, headings, toasts, tool names.
Keep them SHORT — they sit in buttons and navigation on a phone screen.
Some are single words. Some contain HTML like <br> for line breaks; keep it.

Input (${entries.length} keys):

\`\`\`json
${JSON.stringify(inputObj, null, 2)}
\`\`\`

Write the translated JSON object — same ${entries.length} keys — to:
${outRel}
`);
    runLines.push(`run "${code}" "${outRel}" "translation/prompts/${code}.ui.${i + 1}.md"`);
    promptCount++;
  });

  contentBatches.forEach((entries, i) => {
    const inputObj = Object.fromEntries(entries);
    const outRel = `translation/out/${code}.content.${i + 1}.json`;
    const file = path.join(T, `prompts/${code}.content.${i + 1}.md`);
    const words = entries.map(([, v]) => (v.t || []).join(' ')).join(' ').split(/\s+/).filter(Boolean).length;
    fs.writeFileSync(file, `${rules(code, meta)}
## This batch

${entries.length} guide cards (~${words} words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "t"     — an ARRAY of plain-text sentences and fragments. This is the main
            content, and it carries no HTML at all.

Translate all three fields of every card.

CRITICAL, for "t": return an array with EXACTLY the same number of elements,
in EXACTLY the same order. Never merge two elements into one, never split one
element into two, and never drop an element even if it looks redundant on its
own. Each element fills a fixed slot in a shared layout; a short array silently
leaves those slots blank in the app. If an element is a single word or a table
heading, translate it as a single word or heading and keep it in place. Some
elements are sentence fragments that continue the previous one; translate them
as fragments.

Input (${entries.length} cards):

\`\`\`json
${JSON.stringify(inputObj, null, 2)}
\`\`\`

Write the translated JSON object, same ${entries.length} card ids, each with
title/sub/t, and each "t" array the same length as the one you were given, to:
${outRel}
`);
    runLines.push(`run "${code}" "${outRel}" "translation/prompts/${code}.content.${i + 1}.md"`);
    promptCount++;
  });
}

// ─── Runner ─────────────────────────────────────────────
fs.writeFileSync(path.join(T, 'run-kimi.sh'), `#!/usr/bin/env bash
# Runs every translation batch through kimi, then validates each output.
# Usage:  bash translation/run-kimi.sh            # all languages
#         bash translation/run-kimi.sh es fr      # only these
#         bash translation/run-kimi.sh --keys <file> [lang ...]   # named keys only
#
# Safe to re-run: batches whose output already exists AND validates are skipped,
# so an interrupted run resumes instead of redoing finished work.

set -uo pipefail
cd "$(dirname "$0")/.."

WANT="\${*:-}"
PASS=0; FAIL=0; SKIP=0

run() {
  local lang="$1" out="$2" prompt="$3"
  if [ -n "$WANT" ] && ! grep -qw "$lang" <<< "$WANT"; then return; fi

  if [ -f "$out" ] && node translation/validate.js "$out" >/dev/null 2>&1; then
    echo "  skip (already valid): $out"; SKIP=$((SKIP+1)); return
  fi

  echo "→ $out"
  timeout 1800 kimi -p "$(cat "$prompt")" >/dev/null 2>&1

  if node translation/validate.js "$out"; then
    PASS=$((PASS+1))
  else
    echo "  ✗ FAILED validation: $out  (re-run: kimi -p \\"\\$(cat $prompt)\\")"
    FAIL=$((FAIL+1))
  fi
}

# Key-list mode: re-translate only the keys named in <file>, one per line, e.g.
# ui.today.callLd or content.postpartum-danger.t.3 ("#" starts a comment). The
# file's name is the batch tag.
#   bash translation/run-kimi.sh --keys translation/keys/s1.txt        every locale that has them
#   bash translation/run-kimi.sh --keys translation/keys/s1.txt es ar  these, drafting missing ui keys too
# then: node translation/merge.js --keys s1
if [ "\${1:-}" = "--keys" ]; then
  KEYFILE="\${2:?usage: run-kimi.sh --keys <file> [lang ...]}"; shift 2
  WANT=""
  node translation/snapshot.js >/dev/null || exit 1
  echo "translation/source/ refreshed from locale.en.js (commit it with the English change)"
  node translation/prepare.js --keys "$KEYFILE" "$@" || exit 1
  TAG=$(basename "$KEYFILE"); TAG="\${TAG%.*}"
  for prompt in translation/prompts/*.keys."$TAG".md; do
    [ -e "$prompt" ] || continue
    lang=$(basename "$prompt"); lang="\${lang%%.keys.*}"
    run "$lang" "translation/out/$lang.keys.$TAG.json" "$prompt"
  done
  echo
  echo "passed: $PASS   failed: $FAIL   skipped: $SKIP"
  if [ "$FAIL" -eq 0 ]; then echo "Next: node translation/merge.js --keys $TAG"; exit 0; fi
  echo "Re-run the same command to retry only the failed locales."; exit 1
fi

${runLines.join('\n')}

echo
echo "passed: $PASS   failed: $FAIL   skipped: $SKIP"
[ "$FAIL" -eq 0 ] || echo "Re-run this script to retry only the failed batches."
`);
fs.chmodSync(path.join(T, 'run-kimi.sh'), 0o755);

console.log(`prompts written: ${promptCount}`);
console.log(`languages: ${Object.keys(LANGS).join(', ')}`);
console.log(`ui batches/lang: ${Math.ceil(Object.keys(ui).length / UI_BATCH)}`);
console.log(`content batches/lang: ${Math.ceil(Object.keys(content).length / CONTENT_BATCH)}`);
