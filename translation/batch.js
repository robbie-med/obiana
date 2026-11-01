// ═══════════════════════════════════════════════════════
// BATCH NAMES: which files in translation/out/ are batches, for which locale
// ═══════════════════════════════════════════════════════
// validate.js and merge.js both decide what a file is from its name. They used
// to do it with /^[a-z]{2,3}\./, which silently skipped every pt-BR batch. The
// locale list now comes from the worker, the one place that already has to
// list every code a reader can send a suggestion for.
//
//   <lang>.ui.<n>.json        full-pipeline ui batch n        (prepare.js)
//   <lang>.content.<n>.json   full-pipeline content batch n   (prepare.js)

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let cached = null;

function workerLocales() {
  if (cached) return cached;
  const src = fs.readFileSync(path.join(ROOT, 'worker/index.js'), 'utf8');
  const m = /const LOCALES = \[([^\]]*)\]/.exec(src);
  if (!m) throw new Error('worker/index.js: const LOCALES = [...] not found');
  cached = [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
  return cached;
}

// → { lang, kind: 'ui'|'content', n } or null
function parseBatch(file) {
  const m = /^(.+)\.(ui|content)\.(\d+)\.json$/.exec(path.basename(file));
  if (!m || !workerLocales().includes(m[1])) return null;
  return { lang: m[1], kind: m[2], n: parseInt(m[3], 10) };
}

// `window.MYOB_LOCALES.es` but `window.MYOB_LOCALES["pt-BR"]`.
const localeRef = lang => /^[A-Za-z_$][\w$]*$/.test(lang)
  ? `window.MYOB_LOCALES.${lang}` : `window.MYOB_LOCALES[${JSON.stringify(lang)}]`;

module.exports = { workerLocales, parseBatch, localeRef };
