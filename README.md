# Obiana: Pregnancy Handbook

An evidence-based, offline-capable pregnancy and newborn guide for patients,
in 17 languages. No ads, no tracking, no accounts. Everything a patient enters
stays on her own phone.

**Live: [obiana.app](https://obiana.app)**

> This guide describes prenatal care **as delivered in the United States**. The
> app says so on first run, in the language the reader picked. Care differs a
> great deal between countries.

## What it does

- **Guide**: prenatal visits, labour and delivery, postpartum recovery,
  newborn care, and an FAQ that takes on the myths patients actually arrive with
- **12 tools**: kick counter, contraction timer with 5-1-1 detection, feeding
  and diaper logs, jaundice tracker, blood pressure log, weight tracker, mood
  screening, birth plan builder, visit notes, plus two for contributors
- **Works offline**: a service worker precaches everything, including all 17
  locales and the flag artwork
- **Installable** on iOS and Android home screens
- **Search** that folds diacritics and segments Thai, Japanese, Chinese and
  Korean properly, so `cesarea` finds `cesárea` and `제왕절개` finds its card

## Languages

| Status | Languages |
|---|---|
| Interface + full guide content | English, Spanish, French, Korean |
| Interface only, content falls back to English | Arabic, Russian, Chinese |
| Stub, everything falls back to English | Japanese, Tagalog, Portuguese (Brazil), Pashto, Dari, Vietnamese, Thai, German, Polish, Zomi |

Fallback is per key, so a partly translated language is always usable rather
than half-broken. Every non-English locale shows the reader a
machine-translation notice until a clinician has reviewed it.

Arabic, Pashto and Dari render right-to-left throughout.

See [docs/TRANSLATING.md](docs/TRANSLATING.md) to help.

## Mood screening is gated on purpose

The mood tool uses the **EPDS** where an officially validated translation
exists, and the **PHQ-9** for French and Russian, which have none freely
available. A language with neither does not get a machine-translated
questionnaire; it gets a picker offering the validated instruments that do
exist, in whichever language the reader can manage.

The instrument language is chosen **independently of the interface language**,
because plenty of patients read a second language fluently.

`node scripts/epds/verify.js` checks every instrument: item count, that scores are
a permutation of 0-3, the total range, and that the reverse-scored items match
the published form. It cannot check that a translation is faithful. Only a
speaker of the language can.

Details and sources: [scripts/epds/SOURCES.md](scripts/epds/SOURCES.md).

## Layout

```
public/               THE SITE. Only this folder is deployed; nothing else is served.
  index.html          shell: every page and modal, sharing and hreflang tags
  styles.css          all styles, including dark mode, RTL and print
  app/
    core/             storage, dates, navigation, router, toast/undo, theme, PWA install
    guide/            structure.js (card list), cards.js (rendering), visits.js (visit
                      timeline), urgent.js (When to call), search.js
    tools/            one file per tool: kick, contractions, feeding, diapers, jaundice,
                      bp, weight, mood (loads its questionnaires on demand), birthplan,
                      appts, nausea; shared.js
    contribute/       translate.js (the Translate page, #/translate) and improve.js
                      ("Help Improve This Guide")
    today.js  myinfo.js  settings.js  first-run.js  language.js  boot.js
  sw.js               service worker, cache-first
  manifest.json       PWA metadata (icon-maskable-512.png for Android)
  _headers            security headers for every static file
  robots.txt  sitemap.xml   the root plus one ?lang= link per language
  flags/              bundled SVG flags (see NOTICE.md)
  i18n/
    i18n.js           locale loading, t(), units ({temp:…} tokens), formatting, search folding
    body-templates.js the HTML skeleton of every card, shared by all languages
    locale.<lang>.js  one file per language: ui strings + guide content + fingerprints
    epds/             validated screening instruments
worker/               Cloudflare Worker: /api/suggest, /api/feedback, /api/health
scripts/              check.js (preflight), bump.js (cache version), epds/ (instrument tooling)
translation/          drafting pipeline (prepare, validate, merge), fingerprints (stamp),
                      runtime audit; RUN.md
editor/               local English editor (127.0.0.1:3906)
review/               local app for reviewing what readers send in (127.0.0.1:3905)
docs/                 CONTENT_MAP (where every topic lives), NEXT (the work plan),
                      TRANSLATING, ROADMAP. docs/private/ is gitignored
```

Plain static files. No build step, no framework, no bundler.

## Running it

```bash
python3 -m http.server 3107 --bind 127.0.0.1 --directory public
```

After changing anything under `public/`, run `node scripts/bump.js` or
returning users keep the old copy. It moves `CACHE_NAME` in `sw.js`, the `?v=`
query strings in `index.html` and `ASSET_VERSION` in `i18n/i18n.js` together.

## Deployment

Cloudflare Workers static assets, deployed from `main` by Workers Builds.
`wrangler.jsonc` uploads `public/` and nothing else, so docs, tooling and private
notes elsewhere in the repo can never be served.

`not_found_handling` is deliberately left at the default rather than
`single-page-application`: the app has no client-side routes, and SPA handling
would return `index.html` with status 200 for a missing locale file, defeating
the fallback that both the service worker and the i18n loader rely on.

## Checks

```bash
node scripts/check.js              # everything below, plus a render of every card,
                                   # ui string and tool in every locale
node scripts/check.js --baseline   # save that render; then after a refactor:
node scripts/check.js --compare    # must print "identical" if nothing should change
node translation/lint-locales.js   # foreign-script leakage in locale files
node scripts/epds/verify.js        # screening instrument structure
node translation/validate.js       # translation batches
```

Plus a runtime audit that renders the app in two languages and diffs the DOM,
which catches untranslated strings no source scan can see. Paste
`translation/audit.js` into the console and call `myobI18nAudit('ko')`.

## Contributing

Both contribution paths are in the app itself:

- **Help translate** (Me, or Tools > Help Us Improve; `#/translate/<lang>` opens
  straight on a language): one sentence at a time, with the English, where it
  appears, and the current translation ready to edit. Send, Looks right or Skip.
  Works offline; what you send waits and goes when you are back online.
- **Help Improve This Guide**: tell us how something is done in your culture,
  ask about a topic that is missing, or flag a passage that read badly

Submissions go to a Cloudflare D1 database. Nothing is applied automatically.
See [docs/TRANSLATING.md](docs/TRANSLATING.md).

## Licence

Copyleft, deliberately. Fork it, rebrand it, add your own content, deploy it.
If you do, it has to stay free and open, and link back here.

- **Code**: [AGPL-3.0](LICENSE). Hosting a modified version counts as
  distributing it, so a hosted fork must publish its source too.
- **Guide content and translations**: [CC BY-SA 4.0](LICENSE-CONTENT).
- **Bundled third-party material** keeps its own terms and is not relicensed
  by either: see [NOTICE.md](NOTICE.md).

## Disclaimer

Health education, not medical advice, and not a substitute for care from a
qualified clinician. Non-English content is machine-translated pending
clinician review, and the app tells readers so.
