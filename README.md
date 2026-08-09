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

See [TRANSLATING.md](TRANSLATING.md) to help.

## Mood screening is gated on purpose

The mood tool uses the **EPDS** where an officially validated translation
exists, and the **PHQ-9** for French and Russian, which have none freely
available. A language with neither does not get a machine-translated
questionnaire; it gets a picker offering the validated instruments that do
exist, in whichever language the reader can manage.

The instrument language is chosen **independently of the interface language**,
because plenty of patients read a second language fluently.

`node i18n/epds/verify.js` checks every instrument: item count, that scores are
a permutation of 0-3, the total range, and that the reverse-scored items match
the published form. It cannot check that a translation is faithful. Only a
speaker of the language can.

Details and sources: [i18n/epds/SOURCES.md](i18n/epds/SOURCES.md).

## Layout

```
index.html            shell: every page and modal, no inline JS or CSS
styles.css            all styles, including dark mode, RTL and print
content.js            card structure, nav, search, My Info, PWA, language picker
tools.js              the interactive tools
sw.js                 service worker, cache-first
manifest.json         PWA metadata
flags/                bundled SVG flags (see NOTICE.md)
i18n/
  i18n.js             locale loading, t(), formatting, search folding
  locale.<lang>.js    one file per language: ui strings + guide content
  translate-tool.js   in-app Translation Helper
  improve-tool.js     in-app "Help Improve This Guide"
  epds/               validated screening instruments + their verifier
translation/          batch translation pipeline, validators, runtime audit
worker/               Cloudflare Worker: /api/suggest, /api/feedback
review/               local desktop app for reviewing what readers send in
```

Plain static files. No build step, no framework, no bundler.

## Running it

```bash
python3 -m http.server 3107 --bind 127.0.0.1
```

After changing anything, bump the version in three places or returning users
keep the old copy: `CACHE_NAME` in `sw.js`, the `?v=` query strings in
`index.html`, and `ASSET_VERSION` in `i18n/i18n.js`.

## Deployment

Cloudflare Workers static assets, deployed from `main` by Workers Builds.
`wrangler.jsonc` serves the repo root; `.assetsignore` keeps tooling and docs
out of the upload.

`not_found_handling` is deliberately left at the default rather than
`single-page-application`: the app has no client-side routes, and SPA handling
would return `index.html` with status 200 for a missing locale file, defeating
the fallback that both the service worker and the i18n loader rely on.

## Checks

```bash
node translation/lint-locales.js   # foreign-script leakage in locale files
node i18n/epds/verify.js           # screening instrument structure
node translation/validate.js       # translation batches
```

Plus a runtime audit that renders the app in two languages and diffs the DOM,
which catches untranslated strings no source scan can see. Paste
`translation/audit.js` into the console and call `myobI18nAudit('ko')`.

## Contributing

Both contribution paths are in the app itself, under **Tools > Help Us Improve**:

- **Translation Helper**: every phrase against its English source, with a
  submit button per phrase
- **Help Improve This Guide**: tell us how something is done in your culture,
  ask about a topic that is missing, or flag a passage that read badly

Submissions go to a Cloudflare D1 database. Nothing is applied automatically.

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
