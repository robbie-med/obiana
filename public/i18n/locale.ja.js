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
      "title": "Obiana 妊娠ハンドブック"
    },
    "lang": {
      "unreviewedNotice": "機械で翻訳したもので、まだ医師の確認を受けていません。分かりにくいところは担当の医療チームに聞いてください。",
      "loadFailed": "読み込めませんでした",
      "inProgress": "翻訳作業中"
    },
    "usNotice": {
      "title": "アメリカでの妊婦健診について",
      "body": "Obiana はアメリカの妊婦健診に沿っています。ほかの国では健診、検査、助言が異なることがあります。",
      "continue": "理解しました"
    },
    "tools": {
      "helpUsImprove": "改善にご協力ください"
    },
    "home": {
      "heroTitle": "これから何が<br>起きるかを知り、<br>良い質問を。"
    },
    "disclaimer": {
      "title": "はじめる前に",
      "education": "これは一般的な情報で、医学的な助言ではありません。ご自身の妊娠については、家庭医、産科医、助産師に聞いてください。",
      "tools": "記録ツールは入力した内容を保存するだけで、何も診断できません。",
      "emergency": "緊急時は 911 に電話してください。",
      "continue": "理解しました"
    },
    "about": {
      "whatThisIs": "Obiana について",
      "privacyHeading": "あなたの情報",
      "privacyOnDevice": "入力した内容はこの端末に残ります。アカウントもログインもなく、何も送信されません。ブラウザのデータを消すと失われるので、エクスポートで控えを保存してください。",
      "privacySubmit": "何かを送信するボタンは2つだけです。翻訳を手伝うと、この手引きの改善です。書いた内容、国、迷惑防止のために変換したネットワークアドレスを送ります。名前や記録の内容は決して送りません。"
    }
  }
};
