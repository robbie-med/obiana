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
      "title": "Obiana Manual da Gravidez",
      "prenatal": "Pré-natal",
      "labor": "Parto",
      "recovery": "Recuperação",
      "baby": "Bebê"
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
      "helpUsImprove": "Ajude a melhorar",
      "contractionTimer": "Cronômetro de contrações"
    },
    "home": {
      "heroTitle": "Saiba o que<br>esperar. Faça boas<br>perguntas.",
      "duringPregnancy": "Durante a gravidez",
      "callYourDoctorIf": "Ligue para seu médico de família, obstetra ou parteira se…",
      "vaginalBleeding": "Sangramento vaginal",
      "fluidGushingOrTrickling": "Saída de líquido, em jato ou gotejando",
      "babyNotMovingNormally": "O bebê não está se mexendo como de costume",
      "severeHeadache": "Dor de cabeça forte",
      "visionChanges": "Mudanças na visão",
      "suddenSwellingOfFaceHands": "Inchaço repentino no rosto ou nas mãos",
      "fever1004F": "Febre &gt;100.4°F",
      "contractionsBefore37Weeks": "Contrações antes de 37 semanas"
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
    },
    "urgent": {
      "title": "Quando ligar",
      "call911": "Ligar para 911",
      "callLd": "Ligar para a maternidade",
      "addLd": "Adicione o número da maternidade em Eu.",
      "tellThem": "Se você teve um bebê no último ano, conte isso a qualquer pessoa para quem ligar ou com quem se consultar. Alguns problemas graves depois do parto passam despercebidos quando a equipe não sabe.",
      "helpLines": "Linhas de ajuda: grátis, a qualquer hora",
      "line988": "Pensamentos de se machucar, ou em crise: ligue ou mande mensagem para 988, a linha de prevenção do suicídio e crise.",
      "lineMama": "Se você se sente triste, ansiosa ou sobrecarregada, na gravidez ou depois: National Maternal Mental Health Hotline, 1-833-TLC-MAMA (1-833-852-6262). Ligue ou mande mensagem. Intérpretes em muitos idiomas.",
      "linePoison": "Se você ou o bebê engoliram algo: Centro de Intoxicações (Poison Control), 1-800-222-1222.",
      "lineDv": "Se você não está segura em casa: National Domestic Violence Hotline, 1-800-799-7233, ou mande START por mensagem para 88788.",
      "call": "Ligar",
      "text": "Mensagem"
    },
    "nav": {
      "prenatal": "Consultas<br>pré-natais",
      "labor": "Trabalho de parto &amp;<br>Parto",
      "recovery": "Recuperação<br>pós-parto",
      "baby": "Seu<br>recém-nascido",
      "toolsTrackers": "Ferramentas &amp;<br>Registros",
      "today": "Hoje",
      "guide": "Guia",
      "urgent": "Quando ligar",
      "me": "Eu"
    },
    "today": {
      "whereNow": "Em que fase você está?",
      "pregnant": "Estou grávida",
      "dueLabel": "Data provável do parto",
      "babyHere": "Meu bebê nasceu",
      "bornLabel": "Data de nascimento do bebê",
      "save": "Mostre o que vem a seguir",
      "savedOnPhone": "Isso fica no seu celular. Você pode mudar quando quiser em Eu.",
      "week": "Semana {week}",
      "due": "Data provável: {date}",
      "babyDays": {
        "one": "Seu bebê tem 1 dia",
        "many": "Seu bebê tem {count} dias",
        "other": "Seu bebê tem {count} dias"
      },
      "babyWeeks": {
        "one": "Seu bebê tem 1 semana",
        "many": "Seu bebê tem {count} semanas",
        "other": "Seu bebê tem {count} semanas"
      },
      "visitsNow": "Nas suas consultas agora",
      "comingUp": "Em breve",
      "allVisits": "Todas as consultas, semana a semana",
      "toolsNow": "Útil agora",
      "changeDates": "Mudar datas"
    },
    "visits": {
      "title": "Suas consultas, semana a semana",
      "sub": "O que acontece em cada consulta e o que você decide",
      "lead": "Este é o calendário habitual nos EUA. O seu pode ser diferente: seu médico de família, obstetra ou parteira acrescenta consultas e exames quando você precisa.",
      "afterBirth": "Depois do parto",
      "yourChoice": "Você decide",
      "first": {
        "when": "Por volta de 8–10 semanas",
        "title": "Primeira consulta",
        "i1": "A data provável do parto é calculada a partir da sua última menstruação, muitas vezes com um ultrassom precoce.",
        "i2": "Exames de sangue: tipo sanguíneo e Rh, hemograma, imunidade a rubéola e catapora, hepatites B e C, HIV e sífilis. Um exame de urina e testes para clamídia e gonorreia.",
        "i3": "Um teste de açúcar cedo se você teve diabetes em uma gravidez anterior ou tem outros fatores de risco.",
        "i4": "Se você tem risco maior de pré-eclâmpsia, aspirina em dose baixa (81 mg por dia) a partir de 12 semanas diminui esse risco. Pergunte se ela é indicada para você."
      },
      "genetic": {
        "when": "A partir de 10 semanas",
        "title": "Exames para o bebê",
        "i1": "Um exame de sangue a partir de 10 semanas (DNA fetal livre) rastreia síndrome de Down e algumas outras condições. Um rastreamento não é um diagnóstico: um resultado positivo significa que será oferecido um exame diagnóstico.",
        "i2": "O rastreamento de portadora verifica se você tem genes de condições como fibrose cística ou atrofia muscular espinhal.",
        "i3": "Você pode fazer todos, alguns ou nenhum desses exames."
      },
      "monthly": {
        "when": "A cada 4 semanas, até 28 semanas",
        "title": "Consultas de rotina",
        "i1": "Pressão, peso, urina e os batimentos do bebê. A partir de umas 20 semanas, também medem o tamanho da sua barriga."
      },
      "anatomy": {
        "when": "18–22 semanas",
        "title": "Ultrassom morfológico",
        "i1": "Um exame detalhado do corpo do bebê, do crescimento e da placenta. Em geral dá para saber o sexo, se você quiser."
      },
      "sugar": {
        "when": "24–28 semanas",
        "title": "Teste de açúcar e exames de sangue",
        "i1": "Uma bebida doce e, uma hora depois, um exame de sangue para ver se há diabetes gestacional.",
        "i2": "Um hemograma para anemia e um novo teste de sífilis.",
        "i3": "Se seu tipo sanguíneo é Rh negativo: uma injeção de Rh (RhoGAM) por volta de 28 semanas."
      },
      "tdap": {
        "when": "27–36 semanas",
        "title": "Vacina contra coqueluche (Tdap)",
        "i1": "Seus anticorpos passam para o bebê e o protegem nos primeiros meses, antes que ele possa tomar as próprias vacinas. É tomada em toda gravidez."
      },
      "twoweekly": {
        "when": "A cada 2 semanas, a partir de 28 semanas",
        "title": "As consultas ficam mais próximas",
        "i1": "Conheça como seu bebê costuma se mexer. Contar os chutes é opcional. Se o bebê se mexer menos que o normal, ligue no mesmo dia. Não espere a próxima consulta.",
        "i2": "Se você tem uma condição como pressão alta ou diabetes, exames extras do bebê (cardiotocografia ou ultrassom) muitas vezes começam por volta de 32 semanas."
      },
      "rsv": {
        "when": "32–36 semanas, de setembro a janeiro",
        "title": "Proteção contra VSR para o bebê",
        "i1": "Ou uma vacina contra VSR para você entre 32 e 36 semanas, ou uma injeção de anticorpos para o bebê depois do nascimento. Uma ou outra, não as duas. Cada uma diminui a chance de o bebê ir parar no hospital por VSR no primeiro inverno."
      },
      "gbs": {
        "when": "36–37 semanas",
        "title": "Exame de estreptococo do grupo B, e a posição do bebê",
        "i1": "Uma coleta com cotonete da vagina e do reto. Cerca de 1 em cada 4 mulheres tem GBS, e isso não faz mal a você. Se o seu der positivo, você recebe antibiótico na veia durante o parto para proteger o bebê.",
        "i2": "Verificam se o bebê está de cabeça para baixo. Se o bebê estiver sentado (pélvico), podem oferecer uma forma de virar o bebê (versão cefálica externa), ou você pode planejar uma cesárea.",
        "i3": "Reveja seu plano de parto: alívio da dor, quem vai estar com você, alimentação do bebê."
      },
      "weekly": {
        "when": "Toda semana, a partir de 36 semanas",
        "title": "As últimas semanas",
        "i1": "A partir de 38 semanas podem oferecer o descolamento de membranas: um movimento com o dedo no colo do útero que pode ajudar o trabalho de parto a começar.",
        "i2": "A indução pode ser oferecida a partir de 39 semanas. Com 41 semanas ela é recomendada, porque o risco para o bebê começa a aumentar."
      },
      "ppBp": {
        "when": "3–10 dias depois do parto",
        "title": "Medir a pressão, se ela estava alta",
        "i1": "Se você teve pressão alta ou pré-eclâmpsia, meça a pressão entre 3 e 10 dias depois do parto. A pré-eclâmpsia pode começar ou piorar depois do parto."
      },
      "pp3": {
        "when": "Até 3 semanas depois do parto",
        "title": "Primeiro contato",
        "i1": "Converse com seu médico de família, obstetra ou parteira sobre sangramento, dor, alimentação do bebê, humor e sono. Uma ligação ou chamada de vídeo pode valer."
      },
      "ppFull": {
        "when": "Até 12 semanas depois do parto, muitas vezes com 4–6",
        "title": "Consulta pós-parto completa",
        "i1": "Avaliação do humor, anticoncepção, como você está se recuperando e planos para uma próxima gravidez.",
        "i2": "Se você teve diabetes gestacional: um teste de açúcar entre 4 e 12 semanas depois do parto. O risco de diabetes tipo 2 continua maior a vida toda, então peça um exame a cada 1 a 3 anos.",
        "i3": "Se você perde urina ou fezes, sente dor na relação ou sente um volume na vagina, pergunte sobre fisioterapia do assoalho pélvico. Ajuda. Você não precisa conviver com isso."
      }
    }
  },
  "content": {
    "postpartum-danger": {
      "title": "",
      "sub": "",
      "t": [
        "Vá ao pronto-socorro ou ligue para 911 se tiver",
        "Dor no peito ou dificuldade para respirar · Convulsão · Dor de cabeça forte e repentina, diferente de qualquer outra · Sinais de AVC (rosto caído, fraqueza no braço, fala enrolada) · Pensamentos de machucar você ou seu bebê",
        "Ligue para seu médico de família, obstetra ou parteira se tiver",
        "Febre &gt;100.4°F · Encharcar 1 absorvente em uma hora · Dor de cabeça forte que não melhora com ibuprofeno/Tylenol · Mudanças na visão · Vermelhidão, inchaço ou calor na perna (DVT, coágulo em veia profunda) · Ferida abrindo, vermelhidão se espalhando ou pus · Dificuldade para urinar · Sinais de depressão pós-parto (PPD) ou ansiedade",
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
        "A regra 5-1-1 (primeiro bebê)",
        "Vá para o hospital quando as contrações vierem",
        "a cada 5 minutos, durando 1 minuto, por pelo menos 1 hora",
        ". No segundo bebê ou nos seguintes, vá mais cedo. Ligue quando estiverem a cada 6–8 minutos, porque o trabalho de parto anda mais rápido.",
        "Vá imediatamente se tiver qualquer um destes",
        "A bolsa estourou",
        "(jato ou gotejamento constante) · Sangramento vermelho vivo (mais do que manchas) · O bebê parou de se mexer · Dor forte e constante na barriga · Sinais de pré-eclâmpsia: dor de cabeça forte que não melhora com Tylenol, mudanças na visão, inchaço forte e repentino",
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
        "Ligue imediatamente para o médico do bebê se houver",
        "Febre ≥ 100.4°F retal (grave em recém-nascidos. Meça sempre a temperatura retal) · Recusa para mamar · Amarelão forte · Gemido a cada respiração · Pele muito pálida · Choro que não acalma · Menos de 6 fraldas molhadas por dia depois do 5º dia · Pescoço rígido. Lábios ou rosto azulados ou acinzentados: ligue para 911."
      ]
    },
    "faq-deli": {
      "title": "Posso comer frios e queijos moles?",
      "sub": "",
      "t": [
        "O principal risco é a",
        "Listeria",
        ", uma infecção por bactéria que é rara, mas pode ser grave na gravidez (pode atravessar a placenta). A FDA recomenda evitar queijos não pasteurizados e frios, a menos que sejam aquecidos até soltar vapor (165°F). A maioria dos queijos moles pasteurizados (como brie pasteurizado, feta de pacote) é segura. A exceção são o queso fresco, o queso blanco, a panela e queijos frescos parecidos: mesmo os pasteurizados já causaram surtos de listeria, então coma-os só cozidos até soltar vapor. O risco geral de comer frios de vez em quando é muito baixo. Na dúvida, aqueça."
      ]
    },
    "faq-coffee": {
      "title": "Posso tomar alguma cafeína?",
      "sub": "",
      "t": [
        "Sim. O ACOG recomenda limitar a cafeína a",
        "menos de 200 mg por dia",
        "(mais ou menos uma xícara de 12-oz de café coado). Nessa quantidade, não há evidência de dano à gravidez. Chá, refrigerante e chocolate também têm cafeína. Some tudo. Diminuir é razoável; cortar totalmente é uma escolha pessoal, não uma exigência médica."
      ]
    },
    "faq-hair-dye": {
      "title": "Posso pintar o cabelo na gravidez?",
      "sub": "",
      "t": [
        "Sim, mas pense no motivo. A tinta de cabelo é absorvida pelo couro cabeludo em quantidades muito pequenas. Nenhum estudo publicado mostrou dano ao bebê nas quantidades de uma coloração normal no salão ou em casa. Mechas (com papel alumínio) têm ainda menos contato com o couro cabeludo. Se você estiver preocupada, espere até o segundo trimestre, quando os principais órgãos já estão formados, ou simplesmente não pinte."
      ]
    },
    "faq-exercise-mc": {
      "title": "Exercício causa aborto espontâneo?",
      "sub": "",
      "t": [
        "Não. Exercício moderado não causa aborto espontâneo em gestações saudáveis. Uma certa quantidade de exercício protege, não faz mal. Veja as orientações de exercício na seção Pré-natal. Se o seu médico disse para você não se exercitar, pergunte o motivo e siga a orientação."
      ]
    },
    "faq-sex-pregnancy": {
      "title": "É seguro fazer sexo na gravidez?",
      "sub": "",
      "t": [
        "Sim, numa gravidez normal sem complicações. Sexo não causa aborto espontâneo nem trabalho de parto precoce e não faz mal ao bebê (que fica protegido pelo líquido amniótico). O seu médico só vai recomendar repouso pélvico (sem relação sexual) em situações específicas: placenta prévia, risco de parto prematuro, sangramento vaginal sem explicação, certos problemas no colo do útero ou depois que a bolsa rompeu. Se não tiver certeza, pergunte na próxima consulta."
      ]
    },
    "faq-vaccines": {
      "title": "As vacinas são seguras na gravidez?",
      "sub": "",
      "t": [
        "Duas são recomendadas em toda gravidez e parecem ser seguras: o reforço da Tdap e a vacina da gripe. As vacinas de vírus vivo esperam até depois do parto.",
        "Tdap, contra coqueluche",
        "Aplicada entre 27 e 36 semanas, em toda gravidez, mesmo que você tenha tomado na última. O objetivo principal não é proteger você. Seu corpo produz anticorpos e passa pela placenta, então o bebê já nasce com proteção contra a coqueluche. Isso importa porque a coqueluche é mais perigosa nos primeiros meses de vida, antes de o bebê ter idade para ser vacinado. Quem for pegar o bebê no colo com frequência também deve estar com a vacina em dia.",
        "Vacina da gripe",
        "Recomendada em qualquer trimestre durante a temporada de gripe. A gravidez muda o funcionamento dos pulmões e do sistema imunológico, o que torna bem mais provável que a gripe leve você ao hospital. Os anticorpos também passam para o bebê e o protegem nos primeiros meses. Na gravidez se usa a vacina injetável: o spray nasal é uma vacina de vírus vivo.",
        "As que esperam até depois do parto",
        "Vacinas de vírus vivo, ou seja, a tríplice viral MMR (sarampo, caxumba e rubéola) e a de varicela (catapora), não são dadas na gravidez. Se o seu primeiro exame de sangue mostrar que você não tem imunidade contra rubéola ou catapora, o plano habitual é vacinar antes de você sair do hospital, o que também protege uma futura gravidez. As duas são seguras durante a amamentação.",
        "Se estiver com outra vacina atrasada, for viajar ou houver um surto onde você mora, avise o seu médico."
      ]
    },
    "faq-eat-for-two": {
      "title": "Preciso \"comer por dois\"?",
      "sub": "",
      "t": [
        "Não. \"Comer por dois\" é um mito. No primeiro trimestre, você não precisa de calorias a mais. No segundo, cerca de 340 a mais por dia; no terceiro, cerca de 450. Isso é um ou dois lanches, não um segundo prato. A qualidade da alimentação importa muito mais que a quantidade. Priorize proteína, ferro, folato, cálcio e ácidos graxos ômega-3. Sua vitamina pré-natal ajuda a cobrir lacunas, mas não deve substituir uma alimentação equilibrada."
      ]
    },
    "faq-hot-tub": {
      "title": "Posso tomar banho de banheira ou usar ofurô?",
      "sub": "",
      "t": [
        "Banhos mornos de banheira são tranquilos durante toda a gravidez. Ofurôs, saunas e salas de vapor que elevam sua temperatura interna acima de 102°F (39°C) não são recomendados, principalmente no primeiro trimestre, quando a temperatura alta está ligada a defeitos do tubo neural. Se for usar ofurô, mantenha a temperatura agradável (não quente), fique no máximo 10 minutos e evite no primeiro trimestre. Um banho morno na temperatura comum da água de casa (98–100°F) é seguro."
      ]
    },
    "faq-epidural-csec": {
      "title": "A peridural aumenta o risco de cesárea?",
      "sub": "",
      "t": [
        "Não. Essa é uma das perguntas mais estudadas da obstetrícia. Vários grandes ensaios clínicos randomizados e metanálises confirmam que a peridural",
        "não",
        "aumenta as taxas de cesárea. A peridural deixa a fase de empurrar um pouco mais longa e torna mais provável um parto com vácuo ou fórceps, o que vale pesar junto com o alívio da dor. Você pode pedir em qualquer momento do trabalho de parto ativo. O limite prático não é um número de centímetros, mas a velocidade do trabalho de parto, já que um parto muito rápido pode não dar tempo."
      ]
    },
    "faq-routine-episiotomy": {
      "title": "Preciso de episiotomia para evitar laceração?",
      "sub": "",
      "t": [
        "Não. O ACOG não recomenda mais a episiotomia de rotina (um corte cirúrgico na entrada da vagina). As evidências mostram sempre que",
        "as lacerações naturais geralmente cicatrizam melhor",
        "e causam menos complicações (incluindo dor e problemas de assoalho pélvico a longo prazo) do que as episiotomias de rotina. A maioria das mulheres que têm parto normal tem alguma laceração, mas muitas são leves (de primeiro grau). A episiotomia ainda é adequada quando há um motivo específico, como quando o bebê precisa nascer rápido por sofrimento fetal."
      ]
    },
    "faq-water-breaking": {
      "title": "Se a bolsa estourar, preciso fazer cesárea?",
      "sub": "",
      "t": [
        "Não. Se a bolsa estourar a termo, a maioria das mulheres entra em trabalho de parto sozinha em cerca de um dia. Se o trabalho de parto não começar, geralmente se oferece indução, porque a chance de infecção aumenta quanto mais tempo a bolsa fica rompida. É um risco crescente para pesar juntos, não um prazo que você perdeu. Se você for GBS positivo, os antibióticos começam na hora. A cesárea só é necessária se houver outro motivo para ela, e a bolsa estourar, por si só, não é um."
      ]
    },
    "faq-eat-in-labor": {
      "title": "Posso comer ou beber durante o trabalho de parto?",
      "sub": "",
      "t": [
        "Para mulheres de baixo risco no início do trabalho de parto, a orientação atual do ACOG permite comida leve e líquidos claros. Depois que você toma peridural, está com Pitocin ou tem risco maior de precisar de anestesia geral (possível cesárea), a maioria dos hospitais limita a lascas de gelo ou goles de água, pelo risco de aspiração se a anestesia geral for necessária. Pergunte a regra do seu hospital. Para o seu acompanhante: leve lanches. O trabalho de parto pode durar o dia todo."
      ]
    },
    "faq-vbac": {
      "title": "Se já tive uma cesárea, sempre vou precisar de outra?",
      "sub": "",
      "t": [
        "Não necessariamente. O parto normal depois de cesárea (VBAC) é uma opção segura e adequada para muitas mulheres com uma cesárea anterior com corte transversal baixo no útero. A taxa de sucesso vai de 60–80%. O que conta é o motivo da cesárea anterior, a gravidez atual, o tipo de corte no útero e a capacidade do seu hospital de lidar com uma emergência. Se tiver interesse, fale disso logo no início do pré-natal."
      ]
    },
    "faq-bf-bc": {
      "title": "Posso engravidar amamentando?",
      "sub": "",
      "t": [
        "Sim. A amamentação exclusiva reduz a ovulação até certo ponto, mas",
        "não é um método anticoncepcional confiável",
        ". Você pode ovular e engravidar antes de a menstruação voltar. O \"método da amenorreia lactacional\" exige condições bem específicas (amamentação exclusiva a cada 4 horas de dia / 6 horas à noite, sem complemento, menstruação ainda não voltou) e, mesmo nessas condições rígidas, só tem cerca de 98% de eficácia. Converse sobre anticoncepção antes de sair do hospital."
      ]
    },
    "faq-stress-milk": {
      "title": "O estresse seca o leite?",
      "sub": "",
      "t": [
        "Um estresse forte pode atrapalhar por um tempo o reflexo de ejeção (a descida do leite). Mas um único momento de estresse não faz o leite secar. A produção de leite depende da demanda. Quanto mais vezes e melhor o bebê mama ou você tira leite, mais leite o corpo produz. Se o estresse ou a agitação ao redor impedem o bebê de mamar bem, a demanda pode cair, e a produção também. O que ajuda a descida do leite: contato pele a pele, calor, técnicas de relaxamento e olhar uma foto do bebê enquanto tira leite. Converse com o seu médico sobre formas de reduzir o estresse sem remédios."
      ]
    },
    "faq-bonding": {
      "title": "Eu deveria sentir um vínculo imediato com o meu bebê?",
      "sub": "",
      "t": [
        "Não. O vínculo é um processo, não um momento só. Muitas mães sentem um amor profundo logo no nascimento; outras precisam de dias, semanas ou mais para esse sentimento crescer. As duas coisas são completamente normais. Cansaço físico, partos difíceis, resultados inesperados e a depressão pós-parto podem afetar o vínculo no começo. Se você se sentir desconectada ou anestesiada em relação ao bebê por mais de duas semanas, conte ao seu médico. Pode ser um sinal de depressão pós-parto, que tem tratamento."
      ]
    },
    "faq-ibuprofen-bf": {
      "title": "Posso tomar ibuprofeno amamentando?",
      "sub": "",
      "t": [
        "Sim. O ibuprofeno é um dos remédios sem receita mais seguros na amamentação. Muito pouco passa para o leite. O paracetamol (Tylenol) também é seguro. Esses são os analgésicos preferidos no pós-parto e na amamentação. Aspirina em dose alta não é recomendada (aspirina em dose baixa receitada é outra história. Converse com o seu médico). O naproxeno (Aleve) passa mais para o leite e geralmente não é o preferido. Confirme sempre com a sua equipe de saúde para a sua situação."
      ]
    },
    "faq-jaundice": {
      "title": "Meu bebê está amarelado. Quando é grave?",
      "sub": "",
      "t": [
        "A icterícia do recém-nascido (hiperbilirrubinemia) atinge cerca de 60% dos bebês a termo na primeira semana. Ela vem da quebra normal dos glóbulos vermelhos do feto. O fígado está só se ajustando. A maioria dos casos é leve e passa sem tratamento. Preocupa quando a bilirrubina está muito alta (risco de dano cerebral em níveis extremos), quando o bebê está muito sonolento, não mama, ou quando a icterícia aparece nas primeiras 24 horas. O hospital vai medir a bilirrubina antes da alta e na consulta do bebê com 2–5 dias. O tratamento com fototerapia (banho de luz) funciona muito bem, se for preciso."
      ]
    },
    "faq-newborn-procedures": {
      "title": "Todos os procedimentos do recém-nascido precisam ser feitos?",
      "sub": "",
      "t": [
        "Os procedimentos padrão do recém-nascido incluem:",
        "injeção de vitamina K",
        "(diminui o risco de sangramento fatal no cérebro),",
        "pomada de eritromicina nos olhos",
        "(reduz infecções nos olhos, incluindo gonorreia),",
        "primeira dose da vacina de hepatite B",
        "e a",
        "coleta de sangue para a triagem metabólica neonatal",
        "(teste do pezinho para cerca de 30 doenças, incluindo PKU, hipotireoidismo e anemia falciforme). As evidências por trás deles não têm todas a mesma força, e é razoável perguntar sobre cada um separadamente. A vitamina K e o teste do pezinho têm o motivo mais claro: a vitamina K previne um sangramento raro, mas catastrófico, e o teste do pezinho encontra doenças que só podem ser tratadas se forem descobertas nos primeiros dias. A dose de hepatite B importa mais quando o seu próprio resultado de hepatite B é positivo ou desconhecido. A pomada nos olhos tem evidência mais fraca, e vários países deixaram de dar como rotina, embora muitos estados dos EUA exijam por lei. Na maioria dos estados você pode recusar legalmente. Pergunte à sua equipe quais se aplicam à sua situação."
      ]
    },
    "faq-first-bath": {
      "title": "Quando o bebê precisa do primeiro banho?",
      "sub": "",
      "t": [
        "A OMS (WHO) e a AAP agora recomendam adiar o primeiro banho por pelo menos 24 horas depois do nascimento (de preferência 48 horas). A camada branca (vérnix caseoso) tem ação antimicrobiana e ajuda a hidratar a pele. Adiar o banho também ajuda a manter a temperatura do corpo, ajuda o açúcar no sangue a ficar estável e está ligado a um começo melhor da amamentação. Esperar é a melhor prática atual, não só uma preferência."
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
