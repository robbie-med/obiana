// ═══════════════════════════════════════════════════════
// CONTENT STRUCTURE
// ═══════════════════════════════════════════════════════
// Prose (title / sub / body) lives in i18n/locale.<lang>.js keyed by card id.
// Only language-independent structure lives here, so an icon fix does not
// need to be repeated across every locale.

// Card structure: ids, icons, colors, types. Prose lives in i18n/locale.*.js
const CONTENT_STRUCTURE = {
  "pregnancy": [
    {
      "id": "first-trimester",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M10 10l2 -2v8\" /></svg>",
      "color": ""
    },
    {
      "id": "prenatal-vitamins",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7\" /> <path d=\"M8.5 8.5l7 7\" /></svg>",
      "color": ""
    },
    {
      "id": "second-trimester",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3\" /></svg>",
      "color": ""
    },
    {
      "id": "third-trimester",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1\" /></svg>",
      "color": ""
    },
    {
      "id": "sve",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75\" /> <path d=\"M9 12v2\" /> <path d=\"M6 12v3\" /> <path d=\"M12 12v3\" /> <path d=\"M18 12v3\" /> <path d=\"M15 12v2\" /> <path d=\"M3 3v4\" /> <path d=\"M3 5h18\" /> <path d=\"M21 3v4\" /></svg>",
      "color": ""
    },
    {
      "id": "exercise-pregnancy",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 20h4l1.5 -3\" /> <path d=\"M17 20l-1 -5h-5l1 -7\" /> <path d=\"M4 10l4 -1l4 -1l4 1.5l4 1.5\" /> <path d=\"M10.007 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /></svg>",
      "color": ""
    },
    {
      "id": "alcohol",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 21h8\" /> <path d=\"M12 16v5\" /> <path d=\"M17 5l1 6c0 .887 -.233 1.685 -.646 2.37m-2.083 1.886c-.941 .48 -2.064 .744 -3.271 .744c-3.314 0 -6 -1.988 -6 -5l.711 -4.268\" /> <path d=\"M10.983 6.959c.329 .027 .669 .041 1.017 .041c2.761 0 5 -.895 5 -2s-2.239 -2 -5 -2c-1.716 0 -3.23 .346 -4.13 .872\" /> <path d=\"M3 3l18 18\" /></svg>",
      "color": ""
    },
    {
      "id": "tobacco-cannabis",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 13l0 4\" /> <path d=\"M16 5v.5a2 2 0 0 0 2 2a2 2 0 0 1 2 2v.5\" /> <path d=\"M3 3l18 18\" /> <path d=\"M17 13h3a1 1 0 0 1 1 1v2c0 .28 -.115 .533 -.3 .714m-3.7 .286h-13a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h9\" /></svg>",
      "color": ""
    },
    {
      "id": "fish-mercury",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M16.69 7.44a6.973 6.973 0 0 0 -1.69 4.56c0 1.747 .64 3.345 1.699 4.571\" /> <path d=\"M2 9.504c7.715 8.647 14.75 10.265 20 2.498c-5.25 -7.761 -12.285 -6.142 -20 2.504\" /> <path d=\"M18 11v.01\" /> <path d=\"M11.5 10.5c-.667 1 -.667 2 0 3\" /></svg>",
      "color": ""
    },
    {
      "id": "preeclampsia",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M13.41 10.59l2.59 -2.59\" /> <path d=\"M7 12a5 5 0 0 1 5 -5\" /></svg>",
      "color": ""
    },
    {
      "id": "antenatal-mental-health",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8\" /> <path d=\"M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8\" /> <path d=\"M17.5 16a3.5 3.5 0 0 0 0 -7h-.5\" /> <path d=\"M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0\" /> <path d=\"M6.5 16a3.5 3.5 0 0 1 0 -7h.5\" /> <path d=\"M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10\" /></svg>",
      "color": ""
    },
    {
      "id": "common-discomforts",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 17a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M8 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M4 22l4 -2v-3h12\" /> <path d=\"M11 20h9\" /> <path d=\"M8 14l3 -2l1 -4c3 1 3 4 3 6\" /></svg>",
      "color": ""
    }
  ],
  "labor": [
    {
      "id": "signs-of-labor",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6\" /> <path d=\"M9 17v1a3 3 0 0 0 6 0v-1\" /> <path d=\"M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727\" /> <path d=\"M3 6.727a11.05 11.05 0 0 1 2.792 -3.727\" /></svg>",
      "color": "gold"
    },
    {
      "id": "what-happens-on-arrival",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 21l18 0\" /> <path d=\"M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16\" /> <path d=\"M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4\" /> <path d=\"M10 9l4 0\" /> <path d=\"M12 7l0 4\" /></svg>",
      "color": "gold"
    },
    {
      "id": "stages-of-labor",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M22 5h-5v5h-5v5h-5v5h-5\" /></svg>",
      "color": "gold"
    },
    {
      "id": "pain-management",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 8v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2\" /> <path d=\"M4 10a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -8\" /> <path d=\"M10 14h4\" /> <path d=\"M12 12v4\" /></svg>",
      "color": "gold"
    },
    {
      "id": "epidural",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M17 3l4 4\" /> <path d=\"M19 5l-4.5 4.5\" /> <path d=\"M11.5 6.5l6 6\" /> <path d=\"M16.5 11.5l-6.5 6.5h-4v-4l6.5 -6.5\" /> <path d=\"M7.5 12.5l1.5 1.5\" /> <path d=\"M10.5 9.5l1.5 1.5\" /> <path d=\"M3 21l3 -3\" /></svg>",
      "color": "gold"
    },
    {
      "id": "csection",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M6 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M4 8l2.1 2.8a3 3 0 0 0 2.4 1.2h11.5\" /> <path d=\"M10 6h4\" /> <path d=\"M12 4v4\" /> <path d=\"M12 12v2l-2.5 2.5\" /> <path d=\"M14.5 16.5l-2.5 -2.5\" /></svg>",
      "color": "gold"
    },
    {
      "id": "mfm",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2\" /> <path d=\"M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2\" /> <path d=\"M10 14l4 0\" /> <path d=\"M12 12l0 4\" /></svg>",
      "color": "gold"
    }
  ],
  "recovery": [
    {
      "id": "immediate-postpartum",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6.5 7h11\" /> <path d=\"M6.5 17h11\" /> <path d=\"M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1\" /> <path d=\"M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1\" /></svg>",
      "color": "rose"
    },
    {
      "id": "physical-recovery",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 21a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12.01 12.01 0 0 1 .378 5\" /> <path d=\"M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296\" /></svg>",
      "color": "rose"
    },
    {
      "id": "mood-ppd",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 0 -8.012 8.946\" /> <path d=\"M9 10h.01\" /> <path d=\"M15 10h.01\" /> <path d=\"M9.5 15a3.59 3.59 0 0 0 2.774 .99\" /> <path d=\"M18.994 21.5l2.518 -2.58a1.74 1.74 0 0 0 .004 -2.413a1.627 1.627 0 0 0 -2.346 -.005l-.168 .172l-.168 -.172a1.627 1.627 0 0 0 -2.346 -.004a1.74 1.74 0 0 0 -.004 2.412l2.51 2.59\" /></svg>",
      "color": "rose"
    },
    {
      "id": "pelvic-rest",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M22 17v-3h-20\" /> <path d=\"M2 8v9\" /> <path d=\"M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5\" /></svg>",
      "color": "rose"
    },
    {
      "id": "postpartum-exercise",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M5 20l5 -.5l1 -2\" /> <path d=\"M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2\" /></svg>",
      "color": "rose"
    },
    {
      "id": "postpartum-danger",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--rose)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 9v4\" /> <path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\" /> <path d=\"M12 16h.01\" /></svg>",
      "color": "rose"
    }
  ],
  "baby": [
    {
      "id": "breastfeeding",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /></svg>",
      "color": "navy"
    },
    {
      "id": "bf-challenges",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /><path d=\"M3 3l18 18\" /></svg>",
      "color": "navy"
    },
    {
      "id": "formula",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 10h14\" /> <path d=\"M12 2v2\" /> <path d=\"M12 4a5 5 0 0 1 5 5v11a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-11a5 5 0 0 1 5 -5\" /></svg>",
      "color": "navy"
    },
    {
      "id": "cord-care",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /> <path d=\"M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /> <path d=\"M9.15 14.85l8.85 -10.85\" /> <path d=\"M6 4l8.85 10.85\" /></svg>",
      "color": "navy"
    },
    {
      "id": "normal-newborn",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M9 10l.01 0\" /> <path d=\"M15 10l.01 0\" /> <path d=\"M9.5 15a3.5 3.5 0 0 0 5 0\" /> <path d=\"M12 3a2 2 0 0 0 0 4\" /></svg>",
      "color": "navy"
    },
    {
      "id": "circumcision",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 20l10 0\" /> <path d=\"M6 6l6 -1l6 1\" /> <path d=\"M12 3l0 17\" /> <path d=\"M9 12l-3 -6l-3 6a3 3 0 0 0 6 0\" /> <path d=\"M21 12l-3 -6l-3 6a3 3 0 0 0 6 0\" /></svg>",
      "color": "navy"
    },
    {
      "id": "vitamin-d-drops",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546\" /></svg>",
      "color": "navy"
    },
    {
      "id": "car-seat",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5\" /></svg>",
      "color": "navy"
    },
    {
      "id": "safe-sleep",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 12h6l-6 8h6\" /> <path d=\"M14 4h6l-6 8h6\" /></svg>",
      "color": "navy"
    },
    {
      "id": "followup-appts",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--navy)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6\" /> <path d=\"M16 3v4\" /> <path d=\"M8 3v4\" /> <path d=\"M4 11h16\" /> <path d=\"M15 19l2 2l4 -4\" /></svg>",
      "color": "navy"
    }
  ],
  "faq": [
    {
      "id": "faq-deli",
      "type": "myth"
    },
    {
      "id": "faq-coffee",
      "type": "myth"
    },
    {
      "id": "faq-hair-dye",
      "type": "myth"
    },
    {
      "id": "faq-exercise-mc",
      "type": "myth"
    },
    {
      "id": "faq-sex-pregnancy",
      "type": "faq"
    },
    {
      "id": "faq-vaccines",
      "type": "faq"
    },
    {
      "id": "faq-eat-for-two",
      "type": "myth"
    },
    {
      "id": "faq-hot-tub",
      "type": "faq"
    },
    {
      "id": "faq-epidural-csec",
      "type": "myth"
    },
    {
      "id": "faq-routine-episiotomy",
      "type": "myth"
    },
    {
      "id": "faq-water-breaking",
      "type": "myth"
    },
    {
      "id": "faq-eat-in-labor",
      "type": "faq"
    },
    {
      "id": "faq-vbac",
      "type": "faq"
    },
    {
      "id": "faq-bf-bc",
      "type": "myth"
    },
    {
      "id": "faq-stress-milk",
      "type": "myth"
    },
    {
      "id": "faq-bonding",
      "type": "myth"
    },
    {
      "id": "faq-ibuprofen-bf",
      "type": "faq"
    },
    {
      "id": "faq-jaundice",
      "type": "faq"
    },
    {
      "id": "faq-newborn-procedures",
      "type": "faq"
    },
    {
      "id": "faq-first-bath",
      "type": "faq"
    }
  ]
};

