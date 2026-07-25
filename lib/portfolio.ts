// Client-facing portfolio + AI-product-development data (EN/UA/RU).
// Self-contained (no dependency on other feature modules) so it drops cleanly
// onto production main.
//
// Honesty rules:
//  - Every project carries an explicit build-stage status.
//  - No invented metrics, revenue, conversion, user counts or launch results.
//  - A capability is listed only where it genuinely exists.
//  - Screenshots are referenced only where the file really exists in /public;
//    projects without assets render without a screenshot (tracked as missing).
import { type Lang, langHref } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export type Status =
  | "real_client"
  | "active_development"
  | "in_development"
  | "prototype";

export const STATUS_LABEL: Record<Status, Record<Lang, string>> = {
  real_client: { en: "Live client project", ua: "Живий клієнтський проєкт", ru: "Живой клиентский проект" },
  active_development: { en: "In active development", ua: "В активній розробці", ru: "В активной разработке" },
  in_development: { en: "In development", ua: "У розробці", ru: "В разработке" },
  prototype: { en: "Prototype", ua: "Прототип", ru: "Прототип" },
};

export const STATUS_TONE: Record<Status, "green" | "amber"> = {
  real_client: "green",
  active_development: "amber",
  in_development: "amber",
  prototype: "amber",
};

export type Category = "ai_products" | "web_platforms" | "automation";

export const CATEGORY_ORDER: Category[] = ["ai_products", "web_platforms", "automation"];

export const CATEGORY_LABEL: Record<Category, Record<Lang, string>> = {
  ai_products: { en: "AI products & platforms", ua: "AI-продукти та платформи", ru: "AI-продукты и платформы" },
  web_platforms: {
    en: "Web platforms & conversion pages",
    ua: "Веб-платформи та конверсійні сторінки",
    ru: "Веб-платформы и конверсионные страницы",
  },
  automation: { en: "Automation systems", ua: "Системи автоматизації", ru: "Системы автоматизации" },
};

export interface CardContent {
  name: string;
  type: string;
  problem: string;
  built: string;
  capabilities: string[];
  caption?: string;
}

export interface PortfolioCard {
  key: string;
  category: Category;
  status: Status;
  /** Slug of a /work/[slug] detail page, when one exists. */
  caseSlug?: string;
  /** Public "View live project" URL — only for genuinely live public projects. */
  liveUrl?: string;
  /** Screenshot paths (empty when no real asset exists yet). */
  shots: string[];
  content: Record<Lang, CardContent>;
}

