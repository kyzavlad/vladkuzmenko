// Client-facing portfolio + AI-product-development data (EN/UA/RU).
// Self-contained (no dependency on other feature modules) so it drops cleanly
// onto production main.
//
// Honesty rules (non-negotiable):
//  - Every project carries an explicit build-stage status.
//  - No invented metrics, revenue, conversion, user counts or launch results.
//  - A capability is listed only where it genuinely exists in the product.
//  - Screenshots are referenced only where the file really exists in /public and
//    the caption describes what the screenshot actually shows.
//  - Marketing figures that appear inside a client's own product are the
//    client's content, never presented here as a result I produced.
//  - Screenshots containing real personal data are never published.
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

// Categories are commercial buying categories, not technical ones — a prospect
// filters by "the kind of thing I need built".
export type Category = "platforms" | "ai_products" | "websites" | "automation";

export const CATEGORY_ORDER: Category[] = ["platforms", "ai_products", "websites", "automation"];

export const CATEGORY_LABEL: Record<Category, Record<Lang, string>> = {
  platforms: {
    en: "SaaS, marketplaces & client platforms",
    ua: "SaaS, маркетплейси та клієнтські платформи",
    ru: "SaaS, маркетплейсы и клиентские платформы",
  },
  ai_products: {
    en: "AI products & assistants",
    ua: "AI-продукти та асистенти",
    ru: "AI-продукты и ассистенты",
  },
  websites: {
    en: "Websites & conversion platforms",
    ua: "Сайти та конверсійні платформи",
    ru: "Сайты и конверсионные платформы",
  },
  automation: {
    en: "Automation & CRM systems",
    ua: "Автоматизація та CRM-системи",
    ru: "Автоматизация и CRM-системы",
  },
};

/** Short category chip used on cards (fits on mobile). */
export const CATEGORY_SHORT: Record<Category, Record<Lang, string>> = {
  platforms: { en: "SaaS & platforms", ua: "SaaS і платформи", ru: "SaaS и платформы" },
  ai_products: { en: "AI products", ua: "AI-продукти", ru: "AI-продукты" },
  websites: { en: "Websites", ua: "Сайти", ru: "Сайты" },
  automation: { en: "Automation & CRM", ua: "Автоматизація і CRM", ru: "Автоматизация и CRM" },
};

export interface CardContent {
  name: string;
  /** One-line product type — what kind of thing this is. */
  type: string;
  /** One-line business/product outcome — why it matters to a buyer. */
  outcome: string;
  problem: string;
  built: string;
  capabilities: string[];
  caption?: string;
}

