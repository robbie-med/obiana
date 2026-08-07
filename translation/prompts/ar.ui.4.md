You are translating patient-facing medical education content for a
pregnancy and childbirth guide, from English into Arabic (العربية).

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

## Plural forms

A few values are objects with keys like {"one": "...", "other": "..."}. Replace
the KEY SET with the plural categories Arabic actually uses (CLDR
categories: zero, one, two, few, many, other) and give the correct wording for
each. Keep the {count} placeholder in every form.

## This batch

Short interface strings: buttons, labels, headings, toasts, tool names.
Keep them SHORT — they sit in buttons and navigation on a phone screen.
Some are single words. Some contain HTML like <br> for line breaks; keep it.

Input (74 keys):

```json
{
  "tools.moodCheckIn": "Mood Check-In",
  "tools.epdsScreenWeeklyTrackingFlags": "EPDS screen · Weekly tracking · Flags concerns",
  "tools.pregnancyMonitoring": "Pregnancy Monitoring",
  "tools.bloodPressure": "Blood Pressure",
  "tools.logReadingsFlags14090": "Log readings · Flags ≥ 140/90 automatically",
  "tools.weightTracker": "Weight Tracker",
  "tools.logByWeekIomGain": "Log by week · IOM gain guidelines for your BMI",
  "tools.planning": "Planning",
  "tools.birthPlanBuilder": "Birth Plan Builder",
  "tools.guidedChoicesShareableOnePage": "Guided choices · Shareable one-page summary",
  "tools.visitNotes": "Visit Notes",
  "tools.questionsBeforeNotesDuringEvery": "Questions before · Notes during every visit",
  "toolkick.kickCounter": "Kick Counter",
  "toolcontractions.contractionTimer": "Contraction Timer",
  "toolfeeding.feedingLog": "Feeding Log",
  "tooldiapers.diaperLog": "Diaper Log",
  "tooljaundice.jaundiceTracker": "Jaundice Tracker",
  "toolbp.bloodPressureLog": "Blood Pressure Log",
  "toolweight.weightTracker": "Weight Tracker",
  "toolmood.moodCheckIn": "Mood Check-In",
  "toolbirthplan.birthPlanBuilder": "Birth Plan Builder",
  "toolappts.visitNotes": "Visit Notes",
  "modalFeed.logAFeeding": "Log a Feeding",
  "modalFeed.type": "Type",
  "modalFeed.breast": "🤱 Breast",
  "modalFeed.bottle": "🍼 Bottle",
  "modalFeed.side": "Side",
  "modalFeed.left": "Left",
  "modalFeed.right": "Right",
  "modalFeed.both": "Both",
  "modalFeed.durationMinutes": "Duration (minutes)",
  "modalFeed.amountOz": "Amount (oz)",
  "modalFeed.saveFeed": "Save Feed",
  "modalBp.logBloodPressure": "Log Blood Pressure",
  "modalBp.systolicTop": "Systolic (top #)",
  "modalBp.diastolicBottom": "Diastolic (bottom #)",
  "modalBp.normalRange": "Normal range",
  "modalBp.below12080IsNormal": "Below 120/80 is normal. ≥ 140/90 during pregnancy needs same-day attention.",
  "modalBp.saveReading": "Save Reading",
  "modalWeight.logWeight": "Log Weight",
  "modalWeight.weightLbs": "Weight (lbs)",
  "modalWeight.weekOfPregnancy": "Week of pregnancy",
  "modalWeight.save": "Save",
  "modalAppt.addVisit": "Add Visit",
  "modalAppt.visitType": "Visit Type",
  "modalAppt.date": "Date",
  "modalAppt.questionsToAskBeforehand": "Questions to ask beforehand",
  "modalAppt.notesFromVisit": "Notes from visit",
  "modalAppt.saveVisit": "Save Visit",
  "apptType.selectType": "Select type…",
  "apptType.obRoutine": "OB – Routine",
  "apptType.obTriage": "OB – L&amp;D Triage / Unscheduled",
  "apptType.mfmConsult": "MFM Consultation",
  "apptType.mfmFollowup": "MFM Follow-up",
  "apptType.endo": "Endocrinology",
  "apptType.cardio": "Cardiology",
  "apptType.nephro": "Nephrology",
  "apptType.ultrasound": "Ultrasound",
  "apptType.nst": "Non-Stress Test (NST)",
  "apptType.lactation": "Lactation Consult",
  "apptType.pp2wk": "Postpartum – 2 weeks",
  "apptType.pp6wk": "Postpartum – 6 weeks",
  "apptType.peds25d": "Pediatrician – 2–5 days",
  "apptType.peds2wk": "Pediatrician – 2 weeks",
  "apptType.peds2mo": "Pediatrician – 2 months",
  "apptType.family": "Family Doctor",
  "apptType.other": "Other",
  "install.addToPhone": "Add to Phone",
  "common.toolsBack": "Tools",
  "nav.prenatal": "Prenatal<br>Visits",
  "nav.labor": "Labor &amp;<br>Delivery",
  "nav.recovery": "Postpartum<br>Recovery",
  "nav.baby": "Your<br>Newborn",
  "nav.toolsTrackers": "Tools &amp;<br>Trackers"
}
```

Write the translated JSON object — same 74 keys — to:
translation/out/ar.ui.4.json
