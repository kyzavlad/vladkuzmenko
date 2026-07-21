"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ClipboardCheck,
  Headphones,
  Hotel,
  MessageSquare,
  Route,
  ShoppingBag,
  UserCheck,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Locale = "ua" | "ru" | "en";
type ScenarioKey = "lead" | "support" | "booking" | "commerce";

type Scenario = {
  tab: string;
  source: string;
  messages: Array<{ from: "visitor" | "assistant"; text: string }>;
  fields: Array<{ label: string; value: string }>;
};

type Copy = {
  badge: string;
  title: string;
  accent: string;
  subtitle: string;
  note: string;
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
  demoText: string;
  choose: string;
  visitor: string;
  assistant: string;
  source: string;
  managerGets: string;
  managerNote: string;
  demoDisclaimer: string;
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilities: Array<{ title: string; text: string }>;
  casesEyebrow: string;
  casesTitle: string;
  casesText: string;
  realProject: string;
  interactivePrototype: string;
  livePilot: string;
  inDevelopment: string;
  cases: Array<{
    title: string;
    status: "real" | "prototype" | "pilot" | "dev";
    text: string;
    result: string;
    href?: string;
    cta?: string;
  }>;
  processEyebrow: string;
  processTitle: string;
  process: Array<{ title: string; text: string }>;
  honestTitle: string;
  honestText: string;
  finalTitle: string;
  finalText: string;
  scenarios: Record<ScenarioKey, Scenario>;
};

