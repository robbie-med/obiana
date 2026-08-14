// ═══════════════════════════════════════════════════════
// LOCALE: tl
// ═══════════════════════════════════════════════════════
// STUB. Only these strings are translated; every other key falls back to
// English at runtime, so the app is fully usable while translation proceeds.
//
// reviewed:false drives the machine-translation notice shown to the patient.
// No `epds` key => the mood screen is gated off for this language until an
// OFFICIAL validated instrument is added. Never machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.tl = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Handbook sa Pagbubuntis"
    },
    "lang": {
      "unreviewedNotice": "Ang pagsasaling ito ay gawa ng makina at hindi pa nasusuri ng isang clinician. Para sa mga desisyong medikal, kumpirmahin sa inyong care team o lumipat sa Ingles.",
      "loadFailed": "Hindi ma-load",
      "inProgress": "Isinasalin pa"
    },
    "usNotice": {
      "title": "Pangangalaga sa Estados Unidos",
      "body": "Inilalarawan ng gabay na ito ang prenatal care na ibinibigay sa Estados Unidos, at isinulat para sa mga inang nagpapaalaga rito. Malaki ang pagkakaiba ng prenatal care sa bawat bansa. Ang iskedyul ng pagpapatingin, mga pagsusuri at rekomendasyon sa ibang lugar ay maaaring hindi tumugma sa nababasa ninyo rito. Kung nagpapaalaga kayo sa ibang bansa, malamang na hindi para sa inyo ang app na ito.",
      "continue": "Naiintindihan ko"
    },
    "tools": {
      "helpUsImprove": "Tulungan Kaming Bumuti"
    }
  }
};
