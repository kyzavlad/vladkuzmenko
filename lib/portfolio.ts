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
  | "launched_mvp"
  | "in_development"
  | "prototype"
  | "concept";

export const STATUS_LABEL: Record<Status, Record<Lang, string>> = {
  real_client: { en: "Live client project", ua: "Живий клієнтський проєкт", ru: "Живой клиентский проект" },
  launched_mvp: { en: "Launched MVP", ua: "Запущений MVP", ru: "Запущенный MVP" },
  in_development: { en: "In development", ua: "У розробці", ru: "В разработке" },
  prototype: { en: "Completed interactive prototype", ua: "Завершений інтерактивний прототип", ru: "Завершённый интерактивный прототип" },
  concept: { en: "Completed product concept", ua: "Завершений продуктовий концепт", ru: "Завершённый продуктовый концепт" },
};

/** The status wording shown to a reader: project-specific when we have it. */
export function statusText(
  lang: Lang,
  status: Status,
  override?: Record<Lang, string>,
): string {
  return override?.[lang] ?? STATUS_LABEL[status][lang];
}

export const STATUS_TONE: Record<Status, "green" | "amber"> = {
  real_client: "green",
  launched_mvp: "green",
  in_development: "amber",
  prototype: "amber",
  concept: "amber",
};

// Categories are commercial buying categories, not technical ones — a prospect
// filters by "the kind of thing I need built".
export type Category =
  | "platforms"
  | "ai_products"
  | "mobile"
  | "ecommerce"
  | "web3"
  | "websites"
  | "automation";

export const CATEGORY_ORDER: Category[] = [
  "platforms",
  "ai_products",
  "mobile",
  "ecommerce",
  "web3",
  "websites",
  "automation",
];

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
  mobile: {
    en: "Mobile apps & Telegram products",
    ua: "Мобільні застосунки та Telegram-продукти",
    ru: "Мобильные приложения и Telegram-продукты",
  },
  ecommerce: {
    en: "Ecommerce & online stores",
    ua: "Ecommerce та онлайн-магазини",
    ru: "Ecommerce и онлайн-магазины",
  },
  web3: {
    en: "Web3, DeFi & fintech interfaces",
    ua: "Web3, DeFi та фінтех-інтерфейси",
    ru: "Web3, DeFi и финтех-интерфейсы",
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
  mobile: { en: "Mobile & Telegram", ua: "Мобільні й Telegram", ru: "Мобильные и Telegram" },
  ecommerce: { en: "Ecommerce", ua: "Ecommerce", ru: "Ecommerce" },
  web3: { en: "Web3 & fintech", ua: "Web3 і фінтех", ru: "Web3 и финтех" },
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
  /** Why it matters commercially — used by the editorial block on /work. */
  value?: string;
  /** What the delivered work produced. Every project has one. */
  result: string;
  capabilities: string[];
  /** Honesty fields for projects that have no separate case page. */
  ctaLabel?: string;
  caption?: string;
}

export interface PortfolioCard {
  key: string;
  category: Category;
  status: Status;
  /** Precise, project-specific status wording. Falls back to STATUS_LABEL. */
  statusLabel?: Record<Lang, string>;
  /** Lower number = higher up in the featured block. Absent = not featured. */
  featured?: number;
  /** Slug of a /work/[slug] detail page, when one exists. */
  caseSlug?: string;
  /** Public "View live project" URL — only for genuinely live public projects. */
  liveUrl?: string;
  /** Screenshot paths (empty when no real asset exists yet). */
  shots: string[];
  /** Real audio proof, where one exists (Ikorka voice demo). */
  audio?: string;
  content: Record<Lang, CardContent>;
}

