// Case-study data model + content (EN/UA/RU).
//
// Honesty rules baked in:
//  - Every case carries an explicit `status` (real client / active development /
//    internal live pilot / prototype / concept).
//  - No invented metrics. When verified results don't exist yet, `resultFallback`
//    states that honestly.
//  - Only projects with enough real proof (screenshots or a real working workflow)
//    are listed here. Projects without proof are tracked in MATERIALS_NEEDED.md,
//    not published as empty pages.
import type { Lang } from "@/lib/i18n";

export type CaseStatus =
  | "real_client"
  | "active_development"
  | "internal_pilot"
  | "prototype"
  | "concept";

export const STATUS_LABEL: Record<CaseStatus, Record<Lang, string>> = {
  real_client: {
    en: "Real client project",
    ua: "Реальний клієнтський проєкт",
    ru: "Реальный клиентский проект",
  },
  active_development: {
    en: "In active development",
    ua: "В активній розробці",
    ru: "В активной разработке",
  },
  internal_pilot: {
    en: "Internal live pilot",
    ua: "Внутрішній робочий пілот",
    ru: "Внутренний рабочий пилот",
  },
  prototype: { en: "Prototype", ua: "Прототип", ru: "Прототип" },
  concept: { en: "Concept", ua: "Концепт", ru: "Концепт" },
};

/** Badge tone: green = live/real, amber = in-progress/prototype, blue = concept. */
export const STATUS_TONE: Record<CaseStatus, "green" | "amber" | "blue"> = {
  real_client: "green",
  internal_pilot: "green",
  active_development: "amber",
  prototype: "amber",
  concept: "blue",
};

export interface CaseContent {
  title: string;
  tagline: string;
  projectType: string;
  audience?: string;
  context?: string;
  problem: string;
  process?: string;
  outcome?: string;
  /** Ordered flow nodes rendered as an accessible architecture diagram. */
  architecture?: string[];
  built: string[];
  journey?: string[];
  integrations?: string[];
  /** Localized captions aligned by index to CaseStudy.shots. */
  captions?: string[];
  /** Only set when a verified, sourced metric actually exists. */
  resultVerified?: string;
  /** Honest statement used when result data is not yet available. */
  resultFallback: string;
  scopeNote?: string;
  ctaLabel: string;
}

export interface CaseStudy {
  slug: string;
  status: CaseStatus;
  order: number;
  /** Public image paths (screenshots). Empty for diagram-only cases. */
  shots: string[];
  content: Record<Lang, CaseContent>;
}

/** Localized section headings for the case-study template. */
export const CASE_LABELS: Record<
  Lang,
  {
    work: string;
    allWork: string;
    overview: string;
    projectType: string;
    audience: string;
    context: string;
    problem: string;
    process: string;
    outcome: string;
    architecture: string;
    built: string;
    journey: string;
    integrations: string;
    screens: string;
    result: string;
    status: string;
    honestNote: string;
  }
> = {
  en: {
    work: "Work",
    allWork: "All case studies",
    overview: "Overview",
    projectType: "Project type",
    audience: "Who it's for",
    context: "Context",
    problem: "The business problem",
    process: "Previous / current process",
    outcome: "Desired outcome",
    architecture: "System architecture",
    built: "What was actually built",
    journey: "User journey",
    integrations: "Integrations & tools",
    screens: "Screens",
    result: "Result",
    status: "Status",
    honestNote: "Honest status",
  },
  ua: {
    work: "Роботи",
    allWork: "Усі кейси",
    overview: "Огляд",
    projectType: "Тип проєкту",
    audience: "Для кого",
    context: "Контекст",
    problem: "Бізнес-проблема",
    process: "Попередній / поточний процес",
    outcome: "Бажаний результат",
    architecture: "Архітектура системи",
    built: "Що саме було побудовано",
    journey: "Шлях користувача",
    integrations: "Інтеграції та інструменти",
    screens: "Екрани",
    result: "Результат",
    status: "Статус",
    honestNote: "Чесний статус",
  },
  ru: {
    work: "Работы",
    allWork: "Все кейсы",
    overview: "Обзор",
    projectType: "Тип проекта",
    audience: "Для кого",
    context: "Контекст",
    problem: "Бизнес-проблема",
    process: "Предыдущий / текущий процесс",
    outcome: "Желаемый результат",
    architecture: "Архитектура системы",
    built: "Что именно было построено",
    journey: "Путь пользователя",
    integrations: "Интеграции и инструменты",
    screens: "Экраны",
    result: "Результат",
    status: "Статус",
    honestNote: "Честный статус",
  },
};

