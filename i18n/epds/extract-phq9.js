#!/usr/bin/env node
// Mechanically extracts a PHQ-9 from the embedded text layer of an official
// phqscreeners.com PDF.
//
//   node i18n/epds/extract-phq9.js <lang> <file.pdf> "<scale0>|<scale1>|<scale2>|<scale3>"
//
// The PHQ-9 is a GRID, not a per-item option list: nine numbered stems share
// one set of four column headers scored 0..3, all in the same direction (no
// reverse scoring). The column headers are multi-line and right-aligned in the
// PDF, so they are passed in explicitly after reading them off the header
// rather than guessed at by the parser.
//
// The PHQ is public domain: "no permission is required to reproduce,
// translate, display or distribute" (phqscreeners.com).

const { execFileSync } = require('child_process');

function extract(pdfPath) {
  const txt = execFileSync('pdftotext', ['-layout', pdfPath, '-'],
    { encoding: 'utf8', maxBuffer: 1 << 24 })
    .replace(/[‎‏‪-‮⁦-⁩؜]/g, '')
    .normalize('NFKC');

  const lines = txt.split('\n');
  const items = [];
  let cur = null;

  for (const raw of lines) {
    const line = raw.replace(/\s+/g, ' ').trim();
    if (!line) continue;

    // Stop at the (unscored) functional-impairment question / office coding.
    if (/FOR OFFICE CODING|Total Score/i.test(line)) { cur = null; continue; }

    const m = line.match(/^([1-9])\.\s*(.*)$/);
    if (m) {
      cur = { n: +m[1], text: m[2] };
      items.push(cur);
    } else if (cur) {
      // A line that is only the 0 1 2 3 rail carries no item text.
      if (/^[0-3](\s+[0-3]){3}$/.test(line)) continue;
      if (items.length === 9 && /^\S/.test(line) && !/[a-zа-яA-ZА-Я]/.test(line)) continue;
      cur.text += ' ' + line;
    }
    if (cur) {
      // The rail is printed on the same line as the stem more often than not.
      cur.text = cur.text.replace(/\s*0\s+1\s+2\s+3\s*/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }

  return items.filter(i => i.n >= 1 && i.n <= 9).slice(0, 9);
}

const [lang, pdf, scaleArg] = process.argv.slice(2);
if (!lang || !pdf || !scaleArg) {
  console.error('usage: extract-phq9.js <lang> <file.pdf> "<s0>|<s1>|<s2>|<s3>"');
  process.exit(2);
}
const scale = scaleArg.split('|').map(s => s.trim());

let items;
try { items = extract(pdf); }
catch (e) { console.error(`✗ ${lang}: ${e.message}`); process.exit(1); }

const problems = [];
if (items.length !== 9) problems.push(`expected 9 items, got ${items.length} (${items.map(i => i.n).join(',')})`);
if (scale.length !== 4) problems.push(`expected 4 scale labels, got ${scale.length}`);
scale.forEach((s, i) => { if (!s) problems.push(`scale label ${i} is empty`); });
items.forEach(it => {
  if (it.text.length < 8) problems.push(`item ${it.n}: text too short ("${it.text}")`);
  if (/\d\s+\d\s+\d/.test(it.text)) problems.push(`item ${it.n}: score rail leaked into text`);
});
// Item 9 is the self-harm item and must be present.
if (items.length === 9 && items[8].text.length < 15) problems.push('item 9 (self-harm) looks truncated');

console.log(JSON.stringify({ lang, scale, items, problems }, null, 2));
process.exit(problems.length ? 1 : 0);
