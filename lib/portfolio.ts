// Client-facing portfolio + AI-product-development data (EN/UA/RU).
//
// Honesty rules (same as the case-study system):
//  - Every project carries an explicit build-stage status.
//  - No invented metrics, revenue, conversion or launch results.
//  - A capability is listed only where it genuinely exists in the project.
//  - Screenshots are reused only where they actually exist on disk; projects
//    without assets render without a screenshot and are tracked in
//    MATERIALS_NEEDED.md.
//  - Only client work / real builds appear here (the internal Sales Copilot
//    pilot is intentionally excluded — it is not client work).
import { type Lang, langHref } from "@/lib/i18n";
import { type CaseStatus, STATUS_LABEL } from "@/lib/case-studies";
import { SITE } from "@/lib/site";

export type Category =
  | "ai_products"
  | "web_platforms"
  | "lead_systems"
  | "automation"
  | "content_systems";

export const CATEGORY_ORDER: Category[] = [
  "ai_products",
  "web_platforms",
  "lead_systems",
  "automation",
  "content_systems",
];

export const CATEGORY_LABEL: Record<Category, Record<Lang, string>> = {
  ai_products: { en: "AI Products", ua: "AI-продукти", ru: "AI-продукты" },
  web_platforms: { en: "Web Platforms", ua: "Веб-платформи", ru: "Веб-платформы" },
  lead_systems: { en: "Lead Systems", ua: "Системи лідів", ru: "Системы лидов" },
  automation: { en: "Automation", ua: "Автоматизація", ru: "Автоматизация" },
  content_systems: { en: "Content Systems", ua: "Контент-системи", ru: "Контент-системы" },
};

export interface PortfolioCardContent {
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
  status: CaseStatus;
  /** Slug of a /work/[slug] detail page, when one exists. */
  caseSlug?: string;
  /** Screenshot paths (may be empty when no real assets exist yet). */
  shots: string[];
  content: Record<Lang, PortfolioCardContent>;
}

