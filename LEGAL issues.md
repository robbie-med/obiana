# LEGAL ISSUES — Obiana: Pregnancy Handbook

Audit date: 2026-08-16. Scope: all user-facing language (`i18n/locale.*.js`, source of truth = English) and all functions (`tools.js`, `content.js`, `worker/index.js`, `sw.js`). US law. This is a risk audit by a non-lawyer; get a health-regulatory attorney to confirm before relying on it.

---

## 1. Bottom line

- **Yes, parts of this app are arguably FDA-regulated medical device functions** ("software as a medical device", FD&C Act §201(h)). The mood screener, contraction timer, and BP log cross from "education" into "patient-specific analysis and recommendation". Enforcement against a free, no-revenue, open-source app is unlikely but legally possible.
- **Zero liability is not achievable.** Anyone can be sued for anything. What is achievable: (a) near-zero *meritorious* exposure, and (b) near-zero *personal* exposure via an entity shield. Section 8 gives the closest thing to bulletproof that exists.
- The single largest fixable gap: **the app shows no "not medical advice" disclaimer to users.** It exists only in `README.md`, `NOTICE.md`, and an HTML comment (`index.html:74`). Disclaimers nobody sees do very little.

## 2. FDA / medical device analysis

Framework: FD&C Act §201(h) (device definition), 21st Century Cures Act §520(o) (software carve-outs), FDA guidances *Policy for Device Software Functions and Mobile Medical Applications* (2022), *Clinical Decision Support Software* (2022), *General Wellness: Low Risk Devices*.

§520(o)(1)(E) exempts software that merely **displays or reproduces** published clinical guidelines and lets the *user* match themselves to the guideline — but only if the recommendation is not patient-specific-processed and (for patients, not clinicians) the output is a general recommendation to consult a professional. Automation of interpretation for a lay user is where exemption fails.

Feature-by-feature:

| Feature | Verdict | Why |
|---|---|---|
| Guide content (education) | Not a device | Pure published information = protected speech; FDA does not regulate books |
| Kick counter | Likely not a device / low risk | Simple logging + guideline display; the app's own text ("Formal counting… has not been shown to reduce stillbirth… A drop in movement is worth a call whatever this counter says", `locale.en.js:253`) is exemplary and should be the model for all tools |
| Feeding / diaper logs | Not a device | Simple data recording |
| Birth plan, visit notes, My Info | Not a device | Organization/record-keeping, §520(o)(1)(A)-style |
| Weight tracker (IOM ranges) | Likely general wellness | Educational ranges, self-reported data |
| Jaundice day guidance | Borderline, probably OK | Day-of-life-based generic guidance, no measurement input, no diagnosis. Keep it that way: never add photo analysis or bilirubin interpretation |
| **Mood screening (EPDS/PHQ-9)** | **Device function; enforcement-discretion candidate** | Administers a validated instrument, computes a score, applies cutoffs, and outputs triage (`interpConcern`/`interpHigh`, `tools.js:1018-1056`). Depression-screening apps are a known FDA category (Class II, 510(k)-cleared products exist). Mitigating: output always routes to a clinician ("Worth discussing with your doctor", "A screening tool, not a diagnosis"), and FDA's MMA guidance exercises enforcement discretion for apps that coach patients to seek care rather than diagnose |
| **Contraction timer + 5-1-1** | **Device function; enforcement-discretion candidate** | Patient-specific computation ending in "🚨 Time to go to the hospital / Call L&D now" (`tools.js:337-373`). This is a patient-specific care-timing recommendation — the textbook thing §520(o) does *not* exempt |
| **BP log with categorization** | **Device function; enforcement-discretion candidate** | Applies 140/90 and 160/110 thresholds to a user's reading and declares "medical emergency. Call L&D or 911" (`tools.js:662-667`, `locale.en.js:322`). Interpreting a measurement against a clinical threshold is diagnosis-adjacent |

Enforcement reality: FDA's stated policy is discretion for low-risk apps that supplement professional care and direct users to it. A free, ad-free, open-source patient-education app with no manufacturer revenue is at the bottom of the enforcement queue. But "unlikely to be pursued" ≠ "not a device". Any 483/warning-letter risk concentrates in the three bolded rows.

