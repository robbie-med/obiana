// ═══════════════════════════════════════════════════════
// PHQ-9 — French / Français
// ═══════════════════════════════════════════════════════
// The EPDS has no published validated French version that is freely
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
window.MYOB_EPDS.fr = {
  "validated": true,
  "instrument": "PHQ-9",
  "language": "fr",
  "name": "French",
  "native": "Français",
  "maxScore": 27,
  "selfHarmIndex": 8,
  "cutoffs": {
    "concern": 10,
    "high": 15
  },
  "attribution": "Kroenke K, Spitzer RL, Williams JBW. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med 2001;16:606-613. Developed by Drs Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute. French translation from phqscreeners.com.",
  "source": "https://www.phqscreeners.com/select-screener",
  "instructions": "Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ?",
  "scale": [
    "Jamais",
    "Plusieurs jours",
    "Plus de la moitié du temps",
    "Presque tous les jours"
  ],
  "questions": [
    {
      "text": "Peu d’intérêt ou de plaisir à faire les choses",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Être triste, déprimé(e) ou désespéré(e)",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Difficultés à s’endormir ou à rester endormi(e), ou dormir trop",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Se sentir fatigué(e) ou manquer d’énergie",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Avoir peu d’appétit ou manger trop",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Avoir une mauvaise opinion de soi-même, ou avoir le sentiment d’être nul(le), ou d’avoir déçu sa famille ou s’être déçu(e) soi-même",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Avoir du mal à se concentrer, par exemple, pour lire le journal ou regarder la télévision",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Bouger ou parler si lentement que les autres auraient pu le remarquer. Ou au contraire, être si agité(e) que vous avez eu du mal à tenir en place par rapport à d’habitude",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
      ],
      "scores": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "text": "Penser qu’il vaudrait mieux mourir ou envisager de vous faire du mal d’une manière ou d’une autre",
      "options": [
        "Jamais",
        "Plusieurs jours",
        "Plus de la moitié du temps",
        "Presque tous les jours"
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
