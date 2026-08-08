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

window.MYOB_LOCALES["prs"] = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "راهنمای بارداری"
    },
    "lang": {
      "unreviewedNotice": "این ترجمه ماشینی است و هنوز توسط یک متخصص صحی بررسی نشده است. برای تصمیم‌های طبی، لطفاً با تیم مراقبت خود تأیید کنید یا به انگلیسی تغییر دهید.",
      "loadFailed": "بارگذاری نشد",
      "inProgress": "ترجمه در جریان است"
    }
  }
};
window.MYOB_LOCALES.prs = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "راهنمای بارداری"
    },
    "lang": {
      "unreviewedNotice": "این ترجمه ماشینی است و هنوز توسط یک متخصص صحی بررسی نشده است. برای تصمیم‌های طبی، لطفاً با تیم مراقبت خود تأیید کنید یا به انگلیسی تغییر دهید.",
      "loadFailed": "بارگذاری نشد",
      "inProgress": "ترجمه در جریان است"
    },
    "usNotice": {
      "title": "مراقبت در ایالات متحده",
      "body": "این راهنما مراقبت‌های دوران بارداری را همان‌گونه که در ایالات متحده ارائه می‌شود توضیح می‌دهد و برای مادرانی نوشته شده که در اینجا مراقبت دریافت می‌کنند. مراقبت دوران بارداری در کشورهای مختلف بسیار متفاوت است. برنامه ویزیت‌ها، آزمایش‌ها و توصیه‌ها در جاهای دیگر ممکن است با آنچه اینجا می‌خوانید یکسان نباشد. اگر در کشور دیگری مراقبت دریافت می‌کنید، از راهنمایی تیم مراقبت خود پیروی کنید.",
      "continue": "متوجه شدم"
    }
  }
};
