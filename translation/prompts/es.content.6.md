You are translating patient-facing medical education content for a
pregnancy and childbirth guide, from English into Spanish (Español).

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
the KEY SET with the plural categories Spanish actually uses (CLDR
categories: zero, one, two, few, many, other) and give the correct wording for
each. Keep the {count} placeholder in every form.

## This batch

6 guide cards (~416 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (6 cards):

```json
{
  "faq-vaccines": {
    "title": "Are vaccines safe during pregnancy?",
    "sub": "",
    "body": "<p>Yes, and some are strongly recommended. <strong>Tdap</strong> (whooping cough booster, 27–36 weeks) and the <strong>flu vaccine</strong> are recommended at every pregnancy. The <strong>COVID-19 vaccine</strong> is also recommended. These protect you from serious illness and transfer antibodies to your baby through the placenta, protecting them before they can be vaccinated. Live-virus vaccines (MMR, chickenpox) are not given during pregnancy. Ask your doctor which you still need.</p>"
  },
  "faq-eat-for-two": {
    "title": "Do I need to \"eat for two\"?",
    "sub": "",
    "body": "<p>No — \"eating for two\" is a myth. In the first trimester, extra calorie needs are minimal. By the third trimester, you need roughly 300 extra calories per day (about a glass of milk and a banana). Quality of nutrition matters far more than quantity. Focus on protein, iron, folate, calcium, and omega-3 fatty acids. Your prenatal vitamin helps fill gaps but shouldn't replace a balanced diet.</p>"
  },
  "faq-hot-tub": {
    "title": "Can I take baths or use a hot tub?",
    "sub": "",
    "body": "<p>Warm baths are fine throughout pregnancy. Hot tubs, saunas, and steam rooms that raise your core body temperature above 102°F (39°C) are not recommended — especially in the first trimester, when elevated temperature is associated with neural tube defects. If you do use a hot tub, keep the temperature comfortable (not hot), limit time to 10 minutes, and avoid it in the first trimester. A warm bath at typical household water temperature (98–100°F) is safe.</p>"
  },
  "faq-epidural-csec": {
    "title": "Does an epidural increase C-section risk?",
    "sub": "",
    "body": "<p>No. This is one of the most studied questions in obstetrics. Multiple large randomized controlled trials and meta-analyses confirm that epidurals do <strong>not</strong> increase C-section rates. Epidurals may slightly lengthen the pushing stage, but this is managed safely with patience and nurse guidance. You can request an epidural at any point in active labor — there is no \"too early\" or \"too late\" threshold.</p>"
  },
  "faq-routine-episiotomy": {
    "title": "Do I need an episiotomy to avoid tearing?",
    "sub": "",
    "body": "<p>No. Routine episiotomy (a surgical cut at the vaginal opening) is no longer recommended by ACOG. Evidence consistently shows that <strong>natural tears generally heal better</strong> and cause fewer complications (including pain and long-term pelvic floor issues) than routine episiotomies. Most women who deliver vaginally have some degree of tearing, but many are minor (first-degree). Episiotomy is still appropriate when there is a specific indication — such as when baby needs to be delivered quickly for fetal distress.</p>"
  },
  "faq-water-breaking": {
    "title": "If my water breaks, do I have to have a C-section?",
    "sub": "",
    "body": "<p>No. If your membranes rupture (water breaks) at term, most women go into labor on their own within 12 hours. If labor doesn't start, induction is offered to reduce infection risk — the guideline is to complete delivery within 18–24 hours. If you are GBS-positive, antibiotics are started immediately. A C-section is only needed if there are other indications — water breaking alone is not one of them.</p>"
  }
}
```

Write the translated JSON object — same 6 card ids, each with
title/sub/body — to:
translation/out/es.content.6.json