const copy: Record<Locale, Copy> = {
  ua: {
    badge: "AI-системи для реальних бізнес-процесів",
    title: "Не просто чат-бот. ",
    accent: "Керований процес від звернення до наступної дії",
    subtitle:
      "Проєктую системи, які приймають звернення, уточнюють потрібні дані, працюють за правилами бізнесу та передають людині зрозумілий результат.",
    note: "Нижче можна самостійно пройти чотири типові сценарії",
    demoCta: "Відкрити інтерактивне демо",
    requestCta: "Розібрати мій процес",
    dialogTitle: "Коротко опишіть задачу",
    dialogDescription:
      "Вкажіть, звідки надходять звернення і що команда зараз робить вручну. Я запропоную найменший корисний перший етап.",
    dialogSubmit: "Надіслати",
    dialogSuccessTitle: "Запит отримано",
    dialogSuccessMessage:
      "Я перегляну процес і зв'яжуся з конкретним наступним кроком.",
    helpLabel: "Що потрібно автоматизувати?",
    helpPlaceholder:
      "Наприклад: заявки з Instagram, запис на послугу або підтримка клієнтів...",
    demoEyebrow: "Інтерактивна демонстрація",
    demoTitle: "Подивіться не на обіцянку, а на логіку системи",
    demoText:
      "Оберіть сценарій. Ви побачите, що запитує асистент і яку структуровану інформацію отримує менеджер або інша відповідальна людина.",
    choose: "Оберіть сценарій",
    visitor: "Клієнт",
    assistant: "AI-асистент",
    source: "Канал",
    managerGets: "Команда отримує",
    managerNote:
      "Контекст, наступну дію та дані без повторного опитування клієнта.",
    demoDisclaimer:
      "Діалоги нижче — демонстраційні. Це не реальні клієнти й не обіцянка результату. Питання, правила, база знань та інтеграції налаштовуються під конкретний процес.",
    capabilitiesEyebrow: "Що можна автоматизувати",
    capabilitiesTitle: "Один підхід — різні бізнес-процеси",
    capabilities: [
      {
        title: "Кваліфікація звернень",
        text: "Зібрати контекст, контакт, потребу та передати готову заявку.",
      },
      {
        title: "Підтримка клієнтів",
        text: "Відповісти за погодженою базою знань і передати складне питання людині.",
      },
      {
        title: "Запис і бронювання",
        text: "Уточнити послугу, дату, обмеження та сформувати запит на підтвердження.",
      },
      {
        title: "Підбір товару або послуги",
        text: "Поставити релевантні питання й показати варіанти за правилами бізнесу.",
      },
      {
        title: "Внутрішні операції",
        text: "Перенести дані між формами, таблицями, CRM та повідомленнями команди.",
      },
      {
        title: "Контроль винятків",
        text: "Не вигадувати відповідь, а вчасно залучити відповідальну людину.",
      },
    ],
    casesEyebrow: "Вибрані роботи",
    casesTitle: "Реальні проєкти окремо від демонстрацій",
    casesText:
      "Я не змішую робочі впровадження з концептами. Біля кожного прикладу прямо вказано його статус.",
    realProject: "Реальний проєкт",
    interactivePrototype: "Інтерактивний прототип",
    livePilot: "Внутрішній робочий пілот",
    inDevelopment: "В активній розробці",
    cases: [
      {
        title: "AI-система залучення лідів і Sales Copilot",
        status: "pilot",
        text: "Наскрізний вихідний процес: збір і підготовка лідів, розсилка, фолоу-ап і Telegram Sales Copilot, що підказує відповідь і наступну дію.",
        result:
          "Працює як внутрішній робочий пілот. Рутинні кроки автоматизовані, рішення — за людиною.",
        href: "/ua/work/sales-copilot",
        cta: "Відкрити кейс",
      },
      {
        title: "Hotel Natsionalny",
        status: "real",
        text: "AI-асистент і автоматизації для комунікації з гостями та передачі звернень команді готелю.",
        result: "Реальна клієнтська робота. Детальний публічний кейс готується.",
      },
      {
        title: "AI-система для автодилерів",
        status: "prototype",
        text: "Кваліфікація запитів на авто, тест-драйв, сервіс, trade-in і підбір із передачею менеджеру.",
        result: "Інтерактивний прототип, який можна пройти вживу.",
        href: "/ua/auto-dealers",
        cta: "Відкрити живе демо",
      },
      {
        title: "Tutorivo",
        status: "dev",
        text: "Веб-платформа-маркетплейс: каталог, заявки, адмін-модерація та оплати в багатомовній структурі.",
        result: "Реальний продукт у розробці зі справжніми скриншотами.",
        href: "/ua/work/tutorivo",
        cta: "Відкрити кейс",
      },
    ],
    processEyebrow: "Як починається робота",
    processTitle: "Спочатку один вузький процес, потім розширення",
    process: [
      {
        title: "1. Розбираємо поточний шлях",
        text: "Джерело звернення, ручні дії, правила та момент передачі людині.",
      },
      {
        title: "2. Обираємо перший сценарій",
        text: "Той, що повторюється найчастіше або створює найбільшу затримку.",
      },
      {
        title: "3. Збираємо робочу версію",
        text: "Питання, база знань, винятки, повідомлення та потрібна інтеграція.",
      },
      {
        title: "4. Перевіряємо на реальних кейсах",
        text: "Коригуємо логіку і лише після цього додаємо нові канали та функції.",
      },
    ],
    honestTitle: "Що ця сторінка доводить — і чого не доводить",
    honestText:
      "Вона показує підхід, інтерфейс і логіку передачі даних. Вона не доводить майбутню конверсію і не означає, що готовий шаблон можна без адаптації підключити до будь-якого бізнесу.",
    finalTitle: "Покажіть один процес, який команда виконує вручну",
    finalText:
      "Я запропоную конкретний перший етап без перебудови всього бізнесу та без зайвих функцій.",
    scenarios: {
      lead: {
        tab: "Продаж / заявка",
        source: "Instagram Direct",
        messages: [
          {
            from: "visitor",
            text: "Потрібна консультація. Хочу зрозуміти варіанти та вартість.",
          },
          {
            from: "assistant",
            text: "Допоможу передати запит відповідальній людині. Для якого бізнесу потрібне рішення і що зараз забирає найбільше часу?",
          },
          {
            from: "visitor",
            text: "Мережа з трьох точок. Менеджери вручну відповідають на однакові питання і збирають контакти.",
          },
        ],
        fields: [
          { label: "Тип запиту", value: "Консультація щодо автоматизації" },
          { label: "Бізнес", value: "Мережа, 3 точки" },
          {
            label: "Проблема",
            value: "Повторювані відповіді та ручний збір контактів",
          },
          {
            label: "Наступний крок",
            value: "Розбір одного типового звернення",
          },
        ],
      },
      support: {
        tab: "Підтримка",
        source: "Чат на сайті",
        messages: [
          {
            from: "visitor",
            text: "Оплата пройшла, але доступ до послуги не з'явився.",
          },
          {
            from: "assistant",
            text: "Перевіримо звернення. Підкажіть email замовлення та приблизний час оплати. Банківські дані надсилати не потрібно.",
          },
          {
            from: "visitor",
            text: "client@example.com, сьогодні близько 11:20.",
          },
        ],
        fields: [
          { label: "Категорія", value: "Оплата / відсутній доступ" },
          { label: "Email", value: "client@example.com" },
          { label: "Час", value: "Сьогодні, близько 11:20" },
          { label: "Маршрут", value: "Передати білінг-підтримці" },
        ],
      },
      booking: {
        tab: "Запис / бронювання",
        source: "Telegram",
        messages: [
          {
            from: "visitor",
            text: "Хочу записатися на консультацію наступного тижня після 16:00.",
          },
          {
            from: "assistant",
            text: "Уточніть, будь ласка, тему консультації та зручні дні. Передам запит для підтвердження часу.",
          },
          {
            from: "visitor",
            text: "Автоматизація заявок. Зручно у вівторок або четвер.",
          },
        ],
        fields: [
          { label: "Послуга", value: "Консультація з автоматизації" },
          { label: "Час", value: "Після 16:00" },
          { label: "Дні", value: "Вівторок або четвер" },
          { label: "Наступний крок", value: "Підтвердити доступний слот" },
        ],
      },
      commerce: {
        tab: "Підбір товару",
        source: "Viber",
        messages: [
          {
            from: "visitor",
            text: "Потрібен подарунок до 3000 грн з доставкою завтра.",
          },
          {
            from: "assistant",
            text: "Для кого подарунок і які категорії точно не розглядати? Перевірю варіанти за вашим бюджетом.",
          },
          {
            from: "visitor",
            text: "Для чоловіка, без алкоголю. Бажано щось практичне.",
          },
        ],
        fields: [
          { label: "Задача", value: "Подарунок для чоловіка" },
          { label: "Бюджет", value: "До 3000 грн" },
          { label: "Обмеження", value: "Без алкоголю, доставка завтра" },
          { label: "Перевага", value: "Практичний подарунок" },
        ],
      },
    },
  },
  ru: {} as Copy,
  en: {} as Copy,
};

