"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ClipboardCheck,
  MessageSquare,
  MousePointerClick,
  Plus,
  Route,
  ShieldCheck,
  UserCheck,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

type Locale = "ua" | "ru" | "en";
type ScenarioKey = "sales" | "service" | "tradein" | "selection";

type Scenario = {
  tab: string;
  source: string;
  messages: Array<{ from: "visitor" | "assistant"; text: string }>;
  fields: Array<{ label: string; value: string }>;
};

type PageCopy = {
  badge: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  heroNote: string;
  demoCta: string;
  requestCta: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogSubmit: string;
  dialogSuccessTitle: string;
  dialogSuccessMessage: string;
  helpLabel: string;
  helpPlaceholder: string;
  demoEyebrow: string;
  demoTitle: string;
  demoIntro: string;
  chooseScenario: string;
  visitor: string;
  assistant: string;
  source: string;
  result: string;
  resultNote: string;
  disclaimer: string;
  flow: string[];
  problemEyebrow: string;
  problemTitle: string;
  problemIntro: string;
  problems: string[];
  systemEyebrow: string;
  systemTitle: string;
  systemIntro: string;
  systemSteps: Array<{ title: string; description: string }>;
  mvpEyebrow: string;
  mvpTitle: string;
  mvpIntro: string;
  mvpPoints: string[];
  honestTitle: string;
  honestText: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalText: string;
  scenarios: Record<ScenarioKey, Scenario>;
};

