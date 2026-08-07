// ═══════════════════════════════════════════════════════
// LOCALE: ar
// ═══════════════════════════════════════════════════════
// STUB. Only the strings below are translated; every other key falls back to
// English at runtime, so the app stays fully usable while translation is in
// progress. Adding a key here overrides the English one — nothing else needed.
//
// reviewed:false drives the machine-translation notice in the UI.
// No `epds` key => the Edinburgh scale is gated off for this language until
// an OFFICIAL validated translation is added. Do not machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.ar = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "دليل الحمل والولادة"
    },
    "lang": {
      "unreviewedNotice": "هذه الترجمة آلية ولم تتم مراجعتها بعد من قبل مختص طبي. لاتخاذ القرارات الطبية، يرجى التأكد من فريق الرعاية أو التبديل إلى الإنجليزية.",
      "loadFailed": "فشل التحميل",
      "inProgress": "الترجمة قيد التنفيذ"
    }
  }
};
