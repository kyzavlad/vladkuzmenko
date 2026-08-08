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
  | "prototype"
  | "concept";

export const STATUS_LABEL: Record<Status, Record<Lang, string>> = {
  real_client: { en: "Live client project", ua: "Живий клієнтський проєкт", ru: "Живой клиентский проект" },
  active_development: { en: "In active development", ua: "В активній розробці", ru: "В активной разработке" },
  in_development: { en: "In development", ua: "У розробці", ru: "В разработке" },
  prototype: { en: "Prototype", ua: "Прототип", ru: "Прототип" },
  concept: { en: "Product concept", ua: "Продуктовий концепт", ru: "Продуктовый концепт" },
};

export const STATUS_TONE: Record<Status, "green" | "amber"> = {
  real_client: "green",
  active_development: "amber",
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
        capabilities: ["Аккаунты", "Подписка и пейволл", "Админ- и операционная консоль", "Ролевой доступ", "Согласие и контроль данных", "Многоязычность"],
        caption: "TurbotaAI — главная страница",
      },
    },
  },
  {
    key: "tutorivo",
    category: "platforms",
    status: "in_development",
    featured: 3,
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
    key: "cod-power-group",
    category: "platforms",
    status: "concept",
    featured: 2,
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
        capabilities: ["Заказы и склад", "Пайплайн колл-центра", "Трекинг курьеров", "Счета", "Роли продавца и партнёра", "Аналитика"],
        caption: "COD Power Group — платформа и панель",
      },
    },
  },
  {
    key: "nft-marketplace",
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
        capabilities: ["Просмотр маркетплейса", "Живые аукционы и ставки", "Фильтры и рейтинг", "Баланс кошелька", "Страница коллекции"],
        caption: "NFT-маркетплейс — аукционное направление",
      },
    },
  },
  {
    key: "telegram-mining",
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
        capabilities: ["Telegram Mini App", "Таймер возврата и награды", "Реферальная система", "Пополнение и вывод", "Платные улучшения"],
        caption: "Telegram Mini App — ключевые экраны",
      },
    },
  },
  {
    key: "un-amour",
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
        capabilities: ["Витрина и каталог", "Мерчандайзинг бестселлеров", "Коллекции", "Двуязычность UA/EN", "Поиск и корзина"],
        caption: "UN AMOUR — витрина",
      },
    },
  },
  {
    key: "web3-interfaces",
    category: "web3",
    status: "concept",
    caseSlug: "web3-interfaces",
    shots: [
      "/case-studies/web3-interfaces/wallet.webp",
      "/case-studies/web3-interfaces/convex.webp",
      "/case-studies/web3-interfaces/oxhash.webp",
      "/case-studies/web3-interfaces/iko.webp",
    ],
    content: {
      en: {
        name: "Web3 & DeFi Interfaces",
        type: "Web3 product concepts · Wallet, staking, L2, B2B",
        outcome:
          "Four crypto products explained so a non-specialist can tell what they do, what it costs and what happens to their assets — before being asked to connect a wallet.",
        problem:
          "Crypto products lose people at the first screen. The mechanism is buried in jargon, custody and fees are vague, and trust has to be earned before anything is signed.",
        built:
          "Four product directions: a self-custody wallet with swap, chain selection and transparency/security sections; a staking product with boosted yields and audit proof; a Layer-2 chain with grants and routing; and a B2B blockchain-for-business site.",
        capabilities: ["Wallet & swap UX", "Staking & yield", "Chain / network selection", "Security & audit framing", "B2B Web3 positioning"],
        caption: "Self-custody wallet direction",
      },
      ua: {
        name: "Web3 та DeFi інтерфейси",
        type: "Концепти Web3-продуктів · Гаманець, стейкінг, L2, B2B",
        outcome:
          "Чотири крипто-продукти, пояснені так, щоб неспеціаліст зрозумів, що вони роблять, скільки це коштує і що стається з його активами — ще до прохання під'єднати гаманець.",
        problem:
          "Крипто-продукти втрачають людей на першому екрані. Механіка захована в жаргоні, зберігання й комісії нечіткі, а довіру треба заслужити ще до першого підпису.",
        built:
          "Чотири продуктові напрямки: гаманець самозберігання зі свопом, вибором мережі та секціями прозорості й безпеки; стейкінг-продукт із підвищеною дохідністю та підтвердженням аудиту; Layer-2 мережа з грантами й маршрутизацією; B2B-сайт «блокчейн для бізнесу».",
        capabilities: ["UX гаманця та свопу", "Стейкінг і дохідність", "Вибір мережі", "Подача безпеки й аудиту", "B2B-позиціонування Web3"],
        caption: "Напрямок гаманця самозберігання",
      },
      ru: {
        name: "Web3 и DeFi интерфейсы",
        type: "Концепты Web3-продуктов · Кошелёк, стейкинг, L2, B2B",
        outcome:
          "Четыре крипто-продукта, объяснённые так, чтобы неспециалист понял, что они делают, сколько это стоит и что происходит с его активами — ещё до просьбы подключить кошелёк.",
        problem:
          "Крипто-продукты теряют людей на первом экране. Механика спрятана в жаргоне, хранение и комиссии размыты, а доверие нужно заслужить до первой подписи.",
        built:
          "Четыре продуктовых направления: кошелёк самохранения со свопом, выбором сети и секциями прозрачности и безопасности; стейкинг-продукт с повышенной доходностью и подтверждением аудита; Layer-2 сеть с грантами и маршрутизацией; B2B-сайт «блокчейн для бизнеса».",
        capabilities: ["UX кошелька и свопа", "Стейкинг и доходность", "Выбор сети", "Подача безопасности и аудита", "B2B-позиционирование Web3"],
        caption: "Направление кошелька самохранения",
      },
    },
  },
  {
    key: "dtc-landings",
    category: "ecommerce",
    status: "concept",
    caseSlug: "dtc-landings",
    shots: [
      "/case-studies/dtc-landings/aurea.webp",
      "/case-studies/dtc-landings/kinex.webp",
      "/case-studies/dtc-landings/ovulan.webp",
    ],
    content: {
      en: {
        name: "DTC Product Landings",
        type: "UI/UX concepts · Six consumer brands",
        outcome:
          "A repeatable landing structure for a physical product: what it is, why it is better, proof, the range, and one buying action — built once and reused across categories.",
        problem:
          "Most product pages describe the product and forget the decision. The buyer scrolls, learns nothing they can act on, and leaves without reaching a price.",
        built:
          "Six conversion landings across skincare, wearables, electric mobility, watches, coffee and car detailing — each with a product hero, a benefits breakdown, a range or bestseller grid and a closing action.",
        capabilities: ["Conversion landing structure", "Product merchandising", "Benefit breakdowns", "Range presentation", "Design system reuse"],
        caption: "Skincare landing — Auréa",
      },
      ua: {
        name: "DTC-лендинги продуктів",
        type: "UI/UX концепти · Шість споживчих брендів",
        outcome:
          "Повторювана структура лендингу для фізичного продукту: що це, чому краще, підтвердження, лінійка й одна дія купівлі — зроблено раз і перевикористано в різних категоріях.",
        problem:
          "Більшість сторінок продукту описують товар і забувають про рішення. Покупець гортає, не дізнається нічого, на що можна діяти, і йде, не дійшовши до ціни.",
        built:
          "Шість конверсійних лендингів у догляді за шкірою, носимих пристроях, електротранспорті, годинниках, каві та детейлінгу — кожен із героєм продукту, розбором переваг, сіткою лінійки чи бестселерів і завершальною дією.",
        capabilities: ["Структура конверсійного лендингу", "Мерчандайзинг продукту", "Розбір переваг", "Презентація лінійки", "Перевикористання дизайн-системи"],
        caption: "Лендинг догляду за шкірою — Auréa",
      },
      ru: {
        name: "DTC-лендинги продуктов",
        type: "UI/UX концепты · Шесть потребительских брендов",
        outcome:
          "Повторяемая структура лендинга для физического продукта: что это, почему лучше, подтверждение, линейка и одно действие покупки — сделано раз и переиспользовано в разных категориях.",
        problem:
          "Большинство страниц продукта описывают товар и забывают о решении. Покупатель листает, не узнаёт ничего, на что можно действовать, и уходит, не дойдя до цены.",
        built:
          "Шесть конверсионных лендингов в уходе за кожей, носимых устройствах, электротранспорте, часах, кофе и детейлинге — каждый с героем продукта, разбором преимуществ, сеткой линейки или бестселлеров и завершающим действием.",
        capabilities: ["Структура конверсионного лендинга", "Мерчандайзинг продукта", "Разбор преимуществ", "Презентация линейки", "Переиспользование дизайн-системы"],
        caption: "Лендинг ухода за кожей — Auréa",
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
        notClaimed: [
          "User or subscriber numbers",
          "Revenue",
          "The figures in the admin console (QA fixture data, not real usage)",
          "A published iOS or Android app",
          "Live payment processing",
          "Any therapeutic or clinical outcome",
        ],
        scopeNote:
          "Status: in active development, built in public. Every number visible in the operations console is QA fixture data generated by the screenshot harness — the accounts shown use the reserved @qa.invalid domain and are not real people. I do not claim user numbers, revenue, a published mobile app, live payments or any therapeutic outcome: TurbotaAI is a conversation product, not a medical service.",
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
        notClaimed: [
          "Кількість користувачів чи підписників",
          "Дохід",
          "Цифри в операційній консолі (це QA-фікстури, а не реальне використання)",
          "Опублікований застосунок iOS чи Android",
          "Жива обробка платежів",
          "Будь-який терапевтичний чи клінічний результат",
        ],
        scopeNote:
          "Статус: в активній розробці, будується публічно. Кожна цифра в операційній консолі — це QA-фікстура, згенерована скриншот-харнесом; показані акаунти використовують зарезервований домен @qa.invalid і не є реальними людьми. Я не заявляю кількість користувачів, дохід, опублікований мобільний застосунок, живі оплати чи терапевтичний ефект: TurbotaAI є продуктом для розмови, а не медичною послугою.",
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
        notClaimed: [
          "Количество пользователей или подписчиков",
          "Доход",
          "Цифры в операционной консоли (это QA-фикстуры, а не реальное использование)",
          "Опубликованное приложение iOS или Android",
          "Живая обработка платежей",
          "Любой терапевтический или клинический результат",
        ],
        scopeNote:
          "Статус: в активной разработке, строится публично. Каждая цифра в операционной консоли — это QA-фикстура, сгенерированная скриншот-харнессом; показанные аккаунты используют зарезервированный домен @qa.invalid и не являются реальными людьми. Я не заявляю количество пользователей, доход, опубликованное мобильное приложение, живые оплаты или терапевтический эффект: TurbotaAI является продуктом для разговора, а не медицинской услугой.",
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
  {
    slug: "cod-power-group",
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
        notClaimed: [
          "That this is a live deployed platform",
          "Any seller, order or revenue figure",
          "Carrier or partner relationships",
          "The company logos shown in the design",
          "Client results",
        ],
        scopeNote:
          "Status: product concept. Every figure inside the dashboard — order counts, lead counts, delivery rates — is placeholder design content, not real operating data. The courier and company logos in the design are illustrative of the category, not evidence of partnerships. The dashboard user's name has been redacted.",
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
        notClaimed: [
          "Що це жива розгорнута платформа",
          "Будь-які цифри продавців, замовлень чи виручки",
          "Відносини з перевізниками або партнерами",
          "Логотипи компаній, показані в дизайні",
          "Результати клієнта",
        ],
        scopeNote:
          "Статус: продуктовий концепт. Кожна цифра всередині панелі — кількість замовлень, лідів, відсоток доставки — це демонстраційний контент дизайну, а не реальні операційні дані. Логотипи кур'єрів і компаній ілюструють категорію, а не підтверджують партнерства. Ім'я користувача в панелі приховано.",
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
        notClaimed: [
          "Что это живая развёрнутая платформа",
          "Любые цифры продавцов, заказов или выручки",
          "Отношения с перевозчиками или партнёрами",
          "Логотипы компаний, показанные в дизайне",
          "Результаты клиента",
        ],
        scopeNote:
          "Статус: продуктовый концепт. Каждая цифра внутри панели — количество заказов, лидов, процент доставки — это демонстрационный контент дизайна, а не реальные операционные данные. Логотипы курьеров и компаний иллюстрируют категорию, а не подтверждают партнёрства. Имя пользователя в панели скрыто.",
        ctaLabel: "Построить операционную платформу как эта",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "nft-marketplace",
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
        notClaimed: [
          "A launched or trading marketplace",
          "Transaction volume, users or listings",
          "Any smart-contract implementation",
          "Association with the collections shown in the design",
          "Custody of anyone's assets",
        ],
        scopeNote:
          "Status: product concept. This is mobile product and interface work — the collection names, prices and bids visible in the screens are placeholder content used to design the flow, not live market data. No smart contract, wallet custody or trading system is claimed.",
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
        notClaimed: [
          "Запущений або торгуючий маркетплейс",
          "Обсяг транзакцій, користувачів чи лотів",
          "Будь-яка реалізація смартконтрактів",
          "Зв'язок із колекціями, показаними в дизайні",
          "Зберігання чиїхось активів",
        ],
        scopeNote:
          "Статус: продуктовий концепт. Це робота над мобільним продуктом та інтерфейсом — назви колекцій, ціни й ставки на екранах є демонстраційним контентом для проєктування потоку, а не живими ринковими даними. Смартконтракти, зберігання активів чи торгова система не заявляються.",
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
        notClaimed: [
          "Запущенный или торгующий маркетплейс",
          "Объём транзакций, пользователей или лотов",
          "Любая реализация смартконтрактов",
          "Связь с коллекциями, показанными в дизайне",
          "Хранение чьих-либо активов",
        ],
        scopeNote:
          "Статус: продуктовый концепт. Это работа над мобильным продуктом и интерфейсом — названия коллекций, цены и ставки на экранах являются демонстрационным контентом для проектирования потока, а не живыми рыночными данными. Смартконтракты, хранение активов или торговая система не заявляются.",
        ctaLabel: "Обсудить приложение-маркетплейс",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "telegram-mining",
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
        notClaimed: [
          "A released or operating Mini App",
          "Users, deposits or payouts",
          "Actual mining capacity or yield",
          "Any financial return to a user",
          "Custody or handling of funds",
        ],
        scopeNote:
          "Status: product concept. This is product and interface work for a Telegram Mini App — the balances, timers and package prices are placeholder content used to design the loop. No operating app, mining capacity, yield or financial return is claimed, and the wallet address and QR code visible in the source have been redacted before publication.",
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
        notClaimed: [
          "Випущений або працюючий Mini App",
          "Користувачі, депозити чи виплати",
          "Реальна потужність майнінгу чи дохідність",
          "Будь-який фінансовий дохід користувача",
          "Зберігання чи обробка коштів",
        ],
        scopeNote:
          "Статус: продуктовий концепт. Це продуктова та інтерфейсна робота для Telegram Mini App — баланси, таймери й ціни пакетів є демонстраційним контентом для проєктування циклу. Працюючий застосунок, потужність майнінгу, дохідність чи фінансовий результат не заявляються, а адресу гаманця й QR-код із джерела приховано перед публікацією.",
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
        notClaimed: [
          "Выпущенный или работающий Mini App",
          "Пользователи, депозиты или выплаты",
          "Реальная мощность майнинга или доходность",
          "Любой финансовый доход пользователя",
          "Хранение или обработка средств",
        ],
        scopeNote:
          "Статус: продуктовый концепт. Это продуктовая и интерфейсная работа для Telegram Mini App — балансы, таймеры и цены пакетов являются демонстрационным контентом для проектирования цикла. Работающее приложение, мощность майнинга, доходность или финансовый результат не заявляются, а адрес кошелька и QR-код из источника скрыты перед публикацией.",
        ctaLabel: "Построить Telegram Mini App",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "un-amour",
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
        capabilities: ["Storefront & catalogue", "Bestseller merchandising", "Collection structure", "Bilingual UA/EN", "Search & cart"],
        tech: ["Ecommerce storefront", "Catalogue structure", "Bilingual content"],
        proof: [
          "The storefront, brand story, priced bestseller row and collection section are designed and shown below",
          "The store is bilingual by structure, not by afterthought",
          "Product concept: storefront design, not a deployed shop I operate",
        ],
        notClaimed: [
          "A live or trading online store",
          "Sales, orders or traffic",
          "A payment or delivery integration",
          "A commercial relationship with the brand",
        ],
        scopeNote:
          "Status: product concept. This is storefront and catalogue design. Product names and prices shown are content used to design the layout; I do not claim a live shop, sales, or an operating payment or delivery integration.",
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
        capabilities: ["Вітрина й каталог", "Мерчандайзинг бестселерів", "Структура колекцій", "Двомовність UA/EN", "Пошук і кошик"],
        tech: ["Ecommerce-вітрина", "Структура каталогу", "Двомовний контент"],
        proof: [
          "Вітрина, історія бренду, ряд бестселерів із цінами та секція колекції спроєктовані й показані нижче",
          "Магазин двомовний за структурою, а не як доробка",
          "Продуктовий концепт: дизайн вітрини, а не розгорнутий магазин, яким я оперую",
        ],
        notClaimed: [
          "Живий або працюючий онлайн-магазин",
          "Продажі, замовлення чи трафік",
          "Інтеграція оплат або доставки",
          "Комерційні відносини з брендом",
        ],
        scopeNote:
          "Статус: продуктовий концепт. Це дизайн вітрини й каталогу. Назви товарів і ціни — це контент для проєктування макета; я не заявляю живий магазин, продажі чи працюючу інтеграцію оплат або доставки.",
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
        capabilities: ["Витрина и каталог", "Мерчандайзинг бестселлеров", "Структура коллекций", "Двуязычность UA/EN", "Поиск и корзина"],
        tech: ["Ecommerce-витрина", "Структура каталога", "Двуязычный контент"],
        proof: [
          "Витрина, история бренда, ряд бестселлеров с ценами и секция коллекции спроектированы и показаны ниже",
          "Магазин двуязычный по структуре, а не как доработка",
          "Продуктовый концепт: дизайн витрины, а не развёрнутый магазин, которым я оперирую",
        ],
        notClaimed: [
          "Живой или работающий онлайн-магазин",
          "Продажи, заказы или трафик",
          "Интеграция оплат или доставки",
          "Коммерческие отношения с брендом",
        ],
        scopeNote:
          "Статус: продуктовый концепт. Это дизайн витрины и каталога. Названия товаров и цены — это контент для проектирования макета; я не заявляю живой магазин, продажи или работающую интеграцию оплат либо доставки.",
        ctaLabel: "Построить онлайн-магазин как этот",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "web3-interfaces",
    status: "concept",
    category: "web3",
    shots: [
      "/case-studies/web3-interfaces/wallet.webp",
      "/case-studies/web3-interfaces/convex.webp",
      "/case-studies/web3-interfaces/oxhash.webp",
      "/case-studies/web3-interfaces/iko.webp",
    ],
    shotSpan: ["full", "half", "half", "full"],
    captions: {
      en: [
        "Self-custody wallet — swap with network selection, plus explicit transparency and security sections covering open source, audits and data collection",
        "Staking product — deposit for boosted yield, with withdrawal terms and a named security audit stated up front",
        "Layer-2 chain — core features around fees, interoperability and routing, with a builder grant path",
        "Blockchain for business — a B2B site translating the technology into business outcomes",
      ],
      ua: [
        "Гаманець самозберігання — своп із вибором мережі плюс явні секції прозорості й безпеки: відкритий код, аудити, збір даних",
        "Стейкінг-продукт — депозит для підвищеної дохідності з умовами виводу та названим аудитом безпеки на видноті",
        "Layer-2 мережа — ключові можливості навколо комісій, сумісності й маршрутизації зі шляхом для грантів розробникам",
        "Блокчейн для бізнесу — B2B-сайт, що перекладає технологію в бізнес-результати",
      ],
      ru: [
        "Кошелёк самохранения — своп с выбором сети плюс явные секции прозрачности и безопасности: открытый код, аудиты, сбор данных",
        "Стейкинг-продукт — депозит для повышенной доходности с условиями вывода и названным аудитом безопасности на виду",
        "Layer-2 сеть — ключевые возможности вокруг комиссий, совместимости и маршрутизации с путём для грантов разработчикам",
        "Блокчейн для бизнеса — B2B-сайт, переводящий технологию в бизнес-результаты",
      ],
    },
    content: {
      en: {
        name: "Web3 & DeFi Interfaces",
        type: "Web3 product concepts · Wallet, staking, L2 and B2B",
        context:
          "Four product directions across crypto: a self-custody wallet, a staking product, a Layer-2 chain aimed at builders, and a business-facing blockchain site.",
        problem:
          "Crypto products ask for an irreversible action from someone who has every reason to be suspicious. Most lose that person on the first screen — the mechanism is written in jargon, custody and fees are left vague, and there is no answer to the only two questions that matter: who holds my assets, and what happens if this breaks.",
        outcome:
          "Interfaces that earn the connect: each one states the mechanism in plain language, puts custody, fees and audit status where they cannot be missed, and only then asks for an action.",
        built: [
          "A self-custody wallet: swap with source and destination network selection, buy-crypto and add-chain entry points",
          "Explicit transparency and security sections covering open source, regular audits and what data is not collected",
          "A staking product presenting deposits, boosted yields and withdrawal terms, with a named third-party audit",
          "A Layer-2 chain site covering fees, interoperability and routing, plus a grant path for builders",
          "A B2B blockchain site translating the technology into business outcomes",
          "Four consistent visual systems, each matched to its audience",
        ],
        flow: [
          "Land on the product",
          "Understand the mechanism in plain language",
          "Check custody, fees and audits",
          "Review the specific action (swap, stake, build)",
          "Connect or download",
        ],
        capabilities: [
          "Wallet & swap UX",
          "Network / chain selection",
          "Staking & yield presentation",
          "Security & audit framing",
          "Developer grant funnels",
          "B2B Web3 positioning",
        ],
        tech: ["Web3 product design", "DeFi interface patterns", "Marketing site architecture"],
        proof: [
          "Four complete product directions, each with its own audience and visual system — shown below",
          "Custody, fees, audits and data collection are treated as primary interface content, not footnotes",
          "Product concepts: interface and positioning work, not deployed protocols",
        ],
        notClaimed: [
          "Any deployed protocol, chain or smart contract",
          "Total value locked, users or transaction volume",
          "The statistics and partner logos shown in the designs",
          "Security audits performed on my behalf",
          "Custody of anyone's assets",
        ],
        scopeNote:
          "Status: product concepts. This is interface and positioning work for crypto products. The figures, partner logos and audit names inside the designs are placeholder content belonging to those concepts — I do not claim to have deployed a protocol, commissioned an audit, or held anyone's assets.",
        ctaLabel: "Discuss a Web3 or fintech product",
        liveLabel: "View live project",
      },
      ua: {
        name: "Web3 та DeFi інтерфейси",
        type: "Концепти Web3-продуктів · Гаманець, стейкінг, L2 і B2B",
        context:
          "Чотири продуктові напрямки в крипті: гаманець самозберігання, стейкінг-продукт, Layer-2 мережа для розробників і бізнес-орієнтований блокчейн-сайт.",
        problem:
          "Крипто-продукти просять незворотну дію в людини, яка має всі підстави бути недовірливою. Більшість втрачають її на першому екрані: механіка написана жаргоном, зберігання й комісії лишаються нечіткими, і немає відповіді на два єдино важливі питання — хто тримає мої активи і що буде, якщо це зламається.",
        outcome:
          "Інтерфейси, що заслуговують підключення: кожен пояснює механіку простою мовою, ставить зберігання, комісії та статус аудиту туди, де їх неможливо пропустити, і лише потім просить про дію.",
        built: [
          "Гаманець самозберігання: своп із вибором мережі відправлення й отримання, точки входу «купити крипто» та «додати мережу»",
          "Явні секції прозорості й безпеки: відкритий код, регулярні аудити та які дані не збираються",
          "Стейкінг-продукт із депозитами, підвищеною дохідністю та умовами виводу і названим стороннім аудитом",
          "Сайт Layer-2 мережі про комісії, сумісність і маршрутизацію плюс шлях грантів для розробників",
          "B2B блокчейн-сайт, що перекладає технологію в бізнес-результати",
          "Чотири узгоджені візуальні системи, кожна під свою аудиторію",
        ],
        flow: [
          "Потрапити на продукт",
          "Зрозуміти механіку простою мовою",
          "Перевірити зберігання, комісії та аудити",
          "Оцінити конкретну дію (своп, стейк, білд)",
          "Під'єднатись або завантажити",
        ],
        capabilities: [
          "UX гаманця та свопу",
          "Вибір мережі",
          "Подача стейкінгу й дохідності",
          "Подача безпеки й аудиту",
          "Воронки грантів для розробників",
          "B2B-позиціонування Web3",
        ],
        tech: ["Дизайн Web3-продуктів", "Патерни DeFi-інтерфейсів", "Архітектура маркетингового сайту"],
        proof: [
          "Чотири повні продуктові напрямки, кожен зі своєю аудиторією та візуальною системою — показані нижче",
          "Зберігання, комісії, аудити та збір даних подані як основний контент інтерфейсу, а не як виноски",
          "Продуктові концепти: робота над інтерфейсом і позиціонуванням, а не розгорнуті протоколи",
        ],
        notClaimed: [
          "Будь-який розгорнутий протокол, мережа чи смартконтракт",
          "TVL, користувачі чи обсяг транзакцій",
          "Статистика й логотипи партнерів, показані в дизайнах",
          "Аудити безпеки, проведені на моє замовлення",
          "Зберігання чиїхось активів",
        ],
        scopeNote:
          "Статус: продуктові концепти. Це робота над інтерфейсом і позиціонуванням крипто-продуктів. Цифри, логотипи партнерів і назви аудитів усередині дизайнів — це демонстраційний контент цих концептів; я не заявляю, що розгорнув протокол, замовляв аудит чи тримав чиїсь активи.",
        ctaLabel: "Обговорити Web3 або фінтех-продукт",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "Web3 и DeFi интерфейсы",
        type: "Концепты Web3-продуктов · Кошелёк, стейкинг, L2 и B2B",
        context:
          "Четыре продуктовых направления в крипте: кошелёк самохранения, стейкинг-продукт, Layer-2 сеть для разработчиков и бизнес-ориентированный блокчейн-сайт.",
        problem:
          "Крипто-продукты просят необратимое действие у человека, у которого есть все основания быть недоверчивым. Большинство теряют его на первом экране: механика написана жаргоном, хранение и комиссии остаются размытыми, и нет ответа на два единственно важных вопроса — кто держит мои активы и что будет, если это сломается.",
        outcome:
          "Интерфейсы, заслуживающие подключения: каждый объясняет механику простым языком, ставит хранение, комиссии и статус аудита туда, где их невозможно пропустить, и только потом просит о действии.",
        built: [
          "Кошелёк самохранения: своп с выбором сети отправления и получения, точки входа «купить крипто» и «добавить сеть»",
          "Явные секции прозрачности и безопасности: открытый код, регулярные аудиты и какие данные не собираются",
          "Стейкинг-продукт с депозитами, повышенной доходностью и условиями вывода и названным сторонним аудитом",
          "Сайт Layer-2 сети о комиссиях, совместимости и маршрутизации плюс путь грантов для разработчиков",
          "B2B блокчейн-сайт, переводящий технологию в бизнес-результаты",
          "Четыре согласованные визуальные системы, каждая под свою аудиторию",
        ],
        flow: [
          "Попасть на продукт",
          "Понять механику простым языком",
          "Проверить хранение, комиссии и аудиты",
          "Оценить конкретное действие (своп, стейк, билд)",
          "Подключиться или скачать",
        ],
        capabilities: [
          "UX кошелька и свопа",
          "Выбор сети",
          "Подача стейкинга и доходности",
          "Подача безопасности и аудита",
          "Воронки грантов для разработчиков",
          "B2B-позиционирование Web3",
        ],
        tech: ["Дизайн Web3-продуктов", "Паттерны DeFi-интерфейсов", "Архитектура маркетингового сайта"],
        proof: [
          "Четыре полных продуктовых направления, каждое со своей аудиторией и визуальной системой — показаны ниже",
          "Хранение, комиссии, аудиты и сбор данных поданы как основной контент интерфейса, а не как сноски",
          "Продуктовые концепты: работа над интерфейсом и позиционированием, а не развёрнутые протоколы",
        ],
        notClaimed: [
          "Любой развёрнутый протокол, сеть или смартконтракт",
          "TVL, пользователи или объём транзакций",
          "Статистика и логотипы партнёров, показанные в дизайнах",
          "Аудиты безопасности, проведённые по моему заказу",
          "Хранение чьих-либо активов",
        ],
        scopeNote:
          "Статус: продуктовые концепты. Это работа над интерфейсом и позиционированием крипто-продуктов. Цифры, логотипы партнёров и названия аудитов внутри дизайнов — это демонстрационный контент этих концептов; я не заявляю, что развернул протокол, заказывал аудит или держал чьи-либо активы.",
        ctaLabel: "Обсудить Web3 или финтех-продукт",
        liveLabel: "Открыть живой проект",
      },
    },
  },
  {
    slug: "dtc-landings",
    status: "concept",
    category: "ecommerce",
    shots: [
      "/case-studies/dtc-landings/aurea.webp",
      "/case-studies/dtc-landings/kinex.webp",
      "/case-studies/dtc-landings/ovulan.webp",
      "/case-studies/dtc-landings/verna.webp",
      "/case-studies/dtc-landings/pure.webp",
      "/case-studies/dtc-landings/carluxe.webp",
    ],
    shotSpan: ["half", "half", "half", "half", "half", "half"],
    captions: {
      en: [
        "Skincare — product hero, ingredient benefits and a route into the range",
        "Wearables — device hero, feature breakdown and an in-use section",
        "Watches — luxury positioning, warranty and craftsmanship, and the collection grid",
        "Coffee — bestseller range with roast variants and a brand story",
        "Electric mobility — product introduction, model comparison and the collection",
        "Car detailing — service tiers presented as packages",
      ],
      ua: [
        "Догляд за шкірою — герой продукту, переваги складу та шлях до лінійки",
        "Носимі пристрої — герой девайса, розбір функцій і секція використання",
        "Годинники — преміальне позиціонування, гарантія й майстерність, сітка колекції",
        "Кава — лінійка бестселерів із варіантами обсмажування та історія бренду",
        "Електротранспорт — представлення продукту, порівняння моделей і колекція",
        "Детейлінг авто — рівні послуг, подані як пакети",
      ],
      ru: [
        "Уход за кожей — герой продукта, преимущества состава и путь к линейке",
        "Носимые устройства — герой девайса, разбор функций и секция использования",
        "Часы — премиальное позиционирование, гарантия и мастерство, сетка коллекции",
        "Кофе — линейка бестселлеров с вариантами обжарки и история бренда",
        "Электротранспорт — представление продукта, сравнение моделей и коллекция",
        "Детейлинг авто — уровни услуг, поданные как пакеты",
      ],
    },
    content: {
      en: {
        name: "DTC Product Landings",
        type: "UI/UX concepts · Six consumer brands",
        context:
          "A set of conversion landing pages for physical consumer products across six categories: skincare, wearables, luxury watches, coffee, electric mobility and car detailing.",
        problem:
          "Most product pages describe the product and forget the decision. The visitor scrolls past beautiful photography, learns nothing they can act on, never reaches a price, and leaves — so paid traffic is spent on a page that was never built to close.",
        outcome:
          "A repeatable landing structure that carries a buyer from what it is to why it is better to what it costs — reused across very different categories without rebuilding it each time.",
        built: [
          "Six conversion landings, each with a product hero and a single primary action",
          "Benefit breakdowns that translate specification into a reason to buy",
          "Range and bestseller grids with pricing",
          "In-use and lifestyle sections placed after the argument, not instead of it",
          "Category-appropriate visual systems, from clinical skincare to luxury watches",
          "A structure reused across six categories to prove it travels",
        ],
        flow: ["Arrive from an ad or search", "Understand the product", "See why it is better", "Compare the range", "See the price", "Buy or enquire"],
        capabilities: [
          "Conversion landing structure",
          "Product merchandising",
          "Benefit and specification design",
          "Range presentation",
          "Brand-led art direction",
          "Reusable design system",
        ],
        tech: ["Landing page design", "Conversion structure", "Design systems"],
        proof: [
          "Six complete landings across six unrelated categories, shown below",
          "The same conversion skeleton carries brands as different as a face oil and a Layer-2 of luxury watches",
          "UI/UX concepts: page design and conversion structure, not deployed stores",
        ],
        notClaimed: [
          "That these are live or trading sites",
          "The customer counts, ratings and review numbers printed inside the designs",
          "Sales, conversion rates or traffic",
          "Relationships with the brands shown",
          "Any product partnership referenced in the artwork",
        ],
        scopeNote:
          "Status: UI/UX concepts. These are landing page designs. Trust figures visible inside the artwork — customer counts, star ratings, review totals, founding years and any brand collaboration shown — are placeholder content belonging to the concept, not verified claims and not results I produced.",
        ctaLabel: "Get a landing page that converts",
        liveLabel: "View live project",
      },
      ua: {
        name: "DTC-лендинги продуктів",
        type: "UI/UX концепти · Шість споживчих брендів",
        context:
          "Набір конверсійних лендингів для фізичних споживчих продуктів у шести категоріях: догляд за шкірою, носимі пристрої, преміальні годинники, кава, електротранспорт і детейлінг авто.",
        problem:
          "Більшість сторінок продукту описують товар і забувають про рішення. Відвідувач гортає гарну зйомку, не дізнається нічого, на що можна діяти, не доходить до ціни й іде — тож платний трафік витрачається на сторінку, яку ніколи не будували, щоб закривати.",
        outcome:
          "Повторювана структура лендингу, що веде покупця від «що це» до «чому це краще» і до «скільки це коштує» — і перевикористовується в дуже різних категоріях без переробки щоразу.",
        built: [
          "Шість конверсійних лендингів, кожен із героєм продукту та однією головною дією",
          "Розбори переваг, що перекладають характеристики в причину купити",
          "Сітки лінійки та бестселерів із цінами",
          "Секції використання й лайфстайл після аргументу, а не замість нього",
          "Візуальні системи під категорію — від клінічного догляду до преміальних годинників",
          "Структура, перевикористана в шести категоріях, щоб довести, що вона працює скрізь",
        ],
        flow: ["Прийти з реклами чи пошуку", "Зрозуміти продукт", "Побачити, чому він кращий", "Порівняти лінійку", "Побачити ціну", "Купити або залишити запит"],
        capabilities: [
          "Структура конверсійного лендингу",
          "Мерчандайзинг продукту",
          "Дизайн переваг і характеристик",
          "Презентація лінійки",
          "Арт-дирекшн під бренд",
          "Перевикористовувана дизайн-система",
        ],
        tech: ["Дизайн лендингів", "Конверсійна структура", "Дизайн-системи"],
        proof: [
          "Шість повних лендингів у шести непов'язаних категоріях — показані нижче",
          "Той самий конверсійний каркас витримує бренди настільки різні, як олія для обличчя й преміальні годинники",
          "UI/UX концепти: дизайн сторінок і конверсійна структура, а не розгорнуті магазини",
        ],
        notClaimed: [
          "Що це живі або працюючі сайти",
          "Кількість клієнтів, рейтинги та число відгуків, надруковані всередині дизайнів",
          "Продажі, конверсія чи трафік",
          "Відносини з показаними брендами",
          "Будь-яка продуктова колаборація, згадана в макеті",
        ],
        scopeNote:
          "Статус: UI/UX концепти. Це дизайн лендингів. Показники довіри всередині макетів — кількість клієнтів, зірковий рейтинг, число відгуків, рік заснування та будь-яка показана колаборація — це демонстраційний контент концепту, а не підтверджені твердження й не результати, які я створив.",
        ctaLabel: "Отримати лендинг, що конвертує",
        liveLabel: "Переглянути живий проєкт",
      },
      ru: {
        name: "DTC-лендинги продуктов",
        type: "UI/UX концепты · Шесть потребительских брендов",
        context:
          "Набор конверсионных лендингов для физических потребительских продуктов в шести категориях: уход за кожей, носимые устройства, премиальные часы, кофе, электротранспорт и детейлинг авто.",
        problem:
          "Большинство страниц продукта описывают товар и забывают о решении. Посетитель листает красивую съёмку, не узнаёт ничего, на что можно действовать, не доходит до цены и уходит — поэтому платный трафик тратится на страницу, которую никогда не строили, чтобы закрывать.",
        outcome:
          "Повторяемая структура лендинга, ведущая покупателя от «что это» к «почему это лучше» и к «сколько это стоит» — и переиспользуемая в очень разных категориях без переделки каждый раз.",
        built: [
          "Шесть конверсионных лендингов, каждый с героем продукта и одним главным действием",
          "Разборы преимуществ, переводящие характеристики в причину купить",
          "Сетки линейки и бестселлеров с ценами",
          "Секции использования и лайфстайл после аргумента, а не вместо него",
          "Визуальные системы под категорию — от клинического ухода до премиальных часов",
          "Структура, переиспользованная в шести категориях, чтобы доказать, что она работает везде",
        ],
        flow: ["Прийти из рекламы или поиска", "Понять продукт", "Увидеть, почему он лучше", "Сравнить линейку", "Увидеть цену", "Купить или оставить запрос"],
        capabilities: [
          "Структура конверсионного лендинга",
          "Мерчандайзинг продукта",
          "Дизайн преимуществ и характеристик",
          "Презентация линейки",
          "Арт-дирекшн под бренд",
          "Переиспользуемая дизайн-система",
        ],
        tech: ["Дизайн лендингов", "Конверсионная структура", "Дизайн-системы"],
        proof: [
          "Шесть полных лендингов в шести несвязанных категориях — показаны ниже",
          "Тот же конверсионный каркас выдерживает бренды настолько разные, как масло для лица и премиальные часы",
          "UI/UX концепты: дизайн страниц и конверсионная структура, а не развёрнутые магазины",
        ],
        notClaimed: [
          "Что это живые или работающие сайты",
          "Количество клиентов, рейтинги и число отзывов, напечатанные внутри дизайнов",
          "Продажи, конверсия или трафик",
          "Отношения с показанными брендами",
          "Любая продуктовая коллаборация, упомянутая в макете",
        ],
        scopeNote:
          "Статус: UI/UX концепты. Это дизайн лендингов. Показатели доверия внутри макетов — количество клиентов, звёздный рейтинг, число отзывов, год основания и любая показанная коллаборация — это демонстрационный контент концепта, а не подтверждённые утверждения и не результаты, которые я создал.",
        ctaLabel: "Получить лендинг, который конвертирует",
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
    shots: ["/case-studies/turbotaai/landing.webp", "/case-studies/turbotaai/pricing.webp"],
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
        captions: ["TurbotaAI — landing", "Pricing & access"],
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
        captions: ["TurbotaAI — головна сторінка", "Тарифи й доступ"],
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
        captions: ["TurbotaAI — главная страница", "Тарифы и доступ"],
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
