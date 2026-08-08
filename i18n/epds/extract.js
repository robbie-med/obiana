#!/usr/bin/env node
// Mechanically extracts an EPDS form from the embedded text layer of an
// official NSW MHCS PDF. Nothing here translates or retypes anything: item and
// option order come out exactly as printed, and scores are the canonical EPDS
// pattern applied positionally.
//
//   node i18n/epds/extract.js <lang> <file.pdf>
//
// Layout quirks this has to survive:
//   * two columns (items 1-5 left, 6-10 right)
//   * a checkbox glyph that sometimes shares a line with its option text and
//     sometimes sits alone, with the text landing on a following line
//   * rotated margin furniture bleeding through the middle of the item grid
//   * bidi control characters wrapping every run on the Arabic form

const { execFileSync } = require('child_process');

// Items 1, 2 and 4 run best-first; the rest run worst-first. The alternation is
// deliberate — it defeats straight-lining a single column.
const REVERSED = new Set([3, 5, 6, 7, 8, 9, 10]);
const scoresFor = n => (REVERSED.has(n) ? [3, 2, 1, 0] : [0, 1, 2, 3]);

// Bidi embedding / override / isolate marks. pdftotext emits these around every
// run on RTL forms; they break number matching, so they go before parsing.
const BIDI = /[‎‏‪-‮⁦-⁩؜]/g;

const NOISE = new RegExp(
  '^[\\s\\-–—_.:]*(' + [
    'SMR\\s*\\d[\\d.\\s]*', 'Holes\\s*Punched.*', 'NO\\s*WRITING', 'NOWRITING', 'WRITING',
    'BINDING\\s*MARGIN.*', 'BINDING', 'AS2828.*', 'NO', 'MARGIN', '\\d{1,6}',
    'MRN', 'FAMILY\\s*NAME', 'GIVEN\\s*NAME', 'D\\.O\\.B.*', 'ADDRESS:?', 'LOCATION:?',
    'MALE', 'FEMALE', 'M\\.O\\.', 'Facility:?', 'COMPLETE\\s*ALL\\s*DETAILS.*',
    'Page\\s*\\d+.*', 'Health', 'THE\\s+EDINBURGH.*', 'EDINBURGH\\s+DEPRESSION.*',
    'EDINBURGH\\s+POSTNATAL.*', 'Total\\s*Score.*', 'Score\\s*for.*',
  ].join('|') + ')[\\s\\-–—_.:]*$', 'i');

const BOX_G = /[□☐■◻◢❑▫]/g;
const BOX_ONLY = /^[\s□☐■◻◢❑▫()\[\]]+$/;

const INLINE_NOISE = [
  /SMR\s*\d[\d.\s]*/gi, /Total\s*Score.*$/gi, /Score\s*for\s*Question.*$/gi,
  /Page\s*\d+\s*of\s*\d+/gi, /Question\s*10:?\s*_*/gi, /\/\s*30\b/g, /\/\s*3\b/g,
  /Sagovsky.*$/gi, /Psychiatry,?\s*150.*$/gi, /\b78[0-9]-?7?8?6?\b/g,
  /THE\s+EDINBURGH[^.]*/gi, /EDINBURGH\s+(POSTNATAL|DEPRESSION)[^.]*/gi,
  /\bNOWRITING\b|\bNO\s*WRITING\b|\bBINDING\b/gi,
  // Rotated margin text lands as isolated ALL-CAPS tokens inside an item stem
  // — "…tiang in ka EDINBURGH um tawn:". Case-sensitive on purpose: the real
  // item text never shouts these words, so only the furniture matches.
  /\b(EDINBURGH|POSTNATAL|DEPRESSION|SCALE|WRITING|BINDING|MARGIN|LOCATION|ADDRESS|FACILITY)\b/g,
];
const scrub = s => INLINE_NOISE.reduce((a, re) => a.replace(re, '   '), s);

const NON_LATIN = /[^\p{Script=Latin}\p{N}\p{P}\p{Z}\p{C}]/u;

function fragments(line, stemIsNonLatin) {
  return scrub(line)
    .split(/\s{3,}/)
    .map(x => x.replace(BOX_G, ' ').trim())
    .filter(x => x && !NOISE.test(x) && /[\p{L}]/u.test(x))
    // On a non-Latin form an all-ASCII run is margin furniture, never an option.
    .filter(x => !stemIsNonLatin || NON_LATIN.test(x));
}

