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
    },
    "faq-deli": {
      "title": "Puwede ba akong kumain ng deli meat at malambot na keso?",
      "sub": "",
      "t": [
        "Ang pangunahing panganib ay ang",
        "Listeria",
        ", isang impeksiyon ng bakterya na bihira pero maaaring maging malubha sa pagbubuntis (maaaring tumawid sa inunan). Payo ng FDA na iwasan ang keso na hindi pasteurized at deli meat maliban kung pinainit hanggang umusok (165°F). Ligtas ang karamihan ng pasteurized na malambot na keso (tulad ng pasteurized na brie, feta na nasa pakete). Ang eksepsiyon ay queso fresco, queso blanco, panela at mga katulad na sariwang keso: kahit ang pasteurized ay nagdulot na ng listeria outbreak, kaya kainin lang ang mga ito kung niluto hanggang umusok. Napakababa ng kabuuang panganib mula sa paminsan-minsang deli meat. Kung hindi sigurado, initin ito."
      ]
    },
    "faq-coffee": {
      "title": "Puwede ba ako uminom ng kahit kaunting caffeine?",
      "sub": "",
      "t": [
        "Oo. Inirerekomenda ng ACOG na limitahan ang caffeine sa",
        "mas mababa sa 200 mg bawat araw",
        "(mga isang 12-oz na tasa ng drip coffee). Sa ganitong dami, walang napatunayang pinsala sa pagbubuntis. May caffeine din ang tsaa, soda at tsokolate. Bilangin silang lahat nang sabay. Makatwiran ang magbawas; ang tuluyang pagtigil ay personal na desisyon, hindi kailangan sa medisina."
      ]
    },
    "faq-hair-dye": {
      "title": "Puwede ba akong magpakulay ng buhok habang buntis?",
      "sub": "",
      "t": [
        "Oo, pero isipin kung bakit mo ito gagawin. Napakaliit na dami ng pangkulay ang nasisipsip ng anit. Walang nalathalang pag-aaral na nagpakita ng pinsala sa sanggol sa dami na ginagamit sa karaniwang pagpapakulay sa salon o sa bahay. Mas kaunti pa ang dikit sa anit ng highlights (foil). Kung nag-aalala ka, maghintay hanggang ikalawang trimester, kapag buo na ang mga pangunahing organ, o huwag na lang gawin."
      ]
    },
    "faq-exercise-mc": {
      "title": "Nagdudulot ba ng pagkalaglag ang ehersisyo?",
      "sub": "",
      "t": [
        "Hindi. Hindi nagdudulot ng pagkalaglag ang katamtamang ehersisyo sa malusog na pagbubuntis. Ang tamang dami ng ehersisyo ay nagpoprotekta, hindi nakakasama. Tingnan ang mga gabay sa ehersisyo sa seksiyong Prenatal. Kung sinabi ng iyong doktor na huwag kang mag-ehersisyo, itanong kung bakit, at sundin ang payong iyon."
      ]
    },
    "faq-sex-pregnancy": {
      "title": "Ligtas bang makipagtalik habang buntis?",
      "sub": "",
      "t": [
        "Oo, sa normal na pagbubuntis na walang komplikasyon. Hindi nagdudulot ang pakikipagtalik ng pagkalaglag, maagang panganganak, o pinsala sa sanggol (na protektado ng amniotic fluid). Irerekomenda lang ng doktor ang pelvic rest (walang pakikipagtalik) sa mga partikular na sitwasyon: placenta previa, panganib ng maagang panganganak, pagdurugo sa ari na hindi maipaliwanag, ilang kondisyon ng cervix, o pagkatapos pumutok ang panubigan. Kung hindi ka sigurado, itanong sa susunod mong check-up."
      ]
    },
    "faq-vaccines": {
      "title": "Ligtas ba ang mga bakuna habang buntis?",
      "sub": "",
      "t": [
        "Dalawa ang inirerekomenda sa bawat pagbubuntis at mukhang ligtas: ang Tdap booster at ang flu shot. Ang mga live vaccine ay dapat maghintay hanggang pagkapanganak.",
        "Tdap, para sa whooping cough (pertussis)",
        "Ibinibigay sa pagitan ng 27 at 36 na linggo, sa bawat pagbubuntis, kahit nakuha mo na ito sa nakaraan. Ang pangunahing layunin ay hindi para protektahan ka. Gumagawa ang katawan mo ng antibodies at ipinapasa ito sa inunan, kaya isinisilang ang sanggol na may proteksiyon na laban sa whooping cough. Mahalaga ito dahil pinakamapanganib ang whooping cough sa mga unang buwan ng buhay, bago pa sapat ang edad ng sanggol para mabakunahan. Dapat ding updated ang bakuna ng sinumang madalas kakarga sa sanggol.",
        "Flu shot",
        "Inirerekomenda sa anumang trimester sa panahon ng trangkaso. Binabago ng pagbubuntis ang paggana ng baga at immune system mo, kaya mas malaki ang tsansa na maospital ka dahil sa trangkaso. Tumatawid din ang antibodies sa sanggol at pinoprotektahan siya sa unang ilang buwan. Ang iniiniksiyon na bakuna ang ginagamit sa pagbubuntis: ang nasal spray ay live vaccine.",
        "Ang mga naghihintay hanggang pagkapanganak",
        "Ang mga live vaccine, ibig sabihin MMR (tigdas, beke at rubella) at varicella (bulutong-tubig), ay hindi ibinibigay habang buntis. Kung ipinakita ng maagang blood test mo na wala kang immunity sa rubella o bulutong-tubig, ang karaniwang plano ay bakunahan ka bago ka umuwi mula sa ospital, na nagpoprotekta rin sa susunod na pagbubuntis. Pareho silang ligtas habang nagpapasuso.",
        "Kung may iba kang bakunang hindi pa nakukuha, o magbibiyahe ka, o may outbreak kung saan ka nakatira, sabihin sa iyong doktor."
      ]
    },
    "faq-eat-for-two": {
      "title": "Kailangan ko bang \"kumain para sa dalawa\"?",
      "sub": "",
      "t": [
        "Hindi. Ang \"pagkain para sa dalawa\" ay isang maling paniniwala. Sa unang trimester, hindi mo kailangan ng dagdag na calories. Sa ikalawa, mga 340 na dagdag bawat araw; sa ikatlo, mga 450. Isa o dalawang meryenda iyon, hindi ikalawang plato. Mas mahalaga ang kalidad ng nutrisyon kaysa sa dami. Pagtuunan ang protina, iron, folate, calcium at omega-3 fatty acids. Tumutulong ang prenatal vitamin na punan ang kulang, pero hindi nito dapat palitan ang balanseng pagkain."
      ]
    },
    "faq-hot-tub": {
      "title": "Puwede ba akong maligo sa bathtub o gumamit ng hot tub?",
      "sub": "",
      "t": [
        "Ayos lang ang maligamgam na paliligo sa buong pagbubuntis. Hindi inirerekomenda ang hot tub, sauna at steam room na nagpapataas ng temperatura ng katawan nang higit sa 102°F (39°C), lalo na sa unang trimester, kung kailan ang mataas na temperatura ay may kaugnayan sa neural tube defects. Kung gagamit ka ng hot tub, panatilihing komportable (hindi mainit) ang temperatura, limitahan sa 10 minuto, at iwasan sa unang trimester. Ligtas ang maligamgam na paliligo sa karaniwang temperatura ng tubig sa bahay (98–100°F)."
      ]
    },
    "faq-epidural-csec": {
      "title": "Pinapataas ba ng epidural ang panganib ng C-section?",
      "sub": "",
      "t": [
        "Hindi. Isa ito sa mga pinakapinag-aralang tanong sa obstetrics. Maraming malalaking randomized controlled trial at meta-analysis ang nagpapatunay na ang epidural ay",
        "hindi",
        "nagpapataas ng bilang ng C-section. Medyo pinahahaba ng epidural ang yugto ng pag-ire, at mas malamang ang panganganak gamit ang vacuum o forceps, na dapat timbangin kasama ng ginhawa sa sakit. Puwede kang humingi nito anumang oras sa active labor. Ang praktikal na hangganan ay hindi bilang ng sentimetro kundi kung gaano kabilis ang labor, dahil maaaring hindi na umabot sa oras kung napakabilis ng labor."
      ]
    },
    "faq-routine-episiotomy": {
      "title": "Kailangan ko ba ng episiotomy para hindi mapunit?",
      "sub": "",
      "t": [
        "Hindi. Hindi na inirerekomenda ng ACOG ang routine episiotomy (isang hiwa sa bukana ng ari). Palaging ipinapakita ng ebidensiya na",
        "mas mabuting gumagaling ang natural na punit sa pangkalahatan",
        "at mas kaunti ang komplikasyon (kasama ang sakit at pangmatagalang problema sa pelvic floor) kaysa sa routine episiotomy. Karamihan ng babaeng nanganganak sa normal na paraan ay may kaunting punit, pero marami ang maliit lang (first-degree). Angkop pa rin ang episiotomy kapag may tiyak na dahilan, gaya ng kapag kailangang mailabas agad ang sanggol dahil sa fetal distress."
      ]
    },
    "faq-water-breaking": {
      "title": "Kung pumutok ang panubigan ko, kailangan ko bang ma-C-section?",
      "sub": "",
      "t": [
        "Hindi. Kung pumutok ang panubigan sa takdang buwan, karamihan ng babae ay kusang naglelabor sa loob ng mga isang araw. Kung hindi magsimula ang labor, kadalasang inaalok ang induction, dahil tumataas ang tsansa ng impeksiyon habang tumatagal na bukas ang panubigan. Tumataas na panganib ito na sabay ninyong titimbangin, hindi deadline na nalampasan mo. Kung GBS-positive ka, sisimulan agad ang antibiotics. Kailangan lang ng C-section kung may hiwalay na dahilan para dito, at ang pagputok ng panubigan ay hindi isa sa mga iyon."
      ]
    },
    "faq-eat-in-labor": {
      "title": "Puwede ba akong kumain o uminom habang naglelabor?",
      "sub": "",
      "t": [
        "Para sa mga babaeng mababa ang panganib sa maagang labor, sinusuportahan ng kasalukuyang gabay ng ACOG ang magaang pagkain at malinaw na inumin. Kapag may epidural ka na, naka-Pitocin, o mas mataas ang panganib na kailanganin ang general anesthesia (posibleng C-section), karamihan ng ospital ay naglilimita sa ice chips o pagsipsip ng tubig dahil sa panganib ng aspiration kung kailanganin ang general anesthesia. Itanong ang patakaran ng iyong ospital. Para sa iyong kasama: magdala ng meryenda. Maaaring buong araw ang labor."
      ]
    },
    "faq-vbac": {
      "title": "Kung na-C-section na ako dati, lagi ko bang kailangan ulit?",
      "sub": "",
      "t": [
        "Hindi palagi. Ang normal na panganganak pagkatapos ng cesarean (VBAC) ay ligtas at angkop na opsiyon para sa maraming babae na may isang naunang low-transverse na hiwa sa matris. 60–80% ang tsansang magtagumpay. Ang mga salik ay ang dahilan ng naunang C-section, ang kasalukuyang pagbubuntis, ang uri ng hiwa sa matris, at ang kakayahan ng iyong ospital na humawak ng emergency. Banggitin ito nang maaga sa prenatal care kung interesado ka."
      ]
    },
    "faq-bf-bc": {
      "title": "Puwede ba akong mabuntis habang nagpapasuso?",
      "sub": "",
      "t": [
        "Oo. Bagaman pinipigilan nang kaunti ng eksklusibong pagpapasuso ang obulasyon, ito ay",
        "hindi maaasahang paraan ng kontrasepsiyon",
        ". Maaari kang mag-ovulate, at mabuntis, bago bumalik ang regla mo. Ang \"lactational amenorrhea method\" ay nangangailangan ng napakatiyak na kondisyon (eksklusibong pagpapasuso bawat 4 na oras sa araw / 6 na oras sa gabi, walang dagdag na gatas, hindi pa bumabalik ang regla) at mga 98% lang ang bisa kahit sa mahigpit na kondisyong iyon. Pag-usapan ang birth control bago ka umuwi mula sa ospital."
      ]
    },
    "faq-stress-milk": {
      "title": "Natutuyo ba ang gatas dahil sa stress?",
      "sub": "",
      "t": [
        "Maaaring pansamantalang maabala ng matinding stress ang letdown reflex (ang paglabas ng gatas). Pero hindi matutuyo ang gatas dahil sa isang nakaka-stress na pangyayari. Nakadepende ang dami ng gatas sa demand. Habang mas madalas at mas mahusay sumuso ang sanggol o mag-pump ka, mas maraming gatas ang ginagawa ng katawan mo. Kung pinipigilan ng stress o kaguluhan sa paligid ang maayos na pagsuso ng sanggol, maaaring bumaba ang demand at bumaba ang gatas. Mga nakakatulong sa letdown: skin-to-skin, init, mga paraan ng pagre-relax, at pagtingin sa litrato ng sanggol habang nagpa-pump. Kausapin ang iyong doktor tungkol sa mga paraan ng pagbabawas ng stress nang walang gamot."
      ]
    },
    "faq-bonding": {
      "title": "Dapat ko bang maramdaman agad ang pagkakabuklod sa aking sanggol?",
      "sub": "",
      "t": [
        "Hindi. Ang bonding ay isang proseso, hindi iisang sandali. Maraming ina ang nakakaramdam agad ng malalim na pagmamahal pagkapanganak; ang iba ay nangangailangan ng ilang araw, linggo o mas matagal pa para lumago ang damdaming iyon. Pareho itong ganap na normal. Pagod ng katawan, mahirap na panganganak, hindi inaasahang resulta at PPD ay maaaring makaapekto sa maagang bonding. Kung pakiramdam mo ay hiwalay ka o manhid sa iyong sanggol nang higit sa ilang linggo, sabihin sa iyong doktor. Maaaring senyales ito ng postpartum depression, na nagagamot."
      ]
    },
    "faq-ibuprofen-bf": {
      "title": "Puwede ba akong uminom ng ibuprofen habang nagpapasuso?",
      "sub": "",
      "t": [
        "Oo. Ang ibuprofen ay isa sa pinakaligtas na OTC na gamot habang nagpapasuso. Napakakaunti ang napupunta sa gatas. Ligtas din ang acetaminophen (Tylenol). Ito ang mga pinipiling gamot sa sakit pagkapanganak at habang nagpapasuso. Hindi inirerekomenda ang mataas na dosis ng aspirin (iba ang usapan sa mababang dosis na aspirin na inireseta. Pag-usapan ito sa iyong doktor). Mas maraming napupunta sa gatas ang naproxen (Aleve) at karaniwang hindi ito pinipili. Laging kumpirmahin sa iyong care team para sa iyong sitwasyon."
      ]
    },
    "faq-jaundice": {
      "title": "Mukhang naninilaw ang sanggol ko. Kailan ito seryoso?",
      "sub": "",
      "t": [
        "Ang paninilaw ng bagong silang (hyperbilirubinemia) ay nangyayari sa mga 60% ng sanggol na isinilang sa takdang buwan sa unang linggo. Sanhi ito ng normal na pagkasira ng red blood cells mula sa sinapupunan. Humahabol lang ang atay. Karamihan ay banayad at kusang nawawala nang walang gamutan. Nagiging alalahanin ito kapag napakataas ng bilirubin (panganib ng pinsala sa utak sa sobrang taas), o kapag sobrang antukin ang sanggol, hindi sumususo, o lumitaw ang paninilaw sa unang 24 na oras. Susuriin ng ospital ang bilirubin bago umuwi at sa check-up ng sanggol sa edad na 2–5 araw. Napakabisa ng phototherapy (bili lights) kung kailangan."
      ]
    },
    "faq-newborn-procedures": {
      "title": "Kailangan bang gawin ang lahat ng procedure sa bagong silang?",
      "sub": "",
      "t": [
        "Kasama sa karaniwang procedure sa bagong silang ang:",
        "Iniksiyon ng vitamin K",
        "(binabawasan ang panganib ng nakamamatay na pagdurugo sa utak),",
        "erythromycin na pamahid sa mata",
        "(binabawasan ang impeksiyon sa mata kasama ang gonorrhea),",
        "unang dose ng bakuna sa Hepatitis B",
        ", at ang",
        "pagkuha ng dugo para sa newborn metabolic screening",
        "(heel stick para sa mga 30 kondisyon kasama ang PKU, hypothyroidism at sickle cell). Hindi pare-pareho ang lakas ng ebidensiya sa likod ng mga ito, at makatwirang itanong ang bawat isa nang hiwalay. Ang vitamin K at heel stick ang may pinakamalinaw na dahilan: pinipigilan ng vitamin K ang bihira pero malubhang pagdurugo, at nahahanap ng heel stick ang mga kondisyong magagamot lang kung matuklasan sa mga unang araw. Pinakamahalaga ang dose ng hepatitis B kapag positibo o hindi alam ang sarili mong hepatitis B status. Mas mahina ang ebidensiya sa pamahid sa mata, at ilang bansa na ang tumigil sa pagbibigay nito nang routine, bagaman maraming estado sa US ang nag-uutos nito sa batas. Sa karamihan ng estado, legal kang puwedeng tumanggi. Tanungin ang iyong team kung alin dito ang angkop sa iyong sitwasyon."
      ]
    },
    "faq-first-bath": {
      "title": "Kailan kailangan ng sanggol ang unang paligo?",
      "sub": "",
      "t": [
        "Inirerekomenda na ngayon ng WHO at AAP na ipagpaliban ang unang paligo nang hindi bababa sa 24 na oras pagkapanganak (mas mabuti kung 48 oras). Ang puting balot (vernix caseosa) ay may katangiang lumalaban sa mikrobyo at tumutulong magbasa-basa ng balat. Nakakatulong din ang pagpapaliban ng paligo na mapanatili ang temperatura ng katawan, sinusuportahan ang matatag na blood sugar, at may kaugnayan sa mas mahusay na pagsisimula ng pagpapasuso. Ang paghihintay ang kasalukuyang pinakamabuting gawain, hindi lang kagustuhan."
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
    "content.normal-newborn.t.32": "380945be7751b37c",
    "content.faq-deli.title": "ce705cdc639700b6",
    "content.faq-deli.t.0": "208a1054e9463d0e",
    "content.faq-deli.t.1": "7180ed78d9040f96",
    "content.faq-deli.t.2": "86ed7bf6b9c01890",
    "content.faq-coffee.title": "5389638ea8a88dc8",
    "content.faq-coffee.t.0": "ac1cf8bc0364371a",
    "content.faq-coffee.t.1": "d49405defc21c3ec",
    "content.faq-coffee.t.2": "19f22003cc780ded",
    "content.faq-hair-dye.title": "3cbc4f5501467bbb",
    "content.faq-hair-dye.t.0": "194b47e06a23e60e",
    "content.faq-exercise-mc.title": "055753c567df011f",
    "content.faq-exercise-mc.t.0": "2b2d76b57f4bc45f",
    "content.faq-sex-pregnancy.title": "8399c3d543c4147f",
    "content.faq-sex-pregnancy.t.0": "9b3a7841e4c3a343",
    "content.faq-vaccines.title": "22cf8d87c3c18165",
    "content.faq-vaccines.t.0": "54aa1c57cf3d489d",
    "content.faq-vaccines.t.1": "2cc75b12a1fc2494",
    "content.faq-vaccines.t.2": "1038f5417eda7317",
    "content.faq-vaccines.t.3": "de4ce992cde7736c",
    "content.faq-vaccines.t.4": "fc3cba8b30791ee5",
    "content.faq-vaccines.t.5": "8e2d5dd7b662e6cd",
    "content.faq-vaccines.t.6": "1fbad66cf49cff52",
    "content.faq-vaccines.t.7": "bd443dcd8ee958d3",
    "content.faq-eat-for-two.title": "7109ae5ce8714502",
    "content.faq-eat-for-two.t.0": "1b020d6a6bc10158",
    "content.faq-hot-tub.title": "2230219d6f10d437",
    "content.faq-hot-tub.t.0": "b73f80715bdad85f",
    "content.faq-epidural-csec.title": "85af8aced19ce724",
    "content.faq-epidural-csec.t.0": "0598cc9adadeee14",
    "content.faq-epidural-csec.t.1": "29b19c8a24cbf72c",
    "content.faq-epidural-csec.t.2": "d9849263c1e6467d",
    "content.faq-routine-episiotomy.title": "063590cb3bfbb7f9",
    "content.faq-routine-episiotomy.t.0": "f9f4d22fb4ca4b41",
    "content.faq-routine-episiotomy.t.1": "8a8e3958d3c9cdb6",
    "content.faq-routine-episiotomy.t.2": "7d6842265369b750",
    "content.faq-water-breaking.title": "3024fe7ba7f6b3ed",
    "content.faq-water-breaking.t.0": "ffd7e16a191f9018",
    "content.faq-eat-in-labor.title": "5de8ba9361616d39",
    "content.faq-eat-in-labor.t.0": "23ad9f490ae5def7",
    "content.faq-vbac.title": "4fb6dce62d75356c",
    "content.faq-vbac.t.0": "2a66625080510032",
    "content.faq-bf-bc.title": "0683d2b28ff53b78",
    "content.faq-bf-bc.t.0": "fd3cd5c648b45a44",
    "content.faq-bf-bc.t.1": "1ab0f2cdfd636c5f",
    "content.faq-bf-bc.t.2": "b97f0ac57c1360c3",
    "content.faq-stress-milk.title": "601e567b1be30855",
    "content.faq-stress-milk.t.0": "02db447559e1251f",
    "content.faq-bonding.title": "a87f7534c89adb7e",
    "content.faq-bonding.t.0": "e686292ec2702bc0",
    "content.faq-ibuprofen-bf.title": "471f20ca8e18c184",
    "content.faq-ibuprofen-bf.t.0": "394b672da5bd8c7f",
    "content.faq-jaundice.title": "b2eb8cb7eb9ba4ed",
    "content.faq-jaundice.t.0": "529658accf30fbf6",
    "content.faq-newborn-procedures.title": "3b92e7e6a50686d0",
    "content.faq-newborn-procedures.t.0": "d72fcb8dc5811617",
    "content.faq-newborn-procedures.t.1": "503ae631290ccfd3",
    "content.faq-newborn-procedures.t.2": "555768324f0aff84",
    "content.faq-newborn-procedures.t.3": "c99e7877ef7ce6e1",
    "content.faq-newborn-procedures.t.4": "40e5e1dc519cece2",
    "content.faq-newborn-procedures.t.5": "502e42f21156da6c",
    "content.faq-newborn-procedures.t.6": "cd0c11353cd68b73",
    "content.faq-newborn-procedures.t.7": "d06e909e2132ca54",
    "content.faq-newborn-procedures.t.8": "0f46858bcf9a15d9",
    "content.faq-first-bath.title": "1ece0a9772ca9db5",
    "content.faq-first-bath.t.0": "23fa392719b4b945"
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
    "tools.contractionTimer": 1,
    "content.faq-deli.title": 1,
    "content.faq-deli.t.0": 1,
    "content.faq-deli.t.1": 1,
    "content.faq-deli.t.2": 1,
    "content.faq-coffee.title": 1,
    "content.faq-coffee.t.0": 1,
    "content.faq-coffee.t.1": 1,
    "content.faq-coffee.t.2": 1,
    "content.faq-hair-dye.title": 1,
    "content.faq-hair-dye.t.0": 1,
    "content.faq-exercise-mc.title": 1,
    "content.faq-exercise-mc.t.0": 1,
    "content.faq-sex-pregnancy.title": 1,
    "content.faq-sex-pregnancy.t.0": 1,
    "content.faq-vaccines.title": 1,
    "content.faq-vaccines.t.0": 1,
    "content.faq-vaccines.t.1": 1,
    "content.faq-vaccines.t.2": 1,
    "content.faq-vaccines.t.3": 1,
    "content.faq-vaccines.t.4": 1,
    "content.faq-vaccines.t.5": 1,
    "content.faq-vaccines.t.6": 1,
    "content.faq-vaccines.t.7": 1,
    "content.faq-eat-for-two.title": 1,
    "content.faq-eat-for-two.t.0": 1,
    "content.faq-hot-tub.title": 1,
    "content.faq-hot-tub.t.0": 1,
    "content.faq-epidural-csec.title": 1,
    "content.faq-epidural-csec.t.0": 1,
    "content.faq-epidural-csec.t.1": 1,
    "content.faq-epidural-csec.t.2": 1,
    "content.faq-routine-episiotomy.title": 1,
    "content.faq-routine-episiotomy.t.0": 1,
    "content.faq-routine-episiotomy.t.1": 1,
    "content.faq-routine-episiotomy.t.2": 1,
    "content.faq-water-breaking.title": 1,
    "content.faq-water-breaking.t.0": 1,
    "content.faq-eat-in-labor.title": 1,
    "content.faq-eat-in-labor.t.0": 1,
    "content.faq-vbac.title": 1,
    "content.faq-vbac.t.0": 1,
    "content.faq-bf-bc.title": 1,
    "content.faq-bf-bc.t.0": 1,
    "content.faq-bf-bc.t.1": 1,
    "content.faq-bf-bc.t.2": 1,
    "content.faq-stress-milk.title": 1,
    "content.faq-stress-milk.t.0": 1,
    "content.faq-bonding.title": 1,
    "content.faq-bonding.t.0": 1,
    "content.faq-ibuprofen-bf.title": 1,
    "content.faq-ibuprofen-bf.t.0": 1,
    "content.faq-jaundice.title": 1,
    "content.faq-jaundice.t.0": 1,
    "content.faq-newborn-procedures.title": 1,
    "content.faq-newborn-procedures.t.0": 1,
    "content.faq-newborn-procedures.t.1": 1,
    "content.faq-newborn-procedures.t.2": 1,
    "content.faq-newborn-procedures.t.3": 1,
    "content.faq-newborn-procedures.t.4": 1,
    "content.faq-newborn-procedures.t.5": 1,
    "content.faq-newborn-procedures.t.6": 1,
    "content.faq-newborn-procedures.t.7": 1,
    "content.faq-newborn-procedures.t.8": 1,
    "content.faq-first-bath.title": 1,
    "content.faq-first-bath.t.0": 1
  }
};
