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
      "title": "Obiana Manual da Gravidez"
    },
    "lang": {
      "unreviewedNotice": "Uma máquina traduziu isto, e um médico ainda não revisou. Se algo não estiver claro, pergunte à sua equipe de saúde.",
      "loadFailed": "Não foi possível carregar",
      "inProgress": "Tradução em andamento"
    },
    "usNotice": {
      "title": "Atendimento nos Estados Unidos",
      "body": "O Obiana segue o pré-natal dos Estados Unidos. Consultas, exames e orientações podem ser diferentes em outros países.",
      "continue": "Entendi"
    },
    "tools": {
      "helpUsImprove": "Ajude a melhorar"
    },
    "home": {
      "heroTitle": "Saiba o que<br>esperar. Faça boas<br>perguntas."
    },
    "disclaimer": {
      "title": "Antes de começar",
      "education": "Isto é informação geral, não orientação médica. Pergunte ao seu médico de família, obstetra ou parteira sobre a sua própria gravidez.",
      "tools": "Os registros guardam o que você digita. Eles não podem diagnosticar nada.",
      "emergency": "Em uma emergência, ligue para 911.",
      "continue": "Entendi"
    },
    "about": {
      "whatThisIs": "O que é o Obiana",
      "privacyHeading": "Suas informações",
      "privacyOnDevice": "O que você digita fica neste telefone. Sem conta, sem login, nada é enviado. Limpar os dados do navegador apaga tudo, então use Exportar para guardar uma cópia.",
      "privacySubmit": "Apenas dois botões enviam algo: Ajude a traduzir e Ajude a melhorar este guia. Eles enviam o que você escreveu, seu país e um endereço de rede embaralhado para evitar spam. Nunca o seu nome nem o que está nos seus registros."
    }
  }
};