export const PORTFOLIO: PortfolioCard[] = [
  {
    key: "turbotaai",
    category: "ai_products",
    status: "active_development",
    shots: ["/case-studies/turbotaai/home.webp"],
    content: {
      en: {
        name: "TurbotaAI",
        type: "AI assistant product · Build in public",
        problem: "An AI assistant product has to prove that chat / voice / video, accounts and subscriptions fit together.",
        built: "A chat / voice / video experience with an access profile and subscription / pricing logic.",
        capabilities: ["User accounts", "Subscriptions & payments", "AI logic", "Mobile release"],
        caption: "TurbotaAI — home",
      },
      ua: {
        name: "TurbotaAI",
        type: "AI-асистент як продукт · Build in public",
        problem: "AI-продукт має довести, що чат / голос / відео, акаунти та підписки працюють разом.",
        built: "Досвід чату / голосу / відео з профілем доступу та логікою підписки / тарифів.",
        capabilities: ["Акаунти", "Підписки й оплати", "AI-логіка", "Реліз у сторах"],
        caption: "TurbotaAI — головна",
      },
      ru: {
        name: "TurbotaAI",
        type: "AI-ассистент как продукт · Build in public",
        problem: "AI-продукт должен доказать, что чат / голос / видео, аккаунты и подписки работают вместе.",
        built: "Опыт чата / голоса / видео с профилем доступа и логикой подписки / тарифов.",
        capabilities: ["Аккаунты", "Подписки и оплаты", "AI-логика", "Релиз в сторах"],
        caption: "TurbotaAI — главная",
      },
    },
  },
  {
    key: "ikorka",
    category: "ai_products",
    status: "prototype",
    shots: [],
    content: {
      en: {
        name: "Ikorka AI Voice Assistant",
        type: "Voice AI",
        problem: "Calls go unanswered and callers aren't routed to the right place fast enough.",
        built: "A voice assistant that answers and routes callers in natural speech — with a working audio demo.",
        capabilities: ["Voice AI", "Call answering", "Call routing"],
      },
      ua: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовий AI",
        problem: "Дзвінки лишаються без відповіді, а тих, хто телефонує, не встигають скерувати куди треба.",
        built: "Голосовий асистент, що відповідає й маршрутизує дзвінки природним мовленням — зі справжнім аудіодемо.",
        capabilities: ["Голосовий AI", "Відповіді на дзвінки", "Маршрутизація"],
      },
      ru: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовой AI",
        problem: "Звонки остаются без ответа, а звонящих не успевают направить куда нужно.",
        built: "Голосовой ассистент, отвечающий и маршрутизирующий звонки естественной речью — с реальным аудиодемо.",
        capabilities: ["Голосовой AI", "Ответы на звонки", "Маршрутизация"],
      },
    },
  },
  {
    key: "ser-crypto",
    category: "web_platforms",
    status: "real_client",
    caseSlug: "ser-crypto",
    liveUrl: "https://landing.ser-crypto.com/",
    shots: ["/case-studies/ser-crypto/system.png"],
    content: {
      en: {
        name: "SerCrypto Academy",
        type: "Conversion landing · Web platform",
        problem: "The brand needed a clear public landing that presents its offer and routes visitors toward registration.",
        built: "A responsive public landing: information architecture, offer and pricing/access presentation, and a conversion route to registration.",
        capabilities: ["Landing IA", "Responsive web", "Offer presentation", "Conversion route"],
        caption: "SerCrypto Academy — landing hero",
      },
      ua: {
        name: "SerCrypto Academy",
        type: "Конверсійний лендинг · Веб-платформа",
        problem: "Бренду потрібен був зрозумілий публічний лендинг, що презентує пропозицію та веде відвідувачів до реєстрації.",
        built: "Адаптивний публічний лендинг: інформаційна архітектура, презентація пропозиції та тарифів/доступу і конверсійний шлях до реєстрації.",
        capabilities: ["Архітектура лендингу", "Адаптивний веб", "Презентація пропозиції", "Конверсійний шлях"],
        caption: "SerCrypto Academy — головний екран лендингу",
      },
      ru: {
        name: "SerCrypto Academy",
        type: "Конверсионный лендинг · Веб-платформа",
        problem: "Бренду нужен был понятный публичный лендинг, презентующий предложение и ведущий посетителей к регистрации.",
        built: "Адаптивный публичный лендинг: информационная архитектура, презентация предложения и тарифов/доступа и конверсионный путь к регистрации.",
        capabilities: ["Архитектура лендинга", "Адаптивный веб", "Презентация предложения", "Конверсионный путь"],
        caption: "SerCrypto Academy — главный экран лендинга",
      },
    },
  },
  {
    key: "tutorivo",
    category: "web_platforms",
    status: "in_development",
    shots: ["/case-studies/tutorivo/home.webp"],
    content: {
      en: {
        name: "Tutorivo",
        type: "Marketplace web platform · Education",
        problem: "Tutors and students were scattered across chats and spreadsheets — no single place to browse, apply and manage requests.",
        built: "A tutor marketplace: searchable catalog, “become a tutor” application, admin review and lesson-package logic, multilingual.",
        capabilities: ["User accounts", "Payments", "Profiles & roles", "Admin & moderation", "Multilingual"],
        caption: "Tutorivo — home",
      },
      ua: {
        name: "Tutorivo",
        type: "Веб-платформа-маркетплейс · Освіта",
        problem: "Репетитори та учні були розкидані по чатах і таблицях — не було єдиного місця, щоб шукати, подавати заявку й керувати запитами.",
        built: "Маркетплейс репетиторів: пошуковий каталог, заявка «стати репетитором», адмін-модерація та логіка пакетів уроків, багатомовність.",
        capabilities: ["Акаунти", "Оплати", "Профілі й ролі", "Адмін і модерація", "Багатомовність"],
        caption: "Tutorivo — головна",
      },
      ru: {
        name: "Tutorivo",
        type: "Веб-платформа-маркетплейс · Образование",
        problem: "Репетиторы и ученики были разбросаны по чатам и таблицам — не было единого места, чтобы искать, подавать заявку и управлять запросами.",
        built: "Маркетплейс репетиторов: поисковый каталог, заявка «стать репетитором», админ-модерация и логика пакетов уроков, многоязычность.",
        capabilities: ["Аккаунты", "Оплаты", "Профили и роли", "Админ и модерация", "Многоязычность"],
        caption: "Tutorivo — главная",
      },
    },
  },
  {
    key: "leather-clinic",
    category: "web_platforms",
    status: "in_development",
    shots: [],
    content: {
      en: {
        name: "Leather Clinic",
        type: "Website · Local specialist service",
        problem: "A specialist local service needed a clean, premium site that turns visitors into enquiries.",
        built: "A premium website for a specialist service, structured to convert visitors into enquiries.",
        capabilities: ["Business website", "Enquiry conversion"],
      },
      ua: {
        name: "Leather Clinic",
        type: "Сайт · Локальний спеціалізований сервіс",
        problem: "Спеціалізованому локальному сервісу потрібен був чистий преміальний сайт, що перетворює відвідувачів на запити.",
        built: "Преміальний сайт для спеціалізованого сервісу, побудований, щоб перетворювати відвідувачів на запити.",
        capabilities: ["Бізнес-сайт", "Конверсія в запити"],
      },
      ru: {
        name: "Leather Clinic",
        type: "Сайт · Локальный специализированный сервис",
        problem: "Специализированному локальному сервису нужен был чистый премиальный сайт, превращающий посетителей в запросы.",
        built: "Премиальный сайт для специализированного сервиса, построенный, чтобы превращать посетителей в запросы.",
        capabilities: ["Бизнес-сайт", "Конверсия в запросы"],
      },
    },
  },
  {
    key: "status-auto",
    category: "web_platforms",
    status: "prototype",
    shots: ["/case-studies/status-auto/home.webp"],
    content: {
      en: {
        name: "Status Auto",
        type: "Auto-dealer lead platform",
        problem: "A dealership needed to present inventory well and turn online interest into buyer enquiries instead of losing them to slow replies.",
        built: "Premium inventory presentation, a vehicle catalog and a buyer request / consultation flow wired for instant response.",
        capabilities: ["Inventory / catalog", "Lead capture", "Instant-response flow"],
        caption: "Status Auto — home",
      },
      ua: {
        name: "Status Auto",
        type: "Платформа лідів для автодилера",
        problem: "Дилерству потрібно було гарно презентувати автопарк і перетворювати онлайн-інтерес на запити покупців, а не втрачати їх через повільні відповіді.",
        built: "Преміальна презентація автопарку, каталог авто та потік запиту / консультації покупця з миттєвою відповіддю.",
        capabilities: ["Каталог / автопарк", "Захоплення лідів", "Миттєва відповідь"],
        caption: "Status Auto — головна",
      },
      ru: {
        name: "Status Auto",
        type: "Платформа лидов для автодилера",
        problem: "Дилерству нужно было хорошо презентовать автопарк и превращать онлайн-интерес в запросы покупателей, а не терять их из-за медленных ответов.",
        built: "Премиальная презентация автопарка, каталог авто и поток запроса / консультации покупателя с мгновенным ответом.",
        capabilities: ["Каталог / автопарк", "Захват лидов", "Мгновенный ответ"],
        caption: "Status Auto — главная",
      },
    },
  },
  {
    key: "dating-crm",
    category: "automation",
    status: "in_development",
    shots: [],
    content: {
      en: {
        name: "Dating CRM",
        type: "CRM + automation",
        problem: "Conversations went cold because tracking, reminders and follow-up were manual.",
        built: "A CRM with automated tracking, reminders and follow-up so no conversation goes cold.",
        capabilities: ["Communication workflows", "Admin & moderation", "Automated follow-up"],
      },
      ua: {
        name: "Dating CRM",
        type: "CRM + автоматизація",
        problem: "Розмови згасали, бо відстеження, нагадування та фолоу-ап робилися вручну.",
        built: "CRM з автоматичним відстеженням, нагадуваннями та фолоу-апом, щоб жодна розмова не згасала.",
        capabilities: ["Комунікаційні процеси", "Адмін і модерація", "Автоматичний фолоу-ап"],
      },
      ru: {
        name: "Dating CRM",
        type: "CRM + автоматизация",
        problem: "Диалоги угасали, потому что трекинг, напоминания и фоллоу-ап делались вручную.",
        built: "CRM с автоматическим трекингом, напоминаниями и фоллоу-апом, чтобы ни один диалог не угасал.",
        capabilities: ["Коммуникационные процессы", "Админ и модерация", "Автоматический фоллоу-ап"],
      },
    },
  },
];

