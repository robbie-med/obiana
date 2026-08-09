# Translating Obiana

Three ways in, depending on how much you want to take on.

Everything falls back to English per key, so a partly translated language is
always usable. There is no point at which a language is "too incomplete to
ship".

---

## 1. From inside the app (no setup)

**Tools > Help Us Improve > Translation Helper.**

Pick your language and every phrase appears against its English source, marked
`✓` translated, `≡` identical to English, or `✗` missing. Type a better version
and press **Submit**. Filter to "Needs work" to see only what is unfinished.

Works on a phone. Nothing to install, no account, no repo.

If you would rather not submit directly, **Export my suggestions** downloads a
JSON file in exactly the shape the merge pipeline takes.

## 2. Cultural context and questions

**Tools > Help Us Improve > Help Improve This Guide.**

Not a translation channel. This is for:

- *"In my culture we do it differently"*
- a question the guide never answers
- a passage that read badly even though the words were right

That last one matters. A translation can be technically correct and still land
wrong, and this is where you say so.

## 3. Bulk translation (repo access)

For taking a language from stub to complete.

```bash
node translation/prepare.js      # regenerate prompts (only after editing English)
bash translation/run-kimi.sh es  # one language, or omit for all
node translation/merge.js        # merge validated output into i18n/locale.*.js
```

Resumable: a batch that already exists and validates is skipped, so an
interrupted run picks up where it stopped.

`merge.js` refuses to merge a language with any failing batch. A half-merged
locale is harder to reason about than an untranslated one.

### The validator is the point

An LLM will hand back fluent text that has quietly broken something invisible.
These are **errors** and block merging:

| Error | Why it matters |
|---|---|
| missing or unexpected keys | a missing key silently falls back to English |
| placeholders changed | `{count}` becoming `{cuenta}` prints the literal `{cuenta}` to a patient |
| HTML tags changed | a dropped `</li>` breaks the card layout |
| empty translation | blank UI |
| invalid plural category | `tp()` falls through to the wrong form |
| foreign script leaked | a stray CJK character inside a Russian sentence, which reads as fluent to anyone who does not know both scripts |

That last check exists because it caught exactly that, twice, in work done by
hand. `node translation/lint-locales.js` runs it against the shipped locale
files, which the batch validator never sees.

**Warnings** do not block, but read them: they are usually a lost unit (`°F`,
`mg`, `cm`) or a dropped clinical abbreviation (`GBS`, `Tdap`, `ACOG`), and a
patient needs those to ask her care team about it.

### Checking your own work

```bash
node translation/validate.js                          # everything
node translation/validate.js translation/out/ko.ui.1.json
node translation/lint-locales.js
```

There is also a runtime audit that renders the app in two languages and diffs
the actual DOM. Static scans over source kept missing whole classes of string,
including text nodes split across lines and anything set via `.textContent`.
Paste `translation/audit.js` into the browser console and call
`myobI18nAudit('ko')`.

---

## Adding a language

1. Add an entry to `LOCALES` in `i18n/i18n.js`:

```js
sw: { name: 'Swahili', native: 'Kiswahili', dir: 'ltr',
      prompt: 'Chagua lugha yako', flag: 'tz' },
```

2. Drop the matching flag SVG into `flags/`.
3. Create `i18n/locale.sw.js` as a stub, copying any existing stub.
4. Add the file and flag to `ASSETS` in `sw.js`, and add the code to `LOCALES`
   in `worker/index.js` so submissions are accepted for it.

The picker, first-run screen and Translation Helper all read `LOCALES` at
runtime. Nothing else to register.

Notes:

- Region subtags work (`pt-BR`). Detection tries the full tag before the base.
- A script with no spaces between words (Thai, Japanese, Chinese) is segmented
  via `Intl.Segmenter`. Add the script's range to `CJK` in `i18n/i18n.js`.
- RTL needs only `dir: 'rtl'`. The layout uses logical properties throughout.
- Check date and number formatting. Dari inherits Persian defaults and needed
  `fa-u-nu-latn-ca-gregory` to stop rendering Jalali dates with Persian digits
  on a US appointment card.

---

## House style

- **No em dashes.** Anywhere. Use a comma or a full stop.
- Write to the patient, not about her. Around a 6th-grade reading level.
- Use the polite form where the language has one (*usted*, *vous*, *Вы*).
- Keep clinical abbreviations she will hear out loud: GBS, NIPT, Tdap, ACOG.
  Gloss them on first use if your language needs it.
- **Do not convert units.** `°F`, `lb`, `oz` stay. She reads them off US
  equipment and hears them from her care team.
- **Do not localise the medicine.** Translate the words. Visit schedules,
  screening offers and "call 911" describe the US system on purpose.
- Nav labels are chips. Keep them short or they clamp to two lines.

## The screening instruments are off limits

The EPDS and PHQ-9 are **not** in the translation pipeline and must never be
added to it. Their scores mean something only for wording that has been
formally validated. A machine translation still produces a number, and that
number looks exactly as trustworthy as a real one.

If you know of an officially validated translation for a language we do not
cover, that is a genuinely valuable thing to report. See
[i18n/epds/SOURCES.md](i18n/epds/SOURCES.md).

## Reviewing what comes in

Maintainers: `review/start.sh`, or the desktop shortcut. Pick a language, see
every suggestion grouped under its key alongside the English and what is
currently live, and click one to merge it straight into the locale file.
