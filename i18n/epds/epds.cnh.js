// ═══════════════════════════════════════════════════════
// EPDS — Chin (Hakha) / Laiholh
// ═══════════════════════════════════════════════════════
// Officially validated translation published by NSW Health Multicultural
// Health Communication Service (linguistically validated, forward and back
// translation by Western Sydney LHD Translation Services).
//
// Extracted MECHANICALLY from the embedded text layer of the official PDF —
// not retyped, not OCR'd, not translated. Item and option order are exactly as
// printed. Scores are the canonical EPDS pattern applied positionally:
// items 1,2,4 score 0..3 and items 3,5,6,7,8,9,10 score 3..0.
//
// That mapping was checked against the form's own yes/no particles: every
// reverse-scored item leads with "Asi" (yes) and ends with "Aih" (no), and
// item 4 leads with "Aih". This matches the published English form.
//
// NOT verified: whether the wording reads naturally. A Hakha speaker should
// confirm before this is relied on clinically.
//
// Source: https://www.mhcs.health.nsw.gov.au/publications/epds/chin-hakha

window.MYOB_EPDS = window.MYOB_EPDS || {};

window.MYOB_EPDS.cnh = {
  "validated": true,
  "language": "cnh",
  "name": "Chin (Hakha)",
  "native": "Laiholh",
  "cutoffs": {
    "concern": 10,
    "high": 13
  },
  "attribution": "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry 1987;150:782-786. Chin (Hakha) translation linguistically validated by Western Sydney Local Health District Translation Services, published by NSW Health Multicultural Health Communication Service. Reproduced with permission.",
  "source": "https://www.mhcs.health.nsw.gov.au/publications/epds/chin-hakha",
  "instructions": "Naite ah fa nei mi na si le atu ah zeitin na in-tuar ning si ti kha theih kan duh ko. Tuchun i na in-tuar mi lawng silo 61 in, aliam cia ni 7 chung i na in-tuar ning he a neih bik mi aphi pawng i kuang(box) te kha zah(tick) ding ah kan in nawl. Zoh chunh ding ah mah hi ka in phit piak.",
  "questions": [
    {
      "text": "Nihchuak a simi lei in thil ka hmuh hna caah ka ni kho tawn ko:",
      "options": [
        "Ka rak si tluk peng khan si ko",
        "Mah tluk cun ka si ti lo",
        "Si nemmam ti hlah",
        "Asi bak ti lo"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Thil hna hi hmailei nuamnak beisei in ka cuanh:",
      "options": [
        "Ka si tawn ning khan si ko as per",
        "Ka si tawn mi nak in a tlawm deuh",
        "Ka si tawn mi nak in tlawm tuk lehpek",
        "Si nem mam lo"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Thil tlam a tlin lo tikah, a herh lo in keimah le keimah sual kaa phaw tawn:",
      "options": [
        "Asi, caan tam deuh ah",
        "Asi achel can ah",
        "Asi tawn lemloh",
        "Aih, asi bel loh"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Sullam nei lo in lau le thinphaan ka hmang tawn:",
      "options": [
        "Aih, asi bel loh",
        "Asi har ngai",
        "Aw, achel can ah",
        "Aw, asi lengmang ko"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Sullanei lo in ttih le thla-phang in ka um tawn:",
      "options": [
        "Asi, a tam ngai tawn",
        "Asi, acaan can ah",
        "Aih, tamtuk lem loh",
        "Aih, asibal lo"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Lungretheihnak ka lu tiang a phan tawn:",
      "options": [
        "Asi, can tamdeuh cu ka rak tuar kho tawn lo",
        "Asi, achel caan ahcun ka rak tuar kho tawn lo",
        "Aih, caan tamdeuh cu ka rak tuar khawh ko",
        "Aih, ka rak tuar khawh ngai ko"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Lung retheituk ruangah, I hngilhkhawhlo tiang in ka um tawn:",
      "options": [
        "Asi, caan tam deuh cu",
        "Asi, a chel caan ah",
        "Atu le tu asilo",
        "Aih, asi bal lo"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Ngaihchia le lungrawk in ka um tawn:",
      "options": [
        "si, caan tam deuh cu",
        "Asi, atu le tu",
        "Atu le tu asilo",
        "Aih, asi bal lo"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Lung lawmhlo tuk ruangah ka rak ttap tawn:",
      "options": [
        "Asi, caan tam deuh cu",
        "Asi, atu le tu",
        "A caan, caan tete lawngah",
        "Aih, asi bal lo"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Keimah le keimah tuahhmawh duhnak lungthin a rak chuak:",
      "options": [
        "Asi, atu le tu si pah ko",
        "Achel caan ah",
        "Asi bal theng lo",
        "Aih, asi bal lo"
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
