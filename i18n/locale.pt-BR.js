// ═══════════════════════════════════════════════════════
// LOCALE: pt-BR
// ═══════════════════════════════════════════════════════
// STUB. Only these strings are translated; every other key falls back to
// English at runtime, so the app is fully usable while translation proceeds.
//
// reviewed:false drives the machine-translation notice shown to the patient.
// No `epds` key => the mood screen is gated off for this language until an
// OFFICIAL validated instrument is added. Never machine-translate it.

window.MYOB_LOCALES = window.MYOB_LOCALES || {};

window.MYOB_LOCALES["pt-BR"] = {
  "reviewed": false,
  "translationStatus": "stub",
  "ui": {
    "app": {
      "title": "Manual da Gravidez"
    },
    "lang": {
      "unreviewedNotice": "Esta tradução foi gerada automaticamente e ainda não foi revisada por um profissional de saúde. Para decisões médicas, confirme com sua equipe de saúde ou mude para o inglês.",
      "loadFailed": "Não foi possível carregar",
      "inProgress": "Tradução em andamento"
    },
    "usNotice": {
      "title": "Atendimento nos Estados Unidos",
      "body": "Este guia descreve o pré-natal como ele é feito nos Estados Unidos e foi escrito para mães que fazem o acompanhamento aqui. O pré-natal varia muito de país para país. O calendário de consultas, os exames e as recomendações em outros lugares podem não corresponder ao que você lê aqui. Se você faz o acompanhamento em outro país, provavelmente este aplicativo não é para você.",
      "continue": "Entendi"
    },
    "tools": {
      "helpUsImprove": "Ajude a melhorar"
    }
  }
};
