# Content map

Where every idea in the guide lives. Each topic has one **home** card that holds
the facts and numbers. Other cards name the topic and point to the home.

    topic                     home card            → also mentioned in

Ids are keys in `i18n/locale.en.js` (`content.<id>`, or `ui.tool.<name>` for tools).
Flags: `[clash]` two places disagree · `[twice]` same facts in two places ·
`[gap]` missing, scattered, or not searchable.

Map as of `c4d42f0`, 2026-10-28. Missing-material audit 2026-10-28 (gaps inside
existing cards are listed under their topic; topics with no card are under
"Not written yet"). Update this file when you add, move or merge a card.


## Prenatal care & tests

- Visit schedule            `first-trimester`, `second-trimester`, `third-trimester`
  - `[gap]` third-trimester skips the 28-week bloodwork: blood count, and a repeat syphilis test, which ACOG made universal in 2024 (first visit, third trimester, delivery)
  - `[gap]` third-trimester never explains fetal testing (NST, biophysical profile, growth scans), though tool appts lists NST as a visit type
- First-visit bloodwork     `first-trimester`     → myinfo, faq-vaccines, faq-newborn-procedures
- Rh & RhoGAM               `third-trimester`     → myinfo
- Genetic screening         `first-trimester`     → second-trimester, mfm
- Anatomy scan, placenta    `second-trimester`    → csection, faq-sex-pregnancy, mfm
- Group B strep             `third-trimester`     → what-happens-on-arrival, faq-water-breaking
- Cervical exams, Bishop    `sve`                 → third-trimester, stages-of-labor
- Vaccines                  `faq-vaccines`        → third-trimester `[twice]` Tdap explained in full in both
  - `[gap]` faq-vaccines has no RSV: maternal vaccine at 32–36 weeks in season, or an antibody shot for the baby (nirsevimab or clesrovimab) instead. One or the other, not both.
  - `[gap]` faq-vaccines has no COVID. ACOG recommends it in any trimester (reaffirmed 2026); CDC dropped its pregnancy recommendation in 2025. Readers will hear both, so the card should say whose advice it follows.
- High-risk / MFM           `mfm`
  - `[gap]` filed under Labor & Delivery; referral happens in pregnancy. Move to Prenatal.
- Gestational diabetes      `second-trimester`
  - `[gap]` only the screening test is explained: nothing on diet, sugar checks, insulin or delivery timing after a diagnosis
  - `[gap]` followup-appts omits the glucose test 4–12 weeks after birth, and that the diabetes risk is lifelong
- Induction                 *no home*             `[gap]` split across third-trimester, stages-of-labor, sve, faq-water-breaking

## Staying well in pregnancy

- Vitamins, folic acid      `prenatal-vitamins`
- How much to eat           `faq-eat-for-two`
- Listeria                  `faq-deli`            → fish-mercury
  - `[gap]` faq-deli covers deli meat and cheese only: no cat litter or undercooked meat (toxoplasmosis), raw eggs, unpasteurised milk or juice, sprouts, washing produce
- Fish & mercury            `fish-mercury`
- Caffeine                  `faq-coffee`
- Alcohol                   `alcohol`
- Smoking, cannabis         `tobacco-cannabis`    → safe-sleep
  - `[gap]` tobacco-cannabis stops at cannabis. Opioids are not covered anywhere (see Not written yet).
- Hot tubs, heat            `faq-hot-tub`         → exercise-pregnancy
- Hair dye                  `faq-hair-dye`
- Sex                       `faq-sex-pregnancy`
- Exercise                  `exercise-pregnancy`  → faq-exercise-mc (good model: answer + pointer)
- Kegels                    `postpartum-exercise` → exercise-pregnancy
- Discomforts               `common-discomforts`  → physical-recovery `[twice]` hemorrhoid/constipation advice
  - `[gap]` common-discomforts has no urinary symptoms: burning or urgency (UTI, treat promptly), and fever with back or side pain (kidney infection, go in)
  - `[gap]` common-discomforts misses headache, nosebleeds and bleeding gums, carpal tunnel, varicose veins
- Mental health             `antenatal-mental-health` → tool mood
  - `[gap]` antenatal-mental-health and mood-ppd give no maternal line: National Maternal Mental Health Hotline 1-833-TLC-MAMA (1-833-852-6262), 24/7 call or text, interpreters in 60+ languages
