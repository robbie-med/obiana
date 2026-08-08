# Translating myOB

The app ships English as the **fallback layer**. Every other locale overrides
only the keys it has translated; anything missing renders in English rather
than blank. That means a locale file can be filled in gradually and shipped at
any stage of completeness.

## Adding or completing a language

1. Open `i18n/locale.<code>.js` (stubs already exist for es, fr, ko, ar, ru, zh, zom).
2. Add keys mirroring the structure of `i18n/locale.en.js`:
   - `ui.*`   — interface strings (315 of them)
   - `content.*` — the 45 guide cards, keyed by card id, each `{ title, sub, body }`
     where `body` is an HTML fragment
3. Set `reviewed: true` **only** once a clinician has checked the medical content.
   While it is `false`, the app shows a machine-translation notice to the patient.
4. Bump `CACHE_NAME` in `sw.js` and the `?v=` values in `index.html` +
   `ASSET_VERSION` in `i18n/i18n.js`, or returning users keep the cached copy.

To register a brand-new language, add an entry to `LOCALES` in `i18n/i18n.js`
(`name`, `native`, `dir`, `prompt`) — `prompt` is the "Tap your language" text
shown on the first-run picker, in that language.

## The EPDS is different — do not translate it

`i18n/locale.en.js` contains an `epds` block: the Edinburgh Postnatal
Depression Scale. It is a **validated clinical instrument**. Its ≥10 / ≥13
cutoffs are only meaningful for the exact wording of an officially validated
translation, and those exist per language with their own published
psychometrics (sometimes different cutoffs).

A machine translation of the EPDS still produces a score, and that score looks
exactly as authoritative as a real one. So:

- A locale with **no** `epds` key has the Mood Check-In tool automatically
  disabled, showing the patient a notice and an offer to switch to English.
- To enable it, paste the **official published translation** for that language
  into the locale file as `epds.questions`, set `epds.validated: true`, and set
  `epds.cutoffs` to that version's published thresholds.
- Never generate this text with an LLM.

## Things that are stored, not displayed

Three sets of user data are stored as stable **ids**, with labels resolved at
render time. Do not change the ids when translating — they are what is written
to the patient's device:

- Birth plan answers — `BIRTH_PLAN_QUESTIONS` in `tools.js`, labels under `ui.tool.birthplan.q.*`
- Appointment types — `APPT_TYPE_KEY` in `tools.js`, labels under `ui.apptType.*`
- Content cards — ids in `CONTENT_STRUCTURE` in `content.js`

Migrations (`migrateBirthPlan`, `migrateAppointments`) convert data saved by
the pre-i18n version, which stored English labels directly. Leave them in place.

## Content is US care model

The guidance is ACOG/AAP/FDA-based and assumes US prenatal care: visit cadence,
°F, lb, "call 911", US insurance framing. Translating the words does not
localise the care model. For a patient receiving care in the US this is
correct; for a reader abroad it is not.

## Receiving suggestions from contributors

The Translation Helper (last tool in Tools) has a **Submit** button on every
card. Submissions go to Cloudflare D1, and this PC pulls them down.

**Why D1 and not a push straight to the PC:** a direct push is lost whenever
this machine is asleep, and the contributor is told "sent" either way. D1 holds
it until you pull. The optional ntfy ping is a *notification*, never the
transport — if it fails, the suggestion is already stored.

If the API is unreachable, or the contributor is offline, the card says so and
the suggestion stays on their device for **Export** — so it is never a dead end.

### One-time setup

```bash
npm install -D wrangler@latest

npx wrangler d1 create obiana-suggestions
# paste the printed database_id into wrangler.jsonc

npx wrangler d1 execute obiana-suggestions --remote --file worker/schema.sql

npx wrangler secret put HASH_SALT     # any long random string
npx wrangler secret put NTFY_URL      # optional: your ntfy topic URL
```

`HASH_SALT` salts the IP hash used for rate limiting. Raw IPs are never stored.

### Pulling them down

```bash
bash translation/pull-suggestions.sh              # everything new
bash translation/pull-suggestions.sh es           # one language
bash translation/pull-suggestions.sh es --merge   # also write translation/out/
```

Nothing is applied automatically — these come from the public, so you read them
before anything reaches a patient.

### What crosses the boundary

Only the translation key, the English source, the currently shipped wording and
the proposed wording. **No tracker data ever leaves the device** — the app's
core privacy promise is unchanged, and the tool says so on screen in every
language.

The endpoint is public, so it is treated as hostile: keys are validated against
the shipped English catalog (read through the ASSETS binding, so there is no
second list to drift), lengths are capped, and there is a per-IP hourly limit.