export interface PortfolioCard {
  key: string;
  category: Category;
  status: Status;
  /** Lower number = higher up in the featured block. Absent = not featured. */
  featured?: number;
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
    featured: 1,
    caseSlug: "turbotaai",
    shots: [
      "/case-studies/turbotaai/home.webp",
      "/case-studies/turbotaai/pricing.webp",
      "/case-studies/turbotaai/video.webp",
    ],
    content: {
      en: {
        name: "TurbotaAI",
        type: "AI product · Text, voice and video assistant",
        outcome:
          "A person can try the AI, create an account, subscribe and manage their own access — without anyone handling it manually.",
        problem:
          "An AI demo is not a business. The conversation, the account, the trial limit and the payment have to work as one product.",
        built:
          "A multi-modal AI companion — text, voice and video — with accounts, trial limits, a monthly subscription, promo codes and self-serve access management.",
        capabilities: ["User accounts", "Subscriptions & payments", "Promo codes", "Multi-modal AI", "Access limits", "Multilingual"],
        caption: "TurbotaAI — home",
      },
      ua: {
        name: "TurbotaAI",
        type: "AI-продукт · Асистент у тексті, голосі та відео",
        outcome:
          "Людина може спробувати AI, створити акаунт, оформити підписку й керувати власним доступом — без ручної роботи з боку команди.",
        problem:
          "AI-демо — це ще не бізнес. Розмова, акаунт, ліміт пробного доступу та оплата мають працювати як один продукт.",
        built:
          "Мультимодальний AI-компаньйон — текст, голос і відео — з акаунтами, лімітами пробного доступу, місячною підпискою, промокодами та самостійним керуванням доступом.",
        capabilities: ["Акаунти", "Підписки й оплати", "Промокоди", "Мультимодальний AI", "Ліміти доступу", "Багатомовність"],
        caption: "TurbotaAI — головна",
      },
      ru: {
        name: "TurbotaAI",
        type: "AI-продукт · Ассистент в тексте, голосе и видео",
        outcome:
          "Человек может попробовать AI, создать аккаунт, оформить подписку и управлять своим доступом — без ручной работы со стороны команды.",
        problem:
          "AI-демо — это ещё не бизнес. Разговор, аккаунт, лимит пробного доступа и оплата должны работать как один продукт.",
        built:
          "Мультимодальный AI-компаньон — текст, голос и видео — с аккаунтами, лимитами пробного доступа, месячной подпиской, промокодами и самостоятельным управлением доступом.",
        capabilities: ["Аккаунты", "Подписки и оплаты", "Промокоды", "Мультимодальный AI", "Лимиты доступа", "Многоязычность"],
        caption: "TurbotaAI — главная",
      },
    },
  },
  {
    key: "tutorivo",
    category: "platforms",
    status: "in_development",
    featured: 2,
    caseSlug: "tutorivo",
    shots: [
      "/case-studies/tutorivo/home.webp",
      "/case-studies/tutorivo/catalog.webp",
      "/case-studies/tutorivo/become-tutor.webp",
    ],
    content: {
      en: {
        name: "Tutorivo",
        type: "Two-sided marketplace · Education",
        outcome:
          "Students find and filter a verified tutor themselves, tutors apply through a structured form, and the operator decides who gets published.",
        problem:
          "Tutors and students lived in chats and spreadsheets — no single place to browse by subject and language, apply to teach, or keep requests in order.",
        built:
          "A tutor marketplace: a filterable catalog, tutor profiles, a structured application flow, an admin review layer, lesson-package logic and a multilingual structure.",
        capabilities: ["Catalog & filters", "Profiles & roles", "Admin & moderation", "Payments", "Lesson packages", "Multilingual"],
        caption: "Tutorivo — home",
      },
      ua: {
        name: "Tutorivo",
        type: "Двосторонній маркетплейс · Освіта",
        outcome:
          "Учні самі знаходять і фільтрують перевіреного репетитора, репетитори подають структуровану заявку, а оператор вирішує, кого публікувати.",
        problem:
          "Репетитори та учні жили в чатах і таблицях — не було єдиного місця, щоб шукати за предметом і мовою, подати заявку на викладання чи тримати запити в порядку.",
        built:
          "Маркетплейс репетиторів: каталог із фільтрами, профілі викладачів, структурований потік заявки, шар адмін-модерації, логіка пакетів уроків і багатомовна структура.",
        capabilities: ["Каталог і фільтри", "Профілі й ролі", "Адмін і модерація", "Оплати", "Пакети уроків", "Багатомовність"],
        caption: "Tutorivo — головна",
      },
      ru: {
        name: "Tutorivo",
        type: "Двусторонний маркетплейс · Образование",
        outcome:
          "Ученики сами находят и фильтруют проверенного репетитора, репетиторы подают структурированную заявку, а оператор решает, кого публиковать.",
        problem:
          "Репетиторы и ученики жили в чатах и таблицах — не было единого места, чтобы искать по предмету и языку, подать заявку на преподавание или держать запросы в порядке.",
        built:
          "Маркетплейс репетиторов: каталог с фильтрами, профили преподавателей, структурированный поток заявки, слой админ-модерации, логика пакетов уроков и многоязычная структура.",
        capabilities: ["Каталог и фильтры", "Профили и роли", "Админ и модерация", "Оплаты", "Пакеты уроков", "Многоязычность"],
        caption: "Tutorivo — главная",
      },
    },
  },
  {
    key: "status-auto",
    category: "platforms",
    status: "prototype",
    featured: 3,
    caseSlug: "status-auto",
    shots: [
      "/case-studies/status-auto/home.webp",
      "/case-studies/status-auto/catalog.webp",
      "/case-studies/status-auto/form.webp",
    ],
    content: {
      en: {
        name: "Status Auto",
        type: "Vehicle catalog & buyer-request platform",
        outcome:
          "A buyer hands over budget and requirements in one step, so the seller calls back already knowing what to offer.",
        problem:
          "Car enquiries die in DMs and phone tag — someone browses, has no way to state a budget, and the lead is lost to a slow reply.",
        built:
          "A vehicle catalog with full specifications and a buyer-request flow that captures contact, budget and requirements from any page.",
        capabilities: ["Inventory / catalog", "Lead capture", "Qualified request form", "Conversion routing"],
        caption: "Status Auto — home",
      },
      ua: {
        name: "Status Auto",
        type: "Каталог авто та платформа запитів покупця",
        outcome:
          "Покупець за один крок передає бюджет і вимоги, тож продавець передзвонює, вже знаючи, що пропонувати.",
        problem:
          "Запити на авто згасають у директах і недодзвонах — людина дивиться каталог, не має де вказати бюджет, і лід втрачається через повільну відповідь.",
        built:
          "Каталог авто з повними характеристиками та потік запиту покупця, що збирає контакт, бюджет і вимоги з будь-якої сторінки.",
        capabilities: ["Каталог / автопарк", "Захоплення лідів", "Кваліфікована форма запиту", "Конверсійна маршрутизація"],
        caption: "Status Auto — головна",
      },
      ru: {
        name: "Status Auto",
        type: "Каталог авто и платформа запросов покупателя",
        outcome:
          "Покупатель за один шаг передаёт бюджет и требования, поэтому продавец перезванивает, уже зная, что предлагать.",
        problem:
          "Запросы на авто угасают в директах и недозвонах — человек смотрит каталог, не может указать бюджет, и лид теряется из-за медленного ответа.",
        built:
          "Каталог авто с полными характеристиками и поток запроса покупателя, собирающий контакт, бюджет и требования с любой страницы.",
        capabilities: ["Каталог / автопарк", "Захват лидов", "Квалифицированная форма запроса", "Конверсионная маршрутизация"],
        caption: "Status Auto — главная",
      },
    },
  },
  {
    key: "ser-crypto",
    category: "websites",
    status: "real_client",
    featured: 4,
    caseSlug: "ser-crypto",
    liveUrl: "https://landing.ser-crypto.com/",
    shots: ["/case-studies/ser-crypto/landing.webp"],
    content: {
      en: {
        name: "SerCrypto Academy",
        type: "Conversion landing · Live client project",
        outcome:
          "A live public page that presents the offer clearly and moves visitors along one route: understand it, then register.",
        problem:
          "The brand needed a clear public landing that presents its offer and routes visitors toward registration.",
        built:
          "A responsive public landing: information architecture, offer and access presentation, and a single conversion route to registration.",
        capabilities: ["Landing IA", "Responsive web", "Offer presentation", "Conversion route"],
        caption: "SerCrypto Academy — landing hero",
      },
      ua: {
        name: "SerCrypto Academy",
        type: "Конверсійний лендинг · Живий клієнтський проєкт",
        outcome:
          "Живий публічний сайт, що зрозуміло презентує пропозицію та веде відвідувача одним шляхом: розібратися — і зареєструватися.",
        problem:
          "Бренду потрібен був зрозумілий публічний лендинг, що презентує пропозицію та веде відвідувачів до реєстрації.",
        built:
          "Адаптивний публічний лендинг: інформаційна архітектура, презентація пропозиції та доступу і єдиний конверсійний шлях до реєстрації.",
        capabilities: ["Архітектура лендингу", "Адаптивний веб", "Презентація пропозиції", "Конверсійний шлях"],
        caption: "SerCrypto Academy — головний екран",
      },
      ru: {
        name: "SerCrypto Academy",
        type: "Конверсионный лендинг · Живой клиентский проект",
        outcome:
          "Живой публичный сайт, который понятно презентует предложение и ведёт посетителя одним путём: разобраться — и зарегистрироваться.",
        problem:
          "Бренду нужен был понятный публичный лендинг, презентующий предложение и ведущий посетителей к регистрации.",
        built:
          "Адаптивный публичный лендинг: информационная архитектура, презентация предложения и доступа и единый конверсионный путь к регистрации.",
        capabilities: ["Архитектура лендинга", "Адаптивный веб", "Презентация предложения", "Конверсионный путь"],
        caption: "SerCrypto Academy — главный экран",
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
        type: "Voice AI · Call answering",
        outcome: "Calls get answered and routed in natural speech instead of going to voicemail.",
        problem: "Calls go unanswered and callers aren't routed to the right place fast enough.",
        built: "A voice assistant that answers and routes callers in natural speech — with a working audio demo.",
        capabilities: ["Voice AI", "Call answering", "Call routing"],
      },
      ua: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовий AI · Відповіді на дзвінки",
        outcome: "Дзвінки отримують відповідь і маршрутизацію природним мовленням, а не потрапляють на автовідповідач.",
        problem: "Дзвінки лишаються без відповіді, а тих, хто телефонує, не встигають скерувати куди треба.",
        built: "Голосовий асистент, що відповідає й маршрутизує дзвінки природним мовленням — зі справжнім аудіодемо.",
        capabilities: ["Голосовий AI", "Відповіді на дзвінки", "Маршрутизація"],
      },
      ru: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовой AI · Ответы на звонки",
        outcome: "Звонки получают ответ и маршрутизацию естественной речью, а не уходят на автоответчик.",
        problem: "Звонки остаются без ответа, а звонящих не успевают направить куда нужно.",
        built: "Голосовой ассистент, отвечающий и маршрутизирующий звонки естественной речью — с реальным аудиодемо.",
        capabilities: ["Голосовой AI", "Ответы на звонки", "Маршрутизация"],
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
        type: "CRM + automation · Internal operations",
        outcome: "No conversation goes cold because tracking, reminders and follow-up run on their own.",
        problem: "Conversations went cold because tracking, reminders and follow-up were manual.",
        built: "A CRM with automated tracking, reminders and follow-up workflows, plus an admin and moderation layer.",
        capabilities: ["Communication workflows", "Admin & moderation", "Automated follow-up"],
      },
      ua: {
        name: "Dating CRM",
        type: "CRM + автоматизація · Внутрішні процеси",
        outcome: "Жодна розмова не згасає, бо відстеження, нагадування та фолоу-ап працюють самі.",
        problem: "Розмови згасали, бо відстеження, нагадування та фолоу-ап робилися вручну.",
        built: "CRM з автоматичним відстеженням, нагадуваннями та фолоу-ап процесами, плюс шар адміністрування й модерації.",
        capabilities: ["Комунікаційні процеси", "Адмін і модерація", "Автоматичний фолоу-ап"],
      },
      ru: {
        name: "Dating CRM",
        type: "CRM + автоматизация · Внутренние процессы",
        outcome: "Ни один диалог не угасает, потому что трекинг, напоминания и фоллоу-ап работают сами.",
        problem: "Диалоги угасали, потому что трекинг, напоминания и фоллоу-ап делались вручную.",
        built: "CRM с автоматическим трекингом, напоминаниями и фоллоу-ап процессами, плюс слой администрирования и модерации.",
        capabilities: ["Коммуникационные процессы", "Админ и модерация", "Автоматический фоллоу-ап"],
      },
    },
  },
  {
    key: "leather-clinic",
    category: "websites",
    status: "in_development",
    shots: [],
    content: {
      en: {
        name: "Leather Clinic",
        type: "Business website · Local specialist service",
        outcome: "A specialist service looks credible enough that visitors send an enquiry instead of shopping around.",
        problem: "A specialist local service needed a clean, premium site that turns visitors into enquiries.",
        built: "A premium website for a specialist service, structured to convert visitors into enquiries.",
        capabilities: ["Business website", "Enquiry conversion"],
      },
      ua: {
        name: "Leather Clinic",
        type: "Бізнес-сайт · Локальний спеціалізований сервіс",
        outcome: "Спеціалізований сервіс виглядає достатньо надійно, щоб відвідувач залишив запит, а не пішов шукати далі.",
        problem: "Спеціалізованому локальному сервісу потрібен був чистий преміальний сайт, що перетворює відвідувачів на запити.",
        built: "Преміальний сайт для спеціалізованого сервісу, побудований, щоб перетворювати відвідувачів на запити.",
        capabilities: ["Бізнес-сайт", "Конверсія в запити"],
      },
      ru: {
        name: "Leather Clinic",
        type: "Бизнес-сайт · Локальный специализированный сервис",
        outcome: "Специализированный сервис выглядит достаточно надёжно, чтобы посетитель оставил запрос, а не пошёл искать дальше.",
        problem: "Специализированному локальному сервису нужен был чистый премиальный сайт, превращающий посетителей в запросы.",
        built: "Премиальный сайт для специализированного сервиса, построенный, чтобы превращать посетителей в запросы.",
        capabilities: ["Бизнес-сайт", "Конверсия в запросы"],
      },
    },
  },
];