// ---------------------------------------------------------------------------
// SerCrypto — detail case (the one project with a /work/[slug] detail page).
// ---------------------------------------------------------------------------
export interface CaseDetailContent {
  name: string;
  type: string;
  context: string;
  problem: string;
  built: string[];
  capabilities: string[];
  notClaimed: string[];
  scopeNote: string;
  ctaLabel: string;
  liveLabel: string;
}

export interface CaseDetail {
  slug: string;
  status: Status;
  liveUrl?: string;
  shots: string[];
  captions?: Record<Lang, string[]>;
  content: Record<Lang, CaseDetailContent>;
}

export const CASE_DETAILS: CaseDetail[] = [
  {
    slug: "ser-crypto",
    status: "real_client",
    liveUrl: "https://landing.ser-crypto.com/",
    shots: [
      "/case-studies/ser-crypto/hero.png",
      "/case-studies/ser-crypto/system.png",
      "/case-studies/ser-crypto/pricing.png",
    ],
    captions: {
      en: [
        "Landing hero — offer and registration entry point",
        "System / mechanics section",
        "Packages and pricing presentation",
      ],
      ua: [
        "Головний екран — пропозиція та вхід до реєстрації",
        "Секція системи / механіки",
        "Презентація пакетів і тарифів",
      ],
      ru: [
        "Главный экран — предложение и вход к регистрации",
        "Секция системы / механики",
        "Презентация пакетов и тарифов",
      ],
    },
    content: {
      en: {
        name: "SerCrypto Academy",
        type: "Conversion landing · Web platform",
        context:
          "A live public landing for a crypto-education brand. My scope was the public web experience — not the trading education itself.",
        problem:
          "The brand needed a clear, premium public landing that presents its offer and moves visitors toward registration.",
        built: [
          "Public landing information architecture",
          "Responsive web experience",
          "Offer presentation",
          "Pricing / access presentation",
          "Conversion route to registration",
        ],
        capabilities: ["Landing IA", "Responsive web", "Offer & pricing presentation", "Conversion route"],
        notClaimed: [
          "Trading strategies",
          "The education curriculum",
          "Help4Trade logic",
          "Trading results",
          "Private commercial metrics",
        ],
        scopeNote:
          "Scope is the public landing and its conversion route only. I do not claim authorship of the trading strategies, curriculum, Help4Trade logic, trading results or any private commercial metrics.",
        ctaLabel: "Discuss a landing like this",
        liveLabel: "View live project",
      },
      ua: {
        name: "SerCrypto Academy",
        type: "Конверсійний лендинг · Веб-платформа",
        context:
          "Живий публічний лендинг для бренду крипто-освіти. Мій обсяг — публічний веб-досвід, а не сама торгова освіта.",
        problem:
          "Бренду потрібен був зрозумілий преміальний публічний лендинг, що презентує пропозицію та веде відвідувачів до реєстрації.",
        built: [
          "Інформаційна архітектура лендингу",
          "Адаптивний веб-досвід",
          "Презентація пропозиції",
          "Презентація тарифів / доступу",
          "Конверсійний шлях до реєстрації",
        ],
        capabilities: ["Архітектура лендингу", "Адаптивний веб", "Презентація пропозиції та тарифів", "Конверсійний шлях"],
        notClaimed: [
          "Торгові стратегії",
          "Навчальна програма",
          "Логіка Help4Trade",
          "Торгові результати",
          "Приватні комерційні метрики",
        ],
        scopeNote:
          "Обсяг — лише публічний лендинг і його конверсійний шлях. Я не претендую на авторство торгових стратегій, навчальної програми, логіки Help4Trade, торгових результатів чи будь-яких приватних комерційних метрик.",
        ctaLabel: "Обговорити подібний лендинг",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "SerCrypto Academy",
        type: "Конверсионный лендинг · Веб-платформа",
        context:
          "Живой публичный лендинг для бренда крипто-образования. Мой объём — публичный веб-опыт, а не само торговое образование.",
        problem:
          "Бренду нужен был понятный премиальный публичный лендинг, презентующий предложение и ведущий посетителей к регистрации.",
        built: [
          "Информационная архитектура лендинга",
          "Адаптивный веб-опыт",
          "Презентация предложения",
          "Презентация тарифов / доступа",
          "Конверсионный путь к регистрации",
        ],
        capabilities: ["Архитектура лендинга", "Адаптивный веб", "Презентация предложения и тарифов", "Конверсионный путь"],
        notClaimed: [
          "Торговые стратегии",
          "Учебная программа",
          "Логика Help4Trade",
          "Торговые результаты",
          "Приватные коммерческие метрики",
        ],
        scopeNote:
          "Объём — только публичный лендинг и его конверсионный путь. Я не претендую на авторство торговых стратегий, учебной программы, логики Help4Trade, торговых результатов или каких-либо приватных коммерческих метрик.",
        ctaLabel: "Обсудить похожий лендинг",
        liveLabel: "Открыть живой проект",
      },
    },
  },
];

