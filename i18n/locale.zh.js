// ═══════════════════════════════════════════════════════
// LOCALE: zh
// ═══════════════════════════════════════════════════════
// STUB. Only the strings below are translated; every other key falls back to
// English at runtime, so the app stays fully usable while translation is in
// progress. Adding a key here overrides the English one — nothing else needed.
//
// reviewed:false drives the machine-translation notice in the UI.
// No `epds` key => the Edinburgh scale is gated off for this language until
// an OFFICIAL validated translation is added. Do not machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.zh = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "怀孕与分娩指南"
    },
    "lang": {
      "unreviewedNotice": "此翻译由机器生成，尚未经过医务人员审核。做出医疗决定前，请与您的医疗团队确认，或切换到英文。",
      "loadFailed": "加载失败",
      "inProgress": "翻译进行中"
    }
  }
};
