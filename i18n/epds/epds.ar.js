// ═══════════════════════════════════════════════════════
// EPDS — Arabic / العربية
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
// Arabic notes: the PDF text layer wraps every run in bidi control
// characters and uses Arabic presentation forms (U+FExx); extract.js strips
// the former and NFKC-normalises the latter. The item number TRAILS its
// stem on this form, which also flips how columns are split.
//
// Source: https://www.mhcs.health.nsw.gov.au/publications/epds/arabic

window.MYOB_EPDS = window.MYOB_EPDS || {};
window.MYOB_EPDS.ar = {
  "validated": true,
  "language": "ar",
  "name": "Arabic",
  "native": "العربية",
  "cutoffs": {
    "concern": 10,
    "high": 13
  },
  "attribution": "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry 1987;150:782-786. Arabic translation linguistically validated by Western Sydney Local Health District Translation Services, published by NSW Health Multicultural Health Communication Service. Reproduced with permission.",
  "source": "https://www.mhcs.health.nsw.gov.au/publications/epds/arabic",
  "instructions": "مؤخرا ،نود أن نعرف شعورك الآن .یرجى وضع علامة في خانة الإجابة التي تعبر بشكل أفضل عما شعرت ً بما أنك أنجبت طفلاً",
  "questions": [
    {
      "text": "استطعت الشعور بالفرح والسعادة:",
      "options": [
        "بالمقدار نفسھ الذي استطعتھ من قبل",
        "لیس تماما ً بالمقدار نفسھ الآن",
        "لیس بالمقدار نفسھ الآن",
        "كلا مطلقا ً"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "ّ تطلعت إلى الأمور",
      "options": [
        "بالمقدار نفسھ مثل أي وقت مضى",
        "أقل نوعا ً ما مما اعتدتھ",
        "أقل بكثیر مما اعتدتھ",
        "نادراً"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "لمت نفسي بدون لزوم عندما سارت الأمور على غیر ما یرام:",
      "options": [
        "نعم ،في معظم الأحیان",
        "نعم ،في بعض الأحیان",
        "لیس في أحوال كثیرة",
        "كلا ،أبداً"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "كنت قلقة ومشغولة البال بدون سبب وجیھ:",
      "options": [
        "كلا ،أبداً",
        "نادراً",
        "نعم ،في بعض الأحیان",
        "نعم ،في كثیر من الأحیان"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "شعرت بالخوف والذعر بدون سبب وجیھ:",
      "options": [
        "نعم ،كثیراً في كثیر من الأحیان",
        "نعم ،في بعض الأحیان",
        "كلا ،لیس كثیراً",
        "كلا ،مطلقا ً"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "تراكمت الأعمال عل ّ",
      "options": [
        "نعم ،في معظم الأحیان لم أستطع القیام بھا أبدا ً",
        "نعم ،في بعض الأحیان لم أستطع القیام بھا كالمعتاد",
        "كلا ،لقد استطعت القیام بھا في بعض الأحیان",
        "كلا ،لقد استطعت القیام بھا كالمعتاد"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "كنت تعیسة لدرجة أنني واجھت صعوبة في النوم:",
      "options": [
        "نعم ،في معظم الأحیان",
        "نعم ،في بعض الأحیان",
        "كلا ،لیس كثیراً",
        "كلا ،أبدا ً"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "شعرت بأنني تعیسة وبائسة:",
      "options": [
        "نعم ،في معظم الأحیان",
        "نعم ،في أحیان كثیرة",
        "لیس كثیراً",
        "كلا ،مطلقا ً"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "شعرت بالتعاسة لدرجة البكاء:",
      "options": [
        "نعم ،في معظم الأحیان",
        "نعم ،في كثیر من الأحیان",
        "من وقت لآخر فقط",
        "كلا ،مطلقا ً"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "خطرت لي فكرة إلحاق الأذى بنفسي:",
      "options": [
        "نعم ،في أحیان كثیرة",
        "أحیانا ً",
        "نادرا ً",
        "كلا ،مطلقا ً"
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