// ─── Storage ────────────────────────────────────────────
// Every read and write goes through these. Two failures they exist for:
//
// Private mode and blocked third-party storage make localStorage itself throw
// on access, not just return null. And a single corrupt value used to abort
// tools.js at parse time, because ten of its trackers parse their history at
// module scope: one bad kick-history entry meant openModal and closeModal were
// never defined, so all twelve tools and all four modals died together.
//
// safeSave returns a boolean because callers were toasting "saved" for data
// that had not been written.
function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const v = JSON.parse(raw);
    if (v === null || v === undefined) return fallback;
    // A value that parses but has the wrong shape is just as fatal: an object
    // where an array is expected gives undefined .length and breaks on render.
    if (Array.isArray(fallback) !== Array.isArray(v)) return fallback;
    if (typeof fallback === 'object' && typeof v !== 'object') return fallback;
    return v;
  } catch (e) {
    return fallback;
  }
}

function safeSave(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (e) { return false; }
}

// Raw string variants, for the handful of keys that are not JSON.
function safeGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
  catch (e) { return fallback; }
}

function safeSet(key, value) {
  try { localStorage.setItem(key, value); return true; }
  catch (e) { return false; }
}

function safeRemove(key) {
  try { localStorage.removeItem(key); return true; }
  catch (e) { return false; }
}

