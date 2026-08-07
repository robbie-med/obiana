You are translating patient-facing medical education content for a
pregnancy and childbirth guide, from English into Korean (한국어).

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
the KEY SET with the plural categories Korean actually uses (CLDR
categories: zero, one, two, few, many, other) and give the correct wording for
each. Keep the {count} placeholder in every form.

## This batch

6 guide cards (~415 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (6 cards):

```json
{
  "faq-eat-in-labor": {
    "title": "Can I eat or drink during labor?",
    "sub": "",
    "body": "<p>For low-risk women in early labor, current ACOG guidance supports light food and clear liquids. Once you have an epidural, are on Pitocin, or are higher risk for needing general anesthesia (possible C-section), most hospitals restrict to ice chips or sips of water due to aspiration risk if general anesthesia becomes necessary. Ask your hospital's specific policy. For your support person: bring snacks. Labor can be a long day.</p>"
  },
  "faq-vbac": {
    "title": "If I had a C-section before, do I always need another one?",
    "sub": "",
    "body": "<p>Not necessarily. Vaginal birth after cesarean (VBAC) is a safe and appropriate option for many women with one prior low-transverse uterine incision. Success rates range from 60–80%. Factors that affect candidacy include the reason for the prior C-section, your current pregnancy, the type of uterine incision, and your hospital's capacity to handle an emergency. Bring this up early in prenatal care if you are interested.</p>"
  },
  "faq-bf-bc": {
    "title": "Can I get pregnant while breastfeeding?",
    "sub": "",
    "body": "<p>Yes. While exclusive breastfeeding suppresses ovulation to some degree, it is <strong>not reliable contraception</strong>. You can ovulate — and get pregnant — before your period returns. The \"lactational amenorrhea method\" requires very specific conditions (exclusive breastfeeding every 4 hours daytime / 6 hours nighttime, no supplementation, no period returned) and is only about 98% effective under those strict conditions. Discuss birth control before you leave the hospital.</p>"
  },
  "faq-stress-milk": {
    "title": "Does stress dry up breast milk?",
    "sub": "",
    "body": "<p>Acute stress can temporarily interfere with the letdown reflex (the release of milk), but it does not affect milk production long-term. Milk supply is driven by demand — the more frequently and effectively your baby nurses or you pump, the more milk your body produces. Strategies that help letdown: skin-to-skin contact, warmth, relaxation techniques, and looking at a photo of your baby when pumping.</p>"
  },
  "faq-bonding": {
    "title": "Should I feel instantly bonded with my baby?",
    "sub": "",
    "body": "<p>No — bonding is a process, not a single moment. Many mothers feel deep love immediately at birth; others need days, weeks, or longer to develop that feeling. Both are completely normal. Physical exhaustion, difficult deliveries, unexpected outcomes, and PPD can all affect early bonding. If you feel disconnected or numb toward your baby for more than a couple of weeks, mention it to your doctor — it can be a sign of postpartum depression, which is treatable.</p>"
  },
  "faq-ibuprofen-bf": {
    "title": "Can I take ibuprofen while breastfeeding?",
    "sub": "",
    "body": "<p>Yes. Ibuprofen is one of the safest OTC medications while breastfeeding — very little transfers to breast milk. Acetaminophen (Tylenol) is also safe. These are the preferred pain medications postpartum and during breastfeeding. High-dose aspirin is not recommended (low-dose prescribed aspirin is a different matter — discuss with your doctor). Naproxen (Aleve) has more milk transfer and is generally not preferred. Always confirm with your care team for your specific situation.</p>"
  }
}
```

Write the translated JSON object — same 6 card ids, each with
title/sub/body — to:
translation/out/ko.content.7.json
