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

6 guide cards (~1169 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (6 cards):

```json
{
  "first-trimester": {
    "title": "First Trimester Visits (Weeks 4–14)",
    "sub": "What to expect at your earliest appointments",
    "body": "\n        <p class=\"lead\">Your first prenatal visit is usually around 8–10 weeks and is one of the longest — bring your questions and your partner if you have one.</p>\n        <h4>First Visit (8–10 Weeks)</h4>\n        <ul>\n          <li>Full health history, physical exam, pelvic exam, Pap smear (if due)</li>\n          <li>Blood work: blood type &amp; Rh factor, CBC, rubella immunity, HIV, hepatitis B, STI screening</li>\n          <li>Urine test for infection, protein, glucose</li>\n          <li>Blood pressure baseline, weight, due date confirmation by ultrasound</li>\n        </ul>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">Ask at This Visit</div>\n          <p>What medications and supplements are safe? Food and travel safety? Exercise limits? What are my specific risk factors?</p>\n        </div>\n        <h4>Genetic Screening (10–13 Weeks) — Your Choice</h4>\n        <ul>\n          <li><strong>NIPT (cell-free DNA)</strong> — blood test screening for chromosomal conditions including Down syndrome, Trisomy 18, Trisomy 13. Very accurate, but still a screening (not diagnostic) test.</li>\n          <li><strong>Nuchal translucency ultrasound</strong> — measures fluid at back of baby's neck, often combined with NIPT</li>\n          <li>If screening is abnormal, diagnostic testing (CVS or amniocentesis) is offered</li>\n        </ul>\n        <p>These tests are <em>optional</em>. Think about what you would do with results — your doctor can help you decide if testing is right for you.</p>\n        <div class=\"callout\">\n          <div class=\"callout-title\">At Every Visit</div>\n          <p>Blood pressure, weight, and urine are checked. Baby's heartbeat is audible by Doppler at 10–12 weeks. Always mention new symptoms, bleeding, or pain.</p>\n        </div>"
  },
  "second-trimester": {
    "title": "Second Trimester Visits (Weeks 15–27)",
    "sub": "Anatomy scan, glucose test, and more",
    "body": "\n        <p class=\"lead\">Visits are every 4 weeks. The anatomy ultrasound at 18–20 weeks is a major milestone — the most detailed look at your baby before birth.</p>\n        <h4>Anatomy Ultrasound (18–20 Weeks)</h4>\n        <ul>\n          <li>Detailed scan of baby's brain, heart, spine, kidneys, limbs, and face</li>\n          <li>Checks placenta location — important if low-lying (possible previa)</li>\n          <li>Measures cervical length — short cervix raises preterm birth risk</li>\n          <li>Estimates amniotic fluid level</li>\n          <li>This is when many families learn baby's sex if they want to know</li>\n        </ul>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">Ask at This Visit</div>\n          <p>Where is my placenta? What's my cervical length? Is baby's growth on track? Do any findings need follow-up?</p>\n        </div>\n        <h4>Optional Quad Screen / AFP (15–20 Weeks)</h4>\n        <p>Blood test screening for neural tube defects and chromosomal issues. Ask your doctor if you need this if you already had NIPT.</p>\n        <h4>Glucose Challenge Test (24–28 Weeks)</h4>\n        <ul>\n          <li>Screens for gestational diabetes — you drink a sugary drink and have blood drawn 1 hour later</li>\n          <li>If the result is elevated (not \"failed\" — it's a screen), you do a longer 3-hour diagnostic test</li>\n          <li>Gestational diabetes is manageable — diet, exercise, sometimes medication</li>\n        </ul>\n        <div class=\"callout\">\n          <div class=\"callout-title\">Start Thinking About</div>\n          <p>Childbirth classes, birth preferences, breastfeeding intentions, pediatrician selection, leave planning, baby gear.</p>\n        </div>"
  },
  "third-trimester": {
    "title": "Third Trimester Visits (Weeks 28–40+)",
    "sub": "Weekly visits, GBS swab, cervical checks",
    "body": "\n        <p class=\"lead\">Visits increase to every 2 weeks after 28 weeks, then weekly after 36. The finish line is in sight.</p>\n        <h4>28 Weeks — Rh Factor &amp; Tdap</h4>\n        <ul>\n          <li><strong>RhoGAM injection</strong> if you are Rh-negative — prevents your immune system from attacking a future Rh-positive baby</li>\n          <li><strong>Tdap vaccine</strong> (whooping cough booster) — strongly recommended 27–36 weeks. Antibodies pass to baby through the placenta, protecting the newborn before they can be vaccinated</li>\n        </ul>\n        <h4>35–37 Weeks — Group B Strep (GBS) Swab</h4>\n        <p>A simple vaginal and rectal swab. About 25% of women carry GBS normally — it's not an STI and doesn't harm you. If positive, you'll receive IV antibiotics during labor to protect baby from infection during delivery.</p>\n        <h4>36–40 Weeks — Cervical Checks &amp; Baby's Position</h4>\n        <ul>\n          <li>Your doctor may offer to check your cervix — how dilated and effaced it is</li>\n          <li>Baby's position is confirmed (head-down is ideal)</li>\n          <li>Discuss induction plans: ACOG recommends delivery by 42 weeks; many doctors offer elective induction at 39 weeks</li>\n        </ul>\n        <div class=\"callout\">\n          <div class=\"callout-title\">Ask at 36+ Weeks</div>\n          <p>When would you recommend inducing? What's the plan if I go past my due date? When should I go to the hospital?</p>\n        </div>"
  },
  "sve": {
    "title": "Cervical Exams (SVE) Explained",
    "sub": "Dilation, effacement, and station",
    "body": "\n        <p class=\"lead\">SVE stands for Sterile Vaginal Exam. It's how your doctor checks whether your cervix is preparing for — or progressing through — labor.</p>\n        <p>Your doctor uses two gloved fingers to feel the cervix and assess three things:</p>\n        <table class=\"data-table\">\n          <tr><th>What's Checked</th><th>What It Means</th></tr>\n          <tr><td><strong>Dilation</strong><br>0–10 cm</td><td>How open the cervix is. 10 cm = fully open, ready to push.</td></tr>\n          <tr><td><strong>Effacement</strong><br>0–100%</td><td>How thinned out the cervix is. 100% = completely thinned.</td></tr>\n          <tr><td><strong>Station</strong><br>-5 to +5</td><td>How far baby's head has descended. 0 = at the ischial spines (midpoint). +3 to +5 = nearly out.</td></tr>\n        </table>\n        <div class=\"callout\">\n          <div class=\"callout-title\">The Bishop Score</div>\n          <p>Providers sometimes use a combined score (Bishop Score) that includes dilation, effacement, station, cervical consistency, and position to predict how labor-ready your cervix is. A score ≥ 8 suggests a favorable cervix and successful induction.</p>\n        </div>\n        <p>SVEs in late pregnancy are optional — cervical dilation at 36–38 weeks doesn't predict exactly when labor will start. During active labor, SVEs every 2–4 hours track your progress toward 10 cm.</p>"
  },
  "exercise-pregnancy": {
    "title": "Exercise During Pregnancy",
    "sub": "Benefits, safe activities, and what to avoid",
    "body": "\n        <p class=\"lead\">Regular moderate exercise is safe and beneficial for most pregnant women. ACOG recommends 150 minutes of moderate activity per week.</p>\n        <h4>Benefits</h4>\n        <ul>\n          <li>Reduces back pain, swelling, constipation, and fatigue</li>\n          <li>Lowers risk of gestational diabetes, preeclampsia, and excessive weight gain</li>\n          <li>Improves sleep, mood, and energy levels</li>\n          <li>Often leads to shorter labor and faster recovery</li>\n          <li>Babies of active mothers often have healthier heart rate patterns</li>\n        </ul>\n        <h4>Good Choices at Any Stage</h4>\n        <ul>\n          <li><strong>Walking</strong> — easiest, safest, and accessible at any fitness level</li>\n          <li><strong>Swimming &amp; water aerobics</strong> — excellent in the third trimester; takes weight off joints</li>\n          <li><strong>Prenatal yoga or Pilates</strong> — builds core and pelvic floor strength, reduces back pain</li>\n          <li><strong>Stationary cycling</strong> — low fall risk, good cardio</li>\n          <li><strong>Modified strength training</strong> — light to moderate weights; avoid breath-holding (Valsalva)</li>\n          <li><strong>Kegel exercises</strong> — contract and release the pelvic floor, 3 sets of 10 daily, every day</li>\n        </ul>\n        <h4>What to Avoid After the First Trimester</h4>\n        <ul>\n          <li>Exercises lying flat on your back (compresses the vena cava)</li>\n          <li>Contact sports or activities with fall or collision risk</li>\n          <li>Scuba diving (decompression risk to baby)</li>\n          <li>Hot yoga or exercising in extreme heat</li>\n          <li>High altitude activities if not acclimatized</li>\n        </ul>\n        <div class=\"callout\">\n          <div class=\"callout-title\">The Talk Test</div>\n          <p>You should be able to carry on a conversation while exercising. Too winded to talk? Slow down. This is a simple proxy for keeping intensity in the safe range.</p>\n        </div>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Stop &amp; Call Your Provider If</div>\n          <p>Vaginal bleeding, dizziness, chest pain, severe shortness of breath, contractions, fluid leaking, decreased fetal movement, or calf pain and swelling.</p>\n        </div>"
  },
  "signs-of-labor": {
    "title": "Signs of Labor: When to Go In",
    "sub": "True labor vs. Braxton Hicks, and the 5-1-1 rule",
    "body": "\n        <p class=\"lead gold\">Knowing real labor from false labor saves a lot of unnecessary trips. Here's how to tell the difference.</p>\n        <table class=\"data-table\">\n          <tr><th>True Labor</th><th>Braxton Hicks</th></tr>\n          <tr><td>Gets longer, stronger, closer together</td><td>Irregular, don't intensify over time</td></tr>\n          <tr><td>Does not stop with rest or activity</td><td>Often stop with position change or hydration</td></tr>\n          <tr><td>Pain often starts in back, radiates forward</td><td>Usually felt only in front</td></tr>\n          <tr><td>Cervix is changing</td><td>Cervix unchanged</td></tr>\n        </table>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">The 5-1-1 Rule (First Baby)</div>\n          <p>Head to the hospital when contractions are <strong>5 minutes apart, lasting 1 minute, for at least 1 hour</strong>. For second or later babies, go sooner — call at 6–8 minutes apart, as labor moves faster.</p>\n        </div>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Go In Immediately If Any of These</div>\n          <p><strong>Water breaks</strong> (gush or constant trickle) · Bright red bleeding (more than spotting) · Baby has stopped moving · Severe constant abdominal pain · Signs of preeclampsia: severe headache not relieved by Tylenol, vision changes, sudden severe swelling</p>\n        </div>\n        <h4>Early Labor at Home</h4>\n        <p>If contractions are mild and irregular, early labor is actually more comfortable at home. Try: warm shower, walking, resting, staying hydrated, eating a light snack while you still can.</p>"
  }
}
```

Write the translated JSON object — same 6 card ids, each with
title/sub/body — to:
translation/out/es.content.1.json