// ─── Source fingerprints ────────────────────────────────
// Mirror of srcHashOf() in translation/hash.js, which carries the full
// rationale. It is duplicated rather than imported because locale files and
// this file are plain <script> tags with no module loader; translation/
// lint-locales.js re-runs the shared test vectors through both copies so they
// cannot drift apart unnoticed.
function srcHashOf(s) {
  const bytes = new TextEncoder().encode(String(s).normalize('NFC'));
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  for (let i = 0; i < bytes.length; i++) {
    h1 = Math.imul(h1 ^ bytes[i], 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ bytes[i], 0x85ebca6b) >>> 0;
  }
  return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0');
}

// English is the fallback layer: loaded once per session and never mutated,
// so these caches never need invalidating.
let _enHashes = null;
function enHashes() {
  if (_enHashes) return _enHashes;
  const map = Object.create(null);
  const content = (window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {};
  for (const [id, card] of Object.entries(content)) {
    for (const f of ['title', 'sub']) {
      if (typeof card[f] === 'string' && card[f] !== '') map['content.' + id + '.' + f] = srcHashOf(card[f]);
    }
    (card.t || []).forEach((run, i) => { map['content.' + id + '.t.' + i] = srcHashOf(run); });
  }
  return (_enHashes = map);
}

// Keys whose translation was made from English that has since changed.
const _staleCache = new Map();
function staleSet(lang) {
  if (_staleCache.has(lang)) return _staleCache.get(lang);
  const set = new Set();
  const stamped = (window.MYOB_LOCALES[lang] || {}).srcHash;
  // A locale carrying NO map at all predates this mechanism, or is an old file
  // still sitting in the service worker cache. Trust it: treating a missing map
  // as "everything is stale" would flip a whole language back to English on any
  // cache skew, which is far worse than the problem being solved. A map that is
  // present but missing one entry is different, and does count as stale: that
  // key was written without recording what it was translated from.
  if (stamped && lang !== I18n.FALLBACK) {
    const now = enHashes();
    for (const key of Object.keys(now)) {
      if (stamped[key] !== now[key]) set.add(key);
    }
  }
  _staleCache.set(lang, set);
  return set;
}

// English standing in for a translation. lang and dir are not decoration:
// without lang a screen reader voices English with the target language's
// phonology, and without dir an English sentence inside an Arabic paragraph
// mirrors its own punctuation. [dir] carries unicode-bidi: isolate in the UA
// stylesheet, which is exactly the containment wanted.
function enRun(s) {
  if (s === undefined || s === "") return "";
  return I18n.lang === I18n.FALLBACK ? s
    : '<span class="src-en" lang="en" dir="ltr">' + s + '</span>';
}

// Merge structure + active-locale prose. Falls back to English per card.
// Rebuild a card body from the shared HTML template and the active locale's
// per-sentence runs. Each {{n}} falls back to English on its own, so a card
// translated halfway reads fully rather than showing gaps.
function cardBody(id) {
  const active = (window.MYOB_LOCALES[I18n.lang] || {}).content || {};
  const base = (window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {};
  const card = active[id] || {};

  const tpl = (window.MYOB_BODY_TPL || {})[id];
  if (!tpl) return "";

  const mine = card.t || [];
  const fallback = (base[id] || {}).t || [];
  const stale = staleSet(I18n.lang);
  // The local English editor sets this to wrap each filled slot in a element
  // carrying its key, so a sentence on screen can be traced back to exactly
  // one entry in the locale file. Unset in production, where the branch costs
  // one property lookup per slot and nothing else.
  const wrap = window.MYOB_EDIT_WRAP;
  return tpl.replace(/\{\{(\d+)\}\}/g, (m, i) => {
    const n = +i;
    const v = mine[n];
    if (wrap) return wrap('content.' + id + '.t.' + n, v === undefined ? '' : v);
    if (v === undefined || v === "") return enRun(fallback[n]);
    // Translated, but from an English sentence that has since been rewritten.
    // A clinical correction lands in English first; rendering the old
    // translation would hand this patient guidance the English no longer
    // gives. English is the reviewed layer, so English is what she gets until
    // someone retranslates.
    if (stale.has('content.' + id + '.t.' + n)) return enRun(fallback[n]);
    return v;
  });
}

// Per FIELD, not per card. I18n.data() resolves the whole card object, so a
// card that exists in the target locale could never borrow English for a field
// it was missing: an untranslated sub rendered empty rather than falling back.
function cardField(id, field) {
  const lang = I18n.lang;
  const mine = ((window.MYOB_LOCALES[lang] || {}).content || {})[id] || {};
  const base = ((window.MYOB_LOCALES[I18n.FALLBACK] || {}).content || {})[id] || {};
  const v = mine[field];
  if (typeof v === 'string' && v !== '' && !staleSet(lang).has('content.' + id + '.' + field)) {
    return { text: v, en: false };
  }
  const fallback = typeof base[field] === 'string' ? base[field] : '';
  return { text: fallback, en: lang !== I18n.FALLBACK && fallback !== '' };
}

function getCards(section) {
  const list = CONTENT_STRUCTURE[section] || [];
  return list.map(item => {
    const title = cardField(item.id, 'title');
    const sub = cardField(item.id, 'sub');
    return Object.assign({}, item, {
      title: title.text || item.id,
      titleEn: title.en,
      sub: sub.text,
      subEn: sub.en,
      body: cardBody(item.id),
    });
  });
}

// ═══════════════════════════════════════════════════════
// CONTACTS & DETAILS CONFIG
// ═══════════════════════════════════════════════════════
// Structure only — labels/placeholders come from i18n (ui.myinfo.*).
const CONTACTS = [
  { id: "familydoc",  hasName: true,  hasPhone: true },
  { id: "ob",         hasName: true,  hasPhone: true },
  { id: "peds",       hasName: true,  hasPhone: true },
  { id: "mfm",        hasName: true,  hasPhone: true },
  { id: "lactation",  hasName: true,  hasPhone: true },
  { id: "ld",         hasName: false, hasPhone: true },
  { id: "pharmacy",   hasName: true,  hasPhone: true },
];

const DETAILS = [
  { id: "edd",       type: "text" },
  { id: "bloodtype", type: "text" },
  { id: "gbs",       type: "text" },
  { id: "allergies", type: "text" },
  { id: "insurance", type: "text" },
];

// ═══════════════════════════════════════════════════════
// SEARCH INDEX
// ═══════════════════════════════════════════════════════
let SEARCH_INDEX = [];

// Colors are structural; labels come from i18n.
const SECTION_COLORS = {
  pregnancy: '', labor: 'gold', recovery: 'rose', baby: 'navy', faq: 'plum',
};
function sectionLabel(section) { return I18n.t('section.' + section); }

// Rebuilt on every locale change — the index must hold the text the user is
// actually reading, or search silently matches invisible English.
function buildSearchIndex() {
  SEARCH_INDEX = [];
  for (const section of Object.keys(CONTENT_STRUCTURE)) {
    getCards(section).forEach(item => {
      const plainBody = decodeEntities(
        item.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      // Diacritic- and case-folded haystacks so "cesarea" finds "cesárea".
      const folded = I18n.foldMap(plainBody);
      SEARCH_INDEX.push({
        section,
        id: item.id,
        title: item.title,
        sub: item.sub || '',
        body: plainBody,
        bodyNorm: folded.norm,
        bodyMap: folded.map,
        titleNorm: I18n.normalize(item.title),
      });
    });
  }
}

// Card bodies are authored as HTML, so stripping tags leaves raw entities
// ("&amp;"). Decode once at index time so search matches what the eye reads
// and the snippet can be safely escaped at render time.
function decodeEntities(s) {
  if (!s || s.indexOf('&') === -1) return s;
  const el = document.createElement('textarea');
  el.innerHTML = s;
  return el.value;
}

// Build a highlighted snippet. Matching happens in folded space (accent- and
// case-insensitive); every index is mapped back through item.bodyMap before
// slicing, so the text shown is the original — accents and all.
function buildSnippet(item, terms) {
  const norm = item.bodyNorm, map = item.bodyMap, body = item.body;

  const ranges = [];
  terms.forEach(term => {
    let from = 0, i;
    while ((i = norm.indexOf(term, from)) > -1 && ranges.length < 200) {
      ranges.push([i, i + term.length]);
      from = i + term.length;
    }
  });
  ranges.sort((a, b) => a[0] - b[0]);

  const first = ranges.length ? ranges[0][0] : 0;
  const wStart = Math.max(0, first - 60);
  const wEnd = Math.min(norm.length, first + 160);

  // Clip to the window and merge overlaps so nested <em> can't be produced.
  const merged = [];
  ranges.forEach(([s, e]) => {
    if (e <= wStart || s >= wEnd) return;
    const cs = Math.max(s, wStart), ce = Math.min(e, wEnd);
    const last = merged[merged.length - 1];
    if (last && cs <= last[1]) last[1] = Math.max(last[1], ce);
    else merged.push([cs, ce]);
  });

  const o = i => map[Math.min(i, map.length - 1)];
  let html = '', cursor = wStart;
  merged.forEach(([s, e]) => {
    html += escHtml(body.slice(o(cursor), o(s)));
    html += '<em>' + escHtml(body.slice(o(s), o(e))) + '</em>';
    cursor = e;
  });
  html += escHtml(body.slice(o(cursor), o(wEnd)));

  return (wStart > 0 ? '…' : '') + html + (wEnd < norm.length ? '…' : '');
}

// ═══════════════════════════════════════════════════════
// RENDER CARDS
// ═══════════════════════════════════════════════════════
function renderSection(section) {
  const container = document.getElementById('cards-' + section);
  if (!container || container.dataset.rendered) return;

  const items = getCards(section);
  items.forEach(item => {
    const isFaq = section === 'faq';
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'card-' + item.id;

    if (isFaq) {
      const badge = item.type === 'myth'
        ? `<span class="faq-badge badge-myth">${I18n.t('faq.badgeMyth')}</span>`
        : `<span class="faq-badge badge-faq">${I18n.t('faq.badgeFaq')}</span>`;
      card.innerHTML = `
        <h2 class="acc-heading">
          <button type="button" class="faq-header acc-header" aria-expanded="false"
                  aria-controls="body-${item.id}" onclick="toggleCard(this)">
            ${badge}
            <span class="faq-q"${item.titleEn ? ' lang="en" dir="ltr"' : ''}>${escHtml(item.title)}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </h2>
        <div class="acc-body" id="body-${item.id}">${item.body}</div>`;
    } else {
      card.innerHTML = `
        <h2 class="acc-heading">
          <button type="button" class="acc-header" aria-expanded="false"
                  aria-controls="body-${item.id}" onclick="toggleCard(this)">
            <span class="acc-icon-wrap ${item.color || ''}" aria-hidden="true">${item.icon}</span>
            <span class="acc-titles">
              <span class="acc-title"${item.titleEn ? ' lang="en" dir="ltr"' : ''}>${escHtml(item.title)}</span>
              ${item.sub ? `<span class="acc-sub"${item.subEn ? ' lang="en" dir="ltr"' : ''}>${escHtml(item.sub)}</span>` : ''}
            </span>
            <svg class="acc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </h2>
        <div class="acc-body" id="body-${item.id}">${item.body}</div>`;
    }

    container.appendChild(card);
  });
  container.dataset.rendered = 'true';
}

function toggleCard(header) {
  const card = header.closest('.card');
  card.classList.toggle('open');
  header.setAttribute('aria-expanded', card.classList.contains('open') ? 'true' : 'false');
  if (card.classList.contains('open')) {
    // Smooth scroll into view with small delay
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      const headerH = document.getElementById('header').offsetHeight;
      if (rect.top < headerH + 8) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
}

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
let currentSection = 'home';

const TOOL_PAGES = ['tools','tool-kick','tool-contractions','tool-feeding',
  'tool-diapers','tool-jaundice','tool-bp','tool-weight',
  'tool-mood','tool-birthplan','tool-appts', 'tool-i18n', 'tool-improve', 'tool-nausea', 'tool-nausealog'];

// Map tool sub-pages to their init functions (populated by tools.js)
const TOOL_INITS = {};

function navigate(section) {
  // Clear search
  if (document.getElementById('search-input').value) {
    clearSearch();
  }

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-current', 'false');
  });

  // Show target
  const page = document.getElementById('page-' + section);
  if (page) {
    page.classList.add('active');
    page.scrollTop = 0;
  }

  // Active nav button: tool sub-pages highlight the 'tools' button
  const navSection = TOOL_PAGES.includes(section) ? 'tools' : section;
  const btn = document.getElementById('navbtn-' + navSection);
  if (btn) { btn.classList.add('active'); btn.setAttribute('aria-current', 'page'); }

  currentSection = section;

  // Render content lazily
  if (['pregnancy','labor','recovery','baby','faq'].includes(section)) {
    renderSection(section);
  }

  // Call tool init if navigating to a tool sub-page
  if (TOOL_INITS[section]) {
    TOOL_INITS[section]();
  }



  // Scroll content to top
  document.getElementById('content').scrollTop = 0;
}

// ═══════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const searchResultsPage = document.getElementById('search-results-page');
const searchResultsList = document.getElementById('search-results-list');
const searchResultsHeader = document.getElementById('search-results-header');
const contentEl = document.getElementById('content');

let searchDebounce;

searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(doSearch, 200);
});

