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
  "tool.weight.logWeight": "+ Log Weight",
  "tool.weight.weightLog": "Weight Log",
  "tool.weight.profileSaved": "Profile saved",
  "tool.weight.enterValidWeightAndPregnancy": "Enter valid weight and pregnancy week",
  "tool.weight.noWeights": "No weights logged yet.",
  "tool.appts.addVisit": "+ Add Visit",
  "tool.appts.questionsToAsk": "Questions to ask",
  "tool.appts.noneAdded": "None added",
  "tool.appts.notesFromVisit": "Notes from visit",
  "tool.appts.edit": "Edit",
  "tool.appts.delete": "Delete",
  "tool.appts.visitDeleted": "Visit deleted",
  "tool.cx.noContractions": "No contractions recorded yet.<br>Tap \"Contraction Starting\" when one begins.",
  "theme.toggle": "Toggle dark mode",
  "lang.label": "Language",
  "lang.change": "Change language",
  "lang.unreviewedNotice": "This translation is machine-generated and has not yet been reviewed by a clinician. For medical decisions, please confirm with your care team or switch to English.",
  "lang.loadFailed": "Could not load",
  "lang.inProgress": "Translation in progress",
  "app.title": "Pregnancy & Birth Guide",
  "app.tagline": "Evidence-based · Works offline",
  "app.description": "Evidence-based pregnancy, labor, delivery & postpartum guide. Works offline.",
  "app.home": "Home",
  "app.prenatal": "Prenatal",
  "app.labor": "Labor",
  "app.recovery": "Recovery",
  "app.baby": "Baby",
  "app.faq": "FAQ",
  "app.tools": "Tools",
  "app.offlineBanner": "⚠ You're offline — all content still available",
  "app.searchPlaceholder": "Search all topics…",
  "home.myInfoContacts": "My Info &amp;<br>Contacts",
  "home.saveYourCareTeamContacts": "Save Your Care Team Contacts",
  "home.tapToCallOrText": "Tap to call or text directly from the app",
  "home.callYourDoctorIf": "Call Your Doctor If…",
  "home.duringPregnancy": "During Pregnancy",
  "home.vaginalBleeding": "Vaginal bleeding",
  "home.fluidGushingOrTrickling": "Fluid gushing or trickling",
  "home.babyNotMovingNormally": "Baby not moving normally",
  "home.severeHeadache": "Severe headache",
  "home.visionChanges": "Vision changes",
  "home.suddenSwellingOfFaceHands": "Sudden swelling of face/hands",
  "home.fever1004F": "Fever &gt;100.4°F",
  "home.contractionsBefore37Weeks": "Contractions before 37 weeks",
  "home.afterDelivery": "After Delivery",
  "home.soaking1PadHr2": "Soaking &gt;1 pad/hr × 2 hrs",
  "home.woundOpensOrOozes": "Wound opens or oozes",
  "home.legRednessSwelling": "Leg redness/swelling",
  "home.chestPainOrTroubleBreathing": "Chest pain or trouble breathing",
  "home.thoughtsOfSelfHarm": "Thoughts of self-harm",
  "home.heroLabel": "Your Complete Guide",
  "home.heroTitle": "Know what to<br>expect. Ask great<br>questions.",
  "home.heroDesc": "From your first prenatal visit through delivery and recovery — everything in one place.",
  "pregnancy.section1": "Section 1",
  "pregnancy.prenatalVisitsPregnancy": "Prenatal Visits<br>&amp; Pregnancy",
  "pregnancy.aVisitByVisitGuide": "A visit-by-visit guide, cervical exams explained, exercise during pregnancy, and what to ask at each stage.",
  "labor.section2": "Section 2",
  "labor.laborDelivery": "Labor &amp;<br>Delivery",
  "labor.signsOfLaborWhatHappens": "Signs of labor, what happens when you arrive, pain management options, C-section, and high-risk care.",
  "recovery.section3": "Section 3",
  "recovery.postpartumRecovery": "Postpartum<br>Recovery",
  "recovery.physicalHealingMoodAndPpd": "Physical healing, mood and PPD, pelvic rest, returning to exercise, and when to go home.",
  "baby.section4": "Section 4",
  "baby.yourNewborn": "Your<br>Newborn",
  "baby.breastfeedingFormulaCordCareSafe": "Breastfeeding, formula, cord care, safe sleep, normal newborn appearance, and follow-up appointments.",
  "tools.dailyTools": "Daily Tools",
  "tools.trackersPlanners": "Trackers &amp;<br>Planners",
  "tools.timeContractionsCountKicksLog": "Time contractions, count kicks, log feedings and diapers, track blood pressure, plan your birth, and more.",
  "tools.labor": "Labor",
  "tools.kickCounter": "Kick Counter",
  "tools.10MovesIn2Hours": "10 moves in 2 hours — log sessions &amp; history",
  "tools.contractionTimer": "Contraction Timer",
  "tools.tapStartStop51": "Tap start/stop · 5-1-1 alert · When to go in",
  "tools.newbornPostpartum": "Newborn &amp; Postpartum",
  "tools.feedingLog": "Feeding Log",
  "tools.breastOrBottle24Hr": "Breast or bottle · 24-hr count · Alerts if low",
  "tools.diaperLog": "Diaper Log",
  "tools.wetDirtyCountDailyTotals": "Wet &amp; dirty count · Daily totals for the doctor",
  "tools.jaundiceTracker": "Jaundice Tracker",
  "tools.dayByDayGuidanceFrom": "Day-by-day guidance from birth"
}
```

Write the translated JSON object — same 80 keys — to:
translation/out/zom.ui.3.json
