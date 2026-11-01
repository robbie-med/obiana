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
      "title": "Obiana 妊娠ハンドブック",
      "prenatal": "妊娠中",
      "labor": "出産",
      "recovery": "産後",
      "baby": "赤ちゃん"
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
      "helpUsImprove": "改善にご協力ください",
      "contractionTimer": "陣痛タイマー"
    },
    "home": {
      "heroTitle": "これから何が<br>起きるかを知り、<br>良い質問を。",
      "duringPregnancy": "妊娠中",
      "callYourDoctorIf": "次のときは家庭医、産科医、助産師に電話…",
      "vaginalBleeding": "性器からの出血",
      "fluidGushingOrTrickling": "水が流れ出る、または少しずつ漏れる",
      "babyNotMovingNormally": "赤ちゃんがいつものように動かない",
      "severeHeadache": "ひどい頭痛",
      "visionChanges": "見え方の変化",
      "suddenSwellingOfFaceHands": "顔や手の急なむくみ",
      "fever1004F": "発熱 &gt;100.4°F",
      "contractionsBefore37Weeks": "37週より前の陣痛"
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
    },
    "urgent": {
      "title": "連絡するとき",
      "call911": "911に電話",
      "callLd": "分娩室に電話",
      "addLd": "「わたし」に分娩室の電話番号を追加してください。",
      "tellThem": "この1年以内に出産した人は、電話する相手や受診先に必ず伝えてください。スタッフが知らないと、産後の重い問題が見落とされることがあります。",
      "helpLines": "相談窓口：無料、いつでも",
      "line988": "自分を傷つけたい気持ちがある、または危機のとき：988（自殺・危機ライフライン）に電話かテキストを。",
      "lineMama": "妊娠中や産後に、落ち込む、不安、つらいと感じたら：全米母親メンタルヘルス・ホットライン（National Maternal Mental Health Hotline）、1-833-TLC-MAMA（1-833-852-6262）。電話またはテキスト。多言語の通訳あり。",
      "linePoison": "あなたや赤ちゃんが何かを飲み込んだとき：中毒センター（Poison Control）、1-800-222-1222。",
      "lineDv": "家が安全でないとき：全米DVホットライン（National Domestic Violence Hotline）、1-800-799-7233、または88788に START とテキスト。",
      "call": "電話",
      "text": "テキスト"
    },
    "nav": {
      "prenatal": "妊婦<br>健診",
      "labor": "陣痛 &amp;<br>出産",
      "recovery": "産後の<br>回復",
      "baby": "あなたの<br>赤ちゃん",
      "toolsTrackers": "ツール &amp;<br>記録",
      "today": "今日",
      "guide": "ガイド",
      "urgent": "連絡するとき",
      "me": "わたし"
    },
    "today": {
      "whereNow": "いまはどの時期ですか？",
      "pregnant": "妊娠中です",
      "dueLabel": "出産予定日",
      "babyHere": "赤ちゃんが生まれました",
      "bornLabel": "赤ちゃんの誕生日",
      "save": "次にすることを見る",
      "savedOnPhone": "この情報はこの電話の中だけに保存されます。「わたし」でいつでも変えられます。",
      "week": "{week}週",
      "due": "予定日 {date}",
      "babyDays": {
        "other": "赤ちゃんは生後{count}日"
      },
      "babyWeeks": {
        "other": "赤ちゃんは生後{count}週"
      },
      "visitsNow": "いまの健診で",
      "comingUp": "これから",
      "allVisits": "すべての健診を週ごとに",
      "toolsNow": "いま役立つもの",
      "changeDates": "日付を変える"
    },
    "visits": {
      "title": "週ごとの健診",
      "sub": "健診ごとに何をするか、何を自分で決めるか",
      "lead": "これはアメリカでの通常の予定です。あなたの予定は違うこともあります。必要に応じて、家庭医、産科医、助産師が健診や検査を追加します。",
      "afterBirth": "出産のあと",
      "yourChoice": "あなたが決めること",
      "first": {
        "when": "8–10週ごろ",
        "title": "初診",
        "i1": "出産予定日は最後の月経から決め、早い時期の超音波をあわせて使うことがよくあります。",
        "i2": "血液検査：血液型と Rh、血球数、風疹と水ぼうそうの免疫、B型・C型肝炎、HIV、梅毒。尿検査、クラミジアと淋病の検査。",
        "i3": "前の妊娠で糖尿病があった人や、ほかにリスクがある人は、早めに血糖の検査をします。",
        "i4": "妊娠高血圧腎症のリスクが高い人は、12週から低用量アスピリン（1日81 mg）でそのリスクが下がります。自分に合うか聞いてください。"
      },
      "genetic": {
        "when": "10週から",
        "title": "赤ちゃんの検査",
        "i1": "10週からの血液検査（セルフリーDNA）で、ダウン症候群やいくつかの病気をスクリーニングします。スクリーニングは診断ではありません。陽性なら確定診断の検査をすすめられます。",
        "i2": "保因者検査では、嚢胞性線維症や脊髄性筋萎縮症などの遺伝子を持っているかを調べます。",
        "i3": "これらの検査は、全部受けても、一部だけでも、受けなくてもかまいません。"
      },
      "monthly": {
        "when": "28週まで4週ごと",
        "title": "定期健診",
        "i1": "血圧、体重、尿、赤ちゃんの心拍。20週ごろからはお腹の大きさも測ります。"
      },
      "anatomy": {
        "when": "18–22週",
        "title": "胎児の詳しい超音波",
        "i1": "赤ちゃんの体、成長、胎盤をくわしく見ます。希望すれば、たいてい性別もわかります。"
      },
      "sugar": {
        "when": "24–28週",
        "title": "血糖の検査と血液検査",
        "i1": "甘い飲み物を飲み、1時間後に採血して、妊娠糖尿病を調べます。",
        "i2": "貧血を見る血球数の検査と、梅毒の再検査。",
        "i3": "血液型が Rh マイナスなら：28週ごろに Rh の注射（RhoGAM）。"
      },
      "tdap": {
        "when": "27–36週",
        "title": "百日ぜきのワクチン（Tdap）",
        "i1": "あなたの抗体が赤ちゃんに移り、赤ちゃんが自分で予防接種を受けられるまでの最初の数か月を守ります。妊娠のたびに受けます。"
      },
      "twoweekly": {
        "when": "28週から2週ごと",
        "title": "健診の間隔が短くなります",
        "i1": "赤ちゃんのふだんの動き方を知っておきましょう。胎動を数えるかどうかは自由です。いつもより動きが少ないときは、その日のうちに電話を。次の健診まで待たないでください。",
        "i2": "高血圧や糖尿病などがある人は、赤ちゃんの追加の検査（ノンストレステストや超音波）が32週ごろから始まることがよくあります。"
      },
      "rsv": {
        "when": "32–36週、9月から1月",
        "title": "赤ちゃんのためのRSV予防",
        "i1": "32–36週にあなたがRSVワクチンを受けるか、生まれたあと赤ちゃんが抗体の注射を受けるかのどちらかです。両方ではなく、どちらか一方。どちらも、最初の冬に赤ちゃんがRSVで入院する可能性を下げます。"
      },
      "gbs": {
        "when": "36–37週",
        "title": "B群溶連菌の検査と、赤ちゃんの向き",
        "i1": "腟と肛門を綿棒でぬぐいます。女性の約4人に1人が GBS を持っていますが、あなたには害はありません。陽性なら、赤ちゃんを守るためにお産中に点滴で抗生物質を使います。",
        "i2": "赤ちゃんの頭が下になっているかを確認します。おしりが下（逆子）なら、赤ちゃんを回す方法（外回転術）をすすめられるか、帝王切開を計画することができます。",
        "i3": "バースプランを見直しましょう：痛みの和らげ方、誰がそばにいるか、授乳。"
      },
      "weekly": {
        "when": "36週から毎週",
        "title": "最後の数週間",
        "i1": "38週から卵膜剥離をすすめられることがあります。子宮の入り口を指でなでて、お産が始まるのを助ける方法です。",
        "i2": "39週から誘発分娩をすすめられることがあります。41週になると、赤ちゃんのリスクが上がり始めるので、すすめられます。"
      },
      "ppBp": {
        "when": "出産後3–10日",
        "title": "血圧が高かった人は血圧チェック",
        "i1": "高血圧や妊娠高血圧腎症があった人は、出産後3〜10日のうちに血圧を測ってもらいましょう。妊娠高血圧腎症は出産後に始まったり悪くなったりすることがあります。"
      },
      "pp3": {
        "when": "出産後3週間以内",
        "title": "最初のチェック",
        "i1": "家庭医、産科医、助産師に、出血、痛み、授乳、気分、睡眠について話しましょう。電話やビデオ通話でもかまいません。"
      },
      "ppFull": {
        "when": "出産後12週までに、多くは4–6週",
        "title": "産後の総合健診",
        "i1": "気分のチェック、避妊、回復の具合、次の妊娠の予定。",
        "i2": "妊娠糖尿病があった人：出産後4〜12週に血糖の検査を。2型糖尿病のリスクは一生高いままなので、1〜3年ごとに検査を頼みましょう。",
        "i3": "尿や便がもれる、性交時に痛む、腟に何かが出てくる感じがあるときは、骨盤底の理学療法について聞いてください。効果があります。がまんしなくていいのです。"
      }
    }
  },
  "content": {
    "postpartum-danger": {
      "title": "",
      "sub": "",
      "t": [
        "次のときは救急外来へ、または911に電話",
        "胸の痛みや息苦しさ · けいれん · これまでにない突然のひどい頭痛 · 脳卒中の症状（顔のゆがみ、腕の力が入らない、ろれつが回らない） · 自分や赤ちゃんを傷つけたい気持ち",
        "次のときは家庭医、産科医、助産師に電話",
        "発熱 &gt;100.4°F · 1時間でナプキン1枚がびっしょりになる · イブプロフェンやタイレノールで治まらないひどい頭痛 · 見え方の変化 · 脚の赤み、腫れ、熱っぽさ（DVT、深部静脈血栓） · 傷が開く、赤みが広がる、膿が出る · 尿が出にくい · 産後うつ（PPD）や不安のサイン",
        ""
      ]
    },
    "signs-of-labor": {
      "title": "",
      "sub": "",
      "t": [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "5-1-1ルール（初めての出産）",
        "陣痛が次のようになったら病院へ：",
        "5分おき、1回1分続き、それが1時間以上",
        "。2人目以降は早めに。お産が早く進むので、6–8分おきになったら電話してください。",
        "次のどれかがあれば、すぐに病院へ",
        "破水",
        "（どっと出る、または漏れ続ける） · 鮮やかな赤い出血（少量の出血より多い） · 赤ちゃんが動かなくなった · 続く強いお腹の痛み · 妊娠高血圧腎症のサイン：タイレノールで治まらないひどい頭痛、見え方の変化、急なひどいむくみ",
        "",
        ""
      ]
    },
    "normal-newborn": {
      "title": "",
      "sub": "",
      "t": [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "次のときはすぐに赤ちゃんの医師に電話",
        "直腸温 ≥ 100.4°F（新生児では重大。必ず直腸で測る） · 飲まない · 黄色みが強い · 息をするたびにうなる · 肌がとても青白い · 泣きやまない · 生後5日目以降、ぬれたおむつが1日6枚未満 · 首が硬い。唇や顔が青い、または灰色：911に電話。"
      ]
    }
  },
  "srcHash": {
    "content.postpartum-danger.t.0": "8e2a678f78c207ed",
    "content.postpartum-danger.t.1": "d26dc5484bcab5f6",
    "content.postpartum-danger.t.2": "bee2b3c377a8a3e5",
    "content.postpartum-danger.t.3": "8a9f90651b64d9d3",
    "content.signs-of-labor.t.11": "3973fa2849b83e92",
    "content.signs-of-labor.t.12": "61f8135000473a76",
    "content.signs-of-labor.t.13": "d0b262a299176734",
    "content.signs-of-labor.t.14": "48cc3887b50a326d",
    "content.signs-of-labor.t.15": "155392951f86e7af",
    "content.signs-of-labor.t.16": "ac6a34b445ceccaa",
    "content.signs-of-labor.t.17": "b007f20008122ab6",
    "content.normal-newborn.t.31": "3f69f29898ba59ba",
    "content.normal-newborn.t.32": "380945be7751b37c"
  },
  "unreviewed": {
    "urgent.title": 1,
    "urgent.call911": 1,
    "urgent.callLd": 1,
    "urgent.addLd": 1,
    "urgent.tellThem": 1,
    "urgent.helpLines": 1,
    "urgent.line988": 1,
    "urgent.lineMama": 1,
    "urgent.linePoison": 1,
    "urgent.lineDv": 1,
    "urgent.call": 1,
    "urgent.text": 1,
    "home.duringPregnancy": 1,
    "home.callYourDoctorIf": 1,
    "home.vaginalBleeding": 1,
    "home.fluidGushingOrTrickling": 1,
    "home.babyNotMovingNormally": 1,
    "home.severeHeadache": 1,
    "home.visionChanges": 1,
    "home.suddenSwellingOfFaceHands": 1,
    "home.fever1004F": 1,
    "home.contractionsBefore37Weeks": 1,
    "content.postpartum-danger.t.0": 1,
    "content.postpartum-danger.t.1": 1,
    "content.postpartum-danger.t.2": 1,
    "content.postpartum-danger.t.3": 1,
    "content.signs-of-labor.t.11": 1,
    "content.signs-of-labor.t.12": 1,
    "content.signs-of-labor.t.13": 1,
    "content.signs-of-labor.t.14": 1,
    "content.signs-of-labor.t.15": 1,
    "content.signs-of-labor.t.16": 1,
    "content.signs-of-labor.t.17": 1,
    "content.normal-newborn.t.31": 1,
    "content.normal-newborn.t.32": 1,
    "nav.prenatal": 1,
    "nav.labor": 1,
    "nav.recovery": 1,
    "nav.baby": 1,
    "nav.toolsTrackers": 1,
    "nav.today": 1,
    "nav.guide": 1,
    "nav.urgent": 1,
    "nav.me": 1,
    "app.prenatal": 1,
    "app.labor": 1,
    "app.recovery": 1,
    "app.baby": 1,
    "today.whereNow": 1,
    "today.pregnant": 1,
    "today.dueLabel": 1,
    "today.babyHere": 1,
    "today.bornLabel": 1,
    "today.save": 1,
    "today.savedOnPhone": 1,
    "today.week": 1,
    "today.due": 1,
    "today.babyDays": 1,
    "today.babyWeeks": 1,
    "today.visitsNow": 1,
    "today.comingUp": 1,
    "today.allVisits": 1,
    "today.toolsNow": 1,
    "today.changeDates": 1,
    "visits.title": 1,
    "visits.sub": 1,
    "visits.lead": 1,
    "visits.afterBirth": 1,
    "visits.yourChoice": 1,
    "visits.first.when": 1,
    "visits.first.title": 1,
    "visits.first.i1": 1,
    "visits.first.i2": 1,
    "visits.first.i3": 1,
    "visits.first.i4": 1,
    "visits.genetic.when": 1,
    "visits.genetic.title": 1,
    "visits.genetic.i1": 1,
    "visits.genetic.i2": 1,
    "visits.genetic.i3": 1,
    "visits.monthly.when": 1,
    "visits.monthly.title": 1,
    "visits.monthly.i1": 1,
    "visits.anatomy.when": 1,
    "visits.anatomy.title": 1,
    "visits.anatomy.i1": 1,
    "visits.sugar.when": 1,
    "visits.sugar.title": 1,
    "visits.sugar.i1": 1,
    "visits.sugar.i2": 1,
    "visits.sugar.i3": 1,
    "visits.tdap.when": 1,
    "visits.tdap.title": 1,
    "visits.tdap.i1": 1,
    "visits.twoweekly.when": 1,
    "visits.twoweekly.title": 1,
    "visits.twoweekly.i1": 1,
    "visits.twoweekly.i2": 1,
    "visits.rsv.when": 1,
    "visits.rsv.title": 1,
    "visits.rsv.i1": 1,
    "visits.gbs.when": 1,
    "visits.gbs.title": 1,
    "visits.gbs.i1": 1,
    "visits.gbs.i2": 1,
    "visits.gbs.i3": 1,
    "visits.weekly.when": 1,
    "visits.weekly.title": 1,
    "visits.weekly.i1": 1,
    "visits.weekly.i2": 1,
    "visits.ppBp.when": 1,
    "visits.ppBp.title": 1,
    "visits.ppBp.i1": 1,
    "visits.pp3.when": 1,
    "visits.pp3.title": 1,
    "visits.pp3.i1": 1,
    "visits.ppFull.when": 1,
    "visits.ppFull.title": 1,
    "visits.ppFull.i1": 1,
    "visits.ppFull.i2": 1,
    "visits.ppFull.i3": 1,
    "tools.contractionTimer": 1
  }
};