function doSearch() {
  const q = searchInput.value.trim();
  if (!q) {
    clearSearch();
    return;
  }

  searchClear.classList.add('visible');
  // Locale-aware tokenizer: folds diacritics, and emits bigrams for CJK where
  // whitespace splitting would yield a single unusable token.
  const terms = I18n.tokenize(q);
  if (!terms.length) { clearSearch(); return; }

  const results = SEARCH_INDEX.filter(item => {
    return terms.every(t => item.titleNorm.includes(t) || item.bodyNorm.includes(t));
  }).slice(0, 20);

  // Show search results, hide normal pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  searchResultsPage.classList.add('active');

  searchResultsHeader.textContent = results.length
    ? I18n.tp('search.resultCount', results.length, { q })
    : '';

  if (results.length === 0) {
    searchResultsList.innerHTML =
      `<div class="no-results"><strong>${escHtml(I18n.t('search.noResultsTitle'))}</strong>` +
      `${escHtml(I18n.t('search.noResultsHint'))}</div>`;
    return;
  }

  searchResultsList.innerHTML = '';
  results.forEach(item => {
    const div = document.createElement('button');
    div.type = 'button';
    div.className = 'search-result-item';
    div.innerHTML = `
      <div class="sri-section ${SECTION_COLORS[item.section]}">${escHtml(sectionLabel(item.section))}</div>
      <div class="sri-title">${escHtml(item.title)}</div>
      <div class="sri-snippet">${buildSnippet(item, terms)}</div>`;
    div.addEventListener('click', () => {
      clearSearch();
      navigate(item.section);
      renderSection(item.section);
      setTimeout(() => {
        const card = document.getElementById('card-' + item.id);
        if (card) {
          card.classList.add('open');
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
    searchResultsList.appendChild(div);
  });
}

function clearSearch() {
  searchInput.value = '';
  searchClear.classList.remove('visible');
  searchResultsPage.classList.remove('active');
  document.getElementById('page-' + currentSection)?.classList.add('active');
  document.getElementById('navbtn-' + currentSection)?.classList.add('active');
}

// ═══════════════════════════════════════════════════════
// MY INFO — RENDER FORM
// ═══════════════════════════════════════════════════════
function renderMyInfo() {
  const saved = safeLoad('birth-guide-info', {});

  // Contacts
  const cForm = document.getElementById('contacts-form');
  cForm.innerHTML = '';   // idempotent: re-rendered on every locale change
  CONTACTS.forEach(c => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    const nameVal = saved[c.id + '_name'] || '';
    const phoneVal = saved[c.id + '_phone'] || '';

    row.innerHTML = `
      <div class="contact-row-label">${escHtml(I18n.t('myinfo.contact.' + c.id))}</div>
      <div class="contact-fields">
        ${c.hasName ? `<input class="contact-input" id="ci_${c.id}_name" type="text" placeholder="${escHtml(I18n.t('myinfo.namePlaceholder'))}" value="${escHtml(nameVal)}">` : ''}
        <div class="contact-field-wrap">
          <input class="contact-input" id="ci_${c.id}_phone" type="tel" placeholder="${escHtml(I18n.t('myinfo.phonePlaceholder'))}" value="${escHtml(phoneVal)}" inputmode="tel">
          <button class="action-btn call-btn" onclick="callContact('${c.id}')" title="${escHtml(I18n.t('myinfo.call'))}" aria-label="${escHtml(I18n.t('myinfo.callContact', { name: I18n.t('myinfo.contact.' + c.id) }))}" ${!phoneVal ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </button>
          <button class="action-btn text-btn" onclick="textContact('${c.id}')" title="${escHtml(I18n.t('myinfo.text'))}" aria-label="${escHtml(I18n.t('myinfo.textContact', { name: I18n.t('myinfo.contact.' + c.id) }))}" ${!phoneVal ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </button>
        </div>
      </div>`;

    // Update buttons when phone changes
    const phoneInput = row.querySelector(`#ci_${c.id}_phone`);
    const callBtn = row.querySelector('.call-btn');
    const textBtn = row.querySelector('.text-btn');
    phoneInput.addEventListener('input', () => {
      const has = !!phoneInput.value.trim();
      callBtn.disabled = !has;
      textBtn.disabled = !has;
    });

    cForm.appendChild(row);
  });

  // Details
  const dForm = document.getElementById('details-form');
  dForm.innerHTML = '';
  DETAILS.forEach(d => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    const val = saved[d.id] || '';
    row.innerHTML = `
      <div class="contact-row-label">${escHtml(I18n.t('myinfo.detail.' + d.id + '.label'))}</div>
      <input class="contact-input" id="di_${d.id}" type="${d.type}" placeholder="${escHtml(I18n.t('myinfo.detail.' + d.id + '.placeholder'))}" value="${escHtml(val)}">`;
    dForm.appendChild(row);
  });

  // Notes
  document.getElementById('notes-field').value = saved['notes'] || '';
}

function escHtml(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function callContact(id) {
  const phone = document.getElementById('ci_' + id + '_phone').value.trim().replace(/\s/g,'');
  if (phone) window.location.href = 'tel:' + phone;
}

function textContact(id) {
  const phone = document.getElementById('ci_' + id + '_phone').value.trim().replace(/\s/g,'');
  if (phone) window.location.href = 'sms:' + phone;
}

function saveInfo() {
  const data = {};
  CONTACTS.forEach(c => {
    const n = document.getElementById('ci_' + c.id + '_name');
    const p = document.getElementById('ci_' + c.id + '_phone');
    if (n) data[c.id + '_name'] = n.value.trim();
    if (p) data[c.id + '_phone'] = p.value.trim();
  });
  DETAILS.forEach(d => {
    const el = document.getElementById('di_' + d.id);
    if (el) data[d.id] = el.value.trim();
  });
  data['notes'] = document.getElementById('notes-field').value;

  safeSave('birth-guide-info', data);

  const btn = document.getElementById('save-btn');
  btn.textContent = I18n.t('myinfo.saved');
  btn.classList.add('saved');
  showToast(I18n.t('toast.contactsSaved'));
  setTimeout(() => {
    btn.textContent = I18n.t('myinfo.saveMyInformation');
    btn.classList.remove('saved');
  }, 2500);
}

// ═══════════════════════════════════════════════════════
// PWA INSTALL
// ═══════════════════════════════════════════════════════
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('install-btn').classList.add('visible');
});

function installPWA() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(() => {
    deferredInstallPrompt = null;
    document.getElementById('install-btn').classList.remove('visible');
  });
}

window.addEventListener('appinstalled', () => {
  document.getElementById('install-btn').classList.remove('visible');
  showToast(I18n.t('toast.appInstalled'));
});

// ═══════════════════════════════════════════════════════
// OFFLINE DETECTION
// ═══════════════════════════════════════════════════════
function updateOnlineStatus() {
  document.getElementById('offline-banner').classList.toggle('visible', !navigator.onLine);
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ═══════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════
// ─── Destructive actions ────────────────────────────────
// One policy, replacing three flows that used confirm() and five that deleted
// silently with no way back:
//
//   a single row you can put back  -> delete immediately, offer Undo
//   clearing everything at once    -> confirm() first, because undo of a
//                                     whole log is not worth the complexity
//
// Undo beats a confirm dialog for the high-frequency taps: nobody wants a
// modal every time they remove a mistyped diaper entry, but everybody wants
// the mistake to be recoverable.
let _undoAction = null;
let _undoTimer = null;

function deleteWithUndo(message, undoFn) {
  _undoAction = undoFn;
  clearTimeout(_undoTimer);
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = '';
  t.appendChild(document.createTextNode(message + ' '));
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'toast-undo';
  btn.textContent = I18n.t('common.undo');
  btn.onclick = () => {
    if (_undoAction) _undoAction();
    _undoAction = null;
    clearTimeout(_undoTimer);
    t.classList.remove('show');
    t.style.pointerEvents = '';
  };
  t.appendChild(btn);
  t.classList.add('show');
  t.style.pointerEvents = 'auto';        // the toast is interactive while an undo is live
  _undoTimer = setTimeout(() => {
    t.classList.remove('show');
    t.style.pointerEvents = '';
    _undoAction = null;
  }, 6000);
}

// The timer handle is kept because two toasts can overlap: a second message
// fired while the first is still up used to inherit the first one's timer,
// which then hid the second message early.
let _toastTimer = null;
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;                  // drops any Undo button from a previous toast
  t.style.pointerEvents = '';
  _undoAction = null;
  clearTimeout(_undoTimer);
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

// ═══════════════════════════════════════════════════════
// DARK MODE
// ═══════════════════════════════════════════════════════
function initDarkMode() {
  const saved = safeGet('dark-mode', null);
  if (saved === '1' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
  updateThemeIcon();
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  safeSet('dark-mode', isDark ? '1' : '0');
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  const isDark = document.body.classList.contains('dark');
  if (isDark) {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="none"/>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
  }
}

// ═══════════════════════════════════════════════════════
// DATA EXPORT
// ═══════════════════════════════════════════════════════
// Everything a user would be upset to lose. The two -v2 flags are included
// deliberately: they record that birth-plan and appt-notes have already been
// migrated to id-keyed form, and importing the migrated payload without them
// would run the migration a second time over already-migrated data.
//
// Device preferences (myob.lang, dark-mode) are here too, so a restore on a
// new phone lands in the right language rather than guessing again.
const EXPORT_KEYS = [
  'birth-guide-info', 'kick-history', 'contractions', 'feed-log',
  'diaper-log', 'jaundice-birth-date', 'bp-log', 'weight-log',
  'weight-profile', 'epds-history', 'birth-plan', 'birth-plan-notes', 'appt-notes',
  'nausea-log', 'nausea-snacks', 'nausea-week', 'nausea-tried',
  'myob.epdsLang', 'birth-plan-v2', 'appt-notes-v2',
  'myob.lang', 'dark-mode', 'myob.usNoticeSeen',
];

function exportData() {
  const keys = EXPORT_KEYS;
  const data = {};
  keys.forEach(k => {
    const v = safeGet(k, null);
    if (v !== null) {
      try { data[k] = JSON.parse(v); } catch (e) { data[k] = v; }
    }
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'birth-guide-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast(I18n.t('toast.dataExported'));
}

// There was no way back in: data could leave the app but never return, so a
// new phone meant retyping everything.
function importData(file) {
  const reader = new FileReader();
  reader.onerror = () => showToast(I18n.t('toast.importFailed'));
  reader.onload = () => {
    let data;
    try { data = JSON.parse(reader.result); }
    catch (e) { showToast(I18n.t('toast.importFailed')); return; }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      showToast(I18n.t('toast.importFailed')); return;
    }
    // Only known keys. An arbitrary file must not be able to write whatever it
    // likes into this origin's storage.
    const found = EXPORT_KEYS.filter(k => k in data);
    if (!found.length) { showToast(I18n.t('toast.importNothing')); return; }
    if (!confirm(I18n.t('myinfo.importConfirm', { n: I18n.fmt.num(found.length) }))) return;

    let written = 0;
    found.forEach(k => {
      const v = data[k];
      const ok = typeof v === 'string' ? safeSet(k, v) : safeSave(k, v);
      if (ok) written++;
    });
    if (!written) { showToast(I18n.t('toast.importFailed')); return; }
    // Reload rather than patch: ten trackers read their history into module
    // scope at parse time, so their in-memory copies are now wrong.
    showToast(I18n.t('toast.importDone'));
    setTimeout(() => location.reload(), 900);
  };
  reader.readAsText(file);
}

function handleImportFile(input) {
  const file = input.files && input.files[0];
  input.value = '';                 // so the same file can be picked twice
  if (file) importData(file);
}

// ═══════════════════════════════════════════════════════
// SERVICE WORKER
// ═══════════════════════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showToast(I18n.t('toast.appUpdated'), 4000);
          }
        });
      });
    }).catch(console.error);
  });
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// FIRST-RUN LANGUAGE PICKER
// ═══════════════════════════════════════════════════════
// Shown only until the user has explicitly chosen a language. Auto-detection
// from navigator.languages is a guess — a phone set to English does not mean
// the patient reads English — so the guess never counts as a choice.
let _langHeadingTimer = null;

