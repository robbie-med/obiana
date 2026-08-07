#!/usr/bin/env node
// Generates one self-contained prompt file per (language, batch) plus a shell
// script that runs them all through kimi. Each prompt embeds its own input
// JSON and names its own output path, so a run is reproducible and a single
// failed batch can be re-run alone.
//
//   node translation/prepare.js
//   bash translation/run-kimi.sh          # all languages
//   bash translation/run-kimi.sh es fr    # just these

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
    const words = entries.map(([, v]) => v.body.replace(/<[^>]+>/g, ' ')).join(' ').split(/\s+/).filter(Boolean).length;
    fs.writeFileSync(file, `${rules(code, meta)}
## This batch

${entries.length} guide cards (~${words} words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (${entries.length} cards):

\`\`\`json
${JSON.stringify(inputObj, null, 2)}
\`\`\`

Write the translated JSON object — same ${entries.length} card ids, each with
title/sub/body — to:
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
