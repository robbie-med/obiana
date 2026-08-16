# Compliance plan — Obiana

Verification of `LEGAL issues.md` and `PROTECT.md` (both by Kimi, 2026-08-16),
plus the app-side work that follows from it. Nothing here changes what any tool
does; every change is language, attribution, or a new disclosure surface.

Not legal advice. I am not a lawyer or a regulatory consultant. What follows is
a reading of FDA's own published guidance against this codebase, with sources,
so the parts that matter can be checked by someone who is.

---

## 1. What the audits got right, wrong, and missed

### Right, and the single highest-value finding

**There is no "not medical advice" disclaimer anywhere a user can see.**
Verified against `locale.en.js`: the only strings matching disclaimer language
are the EPDS self-harm guidance, the BP threshold line, and two contact labels.
The first-run notice (`ui.usNotice`) is about *geography* only. The disclaimer
in `README.md` and the HTML comment at `index.html` are invisible to users.

`PROTECT.md` is also substantially accurate. The Corporate Transparency Act
claim checks out: FinCEN's March 2025 interim rule exempted US-formed entities,
and the **final** rule making that permanent was announced 11 August 2026 and
published 14 August 2026 — four days ago. The cited Treasury URL is correct.

### Wrong: the CDS carve-out was never available

`LEGAL issues.md` §2 frames FD&C Act §520(o)(1)(E) as potentially exempting this
app "for patients, not clinicians" if the output is a general recommendation to
consult a professional. That reading is not available.

FDA's **Clinical Decision Support Software** final guidance (28 September 2022)
narrowed its scope to software intended for **health care professionals only**.
It removed the draft guidance's discussion of patient- and caregiver-directed
CDS entirely, and removed the enforcement-discretion policy that draft had
offered them. Patient-facing decision support is analysed under other policies,
not under the CDS criteria.

This matters because it changes the target. There is no version of this app that
satisfies the §520(o)(1)(E) criteria, so "look more like a CDS exemption" is not
a strategy. The governing document is the **Policy for Device Software Functions
and Mobile Medical Applications** guidance.

### Wrong in the other direction: the risk is overstated

`LEGAL issues.md` bolds three features as device functions at the edge of
enforcement discretion. Read against Appendix B of the MMA guidance — FDA's own
list of software functions it will not pursue — they are not at the edge. The
bullets map almost one to one, and have survived unchanged across the 2015,
2019 and 2022 revisions:

| Obiana feature | Appendix B bullet (verbatim) |
|---|---|
| EPDS/PHQ-9 → "contact your doctor"; 5-1-1 → "call L&D now" | **#8** "Software functions that guide a user through a questionnaire of signs and symptoms to provide a recommendation for the type of health care facility most appropriate to their needs" |
| "Call your doctor if…" red-flag lists | **#7** "Software functions that use a checklist of common signs and symptoms to provide a list of possible medical conditions and advice on when to consult a health care provider" |
| Preeclampsia risk list, aspirin, IOM weight ranges | **#6** "Software functions that use patient characteristics such as age, sex, and behavioral risk factors to provide patient-specific screening, counseling, and preventive recommendations **from well-known and established authorities**" |
| BP log and its history | **#12** "…historical trending and comparison of vital signs (e.g., body temperature, heart rate, **blood pressure**, or respiratory rate)" |
| The guide itself | **#2** "…periodic educational information, reminders, or motivational guidance to smokers trying to quit, patients recovering from addiction, or **pregnant women**" |

Bullet #6 is the important one, and it is why the attribution work below is not
cosmetic. The safe harbour is explicitly for recommendations **from well-known
and established authorities**. An unattributed threshold is the app's own
recommendation. The same threshold labelled "per ACOG" is the app relaying a
recognised authority, which is the thing the bullet describes.

### Missed: the actual bright line is measurement, not personalisation

Neither audit identifies what Appendix C — the software FDA *does* police —
has in common. Nearly every entry is a **sensor or signal-acquisition** app:
camera, microphone, accelerometer, attached electrodes, an ECG lead, a pulse
oximeter attachment, a cuff the software inflates.

Obiana measures nothing. Every number in it was typed in by the user. That is
the strongest single structural fact in its favour, it is worth stating plainly
in the repo, and it converts "don't add sensors" from a vague caution into the
governing rule: **the day this app reads a sensor is the day the analysis
changes.** That includes a jaundice photo, a fetal-heart microphone, a
camera-based pulse, or pairing with a Bluetooth BP cuff.

### Minor

- FDA updated the **General Wellness: Policy for Low Risk Devices** guidance in
  2026. It is less relevant here than the audits imply: general wellness
  excludes disease-specific claims, and depression screening and hypertension
  thresholds are disease-specific. The MMA enforcement-discretion route is the
  applicable one; wellness is not needed.
- `LEGAL issues.md` §5 flags the drug-dosing content. Reasonable. B6 and
  doxylamine read as information; the **aspirin line reads as an instruction**
  and is unattributed — verified: *"With one strong risk factor, or two moderate
  ones, 81 mg daily from 12 to 16 weeks until delivery lowers the risk…"*.

---

## 2. What changes, and what does not