function maybeShowLanguagePicker() {
  if (I18n.hasExplicitChoice()) return;
  const picker = document.getElementById('lang-picker');
  const grid = document.getElementById('lang-picker-grid');
  if (!picker || !grid) return;

  const codes = Object.keys(I18n.LOCALES);

  grid.innerHTML = codes.map(code => {
    const m = I18n.LOCALES[code];
    return `<button type="button" class="lang-picker-btn" data-lang="${code}"
              lang="${code}" dir="${m.dir}" aria-label="${escHtml(m.name)}">
              <span class="lang-picker-flag" aria-hidden="true"><img src="./flags/${escHtml(m.flag)}.svg" alt="" loading="lazy"></span>
              <span class="lang-picker-native">${escHtml(m.native)}</span>
              <span class="lang-picker-prompt">${escHtml(m.prompt)}</span>
            </button>`;
  }).join('');

  grid.querySelectorAll('.lang-picker-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ok = await I18n.setLocale(btn.dataset.lang);   // persists on success
      if (!ok) {
        // The locale file failed to load (missing or offline). Keep the picker
        // open and say so — silently dismissing would strand the user in a
        // language they did not choose.
        btn.classList.add('lang-picker-failed');
        btn.querySelector('.lang-picker-prompt').textContent = I18n.t('lang.loadFailed');
        return;
      }
      hideLanguagePicker();
      renderLangSwitcher();
      maybeShowUsNotice();
    });
  });

  // Cycle the heading through every language so the instruction is readable
  // to whoever is holding the phone, without needing to scan the tiles.
  let i = 0;
  const heading = document.getElementById('lang-picker-heading');
  const cycle = () => {
    const m = I18n.LOCALES[codes[i % codes.length]];
    heading.textContent = m.prompt;
    heading.setAttribute('lang', codes[i % codes.length]);
    heading.setAttribute('dir', m.dir);
    i++;
  };
  cycle();
  _langHeadingTimer = setInterval(cycle, 1800);

  picker.hidden = false;
  document.body.style.overflow = 'hidden';
  const first = grid.querySelector('.lang-picker-btn');
  if (first) first.focus();
}

