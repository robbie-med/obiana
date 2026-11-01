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
      "title": "Obiana Handbook sa Pagbubuntis",
      "prenatal": "Pagbubuntis",
      "labor": "Panganganak",
      "recovery": "Paggaling",
      "baby": "Baby"
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
      "helpUsImprove": "Tulungan Kaming Bumuti",
      "contractionTimer": "Orasan ng paghilab"
    },
    "home": {
      "heroTitle": "Alamin ang<br>aasahan. Magtanong<br>nang mahusay.",
      "duringPregnancy": "Habang buntis",
      "callYourDoctorIf": "Tawagan ang iyong family doctor, OB o komadrona kung…",
      "vaginalBleeding": "Pagdurugo sa ari",
      "fluidGushingOrTrickling": "Tubig na bumubulwak o tumutulo",
      "babyNotMovingNormally": "Hindi gumagalaw ang baby gaya ng dati",
      "severeHeadache": "Matinding sakit ng ulo",
      "visionChanges": "Pagbabago sa paningin",
      "suddenSwellingOfFaceHands": "Biglang pamamaga ng mukha o kamay",
      "fever1004F": "Lagnat &gt;100.4°F",
      "contractionsBefore37Weeks": "Paghilab bago mag-37 linggo"
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
    },
    "urgent": {
      "title": "Kailan tatawag",
      "call911": "Tumawag sa 911",
      "callLd": "Tawagan ang labor & delivery",
      "addLd": "Idagdag ang numero ng labor & delivery sa Ako.",
      "tellThem": "Kung nanganak ka sa nakaraang isang taon, sabihin ito sa sinumang tatawagan o pupuntahan mo. May mga malubhang problema pagkatapos manganak na hindi napapansin kapag hindi alam ng staff.",
      "helpLines": "Mga help line: libre, anumang oras",
      "line988": "May iniisip na saktan ang sarili, o nasa krisis: tumawag o mag-text sa 988, ang Suicide & Crisis Lifeline.",
      "lineMama": "Kung malungkot, balisa o nabibigatan ka, habang buntis o pagkatapos manganak: National Maternal Mental Health Hotline, 1-833-TLC-MAMA (1-833-852-6262). Tumawag o mag-text. May interpreter sa maraming wika.",
      "linePoison": "Kung ikaw o ang baby ay may nalunok: Poison Control, 1-800-222-1222.",
      "lineDv": "Kung hindi ka ligtas sa bahay: National Domestic Violence Hotline, 1-800-799-7233, o i-text ang START sa 88788.",
      "call": "Tumawag",
      "text": "Mag-text"
    },
    "nav": {
      "prenatal": "Prenatal<br>na Check-up",
      "labor": "Labor &amp;<br>Panganganak",
      "recovery": "Paggaling<br>Pagkapanganak",
      "baby": "Ang Iyong<br>Bagong Silang",
      "toolsTrackers": "Mga Tool &amp;<br>Tracker",
      "today": "Ngayon",
      "guide": "Gabay",
      "urgent": "Kailan tatawag",
      "me": "Ako"
    },
    "today": {
      "whereNow": "Nasaan ka na ngayon?",
      "pregnant": "Buntis ako",
      "dueLabel": "Due date",
      "babyHere": "Ipinanganak na ang baby ko",
      "bornLabel": "Kaarawan ng baby",
      "save": "Ipakita ang susunod",
      "savedOnPhone": "Nasa phone mo lang ito. Mapapalitan mo ito anumang oras sa Ako.",
      "week": "Linggo {week}",
      "due": "Due {date}",
      "babyDays": {
        "one": "{count} araw na ang baby mo",
        "other": "{count} araw na ang baby mo"
      },
      "babyWeeks": {
        "one": "{count} linggo na ang baby mo",
        "other": "{count} linggo na ang baby mo"
      },
      "visitsNow": "Sa mga check-up mo ngayon",
      "comingUp": "Susunod",
      "allVisits": "Lahat ng check-up, linggo-linggo",
      "toolsNow": "Kapaki-pakinabang ngayon",
      "changeDates": "Palitan ang mga petsa"
    },
    "visits": {
      "title": "Ang mga check-up mo, linggo-linggo",
      "sub": "Ano ang nangyayari sa bawat check-up, at ano ang ikaw ang magpapasya",
      "lead": "Ito ang karaniwang iskedyul sa US. Maaaring iba ang sa iyo: nagdadagdag ang iyong family doctor, OB o komadrona ng check-up at test kapag kailangan mo.",
      "afterBirth": "Pagkatapos manganak",
      "yourChoice": "Ikaw ang pipili",
      "first": {
        "when": "Mga 8–10 linggo",
        "title": "Unang check-up",
        "i1": "Kinukuwenta ang due date mo mula sa huling regla, madalas kasama ang maagang ultrasound.",
        "i2": "Mga blood test: blood type at Rh, blood count, immunity sa rubella at bulutong-tubig, hepatitis B at C, HIV at syphilis. Urine test, at test para sa chlamydia at gonorrhea.",
        "i3": "Maagang sugar test kung nagka-diabetes ka sa nakaraang pagbubuntis o may iba kang risk factor.",
        "i4": "Kung mas mataas ang panganib mo sa preeclampsia, ang low-dose aspirin (81 mg bawat araw) mula 12 linggo ay nagpapababa ng panganib na iyon. Itanong kung bagay ito sa iyo."
      },
      "genetic": {
        "when": "Mula 10 linggo",
        "title": "Mga test para sa baby",
        "i1": "Ang blood test mula 10 linggo (cell-free DNA) ay nagsi-screen para sa Down syndrome at ilang iba pang kondisyon. Hindi diagnosis ang screening: kung positibo, aalukin ka ng diagnostic test.",
        "i2": "Tinitingnan ng carrier screening kung may dala kang gene para sa mga kondisyon gaya ng cystic fibrosis o spinal muscular atrophy.",
        "i3": "Puwede mong gawin lahat, ilan, o wala sa mga ito."
      },
      "monthly": {
        "when": "Bawat 4 na linggo, hanggang 28 linggo",
        "title": "Regular na check-up",
        "i1": "Blood pressure, timbang, ihi at tibok ng puso ng baby. Mula mga 20 linggo, sinusukat din ang laki ng tiyan mo."
      },
      "anatomy": {
        "when": "18–22 linggo",
        "title": "Anatomy ultrasound",
        "i1": "Detalyadong ultrasound ng katawan ng baby, paglaki nito at ng inunan. Kadalasan malalaman mo ang kasarian, kung gusto mo."
      },
      "sugar": {
        "when": "24–28 linggo",
        "title": "Sugar test at blood test",
        "i1": "Isang matamis na inumin, tapos blood test makalipas ang isang oras, para malaman kung may gestational diabetes.",
        "i2": "Blood count para sa anemia, at isa pang syphilis test.",
        "i3": "Kung Rh negative ang blood type mo: isang Rh shot (RhoGAM) sa mga 28 linggo."
      },
      "tdap": {
        "when": "27–36 linggo",
        "title": "Bakuna laban sa whooping cough (Tdap)",
        "i1": "Naipapasa ang antibodies mo sa baby at pinoprotektahan siya sa mga unang buwan, bago siya mabakunahan. Ibinibigay ito sa bawat pagbubuntis."
      },
      "twoweekly": {
        "when": "Bawat 2 linggo, mula 28 linggo",
        "title": "Mas madalas ang check-up",
        "i1": "Kilalanin kung paano karaniwang gumagalaw ang baby mo. Opsyonal ang pagbilang ng sipa. Kung mas kaunti ang galaw ng baby kaysa dati, tumawag sa araw ding iyon. Huwag hintayin ang susunod na check-up.",
        "i2": "Kung may kondisyon ka gaya ng altapresyon o diabetes, madalas magsimula ang dagdag na pagsusuri sa baby (non-stress test o ultrasound) sa mga 32 linggo."
      },
      "rsv": {
        "when": "32–36 linggo, Setyembre hanggang Enero",
        "title": "Proteksyon sa RSV para sa baby",
        "i1": "Alinman sa bakuna laban sa RSV para sa iyo sa 32 hanggang 36 linggo, o antibody shot para sa baby pagkapanganak. Isa lang, hindi pareho. Pareho silang nagpapababa ng tsansang ma-ospital ang baby dahil sa RSV sa una niyang taglamig."
      },
      "gbs": {
        "when": "36–37 linggo",
        "title": "Group B strep swab, at posisyon ng baby",
        "i1": "Swab ng ari at puwit. Mga 1 sa 4 na babae ang may GBS, at hindi ka nito sinasaktan. Kung positibo ka, bibigyan ka ng IV antibiotics habang nanganganak para protektahan ang baby.",
        "i2": "Titingnan kung nakababa ang ulo ng baby. Kung suhi ang baby (breech), maaari kang alukin ng paraan para ipaikot ang baby (external cephalic version), o puwede kang magplano ng C-section.",
        "i3": "Balikan ang birth plan mo: pampaginhawa sa sakit, sino ang kasama mo, pagpapakain."
      },
      "weekly": {
        "when": "Bawat linggo, mula 36 linggo",
        "title": "Ang mga huling linggo",
        "i1": "Mula 38 linggo, maaari kang alukin ng membrane sweep: pagdaan ng daliri sa cervix na makakatulong magsimula ang labor.",
        "i2": "Maaaring ialok ang induction mula 39 linggo. Pagdating ng 41 linggo, inirerekomenda ito, dahil nagsisimulang tumaas ang panganib sa baby."
      },
      "ppBp": {
        "when": "3–10 araw pagkapanganak",
        "title": "Pagsukat ng blood pressure, kung mataas ito dati",
        "i1": "Kung nagka-altapresyon o preeclampsia ka, ipasukat ito sa loob ng 3 hanggang 10 araw pagkapanganak. Puwedeng magsimula o lumala ang preeclampsia pagkatapos manganak."
      },
      "pp3": {
        "when": "Sa loob ng 3 linggo pagkapanganak",
        "title": "Unang kumustahan",
        "i1": "Kausapin ang iyong family doctor, OB o komadrona tungkol sa pagdurugo, sakit, pagpapakain, mood at tulog. Puwedeng tawag o video call."
      },
      "ppFull": {
        "when": "Bago mag-12 linggo pagkapanganak, madalas sa 4–6",
        "title": "Buong postpartum check-up",
        "i1": "Pagtingin sa mood, birth control, paggaling mo, at anumang plano sa susunod na pagbubuntis.",
        "i2": "Kung nagka-gestational diabetes ka: sugar test 4 hanggang 12 linggo pagkapanganak. Mas mataas habambuhay ang panganib ng type 2 diabetes, kaya magpasuri tuwing 1 hanggang 3 taon.",
        "i3": "Kung naiihi o natatae ka nang hindi sinasadya, masakit ang pagtatalik, o may nararamdamang umbok sa ari, itanong ang pelvic floor physical therapy. Nakakatulong ito. Hindi mo kailangang tiisin."
      }
    }
  },
  "content": {
    "postpartum-danger": {
      "title": "",
      "sub": "",
      "t": [
        "Pumunta sa ER o tumawag sa 911 kung may",
        "Pananakit ng dibdib o hirap huminga · Kombulsyon · Biglaang matinding sakit ng ulo na hindi pa naranasan · Senyales ng stroke (nakalaylay na mukha, mahinang braso, bulol na pagsasalita) · Iniisip na saktan ang sarili o ang baby",
        "Tawagan ang iyong family doctor, OB o komadrona kung may",
        "Lagnat &gt;100.4°F · Basang-basa ang 1 napkin sa loob ng isang oras · Matinding sakit ng ulo na hindi nawawala sa ibuprofen/Tylenol · Pagbabago sa paningin · Pamumula, pamamaga, o init sa binti (DVT, namuong dugo sa malalim na ugat) · Bumubukang sugat, kumakalat na pamumula, o nana · Hirap umihi · Senyales ng postpartum depression (PPD) o pagkabalisa",
        ""
      ]
    },
    "signs-of-labor": {
      "title": "",
      "sub": "",
      "t": [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Ang 5-1-1 Rule (unang anak)",
        "Pumunta sa ospital kapag ang paghilab ay",
        "bawat 5 minuto, tumatagal ng 1 minuto, nang hindi bababa sa 1 oras",
        ". Sa ikalawa o sumunod na anak, pumunta nang mas maaga. Tumawag kapag bawat 6–8 minuto na, dahil mas mabilis ang labor.",
        "Pumunta agad kung may alinman dito",
        "Pumutok ang panubigan",
        "(bumulwak o tuloy-tuloy na tumutulo) · Matingkad na pulang pagdurugo (higit sa patak) · Tumigil sa paggalaw ang baby · Matindi at tuloy-tuloy na sakit ng tiyan · Senyales ng preeclampsia: matinding sakit ng ulo na hindi nawawala sa Tylenol, pagbabago sa paningin, biglang matinding pamamaga",
        "",
        ""
      ]
    },
    "normal-newborn": {
      "title": "",
      "sub": "",
      "t": [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Tawagan agad ang doktor ng baby kung may",
        "Lagnat ≥ 100.4°F sa puwit (seryoso sa bagong silang. Laging sa puwit kunin ang temperatura) · Ayaw dumede · Matinding paninilaw · Umuungol sa bawat hinga · Napakaputla ng balat · Iyak na hindi mapatahan · Mas kaunti sa 6 na basang diaper bawat araw pagkalipas ng ika-5 araw · Naninigas na leeg. Asul o kulay-abo na labi o mukha: tumawag sa 911."
      ]
    }
  },
  "srcHash": {
    "content.postpartum-danger.t.0": "8e2a678f78c207ed",
    "content.postpartum-danger.t.1": "d26dc5484bcab5f6",
    "content.postpartum-danger.t.2": "bee2b3c377a8a3e5",
    "content.postpartum-danger.t.3": "8a9f90651b64d9d3",
    "content.signs-of-labor.t.11": "3973fa2849b83e92",
    "content.signs-of-labor.t.12": "61f8135000473a76",
    "content.signs-of-labor.t.13": "d0b262a299176734",
    "content.signs-of-labor.t.14": "48cc3887b50a326d",
    "content.signs-of-labor.t.15": "155392951f86e7af",
    "content.signs-of-labor.t.16": "ac6a34b445ceccaa",
    "content.signs-of-labor.t.17": "b007f20008122ab6",
    "content.normal-newborn.t.31": "3f69f29898ba59ba",
    "content.normal-newborn.t.32": "380945be7751b37c"
  },
  "unreviewed": {
    "urgent.title": 1,
    "urgent.call911": 1,
    "urgent.callLd": 1,
    "urgent.addLd": 1,
    "urgent.tellThem": 1,
    "urgent.helpLines": 1,
    "urgent.line988": 1,
    "urgent.lineMama": 1,
    "urgent.linePoison": 1,
    "urgent.lineDv": 1,
    "urgent.call": 1,
    "urgent.text": 1,
    "home.duringPregnancy": 1,
    "home.callYourDoctorIf": 1,
    "home.vaginalBleeding": 1,
    "home.fluidGushingOrTrickling": 1,
    "home.babyNotMovingNormally": 1,
    "home.severeHeadache": 1,
    "home.visionChanges": 1,
    "home.suddenSwellingOfFaceHands": 1,
    "home.fever1004F": 1,
    "home.contractionsBefore37Weeks": 1,
    "content.postpartum-danger.t.0": 1,
    "content.postpartum-danger.t.1": 1,
    "content.postpartum-danger.t.2": 1,
    "content.postpartum-danger.t.3": 1,
    "content.signs-of-labor.t.11": 1,
    "content.signs-of-labor.t.12": 1,
    "content.signs-of-labor.t.13": 1,
    "content.signs-of-labor.t.14": 1,
    "content.signs-of-labor.t.15": 1,
    "content.signs-of-labor.t.16": 1,
    "content.signs-of-labor.t.17": 1,
    "content.normal-newborn.t.31": 1,
    "content.normal-newborn.t.32": 1,
    "nav.prenatal": 1,
    "nav.labor": 1,
    "nav.recovery": 1,
    "nav.baby": 1,
    "nav.toolsTrackers": 1,
    "nav.today": 1,
    "nav.guide": 1,
    "nav.urgent": 1,
    "nav.me": 1,
    "app.prenatal": 1,
    "app.labor": 1,
    "app.recovery": 1,
    "app.baby": 1,
    "today.whereNow": 1,
    "today.pregnant": 1,
    "today.dueLabel": 1,
    "today.babyHere": 1,
    "today.bornLabel": 1,
    "today.save": 1,
    "today.savedOnPhone": 1,
    "today.week": 1,
    "today.due": 1,
    "today.babyDays": 1,
    "today.babyWeeks": 1,
    "today.visitsNow": 1,
    "today.comingUp": 1,
    "today.allVisits": 1,
    "today.toolsNow": 1,
    "today.changeDates": 1,
    "visits.title": 1,
    "visits.sub": 1,
    "visits.lead": 1,
    "visits.afterBirth": 1,
    "visits.yourChoice": 1,
    "visits.first.when": 1,
    "visits.first.title": 1,
    "visits.first.i1": 1,
    "visits.first.i2": 1,
    "visits.first.i3": 1,
    "visits.first.i4": 1,
    "visits.genetic.when": 1,
    "visits.genetic.title": 1,
    "visits.genetic.i1": 1,
    "visits.genetic.i2": 1,
    "visits.genetic.i3": 1,
    "visits.monthly.when": 1,
    "visits.monthly.title": 1,
    "visits.monthly.i1": 1,
    "visits.anatomy.when": 1,
    "visits.anatomy.title": 1,
    "visits.anatomy.i1": 1,
    "visits.sugar.when": 1,
    "visits.sugar.title": 1,
    "visits.sugar.i1": 1,
    "visits.sugar.i2": 1,
    "visits.sugar.i3": 1,
    "visits.tdap.when": 1,
    "visits.tdap.title": 1,
    "visits.tdap.i1": 1,
    "visits.twoweekly.when": 1,
    "visits.twoweekly.title": 1,
    "visits.twoweekly.i1": 1,
    "visits.twoweekly.i2": 1,
    "visits.rsv.when": 1,
    "visits.rsv.title": 1,
    "visits.rsv.i1": 1,
    "visits.gbs.when": 1,
    "visits.gbs.title": 1,
    "visits.gbs.i1": 1,
    "visits.gbs.i2": 1,
    "visits.gbs.i3": 1,
    "visits.weekly.when": 1,
    "visits.weekly.title": 1,
    "visits.weekly.i1": 1,
    "visits.weekly.i2": 1,
    "visits.ppBp.when": 1,
    "visits.ppBp.title": 1,
    "visits.ppBp.i1": 1,
    "visits.pp3.when": 1,
    "visits.pp3.title": 1,
    "visits.pp3.i1": 1,
    "visits.ppFull.when": 1,
    "visits.ppFull.title": 1,
    "visits.ppFull.i1": 1,
    "visits.ppFull.i2": 1,
    "visits.ppFull.i3": 1,
    "tools.contractionTimer": 1
  }
};
