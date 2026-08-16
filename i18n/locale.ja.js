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
    },
    "home": {
      "heroTitle": "これから何が<br>起きるかを知り、<br>良い質問を。",
      "heroDesc": "初回の妊婦健診から出産、産後の回復まで、Obianaがすべてを一つにまとめます。"
    },
    "disclaimer": {
      "title": "はじめる前に",
      "education": "Obiana は一般的な経過を説明します。医学的な助言ではありません。あなた自身やあなたの妊娠のことは分かりません。分かるのは主治医や助産師です。",
      "tools": "記録ツールは入力した内容を保存するだけです。測定も診断もしません。連絡するように表示されたときは、相談するという意味です。",
      "emergency": "緊急時にこのアプリを使わないでください。911 または分娩室に電話してください。",
      "sources": "この手引きが数値を示すときは、その出典も示します。多くは ACOG または AAP です。あなたの医療チームも同じ基準に従っています。",
      "continue": "理解しました",
      "toolsNote": "これらのツールは入力内容を保存します。診断はしません。"
    },
    "about": {
      "whatThisIs": "Obiana について",
      "privacyHeading": "あなたの情報",
      "privacyOnDevice": "入力した内容はこの端末に残ります。アカウントもログインもなく、何も送信されません。ブラウザのデータを消すと失われるので、エクスポートで控えを保存してください。",
      "privacySubmit": "送信するボタンは2つだけです。翻訳ヘルパーと、この手引きの改善です。入力した内容、国、迷惑防止のために変換したネットワークアドレスを送ります。名前は送りません。記録の内容も送りません。"
    }
  }
};