export function getCaseDetail(slug: string): CaseDetail | undefined {
  return CASE_DETAILS.find((c) => c.slug === slug);
}
export const CASE_DETAIL_SLUGS = CASE_DETAILS.map((c) => c.slug);

/** Portfolio index chrome copy. */
export const PORTFOLIO_UI: Record<
  Lang,
  {
    metaTitle: string;
    metaDesc: string;
    eyebrow: string;
    title: string;
    intro: string;
    viewCase: string;
    requestSimilar: string;
    live: string;
    problemLabel: string;
    builtLabel: string;
    capabilitiesLabel: string;
    productCta: string;
    productCtaBtn: string;
  }
> = {
  en: {
    metaTitle: "Selected Work — client platforms, AI products & systems | Vlad Kuzmenko",
    metaDesc:
      "A focused portfolio of real client builds: AI products and platforms, web platforms and conversion pages, and automation systems. Honest statuses, real screenshots where available.",
    eyebrow: "Selected work",
    title: "Client platforms, AI products and systems",
    intro: "Selected client work across AI products, web platforms and automation — with clear scope, capabilities and current project status.",
    viewCase: "View case",
    requestSimilar: "Request a similar system",
    live: "View live project",
    problemLabel: "Problem",
    builtLabel: "What was built",
    capabilitiesLabel: "Capabilities",
    productCta: "Building a mobile app, SaaS or AI product?",
    productCtaBtn: "See AI product development",
  },
  ua: {
    metaTitle: "Обрані роботи — клієнтські платформи, AI-продукти та системи | Vlad Kuzmenko",
    metaDesc:
      "Сфокусоване портфоліо реальних клієнтських білдів: AI-продукти та платформи, веб-платформи й конверсійні сторінки, системи автоматизації. Чесні статуси, справжні скриншоти, де вони є.",
    eyebrow: "Обрані роботи",
    title: "Клієнтські платформи, AI-продукти та системи",
    intro: "Вибрані клієнтські проєкти в AI, веб-платформах та автоматизації — з чітким обсягом робіт, можливостями й поточним статусом.",
    viewCase: "Відкрити кейс",
    requestSimilar: "Замовити подібну систему",
    live: "Переглянути живий проєкт",
    problemLabel: "Проблема",
    builtLabel: "Що створено",
    capabilitiesLabel: "Можливості",
    productCta: "Робите мобільний застосунок, SaaS або AI-продукт?",
    productCtaBtn: "Дивитися розробку AI-продуктів",
  },
  ru: {
    metaTitle: "Избранные работы — клиентские платформы, AI-продукты и системы | Vlad Kuzmenko",
    metaDesc:
      "Сфокусированное портфолио реальных клиентских билдов: AI-продукты и платформы, веб-платформы и конверсионные страницы, системы автоматизации. Честные статусы, реальные скриншоты, где есть.",
    eyebrow: "Избранные работы",
    title: "Клиентские платформы, AI-продукты и системы",
    intro: "Избранные клиентские проекты в AI, веб-платформах и автоматизации — с понятным объёмом работ, возможностями и текущим статусом.",
    viewCase: "Открыть кейс",
    requestSimilar: "Заказать похожую систему",
    live: "Открыть живой проект",
    problemLabel: "Проблема",
    builtLabel: "Что создано",
    capabilitiesLabel: "Возможности",
    productCta: "Делаете мобильное приложение, SaaS или AI-продукт?",
    productCtaBtn: "Смотреть разработку AI-продуктов",
  },
};

// ---------------------------------------------------------------------------
// AI Product Development — detailed cases (TurbotaAI, Tutorivo, Dating CRM)
// ---------------------------------------------------------------------------
export interface ProductCaseContent {
  name: string;
  context: string;
  problem: string;
  designed: string;
  implemented: string;
  role: string;
  capabilities: string[];
  technologies: string[];
  proves: string;
  captions?: string[];
}
export interface ProductCase {
  key: string;
  status: Status;
  shots: string[];
  content: Record<Lang, ProductCaseContent>;
}

