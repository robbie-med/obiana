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
    },
    "faq-deli": {
      "title": "デリミートやソフトチーズは食べてもいいですか？",
      "sub": "",
      "t": [
        "主なリスクは",
        "リステリア",
        "という細菌による感染症です。まれですが、妊娠中は重くなることがあります（胎盤を通ることがあります）。FDAは、殺菌されていないチーズや、湯気が出るまで（165°F）加熱していないデリミートを避けるよう勧めています。殺菌済みのソフトチーズ（殺菌済みのブリー、パック入りのフェタなど）のほとんどは安全です。例外はケソフレスコ、ケソブランコ、パネラなどのフレッシュチーズです。殺菌済みでもリステリアの集団感染が起きているので、湯気が出るまで加熱した場合だけ食べてください。たまにデリミートを食べる程度なら、全体のリスクはとても低いです。迷ったら加熱しましょう。"
      ]
    },
    "faq-coffee": {
      "title": "カフェインは少しでもとっていいですか？",
      "sub": "",
      "t": [
        "はい。ACOG（米国産科婦人科学会）はカフェインを",
        "1日200 mg未満",
        "（ドリップコーヒー12-oz カップ約1杯分）に抑えるよう勧めています。この量で妊娠に害があるという証拠はありません。紅茶、炭酸飲料、チョコレートにもカフェインが含まれます。すべて合わせて数えてください。減らすのは理にかなっていますが、完全にやめるかどうかは個人の選択で、医学的に必要なわけではありません。"
      ]
    },
    "faq-hair-dye": {
      "title": "妊娠中に髪を染めてもいいですか？",
      "sub": "",
      "t": [
        "はい。ただ、なぜ染めたいのかを考えてみてください。ヘアカラーは頭皮からごくわずかに吸収されます。美容院や家庭での通常のヘアカラーの量で、胎児に害があったという研究は発表されていません。ハイライト（ホイル）なら頭皮に触れる量はさらに少なくなります。心配なら、主な臓器ができあがる妊娠中期まで待つか、染めないでおきましょう。"
      ]
    },
    "faq-exercise-mc": {
      "title": "運動で流産しますか？",
      "sub": "",
      "t": [
        "いいえ。健康な妊娠なら、適度な運動で流産することはありません。ある程度の運動は害ではなく、むしろ体を守ります。「妊娠中」のページの運動の目安を見てください。医師から運動しないよう言われたら、理由を聞いて、その指示に従ってください。"
      ]
    },
    "faq-sex-pregnancy": {
      "title": "妊娠中にセックスをしても大丈夫ですか？",
      "sub": "",
      "t": [
        "はい。合併症のない通常の妊娠なら大丈夫です。セックスで流産や早産が起きたり、赤ちゃん（羊水に守られています）に害があったりすることはありません。医師が骨盤安静（性交なし）を勧めるのは、前置胎盤、早産のリスク、原因のわからない膣からの出血、特定の子宮頸管の状態、破水した後など、特別な場合だけです。わからなければ、次の健診で聞いてください。"
      ]
    },
    "faq-vaccines": {
      "title": "妊娠中のワクチンは安全ですか？",
      "sub": "",
      "t": [
        "どの妊娠でも勧められていて、安全と考えられているのは2つです。Tdap追加接種とインフルエンザワクチンです。生ワクチンは出産後まで待ちます。",
        "Tdap（百日せき）",
        "前回の妊娠で受けていても、妊娠のたびに27〜36週の間に接種します。主な目的はあなたを守ることではありません。あなたの体が抗体を作り、胎盤を通して赤ちゃんに渡すので、赤ちゃんは百日せきへの守りを持って生まれてきます。百日せきは、赤ちゃんがワクチンを受けられる月齢になる前の、生後数か月がもっとも危険なので、これが大切なのです。赤ちゃんをよく抱っこする人も、接種を済ませておきましょう。",
        "インフルエンザワクチン",
        "インフルエンザの季節なら、妊娠のどの時期でも勧められます。妊娠すると肺や免疫の働きが変わるので、インフルエンザで入院する可能性がかなり高くなります。抗体は赤ちゃんにも渡り、生後数か月を守ります。妊娠中に使うのは注射のワクチンです。鼻にスプレーするワクチンは生ワクチンです。",
        "出産後まで待つワクチン",
        "生ワクチン、つまりMMR（はしか、おたふくかぜ、風しん）と水痘（水ぼうそう）は妊娠中には接種しません。妊娠初期の血液検査で風しんや水ぼうそうの免疫がないとわかったら、ふつうは退院前に接種します。次の妊娠を守ることにもなります。どちらも授乳中に受けても安全です。",
        "ほかに受けていないワクチンがある、旅行に行く、住んでいる地域で感染症が流行している、という場合は医師に伝えてください。"
      ]
    },
    "faq-eat-for-two": {
      "title": "「2人分食べる」必要がありますか？",
      "sub": "",
      "t": [
        "いいえ。「2人分食べる」は誤解です。妊娠初期には余分なカロリーは必要ありません。中期は1日約340、後期は約450余分に必要です。これはおやつ1〜2回分で、もう1皿分ではありません。量よりも栄養の質のほうがずっと大切です。たんぱく質、鉄、葉酸、カルシウム、オメガ3脂肪酸を意識しましょう。妊婦用ビタミンは足りない分を補いますが、バランスのよい食事の代わりにはなりません。"
      ]
    },
    "faq-hot-tub": {
      "title": "お風呂やジャグジーに入ってもいいですか？",
      "sub": "",
      "t": [
        "ぬるめのお風呂なら妊娠中ずっと大丈夫です。体の深部温度が102°F（39°C）を超えるジャグジー、サウナ、スチームルームは勧められません。特に妊娠初期は、体温の上昇が神経管の異常と関係しています。ジャグジーを使うなら、温度は熱くない心地よい程度にし、10分までにして、妊娠初期は避けてください。家庭のふつうのお湯の温度（98–100°F）のお風呂は安全です。"
      ]
    },
    "faq-epidural-csec": {
      "title": "硬膜外麻酔で帝王切開のリスクは上がりますか？",
      "sub": "",
      "t": [
        "いいえ。これは産科でもっとも研究されてきた疑問の1つです。大規模なランダム化比較試験やメタ分析が何度も、硬膜外麻酔は帝王切開の率を",
        "上げない",
        "ことを確かめています。硬膜外麻酔でいきむ時間はいくらか長くなり、吸引分娩や鉗子分娩になりやすくなります。痛みが和らぐこととあわせて考える価値があります。分娩が進んでいる間ならいつでも頼めます。実際の限界は何センチという基準ではなく、お産の進み具合です。とても早いお産では間に合わないことがあります。"
      ]
    },
    "faq-routine-episiotomy": {
      "title": "裂けないように会陰切開が必要ですか？",
      "sub": "",
      "t": [
        "いいえ。ルーチンの会陰切開（膣の入り口を手術で切ること）は、ACOGはもう勧めていません。証拠はいつも、",
        "自然に裂けた傷のほうがたいてい治りがよく",
        "、ルーチンの会陰切開より合併症（痛みや長く続く骨盤底の問題を含む）が少ないことを示しています。経膣分娩をする女性の多くはある程度裂けますが、多くは軽いもの（第1度）です。赤ちゃんの状態が悪く急いで出す必要があるときなど、特別な理由があれば会陰切開は今も適切です。"
      ]
    },
    "faq-water-breaking": {
      "title": "破水したら帝王切開になりますか？",
      "sub": "",
      "t": [
        "いいえ。正期産で破水した場合、ほとんどの女性は約1日以内に自然に陣痛が始まります。陣痛が始まらなければ、ふつうは誘発分娩を勧められます。膜が破れている時間が長いほど感染の可能性が上がるからです。これは一緒に考えていくリスクで、過ぎてしまった締め切りではありません。GBS陽性なら、すぐに抗菌薬を始めます。帝王切開が必要なのは別の理由があるときだけで、破水だけではその理由になりません。"
      ]
    },
    "faq-eat-in-labor": {
      "title": "お産の間に食べたり飲んだりできますか？",
      "sub": "",
      "t": [
        "リスクの低い女性のお産の初期なら、ACOGの現在の指針は軽い食べ物と透明な飲み物を認めています。硬膜外麻酔を入れた後、ピトシンを使っているとき、全身麻酔（帝王切開の可能性）が必要になるリスクが高いときは、全身麻酔になった場合の誤嚥のリスクがあるため、多くの病院は氷のかけらか少量の水に限ります。あなたの病院の決まりを聞いてください。付き添いの人へ：おやつを持ってきましょう。お産は長い1日になることがあります。"
      ]
    },
    "faq-vbac": {
      "title": "前に帝王切開をしたら、次も必ず帝王切開ですか？",
      "sub": "",
      "t": [
        "必ずしもそうではありません。帝王切開後の経膣分娩（VBAC）は、子宮の横切開（下部横切開）が1回の女性の多くにとって、安全で適切な選択肢です。成功率は60–80%です。前回の帝王切開の理由、今回の妊娠、子宮の切開の種類、病院が緊急事態に対応できるかが、受けられるかどうかに関係します。希望するなら、妊婦健診の早い時期に相談してください。"
      ]
    },
    "faq-bf-bc": {
      "title": "授乳中に妊娠することはありますか？",
      "sub": "",
      "t": [
        "はい。母乳だけで育てているとある程度排卵は抑えられますが、",
        "確実な避妊ではありません",
        "。生理が戻る前に排卵し、妊娠することがあります。「授乳性無月経法」にはとても厳しい条件（昼は4時間ごと、夜は6時間ごとに母乳だけで授乳、ミルクの追加なし、生理が戻っていない）があり、その条件でも効果は約98%です。退院前に避妊について相談してください。"
      ]
    },
    "faq-stress-milk": {
      "title": "ストレスで母乳が出なくなりますか？",
      "sub": "",
      "t": [
        "強いストレスで射乳反射（母乳が出てくること）が一時的に妨げられることはあります。でも、1回のストレスで母乳が出なくなることはありません。母乳の量は需要で決まります。赤ちゃんがよく吸うほど、または搾乳するほど、体は多く母乳を作ります。ストレスや周りの慌ただしさで赤ちゃんがうまく飲めないと、需要が減り、母乳の量が減ることがあります。射乳を助ける方法：肌と肌のふれあい、温かさ、リラックス法、搾乳中に赤ちゃんの写真を見ること。薬を使わないストレスの減らし方を医師に相談してください。"
      ]
    },
    "faq-bonding": {
      "title": "赤ちゃんにすぐ愛着を感じるはずですか？",
      "sub": "",
      "t": [
        "いいえ。愛着は1つの瞬間ではなく、育っていくものです。生まれてすぐに深い愛情を感じる母親も多いですし、その気持ちが育つまでに数日、数週間、それ以上かかる人もいます。どちらもまったく普通です。体の疲れ、大変なお産、思いがけない結果、産後うつは、どれも初めの愛着に影響します。赤ちゃんに対してつながりを感じない、または気持ちがまひしている状態が2週間以上続くなら、医師に伝えてください。治療できる産後うつのサインのことがあります。"
      ]
    },
    "faq-ibuprofen-bf": {
      "title": "授乳中にイブプロフェンを飲んでもいいですか？",
      "sub": "",
      "t": [
        "はい。イブプロフェンは授乳中にもっとも安全な市販薬の1つです。母乳に移る量はごくわずかです。アセトアミノフェン（タイレノール）も安全です。これらは産後と授乳中に第一に選ばれる痛み止めです。高用量のアスピリンは勧められません（処方された低用量アスピリンは別の話です。医師と相談してください）。ナプロキセン（アリーブ）は母乳に移る量が多く、ふつうは選ばれません。あなたの状況については、必ずケアチームに確認してください。"
      ]
    },
    "faq-jaundice": {
      "title": "赤ちゃんが黄色く見えます。どんなときが心配ですか？",
      "sub": "",
      "t": [
        "新生児黄疸（高ビリルビン血症）は、正期産の赤ちゃんの約60%に生後1週間以内に起こります。胎児のときの赤血球がふつうに壊れることで起こります。肝臓が追いつこうとしているところなのです。ほとんどは軽く、治療なしで治ります。心配なのは、ビリルビンがとても高いとき（極端に高いと脳に障害が出るリスク）、赤ちゃんがとても眠そうなとき、飲まないとき、生後24時間以内に黄疸が出たときです。病院は退院前と、生後2–5日の健診でビリルビンを調べます。必要なら光線療法（ビリライト）がとてもよく効きます。"
      ]
    },
    "faq-newborn-procedures": {
      "title": "新生児の処置は全部受けなければいけませんか？",
      "sub": "",
      "t": [
        "新生児の標準的な処置は次のとおりです：",
        "ビタミンKの注射",
        "（命にかかわる脳出血のリスクを下げます）、",
        "エリスロマイシンの眼軟膏",
        "（淋菌などによる目の感染を減らします）、",
        "B型肝炎ワクチンの1回目",
        "、そして",
        "新生児マススクリーニングの採血",
        "（かかとから採血し、PKU、甲状腺機能低下症、鎌状赤血球症など約30の病気を調べます）。これらの根拠の強さはすべて同じではないので、1つずつ聞くのは当然のことです。ビタミンKとかかとの採血はもっともはっきりしています。ビタミンKはまれですが重大な出血を防ぎ、かかとの採血は生後数日で見つけないと治療できない病気を見つけます。B型肝炎ワクチンがもっとも大切なのは、あなた自身のB型肝炎が陽性か、わからないときです。眼軟膏の根拠は弱めで、いくつかの国ではルーチンで行うのをやめていますが、米国の多くの州では法律で義務づけられています。ほとんどの州では法的に断ることができます。どれがあなたの状況にあてはまるか、チームに聞いてください。"
      ]
    },
    "faq-first-bath": {
      "title": "赤ちゃんの初めてのお風呂はいつですか？",
      "sub": "",
      "t": [
        "WHOとAAPは現在、初めてのお風呂を生後少なくとも24時間（できれば48時間）遅らせるよう勧めています。白い膜（胎脂）には抗菌作用があり、肌のうるおいを保ちます。お風呂を遅らせると体温を保ちやすく、血糖が安定しやすく、授乳がうまく始まることとも関係しています。待つことは単なる好みではなく、現在の最善の方法です。"
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
    "content.normal-newborn.t.32": "380945be7751b37c",
    "content.faq-deli.title": "ce705cdc639700b6",
    "content.faq-deli.t.0": "208a1054e9463d0e",
    "content.faq-deli.t.1": "7180ed78d9040f96",
    "content.faq-deli.t.2": "86ed7bf6b9c01890",
    "content.faq-coffee.title": "5389638ea8a88dc8",
    "content.faq-coffee.t.0": "ac1cf8bc0364371a",
    "content.faq-coffee.t.1": "d49405defc21c3ec",
    "content.faq-coffee.t.2": "19f22003cc780ded",
    "content.faq-hair-dye.title": "3cbc4f5501467bbb",
    "content.faq-hair-dye.t.0": "194b47e06a23e60e",
    "content.faq-exercise-mc.title": "055753c567df011f",
    "content.faq-exercise-mc.t.0": "2b2d76b57f4bc45f",
    "content.faq-sex-pregnancy.title": "8399c3d543c4147f",
    "content.faq-sex-pregnancy.t.0": "9b3a7841e4c3a343",
    "content.faq-vaccines.title": "22cf8d87c3c18165",
    "content.faq-vaccines.t.0": "54aa1c57cf3d489d",
    "content.faq-vaccines.t.1": "2cc75b12a1fc2494",
    "content.faq-vaccines.t.2": "1038f5417eda7317",
    "content.faq-vaccines.t.3": "de4ce992cde7736c",
    "content.faq-vaccines.t.4": "fc3cba8b30791ee5",
    "content.faq-vaccines.t.5": "8e2d5dd7b662e6cd",
    "content.faq-vaccines.t.6": "1fbad66cf49cff52",
    "content.faq-vaccines.t.7": "bd443dcd8ee958d3",
    "content.faq-eat-for-two.title": "7109ae5ce8714502",
    "content.faq-eat-for-two.t.0": "1b020d6a6bc10158",
    "content.faq-hot-tub.title": "2230219d6f10d437",
    "content.faq-hot-tub.t.0": "b73f80715bdad85f",
    "content.faq-epidural-csec.title": "85af8aced19ce724",
    "content.faq-epidural-csec.t.0": "0598cc9adadeee14",
    "content.faq-epidural-csec.t.1": "29b19c8a24cbf72c",
    "content.faq-epidural-csec.t.2": "d9849263c1e6467d",
    "content.faq-routine-episiotomy.title": "063590cb3bfbb7f9",
    "content.faq-routine-episiotomy.t.0": "f9f4d22fb4ca4b41",
    "content.faq-routine-episiotomy.t.1": "8a8e3958d3c9cdb6",
    "content.faq-routine-episiotomy.t.2": "7d6842265369b750",
    "content.faq-water-breaking.title": "3024fe7ba7f6b3ed",
    "content.faq-water-breaking.t.0": "ffd7e16a191f9018",
    "content.faq-eat-in-labor.title": "5de8ba9361616d39",
    "content.faq-eat-in-labor.t.0": "23ad9f490ae5def7",
    "content.faq-vbac.title": "4fb6dce62d75356c",
    "content.faq-vbac.t.0": "2a66625080510032",
    "content.faq-bf-bc.title": "0683d2b28ff53b78",
    "content.faq-bf-bc.t.0": "fd3cd5c648b45a44",
    "content.faq-bf-bc.t.1": "1ab0f2cdfd636c5f",
    "content.faq-bf-bc.t.2": "b97f0ac57c1360c3",
    "content.faq-stress-milk.title": "601e567b1be30855",
    "content.faq-stress-milk.t.0": "02db447559e1251f",
    "content.faq-bonding.title": "a87f7534c89adb7e",
    "content.faq-bonding.t.0": "e686292ec2702bc0",
    "content.faq-ibuprofen-bf.title": "471f20ca8e18c184",
    "content.faq-ibuprofen-bf.t.0": "394b672da5bd8c7f",
    "content.faq-jaundice.title": "b2eb8cb7eb9ba4ed",
    "content.faq-jaundice.t.0": "529658accf30fbf6",
    "content.faq-newborn-procedures.title": "3b92e7e6a50686d0",
    "content.faq-newborn-procedures.t.0": "d72fcb8dc5811617",
    "content.faq-newborn-procedures.t.1": "503ae631290ccfd3",
    "content.faq-newborn-procedures.t.2": "555768324f0aff84",
    "content.faq-newborn-procedures.t.3": "c99e7877ef7ce6e1",
    "content.faq-newborn-procedures.t.4": "40e5e1dc519cece2",
    "content.faq-newborn-procedures.t.5": "502e42f21156da6c",
    "content.faq-newborn-procedures.t.6": "cd0c11353cd68b73",
    "content.faq-newborn-procedures.t.7": "d06e909e2132ca54",
    "content.faq-newborn-procedures.t.8": "0f46858bcf9a15d9",
    "content.faq-first-bath.title": "1ece0a9772ca9db5",
    "content.faq-first-bath.t.0": "23fa392719b4b945"
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
    "tools.contractionTimer": 1,
    "content.faq-deli.title": 1,
    "content.faq-deli.t.0": 1,
    "content.faq-deli.t.1": 1,
    "content.faq-deli.t.2": 1,
    "content.faq-coffee.title": 1,
    "content.faq-coffee.t.0": 1,
    "content.faq-coffee.t.1": 1,
    "content.faq-coffee.t.2": 1,
    "content.faq-hair-dye.title": 1,
    "content.faq-hair-dye.t.0": 1,
    "content.faq-exercise-mc.title": 1,
    "content.faq-exercise-mc.t.0": 1,
    "content.faq-sex-pregnancy.title": 1,
    "content.faq-sex-pregnancy.t.0": 1,
    "content.faq-vaccines.title": 1,
    "content.faq-vaccines.t.0": 1,
    "content.faq-vaccines.t.1": 1,
    "content.faq-vaccines.t.2": 1,
    "content.faq-vaccines.t.3": 1,
    "content.faq-vaccines.t.4": 1,
    "content.faq-vaccines.t.5": 1,
    "content.faq-vaccines.t.6": 1,
    "content.faq-vaccines.t.7": 1,
    "content.faq-eat-for-two.title": 1,
    "content.faq-eat-for-two.t.0": 1,
    "content.faq-hot-tub.title": 1,
    "content.faq-hot-tub.t.0": 1,
    "content.faq-epidural-csec.title": 1,
    "content.faq-epidural-csec.t.0": 1,
    "content.faq-epidural-csec.t.1": 1,
    "content.faq-epidural-csec.t.2": 1,
    "content.faq-routine-episiotomy.title": 1,
    "content.faq-routine-episiotomy.t.0": 1,
    "content.faq-routine-episiotomy.t.1": 1,
    "content.faq-routine-episiotomy.t.2": 1,
    "content.faq-water-breaking.title": 1,
    "content.faq-water-breaking.t.0": 1,
    "content.faq-eat-in-labor.title": 1,
    "content.faq-eat-in-labor.t.0": 1,
    "content.faq-vbac.title": 1,
    "content.faq-vbac.t.0": 1,
    "content.faq-bf-bc.title": 1,
    "content.faq-bf-bc.t.0": 1,
    "content.faq-bf-bc.t.1": 1,
    "content.faq-bf-bc.t.2": 1,
    "content.faq-stress-milk.title": 1,
    "content.faq-stress-milk.t.0": 1,
    "content.faq-bonding.title": 1,
    "content.faq-bonding.t.0": 1,
    "content.faq-ibuprofen-bf.title": 1,
    "content.faq-ibuprofen-bf.t.0": 1,
    "content.faq-jaundice.title": 1,
    "content.faq-jaundice.t.0": 1,
    "content.faq-newborn-procedures.title": 1,
    "content.faq-newborn-procedures.t.0": 1,
    "content.faq-newborn-procedures.t.1": 1,
    "content.faq-newborn-procedures.t.2": 1,
    "content.faq-newborn-procedures.t.3": 1,
    "content.faq-newborn-procedures.t.4": 1,
    "content.faq-newborn-procedures.t.5": 1,
    "content.faq-newborn-procedures.t.6": 1,
    "content.faq-newborn-procedures.t.7": 1,
    "content.faq-newborn-procedures.t.8": 1,
    "content.faq-first-bath.title": 1,
    "content.faq-first-bath.t.0": 1
  }
};