copy.ru = {
  ...copy.ua,
  badge: "AI-системы для реальных бизнес-процессов",
  title: "Не просто чат-бот. ",
  accent: "Управляемый процесс от обращения до следующего действия",
  subtitle:
    "Проектирую системы, которые принимают обращения, уточняют нужные данные, работают по правилам бизнеса и передают человеку понятный результат.",
  note: "Ниже можно самостоятельно пройти четыре типовых сценария",
  demoCta: "Открыть интерактивное демо",
  requestCta: "Разобрать мой процесс",
  dialogTitle: "Коротко опишите задачу",
  dialogDescription:
    "Укажите, откуда поступают обращения и что команда сейчас делает вручную. Я предложу минимальный полезный первый этап.",
  dialogSubmit: "Отправить",
  dialogSuccessTitle: "Запрос получен",
  dialogSuccessMessage:
    "Я просмотрю процесс и свяжусь с конкретным следующим шагом.",
  helpLabel: "Что нужно автоматизировать?",
  helpPlaceholder:
    "Например: заявки из Instagram, запись на услугу или поддержка клиентов...",
  demoEyebrow: "Интерактивная демонстрация",
  demoTitle: "Посмотрите не на обещание, а на логику системы",
  demoText:
    "Выберите сценарий. Вы увидите, что уточняет ассистент и какую структурированную информацию получает менеджер или другой ответственный человек.",
  choose: "Выберите сценарий",
  visitor: "Клиент",
  assistant: "AI-ассистент",
  source: "Канал",
  managerGets: "Команда получает",
  managerNote:
    "Контекст, следующее действие и данные без повторного опроса клиента.",
  demoDisclaimer:
    "Диалоги ниже демонстрационные. Это не реальные клиенты и не обещание результата. Вопросы, правила, база знаний и интеграции настраиваются под конкретный процесс.",
  capabilitiesEyebrow: "Что можно автоматизировать",
  capabilitiesTitle: "Один подход — разные бизнес-процессы",
  capabilities: [
    {
      title: "Квалификация обращений",
      text: "Собрать контекст, контакт, потребность и передать готовую заявку.",
    },
    {
      title: "Поддержка клиентов",
      text: "Ответить по согласованной базе знаний и передать сложный вопрос человеку.",
    },
    {
      title: "Запись и бронирование",
      text: "Уточнить услугу, дату, ограничения и сформировать запрос на подтверждение.",
    },
    {
      title: "Подбор товара или услуги",
      text: "Задать релевантные вопросы и показать варианты по правилам бизнеса.",
    },
    {
      title: "Внутренние операции",
      text: "Перенести данные между формами, таблицами, CRM и сообщениями команды.",
    },
    {
      title: "Контроль исключений",
      text: "Не придумывать ответ, а вовремя подключить ответственного человека.",
    },
  ],
  casesEyebrow: "Выбранные работы",
  casesTitle: "Реальные проекты отдельно от демонстраций",
  casesText:
    "Я не смешиваю рабочие внедрения с концептами. У каждого примера прямо указан его статус.",
  realProject: "Реальный проект",
  interactivePrototype: "Интерактивный прототип",
  livePilot: "Внутренний рабочий пилот",
  inDevelopment: "В активной разработке",
  cases: [
    {
      title: "AI-система привлечения лидов и Sales Copilot",
      status: "pilot",
      text: "Сквозной исходящий процесс: сбор и подготовка лидов, рассылка, фоллоу-ап и Telegram Sales Copilot, подсказывающий ответ и следующее действие.",
      result:
        "Работает как внутренний рабочий пилот. Рутинные шаги автоматизированы, решения — за человеком.",
      href: "/ru/work/sales-copilot",
      cta: "Открыть кейс",
    },
    {
      title: "Hotel Natsionalny",
      status: "real",
      text: "AI-ассистент и автоматизации для коммуникации с гостями и передачи обращений команде отеля.",
      result: "Реальная клиентская работа. Детальный публичный кейс готовится.",
    },
    {
      title: "AI-система для автодилеров",
      status: "prototype",
      text: "Квалификация запросов на авто, тест-драйв, сервис, trade-in и подбор с передачей менеджеру.",
      result: "Интерактивный прототип, который можно пройти вживую.",
      href: "/ru/auto-dealers",
      cta: "Открыть живое демо",
    },
    {
      title: "Tutorivo",
      status: "dev",
      text: "Веб-платформа-маркетплейс: каталог, заявки, админ-модерация и оплаты в многоязычной структуре.",
      result: "Реальный продукт в разработке с реальными скриншотами.",
      href: "/ru/work/tutorivo",
      cta: "Открыть кейс",
    },
  ],
  processEyebrow: "Как начинается работа",
  processTitle: "Сначала один узкий процесс, затем расширение",
  process: [
    {
      title: "1. Разбираем текущий путь",
      text: "Источник обращения, ручные действия, правила и момент передачи человеку.",
    },
    {
      title: "2. Выбираем первый сценарий",
      text: "Тот, который повторяется чаще всего или создаёт наибольшую задержку.",
    },
    {
      title: "3. Собираем рабочую версию",
      text: "Вопросы, база знаний, исключения, сообщения и нужная интеграция.",
    },
    {
      title: "4. Проверяем на реальных случаях",
      text: "Корректируем логику и только затем добавляем новые каналы и функции.",
    },
  ],
  honestTitle: "Что эта страница доказывает — и чего не доказывает",
  honestText:
    "Она показывает подход, интерфейс и логику передачи данных. Она не доказывает будущую конверсию и не означает, что готовый шаблон можно без адаптации подключить к любому бизнесу.",
  finalTitle: "Покажите один процесс, который команда выполняет вручную",
  finalText:
    "Я предложу конкретный первый этап без перестройки всего бизнеса и без лишних функций.",
  scenarios: {
    lead: {
      tab: "Продажа / заявка",
      source: "Instagram Direct",
      messages: [
        {
          from: "visitor",
          text: "Нужна консультация. Хочу понять варианты и стоимость.",
        },
        {
          from: "assistant",
          text: "Помогу передать запрос ответственному человеку. Для какого бизнеса нужно решение и что сейчас занимает больше всего времени?",
        },
        {
          from: "visitor",
          text: "Сеть из трёх точек. Менеджеры вручную отвечают на одинаковые вопросы и собирают контакты.",
        },
      ],
      fields: [
        { label: "Тип запроса", value: "Консультация по автоматизации" },
        { label: "Бизнес", value: "Сеть, 3 точки" },
        {
          label: "Проблема",
          value: "Повторяющиеся ответы и ручной сбор контактов",
        },
        { label: "Следующий шаг", value: "Разбор одного типового обращения" },
      ],
    },
    support: {
      tab: "Поддержка",
      source: "Чат на сайте",
      messages: [
        {
          from: "visitor",
          text: "Оплата прошла, но доступ к услуге не появился.",
        },
        {
          from: "assistant",
          text: "Проверим обращение. Подскажите email заказа и примерное время оплаты. Банковские данные отправлять не нужно.",
        },
        { from: "visitor", text: "client@example.com, сегодня около 11:20." },
      ],
      fields: [
        { label: "Категория", value: "Оплата / отсутствует доступ" },
        { label: "Email", value: "client@example.com" },
        { label: "Время", value: "Сегодня, около 11:20" },
        { label: "Маршрут", value: "Передать биллинг-поддержке" },
      ],
    },
    booking: {
      tab: "Запись / бронирование",
      source: "Telegram",
      messages: [
        {
          from: "visitor",
          text: "Хочу записаться на консультацию на следующей неделе после 16:00.",
        },
        {
          from: "assistant",
          text: "Уточните, пожалуйста, тему консультации и удобные дни. Передам запрос для подтверждения времени.",
        },
        {
          from: "visitor",
          text: "Автоматизация заявок. Удобно во вторник или четверг.",
        },
      ],
      fields: [
        { label: "Услуга", value: "Консультация по автоматизации" },
        { label: "Время", value: "После 16:00" },
        { label: "Дни", value: "Вторник или четверг" },
        { label: "Следующий шаг", value: "Подтвердить доступный слот" },
      ],
    },
    commerce: {
      tab: "Подбор товара",
      source: "Viber",
      messages: [
        {
          from: "visitor",
          text: "Нужен подарок до 3000 грн с доставкой завтра.",
        },
        {
          from: "assistant",
          text: "Для кого подарок и какие категории точно не рассматривать? Проверю варианты по вашему бюджету.",
        },
        {
          from: "visitor",
          text: "Для мужчины, без алкоголя. Желательно что-то практичное.",
        },
      ],
      fields: [
        { label: "Задача", value: "Подарок для мужчины" },
        { label: "Бюджет", value: "До 3000 грн" },
        { label: "Ограничения", value: "Без алкоголя, доставка завтра" },
        { label: "Предпочтение", value: "Практичный подарок" },
      ],
    },
  },
};

