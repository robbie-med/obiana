// ═══════════════════════════════════════════════════════
// EPDS — English (reference form)
// ═══════════════════════════════════════════════════════
// Verbatim from the published form (Cox, Holden & Sagovsky 1987; antenatal
// use per Murray & Cox 1990).
//
// Option ORDER alternates by item and must not be normalised: items 1, 2
// and 4 run best-first, the rest run worst-first. That alternation is what
// stops a respondent straight-lining one column. See SOURCES.md.

window.MYOB_EPDS = window.MYOB_EPDS || {};
window.MYOB_EPDS.en = {
  "language": "en",
  "name": "English",
  "native": "English",
  "validated": true,
  "cutoffs": {
    "concern": 10,
    "high": 13
  },
  "attribution": "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry 1987;150:782-786. Antenatal use: Murray D, Cox JL. J Reprod Infant Psychol 1990;8:99-107. © 1987 The Royal College of Psychiatrists. May be reproduced without permission provided the authors, title and source are quoted.",
  "instructions": "Please select one option for each question that is the closest to how you have felt in the PAST SEVEN DAYS.",
  "questions": [
    {
      "text": "I have been able to laugh and see the funny side of things",
      "options": [
        "As much as I always could",
        "Not quite so much now",
        "Definitely not so much now",
        "Not at all"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "I have looked forward with enjoyment to things",
      "options": [
        "As much as I ever did",
        "Rather less than I used to",
        "Definitely less than I used to",
        "Hardly at all"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "I have blamed myself unnecessarily when things went wrong",
      "options": [
        "Yes, most of the time",
        "Yes, some of the time",
        "Not very often",
        "No, never"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "I have been anxious or worried for no good reason",
      "options": [
        "No, not at all",
        "Hardly ever",
        "Yes, sometimes",
        "Yes, very often"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "I have felt scared or panicky for no very good reason",
      "options": [
        "Yes, quite a lot",
        "Yes, sometimes",
        "No, not much",
        "No, not at all"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Things have been getting on top of me",
      "options": [
        "Yes, most of the time I haven’t been able to cope at all",
        "Yes, sometimes I haven’t been coping as well as usual",
        "No, most of the time I have coped quite well",
        "No, I have been coping as well as ever"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "I have been so unhappy that I have had difficulty sleeping",
      "options": [
        "Yes, most of the time",
        "Yes, sometimes",
        "Not very often",
        "No, not at all"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "I have felt sad or miserable",
      "options": [
        "Yes, most of the time",
        "Yes, quite often",
        "Not very often",
        "No, not at all"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "I have been so unhappy that I have been crying",
      "options": [
        "Yes, most of the time",
        "Yes, quite often",
        "Only occasionally",
        "No, never"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "The thought of harming myself has occurred to me",
      "options": [
        "Yes, quite often",
        "Sometimes",
        "Hardly ever",
        "Never"
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
