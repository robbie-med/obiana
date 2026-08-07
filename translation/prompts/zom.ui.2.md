You are translating patient-facing medical education content for a
pregnancy and childbirth guide, from English into Zomi (Tedim Chin) (Zomi).

The readers are pregnant patients receiving care **in the United States**.

## Absolute output contract

- Write ONLY a single JSON object to the output file named at the end of this prompt.
- No commentary, no markdown fences, no explanation — the file must parse with JSON.parse().
- The output object MUST have EXACTLY the same keys as the input object. Same
  number, same spelling, same order. Never add, drop, rename, split or merge a key.
- Translate only the VALUES.

## What must survive translation untouched

1. **Placeholders** like {count}, {q}, {n}, {total}, {langs}, {date}, {range}.
   Copy them character-for-character. Never translate the word inside the braces.
   They are replaced with live values at runtime.
2. **HTML tags** — <p>, <ul>, <li>, <h4>, <strong>, <em>, <br>, <table>, <tr>,
   <td>, <th>, and any class attributes such as <p class="lead"> or
   <div class="callout gold">. Keep the same tags in the same order and nesting.
   Translate only the text between them.
3. **HTML entities** — &amp; &gt; &lt; &nbsp; &#39; — leave exactly as-is.
4. **Numbers, units and measurements** — 10 cm, 140/90, 100.4°F, 200 mg, 8–12,
   weeks 4–14. Keep the numerals and the units. Do NOT convert °F to °C or lb to
   kg: these patients read US charts and hear US units from their care team.
5. **Clinical abbreviations** that a US care team will actually say out loud —
   GBS, NIPT, EPDS, IOM, ACOG, AAP, VBAC, L&D, MFM, Rh, Tdap, RhoGAM, BMI, NST.
   Keep the abbreviation; you may add a short gloss in the target language on
   first use inside that same string.

## What must NOT be adapted

Do not localise the medical guidance itself. This describes the US care model:
visit schedules, which screenings are offered and when, "call 911", US
insurance framing, ACOG/AAP/FDA recommendations. Translate the words. Do not
substitute another country's guidelines, phone numbers or care pathways, and do
not add or remove clinical advice.

## Register

Plain, warm, direct — as if speaking to a patient, not to a clinician. Aim for
roughly a 6th-grade reading level in the target language. Use the form of
address a clinic would use with an adult patient (formal "usted"/"vous"/"Вы"
where that language distinguishes). Keep sentences short.

## Zomi-specific

Zomi (Tedim Chin) is a low-resource language with little settled medical
vocabulary. Do NOT invent clinical terms. Where no established Zomi word
exists, keep the English term and add a short plain-language Zomi gloss in
parentheses — for example "epidural (na nate' damdawi)". A borrowed English
term a patient can ask their nurse about is far more useful than a coined word
nobody recognises. Prefer short, everyday sentences.

## Plural forms

A few values are objects with keys like {"one": "...", "other": "..."}. Replace
the KEY SET with the plural categories Zomi (Tedim Chin) actually uses (CLDR
categories: zero, one, two, few, many, other) and give the correct wording for
each. Keep the {count} placeholder in every form.

## This batch

Short interface strings: buttons, labels, headings, toasts, tool names.
Keep them SHORT — they sit in buttons and navigation on a phone screen.
Some are single words. Some contain HTML like <br> for line breaks; keep it.

Input (80 keys):

