// ═══════════════════════════════════════════════════════
// LOCALE: ru
// ═══════════════════════════════════════════════════════
// STUB. Only the strings below are translated; every other key falls back to
// English at runtime, so the app stays fully usable while translation is in
// progress. Adding a key here overrides the English one — nothing else needed.
//
// reviewed:false drives the machine-translation notice in the UI.
// No `epds` key => the Edinburgh scale is gated off for this language until
// an OFFICIAL validated translation is added. Do not machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.ru = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Руководство по беременности и родам"
    },
    "lang": {
      "unreviewedNotice": "Этот перевод выполнен машиной и ещё не проверен медицинским специалистом. Для медицинских решений уточните у своей медицинской команды или переключитесь на английский.",
      "loadFailed": "Не удалось загрузить",
      "inProgress": "Перевод в процессе"
    }
  }
};
