// ═══════════════════════════════════════════════════════
// LOCALE: zom
// ═══════════════════════════════════════════════════════
// STUB. Only the strings below are translated; every other key falls back to
// English at runtime, so the app stays fully usable while translation is in
// progress. Adding a key here overrides the English one — nothing else needed.
//
// reviewed:false drives the machine-translation notice in the UI.
// No `epds` key => the Edinburgh scale is gated off for this language until
// an OFFICIAL validated translation is added. Do not machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.zom = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Obiana Pregnancy Handbook",
      "tagline": ""
    },
    "lang": {
      "unreviewedNotice": "This translation is not ready yet. The guide is shown in English. Please ask your care team if you need help reading it.",
      "loadFailed": "Could not load",
      "inProgress": "Translation in progress"
    },
    "home": {
      "heroDesc": "From your first prenatal visit through delivery and recovery, Obiana keeps everything in one place."
    },
    "usNotice": {
      "title": "Care in the United States",
      "body": "This guide describes prenatal care as it is provided in the United States, and is written for mothers receiving their care here. Prenatal care differs a great deal between countries. Visit schedules, tests and recommendations elsewhere may not match what you read here. If you are receiving care in another country, this app probably isn’t for you.",
      "continue": "I understand"
    },
    "tools": {
      "helpUsImprove": "Help Us Improve"
    },
    "faq": {
      "badgeFaq": "Dotna a ki dong zel te",
      "badgeMyth": "Upmawh thu khiat na",
      "section5": "Khen 5 na",
      "faqCommonMyths": "Dotna a ki dong zel te leh Upmawh thu khiat na te"
    },
    "section": {
      "pregnancy": "Naungek suah ma tawh kisai",
      "labor": "Naungek hingh na leh a suahna",
      "recovery": "Pian nung a dam kik na",
      "baby": "Naungek suak tuung",
      "faq": "Dotna a ki dong zel te"
    },
    "search": {
      "noResultsTitle": "Na zon bang mah ki mu lo.",
      "noResultsHint": "Zonna thumal dangte zang in. \"Epidural,\" \"naulaai don na,\" a hih kei leh \"sisan luanna\" cih dan te.",
      "label": "Thupi khempeuh zong in.",
      "clear": "Zon na phiat khia."
    },
    "myinfo": {
      "namePlaceholder": "Min",
      "phonePlaceholder": "Na phone nambat",
      "call": "Ho pih",
      "text": "Lai khak",
      "contact": {
        "familydoc": "Innkuan Siavuan",
        "ob": "Naupaai en Siavuan/ Naungek suak huh Siamah",
        "peds": "Naupang Siavuan",
        "mfm": "Naupaai lau huai a en Siavuan",
        "lactation": "Naungek nawipiak dan hilh Sia/Siamah",
        "ld": "Zato innpi/ Naungek hingh na leh a suahna khan a masa a etna",
        "pharmacy": "Zatui zuak na"
      },
      "detail": {
        "edd": {
          "label": "Nau suah ding ni",
          "placeholder": "gen teh na, July 15, 2026"
        },
        "bloodtype": {
          "label": "Si nam leh a RH Factor",
          "placeholder": "gen teh na: O positive (O+)"
        },
        "gbs": {
          "label": "GBS dinmun",
          "placeholder": "Positive / Negative / Ki test nai lo"
        },
        "allergies": {
          "label": "Zatui ki lem loh pih",
          "placeholder": "gen teh na: Penicillin"
        },
        "insurance": {
          "label": "Insurance / Member ID nambat",
          "placeholder": "Zato innpi ah a man in et theih pak ding"
        }
      },
      "myInformation": "Kei thu te",
      "myCareTeamKeyDetails": "Kei ong khual te leh thupi pawl khat",
      "savedOnYourPhoneTap": "Phone ah kep na. Call ding a hih kei leh lai khak ding mek in.",
      "careTeamContacts": "Ong khual team te ii kizop na contact te",
      "myPregnancyDetails": "Ka naupaai na thu te",
      "questionsForMyDoctor": "Ka Siavuan a ding dotna tuam tuam te",
      "saveMyInformation": "Ka thu te ciap teh na.",
      "exportData": "Data te puak khia",
      "saved": "Ki khol ta!",
      "notesPlaceholder": "Dot na te na ngaih sut kawm in hiah at in...",
      "importData": "Data Lutsak",
      "importConfirm": "Hih file ah a ki khol sa van te na la kik nuam hia? Hih app sungah min ki bang tawh om khin khempeuh a thak in ki laih ding hi.",
      "notesLabel": "Nong pai kik ciang a ding dotna te",
      "callContact": "{name} Ho in",
      "textContact": "{name} Lai khak"
    },
    "toast": {
      "contactsSaved": "Contact te na phone ah ki khol khin",
      "appInstalled": "App install khin! Na Home Screen pan in ki hong thei den hi.",
      "dataExported": "Data te puak khia khin!",
      "appUpdated": "App a thak hi khin. A thakpen version ding in reload in.",
      "importDone": "Data puahkik khin.",
      "importFailed": "Hih file ki sim thei lo hi.",
      "importNothing": "Hih file sungah app data ki mu lo."
    },
    "tool": {
      "mood": {
        "unavailableTitle": "Hih pau in Mood check-in ngah thei lo.",
        "unavailableBody": "Hih questionnaire pen screening tool ding a ki sam khat hi. A matpiak dan pen, a pau in official tak in validate hi a, na pau bek ah a khiat na nei hi.",
        "qCounter": "Dotna {n} in {total} lakpan",
        "answerAll": "Hehpih na tawh dot na {total} dawng in.",
        "interpLow": "Lunghi mawh na tawm",
        "interpConcern": "Na Siavuan tawh ki kup ding thupi mahmah.",
        "interpHigh": "Hehpihna tawh na Siavuan na hopih in.",
        "yourAnswersAreSavedOnly": "Na dawn na te hih phone sung bek ah ki khol hi.",
        "getMyScore": "Ka mat te en ding.",
        "edinburghPostnatalDepressionScale": "Edinburgh Nausuak khit Nute Lungkham na Etna",
        "chooseLanguage": "Pau nam na dawn nop pen tel in:",
        "validatedOnlyNote": "Hih questionnaire pen official-in validated a hih version bekbek om hi. Machine translation zangin score ki mu thei veve hi, ai hang tu a score pen a khiatna tak tak neilo hi.",
        "instrumentLanguage": "Questionnaire pau:",
        "change": "Laih",
        "scoreNote": "{instrument} questionnaire ah, score mat lak pan {max} hi ta, hih questionnaire a ding published cutoffs in ki zang hi. Hih pen screening tool bek hi, diagnosis hi het lo hi. Hih result pen nang ong en te tawh en kik khawm in ki kum un.",
        "pastCheckIns": "A beisa check-in te",
        "selfHarmGuidance": "Nang-leh-nang ki natsak nop na ngaihsut na nei ngei in dawng teh. Na Siavuan te tawh na ki zom in, 988 (Suicide & Crisis Lifeline) te ho pih, lai khak, ahihkeileh emergency room naai pen ah na pai in."
      }
    }
  }
};
