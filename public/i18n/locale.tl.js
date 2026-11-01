// ═══════════════════════════════════════════════════════
// LOCALE: tl
// ═══════════════════════════════════════════════════════
// STUB. Only these strings are translated; every other key falls back to
// English at runtime, so the app is fully usable while translation proceeds.
//
// reviewed:false drives the machine-translation notice shown to the patient.
// No `epds` key => the mood screen is gated off for this language until an
// OFFICIAL validated instrument is added. Never machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.tl = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Obiana Handbook sa Pagbubuntis"
    },
    "lang": {
      "unreviewedNotice": "Makina ang nagsalin nito, at hindi pa ito nasusuri ng doktor. Kung may hindi malinaw, magtanong sa iyong care team.",
      "loadFailed": "Hindi ma-load",
      "inProgress": "Isinasalin pa"
    },
    "usNotice": {
      "title": "Pangangalaga sa Estados Unidos",
      "body": "Sinusunod ng Obiana ang prenatal care sa United States. Maaaring iba ang mga pagbisita, test at payo sa ibang bansa.",
      "continue": "Naiintindihan ko"
    },
    "tools": {
      "helpUsImprove": "Tulungan Kaming Bumuti"
    },
    "home": {
      "heroTitle": "Alamin ang<br>aasahan. Magtanong<br>nang mahusay."
    },
    "disclaimer": {
      "title": "Bago magsimula",
      "education": "Pangkalahatang impormasyon ito, hindi payong medikal. Itanong sa iyong family doctor, OB o komadrona ang tungkol sa sarili mong pagbubuntis.",
      "tools": "Iniimbak lang ng mga tracker ang tina-type mo. Hindi sila makakapag-diagnose ng anuman.",
      "emergency": "Sa emergency, tumawag sa 911.",
      "continue": "Naiintindihan ko"
    },
    "about": {
      "whatThisIs": "Ano ang Obiana",
      "privacyHeading": "Ang iyong impormasyon",
      "privacyOnDevice": "Ang iyong itinatala ay nananatili sa teleponong ito. Walang account, walang sign-in, walang ipinapadala. Mawawala ito kapag binura mo ang data ng browser, kaya gamitin ang Export para magkaroon ng kopya.",
      "privacySubmit": "Dalawang button lang ang nagpapadala: ang Help translate at ang Help Improve This Guide. Ipinapadala nila ang isinulat mo, ang iyong bansa, at isang naka-scramble na network address para maiwasan ang spam. Hindi kailanman ang pangalan mo o ang laman ng iyong mga tracker."
    }
  }
};