export const PRODUCT_CASES: ProductCase[] = [
  {
    key: "turbotaai",
    status: "active_development",
    shots: ["/case-studies/turbotaai/home.webp", "/case-studies/turbotaai/pricing.webp"],
    content: {
      en: {
        name: "TurbotaAI",
        context: "An AI assistant product built in public — chat, voice and video with accounts and subscriptions.",
        problem: "Prove that a full AI product — chat/voice/video, accounts and paid subscriptions — fits together end to end.",
        designed: "MVP architecture for a multi-modal AI assistant: access profiles, subscription/pricing logic and the AI interaction flow.",
        implemented: "The chat / voice / video experience, an access profile, and subscription / pricing logic, prepared for store release.",
        role: "Vlad led product decomposition, MVP architecture, backend and AI integration, implementation control, QA and the release process; specialist developers are involved when the approved scope requires it.",
        capabilities: ["User accounts", "Subscriptions & payments", "AI logic", "iOS/Android release", "MVP architecture"],
        technologies: ["Next.js", "AI assistant", "Auth / profiles", "Subscriptions"],
        proves: "That an AI product can be taken from concept and architecture through implementation to a store-ready release — real UX, real accounts, real billing.",
        captions: ["TurbotaAI — home", "Pricing & access"],
      },
      ua: {
        name: "TurbotaAI",
        context: "AI-асистент як продукт у форматі build-in-public — чат, голос і відео з акаунтами та підписками.",
        problem: "Довести, що повноцінний AI-продукт — чат/голос/відео, акаунти та платні підписки — працює наскрізно.",
        designed: "MVP-архітектура мультимодального AI-асистента: профілі доступу, логіка підписки/тарифів та потік AI-взаємодії.",
        implemented: "Досвід чату / голосу / відео, профіль доступу та логіка підписки / тарифів, підготовлені до релізу в сторах.",
        role: "Влад вів декомпозицію продукту, MVP-архітектуру, бекенд та інтеграцію AI, контроль реалізації, QA і реліз; профільні розробники залучаються, коли цього вимагає погоджений обсяг.",
        capabilities: ["Акаунти", "Підписки й оплати", "AI-логіка", "Реліз iOS/Android", "MVP-архітектура"],
        technologies: ["Next.js", "AI-асистент", "Авторизація / профілі", "Підписки"],
        proves: "Що AI-продукт можна провести від концепту й архітектури через реалізацію до готового до сторів релізу — реальний UX, акаунти й білінг.",
        captions: ["TurbotaAI — головна", "Тарифи й доступ"],
      },
      ru: {
        name: "TurbotaAI",
        context: "AI-ассистент как продукт в формате build-in-public — чат, голос и видео с аккаунтами и подписками.",
        problem: "Доказать, что полноценный AI-продукт — чат/голос/видео, аккаунты и платные подписки — работает сквозным образом.",
        designed: "MVP-архитектура мультимодального AI-ассистента: профили доступа, логика подписки/тарифов и поток AI-взаимодействия.",
        implemented: "Опыт чата / голоса / видео, профиль доступа и логика подписки / тарифов, подготовленные к релизу в сторах.",
        role: "Влад вёл декомпозицию продукта, MVP-архитектуру, бэкенд и интеграцию AI, контроль реализации, QA и релиз; профильные разработчики привлекаются, когда этого требует согласованный объём.",
        capabilities: ["Аккаунты", "Подписки и оплаты", "AI-логика", "Релиз iOS/Android", "MVP-архитектура"],
        technologies: ["Next.js", "AI-ассистент", "Авторизация / профили", "Подписки"],
        proves: "Что AI-продукт можно провести от концепта и архитектуры через реализацию до готового к сторам релиза — реальный UX, аккаунты и биллинг.",
        captions: ["TurbotaAI — главная", "Тарифы и доступ"],
      },
    },
  },
  {
    key: "tutorivo",
    status: "in_development",
    shots: ["/case-studies/tutorivo/home.webp", "/case-studies/tutorivo/admin.webp"],
    content: {
      en: {
        name: "Tutorivo",
        context: "A multilingual tutor-marketplace web platform, ready to onboard users and take payments.",
        problem: "Turn a messy, manual tutor/student process into one platform with catalog, applications, roles, moderation and payments.",
        designed: "MVP architecture for a two-sided marketplace: catalog and search, a tutor application flow, user roles, an admin/moderation layer, lesson-package and payment logic, multilingual.",
        implemented: "The searchable catalog, the “become a tutor” application, the admin review layer and lesson-package logic across a multilingual structure.",
        role: "Vlad led product decomposition, MVP architecture, backend, implementation control and QA; specialist developers are involved when the approved scope requires it.",
        capabilities: ["User accounts", "Payments", "Profiles & roles", "Admin & moderation", "Multilingual", "MVP architecture"],
        technologies: ["Next.js", "Tailwind", "Multilingual", "Admin", "Payments"],
        proves: "That a real two-sided platform — accounts, roles, moderation and payments — can be architected and built as a product, not a brochure site.",
        captions: ["Tutorivo — home", "Admin review"],
      },
      ua: {
        name: "Tutorivo",
        context: "Багатомовна веб-платформа-маркетплейс репетиторів, готова приймати користувачів і оплати.",
        problem: "Перетворити хаотичний ручний процес репетитор/учень на одну платформу з каталогом, заявками, ролями, модерацією та оплатами.",
        designed: "MVP-архітектура двостороннього маркетплейсу: каталог і пошук, потік заявки репетитора, ролі користувачів, шар адмін-модерації, логіка пакетів уроків і оплат, багатомовність.",
        implemented: "Пошуковий каталог, заявка «стати репетитором», шар адмін-модерації та логіка пакетів уроків у багатомовній структурі.",
        role: "Влад вів декомпозицію продукту, MVP-архітектуру, бекенд, контроль реалізації та QA; профільні розробники залучаються, коли цього вимагає погоджений обсяг.",
        capabilities: ["Акаунти", "Оплати", "Профілі й ролі", "Адмін і модерація", "Багатомовність", "MVP-архітектура"],
        technologies: ["Next.js", "Tailwind", "Багатомовність", "Адмінка", "Оплати"],
        proves: "Що реальну двосторонню платформу — акаунти, ролі, модерація й оплати — можна спроєктувати й побудувати як продукт, а не сайт-візитку.",
        captions: ["Tutorivo — головна", "Адмін-модерація"],
      },
      ru: {
        name: "Tutorivo",
        context: "Многоязычная веб-платформа-маркетплейс репетиторов, готовая принимать пользователей и оплаты.",
        problem: "Превратить хаотичный ручной процесс репетитор/ученик в одну платформу с каталогом, заявками, ролями, модерацией и оплатами.",
        designed: "MVP-архитектура двустороннего маркетплейса: каталог и поиск, поток заявки репетитора, роли пользователей, слой админ-модерации, логика пакетов уроков и оплат, многоязычность.",
        implemented: "Поисковый каталог, заявка «стать репетитором», слой админ-модерации и логика пакетов уроков в многоязычной структуре.",
        role: "Влад вёл декомпозицию продукта, MVP-архитектуру, бэкенд, контроль реализации и QA; профильные разработчики привлекаются, когда этого требует согласованный объём.",
        capabilities: ["Аккаунты", "Оплаты", "Профили и роли", "Админ и модерация", "Многоязычность", "MVP-архитектура"],
        technologies: ["Next.js", "Tailwind", "Многоязычность", "Админка", "Оплаты"],
        proves: "Что реальную двустороннюю платформу — аккаунты, роли, модерация и оплаты — можно спроектировать и построить как продукт, а не сайт-визитку.",
        captions: ["Tutorivo — главная", "Админ-модерация"],
      },
    },
  },
  {
    key: "dating-crm",
    status: "in_development",
    shots: [],
    content: {
      en: {
        name: "Dating CRM",
        context: "A CRM + automation build for a relationship/dating business — not a consumer dating app.",
        problem: "Conversations went cold because tracking, reminders and follow-up were manual and inconsistent.",
        designed: "A CRM data model plus communication and follow-up workflows, with an admin/moderation layer.",
        implemented: "Automated tracking, reminders and follow-up workflows so no conversation goes cold, with admin/moderation.",
        role: "Vlad led the data model, automation workflows and implementation control; specialist developers are involved when the approved scope requires it.",
        capabilities: ["Communication workflows", "Admin & moderation", "Automated follow-up"],
        technologies: ["CRM data model", "Automation workflows"],
        proves: "Experience designing communication workflows, follow-up automation and an admin/moderation layer inside a real operational CRM.",
      },
      ua: {
        name: "Dating CRM",
        context: "Білд CRM + автоматизація для бізнесу у сфері знайомств — не споживчий dating-застосунок.",
        problem: "Розмови згасали, бо відстеження, нагадування та фолоу-ап робилися вручну й непослідовно.",
        designed: "Модель даних CRM плюс комунікаційні та фолоу-ап процеси з шаром адмін-модерації.",
        implemented: "Автоматичне відстеження, нагадування та фолоу-ап процеси, щоб жодна розмова не згасала, з адмін-модерацією.",
        role: "Влад вів модель даних, процеси автоматизації та контроль реалізації; профільні розробники залучаються, коли цього вимагає погоджений обсяг.",
        capabilities: ["Комунікаційні процеси", "Адмін і модерація", "Автоматичний фолоу-ап"],
        technologies: ["Модель даних CRM", "Процеси автоматизації"],
        proves: "Досвід проєктування комунікаційних процесів, автоматизації фолоу-апу та шару адмін-модерації всередині реальної операційної CRM.",
      },
      ru: {
        name: "Dating CRM",
        context: "Билд CRM + автоматизация для бизнеса в сфере знакомств — не потребительское dating-приложение.",
        problem: "Диалоги угасали, потому что трекинг, напоминания и фоллоу-ап делались вручную и непоследовательно.",
        designed: "Модель данных CRM плюс коммуникационные и фоллоу-ап процессы со слоем админ-модерации.",
        implemented: "Автоматический трекинг, напоминания и фоллоу-ап процессы, чтобы ни один диалог не угасал, с админ-модерацией.",
        role: "Влад вёл модель данных, процессы автоматизации и контроль реализации; профильные разработчики привлекаются, когда этого требует согласованный объём.",
        capabilities: ["Коммуникационные процессы", "Админ и модерация", "Автоматический фоллоу-ап"],
        technologies: ["Модель данных CRM", "Процессы автоматизации"],
        proves: "Опыт проектирования коммуникационных процессов, автоматизации фоллоу-апа и слоя админ-модерации внутри реальной операционной CRM.",
      },
    },
  },
];