copy.en = {
  badge: "AI systems for real business processes",
  title: "Not just a chatbot. ",
  accent: "A guided process from enquiry to the next action",
  subtitle:
    "I design systems that take enquiries, collect the details that matter, work by your business rules, and hand a person a clear result.",
  note: "You can walk through four common scenarios yourself below",
  demoCta: "Open the interactive demo",
  requestCta: "Map my process",
  dialogTitle: "Briefly describe the task",
  dialogDescription:
    "Tell me where enquiries come from and what your team does manually today. I'll suggest the smallest useful first stage.",
  dialogSubmit: "Send",
  dialogSuccessTitle: "Request received",
  dialogSuccessMessage:
    "I'll review the process and come back with a concrete next step.",
  helpLabel: "What do you want to automate?",
  helpPlaceholder:
    "For example: enquiries from Instagram, service bookings or customer support...",
  demoEyebrow: "Interactive demonstration",
  demoTitle: "Look at the logic of the system, not a promise",
  demoText:
    "Choose a scenario. You'll see what the assistant asks and the structured information a manager or other responsible person receives.",
  choose: "Choose a scenario",
  visitor: "Customer",
  assistant: "AI assistant",
  source: "Channel",
  managerGets: "The team receives",
  managerNote:
    "Context, the next action and the data — without asking the customer everything again.",
  demoDisclaimer:
    "The dialogues below are demonstrations. They are not real customers and not a promise of results. Questions, rules, knowledge base and integrations are configured for each specific process.",
  capabilitiesEyebrow: "What can be automated",
  capabilitiesTitle: "One approach — different business processes",
  capabilities: [
    {
      title: "Enquiry qualification",
      text: "Collect context, contact and need, then hand over a ready lead.",
    },
    {
      title: "Customer support",
      text: "Answer from an agreed knowledge base and pass hard questions to a person.",
    },
    {
      title: "Booking & scheduling",
      text: "Clarify service, date and constraints, then create a request to confirm.",
    },
    {
      title: "Product or service selection",
      text: "Ask relevant questions and show options by your business rules.",
    },
    {
      title: "Internal operations",
      text: "Move data between forms, tables, CRM and team messages.",
    },
    {
      title: "Exception handling",
      text: "Don't invent an answer — bring in the responsible person in time.",
    },
  ],
  casesEyebrow: "Selected work",
  casesTitle: "A few strong proof categories — not many similar bots",
  casesText:
    "I don't mix working systems with concepts. Each example states its status directly.",
  realProject: "Real project",
  interactivePrototype: "Interactive prototype",
  livePilot: "Internal live pilot",
  inDevelopment: "In active development",
  cases: [
    {
      title: "AI Lead Acquisition & Sales Copilot",
      status: "pilot",
      text: "An end-to-end outbound process: collecting and preparing leads, outreach, follow-up and a Telegram Sales Copilot that suggests a reply and the next action.",
      result:
        "Running as an internal live pilot. Routine steps are automated; decisions stay with a human.",
      href: "/work/sales-copilot",
      cta: "Open case study",
    },
    {
      title: "Hotel Natsionalny",
      status: "real",
      text: "An AI assistant and automations for guest communication and routing enquiries to the hotel team.",
      result: "Real client work. A detailed public case study is in preparation.",
    },
    {
      title: "Auto-dealer lead system",
      status: "prototype",
      text: "Qualifying enquiries for vehicles, test drives, service, trade-in and sourcing, with a manager handoff.",
      result: "An interactive prototype you can walk through live.",
      href: "/auto-dealers",
      cta: "Open the live demo",
    },
    {
      title: "Tutorivo",
      status: "dev",
      text: "A marketplace web platform: catalog, applications, admin review and payments in a multilingual structure.",
      result: "A real product in development, with real screenshots.",
      href: "/work/tutorivo",
      cta: "Open case study",
    },
  ],
  processEyebrow: "How the work starts",
  processTitle: "One narrow process first, then expand",
  process: [
    {
      title: "1. Map the current path",
      text: "Enquiry source, manual steps, rules and the moment of handoff to a person.",
    },
    {
      title: "2. Choose the first scenario",
      text: "The one that repeats most often or creates the biggest delay.",
    },
    {
      title: "3. Build a working version",
      text: "Questions, knowledge base, exceptions, notifications and the needed integration.",
    },
    {
      title: "4. Validate on real cases",
      text: "Adjust the logic — and only then add new channels and features.",
    },
  ],
  honestTitle: "What this page proves — and what it doesn't",
  honestText:
    "It shows the approach, the interface and the data-handoff logic. It does not prove future conversion, and it doesn't mean a ready template can be plugged into any business without adaptation.",
  finalTitle: "Show me one process your team does by hand",
  finalText:
    "I'll suggest a concrete first stage without rebuilding your whole business or adding unnecessary features.",
  scenarios: {
    lead: {
      tab: "Sales / enquiry",
      source: "Instagram Direct",
      messages: [
        {
          from: "visitor",
          text: "I need a consultation. I want to understand the options and the cost.",
        },
        {
          from: "assistant",
          text: "I'll help pass your request to the right person. What business is this for, and what takes the most time right now?",
        },
        {
          from: "visitor",
          text: "A chain with three locations. Managers manually answer the same questions and collect contacts.",
        },
      ],
      fields: [
        { label: "Request type", value: "Automation consultation" },
        { label: "Business", value: "Chain, 3 locations" },
        {
          label: "Problem",
          value: "Repetitive answers and manual contact collection",
        },
        { label: "Next step", value: "Break down one typical enquiry" },
      ],
    },
    support: {
      tab: "Support",
      source: "Website chat",
      messages: [
        {
          from: "visitor",
          text: "The payment went through, but access to the service didn't appear.",
        },
        {
          from: "assistant",
          text: "Let's check the request. Please share the order email and the approximate time of payment. No banking details needed.",
        },
        { from: "visitor", text: "client@example.com, today around 11:20." },
      ],
      fields: [
        { label: "Category", value: "Payment / missing access" },
        { label: "Email", value: "client@example.com" },
        { label: "Time", value: "Today, around 11:20" },
        { label: "Route", value: "Send to billing support" },
      ],
    },
    booking: {
      tab: "Booking",
      source: "Telegram",
      messages: [
        {
          from: "visitor",
          text: "I'd like to book a consultation next week after 16:00.",
        },
        {
          from: "assistant",
          text: "Please tell me the consultation topic and convenient days. I'll pass the request to confirm a time.",
        },
        {
          from: "visitor",
          text: "Automating enquiries. Tuesday or Thursday works.",
        },
      ],
      fields: [
        { label: "Service", value: "Automation consultation" },
        { label: "Time", value: "After 16:00" },
        { label: "Days", value: "Tuesday or Thursday" },
        { label: "Next step", value: "Confirm an available slot" },
      ],
    },
    commerce: {
      tab: "Product selection",
      source: "Viber",
      messages: [
        {
          from: "visitor",
          text: "I need a gift under 3000 UAH with delivery tomorrow.",
        },
        {
          from: "assistant",
          text: "Who is the gift for, and which categories should I definitely avoid? I'll check options within your budget.",
        },
        {
          from: "visitor",
          text: "For a man, no alcohol. Preferably something practical.",
        },
      ],
      fields: [
        { label: "Task", value: "Gift for a man" },
        { label: "Budget", value: "Up to 3000 UAH" },
        { label: "Constraints", value: "No alcohol, delivery tomorrow" },
        { label: "Preference", value: "Practical gift" },
      ],
    },
  },
};

