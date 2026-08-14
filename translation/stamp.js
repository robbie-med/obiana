#!/usr/bin/env node
// ═══════════════════════════════════════════════════════
// STAMP — maintain the per-key source fingerprints
// ═══════════════════════════════════════════════════════
// See translation/hash.js for why these exist. In short: a translated sentence
// records a fingerprint of the English it was made from, so that when English
// is corrected the app can tell which translations have not caught up and show
// reviewed English instead of superseded translation.
//
//   node translation/stamp.js report                 what is stale, per locale
//   node translation/stamp.js verify                 gate: exit 1 on any problem
//   node translation/stamp.js stamp <lang> <key>...  declare keys current
//   node translation/stamp.js backfill <lang>...     one-time, whole locale
//
// "stamp" is what you run after retranslating a sentence by hand. "backfill"
// is the one-time move for a locale that is already fully translated against
// today's English; it refuses to run unless that is structurally true, because
// the whole value of the map is that it is not a guess.

'use strict';
const fs = require('fs');
const path = require('path');
const { srcHashOf, flattenContent, readLocale, writeLocale } = require('./hash.js');

const ROOT = path.join(__dirname, '..');
const I18N = path.join(ROOT, 'i18n');
const FALLBACK = 'en';

function locales() {
  return fs.readdirSync(I18N)
    .map(f => /^locale\.([\w-]+)\.js$/.exec(f))
    .filter(Boolean)
    .map(m => m[1])
    .sort();
}

const load = lang => readLocale(fs, path.join(I18N, `locale.${lang}.js`), lang);

// English hashed live. Nothing stores English's own fingerprints, by design:
// a stored copy could itself fall out of date, which is the failure mode this
// whole mechanism exists to remove.
function englishHashes() {
  const flat = flattenContent(load(FALLBACK).obj);
  const out = {};
  for (const [k, v] of Object.entries(flat)) out[k] = srcHashOf(v);
  return out;
}

// Classify every English content key against one locale.
function classify(lang, en) {
  const { obj } = load(lang);
  const mine = flattenContent(obj);
  const stamped = obj.srcHash || {};
  const r = { lang, translated: 0, stale: 0, unstamped: 0, untranslated: 0,
              staleKeys: [], unstampedKeys: [], hasContent: !!Object.keys(mine).length,
              hasMap: !!obj.srcHash };
  for (const key of Object.keys(en)) {
    const v = mine[key];
    if (v === undefined || v === '') { r.untranslated++; continue; }
    if (!(key in stamped)) { r.unstamped++; r.unstampedKeys.push(key); continue; }
    if (stamped[key] !== en[key]) { r.stale++; r.staleKeys.push(key); continue; }
    r.translated++;
  }
  // Keys stamped that English no longer has: left behind by a renamed or
  // deleted card. Harmless at runtime but they mean the map is drifting.
  r.orphans = Object.keys(stamped).filter(k => !(k in en));
  return r;
}

function cmdReport(args) {
  const en = englishHashes();
  console.log(`English content keys: ${Object.keys(en).length}\n`);
  for (const lang of locales()) {
    if (lang === FALLBACK) continue;
    const r = classify(lang, en);
    if (!r.hasContent) { console.log(`  ${lang.padEnd(6)} no content block`); continue; }
    const flag = (r.stale || r.unstamped) ? '  <-- needs retranslation' : '';
    console.log(`  ${lang.padEnd(6)} ${String(r.translated).padStart(4)} current  ` +
      `${String(r.stale).padStart(4)} stale  ${String(r.unstamped).padStart(4)} unstamped  ` +
      `${String(r.untranslated).padStart(4)} untranslated${flag}`);
    if (args.includes('--keys')) {
      r.staleKeys.forEach(k => console.log(`         stale     ${k}`));
      r.unstampedKeys.forEach(k => console.log(`         unstamped ${k}`));
    }
    if (r.orphans.length) console.log(`         ${r.orphans.length} orphan stamp(s) for keys English no longer has`);
  }
}

