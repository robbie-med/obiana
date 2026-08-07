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

3 guide cards (~240 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (3 cards):

```json
{
  "faq-jaundice": {
    "title": "My baby looks yellow — when is it serious?",
    "sub": "",
    "body": "<p>Newborn jaundice (hyperbilirubinemia) affects about 60% of term babies in the first week. It's caused by normal breakdown of fetal red blood cells — the liver is just catching up. Most cases are mild and resolve without treatment. It becomes a concern when bilirubin levels are very high (risk of brain damage at extreme levels) or when baby is very sleepy, not feeding, or the jaundice appears in the first 24 hours. Your hospital will check bilirubin before discharge and at the 2–5 day pediatrician visit. Treatment with phototherapy (bili lights) is very effective if needed.</p>"
  },
  "faq-newborn-procedures": {
    "title": "Do all newborn procedures have to happen?",
    "sub": "",
    "body": "<p>Standard newborn procedures include: <strong>Vitamin K injection</strong> (prevents serious bleeding disorder — VKDB — that can cause fatal brain bleeding), <strong>erythromycin eye ointment</strong> (prevents eye infections including gonorrhea), <strong>Hepatitis B vaccine first dose</strong>, and the <strong>newborn metabolic screening blood draw</strong> (heel stick for ~30 conditions including PKU, hypothyroidism, sickle cell). All are recommended because the risks of the conditions prevented far outweigh the risks of the procedures. You may legally decline them in most states, but discuss the risks honestly with your doctor first.</p>"
  },
  "faq-first-bath": {
    "title": "When does my baby need the first bath?",
    "sub": "",
    "body": "<p>WHO and AAP now recommend delaying the first bath for at least 24 hours after birth (ideally 48 hours). The white coating (vernix caseosa) has antimicrobial properties and helps moisturize skin. Delaying the bath also helps maintain body temperature, supports blood sugar stability, and is associated with improved breastfeeding initiation. Waiting is the current best practice, not just preference.</p>"
  }
}
```

Write the translated JSON object — same 3 card ids, each with
title/sub/body — to:
translation/out/zom.content.8.json