export const FEATURED = PORTFOLIO.filter((p) => p.featured != null).sort(
  (a, b) => (a.featured ?? 99) - (b.featured ?? 99),
);

// ---------------------------------------------------------------------------
// Case details — the /work/[slug] pages.
// A project earns a detail page only when there is real, publishable visual
// evidence plus verified scope. Everything else stays a card.
// ---------------------------------------------------------------------------
export interface CaseDetailContent {
  name: string;
  type: string;
  /** Who the product is for / what it is. */
  context: string;
  /** The friction the build addresses. */
  problem: string;
  /** What the build is meant to make possible. */
  outcome: string;
  /** Concrete delivered scope. */
  built: string[];
  /** Short, understandable product/user sequence. */
  flow?: string[];
  capabilities: string[];
  /** Verified stack / implementation facts only. */
  tech?: string[];
  /** Honest statements about what exists today — never invented metrics. */
  proof: string[];
  notClaimed: string[];
  scopeNote: string;
  ctaLabel: string;
  liveLabel: string;
}

export interface CaseDetail {
  slug: string;
  status: Status;
  category: Category;
  liveUrl?: string;
  shots: string[];
  /** Per-shot layout hint for the visual walkthrough. */
  shotSpan?: ("full" | "half")[];
  captions?: Record<Lang, string[]>;
  content: Record<Lang, CaseDetailContent>;
}

