# Sourcing official EPDS translations

The EPDS may be reproduced **without seeking permission, provided the authors,
title and source are quoted** (© 1987 The Royal College of Psychiatrists). The
app carries that citation in `epds.attribution`. So embedding official
translations is legitimate — the constraint is accuracy, not licensing.

## Why these are not machine-translated, and not transcribed by an LLM either

Two separate risks:

1. **Translation.** Cutoffs (≥10, ≥13) hold only for the exact wording of a
   validated translation. A fluent re-translation is a different instrument
   that still emits an authoritative-looking score.

2. **Transcription.** Option *order* carries the score. The official form
   alternates direction — items 1, 2, 4 run best-first (0→3), items 3, 5, 6,
   7, 8, 9, 10 run worst-first (3→0). This is deliberate: it stops a
   respondent straight-lining down one column.

   The English version in this app originally normalised every item to
   best-first. Arithmetically the totals still worked, but straight-lining the
   first column scored **0** instead of **21**. That is exactly the failure the
   alternation exists to prevent, and it was invisible from reading the code.

   The same mistake made while transcribing an Arabic or Korean PDF would be
   undetectable to anyone who does not read the language. **Whoever pastes a
   translation in must be able to read it.**

## Current status

| Language | Status |
|---|---|
| English | ✅ shipped — verbatim from the published form |
| Spanish | ✅ shipped — MHCS, mechanically extracted, **checked item-by-item against English** (this was the pipeline's control) |
| Chin (Hakha) | ✅ shipped — MHCS, mechanically extracted, order confirmed via the form's own yes/no particles |
| Korean | ⏳ extracts 10/10 items but options wrap across lines; 2 items short |
| Chinese (Simp.) | ⏳ same wrapping issue on 1 item |
| Arabic | ⏳ text layer is wrapped in bidi control characters, so item numbers do not match; parser needs a bidi-aware pre-pass |
| French | ❌ not on MHCS — try eCALD |
| Russian | ❌ not on MHCS |
| Burmese | ❌ **no downloadable validated form found anywhere.** Validation studies exist (Thai–Myanmar border 2017; Myanmar M-EPDS 2020, which reports a cutoff of 10/11, not 13) but the instrument text is not published for download |
| Zomi (Tedim) | ❌ no validated version found |

Re-run an extraction with:

```bash
node i18n/epds/extract.js <lang> path/to/Official.pdf
node i18n/epds/verify.js
```

`extract.js` refuses to emit anything it cannot parse cleanly — including a
guard that rejects ASCII margin furniture leaking into a non-Latin form, which
is how `NOWRITING` first ended up as option 4 of a Korean item while every
structural check still passed.

## Where the validated versions are published

NSW Health Multicultural Health Communication Service publishes translations
linguistically validated by Western Sydney Local Health District Translation
Services (forward and back translation), in both antenatal and postnatal
variants:

| Language | Antenatal | Postnatal |
|---|---|---|
| Spanish | `mhcs.health.nsw.gov.au/publications/epds/spanish-2013-antenatal` | `.../epds/spanish` |
| Korean | `.../epds/korean-2013-antenatal` | `.../epds/korean` |
| Arabic | `.../epds/arabic-2013-antenatal` | `.../epds/arabic` |
| Chinese (Simplified) | `.../epds/chinese-simplified-2013-antenatal` | `.../epds/chinese-simplified` |
| Chin (Hakha) | `.../epds/chin-hakha-2013-antenatal` | `.../epds/chin-hakha` |

Index: <https://www.mhcs.health.nsw.gov.au/publications/epds>

Further validated versions with per-language validation notes:
<https://resources.ecald.com> (eCALD, New Zealand) — includes French and others.

### Two cautions

- **Chin (Hakha) is NOT Zomi (Tedim Chin).** They are different Chin languages.
  Do not substitute one for the other. If no validated Zomi EPDS exists, leave
  Zomi gated — the app already handles that correctly.
- **Russian and French** are not on the MHCS index. Published validated
  versions exist in the literature; source them with their validation paper so
  the cutoffs can be set from that study.

## Antenatal vs postnatal

MHCS publishes both. This app uses one form across pregnancy and postpartum.
The items are identical; antenatal use is validated separately (Murray & Cox
1990). If you adopt the antenatal wording for a language, keep it consistent
with the English.

## Adding one

Put the official text into `i18n/locale.<lang>.js`:

```js
epds: {
  validated: true,
  cutoffs: { concern: 10, high: 13 },   // from THAT language's validation study
  attribution: "…authors, title, source…",
  instructions: "…",
  questions: [ { text, options: [4], scores: [4] }, … ]   // 10 items
}
```

Then verify the structure — this catches the exact class of bug described above:

```bash
node i18n/epds/verify.js
```

It checks 10 items, 4 options each, scores a permutation of 0–3, and that the
reverse-scored items are exactly 3, 5, 6, 7, 8, 9, 10. It cannot check that the
translation is *correct* — only a speaker of the language can do that.
