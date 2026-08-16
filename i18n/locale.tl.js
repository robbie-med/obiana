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
      "unreviewedNotice": "Ang pagsasaling ito ay gawa ng makina at hindi pa nasusuri ng isang clinician. Para sa mga desisyong medikal, kumpirmahin sa inyong care team o lumipat sa Ingles.",
      "loadFailed": "Hindi ma-load",
      "inProgress": "Isinasalin pa"
    },
    "usNotice": {
      "title": "Pangangalaga sa Estados Unidos",
      "body": "Inilalarawan ng gabay na ito ang prenatal care na ibinibigay sa Estados Unidos, at isinulat para sa mga inang nagpapaalaga rito. Malaki ang pagkakaiba ng prenatal care sa bawat bansa. Ang iskedyul ng pagpapatingin, mga pagsusuri at rekomendasyon sa ibang lugar ay maaaring hindi tumugma sa nababasa ninyo rito. Kung nagpapaalaga kayo sa ibang bansa, malamang na hindi para sa inyo ang app na ito.",
      "continue": "Naiintindihan ko"
    },
    "tools": {
      "helpUsImprove": "Tulungan Kaming Bumuti"
    },
    "home": {
      "heroTitle": "Alamin ang<br>aasahan. Magtanong<br>nang mahusay.",
      "heroDesc": "Mula sa iyong unang prenatal na pagpapatingin hanggang sa panganganak at paggaling, pinagsasama ng Obiana ang lahat sa isang lugar."
    },
    "disclaimer": {
      "title": "Bago magsimula",
      "education": "Ipinapaliwanag ng Obiana ang karaniwang nangyayari. Hindi ito payong medikal. Hindi ka nito kilala at hindi nito alam ang iyong pagbubuntis. Alam ito ng iyong doktor o komadrona.",
      "tools": "Ang mga tracker ay nag-iimbak lamang ng iyong itinatala. Wala itong sinusukat o dinidiyagnos. Kapag sinabi nitong tumawag, ibig sabihin ay magtanong.",
      "emergency": "Huwag gamitin ang app na ito sa emergency. Tumawag sa 911 o sa labor and delivery.",
      "sources": "Kapag may binibigay na numero ang gabay na ito, sinasabi rin kung kanino ito galing. Kadalasan ay ACOG o AAP. Sinusunod din ito ng iyong care team.",
      "continue": "Naiintindihan ko",
      "toolsNote": "Iniimbak ng mga tool na ito ang iyong itinatala. Hindi ito nagdidiyagnos."
    },
    "about": {
      "whatThisIs": "Ano ang Obiana",
      "privacyHeading": "Ang iyong impormasyon",
      "privacyOnDevice": "Ang iyong itinatala ay nananatili sa teleponong ito. Walang account, walang sign-in, walang ipinapadala. Mawawala ito kapag binura mo ang data ng browser, kaya gamitin ang Export para magkaroon ng kopya.",
      "privacySubmit": "Dalawang button lang ang nagpapadala: ang translation helper at ang Help Improve This Guide. Ipinapadala nila ang iyong mensahe, ang iyong bansa, at isang naka-scramble na anyo ng iyong network address para maiwasan ang spam. Hindi ang pangalan mo. Wala sa iyong mga tala."
    }
  }
};