**Nothing is removed and no tool loses a capability.** The 5-1-1 alert still
fires, the EPDS still scores, the BP log still flags 140/90. Those behaviours
are protective, they are what the app is for, and Appendix B covers them.

The work is: say who says so, say what the app is not, and make both visible.

### Phase A — Disclosure surfaces (highest value)

1. **First-run gate.** Extend the existing `usNotice` flow, which already has an
   "I understand" button and a `myob.usNoticeSeen` flag, into two panels: the
   current US-care panel, and a new one covering *education, not medical advice*
   / *not a substitute for your own clinician* / *not for emergencies, call 911*.
   Re-shown when the text changes, by versioning the stored flag
   (`myob.noticeAccepted = <version>`), so a material change is re-acknowledged.
2. **About screen.** Full disclaimer text plus the privacy statement, reachable
   any time rather than only at first run.
3. **Persistent line in the tools section.** One sentence, above the tool grid:
   these tools organise your own information, they do not diagnose.
4. **Per-tool hedges** where the tool ends in a care instruction — contraction
   timer, BP, EPDS, jaundice, kick counter. The kick counter's existing wording
   is the model and already does this well; it is quoted in `LEGAL issues.md`
   for good reason.

### Phase B — Attribution on every clinical threshold

This is the Appendix B #6 move. Every number the app applies to a user gets its
source named inline, in the same string, so it survives translation:

| String | Add |
|---|---|
| BP 140/90 and 160/110 | per ACOG |
| EPDS cutoffs 10/13, PHQ-9 10/15 | the published cutoffs for that instrument |
| 5-1-1 | the common US L&D guideline, and that it does not know your pregnancy |
| Weight ranges | IOM/NASEM (already named — confirm it survives translation) |
| Jaundice day guidance | AAP |
| Aspirin 81 mg | ACOG, and reframed from instruction to "your doctor may recommend" |
| Feeding and diaper expectations | AAP |

Attribution goes in the string, not in a footnote, because a footnote can be
translated away or dropped by a contributor and the string cannot.

### Phase C — Instructional language

Only one true instruction was found. The aspirin sentence becomes a description
of what clinicians recommend and who qualifies, not a dose directed at the
reader. B6, doxylamine, and the ibuprofen/acetaminophen schedule stay: they are
descriptions of standard regimens, already bounded by daily maxima, and removing
them makes the app worse without moving the legal needle.

### Phase D — Privacy statement

One short screen, because the honest version is short: everything stays on the
device; nothing is sent anywhere unless you use the two Submit buttons; those
send only your message plus a salted hash of your IP and a country code; there
are no accounts, no analytics, no third-party SDKs. This is already true in
`worker/index.js` — the statement documents it rather than promising it.

It also moots the Washington My Health My Data question raised in
`LEGAL issues.md` §4 at essentially zero cost.

### Phase E — Guardrails, so this cannot quietly drift

The reason to automate this: everything above is one careless commit from being
undone, and the app now has an in-page editor that makes content edits easy.

1. **`translation/lint-legal.js`**, wired into the same gate as the locale
   linter. Fails if: a disclaimer key is missing from `en`; a known clinical
   threshold string has lost its attribution; a banned marketing verb
   (*diagnose*, *detect*, *monitor*, *screen for*, *alerts you to*) appears in
   user-facing copy.
2. **`REGULATORY.md`** in the repo: the measurement bright line, the never-add
   list, and the reasoning, so a future contributor or a future me does not have
   to re-derive it. Kimi's §9 "what not to do" list is good raw material.
3. The editor's publish step already runs the linters; this joins them.

### Phase F — Translation

New disclaimer strings are English-only at first. The fingerprint mechanism will
show reviewed English in the other 16 languages, which is the safe behaviour,
but a **disclaimer nobody can read is close to no disclaimer** for the audience
this app was built for. So the disclaimer keys are the first thing in the next
translation run, ahead of guide content, and the machine-translation notice must
be visible on the disclaimer panel itself.

---

## 3. Sequencing

A and D first: they are the largest gap and the cheapest work. Then B, which is
the substantive regulatory improvement. Then C, E, F.

None of it depends on the LLC, and the LLC does not depend on any of it.

## 4. Verification

- Every new key resolves in `en` and renders in all 17 locales (existing sweep).
- First-run gate: appears once, re-appears when the version changes, records
  acceptance, and is dismissible only by the button.
- Attribution lint passes, and fails when attribution is deliberately removed
  from a threshold string — tested by removing one.
- Screenshot the disclaimer panel and the About screen in light and dark.
- `node translation/stamp.js report` shows the new keys as the top of the
  retranslation queue.

## 5. Sources

- FDA, *Clinical Decision Support Software*, final guidance, 28 Sep 2022 —
  scope narrowed to HCP-directed software; patient/caregiver CDS removed.
- FDA, *Policy for Device Software Functions and Mobile Medical Applications* —
  Appendix B (enforcement discretion) bullets 2, 6, 7, 8, 12; Appendix C (focus
  of oversight), which is dominated by sensor and signal-acquisition functions.
- FDA, *General Wellness: Policy for Low Risk Devices* (updated 2026).
- FinCEN final rule ending BOI reporting for US entities, announced 11 Aug 2026,
  published 14 Aug 2026.
