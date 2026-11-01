// ═══════════════════════════════════════════════════════
// EPDS — Korean / 한국어
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
// Source: https://www.mhcs.health.nsw.gov.au/publications/epds/korean

window.MYOB_EPDS = window.MYOB_EPDS || {};
window.MYOB_EPDS.ko = {
  "validated": true,
  "language": "ko",
  "name": "Korean",
  "native": "한국어",
  "cutoffs": {
    "concern": 10,
    "high": 13
  },
  "attribution": "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry 1987;150:782-786. Korean translation linguistically validated by Western Sydney Local Health District Translation Services, published by NSW Health Multicultural Health Communication Service. Reproduced with permission.",
  "source": "https://www.mhcs.health.nsw.gov.au/publications/epds/korean",
  "instructions": "귀하께서 최근 출산을 하셨기에 귀하의 현재 감정 상태에 대해 알아보고자 합니다. 오늘의 심리상태가 아니라 최근 7 일",
  "questions": [
    {
      "text": "나는 잘 웃고 주변 일들의 재미난 면을 잘 볼 수 있었습니다.",
      "options": [
        "예전과 마찬가지로 그러하였습니다.",
        "예전보다는 조금 덜 그러하였습니다.",
        "예전보다 확실히 많이 그러하지 못하였습니다.",
        "전혀 그러지 못하였습니다."
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "나는 즐거운 마음으로 미래에 일어날 일들을 기대하였습니다.",
      "options": [
        "예전과 마찬가지로 그러하였습니다.",
        "예전보다는 조금 덜 그러하였습니다.",
        "예전보다는 확실히 덜 그러하였습니다.",
        "거의 그러하지 못하였습니다."
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "일이 잘못될 경우 나는 불필요하게 스스로를 탓하였습니다.",
      "options": [
        "예, 대부분의 경우(대체로) 그러하였습니다.",
        "예, 종종 그러하였습니다.",
        "자주 그렇지는 않았습니다.",
        "아니요, 전혀 그렇지 않았습니다."
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "나는 특별한 이유 없이 초조하고 불안하였습니다.",
      "options": [
        "아니요, 전혀 그렇지 않았습니다.",
        "거의 그렇지 않았습니다.",
        "예, 때때로 그러하였습니다.",
        "예, 자주 그러하였습니다."
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "나는 뚜렷한 이유 없이 두려움 혹은 공포심을 느꼈습니다.",
      "options": [
        "예, 꽤 자주 그러하였습니다.",
        "예, 종종 그러하였습니다.",
        "아니요, 그다지 그렇지 않았습니다.",
        "아니요, 전혀 그렇지 않았습니다."
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "상황이 내게는 너무 버겁게 느껴졌습니다.",
      "options": [
        "예, 대부분의 경우 상황을 전혀 감당할 수 없었습니다.",
        "예, 예전처럼 상황을 처리하지 못하는 때가 종종 있었습니다.",
        "아니요, 대부분의 경우 상황을 잘 처리할 수 있었습니다.",
        "아니요, 늘 그렇듯이 상황을 잘 처리했습니다."
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "나는 너무 불행해서 잠을 이루기가 어려웠습니다.",
      "options": [
        "예, 대부분의 경우 그러하였습니다.",
        "예, 때때로 그러하였습니다.",
        "아니요, 자주 그렇지는 않았습니다.",
        "아니요, 전혀 그렇지 않았습니다."
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "나는 슬프고 비참하다고 느꼈습니다.",
      "options": [
        "예, 대부분의 경우 그러하였습니다.",
        "예, 꽤 자주 그러하였습니다.",
        "아니요, 자주 그렇지는 않았습니다.",
        "아니요, 전혀 그렇지 않았습니다."
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "너무 불행하다고 느껴서 울었습니다.",
      "options": [
        "예, 대부분의 경우 그러하였습니다.",
        "예, 꽤 자주 그러하였습니다.",
        "아주 가끔 그러하였습니다.",
        "아니요, 전혀 그렇지 않았습니다."
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "자해하고 싶다는 생각이 들었습니다.",
      "options": [
        "예, 꽤 자주 그러하였습니다.",
        "때때로 그러하였습니다.",
        "거의 그렇지 않았습니다.",
        "전혀 그렇지 않았습니다."
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