function hideLanguagePicker() {
  const picker = document.getElementById('lang-picker');
  if (picker) picker.hidden = true;
  document.body.style.overflow = '';
  if (_langHeadingTimer) { clearInterval(_langHeadingTimer); _langHeadingTimer = null; }
}

// ═══════════════════════════════════════════════════════
// US CARE NOTICE
// ═══════════════════════════════════════════════════════
// The whole guide describes US prenatal care. That has to be stated before
// anyone reads it as general advice, and it has to be in the language they
// just picked — which is why it comes after the picker, not before it.
const US_NOTICE_KEY = 'myob.usNoticeSeen';
const NOTICE_ACCEPTED_KEY = 'myob.noticeAccepted';

// Bump when either panel's meaning changes, so the gate is shown again rather
// than relying on an acceptance the user gave to different words. A wording
// tidy-up does not warrant it; a change to what the app claims about itself
// does.
const NOTICE_VERSION = '1';

function maybeShowUsNotice() {
  // The old boolean flag counts as acceptance of version 1, so existing users
  // are not re-gated for a notice they have already agreed to the substance of.
  if (safeGet(NOTICE_ACCEPTED_KEY, null) === NOTICE_VERSION) return;
  if (safeGet(US_NOTICE_KEY, null) && safeGet(NOTICE_ACCEPTED_KEY, null) === null) {
    safeSet(NOTICE_ACCEPTED_KEY, NOTICE_VERSION);
    return;
  }

  const el = document.getElementById('us-notice');
  if (!el) return;
  const p1 = document.getElementById('notice-panel-1');
  const p2 = document.getElementById('notice-panel-2');
  const next = document.getElementById('notice-next');
  const ok = document.getElementById('us-notice-ok');
  if (!p1 || !p2 || !next || !ok) return;

  I18n.applyStatic(el);            // render it in the language just chosen

  // Say so if this language has not been reviewed. The header banner is behind
  // the overlay at this point, so without this the disclaimer reads as though
  // a clinician had checked its wording in this language.
  const mt = document.getElementById('notice-mt');
  if (mt) {
    const reviewed = (MYOB_LOCALES[I18n.lang] || {}).reviewed === true;
    mt.hidden = reviewed;
    if (!reviewed) mt.textContent = I18n.t('lang.unreviewedNotice');
  }

  p1.hidden = false;
  p2.hidden = true;
  el.hidden = false;
  document.body.style.overflow = 'hidden';

  if (next.dataset.bound !== '1') {
    next.dataset.bound = '1';
    next.addEventListener('click', () => {
      p1.hidden = true;
      p2.hidden = false;
      ok.focus();
    });
  }
  if (ok.dataset.bound !== '1') {
    ok.dataset.bound = '1';
    ok.addEventListener('click', () => {
      safeSet(NOTICE_ACCEPTED_KEY, NOTICE_VERSION);
      safeSet(US_NOTICE_KEY, '1');       // kept so an older build still sees it
      el.hidden = true;
      document.body.style.overflow = '';
    });
  }
  next.focus();
}

