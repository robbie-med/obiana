// ═══════════════════════════════════════════════════════
// LOCALE: ps
// ═══════════════════════════════════════════════════════
// STUB. Only these strings are translated; every other key falls back to
// English at runtime, so the app is fully usable while translation proceeds.
//
// reviewed:false drives the machine-translation notice shown to the patient.
// No `epds` key => the mood screen is gated off for this language until an
// OFFICIAL validated instrument is added. Never machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.ps = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Obiana د امیندوارۍ لارښود"
    },
    "lang": {
      "unreviewedNotice": "دا ماشین ژباړلې ده، او تر اوسه ډاکټر نه ده کتلې. که څه روښانه نه وي، له خپل روغتیايي ټیم وپوښتئ.",
      "loadFailed": "نه شو پورته کولی",
      "inProgress": "ژباړه روانه ده"
    },
    "usNotice": {
      "title": "په متحده ایالاتو کې پاملرنه",
      "body": "Obiana د امریکا د امیندوارۍ پاملرنه تعقیبوي. په نورو هېوادونو کې لیدنې، ازموینې او مشورې توپیر کولی شي.",
      "continue": "پوه شوم"
    },
    "tools": {
      "helpUsImprove": "موږ سره د ښه کولو کې مرسته وکړئ"
    },
    "home": {
      "heroTitle": "پوه شئ چې څه<br>په تمه دي. ښې<br>پوښتنې وکړئ."
    },
    "disclaimer": {
      "title": "له پیل کولو مخکې",
      "education": "دا عمومي معلومات دي، طبي مشوره نه ده. د خپلې امیندوارۍ په اړه له خپل د کورنۍ ډاکټر، د ولادت ډاکټر یا قابلې وپوښتئ.",
      "tools": "ثبتونه یوازې هغه څه ساتي چې تاسو یې لیکئ. هېڅ شی نشي تشخیصولی.",
      "emergency": "په بیړني حالت کې، 911 ته زنګ ووهئ.",
      "continue": "پوه شوم"
    },
    "about": {
      "whatThisIs": "Obiana څه دی",
      "privacyHeading": "ستاسو معلومات",
      "privacyOnDevice": "هغه څه چې تاسو یې لیکئ په همدې تلیفون کې پاتې کیږي. نه حساب، نه ننوتل، او هیڅ نه لیږل کیږي. د براوزر معلومات پاکول یې له منځه وړي، نو د یوې کاپي ساتلو لپاره صادرول وکاروئ.",
      "privacySubmit": "یوازې دوه تڼۍ یو څه لیږي: په ژباړه کې مرسته او دې لارښود ته د ښه والي مرسته. هغه څه چې تاسو لیکلي، ستاسو هېواد، او د سپیم مخنیوي لپاره کوډ شوې د شبکې پته لیږي. هېڅکله ستاسو نوم یا ستاسو د ثبتونو منځپانګه نه."
    }
  }
};
