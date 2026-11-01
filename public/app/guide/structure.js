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
      "id": "early-bleeding",
      "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--teal)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3c-3.5 4.5 -6 8 -6 11a6 6 0 0 0 12 0c0 -3 -2.5 -6.5 -6 -11z\" /></svg>",
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
      "type": "myth",
      "in": "pregnancy"
    },
    {
      "id": "faq-coffee",
      "type": "myth",
      "in": "pregnancy"
    },
    {
      "id": "faq-hair-dye",
      "type": "myth",
      "in": "pregnancy"
    },
    {
      "id": "faq-exercise-mc",
      "type": "myth",
      "in": "pregnancy"
    },
    {
      "id": "faq-sex-pregnancy",
      "type": "faq",
      "in": "pregnancy"
    },
    {
      "id": "faq-vaccines",
      "type": "faq",
      "in": "pregnancy"
    },
    {
      "id": "faq-eat-for-two",
      "type": "myth",
      "in": "pregnancy"
    },
    {
      "id": "faq-hot-tub",
      "type": "faq",
      "in": "pregnancy"
    },
    {
      "id": "faq-epidural-csec",
      "type": "myth",
      "in": "labor"
    },
    {
      "id": "faq-routine-episiotomy",
      "type": "myth",
      "in": "labor"
    },
    {
      "id": "faq-water-breaking",
      "type": "myth",
      "in": "labor"
    },
    {
      "id": "faq-eat-in-labor",
      "type": "faq",
      "in": "labor"
    },
    {
      "id": "faq-vbac",
      "type": "faq",
      "in": "labor"
    },
    {
      "id": "faq-bf-bc",
      "type": "myth",
      "in": "recovery"
    },
    {
      "id": "faq-stress-milk",
      "type": "myth",
      "in": "baby"
    },
    {
      "id": "faq-bonding",
      "type": "myth",
      "in": "recovery"
    },
    {
      "id": "faq-ibuprofen-bf",
      "type": "faq",
      "in": "baby"
    },
    {
      "id": "faq-jaundice",
      "type": "faq",
      "in": "baby"
    },
    {
      "id": "faq-newborn-procedures",
      "type": "faq",
      "in": "baby"
    },
    {
      "id": "faq-first-bath",
      "type": "faq",
      "in": "baby"
    }
  ]
};
