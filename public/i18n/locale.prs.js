// ═══════════════════════════════════════════════════════
// LOCALE: prs
// ═══════════════════════════════════════════════════════
// STUB. Only these strings are translated; every other key falls back to
// English at runtime, so the app is fully usable while translation proceeds.
//
// reviewed:false drives the machine-translation notice shown to the patient.
// No `epds` key => the mood screen is gated off for this language until an
// OFFICIAL validated instrument is added. Never machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES.prs = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Obiana راهنمای بارداری",
      "prenatal": "بارداری",
      "labor": "ولادت",
      "recovery": "بهبودی",
      "baby": "طفل"
    },
    "lang": {
      "unreviewedNotice": "این را ماشین ترجمه کرده و هنوز داکتر آن را بررسی نکرده است. اگر چیزی روشن نیست، از تیم صحی خود بپرسید.",
      "loadFailed": "بارگذاری نشد",
      "inProgress": "ترجمه در جریان است"
    },
    "usNotice": {
      "title": "مراقبت در ایالات متحده",
      "body": "Obiana از مراقبت دوران بارداری در ایالات متحده پیروی می‌کند. ملاقات‌ها، معاینات و مشوره‌ها در کشورهای دیگر ممکن است فرق کنند.",
      "continue": "متوجه شدم"
    },
    "tools": {
      "helpUsImprove": "در بهبود ما کمک کنید",
      "contractionTimer": "ساعت دردهای زایمان"
    },
    "home": {
      "heroTitle": "بدانید چه در<br>انتظار شماست. پرسش‌های<br>خوب بپرسید.",
      "duringPregnancy": "در دوران بارداری",
      "callYourDoctorIf": "به داکتر خانوادگی، داکتر نسایی-ولادی یا قابله زنگ بزنید اگر…",
      "vaginalBleeding": "خونریزی از مهبل",
      "fluidGushingOrTrickling": "آب که یکباره یا قطره‌قطره بیرون می‌آید",
      "babyNotMovingNormally": "طفل مثل همیشه حرکت نمی‌کند",
      "severeHeadache": "سردردی شدید",
      "visionChanges": "تغییر در دید",
      "suddenSwellingOfFaceHands": "پندیدگی ناگهانی روی یا دست‌ها",
      "fever1004F": "تب &gt;100.4°F",
      "contractionsBefore37Weeks": "دردهای زایمان پیش از هفتهٔ 37"
    },
    "disclaimer": {
      "title": "پیش از آغاز",
      "education": "این معلومات عمومی است، نه مشورهٔ طبی. دربارهٔ بارداری خودتان از داکتر خانوادگی، داکتر نسایی-ولادی یا قابله بپرسید.",
      "tools": "ثبت‌ها فقط چیزی را که می‌نویسید نگه می‌دارند. هیچ چیزی را تشخیص داده نمی‌توانند.",
      "emergency": "در حالت اضطراری به 911 زنگ بزنید.",
      "continue": "متوجه شدم"
    },
    "about": {
      "whatThisIs": "Obiana چیست",
      "privacyHeading": "معلومات شما",
      "privacyOnDevice": "آنچه می‌نویسید در همین تلیفون می‌ماند. نه حساب، نه ورود، و چیزی فرستاده نمی‌شود. پاک کردن معلومات مرورگر آن را از بین می‌برد، پس برای نگه‌داشتن نسخه از صادر کردن استفاده کنید.",
      "privacySubmit": "تنها دو دکمه چیزی می‌فرستند: کمک در ترجمه و کمک به بهتر شدن این رهنما. آن‌چه نوشته‌اید، کشور شما و یک آدرس شبکهٔ رمزشده را برای جلوگیری از هرزنامه می‌فرستند. هرگز نام شما یا محتوای ثبت‌های شما را نمی‌فرستند."
    },
    "urgent": {
      "title": "چه وقت زنگ بزنید",
      "call911": "به 911 زنگ بزنید",
      "callLd": "به بخش ولادت زنگ بزنید",
      "addLd": "شمارهٔ بخش ولادت را در بخش «من» اضافه کنید.",
      "tellThem": "اگر در یک سال گذشته ولادت کرده‌اید، به هر کسی که زنگ می‌زنید یا نزدش می‌روید بگویید. وقتی کارمندان صحی خبر ندارند، بعضی مشکلات خطرناک بعد از ولادت نادیده می‌مانند.",
      "helpLines": "خطوط کمک: رایگان، در هر وقت",
      "line988": "فکر آسیب رساندن به خود، یا در بحران: به 988 زنگ بزنید یا پیام بفرستید، خط کمک خودکشی و بحران.",
      "lineMama": "اگر در دوران بارداری یا بعد از آن غمگین، نگران یا خسته و درمانده هستید: خط ملی صحت روانی مادران (National Maternal Mental Health Hotline)، 1-833-TLC-MAMA (1-833-852-6262). زنگ یا پیام. ترجمان به زبان‌های زیاد موجود است.",
      "linePoison": "اگر شما یا طفل چیزی را قورت داده‌اید: مرکز مسمومیت (Poison Control)، 1-800-222-1222.",
      "lineDv": "اگر در خانه امن نیستید: خط ملی خشونت خانوادگی (National Domestic Violence Hotline)، 1-800-799-7233، یا START را به 88788 پیام بفرستید.",
      "call": "زنگ",
      "text": "پیام"
    },
    "nav": {
      "prenatal": "معاینات<br>بارداری",
      "labor": "زایمان &amp;<br>ولادت",
      "recovery": "بهبودی<br>بعد از ولادت",
      "baby": "نوزاد<br>شما",
      "toolsTrackers": "ابزارها &amp;<br>ثبت‌ها",
      "today": "امروز",
      "guide": "رهنما",
      "urgent": "چه وقت زنگ بزنید",
      "me": "من"
    },
    "today": {
      "whereNow": "حالا در کدام مرحله هستید؟",
      "pregnant": "من باردار هستم",
      "dueLabel": "تاریخ احتمالی ولادت",
      "babyHere": "طفلم به دنیا آمده",
      "bornLabel": "تاریخ تولد طفل",
      "save": "قدم بعدی را نشانم بده",
      "savedOnPhone": "این فقط در تیلفون شما می‌ماند. هر وقت بخواهید در بخش «من» تغییرش بدهید.",
      "week": "هفتهٔ {week}",
      "due": "تاریخ ولادت {date}",
      "babyDays": {
        "one": "طفل شما {count} روزه است",
        "other": "طفل شما {count} روزه است"
      },
      "babyWeeks": {
        "one": "طفل شما {count} هفته است",
        "other": "طفل شما {count} هفته است"
      },
      "visitsNow": "در معاینات حالا",
      "comingUp": "بعدی",
      "allVisits": "همهٔ معاینات، هفته به هفته",
      "toolsNow": "حالا به درد می‌خورد",
      "changeDates": "تغییر تاریخ‌ها"
    },
    "visits": {
      "title": "معاینات شما، هفته به هفته",
      "sub": "در هر معاینه چه می‌شود، و تصمیم چه چیزی با شماست",
      "lead": "این تقسیم اوقات معمول در امریکا است. از شما ممکن فرق کند: داکتر خانوادگی، داکتر نسایی-ولادی یا قابله هر وقت لازم باشد معاینه و آزمایش اضافه می‌کند.",
      "afterBirth": "بعد از ولادت",
      "yourChoice": "انتخاب شما",
      "first": {
        "when": "حدود 8–10 هفته",
        "title": "اولین معاینه",
        "i1": "تاریخ ولادت از آخرین عادت ماهوار حساب می‌شود، اکثراً همراه با التراساوند اولیه.",
        "i2": "آزمایش خون: گروپ خون و Rh، شمار خون، معافیت در برابر سرخکان آلمانی و چیچک‌مرغان، هپاتیت B و C، HIV و سفلیس. آزمایش ادرار، و آزمایش کلامیدیا و سوزاک.",
        "i3": "آزمایش زودتر شکر اگر در بارداری قبلی شکر داشته‌اید یا عوامل خطر دیگر دارید.",
        "i4": "اگر خطر پری‌اکلامپسی در شما بیشتر است، اسپرین کم‌مقدار (81 mg در روز) از هفتهٔ 12 این خطر را کم می‌کند. بپرسید که برای شما مناسب است یا نه."
      },
      "genetic": {
        "when": "از هفتهٔ 10",
        "title": "آزمایش‌ها برای طفل",
        "i1": "آزمایش خون از هفتهٔ 10 (DNA آزاد) سندروم داون و چند حالت دیگر را بررسی می‌کند. بررسی، تشخیص نیست: نتیجهٔ مثبت یعنی برای شما آزمایش تشخیصی پیشنهاد می‌شود.",
        "i2": "آزمایش حامل بودن بررسی می‌کند که آیا شما جین مریضی‌هایی مثل فیبروز کیستیک یا آتروفی عضلات نخاعی را دارید.",
        "i3": "می‌توانید همه، بعضی یا هیچ‌کدام از این آزمایش‌ها را انجام دهید."
      },
      "monthly": {
        "when": "هر 4 هفته، تا هفتهٔ 28",
        "title": "معاینات منظم",
        "i1": "فشار خون، وزن، ادرار و ضربان قلب طفل. از حدود هفتهٔ 20، اندازهٔ شکم شما هم اندازه می‌شود."
      },
      "anatomy": {
        "when": "18–22 هفته",
        "title": "التراساوند اعضای طفل",
        "i1": "بررسی دقیق بدن طفل، رشد او و جفت. اگر بخواهید، معمولاً جنسیت را هم می‌فهمید."
      },
      "sugar": {
        "when": "24–28 هفته",
        "title": "آزمایش شکر و آزمایش خون",
        "i1": "یک نوشیدنی شیرین، و یک ساعت بعد آزمایش خون، برای بررسی شکر بارداری.",
        "i2": "شمار خون برای کم‌خونی، و آزمایش دوبارهٔ سفلیس.",
        "i3": "اگر گروپ خون شما Rh منفی است: یک پیچکاری Rh (RhoGAM) در حدود هفتهٔ 28."
      },
      "tdap": {
        "when": "27–36 هفته",
        "title": "واکسین سیاه‌سرفه (Tdap)",
        "i1": "پادتن‌های شما به طفل می‌رسد و او را در ماه‌های اول، پیش از این‌که واکسین‌های خودش را بگیرد، محافظت می‌کند. در هر بارداری زده می‌شود."
      },
      "twoweekly": {
        "when": "هر 2 هفته، از هفتهٔ 28",
        "title": "معاینات نزدیک‌تر می‌شوند",
        "i1": "یاد بگیرید طفل شما معمولاً چطور حرکت می‌کند. شمردن لگدها اختیاری است. اگر طفل کمتر از معمول حرکت کرد، همان روز زنگ بزنید. منتظر معاینهٔ بعدی نمانید.",
        "i2": "اگر مشکلی مثل فشار خون بلند یا شکر دارید، بررسی‌های اضافی طفل (آزمایش بدون فشار یا التراساوند) اکثراً از حدود هفتهٔ 32 شروع می‌شود."
      },
      "rsv": {
        "when": "32–36 هفته، سپتامبر تا جنوری",
        "title": "محافظت طفل در برابر RSV",
        "i1": "یا واکسین RSV برای شما در هفتهٔ 32 تا 36، یا پیچکاری پادتن برای طفل بعد از ولادت. یکی از این دو، نه هر دو. هر کدام احتمال بستری شدن طفل در شفاخانه به خاطر RSV در اولین زمستانش را کم می‌کند."
      },
      "gbs": {
        "when": "36–37 هفته",
        "title": "نمونهٔ استرپتوکوک گروپ B، و وضعیت طفل",
        "i1": "نمونه‌برداری با پنبه از مهبل و مقعد. حدود 1 از هر 4 زن GBS دارد، و به شما ضرر نمی‌رساند. اگر نتیجهٔ شما مثبت باشد، در وقت زایمان انتی‌بیوتیک از راه رگ می‌گیرید تا طفل محافظت شود.",
        "i2": "بررسی این‌که سر طفل به طرف پایین است. اگر طفل سرین‌نما (بریچ) باشد، ممکن روشی برای چرخاندن طفل (چرخش خارجی) پیشنهاد شود، یا می‌توانید عملیات سزارین را پلان کنید.",
        "i3": "پلان ولادت خود را مرور کنید: کم کردن درد، کی همراه شما باشد، شیر دادن."
      },
      "weekly": {
        "when": "هر هفته، از هفتهٔ 36",
        "title": "آخرین هفته‌ها",
        "i1": "از هفتهٔ 38 ممکن جدا کردن پرده‌ها پیشنهاد شود: کشیدن انگشت دور دهانهٔ رحم که می‌تواند به شروع زایمان کمک کند.",
        "i2": "تحریک زایمان می‌تواند از هفتهٔ 39 پیشنهاد شود. در هفتهٔ 41 توصیه می‌شود، چون خطر برای طفل شروع به بالا رفتن می‌کند."
      },
      "ppBp": {
        "when": "3–10 روز بعد از ولادت",
        "title": "بررسی فشار خون، اگر بلند بوده",
        "i1": "اگر فشار خون بلند یا پری‌اکلامپسی داشتید، فشار خون را در 3 تا 10 روز بعد از ولادت بررسی کنید. پری‌اکلامپسی می‌تواند بعد از ولادت شروع شود یا بدتر شود."
      },
      "pp3": {
        "when": "در 3 هفتهٔ اول بعد از ولادت",
        "title": "اولین احوال‌پرسی",
        "i1": "با داکتر خانوادگی، داکتر نسایی-ولادی یا قابله دربارهٔ خونریزی، درد، شیر دادن، حالت روحی و خواب گپ بزنید. زنگ یا تماس ویدیویی هم حساب می‌شود."
      },
      "ppFull": {
        "when": "تا 12 هفته بعد از ولادت، اکثراً در 4–6 هفته",
        "title": "معاینهٔ کامل بعد از ولادت",
        "i1": "بررسی حالت روحی، جلوگیری از بارداری، چگونگی بهبودی، و هر پلانی برای بارداری بعدی.",
        "i2": "اگر شکر بارداری داشتید: آزمایش شکر 4 تا 12 هفته بعد از ولادت. خطر شکر نوع 2 تا آخر عمر بیشتر می‌ماند، پس هر 1 تا 3 سال یک بار آزمایش بخواهید.",
        "i3": "اگر ادرار یا مدفوع شما بی‌اختیار بیرون می‌آید، در وقت مقاربت درد دارید، یا برآمدگی در مهبل حس می‌کنید، دربارهٔ فزیوتراپی کف لگن بپرسید. کمک می‌کند. لازم نیست با آن زندگی کنید."
      }
    }
  },
  "content": {
    "postpartum-danger": {
      "title": "",
      "sub": "",
      "t": [
        "در این حالت‌ها به عاجل بروید یا به 911 زنگ بزنید",
        "درد سینه یا مشکل تنفس · تشنج · سردردی شدید و ناگهانی که پیش از این نداشته‌اید · علایم سکته (کج شدن روی، ضعف بازو، گپ زدن نامفهوم) · فکر آسیب رساندن به خود یا طفل",
        "در این حالت‌ها به داکتر خانوادگی، داکتر نسایی-ولادی یا قابله زنگ بزنید",
        "تب &gt;100.4°F · تر شدن کامل 1 پد در یک ساعت · سردردی شدید که با ایبوپروفن/تایلینول خوب نمی‌شود · تغییر در دید · سرخی، پندیدگی یا گرمی پا (DVT، لختهٔ خون در رگ عمیق) · باز شدن زخم، پخش شدن سرخی یا چرک · مشکل در ادرار کردن · علایم افسردگی پس از ولادت (PPD) یا اضطراب",
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
        "قاعدهٔ 5-1-1 (طفل اول)",
        "به شفاخانه بروید وقتی دردها",
        "هر 5 دقیقه می‌آیند، هر کدام 1 دقیقه دوام می‌کنند، حداقل برای 1 ساعت",
        ". برای طفل دوم یا بعدی، زودتر بروید. وقتی هر 6–8 دقیقه می‌آیند زنگ بزنید، چون زایمان تیزتر پیش می‌رود.",
        "اگر هر کدام از این‌ها بود، فوراً بروید",
        "آب سر شکستن",
        "(یکباره یا قطره‌قطرهٔ پیوسته) · خونریزی سرخ روشن (بیشتر از لکه) · طفل حرکت را بس کرده · درد شدید و دوامدار شکم · علایم پری‌اکلامپسی: سردردی شدید که با تایلینول خوب نمی‌شود، تغییر در دید، پندیدگی شدید و ناگهانی",
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
        "در این حالت‌ها فوراً به داکتر طفل زنگ بزنید",
        "تب ≥ 100.4°F از مقعد (در نوزاد جدی است. همیشه حرارت را از مقعد بگیرید) · شیر نمی‌خورد · زردی شدید · با هر نفس ناله می‌کند · پوست بسیار رنگ‌پریده · گریه‌ای که آرام نمی‌شود · کمتر از 6 پوتی تر در روز بعد از روز پنجم · گردن شخ. لب یا روی کبود یا خاکستری: به 911 زنگ بزنید."
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