// ═══════════════════════════════════════════════════════
// LANGUAGE SWITCHER
// ═══════════════════════════════════════════════════════
function renderLangSwitcher() {
  const btn = document.getElementById('lang-btn');
  const pop = document.getElementById('lang-pop');
  const grid = document.getElementById('lang-pop-grid');
  if (!btn || !pop || !grid) return;

  grid.innerHTML = Object.keys(I18n.LOCALES).map(code => {
    const m = I18n.LOCALES[code];
    return `<button type="button" class="lang-chip${code === I18n.lang ? ' current' : ''}"
              data-lang="${code}" lang="${code}" dir="${m.dir}"
              aria-label="${escHtml(m.name)}"${code === I18n.lang ? ' aria-current="true"' : ''}>
              <span class="lang-chip-flag" aria-hidden="true"><img src="./flags/${escHtml(m.flag)}.svg" alt="" loading="lazy"></span>
              <span class="lang-chip-name">${escHtml(m.native)}</span>
            </button>`;
  }).join('');

  grid.querySelectorAll('.lang-chip').forEach(chip => {
    chip.addEventListener('click', async () => {
      const ok = await I18n.setLocale(chip.dataset.lang);
      if (!ok) { chip.classList.add('failed'); return; }
      closeLangPop();
      renderLangSwitcher();
    });
  });

  if (btn.dataset.bound !== '1') {
    btn.dataset.bound = '1';
    btn.addEventListener('click', e => { e.stopPropagation(); togglePop(); });
    // Dismiss on outside tap or Escape, like any other popover.
    document.addEventListener('click', e => {
      if (!pop.hidden && !pop.contains(e.target) && e.target !== btn) closeLangPop();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLangPop(); });
  }
  updateTranslationNotice();
}