function cmdVerify() {
  const en = englishHashes();
  const problems = [];

  // English must never carry a map. If it did, the English side of every
  // comparison would be a stored value that can itself go stale.
  if (load(FALLBACK).obj.srcHash) problems.push(`${FALLBACK}: must not carry srcHash`);

  const enContent = (load(FALLBACK).obj.content) || {};

  for (const lang of locales()) {
    if (lang === FALLBACK) continue;
    const { obj } = load(lang);
    const mine = flattenContent(obj);
    if (!Object.keys(mine).length) {
      if (obj.srcHash) problems.push(`${lang}: has srcHash but no content`);
      continue;
    }
    if (!obj.srcHash) { problems.push(`${lang}: has content but no srcHash (run backfill or stamp)`); continue; }

    for (const [k, h] of Object.entries(obj.srcHash)) {
      if (!/^[0-9a-f]{16}$/.test(String(h))) problems.push(`${lang}: malformed hash at ${k}: ${h}`);
      if (!(k in en)) problems.push(`${lang}: orphan stamp ${k} (no such English key)`);
    }
    // The invariant body-templates.js depends on and nothing else checks: a
    // short t array silently blanks slots rather than erroring.
    for (const [id, card] of Object.entries(obj.content || {})) {
      const wantLen = ((enContent[id] || {}).t || []).length;
      const gotLen = (card.t || []).length;
      if (!enContent[id]) problems.push(`${lang}: card "${id}" does not exist in English`);
      else if (gotLen !== wantLen) problems.push(`${lang}: card "${id}" has ${gotLen} runs, English has ${wantLen}`);
    }
  }

  if (problems.length) {
    console.log('PROBLEMS:');
    problems.forEach(p => console.log('  ' + p));
    process.exit(1);
  }
  console.log(`srcHash verify: ${locales().length} locales, no problems.`);
}

function cmdStamp(args) {
  const [lang, ...keys] = args;
  if (!lang || !keys.length) {
    console.error('usage: stamp <lang> <key>...'); process.exit(2);
  }
  const en = englishHashes();
  const parsed = load(lang);
  const mine = flattenContent(parsed.obj);
  const map = parsed.obj.srcHash || {};
  let done = 0;
  for (const key of keys) {
    if (!(key in en)) { console.error(`  skip ${key}: no such English key`); continue; }
    if (mine[key] === undefined || mine[key] === '') { console.error(`  skip ${key}: not translated in ${lang}`); continue; }
    map[key] = en[key]; done++;
  }
  parsed.obj.srcHash = map;
  writeLocale(fs, path.join(I18N, `locale.${lang}.js`), parsed);
  console.log(`stamped ${done} key(s) in ${lang}`);
}

// One-time, whole-locale. Only legitimate when the locale really was
// translated from today's English, so the precondition is enforced rather
// than trusted: every card present, every run count matching, nothing empty.
function cmdBackfill(args) {
  if (!args.length) { console.error('usage: backfill <lang>...'); process.exit(2); }
  const enParsed = load(FALLBACK);
  const en = englishHashes();
  const enContent = enParsed.obj.content || {};

  for (const lang of args) {
    const parsed = load(lang);
    const content = parsed.obj.content || {};
    const fail = [];
    for (const [id, card] of Object.entries(enContent)) {
      const mine = content[id];
      if (!mine) { fail.push(`missing card "${id}"`); continue; }
      if ((mine.t || []).length !== (card.t || []).length)
        fail.push(`card "${id}": ${(mine.t || []).length} runs vs English ${(card.t || []).length}`);
      (mine.t || []).forEach((run, i) => { if (run === '' || run == null) fail.push(`card "${id}" run ${i} is empty`); });
      if (card.title && !mine.title) fail.push(`card "${id}": no title`);
      if (card.sub && !mine.sub) fail.push(`card "${id}": no sub`);
    }
    if (fail.length) {
      console.error(`${lang}: REFUSED, not structurally complete against English:`);
      fail.slice(0, 12).forEach(f => console.error('  ' + f));
      if (fail.length > 12) console.error(`  ... and ${fail.length - 12} more`);
      console.error('  Use "stamp <lang> <key>..." for the subset you can vouch for.');
      process.exitCode = 1;
      continue;
    }
    const map = {};
    const mineFlat = flattenContent(parsed.obj);
    // Stamp in English key order so the block is stable across runs and diffs
    // stay readable.
    for (const key of Object.keys(en)) {
      if (mineFlat[key] !== undefined && mineFlat[key] !== '') map[key] = en[key];
    }
    parsed.obj.srcHash = map;
    writeLocale(fs, path.join(I18N, `locale.${lang}.js`), parsed);
    console.log(`${lang}: backfilled ${Object.keys(map).length} fingerprints`);
  }
}

const [cmd, ...args] = process.argv.slice(2);
({ report: cmdReport, verify: cmdVerify, stamp: cmdStamp, backfill: cmdBackfill }[cmd] || (() => {
  console.error('usage: stamp.js report [--keys] | verify | stamp <lang> <key>... | backfill <lang>...');
  process.exit(2);
}))(args);
