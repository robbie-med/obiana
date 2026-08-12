# Roadmap

Findings from three full-app audits (2026-08-12): i18n, guide content, and UI/UX &
accessibility. Nothing here is applied yet — check items off as they land.
Line references are as of commit `4bef874`; expect drift.

- [1. i18n](#1-i18n)
- [2. Content overhaul](#2-content-overhaul)
- [3. UI/UX & accessibility](#3-uiux--accessibility)

---

## 1. i18n

### Bugs (user-visible)

- [ ] Add missing keys `tool.appts.untitledVisit` and `tool.appts.editVisit` to
      `locale.en.js` — users currently see the raw key strings (`tools.js:1203,1273`)
- [ ] Add `data-i18n-html` to the `apptType.obTriage` option (`index.html:700`) —
      renders literal "L&amp;D"
- [ ] Key the hardcoded English in `tools.js`: `Reached in …` (139),
      `Contraction Ending` (201), raw `left/right/both` side ids (360),
      `Bottle · oz` (361), diaper toasts (458), `Wet/Dirty/Wet + Dirty` labels
      (468), `You have gained … lbs so far.` (673), `Wk` / `lbs` units
      (703–705), weight toast (734), **`Important` on the self-harm alert**
      (928), `Additional notes:` (1108), `Generated with Pregnancy & Birth
      Guide` (1109), `No questions added` (1234), `Visit updated/added` (1297)
- [ ] `content.js:656,660` — use existing key `myinfo.saveMyInformation`;
      button currently reverts to English after save
- [ ] Mood tool: show the actual instrument name (PHQ-9 for fr/ru) in the
      header, not always "Edinburgh Postnatal Depression Scale"
      (`tools.js:832`); use per-instrument `cutoffs` instead of hardcoded
      `score >= 10` (`tools.js:926`)
- [ ] `tools.js:1232` — use `I18n.fmt`/`intlTag()` instead of hand-built locale
      tag (Dari currently gets Jalali calendar + Persian digits)
- [ ] EPDS question/options need `lang`/`dir` attributes (`tools.js:848,852`) —
      Arabic questionnaire under an LTR UI renders without `dir="rtl"`
- [ ] Translate `tool.nausea`, `tool.i18n`, `tool.improve` into the 9 locales
      that lack them: de, ja, pl, prs, ps, th, tl, vi, zom (nausea tool is
      end-user-facing; currently falls back to English wholesale)
- [ ] Localize `<meta name="description">` — `ui.app.description` exists but is
      never applied (`index.html:10`)

### Minor

- [ ] i18n the hardcoded placeholders: `index.html:249,724,728`,
      `index.html:629–681`, `tools.js:661,665`
- [ ] Route numbers through `I18n.fmt.num`: `nausea-tool.js:331,399`,
      `improve-tool.js:81,128`, `translate-tool.js:124`, `content.js:523`
- [ ] Use `tp()` for min/contraction counts so ru/ar/pl can inflect
      (`tools.js:290,296,299,360`)
- [ ] RTL-physical CSS in JS: `text-align:left` on the self-harm callout
      (`tools.js:927`), `border-left`/`margin-left` (921, 474, 872)
- [ ] BMI range suffixes / `lbs` units assemblable per locale
      (`tools.js:641–644,672`)

### Hygiene

- [ ] Delete orphan key `tool.mood.scoreOutOf30Based` from es/fr/ko/ar/ru/zh
- [ ] Delete dead en keys: `tool.mood.availableIn`, `tool.mood.switchToEnglish`,
      `tool.mood.inThePast7Days`, `tool.i18n.showMarkup`, `tool.i18n.keepTags`
- [ ] Refresh stale manifests: `_html_keys.json` (2 entries),
      `_tools_keys.json` (4 entries)
- [ ] zom locale ui block is English text — translate or leave intentionally
- [ ] EPDS instrument `cnh` never auto-matches the `zom` UI locale — map or
      document
- [ ] Favicon precache entries carry `?v=59` but the page requests them
      unprefixed — dead precache entries (`sw.js:11–13`)
- [ ] Branding drift `obiana` vs `myob` (`index.html:392`,
      `translate-tool.js:257`)
- [ ] Unescaped user input into innerHTML: `tools.js:1080,1138,1244,1250,1252`;
      `content.js:389–404` (stored-XSS surface found during audit)

---

## 2. Content overhaul

Rewrites below are proposals; anything accepted invalidates the es/fr/ko/ar/ru/zh
translation of that passage (falls back to English until retranslated).

### Over-stated / one-sided (rewrites ready)

- [ ] **Continuous fetal monitoring** (`stages-of-labor`, `locale.en.js:937–938`)
      — add that intermittent monitoring has equally good outcomes for low-risk
      labor with fewer interventions (Cochrane), as an option to ask about
- [ ] **6-week pelvic rest** (`pelvic-rest`, 1135) — drop the false ACOG
      attribution; frame as convention: bleeding stopped, healing, feels ready
- [ ] **Kick counting** (`tool.kick.goal`, 240) — add caveat that formal
      counting isn't proven to reduce stillbirth (AFFIRM); the point is knowing
      baby's normal pattern
- [ ] **Epidural tradeoffs** (`epidural` 994–997, `faq-epidural-csec`
      1470–1472) — add longer pushing stage + higher vacuum/forceps rate;
      remove "no too early or too late" (fast labor can leave no time)
- [ ] **Weak exercise claim** (`exercise-pregnancy`, 837) — delete "babies of
      active mothers have healthier heart rate patterns"; soften 836 to
      "associated in some studies with"
- [ ] **Docusate oversold** (`physical-recovery`, 1106–1107) — evidence is
      weak; remove "straining risks tearing stitches"
- [ ] **Water-breaking deadline** (`faq-water-breaking`, 1488) — replace
      "complete delivery within 18–24 hours" with infection-risk-rises framing
- [ ] **Newborn procedures blanket justification** (`faq-newborn-procedures`,
      1554) — differentiate: strong evidence for vitamin K + heel stick; eye
      ointment weaker (state mandates, dropped elsewhere); hep B birth dose
      matters most when maternal status positive/unknown
- [ ] **Routine IV** (`what-happens-on-arrival`, 898) — note saline lock /
      declining is an option for low-risk patients
- [ ] "About 30% of U.S. births are by C-section" → "About 1 in 3" (1004)

### Gaps (new content to write)

- [ ] **`faq-vaccines` is a stub** (1445–1451) — write the real answer: Tdap +
      flu recommended with strong safety records; COVID/RSV offered, ask about
      timing; live vaccines (MMR, varicella) wait until after delivery
- [ ] Alcohol / tobacco / cannabis in pregnancy — biggest topic omission
- [ ] Miscarriage / early pregnancy loss card
- [ ] Fish & mercury guidance
- [ ] Preeclampsia explainer card (signs are scattered; mention low-dose
      aspirin prophylaxis for high-risk)
- [ ] Mental health during pregnancy (antenatal anxiety/depression, SSRI
      safety)
- [ ] Smaller: circumcision decision, vitamin D drops for breastfed infants,
      common discomforts (heartburn, round ligament pain, hemorrhoids,
      insomnia), dental care, car-seat use

### Verboseness / duplication

- [ ] Postpartum visit schedule + 6-week questions are duplicated in
      `postpartum-danger` (1185–1198) and `followup-appts` (1392–1403) — keep
      the table in `followup-appts`, pointer from `postpartum-danger`

### Deliberately left alone (calibration verified)

Tdap/RhoGAM framing, vitamin K claim, safe-sleep stats, formula tone, NIPT/quad
framing, GBS card, LAM 98%, jaundice/BP thresholds, B6/doxylamine dosing,
first-bath delay, dry cord care, VBAC 60–80%, all myth-FAQs except the two
above. No pharma-promotional content was found.

---

## 3. UI/UX & accessibility

### Broken / functional

- [ ] **Birth-plan printing outputs a blank page** — `#print-view` is inside
      `#app`, which print CSS hides (`index.html:736`, `styles.css:1425`).
      Move `#print-view` to a direct child of `<body>`
- [ ] **Feed modal logs the wrong type** — module `_feedType/_feedSide`
      persist while the modal reopens showing Breast/Left (`tools.js:317–318`,
      `index.html:614,622`). Re-sync pills or reset state on open
- [ ] **Guard all localStorage reads/writes** — one corrupt key blanks every
      tool (`tools.js:34,177,316,414,555,634,788,1003,1153`,
      `content.js:569`); unguarded writes toast success for unsaved data in
      private mode. Generalize the nausea tool's `safeLoad` pattern
- [ ] Toast `white-space:nowrap` overflows with long translations
      (`styles.css:889`) → max-width + wrapping
- [ ] Export omits nausea data, `myob.epdsLang`, v2 flags; no import path
      (`content.js:741–757`)

### Accessibility — semantics

- [ ] Add heading structure: page/hero titles are divs, card bodies jump to
      `<h4>` — h1 per page, card title h2, body h3
- [ ] Modals: add `role="dialog"`/`aria-modal`/`aria-labelledby`, focus move +
      trap + ESC + restore, inert background (`tools.js:6–13`,
      `index.html:607–728`). lang-pop/us-notice already show the pattern
- [ ] Add a visible Cancel/✕ to every modal — scrim-tap currently discards
      entered data silently
- [ ] Associate every label (`for`/`id`) across all 4 modals + weight profile +
      My Info; `aria-label` on `#search-input`; real label for `#notes-field`
- [ ] Replace clickable divs with buttons: accordions
      (`content.js:392,400` + `aria-expanded`), search results (535–553),
      visit-note card header only (`tools.js:1236` — nested interactives are
      invalid), **EPDS options as real radios/fieldset** (`tools.js:851`),
      `.info-strip` (`index.html:141`)
- [ ] Live regions: `role="status"` on `#toast`; `role="alert"` on the 5-1-1
      alert, BP-urgent, feed-low, kick warning, EPDS result
- [ ] Landmarks `<header>`/`<main>` + skip link; `aria-current` on bottom nav;
      `aria-pressed` on pill groups; accessible names + 44px on delete "×"
      buttons; `aria-hidden` on decorative SVGs
- [ ] Snack clock: `aria-pressed` + state in label; stop re-rendering
      `innerHTML` on toggle (destroys focus) — update wedges in place
      (`nausea-tool.js:48,386–390`)

### Dark mode & contrast

- [ ] Re-map accent hues under `body.dark` — `--teal` text on dark card is
      1.64:1 (styles.css:1397+); hits active nav, selected pills, form titles,
      links
- [ ] Move JS-inline colors to classes: diaper buttons (`tools.js:429–436`),
      EPDS score card (892–894, 921), 5-1-1 alert (287–294); delete the dead
      `body.dark .score-result-card` rule (`styles.css:1419`)
- [ ] Fix contrast: `--ink-soft` 4.38:1 → darken; `--gold` text 3.53:1;
      `.bp-pill` white-on-orange ≈2:1; offline banner 3.79:1; `.badge-myth`
      2.81:1 dark
- [ ] Add `color-scheme` so native date/select/scrollbars follow dark mode
- [ ] Global `:focus-visible` style; restore outlines on inputs (currently
      `outline:none` + invisible-in-dark border swap)
- [ ] Honor `prefers-reduced-motion`; switch px→rem and unpin `font-size:16px`
- [ ] Touch targets ≥44px: `#lang-btn` 32px, `#theme-btn` 34px, `#install-btn`
      32px, `#search-clear` 20px (+ aria-label), choice pills ~31px

### Consistency / cobbled-together

- [ ] One destructive-action policy: confirm() vs silent delete is currently
      random (cx clear/appt delete/i18n clear vs feed/diaper/weight/nausea
      rows); three delete affordances; no undo anywhere
- [ ] One save-feedback pattern (toast for log events, silent for toggles,
      inline for network ops)
- [ ] Replace the 7 ad-hoc `.big-action-btn` wrapper paddings and invented
      inline ghost/danger/link buttons with shared classes
- [ ] Delete dead code: `isBody=false` branch + ~30 lines dead CSS
      (`translate-tool.js:142–167`, `styles.css:1881–1921`); dead classes
      `history-row`, `nausea-level`, `bp-notes-area` (unstyled production
      textarea); duplicated `.choice-pill` border; 12 duplicate title key
      pairs (`tools.*` vs `tool*.*`)
- [ ] Add semantic status tokens (`--danger/--success/--info` + light/dark
      variants); ~30 ad hoc hex values bypass tokens; tokenize the z-index
      ladder
- [ ] Kick counter: mis-tap undo or debounce; `addDiaper` double-tap guard
- [ ] Small stuff: toast timer race; per-tool history date formats; sticky
      chrome stack on small phones; Mood tool category (antenatal use)

### Verified consistent (do not regress)

Tool page chrome/back bars, tools-grid IA, empty states, bottom-sheet modals
pattern, logical-property RTL + flip block, real `<table>`s in cards,
`inputmode`/`type` choices on inputs.
