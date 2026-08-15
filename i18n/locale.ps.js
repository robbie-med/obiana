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
      "unreviewedNotice": "دا ژباړه ماشیني ده او تر اوسه یې کوم روغتیایي مسلکي کس نه ده کتلې. د طبي پریکړو لپاره، مهرباني وکړئ له خپلې پاملرنې ډلې سره یې تایید کړئ یا انګلیسي ته یې بدل کړئ.",
      "loadFailed": "نه شو پورته کولی",
      "inProgress": "ژباړه روانه ده"
    },
    "usNotice": {
      "title": "په متحده ایالاتو کې پاملرنه",
      "body": "دا لارښود هغه د زیږون دمخه پاملرنه بیانوي چې په متحده ایالاتو کې وړاندې کیږي، او هغو میندو ته لیکل شوی چې دلته پاملرنه ترلاسه کوي. د زیږون دمخه پاملرنه په هیوادونو کې ډېره توپیر لري. په نورو ځایونو کې د لیدنو مهالویش، معاینات او سپارښتنې ممکن له هغه سره سمون ونه لري چې تاسو یې دلته لولئ. که تاسو په بل هیواد کې پاملرنه ترلاسه کوئ، ښایي دا اپلیکیشن ستاسو لپاره نه وي.",
      "continue": "پوه شوم"
    },
    "tools": {
      "helpUsImprove": "موږ سره د ښه کولو کې مرسته وکړئ"
    },
    "home": {
      "heroTitle": "پوه شئ چې څه<br>په تمه دي. ښې<br>پوښتنې وکړئ.",
      "heroDesc": "د امیندوارۍ له لومړۍ معاینې څخه تر زېږون او روغتیا ترلاسه کولو پورې، Obiana هر څه په یوه ځای کې ساتي."
    }
  }
};
