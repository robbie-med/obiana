// ═══════════════════════════════════════════════════════
// EPDS — Chinese (Simplified) / 中文（简体）
// ═══════════════════════════════════════════════════════
// Officially validated translation published by NSW Health Multicultural
// Health Communication Service. Extracted MECHANICALLY from the embedded
// text layer of the official PDF: not retyped, not OCR-scanned, not
// translated. Item and option order are exactly as printed.
//
// Scores are the canonical EPDS pattern applied positionally
// (items 1,2,4 -> 0..3; items 3,5,6,7,8,9,10 -> 3..0). The extracted
// wording was read back against the published English form item by item
// to confirm the alternation survived extraction.
//
// The checkbox glyph sometimes sits on its own line with the option text
// following, which is why extract.js tracks pending checkboxes.
//
// Source: https://www.mhcs.health.nsw.gov.au/publications/epds/chinese-simplified

window.MYOB_EPDS = window.MYOB_EPDS || {};
window.MYOB_EPDS.zh = {
  "validated": true,
  "language": "zh",
  "name": "Chinese (Simplified)",
  "native": "中文（简体）",
  "cutoffs": {
    "concern": 10,
    "high": 13
  },
  "attribution": "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry 1987;150:782-786. Chinese (Simplified) translation linguistically validated by Western Sydney Local Health District Translation Services, published by NSW Health Multicultural Health Communication Service. Reproduced with permission.",
  "source": "https://www.mhcs.health.nsw.gov.au/publications/epds/chinese-simplified",
  "instructions": "因为你最近生了小孩,我们希望了解你现在感觉如何。请针对每个问题,选择跟你在过去 7 天里的感觉最接近的答案,而",
  "questions": [
    {
      "text": "我会笑并看到事情有趣的一面:",
      "options": [
        "跟以前一样多",
        "现在没那么多了",
        "现在肯定没那么多了",
        "根本没有"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "我盼望着能享受事物:",
      "options": [
        "跟我以前一样多",
        "比以前少多了",
        "肯定比以前少了",
        "几乎没有"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "当事情不顺利时,我没必要地责备自己:",
      "options": [
        "是,大多数时候",
        "是,有时候",
        "不经常",
        "不,从不"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "我没有什么原因就焦虑或担心:",
      "options": [
        "不,根本不",
        "几乎没有",
        "是,有时候",
        "是,很经常"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "没什么理由我就觉得害怕或恐慌:",
      "options": [
        "是,很多时候",
        "是,有时候",
        "不,不多时候",
        "不,从不"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "事情超出我的控制:",
      "options": [
        "是,大多数时候我根本无法应对",
        "是,有时候我不像平时应对得那么好",
        "不,大多数时候我应对得挺好",
        "不,我和以前一样应对得好"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "我非常不开心以至于睡眠困难:",
      "options": [
        "是,大多数时候",
        "是,有时候",
        "不是很经常",
        "不,根本不"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "我觉得伤心或悲惨:",
      "options": [
        "是,大多数时候",
        "是,很经常",
        "不是很经常",
        "不,根本不"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "我非常不开心以至于我一直哭:",
      "options": [
        "是,大多数时候",
        "是,很经常",
        "仅仅偶尔",
        "不,从不"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "我曾经有过伤害自己的想法:",
      "options": [
        "是,很经常",
        "有时候",
        "几乎没有",
        "从不"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    }
  ]
};
