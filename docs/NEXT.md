# Obiana: next phases (content + site), US care, every language

Everything stays published. Languages fill in as translators work; nothing is hidden or gated.

How translations behave today, which shapes everything below: a translation whose English has
changed **keeps showing the old wording** to the reader (`public/app/guide/cards.js`, "only a
MISSING translation falls back"). Only the Translation Helper marks it "Needs updating". So a
clinical correction in English never reaches another language by itself.

## 0. Setup (session A)
Sessions, one per fresh session: A setup, B §2, C §1, D/E §3, F §4 (background) + §5 one card at a time, G §6, H §7.
Ticks are the status: tick an item in the commit that ships it. New findings go to "Found while working" at the end, not fixed on the spot.
- [x] Checkboxes in this file.
- [x] `scripts/preflight.sh`: the gate before every push.
- [x] `scripts/hooks/pre-push` runs preflight on exactly what is pushed, and only lets `obiana-main` → `obiana/main` through.
- [x] Key-list re-translate mode: `bash translation/run-kimi.sh --keys <file> [lang…]`, then `node translation/merge.js --keys <tag>`.
- [x] `translation/merge.js` pt-BR fix (the §2 item).

## 1. Content fixes (your decisions)
- [ ] **Family doctor everywhere a provider is named.** About 21 places in `public/i18n/locale.en.js`:
  - "Call Your OB / Midwife" → "Call your family doctor, OB or midwife"
  - "doctor or midwife" (×3) → "family doctor, OB or midwife"
  - "Pediatrician" (×14) → "your baby's doctor" where it means whoever sees the baby.
  - Same in the new Visits/Today/When to call strings.
- [ ] **Bleeding threshold: 1 pad in an hour, everywhere.** postpartum-danger t3, physical-recovery, csection, Home strings, `ui` `soaking1PadHr2`.
- [ ] **5-1-1 stays as written.**
- [ ] **Kick counting is optional.** Something you can do, not something you must. Kick tool intro, the Tools card text ("10 moves in 2 hours"), the Visits line.
- [ ] **Self-harm: every card says the same as When to call.** antenatal-mental-health, mood-ppd and the mood tool currently differ (988 / ER / doctor).
  - No 988 line before the mood questions. The mood tool shows `tool.mood.selfHarmGuidance` (with 988) only after an answer; check that nothing else puts it first.
- [ ] **Rewrite my new strings in a plain, warm voice.** Today, When to call, Visits: shorter, natural, nothing stiff. Example: "Save your labor & delivery number under Me, so it is one tap from here" → "Add your labor & delivery number under Me."
- [ ] **Translated slots, in every locale that has them, not only es/fr/ko.**
  - Each changed key is re-translated wherever it exists. Today that includes ru (the 2-hour pad threshold) and ar/ru/zh/zom (their own crisis lines), as well as es/fr/ko.
  - Then `node translation/stamp.js stamp <lang> <key>…`.
  - Done when `node translation/stamp.js report` lists none of the Section 1 keys as stale in any locale.

## 2. Small bugs
- [x] **ISO due dates seed one day early in the US.** `seedDatesFromMyInfo` (`public/app/core/dates.js`) and `public/app/tools/nausea.js` use `Date.parse()`, which reads `2027-03-04` as UTC midnight, so Chicago stores `2027-03-03` and her week count is off.
  - Parse with `parseIsoDate()`, never `Date.parse()`.
  - Seed from My Info only when the text is unambiguous: ISO `YYYY-MM-DD`, or a written month name. A plain `03/04/2027` doesn't seed.
- [x] UTC date off-by-one (`public/app/tools/jaundice.js` `max=`, `public/app/tools/appts.js` default date, `settings.js` export filename): use `isoDate(Date.now())`, never `toISOString()`.
- [ ] **Export misses keys** (`public/app/settings.js` `EXPORT_KEYS`): add `obiana.dates` and `myob.noticeAccepted`. Import reads the same list.
- [ ] Name exports `obiana-<date>.json` (local date).
- [x] `translation/merge.js` skips `pt-BR` batches without a word (its filename regex is `[a-z]{2,3}`). Accept every code in the worker's `LOCALES`.
- [ ] Delete the old root `CNAME`. It isn't deployed (only `public/` is), so this is cleanup only. Fix the stale "prod on GitHub Pages myob.robbiemed.org" note in the myob row of `PORTS.md`.

## 3. Translate page (`#/translate`, linked from Me, shareable)
Rework the existing Translation Helper (`public/app/contribute/translate.js`) into this page. It already
reads the live catalogs, shows "Needs updating" from the fingerprints and POSTs to `/api/suggest`.
Don't build a second tool beside it.
- [ ] Pick a language once.
- [ ] One sentence at a time:
  - where it appears ("Labor → Signs of labor");
  - the English;
  - the current translation, ready to edit;
  - **Send / Looks right / Skip**;
  - a progress count.
- [ ] Order, within each section: missing → **unreviewed machine draft** → outdated → existing to confirm.
  - Sections: When to call and its warning lists first, then tabs and Today, Visits, the cards in guide order, the rest.
- [ ] `{placeholders}` locked (including the unit tokens in 5); no keys, no code, no files.
- [ ] Sends automatically when online; queued in localStorage and retried when offline; no Export (remove the Helper's JSON export).
- [ ] Also: tap any sentence in the app to suggest a better wording (Me toggle). Build it on the existing `MYOB_EDIT_WRAP` slot wrapper, which already knows each slot's key. `contribute/improve.js` stays for culture/question/unclear notes.
- [ ] Same `/api/suggest` endpoint. Worker:
  - "Looks right" = a confirmation (`kind` column in D1);
  - confirmation counts are a signal for the review app, never an automatic merge (the endpoint is open, at 360/hr per IP);
  - Telegram: no message per sentence. An hourly Cron Trigger posts one digest when there's something new ("es: 23 sentences, 4 confirmations"). The worker keeps no session state.
- [ ] Review app: confirmations counted per sentence; progress per language.

## 4. Draft translations
- [ ] Machine-draft through the existing `translation/` pipeline, in this order:
  1. When to call, Today, Visits and the tab names, all languages.
  2. The 9 cards es/fr/ko are missing (preeclampsia, antenatal mental health, alcohol, tobacco/cannabis, fish, car seat, vitamin D, circumcision, common discomforts).
  3. ar/ru/zh cards.
  4. The rest.
- [ ] Every machine-drafted key is stamped **unreviewed** by `merge.js` (alongside its source fingerprint). Drafts are live for readers; the stamp only orders them on the Translate page. A translator's Send or Looks right clears it.
- [ ] Translators correct the drafts on the Translate page.
- [ ] EPDS is never machine-translated.
- [ ] `validate.js`/`merge.js` and the review merge accept only plain text plus `<br> <strong> <em>`, and keep `{placeholders}` and unit tokens byte for byte.

## 5. New content
- [ ] **New cards.** First the three that When to call depends on:
  - early bleeding/ectopic
  - preterm labor
  - itching/cholestasis

  Then:
  - crying/never shake
  - safety at home
  - medicines in pregnancy
  - opioids

  Seeds are dot `%pibleed`, `%piptl`, `%picry`, `%picouple` and `%pisafe`, plus `pi/ledger`.
- [ ] Each new card goes into the Section 4 queue as soon as it lands. Don't start the second group until the first group has drafts in every language that has the trimester cards.
- [ ] **Gaps inside cards:** RSV/COVID, toxoplasmosis, BP numbers, TLC-MAMA, VBAC rupture risk, circumcision care, breastfeeding and substances, milk storage, swaddling.
- [ ] **Trim the trimester cards** to what she feels and what to ask; the Visits timeline holds the schedule.
- [ ] `docs/CONTENT_MAP.md` updated for each card.

## 6. Units setting in Me
- [ ] US units (°F, lb, oz) by default; metric (°C, kg, mL) if she picks it.
- [ ] Trackers store one unit internally and show the chosen one.
- [ ] Card and When to call text: every value becomes a locked token in the English **and** in each translation, e.g. `{temp:100.4}` → "100.4°F" or "38°C", `{wt:5lb8oz}` → "5 lb 8 oz" or "2.5 kg". No regex over translated prose.
  - English has about 13 such values. Translations carry their own (es and ko have 7 °F each), so replace them by key, not by search-and-replace.
- [ ] `check.js` fails if a translation drops or alters a token its English has.
- [ ] The text around the tokens stays US.

## 7. Site polish
- [ ] **Security:** `public/_headers` (nosniff, referrer policy, no framing); escape tool strings by default.
- [ ] **Worker:**
  - content-type check;
  - real body size: read the body with an 8 KB cap. Don't trust `content-length`, which can be left off;
  - origin check;
  - `/api/health` runs a trivial D1 query;
  - the worker logs only its own failures (`console.error` of the error name, never request bodies) to Cloudflare. Nothing is sent from the app.
- [ ] **Accessibility:** label and enlarge the four delete buttons; move focus to the page heading on navigation.
- [ ] **Speed:** smaller Spanish/Afghan flag files (`es.svg` 81 KB, `af.svg` 19 KB); load the 8 EPDS/PHQ-9 scripts only inside the mood tool, not from `index.html`.
- [ ] **Sharing:** Open Graph tags, canonical, `robots.txt`, `sitemap.xml`, `?lang=` links with hreflang (root plus `?lang=` variants only; hash routes aren't indexed, so no per-card URLs); manifest `id`/`dir`/maskable icon.
- [ ] **No telemetry, ever.** No error reporter, beacon or analytics in the app. Breakage is caught before release by `check.js` and the browser run.
- [ ] **Docs:** README layout; TRANSLATING.md points to the Translate page.

## Order
1 and 2 first (small, needed before translators start). Then 3. Then 4 and 5 in parallel, with 6 and 7 alongside.

## Checks, every change
- `node scripts/check.js --compare`: only the intended strings change.
- `node translation/stamp.js report`: no clinical key (Section 1, When to call) is stale in any locale that has it.
- Chromium run on 127.0.0.1:3107 (stopped after):
  - every page in en/es/ar/ko/zom;
  - the Translate page, including offline send and Arabic typing;
  - a due date entered as `2027-03-04` with `TZ=America/Chicago` shows that date.
- Worker changes tested with a local D1 first.
- `node scripts/bump.js` before every push that changes what readers see. `index.html` is served from the cache first, so without a bump a correction never reaches anyone who already has the app.
- After each push: build passes, live site serves the new version and loads in en and ar.
- Push only with `git push obiana obiana-main:main`.

## Found while working
- `translation/merge.js` (full mode) writes `ui` only from the ui batches present. Run it for a language that has content batches but no ui batches and the locale's whole `ui` block is replaced with `{}`. Content has a guard for this; ui doesn't. (`--keys` mode patches in place and isn't affected.)
- ui strings carry no `srcHash`, so `stamp.js report` never shows a ui key as stale. When to call, Today and Visits are ui strings, so §1's "done when report lists none of the §1 keys" can't see them. Re-translate them with `run-kimi.sh --keys` regardless, and decide whether ui needs fingerprints before §3 orders "outdated".
- `translation/out/` still holds October's full batches for es/fr/ko/ar/ru/zh/zom. They no longer validate against today's snapshot, so full-mode merge skips them, but they are stale and worth deleting.
- `run-kimi.sh` full mode filters languages with `grep -qw "$lang"`, so asking for `pt-BR` would also match a `pt` batch. No `pt` locale exists today.