function togglePop() {
  const pop = document.getElementById('lang-pop');
  if (!pop) return;
  if (pop.hidden) openLangPop(); else closeLangPop();
}

function openLangPop() {
  const pop = document.getElementById('lang-pop');
  const btn = document.getElementById('lang-btn');
  if (!pop) return;
  pop.hidden = false;
  requestAnimationFrame(() => pop.classList.add('open'));
  if (btn) btn.setAttribute('aria-expanded', 'true');
  pop.querySelector('.lang-chip')?.focus();
}

function closeLangPop() {
  const pop = document.getElementById('lang-pop');
  const btn = document.getElementById('lang-btn');
  if (!pop || pop.hidden) return;
  pop.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  setTimeout(() => { pop.hidden = true; }, 160);
}

// Non-English content is LLM-drafted pending clinician review. Patients are
// told so explicitly rather than being handed unreviewed medical guidance
// that looks as authoritative as the reviewed English.
function updateTranslationNotice() {
  const el = document.getElementById('translation-notice');
  if (!el) return;
  const reviewed = (MYOB_LOCALES[I18n.lang] || {}).reviewed === true;
  const lines = [];
  if (!reviewed) lines.push(I18n.t('lang.unreviewedNotice'));
  // Say why English is showing through mid-page. Unexplained English inside a
  // translated card reads as a bug; named as "the English was updated and this
  // passage has not caught up", it reads as the safety behaviour it is.
  // Count-free on purpose: a patient cannot act on "three passages", and
  // several languages have no plural distinction, so a count forced the plural
  // wording onto every one of them.
  if (staleSet(I18n.lang).size) lines.push(I18n.t('lang.staleNotice'));
  el.hidden = !lines.length;
  el.textContent = lines.join(' ');
}

// Re-render every locale-dependent surface. Called on language switch.
function applyLocaleToApp() {
  // Preserve anything typed but not yet saved — a language switch must not
  // silently discard the phone number the user is halfway through entering.
  const live = {};
  document.querySelectorAll('#contacts-form input, #details-form input').forEach(el => {
    if (el.value) live[el.id] = el.value;
  });

  buildSearchIndex();

  renderMyInfo();
  Object.keys(live).forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = live[id]; el.dispatchEvent(new Event('input')); }
  });

  // Force content cards to rebuild in the new language.
  document.querySelectorAll('[id^="cards-"]').forEach(c => {
    delete c.dataset.rendered;
    c.innerHTML = '';
  });
  Object.keys(CONTENT_STRUCTURE).forEach(sec => {
    if (document.getElementById('page-' + sec)?.classList.contains('active')) renderSection(sec);
  });

  // Re-init whichever tool is on screen so its generated markup is translated.
  const init = TOOL_INITS[currentSection];
  if (typeof init === 'function') init();

  document.title = I18n.t('app.title');
  // Driven by the locale change itself, not by the switcher widget — the
  // locale can also change via ?lang=, saved preference, or a direct call.
  updateTranslationNotice();
  // Refresh the picker so the current-language chip moves with the locale.
  renderLangSwitcher();
  if (searchInput && searchInput.value.trim()) doSearch();
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  // i18n must resolve BEFORE anything renders, otherwise the first paint is
  // English and then visibly swaps.
  await I18n.boot();
  I18n.onChange(applyLocaleToApp);

  document.title = I18n.t('app.title');
  buildSearchIndex();
  renderMyInfo();
  updateOnlineStatus();
  initDarkMode();
  renderLangSwitcher();
  maybeShowLanguagePicker();
  // Only reaches this if the picker did not open, i.e. a language was already
  // chosen. Someone mid-way through should still see the notice once.
  if (I18n.hasExplicitChoice()) maybeShowUsNotice();
});