export const CASE_STUDIES: CaseStudy[] = [
  // ---------------------------------------------------------------------------
  // FLAGSHIP — Internal live pilot. Diagram-driven (no screenshots of private data).
  // ---------------------------------------------------------------------------
  {
    slug: "sales-copilot",
    status: "internal_pilot",
    order: 1,
    shots: [],
    content: {
      en: {
        title: "AI Lead Acquisition & Sales Copilot System",
        tagline:
          "An end-to-end outbound lead engine with a Telegram Sales Copilot — running as an internal live pilot.",
        projectType: "Outbound lead system + AI sales assistant",
        audience:
          "My own outbound sales operation (internal), and businesses that want a comparable system.",
        context:
          "A system I built and run internally to acquire and manage my own leads. It is an internal live pilot: the full workflow operates end to end in real day-to-day use.",
        problem:
          "Manual outbound is slow and inconsistent: finding relevant companies, cleaning and deduplicating them, writing first messages, timing follow-ups, noticing replies, and remembering the context of each conversation across different channels.",
        process:
          "Previously every step was manual and scattered across tabs, inboxes and notes. Now collection, preparation, outreach queues, follow-up and reply handling run as one connected workflow, with a Sales Copilot on top for live conversations.",
        outcome:
          "Consistent, context-aware outreach where the routine steps are automated and every commercial or technical decision stays under human control.",
        architecture: [
          "Public sources",
          "Filtering & deduplication",
          "Contact enrichment",
          "Manual & email outreach queues",
          "Personalized first contact",
          "Timed follow-up",
          "Reply detection",
          "Sales Copilot",
          "Table matching & public identity check",
          "RAG guidance",
          "CRM memory & status update",
          "Human approval",
        ],
        built: [
          "Relevant companies are collected from public sources, then cleaned, classified and deduplicated.",
          "Websites and public contacts can be enriched to fill in missing details.",
          "Separate operational queues handle manual messaging and email outreach.",
          "First messages and timed follow-ups are prepared from each lead's context.",
          "Gmail workflows send and track email messages.",
          "Incoming replies are detected and classified; generic follow-up stops once a relevant reply arrives.",
          "A Telegram Sales Copilot accepts pasted conversations from social channels, extracts company and contact identifiers, and matches the conversation to the correct row across both lead tables.",
          "Matching can use phone, email, domain, username, aliases and outbound-message similarity; low-confidence identity can be checked against public web evidence.",
          "The Copilot retrieves relevant guidance from Qdrant RAG collections and recommends a reply, the next sales action and internal project guidance.",
          "It updates a simple working status and stores structured CRM context.",
        ],
        journey: [
          "A batch of companies is collected from public sources and cleaned into one deduplicated list.",
          "Missing websites and public contacts are enriched where possible.",
          "Each lead is routed into the manual or email outreach queue.",
          "A personalized first message goes out; timed follow-ups continue until a relevant reply.",
          "When a reply arrives on a social channel, the conversation is pasted into the Telegram Copilot.",
          "The Copilot identifies the company/contact, matches the correct row, pulls RAG guidance, and proposes a reply and next action.",
          "The human reviews and sends; working status and CRM context are updated.",
        ],
        integrations: ["n8n", "Google Sheets", "Gmail", "Telegram", "OpenAI", "Qdrant"],
        resultFallback:
          "The system is operating as an internal live pilot. The current proof is the working end-to-end workflow and real operational use; commercial performance metrics are still being collected.",
        scopeNote:
          "Social-channel replies stay human-reviewed. Ambiguous, commercial and technical commitments remain under human control. No private lead data, messages or credentials are shown.",
        ctaLabel: "Discuss a system like this",
      },
      ua: {
        title: "AI-система залучення лідів і Sales Copilot",
        tagline:
          "Наскрізний рушій вихідних лідів із Telegram Sales Copilot — працює як внутрішній робочий пілот.",
        projectType: "Система вихідних лідів + AI-асистент продажів",
        audience:
          "Мій власний вихідний продаж (внутрішньо) і бізнеси, яким потрібна схожа система.",
        context:
          "Систему я побудував і використовую внутрішньо для залучення та ведення власних лідів. Це внутрішній робочий пілот: увесь процес працює наскрізно в реальному щоденному використанні.",
        problem:
          "Ручний вихідний процес повільний і непослідовний: знайти релевантні компанії, очистити й дедуплікувати їх, написати перші повідомлення, розрахувати час фолоу-апів, помітити відповіді та пам'ятати контекст кожної розмови в різних каналах.",
        process:
          "Раніше кожен крок був ручним і розкиданим по вкладках, поштах і нотатках. Тепер збір, підготовка, черги розсилки, фолоу-ап і обробка відповідей працюють як один зв'язаний процес, а зверху — Sales Copilot для живих розмов.",
        outcome:
          "Послідовна вихідна комунікація з урахуванням контексту, де рутинні кроки автоматизовані, а кожне комерційне чи технічне рішення лишається під контролем людини.",
        architecture: [
          "Публічні джерела",
          "Фільтрація та дедуплікація",
          "Збагачення контактів",
          "Черги ручної та email-розсилки",
          "Персоналізований перший контакт",
          "Фолоу-ап за таймінгом",
          "Виявлення відповідей",
          "Sales Copilot",
          "Зіставлення в таблицях і перевірка публічної ідентичності",
          "Підказки з RAG",
          "Пам'ять CRM і оновлення статусу",
          "Погодження людиною",
        ],
        built: [
          "Релевантні компанії збираються з публічних джерел, далі очищуються, класифікуються та дедуплікуються.",
          "Сайти й публічні контакти можуть збагачуватися, щоб доповнити відсутні дані.",
          "Окремі операційні черги ведуть ручні повідомлення та email-розсилку.",
          "Перші повідомлення й фолоу-апи за таймінгом готуються з контексту кожного ліда.",
          "Процеси на базі Gmail надсилають і відстежують email-повідомлення.",
          "Вхідні відповіді виявляються та класифікуються; загальний фолоу-ап зупиняється після релевантної відповіді.",
          "Telegram Sales Copilot приймає вставлені розмови із соцканалів, витягує ідентифікатори компанії та контакту й зіставляє розмову з правильним рядком у двох таблицях лідів.",
          "Зіставлення може використовувати телефон, email, домен, юзернейм, аліаси та схожість вихідних повідомлень; за низької впевненості ідентичність перевіряється за публічними веб-даними.",
          "Copilot дістає релевантні підказки з колекцій Qdrant RAG і рекомендує відповідь, наступну дію в продажах і внутрішні орієнтири по проєкту.",
          "Він оновлює простий робочий статус і зберігає структурований контекст CRM.",
        ],
        journey: [
          "Партія компаній збирається з публічних джерел і зводиться в один дедуплікований список.",
          "Відсутні сайти й публічні контакти збагачуються, де можливо.",
          "Кожен лід маршрутизується в чергу ручної або email-розсилки.",
          "Виходить персоналізоване перше повідомлення; фолоу-апи за таймінгом тривають до релевантної відповіді.",
          "Коли відповідь надходить у соцканалі, розмова вставляється в Telegram Copilot.",
          "Copilot визначає компанію/контакт, зіставляє потрібний рядок, дістає підказки RAG і пропонує відповідь і наступну дію.",
          "Людина переглядає й надсилає; робочий статус і контекст CRM оновлюються.",
        ],
        integrations: ["n8n", "Google Sheets", "Gmail", "Telegram", "OpenAI", "Qdrant"],
        resultFallback:
          "Система працює як внутрішній робочий пілот. Поточний доказ — робочий наскрізний процес і реальне операційне використання; комерційні показники ефективності ще збираються.",
        scopeNote:
          "Відповіді в соцканалах лишаються під переглядом людини. Неоднозначні, комерційні й технічні зобов'язання лишаються під контролем людини. Приватні дані лідів, повідомлення та облікові дані не показуються.",
        ctaLabel: "Обговорити подібну систему",
      },
      ru: {
        title: "AI-система привлечения лидов и Sales Copilot",
        tagline:
          "Сквозной движок исходящих лидов с Telegram Sales Copilot — работает как внутренний рабочий пилот.",
        projectType: "Система исходящих лидов + AI-ассистент продаж",
        audience:
          "Мои собственные исходящие продажи (внутренне) и бизнесы, которым нужна похожая система.",
        context:
          "Систему я построил и использую внутренне для привлечения и ведения собственных лидов. Это внутренний рабочий пилот: весь процесс работает сквозным образом в реальном ежедневном использовании.",
        problem:
          "Ручной исходящий процесс медленный и непоследовательный: найти релевантные компании, очистить и дедуплицировать их, написать первые сообщения, рассчитать тайминг фоллоу-апов, заметить ответы и помнить контекст каждого диалога в разных каналах.",
        process:
          "Раньше каждый шаг был ручным и разбросанным по вкладкам, почтам и заметкам. Теперь сбор, подготовка, очереди рассылки, фоллоу-ап и обработка ответов работают как один связанный процесс, а сверху — Sales Copilot для живых диалогов.",
        outcome:
          "Последовательная исходящая коммуникация с учётом контекста, где рутинные шаги автоматизированы, а каждое коммерческое или техническое решение остаётся под контролем человека.",
        architecture: [
          "Публичные источники",
          "Фильтрация и дедупликация",
          "Обогащение контактов",
          "Очереди ручной и email-рассылки",
          "Персонализированный первый контакт",
          "Фоллоу-ап по таймингу",
          "Обнаружение ответов",
          "Sales Copilot",
          "Сопоставление в таблицах и проверка публичной идентичности",
          "Подсказки из RAG",
          "Память CRM и обновление статуса",
          "Согласование человеком",
        ],
        built: [
          "Релевантные компании собираются из публичных источников, затем очищаются, классифицируются и дедуплицируются.",
          "Сайты и публичные контакты могут обогащаться, чтобы дополнить недостающие данные.",
          "Отдельные операционные очереди ведут ручные сообщения и email-рассылку.",
          "Первые сообщения и фоллоу-апы по таймингу готовятся из контекста каждого лида.",
          "Процессы на базе Gmail отправляют и отслеживают email-сообщения.",
          "Входящие ответы обнаруживаются и классифицируются; общий фоллоу-ап останавливается после релевантного ответа.",
          "Telegram Sales Copilot принимает вставленные диалоги из соцканалов, извлекает идентификаторы компании и контакта и сопоставляет диалог с правильной строкой в двух таблицах лидов.",
          "Сопоставление может использовать телефон, email, домен, юзернейм, алиасы и схожесть исходящих сообщений; при низкой уверенности идентичность проверяется по публичным веб-данным.",
          "Copilot достаёт релевантные подсказки из коллекций Qdrant RAG и рекомендует ответ, следующее действие в продажах и внутренние ориентиры по проекту.",
          "Он обновляет простой рабочий статус и хранит структурированный контекст CRM.",
        ],
        journey: [
          "Партия компаний собирается из публичных источников и сводится в один дедуплицированный список.",
          "Недостающие сайты и публичные контакты обогащаются, где возможно.",
          "Каждый лид маршрутизируется в очередь ручной или email-рассылки.",
          "Выходит персонализированное первое сообщение; фоллоу-апы по таймингу продолжаются до релевантного ответа.",
          "Когда ответ приходит в соцканале, диалог вставляется в Telegram Copilot.",
          "Copilot определяет компанию/контакт, сопоставляет нужную строку, достаёт подсказки RAG и предлагает ответ и следующее действие.",
          "Человек проверяет и отправляет; рабочий статус и контекст CRM обновляются.",
        ],
        integrations: ["n8n", "Google Sheets", "Gmail", "Telegram", "OpenAI", "Qdrant"],
        resultFallback:
          "Система работает как внутренний рабочий пилот. Текущее доказательство — работающий сквозной процесс и реальное операционное использование; коммерческие показатели эффективности всё ещё собираются.",
        scopeNote:
          "Ответы в соцканалах остаются под проверкой человека. Неоднозначные, коммерческие и технические обязательства остаются под контролем человека. Приватные данные лидов, сообщения и учётные данные не показываются.",
        ctaLabel: "Обсудить похожую систему",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Web platform / marketplace — active development (real screenshots).
  // ---------------------------------------------------------------------------
  {
    slug: "tutorivo",
    status: "active_development",
    order: 2,
    shots: [
      "/case-studies/tutorivo/home.webp",
      "/case-studies/tutorivo/catalog.webp",
      "/case-studies/tutorivo/become-tutor.webp",
      "/case-studies/tutorivo/admin.webp",
    ],
    content: {
      en: {
        title: "Tutorivo",
        tagline: "Marketplace platform · Education",
        projectType: "Web platform / marketplace",
        context:
          "A tutor marketplace I designed and built in a multilingual structure, ready to onboard users and take payments. Currently in development.",
        problem:
          "Tutors and students were scattered across chats and spreadsheets — no single place to browse tutors, apply to teach, package lessons and manage requests.",
        outcome:
          "It turns a messy, manual process into one platform — a real product ready to onboard users and take payments, not a brochure site.",
        built: [
          "Searchable tutor catalog",
          "“Become a tutor” application",
          "Admin review / moderation layer",
          "Lesson-package logic",
          "Multilingual structure",
        ],
        integrations: ["Next.js", "Tailwind", "Multilingual", "Admin", "Payments"],
        captions: ["Home", "Tutor catalog", "Become a tutor", "Admin review"],
        resultFallback:
          "This build is in active development. The current proof is the working platform and real screenshots; usage and results data are not published yet.",
        ctaLabel: "Request a platform like this",
      },
      ua: {
        title: "Tutorivo",
        tagline: "Платформа-маркетплейс · Освіта",
        projectType: "Веб-платформа / маркетплейс",
        context:
          "Маркетплейс репетиторів, який я спроєктував і побудував у багатомовній структурі, готовий приймати користувачів і оплати. Наразі в розробці.",
        problem:
          "Репетитори та учні були розкидані по чатах і таблицях — не було єдиного місця, щоб шукати репетиторів, подавати заявку на викладання, формувати пакети уроків і керувати запитами.",
        outcome:
          "Перетворює хаотичний ручний процес на одну платформу — реальний продукт, готовий приймати користувачів і оплати, а не сайт-візитку.",
        built: [
          "Пошуковий каталог репетиторів",
          "Заявка «стати репетитором»",
          "Шар адмін-модерації",
          "Логіка пакетів уроків",
          "Багатомовна структура",
        ],
        integrations: ["Next.js", "Tailwind", "Багатомовність", "Адмінка", "Оплати"],
        captions: ["Головна", "Каталог репетиторів", "Стати репетитором", "Адмін-модерація"],
        resultFallback:
          "Цей білд в активній розробці. Поточний доказ — робоча платформа та справжні скриншоти; дані про використання й результати ще не публікуються.",
        ctaLabel: "Замовити подібну платформу",
      },
      ru: {
        title: "Tutorivo",
        tagline: "Платформа-маркетплейс · Образование",
        projectType: "Веб-платформа / маркетплейс",
        context:
          "Маркетплейс репетиторов, который я спроектировал и построил в многоязычной структуре, готовый принимать пользователей и оплаты. Сейчас в разработке.",
        problem:
          "Репетиторы и ученики были разбросаны по чатам и таблицам — не было единого места, чтобы искать репетиторов, подавать заявку на преподавание, формировать пакеты уроков и управлять запросами.",
        outcome:
          "Превращает хаотичный ручной процесс в одну платформу — реальный продукт, готовый принимать пользователей и оплаты, а не сайт-визитку.",
        built: [
          "Поисковый каталог репетиторов",
          "Заявка «стать репетитором»",
          "Слой админ-модерации",
          "Логика пакетов уроков",
          "Многоязычная структура",
        ],
        integrations: ["Next.js", "Tailwind", "Многоязычность", "Админка", "Оплаты"],
        captions: ["Главная", "Каталог репетиторов", "Стать репетитором", "Админ-модерация"],
        resultFallback:
          "Этот билд в активной разработке. Текущее доказательство — работающая платформа и реальные скриншоты; данные об использовании и результатах пока не публикуются.",
        ctaLabel: "Заказать похожую платформу",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Auto-dealer lead platform — prototype (real screenshots). Live interactive
  // version is the /auto-dealers demo.
  // ---------------------------------------------------------------------------
  {
    slug: "status-auto",
    status: "prototype",
    order: 3,
    shots: [
      "/case-studies/status-auto/home.webp",
      "/case-studies/status-auto/catalog.webp",
      "/case-studies/status-auto/form.webp",
    ],
    content: {
      en: {
        title: "Status Auto",
        tagline: "Auto dealer · Lead platform",
        projectType: "Web platform + lead capture (prototype)",
        context:
          "An auto-dealer lead-platform prototype: premium inventory presentation and a buyer request flow wired for instant response.",
        problem:
          "A dealership needed to present inventory well and turn online interest into real buyer enquiries instead of losing them to slow replies.",
        outcome:
          "It shows the full path from browsing a car to a booked enquiry — exactly the infrastructure a dealer needs to stop leaking leads.",
        built: [
          "Premium inventory presentation",
          "Vehicle catalog",
          "Buyer request / consultation flow wired for instant response",
        ],
        integrations: ["Next.js", "Catalog / inventory", "Lead capture", "Automation"],
        captions: ["Home", "Inventory", "Buyer request"],
        resultFallback:
          "This is a prototype, not a claimed completed dealership deployment. The live, interactive version of this concept is the Auto Dealers demo on this site.",
        scopeNote:
          "Prototype build. The interactive, configurable version is the Auto Dealers page and its live demo.",
        ctaLabel: "Discuss a dealer system",
      },
      ua: {
        title: "Status Auto",
        tagline: "Автодилер · Платформа лідів",
        projectType: "Веб-платформа + захоплення лідів (прототип)",
        context:
          "Прототип платформи лідів для автодилера: преміальна презентація автопарку та потік запиту покупця, налаштований на миттєву відповідь.",
        problem:
          "Дилерству потрібно було гарно презентувати автопарк і перетворювати онлайн-інтерес на реальні запити покупців, а не втрачати їх через повільні відповіді.",
        outcome:
          "Показує весь шлях від перегляду авто до записаного запиту — саме та інфраструктура, яка потрібна дилеру, щоб не зливати лідів.",
        built: [
          "Преміальна презентація автопарку",
          "Каталог авто",
          "Потік запиту / консультації покупця з миттєвою відповіддю",
        ],
        integrations: ["Next.js", "Каталог / автопарк", "Захоплення лідів", "Автоматизація"],
        captions: ["Головна", "Автопарк", "Запит покупця"],
        resultFallback:
          "Це прототип, а не заявлене завершене впровадження в дилерстві. Жива інтерактивна версія цієї концепції — демо на сторінці «Автодилери».",
        scopeNote:
          "Прототип. Інтерактивна, налаштовувана версія — сторінка «Автодилери» та її живе демо.",
        ctaLabel: "Обговорити систему для дилера",
      },
      ru: {
        title: "Status Auto",
        tagline: "Автодилер · Платформа лидов",
        projectType: "Веб-платформа + захват лидов (прототип)",
        context:
          "Прототип платформы лидов для автодилера: премиальная презентация автопарка и поток запроса покупателя, настроенный на мгновенный ответ.",
        problem:
          "Дилерству нужно было хорошо презентовать автопарк и превращать онлайн-интерес в реальные запросы покупателей, а не терять их из-за медленных ответов.",
        outcome:
          "Показывает весь путь от просмотра авто до записанного запроса — именно та инфраструктура, которая нужна дилеру, чтобы не сливать лидов.",
        built: [
          "Премиальная презентация автопарка",
          "Каталог авто",
          "Поток запроса / консультации покупателя с мгновенным ответом",
        ],
        integrations: ["Next.js", "Каталог / автопарк", "Захват лидов", "Автоматизация"],
        captions: ["Главная", "Автопарк", "Запрос покупателя"],
        resultFallback:
          "Это прототип, а не заявленное завершённое внедрение в дилерстве. Живая интерактивная версия этой концепции — демо на странице «Автодилеры».",
        scopeNote:
          "Прототип. Интерактивная, настраиваемая версия — страница «Автодилеры» и её живое демо.",
        ctaLabel: "Обсудить систему для дилера",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // AI assistant product — active development, build in public (real screenshots).
  // ---------------------------------------------------------------------------
  {
    slug: "turbotaai",
    status: "active_development",
    order: 4,
    shots: [
      "/case-studies/turbotaai/home.webp",
      "/case-studies/turbotaai/video.webp",
      "/case-studies/turbotaai/pricing.webp",
    ],
    content: {
      en: {
        title: "TurbotaAI",
        tagline: "AI product · Build in public",
        projectType: "AI assistant product",
        context:
          "An AI assistant product built in public — a chat / voice / video experience with accounts and subscriptions.",
        problem:
          "Building an AI assistant product means proving the chat / voice / video experience, accounts and subscriptions actually fit together.",
        outcome:
          "It's proof I build full AI products end to end — real UX, real accounts, real billing, not just a demo.",
        built: [
          "Chat / voice / video experience",
          "Access profile & accounts",
          "Subscription / pricing logic",
        ],
        integrations: ["Next.js", "AI assistant", "Auth / profiles", "Subscriptions"],
        captions: ["Home", "Video experience", "Pricing & access"],
        resultFallback:
          "This product is in active development, built in public. The current proof is the working experience and real screenshots; adoption and results data are not published yet.",
        ctaLabel: "Discuss an AI product",
      },
      ua: {
        title: "TurbotaAI",
        tagline: "AI-продукт · Build in public",
        projectType: "AI-асистент як продукт",
        context:
          "AI-асистент як продукт у форматі build-in-public — досвід чату / голосу / відео з акаунтами та підписками.",
        problem:
          "Побудова AI-продукту означає довести, що досвід чату / голосу / відео, акаунти й підписки справді працюють разом.",
        outcome:
          "Доказ, що я будую повноцінні AI-продукти від початку до кінця — реальний UX, акаунти й білінг, а не лише демо.",
        built: [
          "Досвід чату / голосу / відео",
          "Профіль доступу та акаунти",
          "Логіка підписки / тарифів",
        ],
        integrations: ["Next.js", "AI-асистент", "Авторизація / профілі", "Підписки"],
        captions: ["Головна", "Відео-досвід", "Тарифи й доступ"],
        resultFallback:
          "Цей продукт в активній розробці, у форматі build-in-public. Поточний доказ — робочий досвід і справжні скриншоти; дані про використання й результати ще не публікуються.",
        ctaLabel: "Обговорити AI-продукт",
      },
      ru: {
        title: "TurbotaAI",
        tagline: "AI-продукт · Build in public",
        projectType: "AI-ассистент как продукт",
        context:
          "AI-ассистент как продукт в формате build-in-public — опыт чата / голоса / видео с аккаунтами и подписками.",
        problem:
          "Построение AI-продукта означает доказать, что опыт чата / голоса / видео, аккаунты и подписки реально работают вместе.",
        outcome:
          "Доказательство, что я строю полноценные AI-продукты от начала до конца — реальный UX, аккаунты и биллинг, а не только демо.",
        built: [
          "Опыт чата / голоса / видео",
          "Профиль доступа и аккаунты",
          "Логика подписки / тарифов",
        ],
        integrations: ["Next.js", "AI-ассистент", "Авторизация / профили", "Подписки"],
        captions: ["Главная", "Видео-опыт", "Тарифы и доступ"],
        resultFallback:
          "Этот продукт в активной разработке, в формате build-in-public. Текущее доказательство — работающий опыт и реальные скриншоты; данные о внедрении и результатах пока не публикуются.",
        ctaLabel: "Обсудить AI-продукт",
      },
    },
  },
];

/** Slugs, in display order, for sitemap + static params + internal linking. */
export const CASE_STUDY_SLUGS = CASE_STUDIES.slice()
  .sort((a, b) => a.order - b.order)
  .map((c) => c.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function orderedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.slice().sort((a, b) => a.order - b.order);
}