- Nausea, hyperemesis       tool `nausea`
  - `[twice]` prenatal-vitamins repeats the iron-at-night advice
  - `[gap]` not searchable. tobacco-cannabis calls it "a whole section" with no link.
- Weight gain               tool `weight`         `[gap]` IOM ranges only in tools.js, not searchable
- Fetal movement            tool `kick`           `[gap]` the counting caveat is only in the tool

## Warning signs

- Preeclampsia signs        `preeclampsia`
  - `[clash]` headache worded three ways: "won't go away" / "not relieved by Tylenol"
    (signs-of-labor) / "not relieved by ibuprofen/Tylenol" (postpartum-danger)
  - also restated on Home and in common-discomforts
  - `[gap]` preeclampsia never says the risk is lifelong (heart disease, stroke) or that future doctors should be told
- BP thresholds             tool `bp`             `[gap]` 140/90 and 160/110 never appear in the preeclampsia card
- Heavy bleeding            `physical-recovery`   → postpartum-danger, Home
  - `[clash]` csection says "a pad in 1 hour"; the rest say ">1 pad/hr for 2 hours"
- Self-harm                 *no home*
  - `[clash]` 988 (antenatal-mental-health) / doctor, 988 or ER (tool mood) /
    ER or 911 (postpartum-danger) / call your doctor (Home) / no number (mood-ppd)
- Fever 100.4°F             *same wording in 5 places* (Home, csection, postpartum-danger, bf-challenges, normal-newborn)
- Blood clots               `postpartum-danger`   → Home, common-discomforts
- When to go in             `signs-of-labor`      → tool cx (5-1-1)
- Postpartum warning signs  `postpartum-danger`   → Home (leaves out fever)
  - `[gap]` postpartum-danger never says to tell ER staff you gave birth in the last year, the core of CDC's Hear Her campaign
  - `[gap]` postpartum-danger is missing items on the Hear Her list: fainting or dizziness, racing or pounding heart, severe belly pain, severe swelling of hands or face, overwhelming tiredness
  - `[gap]` followup-appts: anyone with high blood pressure in pregnancy needs a BP check within days of going home (ACOG: 3–10 days), not only after a C-section
- Newborn warning signs     `normal-newborn`      `[gap]` Home has no baby list
  - `[gap]` normal-newborn has no green (bilious) or forceful repeated vomiting, low temperature, pauses in breathing, or fewer wet diapers and stools than expected

## Labor & birth

- Signs of labor, 5-1-1     `signs-of-labor`      → what-happens-on-arrival `[twice]` early labor at home
- Triage, hospital bag      `what-happens-on-arrival`  ("This booklet with your contacts" is print-era wording)
- Stages, monitoring        `stages-of-labor`
- Pain options              `pain-management`     → birth plan
  - `[gap]` pain-management has no doula or continuous labor support, which has some of the best evidence of anything in labor (fewer cesareans, less pain medication)
- Epidural & C-section      `epidural`            → faq-epidural-csec `[twice]` near-verbatim
- Vacuum & forceps          *no home*             `[gap]` named as an epidural tradeoff in epidural and faq-epidural-csec but never explained
- Eating in labor           `faq-eat-in-labor`
- Episiotomy                `faq-routine-episiotomy`
  - `[gap]` faq-routine-episiotomy: no perineal massage from about 35 weeks, which lowers the tear rate in first births
- Waters breaking           `faq-water-breaking`
- C-section                 `csection`
  - `[gap]` csection lists breech as a reason but never mentions turning the baby (external cephalic version, offered around 37 weeks)
- VBAC                      `csection`            → faq-vbac `[twice]` 60–80% in both
- Skin-to-skin, cord clamp  `immediate-postpartum` → csection, birth plan

## Recovery

- Bleeding (lochia)         `physical-recovery`
- Pain medicine             `physical-recovery`   → csection, faq-ibuprofen-bf
- Blues, PPD, psychosis     `mood-ppd`            → faq-bonding, tool mood
- Pelvic rest, sex          `pelvic-rest`
- Contraception             `pelvic-rest`         → faq-bf-bc, followup-appts
  - `[clash]` pelvic-rest says both "at your 6-week visit" and "before discharge or at 2 weeks";
    followup-appts lists it at 6 weeks only
  - `[gap]` pelvic-rest never describes the methods or their timing (IUD or implant before discharge; estrogen pills wait several weeks because of clot risk)
  - `[gap]` pelvic-rest: no pregnancy spacing (waiting at least 18 months before the next pregnancy)
