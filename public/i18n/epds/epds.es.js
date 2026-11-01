// ═══════════════════════════════════════════════════════
// EPDS — Spanish / Español
// ═══════════════════════════════════════════════════════
// Officially validated translation published by NSW Health Multicultural
// Health Communication Service. Extracted MECHANICALLY from the embedded
// text layer of the official PDF: not retyped, not OCR-scanned, not
// translated. Item and option order are exactly as printed.
//
// Scores are the canonical EPDS pattern applied positionally
// (items 1,2,4 -> 0..3; items 3,5,6,7,8,9,10 -> 3..0).
//
// This was the control for the whole extraction pipeline: the Spanish
// wording and ordering were checked item by item against the published
// English form before the same code path was trusted on other scripts.
//
// Source: https://www.mhcs.health.nsw.gov.au/publications/epds/spanish

window.MYOB_EPDS = window.MYOB_EPDS || {};
window.MYOB_EPDS.es = {
  "validated": true,
  "language": "es",
  "name": "Spanish",
  "native": "Español",
  "cutoffs": {
    "concern": 10,
    "high": 13
  },
  "attribution": "Cox JL, Holden JM, Sagovsky R. Detection of postnatal depression: development of the 10-item Edinburgh Postnatal Depression Scale. Br J Psychiatry 1987;150:782-786. Spanish translation linguistically validated by Western Sydney Local Health District Translation Services, published by NSW Health Multicultural Health Communication Service. Reproduced with permission.",
  "source": "https://www.mhcs.health.nsw.gov.au/publications/epds/spanish",
  "instructions": "Como recientemente ha tenido un bebé, nos gustaría saber cómo se siente ahora. Marque con tilde la respuesta",
  "questions": [
    {
      "text": "He seguido capaz de reírme y ver el lado divertido de las cosas:",
      "options": [
        "Igual que siempre",
        "Ahora, no tanto como siempre",
        "Ahora, mucho menos",
        "No, en absoluto"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "He mirado las cosas con ilusión:",
      "options": [
        "Igual que siempre",
        "Algo menos de lo que es habitual en mí",
        "Bastante menos de lo que es habitual en mí",
        "Mucho menos que antes"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Me he culpado innecesariamente cuando las cosas han salido mal:",
      "options": [
        "Sí, la mayor parte del tiempo",
        "Sí, a veces",
        "No muy a menudo",
        "No, en ningún momento"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Me he sentido nerviosa o preocupada sin tener motivo:",
      "options": [
        "No, en ningún momento",
        "Casi nunca",
        "Sí, algunas veces",
        "Sí, con mucha frecuencia"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "He sentido miedo o he estado asustada sin motivo:",
      "options": [
        "Sí, bastante",
        "Sí, a veces",
        "No, no mucho",
        "No, en absoluto"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Las cosas me han agobiado:",
      "options": [
        "Sí, la mayoría de las veces no he sido capaz de afrontarlas",
        "Sí, a veces no he sido capaz de afrontarlas tan bien como siempre",
        "No, la mayoría de las veces las he afrontado bastante bien",
        "No, he afrontado las cosas tan bien como siempre"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Me he sentido tan infeliz que he tenido dificultades para dormir:",
      "options": [
        "Sí, la mayor parte del tiempo",
        "Sí, a veces",
        "No, no muy a menudo",
        "No, en ningún momento"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Me he sentido triste o desgraciada:",
      "options": [
        "Sí, la mayor parte del tiempo",
        "Sí, bastante a menudo",
        "No muy a menudo",
        "No, en ningún momento"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "Me he sentido tan infeliz que he estado llorando:",
      "options": [
        "Sí, la mayor parte del tiempo",
        "Sí, bastante a menudo",
        "Sólo de vez en cuando",
        "No, en ningún momento"
      ],
      "scores": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "text": "He pensado en hacerme daño:",
      "options": [
        "Sí, bastante a menudo",
        "A veces",
        "Casi nunca",
        "En ningún momento"
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