function extract(pdfPath) {
  const txt = execFileSync('pdftotext', ['-layout', pdfPath, '-'],
    { encoding: 'utf8', maxBuffer: 1 << 24 })
    .replace(BIDI, '')
    // Arabic runs come out as presentation forms (U+FExx); NFKC maps them back
    // to normal Arabic letters so the text renders and searches correctly.
    .normalize('NFKC');
  const lines = txt.split('\n');

  // RTL forms print the item number after the stem ("stem .6"); LTR forms
  // print it before ("6. stem"). Which one decides how columns are split.
  const isRTL = (txt.match(/[.．]\s*(10|[1-9])(?=\s|$)/gm) || []).length >
                (txt.match(/(?:^|\s)(10|[1-9])\s*[.．]\s+\S/gm) || []).length;

  // Column split: cluster the x-positions of the numbered stems.
  const xs = [];
  for (const ln of lines)
    for (const m of ln.matchAll(/(?:^|\s)(?:(10|[1-9])\s*[.．]\s+\S|[.．]\s*(10|[1-9])(?=\s|$))/g))
      xs.push(m.index + (m[0].length - m[0].trimStart().length));
  if (!xs.length) throw new Error('no numbered items found — no usable text layer?');
  xs.sort((a, b) => a - b);
  let gap = 0, gapAt = -1;
  for (let i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] > gap) { gap = xs[i] - xs[i - 1]; gapAt = i; }

  // LTR: the number LEADS its column, so the split is the start of the higher
  // cluster. RTL: the number TRAILS its column at the right edge, so the split
  // must fall just past the lower cluster — otherwise the right column's stem
  // text (which sits to the LEFT of its own number) lands in the wrong column.
  let split = Infinity;
  if (gap >= 20 && gapAt > 0) {
    split = isRTL ? xs[gapAt - 1] + 4 : xs[gapAt];
  }

  const column = (a, b) => lines.map(l => l.slice(a, b)).filter(l => l.trim());

  function parseCol(rawLines) {
    const items = [];
    let cur = null, pendingBoxes = 0;

    for (const raw of rawLines) {
      const line = raw.trim();
      if (!line) continue;

      // LTR forms print "6. stem"; RTL forms print "stem .6" with the number
      // trailing. Accept both, and take the stem from whichever side it is on.
      let num = line.match(/^(10|[1-9])\s*[.．]\s*(.*)$/);
      if (!num) {
        const rtl = line.match(/^(.*?)\s*[.．]\s*(10|[1-9])\s*$/);
        if (rtl && rtl[1].trim()) num = [rtl[0], rtl[2], rtl[1]];
      }
      if (num) {
        cur = { n: +num[1], text: num[2].trim(), options: [] };
        items.push(cur);
        pendingBoxes = 0;
        continue;
      }
      if (!cur) continue;

      // A line holding only checkboxes: their option text arrives later.
      if (BOX_ONLY.test(line)) {
        pendingBoxes += (line.match(BOX_G) || []).length || 1;
        continue;
      }
      if (NOISE.test(line)) continue;

      BOX_G.lastIndex = 0;
      const hasBox = BOX_G.test(line);
      BOX_G.lastIndex = 0;

      const frags = fragments(line, NON_LATIN.test(cur.text));
      if (!frags.length) continue;

      for (const f of frags) {
        if (cur.options.length >= 4) break;
        if (hasBox || pendingBoxes > 0) {
          cur.options.push(f);
          if (!hasBox && pendingBoxes > 0) pendingBoxes--;
        } else if (!cur.options.length) {
          cur.text = (cur.text + ' ' + f).trim();              // wrapped stem
        } else {
          cur.options[cur.options.length - 1] += ' ' + f;      // wrapped option
        }
      }
    }
    return items;
  }

  const left = parseCol(column(0, split === Infinity ? undefined : split));
  const right = split === Infinity ? [] : parseCol(column(split));

  const byNum = new Map();
  for (const it of [...left, ...right]) {
    if (it.n < 1 || it.n > 10) continue;
    const prev = byNum.get(it.n);
    if (!prev || it.options.length > prev.options.length) byNum.set(it.n, it);
  }

  return [...byNum.values()].sort((a, b) => a.n - b.n).map(it => ({
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
    if (o.length < 2) problems.push(`item ${it.n} option ${j + 1}: too short ("${o}")`);
    if (stemNonLatin && !NON_LATIN.test(o))
      problems.push(`item ${it.n} option ${j + 1}: ASCII on a non-Latin form — furniture leaked ("${o}")`);
  });
});

console.log(JSON.stringify({ lang, items, problems }, null, 2));
process.exit(problems.length ? 1 : 0);