const copy: Record<Locale, PageCopy> = {
  ua: {
    badge: "AI-система для автодилерів",
    titleA: "Звернення клієнта стає ",
    titleB: "готовою заявкою для менеджера",
    subtitle:
      "Система приймає запити із сайту, Instagram і месенджерів, уточнює потрібні дані та передає відповідальній людині контекст для наступної дії.",
    heroNote: "Подивіться логіку на чотирьох типових сценаріях нижче",
    demoCta: "Переглянути AI-демо",
    requestCta: "Обговорити свій процес",
    dialogTitle: "Коротко опишіть ваш процес",
    dialogDescription:
      "Залиште контакт і вкажіть, які звернення потрібно обробляти: продаж, тест-драйв, сервіс, trade-in чи підбір авто.",
    dialogSubmit: "Надіслати",
    dialogSuccessTitle: "Запит отримано",
    dialogSuccessMessage:
      "Я перегляну процес і зв'яжуся з вами з конкретним наступним кроком.",
    helpLabel: "Який процес хочете покращити?",
    helpPlaceholder: "Наприклад: заявки на тест-драйв із сайту та Instagram...",
    demoEyebrow: "Інтерактивна демонстрація",
    demoTitle: "Не просто сайт: ось що саме отримує менеджер",
    demoIntro:
      "Оберіть тип звернення. Демонстрація покаже короткий діалог і структуровану картку, яку можна передати менеджеру або в CRM.",
    chooseScenario: "Оберіть сценарій",
    visitor: "Клієнт",
    assistant: "AI-асистент",
    source: "Джерело",
    result: "Менеджер отримує",
    resultNote:
      "Замість неструктурованого повідомлення — зрозумілий контекст і наступна дія.",
    disclaimer:
      "Це демонстраційні дані, а не реальні клієнти або результати. Питання, правила й інтеграції налаштовуються під конкретний автосалон.",
    flow: [
      "Сайт / Direct / месенджер",
      "Коротке уточнення",
      "Готова заявка",
      "Менеджер / CRM",
    ],
    problemEyebrow: "Де виникає затримка",
    problemTitle: "Клієнт уже написав, але менеджеру ще бракує даних",
    problemIntro:
      "Система не замінює продаж. Вона прибирає повторювані уточнення до моменту, коли підключається відповідальна людина.",
    problems: [
      "Запити надходять одночасно із сайту, Direct і месенджерів.",
      "Менеджер вручну уточнює модель, бюджет, час і контактні дані.",
      "У чатах губиться контекст, через що клієнт повторює інформацію.",
      "Немає єдиного формату заявки для розподілу між відділами.",
    ],
    systemEyebrow: "Як працює система",
    systemTitle:
      "Один контрольований процес від першого повідомлення до менеджера",
    systemIntro:
      "Без обіцянок магічної автоматизації: тільки конкретні кроки, правила і контроль передачі.",
    systemSteps: [
      {
        title: "Приймає звернення",
        description:
          "Сайт, Instagram, Viber, Telegram або інший погоджений канал.",
      },
      {
        title: "Визначає сценарій",
        description:
          "Продаж, тест-драйв, сервіс, trade-in, викуп або підбір авто.",
      },
      {
        title: "Уточнює дані",
        description:
          "Ставить лише питання, потрібні для наступної дії менеджера.",
      },
      {
        title: "Передає заявку",
        description:
          "Надсилає структуровану картку відповідальній людині або в CRM.",
      },
    ],
    mvpEyebrow: "Перший робочий етап",
    mvpTitle: "Починаємо з одного процесу, а не перебудовуємо весь бізнес",
    mvpIntro:
      "Спочатку обираємо найбільш повторюваний тип звернення та запускаємо його на реальних діалогах.",
    mvpPoints: [
      "Карта поточного процесу та точка передачі менеджеру",
      "Один основний сценарій кваліфікації",
      "Погоджені питання, винятки та ручна передача",
      "Один або два пріоритетні канали",
      "Структурована заявка для менеджера або CRM",
      "Тестування на реальних зверненнях і коригування логіки",
    ],
    honestTitle: "Що ця сторінка не обіцяє",
    honestText:
      "Демонстрація не є підключеною до вашої CRM і не доводить майбутню конверсію. Вона показує логіку продукту, яку потрібно адаптувати, інтегрувати й перевірити на вашому процесі.",
    faqTitle: "Коротко про впровадження",
    faq: [
      {
        question: "Це звичайний чат-бот?",
        answer:
          "Ні. Чат — лише інтерфейс. Основна цінність у правилах кваліфікації, передачі даних і контролі винятків.",
      },
      {
        question: "Чи потрібно змінювати CRM?",
        answer:
          "Не обов'язково. Спочатку перевіряємо доступні інтеграції й можемо почати з повідомлення менеджеру або Google Sheets.",
      },
      {
        question: "Асистент відповідатиме замість менеджера?",
        answer:
          "Лише в погоджених межах. Складні, нестандартні або чутливі питання одразу передаються людині.",
      },
      {
        question: "З чого почати?",
        answer:
          "З одного типового процесу: наприклад, тест-драйв, сервіс або trade-in. Після перевірки можна додавати інші сценарії.",
      },
    ],
    finalTitle: "Покажіть, як зараз проходить одне звернення",
    finalText:
      "Я запропоную короткий перший етап без перебудови всієї системи й без зайвих функцій.",
    scenarios: {
      sales: {
        tab: "Авто / тест-драйв",
        source: "Instagram Direct",
        messages: [
          {
            from: "visitor",
            text: "Цікавить кросовер до $35 000. Чи можна записатися на тест-драйв?",
          },
          {
            from: "assistant",
            text: "Передам запит менеджеру. Підкажіть, будь ласка, нове авто чи з пробігом і коли зручно приїхати?",
          },
          {
            from: "visitor",
            text: "Нове, бажано гібрид. У суботу після 12:00.",
          },
        ],
        fields: [
          { label: "Запит", value: "Новий гібридний кросовер" },
          { label: "Бюджет", value: "До $35 000" },
          { label: "Наступний крок", value: "Тест-драйв у суботу після 12:00" },
          { label: "Канал", value: "Instagram Direct" },
        ],
      },
      service: {
        tab: "Сервіс",
        source: "Сайт",
        messages: [
          {
            from: "visitor",
            text: "Потрібне планове ТО для Toyota RAV4 2021 року.",
          },
          {
            from: "assistant",
            text: "Уточніть, будь ласка, пробіг і бажану дату. Контакт можна залишити для підтвердження запису.",
          },
          { from: "visitor", text: "62 000 км, зручно у п'ятницю зранку." },
        ],
        fields: [
          { label: "Авто", value: "Toyota RAV4, 2021" },
          { label: "Пробіг / послуга", value: "62 000 км / планове ТО" },
          { label: "Бажаний час", value: "П'ятниця, ранок" },
          {
            label: "Наступний крок",
            value: "Уточнити слот і підтвердити запис",
          },
        ],
      },
      tradein: {
        tab: "Trade-in / викуп",
        source: "Viber",
        messages: [
          {
            from: "visitor",
            text: "Хочу оцінити авто для trade-in. Volkswagen Passat 2018 року.",
          },
          {
            from: "assistant",
            text: "Підкажіть пробіг, тип пального, стан і чи зручно надіслати кілька фото.",
          },
          {
            from: "visitor",
            text: "145 000 км, дизель, без ДТП. Фото можу надіслати зараз.",
          },
        ],
        fields: [
          { label: "Авто", value: "Volkswagen Passat, 2018, дизель" },
          {
            label: "Пробіг / стан",
            value: "145 000 км / зі слів клієнта без ДТП",
          },
          { label: "Матеріали", value: "Готовий надіслати фото" },
          {
            label: "Наступний крок",
            value: "Запросити фото та домовитися про огляд",
          },
        ],
      },
      selection: {
        tab: "Підбір авто",
        source: "Telegram",
        messages: [
          {
            from: "visitor",
            text: "Потрібен сімейний автомобіль з Європи до €22 000.",
          },
          {
            from: "assistant",
            text: "Який кузов, рік і тип пального розглядаєте? Чи входить доставка в бюджет?",
          },
          {
            from: "visitor",
            text: "Універсал або кросовер від 2020 року, дизель. Бюджет разом із доставкою.",
          },
        ],
        fields: [
          { label: "Потреба", value: "Сімейний універсал або кросовер" },
          { label: "Критерії", value: "Від 2020 року, дизель" },
          { label: "Бюджет", value: "До €22 000 із доставкою" },
          { label: "Наступний крок", value: "Уточнити 2–3 моделі для пошуку" },
        ],
      },
    },
  },
  ru: {
    badge: "AI-система для автодилеров",
    titleA: "Обращение клиента становится ",
    titleB: "готовой заявкой для менеджера",
    subtitle:
      "Система принимает запросы с сайта, Instagram и мессенджеров, уточняет необходимые данные и передаёт ответственному сотруднику контекст для следующего действия.",
    heroNote: "Посмотрите логику на четырёх типовых сценариях ниже",
    demoCta: "Посмотреть AI-демо",
    requestCta: "Обсудить свой процесс",
    dialogTitle: "Коротко опишите ваш процесс",
    dialogDescription:
      "Оставьте контакт и укажите, какие обращения нужно обрабатывать: продажа, тест-драйв, сервис, trade-in или подбор авто.",
    dialogSubmit: "Отправить",
    dialogSuccessTitle: "Запрос получен",
    dialogSuccessMessage:
      "Я изучу процесс и свяжусь с вами с конкретным следующим шагом.",
    helpLabel: "Какой процесс хотите улучшить?",
    helpPlaceholder: "Например: заявки на тест-драйв с сайта и Instagram...",
    demoEyebrow: "Интерактивная демонстрация",
    demoTitle: "Не просто сайт: вот что именно получает менеджер",
    demoIntro:
      "Выберите тип обращения. Демонстрация покажет короткий диалог и структурированную карточку для менеджера или CRM.",
    chooseScenario: "Выберите сценарий",
    visitor: "Клиент",
    assistant: "AI-ассистент",
    source: "Источник",
    result: "Менеджер получает",
    resultNote:
      "Вместо неструктурированного сообщения — понятный контекст и следующее действие.",
    disclaimer:
      "Это демонстрационные данные, а не реальные клиенты или результаты. Вопросы, правила и интеграции настраиваются под конкретный автосалон.",
    flow: [
      "Сайт / Direct / мессенджер",
      "Короткое уточнение",
      "Готовая заявка",
      "Менеджер / CRM",
    ],
    problemEyebrow: "Где возникает задержка",
    problemTitle: "Клиент уже написал, но менеджеру ещё не хватает данных",
    problemIntro:
      "Система не заменяет продажи. Она убирает повторяющиеся уточнения до подключения ответственного сотрудника.",
    problems: [
      "Запросы приходят одновременно с сайта, Direct и мессенджеров.",
      "Менеджер вручную уточняет модель, бюджет, время и контакты.",
      "В чатах теряется контекст, и клиент повторяет информацию.",
      "Нет единого формата заявки для распределения между отделами.",
    ],
    systemEyebrow: "Как работает система",
    systemTitle:
      "Один контролируемый процесс от первого сообщения до менеджера",
    systemIntro:
      "Без обещаний магической автоматизации: только конкретные шаги, правила и контроль передачи.",
    systemSteps: [
      {
        title: "Принимает обращение",
        description:
          "Сайт, Instagram, Viber, Telegram или другой согласованный канал.",
      },
      {
        title: "Определяет сценарий",
        description:
          "Продажа, тест-драйв, сервис, trade-in, выкуп или подбор авто.",
      },
      {
        title: "Уточняет данные",
        description:
          "Задаёт только вопросы, необходимые для следующего действия менеджера.",
      },
      {
        title: "Передаёт заявку",
        description:
          "Отправляет структурированную карточку ответственному сотруднику или в CRM.",
      },
    ],
    mvpEyebrow: "Первый рабочий этап",
    mvpTitle: "Начинаем с одного процесса, не перестраивая весь бизнес",
    mvpIntro:
      "Сначала выбираем самый повторяемый тип обращения и запускаем его на реальных диалогах.",
    mvpPoints: [
      "Карта текущего процесса и точка передачи менеджеру",
      "Один основной сценарий квалификации",
      "Согласованные вопросы, исключения и ручная передача",
      "Один или два приоритетных канала",
      "Структурированная заявка для менеджера или CRM",
      "Тестирование на реальных обращениях и корректировка логики",
    ],
    honestTitle: "Чего эта страница не обещает",
    honestText:
      "Демонстрация не подключена к вашей CRM и не доказывает будущую конверсию. Она показывает логику продукта, которую нужно адаптировать и проверить на вашем процессе.",
    faqTitle: "Коротко о внедрении",
    faq: [
      {
        question: "Это обычный чат-бот?",
        answer:
          "Нет. Чат — только интерфейс. Основная ценность в правилах квалификации, передаче данных и контроле исключений.",
      },
      {
        question: "Нужно менять CRM?",
        answer:
          "Не обязательно. Сначала проверяем доступные интеграции и можем начать с сообщения менеджеру или Google Sheets.",
      },
      {
        question: "Ассистент отвечает вместо менеджера?",
        answer:
          "Только в согласованных рамках. Сложные и нестандартные вопросы сразу передаются человеку.",
      },
      {
        question: "С чего начать?",
        answer:
          "С одного процесса: тест-драйв, сервис или trade-in. После проверки добавляются другие сценарии.",
      },
    ],
    finalTitle: "Покажите, как сейчас проходит одно обращение",
    finalText:
      "Я предложу короткий первый этап без перестройки всей системы и без лишних функций.",
    scenarios: {} as Record<ScenarioKey, Scenario>,
  },
  en: {
    badge: "AI system for automotive dealers",
    titleA: "Turn a customer message into ",
    titleB: "a manager-ready lead",
    subtitle:
      "The system receives enquiries from the website, Instagram and messengers, collects the required context and routes a structured lead to the responsible person.",
    heroNote: "Explore the logic through four common scenarios below",
    demoCta: "View the AI demo",
    requestCta: "Discuss your process",
    dialogTitle: "Briefly describe your process",
    dialogDescription:
      "Leave your contact details and specify which enquiries you want to handle: sales, test drives, service, trade-in or vehicle sourcing.",
    dialogSubmit: "Send",
    dialogSuccessTitle: "Request received",
    dialogSuccessMessage:
      "I will review the process and get back to you with a concrete next step.",
    helpLabel: "Which process do you want to improve?",
    helpPlaceholder:
      "For example: test-drive enquiries from the website and Instagram...",
    demoEyebrow: "Interactive demonstration",
    demoTitle: "More than a website: see exactly what the manager receives",
    demoIntro:
      "Choose an enquiry type. The demo shows a short dialogue and the structured card passed to a manager or CRM.",
    chooseScenario: "Choose a scenario",
    visitor: "Customer",
    assistant: "AI assistant",
    source: "Source",
    result: "The manager receives",
    resultNote: "A clear next action instead of an unstructured message.",
    disclaimer:
      "All data is fictional and does not represent real customers or outcomes. Questions, rules and integrations are configured for each dealer.",
    flow: [
      "Website / Direct / messenger",
      "Short qualification",
      "Structured lead",
      "Manager / CRM",
    ],
    problemEyebrow: "Where delay appears",
    problemTitle:
      "The customer has written, but the manager still lacks context",
    problemIntro:
      "The system does not replace sales. It removes repetitive clarification before the responsible person joins the conversation.",
    problems: [
      "Enquiries arrive across the website, Direct and messengers.",
      "Managers repeatedly ask for the model, budget, timing and contact details.",
      "Context gets lost and the customer repeats information.",
      "There is no consistent lead format for routing between teams.",
    ],
    systemEyebrow: "How the system works",
    systemTitle: "One controlled flow from first message to manager",
    systemIntro:
      "No promise of magical automation: only clear steps, rules and controlled handoff.",
    systemSteps: [
      {
        title: "Receives the enquiry",
        description:
          "Website, Instagram, Viber, Telegram or another agreed channel.",
      },
      {
        title: "Identifies the scenario",
        description:
          "Sales, test drive, service, trade-in, buyout or vehicle sourcing.",
      },
      {
        title: "Collects context",
        description: "Asks only what the manager needs for the next action.",
      },
      {
        title: "Routes the lead",
        description:
          "Sends a structured card to the responsible person or CRM.",
      },
    ],
    mvpEyebrow: "First working stage",
    mvpTitle:
      "Start with one process instead of rebuilding the entire business",
    mvpIntro:
      "We choose the most repetitive enquiry type and test it on real conversations first.",
    mvpPoints: [
      "Current process map and manager handoff point",
      "One primary qualification scenario",
      "Agreed questions, exceptions and human handoff",
      "One or two priority channels",
      "Structured lead for a manager or CRM",
      "Testing on real enquiries and logic refinement",
    ],
    honestTitle: "What this page does not promise",
    honestText:
      "The demo is not connected to your CRM and does not prove future conversion. It shows product logic that must be adapted, integrated and validated against your process.",
    faqTitle: "Implementation FAQ",
    faq: [
      {
        question: "Is this a regular chatbot?",
        answer:
          "No. Chat is only the interface. The value is in qualification rules, data routing and exception handling.",
      },
      {
        question: "Do we need to replace our CRM?",
        answer:
          "Not necessarily. We first review available integrations and can start with manager notifications or Google Sheets.",
      },
      {
        question: "Does the assistant replace a manager?",
        answer:
          "Only within agreed boundaries. Complex or sensitive questions are handed to a person.",
      },
      {
        question: "Where should we start?",
        answer:
          "With one process such as test drives, service or trade-in, then add scenarios after validation.",
      },
    ],
    finalTitle: "Show me how one enquiry is handled today",
    finalText:
      "I will suggest a focused first stage without rebuilding the whole system or adding unnecessary features.",
    scenarios: {} as Record<ScenarioKey, Scenario>,
  },
};

