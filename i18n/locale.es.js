// ═══════════════════════════════════════════════════════
// LOCALE: es
// ═══════════════════════════════════════════════════════
// STUB. Only the strings below are translated; every other key falls back to
// English at runtime, so the app stays fully usable while translation is in
// progress. Adding a key here overrides the English one — nothing else needed.
//
// reviewed:false drives the machine-translation notice in the UI.
// No `epds` key => the Edinburgh scale is gated off for this language until
// an OFFICIAL validated translation is added. Do not machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.es = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Guía de Embarazo y Parto"
    },
    "lang": {
      "unreviewedNotice": "Esta traducción es automática y aún no ha sido revisada por un profesional médico. Para decisiones médicas, confirme con su equipo de atención o cambie a inglés.",
      "loadFailed": "No se pudo cargar",
      "inProgress": "Traducción en curso"
    }
  }
};