export const EXPERIENCE_MATRIX: { capability: Record<Lang, string>; projects: string[] }[] = [
  { capability: { en: "User accounts", ua: "Акаунти користувачів", ru: "Аккаунты пользователей" }, projects: ["TurbotaAI", "Tutorivo"] },
  { capability: { en: "Subscriptions & payments", ua: "Підписки й оплати", ru: "Подписки и оплаты" }, projects: ["TurbotaAI", "Tutorivo"] },
  { capability: { en: "AI logic", ua: "AI-логіка", ru: "AI-логика" }, projects: ["TurbotaAI"] },
  { capability: { en: "Profiles & user roles", ua: "Профілі й ролі", ru: "Профили и роли" }, projects: ["Tutorivo"] },
  { capability: { en: "Admin & moderation", ua: "Адмін і модерація", ru: "Админ и модерация" }, projects: ["Tutorivo", "Dating CRM"] },
  { capability: { en: "Communication workflows", ua: "Комунікаційні процеси", ru: "Коммуникационные процессы" }, projects: ["Dating CRM"] },
  { capability: { en: "iOS & Android release", ua: "Реліз iOS та Android", ru: "Релиз iOS и Android" }, projects: ["TurbotaAI"] },
  { capability: { en: "Multilingual structure", ua: "Багатомовна структура", ru: "Многоязычная структура" }, projects: ["Tutorivo"] },
  { capability: { en: "Conversion landing", ua: "Конверсійний лендинг", ru: "Конверсионный лендинг" }, projects: ["SerCrypto Academy"] },
  { capability: { en: "MVP architecture", ua: "MVP-архітектура", ru: "MVP-архитектура" }, projects: ["TurbotaAI", "Tutorivo", "Dating CRM"] },
];