- Exercise, pelvic floor    `postpartum-exercise`
- Mother's visit schedule   `followup-appts` (under Newborn, on purpose) → postpartum-danger

## Newborn

- Breastfeeding basics      `breastfeeding`       → tool feed
- Getting enough            `breastfeeding`       → tool diaper, normal-newborn ("day 4–5" vs "day 5")
  - `[gap]` breastfeeding says when birth weight comes back, but not that losing some weight in the first days is normal
- Breastfeeding problems    `bf-challenges`
  - `[gap]` bf-challenges gives fridge and freezer times for milk, but not room temperature (up to 4 hours) or how to thaw
- Formula                   `formula`
  - `[gap]` formula's "Never" list misses plain water before 6 months and honey before 12 months
- Vitamin D                 `vitamin-d-drops`
- Medicines while BF        `faq-ibuprofen-bf`
  - `[gap]` nothing on alcohol, cannabis or nicotine while breastfeeding. faq-ibuprofen-bf covers medicines only.
- Jaundice                  `faq-jaundice`        → normal-newborn, followup-appts
  - `[clash]` tool jaundice has a different red-flag list and never flags the first 24 hours
- Normal newborn            `normal-newborn`
- Cord care                 `cord-care`
- Newborn procedures        `faq-newborn-procedures`  (1,057 chars: a card filed as an FAQ)
  - `[gap]` faq-newborn-procedures misses the hearing screen and the pulse-oximetry heart screen (CCHD)
  - `[gap]` faq-newborn-procedures: in Dec 2025 ACIP moved the hep B birth dose to individual decision for babies of mothers who test negative; AAP still recommends it within 24 hours. The card should name both.
  - `[gap]` RSV protection for the baby (antibody shot, Oct–Mar, if the mother wasn't vaccinated) has no home; faq-newborn-procedures or followup-appts
- First bath                `faq-first-bath`
- Safe sleep                `safe-sleep`
  - `[gap]` safe-sleep never names the most dangerous case, falling asleep holding the baby on a sofa or armchair
  - `[gap]` safe-sleep has nothing on swaddling: stop once baby starts trying to roll, and keep hips loose
- Car seats                 `car-seat`
- Circumcision              `circumcision`
  - `[gap]` circumcision covers the decision only: no aftercare, normal healing, or when to call (bleeding, no wet diaper)
- Baby check-ups            `followup-appts`

## App

- What Obiana is            `ui.about`
- US care only              `ui.usNotice`
- Not medical advice        `ui.disclaimer`
  - `[gap]` disclaimer promises "when this guide gives a number, it says who says so", but most cards don't (5-1-1, 1 in 3 C-sections, 75% epidurals, 1 in 8 PPD, 60% jaundice…)
- Your data                 `ui.about`            → myinfo
- Care team contacts        `ui.myinfo`
  - `[gap]` myinfo has no built-in help lines: Poison Control 1-800-222-1222, maternal mental health 1-833-852-6262, 988, domestic violence 1-800-799-7233

## Not written yet

Ordered by harm if missing. The card in each line is where it belongs or should link from.

Tier 1: a reader could miss something dangerous

- Bleeding & pain in early pregnancy  `[gap]` no card says which bleeding or cramping in the first trimester is urgent, or names ectopic pregnancy (one-sided pain, shoulder pain, fainting). first-trimester only says "mention bleeding".
- Preterm labor signs       `[gap]` Home lists "contractions before 37 weeks" and nothing else: no regular tightening, period-like cramps, low back ache, pelvic pressure or discharge change, and no "go in now"
- Itching late in pregnancy `[gap]` intrahepatic cholestasis (itchy palms and soles, third trimester) needs a blood test and changes delivery timing. common-discomforts never mentions itching.
- Crying & never shaking    `[gap]` normal-newborn lists "inconsolable crying" as a red flag only. Nothing on normal crying peaks, colic, or what to do when you are at your limit (put baby down safely, step away, call someone).
- Safety at home            `[gap]` no intimate-partner-violence content or hotline, though violence rises in pregnancy and homicide is a leading cause of pregnancy-associated death in the US
- Opioids & other drugs     `[gap]` nothing on opioid use: treatment with buprenorphine or methadone is safe and recommended, stopping suddenly is not, and babies may need watching for withdrawal. Belongs beside tobacco-cannabis and alcohol.
- Medicines in pregnancy    `[gap]` first-trimester tells readers to ask what is safe; nothing answers. Acetaminophen (ACOG still calls it the safest pain reliever, despite the 2025 FDA label move), no ibuprofen or other NSAIDs after 20 weeks, cold and allergy remedies, herbal products, and MotherToBaby (1-866-626-6847) for questions.

Tier 2: standard of care, commonly asked

- Miscarriage & pregnancy loss  deferred in ROADMAP. Also stillbirth, and support after loss: every card assumes a healthy outcome.
- Baby born early or in NICU    no content for preterm babies or a NICU stay (about 1 in 10 US births are preterm)
- Induction                     see Prenatal care; needs one card
- Gestational diabetes          see Prenatal care; needs one card
- Travel & car safety       `[gap]` first-trimester lists "travel safety?" as a question with no answer: seat belt below the bump, get checked after any car crash, flying, long-trip clot prevention
- Pumping & going back to work  pumping gets two sentences in bf-challenges. Nothing on returning to work or the federal PUMP Act right to break time and a private space.
- Contraception after birth   `[gap]` pelvic-rest and faq-bf-bc touch it; no card covers methods. When fertility returns (ovulation from about day 25 if not breastfeeding), LAM's three conditions, IUD or implant before leaving hospital, progestin-only vs estrogen methods while breastfeeding, sterilisation and vasectomy, emergency contraception.
- When to get pregnant again   `[gap]` nothing on spacing. Give her the numbers rather than a rule: the 18- and 24-month intervals rest mostly on confounded observational data, the risk is smaller in high-income settings, and over 35 waiting has a cost of its own. Uterine rupture risk after a caesarean with a short interval.
- Pelvic floor, short and long term  `[gap]` postpartum-exercise has Kegels only. Nothing on pelvic floor physiotherapy, leaking urine or wind/stool, prolapse (heaviness, a bulge) now or decades later, how it is treated (PT, pessary, surgery), or that forceps and third/fourth-degree tears raise the risk.
- Hemorrhoids                  `[twice]` mentioned in common-discomforts and physical-recovery, never given their own answer: what helps, and when to be seen (bleeding that won't stop, a hard painful lump).
- Planning a home birth        `[gap]` no card mentions it, though about 50,000 US women a year give birth at home (51,642 in 2021). For a second or later baby, outcomes in integrated systems match hospital with fewer interventions. Cover a licensed midwife, a transfer plan, and who is a good candidate.

Tier 3: nice to have

- Dental care               ticked in ROADMAP, not in the app
- Cord blood banking & donation
- Tongue tie
- Life at home after birth  sleep, accepting help, visitors and hand-washing, partner mental health, postpartum hair shedding
- Infant CPR & choking      suggest a class before the birth
- Twins & multiples         weight gain and visit schedule differ
- Bone health               bone density dips while breastfeeding and recovers after weaning; calcium and vitamin D; the rare pregnancy-associated osteoporosis (sudden back pain); DMPA and bone


## Structural notes

- **Search only indexes guide cards** (`content.js:493`). Everything in tools is invisible to it.
- **Pointers are plain text** ("see the Prenatal section"). A link token in
  `body-templates.js` would make pointing cheaper than repeating.
- **Prenatal mixes visit cards with topic cards.** Put visits first, then topics.
- **FAQ answers over ~600 chars are cards.** faq-vaccines and faq-newborn-procedures.
- **No review date on any card.** Vaccine and medicine advice changed three times in 2025–26; a "last checked" date per card would show which ones are due.


## Rules

1. One home per topic. Numbers and reasons live there.
2. Everywhere else names the topic and points. No restated thresholds.
3. FAQ: verdict, one reason, pointer.
4. Numbers that tell someone to call or go in use identical wording everywhere.
5. Clinical explanation goes in a card, not a tool.
6. New card? Find its topic here first.