export const PORTFOLIO: PortfolioCard[] = [
  {
    key: "turbotaai",
    category: "ai_products",
    status: "active_development",
    caseSlug: "turbotaai",
    shots: ["/case-studies/turbotaai/home.webp"],
    content: {
      en: {
        name: "TurbotaAI",
        type: "AI assistant product · Build in public",
        problem:
          "An AI assistant product has to prove that chat / voice / video, accounts and subscriptions actually fit together.",
        built:
          "A chat / voice / video experience with an access profile and subscription / pricing logic.",
        capabilities: ["User accounts", "Subscriptions & payments", "AI logic", "Mobile release"],
        caption: "TurbotaAI — home",
      },
      ua: {
        name: "TurbotaAI",
        type: "AI-асистент як продукт · Build in public",
        problem:
          "AI-продукт має довести, що чат / голос / відео, акаунти та підписки справді працюють разом.",
        built:
          "Досвід чату / голосу / відео з профілем доступу та логікою підписки / тарифів.",
        capabilities: ["Акаунти", "Підписки й оплати", "AI-логіка", "Реліз у сторах"],
        caption: "TurbotaAI — головна",
      },
      ru: {
        name: "TurbotaAI",
        type: "AI-ассистент как продукт · Build in public",
        problem:
          "AI-продукт должен доказать, что чат / голос / видео, аккаунты и подписки реально работают вместе.",
        built:
          "Опыт чата / голоса / видео с профилем доступа и логикой подписки / тарифов.",
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
        problem:
          "Calls go unanswered and callers aren't routed to the right place fast enough.",
        built:
          "A voice assistant that answers and routes callers in natural speech — with a working audio demo.",
        capabilities: ["Voice AI", "Call answering", "Call routing"],
      },
      ua: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовий AI",
        problem:
          "Дзвінки лишаються без відповіді, а тих, хто телефонує, не встигають скерувати куди треба.",
        built:
          "Голосовий асистент, що відповідає й маршрутизує дзвінки природним мовленням — зі справжнім аудіодемо.",
        capabilities: ["Голосовий AI", "Відповіді на дзвінки", "Маршрутизація"],
      },
      ru: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовой AI",
        problem:
          "Звонки остаются без ответа, а звонящих не успевают направить куда нужно.",
        built:
          "Голосовой ассистент, отвечающий и маршрутизирующий звонки естественной речью — с реальным аудиодемо.",
        capabilities: ["Голосовой AI", "Ответы на звонки", "Маршрутизация"],
      },
    },
  },
  {
    key: "tutorivo",
    category: "web_platforms",
    status: "active_development",
    caseSlug: "tutorivo",
    shots: ["/case-studies/tutorivo/home.webp"],
    content: {
      en: {
        name: "Tutorivo",
        type: "Marketplace web platform · Education",
        problem:
          "Tutors and students were scattered across chats and spreadsheets — no single place to browse, apply, package lessons and manage requests.",
        built:
          "A tutor marketplace: searchable catalog, “become a tutor” application, admin review and lesson-package logic, in a multilingual structure.",
        capabilities: [
          "User accounts",
          "Subscriptions & payments",
          "Profiles & roles",
          "Admin & moderation",
          "Multilingual",
        ],
        caption: "Tutorivo — home",
      },
      ua: {
        name: "Tutorivo",
        type: "Веб-платформа-маркетплейс · Освіта",
        problem:
          "Репетитори та учні були розкидані по чатах і таблицях — не було єдиного місця, щоб шукати, подавати заявку, формувати пакети уроків і керувати запитами.",
        built:
          "Маркетплейс репетиторів: пошуковий каталог, заявка «стати репетитором», адмін-модерація та логіка пакетів уроків у багатомовній структурі.",
        capabilities: [
          "Акаунти",
          "Підписки й оплати",
          "Профілі й ролі",
          "Адмін і модерація",
          "Багатомовність",
        ],
        caption: "Tutorivo — головна",
      },
      ru: {
        name: "Tutorivo",
        type: "Веб-платформа-маркетплейс · Образование",
        problem:
          "Репетиторы и ученики были разбросаны по чатам и таблицам — не было единого места, чтобы искать, подавать заявку, формировать пакеты уроков и управлять запросами.",
        built:
          "Маркетплейс репетиторов: поисковый каталог, заявка «стать репетитором», админ-модерация и логика пакетов уроков в многоязычной структуре.",
        capabilities: [
          "Аккаунты",
          "Подписки и оплаты",
          "Профили и роли",
          "Админ и модерация",
          "Многоязычность",
        ],
        caption: "Tutorivo — главная",
      },
    },
  },
  {
    key: "leather-clinic",
    category: "web_platforms",
    status: "active_development",
    shots: [],
    content: {
      en: {
        name: "Leather Clinic",
        type: "Website · Local specialist service",
        problem:
          "A specialist local service needed a clean, premium site that turns visitors into enquiries.",
        built:
          "A premium website for a specialist service, structured to convert visitors into enquiries.",
        capabilities: ["Business website", "Enquiry conversion"],
      },
      ua: {
        name: "Leather Clinic",
        type: "Сайт · Локальний спеціалізований сервіс",
        problem:
          "Спеціалізованому локальному сервісу потрібен був чистий преміальний сайт, що перетворює відвідувачів на запити.",
        built:
          "Преміальний сайт для спеціалізованого сервісу, побудований, щоб перетворювати відвідувачів на запити.",
        capabilities: ["Бізнес-сайт", "Конверсія в запити"],
      },
      ru: {
        name: "Leather Clinic",
        type: "Сайт · Локальный специализированный сервис",
        problem:
          "Специализированному локальному сервису нужен был чистый премиальный сайт, превращающий посетителей в запросы.",
        built:
          "Премиальный сайт для специализированного сервиса, построенный, чтобы превращать посетителей в запросы.",
        capabilities: ["Бизнес-сайт", "Конверсия в запросы"],
      },
    },
  },
  {
    key: "status-auto",
    category: "lead_systems",
    status: "prototype",
    caseSlug: "status-auto",
    shots: ["/case-studies/status-auto/home.webp"],
    content: {
      en: {
        name: "Status Auto",
        type: "Auto-dealer lead platform",
        problem:
          "A dealership needed to present inventory well and turn online interest into real buyer enquiries instead of losing them to slow replies.",
        built:
          "Premium inventory presentation, a vehicle catalog and a buyer request / consultation flow wired for instant response.",
        capabilities: ["Inventory / catalog", "Lead capture", "Instant-response flow"],
        caption: "Status Auto — home",
      },
      ua: {
        name: "Status Auto",
        type: "Платформа лідів для автодилера",
        problem:
          "Дилерству потрібно було гарно презентувати автопарк і перетворювати онлайн-інтерес на реальні запити покупців, а не втрачати їх через повільні відповіді.",
        built:
          "Преміальна презентація автопарку, каталог авто та потік запиту / консультації покупця з миттєвою відповіддю.",
        capabilities: ["Каталог / автопарк", "Захоплення лідів", "Миттєва відповідь"],
        caption: "Status Auto — головна",
      },
      ru: {
        name: "Status Auto",
        type: "Платформа лидов для автодилера",
        problem:
          "Дилерству нужно было хорошо презентовать автопарк и превращать онлайн-интерес в реальные запросы покупателей, а не терять их из-за медленных ответов.",
        built:
          "Премиальная презентация автопарка, каталог авто и поток запроса / консультации покупателя с мгновенным ответом.",
        capabilities: ["Каталог / автопарк", "Захват лидов", "Мгновенный ответ"],
        caption: "Status Auto — главная",
      },
    },
  },
  {
    key: "dating-crm",
    category: "automation",
    status: "active_development",
    shots: [],
    content: {
      en: {
        name: "Dating CRM",
        type: "CRM + automation",
        problem:
          "Conversations went cold because tracking, reminders and follow-up were manual.",
        built:
          "A CRM with automated tracking, reminders and follow-up so no conversation goes cold.",
        capabilities: ["Communication workflows", "Admin & moderation", "Automated follow-up"],
      },
      ua: {
        name: "Dating CRM",
        type: "CRM + автоматизація",
        problem:
          "Розмови згасали, бо відстеження, нагадування та фолоу-ап робилися вручну.",
        built:
          "CRM з автоматичним відстеженням, нагадуваннями та фолоу-апом, щоб жодна розмова не згасала.",
        capabilities: ["Комунікаційні процеси", "Адмін і модерація", "Автоматичний фолоу-ап"],
      },
      ru: {
        name: "Dating CRM",
        type: "CRM + автоматизация",
        problem:
          "Диалоги угасали, потому что трекинг, напоминания и фоллоу-ап делались вручную.",
        built:
          "CRM с автоматическим трекингом, напоминаниями и фоллоу-апом, чтобы ни один диалог не угасал.",
        capabilities: ["Коммуникационные процессы", "Админ и модерация", "Автоматический фоллоу-ап"],
      },
    },
  },
];

