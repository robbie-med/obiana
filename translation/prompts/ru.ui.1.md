You are translating patient-facing medical education content for a
pregnancy and childbirth guide, from English into Russian (Русский).

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
the KEY SET with the plural categories Russian actually uses (CLDR
categories: zero, one, two, few, many, other) and give the correct wording for
each. Keep the {count} placeholder in every form.

## This batch

Short interface strings: buttons, labels, headings, toasts, tool names.
Keep them SHORT — they sit in buttons and navigation on a phone screen.
Some are single words. Some contain HTML like <br> for line breaks; keep it.

Input (80 keys):

```json
{
  "section.pregnancy": "Prenatal",
  "section.labor": "Labor & Delivery",
  "section.recovery": "Recovery",
  "section.baby": "Newborn",
  "section.faq": "FAQ",
  "faq.badgeMyth": "Myth",
  "faq.badgeFaq": "FAQ",
  "faq.section5": "Section 5",
  "faq.faqCommonMyths": "FAQ &amp;<br>Common Myths",
  "faq.evidenceBasedAnswersToThe": "Evidence-based answers to the most common questions — including things you've heard from family, friends, and the internet.",
  "search.noResultsTitle": "No results found",
  "search.noResultsHint": "Try different keywords — like \"epidural\", \"cord care\", or \"bleeding\"",
  "search.resultCount": {
    "one": "{count} result for “{q}”",
    "other": "{count} results for “{q}”"
  },
  "myinfo.namePlaceholder": "Name",
  "myinfo.phonePlaceholder": "Phone number",
  "myinfo.call": "Call",
  "myinfo.text": "Text",
  "myinfo.contact.familydoc": "Family Doctor",
  "myinfo.contact.ob": "OB / Midwife",
  "myinfo.contact.peds": "Pediatrician",
  "myinfo.contact.mfm": "MFM Specialist",
  "myinfo.contact.lactation": "Lactation Consultant",
  "myinfo.contact.ld": "Hospital / L&D Triage",
  "myinfo.contact.pharmacy": "Pharmacy",
  "myinfo.detail.edd.label": "Due Date (EDD)",
  "myinfo.detail.edd.placeholder": "e.g. July 15, 2026",
  "myinfo.detail.bloodtype.label": "Blood Type & Rh Factor",
  "myinfo.detail.bloodtype.placeholder": "e.g. O positive",
  "myinfo.detail.gbs.label": "GBS Status",
  "myinfo.detail.gbs.placeholder": "Positive / Negative / Not yet tested",
  "myinfo.detail.allergies.label": "Medication Allergies",
  "myinfo.detail.allergies.placeholder": "e.g. Penicillin",
  "myinfo.detail.insurance.label": "Insurance / Member ID",
  "myinfo.detail.insurance.placeholder": "For quick reference at hospital",
  "myinfo.myInformation": "My Information",
  "myinfo.myCareTeamKeyDetails": "My Care Team &amp;<br>Key Details",
  "myinfo.savedOnYourPhoneTap": "Saved on your phone · Tap to call or text",
  "myinfo.careTeamContacts": "Care Team Contacts",
  "myinfo.myPregnancyDetails": "My Pregnancy Details",
  "myinfo.questionsForMyDoctor": "Questions for My Doctor",
  "myinfo.saveMyInformation": "Save My Information",
  "myinfo.exportData": "Export Data",
  "toast.contactsSaved": "Contacts saved to your phone",
  "toast.appInstalled": "App installed! Open from your home screen anytime",
  "toast.dataExported": "Data exported!",
  "toast.appUpdated": "App updated — reload for latest version",
  "tool.mood.unavailableTitle": "Mood check-in not available in this language",
  "tool.mood.unavailableBody": "The Edinburgh Postnatal Depression Scale is a validated screening questionnaire. Its scoring is only meaningful using an officially validated translation, so we do not offer a machine-translated version.",
  "tool.mood.availableIn": "Currently available in: {langs}. Please ask your care team about a validated version in your language.",
  "tool.mood.switchToEnglish": "Switch to English",
  "tool.mood.qCounter": "Question {n} of {total}",
  "tool.mood.answerAll": "Please answer all {total} questions",
  "tool.mood.interpLow": "Low concern",
  "tool.mood.interpConcern": "Worth discussing with your doctor",
  "tool.mood.interpHigh": "Please contact your doctor",
  "tool.mood.edinburghPostnatalDepressionScale": "Edinburgh Postnatal Depression Scale",
  "tool.mood.inThePast7Days": "in the past 7 days",
  "tool.mood.yourAnswersAreSavedOnly": "Your answers are saved only on this phone.",
  "tool.mood.getMyScore": "Get My Score",
  "tool.mood.scoreOutOf30Based": "Score out of 30 · Based on the Edinburgh Postnatal Depression Scale",
  "tool.birthplan.q.epidural.label": "Pain relief preference",
  "tool.birthplan.q.epidural.opt.epidural": "Yes — epidural",
  "tool.birthplan.q.epidural.opt.none": "No medication",
  "tool.birthplan.q.epidural.opt.open": "Keep options open",
  "tool.birthplan.q.epidural.opt.iv": "IV medication only",
  "tool.birthplan.q.mobility.label": "Movement during labor",
  "tool.birthplan.q.mobility.opt.walk": "Want to walk/move",
  "tool.birthplan.q.mobility.opt.bed": "Prefer to stay in bed",
  "tool.birthplan.q.mobility.opt.wireless": "Wireless monitor if available",
  "tool.birthplan.q.delayed-cord.label": "Delayed cord clamping (30–60 sec)",
  "tool.birthplan.q.delayed-cord.opt.yes": "Yes please",
  "tool.birthplan.q.delayed-cord.opt.nopref": "No preference",
  "tool.birthplan.q.delayed-cord.opt.discuss": "Discuss with team",
  "tool.birthplan.q.skin-to-skin.label": "Immediate skin-to-skin after birth",
  "tool.birthplan.q.skin-to-skin.opt.top": "Yes — top priority",
  "tool.birthplan.q.skin-to-skin.opt.ifposs": "Yes if possible",
  "tool.birthplan.q.skin-to-skin.opt.nopref": "No preference",
  "tool.birthplan.q.pushing.label": "Pushing position",
  "tool.birthplan.q.pushing.opt.nurse": "Guided by nurse",
  "tool.birthplan.q.pushing.opt.positions": "Want to try different positions"
}
```

Write the translated JSON object — same 80 keys — to:
translation/out/ru.ui.1.json
