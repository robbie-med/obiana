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
      "title": "Pregnancy Handbook",
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
      "body": "This guide describes prenatal care as it is provided in the United States, and is written for mothers receiving their care here. Prenatal care differs a great deal between countries. Visit schedules, tests and recommendations elsewhere may not match what you read here. If you are receiving care in another country, follow the guidance of your own care team.",
      "continue": "I understand"
    }
  }
};