export const APD_UI: Record<
  Lang,
  {
    metaTitle: string;
    metaDesc: string;
    heroTitle: string;
    heroSub: string;
    leadIntro: string;
    accel: string;
    casesEyebrow: string;
    casesTitle: string;
    matrixTitle: string;
    matrixCapability: string;
    matrixProjects: string;
    howTitle: string;
    how: string[];
    ctaTitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    discoveryTitle: string;
    discoveryIntro: string;
    discovery: string[];
    contextLabel: string;
    problemLabel: string;
    designedLabel: string;
    implementedLabel: string;
    roleLabel: string;
    capabilitiesLabel: string;
    techLabel: string;
    provesLabel: string;
  }
> = {
  en: {
    metaTitle: "AI Product Development — mobile apps, SaaS & AI products | Vlad Kuzmenko",
    metaDesc:
      "Mobile apps, SaaS and AI products from concept and architecture to release: product decomposition, architecture, frontend/backend, accounts, payments, AI integrations, QA and release. AI tools accelerate engineering — they don't replace it.",
    heroTitle: "Mobile apps, SaaS and AI products — from concept and architecture to release",
    heroSub:
      "Vlad leads product decomposition, architecture, frontend and backend, authentication and accounts, subscriptions/payments where genuinely supported, AI integrations, QA and release preparation — and coordinates specialists when the scope requires it.",
    leadIntro: "Relevant, real product experience — labelled honestly by build stage, with real screenshots where they exist. No invented metrics or launch results.",
    accel: "AI tools are used to accelerate development — not to replace engineering, architecture or QA.",
    casesEyebrow: "Relevant experience",
    casesTitle: "Product cases",
    matrixTitle: "Relevant experience matrix",
    matrixCapability: "Capability",
    matrixProjects: "Where it was built",
    howTitle: "How I work",
    how: ["Product decomposition", "Architecture", "Frontend & backend", "Authentication & accounts", "AI integrations", "QA & security", "Release preparation"],
    ctaTitle: "Have a mobile app, SaaS or AI product in mind?",
    ctaPrimary: "Discuss your MVP",
    ctaSecondary: "Start with Technical Discovery",
    discoveryTitle: "What Technical Discovery delivers",
    discoveryIntro: "A paid, scoped first step that turns an idea into a concrete plan you own — before committing to full development.",
    discovery: ["MVP boundaries", "User journeys", "System architecture", "Backend & data model", "AI logic", "Integrations", "Security & moderation", "Roadmap", "Timeline", "Final development estimate"],
    contextLabel: "Context",
    problemLabel: "Problem",
    designedLabel: "What was designed",
    implementedLabel: "What was implemented",
    roleLabel: "Vlad's role",
    capabilitiesLabel: "Capabilities",
    techLabel: "Technologies",
    provesLabel: "What this proves",
  },
  ua: {
    metaTitle: "Розробка AI-продуктів — мобільні застосунки, SaaS та AI | Vlad Kuzmenko",
    metaDesc:
      "Мобільні застосунки, SaaS та AI-продукти від концепту й архітектури до релізу: декомпозиція, архітектура, фронтенд/бекенд, акаунти, оплати, AI-інтеграції, QA і реліз. AI-інструменти пришвидшують інженерію — не замінюють її.",
    heroTitle: "Мобільні застосунки, SaaS та AI-продукти — від концепту й архітектури до релізу",
    heroSub:
      "Влад веде декомпозицію продукту, архітектуру, фронтенд і бекенд, автентифікацію та акаунти, підписки/оплати там, де це справді підтримується, AI-інтеграції, QA і підготовку релізу — та координує спеціалістів, коли цього вимагає обсяг.",
    leadIntro: "Релевантний, реальний продуктовий досвід — чесно позначений за етапом, зі справжніми скриншотами, де вони є. Без вигаданих метрик чи результатів запуску.",
    accel: "AI-інструменти використовуються для пришвидшення розробки — не для заміни інженерії, архітектури чи QA.",
    casesEyebrow: "Релевантний досвід",
    casesTitle: "Продуктові кейси",
    matrixTitle: "Матриця релевантного досвіду",
    matrixCapability: "Можливість",
    matrixProjects: "Де це побудовано",
    howTitle: "Як я працюю",
    how: ["Декомпозиція продукту", "Архітектура", "Фронтенд і бекенд", "Автентифікація та акаунти", "AI-інтеграції", "QA і безпека", "Підготовка релізу"],
    ctaTitle: "Маєте на думці застосунок, SaaS або AI-продукт?",
    ctaPrimary: "Обговорити ваш MVP",
    ctaSecondary: "Почати з Technical Discovery",
    discoveryTitle: "Що дає Technical Discovery",
    discoveryIntro: "Платний перший етап з чіткими межами, що перетворює ідею на конкретний план, який належить вам — ще до повної розробки.",
    discovery: ["Межі MVP", "Сценарії користувача", "Архітектура системи", "Бекенд і модель даних", "AI-логіка", "Інтеграції", "Безпека й модерація", "Дорожня карта", "Терміни", "Фінальна оцінка розробки"],
    contextLabel: "Контекст",
    problemLabel: "Проблема",
    designedLabel: "Що спроєктовано",
    implementedLabel: "Що реалізовано",
    roleLabel: "Роль Влада",
    capabilitiesLabel: "Можливості",
    techLabel: "Технології",
    provesLabel: "Що це доводить",
  },
  ru: {
    metaTitle: "Разработка AI-продуктов — мобильные приложения, SaaS и AI | Vlad Kuzmenko",
    metaDesc:
      "Мобильные приложения, SaaS и AI-продукты от концепта и архитектуры до релиза: декомпозиция, архитектура, фронтенд/бэкенд, аккаунты, оплаты, AI-интеграции, QA и релиз. AI-инструменты ускоряют инженерию — не заменяют её.",
    heroTitle: "Мобильные приложения, SaaS и AI-продукты — от концепта и архитектуры до релиза",
    heroSub:
      "Влад ведёт декомпозицию продукта, архитектуру, фронтенд и бэкенд, аутентификацию и аккаунты, подписки/оплаты там, где это действительно поддерживается, AI-интеграции, QA и подготовку релиза — и координирует специалистов, когда этого требует объём.",
    leadIntro: "Релевантный, реальный продуктовый опыт — честно помеченный по этапу, с реальными скриншотами, где они есть. Без выдуманных метрик и результатов запуска.",
    accel: "AI-инструменты используются для ускорения разработки — не для замены инженерии, архитектуры или QA.",
    casesEyebrow: "Релевантный опыт",
    casesTitle: "Продуктовые кейсы",
    matrixTitle: "Матрица релевантного опыта",
    matrixCapability: "Возможность",
    matrixProjects: "Где это построено",
    howTitle: "Как я работаю",
    how: ["Декомпозиция продукта", "Архитектура", "Фронтенд и бэкенд", "Аутентификация и аккаунты", "AI-интеграции", "QA и безопасность", "Подготовка релиза"],
    ctaTitle: "Есть на уме приложение, SaaS или AI-продукт?",
    ctaPrimary: "Обсудить ваш MVP",
    ctaSecondary: "Начать с Technical Discovery",
    discoveryTitle: "Что даёт Technical Discovery",
    discoveryIntro: "Платный первый этап с чёткими границами, превращающий идею в конкретный план, который принадлежит вам — ещё до полной разработки.",
    discovery: ["Границы MVP", "Сценарии пользователя", "Архитектура системы", "Бэкенд и модель данных", "AI-логика", "Интеграции", "Безопасность и модерация", "Дорожная карта", "Сроки", "Финальная оценка разработки"],
    contextLabel: "Контекст",
    problemLabel: "Проблема",
    designedLabel: "Что спроектировано",
    implementedLabel: "Что реализовано",
    roleLabel: "Роль Влада",
    capabilitiesLabel: "Возможности",
    techLabel: "Технологии",
    provesLabel: "Что это доказывает",
  },
};

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
function localePath(locale: Lang, slug: string): string {
  const base = langHref(locale);
  return base === "/" ? `/${slug}` : `${base}/${slug}`;
}