/** Portfolio page chrome copy. */
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
    problemLabel: string;
    builtLabel: string;
    capabilitiesLabel: string;
    productCta: string;
    productCtaNote: string;
  }
> = {
  en: {
    metaTitle: "Selected Work — Client platforms, AI products & systems | Vlad Kuzmenko",
    metaDesc:
      "A focused portfolio of real client builds: AI products, web platforms, lead systems, automation and content systems. Honest status labels, real screenshots, no invented numbers.",
    eyebrow: "Selected work",
    title: "Client platforms, AI products and systems",
    intro:
      "Real builds only, grouped by what they do. Each carries an honest status label and real screenshots where available — no invented numbers.",
    viewCase: "View case",
    requestSimilar: "Request a similar system",
    problemLabel: "Problem",
    builtLabel: "What was built",
    capabilitiesLabel: "Capabilities",
    productCta: "Looking specifically for AI product development?",
    productCtaNote: "See the focused product-development page",
  },
  ua: {
    metaTitle: "Обрані роботи — клієнтські платформи, AI-продукти та системи | Vlad Kuzmenko",
    metaDesc:
      "Сфокусоване портфоліо реальних клієнтських білдів: AI-продукти, веб-платформи, системи лідів, автоматизація та контент-системи. Чесні статуси, справжні скриншоти, без вигаданих цифр.",
    eyebrow: "Обрані роботи",
    title: "Клієнтські платформи, AI-продукти та системи",
    intro:
      "Лише реальні білди, згруповані за призначенням. Кожен має чесний статус і справжні скриншоти, де вони є — без вигаданих цифр.",
    viewCase: "Відкрити кейс",
    requestSimilar: "Замовити подібну систему",
    problemLabel: "Проблема",
    builtLabel: "Що створено",
    capabilitiesLabel: "Можливості",
    productCta: "Шукаєте саме розробку AI-продукту?",
    productCtaNote: "Перейти на сторінку розробки продуктів",
  },
  ru: {
    metaTitle: "Избранные работы — клиентские платформы, AI-продукты и системы | Vlad Kuzmenko",
    metaDesc:
      "Сфокусированное портфолио реальных клиентских билдов: AI-продукты, веб-платформы, системы лидов, автоматизация и контент-системы. Честные статусы, реальные скриншоты, без выдуманных цифр.",
    eyebrow: "Избранные работы",
    title: "Клиентские платформы, AI-продукты и системы",
    intro:
      "Только реальные билды, сгруппированные по назначению. У каждого честный статус и реальные скриншоты, где они есть — без выдуманных цифр.",
    viewCase: "Открыть кейс",
    requestSimilar: "Заказать похожую систему",
    problemLabel: "Проблема",
    builtLabel: "Что создано",
    capabilitiesLabel: "Возможности",
    productCta: "Нужна именно разработка AI-продукта?",
    productCtaNote: "Перейти на страницу разработки продуктов",
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
  status: CaseStatus;
  caseSlug?: string;
  shots: string[];
  content: Record<Lang, ProductCaseContent>;
}

export const PRODUCT_CASES: ProductCase[] = [
  {
    key: "turbotaai",
    status: "active_development",
    caseSlug: "turbotaai",
    shots: ["/case-studies/turbotaai/home.webp", "/case-studies/turbotaai/pricing.webp"],
    content: {
      en: {
        name: "TurbotaAI",
        context: "An AI assistant product built in public — chat, voice and video with accounts and subscriptions.",
        problem:
          "Prove that a full AI product — the chat/voice/video experience, accounts and paid subscriptions — actually fits together end to end.",
        designed:
          "MVP architecture for a multi-modal AI assistant: access profiles, subscription/pricing logic and the AI interaction flow.",
        implemented:
          "The chat / voice / video experience, an access profile, and subscription / pricing logic, prepared for store release.",
        role:
          "Vlad led product decomposition, MVP architecture, backend and AI integration, implementation control, QA and the release process; specialist developers are involved when the approved scope requires it.",
        capabilities: ["User accounts", "Subscriptions & payments", "AI logic", "iOS/Android release", "MVP architecture"],
        technologies: ["Next.js", "AI assistant", "Auth / profiles", "Subscriptions"],
        proves:
          "That an AI product can be taken from concept and architecture through implementation to a store-ready release — real UX, real accounts, real billing.",
        captions: ["TurbotaAI — home", "Pricing & access"],
      },
      ua: {
        name: "TurbotaAI",
        context: "AI-асистент як продукт у форматі build-in-public — чат, голос і відео з акаунтами та підписками.",
        problem:
          "Довести, що повноцінний AI-продукт — досвід чату/голосу/відео, акаунти та платні підписки — справді працює наскрізно.",
        designed:
          "MVP-архітектура мультимодального AI-асистента: профілі доступу, логіка підписки/тарифів та потік AI-взаємодії.",
        implemented:
          "Досвід чату / голосу / відео, профіль доступу та логіка підписки / тарифів, підготовлені до релізу в сторах.",
        role:
          "Влад вів декомпозицію продукту, MVP-архітектуру, бекенд та інтеграцію AI, контроль реалізації, QA і процес релізу; профільні розробники залучаються, коли цього вимагає погоджений обсяг.",
        capabilities: ["Акаунти", "Підписки й оплати", "AI-логіка", "Реліз iOS/Android", "MVP-архітектура"],
        technologies: ["Next.js", "AI-асистент", "Авторизація / профілі", "Підписки"],
        proves:
          "Що AI-продукт можна провести від концепту й архітектури через реалізацію до готового до сторів релізу — реальний UX, акаунти й білінг.",
        captions: ["TurbotaAI — головна", "Тарифи й доступ"],
      },
      ru: {
        name: "TurbotaAI",
        context: "AI-ассистент как продукт в формате build-in-public — чат, голос и видео с аккаунтами и подписками.",
        problem:
          "Доказать, что полноценный AI-продукт — опыт чата/голоса/видео, аккаунты и платные подписки — реально работает сквозным образом.",
        designed:
          "MVP-архитектура мультимодального AI-ассистента: профили доступа, логика подписки/тарифов и поток AI-взаимодействия.",
        implemented:
          "Опыт чата / голоса / видео, профиль доступа и логика подписки / тарифов, подготовленные к релизу в сторах.",
        role:
          "Влад вёл декомпозицию продукта, MVP-архитектуру, бэкенд и интеграцию AI, контроль реализации, QA и процесс релиза; профильные разработчики привлекаются, когда этого требует согласованный объём.",
        capabilities: ["Аккаунты", "Подписки и оплаты", "AI-логика", "Релиз iOS/Android", "MVP-архитектура"],
        technologies: ["Next.js", "AI-ассистент", "Авторизация / профили", "Подписки"],
        proves:
          "Что AI-продукт можно провести от концепта и архитектуры через реализацию до готового к сторам релиза — реальный UX, аккаунты и биллинг.",
        captions: ["TurbotaAI — главная", "Тарифы и доступ"],
      },
    },
  },
  {
    key: "tutorivo",
    status: "active_development",
    caseSlug: "tutorivo",
    shots: ["/case-studies/tutorivo/home.webp", "/case-studies/tutorivo/admin.webp"],
    content: {
      en: {
        name: "Tutorivo",
        context: "A multilingual tutor-marketplace web platform, ready to onboard users and take payments.",
        problem:
          "Turn a messy, manual tutor/student process into one platform with catalog, applications, roles, moderation and payments.",
        designed:
          "MVP architecture for a two-sided marketplace: catalog and search, a tutor application flow, user roles, an admin/moderation layer, lesson-package and payment logic, in a multilingual structure.",
        implemented:
          "The searchable catalog, the “become a tutor” application, the admin review layer and lesson-package logic across a multilingual structure.",
        role:
          "Vlad led product decomposition, MVP architecture, backend, implementation control and QA; specialist developers are involved when the approved scope requires it.",
        capabilities: ["User accounts", "Subscriptions & payments", "Profiles & roles", "Admin & moderation", "Multilingual", "MVP architecture"],
        technologies: ["Next.js", "Tailwind", "Multilingual", "Admin", "Payments"],
        proves:
          "That a real two-sided platform — accounts, roles, moderation and payments — can be architected and built as a product, not a brochure site.",
        captions: ["Tutorivo — home", "Admin review"],
      },
      ua: {
        name: "Tutorivo",
        context: "Багатомовна веб-платформа-маркетплейс репетиторів, готова приймати користувачів і оплати.",
        problem:
          "Перетворити хаотичний ручний процес репетитор/учень на одну платформу з каталогом, заявками, ролями, модерацією та оплатами.",
        designed:
          "MVP-архітектура двостороннього маркетплейсу: каталог і пошук, потік заявки репетитора, ролі користувачів, шар адмін-модерації, логіка пакетів уроків і оплат у багатомовній структурі.",
        implemented:
          "Пошуковий каталог, заявка «стати репетитором», шар адмін-модерації та логіка пакетів уроків у багатомовній структурі.",
        role:
          "Влад вів декомпозицію продукту, MVP-архітектуру, бекенд, контроль реалізації та QA; профільні розробники залучаються, коли цього вимагає погоджений обсяг.",
        capabilities: ["Акаунти", "Підписки й оплати", "Профілі й ролі", "Адмін і модерація", "Багатомовність", "MVP-архітектура"],
        technologies: ["Next.js", "Tailwind", "Багатомовність", "Адмінка", "Оплати"],
        proves:
          "Що реальну двосторонню платформу — акаунти, ролі, модерація й оплати — можна спроєктувати й побудувати як продукт, а не сайт-візитку.",
        captions: ["Tutorivo — головна", "Адмін-модерація"],
      },
      ru: {
        name: "Tutorivo",
        context: "Многоязычная веб-платформа-маркетплейс репетиторов, готовая принимать пользователей и оплаты.",
        problem:
          "Превратить хаотичный ручной процесс репетитор/ученик в одну платформу с каталогом, заявками, ролями, модерацией и оплатами.",
        designed:
          "MVP-архитектура двустороннего маркетплейса: каталог и поиск, поток заявки репетитора, роли пользователей, слой админ-модерации, логика пакетов уроков и оплат в многоязычной структуре.",
        implemented:
          "Поисковый каталог, заявка «стать репетитором», слой админ-модерации и логика пакетов уроков в многоязычной структуре.",
        role:
          "Влад вёл декомпозицию продукта, MVP-архитектуру, бэкенд, контроль реализации и QA; профильные разработчики привлекаются, когда этого требует согласованный объём.",
        capabilities: ["Аккаунты", "Подписки и оплаты", "Профили и роли", "Админ и модерация", "Многоязычность", "MVP-архитектура"],
        technologies: ["Next.js", "Tailwind", "Многоязычность", "Админка", "Оплаты"],
        proves:
          "Что реальную двустороннюю платформу — аккаунты, роли, модерация и оплаты — можно спроектировать и построить как продукт, а не сайт-визитку.",
        captions: ["Tutorivo — главная", "Админ-модерация"],
      },
    },
  },
  {
    key: "dating-crm",
    status: "active_development",
    shots: [],
    content: {
      en: {
        name: "Dating CRM",
        context: "A CRM + automation build for a relationship/dating business — not a consumer dating app.",
        problem:
          "Conversations went cold because tracking, reminders and follow-up were manual and inconsistent.",
        designed:
          "A CRM data model plus communication and follow-up workflows, with an admin/moderation layer.",
        implemented:
          "Automated tracking, reminders and follow-up workflows so no conversation goes cold, with admin/moderation.",
        role:
          "Vlad led the data model, automation workflows and implementation control; specialist developers are involved when the approved scope requires it.",
        capabilities: ["Communication workflows", "Admin & moderation", "Automated follow-up"],
        technologies: ["CRM data model", "Automation workflows"],
        proves:
          "Experience designing communication workflows, follow-up automation and an admin/moderation layer inside a real operational CRM.",
      },
      ua: {
        name: "Dating CRM",
        context: "Білд CRM + автоматизація для бізнесу у сфері знайомств — не споживчий dating-застосунок.",
        problem:
          "Розмови згасали, бо відстеження, нагадування та фолоу-ап робилися вручну й непослідовно.",
        designed:
          "Модель даних CRM плюс комунікаційні та фолоу-ап процеси з шаром адмін-модерації.",
        implemented:
          "Автоматичне відстеження, нагадування та фолоу-ап процеси, щоб жодна розмова не згасала, з адмін-модерацією.",
        role:
          "Влад вів модель даних, процеси автоматизації та контроль реалізації; профільні розробники залучаються, коли цього вимагає погоджений обсяг.",
        capabilities: ["Комунікаційні процеси", "Адмін і модерація", "Автоматичний фолоу-ап"],
        technologies: ["Модель даних CRM", "Процеси автоматизації"],
        proves:
          "Досвід проєктування комунікаційних процесів, автоматизації фолоу-апу та шару адмін-модерації всередині реальної операційної CRM.",
      },
      ru: {
        name: "Dating CRM",
        context: "Билд CRM + автоматизация для бизнеса в сфере знакомств — не потребительское dating-приложение.",
        problem:
          "Диалоги угасали, потому что трекинг, напоминания и фоллоу-ап делались вручную и непоследовательно.",
        designed:
          "Модель данных CRM плюс коммуникационные и фоллоу-ап процессы со слоем админ-модерации.",
        implemented:
          "Автоматический трекинг, напоминания и фоллоу-ап процессы, чтобы ни один диалог не угасал, с админ-модерацией.",
        role:
          "Влад вёл модель данных, процессы автоматизации и контроль реализации; профильные разработчики привлекаются, когда этого требует согласованный объём.",
        capabilities: ["Коммуникационные процессы", "Админ и модерация", "Автоматический фоллоу-ап"],
        technologies: ["Модель данных CRM", "Процессы автоматизации"],
        proves:
          "Опыт проектирования коммуникационных процессов, автоматизации фоллоу-апа и слоя админ-модерации внутри реальной операционной CRM.",
      },
    },
  },
];

/** Relevant Experience Matrix — capability → project names (verbatim from brief). */
export const EXPERIENCE_MATRIX: { capability: Record<Lang, string>; projects: string[] }[] = [
  { capability: { en: "User accounts", ua: "Акаунти користувачів", ru: "Аккаунты пользователей" }, projects: ["TurbotaAI", "Tutorivo"] },
  { capability: { en: "Subscriptions & payments", ua: "Підписки й оплати", ru: "Подписки и оплаты" }, projects: ["TurbotaAI", "Tutorivo"] },
  { capability: { en: "AI logic", ua: "AI-логіка", ru: "AI-логика" }, projects: ["TurbotaAI"] },
  { capability: { en: "Profiles & user roles", ua: "Профілі й ролі користувачів", ru: "Профили и роли пользователей" }, projects: ["Tutorivo"] },
  { capability: { en: "Admin & moderation", ua: "Адмін і модерація", ru: "Админ и модерация" }, projects: ["Tutorivo", "Dating CRM"] },
  { capability: { en: "Communication workflows", ua: "Комунікаційні процеси", ru: "Коммуникационные процессы" }, projects: ["Dating CRM"] },
  { capability: { en: "iOS & Android release process", ua: "Процес релізу iOS та Android", ru: "Процесс релиза iOS и Android" }, projects: ["TurbotaAI"] },
  { capability: { en: "Multilingual structure", ua: "Багатомовна структура", ru: "Многоязычная структура" }, projects: ["Tutorivo"] },
  { capability: { en: "MVP architecture", ua: "MVP-архітектура", ru: "MVP-архитектура" }, projects: ["TurbotaAI", "Tutorivo", "Dating CRM"] },
];

/** AI Product Development page chrome. */
export const APD_UI: Record<
  Lang,
  {
    metaTitle: string;
    metaDesc: string;
    heroTitle: string;
    heroSub: string;
    leadIntro: string;
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
    statusLabel: string;
    provesLabel: string;
    viewCase: string;
  }
> = {
  en: {
    metaTitle: "AI Product Development — from concept and architecture to launch | Vlad Kuzmenko",
    metaDesc:
      "AI products and platforms from concept and architecture to launch: product decomposition, MVP architecture, backend, AI integrations, implementation control, QA and release.",
    heroTitle: "AI products and platforms from concept and architecture to launch",
    heroSub:
      "Vlad leads product decomposition, architecture, backend, AI integrations, implementation control, QA and release. Specialist developers are involved when the approved scope requires it.",
    leadIntro:
      "Relevant, real product experience — labelled honestly by build stage, with real screenshots where they exist. No invented metrics or launch results.",
    casesEyebrow: "Relevant experience",
    casesTitle: "Product cases",
    matrixTitle: "Relevant experience matrix",
    matrixCapability: "Capability",
    matrixProjects: "Where it was built",
    howTitle: "How I work",
    how: [
      "Product discovery",
      "MVP architecture",
      "UX & technical specification",
      "Development",
      "QA & security",
      "Store / production release",
      "Iteration after real user data",
    ],
    ctaTitle: "Have an AI product or MVP in mind?",
    ctaPrimary: "Discuss your MVP",
    ctaSecondary: "Start with Technical Discovery",
    discoveryTitle: "What Technical Discovery delivers",
    discoveryIntro:
      "A paid, scoped first step that turns an idea into a concrete plan you own — before committing to full development.",
    discovery: [
      "MVP boundaries",
      "User journeys",
      "System architecture",
      "Backend & data model",
      "AI logic",
      "Integrations",
      "Security & moderation",
      "Roadmap",
      "Timeline",
      "Final development estimate",
    ],
    contextLabel: "Context",
    problemLabel: "Problem",
    designedLabel: "What was designed",
    implementedLabel: "What was implemented",
    roleLabel: "Vlad's role",
    capabilitiesLabel: "Product capabilities",
    techLabel: "Technologies",
    statusLabel: "Current status",
    provesLabel: "What this proves",
    viewCase: "View full case",
  },
  ua: {
    metaTitle: "Розробка AI-продуктів — від концепту й архітектури до запуску | Vlad Kuzmenko",
    metaDesc:
      "AI-продукти та платформи від концепту й архітектури до запуску: декомпозиція продукту, MVP-архітектура, бекенд, AI-інтеграції, контроль реалізації, QA і реліз.",
    heroTitle: "AI-продукти та платформи від концепту й архітектури до запуску",
    heroSub:
      "Влад веде декомпозицію продукту, архітектуру, бекенд, AI-інтеграції, контроль реалізації, QA і реліз. Профільні розробники залучаються, коли цього вимагає погоджений обсяг.",
    leadIntro:
      "Релевантний, реальний продуктовий досвід — чесно позначений за етапом, зі справжніми скриншотами, де вони є. Без вигаданих метрик чи результатів запуску.",
    casesEyebrow: "Релевантний досвід",
    casesTitle: "Продуктові кейси",
    matrixTitle: "Матриця релевантного досвіду",
    matrixCapability: "Можливість",
    matrixProjects: "Де це побудовано",
    howTitle: "Як я працюю",
    how: [
      "Дискавері продукту",
      "MVP-архітектура",
      "UX і технічна специфікація",
      "Розробка",
      "QA і безпека",
      "Реліз у сторі / продакшн",
      "Ітерації після реальних даних користувачів",
    ],
    ctaTitle: "Маєте на думці AI-продукт або MVP?",
    ctaPrimary: "Обговорити ваш MVP",
    ctaSecondary: "Почати з Technical Discovery",
    discoveryTitle: "Що дає Technical Discovery",
    discoveryIntro:
      "Платний перший етап з чіткими межами, що перетворює ідею на конкретний план, який належить вам — ще до повної розробки.",
    discovery: [
      "Межі MVP",
      "Сценарії користувача",
      "Архітектура системи",
      "Бекенд і модель даних",
      "AI-логіка",
      "Інтеграції",
      "Безпека й модерація",
      "Дорожня карта",
      "Терміни",
      "Фінальна оцінка розробки",
    ],
    contextLabel: "Контекст",
    problemLabel: "Проблема",
    designedLabel: "Що спроєктовано",
    implementedLabel: "Що реалізовано",
    roleLabel: "Роль Влада",
    capabilitiesLabel: "Можливості продукту",
    techLabel: "Технології",
    statusLabel: "Поточний статус",
    provesLabel: "Що це доводить",
    viewCase: "Відкрити повний кейс",
  },
  ru: {
    metaTitle: "Разработка AI-продуктов — от концепта и архитектуры до запуска | Vlad Kuzmenko",
    metaDesc:
      "AI-продукты и платформы от концепта и архитектуры до запуска: декомпозиция продукта, MVP-архитектура, бэкенд, AI-интеграции, контроль реализации, QA и релиз.",
    heroTitle: "AI-продукты и платформы от концепта и архитектуры до запуска",
    heroSub:
      "Влад ведёт декомпозицию продукта, архитектуру, бэкенд, AI-интеграции, контроль реализации, QA и релиз. Профильные разработчики привлекаются, когда этого требует согласованный объём.",
    leadIntro:
      "Релевантный, реальный продуктовый опыт — честно помеченный по этапу, с реальными скриншотами, где они есть. Без выдуманных метрик и результатов запуска.",
    casesEyebrow: "Релевантный опыт",
    casesTitle: "Продуктовые кейсы",
    matrixTitle: "Матрица релевантного опыта",
    matrixCapability: "Возможность",
    matrixProjects: "Где это построено",
    howTitle: "Как я работаю",
    how: [
      "Дискавери продукта",
      "MVP-архитектура",
      "UX и техническая спецификация",
      "Разработка",
      "QA и безопасность",
      "Релиз в сторе / продакшн",
      "Итерации после реальных данных пользователей",
    ],
    ctaTitle: "Есть на уме AI-продукт или MVP?",
    ctaPrimary: "Обсудить ваш MVP",
    ctaSecondary: "Начать с Technical Discovery",
    discoveryTitle: "Что даёт Technical Discovery",
    discoveryIntro:
      "Платный первый этап с чёткими границами, превращающий идею в конкретный план, который принадлежит вам — ещё до полной разработки.",
    discovery: [
      "Границы MVP",
      "Сценарии пользователя",
      "Архитектура системы",
      "Бэкенд и модель данных",
      "AI-логика",
      "Интеграции",
      "Безопасность и модерация",
      "Дорожная карта",
      "Сроки",
      "Финальная оценка разработки",
    ],
    contextLabel: "Контекст",
    problemLabel: "Проблема",
    designedLabel: "Что спроектировано",
    implementedLabel: "Что реализовано",
    roleLabel: "Роль Влада",
    capabilitiesLabel: "Возможности продукта",
    techLabel: "Технологии",
    statusLabel: "Текущий статус",
    provesLabel: "Что это доказывает",
    viewCase: "Открыть полный кейс",
  },
};

// ---------------------------------------------------------------------------
// Structured data (JSON-LD) — CollectionPage/CreativeWork + Service.
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
      creator: { "@id": `${SITE.url}/#vlad` },
    })),
  };
}

export function apdJsonLd(locale: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Product Development",
    serviceType: "AI product and platform development",
    description: APD_UI[locale].metaDesc,
    provider: { "@id": `${SITE.url}/#vlad` },
    areaServed: "Worldwide",
    url: `${SITE.url}${localePath(locale, "ai-product-development")}`,
  };
}