**Do not add, ever, without regulatory counsel:** image/sensor analysis (jaundice photos, fetal heart audio), dose calculators, due-date-driven "you should be induced by" advice, symptom-checker triage logic, or any marketing language like "detects", "diagnoses", "monitors", "alerts you to danger".

## 3. Other federal law

- **FTC Act §5**: prohibits unsubstantiated health claims. Current language is clean — no efficacy claims, honest about screening ("not a diagnosis"), honest about kick counting. Keep all store listings, README, and obiana.app marketing equally restrained; FTC polices marketing, not just the app.
- **FTC Health Breach Notification Rule** (16 CFR Part 318): covers non-HIPAA health apps that *collect* identifiable health info. Health data here stays on-device (localStorage), so the app itself is out of scope. The `/api/suggest` and `/api/feedback` endpoints store only hashed IP + country code (`worker/index.js`) — good design; keep it, and never add accounts, analytics, or crash-reporting SDKs, which would pull you into scope.
- **HIPAA**: not applicable — no covered entity or business associate relationship.
- **COPPA**: not directed at children under 13; no action needed.

## 4. State law

- **Washington My Health My Data Act** (and similar NV/CT laws): regulates "consumer health data" collection with a **private right of action**. On-device storage keeps you out. The feedback endpoint's hashed IP + country is almost certainly fine, but add a one-paragraph privacy statement (see §7) — MHMD effectively requires a consumer-health-data privacy policy for anything in scope, and having one moots the argument.
- **Unlicensed practice of medicine**: triggered by *individualized* diagnosis/treatment, not by publishing general information to the public. Every personalization feature (score interpretation, "go now" alerts) is a small step toward that line; every "this is general information, your clinician knows your case" disclaimer is a step back.

## 5. Tort liability (the real exposure)

FDA is a tail risk; a negligence/wrongful-death suit (e.g., missed preeclampsia after a "normal" BP categorization, or a stillbirth after a "pass" kick count) is the live one. Analysis:

- General published health information is strongly protected (First Amendment; no duty to a reader absent a special relationship — the *rest of the internet* defense). Pure guide content is very safe.
- **Interactive, patient-specific outputs weaken that protection** — the same three features as §2.
- Specific drug-dosing content is the highest-severity content risk:
  - `locale.en.js:492` (pyridoxine 10–25 mg dosing), `:512` (doxylamine 12.5 mg, "No more than 50 mg in 24 hours"), `:1108` (scheduled ibuprofen 600 mg + acetaminophen 650 mg alternating), `:1639` (81 mg aspirin recommendation). These match standard guidance, but printed doses in an app a patient follows without a pharmacist are where a bad outcome becomes a lawsuit. The aspirin line is a *treatment recommendation*, not dosing information — the strongest candidate for softening ("your doctor may recommend…").
- Translation risk: 13 of 17 locales are machine-translated or stubs. A mistranslated red-flag list ("call immediately if") is a foreseeable-harm vector. The in-app machine-translation notice (`locale.en.js:552`) is exactly right; verify it is as prominent as the content it covers and present in *every* unreviewed locale.

## 6. Intellectual property

- **EPDS**: reproducible without permission *provided authors, title and source are quoted* (© 1987 RCPsych). Attribution is carried (`epds.attribution`, NOTICE.md). **Condition precedent**: if attribution is ever dropped, use becomes infringing. The `verify.js` guard is good; add an attribution-presence assertion to it.
- **PHQ-9**: free to reproduce. Fine.
- **ACOG/AAP/WHO content**: facts, thresholds, and schedules are not copyrightable, and content is summarized, not copied — fine. Keep prohibiting verbatim lifting from ACOG/AAP patient pages in the contributor pipeline.
- **AGPL-3.0 + CC BY-SA 4.0**: both carry no-warranty/limitation-of-liability clauses — they already work for you. Flag icons and Tabler icons (MIT) properly noticed in NOTICE.md. No issues found.
- Trademark: "Obiana" is unregistered; low risk, low priority. obiana.app domain is the real asset.