export const PORTFOLIO: PortfolioCard[] = [
  {
    key: "turbotaai",
    category: "ai_products",
    status: "in_development",
    featured: 1,
    caseSlug: "turbotaai",
    // Public URL supplied by the project owner (portfolio-source/LIVE_PROJECTS.md).
    // A public URL evidences a reachable page only — it does not upgrade the build stage.
    liveUrl: "https://turbotaai.com/",
    shots: [
      "/case-studies/turbotaai/landing.webp",
      "/case-studies/turbotaai/pricing.webp",
      "/case-studies/turbotaai/admin-ops.webp",
    ],
    content: {
      en: {
        name: "TurbotaAI",
        type: "AI SaaS product · Customer app + operations console",
        outcome:
          "Customers sign up, try the AI, subscribe and manage their own data — while the business runs it from an admin console instead of by hand.",
        problem:
          "An AI demo is not a business. The conversation, the account, the trial limit, the payment, the consent record and the people who operate it all have to work as one product.",
        built:
          "A full AI SaaS: a customer app in three languages with accounts, trial limits, subscription and consent controls — plus an operations console for activation, subscriptions, AI cost, system health and support lookups.",
        result:
          "A complete AI SaaS is standing: the customer journey from first trial question to paid subscription and self-managed data, and the operator side that runs it — activation, subscriptions, AI cost, system health, support lookup and an append-only audit trail. Development continues against a working product, not a specification.",
        capabilities: ["User accounts", "Subscription & paywall", "Admin & operations console", "Role-based access", "Consent & data controls", "Multilingual"],
        caption: "TurbotaAI — landing",
      },
      ua: {
        name: "TurbotaAI",
        type: "AI SaaS-продукт · Клієнтський застосунок + операційна консоль",
        outcome:
          "Клієнти реєструються, пробують AI, оформлюють підписку й керують своїми даними — а бізнес веде це з адмін-консолі, а не вручну.",
        problem:
          "AI-демо — це ще не бізнес. Розмова, акаунт, ліміт пробного доступу, оплата, запис згоди та люди, які цим оперують, мають працювати як один продукт.",
        built:
          "Повноцінний AI SaaS: клієнтський застосунок трьома мовами з акаунтами, лімітами пробного доступу, підпискою та контролем згоди — плюс операційна консоль для активації, підписок, вартості AI, стану системи й підтримки.",
        result:
          "Повноцінний AI SaaS уже стоїть: шлях клієнта від першого пробного запиту до платної підписки й самостійного керування даними, і бік оператора, що цим керує — активація, підписки, вартість AI, стан системи, пошук для підтримки та незмінюваний журнал дій. Розробка триває на робочому продукті, а не на специфікації.",
        capabilities: ["Акаунти", "Підписка й пейволл", "Адмін- і операційна консоль", "Рольовий доступ", "Згода й контроль даних", "Багатомовність"],
        caption: "TurbotaAI — головна сторінка",
      },
      ru: {
        name: "TurbotaAI",
        type: "AI SaaS-продукт · Клиентское приложение + операционная консоль",
        outcome:
          "Клиенты регистрируются, пробуют AI, оформляют подписку и управляют своими данными — а бизнес ведёт это из админ-консоли, а не вручную.",
        problem:
          "AI-демо — это ещё не бизнес. Разговор, аккаунт, лимит пробного доступа, оплата, запись согласия и люди, которые этим оперируют, должны работать как один продукт.",
        built:
          "Полноценный AI SaaS: клиентское приложение на трёх языках с аккаунтами, лимитами пробного доступа, подпиской и контролем согласия — плюс операционная консоль для активации, подписок, стоимости AI, состояния системы и поддержки.",
        result:
          "Полноценный AI SaaS уже стоит: путь клиента от первого пробного запроса до платной подписки и самостоятельного управления данными, и сторона оператора, которая этим управляет — активация, подписки, стоимость AI, состояние системы, поиск для поддержки и неизменяемый журнал действий. Разработка идёт на работающем продукте, а не на спецификации.",
        capabilities: ["Аккаунты", "Подписка и пейволл", "Админ- и операционная консоль", "Ролевой доступ", "Согласие и контроль данных", "Многоязычность"],
        caption: "TurbotaAI — главная страница",
      },
    },
  },
  {
    key: "tutorivo",
    statusLabel: { en: "Launched and tested MVP", ua: "Запущений і протестований MVP", ru: "Запущенный и протестированный MVP" },
    category: "platforms",
    status: "launched_mvp",
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
        result:
          "A two-sided marketplace is launched and tested: students search and filter a verified catalogue, tutors apply through a structured form, and an operator approves who gets published. What used to live in chats and spreadsheets now runs as one product with roles, moderation and lesson-package logic.",
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
        result:
          "Двосторонній маркетплейс запущено й протестовано: учні шукають і фільтрують перевірений каталог, репетитори подають структуровану заявку, а оператор вирішує, кого публікувати. Те, що жило в чатах і таблицях, тепер працює як один продукт із ролями, модерацією та логікою пакетів уроків.",
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
        result:
          "Двусторонний маркетплейс запущен и протестирован: ученики ищут и фильтруют проверенный каталог, репетиторы подают структурированную заявку, а оператор решает, кого публиковать. То, что жило в чатах и таблицах, теперь работает как один продукт с ролями, модерацией и логикой пакетов уроков.",
        capabilities: ["Каталог и фильтры", "Профили и роли", "Админ и модерация", "Оплаты", "Пакеты уроков", "Многоязычность"],
        caption: "Tutorivo — главная",
      },
    },
  },
  {
    key: "status-auto",
    statusLabel: { en: "Completed interactive prototype", ua: "Завершений інтерактивний прототип", ru: "Завершённый интерактивный прототип" },
    category: "platforms",
    status: "prototype",
    featured: 6,
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
        result:
          "A complete buyer journey is testable end to end before any production build: browse checked inventory, compare the specifications that actually decide a purchase, and hand over budget, requirements and contact in one step. The prototype turns a dealer's slowest process into a defined, repeatable flow.",
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
        result:
          "Повний шлях покупця можна протестувати наскрізно ще до продакшн-реалізації: перегляд перевіреного автопарку, порівняння характеристик, які реально вирішують покупку, і передача бюджету, вимог і контакту за один крок. Прототип перетворює найповільніший процес дилера на визначений повторюваний потік.",
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
        result:
          "Полный путь покупателя можно протестировать сквозным образом ещё до продакшн-реализации: просмотр проверенного автопарка, сравнение характеристик, которые реально решают покупку, и передача бюджета, требований и контакта за один шаг. Прототип превращает самый медленный процесс дилера в определённый повторяемый поток.",
        capabilities: ["Каталог / автопарк", "Захват лидов", "Квалифицированная форма запроса", "Конверсионная маршрутизация"],
        caption: "Status Auto — главная",
      },
    },
  },
  {
    key: "ser-crypto",
    category: "websites",
    status: "real_client",
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
        result:
          "A live public landing that carries the brand's offer end to end: the proposition, how access works, the packages, and a single unambiguous route to registration. The page is published and reachable, and the conversion path is the delivered scope.",
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
        result:
          "Живий публічний лендинг, що несе пропозицію бренду наскрізно: сама пропозиція, як влаштований доступ, пакети та єдиний однозначний шлях до реєстрації. Сторінка опублікована й доступна, а конверсійний шлях — це і є зданий обсяг.",
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
        result:
          "Живой публичный лендинг, несущий предложение бренда сквозным образом: само предложение, как устроен доступ, пакеты и единственный однозначный путь к регистрации. Страница опубликована и доступна, а конверсионный путь — это и есть сданный объём.",
        capabilities: ["Архитектура лендинга", "Адаптивный веб", "Презентация предложения", "Конверсионный путь"],
        caption: "SerCrypto Academy — главный экран",
      },
    },
  },
  {
    key: "cod-power-group",
    statusLabel: { en: "Completed platform concept", ua: "Завершений концепт платформи", ru: "Завершённый концепт платформы" },
    category: "platforms",
    status: "concept",
    featured: 3,
    caseSlug: "cod-power-group",
    shots: [
      "/case-studies/cod-power-group/platform.webp",
      "/case-studies/cod-power-group/services.webp",
      "/case-studies/cod-power-group/models.webp",
    ],
    content: {
      en: {
        name: "COD Power Group",
        type: "Ecommerce operations platform · Cash on delivery",
        outcome:
          "One place to run cash-on-delivery selling end to end — orders, stock, couriers, call-centre confirmations and payouts — instead of a spreadsheet per country.",
        problem:
          "Cash-on-delivery sellers lose money in the gap between the order and the doorstep: unconfirmed leads, stock nobody tracks, courier statuses in four dashboards and payouts reconciled by hand.",
        built:
          "A marketing site plus an operations dashboard: orders, stock, invoices, sourcing requests, lead sources, call-centre confirmation stats, shipping status across couriers, and seller / affiliate account models.",
        result:
          "A complete operating picture for a cash-on-delivery business: the customer-facing service catalogue and both account models on one side, and on the other an operations console covering orders, stock, invoices, call-centre confirmations and multi-courier shipping status. The concept defines the whole COD chain — sourcing, confirmation, delivery, return, remittance — as one system ready for implementation.",
        capabilities: ["Orders & stock", "Call-centre pipeline", "Courier tracking", "Invoicing", "Seller & affiliate roles", "Analytics"],
        caption: "COD Power Group — platform and dashboard",
      },
      ua: {
        name: "COD Power Group",
        type: "Операційна платформа для ecommerce · Накладений платіж",
        outcome:
          "Одне місце, щоб вести продажі з накладеним платежем наскрізно — замовлення, склад, кур'єри, підтвердження кол-центру та виплати — замість таблиці на кожну країну.",
        problem:
          "Продавці з накладеним платежем втрачають гроші між замовленням і дверима покупця: непідтверджені ліди, склад, який ніхто не веде, статуси кур'єрів у чотирьох кабінетах і виплати, що зводяться вручну.",
        built:
          "Маркетинговий сайт плюс операційна панель: замовлення, склад, рахунки, запити на закупівлю, джерела лідів, статистика підтверджень кол-центру, статуси доставки по кур'єрах і моделі акаунтів продавця / партнера.",
        result:
          "Повна операційна картина для бізнесу з накладеним платежем: клієнтський каталог послуг і дві моделі акаунтів з одного боку, і операційна консоль із замовленнями, складом, рахунками, підтвердженнями кол-центру та статусами доставки по кур'єрах — з іншого. Концепт визначає весь ланцюг COD — закупівля, підтвердження, доставка, повернення, виплата — як одну систему, готову до реалізації.",
        capabilities: ["Замовлення і склад", "Пайплайн кол-центру", "Трекінг кур'єрів", "Рахунки", "Ролі продавця й партнера", "Аналітика"],
        caption: "COD Power Group — платформа та панель",
      },
      ru: {
        name: "COD Power Group",
        type: "Операционная платформа для ecommerce · Наложенный платёж",
        outcome:
          "Одно место, чтобы вести продажи с наложенным платежом сквозным образом — заказы, склад, курьеры, подтверждения колл-центра и выплаты — вместо таблицы на каждую страну.",
        problem:
          "Продавцы с наложенным платежом теряют деньги между заказом и дверью покупателя: неподтверждённые лиды, склад, который никто не ведёт, статусы курьеров в четырёх кабинетах и выплаты, сводимые вручную.",
        built:
          "Маркетинговый сайт плюс операционная панель: заказы, склад, счета, запросы на закупку, источники лидов, статистика подтверждений колл-центра, статусы доставки по курьерам и модели аккаунтов продавца / партнёра.",
        result:
          "Полная операционная картина для бизнеса с наложенным платежом: клиентский каталог услуг и две модели аккаунтов с одной стороны, и операционная консоль с заказами, складом, счетами, подтверждениями колл-центра и статусами доставки по курьерам — с другой. Концепт определяет всю цепочку COD — закупка, подтверждение, доставка, возврат, выплата — как одну систему, готовую к реализации.",
        capabilities: ["Заказы и склад", "Пайплайн колл-центра", "Трекинг курьеров", "Счета", "Роли продавца и партнёра", "Аналитика"],
        caption: "COD Power Group — платформа и панель",
      },
    },
  },
  {
    key: "nft-marketplace",
    statusLabel: { en: "Completed mobile app concept", ua: "Завершений концепт мобільного застосунку", ru: "Завершённый концепт мобильного приложения" },
    category: "mobile",
    status: "concept",
    featured: 4,
    caseSlug: "nft-marketplace",
    shots: [
      "/case-studies/nft-marketplace/auction.webp",
      "/case-studies/nft-marketplace/discovery.webp",
      "/case-studies/nft-marketplace/collections.webp",
    ],
    content: {
      en: {
        name: "NFT Marketplace App",
        type: "Mobile product concept · Marketplace & live bidding",
        outcome:
          "A mobile marketplace where people browse collections, follow a live auction and place a bid without leaving the screen they are on.",
        problem:
          "Marketplace apps fail at the moment of the bid: the price is stale, the countdown is buried, and the buyer cannot tell what happens to their money next.",
        built:
          "Three design directions for a marketplace app: onboarding, category and chain filtering, trending auctions with a live bid, a place-bid flow with bid history, seller rankings and wallet balance.",
        result:
          "A complete mobile marketplace experience in three finished design directions: onboarding, discovery with category and chain filters, a live auction with the current bid, and a place-bid screen carrying countdown, provenance and bid history. The bidding moment — where marketplace apps usually lose the buyer — is fully specified and ready to build against.",
        capabilities: ["Marketplace browsing", "Live auctions & bidding", "Filters & ranking", "Wallet balance", "Collection detail"],
        caption: "NFT marketplace — auction direction",
      },
      ua: {
        name: "NFT Marketplace App",
        type: "Концепт мобільного продукту · Маркетплейс і живі торги",
        outcome:
          "Мобільний маркетплейс, де людина переглядає колекції, стежить за живим аукціоном і робить ставку, не залишаючи екрана.",
        problem:
          "Застосунки-маркетплейси провалюються саме в момент ставки: ціна застаріла, таймер захований, а покупець не розуміє, що далі станеться з його грошима.",
        built:
          "Три дизайн-напрямки застосунку-маркетплейсу: онбординг, фільтри за категорією та мережею, трендові аукціони з живою ставкою, потік ставки з історією, рейтинги продавців і баланс гаманця.",
        result:
          "Повний досвід мобільного маркетплейсу в трьох завершених дизайн-напрямках: онбординг, пошук із фільтрами за категорією та мережею, живий аукціон із поточною ставкою та екран ставки з таймером, походженням і історією. Момент ставки — там, де застосунки-маркетплейси зазвичай втрачають покупця — повністю визначено й готово до реалізації.",
        capabilities: ["Перегляд маркетплейсу", "Живі аукціони та ставки", "Фільтри й рейтинг", "Баланс гаманця", "Сторінка колекції"],
        caption: "NFT-маркетплейс — аукціонний напрямок",
      },
      ru: {
        name: "NFT Marketplace App",
        type: "Концепт мобильного продукта · Маркетплейс и живые торги",
        outcome:
          "Мобильный маркетплейс, где человек просматривает коллекции, следит за живым аукционом и делает ставку, не покидая экрана.",
        problem:
          "Приложения-маркетплейсы проваливаются именно в момент ставки: цена устарела, таймер спрятан, а покупатель не понимает, что дальше произойдёт с его деньгами.",
        built:
          "Три дизайн-направления приложения-маркетплейса: онбординг, фильтры по категории и сети, трендовые аукционы с живой ставкой, поток ставки с историей, рейтинги продавцов и баланс кошелька.",
        result:
          "Полный опыт мобильного маркетплейса в трёх завершённых дизайн-направлениях: онбординг, поиск с фильтрами по категории и сети, живой аукцион с текущей ставкой и экран ставки с таймером, происхождением и историей. Момент ставки — там, где приложения-маркетплейсы обычно теряют покупателя — полностью определён и готов к реализации.",
        capabilities: ["Просмотр маркетплейса", "Живые аукционы и ставки", "Фильтры и рейтинг", "Баланс кошелька", "Страница коллекции"],
        caption: "NFT-маркетплейс — аукционное направление",
      },
    },
  },
  {
    key: "telegram-mining",
    statusLabel: { en: "Completed Telegram Mini App concept", ua: "Завершений концепт Telegram Mini App", ru: "Завершённый концепт Telegram Mini App" },
    category: "mobile",
    status: "concept",
    featured: 5,
    caseSlug: "telegram-mining",
    shots: [
      "/case-studies/telegram-mining/screens.webp",
      "/case-studies/telegram-mining/shop.webp",
    ],
    content: {
      en: {
        name: "Telegram Mini App — Mining",
        type: "Telegram Mini App concept · Rewards & referrals",
        outcome:
          "A product that lives inside Telegram: users come back on a timer, invite friends for a share of their activity, and upgrade a paid package without ever installing an app.",
        problem:
          "Acquisition is expensive and app installs are a wall. A Mini App removes the install, but only earns attention if there is a reason to return and a reason to invite.",
        built:
          "A Telegram Mini App: a collection timer with a claim action, a finance area for top-up and withdrawal, a referral system paying a share of invited users' activity, and a shop of upgradeable packages.",
        result:
          "A complete retention loop specified for a product that needs no install: a return timer with a claim action, a finance area for top-up and withdrawal, a referral system that pays out on invited users' activity, and an upgrade shop. The concept defines the mechanics that make a Telegram Mini App grow through its own users rather than paid acquisition.",
        capabilities: ["Telegram Mini App", "Return timer & rewards", "Referral system", "Top-up & withdrawal", "Paid upgrades"],
        caption: "Telegram Mini App — core screens",
      },
      ua: {
        name: "Telegram Mini App — Mining",
        type: "Концепт Telegram Mini App · Винагороди й реферали",
        outcome:
          "Продукт, що живе всередині Telegram: користувачі повертаються за таймером, запрошують друзів за частку від їхньої активності й купують кращий пакет — без встановлення застосунку.",
        problem:
          "Залучення дороге, а встановлення застосунку — це стіна. Mini App прибирає встановлення, але утримує увагу лише тоді, коли є причина повернутись і причина запросити.",
        built:
          "Telegram Mini App: таймер збору з дією «зібрати», фінансовий розділ для поповнення та виводу, реферальна система з часткою від активності запрошених і магазин пакетів, які можна покращувати.",
        result:
          "Повний цикл утримання для продукту, який не треба встановлювати: таймер повернення з дією «зібрати», фінансовий розділ для поповнення й виводу, реферальна система з виплатами за активність запрошених і магазин покращень. Концепт визначає механіку, завдяки якій Telegram Mini App росте через власних користувачів, а не через платне залучення.",
        capabilities: ["Telegram Mini App", "Таймер повернення й винагороди", "Реферальна система", "Поповнення та вивід", "Платні покращення"],
        caption: "Telegram Mini App — ключові екрани",
      },
      ru: {
        name: "Telegram Mini App — Mining",
        type: "Концепт Telegram Mini App · Награды и рефералы",
        outcome:
          "Продукт, живущий внутри Telegram: пользователи возвращаются по таймеру, приглашают друзей за долю от их активности и покупают пакет лучше — без установки приложения.",
        problem:
          "Привлечение дорогое, а установка приложения — это стена. Mini App убирает установку, но удерживает внимание только тогда, когда есть причина вернуться и причина пригласить.",
        built:
          "Telegram Mini App: таймер сбора с действием «собрать», финансовый раздел для пополнения и вывода, реферальная система с долей от активности приглашённых и магазин улучшаемых пакетов.",
        result:
          "Полный цикл удержания для продукта, который не нужно устанавливать: таймер возврата с действием «собрать», финансовый раздел для пополнения и вывода, реферальная система с выплатами за активность приглашённых и магазин улучшений. Концепт определяет механику, благодаря которой Telegram Mini App растёт через собственных пользователей, а не через платное привлечение.",
        capabilities: ["Telegram Mini App", "Таймер возврата и награды", "Реферальная система", "Пополнение и вывод", "Платные улучшения"],
        caption: "Telegram Mini App — ключевые экраны",
      },
    },
  },
  {
    key: "un-amour",
    statusLabel: { en: "Completed ecommerce concept", ua: "Завершений e-commerce концепт", ru: "Завершённый e-commerce концепт" },
    category: "ecommerce",
    status: "concept",
    caseSlug: "un-amour",
    shots: [
      "/case-studies/un-amour/storefront.webp",
      "/case-studies/un-amour/collection.webp",
    ],
    content: {
      en: {
        name: "UN AMOUR",
        type: "Fashion ecommerce · Ukrainian womenswear brand",
        outcome:
          "An online store that sells a considered garment the way a boutique does — the piece first, the price plainly, and a route to the catalogue that never makes the buyer hunt.",
        problem:
          "Clothing brands lose the sale between the photo and the checkout: unclear collections, prices that hide, and a catalogue that reads like a folder rather than a shop.",
        built:
          "A bilingual storefront: an editorial home, a bestseller carousel with prices, a wedding and evening collection section, catalogue navigation, search and cart.",
        result:
          "A finished bilingual storefront for a considered garment: an editorial home that leads with the piece, a priced bestseller row, a separated wedding and evening collection, and catalogue, search and cart always within reach. The store behaves like a boutique rather than a photo album.",
        capabilities: ["Storefront & catalogue", "Bestseller merchandising", "Collections", "Bilingual UA/EN", "Search & cart"],
        caption: "UN AMOUR — storefront",
      },
      ua: {
        name: "UN AMOUR",
        type: "Fashion ecommerce · Український бренд жіночого одягу",
        outcome:
          "Онлайн-магазин, що продає продуману річ так, як це робить бутик — спершу сама річ, ціна прямо, і шлях до каталогу, який не змушує шукати.",
        problem:
          "Бренди одягу втрачають продаж між фото і оплатою: незрозумілі колекції, приховані ціни й каталог, що читається як тека, а не як магазин.",
        built:
          "Двомовна вітрина: редакційна головна, карусель бестселерів із цінами, секція весільної та вечірньої колекції, навігація каталогом, пошук і кошик.",
        result:
          "Завершена двомовна вітрина для продуманої речі: редакційна головна, що починається з самого виробу, ряд бестселерів із цінами, окрема весільна та вечірня колекція, а каталог, пошук і кошик — завжди під рукою. Магазин поводиться як бутик, а не як фотоальбом.",
        capabilities: ["Вітрина й каталог", "Мерчандайзинг бестселерів", "Колекції", "Двомовність UA/EN", "Пошук і кошик"],
        caption: "UN AMOUR — вітрина",
      },
      ru: {
        name: "UN AMOUR",
        type: "Fashion ecommerce · Украинский бренд женской одежды",
        outcome:
          "Онлайн-магазин, продающий продуманную вещь так, как это делает бутик — сначала сама вещь, цена прямо, и путь в каталог, который не заставляет искать.",
        problem:
          "Бренды одежды теряют продажу между фото и оплатой: непонятные коллекции, скрытые цены и каталог, который читается как папка, а не как магазин.",
        built:
          "Двуязычная витрина: редакционная главная, карусель бестселлеров с ценами, секция свадебной и вечерней коллекции, навигация по каталогу, поиск и корзина.",
        result:
          "Завершённая двуязычная витрина для продуманной вещи: редакционная главная, начинающаяся с самого изделия, ряд бестселлеров с ценами, отдельная свадебная и вечерняя коллекция, а каталог, поиск и корзина — всегда под рукой. Магазин ведёт себя как бутик, а не как фотоальбом.",
        capabilities: ["Витрина и каталог", "Мерчандайзинг бестселлеров", "Коллекции", "Двуязычность UA/EN", "Поиск и корзина"],
        caption: "UN AMOUR — витрина",
      },
    },
  },
  {
    key: "iko",
    statusLabel: { en: "Completed B2B site concept", ua: "Завершений концепт B2B-сайту", ru: "Завершённый концепт B2B-сайта" },
    category: "web3",
    status: "concept",
    shots: ["/case-studies/iko/hero.webp"],
    content: {
      en: {
        name: "IKO",
        type: "Blockchain for business · B2B site",
        outcome:
          "Blockchain explained to a business buyer in terms of trust and paperwork, not protocols.",
        problem:
          "B2B blockchain sites talk to engineers and lose the person who signs. The buyer never learns what changes in their operation.",
        built:
          "A B2B site translating the technology into business outcomes — a secure-and-safe section, a trust argument, and an enterprise-facing contact route.",
        value:
          "Positions a deep-tech product for a commercial audience so the first meeting is about outcomes, not architecture.",
        result:
          "A finished B2B positioning system for a deep-tech product: the technology is stated as a business outcome, trust is argued before capability, and an enterprise contact route closes the page. The concept gives a blockchain company a commercial front door.",
        capabilities: ["B2B positioning", "Trust architecture", "Enterprise landing"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "IKO",
        type: "Блокчейн для бізнесу · B2B-сайт",
        outcome:
          "Блокчейн, пояснений бізнес-покупцю мовою довіри й документообігу, а не протоколів.",
        problem:
          "B2B-сайти про блокчейн говорять з інженерами й втрачають того, хто підписує. Покупець так і не дізнається, що зміниться в його роботі.",
        built:
          "B2B-сайт, що перекладає технологію в бізнес-результати: секція безпеки, аргумент довіри та корпоративний шлях до контакту.",
        value:
          "Позиціонує глибоко технічний продукт для комерційної аудиторії, щоб перша зустріч була про результати, а не про архітектуру.",
        result:
          "Завершена система B2B-позиціонування для глибоко технічного продукту: технологія подана як бізнес-результат, довіра аргументована раніше за можливості, а сторінку закриває корпоративний шлях до контакту. Концепт дає блокчейн-компанії комерційні вхідні двері.",
        capabilities: ["B2B-позиціонування", "Архітектура довіри", "Корпоративний лендинг"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "IKO",
        type: "Блокчейн для бизнеса · B2B-сайт",
        outcome:
          "Блокчейн, объяснённый бизнес-покупателю языком доверия и документооборота, а не протоколов.",
        problem:
          "B2B-сайты о блокчейне говорят с инженерами и теряют того, кто подписывает. Покупатель так и не узнаёт, что изменится в его работе.",
        built:
          "B2B-сайт, переводящий технологию в бизнес-результаты: секция безопасности, аргумент доверия и корпоративный путь к контакту.",
        value:
          "Позиционирует глубоко техничный продукт для коммерческой аудитории, чтобы первая встреча была о результатах, а не об архитектуре.",
        result:
          "Завершённая система B2B-позиционирования для глубоко техничного продукта: технология подана как бизнес-результат, доверие аргументировано раньше возможностей, а страницу закрывает корпоративный путь к контакту. Концепт даёт блокчейн-компании коммерческую входную дверь.",
        capabilities: ["B2B-позиционирование", "Архитектура доверия", "Корпоративный лендинг"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "convex",
    statusLabel: { en: "Completed DeFi product concept", ua: "Завершений концепт DeFi-продукту", ru: "Завершённый концепт DeFi-продукта" },
    category: "web3",
    status: "concept",
    shots: ["/case-studies/convex/hero.webp"],
    content: {
      en: {
        name: "Convex Staking",
        type: "DeFi staking product · Yield & audit",
        outcome:
          "A staking product where the yield, the withdrawal terms and the security audit are visible before anyone deposits.",
        problem:
          "Depositing into a yield product is irreversible. If the boost mechanism, the withdrawal rules and who audited the contracts are not on the first screen, a cautious depositor leaves.",
        built:
          "A staking landing presenting deposits for boosted yield, explicit withdrawal terms, the token model and a named third-party security audit.",
        value:
          "Puts the three questions a depositor actually has — what do I earn, when can I leave, who checked this — above the fold.",
        result:
          "A complete staking product front end in which the three questions a depositor actually asks — what do I earn, when can I leave, who checked this — are answered above the fold, with the boost mechanism, withdrawal terms and audit all placed before the deposit action.",
        capabilities: ["Staking & yield UX", "Withdrawal terms", "Audit framing", "Token presentation"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Convex Staking",
        type: "DeFi-стейкінг · Дохідність і аудит",
        outcome:
          "Стейкінг-продукт, де дохідність, умови виводу та аудит безпеки видно ще до депозиту.",
        problem:
          "Депозит у дохідний продукт незворотний. Якщо механіка бусту, правила виводу й те, хто перевіряв контракти, не на першому екрані — обережний вкладник іде.",
        built:
          "Лендинг стейкінгу з депозитами під підвищену дохідність, явними умовами виводу, моделлю токена та названим стороннім аудитом безпеки.",
        value:
          "Виносить три питання, які реально є у вкладника — скільки я заробляю, коли можу вийти, хто це перевіряв — на перший екран.",
        result:
          "Завершений фронтенд стейкінг-продукту, де три питання, які реально є у вкладника — скільки заробляю, коли можу вийти, хто це перевіряв — отримують відповідь на першому екрані, а механіка бусту, умови виводу й аудит стоять перед дією депозиту.",
        capabilities: ["UX стейкінгу", "Умови виводу", "Подача аудиту", "Презентація токена"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Convex Staking",
        type: "DeFi-стейкинг · Доходность и аудит",
        outcome:
          "Стейкинг-продукт, где доходность, условия вывода и аудит безопасности видны ещё до депозита.",
        problem:
          "Депозит в доходный продукт необратим. Если механика буста, правила вывода и то, кто проверял контракты, не на первом экране — осторожный вкладчик уходит.",
        built:
          "Лендинг стейкинга с депозитами под повышенную доходность, явными условиями вывода, моделью токена и названным сторонним аудитом безопасности.",
        value:
          "Выносит три вопроса, которые реально есть у вкладчика — сколько я зарабатываю, когда могу выйти, кто это проверял — на первый экран.",
        result:
          "Завершённый фронтенд стейкинг-продукта, где три вопроса, которые реально есть у вкладчика — сколько зарабатываю, когда могу выйти, кто это проверял — получают ответ на первом экране, а механика буста, условия вывода и аудит стоят перед действием депозита.",
        capabilities: ["UX стейкинга", "Условия вывода", "Подача аудита", "Презентация токена"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "wallet",
    statusLabel: { en: "Completed wallet product concept", ua: "Завершений концепт продукту-гаманця", ru: "Завершённый концепт продукта-кошелька" },
    category: "web3",
    status: "concept",
    shots: ["/case-studies/wallet/hero.webp"],
    content: {
      en: {
        name: "Self-Custody Wallet",
        type: "Web3 wallet · Swap & custody",
        outcome:
          "A wallet that answers \"who holds my assets\" before it asks anyone to connect.",
        problem:
          "Self-custody is the whole promise, and most wallets bury it. Users cannot tell what is collected, who audits the code, or what happens if the company disappears.",
        built:
          "A wallet product with swap and source/destination network selection, buy-crypto and add-chain entry points, plus explicit transparency and security sections covering open source, regular audits and what data is never collected.",
        value:
          "Treats custody, fees and data collection as primary interface content — the thing that earns the connect — rather than footnotes.",
        result:
          "A complete self-custody wallet experience in which custody is the argument, not the footnote: swap with network selection on one side, and open source, audit cadence and a plain statement of what is never collected on the other — everything a cautious user needs before connecting.",
        capabilities: ["Wallet & swap UX", "Network selection", "Transparency & security", "Onboarding"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Self-Custody Wallet",
        type: "Web3-гаманець · Своп і зберігання",
        outcome:
          "Гаманець, який відповідає «хто тримає мої активи» ще до того, як просить під'єднатися.",
        problem:
          "Самозберігання — це вся обіцянка, і більшість гаманців її ховає. Користувач не розуміє, що збирається, хто аудитує код і що буде, якщо компанія зникне.",
        built:
          "Продукт-гаманець зі свопом і вибором мережі відправлення/отримання, точками входу «купити крипто» та «додати мережу», плюс явні секції прозорості й безпеки: відкритий код, регулярні аудити та які дані не збираються ніколи.",
        value:
          "Робить зберігання, комісії та збір даних основним контентом інтерфейсу — тим, що заслуговує підключення, — а не виносками.",
        result:
          "Завершений досвід гаманця самозберігання, де зберігання — це аргумент, а не виноска: своп із вибором мережі з одного боку, і відкритий код, регулярність аудитів та пряма заява про те, що ніколи не збирається — з іншого. Усе, що потрібно обережному користувачу перед підключенням.",
        capabilities: ["UX гаманця та свопу", "Вибір мережі", "Прозорість і безпека", "Онбординг"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Self-Custody Wallet",
        type: "Web3-кошелёк · Своп и хранение",
        outcome:
          "Кошелёк, который отвечает «кто держит мои активы» ещё до того, как просит подключиться.",
        problem:
          "Самохранение — это всё обещание, и большинство кошельков его прячет. Пользователь не понимает, что собирается, кто аудирует код и что будет, если компания исчезнет.",
        built:
          "Продукт-кошелёк со свопом и выбором сети отправления/получения, точками входа «купить крипто» и «добавить сеть», плюс явные секции прозрачности и безопасности: открытый код, регулярные аудиты и какие данные не собираются никогда.",
        value:
          "Делает хранение, комиссии и сбор данных основным контентом интерфейса — тем, что заслуживает подключения, — а не сносками.",
        result:
          "Завершённый опыт кошелька самохранения, где хранение — это аргумент, а не сноска: своп с выбором сети с одной стороны, и открытый код, регулярность аудитов и прямое заявление о том, что никогда не собирается — с другой. Всё, что нужно осторожному пользователю перед подключением.",
        capabilities: ["UX кошелька и свопа", "Выбор сети", "Прозрачность и безопасность", "Онбординг"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "oxhash",
    statusLabel: { en: "Completed developer platform concept", ua: "Завершений концепт платформи для розробників", ru: "Завершённый концепт платформы для разработчиков" },
    category: "web3",
    status: "concept",
    shots: ["/case-studies/oxhash/hero.webp"],
    content: {
      en: {
        name: "0xHash",
        type: "Layer-2 chain · Developer platform",
        outcome:
          "A Layer-2 positioned to builders: what it costs, what it connects to, and how to get funded to build on it.",
        problem:
          "Chains compete for developers, not end users. A builder decides in one screen whether the fees, interoperability and routing are worth rewriting for — and whether anyone will fund the attempt.",
        built:
          "A chain site covering core features around fees and scalability, interoperability and blockchain routing, an ecosystem showcase and a builder grant path.",
        value:
          "Turns an infrastructure product into a recruiting page for the only audience that grows it: the people who ship on it.",
        result:
          "A finished developer-facing platform story: fees and scalability, interoperability and routing are explained as build decisions, and a grant path turns interest into a funded project. The concept recruits the only audience that grows a chain — the people who ship on it.",
        capabilities: ["Developer positioning", "Ecosystem showcase", "Grant funnel", "Technical clarity"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "0xHash",
        type: "Layer-2 мережа · Платформа для розробників",
        outcome:
          "Layer-2, спозиційований на білдерів: скільки коштує, з чим сумісний і як отримати грант, щоб будувати на ньому.",
        problem:
          "Мережі конкурують за розробників, а не за кінцевих користувачів. Білдер за один екран вирішує, чи варті комісії, сумісність і маршрутизація того, щоб переписувати код — і чи хтось профінансує спробу.",
        built:
          "Сайт мережі з ключовими можливостями навколо комісій і масштабованості, сумісності та маршрутизації, вітриною екосистеми й шляхом грантів для розробників.",
        value:
          "Перетворює інфраструктурний продукт на сторінку рекрутингу для єдиної аудиторії, яка його вирощує — тих, хто на ньому будує.",
        result:
          "Завершена платформна історія для розробників: комісії й масштабованість, сумісність і маршрутизація пояснені як рішення для білду, а шлях грантів перетворює інтерес на профінансований проєкт. Концепт рекрутує єдину аудиторію, що вирощує мережу — тих, хто на ній будує.",
        capabilities: ["Позиціонування для розробників", "Вітрина екосистеми", "Воронка грантів", "Технічна ясність"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "0xHash",
        type: "Layer-2 сеть · Платформа для разработчиков",
        outcome:
          "Layer-2, спозиционированный на билдеров: сколько стоит, с чем совместим и как получить грант, чтобы строить на нём.",
        problem:
          "Сети конкурируют за разработчиков, а не за конечных пользователей. Билдер за один экран решает, стоят ли комиссии, совместимость и маршрутизация того, чтобы переписывать код — и профинансирует ли кто-то попытку.",
        built:
          "Сайт сети с ключевыми возможностями вокруг комиссий и масштабируемости, совместимости и маршрутизации, витриной экосистемы и путём грантов для разработчиков.",
        value:
          "Превращает инфраструктурный продукт в страницу рекрутинга для единственной аудитории, которая его растит — тех, кто на нём строит.",
        result:
          "Завершённая платформенная история для разработчиков: комиссии и масштабируемость, совместимость и маршрутизация объяснены как решения для билда, а путь грантов превращает интерес в профинансированный проект. Концепт рекрутирует единственную аудиторию, растящую сеть — тех, кто на ней строит.",
        capabilities: ["Позиционирование для разработчиков", "Витрина экосистемы", "Воронка грантов", "Техническая ясность"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "aurea",
    statusLabel: { en: "Completed ecommerce concept", ua: "Завершений e-commerce концепт", ru: "Завершённый e-commerce концепт" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/aurea/landing.webp", "/case-studies/aurea/product.webp"],
    content: {
      en: {
        name: "Auréa",
        type: "Skincare brand · Ecommerce landing",
        outcome:
          "A face oil sold on ingredients and result rather than on adjectives.",
        problem:
          "Skincare buyers are sceptical and informed. A page of soft photography and vague promises gives them nothing to decide with, so they leave before the price.",
        built:
          "A conversion landing with a product hero, an ingredient-and-benefit breakdown, a route into the range, and brand product photography as the supporting layer.",
        value:
          "Puts the reason to buy — what is in it and what it does — between the photograph and the price, which is where the decision actually happens.",
        result:
          "A finished conversion landing where the reason to buy sits between the photograph and the price: the product hero, the ingredient-and-benefit argument, then the range — plus a brand photography layer that lets the same system carry future products.",
        capabilities: ["Conversion landing", "Ingredient storytelling", "Product merchandising", "Brand art direction"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Auréa",
        type: "Бренд догляду за шкірою · Ecommerce-лендинг",
        outcome:
          "Олія для обличчя, яку продають складом і результатом, а не прикметниками.",
        problem:
          "Покупці догляду скептичні й обізнані. Сторінка з м'якою зйомкою й розмитими обіцянками не дає їм нічого, щоб вирішити — і вони йдуть, не дійшовши до ціни.",
        built:
          "Конверсійний лендинг із героєм продукту, розбором складу й переваг, шляхом до лінійки та брендовою предметною зйомкою як підтримувальним шаром.",
        value:
          "Ставить причину купити — що всередині і що це дає — між фотографією й ціною, тобто саме туди, де ухвалюється рішення.",
        result:
          "Завершений конверсійний лендинг, де причина купити стоїть між фотографією й ціною: герой продукту, аргумент складу й переваг, далі лінійка — плюс шар брендової зйомки, завдяки якому та сама система витримає й майбутні продукти.",
        capabilities: ["Конверсійний лендинг", "Сторітелінг складу", "Мерчандайзинг", "Арт-дирекшн бренду"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Auréa",
        type: "Бренд ухода за кожей · Ecommerce-лендинг",
        outcome:
          "Масло для лица, которое продают составом и результатом, а не прилагательными.",
        problem:
          "Покупатели ухода скептичны и осведомлены. Страница с мягкой съёмкой и размытыми обещаниями не даёт им ничего, чтобы решить — и они уходят, не дойдя до цены.",
        built:
          "Конверсионный лендинг с героем продукта, разбором состава и преимуществ, путём к линейке и брендовой предметной съёмкой как поддерживающим слоем.",
        value:
          "Ставит причину купить — что внутри и что это даёт — между фотографией и ценой, то есть именно туда, где принимается решение.",
        result:
          "Завершённый конверсионный лендинг, где причина купить стоит между фотографией и ценой: герой продукта, аргумент состава и преимуществ, далее линейка — плюс слой брендовой съёмки, благодаря которому та же система выдержит и будущие продукты.",
        capabilities: ["Конверсионный лендинг", "Сторителлинг состава", "Мерчандайзинг", "Арт-дирекшн бренда"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "reverie",
    statusLabel: { en: "Completed art-direction concept", ua: "Завершений концепт арт-дирекції", ru: "Завершённый концепт арт-дирекции" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/reverie/landing.webp"],
    content: {
      en: {
        name: "Rêverie de Parfum",
        type: "Fragrance brand · Art direction",
        outcome:
          "A fragrance presented the way perfume actually sells — atmosphere first, bottle second.",
        problem:
          "Scent cannot be demonstrated online. If the imagery does not carry the mood, there is nothing left to sell but the price, and a premium fragrance loses instantly on price.",
        built:
          "Brand art direction and product presentation built around a single dramatic composition, with the bottle as the fixed point.",
        value:
          "Buys the premium positioning that lets a fragrance hold its price instead of competing in a discount bracket.",
        result:
          "A completed art-direction system for a product that cannot be demonstrated online: one composition carries the entire mood, with the bottle as the fixed point — the premium positioning a fragrance needs in order to hold its price.",
        capabilities: ["Brand art direction", "Product photography direction", "Premium positioning"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Rêverie de Parfum",
        type: "Парфумерний бренд · Арт-дирекшн",
        outcome:
          "Парфум, поданий так, як парфуми справді продаються — спершу атмосфера, потім флакон.",
        problem:
          "Запах неможливо показати онлайн. Якщо візуал не несе настрою, продавати лишається тільки ціною — а преміальний парфум на ціні програє одразу.",
        built:
          "Арт-дирекшн бренду й презентація продукту навколо однієї драматичної композиції, де флакон є точкою опори.",
        value:
          "Купує те преміальне позиціонування, яке дозволяє парфуму тримати ціну, а не змагатися в знижковій ніші.",
        result:
          "Завершена система арт-дирекшну для продукту, який неможливо показати онлайн: одна композиція несе весь настрій, а флакон є точкою опори — саме те преміальне позиціонування, яке потрібне парфуму, щоб тримати ціну.",
        capabilities: ["Арт-дирекшн бренду", "Режисура предметної зйомки", "Преміальне позиціонування"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Rêverie de Parfum",
        type: "Парфюмерный бренд · Арт-дирекшн",
        outcome:
          "Парфюм, поданный так, как парфюмерия действительно продаётся — сначала атмосфера, потом флакон.",
        problem:
          "Запах невозможно показать онлайн. Если визуал не несёт настроения, продавать остаётся только ценой — а премиальный парфюм на цене проигрывает сразу.",
        built:
          "Арт-дирекшн бренда и презентация продукта вокруг одной драматичной композиции, где флакон является точкой опоры.",
        value:
          "Покупает то премиальное позиционирование, которое позволяет парфюму держать цену, а не соревноваться в скидочной нише.",
        result:
          "Завершённая система арт-дирекшна для продукта, который невозможно показать онлайн: одна композиция несёт всё настроение, а флакон является точкой опоры — именно то премиальное позиционирование, которое нужно парфюму, чтобы держать цену.",
        capabilities: ["Арт-дирекшн бренда", "Режиссура предметной съёмки", "Премиальное позиционирование"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "pure",
    statusLabel: { en: "Completed product launch concept", ua: "Завершений концепт запуску продукту", ru: "Завершённый концепт запуска продукта" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/pure/landing.webp"],
    content: {
      en: {
        name: "PURE",
        type: "Electric mobility · Product landing",
        outcome:
          "An electric scooter range where the models are actually comparable before the buyer commits.",
        problem:
          "Electric mobility is a considered purchase with real anxiety attached — range, build quality, what happens after the sale. A page that lists specifications without comparing them leaves the buyer to do the work, and most will not.",
        built:
          "A product landing introducing the range, a why-choose-us argument, feature discovery, and a model comparison leading into the collection.",
        value:
          "Moves the buyer from curiosity to a specific model, which is the only step that ends in a purchase.",
        result:
          "A finished product landing that moves a visitor from curiosity to a specific model: the range is introduced, the reason to choose it is argued, features are opened up, and the models are compared side by side — the step that actually ends in a purchase.",
        capabilities: ["Product landing", "Range comparison", "Feature discovery", "Considered-purchase UX"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "PURE",
        type: "Електротранспорт · Продуктовий лендинг",
        outcome:
          "Лінійка електросамокатів, де моделі справді можна порівняти до покупки.",
        problem:
          "Електротранспорт — це виважена покупка з реальною тривогою: запас ходу, якість збірки, що буде після продажу. Сторінка, що перелічує характеристики без порівняння, перекладає роботу на покупця — а більшість її не робитиме.",
        built:
          "Продуктовий лендинг із представленням лінійки, аргументом «чому ми», розкриттям функцій і порівнянням моделей, що веде до колекції.",
        value:
          "Проводить покупця від цікавості до конкретної моделі — єдиного кроку, який закінчується покупкою.",
        result:
          "Завершений продуктовий лендинг, що веде відвідувача від цікавості до конкретної моделі: лінійку представлено, причину обрати її аргументовано, функції розкрито, а моделі порівняно поруч — саме той крок, який і закінчується покупкою.",
        capabilities: ["Продуктовий лендинг", "Порівняння лінійки", "Розкриття функцій", "UX виваженої покупки"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "PURE",
        type: "Электротранспорт · Продуктовый лендинг",
        outcome:
          "Линейка электросамокатов, где модели действительно можно сравнить до покупки.",
        problem:
          "Электротранспорт — это взвешенная покупка с реальной тревогой: запас хода, качество сборки, что будет после продажи. Страница, перечисляющая характеристики без сравнения, перекладывает работу на покупателя — а большинство её делать не станет.",
        built:
          "Продуктовый лендинг с представлением линейки, аргументом «почему мы», раскрытием функций и сравнением моделей, ведущим к коллекции.",
        value:
          "Проводит покупателя от любопытства к конкретной модели — единственному шагу, который заканчивается покупкой.",
        result:
          "Завершённый продуктовый лендинг, ведущий посетителя от любопытства к конкретной модели: линейка представлена, причина выбрать её аргументирована, функции раскрыты, а модели сравнены рядом — именно тот шаг, который и заканчивается покупкой.",
        capabilities: ["Продуктовый лендинг", "Сравнение линейки", "Раскрытие функций", "UX взвешенной покупки"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "kinex",
    statusLabel: { en: "Completed product launch concept", ua: "Завершений концепт запуску продукту", ru: "Завершённый концепт запуска продукта" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/kinex/landing.webp"],
    content: {
      en: {
        name: "KINEX",
        type: "Wearable device · Product landing",
        outcome:
          "A fitness wearable sold on what it tells you, not on how many sensors it has.",
        problem:
          "Wearables all list the same specifications. The buyer cannot tell them apart, so the category collapses into a price comparison.",
        built:
          "A device landing with a product hero, a feature breakdown across training, health monitoring and analytics, and an in-use section showing the device reporting real activity.",
        value:
          "Sells the daily moment of use rather than the hardware, which is the only thing that differentiates one wearable from another.",
        result:
          "A completed device landing that sells the daily moment of use rather than the sensor list: training, health monitoring and analytics are translated into what the wearer actually sees each morning, with an in-use section proving it.",
        capabilities: ["Device landing", "Feature architecture", "In-use storytelling", "Spec-to-benefit translation"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "KINEX",
        type: "Носимий пристрій · Продуктовий лендинг",
        outcome:
          "Фітнес-девайс, який продають тим, що він тобі повідомляє, а не кількістю сенсорів.",
        problem:
          "Усі носимі пристрої перелічують однакові характеристики. Покупець не бачить різниці — і категорія перетворюється на порівняння цін.",
        built:
          "Лендинг девайса з героєм продукту, розбором функцій у тренуваннях, моніторингу здоров'я та аналітиці, і секцією використання, де пристрій показує реальну активність.",
        value:
          "Продає щоденний момент використання, а не залізо — єдине, що відрізняє один носимий пристрій від іншого.",
        result:
          "Завершений лендинг девайса, що продає щоденний момент використання, а не список сенсорів: тренування, моніторинг здоров'я та аналітика перекладені в те, що власник реально бачить щоранку, а секція використання це підтверджує.",
        capabilities: ["Лендинг девайса", "Архітектура функцій", "Сторітелінг використання", "Переклад характеристик у користь"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "KINEX",
        type: "Носимое устройство · Продуктовый лендинг",
        outcome:
          "Фитнес-девайс, который продают тем, что он тебе сообщает, а не количеством сенсоров.",
        problem:
          "Все носимые устройства перечисляют одинаковые характеристики. Покупатель не видит разницы — и категория превращается в сравнение цен.",
        built:
          "Лендинг девайса с героем продукта, разбором функций в тренировках, мониторинге здоровья и аналитике, и секцией использования, где устройство показывает реальную активность.",
        value:
          "Продаёт ежедневный момент использования, а не железо — единственное, что отличает одно носимое устройство от другого.",
        result:
          "Завершённый лендинг девайса, продающий ежедневный момент использования, а не список сенсоров: тренировки, мониторинг здоровья и аналитика переведены в то, что владелец реально видит каждое утро, а секция использования это подтверждает.",
        capabilities: ["Лендинг девайса", "Архитектура функций", "Сторителлинг использования", "Перевод характеристик в пользу"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "velora",
    statusLabel: { en: "Completed catalogue concept", ua: "Завершений концепт каталогу", ru: "Завершённый концепт каталога" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/velora/landing.webp"],
    content: {
      en: {
        name: "Velora",
        type: "Furniture brand · Ecommerce catalogue",
        outcome:
          "A furniture catalogue a person can browse by room rather than by SKU.",
        problem:
          "Furniture is bought by imagining it in a space. A grid of cut-out products on white gives the buyer nothing to imagine with, and the sale moves to whoever shows the room.",
        built:
          "An ecommerce storefront with an editorial hero, a filterable product catalogue across seating, tables and storage, room-context photography and a contact route.",
        value:
          "Sells the room, then the item — which is how a considered furniture purchase actually forms.",
        result:
          "A finished furniture storefront that sells the room before the item: an editorial hero, a filterable catalogue across seating, tables and storage, and interior photography that gives the buyer something to imagine with.",
        capabilities: ["Ecommerce catalogue", "Category filtering", "Room-context merchandising", "Editorial storefront"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Velora",
        type: "Меблевий бренд · Ecommerce-каталог",
        outcome:
          "Меблевий каталог, який гортають за кімнатами, а не за артикулами.",
        problem:
          "Меблі купують, уявляючи їх у своєму просторі. Сітка вирізаних товарів на білому не дає чим уявляти — і продаж іде до того, хто показав кімнату.",
        built:
          "Ecommerce-вітрина з редакційним героєм, каталогом із фільтрами по м'яких меблях, столах і сховищах, зйомкою в інтер'єрі та шляхом до контакту.",
        value:
          "Продає спершу кімнату, потім предмет — саме так і формується виважена покупка меблів.",
        result:
          "Завершена меблева вітрина, що продає спершу кімнату, потім предмет: редакційний герой, каталог із фільтрами по м'яких меблях, столах і сховищах та інтер'єрна зйомка, яка дає покупцю чим уявляти.",
        capabilities: ["Ecommerce-каталог", "Фільтри категорій", "Мерчандайзинг в інтер'єрі", "Редакційна вітрина"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Velora",
        type: "Мебельный бренд · Ecommerce-каталог",
        outcome:
          "Мебельный каталог, который листают по комнатам, а не по артикулам.",
        problem:
          "Мебель покупают, представляя её в своём пространстве. Сетка вырезанных товаров на белом не даёт чем представлять — и продажа уходит к тому, кто показал комнату.",
        built:
          "Ecommerce-витрина с редакционным героем, каталогом с фильтрами по мягкой мебели, столам и хранению, съёмкой в интерьере и путём к контакту.",
        value:
          "Продаёт сначала комнату, потом предмет — именно так и формируется взвешенная покупка мебели.",
        result:
          "Завершённая мебельная витрина, продающая сначала комнату, потом предмет: редакционный герой, каталог с фильтрами по мягкой мебели, столам и хранению и интерьерная съёмка, дающая покупателю чем представлять.",
        capabilities: ["Ecommerce-каталог", "Фильтры категорий", "Мерчандайзинг в интерьере", "Редакционная витрина"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "bonatica",
    statusLabel: { en: "Completed ecommerce concept", ua: "Завершений e-commerce концепт", ru: "Завершённый e-commerce концепт" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/bonatica/landing.webp"],
    content: {
      en: {
        name: "Bonatica",
        type: "Skincare brand · Ecommerce landing",
        outcome:
          "A skincare range where each product states who it is for before it states what it costs.",
        problem:
          "A range confuses more than a single product. Without a clear reason to pick one item over its neighbour, the buyer picks nothing.",
        built:
          "A range-led landing: the hero introduces the line rather than one item, a why-it-works section grounds each claim in an ingredient, and a best-sellers grid splits the range by the need it answers.",
        value:
          "Turns a shelf of similar bottles into a guided choice, which is what converts a browsing visitor into a first order.",
        result:
          "A completed range landing that turns a shelf of similar bottles into a guided choice: each product states who it is for, the ingredient argument backs it, and the bestseller grid separates the line by need rather than by SKU.",
        capabilities: ["Conversion landing", "Range segmentation", "Ingredient argument", "Bestseller merchandising"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Bonatica",
        type: "Бренд догляду · Ecommerce-лендинг",
        outcome:
          "Лінійка догляду, де кожен продукт спершу каже, для кого він, і лише потім — скільки коштує.",
        problem:
          "Лінійка заплутує сильніше, ніж один продукт. Без чіткої причини обрати одну банку замість сусідньої покупець не обирає нічого.",
        built:
          "Лендинг, побудований навколо лінійки: герой представляє лінію, а не один товар, секція «чому це працює» підкріплює кожну тезу складом, а сітка бестселерів ділить лінійку за потребою, яку вона закриває.",
        value:
          "Перетворює полицю схожих банок на скерований вибір — саме це й конвертує відвідувача в перше замовлення.",
        result:
          "Завершений лендинг лінійки, що перетворює полицю схожих банок на скерований вибір: кожен продукт каже, для кого він, аргумент складу це підкріплює, а сітка бестселерів розділяє лінію за потребою, а не за артикулом.",
        capabilities: ["Конверсійний лендинг", "Сегментація лінійки", "Аргумент складу", "Мерчандайзинг бестселерів"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Bonatica",
        type: "Бренд ухода · Ecommerce-лендинг",
        outcome:
          "Линейка ухода, где каждый продукт сначала говорит, для кого он, и лишь потом — сколько стоит.",
        problem:
          "Линейка запутывает сильнее, чем один продукт. Без чёткой причины выбрать одну банку вместо соседней покупатель не выбирает ничего.",
        built:
          "Лендинг, построенный вокруг линейки: герой представляет линию, а не один товар, секция «почему это работает» подкрепляет каждый тезис составом, а сетка бестселлеров делит линейку по потребности, которую она закрывает.",
        value:
          "Превращает полку похожих банок в направленный выбор — именно это и конвертирует посетителя в первый заказ.",
        result:
          "Завершённый лендинг линейки, превращающий полку похожих банок в направленный выбор: каждый продукт говорит, для кого он, аргумент состава это подкрепляет, а сетка бестселлеров разделяет линию по потребности, а не по артикулу.",
        capabilities: ["Конверсионный лендинг", "Сегментация линейки", "Аргумент состава", "Мерчандайзинг бестселлеров"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "verna",
    statusLabel: { en: "Completed ecommerce concept", ua: "Завершений e-commerce концепт", ru: "Завершённый e-commerce концепт" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/verna/landing.webp"],
    content: {
      en: {
        name: "VERNA Coffee",
        type: "Coffee brand · Ecommerce landing",
        outcome:
          "A coffee range where roast, format and taste are chosen in one pass instead of three.",
        problem:
          "Coffee buyers know what they like and hate being made to guess. Hiding roast level and format behind product pages turns a quick reorder into a chore.",
        built:
          "A brand landing with a bestseller range showing roast variants and formats side by side, a brand story section and a lifestyle layer.",
        value:
          "Shortens the path to a repeat order, which is where a coffee brand's economics actually live.",
        result:
          "A finished ecommerce landing built around the repeat order: roast level, format and taste sit side by side so a returning customer reorders in one pass instead of three — where a coffee brand's economics actually live.",
        capabilities: ["Ecommerce landing", "Variant presentation", "Brand storytelling", "Repeat-purchase UX"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "VERNA Coffee",
        type: "Кавовий бренд · Ecommerce-лендинг",
        outcome:
          "Кавова лінійка, де обсмаження, формат і смак обираються за один прохід, а не за три.",
        problem:
          "Покупці кави знають, що люблять, і не терплять здогадок. Ховати ступінь обсмаження й формат за сторінками товарів — перетворювати швидке перезамовлення на морочливу справу.",
        built:
          "Брендовий лендинг із лінійкою бестселерів, де варіанти обсмаження й формати показані поруч, секцією історії бренду та лайфстайл-шаром.",
        value:
          "Скорочує шлях до повторного замовлення — саме там і живе економіка кавового бренду.",
        result:
          "Завершений ecommerce-лендинг, побудований навколо повторного замовлення: ступінь обсмаження, формат і смак стоять поруч, тож постійний клієнт перезамовляє за один прохід, а не за три — саме там і живе економіка кавового бренду.",
        capabilities: ["Ecommerce-лендинг", "Презентація варіантів", "Сторітелінг бренду", "UX повторної покупки"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "VERNA Coffee",
        type: "Кофейный бренд · Ecommerce-лендинг",
        outcome:
          "Кофейная линейка, где обжарка, формат и вкус выбираются за один проход, а не за три.",
        problem:
          "Покупатели кофе знают, что любят, и не терпят догадок. Прятать степень обжарки и формат за страницами товаров — превращать быстрый перезаказ в морочливое дело.",
        built:
          "Брендовый лендинг с линейкой бестселлеров, где варианты обжарки и форматы показаны рядом, секцией истории бренда и лайфстайл-слоем.",
        value:
          "Сокращает путь к повторному заказу — именно там и живёт экономика кофейного бренда.",
        result:
          "Завершённый ecommerce-лендинг, построенный вокруг повторного заказа: степень обжарки, формат и вкус стоят рядом, поэтому постоянный клиент перезаказывает за один проход, а не за три — именно там и живёт экономика кофейного бренда.",
        capabilities: ["Ecommerce-лендинг", "Презентация вариантов", "Сторителлинг бренда", "UX повторной покупки"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "ovulan",
    statusLabel: { en: "Completed ecommerce concept", ua: "Завершений e-commerce концепт", ru: "Завершённый e-commerce концепт" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/ovulan/detail.webp", "/case-studies/ovulan/landing.webp"],
    content: {
      en: {
        name: "Ovulan",
        type: "Luxury watches · Ecommerce landing",
        outcome:
          "A watch brand that earns its price on the first screen instead of apologising for it.",
        problem:
          "At a luxury price point the objection is not cost, it is doubt. If warranty, craftsmanship and provenance are not immediate, the buyer assumes they are absent.",
        built:
          "A luxury storefront with a dark editorial hero, warranty and craftsmanship credentials placed immediately under the headline, a collection grid and a brand-story section.",
        value:
          "Answers the doubt that stops a high-ticket purchase, which is worth more than any discount.",
        result:
          "A completed luxury storefront that answers doubt instead of discounting: warranty, craftsmanship and provenance sit immediately under the headline, then the collection — the credibility architecture a high-ticket purchase needs.",
        capabilities: ["Luxury art direction", "Credibility architecture", "Collection presentation", "High-ticket UX"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Ovulan",
        type: "Преміальні годинники · Ecommerce-лендинг",
        outcome:
          "Годинниковий бренд, що виправдовує свою ціну на першому екрані, а не вибачається за неї.",
        problem:
          "У преміальному сегменті заперечення — це не вартість, а сумнів. Якщо гарантія, майстерність і походження не видно одразу, покупець вважає, що їх немає.",
        built:
          "Преміальна вітрина з темним редакційним героєм, гарантією та майстерністю одразу під заголовком, сіткою колекції й секцією історії бренду.",
        value:
          "Відповідає на сумнів, що зупиняє дорогу покупку — і це коштує більше за будь-яку знижку.",
        result:
          "Завершена преміальна вітрина, що відповідає на сумнів замість знижок: гарантія, майстерність і походження стоять одразу під заголовком, далі колекція — саме та архітектура довіри, якої потребує дорога покупка.",
        capabilities: ["Преміальний арт-дирекшн", "Архітектура довіри", "Презентація колекції", "UX дорогої покупки"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Ovulan",
        type: "Премиальные часы · Ecommerce-лендинг",
        outcome:
          "Часовой бренд, который оправдывает свою цену на первом экране, а не извиняется за неё.",
        problem:
          "В премиальном сегменте возражение — это не стоимость, а сомнение. Если гарантия, мастерство и происхождение не видны сразу, покупатель считает, что их нет.",
        built:
          "Премиальная витрина с тёмным редакционным героем, гарантией и мастерством сразу под заголовком, сеткой коллекции и секцией истории бренда.",
        value:
          "Отвечает на сомнение, останавливающее дорогую покупку — и это стоит больше любой скидки.",
        result:
          "Завершённая премиальная витрина, отвечающая на сомнение вместо скидок: гарантия, мастерство и происхождение стоят сразу под заголовком, далее коллекция — именно та архитектура доверия, которой требует дорогая покупка.",
        capabilities: ["Премиальный арт-дирекшн", "Архитектура доверия", "Презентация коллекции", "UX дорогой покупки"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "nevard",
    statusLabel: { en: "Completed UI/UX product system", ua: "Завершена UI/UX продуктова система", ru: "Завершённая UI/UX продуктовая система" },
    category: "ecommerce",
    status: "concept",
    shots: ["/case-studies/nevard/whey.webp", "/case-studies/nevard/creatine.webp"],
    content: {
      en: {
        name: "Nēvard",
        type: "Supplements brand · Ecommerce system",
        outcome:
          "A supplement range where every product page is built from the same trusted skeleton.",
        problem:
          "Supplements live or die on trust, and a range multiplies the problem: each new SKU needs the same proof rebuilt, so quality drifts and the brand starts to look inconsistent.",
        built:
          "A reusable product-page system applied across whey protein and creatine — product hero, a why-it-is-good-for-you argument, ingredient and usage detail, and a best-sellers grid.",
        value:
          "One structure that any new product drops into, so the brand scales its catalogue without rebuilding credibility each time.",
        result:
          "A completed, reusable product-page system proven across two very different supplements: one skeleton — hero, why-it-is-good-for-you argument, ingredient and usage detail, bestseller grid — that any new SKU drops into without rebuilding credibility.",
        capabilities: ["Reusable page system", "Supplement compliance framing", "Range scaling", "Bestseller merchandising"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "Nēvard",
        type: "Бренд добавок · Ecommerce-система",
        outcome:
          "Лінійка добавок, де кожна сторінка продукту зібрана з одного перевіреного каркаса.",
        problem:
          "Добавки живуть або вмирають на довірі, а лінійка множить проблему: кожен новий товар потребує тих самих доказів заново — якість пливе, і бренд починає виглядати непослідовним.",
        built:
          "Перевикористовувана система сторінки товару, застосована до сироваткового протеїну й креатину: герой продукту, аргумент користі, деталі складу та вживання, сітка бестселерів.",
        value:
          "Одна структура, у яку лягає будь-який новий продукт — бренд нарощує каталог, не перебудовуючи довіру щоразу.",
        result:
          "Завершена перевикористовувана система сторінки товару, перевірена на двох дуже різних добавках: один каркас — герой, аргумент користі, деталі складу й вживання, сітка бестселерів — у який лягає будь-який новий товар без перебудови довіри.",
        capabilities: ["Перевикористовувана система сторінок", "Подача складу й безпеки", "Масштабування лінійки", "Мерчандайзинг бестселерів"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "Nēvard",
        type: "Бренд добавок · Ecommerce-система",
        outcome:
          "Линейка добавок, где каждая страница продукта собрана из одного проверенного каркаса.",
        problem:
          "Добавки живут или умирают на доверии, а линейка умножает проблему: каждый новый товар требует тех же доказательств заново — качество плывёт, и бренд начинает выглядеть непоследовательным.",
        built:
          "Переиспользуемая система страницы товара, применённая к сывороточному протеину и креатину: герой продукта, аргумент пользы, детали состава и применения, сетка бестселлеров.",
        value:
          "Одна структура, в которую ложится любой новый продукт — бренд наращивает каталог, не перестраивая доверие каждый раз.",
        result:
          "Завершённая переиспользуемая система страницы товара, проверенная на двух очень разных добавках: один каркас — герой, аргумент пользы, детали состава и применения, сетка бестселлеров — в который ложится любой новый товар без перестройки доверия.",
        capabilities: ["Переиспользуемая система страниц", "Подача состава и безопасности", "Масштабирование линейки", "Мерчандайзинг бестселлеров"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "carluxe",
    statusLabel: { en: "Completed service website concept", ua: "Завершений концепт сервісного сайту", ru: "Завершённый концепт сервисного сайта" },
    category: "websites",
    status: "concept",
    shots: ["/case-studies/carluxe/landing.webp"],
    content: {
      en: {
        name: "CarLuxe",
        type: "Car detailing · Service website",
        outcome:
          "A detailing service where the packages are priced and comparable instead of quoted on request.",
        problem:
          "Service businesses hide behind \"contact us for a quote\", so the customer cannot compare and does not call. Meanwhile the competitor who published a price list gets the booking.",
        built:
          "A service website with a dark automotive hero, service tiers presented as packages across exterior, interior and full detailing, and a booking route.",
        value:
          "Turns an enquiry-only service into something a customer can choose from the page — which is the difference between a lead and a booking.",
        result:
          "A finished service website that turns an enquiry-only business into something a customer can choose from the page: exterior, interior and full detailing presented as comparable packages, with a booking route attached.",
        capabilities: ["Service website", "Package presentation", "Booking route", "Automotive art direction"],
        ctaLabel: "Build something similar",
      },
      ua: {
        name: "CarLuxe",
        type: "Детейлінг авто · Сайт послуг",
        outcome:
          "Детейлінг, де пакети мають ціну й порівнюються, а не «уточнюйте у менеджера».",
        problem:
          "Сервісні бізнеси ховаються за «зателефонуйте для розрахунку» — клієнт не може порівняти й не телефонує. А запис отримує конкурент, який опублікував прайс.",
        built:
          "Сайт послуг із темним автомобільним героєм, рівнями сервісу у вигляді пакетів для зовнішнього, внутрішнього й повного детейлінгу та шляхом до запису.",
        value:
          "Перетворює послугу «тільки за запитом» на те, що клієнт може обрати просто зі сторінки — це різниця між лідом і записом.",
        result:
          "Завершений сайт послуг, що перетворює бізнес «тільки за запитом» на те, що клієнт може обрати просто зі сторінки: зовнішній, внутрішній і повний детейлінг подані як порівнювані пакети зі шляхом до запису.",
        capabilities: ["Сайт послуг", "Презентація пакетів", "Шлях до запису", "Автомобільний арт-дирекшн"],
        ctaLabel: "Обговорити схожий проєкт",
      },
      ru: {
        name: "CarLuxe",
        type: "Детейлинг авто · Сайт услуг",
        outcome:
          "Детейлинг, где пакеты имеют цену и сравниваются, а не «уточняйте у менеджера».",
        problem:
          "Сервисные бизнесы прячутся за «позвоните для расчёта» — клиент не может сравнить и не звонит. А запись получает конкурент, опубликовавший прайс.",
        built:
          "Сайт услуг с тёмным автомобильным героем, уровнями сервиса в виде пакетов для наружного, внутреннего и полного детейлинга и путём к записи.",
        value:
          "Превращает услугу «только по запросу» в то, что клиент может выбрать прямо со страницы — это разница между лидом и записью.",
        result:
          "Завершённый сайт услуг, превращающий бизнес «только по запросу» в то, что клиент может выбрать прямо со страницы: наружный, внутренний и полный детейлинг поданы как сравнимые пакеты с путём к записи.",
        capabilities: ["Сайт услуг", "Презентация пакетов", "Путь к записи", "Автомобильный арт-дирекшн"],
        ctaLabel: "Обсудить похожий проект",
      },
    },
  },
  {
    key: "ikorka",
    statusLabel: { en: "Completed voice prototype", ua: "Завершений голосовий прототип", ru: "Завершённый голосовой прототип" },
    category: "ai_products",
    status: "prototype",
    shots: [],
    audio: "/voice_assistant.MP3",
    content: {
      en: {
        name: "Ikorka AI Voice Assistant",
        type: "Voice AI · Call answering",
        outcome: "Calls get answered and routed in natural speech instead of going to voicemail.",
        problem: "Calls go unanswered and callers aren't routed to the right place fast enough.",
        built: "A voice assistant that answers and routes callers in natural speech — with a working audio demo.",
        result:
          "A working voice prototype with audible proof: the assistant answers in natural speech and routes the caller, and the demo below is the real recording rather than a description of one. The behaviour can be judged by ear before any telephony integration is commissioned.",
        capabilities: ["Voice AI", "Call answering", "Call routing"],
      },
      ua: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовий AI · Відповіді на дзвінки",
        outcome: "Дзвінки отримують відповідь і маршрутизацію природним мовленням, а не потрапляють на автовідповідач.",
        problem: "Дзвінки лишаються без відповіді, а тих, хто телефонує, не встигають скерувати куди треба.",
        built: "Голосовий асистент, що відповідає й маршрутизує дзвінки природним мовленням — зі справжнім аудіодемо.",
        result:
          "Робочий голосовий прототип із доказом, який можна почути: асистент відповідає природним мовленням і маршрутизує дзвінок, а демо нижче — це справжній запис, а не опис. Поведінку можна оцінити на слух ще до замовлення телефонної інтеграції.",
        capabilities: ["Голосовий AI", "Відповіді на дзвінки", "Маршрутизація"],
      },
      ru: {
        name: "Ikorka AI Voice Assistant",
        type: "Голосовой AI · Ответы на звонки",
        outcome: "Звонки получают ответ и маршрутизацию естественной речью, а не уходят на автоответчик.",
        problem: "Звонки остаются без ответа, а звонящих не успевают направить куда нужно.",
        built: "Голосовой ассистент, отвечающий и маршрутизирующий звонки естественной речью — с реальным аудиодемо.",
        result:
          "Рабочий голосовой прототип с доказательством, которое можно услышать: ассистент отвечает естественной речью и маршрутизирует звонок, а демо ниже — это реальная запись, а не описание. Поведение можно оценить на слух ещё до заказа телефонной интеграции.",
        capabilities: ["Голосовой AI", "Ответы на звонки", "Маршрутизация"],
      },
    },
  },
  {
    key: "dating-crm",
    statusLabel: { en: "Completed automation prototype", ua: "Завершений прототип автоматизації", ru: "Завершённый прототип автоматизации" },
    category: "automation",
    status: "prototype",
    shots: [],
    content: {
      en: {
        name: "Dating CRM",
        type: "CRM + automation · Internal operations",
        outcome: "No conversation goes cold because tracking, reminders and follow-up run on their own.",
        problem: "Conversations went cold because tracking, reminders and follow-up were manual.",
        built: "A CRM with automated tracking, reminders and follow-up workflows, plus an admin and moderation layer.",
        result:
          "A completed automation prototype that replaces a manual routine with a defined operational flow: conversations are tracked, reminders fire on their own, follow-up runs to a schedule, and an admin layer sits over the top. The behaviour is testable before it is wired into production.",
        capabilities: ["Communication workflows", "Admin & moderation", "Automated follow-up"],
      },
      ua: {
        name: "Dating CRM",
        type: "CRM + автоматизація · Внутрішні процеси",
        outcome: "Жодна розмова не згасає, бо відстеження, нагадування та фолоу-ап працюють самі.",
        problem: "Розмови згасали, бо відстеження, нагадування та фолоу-ап робилися вручну.",
        built: "CRM з автоматичним відстеженням, нагадуваннями та фолоу-ап процесами, плюс шар адміністрування й модерації.",
        result:
          "Завершений прототип автоматизації, що замінює ручну рутину визначеним операційним потоком: розмови відстежуються, нагадування спрацьовують самі, фолоу-ап іде за розкладом, а зверху — шар адміністрування. Поведінку можна перевірити ще до інтеграції в продакшн.",
        capabilities: ["Комунікаційні процеси", "Адмін і модерація", "Автоматичний фолоу-ап"],
      },
      ru: {
        name: "Dating CRM",
        type: "CRM + автоматизация · Внутренние процессы",
        outcome: "Ни один диалог не угасает, потому что трекинг, напоминания и фоллоу-ап работают сами.",
        problem: "Диалоги угасали, потому что трекинг, напоминания и фоллоу-ап делались вручную.",
        built: "CRM с автоматическим трекингом, напоминаниями и фоллоу-ап процессами, плюс слой администрирования и модерации.",
        result:
          "Завершённый прототип автоматизации, заменяющий ручную рутину определённым операционным потоком: разговоры отслеживаются, напоминания срабатывают сами, фоллоу-ап идёт по расписанию, а сверху — слой администрирования. Поведение можно проверить ещё до интеграции в продакшн.",
        capabilities: ["Коммуникационные процессы", "Админ и модерация", "Автоматический фоллоу-ап"],
      },
    },
  },
  {
    key: "leather-clinic",
    statusLabel: { en: "Live client website", ua: "Живий клієнтський сайт", ru: "Живой клиентский сайт" },
    category: "websites",
    status: "real_client",
    // Public URL supplied by the project owner (portfolio-source/LIVE_PROJECTS.md).
    // No screenshots or verified scope exist yet, so this stays a card, not a case study.
    liveUrl: "https://leatherclinic.org/",
    shots: [],
    content: {
      en: {
        name: "Leather Clinic",
        type: "Business website · Local specialist service",
        outcome: "A specialist service looks credible enough that visitors send an enquiry instead of shopping around.",
        problem: "A specialist local service needed a clean, premium site that turns visitors into enquiries.",
        built: "A premium website for a specialist service, structured to convert visitors into enquiries.",
        result:
          "A published website for a specialist local service, structured so that a visitor understands the work and has one clear way to send an enquiry. The site is live within the delivered scope.",
        capabilities: ["Business website", "Enquiry conversion"],
      },
      ua: {
        name: "Leather Clinic",
        type: "Бізнес-сайт · Локальний спеціалізований сервіс",
        outcome: "Спеціалізований сервіс виглядає достатньо надійно, щоб відвідувач залишив запит, а не пішов шукати далі.",
        problem: "Спеціалізованому локальному сервісу потрібен був чистий преміальний сайт, що перетворює відвідувачів на запити.",
        built: "Преміальний сайт для спеціалізованого сервісу, побудований, щоб перетворювати відвідувачів на запити.",
        result:
          "Опублікований сайт для локального спеціалізованого сервісу, побудований так, щоб відвідувач зрозумів роботу й мав один зрозумілий шлях залишити запит. Сайт живий у межах зданого обсягу.",
        capabilities: ["Бізнес-сайт", "Конверсія в запити"],
      },
      ru: {
        name: "Leather Clinic",
        type: "Бизнес-сайт · Локальный специализированный сервис",
        outcome: "Специализированный сервис выглядит достаточно надёжно, чтобы посетитель оставил запрос, а не пошёл искать дальше.",
        problem: "Специализированному локальному сервису нужен был чистый премиальный сайт, превращающий посетителей в запросы.",
        built: "Премиальный сайт для специализированного сервиса, построенный, чтобы превращать посетителей в запросы.",
        result:
          "Опубликованный сайт для локального специализированного сервиса, построенный так, чтобы посетитель понял работу и имел один понятный путь оставить запрос. Сайт живой в рамках сданного объёма.",
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
  /** What the delivered work produced. Every case has one. */
  result: string;
  /** Honest statements about what exists today — never invented metrics. */
  proof: string[];
  ctaLabel: string;
  liveLabel: string;
}

export interface CaseDetail {
  slug: string;
  status: Status;
  /** Precise, project-specific status wording. Falls back to STATUS_LABEL. */
  statusLabel?: Record<Lang, string>;
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
    status: "in_development",
    category: "ai_products",
    liveUrl: "https://turbotaai.com/",
    shots: [
      "/case-studies/turbotaai/landing.webp",
      "/case-studies/turbotaai/pricing.webp",
      "/case-studies/turbotaai/subscription.webp",
      "/case-studies/turbotaai/locales.webp",
      "/case-studies/turbotaai/admin-ops.webp",
      "/case-studies/turbotaai/admin-access.webp",
      "/case-studies/turbotaai/today-error.webp",
      "/case-studies/turbotaai/mobile-pricing.webp",
    ],
    shotSpan: ["full", "half", "half", "full", "full", "half", "half", "half"],
    captions: {
      en: [
        "Landing — the offer, the trial counter and the entry point into a conversation",
        "Pricing — monthly plan, trial allowance, promo redemption and access management in one place",
        "Subscription — plan status, renewal and cancellation rules, stated plainly to the customer",
        "Three locales at 390px — the same product in Ukrainian, Russian and English, with locale-aware pricing",
        "Operations console — activation, engagement, subscriptions, AI usage and cost, system health, support lookup and an audit log",
        "Role-based access — the admin area refuses accounts the server does not recognise as administrators",
        "Error state — a failed load explains itself and offers a retry, instead of showing an empty screen",
        "Mobile pricing at 390px",
      ],
      ua: [
        "Головна — пропозиція, лічильник пробних запитів і вхід у розмову",
        "Тарифи — місячний план, пробний ліміт, активація промокоду та керування доступом в одному місці",
        "Підписка — статус плану, правила поновлення та скасування, сказані клієнту прямо",
        "Три локалі на 390px — той самий продукт українською, російською та англійською, з цінами під локаль",
        "Операційна консоль — активація, залученість, підписки, використання та вартість AI, стан системи, пошук для підтримки й журнал дій",
        "Рольовий доступ — адмін-зона відмовляє акаунтам, яких сервер не визнає адміністраторами",
        "Стан помилки — невдале завантаження пояснює себе й пропонує повтор, а не показує порожній екран",
        "Мобільні тарифи на 390px",
      ],
      ru: [
        "Главная — предложение, счётчик пробных запросов и вход в разговор",
        "Тарифы — месячный план, пробный лимит, активация промокода и управление доступом в одном месте",
        "Подписка — статус плана, правила продления и отмены, сказанные клиенту прямо",
        "Три локали на 390px — тот же продукт на украинском, русском и английском, с ценами под локаль",
        "Операционная консоль — активация, вовлечённость, подписки, использование и стоимость AI, состояние системы, поиск для поддержки и журнал действий",
        "Ролевой доступ — админ-зона отказывает аккаунтам, которых сервер не признаёт администраторами",
        "Состояние ошибки — неудачная загрузка объясняет себя и предлагает повтор, а не показывает пустой экран",
        "Мобильные тарифы на 390px",
      ],
    },
    content: {
      en: {
        name: "TurbotaAI",
        type: "AI SaaS product · Customer app + operations console",
        context:
          "An AI companion product built in public. People talk to an AI by text, voice or video in their own language, behind an account with a trial, a subscription and their own consent and data controls — and the business runs it from an operations console.",
        problem:
          "An AI demo is not a business. Most AI projects stop at the chat window: the account, the trial limit, the payment, the consent record, the error states and the people who actually operate the thing are all left as \"later\". That is exactly where a product either becomes sellable or stalls.",
        outcome:
          "A product a customer can open, try, subscribe to and keep using on their own — and that someone inside the business can actually run: see activation and subscriptions, check system health, look up one account for support, and have every privileged action written to an audit log.",
        built: [
          "A multi-modal AI conversation — text, voice and video",
          "Accounts with sign-in, registration and a guided onboarding",
          "Trial access with a request allowance, then unlimited access on subscription",
          "A monthly subscription with a paywall, promo-code redemption and self-serve access management",
          "Per-capability permission toggles, so a customer chooses what the product may use",
          "Consent history and a data & account area covering AI processing, memory, notifications and deletion",
          "An operations console: activation, engagement, capabilities, subscriptions, AI usage and cost, today/push/system health, single-account support lookup, access grants and an audit log",
          "Role-based access control on the admin area, enforced server-side",
          "Three locales — Ukrainian, Russian and English — with locale-aware pricing",
          "Designed at 1440 desktop and 390 mobile across every route",
          "Deliberate loading, empty, partial, locked, offline and error states",
        ],
        flow: [
          "Visitor",
          "Try the AI (limited trial questions)",
          "Register and onboard",
          "Choose permissions and start a conversation",
          "Hit the trial limit → paywall",
          "Subscribe or redeem a promo code",
          "Manage access, consent and data in the profile",
        ],
        result:
          "A complete AI SaaS is standing: the customer journey from first trial question to paid subscription and self-managed data, and the operator side that runs it — activation, subscriptions, AI cost, system health, support lookup and an append-only audit trail. Development continues against a working product, not a specification.",
        capabilities: [
          "User accounts & onboarding",
          "Subscription, paywall & promo codes",
          "Usage limits & entitlements",
          "Role-based access control",
          "Admin & operations console",
          "Audit logging",
          "Consent & data controls",
          "Multi-modal AI (text / voice / video)",
          "Multilingual (uk / ru / en)",
          "Responsive 1440 / 390",
        ],
        tech: ["Next.js", "AI assistant integration", "Auth & user profiles", "Subscription billing", "Admin console", "Screenshot/QA harness"],
        proof: [
          "The screens below are the real product at a specific build (V1, commit fc6ed09) — captured by the project's own screenshot harness, not mocked up",
          "Route coverage was captured systematically: every route at 1440 desktop and 390 mobile, in three locales",
          "The admin area, audit log, consent history and error states are implemented, not planned",
          "In active development: the subscription screen currently reports that payments are unavailable, and the store badges on the landing page are links, not evidence of a published app",
        ],
        ctaLabel: "Discuss an AI product like this",
        liveLabel: "View live project",
      },
      ua: {
        name: "TurbotaAI",
        type: "AI SaaS-продукт · Клієнтський застосунок + операційна консоль",
        context:
          "AI-компаньйон, який будується публічно. Люди спілкуються з AI текстом, голосом або відео своєю мовою — за акаунтом із пробним доступом, підпискою та власним контролем згоди й даних, а бізнес веде це з операційної консолі.",
        problem:
          "AI-демо — це ще не бізнес. Більшість AI-проєктів зупиняються на вікні чату: акаунт, ліміт пробного доступу, оплата, запис згоди, стани помилок і люди, які цим реально оперують, лишаються «на потім». Саме тут продукт або стає продаваним, або застрягає.",
        outcome:
          "Продукт, який клієнт може відкрити, спробувати, оформити підписку й користуватися самостійно — і яким справді може керувати людина в бізнесі: бачити активацію та підписки, перевіряти стан системи, знайти один акаунт для підтримки, а кожна привілейована дія потрапляє в журнал.",
        built: [
          "Мультимодальна AI-розмова — текст, голос і відео",
          "Акаунти з входом, реєстрацією та скерованим онбордингом",
          "Пробний доступ із лімітом запитів, далі — безлімітний доступ за підпискою",
          "Місячна підписка з пейволом, активацією промокоду та самостійним керуванням доступом",
          "Перемикачі дозволів за можливостями — клієнт сам обирає, що продукту можна використовувати",
          "Історія згод і розділ даних та акаунта: AI-обробка, пам'ять, сповіщення, видалення",
          "Операційна консоль: активація, залученість, можливості, підписки, використання та вартість AI, стан today/push/системи, пошук одного акаунта для підтримки, видача доступів і журнал дій",
          "Рольовий контроль доступу до адмін-зони, що перевіряється на сервері",
          "Три локалі — українська, російська та англійська — з цінами під локаль",
          "Спроєктовано для 1440 desktop і 390 mobile на кожному маршруті",
          "Свідомі стани завантаження, порожнечі, часткових даних, блокування, офлайну та помилок",
        ],
        flow: [
          "Відвідувач",
          "Спробувати AI (обмежені пробні запити)",
          "Реєстрація та онбординг",
          "Обрати дозволи й почати розмову",
          "Досягти ліміту → пейволл",
          "Оформити підписку або активувати промокод",
          "Керувати доступом, згодою й даними у профілі",
        ],
        result:
          "Повноцінний AI SaaS уже стоїть: шлях клієнта від першого пробного запиту до платної підписки й самостійного керування даними, і бік оператора, що цим керує — активація, підписки, вартість AI, стан системи, пошук для підтримки та незмінюваний журнал дій. Розробка триває на робочому продукті, а не на специфікації.",
        capabilities: [
          "Акаунти й онбординг",
          "Підписка, пейволл і промокоди",
          "Ліміти використання та права доступу",
          "Рольовий контроль доступу",
          "Адмін- і операційна консоль",
          "Журнал дій",
          "Згода й контроль даних",
          "Мультимодальний AI (текст / голос / відео)",
          "Багатомовність (uk / ru / en)",
          "Адаптивність 1440 / 390",
        ],
        tech: ["Next.js", "Інтеграція AI-асистента", "Авторизація та профілі", "Білінг підписок", "Адмін-консоль", "Харнес скриншотів / QA"],
        proof: [
          "Екрани нижче — це реальний продукт на конкретній збірці (V1, коміт fc6ed09), знятий власним скриншот-харнесом проєкту, а не мокапи",
          "Покриття маршрутів знято системно: кожен маршрут на 1440 desktop і 390 mobile, у трьох локалях",
          "Адмін-зона, журнал дій, історія згод і стани помилок реалізовані, а не заплановані",
          "В активній розробці: екран підписки зараз повідомляє, що оплати недоступні, а бейджі сторів на головній — це посилання, а не доказ опублікованого застосунку",
        ],
        ctaLabel: "Обговорити AI-продукт як цей",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "TurbotaAI",
        type: "AI SaaS-продукт · Клиентское приложение + операционная консоль",
        context:
          "AI-компаньон, который строится публично. Люди общаются с AI текстом, голосом или видео на своём языке — за аккаунтом с пробным доступом, подпиской и собственным контролем согласия и данных, а бизнес ведёт это из операционной консоли.",
        problem:
          "AI-демо — это ещё не бизнес. Большинство AI-проектов останавливаются на окне чата: аккаунт, лимит пробного доступа, оплата, запись согласия, состояния ошибок и люди, которые этим реально оперируют, остаются «на потом». Именно здесь продукт либо становится продаваемым, либо застревает.",
        outcome:
          "Продукт, который клиент может открыть, попробовать, оформить подписку и пользоваться самостоятельно — и которым действительно может управлять человек в бизнесе: видеть активацию и подписки, проверять состояние системы, найти один аккаунт для поддержки, а каждое привилегированное действие попадает в журнал.",
        built: [
          "Мультимодальный AI-разговор — текст, голос и видео",
          "Аккаунты со входом, регистрацией и направленным онбордингом",
          "Пробный доступ с лимитом запросов, далее — безлимитный доступ по подписке",
          "Месячная подписка с пейволом, активацией промокода и самостоятельным управлением доступом",
          "Переключатели разрешений по возможностям — клиент сам выбирает, что продукту можно использовать",
          "История согласий и раздел данных и аккаунта: AI-обработка, память, уведомления, удаление",
          "Операционная консоль: активация, вовлечённость, возможности, подписки, использование и стоимость AI, состояние today/push/системы, поиск одного аккаунта для поддержки, выдача доступов и журнал действий",
          "Ролевой контроль доступа к админ-зоне, проверяемый на сервере",
          "Три локали — украинский, русский и английский — с ценами под локаль",
          "Спроектировано для 1440 desktop и 390 mobile на каждом маршруте",
          "Осознанные состояния загрузки, пустоты, частичных данных, блокировки, офлайна и ошибок",
        ],
        flow: [
          "Посетитель",
          "Попробовать AI (ограниченные пробные запросы)",
          "Регистрация и онбординг",
          "Выбрать разрешения и начать разговор",
          "Достичь лимита → пейволл",
          "Оформить подписку или активировать промокод",
          "Управлять доступом, согласием и данными в профиле",
        ],
        result:
          "Полноценный AI SaaS уже стоит: путь клиента от первого пробного запроса до платной подписки и самостоятельного управления данными, и сторона оператора, которая этим управляет — активация, подписки, стоимость AI, состояние системы, поиск для поддержки и неизменяемый журнал действий. Разработка идёт на работающем продукте, а не на спецификации.",
        capabilities: [
          "Аккаунты и онбординг",
          "Подписка, пейволл и промокоды",
          "Лимиты использования и права доступа",
          "Ролевой контроль доступа",
          "Админ- и операционная консоль",
          "Журнал действий",
          "Согласие и контроль данных",
          "Мультимодальный AI (текст / голос / видео)",
          "Многоязычность (uk / ru / en)",
          "Адаптивность 1440 / 390",
        ],
        tech: ["Next.js", "Интеграция AI-ассистента", "Авторизация и профили", "Биллинг подписок", "Админ-консоль", "Харнесс скриншотов / QA"],
        proof: [
          "Экраны ниже — это реальный продукт на конкретной сборке (V1, коммит fc6ed09), снятый собственным скриншот-харнессом проекта, а не мокапы",
          "Покрытие маршрутов снято системно: каждый маршрут на 1440 desktop и 390 mobile, в трёх локалях",
          "Админ-зона, журнал действий, история согласий и состояния ошибок реализованы, а не запланированы",
          "В активной разработке: экран подписки сейчас сообщает, что оплаты недоступны, а бейджи сторов на главной — это ссылки, а не доказательство опубликованного приложения",
        ],
        ctaLabel: "Обсудить AI-продукт как этот",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "tutorivo",
    statusLabel: { en: "Launched and tested MVP", ua: "Запущений і протестований MVP", ru: "Запущенный и протестированный MVP" },
    status: "launched_mvp",
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
        result:
          "A two-sided marketplace is launched and tested: students search and filter a verified catalogue, tutors apply through a structured form, and an operator approves who gets published. What used to live in chats and spreadsheets now runs as one product with roles, moderation and lesson-package logic.",
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
        result:
          "Двосторонній маркетплейс запущено й протестовано: учні шукають і фільтрують перевірений каталог, репетитори подають структуровану заявку, а оператор вирішує, кого публікувати. Те, що жило в чатах і таблицях, тепер працює як один продукт із ролями, модерацією та логікою пакетів уроків.",
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
        result:
          "Двусторонний маркетплейс запущен и протестирован: ученики ищут и фильтруют проверенный каталог, репетиторы подают структурированную заявку, а оператор решает, кого публиковать. То, что жило в чатах и таблицах, теперь работает как один продукт с ролями, модерацией и логикой пакетов уроков.",
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
        ctaLabel: "Обсудить маркетплейс как этот",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "status-auto",
    statusLabel: { en: "Completed interactive prototype", ua: "Завершений інтерактивний прототип", ru: "Завершённый интерактивный прототип" },
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
        result:
          "A complete buyer journey is testable end to end before any production build: browse checked inventory, compare the specifications that actually decide a purchase, and hand over budget, requirements and contact in one step. The prototype turns a dealer's slowest process into a defined, repeatable flow.",
        capabilities: ["Inventory / catalog", "Lead capture", "Qualified request form", "Conversion routing"],
        tech: ["Next.js", "Catalog / inventory structure", "Lead capture form"],
        proof: [
          "A complete prototype — the browse → compare → request path works end to end in the screens below",
          "The request form captures budget and requirements, not just a phone number",
          "Prototype stage: not a deployed dealership system",
        ],
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
        result:
          "Повний шлях покупця можна протестувати наскрізно ще до продакшн-реалізації: перегляд перевіреного автопарку, порівняння характеристик, які реально вирішують покупку, і передача бюджету, вимог і контакту за один крок. Прототип перетворює найповільніший процес дилера на визначений повторюваний потік.",
        capabilities: ["Каталог / автопарк", "Захоплення лідів", "Кваліфікована форма запиту", "Конверсійна маршрутизація"],
        tech: ["Next.js", "Структура каталогу / автопарку", "Форма захоплення лідів"],
        proof: [
          "Повноцінний прототип — шлях перегляд → порівняння → запит працює наскрізно на екранах нижче",
          "Форма запиту збирає бюджет і вимоги, а не лише номер телефону",
          "Стадія прототипу: це не розгорнута дилерська система",
        ],
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
        result:
          "Полный путь покупателя можно протестировать сквозным образом ещё до продакшн-реализации: просмотр проверенного автопарка, сравнение характеристик, которые реально решают покупку, и передача бюджета, требований и контакта за один шаг. Прототип превращает самый медленный процесс дилера в определённый повторяемый поток.",
        capabilities: ["Каталог / автопарк", "Захват лидов", "Квалифицированная форма запроса", "Конверсионная маршрутизация"],
        tech: ["Next.js", "Структура каталога / автопарка", "Форма захвата лидов"],
        proof: [
          "Полноценный прототип — путь просмотр → сравнение → запрос работает сквозным образом на экранах ниже",
          "Форма запроса собирает бюджет и требования, а не только номер телефона",
          "Стадия прототипа: это не развёрнутая дилерская система",
        ],
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
        result:
          "A live public landing that carries the brand's offer end to end: the proposition, how access works, the packages, and a single unambiguous route to registration. The page is published and reachable, and the conversion path is the delivered scope.",
        capabilities: ["Landing IA", "Responsive web", "Offer & pricing presentation", "Conversion route"],
        tech: ["Responsive web", "Landing information architecture"],
        proof: [
          "A live, publicly reachable landing at landing.ser-crypto.com",
          "The public information architecture and conversion route are the delivered scope",
          "One verified screenshot is published here — the live site shows the current version",
        ],
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
        result:
          "Живий публічний лендинг, що несе пропозицію бренду наскрізно: сама пропозиція, як влаштований доступ, пакети та єдиний однозначний шлях до реєстрації. Сторінка опублікована й доступна, а конверсійний шлях — це і є зданий обсяг.",
        capabilities: ["Архітектура лендингу", "Адаптивний веб", "Презентація пропозиції та тарифів", "Конверсійний шлях"],
        tech: ["Адаптивний веб", "Інформаційна архітектура лендингу"],
        proof: [
          "Живий, публічно доступний лендинг на landing.ser-crypto.com",
          "Публічна інформаційна архітектура та конверсійний шлях — це і є зданий обсяг",
          "Тут опубліковано один підтверджений скриншот — актуальну версію показує живий сайт",
        ],
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
        result:
          "Живой публичный лендинг, несущий предложение бренда сквозным образом: само предложение, как устроен доступ, пакеты и единственный однозначный путь к регистрации. Страница опубликована и доступна, а конверсионный путь — это и есть сданный объём.",
        capabilities: ["Архитектура лендинга", "Адаптивный веб", "Презентация предложения и тарифов", "Конверсионный путь"],
        tech: ["Адаптивный веб", "Информационная архитектура лендинга"],
        proof: [
          "Живой, публично доступный лендинг на landing.ser-crypto.com",
          "Публичная информационная архитектура и конверсионный путь — это и есть сданный объём",
          "Здесь опубликован один подтверждённый скриншот — актуальную версию показывает живой сайт",
        ],
        ctaLabel: "Обсудить похожий лендинг",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "cod-power-group",
    statusLabel: { en: "Completed platform concept", ua: "Завершений концепт платформи", ru: "Завершённый концепт платформы" },
    status: "concept",
    category: "platforms",
    shots: [
      "/case-studies/cod-power-group/platform.webp",
      "/case-studies/cod-power-group/services.webp",
      "/case-studies/cod-power-group/models.webp",
    ],
    shotSpan: ["full", "half", "half"],
    captions: {
      en: [
        "Marketing site and operations dashboard — shipping status, call-centre confirmations, orders, stock and invoices in one view",
        "Courier network and the service catalogue the platform coordinates",
        "Account models — seller and affiliate, each with its own entry path",
      ],
      ua: [
        "Маркетинговий сайт і операційна панель — статуси доставки, підтвердження кол-центру, замовлення, склад і рахунки в одному вікні",
        "Мережа кур'єрів і каталог послуг, які координує платформа",
        "Моделі акаунтів — продавець і партнер, кожен зі своїм шляхом входу",
      ],
      ru: [
        "Маркетинговый сайт и операционная панель — статусы доставки, подтверждения колл-центра, заказы, склад и счета в одном окне",
        "Сеть курьеров и каталог услуг, которые координирует платформа",
        "Модели аккаунтов — продавец и партнёр, у каждого свой путь входа",
      ],
    },
    content: {
      en: {
        name: "COD Power Group",
        type: "Ecommerce operations platform · Cash on delivery",
        context:
          "A platform for cross-border ecommerce sellers who ship cash on delivery: the buyer pays the courier at the door, so the seller carries the stock, the confirmation calls and the reconciliation.",
        problem:
          "Cash on delivery is where ecommerce margin quietly leaks. An order is not revenue until someone confirms it by phone, the courier delivers it and the cash comes back. Sellers run that across several countries in spreadsheets and four courier dashboards — so unconfirmed leads go cold, stock counts drift, and nobody can say what is actually owed this week.",
        outcome:
          "One operating picture for a COD business: what shipped, what is in transit, what was delivered or returned, how many leads the call centre confirmed, what is in stock and what has been invoiced — without stitching it together by hand.",
        built: [
          "A marketing site presenting the service catalogue and both account models",
          "An operations dashboard with shipping status across shipped, in transit, delivered and returned",
          "A call-centre panel tracking total, new, confirmed and unanswered leads",
          "Orders management, stock and invoicing sections",
          "Sourcing requests and lead-source tracking",
          "Seller and affiliate account models with separate entry paths",
          "A statistics area with profit and delivery-rate charting",
        ],
        flow: [
          "Seller joins as seller or affiliate",
          "Product sourced and stock recorded",
          "Order placed by the buyer",
          "Call centre confirms the order",
          "Courier ships and status syncs",
          "Delivered or returned",
          "Invoice and remittance",
        ],
        result:
          "A complete operating picture for a cash-on-delivery business: the customer-facing service catalogue and both account models on one side, and on the other an operations console covering orders, stock, invoices, call-centre confirmations and multi-courier shipping status. The concept defines the whole COD chain — sourcing, confirmation, delivery, return, remittance — as one system ready for implementation.",
        capabilities: [
          "Orders management",
          "Stock control",
          "Call-centre pipeline",
          "Multi-courier tracking",
          "Invoicing & remittance",
          "Seller & affiliate roles",
          "Operational analytics",
        ],
        tech: ["Web platform", "Operations dashboard", "Role-based accounts", "Courier status integration"],
        proof: [
          "The dashboard, service catalogue and account models are designed end to end and shown below",
          "The operating model covers the whole COD chain — sourcing, confirmation, shipping, return and remittance — not just a storefront",
          "Product concept: a complete platform design, not a deployed system I operate",
        ],
        ctaLabel: "Build an operations platform like this",
        liveLabel: "View live project",
      },
      ua: {
        name: "COD Power Group",
        type: "Операційна платформа для ecommerce · Накладений платіж",
        context:
          "Платформа для транскордонних ecommerce-продавців, які відправляють із накладеним платежем: покупець платить кур'єру на дверях, тож продавець несе склад, дзвінки-підтвердження та звірку.",
        problem:
          "Накладений платіж — це місце, де тихо витікає маржа ecommerce. Замовлення не є виручкою, поки хтось не підтвердив його телефоном, кур'єр не доставив, а гроші не повернулись. Продавці ведуть це по кількох країнах у таблицях і чотирьох кабінетах кур'єрів — тож непідтверджені ліди холонуть, залишки розходяться, і ніхто не може сказати, скільки насправді винні цього тижня.",
        outcome:
          "Одна операційна картина для COD-бізнесу: що відправлено, що в дорозі, що доставлено чи повернуто, скільки лідів підтвердив кол-центр, що є на складі й що виставлено в рахунках — без ручного зшивання.",
        built: [
          "Маркетинговий сайт із каталогом послуг і двома моделями акаунтів",
          "Операційна панель зі статусами доставки: відправлено, в дорозі, доставлено, повернуто",
          "Панель кол-центру з обліком усіх, нових, підтверджених і без відповіді лідів",
          "Розділи керування замовленнями, складу та рахунків",
          "Запити на закупівлю й облік джерел лідів",
          "Моделі акаунтів продавця та партнера з окремими шляхами входу",
          "Розділ статистики з графіками прибутку та відсотка доставки",
        ],
        flow: [
          "Продавець заходить як продавець або партнер",
          "Товар закуплено, залишок зафіксовано",
          "Покупець оформлює замовлення",
          "Кол-центр підтверджує замовлення",
          "Кур'єр відправляє, статус синхронізується",
          "Доставлено або повернуто",
          "Рахунок і виплата",
        ],
        result:
          "Повна операційна картина для бізнесу з накладеним платежем: клієнтський каталог послуг і дві моделі акаунтів з одного боку, і операційна консоль із замовленнями, складом, рахунками, підтвердженнями кол-центру та статусами доставки по кур'єрах — з іншого. Концепт визначає весь ланцюг COD — закупівля, підтвердження, доставка, повернення, виплата — як одну систему, готову до реалізації.",
        capabilities: [
          "Керування замовленнями",
          "Контроль складу",
          "Пайплайн кол-центру",
          "Трекінг кількох кур'єрів",
          "Рахунки й виплати",
          "Ролі продавця й партнера",
          "Операційна аналітика",
        ],
        tech: ["Веб-платформа", "Операційна панель", "Рольові акаунти", "Інтеграція статусів кур'єрів"],
        proof: [
          "Панель, каталог послуг і моделі акаунтів спроєктовані наскрізно й показані нижче",
          "Операційна модель охоплює весь ланцюг COD — закупівля, підтвердження, доставка, повернення, виплата — а не лише вітрину",
          "Продуктовий концепт: повний дизайн платформи, а не розгорнута система, якою я оперую",
        ],
        ctaLabel: "Побудувати операційну платформу як ця",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "COD Power Group",
        type: "Операционная платформа для ecommerce · Наложенный платёж",
        context:
          "Платформа для трансграничных ecommerce-продавцов, отправляющих с наложенным платежом: покупатель платит курьеру у двери, поэтому продавец несёт склад, звонки-подтверждения и сверку.",
        problem:
          "Наложенный платёж — это место, где тихо утекает маржа ecommerce. Заказ не является выручкой, пока кто-то не подтвердил его по телефону, курьер не доставил, а деньги не вернулись. Продавцы ведут это по нескольким странам в таблицах и четырёх кабинетах курьеров — поэтому неподтверждённые лиды остывают, остатки расходятся, и никто не может сказать, сколько на самом деле должны на этой неделе.",
        outcome:
          "Одна операционная картина для COD-бизнеса: что отправлено, что в пути, что доставлено или возвращено, сколько лидов подтвердил колл-центр, что есть на складе и что выставлено в счетах — без ручной сшивки.",
        built: [
          "Маркетинговый сайт с каталогом услуг и двумя моделями аккаунтов",
          "Операционная панель со статусами доставки: отправлено, в пути, доставлено, возвращено",
          "Панель колл-центра с учётом всех, новых, подтверждённых и без ответа лидов",
          "Разделы управления заказами, склада и счетов",
          "Запросы на закупку и учёт источников лидов",
          "Модели аккаунтов продавца и партнёра с отдельными путями входа",
          "Раздел статистики с графиками прибыли и процента доставки",
        ],
        flow: [
          "Продавец заходит как продавец или партнёр",
          "Товар закуплен, остаток зафиксирован",
          "Покупатель оформляет заказ",
          "Колл-центр подтверждает заказ",
          "Курьер отправляет, статус синхронизируется",
          "Доставлено или возвращено",
          "Счёт и выплата",
        ],
        result:
          "Полная операционная картина для бизнеса с наложенным платежом: клиентский каталог услуг и две модели аккаунтов с одной стороны, и операционная консоль с заказами, складом, счетами, подтверждениями колл-центра и статусами доставки по курьерам — с другой. Концепт определяет всю цепочку COD — закупка, подтверждение, доставка, возврат, выплата — как одну систему, готовую к реализации.",
        capabilities: [
          "Управление заказами",
          "Контроль склада",
          "Пайплайн колл-центра",
          "Трекинг нескольких курьеров",
          "Счета и выплаты",
          "Роли продавца и партнёра",
          "Операционная аналитика",
        ],
        tech: ["Веб-платформа", "Операционная панель", "Ролевые аккаунты", "Интеграция статусов курьеров"],
        proof: [
          "Панель, каталог услуг и модели аккаунтов спроектированы сквозным образом и показаны ниже",
          "Операционная модель охватывает всю цепочку COD — закупка, подтверждение, доставка, возврат, выплата — а не только витрину",
          "Продуктовый концепт: полный дизайн платформы, а не развёрнутая система, которой я оперирую",
        ],
        ctaLabel: "Построить операционную платформу как эта",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "nft-marketplace",
    statusLabel: { en: "Completed mobile app concept", ua: "Завершений концепт мобільного застосунку", ru: "Завершённый концепт мобильного приложения" },
    status: "concept",
    category: "mobile",
    shots: [
      "/case-studies/nft-marketplace/auction.webp",
      "/case-studies/nft-marketplace/discovery.webp",
      "/case-studies/nft-marketplace/collections.webp",
    ],
    shotSpan: ["full", "full", "full"],
    captions: {
      en: [
        "Auction direction — onboarding, a trending auction with a live bid and current price, and a place-bid screen with countdown and bid history",
        "Discovery direction — category and chain filters, trending collections, top sellers and a ranking view with price movement",
        "Collections direction — collection browsing, a lighter visual system and an item detail with its owner and price",
      ],
      ua: [
        "Аукціонний напрямок — онбординг, трендовий аукціон із живою ставкою та поточною ціною, екран ставки з таймером і історією",
        "Напрямок пошуку — фільтри за категорією та мережею, трендові колекції, топ продавців і рейтинг зі зміною ціни",
        "Напрямок колекцій — перегляд колекцій, світліша візуальна система та сторінка предмета з власником і ціною",
      ],
      ru: [
        "Аукционное направление — онбординг, трендовый аукцион с живой ставкой и текущей ценой, экран ставки с таймером и историей",
        "Направление поиска — фильтры по категории и сети, трендовые коллекции, топ продавцов и рейтинг с изменением цены",
        "Направление коллекций — просмотр коллекций, более светлая визуальная система и страница предмета с владельцем и ценой",
      ],
    },
    content: {
      en: {
        name: "NFT Marketplace App",
        type: "Mobile product concept · Marketplace & live bidding",
        context:
          "A mobile marketplace for digital collectibles: people discover collections, follow auctions that are running right now, and bid from their phone.",
        problem:
          "A marketplace app is judged in the seconds around a bid. If the current price is stale, the countdown is hidden, or the buyer cannot see who else is bidding and what happens to their money, they close the app — and the seller loses the sale to a slower, safer platform.",
        outcome:
          "A buying flow that stays honest under time pressure: the live price, the time left, the bid history and the next action are on the same screen, so a bid is a decision rather than a gamble.",
        built: [
          "Onboarding that explains the marketplace before asking for anything",
          "A home feed with trending auctions and top collections",
          "Category and blockchain filters, plus a seller ranking view with price movement",
          "A live auction card showing the current bid and the bidder",
          "A place-bid screen with countdown, view count, item provenance and bid history",
          "Wallet balance surfaced in the header",
          "Three complete design directions for the same product",
        ],
        flow: [
          "Open the app",
          "Onboarding",
          "Browse or filter collections",
          "Open a trending auction",
          "Review price, time left and bid history",
          "Place a bid",
          "Track activity",
        ],
        result:
          "A complete mobile marketplace experience in three finished design directions: onboarding, discovery with category and chain filters, a live auction with the current bid, and a place-bid screen carrying countdown, provenance and bid history. The bidding moment — where marketplace apps usually lose the buyer — is fully specified and ready to build against.",
        capabilities: [
          "Marketplace browsing",
          "Live auctions & bidding",
          "Category & chain filtering",
          "Seller ranking",
          "Wallet balance",
          "Item provenance & history",
          "Mobile design system",
        ],
        tech: ["Mobile product design", "Marketplace architecture", "Auction & bidding flow"],
        proof: [
          "Three complete, internally consistent design directions for the same product — shown below",
          "The bidding path is designed end to end: discovery, auction, bid, history",
          "Product concept: interface and product architecture, not a deployed marketplace",
        ],
        ctaLabel: "Discuss a marketplace app",
        liveLabel: "View live project",
      },
      ua: {
        name: "NFT Marketplace App",
        type: "Концепт мобільного продукту · Маркетплейс і живі торги",
        context:
          "Мобільний маркетплейс цифрових колекційних предметів: люди знаходять колекції, стежать за аукціонами, що йдуть просто зараз, і роблять ставки з телефона.",
        problem:
          "Застосунок-маркетплейс оцінюють у секунди навколо ставки. Якщо поточна ціна застаріла, таймер захований, а покупець не бачить, хто ще торгується і що станеться з його грошима — він закриває застосунок, і продавець втрачає продаж на користь повільнішої, але безпечнішої платформи.",
        outcome:
          "Потік купівлі, що лишається чесним під тиском часу: жива ціна, залишок часу, історія ставок і наступна дія — на одному екрані, тож ставка стає рішенням, а не азартом.",
        built: [
          "Онбординг, що пояснює маркетплейс до будь-яких запитів",
          "Головна стрічка з трендовими аукціонами й топ-колекціями",
          "Фільтри за категорією та блокчейном плюс рейтинг продавців зі зміною ціни",
          "Картка живого аукціону з поточною ставкою й тим, хто її зробив",
          "Екран ставки з таймером, кількістю переглядів, походженням предмета й історією ставок",
          "Баланс гаманця, винесений у шапку",
          "Три повні дизайн-напрямки одного продукту",
        ],
        flow: [
          "Відкрити застосунок",
          "Онбординг",
          "Переглянути або відфільтрувати колекції",
          "Відкрити трендовий аукціон",
          "Оцінити ціну, час і історію ставок",
          "Зробити ставку",
          "Стежити за активністю",
        ],
        result:
          "Повний досвід мобільного маркетплейсу в трьох завершених дизайн-напрямках: онбординг, пошук із фільтрами за категорією та мережею, живий аукціон із поточною ставкою та екран ставки з таймером, походженням і історією. Момент ставки — там, де застосунки-маркетплейси зазвичай втрачають покупця — повністю визначено й готово до реалізації.",
        capabilities: [
          "Перегляд маркетплейсу",
          "Живі аукціони та ставки",
          "Фільтри за категорією та мережею",
          "Рейтинг продавців",
          "Баланс гаманця",
          "Походження й історія предмета",
          "Мобільна дизайн-система",
        ],
        tech: ["Дизайн мобільного продукту", "Архітектура маркетплейсу", "Потік аукціону та ставок"],
        proof: [
          "Три повні, внутрішньо узгоджені дизайн-напрямки одного продукту — показані нижче",
          "Шлях ставки спроєктовано наскрізно: пошук, аукціон, ставка, історія",
          "Продуктовий концепт: інтерфейс і продуктова архітектура, а не розгорнутий маркетплейс",
        ],
        ctaLabel: "Обговорити застосунок-маркетплейс",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "NFT Marketplace App",
        type: "Концепт мобильного продукта · Маркетплейс и живые торги",
        context:
          "Мобильный маркетплейс цифровых коллекционных предметов: люди находят коллекции, следят за аукционами, идущими прямо сейчас, и делают ставки с телефона.",
        problem:
          "Приложение-маркетплейс оценивают в секунды вокруг ставки. Если текущая цена устарела, таймер спрятан, а покупатель не видит, кто ещё торгуется и что произойдёт с его деньгами — он закрывает приложение, и продавец теряет продажу в пользу более медленной, но безопасной платформы.",
        outcome:
          "Поток покупки, остающийся честным под давлением времени: живая цена, остаток времени, история ставок и следующее действие — на одном экране, поэтому ставка становится решением, а не азартом.",
        built: [
          "Онбординг, объясняющий маркетплейс до любых запросов",
          "Главная лента с трендовыми аукционами и топ-коллекциями",
          "Фильтры по категории и блокчейну плюс рейтинг продавцов с изменением цены",
          "Карточка живого аукциона с текущей ставкой и тем, кто её сделал",
          "Экран ставки с таймером, количеством просмотров, происхождением предмета и историей ставок",
          "Баланс кошелька, вынесенный в шапку",
          "Три полных дизайн-направления одного продукта",
        ],
        flow: [
          "Открыть приложение",
          "Онбординг",
          "Просмотреть или отфильтровать коллекции",
          "Открыть трендовый аукцион",
          "Оценить цену, время и историю ставок",
          "Сделать ставку",
          "Следить за активностью",
        ],
        result:
          "Полный опыт мобильного маркетплейса в трёх завершённых дизайн-направлениях: онбординг, поиск с фильтрами по категории и сети, живой аукцион с текущей ставкой и экран ставки с таймером, происхождением и историей. Момент ставки — там, где приложения-маркетплейсы обычно теряют покупателя — полностью определён и готов к реализации.",
        capabilities: [
          "Просмотр маркетплейса",
          "Живые аукционы и ставки",
          "Фильтры по категории и сети",
          "Рейтинг продавцов",
          "Баланс кошелька",
          "Происхождение и история предмета",
          "Мобильная дизайн-система",
        ],
        tech: ["Дизайн мобильного продукта", "Архитектура маркетплейса", "Поток аукциона и ставок"],
        proof: [
          "Три полных, внутренне согласованных дизайн-направления одного продукта — показаны ниже",
          "Путь ставки спроектирован сквозным образом: поиск, аукцион, ставка, история",
          "Продуктовый концепт: интерфейс и продуктовая архитектура, а не развёрнутый маркетплейс",
        ],
        ctaLabel: "Обсудить приложение-маркетплейс",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "telegram-mining",
    statusLabel: { en: "Completed Telegram Mini App concept", ua: "Завершений концепт Telegram Mini App", ru: "Завершённый концепт Telegram Mini App" },
    status: "concept",
    category: "mobile",
    shots: [
      "/case-studies/telegram-mining/screens.webp",
      "/case-studies/telegram-mining/shop.webp",
    ],
    shotSpan: ["full", "full"],
    captions: {
      en: [
        "Core loop — a finance area for top-up and withdrawal, a collection timer with a claim action, and a referral system with the invited-friends list",
        "Withdrawal, top-up and the upgrade shop — six packages that increase the collection rate (wallet address and QR redacted)",
      ],
      ua: [
        "Основний цикл — фінансовий розділ для поповнення й виводу, таймер збору з дією «зібрати» та реферальна система зі списком запрошених",
        "Вивід, поповнення й магазин покращень — шість пакетів, що підвищують швидкість збору (адресу гаманця та QR приховано)",
      ],
      ru: [
        "Основной цикл — финансовый раздел для пополнения и вывода, таймер сбора с действием «собрать» и реферальная система со списком приглашённых",
        "Вывод, пополнение и магазин улучшений — шесть пакетов, повышающих скорость сбора (адрес кошелька и QR скрыты)",
      ],
    },
    content: {
      en: {
        name: "Telegram Mini App — Mining",
        type: "Telegram Mini App concept · Rewards & referrals",
        context:
          "A product that runs inside Telegram rather than as a standalone app: users open it in a chat, collect on a timer, invite friends and can upgrade a paid package.",
        problem:
          "Getting someone to install an app is the most expensive step a consumer product has. A Telegram Mini App removes it — but removing friction is not the same as earning attention. Without a reason to come back and a reason to invite, a Mini App is just a page.",
        outcome:
          "A retention loop that does not depend on paid acquisition: a timer brings the user back, the referral system turns each user into a channel, and the shop gives the engaged ones something to buy.",
        built: [
          "A Telegram Mini App shell with bottom navigation across finance, mining, referrals and shop",
          "A collection timer with an explicit claim action and the amount collected",
          "A finance area for topping up and withdrawing to a wallet, with a stated minimum",
          "A referral system paying a share of invited users' top-ups and activity",
          "An invited-friends list showing each friend's reward",
          "A shop of six upgrade packages that increase the collection rate",
          "Wallet connection state surfaced on every screen",
        ],
        flow: [
          "Open the Mini App in Telegram",
          "Connect a wallet",
          "Collect on the timer",
          "Invite friends for a share",
          "Top up",
          "Buy a faster package",
          "Withdraw",
        ],
        result:
          "A complete retention loop specified for a product that needs no install: a return timer with a claim action, a finance area for top-up and withdrawal, a referral system that pays out on invited users' activity, and an upgrade shop. The concept defines the mechanics that make a Telegram Mini App grow through its own users rather than paid acquisition.",
        capabilities: [
          "Telegram Mini App",
          "Return timer & rewards loop",
          "Referral system with payouts",
          "Top-up & withdrawal",
          "In-app package shop",
          "Wallet connection states",
        ],
        tech: ["Telegram Mini App", "Rewards & referral logic", "Crypto wallet connection"],
        proof: [
          "The full loop is designed — collect, invite, top up, upgrade, withdraw — and shown below",
          "Wallet connection, minimums and empty states are handled explicitly rather than assumed",
          "Product concept: interface and product mechanics, not a released Mini App",
        ],
        ctaLabel: "Build a Telegram Mini App",
        liveLabel: "View live project",
      },
      ua: {
        name: "Telegram Mini App — Mining",
        type: "Концепт Telegram Mini App · Винагороди й реферали",
        context:
          "Продукт, що працює всередині Telegram, а не як окремий застосунок: користувач відкриває його в чаті, збирає за таймером, запрошує друзів і може купити кращий пакет.",
        problem:
          "Змусити людину встановити застосунок — найдорожчий крок для споживчого продукту. Telegram Mini App прибирає його, але прибрати тертя ще не означає здобути увагу. Без причини повертатись і причини запрошувати Mini App — це просто сторінка.",
        outcome:
          "Цикл утримання, що не тримається на платному залученні: таймер повертає користувача, реферальна система робить із кожного користувача канал, а магазин дає залученим що купити.",
        built: [
          "Оболонка Telegram Mini App із нижньою навігацією: фінанси, майнінг, реферали, магазин",
          "Таймер збору з явною дією «зібрати» та сумою збору",
          "Фінансовий розділ для поповнення та виводу на гаманець із зазначеним мінімумом",
          "Реферальна система з часткою від поповнень і активності запрошених",
          "Список запрошених друзів із винагородою за кожного",
          "Магазин із шести пакетів покращення, що підвищують швидкість збору",
          "Стан підключення гаманця, показаний на кожному екрані",
        ],
        flow: [
          "Відкрити Mini App у Telegram",
          "Під'єднати гаманець",
          "Зібрати за таймером",
          "Запросити друзів за частку",
          "Поповнити",
          "Купити швидший пакет",
          "Вивести",
        ],
        result:
          "Повний цикл утримання для продукту, який не треба встановлювати: таймер повернення з дією «зібрати», фінансовий розділ для поповнення й виводу, реферальна система з виплатами за активність запрошених і магазин покращень. Концепт визначає механіку, завдяки якій Telegram Mini App росте через власних користувачів, а не через платне залучення.",
        capabilities: [
          "Telegram Mini App",
          "Таймер повернення й цикл винагород",
          "Реферальна система з виплатами",
          "Поповнення та вивід",
          "Магазин пакетів у застосунку",
          "Стани підключення гаманця",
        ],
        tech: ["Telegram Mini App", "Логіка винагород і рефералів", "Підключення крипто-гаманця"],
        proof: [
          "Повний цикл спроєктовано — зібрати, запросити, поповнити, покращити, вивести — і показано нижче",
          "Підключення гаманця, мінімуми та порожні стани опрацьовані явно, а не припущені",
          "Продуктовий концепт: інтерфейс і продуктова механіка, а не випущений Mini App",
        ],
        ctaLabel: "Побудувати Telegram Mini App",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "Telegram Mini App — Mining",
        type: "Концепт Telegram Mini App · Награды и рефералы",
        context:
          "Продукт, работающий внутри Telegram, а не как отдельное приложение: пользователь открывает его в чате, собирает по таймеру, приглашает друзей и может купить пакет лучше.",
        problem:
          "Заставить человека установить приложение — самый дорогой шаг для потребительского продукта. Telegram Mini App убирает его, но убрать трение ещё не значит получить внимание. Без причины возвращаться и причины приглашать Mini App — это просто страница.",
        outcome:
          "Цикл удержания, не держащийся на платном привлечении: таймер возвращает пользователя, реферальная система делает из каждого пользователя канал, а магазин даёт вовлечённым что купить.",
        built: [
          "Оболочка Telegram Mini App с нижней навигацией: финансы, майнинг, рефералы, магазин",
          "Таймер сбора с явным действием «собрать» и суммой сбора",
          "Финансовый раздел для пополнения и вывода на кошелёк с указанным минимумом",
          "Реферальная система с долей от пополнений и активности приглашённых",
          "Список приглашённых друзей с наградой за каждого",
          "Магазин из шести пакетов улучшения, повышающих скорость сбора",
          "Состояние подключения кошелька, показанное на каждом экране",
        ],
        flow: [
          "Открыть Mini App в Telegram",
          "Подключить кошелёк",
          "Собрать по таймеру",
          "Пригласить друзей за долю",
          "Пополнить",
          "Купить более быстрый пакет",
          "Вывести",
        ],
        result:
          "Полный цикл удержания для продукта, который не нужно устанавливать: таймер возврата с действием «собрать», финансовый раздел для пополнения и вывода, реферальная система с выплатами за активность приглашённых и магазин улучшений. Концепт определяет механику, благодаря которой Telegram Mini App растёт через собственных пользователей, а не через платное привлечение.",
        capabilities: [
          "Telegram Mini App",
          "Таймер возврата и цикл наград",
          "Реферальная система с выплатами",
          "Пополнение и вывод",
          "Магазин пакетов в приложении",
          "Состояния подключения кошелька",
        ],
        tech: ["Telegram Mini App", "Логика наград и рефералов", "Подключение крипто-кошелька"],
        proof: [
          "Полный цикл спроектирован — собрать, пригласить, пополнить, улучшить, вывести — и показан ниже",
          "Подключение кошелька, минимумы и пустые состояния проработаны явно, а не предположены",
          "Продуктовый концепт: интерфейс и продуктовая механика, а не выпущенный Mini App",
        ],
        ctaLabel: "Построить Telegram Mini App",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "un-amour",
    statusLabel: { en: "Completed ecommerce concept", ua: "Завершений e-commerce концепт", ru: "Завершённый e-commerce концепт" },
    status: "concept",
    category: "ecommerce",
    shots: [
      "/case-studies/un-amour/storefront.webp",
      "/case-studies/un-amour/collection.webp",
    ],
    shotSpan: ["full", "full"],
    captions: {
      en: [
        "Storefront — catalogue, about, collaboration, contacts and FAQ navigation with a UA/EN switch, search and cart",
        "Brand story and the bestseller row, each piece priced, leading into the wedding and evening collection",
      ],
      ua: [
        "Вітрина — навігація каталогом, про нас, співпраця, контакти й FAQ із перемикачем UA/EN, пошуком і кошиком",
        "Історія бренду та ряд бестселерів із цінами, що веде до весільної та вечірньої колекції",
      ],
      ru: [
        "Витрина — навигация по каталогу, о нас, сотрудничество, контакты и FAQ с переключателем UA/EN, поиском и корзиной",
        "История бренда и ряд бестселлеров с ценами, ведущий к свадебной и вечерней коллекции",
      ],
    },
    content: {
      en: {
        name: "UN AMOUR",
        type: "Fashion ecommerce · Ukrainian womenswear brand",
        context:
          "An online store for a Ukrainian womenswear brand making ready-to-wear and made-to-measure pieces, including a wedding and evening collection.",
        problem:
          "A considered garment is a considered purchase. When the store hides the price, buries the collection or reads like a photo album, the buyer stops trusting the brand long before they reach the cart — and a made-to-measure enquiry never happens.",
        outcome:
          "A storefront that behaves like a boutique: the piece is shown properly, the price is stated, the collections are separated, and there is always one clear way through to the catalogue.",
        built: [
          "An editorial storefront leading with the garment",
          "A bestseller row with each piece priced",
          "A wedding and evening collection section",
          "Catalogue, about, collaboration, contacts and FAQ navigation",
          "A UA/EN language switch",
          "Search and cart in the header",
        ],
        flow: ["Arrive on the storefront", "Read the brand", "Browse bestsellers", "Open the collection", "Go to the catalogue", "Add to cart"],
        result:
          "A finished bilingual storefront for a considered garment: an editorial home that leads with the piece, a priced bestseller row, a separated wedding and evening collection, and catalogue, search and cart always within reach. The store behaves like a boutique rather than a photo album.",
        capabilities: ["Storefront & catalogue", "Bestseller merchandising", "Collection structure", "Bilingual UA/EN", "Search & cart"],
        tech: ["Ecommerce storefront", "Catalogue structure", "Bilingual content"],
        proof: [
          "The storefront, brand story, priced bestseller row and collection section are designed and shown below",
          "The store is bilingual by structure, not by afterthought",
          "Product concept: storefront design, not a deployed shop I operate",
        ],
        ctaLabel: "Build an online store like this",
        liveLabel: "View live project",
      },
      ua: {
        name: "UN AMOUR",
        type: "Fashion ecommerce · Український бренд жіночого одягу",
        context:
          "Онлайн-магазин українського бренду жіночого одягу, що створює ready-to-wear і made-to-measure речі, включно з весільною та вечірньою колекцією.",
        problem:
          "Продумана річ — це продумана покупка. Коли магазин ховає ціну, закопує колекцію або читається як фотоальбом, покупець втрачає довіру до бренду задовго до кошика — і запит на індивідуальний пошив просто не стається.",
        outcome:
          "Вітрина, що поводиться як бутик: річ показана як слід, ціна названа, колекції розділені, і завжди є один зрозумілий шлях до каталогу.",
        built: [
          "Редакційна вітрина, що починається з самої речі",
          "Ряд бестселерів із ціною кожної позиції",
          "Секція весільної та вечірньої колекції",
          "Навігація: каталог, про нас, співпраця, контакти, FAQ",
          "Перемикач мови UA/EN",
          "Пошук і кошик у шапці",
        ],
        flow: ["Потрапити на вітрину", "Прочитати про бренд", "Переглянути бестселери", "Відкрити колекцію", "Перейти в каталог", "Додати в кошик"],
        result:
          "Завершена двомовна вітрина для продуманої речі: редакційна головна, що починається з самого виробу, ряд бестселерів із цінами, окрема весільна та вечірня колекція, а каталог, пошук і кошик — завжди під рукою. Магазин поводиться як бутик, а не як фотоальбом.",
        capabilities: ["Вітрина й каталог", "Мерчандайзинг бестселерів", "Структура колекцій", "Двомовність UA/EN", "Пошук і кошик"],
        tech: ["Ecommerce-вітрина", "Структура каталогу", "Двомовний контент"],
        proof: [
          "Вітрина, історія бренду, ряд бестселерів із цінами та секція колекції спроєктовані й показані нижче",
          "Магазин двомовний за структурою, а не як доробка",
          "Продуктовий концепт: дизайн вітрини, а не розгорнутий магазин, яким я оперую",
        ],
        ctaLabel: "Побудувати онлайн-магазин як цей",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "UN AMOUR",
        type: "Fashion ecommerce · Украинский бренд женской одежды",
        context:
          "Онлайн-магазин украинского бренда женской одежды, создающего ready-to-wear и made-to-measure вещи, включая свадебную и вечернюю коллекцию.",
        problem:
          "Продуманная вещь — это продуманная покупка. Когда магазин прячет цену, закапывает коллекцию или читается как фотоальбом, покупатель теряет доверие к бренду задолго до корзины — и запрос на индивидуальный пошив просто не случается.",
        outcome:
          "Витрина, ведущая себя как бутик: вещь показана как следует, цена названа, коллекции разделены, и всегда есть один понятный путь в каталог.",
        built: [
          "Редакционная витрина, начинающаяся с самой вещи",
          "Ряд бестселлеров с ценой каждой позиции",
          "Секция свадебной и вечерней коллекции",
          "Навигация: каталог, о нас, сотрудничество, контакты, FAQ",
          "Переключатель языка UA/EN",
          "Поиск и корзина в шапке",
        ],
        flow: ["Попасть на витрину", "Прочитать о бренде", "Просмотреть бестселлеры", "Открыть коллекцию", "Перейти в каталог", "Добавить в корзину"],
        result:
          "Завершённая двуязычная витрина для продуманной вещи: редакционная главная, начинающаяся с самого изделия, ряд бестселлеров с ценами, отдельная свадебная и вечерняя коллекция, а каталог, поиск и корзина — всегда под рукой. Магазин ведёт себя как бутик, а не как фотоальбом.",
        capabilities: ["Витрина и каталог", "Мерчандайзинг бестселлеров", "Структура коллекций", "Двуязычность UA/EN", "Поиск и корзина"],
        tech: ["Ecommerce-витрина", "Структура каталога", "Двуязычный контент"],
        proof: [
          "Витрина, история бренда, ряд бестселлеров с ценами и секция коллекции спроектированы и показаны ниже",
          "Магазин двуязычный по структуре, а не как доработка",
          "Продуктовый концепт: дизайн витрины, а не развёрнутый магазин, которым я оперирую",
        ],
        ctaLabel: "Построить онлайн-магазин как этот",
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
    valueLabel: string;
    resultLabel: string;
    audioLabel: string;
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
      "SaaS platforms, AI products, mobile and Telegram apps, marketplaces, online stores and Web3 interfaces — from a first MVP to working production systems.",
    trustLine:
      "Every project is labelled with its real build stage. Real screenshots from the real products, and no metric I can't stand behind.",
    heroPrimary: "Discuss my project",
    heroSecondary: "Browse the work",
    filterAll: "All work",
    filterFeatured: "Featured",
    featuredTitle: "Featured builds",
    featuredIntro: "The builds that best show what I can take from an idea to a working product.",
    allWorkTitle: "All work",
    allWorkIntro: "Everything else, grouped by what kind of build it is.",
    emptyFilter: "Nothing in this category yet.",
    viewCase: "View case",
    requestSimilar: "Request a similar system",
    live: "View live project",
    outcomeLabel: "What it changes",
    problemLabel: "Problem",
    builtLabel: "What was delivered",
    valueLabel: "Why it matters",
    resultLabel: "Outcome",
    audioLabel: "Listen to the demo",
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
      "SaaS-платформи, AI-продукти, мобільні та Telegram-застосунки, маркетплейси, онлайн-магазини й Web3-інтерфейси — від першого MVP до робочих продакшн-систем.",
    trustLine:
      "Кожен проєкт позначено реальним етапом розробки. Справжні скриншоти зі справжніх продуктів і жодної метрики, за яку я не можу відповісти.",
    heroPrimary: "Обговорити мій проєкт",
    heroSecondary: "Переглянути роботи",
    filterAll: "Усі роботи",
    filterFeatured: "Ключові",
    featuredTitle: "Ключові білди",
    featuredIntro: "Білди, які найкраще показують, що я доводжу від ідеї до робочого продукту.",
    allWorkTitle: "Усі роботи",
    allWorkIntro: "Решта проєктів, згрупована за типом білду.",
    emptyFilter: "У цій категорії поки що порожньо.",
    viewCase: "Відкрити кейс",
    requestSimilar: "Замовити подібну систему",
    live: "Переглянути живий проєкт",
    outcomeLabel: "Що це змінює",
    problemLabel: "Проблема",
    builtLabel: "Що зроблено",
    valueLabel: "Чому це важливо",
    resultLabel: "Результат",
    audioLabel: "Послухати демо",
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
      "SaaS-платформы, AI-продукты, мобильные и Telegram-приложения, маркетплейсы, интернет-магазины и Web3-интерфейсы — от первого MVP до работающих продакшн-систем.",
    trustLine:
      "Каждый проект помечен реальным этапом разработки. Реальные скриншоты из реальных продуктов и ни одной метрики, за которую я не могу ответить.",
    heroPrimary: "Обсудить мой проект",
    heroSecondary: "Посмотреть работы",
    filterAll: "Все работы",
    filterFeatured: "Ключевые",
    featuredTitle: "Ключевые билды",
    featuredIntro: "Билды, которые лучше всего показывают, что я довожу от идеи до работающего продукта.",
    allWorkTitle: "Все работы",
    allWorkIntro: "Остальные проекты, сгруппированные по типу билда.",
    emptyFilter: "В этой категории пока пусто.",
    viewCase: "Открыть кейс",
    requestSimilar: "Заказать похожую систему",
    live: "Открыть живой проект",
    outcomeLabel: "Что это меняет",
    problemLabel: "Проблема",
    builtLabel: "Что сделано",
    valueLabel: "Почему это важно",
    resultLabel: "Результат",
    audioLabel: "Послушать демо",
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
    solutionLabel: string;
    builtLabel: string;
    flowLabel: string;
    resultLabel: string;
    capabilitiesLabel: string;
    galleryLabel: string;
    galleryNote: string;
    techLabel: string;
    proofLabel: string;
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
    problemLabel: "The business problem",
    solutionLabel: "The solution",
    builtLabel: "What was delivered",
    flowLabel: "How it works",
    resultLabel: "Outcome",
    capabilitiesLabel: "Key capabilities",
    galleryLabel: "Visual walkthrough",
    galleryNote: "Screens from the real product.",
    techLabel: "Technical implementation",
    proofLabel: "What exists today",
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
    problemLabel: "Бізнес-проблема",
    solutionLabel: "Рішення",
    builtLabel: "Що було зроблено",
    flowLabel: "Як це працює",
    resultLabel: "Результат",
    capabilitiesLabel: "Ключові можливості",
    galleryLabel: "Візуальний розбір",
    galleryNote: "Екрани зі справжнього продукту.",
    techLabel: "Технічна реалізація",
    proofLabel: "Що існує сьогодні",
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
    problemLabel: "Бизнес-проблема",
    solutionLabel: "Решение",
    builtLabel: "Что было сделано",
    flowLabel: "Как это работает",
    resultLabel: "Результат",
    capabilitiesLabel: "Ключевые возможности",
    galleryLabel: "Визуальный разбор",
    galleryNote: "Экраны из реального продукта.",
    techLabel: "Техническая реализация",
    proofLabel: "Что существует сегодня",
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
// Capability matrix — each capability against the projects where it was built.
// ---------------------------------------------------------------------------
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
