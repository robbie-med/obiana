// ═══════════════════════════════════════════════════════
// LOCALE: ja
// ═══════════════════════════════════════════════════════
// STUB. Only these strings are translated; every other key falls back to
// English at runtime, so the app is fully usable while translation proceeds.
//
// reviewed:false drives the machine-translation notice shown to the patient.
// No `epds` key => the mood screen is gated off for this language until an
// OFFICIAL validated instrument is added. Never machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.ja = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "妊娠ハンドブック"
    },
    "lang": {
      "unreviewedNotice": "この翻訳は機械翻訳であり、まだ医療者の確認を受けていません。医療上の判断については、担当の医療チームに確認するか、英語に切り替えてください。",
      "loadFailed": "読み込めませんでした",
      "inProgress": "翻訳作業中"
    },
    "usNotice": {
      "title": "アメリカでの妊婦健診について",
      "body": "このガイドは、アメリカで提供されている妊婦健診について説明しており、アメリカで健診を受けている方に向けて書かれています。妊婦健診の内容は国によって大きく異なります。他の国での健診の間隔、検査、推奨事項は、ここに書かれている内容と一致しないことがあります。他の国で健診を受けている場合、このアプリはおそらく適していません。",
      "continue": "理解しました"
    },
    "tools": {
      "helpUsImprove": "改善にご協力ください"
    }
  }
};
