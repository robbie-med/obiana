// ═══════════════════════════════════════
// LOCALE: en — English (source of truth)
// ═══════════════════════════════════════
// FALLBACK layer: every other locale falls back to these keys, so nothing
// here may be removed without updating every locale.
//
// `content` is keyed by card id and matches CONTENT_STRUCTURE in content.js.
// Icons/colors live in content.js (single-sourced); only prose lives here.
// `epds` is a validated instrument — see the note in tools.js before editing.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.en = {
  "reviewed": true,
  "ui": {
    "section": {
      "pregnancy": "Prenatal",
      "labor": "Labor & Delivery",
      "recovery": "Recovery",
      "baby": "Newborn",
      "faq": "FAQ"
    },
    "faq": {
      "badgeMyth": "Myth",
      "badgeFaq": "FAQ",
      "section5": "Section 5",
      "faqCommonMyths": "FAQ &amp;<br>Common Myths",
      "evidenceBasedAnswersToThe": "Evidence-based answers to the most common questions — including things you've heard from family, friends, and the internet."
    },
    "search": {
      "noResultsTitle": "No results found",
      "noResultsHint": "Try different keywords — like \"epidural\", \"cord care\", or \"bleeding\"",
      "resultCount": {
        "one": "{count} result for “{q}”",
        "other": "{count} results for “{q}”"
      }
    },
    "myinfo": {
      "namePlaceholder": "Name",
      "phonePlaceholder": "Phone number",
      "call": "Call",
      "text": "Text",
      "contact": {
        "familydoc": "Family Doctor",
        "ob": "OB / Midwife",
        "peds": "Pediatrician",
        "mfm": "MFM Specialist",
        "lactation": "Lactation Consultant",
        "ld": "Hospital / L&D Triage",
        "pharmacy": "Pharmacy"
      },
      "detail": {
        "edd": {
          "label": "Due Date (EDD)",
          "placeholder": "e.g. July 15, 2026"
        },
        "bloodtype": {
          "label": "Blood Type & Rh Factor",
          "placeholder": "e.g. O positive"
        },
        "gbs": {
          "label": "GBS Status",
          "placeholder": "Positive / Negative / Not yet tested"
        },
        "allergies": {
          "label": "Medication Allergies",
          "placeholder": "e.g. Penicillin"
        },
        "insurance": {
          "label": "Insurance / Member ID",
          "placeholder": "For quick reference at hospital"
        }
      },
      "myInformation": "My Information",
      "myCareTeamKeyDetails": "My Care Team &amp;<br>Key Details",
      "savedOnYourPhoneTap": "Saved on your phone · Tap to call or text",
      "careTeamContacts": "Care Team Contacts",
      "myPregnancyDetails": "My Pregnancy Details",
      "questionsForMyDoctor": "Questions for My Doctor",
      "saveMyInformation": "Save My Information",
      "exportData": "Export Data"
    },
    "toast": {
      "contactsSaved": "Contacts saved to your phone",
      "appInstalled": "App installed! Open from your home screen anytime",
      "dataExported": "Data exported!",
      "appUpdated": "App updated — reload for latest version"
    },
    "tool": {
      "mood": {
        "unavailableTitle": "Mood check-in not available in this language",
        "unavailableBody": "This questionnaire is a validated screening tool. Its scoring is only meaningful in a language it has been officially validated in.",
        "availableIn": "Currently available in: {langs}. Please ask your care team about a validated version in your language.",
        "switchToEnglish": "Switch to English",
        "qCounter": "Question {n} of {total}",
        "answerAll": "Please answer all {total} questions",
        "interpLow": "Low concern",
        "interpConcern": "Worth discussing with your doctor",
        "interpHigh": "Please contact your doctor",
        "edinburghPostnatalDepressionScale": "Edinburgh Postnatal Depression Scale",
        "inThePast7Days": "in the past 7 days",
        "yourAnswersAreSavedOnly": "Your answers are saved only on this phone.",
        "getMyScore": "Get My Score",
        "chooseLanguage": "Choose the language you would like to answer in:",
        "validatedOnlyNote": "Only officially validated versions of this questionnaire are offered. A machine translation would still produce a score, but that score would not be meaningful.",
        "instrumentLanguage": "Questionnaire language:",
        "change": "Change",
        "scoreNote": "Score out of {max} · {instrument} · A screening tool, not a diagnosis — always discuss the result with your care team",
        "pastCheckIns": "Past Check-Ins",
        "selfHarmGuidance": "You answered that thoughts of self-harm have occurred to you. Please reach out to your doctor, call or text 988 (Suicide & Crisis Lifeline), or go to the nearest emergency room.",
        "continueWeekly": "Continue checking in weekly. If your mood changes, this tool will help you track it.",
        "talkToDoctor": "Talking to your doctor — even about a screening score — is always a good step. PPD is very treatable."
      },
      "birthplan": {
        "q": {
          "epidural": {
            "label": "Pain relief preference",
            "opt": {
              "epidural": "Yes — epidural",
              "none": "No medication",
              "open": "Keep options open",
              "iv": "IV medication only"
            }
          },
          "mobility": {
            "label": "Movement during labor",
            "opt": {
              "walk": "Want to walk/move",
              "bed": "Prefer to stay in bed",
              "wireless": "Wireless monitor if available"
            }
          },
          "delayed-cord": {
            "label": "Delayed cord clamping (30–60 sec)",
            "opt": {
              "yes": "Yes please",
              "nopref": "No preference",
              "discuss": "Discuss with team"
            }
          },
          "skin-to-skin": {
            "label": "Immediate skin-to-skin after birth",
            "opt": {
              "top": "Yes — top priority",
              "ifposs": "Yes if possible",
              "nopref": "No preference"
            }
          },
          "pushing": {
            "label": "Pushing position",
            "opt": {
              "nurse": "Guided by nurse",
              "positions": "Want to try different positions",
              "squat": "Squatting/standing"
            }
          },
          "episiotomy": {
            "label": "Episiotomy",
            "opt": {
              "avoid": "Avoid unless necessary",
              "trust": "Trust the team’s judgment",
              "nopref": "No preference"
            }
          },
          "cord-cut": {
            "label": "Who cuts the cord",
            "opt": {
              "support": "Support person",
              "team": "Care team",
              "nopref": "No preference"
            }
          },
          "photos": {
            "label": "Photography during delivery",
            "opt": {
              "yes": "Yes please",
              "none": "No photos during delivery",
              "after": "Photos after delivery only"
            }
          },
          "visitors": {
            "label": "Visitors during labor",
            "opt": {
              "supportonly": "Support person only",
              "family": "Close family welcome",
              "none": "No visitors"
            }
          },
          "breastfeed": {
            "label": "Feeding plan",
            "opt": {
              "exclusive": "Breastfeed exclusively",
              "supplement": "Breastfeed + supplement",
              "formula": "Formula only",
              "unsure": "Not sure yet"
            }
          },
          "csection": {
            "label": "If C-section needed",
            "opt": {
              "lowscreen": "Low screen (see baby)",
              "supportor": "Support person in OR",
              "skinor": "Skin-to-skin in OR if possible",
              "standard": "Standard practice is fine"
            }
          },
          "music": {
            "label": "Atmosphere",
            "opt": {
              "playlist": "Music / own playlist",
              "quiet": "Quiet environment",
              "nopref": "No preference"
            }
          }
        },
        "additionalNotesComments": "Additional notes / comments",
        "copyToShare": "Copy to Share",
        "printPdf": "Print / PDF",
        "additionalNotes": "Additional notes:",
        "myBirthPreferences": "My Birth Preferences",
        "pregnancyBirthGuideEvidenceBased": "Pregnancy &amp; Birth Guide · Evidence-based · Private &amp; offline",
        "anyOtherPreferencesConcernsOr": "Any other preferences, concerns, or information for your care team…",
        "copiedToClipboard": "Copied to clipboard!",
        "copyNotSupportedOnThis": "Copy not supported on this browser",
        "selectPreferences": "Select your preferences below. Your summary will appear at the bottom — you can share it with your care team."
      },
      "kick": {
        "startSession": "Start Session",
        "movementsThisSession": "movements this session",
        "elapsed": "Elapsed:",
        "20000Limit": "2:00:00 limit",
        "lessThan10MovementsIn": "⚠ Less than 10 movements in 2 hours",
        "thisMayNeedAttentionCall": "This may need attention — call your doctor.",
        "10MovementsReached": "10 movements reached!",
        "startAnotherSession": "Start Another Session",
        "sessionHistory": "Session History",
        "noSessions": "No sessions yet",
        "countMovements": "Count fetal movements during an active session.",
        "goal": "Goal: 10 movements within 2 hours",
        "tapForEach": "👶 Tap for Each Movement",
        "endEarly": "End Session Early",
        "pass": "Pass",
        "low": "Low"
      },
      "common": {
        "recentContractions": "Recent Contractions",
        "timeToGoToThe": "🚨 Time to go to the hospital",
        "511PatternReached": "5-1-1 Pattern Reached"
      },
      "feed": {
        "feedsInLast24Hrs": "Feeds in last 24 hrs",
        "lastFeed": "Last feed",
        "logAFeeding": "+ Log a Feeding",
        "feedLog": "Feed Log",
        "feedLogged": "Feed logged",
        "noFeeds": "No feeds logged yet.",
        "fewFeedsTitle": "⚠ Fewer than 8 feeds today",
        "fewFeedsBody": "Newborns typically need 8–12 feedings per 24 hours. If baby is difficult to wake or not gaining weight, call your doctor.",
        "breast": "🤱 Breast",
        "bottle": "🍼 Bottle",
        "minutes": "{n} min"
      },
      "diaper": {
        "wetToday": "Wet Today",
        "dirtyToday": "Dirty Today",
        "bothWetDirty": "+ Both (wet &amp; dirty)",
        "whatToExpectByAge": "What to expect by age",
        "day1212": "Day 1–2: 1–2 wet diapers · Day 3–4: 3–4 wet · Day 5+: 6+ wet, 3–4 dirty per day. Fewer than 6 wet diapers after day 5 → call your doctor.",
        "todaySLog": "Today's Log",
        "noDiapers": "No diapers logged today."
      },
      "jaundice": {
        "babySBirthDate": "Baby's Birth Date",
        "set": "Set",
        "birthDateSaved": "Birth date saved",
        "dayOfLife": "Day of Life",
        "resolvesByNow": "Most jaundice resolves by now",
        "callImmediatelyIf": "Call your doctor immediately if",
        "setBirthDateHint": "Set baby's birth date above to see day-by-day guidance.",
        "day1": "First day — bilirubin is being checked before hospital discharge. Baby is monitored by the nursing staff.",
        "day2": "Bilirubin levels are rising. Hospital checks before discharge. Watch for yellowing of skin and whites of eyes.",
        "day3": "Jaundice peaks around days 3–5 in most babies. Yellow color may be more visible. Feeding frequently (8–12 times/day) helps the body clear bilirubin.",
        "day4": "Peak jaundice period. Make sure baby is feeding well and having wet diapers. Pediatrician visit may be scheduled around now.",
        "day5": "Pediatrician visit: weight check + bilirubin level. Levels should start to level off. If baby is sleepy and not feeding, call your doctor.",
        "day6": "Levels should start declining in full-term babies. Continue feeding frequently. If skin is deeply yellow or baby won't wake to feed — call your doctor.",
        "day7": "Most term babies' jaundice is improving by now. Watch for yellowing spreading to legs and feet, which signals higher levels.",
        "day10": "In most term babies, jaundice is nearly resolved. If it's persisting or worsening, your doctor will want to check a bilirubin level.",
        "day14": "2-week visit. Jaundice should be resolved in term babies. Persistent jaundice beyond 2 weeks may need further evaluation — tell your doctor.",
        "day21": "Jaundice lasting beyond 3 weeks is considered prolonged and should be evaluated. Breastfed babies can have mild jaundice longer, but it still needs to be checked.",
        "dayWatch": "Day {day} — What to watch for",
        "redFlags": "Baby won't wake to feed · Deeply yellow skin spreading to legs · Arching back or high-pitched cry · White or grey stools · Very dark urine"
      },
      "bp": {
        "logBloodPressure": "+ Log Blood Pressure",
        "whenToCallYourDoctor": "When to call your doctor",
        "anyReading14090During": "Any reading ≥ 140/90 during pregnancy or postpartum. ≥ 160/110 is a medical emergency — call L&D or 911.",
        "readings": "Readings",
        "enterValidNumbersEG": "Enter valid numbers (e.g. 118 / 76)",
        "highReadingContactYourDoctor": "High reading — contact your doctor",
        "noReadings": "No readings logged yet.",
        "highOnRecord": "⚠ High reading on record",
        "cat": {
          "severe": "Severely High",
          "high": "High",
          "elevated": "Elevated",
          "normal": "Normal"
        },
        "recentSummary": "Your most recent reading ({reading}) is in the {cat} range. Contact your doctor today."
      },
      "weight": {
        "yourProfile": "Your Profile",
        "prePregnancyWeightLbs": "Pre-pregnancy weight (lbs)",
        "prePregnancyBmi": "Pre-pregnancy BMI",
        "saveProfile": "Save Profile",
        "logWeight": "+ Log Weight",
        "weightLog": "Weight Log",
        "profileSaved": "Profile saved",
        "enterValidWeightAndPregnancy": "Enter valid weight and pregnancy week",
        "noWeights": "No weights logged yet.",
        "recommendedGain": "Recommended total gain:",
        "forFullPregnancy": "for the full pregnancy.",
        "setYourProfile": "Set your profile",
        "setProfileHint": "Enter your pre-pregnancy BMI to see personalized IOM gain guidelines.",
        "bmi": {
          "under": "Underweight",
          "normal": "Normal weight",
          "over": "Overweight",
          "obese": "Obese"
        },
        "iomFor": "IOM guideline for you ({range})"
      },
      "appts": {
        "addVisit": "+ Add Visit",
        "questionsToAsk": "Questions to ask",
        "noneAdded": "None added",
        "notesFromVisit": "Notes from visit",
        "edit": "Edit",
        "delete": "Delete",
        "visitDeleted": "Visit deleted",
        "noVisits": "No visits logged yet. Add one above to track questions and notes.",
        "deleteConfirm": "Delete this visit?"
      },
      "cx": {
        "noContractions": "No contractions recorded yet.<br>Tap \"Contraction Starting\" when one begins.",
        "noContraction": "No contraction in progress",
        "inProgress": "Contraction in progress…",
        "startBtn": "Contraction Starting",
        "endBtn": "Contraction Ending",
        "clearAll": "Clear all",
        "clearConfirm": "Clear all contraction records?",
        "duration": "{d} long",
        "interval": "every {t}"
      },
      "i18n": {
        "intro": "Compare every phrase in this app against the English original. If something reads wrong, type a better version. Your suggestions stay on this phone until you export them.",
        "searchPlaceholder": "Search phrases…",
        "needsWork": "Needs work",
        "all": "All",
        "suggested": "Suggested",
        "suggestPlaceholder": "Suggest a better wording…",
        "nothingToShow": "Nothing to show with these filters.",
        "showingFirst": "Showing the first {n} of {total}. Use search to narrow it down.",
        "export": "Export my suggestions",
        "clear": "Clear",
        "clearConfirm": "Delete all your suggestions for this language?",
        "nothingToExport": "No suggestions to export yet",
        "exported": "Exported {n} suggestions"
      }
    },
    "theme": {
      "toggle": "Toggle dark mode"
    },
    "lang": {
      "label": "Language",
      "change": "Change language",
      "unreviewedNotice": "This translation is machine-generated and has not yet been reviewed by a clinician. For medical decisions, please confirm with your care team or switch to English.",
      "loadFailed": "Could not load",
      "inProgress": "Translation in progress"
    },
    "app": {
      "title": "Pregnancy Handbook",
      "tagline": "",
      "description": "Evidence-based pregnancy, labor, delivery & postpartum guide. Works offline.",
      "home": "Home",
      "prenatal": "Prenatal",
      "labor": "Labor",
      "recovery": "Recovery",
      "baby": "Baby",
      "faq": "FAQ",
      "tools": "Tools",
      "offlineBanner": "⚠ You're offline — all content still available",
      "searchPlaceholder": "Search all topics…"
    },
    "home": {
      "myInfoContacts": "My Info &amp;<br>Contacts",
      "saveYourCareTeamContacts": "Save Your Care Team Contacts",
      "tapToCallOrText": "Tap to call or text directly from the app",
      "callYourDoctorIf": "Call Your Doctor If…",
      "duringPregnancy": "During Pregnancy",
      "vaginalBleeding": "Vaginal bleeding",
      "fluidGushingOrTrickling": "Fluid gushing or trickling",
      "babyNotMovingNormally": "Baby not moving normally",
      "severeHeadache": "Severe headache",
      "visionChanges": "Vision changes",
      "suddenSwellingOfFaceHands": "Sudden swelling of face/hands",
      "fever1004F": "Fever &gt;100.4°F",
      "contractionsBefore37Weeks": "Contractions before 37 weeks",
      "afterDelivery": "After Delivery",
      "soaking1PadHr2": "Soaking &gt;1 pad/hr × 2 hrs",
      "woundOpensOrOozes": "Wound opens or oozes",
      "legRednessSwelling": "Leg redness/swelling",
      "chestPainOrTroubleBreathing": "Chest pain or trouble breathing",
      "thoughtsOfSelfHarm": "Thoughts of self-harm",
      "heroTitle": "Know what to<br>expect. Ask great<br>questions.",
      "heroDesc": "From your first prenatal visit through delivery and recovery, Obiana keeps everything in one place."
    },
    "pregnancy": {
      "section1": "Section 1",
      "prenatalVisitsPregnancy": "Prenatal Visits<br>&amp; Pregnancy",
      "aVisitByVisitGuide": "A visit-by-visit guide, cervical exams explained, exercise during pregnancy, and what to ask at each stage."
    },
    "labor": {
      "section2": "Section 2",
      "laborDelivery": "Labor &amp;<br>Delivery",
      "signsOfLaborWhatHappens": "Signs of labor, what happens when you arrive, pain management options, C-section, and high-risk care."
    },
    "recovery": {
      "section3": "Section 3",
      "postpartumRecovery": "Postpartum<br>Recovery",
      "physicalHealingMoodAndPpd": "Physical healing, mood and PPD, pelvic rest, returning to exercise, and when to go home."
    },
    "baby": {
      "section4": "Section 4",
      "yourNewborn": "Your<br>Newborn",
      "breastfeedingFormulaCordCareSafe": "Breastfeeding, formula, cord care, safe sleep, normal newborn appearance, and follow-up appointments."
    },
    "tools": {
      "dailyTools": "Daily Tools",
      "trackersPlanners": "Trackers &amp;<br>Planners",
      "timeContractionsCountKicksLog": "Time contractions, count kicks, log feedings and diapers, track blood pressure, plan your birth, and more.",
      "labor": "Labor",
      "kickCounter": "Kick Counter",
      "10MovesIn2Hours": "10 moves in 2 hours — log sessions &amp; history",
      "contractionTimer": "Contraction Timer",
      "tapStartStop51": "Tap start/stop · 5-1-1 alert · When to go in",
      "newbornPostpartum": "Newborn &amp; Postpartum",
      "feedingLog": "Feeding Log",
      "breastOrBottle24Hr": "Breast or bottle · 24-hr count · Alerts if low",
      "diaperLog": "Diaper Log",
      "wetDirtyCountDailyTotals": "Wet &amp; dirty count · Daily totals for the doctor",
      "jaundiceTracker": "Jaundice Tracker",
      "dayByDayGuidanceFrom": "Day-by-day guidance from birth",
      "moodCheckIn": "Mood Check-In",
      "epdsScreenWeeklyTrackingFlags": "EPDS screen · Weekly tracking · Flags concerns",
      "pregnancyMonitoring": "Pregnancy Monitoring",
      "bloodPressure": "Blood Pressure",
      "logReadingsFlags14090": "Log readings · Flags ≥ 140/90 automatically",
      "weightTracker": "Weight Tracker",
      "logByWeekIomGain": "Log by week · IOM gain guidelines for your BMI",
      "planning": "Planning",
      "birthPlanBuilder": "Birth Plan Builder",
      "guidedChoicesShareableOnePage": "Guided choices · Shareable one-page summary",
      "visitNotes": "Visit Notes",
      "questionsBeforeNotesDuringEvery": "Questions before · Notes during every visit",
      "translationHelper": "Translation Helper",
      "reviewSuggestWording": "Review wording · Suggest a better translation"
    },
    "toolkick": {
      "kickCounter": "Kick Counter"
    },
    "toolcontractions": {
      "contractionTimer": "Contraction Timer"
    },
    "toolfeeding": {
      "feedingLog": "Feeding Log"
    },
    "tooldiapers": {
      "diaperLog": "Diaper Log"
    },
    "tooljaundice": {
      "jaundiceTracker": "Jaundice Tracker"
    },
    "toolbp": {
      "bloodPressureLog": "Blood Pressure Log"
    },
    "toolweight": {
      "weightTracker": "Weight Tracker"
    },
    "toolmood": {
      "moodCheckIn": "Mood Check-In"
    },
    "toolbirthplan": {
      "birthPlanBuilder": "Birth Plan Builder"
    },
    "toolappts": {
      "visitNotes": "Visit Notes"
    },
    "modalFeed": {
      "logAFeeding": "Log a Feeding",
      "type": "Type",
      "breast": "🤱 Breast",
      "bottle": "🍼 Bottle",
      "side": "Side",
      "left": "Left",
      "right": "Right",
      "both": "Both",
      "durationMinutes": "Duration (minutes)",
      "amountOz": "Amount (oz)",
      "saveFeed": "Save Feed"
    },
    "modalBp": {
      "logBloodPressure": "Log Blood Pressure",
      "systolicTop": "Systolic (top #)",
      "diastolicBottom": "Diastolic (bottom #)",
      "normalRange": "Normal range",
      "below12080IsNormal": "Below 120/80 is normal. ≥ 140/90 during pregnancy needs same-day attention.",
      "saveReading": "Save Reading"
    },
    "modalWeight": {
      "logWeight": "Log Weight",
      "weightLbs": "Weight (lbs)",
      "weekOfPregnancy": "Week of pregnancy",
      "save": "Save"
    },
    "modalAppt": {
      "addVisit": "Add Visit",
      "visitType": "Visit Type",
      "date": "Date",
      "questionsToAskBeforehand": "Questions to ask beforehand",
      "notesFromVisit": "Notes from visit",
      "saveVisit": "Save Visit"
    },
    "apptType": {
      "selectType": "Select type…",
      "obRoutine": "OB – Routine",
      "obTriage": "OB – L&amp;D Triage / Unscheduled",
      "mfmConsult": "MFM Consultation",
      "mfmFollowup": "MFM Follow-up",
      "endo": "Endocrinology",
      "cardio": "Cardiology",
      "nephro": "Nephrology",
      "ultrasound": "Ultrasound",
      "nst": "Non-Stress Test (NST)",
      "lactation": "Lactation Consult",
      "pp2wk": "Postpartum – 2 weeks",
      "pp6wk": "Postpartum – 6 weeks",
      "peds25d": "Pediatrician – 2–5 days",
      "peds2wk": "Pediatrician – 2 weeks",
      "peds2mo": "Pediatrician – 2 months",
      "family": "Family Doctor",
      "other": "Other"
    },
    "install": {
      "addToPhone": "Add to Phone"
    },
    "common": {
      "toolsBack": "Tools"
    },
    "nav": {
      "prenatal": "Prenatal<br>Visits",
      "labor": "Labor &amp;<br>Delivery",
      "recovery": "Postpartum<br>Recovery",
      "baby": "Your<br>Newborn",
      "toolsTrackers": "Tools &amp;<br>Trackers"
    },
    "tooli18n": {
      "translationHelper": "Translation Helper"
    }
  },
  "content": {
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
    },
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
    },
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
    },
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
    },
    "followup-appts": {
      "title": "Follow-Up Appointments for Baby & You",
      "sub": "The schedule and what happens at each visit",
      "body": "\n        <p class=\"lead navy\">Before you leave the hospital, confirm these appointments are scheduled. Don't leave without them.</p>\n        <h4>For Baby (Pediatrician)</h4>\n        <table class=\"data-table\">\n          <tr><th class=\"navy\">When</th><th class=\"navy\">Purpose</th></tr>\n          <tr><td><strong>2–5 days old</strong></td><td>Weight check — critical to confirm birth weight is being regained. Jaundice assessment. Feeding evaluation. Newborn screening follow-up.</td></tr>\n          <tr><td><strong>2 weeks</strong></td><td>Weight back to birth weight? Development and feeding check. Cord stump check.</td></tr>\n          <tr><td><strong>2 months</strong></td><td>First vaccines, growth and development milestones</td></tr>\n          <tr><td><strong>4, 6, 9, 12 months</strong></td><td>Growth, development, vaccines (schedule continues through childhood)</td></tr>\n        </table>\n        <h4>For You (OB/Midwife)</h4>\n        <table class=\"data-table\">\n          <tr><th class=\"navy\">When</th><th class=\"navy\">Purpose</th></tr>\n          <tr><td><strong>1–3 days</strong> (C-section or complications)</td><td>Wound check, BP management, pain</td></tr>\n          <tr><td><strong>2 weeks</strong></td><td>Mood screening, BP, wound/perineum, breastfeeding support</td></tr>\n          <tr><td><strong>6 weeks</strong></td><td>Full physical, pelvic exam, contraception discussion, exercise clearance</td></tr>\n        </table>\n        <div class=\"callout navy\">\n          <div class=\"callout-title\">Questions to Ask Before Leaving the Hospital</div>\n          <p>Who do I call if I have a question before my first appointment? · Is baby feeding well — how will I know if not? · What's my threshold for calling the pediatrician? · Were any tests abnormal that need follow-up? · Do I need to wake baby to feed at night? · What are my wound care instructions?</p>\n        </div>"
    },
    "faq-deli": {
      "title": "Can I eat deli meat and soft cheese?",
      "sub": "",
      "body": "<p>The main risk is <em>Listeria</em>, a bacterial infection that's rare but can be serious in pregnancy (can cross the placenta). The FDA advises avoiding unpasteurized cheese and deli meats unless heated to steaming (165°F). Most pasteurized soft cheeses (like pasteurized brie, feta from a package) are safe. The overall risk from occasional deli meat is very low — this guidance is precautionary, not a guarantee of illness from a turkey sandwich. When in doubt, heat it.</p>"
    },
    "faq-coffee": {
      "title": "Can I have any caffeine?",
      "sub": "",
      "body": "<p>Yes. ACOG recommends limiting caffeine to <strong>less than 200 mg per day</strong> (approximately one 12-oz cup of drip coffee). At that level, evidence of harm to the pregnancy is not established. Tea, soda, and chocolate also contain caffeine — count them all together. Cutting back is reasonable; cutting it out entirely is a personal choice, not medically required.</p>"
    },
    "faq-hair-dye": {
      "title": "Can I dye my hair while pregnant?",
      "sub": "",
      "body": "<p>Yes. Hair dye is absorbed through the scalp in very small amounts. No published studies have shown harm to the fetus at the amounts involved in normal salon or home hair coloring. Most doctors consider it safe, especially after the first trimester. Highlights (foil) have even less scalp contact. If you're concerned, wait until the second trimester when major organ development is complete.</p>"
    },
    "faq-exercise-mc": {
      "title": "Does exercise cause miscarriage?",
      "sub": "",
      "body": "<p>No. Moderate exercise does not cause miscarriage in healthy pregnancies. This is one of the most pervasive myths in pregnancy. Early miscarriages are almost always caused by chromosomal abnormalities in the embryo — not by exercise, sex, stress, or anything the mother did. Exercise is protective, not harmful. See the exercise guidelines in the Prenatal section.</p>"
    },
    "faq-sex-pregnancy": {
      "title": "Is it safe to have sex during pregnancy?",
      "sub": "",
      "body": "<p>Yes, in a normal pregnancy without complications. Sex does not cause miscarriage, early labor, or harm the baby (who is cushioned by amniotic fluid). Your doctor will recommend pelvic rest (no intercourse) only if you have specific situations: placenta previa, preterm labor risk, unexplained vaginal bleeding, certain cervical conditions, or after your water has broken. If you're not sure, ask at your next visit.</p>"
    },
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
    },
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
    },
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
};
