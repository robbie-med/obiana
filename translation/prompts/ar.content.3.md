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

6 guide cards (~1297 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (6 cards):

```json
{
  "immediate-postpartum": {
    "title": "The First Hours After Delivery",
    "sub": "The \"fourth stage\" — what's being monitored",
    "body": "\n        <p class=\"lead rose\">The first two hours after birth — called the \"fourth stage of labor\" — are the most important time for monitoring. Your nurse will be checking on you frequently.</p>\n        <h4>What's Being Monitored</h4>\n        <ul>\n          <li><strong>Your uterus</strong> — nurses check that it's firm and well-contracted to prevent hemorrhage. They'll press on your abdomen periodically.</li>\n          <li><strong>Bleeding (lochia)</strong> — amount and color are tracked</li>\n          <li><strong>Blood pressure and heart rate</strong></li>\n          <li><strong>Your perineum or incision</strong></li>\n          <li><strong>Pain level</strong> — don't wait for pain to become severe; ask for medication proactively</li>\n        </ul>\n        <h4>Skin-to-Skin Contact</h4>\n        <p>Placing baby on your bare chest immediately after birth — even after C-section — regulates baby's temperature, blood sugar, and breathing, stabilizes heart rate, and strongly promotes bonding and breastfeeding initiation. Ask for this to happen unless there's a specific medical reason it can't.</p>\n        <div class=\"callout rose\">\n          <div class=\"callout-title\">Delayed Cord Clamping</div>\n          <p>Waiting 30–60 seconds (or longer) before clamping and cutting the umbilical cord transfers an extra 80–100 mL of iron-rich blood to baby. This is now standard practice at most U.S. hospitals. You can confirm it's planned ahead of time.</p>\n        </div>\n        <h4>Your First Meal</h4>\n        <p>After a vaginal birth, you can usually eat shortly after delivery. After a C-section, clear liquids first, then regular food as tolerated — typically within a few hours.</p>"
  },
  "physical-recovery": {
    "title": "Physical Recovery: What to Expect",
    "sub": "Lochia, perineal care, pain management",
    "body": "\n        <h4>Postpartum Bleeding (Lochia)</h4>\n        <p>Lochia is normal discharge as the uterine lining sheds and the placental site heals. It changes over time:</p>\n        <table class=\"data-table\">\n          <tr><th class=\"rose\">Days</th><th class=\"rose\">Appearance</th><th class=\"rose\">Normal?</th></tr>\n          <tr><td>1–4</td><td>Bright red, like a heavy period</td><td>✓ Yes</td></tr>\n          <tr><td>5–10</td><td>Pink to brown, lighter flow</td><td>✓ Yes</td></tr>\n          <tr><td>10–28+</td><td>Yellow-white, scant</td><td>✓ Yes</td></tr>\n        </table>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Call Your Provider If</div>\n          <p>Soaking more than 1 pad per hour for 2 consecutive hours · Passing golf ball-sized clots · Bright red bleeding returns after it has lightened · Foul-smelling discharge</p>\n        </div>\n        <h4>Perineal Care (After Vaginal Birth)</h4>\n        <ul>\n          <li>Use peri-bottle with warm water after every bathroom visit — front to back</li>\n          <li>Ice packs for the first 24 hours, then switch to warm sitz baths (10–15 min, 2–3x/day)</li>\n          <li>Witch hazel pads (e.g., Tucks) soothe swelling and hemorrhoids</li>\n          <li><strong>Stool softener (docusate/colace)</strong> — start immediately; constipation with perineal stitches is very uncomfortable and straining risks tearing stitches</li>\n        </ul>\n        <h4>Pain Management</h4>\n        <p>Alternating ibuprofen (600 mg every 6 hours) and acetaminophen (650 mg every 6 hours) on a scheduled basis works much better than waiting for pain to spike. Ask your nurse for a written schedule on Day 1 and stick to it.</p>"
  },
  "mood-ppd": {
    "title": "Mood & Emotional Recovery",
    "sub": "Baby blues, PPD, and when to ask for help",
    "body": "\n        <p class=\"lead rose\">Dramatic hormonal changes after delivery affect mood significantly. Emotional shifts are expected — but some symptoms need attention.</p>\n        <h4>Baby Blues (Normal — Up to 80% of Mothers)</h4>\n        <p>Tearfulness, mood swings, anxiety, and irritability in the first week after birth, driven by a sharp drop in estrogen and progesterone. Baby blues typically resolve on their own within 2 weeks.</p>\n        <h4>Postpartum Depression (PPD) — 1 in 8 Mothers</h4>\n        <p>PPD is a medical condition — a treatable mood disorder, not a character flaw or a sign of bad mothering.</p>\n        <div class=\"callout rose\">\n          <div class=\"callout-title\">Symptoms of PPD</div>\n          <p>Persistent sadness or emptiness · Difficulty bonding with your baby · Feeling like a bad mother or that your baby would be better off without you · Severe anxiety or panic attacks · Inability to sleep even when baby sleeps · Loss of interest in things you used to enjoy · Thoughts of harming yourself or baby</p>\n        </div>\n        <p>If these symptoms persist beyond 2 weeks or are severe at any point, tell your care team. PPD is effectively treated with therapy, support groups, and/or medication (many of which are safe with breastfeeding). <strong>Don't wait until your 6-week visit to mention it.</strong></p>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Postpartum Psychosis — Rare but a Medical Emergency</div>\n          <p>Hallucinations, delusions, extreme confusion, or agitation in the days after birth. Call 911 or go to the ER immediately. This is rare (1–2 in 1,000) but requires urgent treatment.</p>\n        </div>\n        <h4>Postpartum Anxiety</h4>\n        <p>Less discussed but very common. Excessive, intrusive worry about baby's safety, difficulty sleeping even when exhausted, constant checking, physical symptoms like racing heart. Also very treatable — mention it to your doctor.</p>"
  },
  "pelvic-rest": {
    "title": "Pelvic Rest & Resuming Sex",
    "sub": "Why the 6-week recommendation exists",
    "body": "\n        <p class=\"lead rose\">ACOG recommends waiting at least 6 weeks after delivery before having vaginal intercourse. Here's why this guidance exists.</p>\n        <h4>Why 6 Weeks?</h4>\n        <ul>\n          <li>The uterus needs 4–6 weeks to fully contract and for the placental attachment site to heal completely</li>\n          <li>Any vaginal tears, lacerations, or episiotomy stitches need time to heal</li>\n          <li>C-section incisions — both the external scar and the uterine incision inside — need at least 6 weeks</li>\n          <li>The cervix, which was dilated to 10 cm, gradually closes over several weeks — during this time it provides a direct path for infection to reach the uterus</li>\n        </ul>\n        <h4>What \"Pelvic Rest\" Means</h4>\n        <p>Nothing in the vagina: no intercourse, no tampons, no menstrual cups, no douching. Use pads only for lochia during the healing period.</p>\n        <div class=\"callout rose\">\n          <div class=\"callout-title\">When You're Ready to Resume</div>\n          <p><strong>Dryness is very common</strong> — especially if breastfeeding, which keeps estrogen low. Use a water-based lubricant. Take your time; some initial discomfort is normal. Persistent pain is not — tell your doctor. <strong>Use contraception</strong> — you can become pregnant before your period returns. Discuss options at your 6-week visit.</p>\n        </div>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">Contraception After Delivery</div>\n          <p>You can ovulate and get pregnant as early as 3 weeks postpartum, even while breastfeeding, and before your period returns. If you don't want to become pregnant immediately, discuss contraception before leaving the hospital or at your 2-week visit at the latest.</p>\n        </div>"
  },
  "postpartum-exercise": {
    "title": "Returning to Exercise After Delivery",
    "sub": "What's safe when, and pelvic floor PT",
    "body": "\n        <p class=\"lead rose\">Getting active again after delivery improves mood, energy, and physical recovery — but the timeline matters.</p>\n        <h4>Start Immediately (Days 1–2)</h4>\n        <ul>\n          <li><strong>Kegel exercises</strong> — start within 24–48 hours if comfortable. These speed healing, reduce urinary leakage risk, and rebuild pelvic floor tone. 3 sets of 10 holds (5–10 seconds each), multiple times per day.</li>\n          <li><strong>Gentle walking</strong> — short walks are encouraged starting Day 1–2. Builds up as you feel ready.</li>\n          <li><strong>Deep belly breathing</strong> — inhale to expand the belly, exhale slowly. Helps reconnect with deep core muscles.</li>\n        </ul>\n        <h4>Weeks 2–6</h4>\n        <ul>\n          <li>Gradually increase walking duration and pace</li>\n          <li>Gentle stretching and mobility work is fine</li>\n          <li>Avoid: sit-ups, crunches, planks, heavy lifting, high-impact activities, anything that increases downward pressure on the pelvic floor</li>\n          <li>Listen to your body — increased pain, bleeding, or pelvic pressure means slow down</li>\n        </ul>\n        <h4>After 6-Week Clearance</h4>\n        <p>You can gradually return to your pre-pregnancy exercise activities. Start at 50% intensity and build slowly over weeks. Running, HIIT, and lifting can all resume — but start gently.</p>\n        <div class=\"callout rose\">\n          <div class=\"callout-title\">Diastasis Recti</div>\n          <p>A separation of the two sides of the rectus abdominis (the \"six-pack\" muscles) that's very common after pregnancy. Standard crunches and sit-ups can worsen it. A pelvic floor physical therapist can screen you and give you safe, effective exercises. Ask your doctor for a referral.</p>\n        </div>\n        <div class=\"callout\">\n          <div class=\"callout-title\">Pelvic Floor Physical Therapy</div>\n          <p>An underused but highly effective resource after delivery. Treats urinary leakage, pelvic organ prolapse, pain with sex, diastasis recti, and general pelvic floor weakness. Ask for a referral at your 6-week visit — it's covered by most insurance.</p>\n        </div>"
  },
  "postpartum-danger": {
    "title": "Postpartum Warning Signs & Follow-Up",
    "sub": "When to call and your appointment schedule",
    "body": "\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Go to the ER or Call 911 For</div>\n          <p>Chest pain or difficulty breathing · Seizure · Sudden severe headache unlike any before · Stroke symptoms (face drooping, arm weakness, slurred speech) · Thoughts of harming yourself or your baby</p>\n        </div>\n        <div class=\"callout rose\">\n          <div class=\"callout-title\">Call Your OB / Midwife For</div>\n          <p>Fever &gt;100.4°F · Soaking more than 1 pad per hour for 2 hours · Severe headache not relieved by ibuprofen/Tylenol · Vision changes · Leg redness, swelling, or warmth (DVT) · Wound opening, redness spreading, or pus · Difficulty urinating · Signs of PPD or anxiety</p>\n        </div>\n        <h4>Your Postpartum Visit Schedule</h4>\n        <table class=\"data-table\">\n          <tr><th class=\"rose\">When</th><th class=\"rose\">Purpose</th></tr>\n          <tr><td><strong>1–3 days</strong><br>(C-section or complications)</td><td>Wound check, blood pressure, pain management</td></tr>\n          <tr><td><strong>2 weeks</strong><br>(now recommended by ACOG)</td><td>Mood screening (Edinburgh Scale), BP, incision/perineum check, breastfeeding support</td></tr>\n          <tr><td><strong>6 weeks</strong></td><td>Full physical, pelvic exam, contraception, clearance for sex and exercise, thyroid check if indicated</td></tr>\n        </table>\n        <div class=\"callout\">\n          <div class=\"callout-title\">Questions to Ask at Your 6-Week Visit</div>\n          <p>Contraception · Pelvic floor PT referral · Return to full exercise · Diastasis recti screening · Sex concerns and dryness · Mood and PPD screening · Incision or perineal healing · Any other accumulated questions</p>\n        </div>"
  }
}
```

Write the translated JSON object — same 6 card ids, each with
title/sub/body — to:
translation/out/ar.content.3.json
