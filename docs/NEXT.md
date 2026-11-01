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
- [x] **Family doctor everywhere a provider is named.** About 21 places in `public/i18n/locale.en.js`:
  - "Call Your OB / Midwife" → "Call your family doctor, OB or midwife"
  - "doctor or midwife" (×3) → "family doctor, OB or midwife"
  - "Pediatrician" (×14) → "your baby's doctor" where it means whoever sees the baby.
  - Same in the new Visits/Today/When to call strings.
- [x] **Bleeding threshold: 1 pad in an hour, everywhere.** postpartum-danger t3, physical-recovery, csection, Home strings, `ui` `soaking1PadHr2`.
- [x] **5-1-1 stays as written.**
- [x] **Kick counting is optional.** Something you can do, not something you must. Kick tool intro, the Tools card text ("10 moves in 2 hours"), the Visits line.
- [x] **Self-harm: every card says the same as When to call.** antenatal-mental-health, mood-ppd and the mood tool currently differ (988 / ER / doctor).
  - No 988 line before the mood questions. The mood tool shows `tool.mood.selfHarmGuidance` (with 988) only after an answer; check that nothing else puts it first.
- [x] **Rewrite my new strings in a plain, warm voice.** Today, When to call, Visits: shorter, natural, nothing stiff. Example: "Save your labor & delivery number under Me, so it is one tap from here" → "Add your labor & delivery number under Me."
- [x] **Translated slots, in every locale that has them, not only es/fr/ko.**
  - Each changed key is re-translated wherever it exists. Today that includes ru (the 2-hour pad threshold) and ar/ru/zh/zom (their own crisis lines), as well as es/fr/ko.
  - Then `node translation/stamp.js stamp <lang> <key>…`.
  - Done when `node translation/stamp.js report` lists none of the Section 1 keys as stale in any locale.
  - **Done 2026-11-01:** 44 English strings (`translation/keys/s1.txt`, `s1b.txt`), translated by Claude in-session (not Kimi) into es/fr/ko (30), ar/ru/zh (15+1), zom (2) and the nine stub locales (the disclaimer). `merge.js --keys` stamped the content keys. `translation/clinical-keys.txt` now gates them, plus the slots When to call is built from.

## 2. Small bugs
- [x] **ISO due dates seed one day early in the US.** `seedDatesFromMyInfo` (`public/app/core/dates.js`) and `public/app/tools/nausea.js` use `Date.parse()`, which reads `2027-03-04` as UTC midnight, so Chicago stores `2027-03-03` and her week count is off.
  - Parse with `parseIsoDate()`, never `Date.parse()`.
  - Seed from My Info only when the text is unambiguous: ISO `YYYY-MM-DD`, or a written month name. A plain `03/04/2027` doesn't seed.
- [x] UTC date off-by-one (`public/app/tools/jaundice.js` `max=`, `public/app/tools/appts.js` default date, `settings.js` export filename): use `isoDate(Date.now())`, never `toISOString()`.
- [x] **Export misses keys** (`public/app/settings.js` `EXPORT_KEYS`): add `obiana.dates` and `myob.noticeAccepted`. Import reads the same list.
- [x] Name exports `obiana-<date>.json` (local date).
- [x] `translation/merge.js` skips `pt-BR` batches without a word (its filename regex is `[a-z]{2,3}`). Accept every code in the worker's `LOCALES`.
- [x] Delete the old root `CNAME`. It isn't deployed (only `public/` is), so this is cleanup only. Fix the stale "prod on GitHub Pages myob.robbiemed.org" note in the myob row of `PORTS.md`.

## 3. Translate page (`#/translate`, linked from Me, shareable)
Rework the existing Translation Helper (`public/app/contribute/translate.js`) into this page. It already
reads the live catalogs, shows "Needs updating" from the fingerprints and POSTs to `/api/suggest`.
Don't build a second tool beside it.
- [x] Pick a language once.
- [x] One sentence at a time:
  - where it appears ("Labor → Signs of labor");
  - the English;
  - the current translation, ready to edit;
  - **Send / Looks right / Skip**;
  - a progress count.
- [x] Order, within each section: missing → **unreviewed machine draft** → outdated → existing to confirm.
  - Sections: When to call and its warning lists first, then tabs and Today, Visits, the cards in guide order, the rest.
