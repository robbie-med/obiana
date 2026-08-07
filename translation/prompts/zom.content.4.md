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

6 guide cards (~1440 words). Each card is an object:

- "title" — the card heading, short
- "sub"   — a one-line subtitle (may be an empty string; if empty, leave it empty)
- "body"  — an HTML fragment, the main content. This is the important one.

Translate all three fields of every card. Preserve every HTML tag and class
attribute in "body" exactly.

Input (6 cards):

```json
{
  "breastfeeding": {
    "title": "Breastfeeding: Getting Started",
    "sub": "Latch, colostrum, and how to know it's working",
    "body": "\n        <p class=\"lead navy\">Breastfeeding is natural but takes practice. Most challenges can be solved with good support. <strong>Ask for a lactation consultant before you leave the hospital — it's one of the most valuable resources available to you.</strong></p>\n        <h4>First 1–3 Days: Colostrum</h4>\n        <p>Your first \"milk\" is colostrum — thick, golden-yellow, and produced in small amounts (teaspoons, not ounces). This is exactly right. Colostrum is packed with antibodies, immune factors, and exactly what a newborn needs. Your mature milk comes in around days 2–5 (often slightly later after a C-section).</p>\n        <h4>The Latch — Most Important Thing</h4>\n        <ul>\n          <li>Baby's mouth should cover most of the areola, not just the nipple</li>\n          <li>Both lips should be flanged outward (not curled in)</li>\n          <li>You should hear swallowing sounds — a soft \"kuh\" — not clicking</li>\n          <li>Baby's nose and chin should both touch the breast</li>\n          <li>A good latch should not hurt after the first 20–30 seconds. If it hurts throughout, break suction with a clean finger and try again.</li>\n        </ul>\n        <h4>How Often to Feed</h4>\n        <p>8–12 times in 24 hours in the first weeks. Feed on demand — watch for hunger cues (rooting, hands to mouth, sucking movements, fussiness) rather than watching the clock. Newborns need to eat that often; it's not a sign you don't have enough milk.</p>\n        <div class=\"callout navy\">\n          <div class=\"callout-title\">How to Know Baby Is Getting Enough</div>\n          <p><strong>Diapers:</strong> By day 4–5, expect at least 6 wet diapers and 3–4 yellow seedy stools per day. <strong>Weight:</strong> Birth weight should be regained by 10–14 days. After day 5, expect ½–1 oz gain per day. <strong>Baby:</strong> Satisfied after feeds, alert during awake periods.</p>\n        </div>"
  },
  "bf-challenges": {
    "title": "Breastfeeding Challenges & Solutions",
    "sub": "Sore nipples, engorgement, supply concerns, mastitis",
    "body": "\n        <table class=\"data-table\">\n          <tr><th class=\"navy\">Problem</th><th class=\"navy\">What to Do</th></tr>\n          <tr><td><strong>Sore nipples</strong></td><td>Check latch first — this is the #1 cause. Apply expressed breast milk or lanolin after feeds. Air dry. Usually improves after day 5 once milk comes in and latch improves.</td></tr>\n          <tr><td><strong>Engorgement</strong></td><td>Feed or pump frequently (every 2–3 hrs). Warm compress before feeding to help letdown. Cold pack after feeding to reduce swelling. Can cause a low-grade fever — if &gt;100.4°F, call your doctor.</td></tr>\n          <tr><td><strong>Low supply concerns</strong></td><td>Feed more frequently — supply follows demand. Ensure good latch. Pump after feeds to signal more production. See a lactation consultant. Most perceived low supply is actually sufficient supply.</td></tr>\n          <tr><td><strong>Clogged duct</strong></td><td>Firm, tender lump in breast. Massage toward the nipple during feeds. Warm compress before nursing. Frequent emptying of that breast. Usually resolves in 1–2 days.</td></tr>\n          <tr><td><strong>Mastitis</strong></td><td>Flu-like symptoms (fever, body aches, fatigue) + a red, painful area of breast. Keep breastfeeding — stopping makes it worse. Usually requires antibiotics — call your doctor.</td></tr>\n          <tr><td><strong>Nipple thrush</strong></td><td>Sharp, burning pain during and after feeds. Pinkish, shiny nipples. Both you and baby need antifungal treatment at the same time. Call your doctor and baby's pediatrician.</td></tr>\n        </table>\n        <div class=\"callout navy\">\n          <div class=\"callout-title\">Pumping</div>\n          <p>Electric double breast pumps are covered by most U.S. insurance plans under the ACA. Pumping maintains supply when baby can't nurse, allows others to feed baby, and builds a freezer stash. Milk can be refrigerated for 4 days or frozen 6–12 months.</p>\n        </div>\n        <div class=\"callout\">\n          <div class=\"callout-title\">It's Okay to Supplement or Formula Feed</div>\n          <p>If breastfeeding is not working despite support, supplementing with formula is not failure — it's feeding your baby. A fed, thriving baby matters most. Many families combine breast and formula feeding successfully.</p>\n        </div>"
  },
  "formula": {
    "title": "Formula Feeding",
    "sub": "Choosing, preparing, and storing formula safely",
    "body": "\n        <p class=\"lead navy\">Formula is a safe and complete source of nutrition for your baby. The best feeding method is the one that keeps your baby nourished and your family well.</p>\n        <h4>Choosing a Formula</h4>\n        <ul>\n          <li>Standard cow's milk-based, iron-fortified formula is appropriate for most healthy term babies</li>\n          <li>Soy formula is appropriate for certain dietary or religious reasons</li>\n          <li>Hypoallergenic (hydrolyzed) formulas are for babies with confirmed milk protein allergy — don't switch without talking to your pediatrician</li>\n          <li>Don't change formula brands frequently hoping to solve normal fussiness — most switching doesn't help</li>\n        </ul>\n        <h4>Preparing Formula</h4>\n        <ul>\n          <li>Follow package instructions exactly — the ratio of powder to water is carefully designed</li>\n          <li>Use water that meets safe drinking standards. For babies under 2 months or immunocompromised, boil and cool tap water</li>\n          <li>To warm: place bottle in a bowl of warm water. <strong>Never microwave</strong> — heats unevenly and can burn baby's mouth</li>\n        </ul>\n        <h4>How Much, How Often</h4>\n        <ul>\n          <li>Newborn (0–1 month): 1–2 oz every 2–3 hours (8–12 feeds/day)</li>\n          <li>2 months: 3–4 oz every 3–4 hours</li>\n          <li>4 months: 4–6 oz every 4 hours</li>\n          <li>Feed on demand — these are guides, not rules</li>\n        </ul>\n        <table class=\"data-table\">\n          <tr><th class=\"navy\">Storage</th><th class=\"navy\">How Long</th></tr>\n          <tr><td>Opened bottle (started)</td><td>Use within 1 hour or discard</td></tr>\n          <tr><td>Prepared but not started (fridge)</td><td>Up to 24 hours</td></tr>\n          <tr><td>Unmixed powder (sealed, room temp)</td><td>Follow package expiration</td></tr>\n        </table>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Never</div>\n          <p>Give regular cow's milk before 12 months · Add cereal to a bottle · Dilute formula to make it last longer · Make formula stronger than directed · Use expired formula</p>\n        </div>"
  },
  "cord-care": {
    "title": "Umbilical Cord Care",
    "sub": "Keeping it clean, dry, and when to worry",
    "body": "\n        <p class=\"lead navy\">The umbilical cord stump dries up and falls off on its own in 1–3 weeks. Your main job is keeping it clean and dry.</p>\n        <h4>Normal Appearance Over Time</h4>\n        <ul>\n          <li>At birth: yellow-green, soft, and rubbery</li>\n          <li>Days 1–5: begins to dry, turns brown</li>\n          <li>Days 5–14: progressively shriveled and black</li>\n          <li>Falls off naturally — do not pull it, even when it looks like it's barely attached</li>\n        </ul>\n        <h4>How to Care for It</h4>\n        <ul>\n          <li><strong>Keep it dry:</strong> Sponge baths only until the stump falls off — no submersing in water</li>\n          <li><strong>Fold the diaper down</strong> to keep the stump exposed to air and prevent urine contact</li>\n          <li><strong>Loose, airy clothing</strong> — avoid onesies or clothes that rub the cord</li>\n          <li><strong>No alcohol wipes needed</strong> — studies show clean dry care heals just as well or faster. Your hospital may have a specific protocol; follow their guidance.</li>\n        </ul>\n        <h4>Normal Findings</h4>\n        <ul>\n          <li>Small amount of dried blood at the base as it separates — normal</li>\n          <li>Slight moisture or minimal clear discharge at the base — usually normal</li>\n          <li>A mild smell as it dries — generally normal</li>\n        </ul>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Call the Pediatrician If</div>\n          <p><strong>Redness spreading on the surrounding skin</strong> — this is omphalitis (a skin infection) and needs prompt treatment · Foul or strong smell · Yellow or green pus · Bleeding that doesn't stop with gentle pressure · Stump still attached at 5–6 weeks without explanation</p>\n        </div>"
  },
  "normal-newborn": {
    "title": "Normal Newborn Appearance & Behavior",
    "sub": "What looks alarming but is totally normal",
    "body": "\n        <p class=\"lead navy\">Many normal newborn features look alarming to new parents. Here's what to expect.</p>\n        <table class=\"data-table\">\n          <tr><th class=\"navy\">What You See</th><th class=\"navy\">Normal?</th></tr>\n          <tr><td>Cone-shaped or molded head</td><td>✓ Yes — resolves in days</td></tr>\n          <tr><td>Soft spots (fontanelles) pulsating</td><td>✓ Yes — normal</td></tr>\n          <tr><td>Cheesy white coating (vernix)</td><td>✓ Yes — protective, let absorb</td></tr>\n          <tr><td>Fine hair on shoulders/back (lanugo)</td><td>✓ Yes — sheds in weeks</td></tr>\n          <tr><td>Yellow skin or eyes (jaundice)</td><td>Common — needs monitoring</td></tr>\n          <tr><td>Swollen breasts (girls or boys)</td><td>✓ Yes — maternal hormones</td></tr>\n          <tr><td>Swollen labia or scrotum</td><td>✓ Yes — maternal hormones</td></tr>\n          <tr><td>Girls: bloody or mucousy vaginal discharge</td><td>✓ Yes — hormone withdrawal</td></tr>\n          <tr><td>Crossed eyes occasionally</td><td>✓ Yes — normal until ~4 months</td></tr>\n          <tr><td>Peeling skin (day 1–3)</td><td>✓ Yes — especially post-term</td></tr>\n          <tr><td>Sneezing frequently</td><td>✓ Yes — not a cold</td></tr>\n          <tr><td>Hiccups constantly</td><td>✓ Yes — very normal</td></tr>\n          <tr><td>Pimple-like rash (erythema toxicum)</td><td>✓ Yes — harmless, resolves in days</td></tr>\n          <tr><td>Dark first stool (meconium)</td><td>✓ Yes — should pass within 24–48 hrs</td></tr>\n        </table>\n        <div class=\"callout alert\">\n          <div class=\"callout-title\">Call the Pediatrician Immediately For</div>\n          <p>Fever ≥ 100.4°F rectal (serious in newborns — always take rectal temp) · Refusing to eat · Extreme yellowing · Grunting with every breath · Blue lips or very pale skin · Inconsolable crying · Fewer than 6 wet diapers/day after day 5 · Stiff neck</p>\n        </div>"
  },
  "safe-sleep": {
    "title": "Safe Sleep for Baby",
    "sub": "The ABCs of SIDS prevention",
    "body": "\n        <p class=\"lead navy\">Safe sleep practices prevent SIDS and sleep-related infant deaths, which cause about 3,500 infant deaths per year in the U.S. These guidelines save lives.</p>\n        <div class=\"callout navy\">\n          <div class=\"callout-title\">The ABCs of Safe Sleep</div>\n          <p><strong>A — Alone:</strong> Baby sleeps alone, not with adults, siblings, or pets<br><strong>B — Back:</strong> Always place baby on their back to sleep — every sleep, every caregiver<br><strong>C — Crib:</strong> On a firm, flat sleep surface with only a fitted sheet</p>\n        </div>\n        <h4>The Safe Sleep Environment</h4>\n        <ul>\n          <li>Firm, flat mattress in a crib, bassinet, or play yard that meets current CPSC safety standards</li>\n          <li><strong>Nothing else</strong> in the sleep area — no pillows, blankets, bumper pads, positioners, stuffed animals, or wedges</li>\n          <li><strong>Room-sharing</strong> (baby in the same room but not the same bed) for at least the first 6 months reduces SIDS risk by up to 50% — this is strongly recommended</li>\n          <li>Keep the sleep area smoke-free — exposure to tobacco smoke significantly increases risk</li>\n          <li><strong>Pacifier at sleep time</strong> reduces SIDS risk — offer after breastfeeding is established (~3–4 weeks)</li>\n          <li>Keep baby comfortably cool — overheating is a risk factor</li>\n        </ul>\n        <div class=\"callout gold\">\n          <div class=\"callout-title\">Tummy Time (Awake &amp; Supervised Only)</div>\n          <p>Tummy time while baby is awake and watched is essential for neck and shoulder development and preventing flat spots on the head. Start with 2–3 minutes several times a day from birth. Build to 30 total minutes per day by 3 months.</p>\n        </div>\n        <p>Never place a sleeping baby in a swing, car seat (outside the car), bouncy seat, or inclined sleeper for extended sleep — these are not safe sleep environments.</p>"
  }
}
```

Write the translated JSON object — same 6 card ids, each with
title/sub/body — to:
translation/out/zom.content.4.json
