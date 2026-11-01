#!/usr/bin/env node
// Bump the asset version everywhere it lives, together:
//   public/i18n/i18n.js  ASSET_VERSION   (locale files are fetched with ?v=)
//   public/sw.js         CACHE_NAME and every ?v=
//   public/index.html    every ?v=
// If they disagree, the service worker serves a mixed set of old and new files.
// Run after any change to a file under public/ that installed apps must pick up.
//
//   node scripts/bump.js        → prints "version 92"
'use strict';
const fs = require('fs');
const path = require('path');
const WEB = path.join(__dirname, '..', 'public');

const i18nPath = path.join(WEB, 'i18n', 'i18n.js');
const src = fs.readFileSync(i18nPath, 'utf8');
const m = src.match(/const ASSET_VERSION = '(\d+)';/);
if (!m) { console.error('ASSET_VERSION not found in public/i18n/i18n.js'); process.exit(1); }
const old = +m[1], next = old + 1;

const edits = [[i18nPath, s => s.replace(`const ASSET_VERSION = '${old}';`, `const ASSET_VERSION = '${next}';`)]];
for (const rel of ['sw.js', 'index.html']) {
  edits.push([path.join(WEB, rel), s => s
    .split(`?v=${old}`).join(`?v=${next}`)
    .split(`birth-guide-v${old}-i18n`).join(`birth-guide-v${next}-i18n`)]);
}
// Compute everything first, then write, so a failure leaves nothing half-bumped.
const out = edits.map(([p, f]) => [p, f(fs.readFileSync(p, 'utf8'))]);
const sw = out.find(([p]) => p.endsWith('sw.js'))[1];
if (!sw.includes(`birth-guide-v${next}-i18n`)) { console.error('CACHE_NAME pattern not found in sw.js'); process.exit(1); }
out.forEach(([p, s]) => fs.writeFileSync(p, s));
console.log(`version ${next}`);