copy.ru.scenarios = {
  sales: {
    tab: "Авто / тест-драйв",
    source: "Instagram Direct",
    messages: [
      {
        from: "visitor",
        text: "Интересует кроссовер до $35 000. Можно записаться на тест-драйв?",
      },
      {
        from: "assistant",
        text: "Передам запрос менеджеру. Уточните, пожалуйста, новое авто или с пробегом и когда удобно приехать?",
      },
      {
        from: "visitor",
        text: "Новое, желательно гибрид. В субботу после 12:00.",
      },
    ],
    fields: [
      { label: "Запрос", value: "Новый гибридный кроссовер" },
      { label: "Бюджет", value: "До $35 000" },
      { label: "Следующий шаг", value: "Тест-драйв в субботу после 12:00" },
      { label: "Канал", value: "Instagram Direct" },
    ],
  },
  service: {
    tab: "Сервис",
    source: "Сайт",
    messages: [
      { from: "visitor", text: "Нужно плановое ТО для Toyota RAV4 2021 года." },
      {
        from: "assistant",
        text: "Уточните пробег и желаемую дату. Контакт можно оставить для подтверждения записи.",
      },
      { from: "visitor", text: "62 000 км, удобно в пятницу утром." },
    ],
    fields: [
      { label: "Авто", value: "Toyota RAV4, 2021" },
      { label: "Пробег / услуга", value: "62 000 км / плановое ТО" },
      { label: "Желаемое время", value: "Пятница, утро" },
      { label: "Следующий шаг", value: "Уточнить слот и подтвердить запись" },
    ],
  },
  tradein: {
    tab: "Trade-in / выкуп",
    source: "Viber",
    messages: [
      {
        from: "visitor",
        text: "Хочу оценить авто для trade-in. Volkswagen Passat 2018 года.",
      },
      {
        from: "assistant",
        text: "Подскажите пробег, топливо, состояние и сможете ли прислать несколько фото.",
      },
      {
        from: "visitor",
        text: "145 000 км, дизель, без ДТП. Фото могу прислать сейчас.",
      },
    ],
    fields: [
      { label: "Авто", value: "Volkswagen Passat, 2018, дизель" },
      {
        label: "Пробег / состояние",
        value: "145 000 км / со слов клиента без ДТП",
      },
      { label: "Материалы", value: "Готов прислать фото" },
      {
        label: "Следующий шаг",
        value: "Запросить фото и договориться об осмотре",
      },
    ],
  },
  selection: {
    tab: "Подбор авто",
    source: "Telegram",
    messages: [
      {
        from: "visitor",
        text: "Нужен семейный автомобиль из Европы до €22 000.",
      },
      {
        from: "assistant",
        text: "Какой кузов, год и топливо рассматриваете? Входит ли доставка в бюджет?",
      },
      {
        from: "visitor",
        text: "Универсал или кроссовер от 2020 года, дизель. Бюджет с доставкой.",
      },
    ],
    fields: [
      { label: "Потребность", value: "Семейный универсал или кроссовер" },
      { label: "Критерии", value: "От 2020 года, дизель" },
      { label: "Бюджет", value: "До €22 000 с доставкой" },
      { label: "Следующий шаг", value: "Уточнить 2–3 модели для поиска" },
    ],
  },
};

