// ═══════════════════════════════════════════════════════
// PHQ-9 — Russian / Русский
// ═══════════════════════════════════════════════════════
// The EPDS has no published validated Russian version that is freely
// downloadable, so this language uses the PHQ-9 instead: a validated
// depression screen that IS public domain. It is not perinatal-specific,
// but a validated general screen the patient can read beats no screen.
//
// Extracted MECHANICALLY from the embedded text layer of the official
// phqscreeners.com PDF: not retyped, not OCR-scanned, not translated.
// All nine items were read back against the published English PHQ-9.
//
// Structure differs from the EPDS: 9 items (not 10), a shared four-point
// column scale rather than per-item options, NO reverse scoring, a 0-27
// range, and the self-harm item is number 9 (selfHarmIndex 8).
//
// Licence: "no permission is required to reproduce, translate, display or
// distribute" — phqscreeners.com.

window.MYOB_EPDS = window.MYOB_EPDS || {};
window.MYOB_EPDS.ru = {
  "validated": true,
  "instrument": "PHQ-9",
  "language": "ru",
  "name": "Russian",
  "native": "Русский",
  "maxScore": 27,
  "selfHarmIndex": 8,
  "cutoffs": {
    "concern": 10,
    "high": 15
  },
  "attribution": "Kroenke K, Spitzer RL, Williams JBW. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med 2001;16:606-613. Developed by Drs Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute. Russian translation from phqscreeners.com.",
  "source": "https://www.phqscreeners.com/select-screener",
  "instructions": "Как часто за последние 2 недели Вас беспокоили следующие проблемы?",
  "scale": [
    "Ни разу",
    "Несколько дней",
    "Более недели",
    "Почти каждый день"
  ],
  "questions": [
    {
      "text": "Вам не хотелось ничего делать",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "У Вас было плохое настроение, Вы были подавлены или испытывали чувство безысходности",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Вам было трудно заснуть, у Вас был прерывистый сон, или Вы слишком много спали",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Вы были утомлены, или у Вас было мало сил",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "У Вас был плохой аппетит, или Вы переедали",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Вы плохо о себе думали: считали себя неудачником (неудачницей), или были в себе разочарованы, или считали, что подвели свою семью",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Вам было трудно сосредоточиться (например, на чтении газеты или на просмотре телепередач)",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Вы двигались или говорили настолько медленно, что окружающие это замечали? Или, наоборот, Вы были настолько суетливы или взбудоражены, что двигались гораздо больше обычного",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Вас посещали мысли о том, что Вам лучше было бы умереть, или о том, чтобы причинить себе какой-нибудь вред",
      "options": [
        "Ни разу",
        "Несколько дней",
        "Более недели",
        "Почти каждый день"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    }
  ]
};
