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
      "title": "Obiana راهنمای بارداری"
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
      "helpUsImprove": "در بهبود ما کمک کنید"
    },
    "home": {
      "heroTitle": "بدانید چه در<br>انتظار شماست. پرسش‌های<br>خوب بپرسید."
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
    }
  }
};
