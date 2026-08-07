# Running the translations

Three commands. Everything is resumable and every batch is validated before it
can be merged.

```bash
cd /home/user/Projects/myob

node translation/prepare.js      # 1. regenerate prompts (only after editing English)
bash translation/run-kimi.sh     # 2. run kimi over every batch  ← the long one
node translation/merge.js        # 3. merge validated output into i18n/locale.*.js
```

## What each step does

**1. `prepare.js`** reads `translation/source/*.en.json` and writes 84 prompt
files — 7 languages × (4 UI batches + 8 content batches). Each prompt is
self-contained: it embeds its own input JSON and names its own output path.
Re-run this only if you change the English strings.

**2. `run-kimi.sh`** feeds each prompt to `kimi -p` and validates the result
immediately.

- Resumable: a batch whose output already exists *and* validates is skipped.
  Interrupt it and re-run — it picks up where it stopped.
- Per-language: `bash translation/run-kimi.sh es fr` does only those.
- Failed batches are named at the end with the exact command to retry one.

Expect this to take a while: 84 batches, each up to 30 minutes of wall clock.
Run it per-language if you want to see results sooner:

```bash
bash translation/run-kimi.sh es      # ~12 batches
```

**3. `merge.js`** writes `i18n/locale.<lang>.js`. It **refuses to merge a
language with any failing batch** — a half-merged locale is harder to reason
about than an untranslated one, and the English fallback means an untranslated
locale is already fully usable.

After merging, bump the cache version in three places or returning users keep
the old copy: `CACHE_NAME` in `sw.js`, the `?v=` values in `index.html`, and
`ASSET_VERSION` in `i18n/i18n.js`.

## Checking the output yourself

```bash
node translation/validate.js                              # everything
node translation/validate.js translation/out/ko.ui.1.json # one batch, with warnings
```

**Errors** block merging. They are the things that silently break the app and
that you cannot spot by reading the translation:

| Error | Why it matters |
|---|---|
| missing / unexpected keys | a missing key falls back to English; an invented key is dead weight |
| placeholders changed | `{count}` → `{cuenta}` renders the literal text `{cuenta}` to the patient |
| HTML tags changed | a dropped `</p>` or `<li>` breaks the card layout |
| empty translation | blank UI |
| invalid plural category | `tp()` falls through to the wrong form |

**Warnings** do not block, but are worth a look — they are usually a lost unit
(`°F`, `mg`, `cm`) or a dropped clinical abbreviation (`GBS`, `Tdap`, `ACOG`),
which a patient needs in order to ask their care team about it.

## What is deliberately NOT in this pipeline

**The EPDS.** `translation/source/` does not contain it and never should. The
Edinburgh Postnatal Depression Scale is a validated instrument whose ≥10/≥13
cutoffs only hold for the exact wording of an officially validated translation.
A machine-translated version still produces a score, and that score looks
exactly as authoritative as a real one. Locales without an `epds` block have
the Mood Check-In disabled automatically; `merge.js` preserves any `epds` block
you add by hand. See `TRANSLATING.md`.

**`reviewed: true`.** `merge.js` always writes `reviewed: false`, which is what
shows the patient a machine-translation notice. Flip it by hand, per language,
only once a clinician has read that language's content.

## Zomi

The Zomi prompts tell the model not to invent clinical vocabulary — where no
settled term exists it should keep the English word and add a short plain
Zomi gloss, so a patient can still ask their nurse about it. Expect Zomi output
to need the most human correction of the seven; it is a low-resource language
and the model has seen far less of it. The `prompt` string for Zomi in
`i18n/i18n.js` (`'Na kam teel in'`, shown on the first-run picker) is a guess
and wants a native speaker's eye.
