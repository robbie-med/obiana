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

6 guide cards (~1433 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (6 cards):

```json
{
  "what-happens-on-arrival": {
    "title": "What Happens When You Arrive at L&D",
    "sub": "Triage, admission, and getting settled",
    "body": "\n        <p class=\"lead gold\">You'll be assessed in triage before being admitted to a labor room. This process ensures you and baby are stable and that you're truly in active labor.</p>\n        <h4>Step 1: Triage Assessment</h4>\n        <ul>\n          <li>SVE to check cervical dilation and effacement</li>\n          <li>External fetal monitor applied — two straps around your belly, one tracking contractions and one tracking baby's heart rate</li>\n          <li>Blood pressure, temperature, pulse, oxygen saturation checked</li>\n          <li>IV access placed (a small catheter in your arm, standard procedure)</li>\n          <li>Urine sample</li>\n          <li>GBS status confirmed from your prenatal records</li>\n        </ul>\n        <h4>Step 2: Admitted or Asked to Wait</h4>\n        <p>If your cervix is less than 4–6 cm (depending on the hospital and circumstances), you may be sent home or asked to walk around for 1–2 hours for a recheck. This is not a rejection — early labor is genuinely safer and more comfortable at home. Don't be discouraged.</p>\n        <h4>Step 3: Labor Room</h4>\n        <p>Once admitted, you're in your room for the duration. Your nurse is your primary guide and will be checking on you regularly. This is the time to discuss your birth preferences and pain management options.</p>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">Bring This to the Hospital</div>\n          <p>ID and insurance card · This booklet with your contacts · Phone charger · Comfortable clothes for labor and recovery · Baby's going-home outfit and car seat · Toiletries · Snacks for support person</p>\n        </div>"
  },
  "stages-of-labor": {
    "title": "The Stages of Labor",
    "sub": "What your body is doing and how long it takes",
    "body": "\n        <table class=\"data-table\">\n          <tr><th class=\"gold\">Stage</th><th class=\"gold\">What's Happening</th><th class=\"gold\">Typical Length</th></tr>\n          <tr><td><strong>Stage 1 Early</strong><br>0–6 cm</td><td>Cervix dilates; contractions begin — may feel like strong period cramps or back ache</td><td>Hours to many hours; highly variable</td></tr>\n          <tr><td><strong>Stage 1 Active</strong><br>6–10 cm</td><td>Contractions intensify — every 3–5 min, lasting 45–60 sec. This is when most women use pain management</td><td>1–8 hrs first baby; faster with subsequent</td></tr>\n          <tr><td><strong>Stage 1 Transition</strong><br>8–10 cm</td><td>The most intense — contractions every 2–3 min. Short, but the hardest. Baby descends</td><td>15–60 minutes</td></tr>\n          <tr><td><strong>Stage 2 Pushing</strong><br>10 cm</td><td>Fully dilated — time to push. Strong urge to bear down. Baby's head crowns</td><td>20 min–3 hrs (first baby)</td></tr>\n          <tr><td><strong>Stage 3 Placenta</strong></td><td>Placenta delivers after baby. You may receive Pitocin (oxytocin) to help uterus contract</td><td>5–30 minutes</td></tr>\n        </table>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">Induction of Labor</div>\n          <p>If your cervix needs help, your doctor may use medications (misoprostol, oxytocin/Pitocin) or a balloon catheter to ripen and open the cervix. Induction can take 12–24+ hours, especially with a first baby and an unfavorable cervix. Plan for it to take time.</p>\n        </div>\n        <h4>Fetal Monitoring</h4>\n        <p>Most hospitals use continuous electronic fetal monitoring during active labor. This tracks baby's heart rate patterns relative to contractions, helping the team identify any signs of distress early. If you want to walk or use a tub, ask about wireless (telemetry) monitors if available.</p>"
  },
  "pain-management": {
    "title": "Pain Management: All Your Options",
    "sub": "From unmedicated techniques to epidural",
    "body": "\n        <p class=\"lead gold\">There's no single right way to manage labor pain. Your goal is a healthy baby and a birth experience you feel good about — not any particular method.</p>\n        <h4>Non-Medication Options</h4>\n        <ul>\n          <li><strong>Hydrotherapy</strong> — laboring in a shower or tub significantly reduces pain for many women. One of the most effective non-medication strategies</li>\n          <li><strong>Movement &amp; positioning</strong> — walking, rocking, hands-and-knees, birthing ball, side-lying all change how contractions feel</li>\n          <li><strong>Breathing techniques</strong> — slow patterned breathing is one of the most effective tools available. Childbirth class teaches this well</li>\n          <li><strong>Counter-pressure</strong> — firm pressure on your sacrum (lower back) during contractions dramatically reduces back labor pain</li>\n          <li><strong>TENS unit</strong> — small electrical pulses on the lower back disrupt pain signals; most helpful in early labor</li>\n          <li><strong>Heat &amp; cold</strong> — heat pack on the lower back, cold on the forehead</li>\n        </ul>\n        <h4>Nitrous Oxide (Laughing Gas)</h4>\n        <p>Inhaled through a mask that <em>you</em> hold and control during contractions. Takes the edge off without fully blocking pain. Wears off within 5 minutes. Can cause lightheadedness or nausea in some women. Available at many U.S. hospitals — ask if it's offered at yours.</p>\n        <h4>IV / IM Opioid Medications</h4>\n        <p>Medications like fentanyl or morphine given through your IV take the edge off but don't eliminate pain. Can cause drowsiness, nausea, and itching. Cross to baby in small amounts — timing matters (avoid close to delivery so baby is alert for birth).</p>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">You Can Change Your Mind</div>\n          <p>Choosing to start unmedicated and requesting an epidural later is completely normal and valid. Similarly, planning an epidural and then having a fast labor that doesn't allow time for one is also common. Stay flexible.</p>\n        </div>"
  },
  "epidural": {
    "title": "The Epidural: What to Know",
    "sub": "How it works, risks, and facts vs. myths",
    "body": "\n        <p class=\"lead gold\">An epidural is the most effective form of labor pain relief. About 75% of women delivering in U.S. hospitals use one.</p>\n        <h4>How It Works</h4>\n        <p>An anesthesiologist places a small flexible catheter (thin tube) in the epidural space of your lower back — not into the spinal cord itself. Local anesthetic and/or opioid medication flows through the catheter, numbing the nerves that carry pain signals from the uterus. You remain fully awake and can usually still feel pressure and move your legs.</p>\n        <h4>What to Expect</h4>\n        <ul>\n          <li>Placement takes 10–15 minutes; you'll need to hold very still during contractions</li>\n          <li>Full effect in 15–20 minutes</li>\n          <li>Requires continuous fetal monitoring and an IV</li>\n          <li>Blood pressure is checked frequently — a brief drop is common and very manageable with IV fluids or medication</li>\n          <li>You may feel less urge to push — nurses will guide you through pushing</li>\n          <li>A urinary catheter is usually placed once you're numb</li>\n        </ul>\n        <h4>Actual Risks (Uncommon)</h4>\n        <ul>\n          <li><strong>Spinal headache</strong> (~1%): caused by a small dural puncture. Treatable with a \"blood patch\"</li>\n          <li><strong>Temporary low blood pressure</strong>: very common, very manageable</li>\n          <li><strong>Incomplete relief</strong>: occasionally requires repositioning or a new placement</li>\n          <li><strong>Itching</strong>: from the opioid component, usually mild</li>\n          <li><strong>Fever</strong>: epidural-associated fever is real but usually benign and managed</li>\n        </ul>\n        <div class=\"callout\">\n          <div class=\"callout-title\">Key Fact — The C-Section Myth</div>\n          <p>Epidurals do <strong>not</strong> increase C-section rates — this is one of the most common and well-studied myths in obstetrics. Multiple large randomized trials confirm this. You can request an epidural at any point in active labor.</p>\n        </div>"
  },
  "csection": {
    "title": "C-Section: Why It Happens & What to Expect",
    "sub": "Planned vs. unplanned, the procedure, recovery",
    "body": "\n        <p class=\"lead gold\">A cesarean section is a surgical delivery through incisions in the abdomen and uterus. About 30% of U.S. births are by C-section.</p>\n        <h4>Planned (Scheduled) Reasons</h4>\n        <ul>\n          <li>Placenta previa — placenta covers the cervical opening</li>\n          <li>Baby in breech (feet-down) or transverse (sideways) position that hasn't turned</li>\n          <li>Prior classic (vertical) uterine incision</li>\n          <li>Twins or higher multiples in certain positions</li>\n          <li>Certain maternal conditions (severe heart disease, active genital herpes outbreak)</li>\n        </ul>\n        <h4>Unplanned Reasons During Labor</h4>\n        <ul>\n          <li>Non-reassuring fetal heart rate (baby showing signs of distress)</li>\n          <li>Labor arrest — no progress despite adequate contractions and time</li>\n          <li>Placental abruption — placenta detaches prematurely</li>\n          <li>Umbilical cord prolapse — cord comes through the cervix before baby</li>\n        </ul>\n        <h4>In the Operating Room</h4>\n        <ul>\n          <li>Spinal or epidural anesthesia — you are awake and numb from chest down</li>\n          <li>A screen blocks the surgical field — you can ask for it to be lowered at the moment of birth</li>\n          <li>Your support person can usually be with you</li>\n          <li>You'll feel pressure and pulling — not pain</li>\n          <li>Baby is often placed on your chest immediately even in the OR (\"gentle cesarean\")</li>\n          <li>Total time: about 45–60 minutes; the birth itself takes 5–10 minutes</li>\n        </ul>\n        <h4>Recovery After C-Section</h4>\n        <ul>\n          <li>Hospital stay: 2–4 days (vs. 1–2 days after vaginal birth)</li>\n          <li>Pain managed with scheduled ibuprofen + acetaminophen ± short-term opioids</li>\n          <li>Walking starts the same day — critical for preventing blood clots</li>\n          <li>No lifting anything heavier than your baby for 4–6 weeks</li>\n          <li>Incision is a horizontal \"bikini-line\" scar, closed with staples or absorbable sutures</li>\n        </ul>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Call After C-Section Discharge If</div>\n          <p>Incision opens, shows redness spreading outward, or has unusual drainage · Fever &gt;100.4°F · Worsening rather than improving pain · Soaking a pad in 1 hour</p>\n        </div>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">VBAC — Vaginal Birth After Cesarean</div>\n          <p>If you've had one prior low-transverse C-section, a VBAC may be an option for this pregnancy. Success rates are 60–80%. Discuss this early in your prenatal care.</p>\n        </div>"
  },
  "mfm": {
    "title": "High-Risk Pregnancy & MFM Referral",
    "sub": "What MFM is and why you might be referred",
    "body": "\n        <p class=\"lead gold\">MFM stands for Maternal-Fetal Medicine — a subspecialist OB who focuses on high-risk pregnancies. A referral is a sign you're getting expert oversight, not a cause for panic.</p>\n        <h4>Common Reasons for MFM Referral</h4>\n        <ul>\n          <li>Preeclampsia or chronic high blood pressure</li>\n          <li>Pregestational (Type 1 or 2) diabetes or gestational diabetes requiring insulin</li>\n          <li>Twins, triplets, or higher-order multiples</li>\n          <li>History of preterm birth (before 37 weeks)</li>\n          <li>Short cervix found on ultrasound (cervical incompetence)</li>\n          <li>Fetal growth restriction or structural abnormality on anatomy scan</li>\n          <li>Autoimmune conditions: lupus, antiphospholipid syndrome</li>\n          <li>Chronic kidney disease, heart disease, blood clotting disorders</li>\n          <li>Abnormal genetic screening results requiring follow-up</li>\n          <li>Advanced maternal age (&gt;35) with complications</li>\n        </ul>\n        <h4>What MFM Actually Does</h4>\n        <ul>\n          <li>Performs specialized ultrasounds — detailed fetal anatomy survey, fetal echocardiogram, serial growth scans</li>\n          <li>Advises on medications, delivery timing, and mode of delivery</li>\n          <li>May co-manage your care alongside your OB or midwife, or take over primary care in complex cases</li>\n          <li>Most patients still deliver with their original provider</li>\n        </ul>\n        <div class=\"callout\">\n          <div class=\"callout-title\">Ask Your MFM</div>\n          <p>What is the specific concern? How will it be monitored? Does it change how or when I deliver? Will I need more frequent visits or ultrasounds?</p>\n        </div>"
  }
}
```

Write the translated JSON object — same 6 card ids, each with
title/sub/body — to:
translation/out/ko.content.2.json
