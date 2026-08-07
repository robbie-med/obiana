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

6 guide cards (~491 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (6 cards):

```json
{
  "followup-appts": {
    "title": "Follow-Up Appointments for Baby & You",
    "sub": "The schedule and what happens at each visit",
    "body": "\n        <p class=\"lead navy\">Before you leave the hospital, confirm these appointments are scheduled. Don't leave without them.</p>\n        <h4>For Baby (Pediatrician)</h4>\n        <table class=\"data-table\">\n          <tr><th class=\"navy\">When</th><th class=\"navy\">Purpose</th></tr>\n          <tr><td><strong>2–5 days old</strong></td><td>Weight check — critical to confirm birth weight is being regained. Jaundice assessment. Feeding evaluation. Newborn screening follow-up.</td></tr>\n          <tr><td><strong>2 weeks</strong></td><td>Weight back to birth weight? Development and feeding check. Cord stump check.</td></tr>\n          <tr><td><strong>2 months</strong></td><td>First vaccines, growth and development milestones</td></tr>\n          <tr><td><strong>4, 6, 9, 12 months</strong></td><td>Growth, development, vaccines (schedule continues through childhood)</td></tr>\n        </table>\n        <h4>For You (OB/Midwife)</h4>\n        <table class=\"data-table\">\n          <tr><th class=\"navy\">When</th><th class=\"navy\">Purpose</th></tr>\n          <tr><td><strong>1–3 days</strong> (C-section or complications)</td><td>Wound check, BP management, pain</td></tr>\n          <tr><td><strong>2 weeks</strong></td><td>Mood screening, BP, wound/perineum, breastfeeding support</td></tr>\n          <tr><td><strong>6 weeks</strong></td><td>Full physical, pelvic exam, contraception discussion, exercise clearance</td></tr>\n        </table>\n        <div class=\"callout navy\">\n          <div class=\"callout-title\">Questions to Ask Before Leaving the Hospital</div>\n          <p>Who do I call if I have a question before my first appointment? · Is baby feeding well — how will I know if not? · What's my threshold for calling the pediatrician? · Were any tests abnormal that need follow-up? · Do I need to wake baby to feed at night? · What are my wound care instructions?</p>\n        </div>"
  },
  "faq-deli": {
    "title": "Can I eat deli meat and soft cheese?",
    "sub": "",
    "body": "<p>The main risk is <em>Listeria</em>, a bacterial infection that's rare but can be serious in pregnancy (can cross the placenta). The FDA advises avoiding unpasteurized cheese and deli meats unless heated to steaming (165°F). Most pasteurized soft cheeses (like pasteurized brie, feta from a package) are safe. The overall risk from occasional deli meat is very low — this guidance is precautionary, not a guarantee of illness from a turkey sandwich. When in doubt, heat it.</p>"
  },
  "faq-coffee": {
    "title": "Can I have any caffeine?",
    "sub": "",
    "body": "<p>Yes. ACOG recommends limiting caffeine to <strong>less than 200 mg per day</strong> (approximately one 12-oz cup of drip coffee). At that level, evidence of harm to the pregnancy is not established. Tea, soda, and chocolate also contain caffeine — count them all together. Cutting back is reasonable; cutting it out entirely is a personal choice, not medically required.</p>"
  },
  "faq-hair-dye": {
    "title": "Can I dye my hair while pregnant?",
    "sub": "",
    "body": "<p>Yes. Hair dye is absorbed through the scalp in very small amounts. No published studies have shown harm to the fetus at the amounts involved in normal salon or home hair coloring. Most doctors consider it safe, especially after the first trimester. Highlights (foil) have even less scalp contact. If you're concerned, wait until the second trimester when major organ development is complete.</p>"
  },
  "faq-exercise-mc": {
    "title": "Does exercise cause miscarriage?",
    "sub": "",
    "body": "<p>No. Moderate exercise does not cause miscarriage in healthy pregnancies. This is one of the most pervasive myths in pregnancy. Early miscarriages are almost always caused by chromosomal abnormalities in the embryo — not by exercise, sex, stress, or anything the mother did. Exercise is protective, not harmful. See the exercise guidelines in the Prenatal section.</p>"
  },
  "faq-sex-pregnancy": {
    "title": "Is it safe to have sex during pregnancy?",
    "sub": "",
    "body": "<p>Yes, in a normal pregnancy without complications. Sex does not cause miscarriage, early labor, or harm the baby (who is cushioned by amniotic fluid). Your doctor will recommend pelvic rest (no intercourse) only if you have specific situations: placenta previa, preterm labor risk, unexplained vaginal bleeding, certain cervical conditions, or after your water has broken. If you're not sure, ask at your next visit.</p>"
  }
}
```

Write the translated JSON object — same 6 card ids, each with
title/sub/body — to:
translation/out/ar.content.5.json