copy.en.scenarios = {
  sales: {
    tab: "Vehicle / test drive",
    source: "Instagram Direct",
    messages: [
      {
        from: "visitor",
        text: "I am looking for a crossover under $35,000. Can I book a test drive?",
      },
      {
        from: "assistant",
        text: "I will pass this to a manager. New or used, and when would you like to visit?",
      },
      {
        from: "visitor",
        text: "New, preferably hybrid. Saturday after 12:00.",
      },
    ],
    fields: [
      { label: "Request", value: "New hybrid crossover" },
      { label: "Budget", value: "Up to $35,000" },
      { label: "Next step", value: "Test drive Saturday after 12:00" },
      { label: "Channel", value: "Instagram Direct" },
    ],
  },
  service: {
    tab: "Service",
    source: "Website",
    messages: [
      {
        from: "visitor",
        text: "I need scheduled maintenance for a 2021 Toyota RAV4.",
      },
      {
        from: "assistant",
        text: "Please share the mileage and preferred date. You can leave a contact for confirmation.",
      },
      { from: "visitor", text: "62,000 km, Friday morning." },
    ],
    fields: [
      { label: "Vehicle", value: "Toyota RAV4, 2021" },
      {
        label: "Mileage / service",
        value: "62,000 km / scheduled maintenance",
      },
      { label: "Preferred time", value: "Friday morning" },
      { label: "Next step", value: "Confirm availability and booking" },
    ],
  },
  tradein: {
    tab: "Trade-in",
    source: "Viber",
    messages: [
      {
        from: "visitor",
        text: "I would like a trade-in valuation for a 2018 Volkswagen Passat.",
      },
      {
        from: "assistant",
        text: "What is the mileage, fuel type and condition? Can you share a few photos?",
      },
      {
        from: "visitor",
        text: "145,000 km, diesel, no accidents. I can send photos now.",
      },
    ],
    fields: [
      { label: "Vehicle", value: "Volkswagen Passat, 2018, diesel" },
      {
        label: "Mileage / condition",
        value: "145,000 km / customer reports no accidents",
      },
      { label: "Assets", value: "Ready to send photos" },
      { label: "Next step", value: "Request photos and arrange inspection" },
    ],
  },
  selection: {
    tab: "Vehicle sourcing",
    source: "Telegram",
    messages: [
      {
        from: "visitor",
        text: "I need a family car from Europe under €22,000.",
      },
      {
        from: "assistant",
        text: "Which body type, year and fuel do you prefer? Does the budget include delivery?",
      },
      {
        from: "visitor",
        text: "Estate or crossover, 2020 or newer, diesel. Delivery included.",
      },
    ],
    fields: [
      { label: "Need", value: "Family estate or crossover" },
      { label: "Criteria", value: "2020 or newer, diesel" },
      { label: "Budget", value: "Up to €22,000 including delivery" },
      { label: "Next step", value: "Confirm 2–3 target models" },
    ],
  },
};

