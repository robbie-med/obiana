#!/usr/bin/env node
// Structural check on every EPDS block present in the locale files.
//
//   node i18n/epds/verify.js
//
// This would have caught the original English bug: every item had been
// normalised to best-first ordering, so straight-lining the first column
// scored 0 instead of 21. Totals still summed correctly, so nothing else
// flagged it.
//
// It verifies STRUCTURE only. Whether the translation is faithful can only be
// judged by someone who reads the language.

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..');

// The published EPDS reverses these items (first option scores 3).
const OFFICIAL_REVERSED = [3, 5, 6, 7, 8, 9, 10];

const files = fs.readdirSync(__dirname).filter(f => /^(epds|phq9)\.[a-z]{2,3}\.js$/.test(f));
let problems = 0, checked = 0, gated = [];

for (const file of files) {
  const lang = file.match(/^(?:epds|phq9)\.([a-z]{2,3})\.js$/)[1];
  global.window = { MYOB_EPDS: {} };
  delete require.cache[require.resolve(path.join(__dirname, file))];
  try { require(path.join(__dirname, file)); }
  catch (e) { console.log(`✗ ${lang}: file failed to load — ${e.message}`); problems++; continue; }

  const epds = global.window.MYOB_EPDS[lang];
  if (!epds) { gated.push(lang); continue; }
  checked++;

  const errs = [];
  if (epds.validated !== true) errs.push('validated is not true (tool will stay gated)');
  if (!epds.attribution) errs.push('missing attribution — the licence requires the citation');
  if (!epds.cutoffs || typeof epds.cutoffs.concern !== 'number' || typeof epds.cutoffs.high !== 'number')
    errs.push('cutoffs must be { concern: <n>, high: <n> } from THAT language\'s validation study');

  const isPHQ = epds.instrument === 'PHQ-9';
  const wantItems = isPHQ ? 9 : 10;
  const wantMax = isPHQ ? 27 : 30;

  const q = epds.questions;
  if (!Array.isArray(q) || q.length !== wantItems) {
    errs.push(`expected ${wantItems} items, got ${Array.isArray(q) ? q.length : typeof q}`);
  } else {
    const reversed = [];
    q.forEach((item, i) => {
      const n = i + 1;
      if (!item.text || !String(item.text).trim()) errs.push(`item ${n}: empty text`);
      if (!Array.isArray(item.options) || item.options.length !== 4) errs.push(`item ${n}: needs exactly 4 options`);
      if (!Array.isArray(item.scores) || item.scores.length !== 4) errs.push(`item ${n}: needs exactly 4 scores`);
      if (Array.isArray(item.scores) && item.scores.length === 4) {
        if ([...item.scores].sort().join() !== '0,1,2,3')
          errs.push(`item ${n}: scores must be a permutation of 0,1,2,3 — got [${item.scores}]`);
        if (item.scores[0] === 3) reversed.push(n);
      }
      if (Array.isArray(item.options) && new Set(item.options.map(String)).size !== item.options.length)
        errs.push(`item ${n}: duplicate option text`);
      // Page furniture that leaked out of the PDF margins. Counting options
      // passed happily while Spanish item 7 offered "THE EDINBURGH POSTNATAL
      // DEPRESSION SCALE" as a selectable answer.
      const FURNITURE = /\b(EDINBURGH|POSTNATAL\s+DEPRESSION|DEPRESSION\s+SCALE|SMR\d|NOWRITING|BINDING\s*MARGIN|COMPLETE\s+ALL\s+DETAILS|Total\s+Score|Page\s+\d+\s+of)\b/i;
      if (FURNITURE.test(item.text)) errs.push(`item ${n}: page furniture in the stem — "${item.text.slice(0, 60)}"`);
      (item.options || []).forEach((o, oi) => {
        if (FURNITURE.test(o)) errs.push(`item ${n} option ${oi + 1}: page furniture as an ANSWER — "${String(o).slice(0, 50)}"`);
      });
    });

    // The PHQ-9 has NO reverse-scored items; the EPDS alternation does not
    // apply to it and demanding it would be wrong.
    const wantReversed = isPHQ ? [] : OFFICIAL_REVERSED;
    if (reversed.join() !== wantReversed.join()) {
      errs.push(
        `option ORDER does not match the published form.\n` +
        `        reverse-scored here : [${reversed.join(', ') || 'none'}]\n` +
        `        published form      : [${OFFICIAL_REVERSED.join(', ')}]\n` +
        `        The alternating direction is deliberate — it prevents straight-lining\n` +
        `        one column. Reorder the options to match the source document.`);
    }

    // Range sanity
    const min = q.reduce((a, x) => a + Math.min(...(x.scores || [0])), 0);
    const max = q.reduce((a, x) => a + Math.max(...(x.scores || [0])), 0);
    if (min !== 0 || max !== wantMax) errs.push(`score range must be 0..${wantMax}, got ${min}..${max}`);
  }

  if (errs.length) { problems++; console.log(`✗ ${lang}`); errs.forEach(e => console.log(`    ${e}`)); }
  else console.log(`✓ ${lang.padEnd(4)} ${(epds.instrument || 'EPDS').padEnd(6)} ${wantItems} items, 0..${wantMax}, reverse-scored [${(isPHQ ? [] : OFFICIAL_REVERSED).join(', ') || 'none'}], attributed`);
}

if (gated.length) console.log(`\nempty modules: ${gated.join(', ')}`);
console.log(`\n${checked} EPDS block(s) checked, ${problems} with problems.`);
if (checked && !problems) {
  console.log('Structure is sound. This does NOT verify translation accuracy —');
  console.log('only a speaker of the language can confirm the wording.');
}
process.exit(problems ? 1 : 0);
