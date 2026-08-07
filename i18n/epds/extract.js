#!/usr/bin/env node
// Mechanically extracts an EPDS form from the embedded text layer of an
// official NSW MHCS PDF. Nothing here translates or retypes anything: item and
// option order come out exactly as printed, and scores are the canonical EPDS
// pattern applied positionally.
//
//   node i18n/epds/extract.js <lang> <file.pdf>
//
// The English PDF is the control. If this parser reproduces the known English
// form, the same code path can be trusted on a script the author cannot read.

const { execFileSync } = require('child_process');
const fs = require('fs');

// Items 1, 2 and 4 run best-first; the rest run worst-first. The alternation is
// deliberate — it defeats straight-lining a single column.
const REVERSED = new Set([3, 5, 6, 7, 8, 9, 10]);
const scoresFor = n => (REVERSED.has(n) ? [3, 2, 1, 0] : [0, 1, 2, 3]);

// Printer furniture that lives in the margins of the NSW Health form.
const NOISE = /^[\s\-–—_.]*(SMR\d*|Holes\s*Punched.*|NO\s*WRITING|WRITING|BINDING\s*MARGIN.*|BINDING|AS2828.*|NO|MARGIN|\d{1,6}|MRN|FAMILY\s*NAME|GIVEN\s*NAME|D\.O\.B.*|ADDRESS:?|LOCATION:?|MALE|FEMALE|M\.O\.|Facility:?|COMPLETE\s*ALL\s*DETAILS.*|Page\s*\d+.*)[\s\-–—_.]*$/i;

const OPTION = /^[□☐■◻▢□☐()\[\]]+\s*/;

// Margin/footer furniture that pdftotext -layout interleaves INTO option
// lines on the last item of the page. Scrubbed inline, not just whole-line.
const INLINE_NOISE = [
  /SMR\s*\d[\d.\s]*/gi,
  /Total\s*Score.*$/gi,
  /Page\s*\d+\s*of\s*\d+/gi,
  /Question\s*10:?\s*_*/gi,
  /\/\s*30\b/g,
  /\/\s*3\b/g,
  /Sagovsky.*$/gi,
  /Psychiatry,?\s*150.*$/gi,
  /\bITING\b|\bWRITING\b|\bBINDING\b/gi,
  /\b78[0-9]-?7?8?6?\b/g,
];
const scrub = s => INLINE_NOISE.reduce((a, re) => a.replace(re, '   '), s);

// A single output line can hold two adjacent options with margin text wedged
// between them. Wide whitespace runs are the column separator, so split on
// them and drop fragments that are pure furniture.
const NON_LATIN = /[^\p{Script=Latin}\p{N}\p{P}\p{Z}\p{C}]/u;
const splitFragments = (s, stem) => {
  const stemIsNonLatin = stem ? NON_LATIN.test(stem) : false;
  return scrub(s)
    .split(/\s{3,}/)
    .map(x => x.trim())
    .filter(x => x && !NOISE.test(x) && /[\p{L}]/u.test(x))
    // On a non-Latin form, an option written purely in ASCII is furniture.
    .filter(x => !stemIsNonLatin || NON_LATIN.test(x));
};

function extract(pdfPath) {
  const txt = execFileSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 1 << 24 });
  const lines = txt.split('\n');

  // Locate the two item columns by where numbered stems start.
  const cols = {};
  for (const ln of lines) {
    for (const m of ln.matchAll(/(?:^|\s)(10|[1-9])\.\s+\S/g)) {
      const n = parseInt(m[1], 10);
      const x = m.index + (m[0].length - m[0].trimStart().length);
      (cols[n] ||= []).push(x);
    }
  }
  const xs = Object.values(cols).flat().sort((a, b) => a - b);
  if (!xs.length) throw new Error('no numbered items found — no usable text layer?');
  // Two clusters: split at the widest gap.
  let gap = 0, split = xs[xs.length - 1] + 1;
  for (let i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] > gap) { gap = xs[i] - xs[i - 1]; split = xs[i]; }
  if (gap < 20) split = Infinity;   // single-column layout

  const slice = (a, b) => lines
    .map(l => l.slice(a, b).trim())
    .filter(t => t && !NOISE.test(t));

  const parseCol = seq => {
    const items = [];
    let cur = null;
    for (const ln of seq) {
      const m = ln.match(/^(10|[1-9])\.\s*(.*)$/);
      if (m) { cur = { n: +m[1], text: m[2].trim(), options: [] }; items.push(cur); continue; }
      if (OPTION.test(ln)) {
        if (!cur) continue;
        for (const frag of splitFragments(ln.replace(OPTION, ''), cur.text)) {
          if (cur.options.length < 4) cur.options.push(frag);
        }
        continue;
      }
      // wrapped stem text, before any option was seen
      if (cur && !cur.options.length && ln) cur.text = (cur.text + ' ' + ln).trim();
      // wrapped option text
      else if (cur && cur.options.length && ln && !/^\d+\./.test(ln)) {
        const frags = splitFragments(ln, cur.text);
        if (!frags.length) continue;
        // First fragment continues the previous option only if that option
        // still looks unfinished; otherwise treat fragments as new options.
        if (cur.options.length < 4) {
          for (const f of frags) if (cur.options.length < 4) cur.options.push(f);
        }
      }
    }
    return items;
  };

  const left = parseCol(slice(0, split === Infinity ? undefined : split));
  const right = split === Infinity ? [] : parseCol(slice(split));
  const byNum = new Map();
  for (const it of [...left, ...right]) {
    if (it.n < 1 || it.n > 10) continue;
    // keep the richer parse if an item somehow appears twice
    const prev = byNum.get(it.n);
    if (!prev || it.options.length > prev.options.length) byNum.set(it.n, it);
  }
  const items = [...byNum.values()].sort((a, b) => a.n - b.n);

  return items.map(it => ({
    n: it.n,
    text: it.text.replace(/\s+/g, ' ').trim(),
    options: it.options.map(o => o.replace(/\s+/g, ' ').trim()),
    scores: scoresFor(it.n),
  }));
}

const [lang, pdf] = process.argv.slice(2);
if (!lang || !pdf) { console.error('usage: extract.js <lang> <file.pdf>'); process.exit(2); }

let items;
try { items = extract(pdf); }
catch (e) { console.error(`✗ ${lang}: ${e.message}`); process.exit(1); }

const problems = [];
if (items.length !== 10) problems.push(`expected 10 items, got ${items.length} (${items.map(i => i.n).join(',')})`);
items.forEach(it => {
  if (it.options.length !== 4) problems.push(`item ${it.n}: ${it.options.length} options, expected 4`);
  if (new Set(it.options).size !== it.options.length) problems.push(`item ${it.n}: duplicate option text`);
  const stemNonLatin = NON_LATIN.test(it.text);
  it.options.forEach((o, j) => {
    if (o.length < 2) problems.push(`item ${it.n} option ${j + 1}: suspiciously short ("${o}")`);
    if (stemNonLatin && !NON_LATIN.test(o))
      problems.push(`item ${it.n} option ${j + 1}: ASCII text on a non-Latin form — margin furniture leaked in ("${o}")`);
  });
});

console.log(JSON.stringify({ lang, items, problems }, null, 2));
process.exit(problems.length ? 1 : 0);