const scenarioKeys: ScenarioKey[] = [
  "sales",
  "service",
  "tradein",
  "selection",
];
const flowIcons = [MousePointerClick, Bot, ClipboardCheck, Building2];
const systemIcons = [MessageSquare, Route, Workflow, UserCheck];

function RequestProcessButton({
  text,
  subtle = false,
}: {
  text: string;
  subtle?: boolean;
}) {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const c = copy[locale];
  return (
    <RequestDialog
      intent="auto_dealer_system_map_request"
      title={c.dialogTitle}
      description={c.dialogDescription}
      submitLabel={c.dialogSubmit}
      successTitle={c.dialogSuccessTitle}
      successMessage={c.dialogSuccessMessage}
      buttonLabel="Auto dealers — system map"
      showBuildType={false}
      helpLabel={c.helpLabel}
      helpPlaceholder={c.helpPlaceholder}
      helpRequired
      context={{ niche: "automotive", offer: "AI lead qualification system" }}
      className="max-sm:w-full"
    >
      <Button
        className={cn(
          "max-sm:w-full h-auto min-h-12 px-6 py-3",
          subtle
            ? "bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10"
            : "premium-button",
        )}
      >
        {text}
        <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </RequestDialog>
  );
}

function InteractiveDemo({ c }: { c: PageCopy }) {
  const [selected, setSelected] = useState<ScenarioKey>("sales");
  const scenario = c.scenarios[selected];
  return (
    <section
      id="live-demo"
      className="section-accent py-20 border-t border-zinc-900 scroll-mt-20"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="eyebrow">{c.demoEyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            {c.demoTitle}
          </h2>
          <p className="text-gray-400">{c.demoIntro}</p>
        </div>
        <div className="luxe-card p-4 sm:p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
            {c.chooseScenario}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {scenarioKeys.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={selected === key}
                onClick={() => setSelected(key)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  selected === key
                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                    : "border-zinc-700 bg-black/40 text-gray-300 hover:border-zinc-500",
                )}
              >
                {c.scenarios[key].tab}
              </button>
            ))}
          </div>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
            <div className="rounded-2xl border border-zinc-800 bg-black/60 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Bot className="h-4 w-4 text-amber-400" />
                  {c.assistant}
                </div>
                <span className="text-xs text-gray-500">
                  {c.source}: {scenario.source}
                </span>
              </div>
              <div className="space-y-3 min-h-[280px]">
                {scenario.messages.map((message, index) => (
                  <motion.div
                    key={`${selected}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={cn(
                      "flex",
                      message.from === "visitor"
                        ? "justify-end"
                        : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        message.from === "visitor"
                          ? "bg-amber-400 text-black rounded-br-sm"
                          : "bg-zinc-800 text-gray-100 rounded-bl-sm",
                      )}
                    >
                      <div
                        className={cn(
                          "text-[10px] uppercase tracking-wider mb-1",
                          message.from === "visitor"
                            ? "text-black/60"
                            : "text-gray-500",
                        )}
                      >
                        {message.from === "visitor" ? c.visitor : c.assistant}
                      </div>
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <ClipboardCheck className="h-5 w-5 text-amber-400" />
                <h3 className="font-semibold">{c.result}</h3>
              </div>
              <dl className="space-y-3">
                {scenario.fields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-xl bg-black/40 border border-zinc-800 px-4 py-3"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-1">
                      {field.label}
                    </dt>
                    <dd className="text-sm text-gray-100 leading-relaxed">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-gray-500 mt-5 leading-relaxed">
                {c.resultNote}
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
            {c.flow.map((step, index) => {
              const Icon = flowIcons[index] ?? Check;
              return (
                <div
                  key={step}
                  className="relative rounded-xl border border-zinc-800 bg-black/30 px-3 py-3 text-center"
                >
                  <Icon className="h-4 w-4 text-amber-400 mx-auto mb-2" />
                  <span className="text-[11px] text-gray-400 leading-tight block">
                    {step}
                  </span>
                  {index < c.flow.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-5 max-w-3xl mx-auto">
          {c.disclaimer}
        </p>
      </div>
    </section>
  );
}

export function AutoDealersPage() {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const c = copy[locale];
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <section className="section-tint relative pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="premium-badge">{c.badge}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-6 mb-5">
            {c.titleA}
            <span className="gradient-gold-text">{c.titleB}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {c.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#live-demo" className="max-sm:w-full">
              <Button className="premium-button max-sm:w-full h-auto min-h-12 px-8 py-3">
                <MousePointerClick className="mr-2 h-5 w-5" />
                {c.demoCta}
              </Button>
            </a>
            <RequestProcessButton text={c.requestCta} subtle />
          </div>
          <p className="text-xs text-gray-500 mt-4">{c.heroNote}</p>
        </div>
      </section>

      <InteractiveDemo c={c} />

      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="eyebrow">{c.problemEyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              {c.problemTitle}
            </h2>
            <p className="text-gray-400">{c.problemIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.problems.map((item) => (
              <div key={item} className="luxe-card p-5 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-accent py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="eyebrow">{c.systemEyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              {c.systemTitle}
            </h2>
            <p className="text-gray-400">{c.systemIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.systemSteps.map((step, index) => {
              const Icon = systemIcons[index] ?? Check;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="luxe-card p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex w-7 h-7 rounded-md bg-amber-400/10 items-center justify-center text-xs font-bold text-amber-300">
                      {index + 1}
                    </span>
                    <Icon className="h-4 w-4 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="eyebrow">{c.mvpEyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              {c.mvpTitle}
            </h2>
            <p className="text-gray-400">{c.mvpIntro}</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3.5">
            {c.mvpPoints.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 luxe-card px-5 py-4"
              >
                <span className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </span>
                <span className="text-sm text-gray-300 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-6 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">{c.honestTitle}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {c.honestText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow">{c.faqTitle}</span>
          </div>
          <div className="space-y-3">
            {c.faq.map((item) => (
              <details key={item.question} className="luxe-card p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none font-medium">
                  <span>{item.question}</span>
                  <Plus className="h-4 w-4 text-amber-400 transition-transform group-open:rotate-45" />
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {c.finalTitle}
          </h2>
          <p className="text-gray-400 mb-8">{c.finalText}</p>
          <RequestProcessButton text={c.requestCta} />
        </div>
      </section>
      <FooterSection />
    </div>
  );
}