const scenarioKeys: ScenarioKey[] = ["lead", "support", "booking", "commerce"];
const capabilityIcons = [
  UserCheck,
  Headphones,
  ClipboardCheck,
  ShoppingBag,
  Workflow,
  Route,
];
const caseIcons = [Workflow, Hotel, Route, Building2];

export function AutomationPortfolioPage() {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const t = copy[locale] || copy.ua;
  const [active, setActive] = useState<ScenarioKey>("lead");
  const [demoOpened, setDemoOpened] = useState(false);
  const [seen, setSeen] = useState<ScenarioKey[]>(["lead"]);
  const [demoDone, setDemoDone] = useState(false);
  const scenario = t.scenarios[active];

  const openDemo = () => {
    if (demoOpened) return;
    setDemoOpened(true);
    track("demo_open", { locale, page: "automation" });
  };

  const selectScenario = (key: ScenarioKey) => {
    setActive(key);
    track("scenario_select", { locale, scenario: key });
    openDemo();
    setSeen((prev) => {
      if (prev.includes(key)) return prev;
      const next = [...prev, key];
      // "demo_complete" once the visitor has genuinely explored the demo.
      if (!demoDone && next.length >= 3) {
        setDemoDone(true);
        track("demo_complete", { locale, page: "automation" });
      }
      return next;
    });
  };

  const statusStyles: Record<
    "real" | "prototype" | "pilot" | "dev",
    { cls: string; label: string }
  > = {
    real: {
      cls: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
      label: t.realProject,
    },
    pilot: {
      cls: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
      label: t.livePilot,
    },
    prototype: {
      cls: "border-amber-300/25 bg-amber-300/10 text-amber-200",
      label: t.interactivePrototype,
    },
    dev: {
      cls: "border-amber-300/25 bg-amber-300/10 text-amber-200",
      label: t.inDevelopment,
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.14),transparent_45%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="premium-badge mx-auto mb-6 inline-flex items-center gap-2">
                <Bot className="h-4 w-4" /> {t.badge}
              </div>
              <h1 className="mx-auto max-w-5xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                {t.title}
                <span className="gradient-gold-text">{t.accent}</span>
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
                {t.subtitle}
              </p>
              <p className="mt-4 text-sm text-zinc-500">{t.note}</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <RequestDialog
                  intent="automation_portfolio_process_request"
                  title={t.dialogTitle}
                  description={t.dialogDescription}
                  submitLabel={t.dialogSubmit}
                  successTitle={t.dialogSuccessTitle}
                  successMessage={t.dialogSuccessMessage}
                  helpLabel={t.helpLabel}
                  helpPlaceholder={t.helpPlaceholder}
                  showBuildType={false}
                  context={{
                    offer: "AI automation discovery",
                    page: "automation portfolio",
                  }}
                >
                  <Button
                    onClick={() =>
                      track("primary_cta_click", { locale, page: "automation" })
                    }
                    className="premium-button h-12 px-7"
                  >
                    {t.requestCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RequestDialog>
                <a href="#live-demo" onClick={openDemo}>
                  <Button
                    variant="outline"
                    className="h-12 border-amber-300/30 bg-transparent px-7 text-amber-100 hover:bg-amber-300/10"
                  >
                    {t.demoCta}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="live-demo"
          className="section-tint scroll-mt-24 py-20 sm:py-28"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow">{t.demoEyebrow}</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                {t.demoTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                {t.demoText}
              </p>
            </div>
            <div className="mt-10">
              <p className="mb-4 text-center text-sm font-medium text-zinc-500">
                {t.choose}
              </p>
              <div className="mx-auto grid max-w-4xl gap-2 sm:grid-cols-4">
                {scenarioKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectScenario(key)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-medium transition",
                      active === key
                        ? "border-amber-300/50 bg-amber-300/10 text-amber-200"
                        : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white",
                    )}
                  >
                    {t.scenarios[key].tab}
                  </button>
                ))}
              </div>
            </div>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_.92fr]"
            >
              <div className="luxe-card p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 font-medium">
                    <MessageSquare className="h-4 w-4 text-amber-300" />
                    {scenario.tab}
                  </div>
                  <span className="text-xs text-zinc-500">
                    {t.source}: {scenario.source}
                  </span>
                </div>
                <div className="space-y-4">
                  {scenario.messages.map((message, index) => (
                    <div
                      key={`${message.text}-${index}`}
                      className={cn(
                        "flex",
                        message.from === "visitor"
                          ? "justify-end"
                          : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[88%] rounded-2xl px-4 py-3",
                          message.from === "visitor"
                            ? "rounded-br-sm bg-amber-300 text-black"
                            : "rounded-bl-sm border border-white/10 bg-white/[0.05] text-zinc-200",
                        )}
                      >
                        <div
                          className={cn(
                            "mb-1 text-[11px] font-semibold uppercase tracking-wide",
                            message.from === "visitor"
                              ? "text-black/55"
                              : "text-amber-300/70",
                          )}
                        >
                          {message.from === "visitor" ? t.visitor : t.assistant}
                        </div>
                        <p className="text-sm leading-relaxed sm:text-base">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="luxe-card border-amber-300/20 p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4 font-medium">
                  <ClipboardCheck className="h-5 w-5 text-amber-300" />
                  {t.managerGets}
                </div>
                <div className="space-y-3">
                  {scenario.fields.map((field) => (
                    <div
                      key={field.label}
                      className="rounded-xl border border-white/10 bg-black/30 p-4"
                    >
                      <div className="text-xs uppercase tracking-wide text-zinc-500">
                        {field.label}
                      </div>
                      <div className="mt-1 text-sm font-medium text-zinc-100">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                  {t.managerNote}
                </p>
              </div>
            </motion.div>
            <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-zinc-600">
              {t.demoDisclaimer}
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <div className="eyebrow">{t.capabilitiesEyebrow}</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                {t.capabilitiesTitle}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {t.capabilities.map((item, index) => {
                const Icon = capabilityIcons[index];
                return (
                  <div key={item.title} className="luxe-card p-6">
                    <Icon className="h-6 w-6 text-amber-300" />
                    <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-zinc-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-tint py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow">{t.casesEyebrow}</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                {t.casesTitle}
              </h2>
              <p className="mt-5 text-lg text-zinc-400">{t.casesText}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {t.cases.map((item, index) => {
                const Icon = caseIcons[index] ?? Workflow;
                const s = statusStyles[item.status];
                return (
                  <article
                    key={item.title}
                    className="luxe-card flex flex-col p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="h-7 w-7 text-amber-300" />
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium",
                          s.cls,
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-zinc-400">
                      {item.text}
                    </p>
                    <div className="mt-5 flex gap-2 border-t border-white/10 pt-5 text-sm text-zinc-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                      {item.result}
                    </div>
                    {item.href && item.cta && (
                      <a
                        href={item.href}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-amber-200"
                      >
                        {item.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <div className="eyebrow">{t.processEyebrow}</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                {t.processTitle}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {t.process.map((item) => (
                <div key={item.title} className="luxe-card p-6">
                  <h3 className="text-xl font-semibold text-amber-100">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-6 sm:p-8">
              <h3 className="text-xl font-semibold">{t.honestTitle}</h3>
              <p className="mt-3 max-w-4xl leading-relaxed text-zinc-400">
                {t.honestText}
              </p>
            </div>
          </div>
        </section>

        <section className="section-accent py-20 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-semibold sm:text-5xl">
              {t.finalTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-300">
              {t.finalText}
            </p>
            <div className="mt-8">
              <RequestDialog
                intent="automation_portfolio_final_request"
                title={t.dialogTitle}
                description={t.dialogDescription}
                submitLabel={t.dialogSubmit}
                successTitle={t.dialogSuccessTitle}
                successMessage={t.dialogSuccessMessage}
                helpLabel={t.helpLabel}
                helpPlaceholder={t.helpPlaceholder}
                showBuildType={false}
                context={{
                  offer: "AI automation discovery",
                  page: "automation portfolio final CTA",
                }}
              >
                <Button className="premium-button h-12 px-8">
                  {t.requestCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RequestDialog>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