## 7. Specific gaps found (fix list)

1. **No in-app medical disclaimer.** The US-care notice (`usNotice`, first run) never says "not medical advice / not a substitute for your clinician / not for emergencies". The only disclaimer is an HTML comment. Fix: add a third screen or extend `usNotice` — one paragraph, "I understand" gate, reshown on content updates.
2. **No privacy policy**, even though the honest policy is one sentence ("everything stays on your phone; feedback sends only your message"). Write it; link it in About.
3. **511 alert has no fallback hedge.** "🚨 Time to go to the hospital" should carry "if in doubt, call L&D anyway — this timer does not know your pregnancy" (the kick counter already models this exact hedge).
4. **Aspirin 81 mg recommendation** (`:1639`) reads as instruction; attribute it to ACOG and frame as "your doctor may prescribe".
5. **BP categorization** should name its source ("per ACOG") and add "home cuffs can read high — a high reading means call, not panic". Keep "call 911 at 160/110" — that direction is protective, not risky.
6. **Mood tool**: already excellent ("screening tool, not a diagnosis", 988 routing on the self-harm item). Add one line: "If you are in crisis now, call/text 988 — don't wait for a score." Consider renaming "Get My Score" → "See my result".
7. **No emergency disclaimer anywhere global.** A persistent footer or About line: "This app is not for emergencies. Call 911 or your L&D triage line."
8. Jaundice/feeding/diaper thresholds: cite the source guideline in-line (one parenthetical) — converts "the app said so" into "the app relayed AAP guidance".

## 8. The closest thing to bulletproof

Layered, in order of importance:

1. **Stay speech, become no more of a device.** Keep every output general-informational and always paired with "call your clinician"; never personalize beyond displaying the user's own numbers; never add sensors, image analysis, or dose math. Frame all marketing as "patient education". This preserves both the First Amendment defense and FDA enforcement discretion.
2. **Conspicuous disclaimers, actually shown.** First-run disclaimer gate (education not advice; not for emergencies; US care only), per-tool hedges as in §7, an About-page disclaimer, and a privacy policy. Log acceptance locally. This converts "they never told me" claims into losers.
3. **An entity between you and the app.** Form an LLC (or nonprofit, e.g. a 501(c)(3) if you want donations/grants) and assign the repo, domain, and Cloudflare account to it. AGPL permits this freely. A claimant then reaches the entity's assets (zero), not your house. This is the single highest-value step for "zero *personal* liability".
4. **Keep the licenses and their warranty disclaimers.** AGPL §15/16 and CC BY-SA §5 already disclaim warranties and limit liability for every fork and copy. Do not relicense to anything weaker.
5. **Keep the data architecture ascetic.** On-device health data, no accounts, no analytics, hashed IPs only. Every privacy statute cited above simply stops applying. This is already done — treat any feature that breaks it as a legal change, not a technical one.
6. **Insurance (optional, cheap at this scale).** A media-liability/tech-E&O policy (~$500–1500/yr) covers defense costs — which, not judgments, are what actually bankrupt people.
7. **Process hygiene.** Content changes reviewed against named guidelines (ACOG/AAP/WHO/CDC/FDA), citations kept in NOTICE.md, git history as your audit trail, validated-instrument discipline (`verify.js`) maintained, clinician review before marking any locale `reviewed: true`.

With 1–4 and 7 done, residual realistic exposure approaches zero: the app is constitutionally protected speech, disclaimed at every surface, inside FDA's discretion zone, owned by a judgment-proof entity, holding no data worth regulating, under licenses that disclaim warranty. A determined plaintiff can still file; they cannot realistically win or collect.

## 9. What NOT to do

- Don't claim FDA compliance, clearance, or "clinically validated" anywhere.
- Don't add a paywall, ads, or a "pro" tier — revenue changes both FTC posture and FDA incentive.
- Don't add telehealth/chat-with-a-nurse features (practice of medicine, all 50 states).
- Don't remove EPDS attribution or machine-translate the instruments.
- Don't incorporate user feedback into clinical content without source verification — `worker/index.js` correctly treats submissions as hostile input; keep the human review step (`review/`) mandatory.