export const CASE_DETAILS: CaseDetail[] = [
  {
    slug: "turbotaai",
    status: "active_development",
    category: "ai_products",
    shots: [
      "/case-studies/turbotaai/home.webp",
      "/case-studies/turbotaai/pricing.webp",
      "/case-studies/turbotaai/video.webp",
    ],
    shotSpan: ["full", "half", "half"],
    captions: {
      en: [
        "Home — the AI companion offer and the entry point into a conversation",
        "Pricing & profile — monthly subscription, access status, promo redemption and self-serve access management",
        "Video session — choosing an AI persona and the language the session runs in",
      ],
      ua: [
        "Головна — пропозиція AI-компаньйона та вхід у розмову",
        "Тарифи й профіль — місячна підписка, статус доступу, активація промокоду та самостійне керування доступом",
        "Відеосесія — вибір AI-персони та мови, якою проходить сесія",
      ],
      ru: [
        "Главная — предложение AI-компаньона и вход в разговор",
        "Тарифы и профиль — месячная подписка, статус доступа, активация промокода и самостоятельное управление доступом",
        "Видеосессия — выбор AI-персоны и языка, на котором идёт сессия",
      ],
    },
    content: {
      en: {
        name: "TurbotaAI",
        type: "AI product · Text, voice and video assistant",
        context:
          "An AI companion product built in public. People talk to an AI by text, voice or video in their own language, behind an account with a trial and a paid subscription.",
        problem:
          "An AI demo is not a business. Most AI projects stop at the chat window — the account, the trial limit, the payment and the access rules are left as \"later\". That is exactly where a product either becomes sellable or stalls.",
        outcome:
          "A product someone can open, try, subscribe to and keep using — where access, history and payment are handled by the product itself rather than by a person answering messages.",
        built: [
          "A multi-modal AI conversation — text, voice and video",
          "Selectable AI personas for different kinds of conversation",
          "Session language selection, so the AI understands and answers in that language",
          "User accounts with an access profile and conversation history",
          "Trial access with a request limit, then unlimited access on subscription",
          "A monthly subscription with in-product checkout",
          "Promo-code redemption and self-serve access management",
        ],
        flow: [
          "Visitor",
          "Try the AI (limited trial requests)",
          "Create an account",
          "Choose text, voice or video",
          "Subscribe or redeem a promo code",
          "Personal profile — access, history, management",
        ],
        capabilities: [
          "User accounts",
          "Subscriptions & payments",
          "Promo codes",
          "Multi-modal AI (text / voice / video)",
          "Access control & usage limits",
          "Multilingual",
          "Mobile release preparation",
        ],
        tech: ["Next.js", "AI assistant integration", "Auth & user profiles", "Subscription billing"],
        proof: [
          "The screens below are the real product interface, not mockups",
          "Subscription, trial limits, promo redemption and access management are implemented inside the product",
          "In active development, with store release being prepared",
        ],
        notClaimed: [
          "User or subscriber numbers",
          "Revenue",
          "App-store rankings",
          "Any therapeutic or clinical outcome",
          "Any performance metric",
        ],
        scopeNote:
          "Status: in active development, built in public. The screenshots show the real product interface. I do not claim user numbers, revenue, store ranking or any therapeutic outcome — TurbotaAI is a conversation product, not a medical service.",
        ctaLabel: "Discuss an AI product like this",
        liveLabel: "View live project",
      },
      ua: {
        name: "TurbotaAI",
        type: "AI-продукт · Асистент у тексті, голосі та відео",
        context:
          "AI-компаньйон, який будується публічно. Люди спілкуються з AI текстом, голосом або відео своєю мовою — за акаунтом із пробним доступом і платною підпискою.",
        problem:
          "AI-демо — це ще не бізнес. Більшість AI-проєктів зупиняються на вікні чату: акаунт, ліміт пробного доступу, оплата й правила доступу лишаються «на потім». Саме тут продукт або стає продаваним, або застрягає.",
        outcome:
          "Продукт, який можна відкрити, спробувати, оформити підписку й користуватися далі — де доступ, історія та оплата керуються самим продуктом, а не людиною, що відповідає в месенджері.",
        built: [
          "Мультимодальна AI-розмова — текст, голос і відео",
          "Вибір AI-персони під різні типи розмови",
          "Вибір мови сесії, щоб AI розумів і відповідав саме нею",
          "Акаунти з профілем доступу та історією розмов",
          "Пробний доступ із лімітом запитів, далі — безлімітний доступ за підпискою",
          "Місячна підписка з оформленням усередині продукту",
          "Активація промокоду та самостійне керування доступом",
        ],
        flow: [
          "Відвідувач",
          "Спробувати AI (обмежені пробні запити)",
          "Створити акаунт",
          "Обрати текст, голос або відео",
          "Оформити підписку або активувати промокод",
          "Особистий профіль — доступ, історія, керування",
        ],
        capabilities: [
          "Акаунти користувачів",
          "Підписки й оплати",
          "Промокоди",
          "Мультимодальний AI (текст / голос / відео)",
          "Контроль доступу та ліміти",
          "Багатомовність",
          "Підготовка релізу в сторах",
        ],
        tech: ["Next.js", "Інтеграція AI-асистента", "Авторизація та профілі", "Білінг підписок"],
        proof: [
          "Екрани нижче — це реальний інтерфейс продукту, а не мокапи",
          "Підписка, ліміти пробного доступу, промокоди й керування доступом реалізовані всередині продукту",
          "В активній розробці, готується реліз у сторах",
        ],
        notClaimed: [
          "Кількість користувачів чи підписників",
          "Дохід",
          "Позиції в сторах",
          "Будь-який терапевтичний чи клінічний результат",
          "Будь-яка метрика ефективності",
        ],
        scopeNote:
          "Статус: в активній розробці, будується публічно. Скриншоти показують реальний інтерфейс продукту. Я не заявляю кількість користувачів, дохід, позиції в сторах чи терапевтичний ефект — TurbotaAI є продуктом для розмови, а не медичною послугою.",
        ctaLabel: "Обговорити AI-продукт як цей",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "TurbotaAI",
        type: "AI-продукт · Ассистент в тексте, голосе и видео",
        context:
          "AI-компаньон, который строится публично. Люди общаются с AI текстом, голосом или видео на своём языке — за аккаунтом с пробным доступом и платной подпиской.",
        problem:
          "AI-демо — это ещё не бизнес. Большинство AI-проектов останавливаются на окне чата: аккаунт, лимит пробного доступа, оплата и правила доступа остаются «на потом». Именно здесь продукт либо становится продаваемым, либо застревает.",
        outcome:
          "Продукт, который можно открыть, попробовать, оформить подписку и пользоваться дальше — где доступ, история и оплата управляются самим продуктом, а не человеком, отвечающим в мессенджере.",
        built: [
          "Мультимодальный AI-разговор — текст, голос и видео",
          "Выбор AI-персоны под разные типы разговора",
          "Выбор языка сессии, чтобы AI понимал и отвечал именно на нём",
          "Аккаунты с профилем доступа и историей разговоров",
          "Пробный доступ с лимитом запросов, далее — безлимитный доступ по подписке",
          "Месячная подписка с оформлением внутри продукта",
          "Активация промокода и самостоятельное управление доступом",
        ],
        flow: [
          "Посетитель",
          "Попробовать AI (ограниченные пробные запросы)",
          "Создать аккаунт",
          "Выбрать текст, голос или видео",
          "Оформить подписку или активировать промокод",
          "Личный профиль — доступ, история, управление",
        ],
        capabilities: [
          "Аккаунты пользователей",
          "Подписки и оплаты",
          "Промокоды",
          "Мультимодальный AI (текст / голос / видео)",
          "Контроль доступа и лимиты",
          "Многоязычность",
          "Подготовка релиза в сторах",
        ],
        tech: ["Next.js", "Интеграция AI-ассистента", "Авторизация и профили", "Биллинг подписок"],
        proof: [
          "Экраны ниже — это реальный интерфейс продукта, а не мокапы",
          "Подписка, лимиты пробного доступа, промокоды и управление доступом реализованы внутри продукта",
          "В активной разработке, готовится релиз в сторах",
        ],
        notClaimed: [
          "Количество пользователей или подписчиков",
          "Доход",
          "Позиции в сторах",
          "Любой терапевтический или клинический результат",
          "Любая метрика эффективности",
        ],
        scopeNote:
          "Статус: в активной разработке, строится публично. Скриншоты показывают реальный интерфейс продукта. Я не заявляю количество пользователей, доход, позиции в сторах или терапевтический эффект — TurbotaAI является продуктом для разговора, а не медицинской услугой.",
        ctaLabel: "Обсудить AI-продукт как этот",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "tutorivo",
    status: "in_development",
    category: "platforms",
    shots: [
      "/case-studies/tutorivo/home.webp",
      "/case-studies/tutorivo/catalog.webp",
      "/case-studies/tutorivo/become-tutor.webp",
    ],
    shotSpan: ["full", "full", "full"],
    captions: {
      en: [
        "Home — subject search and the guided route into tutor matching",
        "Tutor catalog — filtering by subject, language and ranking, with price and experience on every card",
        "Become a tutor — the structured application that feeds the admin review queue",
      ],
      ua: [
        "Головна — пошук за предметом і скерований шлях до підбору репетитора",
        "Каталог репетиторів — фільтри за предметом, мовою та рейтингом, з ціною й досвідом на кожній картці",
        "Стати репетитором — структурована заявка, що потрапляє в чергу адмін-модерації",
      ],
      ru: [
        "Главная — поиск по предмету и направленный путь к подбору репетитора",
        "Каталог репетиторов — фильтры по предмету, языку и рейтингу, с ценой и опытом на каждой карточке",
        "Стать репетитором — структурированная заявка, попадающая в очередь админ-модерации",
      ],
    },
    content: {
      en: {
        name: "Tutorivo",
        type: "Two-sided marketplace · Education",
        context:
          "A tutoring marketplace serving students in Ukraine and Finland. Students find a verified tutor, tutors apply to teach, and an operator controls who gets listed.",
        problem:
          "Matching lived in chats and spreadsheets. There was no single place to browse tutors by subject and language, no structured way to apply as a tutor, and no reliable way to keep applications and requests in order.",
        outcome:
          "One platform where a parent or adult can find and filter a tutor themselves, a tutor can apply and be reviewed properly, and the operator decides what gets published — instead of every step passing through a manager's inbox.",
        built: [
          "A searchable tutor catalog with subject, language and ranking filters",
          "Tutor profiles showing subjects, teaching languages, experience, rating and price per lesson",
          "A guided \"find me a tutor\" route from the homepage",
          "A structured \"become a tutor\" application covering rates, experience, subjects and languages",
          "An admin review layer where applications move through pending → approved / rejected",
          "Lesson-package and pricing logic",
          "A multilingual structure with an in-product language switcher",
        ],
        flow: [
          "Student — search or browse the catalog",
          "Filter by subject, language, rating",
          "Open a tutor profile",
          "Request a tutor / trial lesson",
          "Tutor — submit the application",
          "Admin review → published in the catalog",
        ],
        capabilities: [
          "Catalog & search filters",
          "User accounts",
          "Profiles & roles",
          "Admin & moderation",
          "Payments",
          "Lesson packages",
          "Multilingual",
        ],
        tech: ["Next.js", "Tailwind", "Admin & moderation layer", "Payments", "Multilingual routing"],
        proof: [
          "The catalog, filters, tutor profiles and the application form are implemented and shown below",
          "Applications move through a real pending → approved / rejected review state",
          "In development, being prepared to onboard users and take payments",
        ],
        notClaimed: [
          "Tutor or student numbers",
          "Lesson volumes or ratings displayed on the client's own site",
          "Revenue",
          "Marketing results",
        ],
        scopeNote:
          "Status: in development. The figures shown on Tutorivo's own homepage are the client's marketing content — not results I produced or verify. The admin panel is deliberately not shown here because the real screen contains tutors' personal data.",
        ctaLabel: "Discuss a marketplace like this",
        liveLabel: "View live project",
      },
      ua: {
        name: "Tutorivo",
        type: "Двосторонній маркетплейс · Освіта",
        context:
          "Маркетплейс репетиторів для учнів в Україні та Фінляндії. Учні знаходять перевіреного викладача, репетитори подають заявку, а оператор контролює, хто потрапляє в каталог.",
        problem:
          "Підбір жив у чатах і таблицях. Не було єдиного місця, щоб шукати репетиторів за предметом і мовою, не було структурованого способу подати заявку на викладання й надійного способу тримати заявки та запити в порядку.",
        outcome:
          "Одна платформа, де батько чи доросла людина самі знаходять і фільтрують репетитора, репетитор може подати заявку й пройти нормальний розгляд, а оператор вирішує, що публікується — замість того, щоб кожен крок проходив через скриньку менеджера.",
        built: [
          "Пошуковий каталог репетиторів із фільтрами за предметом, мовою та рейтингом",
          "Профілі викладачів із предметами, мовами навчання, досвідом, рейтингом і ціною за урок",
          "Скерований шлях «підібрати репетитора» з головної сторінки",
          "Структурована заявка «стати репетитором» зі ставкою, досвідом, предметами й мовами",
          "Шар адмін-модерації, де заявки проходять стани очікує → схвалено / відхилено",
          "Логіка пакетів уроків і ціноутворення",
          "Багатомовна структура з перемикачем мови всередині продукту",
        ],
        flow: [
          "Учень — пошук або перегляд каталогу",
          "Фільтр за предметом, мовою, рейтингом",
          "Відкрити профіль репетитора",
          "Запит на репетитора / пробний урок",
          "Репетитор — подати заявку",
          "Адмін-модерація → публікація в каталозі",
        ],
        capabilities: [
          "Каталог і фільтри пошуку",
          "Акаунти користувачів",
          "Профілі й ролі",
          "Адмін і модерація",
          "Оплати",
          "Пакети уроків",
          "Багатомовність",
        ],
        tech: ["Next.js", "Tailwind", "Шар адміністрування й модерації", "Оплати", "Багатомовна маршрутизація"],
        proof: [
          "Каталог, фільтри, профілі викладачів і форма заявки реалізовані й показані нижче",
          "Заявки проходять реальні стани розгляду: очікує → схвалено / відхилено",
          "У розробці, готується до прийому користувачів і оплат",
        ],
        notClaimed: [
          "Кількість репетиторів чи учнів",
          "Обсяги уроків або рейтинги, показані на власному сайті клієнта",
          "Дохід",
          "Маркетингові результати",
        ],
        scopeNote:
          "Статус: у розробці. Цифри на головній сторінці Tutorivo — це маркетинговий контент клієнта, а не результати, які я створив чи можу підтвердити. Адмін-панель тут свідомо не показана, бо реальний екран містить персональні дані репетиторів.",
        ctaLabel: "Обговорити маркетплейс як цей",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "Tutorivo",
        type: "Двусторонний маркетплейс · Образование",
        context:
          "Маркетплейс репетиторов для учеников в Украине и Финляндии. Ученики находят проверенного преподавателя, репетиторы подают заявку, а оператор контролирует, кто попадает в каталог.",
        problem:
          "Подбор жил в чатах и таблицах. Не было единого места, чтобы искать репетиторов по предмету и языку, не было структурированного способа подать заявку на преподавание и надёжного способа держать заявки и запросы в порядке.",
        outcome:
          "Одна платформа, где родитель или взрослый сами находят и фильтруют репетитора, репетитор может подать заявку и пройти нормальное рассмотрение, а оператор решает, что публикуется — вместо того, чтобы каждый шаг проходил через почту менеджера.",
        built: [
          "Поисковый каталог репетиторов с фильтрами по предмету, языку и рейтингу",
          "Профили преподавателей с предметами, языками обучения, опытом, рейтингом и ценой за урок",
          "Направленный путь «подобрать репетитора» с главной страницы",
          "Структурированная заявка «стать репетитором» со ставкой, опытом, предметами и языками",
          "Слой админ-модерации, где заявки проходят состояния ожидает → одобрено / отклонено",
          "Логика пакетов уроков и ценообразования",
          "Многоязычная структура с переключателем языка внутри продукта",
        ],
        flow: [
          "Ученик — поиск или просмотр каталога",
          "Фильтр по предмету, языку, рейтингу",
          "Открыть профиль репетитора",
          "Запрос на репетитора / пробный урок",
          "Репетитор — подать заявку",
          "Админ-модерация → публикация в каталоге",
        ],
        capabilities: [
          "Каталог и фильтры поиска",
          "Аккаунты пользователей",
          "Профили и роли",
          "Админ и модерация",
          "Оплаты",
          "Пакеты уроков",
          "Многоязычность",
        ],
        tech: ["Next.js", "Tailwind", "Слой администрирования и модерации", "Оплаты", "Многоязычная маршрутизация"],
        proof: [
          "Каталог, фильтры, профили преподавателей и форма заявки реализованы и показаны ниже",
          "Заявки проходят реальные состояния рассмотрения: ожидает → одобрено / отклонено",
          "В разработке, готовится к приёму пользователей и оплат",
        ],
        notClaimed: [
          "Количество репетиторов или учеников",
          "Объёмы уроков или рейтинги, показанные на собственном сайте клиента",
          "Доход",
          "Маркетинговые результаты",
        ],
        scopeNote:
          "Статус: в разработке. Цифры на главной странице Tutorivo — это маркетинговый контент клиента, а не результаты, которые я создал или могу подтвердить. Админ-панель здесь сознательно не показана, потому что реальный экран содержит персональные данные репетиторов.",
        ctaLabel: "Обсудить маркетплейс как этот",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "status-auto",
    status: "prototype",
    category: "platforms",
    shots: [
      "/case-studies/status-auto/home.webp",
      "/case-studies/status-auto/catalog.webp",
      "/case-studies/status-auto/form.webp",
    ],
    shotSpan: ["full", "half", "half"],
    captions: {
      en: [
        "Home — the offer and the primary route into a vehicle-selection request",
        "Inventory — checked vehicles with the specifications a buyer actually compares",
        "Buyer request — contact, budget and requirements captured in one step",
      ],
      ua: [
        "Головна — пропозиція та основний шлях до запиту на підбір авто",
        "Автопарк — перевірені авто з характеристиками, які покупець реально порівнює",
        "Запит покупця — контакт, бюджет і вимоги за один крок",
      ],
      ru: [
        "Главная — предложение и основной путь к запросу на подбор авто",
        "Автопарк — проверенные авто с характеристиками, которые покупатель реально сравнивает",
        "Запрос покупателя — контакт, бюджет и требования за один шаг",
      ],
    },
    content: {
      en: {
        name: "Status Auto",
        type: "Vehicle catalog & buyer-request platform",
        context:
          "A car-selection service that presents checked vehicles and turns online interest into a qualified buyer request.",
        problem:
          "Car enquiries die in DMs and phone tag. Someone browses vehicles, has no way to state a budget or what they actually want, and by the time anyone replies the buyer has moved on.",
        outcome:
          "A visitor can browse checked inventory and, in one short form, hand over exactly what a sales person needs to call back prepared: budget, requirements and contact.",
        built: [
          "Premium inventory presentation with a vehicle catalog",
          "Vehicle cards carrying year, model, price, engine, transmission, fuel and mileage",
          "A buyer-request flow capturing name, phone, budget and vehicle requirements",
          "A conversion route into the request modal from any page",
          "A process and trust section covering diagnostics and consultation",
        ],
        flow: [
          "Visitor",
          "Browse checked inventory",
          "Compare vehicle specifications",
          "Open the selection request",
          "Submit budget + requirements + contact",
          "Seller follows up with a qualified brief",
        ],
        capabilities: ["Inventory / catalog", "Lead capture", "Qualified request form", "Conversion routing"],
        tech: ["Next.js", "Catalog / inventory structure", "Lead capture form"],
        proof: [
          "A complete prototype — the browse → compare → request path works end to end in the screens below",
          "The request form captures budget and requirements, not just a phone number",
          "Prototype stage: not a deployed dealership system",
        ],
        notClaimed: [
          "Enquiry or sales volumes",
          "That this is a deployed production dealer system",
          "The inventory counts shown in the design",
          "Any dealer commercial result",
        ],
        scopeNote:
          "Status: prototype. This is a working prototype of the buyer journey, not a deployed dealership system. The vehicle listings and the \"500+ in stock\" badge are placeholder presentation content, not verified inventory.",
        ctaLabel: "Discuss a catalog & lead platform",
        liveLabel: "View live project",
      },
      ua: {
        name: "Status Auto",
        type: "Каталог авто та платформа запитів покупця",
        context:
          "Сервіс підбору авто, який презентує перевірені автомобілі й перетворює онлайн-інтерес на кваліфікований запит покупця.",
        problem:
          "Запити на авто згасають у директах і недодзвонах. Людина дивиться автомобілі, не має де вказати бюджет чи те, що їй насправді потрібно, і поки хтось відповість — покупець уже пішов далі.",
        outcome:
          "Відвідувач може переглянути перевірений автопарк і за одну коротку форму передати саме те, що потрібно продавцю, щоб передзвонити підготовленим: бюджет, вимоги й контакт.",
        built: [
          "Преміальна презентація автопарку з каталогом авто",
          "Картки авто з роком, моделлю, ціною, двигуном, КПП, пальним і пробігом",
          "Потік запиту покупця з іменем, телефоном, бюджетом і вимогами до авто",
          "Конверсійний шлях у модальне вікно запиту з будь-якої сторінки",
          "Секція процесу й довіри з діагностикою та консультацією",
        ],
        flow: [
          "Відвідувач",
          "Перегляд перевіреного автопарку",
          "Порівняння характеристик",
          "Відкрити запит на підбір",
          "Надіслати бюджет + вимоги + контакт",
          "Продавець передзвонює з готовим брифом",
        ],
        capabilities: ["Каталог / автопарк", "Захоплення лідів", "Кваліфікована форма запиту", "Конверсійна маршрутизація"],
        tech: ["Next.js", "Структура каталогу / автопарку", "Форма захоплення лідів"],
        proof: [
          "Повноцінний прототип — шлях перегляд → порівняння → запит працює наскрізно на екранах нижче",
          "Форма запиту збирає бюджет і вимоги, а не лише номер телефону",
          "Стадія прототипу: це не розгорнута дилерська система",
        ],
        notClaimed: [
          "Обсяги запитів чи продажів",
          "Що це розгорнута продакшн-система дилера",
          "Кількість авто, показана в дизайні",
          "Будь-який комерційний результат дилера",
        ],
        scopeNote:
          "Статус: прототип. Це робочий прототип шляху покупця, а не розгорнута дилерська система. Оголошення авто та бейдж «500+ на складі» — це демонстраційний контент, а не підтверджений автопарк.",
        ctaLabel: "Обговорити каталог і платформу лідів",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "Status Auto",
        type: "Каталог авто и платформа запросов покупателя",
        context:
          "Сервис подбора авто, который презентует проверенные автомобили и превращает онлайн-интерес в квалифицированный запрос покупателя.",
        problem:
          "Запросы на авто угасают в директах и недозвонах. Человек смотрит автомобили, не может указать бюджет или то, что ему на самом деле нужно, и пока кто-то ответит — покупатель уже ушёл дальше.",
        outcome:
          "Посетитель может просмотреть проверенный автопарк и за одну короткую форму передать именно то, что нужно продавцу, чтобы перезвонить подготовленным: бюджет, требования и контакт.",
        built: [
          "Премиальная презентация автопарка с каталогом авто",
          "Карточки авто с годом, моделью, ценой, двигателем, КПП, топливом и пробегом",
          "Поток запроса покупателя с именем, телефоном, бюджетом и требованиями к авто",
          "Конверсионный путь в модальное окно запроса с любой страницы",
          "Секция процесса и доверия с диагностикой и консультацией",
        ],
        flow: [
          "Посетитель",
          "Просмотр проверенного автопарка",
          "Сравнение характеристик",
          "Открыть запрос на подбор",
          "Отправить бюджет + требования + контакт",
          "Продавец перезванивает с готовым брифом",
        ],
        capabilities: ["Каталог / автопарк", "Захват лидов", "Квалифицированная форма запроса", "Конверсионная маршрутизация"],
        tech: ["Next.js", "Структура каталога / автопарка", "Форма захвата лидов"],
        proof: [
          "Полноценный прототип — путь просмотр → сравнение → запрос работает сквозным образом на экранах ниже",
          "Форма запроса собирает бюджет и требования, а не только номер телефона",
          "Стадия прототипа: это не развёрнутая дилерская система",
        ],
        notClaimed: [
          "Объёмы запросов или продаж",
          "Что это развёрнутая продакшн-система дилера",
          "Количество авто, показанное в дизайне",
          "Любой коммерческий результат дилера",
        ],
        scopeNote:
          "Статус: прототип. Это рабочий прототип пути покупателя, а не развёрнутая дилерская система. Объявления авто и бейдж «500+ на складе» — это демонстрационный контент, а не подтверждённый автопарк.",
        ctaLabel: "Обсудить каталог и платформу лидов",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "ser-crypto",
    status: "real_client",
    category: "websites",
    liveUrl: "https://landing.ser-crypto.com/",
    shots: ["/case-studies/ser-crypto/landing.webp"],
    shotSpan: ["full"],
    captions: {
      en: ["Landing hero — the offer and the entry point to registration"],
      ua: ["Головний екран — пропозиція та вхід до реєстрації"],
      ru: ["Главный экран — предложение и вход к регистрации"],
    },
    content: {
      en: {
        name: "SerCrypto Academy",
        type: "Conversion landing · Web platform",
        context:
          "A live public landing for a crypto-education brand. My scope was the public web experience — not the trading education itself.",
        problem:
          "The brand needed a clear, premium public landing that presents its offer and moves visitors toward registration.",
        outcome:
          "One public page where a visitor understands the offer, sees how access works, and has a single obvious next step: register.",
        built: [
          "Public landing information architecture",
          "Responsive web experience",
          "Offer presentation",
          "Pricing / access presentation",
          "Conversion route to registration",
        ],
        flow: ["Visitor lands on the offer", "Reads the mechanics and what access includes", "Reviews packages", "Registers"],
        capabilities: ["Landing IA", "Responsive web", "Offer & pricing presentation", "Conversion route"],
        tech: ["Responsive web", "Landing information architecture"],
        proof: [
          "A live, publicly reachable landing at landing.ser-crypto.com",
          "The public information architecture and conversion route are the delivered scope",
          "One verified screenshot is published here — the live site shows the current version",
        ],
        notClaimed: [
          "Trading strategies",
          "The education curriculum",
          "Help4Trade logic",
          "Trading results",
          "Registration or conversion numbers",
          "Private commercial metrics",
        ],
        scopeNote:
          "Scope is the public landing and its conversion route only. I do not claim authorship of the trading strategies, curriculum, Help4Trade logic, trading results, registration numbers or any private commercial metrics.",
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
        outcome:
          "Одна публічна сторінка, де відвідувач розуміє пропозицію, бачить, як влаштований доступ, і має єдиний очевидний наступний крок: зареєструватися.",
        built: [
          "Інформаційна архітектура лендингу",
          "Адаптивний веб-досвід",
          "Презентація пропозиції",
          "Презентація тарифів / доступу",
          "Конверсійний шлях до реєстрації",
        ],
        flow: ["Відвідувач потрапляє на пропозицію", "Читає механіку й що включає доступ", "Переглядає пакети", "Реєструється"],
        capabilities: ["Архітектура лендингу", "Адаптивний веб", "Презентація пропозиції та тарифів", "Конверсійний шлях"],
        tech: ["Адаптивний веб", "Інформаційна архітектура лендингу"],
        proof: [
          "Живий, публічно доступний лендинг на landing.ser-crypto.com",
          "Публічна інформаційна архітектура та конверсійний шлях — це і є зданий обсяг",
          "Тут опубліковано один підтверджений скриншот — актуальну версію показує живий сайт",
        ],
        notClaimed: [
          "Торгові стратегії",
          "Навчальна програма",
          "Логіка Help4Trade",
          "Торгові результати",
          "Кількість реєстрацій чи конверсія",
          "Приватні комерційні метрики",
        ],
        scopeNote:
          "Обсяг — лише публічний лендинг і його конверсійний шлях. Я не претендую на авторство торгових стратегій, навчальної програми, логіки Help4Trade, торгових результатів, кількості реєстрацій чи будь-яких приватних комерційних метрик.",
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
        outcome:
          "Одна публичная страница, где посетитель понимает предложение, видит, как устроен доступ, и имеет единственный очевидный следующий шаг: зарегистрироваться.",
        built: [
          "Информационная архитектура лендинга",
          "Адаптивный веб-опыт",
          "Презентация предложения",
          "Презентация тарифов / доступа",
          "Конверсионный путь к регистрации",
        ],
        flow: ["Посетитель попадает на предложение", "Читает механику и что включает доступ", "Просматривает пакеты", "Регистрируется"],
        capabilities: ["Архитектура лендинга", "Адаптивный веб", "Презентация предложения и тарифов", "Конверсионный путь"],
        tech: ["Адаптивный веб", "Информационная архитектура лендинга"],
        proof: [
          "Живой, публично доступный лендинг на landing.ser-crypto.com",
          "Публичная информационная архитектура и конверсионный путь — это и есть сданный объём",
          "Здесь опубликован один подтверждённый скриншот — актуальную версию показывает живой сайт",
        ],
        notClaimed: [
          "Торговые стратегии",
          "Учебная программа",
          "Логика Help4Trade",
          "Торговые результаты",
          "Количество регистраций или конверсия",
          "Приватные коммерческие метрики",
        ],
        scopeNote:
          "Объём — только публичный лендинг и его конверсионный путь. Я не претендую на авторство торговых стратегий, учебной программы, логики Help4Trade, торговых результатов, количества регистраций или каких-либо приватных коммерческих метрик.",
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
    trustLine: string;
    heroPrimary: string;
    heroSecondary: string;
    filterAll: string;
    filterFeatured: string;
    featuredTitle: string;
    featuredIntro: string;
    allWorkTitle: string;
    allWorkIntro: string;
    emptyFilter: string;
    viewCase: string;
    requestSimilar: string;
    live: string;
    outcomeLabel: string;
    problemLabel: string;
    builtLabel: string;
    capabilitiesLabel: string;
    capsTitle: string;
    capsIntro: string;
    capsWhere: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    dialogTitle: string;
    dialogDesc: string;
    dialogSubmit: string;
    dialogOkTitle: string;
    dialogOkBody: string;
    dialogHelp: string;
    productCta: string;
    productCtaBtn: string;
  }
> = {
  en: {
    metaTitle: "Selected Work — SaaS platforms, AI products, marketplaces & web apps | Vlad Kuzmenko",
    metaDesc:
      "Selected builds: SaaS platforms, marketplaces, AI products, client portals and conversion websites — from first MVP to working production systems. Honest build stages, real screenshots, no invented metrics.",
    eyebrow: "Selected work",
    title: "Products built to work — not just to look good",
    intro:
      "Selected SaaS platforms, marketplaces, AI products and conversion websites — from a first MVP to working production systems.",
    trustLine:
      "Every project is labelled with its real build stage. Real screenshots from the real products, and no metric I can't stand behind.",
    heroPrimary: "Discuss my project",
    heroSecondary: "Browse the work",
    filterAll: "All work",
    filterFeatured: "Featured",
    featuredTitle: "Featured builds",
    featuredIntro: "The four projects that best show what I can take from idea to working product.",
    allWorkTitle: "All work",
    allWorkIntro: "Everything else, grouped by what kind of build it is.",
    emptyFilter: "Nothing in this category yet.",
    viewCase: "View case",
    requestSimilar: "Request a similar system",
    live: "View live project",
    outcomeLabel: "What it changes",
    problemLabel: "Problem",
    builtLabel: "What was built",
    capabilitiesLabel: "Capabilities",
    capsTitle: "What I can build for you",
    capsIntro: "Each capability below is listed against the projects where it was actually built.",
    capsWhere: "Built in",
    ctaTitle: "Have a product in mind?",
    ctaBody:
      "Send a short description of what you want to launch. I'll come back with the fastest realistic MVP, the core scope and a first launch path — not a generic quote.",
    ctaButton: "Describe your project",
    dialogTitle: "Tell me what you want to build",
    dialogDesc:
      "A few lines about the product and who it's for. I'll reply with how I'd scope and build it.",
    dialogSubmit: "Send request",
    dialogOkTitle: "Request received",
    dialogOkBody: "Got it — I'll come back to you personally about your project.",
    dialogHelp: "What do you want to build?",
    productCta: "Planning a mobile app, SaaS or AI product?",
    productCtaBtn: "See AI product development",
  },
  ua: {
    metaTitle: "Обрані роботи — SaaS-платформи, AI-продукти, маркетплейси та веб-застосунки | Vlad Kuzmenko",
    metaDesc:
      "Обрані білди: SaaS-платформи, маркетплейси, AI-продукти, клієнтські портали та конверсійні сайти — від першого MVP до робочих продакшн-систем. Чесні етапи розробки, справжні скриншоти, без вигаданих метрик.",
    eyebrow: "Обрані роботи",
    title: "Продукти, створені працювати, а не лише гарно виглядати",
    intro:
      "Обрані SaaS-платформи, маркетплейси, AI-продукти та конверсійні сайти — від першого MVP до робочих продакшн-систем.",
    trustLine:
      "Кожен проєкт позначено реальним етапом розробки. Справжні скриншоти зі справжніх продуктів і жодної метрики, за яку я не можу відповісти.",
    heroPrimary: "Обговорити мій проєкт",
    heroSecondary: "Переглянути роботи",
    filterAll: "Усі роботи",
    filterFeatured: "Ключові",
    featuredTitle: "Ключові білди",
    featuredIntro: "Чотири проєкти, які найкраще показують, що я доводжу від ідеї до робочого продукту.",
    allWorkTitle: "Усі роботи",
    allWorkIntro: "Решта проєктів, згрупована за типом білду.",
    emptyFilter: "У цій категорії поки що порожньо.",
    viewCase: "Відкрити кейс",
    requestSimilar: "Замовити подібну систему",
    live: "Переглянути живий проєкт",
    outcomeLabel: "Що це змінює",
    problemLabel: "Проблема",
    builtLabel: "Що створено",
    capabilitiesLabel: "Можливості",
    capsTitle: "Що я можу побудувати для вас",
    capsIntro: "Кожну можливість нижче вказано разом із проєктами, де її справді реалізовано.",
    capsWhere: "Реалізовано в",
    ctaTitle: "Маєте продукт на думці?",
    ctaBody:
      "Надішліть короткий опис того, що хочете запустити. Я повернуся з найшвидшим реалістичним MVP, ключовим обсягом і першим шляхом до запуску — а не шаблонним прайсом.",
    ctaButton: "Описати проєкт",
    dialogTitle: "Розкажіть, що хочете побудувати",
    dialogDesc:
      "Кілька рядків про продукт і для кого він. Відповім, як я б визначив обсяг і побудував це.",
    dialogSubmit: "Надіслати запит",
    dialogOkTitle: "Запит отримано",
    dialogOkBody: "Прийнято — я особисто повернуся до вас щодо вашого проєкту.",
    dialogHelp: "Що хочете побудувати?",
    productCta: "Плануєте мобільний застосунок, SaaS або AI-продукт?",
    productCtaBtn: "Дивитися розробку AI-продуктів",
  },
  ru: {
    metaTitle: "Избранные работы — SaaS-платформы, AI-продукты, маркетплейсы и веб-приложения | Vlad Kuzmenko",
    metaDesc:
      "Избранные билды: SaaS-платформы, маркетплейсы, AI-продукты, клиентские порталы и конверсионные сайты — от первого MVP до работающих продакшн-систем. Честные этапы разработки, реальные скриншоты, без выдуманных метрик.",
    eyebrow: "Избранные работы",
    title: "Продукты, созданные работать, а не просто красиво выглядеть",
    intro:
      "Избранные SaaS-платформы, маркетплейсы, AI-продукты и конверсионные сайты — от первого MVP до работающих продакшн-систем.",
    trustLine:
      "Каждый проект помечен реальным этапом разработки. Реальные скриншоты из реальных продуктов и ни одной метрики, за которую я не могу ответить.",
    heroPrimary: "Обсудить мой проект",
    heroSecondary: "Посмотреть работы",
    filterAll: "Все работы",
    filterFeatured: "Ключевые",
    featuredTitle: "Ключевые билды",
    featuredIntro: "Четыре проекта, которые лучше всего показывают, что я довожу от идеи до работающего продукта.",
    allWorkTitle: "Все работы",
    allWorkIntro: "Остальные проекты, сгруппированные по типу билда.",
    emptyFilter: "В этой категории пока пусто.",
    viewCase: "Открыть кейс",
    requestSimilar: "Заказать похожую систему",
    live: "Открыть живой проект",
    outcomeLabel: "Что это меняет",
    problemLabel: "Проблема",
    builtLabel: "Что создано",
    capabilitiesLabel: "Возможности",
    capsTitle: "Что я могу построить для вас",
    capsIntro: "Каждая возможность ниже указана вместе с проектами, где она действительно реализована.",
    capsWhere: "Реализовано в",
    ctaTitle: "Есть продукт на уме?",
    ctaBody:
      "Пришлите короткое описание того, что хотите запустить. Я вернусь с самым быстрым реалистичным MVP, ключевым объёмом и первым путём к запуску — а не шаблонным прайсом.",
    ctaButton: "Описать проект",
    dialogTitle: "Расскажите, что хотите построить",
    dialogDesc:
      "Несколько строк о продукте и для кого он. Отвечу, как бы я определил объём и построил это.",
    dialogSubmit: "Отправить запрос",
    dialogOkTitle: "Запрос получен",
    dialogOkBody: "Принято — я лично вернусь к вам по вашему проекту.",
    dialogHelp: "Что хотите построить?",
    productCta: "Планируете мобильное приложение, SaaS или AI-продукт?",
    productCtaBtn: "Смотреть разработку AI-продуктов",
  },
};

/** Case-page chrome copy. */
export const CASE_UI: Record<
  Lang,
  {
    allWork: string;
    contextLabel: string;
    problemLabel: string;
    outcomeLabel: string;
    builtLabel: string;
    flowLabel: string;
    capabilitiesLabel: string;
    galleryLabel: string;
    galleryNote: string;
    techLabel: string;
    proofLabel: string;
    scopeLabel: string;
    notClaimedLabel: string;
    ctaTitle: string;
    ctaBody: string;
    dialogDesc: string;
    dialogSubmit: string;
    dialogOkTitle: string;
    dialogOkBody: string;
    dialogHelp: string;
    moreTitle: string;
  }
> = {
  en: {
    allWork: "All work",
    contextLabel: "Context",
    problemLabel: "The challenge",
    outcomeLabel: "Desired outcome",
    builtLabel: "What was built",
    flowLabel: "How the product works",
    capabilitiesLabel: "Key capabilities",
    galleryLabel: "Visual walkthrough",
    galleryNote: "Screens from the real product.",
    techLabel: "Technical implementation",
    proofLabel: "Proof & current status",
    scopeLabel: "Scope & honesty",
    notClaimedLabel: "Not claimed",
    ctaTitle: "Building something similar?",
    ctaBody: "Tell me what you want to launch and I'll come back with the scope, the fastest realistic MVP and a first launch path.",
    dialogDesc: "Tell me about your project and I'll come back on how I'd build something similar for you.",
    dialogSubmit: "Send request",
    dialogOkTitle: "Request received",
    dialogOkBody: "Got it — I'll reach out about building something similar for you.",
    dialogHelp: "Tell me about your project",
    moreTitle: "More work",
  },
  ua: {
    allWork: "Усі роботи",
    contextLabel: "Контекст",
    problemLabel: "Виклик",
    outcomeLabel: "Бажаний результат",
    builtLabel: "Що було побудовано",
    flowLabel: "Як працює продукт",
    capabilitiesLabel: "Ключові можливості",
    galleryLabel: "Візуальний розбір",
    galleryNote: "Екрани зі справжнього продукту.",
    techLabel: "Технічна реалізація",
    proofLabel: "Підтвердження та поточний статус",
    scopeLabel: "Межі та чесність",
    notClaimedLabel: "Що я НЕ приписую собі",
    ctaTitle: "Будуєте щось подібне?",
    ctaBody: "Розкажіть, що хочете запустити, і я повернуся з обсягом, найшвидшим реалістичним MVP і першим шляхом до запуску.",
    dialogDesc: "Розкажіть про ваш проєкт — я повернуся з тим, як побудував би подібне для вас.",
    dialogSubmit: "Надіслати запит",
    dialogOkTitle: "Запит отримано",
    dialogOkBody: "Прийнято — зв'яжусь щодо створення подібного для вас.",
    dialogHelp: "Розкажіть про ваш проєкт",
    moreTitle: "Інші роботи",
  },
  ru: {
    allWork: "Все работы",
    contextLabel: "Контекст",
    problemLabel: "Вызов",
    outcomeLabel: "Желаемый результат",
    builtLabel: "Что было построено",
    flowLabel: "Как работает продукт",
    capabilitiesLabel: "Ключевые возможности",
    galleryLabel: "Визуальный разбор",
    galleryNote: "Экраны из реального продукта.",
    techLabel: "Техническая реализация",
    proofLabel: "Подтверждение и текущий статус",
    scopeLabel: "Границы и честность",
    notClaimedLabel: "Что я НЕ приписываю себе",
    ctaTitle: "Строите что-то похожее?",
    ctaBody: "Расскажите, что хотите запустить, и я вернусь с объёмом, самым быстрым реалистичным MVP и первым путём к запуску.",
    dialogDesc: "Расскажите о вашем проекте — я вернусь с тем, как построил бы подобное для вас.",
    dialogSubmit: "Отправить запрос",
    dialogOkTitle: "Запрос получен",
    dialogOkBody: "Принято — свяжусь насчёт создания подобного для вас.",
    dialogHelp: "Расскажите о вашем проекте",
    moreTitle: "Другие работы",
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
    shots: ["/case-studies/tutorivo/home.webp", "/case-studies/tutorivo/catalog.webp"],
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
        captions: ["Tutorivo — home", "Tutor catalog"],
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
        captions: ["Tutorivo — головна", "Каталог репетиторів"],
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
        captions: ["Tutorivo — главная", "Каталог репетиторов"],
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
      abstract: p.content[locale].outcome,
      genre: CATEGORY_LABEL[p.category][locale],
      creativeWorkStatus: STATUS_LABEL[p.status][locale],
      ...(p.shots.length ? { image: `${SITE.url}${p.shots[0]}` } : {}),
      ...(p.caseSlug ? { mainEntityOfPage: `${SITE.url}${localePath(locale, `work/${p.caseSlug}`)}` } : {}),
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
