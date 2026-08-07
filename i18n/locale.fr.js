// ═══════════════════════════════════════════════════════
// LOCALE: fr
// ═══════════════════════════════════════════════════════
// STUB. Only the strings below are translated; every other key falls back to
// English at runtime, so the app stays fully usable while translation is in
// progress. Adding a key here overrides the English one — nothing else needed.
//
// reviewed:false drives the machine-translation notice in the UI.
// No `epds` key => the Edinburgh scale is gated off for this language until
// an OFFICIAL validated translation is added. Do not machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.fr = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Guide de Grossesse et Naissance"
    },
    "lang": {
      "unreviewedNotice": "Cette traduction est automatique et n’a pas encore été vérifiée par un professionnel de santé. Pour toute décision médicale, confirmez avec votre équipe soignante ou passez à l’anglais.",
      "loadFailed": "Échec du chargement",
      "inProgress": "Traduction en cours"
    }
  }
};
