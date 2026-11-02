// ═══════════════════════════════════════
// LOCALE: en — English (source of truth)
// ═══════════════════════════════════════
// FALLBACK layer: every other locale falls back to these keys, so nothing
// here may be removed without updating every locale.
//
// `content` is keyed by card id and matches CONTENT_STRUCTURE in app/guide/structure.js.
// Icons/colors live in app/guide/structure.js (single-sourced); only prose lives here.
// The EPDS lives in i18n/epds/, not here: see the note in app/tools/mood.js.

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
      "faqCommonMyths": "FAQ &amp;<br>Common Myths"
    },
    "search": {
      "noResultsTitle": "No results found",
      "noResultsHint": "Try different keywords. Like \"epidural\", \"cord care\", or \"bleeding\"",
      "resultCount": {
        "one": "{count} result for “{q}”",
        "other": "{count} results for “{q}”"
      },
      "label": "Search all topics",
      "clear": "Clear search"
    },
    "myinfo": {
      "namePlaceholder": "Name",
      "phonePlaceholder": "Phone number",
      "call": "Call",
      "text": "Text",
      "contact": {
        "familydoc": "Family Doctor",
        "ob": "Family doctor, OB or midwife",
        "peds": "Baby's doctor",
        "mfm": "MFM Specialist",
        "lactation": "Lactation Consultant",
        "ld": "Hospital / L&D Triage",
        "pharmacy": "Pharmacy"
      },
      "detail": {
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
      "careTeamContacts": "Care Team Contacts",
      "myPregnancyDetails": "My Pregnancy Details",
      "questionsForMyDoctor": "Questions for My Doctor",
      "saveMyInformation": "Save My Information",
      "exportData": "Export Data",
      "saved": "✓ Saved!",
      "notesPlaceholder": "Write questions here as you think of them…",
      "importData": "Import Data",
      "importConfirm": "Restore {n} saved items from this file? Anything currently in the app with the same name will be replaced.",
      "notesLabel": "Questions for your next visit",
      "callContact": "Call {name}",
      "textContact": "Text {name}"
    },
    "toast": {
      "contactsSaved": "Contacts saved to your phone",
      "appInstalled": "App installed! Open from your home screen anytime",
      "dataExported": "Data exported!",
      "appUpdated": "App updated. Reload for latest version",
      "importDone": "Data restored",
      "importFailed": "That file could not be read",
      "importNothing": "No app data found in that file",
      "notSaved": "Could not save on this phone. Is private browsing on?"
    },
    "tool": {
      "mood": {
        "unavailableTitle": "Mood check-in not available in this language",
        "unavailableBody": "This questionnaire is a validated screening tool. Its scoring is only meaningful in a language it has been officially validated in.",
        "qCounter": "Question {n} of {total}",
        "answerAll": "Please answer all {total} questions",
        "interpLow": "Low concern",
        "interpConcern": "Worth discussing with your doctor",
        "interpHigh": "Please contact your doctor",
        "edinburghPostnatalDepressionScale": "Edinburgh Postnatal Depression Scale",
        "yourAnswersAreSavedOnly": "Your answers are saved only on this phone.",
        "getMyScore": "Get My Score",
        "chooseLanguage": "Choose the language you would like to answer in:",
        "validatedOnlyNote": "Only officially validated versions of this questionnaire are offered. A machine translation would still produce a score, but that score would not be meaningful.",
        "instrumentLanguage": "Questionnaire language:",
        "change": "Change",
        "scoreNote": "Score out of {max} on the {instrument}, using the published cutoffs for that questionnaire. It is a screening tool, not a diagnosis. Go through the result with your care team.",
        "pastCheckIns": "Past Check-Ins",
        "selfHarmGuidance": "You answered that thoughts of harming yourself have come to you. If you have them now, call 911 or go to the ER. You can also call or text 988, the Suicide & Crisis Lifeline, any time, and tell your doctor.",
        "continueWeekly": "Check in again next week.",
        "talkToDoctor": "Talking to your doctor, even about a screening score, is always a good step. PPD is very treatable.",
        "important": "Important",
        "phq9Title": "Patient Health Questionnaire (PHQ-9)"
      },
      "birthplan": {
        "q": {
          "epidural": {
            "label": "Pain relief preference",
            "opt": {
              "epidural": "Yes, epidural",
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
              "top": "Yes, top priority",
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
        "pregnancyBirthGuideEvidenceBased": "Made with Obiana, obiana.app",
        "anyOtherPreferencesConcernsOr": "Any other preferences, concerns, or information for your care team…",
        "copiedToClipboard": "Copied to clipboard!",
        "copyNotSupportedOnThis": "Copy not supported on this browser",
        "selectPreferences": "Select your preferences below. Your summary will appear at the bottom. You can share it with your care team.",
        "generatedOn": "Generated {date}",
        "generatedWith": "Made with Obiana, obiana.app"
      },
      "kick": {
        "startSession": "Start Session",
        "movementsThisSession": {
          "one": "movement this session",
          "other": "movements this session"
        },
        "elapsed": "Elapsed:",
        "20000Limit": "2:00:00 limit",
        "lessThan10MovementsIn": "⚠ Less than 10 movements in 2 hours",
        "thisMayNeedAttentionCall": "This may need attention. Call your doctor.",
        "10MovementsReached": "10 movements reached!",
        "startAnotherSession": "Start Another Session",
        "sessionHistory": "Session History",
        "noSessions": "No sessions yet",
        "countMovements": "Counting kicks is optional. It's one way to get to know how your baby usually moves. What matters is noticing a change. If your baby moves less than usual, call that day, whatever this counter says.",
        "goal": "A common guide: 10 movements in 2 hours",
        "tapForEach": "👶 Tap for Each Movement",
        "endEarly": "End Session Early",
        "pass": "Pass",
        "low": "Low"
      },
      "common": {
        "recentContractions": "Recent Contractions",
        "timeToGoToThe": "🚨 Time to go to the hospital",
        "511PatternReached": "5-1-1 Pattern Reached",
        "entryDeleted": "Entry deleted"
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
        "minutes": {
          "one": "{count} min",
          "other": "{count} min"
        },
        "bottleOz": "Bottle, {oz} oz"
      },
      "diaper": {
        "wetToday": "Wet Today",
        "dirtyToday": "Dirty Today",
        "bothWetDirty": "+ Both (wet &amp; dirty)",
        "whatToExpectByAge": "What to expect by age",
        "day1212": "Day 1–2: 1–2 wet diapers · Day 3–4: 3–4 wet · Day 5+: 6+ wet, 3–4 dirty per day. Fewer than 6 wet diapers after day 5 → call your doctor.",
        "todaySLog": "Today's Log",
        "noDiapers": "No diapers logged today.",
        "loggedWet": "Wet diaper logged",
        "loggedDirty": "Dirty diaper logged",
        "loggedGeneric": "Diaper logged",
        "wet": "Wet",
        "dirty": "Dirty",
        "both": "Wet + Dirty"
      },
      "jaundice": {
        "babySBirthDate": "Baby's Birth Date",
        "set": "Set",
        "birthDateSaved": "Birth date saved",
        "dayOfLife": "Day of Life",
        "resolvesByNow": "Most jaundice resolves by now",
        "callImmediatelyIf": "Call your doctor right away if",
        "setBirthDateHint": "Set baby birth date above to see day-by-day guidance, following AAP newborn jaundice guidance.",
        "day1": "First day. Bilirubin is being checked before hospital discharge. Baby is monitored by the nursing staff.",
        "day2": "Bilirubin levels are rising. Hospital checks before discharge. Watch for yellowing of skin and whites of eyes.",
        "day3": "Jaundice peaks around days 3–5 in most babies. Yellow color may be more visible. Feeding frequently (8–12 times/day) helps the body clear bilirubin.",
        "day4": "Peak jaundice period. Make sure baby is feeding well and having wet diapers. Your baby's doctor may want to see the baby around now.",
        "day5": "Visit with your baby's doctor: weight check + bilirubin level. Levels should start to level off. If baby is sleepy and not feeding, call your baby's doctor.",
        "day6": "Levels should start declining in full-term babies. Continue feeding frequently. If skin is deeply yellow or baby won't wake to feed. Call your doctor.",
        "day7": "Most term babies' jaundice is improving by now. Watch for yellowing spreading to legs and feet, which signals higher levels.",
        "day10": "In most term babies, jaundice is nearly resolved. If it's persisting or worsening, your doctor will want to check a bilirubin level.",
        "day14": "2-week visit. Jaundice should be resolved in term babies. Persistent jaundice beyond 2 weeks may need further evaluation. Tell your doctor.",
        "day21": "Jaundice lasting beyond 3 weeks is considered prolonged and should be evaluated. Breastfed babies can have mild jaundice longer, but it still needs to be checked.",
        "dayWatch": "Day {day}. What to watch for",
        "redFlags": "Baby won't wake to feed · Deeply yellow skin spreading to legs · Arching back or high-pitched cry · White or gray stools · Very dark urine"
      },
      "bp": {
        "logBloodPressure": "+ Log Blood Pressure",
        "whenToCallYourDoctor": "When to call your doctor",
        "anyReading14090During": "ACOG counts any reading of 140/90 or higher in pregnancy or after birth as high. 160/110 or higher needs a call to L&D or 911 now. Home cuffs can read high, so one high reading means call and recheck, not panic.",
        "readings": "Readings",
        "enterValidNumbersEG": "Enter valid numbers (e.g. 118 / 76)",
        "highReadingContactYourDoctor": "High reading. Contact your doctor",
        "noReadings": "No readings logged yet.",
        "highOnRecord": "⚠ High reading on record",
        "cat": {
          "severe": "Severely High",
          "high": "High",
          "elevated": "Elevated",
          "normal": "Normal"
        },
        "recentSummary": "Your most recent reading ({reading}) is in the {cat} range. Contact your doctor today.",
        "savedReading": "{reading} saved: {cat}"
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
        "iomFor": "IOM/NASEM guideline for you ({range})",
        "gainedSoFar": "You have gained {amount} lbs so far.",
        "wk": "Wk {n}",
        "lbsValue": "{n} lbs",
        "lbsTotal": "{n} lbs total",
        "savedToast": "{lbs} lbs at week {week} saved"
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
        "untitledVisit": "Untitled visit",
        "editVisit": "Edit Visit",
        "noQuestionsAdded": "No questions added",
        "visitUpdated": "Visit updated",
        "visitAdded": "Visit added"
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
        "interval": "every {t}",
        "alertGo": "Contractions about {mins} min apart, lasting about {secs}s. Call L&D now.",
        "alert511": "About {mins} min apart, about {secs}s long. That is the 5-1-1 pattern most US hospitals use. With a first baby this usually means go in. This timer does not know your pregnancy. Call L&D if you are unsure, if your water breaks, or if you were told to come sooner.",
        "alertProgress": "In the last hour: {n} contractions, about {mins} min apart, each about {secs}s long. Not yet 5-1-1.",
        "reachedIn": "Reached in {time}",
        "contractionEnding": "Contraction Ending"
      },
      "i18n": {
        "intro": "Check Obiana in your language, one sentence at a time. Change what reads wrong, or tap Looks right.",
        "pickLanguage": "Which language will you check?",
        "changeLanguage": "Change language",
        "progress": "{done} of {total} checked",
        "whereTabs": "Menus and Today",
        "whereOther": "Other screens",
        "banner_missing": "No translation yet. Write one, or skip.",
        "banner_draft": "A machine wrote this. Check it carefully.",
        "banner_stale": "The English changed after this was translated. Check it still says the same.",
        "keepTokens": "Keep these exactly as they are. Tap one to add it:",
        "tokensMissing": "Put back {tokens} before you send.",
        "tokensExtra": "Remove {tokens}. The English doesn't have it.",
        "send": "Send",
        "looksRight": "Looks right",
        "skip": "Skip",
        "sent": "Sent. Thank you",
        "savedOffline": "Saved. It will send when you're online.",
        "queued": "{n} waiting to send. They go when you're online.",
        "allDone": "That's every sentence for now. Thank you.",
        "showSkipped": "Go back to the {n} you skipped",
        "privacy": "Only the phrase and your suggestion are sent. Nothing from your trackers ever leaves this phone.",
        "loading": "Loading…",
        "tapToggle": "Tap a sentence to suggest better wording",
        "tapBar": "Tap any underlined sentence to suggest better wording.",
        "tapOff": "Turn off",
        "sheetTitle": "Suggest better wording",
        "cancel": "Cancel"
      },
      "improve": {
        "intro": "Tell us what's missing: how something is done in your culture, a question this guide doesn't answer, or a part that was hard to follow.",
        "notDoctor": "Nobody replies here. For your own care, call your family doctor, OB or midwife.",
        "whatKind": "What would you like to share?",
        "kindCulture": "In my culture we do it differently",
        "kindQuestion": "A question this guide does not answer",
        "kindUnclear": "Something here was confusing",
        "topicLabel": "What part is it about? (optional)",
        "topicPlaceholder": "e.g. Safe sleep, GBS, first bath",
        "messageLabel": "Tell us",
        "messagePlaceholder": "Write as much or as little as you like…",
        "send": "Send",
        "sending": "Sending…",
        "thanks": "Thank you.",
        "writeFirst": "Please write something first",
        "failed": "Could not send. Your text is saved here.",
        "rateLimited": "Too many messages, please try again later",
        "offline": "Offline. Your text is saved here."
      },
      "nausea": {
        "intro": "Nausea is usually worse on an empty stomach, so small amounts often beat big meals. Tap each hour you ate or drank something. The point is not how much, it is how long the gaps are.",
        "clockLabel": "24-hour snack clock",
        "snacksToday": "today",
        "tapHour": "Tap an hour to mark that you ate",
        "hourLabel": "Hour {hour}",
        "longestGap": "Longest gap without eating",
        "gapOk": "{hours} hours. Try to keep gaps under about 3 hours while you are awake.",
        "gapLong": "{hours} hours. Long gaps make nausea worse. Try something small, even a few bites.",
        "whenAreYou": "How far along are you?",
        "weekPrompt": "Enter the week of pregnancy you are in, so this can show you where you are.",
        "weekPlaceholder": "e.g. 9",
        "weekShort": "Week {n}",
        "timelineLabel": "Nausea timeline, you are at week {week}",
        "youAreWeek": "You are at week {week}.",
        "changeWeek": "Change week",
        "phaseEarly": "Nausea often begins around week 6. If it has not started, it may not start at all.",
        "phasePeak": "This is usually the hardest stretch. It tends to peak around weeks 9 to 10 and then ease.",
        "phaseEasing": "For most women it starts easing from here. About 6 in 10 are past it by week 14.",
        "phaseMost": "About 9 in 10 women are past the worst by week 22. If yours is not easing, tell your doctor.",
        "phaseLate": "Nausea this late is less common. It is worth telling your doctor, who can look for other causes.",
        "callTodayTitle": "Call your doctor today if",
        "flag": {
          "noFluids": "You cannot keep any fluids down for a whole day",
          "vomitingOften": "You are vomiting several times a day, every day",
          "weightLoss": "You are losing weight instead of gaining",
          "darkUrine": "Your urine is dark, or you have not passed any for 8 hours",
          "dizzy": "You feel dizzy or faint when you stand up",
          "racingHeart": "Your heart is racing"
        },
        "callTodayBody": "Severe pregnancy sickness has a name, hyperemesis gravidarum, and it is treatable. The real danger is dehydration, not the nausea itself. Do not wait it out.",
        "strat": {
          "empty": {
            "name": "Never let your stomach get empty",
            "how": "Eat something small before you get hungry, and keep crackers by the bed for before you sit up."
          },
          "bland": {
            "name": "Bland, dry, cold food",
            "how": "Cold food smells less. Dry toast, crackers, plain rice, cold fruit."
          },
          "fluids": {
            "name": "Sip fluids between meals",
            "how": "Drinking with food fills you up faster. Sip small amounts all day instead."
          },
          "triggers": {
            "name": "Learn your triggers",
            "how": "Smells are the usual culprit. Cooking, coffee, perfume. Let someone else cook if you can."
          },
          "b6": {
            "name": "Vitamin B6 (pyridoxine)",
            "how": "10 to 25 mg, three or four times a day. No more than 200 mg in 24 hours. Sold over the counter."
          },
          "ginger": {
            "name": "Ginger",
            "how": "Tea, capsules, or chews. Modest evidence, and it helps some women a lot."
          },
          "acupressure": {
            "name": "Wrist pressure",
            "how": "Pressing the P6 point, or a wristband. See the instructions below."
          },
          "vitamin": {
            "name": "Move your prenatal vitamin",
            "how": "Iron is a common culprit. Take it at night, or with food. Ask about a low-iron option."
          },
          "rest": {
            "name": "Rest, and get up slowly",
            "how": "Tiredness makes nausea worse. Sit on the edge of the bed a moment before standing."
          },
          "doxylamine": {
            "name": "Doxylamine, added to B6",
            "how": "12.5 mg at bedtime, which is half a 25 mg Unisom SleepTab. If that is not enough your doctor may add a morning and afternoon dose. No more than 50 mg in 24 hours. Buy SleepTabs, not SleepGels: SleepGels are a different drug. No prescription needed."
          }
        },
        "thingsToTry": "Things to try",
        "tryNext": "Not tried yet: {thing}",
        "triedAll": "You have marked everything as tried. If nothing is helping, that is worth a call.",
        "stratNote": "Tap anything you have tried to keep track. Ask your doctor before starting a supplement or medicine.",
        "howIsItNow": "How is the nausea right now?",
        "level1": "None",
        "level2": "Mild",
        "level3": "Bad",
        "level4": "Severe",
        "didYouTry": "Did you try something? (optional)",
        "logged": "Logged",
        "whatHelpsYou": "What seems to help you",
        "avgAfter": "average {avg}, {n} times",
        "lowerIsBetter": "Lower is better. This is only your own record, not medical proof.",
        "recent": "Recent entries",
        "noEntries": "No entries yet. Log how you feel a few times and this will show what helps you.",
        "acuTitle": "Wrist pressure (the P6 point)",
        "acuIntro": "Evidence is mixed, but it costs nothing, has no side effects, and helps some women. Worth ten minutes to find out.",
        "acuBands": "Elastic wristbands with a plastic stud, sold for travel sickness, press the same point. Wear one on each wrist.",
        "acu": {
          "find": "Turn one hand palm up, fingers relaxed.",
          "measure": "Lay three fingers of your other hand across the wrist, with the finger nearest your hand sitting on the crease where your hand meets your arm.",
          "feel": "The point is just past your third finger, in the middle of the wrist. Press around and you should feel two firm cords running down the arm. The point sits between them.",
          "press": "Press firmly with your thumb, hard enough to feel it but not to hurt. Small circles or steady pressure, for two to three minutes.",
          "both": "Do the same on the other wrist. Repeat whenever the nausea rises."
        },
        "logIntro": "Rate the nausea whenever it changes. After a few entries this will show which of the things you tried actually helped you.",
        "openLog": "Log how you feel now",
        "openHelp": "Things to try for nausea"
      }
    },
    "theme": {
      "toggle": "Toggle dark mode"
    },
    "lang": {
      "label": "Language",
      "change": "Change language",
      "unreviewedNotice": "A machine translated this, and a doctor hasn't checked it yet. If anything is unclear, ask your care team.",
      "loadFailed": "Could not load",
      "inProgress": "Translation in progress"
    },
    "app": {
      "title": "Obiana Pregnancy Handbook",
      "tagline": "",
      "description": "Evidence-based pregnancy, birth and newborn guide in 17 languages. Free, open source, and works offline.",
      "home": "Home",
      "prenatal": "Prenatal",
      "labor": "Labor",
      "recovery": "Recovery",
      "baby": "Baby",
      "faq": "FAQ",
      "tools": "Tools",
      "offlineBanner": "⚠ You're offline. All content still available",
      "searchPlaceholder": "Search all topics…"
    },
    "home": {
      "myInfoContacts": "My Info &amp;<br>Contacts",
      "saveYourCareTeamContacts": "Save Your Care Team Contacts",
      "tapToCallOrText": "Tap to call or text directly from the app",
      "callYourDoctorIf": "Call Your Family Doctor, OB or Midwife If…",
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
      "soaking1PadHr2": "Soaking through 1 pad in an hour",
      "woundOpensOrOozes": "Wound opens or oozes",
      "legRednessSwelling": "Leg redness/swelling",
      "chestPainOrTroubleBreathing": "Chest pain or trouble breathing",
      "thoughtsOfSelfHarm": "Thoughts of self-harm",
      "heroTitle": "Know what to<br>expect. Ask great<br>questions."
    },
    "pregnancy": {
      "section1": "Section 1",
      "prenatalVisitsPregnancy": "Prenatal Visits<br>&amp; Pregnancy"
    },
    "labor": {
      "section2": "Section 2",
      "laborDelivery": "Labor &amp;<br>Delivery"
    },
    "recovery": {
      "section3": "Section 3",
      "postpartumRecovery": "Postpartum<br>Recovery"
    },
    "baby": {
      "section4": "Section 4",
      "yourNewborn": "Your<br>Newborn"
    },
    "tools": {
      "dailyTools": "Daily Tools",
      "trackersPlanners": "Trackers &amp;<br>Planners",
      "labor": "Labor",
      "kickCounter": "Kick Counter",
      "contractionTimer": "Contraction Timer",
      "newbornPostpartum": "Newborn &amp; Postpartum",
      "feedingLog": "Feeding Log",
      "diaperLog": "Diaper Log",
      "jaundiceTracker": "Jaundice Tracker",
      "moodCheckIn": "Mood Check-In",
      "pregnancyMonitoring": "Pregnancy Monitoring",
      "bloodPressure": "Blood Pressure",
      "weightTracker": "Weight Tracker",
      "planning": "Planning",
      "birthPlanBuilder": "Birth Plan Builder",
      "visitNotes": "Visit Notes",
      "translationHelper": "Help translate",
      "improveGuide": "Help Improve This Guide",
      "helpUsImprove": "Help Us Improve",
      "nauseaHelper": "Nausea & Eating",
      "feelingWell": "Feeling Well",
      "nauseaLog": "Nausea Log"
    },
    "toolbp": {
      "bloodPressureLog": "Blood Pressure Log"
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
      "saveVisit": "Save Visit",
      "questionsPlaceholder": "What do I want to ask at this visit?",
      "notesPlaceholder": "What did we discuss? Any follow-up needed?"
    },
    "apptType": {
      "selectType": "Select type…",
      "obRoutine": "Prenatal – Routine",
      "obTriage": "L&amp;D Triage / Unscheduled",
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
      "peds25d": "Baby's doctor – 2–5 days",
      "peds2wk": "Baby's doctor – 2 weeks",
      "peds2mo": "Baby's doctor – 2 months",
      "family": "Family Doctor",
      "other": "Other"
    },
    "install": {
      "addToPhone": "Add to Phone"
    },
    "common": {
      "toolsBack": "Tools",
      "eg": "e.g. {n}",
      "close": "Close",
      "skipToContent": "Skip to content",
      "undo": "Undo"
    },
    "nav": {
      "prenatal": "Prenatal<br>Visits",
      "labor": "Labor &amp;<br>Delivery",
      "recovery": "Postpartum<br>Recovery",
      "baby": "Your<br>Newborn",
      "toolsTrackers": "Tools &amp;<br>Trackers",
      "today": "Today",
      "guide": "Guide",
      "urgent": "When to call",
      "me": "Me"
    },
    "usNotice": {
      "title": "Care in the United States",
      "body": "Obiana follows prenatal care in the United States. Visits, tests and advice in other countries can be different.",
      "continue": "I understand"
    },
    "about": {
      "openSource": "Free and open source.",
      "viewSource": "View source (AGPL-3.0)",
      "whatThisIs": "What Obiana is",
      "privacyHeading": "Your information",
      "privacyOnDevice": "What you type stays on this phone. No account, no sign-in, nothing sent. Clearing your browser data erases it, so use Export to keep a copy.",
      "privacySubmit": "Only two buttons send anything: Help translate and Help Improve This Guide. They send what you wrote, your country, and a scrambled network address to stop spam. Never your name or what is in your trackers."
    },
    "disclaimer": {
      "title": "Before you start",
      "education": "This is general information, not medical advice. Ask your family doctor, OB or midwife about your own pregnancy.",
      "tools": "The trackers keep what you type. They can't diagnose anything.",
      "emergency": "In an emergency, call 911.",
      "continue": "I understand"
    },
    "guide": {
      "quickAnswers": "Quick answers"
    },
    "today": {
      "whereNow": "Where are you now?",
      "pregnant": "I'm pregnant",
      "dueLabel": "Due date",
      "babyHere": "My baby is here",
      "bornLabel": "Baby's birthday",
      "save": "Show me what's next",
      "savedOnPhone": "This stays on your phone. You can change it any time under Me.",
      "week": "Week {week}",
      "due": "Due {date}",
      "babyDays": {
        "one": "Your baby is 1 day old",
        "other": "Your baby is {count} days old"
      },
      "babyWeeks": {
        "one": "Your baby is 1 week old",
        "other": "Your baby is {count} weeks old"
      },
      "visitsNow": "At your visits now",
      "comingUp": "Coming up",
      "allVisits": "All visits, week by week",
      "toolsNow": "Useful now",
      "changeDates": "Change dates"
    },
    "me": {
      "datesTitle": "Your dates",
      "settings": "Settings",
      "textSize": "Text size",
      "sizeNormal": "Normal",
      "sizeLarge": "Large",
      "sizeLarger": "Larger",
      "language": "Language",
      "darkMode": "Dark mode"
    },
    "urgent": {
      "title": "When to call",
      "call911": "Call 911",
      "callLd": "Call labor & delivery",
      "addLd": "Add your labor & delivery number under Me.",
      "tellThem": "If you had a baby in the last year, tell anyone you call or see. Some serious problems after birth are missed when staff don't know.",
      "helpLines": "Help lines: free, any time",
      "line988": "Thoughts of harming yourself, or in crisis: call or text 988, the Suicide & Crisis Lifeline.",
      "lineMama": "Feeling low, anxious or overwhelmed, in pregnancy or after: National Maternal Mental Health Hotline, 1-833-TLC-MAMA (1-833-852-6262). Call or text. Interpreters in many languages.",
      "linePoison": "Swallowed something, you or the baby: Poison Control, 1-800-222-1222.",
      "lineDv": "Not safe at home: National Domestic Violence Hotline, 1-800-799-7233, or text START to 88788.",
      "call": "Call",
      "text": "Text"
    },
    "visits": {
      "title": "Your visits, week by week",
      "sub": "What happens at each visit, and what's up to you",
      "lead": "This is the usual US schedule. Yours may be different: your family doctor, OB or midwife adds visits and tests when you need them.",
      "afterBirth": "After the birth",
      "yourChoice": "Your choice",
      "first": {
        "when": "About 8–10 weeks",
        "title": "First visit",
        "i1": "Your due date is set from your last period, often with an early ultrasound.",
        "i2": "Blood tests: blood type and Rh, blood count, immunity to rubella and chickenpox, hepatitis B and C, HIV and syphilis. A urine test, and tests for chlamydia and gonorrhea.",
        "i3": "An early sugar test if you had diabetes in a past pregnancy or have other risk factors.",
        "i4": "If you are at higher risk of preeclampsia, low-dose aspirin (81 mg a day) from 12 weeks lowers that risk. Ask if it's right for you."
      },
      "genetic": {
        "when": "From 10 weeks",
        "title": "Tests for the baby",
        "i1": "A blood test from 10 weeks (cell-free DNA) screens for Down syndrome and a few other conditions. A screen is not a diagnosis: a positive result means a diagnostic test is offered.",
        "i2": "Carrier screening checks whether you carry genes for conditions such as cystic fibrosis or spinal muscular atrophy.",
        "i3": "You can have all, some or none of these."
      },
      "monthly": {
        "when": "Every 4 weeks, until 28 weeks",
        "title": "Regular visits",
        "i1": "Blood pressure, weight, urine and the baby's heartbeat. From about 20 weeks, the size of your belly is measured too."
      },
      "anatomy": {
        "when": "18–22 weeks",
        "title": "Anatomy ultrasound",
        "i1": "A detailed scan of the baby's body, growth and the placenta. You can usually learn the sex, if you want to."
      },
      "sugar": {
        "when": "24–28 weeks",
        "title": "Sugar test and blood work",
        "i1": "A sweet drink, then a blood test an hour later, checks for gestational diabetes.",
        "i2": "A blood count for anemia, and a repeat syphilis test.",
        "i3": "If your blood type is Rh negative: an Rh shot (RhoGAM) at about 28 weeks."
      },
      "tdap": {
        "when": "27–36 weeks",
        "title": "Whooping cough shot (Tdap)",
        "i1": "Your antibodies pass to the baby and protect them in the first months, before they can have their own shots. You get it in every pregnancy."
      },
      "twoweekly": {
        "when": "Every 2 weeks, from 28 weeks",
        "title": "Visits get closer",
        "i1": "Get to know how your baby usually moves. Counting kicks is optional. If the baby moves less than usual, call that day. Don't wait for the next visit.",
        "i2": "If you have a condition such as high blood pressure or diabetes, extra checks of the baby (non-stress tests or ultrasounds) often start around 32 weeks."
      },
      "rsv": {
        "when": "32–36 weeks, September to January",
        "title": "RSV protection for the baby",
        "i1": "Either an RSV vaccine for you at 32 to 36 weeks, or an antibody shot for the baby after birth. One or the other, not both. Each lowers the chance that the baby ends up in the hospital with RSV in their first winter."
      },
      "gbs": {
        "when": "36–37 weeks",
        "title": "Group B strep swab, and the baby's position",
        "i1": "A swab of the vagina and rectum. About 1 in 4 women carry GBS, and it does not harm you. If yours is positive, you get IV antibiotics in labor to protect the baby.",
        "i2": "A check that the baby is head down. If the baby is bottom first (breech), you may be offered a way to turn the baby (external cephalic version), or you can plan a C-section.",
        "i3": "Go over your birth plan: pain relief, who will be with you, feeding."
      },
      "weekly": {
        "when": "Every week, from 36 weeks",
        "title": "The last weeks",
        "i1": "From 38 weeks you may be offered a membrane sweep: a finger sweep at the cervix that can help labor start.",
        "i2": "Induction can be offered from 39 weeks. By 41 weeks it is recommended, because the risk to the baby starts to rise."
      },
      "ppBp": {
        "when": "3–10 days after birth",
        "title": "Blood pressure check, if yours was high",
        "i1": "If you had high blood pressure or preeclampsia, have it checked within 3 to 10 days of the birth. Preeclampsia can start or get worse after delivery."
      },
      "pp3": {
        "when": "Within 3 weeks of birth",
        "title": "First check-in",
        "i1": "Talk to your family doctor, OB or midwife about bleeding, pain, feeding, mood and sleep. A phone or video call can count."
      },
      "ppFull": {
        "when": "By 12 weeks after birth, often at 4–6",
        "title": "Full postpartum visit",
        "i1": "A mood check, birth control, how you are healing, and any plans for a next pregnancy.",
        "i2": "If you had gestational diabetes: a sugar test 4 to 12 weeks after birth. The risk of type 2 diabetes stays higher for life, so ask for a check every 1 to 3 years.",
        "i3": "If you leak urine or stool, have pain with sex, or feel a bulge in the vagina, ask about pelvic floor physical therapy. It helps. You don't have to live with it."
      }
    }
  },
  "content": {
    "first-trimester": {
      "title": "First Trimester Visits (Weeks 4–14)",
      "sub": "What to expect at your earliest appointments",
      "t": [
        "Your first prenatal visit is usually around 8–10 weeks and is one of the longest. Bring your questions and your partner if you have one.",
        "First Visit (8–10 Weeks)",
        "Full health history, physical exam, pelvic exam, Pap smear (if due)",
        "Blood work: blood type &amp; Rh factor, CBC, rubella immunity, HIV, hepatitis B, hepatitis C, syphilis, STI screening",
        "Urine test for infection, protein, glucose",
        "Blood pressure baseline, weight, due date confirmation by ultrasound",
        "Ask at This Visit",
        "What medications and supplements are safe? Food and travel safety? Exercise limits? What are my specific risk factors?",
        "Genetic Screening (10–13 Weeks). Your Choice",
        "NIPT (cell-free DNA)",
        ". Blood test screening for chromosomal conditions including Down syndrome, Trisomy 18, Trisomy 13. Very accurate, but still a screening (not diagnostic) test.",
        "Nuchal translucency ultrasound",
        ". Measures fluid at back of baby's neck, often combined with NIPT",
        "If screening is abnormal, diagnostic testing (CVS or amniocentesis) is offered",
        "These tests are",
        "optional",
        ". Think about what you would do with results. Your doctor can help you decide if testing is right for you.",
        "At Every Visit",
        "Blood pressure, weight, and urine are checked. Baby's heartbeat is audible by Doppler at 10–12 weeks. Always mention new symptoms, bleeding, or pain."
      ]
    },
    "second-trimester": {
      "title": "Second Trimester Visits (Weeks 15–27)",
      "sub": "Anatomy scan, glucose test, and more",
      "t": [
        "Visits are every 4 weeks. The anatomy ultrasound at 18–20 weeks is a major milestone. The most detailed look at your baby before birth.",
        "Anatomy Ultrasound (18–20 Weeks)",
        "Detailed scan of baby's brain, heart, spine, kidneys, limbs, and face",
        "Checks placenta location. Important if low-lying (possible previa)",
        "Measures cervical length. Short cervix raises preterm birth risk",
        "Estimates amniotic fluid level",
        "This is when many families learn baby's sex if they want to know",
        "Ask at This Visit",
        "Where is my placenta? What's my cervical length? Is baby's growth on track? Do any findings need follow-up?",
        "Optional Quad Screen / AFP (15–20 Weeks)",
        "Blood test screening for neural tube defects and chromosomal issues. Ask your doctor if you need this if you already had NIPT.",
        "Glucose Challenge Test (24–28 Weeks)",
        "Screens for gestational diabetes. You drink a sugary drink and have blood drawn 1 hour later",
        "If the result is elevated (not \"failed\". It's a screen), you do a longer 3-hour diagnostic test",
        "Gestational diabetes is manageable. Diet, exercise, sometimes medication",
        "Start Thinking About",
        "Childbirth classes, birth preferences, breastfeeding intentions, choosing your baby's doctor, leave planning, baby gear."
      ]
    },
    "third-trimester": {
      "title": "Third Trimester Visits (Weeks 28–40+)",
      "sub": "Weekly visits, GBS swab, cervical checks",
      "t": [
        "Visits increase to every 2 weeks after 28 weeks, then weekly after 36. The finish line is in sight.",
        "28 Weeks. Rh Factor &amp; Tdap",
        "RhoGAM injection",
        "if you are Rh-negative. Prevents your immune system from attacking a future Rh-positive baby",
        "Tdap vaccine",
        "(whooping cough booster). Strongly recommended 27–36 weeks. Antibodies pass to baby through the placenta, protecting the newborn before they can be vaccinated",
        "36–37 Weeks. Group B Strep (GBS) Swab",
        "A simple vaginal and rectal swab. About 25% of women carry GBS normally. It's not an STI and doesn't harm you. If positive, you'll receive IV antibiotics during labor to protect baby from infection during delivery.",
        "36–40 Weeks. Cervical Checks &amp; Baby's Position",
        "Your doctor may offer to check your cervix. How dilated and effaced it is",
        "Baby's position is confirmed (head-down is ideal)",
        "Discuss induction plans: ACOG recommends delivery by 42 weeks; many doctors offer elective induction at 39 weeks",
        "Ask at 36+ Weeks",
        "When would you recommend inducing? What's the plan if I go past my due date? When should I go to the hospital?"
      ]
    },
    "sve": {
      "title": "Cervical Exams (SVE) Explained",
      "sub": "Dilation, effacement, and station",
      "t": [
        "SVE stands for Sterile Vaginal Exam. It's how your doctor checks whether your cervix is preparing for, or progressing through, labor.",
        "Your doctor uses two gloved fingers to feel the cervix and assess three things:",
        "What's Checked",
        "What It Means",
        "Dilation",
        "0–10 cm",
        "How open the cervix is. 10 cm = fully open, ready to push.",
        "Effacement",
        "0–100%",
        "How thinned out the cervix is. 100% = completely thinned.",
        "Station",
        "-5 to +5",
        "How far baby's head has descended. 0 = at the ischial spines (midpoint). +3 to +5 = nearly out.",
        "The Bishop Score",
        "Providers sometimes use a combined score (Bishop Score) that includes dilation, effacement, station, cervical consistency, and position to predict how labor-ready your cervix is. A score ≥ 8 suggests a favorable cervix and successful induction.",
        "SVEs in late pregnancy are optional. Cervical dilation at 36–38 weeks doesn't predict exactly when labor will start. During active labor, SVEs every 2–4 hours track your progress toward 10 cm."
      ]
    },
    "exercise-pregnancy": {
      "title": "Exercise During Pregnancy",
      "sub": "Benefits, safe activities, and what to avoid",
      "t": [
        "Regular moderate exercise is safe and beneficial for most pregnant women. ACOG recommends 150 minutes of moderate activity per week.",
        "Benefits",
        "Reduces back pain, swelling, constipation, and fatigue",
        "Lowers risk of gestational diabetes, preeclampsia, and excessive weight gain",
        "Improves sleep, mood, and energy levels",
        "Associated in some studies with shorter labor and easier recovery",
        "Builds the stamina that labor and carrying a newborn both ask for",
        "Good Choices at Any Stage",
        "Walking",
        ". Easiest, safest, and accessible at any fitness level",
        "Swimming &amp; water aerobics",
        ". Excellent in the third trimester; takes weight off joints",
        "Prenatal yoga or Pilates",
        ". Builds core and pelvic floor strength, reduces back pain",
        "Stationary cycling",
        ". Low fall risk, good cardio",
        "Modified strength training",
        ". Light to moderate weights; avoid breath-holding (Valsalva)",
        "Kegel exercises",
        ". Squeeze the pelvic floor for 3–5 seconds, then relax. 10 squeezes, 3 times a day",
        "What to Avoid After the First Trimester",
        "Exercises lying flat on your back (compresses the vena cava)",
        "Contact sports or activities with fall or collision risk",
        "Scuba diving (decompression risk to baby)",
        "Hot yoga or exercising in extreme heat",
        "High altitude activities if not acclimatized",
        "The Talk Test",
        "You should be able to carry on a conversation while exercising. Too winded to talk? Slow down. This is a simple proxy for keeping intensity in the safe range.",
        "Stop &amp; Call Your Family Doctor, OB or Midwife If",
        "Vaginal bleeding, dizziness, chest pain, severe shortness of breath, contractions, fluid leaking, decreased fetal movement, or calf pain and swelling."
      ]
    },
    "signs-of-labor": {
      "title": "Signs of Labor: When to Go In",
      "sub": "True labor vs. Braxton Hicks, and the 5-1-1 rule",
      "t": [
        "Knowing real labor from false labor saves a lot of unnecessary trips. Here's how to tell the difference.",
        "True Labor",
        "Braxton Hicks",
        "Gets longer, stronger, closer together",
        "Irregular, don't intensify over time",
        "Does not stop with rest or activity",
        "Often stop with position change or hydration",
        "Pain often starts in back, radiates forward",
        "Usually felt only in front",
        "Cervix is changing",
        "Cervix unchanged",
        "The 5-1-1 Rule (First Baby)",
        "Head to the hospital when contractions are",
        "5 minutes apart, lasting 1 minute, for at least 1 hour",
        ". For second or later babies, go sooner. Call at 6–8 minutes apart, as labor moves faster.",
        "Go In Immediately If Any of These",
        "Water breaks",
        "(gush or constant trickle) · Bright red bleeding (more than spotting) · Baby has stopped moving · Severe constant abdominal pain · Signs of preeclampsia: severe headache not relieved by Tylenol, vision changes, sudden severe swelling",
        "Early Labor at Home",
        "If contractions are mild and irregular, early labor is actually more comfortable at home. Try: warm shower, walking, resting, staying hydrated, eating a light snack while you still can."
      ]
    },
    "what-happens-on-arrival": {
      "title": "What Happens When You Arrive at L&D",
      "sub": "Triage, admission, and getting settled",
      "t": [
        "You'll be assessed in triage before being admitted to a labor room. This process ensures you and baby are stable and that you're truly in active labor.",
        "Step 1: Triage Assessment",
        "SVE to check cervical dilation and effacement",
        "External fetal monitor applied. Two straps around your belly, one tracking contractions and one tracking baby's heart rate",
        "Blood pressure, temperature, pulse, oxygen saturation checked",
        "IV access placed, a small catheter in your arm. If you are low risk, you can ask for a saline lock, which keeps the access without fluids running, or ask whether it is needed at all",
        "Urine sample",
        "GBS status confirmed from your prenatal records",
        "Step 2: Admitted or Asked to Wait",
        "If your cervix is less than 4–6 cm (depending on the hospital and circumstances), you may be sent home or asked to walk around for 1–2 hours for a recheck. Early labor is safer and more comfortable at home.",
        "Step 3: Labor Room",
        "Once admitted, you're in your room for the duration. Your nurse is your primary guide and will be checking on you regularly. This is the time to discuss your birth preferences and pain management options.",
        "Bring This to the Hospital",
        "ID and insurance card · This booklet with your contacts · Phone charger · Comfortable clothes for labor and recovery · Baby's going-home outfit and car seat · Toiletries · Snacks for support person"
      ]
    },
    "stages-of-labor": {
      "title": "The Stages of Labor",
      "sub": "What your body is doing and how long it takes",
      "t": [
        "Stage",
        "What's Happening",
        "Typical Length",
        "Stage 1 Early",
        "0–6 cm",
        "Cervix dilates; contractions begin. May feel like strong period cramps or back ache",
        "Hours to many hours; highly variable",
        "Stage 1 Active",
        "6–10 cm",
        "Contractions intensify. Every 3–5 min, lasting 45–60 sec. This is when most women use pain management",
        "1–8 hrs first baby; faster with subsequent",
        "Stage 1 Transition",
        "8–10 cm",
        "The most intense. Contractions every 2–3 min. Short, but the hardest. Baby descends",
        "15–60 minutes",
        "Stage 2 Pushing",
        "10 cm",
        "Fully dilated. Time to push. Strong urge to bear down. Baby's head crowns",
        "20 min–3 hrs (first baby)",
        "Stage 3 Placenta",
        "Placenta delivers after baby. You may receive Pitocin (oxytocin) to help uterus contract",
        "5–30 minutes",
        "Induction of Labor",
        "If your cervix needs help, your doctor may use medications (misoprostol, oxytocin/Pitocin) or a balloon catheter to ripen and open the cervix. Induction can take 12–24+ hours, especially with a first baby and an unfavorable cervix. Plan for it to take time.",
        "Fetal Monitoring",
        "Most hospitals use continuous electronic fetal monitoring during active labor, which tracks baby’s heart rate against your contractions. For a low-risk labor, intermittent listening, where a nurse checks the heartbeat at set intervals, gives the same outcomes for the baby with fewer cesareans and fewer vacuum or forceps deliveries. Continuous monitoring makes more sense if you have an epidural, are being induced, or have a condition that needs closer watching. If you want to walk or use a tub, ask whether wireless (telemetry) monitors are available."
      ]
    },
    "pain-management": {
      "title": "Pain Management: All Your Options",
      "sub": "From unmedicated techniques to epidural",
      "t": [
        "There's no single right way to manage labor pain. Your goal is a healthy baby and a birth experience you feel good about, not any particular method.",
        "Non-Medication Options",
        "Hydrotherapy",
        ". Laboring in a shower or tub significantly reduces pain for many women. One of the most effective non-medication strategies",
        "Movement &amp; positioning",
        ". Walking, rocking, hands-and-knees, birthing ball, side-lying all change how contractions feel",
        "Breathing techniques",
        ". Slow patterned breathing is one of the most effective tools available. Childbirth class teaches this well",
        "Counter-pressure",
        ". Firm pressure on your sacrum (lower back) during contractions dramatically reduces back labor pain",
        "TENS unit",
        ". Small electrical pulses on the lower back disrupt pain signals; most helpful in early labor",
        "Heat &amp; cold",
        ". Heat pack on the lower back, cold on the forehead",
        "Nitrous Oxide (Laughing Gas)",
        "Inhaled through a mask that",
        "you",
        "hold and control during contractions. Takes the edge off without fully blocking pain. Wears off within 5 minutes. Can cause lightheadedness or nausea in some women. Available at many U.S. hospitals. Ask if it's offered at yours.",
        "IV / IM Opioid Medications",
        "Medications like fentanyl or morphine given through your IV take the edge off but don't eliminate pain. Can cause drowsiness, nausea, and itching. Cross to baby in small amounts. Timing matters (avoid close to delivery so baby is alert for birth).",
        "You Can Change Your Mind",
        "Choosing to start unmedicated and requesting an epidural later is completely normal and valid. Similarly, planning an epidural and then having a fast labor that doesn't allow time for one is also common. Stay flexible."
      ]
    },
    "epidural": {
      "title": "The Epidural: What to Know",
      "sub": "How it works, risks, and facts vs. myths",
      "t": [
        "An epidural is the most effective form of labor pain relief. About 75% of women delivering in U.S. hospitals use one.",
        "How It Works",
        "An anesthesiologist places a small flexible catheter (thin tube) in the epidural space of your lower back, not into the spinal cord itself. Local anesthetic and/or opioid medication flows through the catheter, numbing the nerves that carry pain signals from the uterus. You remain fully awake and can usually still feel pressure and move your legs.",
        "What to Expect",
        "Placement takes 10–15 minutes; you'll need to hold very still during contractions",
        "Full effect in 15–20 minutes",
        "Requires continuous fetal monitoring and an IV",
        "Blood pressure is checked frequently. A brief drop is common and very manageable with IV fluids or medication",
        "You may feel less urge to push. Nurses will guide you through pushing",
        "A urinary catheter is usually placed once you're numb",
        "Actual Risks (Uncommon)",
        "Spinal headache",
        "(~1%): caused by a small dural puncture. Treatable with a \"blood patch\"",
        "Temporary low blood pressure",
        ": very common, very manageable",
        "Incomplete relief",
        ": occasionally requires repositioning or a new placement",
        "Itching",
        ": from the opioid component, usually mild",
        "Fever",
        ": epidural-associated fever is real but usually benign and managed",
        "Key Fact. The C-Section Myth",
        "Epidurals do",
        "not",
        "increase C-section rates. This is one of the most studied questions in obstetrics and the large randomized trials agree. There are real tradeoffs: the pushing stage tends to run longer, and a vacuum or forceps delivery is somewhat more likely. You can ask for an epidural at any point in active labor. The practical limit is not a rule about how many centimeters you are, but how fast your labor is moving, since a very quick labor may not leave time to place one."
      ]
    },
    "csection": {
      "title": "C-Section: Why It Happens & What to Expect",
      "sub": "Planned vs. unplanned, the procedure, recovery",
      "t": [
        "A cesarean section is a surgical delivery through incisions in the abdomen and uterus. About 1 in 3 U.S. births are by C-section.",
        "Planned (Scheduled) Reasons",
        "Placenta previa. Placenta covers the cervical opening",
        "Baby in breech (feet-down) or transverse (sideways) position that hasn't turned",
        "Prior classic (vertical) uterine incision",
        "Twins or higher multiples in certain positions",
        "Certain maternal conditions (severe heart disease, active genital herpes outbreak)",
        "Unplanned Reasons During Labor",
        "Non-reassuring fetal heart rate (baby showing signs of distress)",
        "Labor arrest, no progress despite adequate contractions and time",
        "Placental abruption. Placenta detaches prematurely",
        "Umbilical cord prolapse. Cord comes through the cervix before baby",
        "In the Operating Room",
        "Spinal or epidural anesthesia. You are awake and numb from chest down",
        "A screen blocks the surgical field. You can ask for it to be lowered at the moment of birth",
        "Your support person can usually be with you",
        "You'll feel pressure and pulling, not pain",
        "Baby is often placed on your chest immediately even in the OR (\"gentle cesarean\")",
        "Total time: about 45–60 minutes; the birth itself takes 5–10 minutes",
        "Recovery After C-Section",
        "Hospital stay: 2–4 days (vs. 1–2 days after vaginal birth)",
        "Pain managed with scheduled ibuprofen + acetaminophen ± short-term opioids",
        "Walking starts the same day. Critical for preventing blood clots",
        "No lifting anything heavier than your baby for 4–6 weeks",
        "Incision is a horizontal \"bikini-line\" scar, closed with staples or absorbable sutures",
        "Call After C-Section Discharge If",
        "Incision opens, shows redness spreading outward, or has unusual drainage · Fever &gt;100.4°F · Worsening rather than improving pain · Soaking through 1 pad in an hour",
        "VBAC. Vaginal Birth After Cesarean",
        "If you've had one prior low-transverse C-section, a VBAC may be an option for this pregnancy. Success rates are 60–80%. Discuss this early in your prenatal care."
      ]
    },
    "mfm": {
      "title": "High-Risk Pregnancy & MFM Referral",
      "sub": "What MFM is and why you might be referred",
      "t": [
        "MFM stands for Maternal-Fetal Medicine. A subspecialist OB who focuses on high-risk pregnancies. A referral is a sign you're getting expert oversight, not a cause for panic.",
        "Common Reasons for MFM Referral",
        "Preeclampsia or chronic high blood pressure",
        "Pregestational (Type 1 or 2) diabetes or gestational diabetes requiring insulin",
        "Twins, triplets, or higher-order multiples",
        "History of preterm birth (before 37 weeks)",
        "Short cervix found on ultrasound (cervical incompetence)",
        "Fetal growth restriction or structural abnormality on anatomy scan",
        "Autoimmune conditions: lupus, antiphospholipid syndrome",
        "Chronic kidney disease, heart disease, blood clotting disorders",
        "Abnormal genetic screening results requiring follow-up",
        "Advanced maternal age (&gt;35) with complications",
        "What MFM Actually Does",
        "Performs specialized ultrasounds. Detailed fetal anatomy survey, fetal echocardiogram, serial growth scans",
        "Advises on medications, delivery timing, and mode of delivery",
        "May co-manage your care alongside your family doctor, OB or midwife, or take over primary care in complex cases",
        "Most patients still deliver with their original provider",
        "Ask Your MFM",
        "What is the specific concern? How will it be monitored? Does it change how or when I deliver? Will I need more frequent visits or ultrasounds?"
      ]
    },
    "immediate-postpartum": {
      "title": "The First Hours After Delivery",
      "sub": "The \"fourth stage\". What's being monitored",
      "t": [
        "The first two hours after birth, called the \"fourth stage of labor\", are the most important time for monitoring. Your nurse will be checking on you frequently.",
        "What's Being Monitored",
        "Your uterus",
        ". Nurses check that it's firm and well-contracted to prevent hemorrhage. They'll press on your abdomen periodically.",
        "Bleeding (lochia)",
        ". Amount and color are tracked",
        "Blood pressure and heart rate",
        "Your perineum or incision",
        "Pain level",
        ". Don't wait for pain to become severe; ask for medication proactively",
        "Skin-to-Skin Contact",
        "Placing baby on your bare chest immediately after birth, even after C-section, regulates baby's temperature, blood sugar, and breathing, stabilizes heart rate, and strongly promotes bonding and breastfeeding initiation. Ask for this to happen unless there's a specific medical reason it can't.",
        "Delayed Cord Clamping",
        "Waiting 30–60 seconds (or longer) before clamping and cutting the umbilical cord transfers an extra 80–100 mL of iron-rich blood to baby. This is now standard practice at most U.S. hospitals. You can confirm it's planned ahead of time.",
        "Your First Meal",
        "After a vaginal birth, you can usually eat shortly after delivery. After a C-section, clear liquids first, then regular food as tolerated. Typically within a few hours."
      ]
    },
    "physical-recovery": {
      "title": "Physical Recovery: What to Expect",
      "sub": "Lochia, perineal care, pain management",
      "t": [
        "Postpartum Bleeding (Lochia)",
        "Lochia is normal discharge as the uterine lining sheds and the placental site heals. It changes over time:",
        "Days",
        "Appearance",
        "Normal?",
        "1–4",
        "Bright red, like a heavy period",
        "✓ Yes",
        "5–10",
        "Pink to brown, lighter flow",
        "✓ Yes",
        "10–28+",
        "Yellow-white, scant",
        "✓ Yes",
        "Call Your Family Doctor, OB or Midwife If",
        "Soaking through 1 pad in an hour · Passing golf ball-sized clots · Bright red bleeding returns after it has lightened · Foul-smelling discharge",
        "Perineal Care (After Vaginal Birth)",
        "Use peri-bottle with warm water after every bathroom visit. Front to back",
        "Ice packs for the first 24 hours, then switch to warm sitz baths (10–15 min, 2–3x/day)",
        "Witch hazel pads (e.g., Tucks) soothe swelling and hemorrhoids",
        "Constipation",
        ". Very common in the first weeks, and genuinely uncomfortable with perineal stitches. Water, fiber and moving around help most. Docusate (Colace) is handed out in nearly every hospital, though trials show it works little better than a placebo, so if it does nothing for you, ask about an osmotic laxative such as polyethylene glycol (Miralax) instead. The Constipation and Hemorrhoids card under Prenatal has more.",
        "Pain Management",
        "Alternating ibuprofen (600 mg every 6 hours) and acetaminophen (650 mg every 6 hours) on a scheduled basis works much better than waiting for pain to spike. Ask your nurse for a written schedule on Day 1 and stick to it."
      ]
    },
    "mood-ppd": {
      "title": "Mood & Emotional Recovery",
      "sub": "Baby blues, PPD, and when to ask for help",
      "t": [
        "Dramatic hormonal changes after delivery affect mood significantly. Emotional shifts are expected, but some symptoms need attention.",
        "Baby Blues (Normal. Up to 80% of Mothers)",
        "Tearfulness, mood swings, anxiety, and irritability in the first week after birth, driven by a sharp drop in estrogen and progesterone. Baby blues typically resolve on their own within 2 weeks.",
        "Postpartum Depression (PPD). 1 in 8 Mothers",
        "PPD is a medical condition. A treatable mood disorder, not a character flaw or a sign of bad mothering.",
        "Symptoms of PPD",
        "Persistent sadness or emptiness · Difficulty bonding with your baby · Feeling like a bad mother or that your baby would be better off without you · Severe anxiety or panic attacks · Inability to sleep even when baby sleeps · Loss of interest in things you used to enjoy · Thoughts of harming yourself or your baby: call 911 or go to the ER now, or call or text 988",
        "If these symptoms persist beyond 2 weeks or are severe at any point, tell your care team. PPD is effectively treated with therapy, support groups, and/or medication (many of which are safe with breastfeeding).",
        "Don't wait until your 6-week visit to mention it.",
        "Postpartum Psychosis. Rare but a Medical Emergency",
        "Hallucinations, delusions, extreme confusion, or agitation in the days after birth. Call 911 or go to the ER immediately. This is rare (1–2 in 1,000) but requires urgent treatment.",
        "Postpartum Anxiety",
        "Less discussed but very common. Excessive, intrusive worry about baby's safety, difficulty sleeping even when exhausted, constant checking, physical symptoms like racing heart. Also very treatable. Mention it to your doctor."
      ]
    },
    "pelvic-rest": {
      "title": "Pelvic Rest & Resuming Sex",
      "sub": "Why the 6-week recommendation exists",
      "t": [
        "Six weeks is the number most people are given, and it lines up with the postpartum visit, but it is a convention rather than a fixed rule. What actually matters is that the bleeding has stopped, any tear or incision has healed, and you feel ready. For some women that comes sooner, for many it comes later. Here is what is healing underneath.",
        "Where the Six Weeks Comes From",
        "The uterus needs 4–6 weeks to fully contract and for the placental attachment site to heal completely",
        "Any vaginal tears, lacerations, or episiotomy stitches need time to heal",
        "C-section incisions, both the external scar and the uterine incision inside, need at least 6 weeks",
        "The cervix, which was dilated to 10 cm, gradually closes over several weeks. During this time it provides a direct path for infection to reach the uterus",
        "What \"Pelvic Rest\" Means",
        "Nothing in the vagina: no intercourse, no tampons, no menstrual cups, no douching. Use pads only for lochia during the healing period.",
        "When You're Ready to Resume",
        "Dryness is very common",
        ", especially if breastfeeding, which keeps estrogen low. Use a water-based lubricant. Take your time; some initial discomfort is normal. Persistent pain is not. Tell your doctor.",
        "Use contraception",
        ". You can become pregnant before your period returns. Discuss options at your 6-week visit.",
        "Contraception After Delivery",
        "You can ovulate and get pregnant as early as 3 weeks postpartum, even while breastfeeding, and before your period returns. If you don't want to become pregnant immediately, discuss contraception before leaving the hospital or at your 2-week visit at the latest."
      ]
    },
    "postpartum-exercise": {
      "title": "Returning to Exercise After Delivery",
      "sub": "What's safe when, and pelvic floor PT",
      "t": [
        "Getting active again after delivery improves mood, energy, and physical recovery, but the timeline matters.",
        "Start Immediately (Days 1–2)",
        "Kegel exercises",
        ". Start within 24–48 hours if comfortable. These speed healing, reduce urinary leakage risk, and rebuild pelvic floor tone. Squeeze for 3–5 seconds, then relax: 10 squeezes, 3 times a day.",
        "Gentle walking",
        ". Short walks are encouraged starting Day 1–2. Builds up as you feel ready.",
        "Deep belly breathing",
        ". Inhale to expand the belly, exhale slowly. Helps reconnect with deep core muscles.",
        "Weeks 2–6",
        "Gradually increase walking duration and pace",
        "Gentle stretching and mobility work is fine",
        "Avoid: sit-ups, crunches, planks, heavy lifting, high-impact activities, anything that increases downward pressure on the pelvic floor",
        "Listen to your body. Increased pain, bleeding, or pelvic pressure means slow down",
        "After 6-Week Clearance",
        "You can gradually return to your pre-pregnancy exercise activities. Start at 50% intensity and build slowly over weeks. Running, HIIT, and lifting can all resume, but start gently.",
        "Diastasis Recti",
        "A separation of the two sides of the rectus abdominis (the \"six-pack\" muscles) that's very common after pregnancy. Standard crunches and sit-ups can worsen it. A pelvic floor physical therapist can screen you and give you safe, effective exercises. Ask your doctor for a referral.",
        "Pelvic Floor Physical Therapy",
        "An underused but highly effective resource after delivery. Treats urinary leakage, pelvic organ prolapse, pain with sex, diastasis recti, and general pelvic floor weakness. Ask for a referral at your 6-week visit. It's covered by most insurance."
      ]
    },
    "postpartum-danger": {
      "title": "Postpartum Warning Signs & Follow-Up",
      "sub": "When to call and your appointment schedule",
      "t": [
        "Go to the ER or Call 911 For",
        "Chest pain or difficulty breathing · Seizure · Sudden severe headache unlike any before · Stroke symptoms (face drooping, arm weakness, slurred speech) · Thoughts of harming yourself or your baby",
        "Call Your Family Doctor, OB or Midwife For",
        "Fever &gt;100.4°F · Soaking through 1 pad in an hour · Severe headache not relieved by ibuprofen/Tylenol · Vision changes · Leg redness, swelling, or warmth (DVT) · Wound opening, redness spreading, or pus · Difficulty urinating · Signs of PPD or anxiety",
        "Your postpartum visit schedule, and the questions worth taking to the six-week visit, are in the Follow-Up Appointments card under Baby, alongside your baby's visits so you can see both together."
      ]
    },
    "breastfeeding": {
      "title": "Breastfeeding: Getting Started",
      "sub": "Latch, colostrum, and how to know it's working",
      "t": [
        "Breastfeeding is natural but takes practice. Most challenges can be solved with good support.",
        "Ask for a lactation consultant before you leave the hospital. It's one of the most valuable resources available to you.",
        "First 1–3 Days: Colostrum",
        "Your first \"milk\" is colostrum. Thick, golden-yellow, and produced in small amounts (teaspoons, not ounces). This is exactly right. Colostrum is packed with antibodies, immune factors, and exactly what a newborn needs. Your mature milk comes in around days 2–5 (often slightly later after a C-section).",
        "The Latch. Most Important Thing",
        "Baby's mouth should cover most of the areola, not just the nipple",
        "Both lips should be flanged outward (not curled in)",
        "You should hear swallowing sounds, a soft \"kuh\", not clicking",
        "Baby's nose and chin should both touch the breast",
        "A good latch should not hurt after the first 20–30 seconds. If it hurts throughout, break suction with a clean finger and try again.",
        "How Often to Feed",
        "8–12 times in 24 hours in the first weeks. Feed on demand. Watch for hunger cues (rooting, hands to mouth, sucking movements, fussiness) rather than watching the clock. Newborns need to eat that often; it's not a sign you don't have enough milk.",
        "How to Know Baby Is Getting Enough",
        "Diapers:",
        "By day 4–5, expect at least 6 wet diapers and 3–4 yellow seedy stools per day.",
        "Weight:",
        "Birth weight should be regained by 10–14 days. After day 5, expect ½–1 oz gain per day.",
        "Baby:",
        "Satisfied after feeds, alert during awake periods."
      ]
    },
    "bf-challenges": {
      "title": "Breastfeeding Challenges & Solutions",
      "sub": "Sore nipples, engorgement, supply concerns, mastitis",
      "t": [
        "Problem",
        "What to Do",
        "Sore nipples",
        "Check latch first. This is the #1 cause. Apply expressed breast milk or lanolin after feeds. Air dry. Usually improves after day 5 once milk comes in and latch improves.",
        "Engorgement",
        "Feed your baby whenever they're hungry. Don't pump to empty the breast: that tells your body to make even more milk. If the breast is too firm to latch, hand express a little first to soften it. Cold pack after feeding to reduce swelling. Can cause a low-grade fever. If &gt;100.4°F, call your doctor.",
        "Low supply concerns",
        "Feed more frequently. Supply follows demand. Ensure good latch. Pump after feeds to signal more production. See a lactation consultant. Most perceived low supply is actually sufficient supply.",
        "Clogged duct",
        "Firm, tender lump in breast. Keep feeding as usual, but don't pump extra to empty it. Ice and ibuprofen help the pain and swelling. Stroke the skin only lightly: deep massage and heat can make it worse. Usually resolves in 1–2 days.",
        "Mastitis",
        "Flu-like symptoms (fever, body aches, fatigue) + a red, painful area of breast. Keep breastfeeding. Stopping makes it worse. Same care as a clogged duct: ice, ibuprofen, no heat or deep massage. Many cases get better without antibiotics, so call your doctor to decide together, and call again if a fever lasts more than 24 hours.",
        "Nipple thrush",
        "Sharp, burning pain during and after feeds. Pinkish, shiny nipples. Both you and baby need antifungal treatment at the same time. Call your doctor and your baby's doctor.",
        "Pumping",
        "Electric double breast pumps are covered by most U.S. insurance plans under the ACA. Pumping maintains supply when baby can't nurse, allows others to feed baby, and builds a freezer stash. Milk can be refrigerated for 4 days or frozen 6–12 months.",
        "It's Okay to Supplement or Formula Feed",
        "If breastfeeding is not working despite support, supplementing with formula is not failure. It's feeding your baby. A fed, thriving baby matters most. Many families combine breast and formula feeding successfully."
      ]
    },
    "formula": {
      "title": "Formula Feeding",
      "sub": "Choosing, preparing, and storing formula safely",
      "t": [
        "Formula is a safe and complete source of nutrition for your baby. The best feeding method is the one that keeps your baby nourished and your family well.",
        "Choosing a Formula",
        "Standard cow's milk-based, iron-fortified formula is appropriate for most healthy term babies",
        "Soy formula is appropriate for certain dietary or religious reasons",
        "Hypoallergenic (hydrolyzed) formulas are for babies with confirmed milk protein allergy. Don't switch without talking to your baby's doctor",
        "Don't change formula brands frequently hoping to solve normal fussiness. Most switching doesn't help",
        "Preparing Formula",
        "Follow package instructions exactly. The ratio of powder to water is carefully designed",
        "Use water that meets safe drinking standards. For babies under 2 months or immunocompromised, boil and cool tap water",
        "To warm: place bottle in a bowl of warm water.",
        "Never microwave",
        ". Heats unevenly and can burn baby's mouth",
        "How Much, How Often",
        "Newborn (0–1 month): 1–2 oz every 2–3 hours (8–12 feeds/day)",
        "2 months: 3–4 oz every 3–4 hours",
        "4 months: 4–6 oz every 4 hours",
        "Feed on demand. These are guides, not rules",
        "Storage",
        "How Long",
        "Opened bottle (started)",
        "Use within 1 hour or discard",
        "Prepared but not started (fridge)",
        "Up to 24 hours",
        "Unmixed powder (sealed, room temp)",
        "Follow package expiration",
        "Never",
        "Give regular cow's milk before 12 months · Add cereal to a bottle · Dilute formula to make it last longer · Make formula stronger than directed · Use expired formula"
      ]
    },
    "cord-care": {
      "title": "Umbilical Cord Care",
      "sub": "Keeping it clean, dry, and when to worry",
      "t": [
        "The umbilical cord stump dries up and falls off on its own in 1–3 weeks. Your main job is keeping it clean and dry.",
        "Normal Appearance Over Time",
        "At birth: yellow-green, soft, and rubbery",
        "Days 1–5: begins to dry, turns brown",
        "Days 5–14: progressively shriveled and black",
        "Falls off naturally. Do not pull it, even when it looks like it's barely attached",
        "How to Care for It",
        "Keep it dry:",
        "Sponge baths only until the stump falls off, no submersing in water",
        "Fold the diaper down",
        "to keep the stump exposed to air and prevent urine contact",
        "Loose, airy clothing",
        ". Avoid onesies or clothes that rub the cord",
        "No alcohol wipes needed",
        ". Studies show clean dry care heals just as well or faster. Your hospital may have a specific protocol; follow their guidance.",
        "Normal Findings",
        "Small amount of dried blood at the base as it separates. Normal",
        "Slight moisture or minimal clear discharge at the base. Usually normal",
        "A mild smell as it dries. Generally normal",
        "Call Your Baby's Doctor If",
        "Redness spreading on the surrounding skin",
        ". This is omphalitis (a skin infection) and needs prompt treatment · Foul or strong smell · Yellow or green pus · Bleeding that doesn't stop with gentle pressure · Stump still attached after 3 weeks"
      ]
    },
    "normal-newborn": {
      "title": "Normal Newborn Appearance & Behavior",
      "sub": "What looks alarming but is totally normal",
      "t": [
        "Many normal newborn features look alarming to new parents. Here's what to expect.",
        "What You See",
        "Normal?",
        "Cone-shaped or molded head",
        "✓ Yes. Resolves in days",
        "Soft spots (fontanelles) pulsating",
        "✓ Yes. Normal",
        "Cheesy white coating (vernix)",
        "✓ Yes. Protective, let absorb",
        "Fine hair on shoulders/back (lanugo)",
        "✓ Yes. Sheds in weeks",
        "Yellow skin or eyes (jaundice)",
        "Common. Needs monitoring",
        "Swollen breasts (girls or boys)",
        "✓ Yes. Maternal hormones",
        "Swollen labia or scrotum",
        "✓ Yes. Maternal hormones",
        "Girls: bloody or mucousy vaginal discharge",
        "✓ Yes. Hormone withdrawal",
        "Crossed eyes occasionally",
        "✓ Yes. Normal until ~4 months",
        "Peeling skin (day 1–3)",
        "✓ Yes, especially post-term",
        "Sneezing frequently",
        "✓ Yes, not a cold",
        "Hiccups constantly",
        "✓ Yes. Very normal",
        "Pimple-like rash (erythema toxicum)",
        "✓ Yes. Harmless, resolves in days",
        "Dark first stool (meconium)",
        "✓ Yes. Should pass within 24–48 hrs",
        "Call Your Baby's Doctor Right Away For",
        "Fever ≥ 100.4°F rectal (serious in newborns. Always take rectal temp) · Refusing to eat · Extreme yellowing · Grunting with every breath · Very pale skin · Inconsolable crying · Fewer than 6 wet diapers/day after day 5 · Stiff neck. Blue or gray lips or face: call 911."
      ]
    },
    "safe-sleep": {
      "title": "Safe Sleep for Baby",
      "sub": "The ABCs of SIDS prevention",
      "t": [
        "Safe sleep practices prevent SIDS and sleep-related infant deaths, which cause about 3,500 infant deaths per year in the U.S. These guidelines save lives.",
        "The ABCs of Safe Sleep",
        "A. Alone:",
        "Baby sleeps alone, not with adults, siblings, or pets",
        "B. Back:",
        "Always place baby on their back to sleep. Every sleep, every caregiver",
        "C. Crib:",
        "On a firm, flat sleep surface with only a fitted sheet",
        "The Safe Sleep Environment",
        "Firm, flat mattress in a crib, bassinet, or play yard that meets current CPSC safety standards",
        "Nothing else",
        "in the sleep area, no pillows, blankets, bumper pads, positioners, stuffed animals, or wedges",
        "Room-sharing",
        "(baby in the same room but not the same bed) for at least the first 6 months reduces SIDS risk by up to 50%. This is strongly recommended",
        "Keep the sleep area smoke-free. Exposure to tobacco smoke significantly increases risk",
        "Pacifier at sleep time",
        "reduces SIDS risk. Offer after breastfeeding is established (~3–4 weeks)",
        "Keep baby comfortably cool. Overheating is a risk factor",
        "Tummy Time (Awake &amp; Supervised Only)",
        "Tummy time while baby is awake and watched is essential for neck and shoulder development and preventing flat spots on the head. Start with 2–3 minutes several times a day from birth. Build to 30 total minutes per day by 3 months.",
        "Never place a sleeping baby in a swing, car seat (outside the car), bouncy seat, or inclined sleeper for extended sleep. These are not safe sleep environments."
      ]
    },
    "followup-appts": {
      "title": "Follow-Up Appointments for Baby & You",
      "sub": "The schedule and what happens at each visit",
      "t": [
        "Before you leave the hospital, confirm these appointments are scheduled. Don't leave without them.",
        "For Your Baby",
        "When",
        "Purpose",
        "2–5 days old",
        "Weight check. Critical to confirm birth weight is being regained. Jaundice assessment. Feeding evaluation. Newborn screening follow-up.",
        "2 weeks",
        "Weight back to birth weight? Development and feeding check. Cord stump check.",
        "2 months",
        "First vaccines, growth and development milestones",
        "4, 6, 9, 12 months",
        "Growth, development, vaccines (schedule continues through childhood)",
        "For You",
        "When",
        "Purpose",
        "1–3 days",
        "(C-section or complications)",
        "Wound check, BP management, pain",
        "2 weeks",
        "Mood screening, BP, wound/perineum, breastfeeding support",
        "6 weeks",
        "Full physical, pelvic exam, contraception discussion, exercise clearance",
        "Questions to Ask Before Leaving the Hospital",
        "Who do I call if I have a question before my first appointment? · Is baby feeding well. How will I know if not? · What's my threshold for calling the baby's doctor? · Were any tests abnormal that need follow-up? · Do I need to wake baby to feed at night? · What are my wound care instructions?"
      ]
    },
    "faq-deli": {
      "title": "Can I eat deli meat and soft cheese?",
      "sub": "",
      "t": [
        "The main risk is",
        "Listeria",
        ", a bacterial infection that's rare but can be serious in pregnancy (can cross the placenta). The FDA advises avoiding unpasteurized cheese and deli meats unless heated to steaming (165°F). Most pasteurized soft cheeses (like pasteurized brie, feta from a package) are safe. The exception is queso fresco, queso blanco, panela and similar fresh cheeses: even pasteurized ones have caused listeria outbreaks, so eat them only cooked until steaming. The overall risk from occasional deli meat is very low. When in doubt, heat it."
      ]
    },
    "faq-coffee": {
      "title": "Can I have any caffeine?",
      "sub": "",
      "t": [
        "Yes. ACOG recommends limiting caffeine to",
        "less than 200 mg per day",
        "(approximately one 12-oz cup of drip coffee). At that level, evidence of harm to the pregnancy is not established. Tea, soda, and chocolate also contain caffeine. Count them all together. Cutting back is reasonable; cutting it out entirely is a personal choice, not medically required."
      ]
    },
    "faq-hair-dye": {
      "title": "Can I dye my hair while pregnant?",
      "sub": "",
      "t": [
        "Yes, but think about why you are doing it. Hair dye is absorbed through the scalp in very small amounts. No published studies have shown harm to the fetus at the amounts involved in normal salon or home hair coloring. Highlights (foil) have even less scalp contact. If you're concerned, wait until the second trimester when major organ development is complete, or just don't do it."
      ]
    },
    "faq-exercise-mc": {
      "title": "Does exercise cause miscarriage?",
      "sub": "",
      "t": [
        "No. Moderate exercise does not cause miscarriage in healthy pregnancies. A certain amount of exercise is protective, not harmful. See the exercise guidelines in the Prenatal section. If your doctor told you not to exercise, ask why, and follow that guidance."
      ]
    },
    "faq-sex-pregnancy": {
      "title": "Is it safe to have sex during pregnancy?",
      "sub": "",
      "t": [
        "Yes, in a normal pregnancy without complications. Sex does not cause miscarriage, early labor, or harm the baby (who is cushioned by amniotic fluid). Your doctor will recommend pelvic rest (no intercourse) only if you have specific situations: placenta previa, preterm labor risk, unexplained vaginal bleeding, certain cervical conditions, or after your water has broken. If you're not sure, ask at your next visit."
      ]
    },
    "faq-vaccines": {
      "title": "Are vaccines safe during pregnancy?",
      "sub": "",
      "t": [
        "Two are recommended in every pregnancy and seem to be safe: the Tdap booster and the flu shot. The live vaccines must wait until after you deliver.",
        "Tdap, for whooping cough",
        "Given between 27 and 36 weeks, in every pregnancy, even if you had it in the last one. The main point is not to protect you. Your body makes antibodies and passes them across the placenta, so the baby is born already carrying protection against whooping cough. That matters because whooping cough is most dangerous in the first months of life, before a baby is old enough to be vaccinated. Anyone who will be holding the baby regularly should be up to date too.",
        "Flu shot",
        "Recommended in any trimester during flu season. Pregnancy changes how your lungs and immune system work, which makes flu considerably more likely to put you in the hospital. The antibodies cross to the baby as well and cover the first few months. The injected vaccine is the one used in pregnancy: the nasal spray is a live vaccine.",
        "The ones that wait until after delivery",
        "Live vaccines, meaning MMR (measles, mumps and rubella) and varicella (chickenpox), are not given during pregnancy. If your early bloodwork shows you are not immune to rubella or chickenpox, the usual plan is to vaccinate before you leave the hospital, which also protects a future pregnancy. Both are safe while breastfeeding.",
        "If you are behind on something else, or you are traveling, or there is an outbreak where you live, tell your doctor."
      ]
    },
    "faq-eat-for-two": {
      "title": "Do I need to \"eat for two\"?",
      "sub": "",
      "t": [
        "No. \"eating for two\" is a myth. In the first trimester, you need no extra calories. In the second, about 340 extra a day; in the third, about 450. That is a snack or two, not a second plate. Quality of nutrition matters far more than quantity. Focus on protein, iron, folate, calcium, and omega-3 fatty acids. Your prenatal vitamin helps fill gaps but shouldn't replace a balanced diet."
      ]
    },
    "faq-hot-tub": {
      "title": "Can I take baths or use a hot tub?",
      "sub": "",
      "t": [
        "Warm baths are fine throughout pregnancy. Hot tubs, saunas, and steam rooms that raise your core body temperature above 102°F (39°C) are not recommended, especially in the first trimester, when elevated temperature is associated with neural tube defects. If you do use a hot tub, keep the temperature comfortable (not hot), limit time to 10 minutes, and avoid it in the first trimester. A warm bath at typical household water temperature (98–100°F) is safe."
      ]
    },
    "faq-epidural-csec": {
      "title": "Does an epidural increase C-section risk?",
      "sub": "",
      "t": [
        "No. This is one of the most studied questions in obstetrics. Multiple large randomized controlled trials and meta-analyses confirm that epidurals do",
        "not",
        "increase C-section rates. Epidurals do lengthen the pushing stage somewhat, and make a vacuum or forceps delivery more likely, which is worth weighing alongside the pain relief. You can ask for one at any point in active labor. The practical limit is not a threshold in centimeters but how fast labor is moving, since a very quick labor may not leave time."
      ]
    },
    "faq-routine-episiotomy": {
      "title": "Do I need an episiotomy to avoid tearing?",
      "sub": "",
      "t": [
        "No. Routine episiotomy (a surgical cut at the vaginal opening) is no longer recommended by ACOG. Evidence consistently shows that",
        "natural tears generally heal better",
        "and cause fewer complications (including pain and long-term pelvic floor issues) than routine episiotomies. Most women who deliver vaginally have some degree of tearing, but many are minor (first-degree). Episiotomy is still appropriate when there is a specific indication, such as when baby needs to be delivered quickly for fetal distress."
      ]
    },
    "faq-water-breaking": {
      "title": "If my water breaks, do I have to have a C-section?",
      "sub": "",
      "t": [
        "No. If your water breaks at term, most women go into labor on their own within about a day. If labor does not start, induction is usually offered, because the chance of infection climbs the longer the membranes are open. That is a rising risk to weigh together, not a deadline you have missed. If you are GBS-positive, antibiotics are started right away. A C-section is only needed if there is a separate reason for one, and water breaking by itself is not one."
      ]
    },
    "faq-eat-in-labor": {
      "title": "Can I eat or drink during labor?",
      "sub": "",
      "t": [
        "For low-risk women in early labor, current ACOG guidance supports light food and clear liquids. Once you have an epidural, are on Pitocin, or are higher risk for needing general anesthesia (possible C-section), most hospitals restrict to ice chips or sips of water due to aspiration risk if general anesthesia becomes necessary. Ask your hospital's specific policy. For your support person: bring snacks. Labor can be a long day."
      ]
    },
    "faq-vbac": {
      "title": "If I had a C-section before, do I always need another one?",
      "sub": "",
      "t": [
        "Not necessarily. Vaginal birth after cesarean (VBAC) is a safe and appropriate option for many women with one prior low-transverse uterine incision. Success rates range from 60–80%. Factors that affect candidacy include the reason for the prior C-section, your current pregnancy, the type of uterine incision, and your hospital's capacity to handle an emergency. Bring this up early in prenatal care if you are interested."
      ]
    },
    "faq-bf-bc": {
      "title": "Can I get pregnant while breastfeeding?",
      "sub": "",
      "t": [
        "Yes. While exclusive breastfeeding suppresses ovulation to some degree, it is",
        "not reliable contraception",
        ". You can ovulate, and get pregnant, before your period returns. The \"lactational amenorrhea method\" requires very specific conditions (exclusive breastfeeding every 4 hours daytime / 6 hours nighttime, no supplementation, no period returned) and is only about 98% effective under those strict conditions. Discuss birth control before you leave the hospital."
      ]
    },
    "faq-stress-milk": {
      "title": "Does stress dry up breast milk?",
      "sub": "",
      "t": [
        "Acute stress can temporarily interfere with the letdown reflex (the release of milk). But one stressful event will not cause milk to dry up. Milk supply is driven by demand. The more frequently and effectively your baby nurses or you pump, the more milk your body produces. If your stress or chaos around you prevents baby from feeding well, this could decrease demand and decrease the amount of milk you produce. Strategies that help letdown: skin-to-skin contact, warmth, relaxation techniques, and looking at a photo of your baby when pumping. Talk to your doctor about non-chemical ways of reducing stress."
      ]
    },
    "faq-bonding": {
      "title": "Should I feel instantly bonded with my baby?",
      "sub": "",
      "t": [
        "No. Bonding is a process, not a single moment. Many mothers feel deep love immediately at birth; others need days, weeks, or longer to develop that feeling. Both are completely normal. Physical exhaustion, difficult deliveries, unexpected outcomes, and PPD can all affect early bonding. If you feel disconnected or numb toward your baby for more than a couple of weeks, mention it to your doctor. It can be a sign of postpartum depression, which is treatable."
      ]
    },
    "faq-ibuprofen-bf": {
      "title": "Can I take ibuprofen while breastfeeding?",
      "sub": "",
      "t": [
        "Yes. Ibuprofen is one of the safest OTC medications while breastfeeding. Very little transfers to breast milk. Acetaminophen (Tylenol) is also safe. These are the preferred pain medications postpartum and during breastfeeding. High-dose aspirin is not recommended (low-dose prescribed aspirin is a different matter. Discuss with your doctor). Naproxen (Aleve) has more milk transfer and is generally not preferred. Always confirm with your care team for your specific situation."
      ]
    },
    "faq-jaundice": {
      "title": "My baby looks yellow. When is it serious?",
      "sub": "",
      "t": [
        "Newborn jaundice (hyperbilirubinemia) affects about 60% of term babies in the first week. It's caused by normal breakdown of fetal red blood cells. The liver is just catching up. Most cases are mild and resolve without treatment. It becomes a concern when bilirubin levels are very high (risk of brain damage at extreme levels) or when baby is very sleepy, not feeding, or the jaundice appears in the first 24 hours. Your hospital will check bilirubin before discharge and at the baby's checkup at 2–5 days. Treatment with phototherapy (bili lights) is very effective if needed."
      ]
    },
    "faq-newborn-procedures": {
      "title": "Do all newborn procedures have to happen?",
      "sub": "",
      "t": [
        "Standard newborn procedures include:",
        "Vitamin K injection",
        "(decreases the risk of fatal brain bleeding),",
        "erythromycin eye ointment",
        "(reduces eye infections including gonorrhea),",
        "Hepatitis B vaccine first dose",
        ", and the",
        "newborn metabolic screening blood draw",
        "(heel stick for about 30 conditions including PKU, hypothyroidism and sickle cell). The evidence behind these is not all the same strength, and it is reasonable to ask about them separately. Vitamin K and the heel stick have the clearest case: vitamin K prevents a rare but catastrophic bleed, and the heel stick finds conditions that can only be treated if they are caught in the first days. The hepatitis B dose matters most when your own hepatitis B status is positive or unknown. Eye ointment rests on weaker evidence, and several countries have stopped giving it routinely, though many US states require it by law. You may legally decline in most states. Ask your team which of these applies to your situation."
      ]
    },
    "faq-first-bath": {
      "title": "When does my baby need the first bath?",
      "sub": "",
      "t": [
        "WHO and AAP now recommend delaying the first bath for at least 24 hours after birth (ideally 48 hours). The white coating (vernix caseosa) has antimicrobial properties and helps moisturize skin. Delaying the bath also helps maintain body temperature, supports blood sugar stability, and is associated with improved breastfeeding initiation. Waiting is the current best practice, not just preference."
      ]
    },
    "prenatal-vitamins": {
      "title": "Prenatal Vitamins",
      "sub": "Which part matters, and what to do if they make you sick",
      "t": [
        "Folic acid.",
        "You should be taking folic acid if there is a chance you could be or could get pregnant. Taking 400 to 800 mcg daily before conception and through early pregnancy substantially reduces neural tube defects. That protection happens in the first weeks, often before a pregnancy is confirmed.",
        "Iron",
        "supports the large increase in your blood volume and helps prevent anemia.",
        "Iodine, vitamin D, calcium and DHA",
        "are commonly included and reasonable.",
        "If the vitamin makes you nauseated",
        "Iron is usually the culprit. Try taking it at night, or with food rather than on an empty stomach. Ask your doctor about a lower-iron formulation, or about taking folic acid on its own until the nausea settles. A vitamin you actually take beats a better one you cannot keep down.",
        "Gummies, chewables and cost",
        "Gummy prenatals are easier to tolerate but usually contain no iron, so you may need iron separately. Store-brand vitamins are held to the same standards as expensive ones. There is no need to pay more.",
        "If cost is a barrier, say so. Folic acid on its own is inexpensive, and clinics can often help.",
        "What not to take",
        "Avoid vitamin A supplements in high doses, which can harm a developing baby. Do not double up on a prenatal to get more of something. If you take other supplements or herbal products, bring the actual bottles to your next visit."
      ]
    },
    "alcohol": {
      "title": "Alcohol",
      "sub": "What is known, and what is not",
      "t": [
        "No amount of alcohol has been shown to be safe in pregnancy, and no study has shown that a single drink causes harm. Both are true.",
        "What is known",
        "Regular and heavy drinking harms a developing baby. Fetal alcohol spectrum disorders are permanent and entirely preventable. Binge drinking matters most: a large amount arriving at once is harder on the baby than the same amount spread out.",
        "What is not known",
        "Nobody can run the trial that would settle whether an occasional single drink does damage, so the advice is to avoid alcohol completely. That is the only recommendation guaranteed to be safe. It is not evidence that one glass of wine caused harm.",
        "If you drank before you knew",
        "Very common. Tell your team the real amount so they know what to watch for.",
        "If stopping is hard",
        "If you drink every day, do not stop abruptly on your own. Alcohol withdrawal can be dangerous in a way the drinking is not, and needs medical supervision. Tell your team."
      ]
    },
    "tobacco-cannabis": {
      "title": "Smoking, Vaping and Cannabis",
      "sub": "Stopping helps at any point",
      "t": [
        "Stopping helps at any point in the pregnancy, and the earlier the better.",
        "Tobacco and vaping",
        "Smoking narrows the blood supply to the placenta, which means smaller babies, more preterm births, placental problems, stillbirth, and sudden infant death after birth. Vaping is not a safe substitute: nicotine itself constricts blood vessels. Quitting before the third trimester recovers much of the birthweight difference.",
        "Cannabis",
        "Any form, smoked, vaped or eaten, legal or not. THC crosses the placenta. It is linked with lower birthweight and with attention and learning differences later in childhood. It is often suggested online for morning sickness; this guide has a whole section of things that work better.",
        "Second-hand smoke",
        "A baby around smoke has more asthma, more chest infections and more ear infections. Smoking outside is not enough on its own, because smoke settles into clothes, hair, furniture and car seats. Ask anyone who smokes to change or wash before holding the baby, and keep the house and car smoke-free.",
        "Getting help",
        "There is real help for quitting, including counseling and, for tobacco, options safer in pregnancy than continuing to smoke. Ask at a prenatal visit."
      ]
    },
    "fish-mercury": {
      "title": "Fish",
      "sub": "What to eat, what to limit, what to skip",
      "t": [
        "Fish is one of the better things you can eat while pregnant. You do need to watch out for mercury.",
        "How much",
        "Two to three servings a week, about 8 to 12 ounces total. Oily fish are the main food source of DHA, which the baby uses to build brain and eyes.",
        "Eat freely, low in mercury",
        "Salmon, sardines, anchovies, herring, trout, tilapia, cod, catfish, pollock, canned light tuna, shrimp, crab, scallops, cooked oysters.",
        "Once a week at most",
        "Albacore or white tuna, halibut, grouper, Chilean sea bass, bluefish.",
        "Do not eat",
        "Shark, swordfish, king mackerel, tilefish from the Gulf of Mexico, marlin, orange roughy, bigeye tuna. These are large, long-lived predators and carry the most mercury.",
        "Cooking",
        "Cook to 145°F, until the flesh is opaque and flakes apart. Raw fish is generally a bad idea in pregnancy, and so is smoked fish from the refrigerated case unless you cook it into a dish. The risk there is listeria, not mercury.",
        "Fish you catch yourself",
        "Check your state advisory for those waters. The national lists do not cover local contamination."
      ]
    },
    "early-bleeding": {
      "title": "Bleeding and Pain in Early Pregnancy",
      "sub": "What is common, what is urgent, and ectopic pregnancy",
      "t": [
        "Spotting or light bleeding in the first 12 weeks is common: about 1 in 5 women have some. Often the pregnancy goes on normally. Sometimes it is the start of a miscarriage, and rarely it is a pregnancy growing outside the uterus (ectopic), which is an emergency.",
        "Go to the ER now if you have",
        "Bleeding that soaks through 1 pad in an hour · Bad pain in your belly, especially on one side · Pain at the tip of your shoulder · Dizziness or fainting · Fever with bleeding or cramping",
        "Call your family doctor, OB or midwife today if you have",
        "Any bleeding you have not told them about, even light · Cramping that gets worse · Tissue that you pass",
        "Until you are seen, use pads, not tampons, so you can see how much you are bleeding. Rest as much as you feel you need. Activity, work and sex do not cause miscarriage.",
        "Ectopic pregnancy",
        "About 1 to 2 in 100 pregnancies implant outside the uterus, almost always in a fallopian tube. It cannot grow into a baby, and as it grows it can burst the tube and bleed inside your belly. It usually shows up at 6 to 8 weeks. It is more likely if you had one before, had surgery on your tubes, had chlamydia or another pelvic infection, got pregnant with an IUD in place, or used IVF. Smoking raises the risk too. Found early, it is treated with a medicine (methotrexate) or with surgery.",
        "What your team will do",
        "Usually an ultrasound and a blood test for the pregnancy hormone (hCG). If it is too early to see the pregnancy on ultrasound, the blood test is repeated 2 days later: a level that does not rise as expected, with no pregnancy seen in the uterus, raises concern for ectopic. If your blood type is Rh negative, tell them, because you may need an Rh shot. Whether you need one depends on how far along you are and what is causing the bleeding.",
        "If it is a miscarriage",
        "About 1 in 10 of all known pregnancies end in miscarriage, most of them in the first 12 weeks. The chance is somewhat higher once there is bleeding, especially heavy bleeding. Most are caused by a chromosome problem that started at conception, not by anything you did. You can usually choose how it is managed: waiting for it to pass on its own, medicine to help it pass, or a short procedure. All three are safe; they differ in how long it takes and how much bleeding happens at home. Grief is normal, whatever the week. You can try again as soon as you feel ready."
      ]
    },
    "preeclampsia": {
      "title": "Preeclampsia",
      "sub": "Signs, risk, and the aspirin question",
      "t": [
        "A blood pressure condition that can come on fast, usually after 20 weeks and sometimes in the week or two after delivery. Catching it early genuinely changes how it ends.",
        "What it is",
        "High blood pressure plus signs that other organs are being affected, most often the kidneys or liver. It also reduces blood flow through the placenta, which is why it affects the baby's growth. Delivery is the only cure, so that conversation can move faster than you expect.",
        "Call your doctor today if you have",
        "A headache that will not go away · Vision changes: dark spots, flashing · Pain under the ribs on the right, or high in the stomach · Sudden swelling of the face or hands · Shortness of breath",
        "or any other sign your doctor told you to look out for.",
        "Higher risk if you have",
        "Preeclampsia before · Chronic high blood pressure, kidney disease or lupus · Diabetes · Twins or more · A first pregnancy · BMI over 30 · Age 35 or over · A mother or sister who had it.",
        "Low-dose aspirin",
        "ACOG recommends low-dose aspirin, 81 mg a day, for women at higher risk. It is usually started between 12 and 16 weeks and taken until delivery, and it lowers the chance of preeclampsia. Many women who qualify are never offered it. Ask your doctor whether it applies to you.",
        "It can also start after the birth",
        "Usually in the first week, with the same warning signs. If they turn up once you are home, call your doctor or go to the emergency room. Don't save it for the postpartum appointment."
      ]
    },
    "preterm-labor": {
      "title": "Early (Preterm) Labor",
      "sub": "Signs before 37 weeks, and what happens when you go in",
      "t": [
        "Labor before 37 weeks is early, or preterm. About 1 in 10 babies in the US are born early. Getting care fast gives your team time to help your baby.",
        "Go to labor and delivery now if you have any of these before 37 weeks",
        "Tightening or contractions every 10 minutes or more often, which is 6 or more in an hour · Cramps like a period · A low, dull backache that comes and goes · Pressure in your pelvis, like the baby is pushing down · Fluid leaking from your vagina · Bleeding or spotting · Discharge that changes and becomes watery, mucus-like or bloody",
        "Do not wait to see if it goes away. If you are not sure what you are feeling, call your family doctor, OB or midwife, or call labor and delivery.",
        "What happens when you go in",
        "The nurse watches your contractions and your baby's heartbeat, and your cervix is checked. You may have a swab test (fetal fibronectin) or an ultrasound that measures your cervix. Many women who go in with these signs turn out not to be in labor and go home the same day. That is a good visit, not a wasted one.",
        "If labor is really starting early",
        "Before 34 weeks, 2 steroid shots given a day apart help the baby's lungs and lower the chance of serious problems after birth. Before 32 weeks, magnesium through your IV helps protect the baby's brain. Medicine to slow contractions may be given for about 2 days so the steroids have time to work. You will also get antibiotics if your GBS result is positive or not known yet.",
        "Who is more likely to go into labor early",
        "A preterm birth before · A short cervix seen on ultrasound · Twins or more · Getting pregnant less than 18 months after your last birth · Smoking · Bleeding in pregnancy · High blood pressure or diabetes",
        "What helps, and what doesn't",
        "If your cervix is short on the anatomy ultrasound, vaginal progesterone lowers the chance of an early birth. Some women with a past preterm birth are offered a stitch in the cervix (cerclage). Bed rest does not prevent early labor, and it raises the risk of blood clots."
      ]
    },
    "cholestasis": {
      "title": "Itching and Cholestasis",
      "sub": "Normal itching, and the liver condition worth a blood test",
      "t": [
        "Some itching in pregnancy is normal, from stretching skin or dry skin. The itching of cholestasis of pregnancy (ICP), a liver condition, is different: it is often on the palms and the soles of the feet, worse at night, and there is no rash.",
        "Call your family doctor, OB or midwife if you have",
        "Itching on your palms or soles · Itching all over that keeps you awake · Dark urine or pale stools · Yellow skin or eyes",
        "What cholestasis is",
        "The liver slows the flow of bile, and bile acids build up in your blood. It affects about 1 in 200 to 1 in 300 pregnancies in the US, more often in Latina women and in pregnancies with twins. It usually starts after 30 weeks. It is not dangerous for you, but very high bile acids raise the chance of stillbirth, which is why it is worth a blood test.",
        "Testing and treatment",
        "A blood test for bile acids and liver tests. If you have it, the test is usually repeated every week or two. A medicine called ursodiol can ease the itching a little; it has not been shown to protect the baby. Cool showers, loose cotton clothes and moisturizer help the skin.",
        "Timing of birth",
        "Because the risk to the baby rises late in pregnancy, your team will plan delivery early: at about 36 weeks if bile acids are 100 µmol/L or higher, and usually between 36 and 39 weeks otherwise, depending on your levels.",
        "After the birth",
        "The itching usually goes away within days to a few weeks. If it does not, ask for your liver tests to be checked again. It often comes back in later pregnancies, in up to 9 in 10, and it can sometimes be triggered by birth control that contains estrogen, so tell your doctors you had it."
      ]
    },
    "antenatal-mental-health": {
      "title": "Mental Health During Pregnancy",
      "sub": "Anxiety, depression, and medications",
      "t": [
        "Depression and anxiety are about as common during pregnancy as after it.",
        "Worth telling someone",
        "Low mood most days · Losing interest in things you normally enjoy · Anxiety that will not switch off, or intrusive frightening thoughts · Not sleeping even when you have the chance · Feeling detached from the pregnancy · Any thought of harming yourself",
        "If you are feeling like harming yourself or others",
        "Call 911 or go to the ER now. You can also call or text 988, the Suicide & Crisis Lifeline, any time.",
        "Medicines",
        "Untreated and uncontrolled depression is not a safe option: it is linked with preterm birth, lower birthweight, and a much higher chance of postpartum depression. Many women have successful pregnancies without needing medication. Several SSRIs have decent pregnancy safety data and are prescribed routinely. If you stopped something the day you saw the positive test, tell your doctor so you can discuss your options.",
        "What else helps",
        "Talking therapy works, alone or alongside medication, and is worth asking for early because waiting lists are long. Be sure to talk to your doctor about and engage in the non-chemical aspects of depression and anxiety: good sleep, sunshine, exercise, community, therapy, prayer, etc. Morning sickness is an especially difficult time."
      ]
    },
    "discomfort-urinary": {
      "title": "Peeing More, Leaking, or Burning",
      "sub": "What is normal, and when it is an infection",
      "t": [
        "Peeing more often is normal: early in pregnancy because of hormones, and later because the baby presses on your bladder. Leaking a little when you cough, sneeze or laugh is common too. Burning is not normal. It usually means a bladder infection, which needs treatment.",
        "What helps",
        "Keep drinking. Cutting back on water does not cut the trips, and it makes infections more likely. Lean forward when you pee to empty your bladder all the way. Kegel exercises help with leaking: squeeze the pelvic floor for 3 to 5 seconds, then relax, 10 times, 3 times a day. Watery leaking that does not stop could be your water breaking: call labor and delivery.",
        "Bladder infections in pregnancy",
        "In pregnancy a bladder infection is more likely to travel up to the kidneys, so it is treated even when it is mild, with an antibiotic that is safe in pregnancy. A urine test at your first visit also looks for infection without symptoms, which is treated too.",
        "Call your family doctor, OB or midwife today if you have",
        "Burning or pain when you pee · Needing to go urgently but passing only a little · Blood in your urine · Cloudy or bad-smelling urine",
        "Go to the ER or labor and delivery now if you have",
        "Fever or chills with pain in your back or side · Vomiting with back or side pain: this can be a kidney infection."
      ]
    },
    "discomfort-head": {
      "title": "Headaches, Stuffy Nose, Nosebleeds and Bleeding Gums",
      "sub": "Common, and the one headache not to ignore",
      "t": [
        "More blood flow and pregnancy hormones swell the lining of your nose and gums, and can bring on headaches, especially in the first trimester.",
        "Headaches",
        "Rest, water, regular meals and keeping caffeine under 200 mg a day help. Acetaminophen (Tylenol) is the pain medicine to use in pregnancy, at the lowest dose that works, for the shortest time. Avoid ibuprofen and other NSAIDs, especially after 20 weeks, unless your doctor tells you otherwise.",
        "Stuffy nose and nosebleeds",
        "A blocked nose that lasts for weeks is common in pregnancy, and it is not a cold. Saline spray or rinses, a humidifier and sleeping with your head raised help, and nasal strips are fine. For a nosebleed, sit up, lean forward and pinch the soft part of your nose for 10 minutes. Ask before using decongestant pills or sprays.",
        "Bleeding gums",
        "Swollen gums that bleed when you brush are common. Use a soft brush, keep brushing and flossing, and see a dentist. Cleanings, X-rays and fillings with numbing medicine are all safe in pregnancy.",
        "Call your family doctor, OB or midwife today, or go in, if you have",
        "A headache that will not go away, or one with vision changes, especially after 20 weeks: this can be preeclampsia · The worst headache of your life, or one that comes on suddenly · A headache with fever and a stiff neck · A nosebleed that does not stop after 20 minutes of pressure"
      ]
    },
    "discomfort-bowel": {
      "title": "Constipation and Hemorrhoids",
      "sub": "What helps first, which medicines are fine, and when to be seen",
      "t": [
        "These two travel together. Pregnancy hormones slow your bowels, iron makes it worse, and straining pushes out the swollen veins that are hemorrhoids. Most improve after delivery.",
        "What helps first",
        "Work up toward 25 to 30 grams of fiber a day: fruit, vegetables, beans, lentils and whole grains. 2 green kiwis or about 10 prunes a day help many women. Drink water and walk every day. Go when you feel the urge, and do not sit and strain. A footstool that raises your knees changes the angle and makes a real difference. If your vitamin or iron pill is the problem, ask about one with less iron, or taking iron every other day.",
        "Medicines that are fine in pregnancy",
        "Start with a fiber supplement, psyllium (Metamucil) or methylcellulose (Citrucel), with plenty of water. If that is not enough, add polyethylene glycol (MiraLAX), 17 grams in a glass of liquid once a day. Docusate (Colace) is safe but works little better than nothing. Senna or bisacodyl are fine now and then, for a few days. Do not use mineral oil or castor oil.",
        "For hemorrhoids",
        "Witch hazel pads and a warm sitz bath for 10 to 15 minutes ease the itching and pain. A hydrocortisone cream for a few days is fine. Keeping your stools soft is what stops them coming back.",
        "Call your family doctor, OB or midwife if you have",
        "More than streaks of blood in your stool · A hard, very painful lump at your bottom · Several days without a bowel movement, with cramping · Bad belly pain, or vomiting",
        "Belly pain that comes and goes in a rhythm, bleeding from the vagina, or leaking fluid can be labor: call labor and delivery."
      ]
    },
    "discomfort-heartburn": {
      "title": "Heartburn",
      "sub": "Why it gets worse, and what is safe to take",
      "t": [
        "Pregnancy hormones relax the valve at the top of your stomach, and later the baby pushes up from below.",
        "What helps",
        "Very common, and worst near the end when there is simply no room left. Smaller meals, nothing within three hours of lying down, and raising the head of the bed rather than stacking pillows, which mostly bends you in the middle. Calcium carbonate antacids such as Tums are safe and count toward your calcium. If that is not enough, ask your doctor: famotidine and the proton pump inhibitors are both used in pregnancy.",
        "More you can try",
        "Sodium alginate tablets or capsules, taken after meals and at bedtime, form a layer that keeps acid down; sodium alginate should be the only ingredient listed. With 500 mg calcium chews, take no more than 5 a day, and take them at least 2 hours apart from iron or your prenatal vitamin. Do not use baking soda.",
        "Call your family doctor, OB or midwife if you have",
        "Heartburn that medicines do not help · Pain high in your belly or under your right ribs, especially after 20 weeks: this can be preeclampsia · Trouble swallowing, vomiting blood, or black stools"
      ]
    },
    "discomfort-aches": {
      "title": "Back, Hip and Round Ligament Pain",
      "sub": "Why it aches, what helps, and pain that is not normal",
      "t": [
        "Most aches in pregnancy come from a body changing shape quickly. They are uncomfortable, not dangerous.",
        "Back and pelvic pain",
        "Your center of gravity has moved forward and the ligaments have softened. A maternity support belt helps some people a lot. So does not standing propped on one hip, a pillow between the knees at night, and flat shoes. Physical therapy exists for this but you will probably need to ask for a referral.",
        "Round ligament pain",
        "A sharp catch low on one side when you stand up, roll over or cough, usually in the second trimester. The ligaments holding the uterus are stretching. Move into position more slowly, bend toward the pain when you cough, and try warmth. It is sharp but brief. Pain that stays, or comes with bleeding, fever or regular tightening, is something to call your doctor about, or go to the emergency department if you are bleeding.",
        "Medicines and other help",
        "Acetaminophen (Tylenol) is fine for pain, at the lowest dose that works, for the shortest time. Avoid ibuprofen and other NSAIDs, especially after 20 weeks. Heat packs, massage and exercise in water help too.",
        "Call your family doctor, OB or midwife if you have",
        "Back pain with fever, or with burning when you pee: this can be a kidney infection · A low backache or pelvic pressure that comes and goes in a rhythm before 37 weeks: this can be early labor · Pain with bleeding · Numbness or weakness in your legs"
      ]
    },
    "discomfort-sleep": {
      "title": "Sleep and Leg Cramps",
      "sub": "Sleeping position, cramps, and getting rest",
      "t": [
        "Sleep gets harder as pregnancy goes on: trips to the bathroom, heartburn, a busy baby and finding a comfortable position.",
        "Sleep position",
        "Side sleeping is advised in the second half, and the left side gets mentioned most, but either side is fine. What matters is not spending long stretches flat on your back. If you wake up on your back, just turn over. A pillow wedged behind you stops you rolling back.",
        "Leg cramps",
        "Sudden painful cramps in the calf, often at night, are common in the second half. Stretch the calf by pulling your toes up toward your knee, then walk around. Stretching before bed and drinking enough may help. The evidence for magnesium supplements is mixed, so ask before you take them.",
        "Other things that help",
        "Keep a regular bedtime, drink less in the last hour or two before bed, and treat heartburn. Doxylamine (Unisom SleepTabs) now and then is considered safe in pregnancy. Ask your doctor if you find you need it often.",
        "Call your family doctor, OB or midwife if you have",
        "Pain, swelling, warmth or redness in one calf that does not go away: this can be a blood clot · Loud snoring with pauses in your breathing, or bad sleepiness during the day · Many nights without sleep, or sleep kept away by worry or low mood"
      ]
    },
    "discomfort-swelling": {
      "title": "Swelling and Varicose Veins",
      "sub": "What is expected, and swelling that is not",
      "t": [
        "Your body holds more fluid in pregnancy, and the growing uterus slows the blood coming back from your legs.",
        "Swelling",
        "Puffy feet and ankles by the end of the day are expected. Put your legs up, avoid standing still for long stretches, and use compression stockings. Compression stockings come in different strengths or pressures, start low. Sudden swelling of the face or hands, or swelling in one calf that is painful or warm are reasons to call your doctor.",
        "Varicose veins",
        "Swollen, twisting veins in the legs, or in the vulva, are common and usually shrink after the birth. Compression stockings, putting your feet up, not crossing your legs and walking help, and sleeping on your side takes pressure off them. A hard, red, painful lump along a vein needs a call to your doctor.",
        "Go to the ER now if you have",
        "Chest pain or sudden shortness of breath, especially with a swollen leg"
      ]
    },
    "circumcision": {
      "title": "Circumcision",
      "sub": "What the evidence does and does not say",
      "t": [
        "A decision, not a medical instruction. Major medical bodies have read the same evidence and reached different conclusions.",
        "What the evidence shows",
        "The benefits are real but small: fewer urinary tract infections in the first year, a lower rate of some sexually transmitted infections in adulthood, and less penile cancer, which is rare either way. Complications occur in about 1 in 500, usually bleeding or infection, and are more common when it is done later than in the newborn period.",
        "Why guidance differs",
        "The American Academy of Pediatrics concluded the benefits outweigh the risks but not enough to recommend it for every boy. Several European bodies read the same studies and concluded otherwise. In practice this is a family decision, often shaped by religion, culture, and what the father looks like.",
        "If you decide to do it",
        "Ask about pain control specifically: a local anesthetic block, not sugar water alone. Effective options exist and are not used everywhere. Check what your insurance covers.",
        "If you decide not to",
        "Do not retract the foreskin. It is normally attached in infancy and separates on its own over several years; forcing it causes the scarring it is meant to prevent. Wipe the outside like any other skin."
      ]
    },
    "vitamin-d-drops": {
      "title": "Vitamin D for Breastfed Babies",
      "sub": "Why drops are recommended",
      "t": [
        "Breast milk is low in vitamin D in almost everyone. It is a known gap with a simple fix.",
        "What is recommended",
        "400 IU of vitamin D daily, starting in the first few days, for any baby who is breastfed or having mostly breast milk. Keep giving it until the baby drinks about 32 ounces (1 liter) a day of formula or, later, fortified milk, because those already have vitamin D added.",
        "A formula-fed baby taking a full quantity does not need extra. Combination feeding usually still does, since it depends how much formula is actually going in.",
        "Why it matters",
        "Vitamin D is what allows the body to absorb calcium and build bone. Real deficiency causes rickets, which is uncommon but has not gone away, and is more likely in babies with darker skin, at northern latitudes, and over the winter.",
        "Practical points",
        "Concentrated drops give the whole dose in a single drop, so read the label rather than assuming: products differ, and more is not better. Put it on the nipple just before a feed, or on a clean finger the baby is already sucking. Taking a high dose yourself to get vitamin D into the milk is an alternative some clinicians use, but it is a conversation to have rather than something to start on your own."
      ]
    },
    "car-seat": {
      "title": "Car Seats",
      "sub": "The short version",
      "t": [
        "You will not be discharged without one.",
        "Rear-facing, in the back seat, for as long as the seat allows, which is usually well past the first birthday and often past the second. Never in front of an active airbag.",
        "Harness straps come from at or below the shoulders when rear-facing, tight enough that you cannot pinch a fold of webbing at the collarbone. The chest clip sits level with the armpits, not on the belly.",
        "Nothing bulky underneath. A winter coat compresses in a crash and leaves the harness loose. Dress the baby thinly, buckle up, then put the coat or a blanket over the top.",
        "No aftermarket inserts, padding or strap covers that did not come with the seat, because they were not crash tested with it.",
        "Check the expiration date stamped on the shell, and do not use a seat that has been in a crash or whose history you do not know.",
        "Get the fit checked",
        "A large share of seats are installed wrong, and it is not obvious from looking. Most fire departments and many hospitals will check it for free. Do it a few weeks before the due date, not after."
      ]
    }
  }
};