- [x] `{placeholders}` locked (including the unit tokens in 5); no keys, no code, no files.
- [x] Sends automatically when online; queued in localStorage and retried when offline; no Export (remove the Helper's JSON export).
- [x] Also: tap any sentence in the app to suggest a better wording (Me toggle). Build it on the existing `MYOB_EDIT_WRAP` slot wrapper, which already knows each slot's key. `contribute/improve.js` stays for culture/question/unclear notes.
- [x] Same `/api/suggest` endpoint. Worker:
  - "Looks right" = a confirmation (`kind` column in D1);
  - confirmation counts are a signal for the review app, never an automatic merge (the endpoint is open, at 360/hr per IP);
  - Telegram: no message per sentence. An hourly Cron Trigger posts one digest when there's something new ("es: 23 sentences, 4 confirmations"). The worker keeps no session state.
- [x] Review app: confirmations counted per sentence; progress per language.
- **Session D, 2026-11-01:** the page is `public/app/contribute/translate.js` (`#/translate`, `#/translate/<lang>` to share; the old `#/tool-i18n` lands there). Me and the Tools card link to it. The worker stores `kind` (`suggest`/`confirm`) and posts one hourly digest; the D1 column comes from `worker/migrations-0002-kind.sql`. Session E (same day): Me has a "Tap a sentence to suggest better wording" switch (translated languages only). It marks guide sentences through `MYOB_EDIT_WRAP` (which now also gets the rendered text) and static text through `data-i18n`, and sends through the same queue. The review app counts "Looks right" per sentence, shows progress per language, and "mark reviewed" clears a machine draft's `unreviewed` mark. `OBIANA_D1_LOCAL=<dir>` points the review app at a local D1 for testing.

## 4. Draft translations
- [ ] Machine-draft through the existing `translation/` pipeline, in this order:
  1. When to call, Today, Visits and the tab names, all languages. **Done 2026-11-01 (session F)** for all 15 languages except Zomi (`translation/keys/f4a.txt`, `f4b.txt`): es/fr/ko 89 strings, ar/ru/zh 102 (with the When-to-call card sentences, in new card shells), the nine smaller locales 121.
  2. The 9 cards es/fr/ko are missing (preeclampsia, antenatal mental health, alcohol, tobacco/cannabis, fish, car seat, vitamin D, circumcision, common discomforts). **Done 2026-11-01** for 8 of them (`translation/keys/f4c.txt`); common discomforts waits for its §5 split.
  3. ar/ru/zh cards.
  4. The rest.
- [x] Every machine-drafted key is stamped **unreviewed** by `merge.js` (alongside its source fingerprint). The Translate page already reads it as a top-level `unreviewed` map in the locale, keyed like `/api/suggest` keys (bare ui path, `content.<id>.t.<n>`), e.g. `"unreviewed": {"content.mfm.t.3": 1}`. Drafts are live for readers; the stamp only orders them on the Translate page. A translator's Send or Looks right clears it.
- [ ] Translators correct the drafts on the Translate page.
- [x] EPDS is never machine-translated. (`englishOf()` excludes it; the EPDS text isn't in the locale catalogs.)
- [x] `validate.js`/`merge.js` and the review merge accept only plain text plus `<br> <strong> <em>`, and keep `{placeholders}` and unit tokens byte for byte.

## 5. New content
- [ ] **New cards.** First the three that When to call depends on:
  - early bleeding/ectopic
  - preterm labor
  - itching/cholestasis

  Then split **Common Discomforts** into cards (one session; your clinical review of the drafts before merge). Each card: why it happens, what to try first, over-the-counter medicines that are fine in pregnancy, when to call. Warning-sign cards first:
  - Peeing: more often, leaking, or burning (UTI; fever with back or side pain is a kidney infection, go in)
  - Headaches, stuffy nose, nosebleeds, bleeding gums (a headache that won't go away is a preeclampsia sign: point to it)
  - Constipation and hemorrhoids (fiber toward 25–30 g a day, water, walking, footstool, less-iron vitamin; psyllium or methylcellulose, then MiraLAX; Colace safe but weak; senna or bisacodyl now and then; no mineral or castor oil; witch hazel, sitz bath, short hydrocortisone. Call for more than streaks of blood, a hard very painful lump, bad belly pain or vomiting, days without a bowel movement with cramping)
  - Heartburn
  - Back, hip and round ligament pain
  - Sleep and leg cramps
  - Swelling and varicose veins

  Itching stays with the cholestasis card above. Retire `common-discomforts` (check.js allows removing a whole card; old links land on Prenatal). Move each existing sentence to its new card with its translation and fingerprint, so es/fr/ko keep what they have; translate only new or changed sentences. Point physical-recovery's hemorrhoid/constipation lines at the new card. Clears the discomfort `[gap]` and `[twice]` lines in `docs/CONTENT_MAP.md`.

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
- **Done 2026-11-01:** obiana.app was serving a Cloudflare Web Analytics beacon (`static.cloudflareinsights.com/beacon.min.js`), injected at the edge into HTML for browsers. Turned off with the zone setting `rum` = off (the work_admin token can't edit the Web Analytics site itself; the site record and its old data still exist, beacon not served). robbiemed.org has the same auto-injected beacon; not touched.
- myob.robbiemed.org is not the obiana Worker. It is GitHub Pages from the myOB repo, frozen at asset version 60 (2026-08-16, "Point this site at Obiana…"). "Live site serves the new version" means obiana.app.
- zom `tool.mood.selfHarmGuidance` keeps its old Zomi wording (doctor, 988 or the ER). The new English adds "call 911 or go to the ER now"; that needs a Zomi speaker, not a guess. The contact labels were re-translated.
- Six Home strings are rendered nowhere: `home.afterDelivery`, `soaking1PadHr2`, `woundOpensOrOozes`, `legRednessSwelling`, `chestPainOrTroubleBreathing`, `thoughtsOfSelfHarm`. When to call takes the after-birth list from postpartum-danger t3. `soaking1PadHr2` was corrected anyway; the rest could be deleted.
- es/fr/ko have no Today, When to call or Visits ui strings at all (they show English), so §1's voice rewrites only reached English. That's §4 drafting, not a regression.
- Newborn fever reads "≥ 100.4°F rectal" in normal-newborn t32 and "&gt;100.4°F" elsewhere (Home, postpartum-danger, csection). Pick one.
- es/fr/ko each have the same 18 stale content keys from before §1 (exercise-pregnancy t5/t6, what-happens-on-arrival t5/t9, pelvic-rest t0/t1, several FAQs…). None are clinical-keys; they need the same `--keys` pass.
- The Translate page can only call a **content** sentence outdated: ui strings still carry no fingerprint (see above), so a ui string whose English changed is shown as "to confirm". Decided for §3: content only. Adding ui fingerprints is a merge.js/stamp.js change, best done with §4.
- Until session E, the review app lists "Looks right" rows (`kind = 'confirm'`, suggestion = what is shipped) as ordinary suggestions. Accepting one rewrites the same text, so it's harmless, just noise.
- Drafts typed into the old Translation Helper stay in `myob.i18nSuggestions` on that phone. They were never sent, and the new page doesn't send them (they were never confirmed for sending).
- The nine stub locales show the Tools card name "Help translate" in English; only their privacy line was re-translated.
- `validate.js` warns `"mg" count 0 -> 1` on Tagalog text: it reads the plural marker "mga" as the unit mg.
- Tap-to-suggest covers guide sentences and static text that isn't a button or link. Card titles (they're the accordion buttons), nav and tool labels, and text tools build in JS (e.g. When to call's lists, Visits) can't be tapped; they're all on the Translate page.
- The review app counts 1,388 English strings for Spanish, the Translate page 1,373: the review app counts each plural form, the page skips plurals.
- **Done 2026-11-01 (user report):** a due date set on Today never showed in Me, and Me's "Save My Information" wrote its stale empty date fields back over it. Me now reads `obiana.dates` every time it opens and saves a date the moment it changes; Save no longer touches dates. The second, free-text "Due date" under My Pregnancy Details is gone (an old value is kept in storage, not shown).
- **Done 2026-11-01 (user report):** Me has a Settings section: text size (zooms the reading area; the stylesheet is in px), language, dark mode, and the tap-to-suggest switch.
- **Done 2026-11-01 (user report):** plain-voice pass. Removed every small subtitle (tool cards, Me, Today's When to call button, Home hero, the Tools note) and the "who says so" sources line; rewrote the disclaimers, privacy line, machine-translation notice, US-care notice, Help Improve copy and print footers. Zomi keeps its old wording for the two notices it had.
- Still to look at for the same voice: guide card subtitles (`content.<id>.sub`) under every card title.
- **Done 2026-11-01 (user report):** British English in the English source ("centre", "anaemia", "grey", "travelling", "towards", "in hospital", "straight away", "late on", "a great deal", "a litre a day" → "32 ounces (1 liter)"). check.js now fails on British spelling, idiom and UK units in `locale.en.js`. The one translated sentence affected (prenatal-vitamins t3, spelling only) was re-stamped in es/fr/ko rather than re-translated.
- How drafts are made now (session F): `node translation/prepare.js --keys <file> --draft [lang…]` writes prompts for only what each locale lacks (cards included); Claude writes `translation/out/<lang>.keys.<tag>.json` from them; `validate.js`; `merge.js --keys <tag>` creates any missing card (blank slots read as English) and marks every drafted key `unreviewed`.
- Zomi got no drafts: nobody here writes Zomi reliably, and step 1 is crisis text. It needs a Zomi speaker on the Translate page (`translation/ZOMI-NEEDED.md`).
- **Done 2026-11-01 (user report):** "a · b · c" sentences in cards are drawn as real bulleted lists (cardBody, all languages, no text change); tool readouts no longer use "·".