```json
{
  "tool.birthplan.q.pushing.opt.squat": "Squatting/standing",
  "tool.birthplan.q.episiotomy.label": "Episiotomy",
  "tool.birthplan.q.episiotomy.opt.avoid": "Avoid unless necessary",
  "tool.birthplan.q.episiotomy.opt.trust": "Trust the team’s judgment",
  "tool.birthplan.q.episiotomy.opt.nopref": "No preference",
  "tool.birthplan.q.cord-cut.label": "Who cuts the cord",
  "tool.birthplan.q.cord-cut.opt.support": "Support person",
  "tool.birthplan.q.cord-cut.opt.team": "Care team",
  "tool.birthplan.q.cord-cut.opt.nopref": "No preference",
  "tool.birthplan.q.photos.label": "Photography during delivery",
  "tool.birthplan.q.photos.opt.yes": "Yes please",
  "tool.birthplan.q.photos.opt.none": "No photos during delivery",
  "tool.birthplan.q.photos.opt.after": "Photos after delivery only",
  "tool.birthplan.q.visitors.label": "Visitors during labor",
  "tool.birthplan.q.visitors.opt.supportonly": "Support person only",
  "tool.birthplan.q.visitors.opt.family": "Close family welcome",
  "tool.birthplan.q.visitors.opt.none": "No visitors",
  "tool.birthplan.q.breastfeed.label": "Feeding plan",
  "tool.birthplan.q.breastfeed.opt.exclusive": "Breastfeed exclusively",
  "tool.birthplan.q.breastfeed.opt.supplement": "Breastfeed + supplement",
  "tool.birthplan.q.breastfeed.opt.formula": "Formula only",
  "tool.birthplan.q.breastfeed.opt.unsure": "Not sure yet",
  "tool.birthplan.q.csection.label": "If C-section needed",
  "tool.birthplan.q.csection.opt.lowscreen": "Low screen (see baby)",
  "tool.birthplan.q.csection.opt.supportor": "Support person in OR",
  "tool.birthplan.q.csection.opt.skinor": "Skin-to-skin in OR if possible",
  "tool.birthplan.q.csection.opt.standard": "Standard practice is fine",
  "tool.birthplan.q.music.label": "Atmosphere",
  "tool.birthplan.q.music.opt.playlist": "Music / own playlist",
  "tool.birthplan.q.music.opt.quiet": "Quiet environment",
  "tool.birthplan.q.music.opt.nopref": "No preference",
  "tool.birthplan.additionalNotesComments": "Additional notes / comments",
  "tool.birthplan.copyToShare": "Copy to Share",
  "tool.birthplan.printPdf": "Print / PDF",
  "tool.birthplan.additionalNotes": "Additional notes:",
  "tool.birthplan.myBirthPreferences": "My Birth Preferences",
  "tool.birthplan.pregnancyBirthGuideEvidenceBased": "Pregnancy &amp; Birth Guide · Evidence-based · Private &amp; offline",
  "tool.birthplan.anyOtherPreferencesConcernsOr": "Any other preferences, concerns, or information for your care team…",
  "tool.birthplan.copiedToClipboard": "Copied to clipboard!",
  "tool.birthplan.copyNotSupportedOnThis": "Copy not supported on this browser",
  "tool.kick.startSession": "Start Session",
  "tool.kick.movementsThisSession": "movements this session",
  "tool.kick.elapsed": "Elapsed:",
  "tool.kick.20000Limit": "2:00:00 limit",
  "tool.kick.lessThan10MovementsIn": "⚠ Less than 10 movements in 2 hours",
  "tool.kick.thisMayNeedAttentionCall": "This may need attention — call your doctor.",
  "tool.kick.10MovementsReached": "10 movements reached!",
  "tool.kick.startAnotherSession": "Start Another Session",
  "tool.kick.sessionHistory": "Session History",
  "tool.kick.noSessions": "No sessions yet",
  "tool.common.recentContractions": "Recent Contractions",
  "tool.common.timeToGoToThe": "🚨 Time to go to the hospital",
  "tool.common.511PatternReached": "5-1-1 Pattern Reached",
  "tool.feed.feedsInLast24Hrs": "Feeds in last 24 hrs",
  "tool.feed.lastFeed": "Last feed",
  "tool.feed.logAFeeding": "+ Log a Feeding",
  "tool.feed.feedLog": "Feed Log",
  "tool.feed.feedLogged": "Feed logged",
  "tool.feed.noFeeds": "No feeds logged yet.",
  "tool.diaper.wetToday": "Wet Today",
  "tool.diaper.dirtyToday": "Dirty Today",
  "tool.diaper.bothWetDirty": "+ Both (wet &amp; dirty)",
  "tool.diaper.whatToExpectByAge": "What to expect by age",
  "tool.diaper.day1212": "Day 1–2: 1–2 wet diapers · Day 3–4: 3–4 wet · Day 5+: 6+ wet, 3–4 dirty per day. Fewer than 6 wet diapers after day 5 → call your doctor.",
  "tool.diaper.todaySLog": "Today's Log",
  "tool.diaper.noDiapers": "No diapers logged today.",
  "tool.jaundice.babySBirthDate": "Baby's Birth Date",
  "tool.jaundice.set": "Set",
  "tool.jaundice.birthDateSaved": "Birth date saved",
  "tool.bp.logBloodPressure": "+ Log Blood Pressure",
  "tool.bp.whenToCallYourDoctor": "When to call your doctor",
  "tool.bp.anyReading14090During": "Any reading ≥ 140/90 during pregnancy or postpartum. ≥ 160/110 is a medical emergency — call L&D or 911.",
  "tool.bp.readings": "Readings",
  "tool.bp.enterValidNumbersEG": "Enter valid numbers (e.g. 118 / 76)",
  "tool.bp.highReadingContactYourDoctor": "High reading — contact your doctor",
  "tool.bp.noReadings": "No readings logged yet.",
  "tool.weight.yourProfile": "Your Profile",
  "tool.weight.prePregnancyWeightLbs": "Pre-pregnancy weight (lbs)",
  "tool.weight.prePregnancyBmi": "Pre-pregnancy BMI",
  "tool.weight.saveProfile": "Save Profile"
}
```

Write the translated JSON object — same 80 keys — to:
translation/out/zom.ui.2.json
