// ═══════════════════════════════════════════════════════
// LOCALE: ko
// ═══════════════════════════════════════════════════════
// STUB. Only the strings below are translated; every other key falls back to
// English at runtime, so the app stays fully usable while translation is in
// progress. Adding a key here overrides the English one — nothing else needed.
//
// reviewed:false drives the machine-translation notice in the UI.
// No `epds` key => the Edinburgh scale is gated off for this language until
// an OFFICIAL validated translation is added. Do not machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.ko = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "임신·출산 가이드"
    },
    "lang": {
      "unreviewedNotice": "이 번역은 기계 번역이며 아직 의료진의 검토를 거치지 않았습니다. 의학적 결정을 내리기 전에 의료진에게 확인하시거나 영어로 전환하세요.",
      "loadFailed": "불러오지 못했습니다",
      "inProgress": "번역 진행 중"
    }
  }
};
