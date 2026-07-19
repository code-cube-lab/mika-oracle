(function () {
  const header = document.querySelector("[data-header]");
  const modal = document.getElementById("leadModal");
  const planSelect = document.getElementById("planSelect");
  const leadForm = document.getElementById("leadForm");
  const formResult = document.getElementById("formResult");
  const readingResult = document.getElementById("readingResult");
  const chatLog = document.getElementById("chatLog");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const clientNameInput = document.getElementById("clientNameInput");
  const birthDateInput = document.getElementById("birthDateInput");
  const zodiacBadge = document.getElementById("zodiacBadge");
  const moneyQuestionInput = document.getElementById("moneyQuestionInput");
  const dailyEmailInput = document.getElementById("dailyEmailInput");
  const dailyMailConsent = document.getElementById("dailyMailConsent");
  const dailySaveButton = document.getElementById("dailySaveButton");
  const dailyMailStatus = document.getElementById("dailyMailStatus");
  const zodiacProfile = document.getElementById("zodiacProfile");
  const unfoldPanel = document.getElementById("unfoldPanel");
  const drawMeta = document.getElementById("drawMeta");
  const drawProgress = document.getElementById("drawProgress");
  let drawProgressSteps = drawProgress ? Array.from(drawProgress.querySelectorAll("span")) : [];
  const reshuffleButton = document.getElementById("reshuffleButton");
  const tarotBoard = document.querySelector(".tarot-board");
  const drawStage = document.getElementById("drawStage");
  const stageText = document.getElementById("stageText");
  const stageCards = Array.from(document.querySelectorAll(".stage-card span"));
  const tarotButtons = Array.from(document.querySelectorAll(".tarot-card"));
  const accessBadge = document.getElementById("accessBadge");
  const accessActivation = document.getElementById("accessActivation");
  const accessCodeForm = document.getElementById("accessCodeForm");
  const accessCodeInput = document.getElementById("accessCodeInput");
  const accessStatus = document.getElementById("accessStatus");
  const paidCabinet = document.getElementById("paidCabinet");
  const paidWelcome = document.getElementById("paidWelcome");
  const paidPersonalResult = document.getElementById("paidPersonalResult");
  const resetPaidAccessButton = document.getElementById("resetPaidAccess");

  const planPrices = {
    "Эконом": "1 500 ₽",
    "Бизнес": "4 900 ₽",
    "Премиум": "12 900 ₽"
  };

  const cardMarks = ["I", "II", "III", "IV", "V", "VI", "VII", "IX", "XI", "XIV", "XVII", "XXI"];
  const deepLocks = [
    "почему ситуация повторяется",
    "какой человек или страх влияет скрыто",
    "какой сценарий вероятнее в ближайшие 7-30 дней",
    "что именно сказать, убрать или запустить",
    "где вы теряете деньги, время или внимание"
  ];

  const zodiacProfiles = {
    "Овен": { element: "огонь", focus: "действовать быстрее, но не переплачивать за импульс", question: "какой шаг даст движение уже сегодня?" },
    "Телец": { element: "земля", focus: "укрепить цену, комфорт и материальную опору", question: "где пора назвать свою ценность тверже?" },
    "Близнецы": { element: "воздух", focus: "выбрать один канал и не распылять внимание", question: "какая коммуникация принесет деньги быстрее?" },
    "Рак": { element: "вода", focus: "отделить заботу от неоплаченной нагрузки", question: "где мои границы сохранят ресурс?" },
    "Лев": { element: "огонь", focus: "показать результат заметнее и увереннее", question: "что пора вынести на первый план?" },
    "Дева": { element: "земля", focus: "упростить систему, счет, порядок и повторяемость", question: "какая деталь сейчас съедает деньги?" },
    "Весы": { element: "воздух", focus: "вернуть баланс обмена и договоренностей", question: "где условия должны стать честнее?" },
    "Скорпион": { element: "вода", focus: "увидеть скрытый мотив и перестать кормить старый сценарий", question: "какую привязку пора отпустить?" },
    "Стрелец": { element: "огонь", focus: "расширить горизонт, но считать цену решения", question: "какая цель стоит реального вложения?" },
    "Козерог": { element: "земля", focus: "собрать структуру, срок и финансовое правило", question: "какое правило укрепит доход?" },
    "Водолей": { element: "воздух", focus: "найти нестандартный ход без хаоса", question: "какая идея даст практический результат?" },
    "Рыбы": { element: "вода", focus: "перевести чувствительность в ясный выбор", question: "где интуицию нужно проверить действием?" }
  };

  const tarotDeck = [
    {
      name: "Туз Пентаклей",
      number: "I",
      art: "art-ace-pentacles",
      symbol: "золотое зерно",
      focus: "Деньги готовы прийти через конкретный навык, продукт или предложение.",
      leak: "Ресурс уходит в ожидание идеального момента и слишком долгую подготовку.",
      action: "Назовите один платный шаг, который можно предложить уже сегодня.",
      plan: "Эконом"
    },
    {
      name: "Колесо Фортуны",
      number: "X",
      art: "art-wheel",
      symbol: "поворот цикла",
      focus: "Ситуация с деньгами двигается волнами. Сейчас важно не проспать окно перемен.",
      leak: "Деньги теряются там, где решение каждый день переносится на потом.",
      action: "Проверьте один сценарий малым действием, без обещания себе начать идеально.",
      plan: "Бизнес"
    },
    {
      name: "Императрица",
      number: "III",
      art: "art-empress",
      symbol: "ценность и упаковка",
      focus: "Доход приходит через красоту, заботу, упаковку и умение показать ценность.",
      leak: "Вы можете отдавать слишком много бесплатно, надеясь, что вас заметят.",
      action: "Оформите результат в понятный формат и обозначьте цену.",
      plan: "Бизнес"
    },
    {
      name: "Маг",
      number: "I",
      art: "art-magician",
      symbol: "собранная воля",
      focus: "Инструменты уже есть. Рост тормозит не отсутствие силы, а распыление.",
      leak: "Энергия уходит между идеями, каналами и чужими ожиданиями.",
      action: "Соберите главный оффер в одну фразу и уберите лишние варианты.",
      plan: "Премиум"
    },
    {
      name: "Шестерка Пентаклей",
      number: "VI",
      art: "art-six-pentacles",
      symbol: "баланс обмена",
      focus: "Карта показывает тему честной цены, помощи, долга и границ.",
      leak: "Слишком мягкие границы превращают поддержку в неоплаченную работу.",
      action: "Отделите помощь от услуги и назовите условия заранее.",
      plan: "Эконом"
    },
    {
      name: "Король Пентаклей",
      number: "K",
      art: "art-king-pentacles",
      symbol: "структура денег",
      focus: "Доход усиливается через порядок, правило, дисциплину и долгую стратегию.",
      leak: "Слабое место - хаос в решениях и отсутствие одного финансового правила.",
      action: "Выберите правило недели: цена, лимит, срок или следующий шаг.",
      plan: "Премиум"
    },
    {
      name: "Звезда",
      number: "XVII",
      art: "art-star",
      symbol: "доверие",
      focus: "Деньги связаны с доверием, публичностью и возвращением внутренней опоры.",
      leak: "Сильная сторона прячется, потому что вы ждете полного одобрения.",
      action: "Покажите один честный пример результата и пригласите к диалогу.",
      plan: "Бизнес"
    },
    {
      name: "Двойка Пентаклей",
      number: "II",
      art: "art-two-pentacles",
      symbol: "баланс двух потоков",
      focus: "Деньги требуют баланса: два направления можно держать, если у каждого есть срок и правило.",
      leak: "Ресурс теряется в постоянном переключении и попытке тащить все одновременно.",
      action: "Оставьте два направления, но назначьте каждому понятную роль: что кормит сейчас, а что растет дальше.",
      plan: "Бизнес"
    },
    {
      name: "Восьмерка Пентаклей",
      number: "VIII",
      art: "art-eight-pentacles",
      symbol: "ремесло",
      focus: "Рост лежит в повторяемом навыке: делать, улучшать, показывать, продавать.",
      leak: "Вы можете недооценивать простую работу, которая и дает деньги.",
      action: "Сделайте один повторяемый продукт или услугу вместо десяти разрозненных идей.",
      plan: "Бизнес"
    },
    {
      name: "Солнце",
      number: "XIX",
      art: "art-sun",
      symbol: "ясность и проявленность",
      focus: "Деньги приходят через открытость: показать результат, назвать цену и убрать лишнюю сложность.",
      leak: "Ресурс теряется, когда сильное предложение прячется за сомнениями и слишком сложным объяснением.",
      action: "Сделайте предложение проще и видимее: один результат, одна цена, один следующий шаг.",
      plan: "Премиум"
    },
    {
      name: "Сила",
      number: "XI",
      art: "art-strength",
      symbol: "мягкая власть",
      focus: "Деньги приходят, когда вы действуете спокойно, но не уступаете свое место.",
      leak: "Слишком много энергии уходит на доказательство, что вы имеете право хотеть большего.",
      action: "Скажите одно твердое условие без оправдания.",
      plan: "Эконом"
    },
    {
      name: "Семерка Кубков",
      number: "VII",
      art: "art-seven-cups",
      symbol: "много желаний",
      focus: "Перед вами много красивых вариантов, но не все ведут к реальному доходу.",
      leak: "Вы теряете деньги в фантазиях, покупках, обещаниях или чужих историях успеха.",
      action: "Оставьте один вариант, который можно проверить за неделю.",
      plan: "Бизнес"
    }
  ];

  const dailySoulMessages = [
    {
      hook: "Сегодня заденет не случайная фраза, а то, что вы давно стараетесь не называть вслух.",
      message: "Не спешите искать знак снаружи. Сначала заметьте, где внутри уже созрело тихое «хватит» или «пора».",
      question: "Какую правду о себе я сегодня готов признать без оправданий?",
      action: "Запишите один честный ответ и не объясняйте его никому до вечера."
    },
    {
      hook: "То, что хочется ускорить, сегодня просит не рывка, а бережной ясности.",
      message: "Сила дня — не в том, чтобы успеть всё. Она в выборе одного шага, после которого внутри станет тише.",
      question: "Что я могу не тащить дальше только потому, что уже начал?",
      action: "Снимите с себя одно необязательное обещание или перенесите его честно."
    },
    {
      hook: "Сегодняшний поворот может начаться с маленького отказа предавать собственное чувство.",
      message: "Не каждое сомнение нужно победить. Иногда его достаточно услышать и проверить одним безопасным действием.",
      question: "Где моё «не знаю» на самом деле означает «мне так не подходит»?",
      action: "Перед ответом кому-то выдержите паузу в десять спокойных вдохов."
    },
    {
      hook: "Внутри уже есть ответ, но он говорит тише чужих ожиданий.",
      message: "Сегодня полезно отделить желание быть понятым от желания быть собой. Второе важнее и обычно требует меньше слов.",
      question: "Как бы я поступил, если бы не должен был никого убеждать?",
      action: "Сделайте один выбор без длинного объяснения и оставьте себе право его пересмотреть."
    },
    {
      hook: "То, что сегодня раздражает, может охранять место, где ваши границы стали слишком тонкими.",
      message: "Раздражение не всегда враг. Иногда это короткий сигнал: вы снова отдаёте больше, чем можете отдать без потери себя.",
      question: "Где я говорю «ничего страшного», хотя мне уже тесно?",
      action: "Назовите одну границу спокойной фразой без обвинения."
    },
    {
      hook: "Сегодня не нужно становиться сильнее. Нужно перестать тратить силу на то, что не ваше.",
      message: "Верните внимание туда, где есть жизнь, отклик и реальный следующий шаг. Остальное может подождать.",
      question: "Что забирает мой ресурс, но не приближает к важному?",
      action: "Отложите один источник шума минимум на два часа."
    },
    {
      hook: "Один незакрытый разговор сегодня может звучать внутри громче всех дел.",
      message: "Не обязательно решать всё сразу. Достаточно назвать себе, чего вы ждали от этого разговора и что можете дать себе сами.",
      question: "Какие слова я всё ещё надеюсь услышать — и зачем они мне?",
      action: "Напишите эти слова себе от первого лица. Не отправляйте сообщение импульсивно."
    },
    {
      hook: "Сегодняшняя карта не про судьбу. Она про точку, где вы снова можете выбрать себя.",
      message: "Даже маленькое решение возвращает чувство опоры, если оно принято не из страха, а из уважения к себе.",
      question: "Какой выбор сегодня поддержит меня завтра?",
      action: "Сделайте самый маленький обратимый шаг в эту сторону."
    },
    {
      hook: "Возможно, вы устали не от пути, а от необходимости всё время доказывать, что имеете право по нему идти.",
      message: "Сегодня разрешите себе не заслуживать отдых, внимание или новую попытку. Это не награда, а часть живого ритма.",
      question: "Что я разрешил бы близкому человеку, но запрещаю себе?",
      action: "Дайте себе это хотя бы на двадцать минут."
    },
    {
      hook: "Самое важное сегодня может выглядеть слишком простым, чтобы считать его настоящим решением.",
      message: "Не обесценивайте тихие шаги. Часто именно они возвращают устойчивость быстрее громких обещаний.",
      question: "Какое простое действие я откладываю, потому что жду особого настроя?",
      action: "Сделайте его в течение пятнадцати минут без попытки сделать идеально."
    },
    {
      hook: "Сегодня стоит обратить внимание не на то, что ушло, а на место, которое после этого освободилось.",
      message: "Пустота пугает, пока кажется потерей. Но иногда это первая честная пауза перед новым выбором.",
      question: "Чем я больше не хочу заполнять освободившееся место?",
      action: "Оставьте одну паузу в расписании незаполненной."
    },
    {
      hook: "То, что вы называете слабостью, сегодня может оказаться способом услышать себя раньше, чем станет слишком больно.",
      message: "Чувствительность не требует немедленного решения. Она просит внимания, границ и времени на проверку фактов.",
      question: "Какое чувство я пытаюсь исправить вместо того, чтобы выслушать?",
      action: "Назовите чувство одним словом и отделите его от выводов о будущем."
    }
  ];

  const comboMeanings = {
    "Семерка Кубков->Императрица": "Семерка Кубков показывает много желаний, фантазий и заманчивых вариантов. Императрица после нее говорит: выберите один вариант, упакуйте его красиво и превратите желание в конкретную ценность, за которую можно платить.",
    "Императрица->Семерка Кубков": "Императрица показывает сильную ценность, но Семерка Кубков предупреждает: вы можете распылить ее на слишком много идей. Деньги придут быстрее, если оставить один понятный продукт или одно решение.",
    "Солнце->Король Пентаклей": "Солнце дает ясность и видимость, а Король Пентаклей требует закрепить это в системе. В сумме: покажите ценность открыто, но сразу переведите ее в цену, правило и понятные условия.",
    "Колесо Фортуны->Маг": "Колесо дает окно перемен, а Маг показывает, что нужно действовать самому. В сумме: шанс есть, но он сработает только через ваше конкретное предложение, звонок, запуск или решение.",
    "Двойка Пентаклей->Туз Пентаклей": "Двойка Пентаклей показывает два денежных потока и необходимость баланса. Туз Пентаклей после нее говорит: выберите один материальный шаг - счет, цену, оффер или заявку, чтобы баланс превратился в деньги.",
    "Шестерка Пентаклей->Сила": "Шестерка говорит о балансе обмена, а Сила добавляет границы. В сумме: перестаньте доказывать мягкостью, что вы достойны оплаты; называйте условия спокойно и твердо.",
    "Восьмерка Пентаклей->Звезда": "Восьмерка дает ремесло и регулярность, Звезда - доверие и публичность. В сумме: показывайте процесс, примеры и маленькие результаты, тогда доверие начнет превращаться в деньги."
  };

  const cardDrawings = {
    "art-ace-pentacles": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Туза Пентаклей">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <path class="card-horizon" d="M18 118 C40 104 80 104 102 118 L102 150 L18 150 Z"></path>
        <path class="card-cloud" d="M24 70 C32 52 54 55 58 70 C70 58 88 66 90 82 C77 88 44 88 24 80 Z"></path>
        <path class="card-hand" d="M35 82 C51 76 67 76 84 82 C79 93 45 93 35 82 Z"></path>
        <circle class="card-gold" cx="60" cy="58" r="23"></circle>
        <path class="card-line" d="M60 42 L65 54 L78 54 L68 62 L72 75 L60 67 L48 75 L52 62 L42 54 L55 54 Z"></path>
        <path class="card-line" d="M38 136 C49 128 71 128 82 136"></path>
      </svg>
    `,
    "art-wheel": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Колеса Фортуны">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <circle class="card-sky" cx="60" cy="78" r="44"></circle>
        <circle class="card-gold" cx="60" cy="78" r="31"></circle>
        <circle class="card-paper-fill" cx="60" cy="78" r="14"></circle>
        <path class="card-line" d="M60 34 L60 122 M16 78 L104 78 M29 47 L91 109 M91 47 L29 109"></path>
        <path class="card-line" d="M32 136 C47 128 73 128 88 136"></path>
      </svg>
    `,
    "art-empress": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Императрицы">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <path class="card-horizon" d="M18 118 C42 101 78 101 102 118 L102 150 L18 150 Z"></path>
        <rect class="card-throne" x="35" y="58" width="50" height="70" rx="10"></rect>
        <circle class="card-face" cx="60" cy="48" r="15"></circle>
        <path class="card-hair" d="M45 50 C47 25 73 25 75 50 C73 41 47 41 45 50 Z"></path>
        <path class="card-robe" d="M38 126 C42 81 78 81 82 126 Z"></path>
        <path class="card-gold-line" d="M48 34 L54 43 L60 31 L66 43 L72 34"></path>
        <path class="card-line" d="M41 139 C53 133 67 133 79 139"></path>
      </svg>
    `,
    "art-magician": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Мага">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <path class="card-gold-line" d="M48 34 C53 25 67 25 72 34 C67 43 53 43 48 34 Z"></path>
        <circle class="card-face" cx="60" cy="52" r="13"></circle>
        <path class="card-robe" d="M43 114 C45 72 75 72 77 114 Z"></path>
        <rect class="card-table" x="28" y="116" width="64" height="14" rx="3"></rect>
        <circle class="card-gold" cx="42" cy="123" r="6"></circle>
        <path class="card-line" d="M59 70 L59 104 M75 43 L82 24 M70 123 L84 123"></path>
        <path class="card-horizon" d="M20 140 C42 132 78 132 100 140"></path>
      </svg>
    `,
    "art-six-pentacles": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Шестерки Пентаклей">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <circle class="card-face" cx="60" cy="43" r="12"></circle>
        <path class="card-robe" d="M45 113 C46 65 74 65 75 113 Z"></path>
        <path class="card-line" d="M60 58 L60 102 M40 72 L80 72 M40 72 L33 94 M80 72 L87 94"></path>
        <path class="card-gold-line" d="M27 94 C33 101 43 101 49 94 M71 94 C77 101 87 101 93 94"></path>
        <circle class="card-gold" cx="31" cy="128" r="6"></circle>
        <circle class="card-gold" cx="48" cy="136" r="6"></circle>
        <circle class="card-gold" cx="89" cy="128" r="6"></circle>
      </svg>
    `,
    "art-king-pentacles": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Короля Пентаклей">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <rect class="card-throne" x="31" y="54" width="58" height="82" rx="8"></rect>
        <path class="card-gold-line" d="M46 42 L52 32 L60 43 L68 32 L74 42"></path>
        <circle class="card-face" cx="60" cy="53" r="13"></circle>
        <path class="card-robe" d="M41 126 C44 74 76 74 79 126 Z"></path>
        <circle class="card-gold" cx="74" cy="95" r="16"></circle>
        <path class="card-line" d="M74 84 L78 94 L89 94 L80 101 L83 113 L74 106 L65 113 L68 101 L59 94 L70 94 Z"></path>
      </svg>
    `,
    "art-star": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Звезды">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <path class="card-horizon" d="M18 122 C39 108 81 108 102 122 L102 150 L18 150 Z"></path>
        <path class="card-gold" d="M60 23 L66 43 L87 43 L70 55 L76 75 L60 62 L44 75 L50 55 L33 43 L54 43 Z"></path>
        <circle class="card-face" cx="57" cy="82" r="10"></circle>
        <path class="card-robe" d="M43 123 C45 91 69 91 72 123 Z"></path>
        <path class="card-line" d="M38 96 C28 99 23 108 22 120 M76 96 C86 99 93 108 96 120"></path>
        <path class="card-water" d="M25 137 C45 128 75 146 96 136"></path>
      </svg>
    `,
    "art-two-pentacles": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Двойки Пентаклей">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <path class="card-water" d="M16 128 C34 116 46 140 64 128 C82 116 92 140 104 128"></path>
        <circle class="card-face" cx="60" cy="56" r="12"></circle>
        <path class="card-robe" d="M44 118 C47 74 73 74 76 118 Z"></path>
        <circle class="card-gold" cx="35" cy="82" r="15"></circle>
        <circle class="card-gold" cx="85" cy="82" r="15"></circle>
        <path class="card-line" d="M35 82 C46 53 74 53 85 82 C74 111 46 111 35 82 Z"></path>
      </svg>
    `,
    "art-eight-pentacles": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Восьмерки Пентаклей">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <rect class="card-table" x="26" y="116" width="68" height="12" rx="3"></rect>
        <circle class="card-face" cx="60" cy="59" r="12"></circle>
        <path class="card-robe" d="M45 113 C47 75 73 75 75 113 Z"></path>
        <path class="card-line" d="M48 93 L31 110 M72 93 L89 110"></path>
        <circle class="card-gold small-coin" cx="30" cy="38" r="7"></circle>
        <circle class="card-gold small-coin" cx="50" cy="34" r="7"></circle>
        <circle class="card-gold small-coin" cx="70" cy="34" r="7"></circle>
        <circle class="card-gold small-coin" cx="90" cy="38" r="7"></circle>
        <circle class="card-gold small-coin" cx="31" cy="138" r="7"></circle>
        <circle class="card-gold small-coin" cx="50" cy="142" r="7"></circle>
        <circle class="card-gold small-coin" cx="70" cy="142" r="7"></circle>
        <circle class="card-gold small-coin" cx="89" cy="138" r="7"></circle>
      </svg>
    `,
    "art-sun": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Солнца">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <circle class="card-gold sun-disk" cx="60" cy="48" r="25"></circle>
        <path class="card-gold-line" d="M60 14 L60 28 M60 68 L60 84 M26 48 L40 48 M80 48 L94 48 M36 24 L46 34 M84 24 L74 34 M36 72 L46 62 M84 72 L74 62"></path>
        <path class="card-horizon" d="M18 121 C42 105 78 105 102 121 L102 150 L18 150 Z"></path>
        <rect class="card-table" x="29" y="105" width="62" height="16" rx="3"></rect>
        <path class="card-line" d="M38 100 C49 88 71 88 82 100"></path>
      </svg>
    `,
    "art-strength": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Силы">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <path class="card-gold-line" d="M47 31 C54 21 66 21 73 31 C66 41 54 41 47 31 Z"></path>
        <circle class="card-face" cx="56" cy="55" r="12"></circle>
        <path class="card-robe" d="M39 119 C42 75 70 75 73 119 Z"></path>
        <path class="card-gold" d="M74 82 C98 79 103 115 78 124 C65 115 65 91 74 82 Z"></path>
        <path class="card-line" d="M52 84 C61 93 72 94 84 87 M40 137 C54 129 80 129 94 137"></path>
      </svg>
    `,
    "art-seven-cups": `
      <svg class="tarot-illustration" viewBox="0 0 120 170" role="img" aria-label="Классическая иллюстрация Семерки Кубков">
        <rect class="card-paper" x="8" y="8" width="104" height="154" rx="8"></rect>
        <path class="card-sky" d="M17 46 C36 30 84 30 103 46 L103 136 L17 136 Z"></path>
        <g class="cup-row">
          <path d="M25 64 h14 l-3 20 h-8 Z"></path><path d="M53 55 h14 l-3 20 h-8 Z"></path><path d="M81 64 h14 l-3 20 h-8 Z"></path>
          <path d="M20 105 h14 l-3 20 h-8 Z"></path><path d="M43 101 h14 l-3 20 h-8 Z"></path><path d="M66 101 h14 l-3 20 h-8 Z"></path><path d="M89 105 h14 l-3 20 h-8 Z"></path>
        </g>
        <circle class="card-gold" cx="60" cy="132" r="8"></circle>
        <path class="card-gold-line" d="M32 59 L36 54 M60 50 L64 45 M88 59 L92 54"></path>
      </svg>
    `
  };

  const maxFreeDraws = 4;
  const maxPaidDraws = 7;
  const ownerDemoCode = "TARO-OWNER-2026";
  const chainRoles = [
    {
      title: "Корень вопроса",
      makeText: (card) => `${card.name} задает исходный фон: ${card.symbol}. Здесь видно, откуда начинается денежное напряжение.`
    },
    {
      title: "Утечка ресурса",
      makeText: (card) => `${card.name} показывает место, где энергия или деньги расходятся: ${card.leak}`
    },
    {
      title: "Поворот сценария",
      makeText: (card) => `${card.name} добавляет разворот: ${card.action}`
    },
    {
      title: "Острый узел",
      makeText: (card) => `${card.name} закрывает бесплатный слой и показывает, какой фрагмент нужно разбирать глубже: ${card.focus}`
    }
  ];
  let currentMarks = [];
  let drawCount = 0;
  let isDrawing = false;
  let readingChain = [];
  let paidAccess = localStorage.getItem("taroCabinetPaidAccess") === "owner-demo";

  function randomIndex(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function pickRandom(list) {
    return list[randomIndex(list.length)];
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getDrawLimit() {
    return paidAccess ? maxPaidDraws : maxFreeDraws;
  }

  function buildPaidPlan() {
    const question = getMoneyQuestion();
    const profile = getZodiacProfile();
    const dayCard = getDayCard();
    const firstCard = readingChain[0];
    const lastCard = readingChain[readingChain.length - 1];
    const focus = lastCard ? lastCard.action : (dayCard ? dayCard.action : "выберите первую карту и зафиксируйте один вопрос");
    const caution = firstCard ? firstCard.leak : "не принимать важное решение только по общему ощущению";
    const personalFocus = profile ? profile.focus : "отделить факты от тревоги и выбрать один проверяемый шаг";
    return [
      `День 1: сформулируйте главный вопрос${question ? ` — «${escapeHtml(question)}»` : " без общих слов"}.`,
      `День 2: проверьте риск — ${escapeHtml(caution)}.`,
      `День 3: сделайте действие — ${escapeHtml(focus)}.`,
      `День 4: отметьте, что изменилось в деньгах, отношениях или решении.`,
      `День 5: вернитесь к фокусу — ${escapeHtml(personalFocus)}.`,
      `День 6: уберите одно действие, которое забирает ресурс без результата.`,
      `День 7: подведите итог и сформулируйте следующий вопрос для личного разбора.`
    ];
  }

  function renderPaidCabinet() {
    if (!paidCabinet || !accessActivation || !accessBadge) return;
    accessBadge.textContent = paidAccess ? "Платный доступ открыт" : "Бесплатный доступ";
    accessBadge.classList.toggle("is-paid", paidAccess);
    accessActivation.hidden = paidAccess;
    paidCabinet.hidden = !paidAccess;
    document.body.classList.toggle("has-paid-access", paidAccess);
    if (!paidAccess) return;

    const name = getClientName();
    const zodiac = getZodiacName();
    const question = getMoneyQuestion();
    const chain = readingChain.length ? getChainArrow() : "карты ещё не выбраны";
    if (paidWelcome) {
      paidWelcome.textContent = name ? `${name}, ваш платный кабинет открыт` : "Ваш платный кабинет открыт";
    }
    if (paidPersonalResult) {
      paidPersonalResult.innerHTML = `
        <div class="paid-summary">
          <p class="result-kicker">Персональная основа</p>
          <h4>${zodiac ? `Знак: ${escapeHtml(zodiac)}` : "Добавьте дату рождения"}</h4>
          <p><strong>Вопрос:</strong> ${question ? escapeHtml(question) : "добавьте вопрос в верхней части сайта"}</p>
          <p><strong>Связка:</strong> ${escapeHtml(chain)}</p>
        </div>
        <div class="paid-week-plan">
          <p class="result-kicker">План на 7 дней</p>
          <ol>${buildPaidPlan().map((item) => `<li>${item}</li>`).join("")}</ol>
        </div>
      `;
    }
  }

  function activatePaidAccess(code) {
    if (String(code || "").trim().toUpperCase() !== ownerDemoCode) {
      if (accessStatus) accessStatus.textContent = "Код не найден. Проверьте написание или запросите новый код в Telegram.";
      return false;
    }
    paidAccess = true;
    localStorage.setItem("taroCabinetPaidAccess", "owner-demo");
    if (accessStatus) accessStatus.textContent = "Доступ подтверждён.";
    renderPaidCabinet();
    updateDrawProgress();
    if (readingChain.length) {
      const lastCard = readingChain[readingChain.length - 1];
      renderReading(lastCard, lastCard.number || "I");
    }
    return true;
  }

  function resetPaidAccess() {
    paidAccess = false;
    localStorage.removeItem("taroCabinetPaidAccess");
    if (accessCodeInput) accessCodeInput.value = "";
    if (accessStatus) accessStatus.textContent = "Тестовый доступ сброшен.";
    renderPaidCabinet();
    updateDrawProgress();
    if (readingChain.length > maxFreeDraws) {
      readingChain = readingChain.slice(0, maxFreeDraws);
    }
    if (readingChain.length) {
      const lastCard = readingChain[readingChain.length - 1];
      renderReading(lastCard, lastCard.number || "I");
    }
  }

  function pickDeckCard() {
    const usedNames = new Set(readingChain.map((card) => card.name));
    const availableCards = tarotDeck.filter((card) => !usedNames.has(card.name));
    return pickRandom(availableCards.length ? availableCards : tarotDeck);
  }

  function shuffle(list) {
    const result = list.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = randomIndex(index + 1);
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function getCardArt(card) {
    return `
      <span class="card-art classic-card-art ${card.art}" aria-hidden="true">
        ${cardDrawings[card.art] || cardDrawings["art-ace-pentacles"]}
      </span>
    `;
  }

  function renderCardBack(button, mark) {
    button.classList.remove("is-face-up");
    button.innerHTML = `
      <span class="card-back-ornament" aria-hidden="true"></span>
      <em class="card-mark">${mark}</em>
    `;
    button.setAttribute("aria-label", "Выбрать закрытую карту");
  }

  function renderRevealedCard(button, card, slotLabel) {
    button.classList.add("is-face-up");
    button.innerHTML = `
      <span class="card-number">${card.number || slotLabel}</span>
      ${getCardArt(card)}
      <strong class="card-name">${card.name}</strong>
      <em class="card-caption">${card.symbol}</em>
    `;
    button.setAttribute("aria-label", `Выпала карта: ${card.name}`);
  }

  function renderLargeCard(card) {
    return `
      <div class="reading-card-preview ${card.art}">
        <span class="card-number">${card.number}</span>
        ${getCardArt(card)}
        <strong>${card.name}</strong>
        <em>${card.symbol}</em>
      </div>
    `;
  }

  function updateDrawProgress() {
    const drawLimit = getDrawLimit();
    if (drawProgress && drawProgressSteps.length !== drawLimit) {
      drawProgress.innerHTML = Array.from({ length: drawLimit }, () => "<span></span>").join("");
      drawProgressSteps = Array.from(drawProgress.querySelectorAll("span"));
    }
    drawProgressSteps.forEach((step, index) => {
      step.classList.toggle("is-complete", index < readingChain.length);
      step.classList.toggle("is-current", index === readingChain.length && readingChain.length < drawLimit);
    });
    if (drawProgress) {
      drawProgress.setAttribute("aria-label", `Открыто ${readingChain.length} из ${drawLimit} карт`);
    }
  }

  function prepareCardBacks() {
    currentMarks = shuffle(cardMarks).slice(0, tarotButtons.length);
    drawCount = 0;
    readingChain = [];
    if (tarotBoard) {
      tarotBoard.classList.remove("is-drawing");
    }
    if (drawStage) {
      drawStage.classList.remove("is-active", "is-complete");
    }
    tarotButtons.forEach((button, index) => {
      const mark = currentMarks[index] || cardMarks[index % cardMarks.length];
      renderCardBack(button, mark);
      button.classList.remove("is-selected", "is-spinning", "is-revealed");
      button.disabled = false;
    });
    if (drawMeta) {
      drawMeta.textContent = "Выберите одну из семи карт";
    }
    updateDrawProgress();
    if (unfoldPanel) {
      unfoldPanel.innerHTML = `
        <p class="result-kicker">Лента расклада</p>
        <h3>Здесь будет разворачиваться ваша цепочка</h3>
        <p>Каждое вытягивание добавит новый фрагмент: карта, связь с предыдущей, денежный намек и закрытая позиция для полного разбора.</p>
      `;
    }
    renderZodiacProfile();
  }

  function handleHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function openModal(plan) {
    if (!modal) return;
    if (planSelect && plan && planPrices[plan]) {
      planSelect.value = plan;
    }
    formResult.hidden = true;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const nameField = modal.querySelector('input[name="name"]');
    const birthDateField = modal.querySelector('input[name="birthDate"]');
    const emailField = modal.querySelector('input[name="email"]');
    const emailConsentField = modal.querySelector('input[name="emailConsent"]');
    const questionField = modal.querySelector('textarea[name="question"]');
    if (nameField && getClientName() && !nameField.value) {
      nameField.value = getClientName();
    }
    if (birthDateField) {
      birthDateField.max = getLocalDateKey();
      if (getBirthDate() && !birthDateField.value) {
        birthDateField.value = getBirthDate();
      }
      updateLeadZodiacHint(birthDateField.value);
    }
    if (emailField && getDailyEmail() && !emailField.value) {
      emailField.value = getDailyEmail();
    }
    if (emailConsentField && getDailyMailConsent()) {
      emailConsentField.checked = true;
    }
    if (questionField && getMoneyQuestion() && !questionField.value) {
      questionField.value = getMoneyQuestion();
    }
    const firstField = modal.querySelector("input");
    if (firstField) {
      window.setTimeout(() => firstField.focus(), 40);
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  function bindLeadButtons(scope = document) {
    scope.querySelectorAll(".js-open-lead").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => openModal(button.dataset.plan || "Бизнес"));
    });
  }

  function getMoneyQuestion() {
    return moneyQuestionInput ? moneyQuestionInput.value.trim() : "";
  }

  function getClientName() {
    return clientNameInput ? clientNameInput.value.trim() : "";
  }

  function getBirthDate() {
    return birthDateInput ? birthDateInput.value : "";
  }

  function getDailyEmail() {
    return dailyEmailInput ? dailyEmailInput.value.trim() : "";
  }

  function getDailyMailConsent() {
    return Boolean(dailyMailConsent && dailyMailConsent.checked);
  }

  function getZodiacFromBirthDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return "";
    const [, monthText, dayText] = value.split("-");
    const month = Number(monthText);
    const day = Number(dayText);
    const marker = month * 100 + day;

    if (marker >= 321 && marker <= 419) return "Овен";
    if (marker >= 420 && marker <= 520) return "Телец";
    if (marker >= 521 && marker <= 620) return "Близнецы";
    if (marker >= 621 && marker <= 722) return "Рак";
    if (marker >= 723 && marker <= 822) return "Лев";
    if (marker >= 823 && marker <= 922) return "Дева";
    if (marker >= 923 && marker <= 1022) return "Весы";
    if (marker >= 1023 && marker <= 1121) return "Скорпион";
    if (marker >= 1122 && marker <= 1221) return "Стрелец";
    if (marker >= 1222 || marker <= 119) return "Козерог";
    if (marker >= 120 && marker <= 218) return "Водолей";
    if (marker >= 219 && marker <= 320) return "Рыбы";
    return "";
  }

  function getZodiacName() {
    return getZodiacFromBirthDate(getBirthDate());
  }

  function getZodiacProfile() {
    const zodiac = getZodiacName();
    return zodiac ? zodiacProfiles[zodiac] : null;
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) return "Доброй ночи";
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  }

  function getPersonalAddress() {
    const name = getClientName();
    return name ? `${escapeHtml(name)}, ` : "";
  }

  function getPersonalHeadline() {
    const name = getClientName();
    return name ? `${getGreeting()}, ${escapeHtml(name)}` : `${getGreeting()}`;
  }

  function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function hashString(value) {
    let hash = 2166136261;
    for (const char of String(value)) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function getDailySeed() {
    return hashString(`${getLocalDateKey()}|${getClientName().toLocaleLowerCase("ru-RU")}|${getBirthDate()}`);
  }

  function getDayCard() {
    const zodiac = getZodiacName();
    if (!zodiac || !getBirthDate()) return null;
    return tarotDeck[getDailySeed() % tarotDeck.length];
  }

  function getDailySoulMessage() {
    if (!getDayCard()) return null;
    return dailySoulMessages[(getDailySeed() + 7) % dailySoulMessages.length];
  }

  function formatToday() {
    return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(new Date());
  }

  function formatBirthDate(value) {
    if (!value) return "не указана";
    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year}`;
  }

  function updateZodiacBadge() {
    if (!zodiacBadge) return;
    const zodiac = getZodiacName();
    const profile = zodiacProfiles[zodiac];
    zodiacBadge.innerHTML = zodiac && profile
      ? `<span>Ваш знак</span><strong>${escapeHtml(zodiac)}</strong><small>${profile.element}</small>`
      : "<span>Ваш знак</span><strong>Определится по дате</strong>";
  }

  function updateLeadZodiacHint(value) {
    const hint = document.getElementById("leadZodiacHint");
    if (!hint) return;
    const zodiac = getZodiacFromBirthDate(value);
    hint.textContent = zodiac ? `Знак: ${zodiac}` : "Знак определится автоматически";
  }

  function getZodiacContextLine() {
    const zodiac = getZodiacName();
    const profile = getZodiacProfile();
    if (!zodiac || !profile) return "";
    return ` Для знака ${zodiac} сегодняшний фокус: ${profile.focus}.`;
  }

  function renderProfileMiniLine() {
    const zodiac = getZodiacName();
    const profile = getZodiacProfile();
    const dayCard = getDayCard();
    if (!zodiac || !profile || !dayCard) return "";
    return `
      <div class="profile-mini-line">
        <span>${escapeHtml(zodiac)}</span>
        <span>${profile.element}</span>
        <span>карта дня: ${dayCard.name}</span>
      </div>
    `;
  }

  function renderZodiacProfile() {
    if (!zodiacProfile) return;
    const name = getClientName();
    const birthDate = getBirthDate();
    const zodiac = getZodiacName();
    const profile = getZodiacProfile();
    const dayCard = getDayCard();
    const soul = getDailySoulMessage();

    if (!name || !birthDate || !zodiac || !profile || !dayCard || !soul) {
      zodiacProfile.innerHTML = `
        <p class="result-kicker">Карта-послание на сегодня</p>
        <h3>Введите имя и дату рождения</h3>
        <p>После этого здесь появится личная карта-крючок: короткое послание, вопрос в душу и один бережный шаг на сегодня.</p>
      `;
      return;
    }

    zodiacProfile.innerHTML = `
      <div class="daily-soul-heading">
        <div>
          <p class="result-kicker">Карта-послание на ${formatToday()}</p>
          <h3>${getPersonalHeadline()}</h3>
        </div>
        <div class="zodiac-line">
          <span>${escapeHtml(zodiac)}</span>
          <span>${profile.element}</span>
        </div>
      </div>
      <div class="daily-soul-layout">
        <article class="daily-soul-card" aria-label="Карта дня ${escapeHtml(dayCard.name)}">
          <span>${dayCard.number}</span>
          <strong>${escapeHtml(dayCard.name)}</strong>
          <small>${escapeHtml(dayCard.symbol)}</small>
        </article>
        <div class="daily-soul-copy">
          <p class="daily-hook">${escapeHtml(soul.hook)}</p>
          <p><strong>Послание:</strong> ${escapeHtml(soul.message)}</p>
          <blockquote>${escapeHtml(soul.question)}</blockquote>
          <p class="daily-action"><strong>Бережный шаг:</strong> ${escapeHtml(soul.action)}</p>
          <button class="button button-soft" type="button" data-copy-daily>Скопировать послание</button>
        </div>
      </div>
      <p class="daily-disclaimer">Это не предсказание и не факт о будущем, а повод остановиться и услышать себя.</p>
    `;
  }

  function buildPairMeaning(previousCard, currentCard) {
    const key = `${previousCard.name}->${currentCard.name}`;
    if (comboMeanings[key]) {
      return comboMeanings[key];
    }
    return `Первая карта (${previousCard.name}) показывает фон: ${previousCard.symbol}. Следующая (${currentCard.name}) добавляет движение: ${currentCard.symbol}. В сумме это значит: сначала увидеть, где утекает ресурс, затем сделать действие без распыления. Для денег сейчас важнее не еще один знак, а один проверяемый шаг.`;
  }

  function renderChain() {
    return readingChain
      .map((card, index) => `<span>${index + 1}. ${card.name}</span>`)
      .join("");
  }

  function renderVisualChain() {
    if (!readingChain.length) return "";
    return `
      <div class="visual-chain" aria-label="Выпавшие карты расклада">
        ${readingChain.map((card, index) => `
          <article class="visual-chain-card" style="--chain-index: ${index}">
            <span class="visual-chain-index">${index + 1}</span>
            ${getCardArt(card)}
            <strong>${card.name}</strong>
            <em>${card.symbol}</em>
          </article>
        `).join("")}
      </div>
    `;
  }

  function getChainArrow() {
    return readingChain.map((card) => card.name).join(" → ");
  }

  function getChainRole(index) {
    return chainRoles[index] || chainRoles[chainRoles.length - 1];
  }

  function buildWholeChainMeaning() {
    const [first, second, third, fourth] = readingChain;
    const count = readingChain.length;

    if (count === 1) {
      return `${getPersonalAddress()}первая карта пока показывает только фон. ${first.name} говорит: ${first.focus}${getZodiacContextLine()} Следующая карта уже покажет, это ресурс, утечка или повод менять действие.`;
    }

    if (count === 2) {
      return `${first.name} задает фон, а ${second.name} показывает, куда этот фон ведет.${getZodiacContextLine()} В сумме цепочка говорит: сначала увидеть исходную тему, затем проверить, где деньги начинают двигаться или где вы отдаете больше, чем получаете.`;
    }

    if (count === 3) {
      return `${first.name} показывает корень вопроса, ${second.name} вскрывает напряжение, а ${third.name} дает первый поворот.${getZodiacContextLine()} Бесплатно уже видно направление, но главный ответ находится не в одной карте, а в том, как эти три позиции спорят между собой.`;
    }

    return `${first.name} показывает корень, ${second.name} - утечку, ${third.name} - поворот, ${fourth.name} - острый узел.${getZodiacContextLine()} Это уже не набор карт, а сценарий: что запустило денежный вопрос, где ресурс теряется, куда можно повернуть и какую часть нельзя оставлять без личного разбора.`;
  }

  function renderChainRoles() {
    return `
      <div class="chain-roles">
        ${readingChain.map((card, index) => {
          const role = getChainRole(index);
          return `
            <div class="chain-role">
              <span>${index + 1}</span>
              <strong>${role.title}</strong>
              <p>${role.makeText(card)}</p>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function buildPurchaseBridge() {
    const question = getMoneyQuestion();
    const questionPart = question
      ? `под ваш вопрос: “${escapeHtml(question)}”`
      : "после того, как вы впишете острый денежный вопрос";
    const zodiacPart = getZodiacName()
      ? `, с учетом знака ${escapeHtml(getZodiacName())}`
      : "";

    if (paidAccess) {
      return `Платный доступ открыт. Связка ${getChainArrow()} раскрывается полностью: причина, риск, действие и план на 7 дней доступны в личном кабинете.`;
    }

    if (readingChain.length < maxFreeDraws) {
      return `Сейчас виден бесплатный слой цепочки. Каждая следующая карта уточняет не отдельный знак, а всю линию расклада. Полный разбор нужен, чтобы связать позиции ${questionPart}${zodiacPart} и открыть закрытые причины.`;
    }

    return `Бесплатный слой закончен. Покупка здесь - это не “еще одна карта”, а расшифровка всей последовательности ${getChainArrow()} ${questionPart}${zodiacPart}: скрытая причина, риск ошибки, точный шаг и понятный формат ответа.`;
  }

  function renderChainSynthesis() {
    if (!readingChain.length) return "";
    return `
      <div class="chain-synthesis">
        <strong>Вся связка сейчас: ${getChainArrow()}</strong>
        ${renderProfileMiniLine()}
        ${renderVisualChain()}
        <p>${buildWholeChainMeaning()}</p>
        ${renderChainRoles()}
        <p class="purchase-bridge">${buildPurchaseBridge()}</p>
      </div>
    `;
  }

  function renderMoneyQuestionBlock() {
    const question = getMoneyQuestion();
    if (question) {
      return `
        <div class="question-callout is-filled">
          <strong>Ваш денежный вопрос:</strong>
          ${renderProfileMiniLine()}
          <p>${escapeHtml(question)}</p>
        </div>
      `;
    }
    return `
      <div class="question-callout">
        <strong>Чтобы связка стала личной, сформулируйте острый денежный вопрос выше.</strong>
        ${renderProfileMiniLine()}
        <p>Например: “почему доход стоит?”, “где я теряю деньги?”, “какой шаг даст прибыль быстрее?”, “стоит ли вкладываться в это решение?”</p>
      </div>
    `;
  }

  function renderPersonalCardAnswer(card, isLimit = false) {
    const name = getClientName();
    const zodiac = getZodiacName();
    const profile = getZodiacProfile();
    const question = getMoneyQuestion();
    const previousCard = readingChain.length > 1 ? readingChain[readingChain.length - 2] : null;
    const contextChips = [
      name ? escapeHtml(name) : "личный расклад",
      zodiac ? escapeHtml(zodiac) : "знак не указан",
      question ? `вопрос: ${escapeHtml(question)}` : "добавьте вопрос выше"
    ];
    const personalFocus = profile && zodiac
      ? `Для знака ${escapeHtml(zodiac)} эта карта усиливает ваш текущий фокус: ${profile.focus}.`
      : "Имя, знак и вопрос выше сделают следующую трактовку точнее.";
    const questionMeaning = question
      ? `<p class="personal-question-answer"><strong>По вашему вопросу «${escapeHtml(question)}»:</strong> ${card.leak} ${card.action}</p>`
      : `<p class="personal-question-answer"><strong>Чтобы связать карту с вашей ситуацией:</strong> впишите вопрос выше. Например, где теряется ресурс или какой шаг сейчас важнее.</p>`;
    const chainPrompt = previousCard
      ? `${previousCard.name} + ${card.name}: значение пары уже добавлено в ленту.`
      : "Следующая карта покажет, куда ведет смысл первой.";

    return `
      <div class="personal-card-answer">
        <div class="personal-card-copy">
          <p class="result-kicker">Что эта карта значит для вас</p>
          <h3>${name ? `${escapeHtml(name)}, ` : ""}${card.name} - про ${card.symbol}</h3>
          <div class="personal-context-chips">
            ${contextChips.map((item) => `<span>${item}</span>`).join("")}
          </div>
          <p class="personal-main-meaning">${card.focus}</p>
          <p>${personalFocus}</p>
          ${questionMeaning}
        </div>
        <div class="chain-direction">
          <span>${isLimit ? "Связка собрана" : "Продолжение ниже"}</span>
          <strong>${chainPrompt}</strong>
          <a class="button button-soft chain-jump" href="#unfoldPanel">Посмотреть связку <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    `;
  }

  function animatePersonalAnswer() {
    if (!readingResult) return;
    readingResult.classList.remove("is-updated");
    window.requestAnimationFrame(() => {
      readingResult.classList.add("is-updated");
    });
    window.setTimeout(() => readingResult.classList.remove("is-updated"), 900);
  }

  function buildPaidPreview(card, index) {
    const question = getMoneyQuestion();
    const questionLine = question
      ? `как карта "${card.name}" отвечает именно на вопрос: "${escapeHtml(question)}"`
      : `какой острый денежный вопрос лучше задать по карте "${card.name}"`;
    const chainLine = readingChain.length > 1
      ? `что значит вся цепочка "${getChainArrow()}" в вашем денежном сценарии`
      : `как первая карта "${card.name}" начнет личную цепочку`;
    const zodiacLine = getZodiacName()
      ? `Личный слой: знак ${escapeHtml(getZodiacName())}, карта дня и денежный фокус`
      : "Личный слой: имя, знак зодиака, карта дня и денежный фокус";
    if (paidAccess) {
      return `
        <div class="paid-preview is-unlocked" aria-label="Открытый платный фрагмент">
          <span>Платный фрагмент открыт</span>
          <p><strong>Личная причина:</strong> ${questionLine}.</p>
          <p><strong>Скрытый риск:</strong> ${escapeHtml(card.leak)}</p>
          <p><strong>Точный шаг:</strong> ${escapeHtml(card.action)}</p>
          <p><strong>Связь с раскладом:</strong> ${chainLine}.</p>
        </div>
      `;
    }
    return `
      <div class="paid-preview" aria-label="Закрытый платный фрагмент">
        <div class="blurred-line">Личная причина: ${questionLine}</div>
        <div class="blurred-line">${zodiacLine}</div>
        <div class="blurred-line">Закрытая связка: ${chainLine}</div>
        <div class="blurred-line">Скрытый риск позиции ${index + 1}: где теряется ресурс и почему повторяется сценарий</div>
        <div class="blurred-line">Точный шаг: что сделать в ближайшие 24-72 часа, чтобы вернуть движение денег</div>
        <span>Откроется после оплаты полного разбора</span>
      </div>
    `;
  }

  function renderNextStepPanel(plan = "Бизнес") {
    const price = planPrices[plan] || planPrices["Бизнес"];
    const question = getMoneyQuestion();
    const zodiac = getZodiacName();
    const chain = readingChain.length ? getChainArrow() : "цепочка появится после вытягивания карт";

    return `
      <div class="next-step-panel">
        <p class="result-kicker">Что делать дальше</p>
        <h3>Ваш бесплатный слой уже собран</h3>
        <p>
          Сейчас у мастера должны уйти: ${zodiac ? `знак ${escapeHtml(zodiac)}, ` : ""}${question ? `вопрос “${escapeHtml(question)}”, ` : "ваш вопрос, "}
          цепочка ${chain}. После оплаты эти данные становятся основой полного разбора.
        </p>
        <div class="next-step-grid">
          <div>
            <span>01</span>
            <strong>Выберите формат</strong>
            <p>Для этой связки лучше начать с тарифа ${plan}: полный ответ по цепочке, скрытая причина и точный шаг.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Получите ссылку на оплату</strong>
            <p>Оставьте Telegram. Вам отправят оплату картой, СБП или другим удобным способом.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Получите разбор</strong>
            <p>После оплаты разбор приходит в Telegram: текстом, аудио или через созвон, в зависимости от тарифа.</p>
          </div>
        </div>
        <div class="next-step-summary">
          <strong>Рекомендуемый следующий шаг: ${plan} — ${price}</strong>
          <span>Откроется личная расшифровка всей связки, а не еще одна случайная карта.</span>
        </div>
        <div class="hero-actions">
          <button class="button button-primary js-open-lead" data-plan="${plan}">Получить ссылку на оплату</button>
          <button class="button button-soft js-open-lead" data-plan="Эконом">Нужен короткий ответ</button>
          <button class="button button-soft js-open-lead" data-plan="Премиум">Хочу созвон</button>
        </div>
      </div>
    `;
  }

  function renderUnfoldPanel(isLimit = false) {
    if (!unfoldPanel || !readingChain.length) return;
    const question = getMoneyQuestion();
    const name = getClientName();
    const zodiac = getZodiacName();
    const cards = readingChain.map((card, index) => {
      const previousCard = index > 0 ? readingChain[index - 1] : null;
      const relation = previousCard
        ? buildPairMeaning(previousCard, card)
        : "Это стартовая карта. Она задает фон расклада, а следующая карта покажет, куда этот фон ведет.";
      return `
        <article class="unfold-card">
          <p class="result-kicker">Фрагмент ${index + 1}</p>
          <h4>${card.name}</h4>
          <p>${relation}</p>
          ${buildPaidPreview(card, index)}
        </article>
      `;
    }).join("");

    unfoldPanel.innerHTML = `
      <p class="result-kicker">Лента расклада</p>
      <h3>${name ? `${escapeHtml(name)}, как карты связались между собой` : "Как карты связались между собой"}</h3>
      <p>${zodiac ? `Профиль: ${escapeHtml(zodiac)}. ` : ""}${question ? `Вопрос в фокусе: ${escapeHtml(question)}` : "Чтобы сделать расклад личным, впишите острый денежный вопрос выше."}</p>
      ${renderVisualChain()}
      <div class="chain-story">
        <strong>Общий смысл последовательности</strong>
        <p>${buildWholeChainMeaning()}</p>
        ${renderChainRoles()}
        <p class="purchase-bridge">${buildPurchaseBridge()}</p>
      </div>
      ${renderMoneyQuestionBlock()}
      <div class="unfold-list">${cards}</div>
      ${isLimit && !paidAccess ? `
        <div class="unlock-strip">
          <strong>Бесплатный слой завершен.</strong>
          <span>Дальше нужен полный разбор: связать все карты в один сценарий, раскрыть размытые позиции и подготовить персональный ответ по вашему вопросу.</span>
          <button class="button button-primary js-open-lead" data-plan="Бизнес">Открыть полную связку</button>
        </div>
      ` : ""}
      ${isLimit && paidAccess ? `
        <div class="unlock-strip is-paid-complete">
          <strong>Полная связка собрана.</strong>
          <span>Все семь карт и закрытые трактовки открыты. Перейдите в платный кабинет, чтобы увидеть персональный план на 7 дней.</span>
          <a class="button button-primary" href="#paid-access">Открыть платный кабинет</a>
        </div>
      ` : ""}
    `;
    bindLeadButtons(unfoldPanel);
  }

  function renderLimitReached() {
    const question = getMoneyQuestion();
    const lastCard = readingChain[readingChain.length - 1];
    if (!lastCard) return;
    readingResult.innerHTML = renderPersonalCardAnswer(lastCard, true);
    bindLeadButtons(readingResult);
    animatePersonalAnswer();
    renderUnfoldPanel(true);
    if (drawMeta) {
      drawMeta.textContent = paidAccess
        ? "Полная связка из семи карт собрана"
        : (question
          ? "Вопрос есть. Следующий шаг - полный разбор цепочки"
          : "Сначала впишите острый денежный вопрос, затем откройте полный разбор");
    }
    renderPaidCabinet();
  }

  function renderReading(card, slotLabel) {
    const drawLimit = getDrawLimit();
    readingResult.innerHTML = renderPersonalCardAnswer(card, readingChain.length >= drawLimit);
    bindLeadButtons(readingResult);
    animatePersonalAnswer();
    renderUnfoldPanel(readingChain.length >= drawLimit);
    renderPaidCabinet();
  }

  function drawCard(button) {
    if (isDrawing) return;
    const drawLimit = getDrawLimit();
    if (readingChain.length >= drawLimit) {
      renderLimitReached();
      return;
    }
    isDrawing = true;
    drawCount += 1;

    if (tarotBoard) {
      tarotBoard.classList.add("is-drawing");
    }
    if (drawStage) {
      drawStage.classList.add("is-active");
      drawStage.classList.remove("is-complete");
    }
    if (stageText) {
      stageText.textContent = getMoneyQuestion()
        ? `${getZodiacName() ? `${getZodiacName()}: ` : ""}колода держит ваш денежный вопрос...`
        : `${getZodiacName() ? `${getZodiacName()}: ` : ""}колода перемешивается. После карты впишите острый денежный вопрос...`;
    }

    tarotButtons.forEach((card) => {
      renderCardBack(card, pickRandom(cardMarks));
      card.classList.remove("is-selected", "is-revealed");
      card.classList.add("is-spinning");
      card.disabled = true;
    });

    if (drawMeta) {
      drawMeta.textContent = "Колода перемешивается. Собирается следующая карта...";
    }

    const spinTimer = window.setInterval(() => {
      tarotButtons.forEach((card) => {
        const mark = card.querySelector(".card-mark");
        if (mark) {
          mark.textContent = pickRandom(cardMarks);
        }
      });
      stageCards.forEach((mark) => {
        mark.textContent = pickRandom(cardMarks);
      });
    }, 90);

    window.setTimeout(() => {
      window.clearInterval(spinTimer);
      const selectedCard = pickDeckCard();
      const slotLabel = pickRandom(cardMarks);
      readingChain.push(selectedCard);
      updateDrawProgress();
      stageCards.forEach((mark, index) => {
        mark.textContent = index === 1 ? slotLabel : pickRandom(cardMarks);
      });
      if (stageText) {
        stageText.textContent = `Выпала карта: ${selectedCard.name}`;
      }
      if (drawStage) {
        drawStage.classList.add("is-complete");
      }

      tarotButtons.forEach((card) => {
        card.classList.remove("is-spinning");
        card.disabled = false;
      });
      button.classList.add("is-selected", "is-revealed");
      renderRevealedCard(button, selectedCard, slotLabel);
      if (drawMeta) {
        drawMeta.textContent = readingChain.length < drawLimit
          ? `Открыто ${readingChain.length} из ${drawLimit}. Выберите следующую карту`
          : "Связка собрана. Откройте персональную расшифровку";
      }
      renderReading(selectedCard, slotLabel);
      isDrawing = false;
      window.setTimeout(() => {
        if (tarotBoard) {
          tarotBoard.classList.remove("is-drawing");
        }
        if (drawStage) {
          drawStage.classList.remove("is-active", "is-complete");
        }
      }, 1200);
    }, 820);
  }

  function addChatMessage(text, type) {
    const message = document.createElement("p");
    message.className = `chat-message ${type}`;
    message.textContent = text;
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function getAssistantReply(text) {
    const value = text.toLowerCase();
    if (value.includes("куп") || value.includes("зачем") || value.includes("плат")) {
      return "Покупают не карту. Бесплатная игра дает только верхний знак. В оплате разбирается ваш контекст: что реально происходит, где скрытая причина, какой сценарий вероятнее и что делать дальше. Если вопрос про деньги или выбор - начните с Бизнес.";
    }
    if (value.includes("созвон") || value.includes("премиум") || value.includes("личн")) {
      return "Премиум нужен, когда хочется не просто ответ, а живой разговор: 60 минут, полный расклад, резюме и сопровождение на 7 дней. Это формат для важных решений.";
    }
    if (value.includes("отнош") || value.includes("люб") || value.includes("чувств")) {
      return "По отношениям важно задать один честный вопрос: что между вами сейчас, что скрыто и какой разговор нужен. Для короткого ответа подойдет Эконом, для сценария - Бизнес.";
    }
    if (value.includes("день") || value.includes("работ") || value.includes("доход") || value.includes("бизнес")) {
      return "По деньгам лучше Бизнес: 5-7 карт покажут источник ресурса, утечку, риск и практический шаг. Бесплатная карта только намекает, а Бизнес связывает расклад с вашей реальной ситуацией.";
    }
    return "Начните с одного вопроса: что вы хотите понять и какое решение принять. Если нужен быстрый знак - Эконом. Если есть контекст и деньги/работа/выбор - Бизнес. Если нужен живой разговор и сопровождение - Премиум.";
  }

  function refreshPersonalContext() {
    updateZodiacBadge();
    renderZodiacProfile();
    if (readingChain.length) {
      const lastCard = readingChain[readingChain.length - 1];
      renderReading(lastCard, lastCard.number || "I");
    }
    localStorage.setItem("taroCabinetProfile", JSON.stringify({
      name: getClientName(),
      birthDate: getBirthDate(),
      email: getDailyEmail(),
      emailConsent: getDailyMailConsent(),
      zodiac: getZodiacName(),
      question: getMoneyQuestion()
    }));
    renderPaidCabinet();
  }

  function restorePersonalContext() {
    try {
      const profile = JSON.parse(localStorage.getItem("taroCabinetProfile") || "{}");
      if (clientNameInput && profile.name) clientNameInput.value = profile.name;
      if (birthDateInput && profile.birthDate) birthDateInput.value = profile.birthDate;
      if (dailyEmailInput && profile.email) dailyEmailInput.value = profile.email;
      if (dailyMailConsent && profile.emailConsent) dailyMailConsent.checked = true;
      if (moneyQuestionInput && profile.question) moneyQuestionInput.value = profile.question;
    } catch (error) {
      localStorage.removeItem("taroCabinetProfile");
    }
  }

  function formatLeadMessage(lead) {
    const chain = lead.chain && lead.chain.length ? lead.chain.join(" → ") : "карты еще не вытянуты";
    const gameQuestion = lead.gameQuestion && lead.gameQuestion !== lead.question
      ? `\nВопрос из игры: ${lead.gameQuestion}`
      : "";
    return [
      "Заявка на расклад",
      `Имя: ${lead.name || "не указано"}`,
      `Дата рождения: ${formatBirthDate(lead.birthDate)}`,
      `Контакт: ${lead.contact || "не указан"}`,
      `Email: ${lead.email || "не указан"}`,
      `Карта дня на почту: ${lead.emailConsent ? "да, есть согласие" : "нет"}`,
      `Тариф: ${lead.plan} (${lead.price})`,
      `Знак: ${lead.zodiac || "не указан"}`,
      `Элемент: ${lead.zodiacElement || "не указан"}`,
      `Карта дня: ${lead.dayCard || "не выбрана"}`,
      `Послание дня: ${lead.dailyHook || "не сформировано"}`,
      `Вопрос в душу: ${lead.dailyQuestion || "не сформирован"}`,
      `Бережный шаг: ${lead.dailyAction || "не сформирован"}`,
      `Вопрос: ${lead.question || "не указан"}${gameQuestion}`,
      `Цепочка карт: ${chain}`,
      `Дата заявки: ${lead.createdAt}`,
      "",
      lead.emailConsent && lead.email
        ? `Для письма: отправить персональную карту дня "${lead.dayCard || "по выбранному знаку"}" на ${lead.email}, с обращением по имени и ссылкой вернуться к раскладу.`
        : "Рассылку не подключать без отдельного согласия.",
      "Прошу прислать способ оплаты и принять расклад в работу."
    ].join("\n");
  }

  async function copyLeadMessage(button) {
    const textarea = document.getElementById("leadMessageText");
    if (!textarea) return;
    const originalText = button.textContent;
    try {
      await navigator.clipboard.writeText(textarea.value);
      button.textContent = "Заявка скопирована";
    } catch (error) {
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      button.textContent = "Заявка скопирована";
    }
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1800);
  }

  function buildDailyShareText() {
    const card = getDayCard();
    const soul = getDailySoulMessage();
    if (!card || !soul) return "";
    return [
      `${getClientName()}, ваша карта-послание на ${formatToday()}`,
      `${card.name} — ${card.symbol}`,
      "",
      soul.hook,
      `Послание: ${soul.message}`,
      `Вопрос в душу: ${soul.question}`,
      `Бережный шаг: ${soul.action}`,
      "",
      "Это не предсказание, а повод услышать себя."
    ].join("\n");
  }

  async function copyDailyMessage(button) {
    const text = buildDailyShareText();
    if (!text) return;
    const originalText = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Послание скопировано";
    } catch (error) {
      const temporary = document.createElement("textarea");
      temporary.value = text;
      temporary.setAttribute("readonly", "");
      temporary.style.position = "fixed";
      temporary.style.opacity = "0";
      document.body.appendChild(temporary);
      temporary.select();
      document.execCommand("copy");
      temporary.remove();
      button.textContent = "Послание скопировано";
    }
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1800);
  }

  function saveDailyProfile() {
    if (!dailyMailStatus) return;
    if (!getClientName()) {
      dailyMailStatus.textContent = "Сначала укажите имя.";
      if (clientNameInput) clientNameInput.focus();
      return;
    }
    if (!getBirthDate()) {
      dailyMailStatus.textContent = "Укажите дату рождения — по ней определяется знак и личная карта.";
      if (birthDateInput) birthDateInput.focus();
      return;
    }
    if (!getDailyEmail()) {
      dailyMailStatus.textContent = "Укажите email для ежедневной доставки.";
      if (dailyEmailInput) dailyEmailInput.focus();
      return;
    }
    if (!getDailyMailConsent()) {
      dailyMailStatus.textContent = "Подтвердите согласие на ежедневные письма.";
      return;
    }
    refreshPersonalContext();
    dailyMailStatus.textContent = "Профиль сохранён. Карта обновляется на сайте каждый день; для запуска писем завершите регистрацию и отправьте заявку мастеру.";
  }

  window.addEventListener("scroll", handleHeader, { passive: true });
  handleHeader();
  bindLeadButtons();
  if (birthDateInput) birthDateInput.max = getLocalDateKey();
  restorePersonalContext();
  updateZodiacBadge();
  prepareCardBacks();
  renderPaidCabinet();

  [clientNameInput, birthDateInput, dailyEmailInput, dailyMailConsent, moneyQuestionInput].forEach((field) => {
    if (!field) return;
    field.addEventListener("input", refreshPersonalContext);
    field.addEventListener("change", refreshPersonalContext);
  });

  document.querySelectorAll("[data-close-modal]").forEach((item) => {
    item.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  document.addEventListener("click", (event) => {
    const dailyButton = event.target.closest("[data-copy-daily]");
    if (dailyButton) {
      copyDailyMessage(dailyButton);
      return;
    }
    const copyButton = event.target.closest("[data-copy-lead]");
    if (copyButton) {
      copyLeadMessage(copyButton);
    }
  });

  if (dailySaveButton) {
    dailySaveButton.addEventListener("click", saveDailyProfile);
  }

  if (accessCodeForm) {
    accessCodeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (activatePaidAccess(accessCodeInput ? accessCodeInput.value : "")) {
        window.location.hash = "paid-access";
      }
    });
  }

  if (resetPaidAccessButton) {
    resetPaidAccessButton.addEventListener("click", resetPaidAccess);
  }

  if (leadForm) {
    const leadBirthDateField = leadForm.querySelector('input[name="birthDate"]');
    if (leadBirthDateField) {
      leadBirthDateField.max = getLocalDateKey();
      leadBirthDateField.addEventListener("input", () => updateLeadZodiacHint(leadBirthDateField.value));
      leadBirthDateField.addEventListener("change", () => updateLeadZodiacHint(leadBirthDateField.value));
    }
  }

  tarotButtons.forEach((button) => {
    button.addEventListener("click", () => drawCard(button));
  });

  if (reshuffleButton) {
    reshuffleButton.addEventListener("click", () => {
      prepareCardBacks();
      readingResult.innerHTML = `
        <p class="result-kicker">Перед вами семь закрытых карт</p>
        <h3>Выберите ту, к которой потянулась рука</h3>
        <p>Первое значение откроется сразу. Затем карты начнут складываться в одну линию.</p>
      `;
    });
  }

  document.querySelectorAll(".quick-prompts button").forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.prompt;
      addChatMessage(prompt, "user");
      window.setTimeout(() => addChatMessage(getAssistantReply(prompt), "bot"), 220);
    });
  });

  if (chatForm) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      addChatMessage(message, "user");
      chatInput.value = "";
      window.setTimeout(() => addChatMessage(getAssistantReply(message), "bot"), 260);
    });
  }

  if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(leadForm);
      const leadName = String(data.get("name") || "").trim();
      const leadBirthDate = String(data.get("birthDate") || "");
      const leadEmail = String(data.get("email") || "").trim();
      const leadEmailConsent = Boolean(data.get("emailConsent"));
      if (clientNameInput) clientNameInput.value = leadName;
      if (birthDateInput) birthDateInput.value = leadBirthDate;
      if (dailyEmailInput && leadEmail) dailyEmailInput.value = leadEmail;
      if (dailyMailConsent) dailyMailConsent.checked = leadEmailConsent;
      refreshPersonalContext();
      const preparedQuestion = getMoneyQuestion();
      const dayCard = getDayCard();
      const soul = getDailySoulMessage();
      const lead = {
        name: leadName,
        birthDate: leadBirthDate,
        contact: data.get("contact"),
        email: leadEmail,
        emailConsent: leadEmailConsent,
        plan: data.get("plan"),
        price: planPrices[data.get("plan")],
        zodiac: getZodiacFromBirthDate(leadBirthDate),
        zodiacElement: getZodiacProfile() ? getZodiacProfile().element : "",
        dayCard: dayCard ? dayCard.name : "",
        dailyHook: soul ? soul.hook : "",
        dailyQuestion: soul ? soul.question : "",
        dailyAction: soul ? soul.action : "",
        question: data.get("question") || preparedQuestion,
        gameQuestion: preparedQuestion,
        chain: readingChain.map((card) => card.name),
        createdAt: new Date().toLocaleString("ru-RU")
      };
      const leadMessage = formatLeadMessage(lead);
      localStorage.setItem("taroCabinetLead", JSON.stringify(lead));
      localStorage.setItem("taroCabinetLeadMessage", leadMessage);
      formResult.hidden = false;
      formResult.innerHTML = `
        <strong>Профиль и заявка подготовлены.</strong>
        <p>На этом устройстве личная карта будет обновляться каждый день при открытии сайта. Скопируйте заявку, отправьте её мастеру в Telegram и после оплаты получите код платного доступа.</p>
        <textarea id="leadMessageText" class="lead-message-box" readonly>${escapeHtml(leadMessage)}</textarea>
        <div class="lead-send-actions">
          <button class="button button-primary" type="button" data-copy-lead>Скопировать заявку</button>
          <a class="button button-soft" href="https://t.me/MicksaJ" target="_blank" rel="noopener">Открыть Telegram @MicksaJ</a>
          <a class="button button-soft" href="#paid-access" data-close-after-submit>У меня уже есть код</a>
        </div>
        <p class="lead-afterpay">После оплаты мастер делает разбор по этим данным: тариф, знак, вопрос и выпавшая цепочка карт.${lead.emailConsent && lead.email ? " Карта дня на почту добавлена в заявку." : ""}</p>
      `;
      const paidLink = formResult.querySelector("[data-close-after-submit]");
      if (paidLink) {
        paidLink.addEventListener("click", closeModal);
      }
      renderPaidCabinet();
    });
  }
})();