export function workJsonLd(locale: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PORTFOLIO_UI[locale].title,
    description: PORTFOLIO_UI[locale].metaDesc,
    url: `${SITE.url}${localePath(locale, "work")}`,
    hasPart: PORTFOLIO.map((p) => ({
      "@type": "CreativeWork",
      name: p.content[locale].name,
      about: p.content[locale].type,
      creativeWorkStatus: STATUS_LABEL[p.status][locale],
      ...(p.liveUrl ? { url: p.liveUrl } : {}),
      creator: { "@id": `${SITE.url}/#vlad` },
    })),
  };
}

export function apdJsonLd(locale: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Product Development",
    serviceType: "Mobile app, SaaS and AI product development",
    description: APD_UI[locale].metaDesc,
    provider: { "@id": `${SITE.url}/#vlad` },
    areaServed: "Worldwide",
    url: `${SITE.url}${localePath(locale, "ai-product-development")}`,
  };
}

export function caseJsonLd(locale: Lang, c: CaseDetail) {
  const cc = c.content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cc.name,
    about: cc.type,
    creativeWorkStatus: STATUS_LABEL[c.status][locale],
    ...(c.liveUrl ? { url: c.liveUrl } : {}),
    creator: { "@id": `${SITE.url}/#vlad` },
    inLanguage: locale === "ua" ? "uk" : locale,
  };
}
