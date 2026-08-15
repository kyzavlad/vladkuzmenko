import type { Lang } from "@/lib/i18n";

/**
 * Ecosystem information architecture (EN / UA / RU).
 *
 * The site covers four directions. Client Growth Systems is the primary
 * commercial offer; everything else is presented at its real stage.
 *
 * Copy rules: no invented metrics, revenue, users, scarcity, inventory,
 * prices, certifications or customer results. A concept is called a concept.
 */

export type DirectionKey = "systems" | "products" | "warriors" | "drop";

export const DIRECTION_ORDER: DirectionKey[] = ["systems", "products", "warriors", "drop"];

/** Homepage anchors — one per direction, used by the navigator and the header. */
export const DIRECTION_ANCHOR: Record<DirectionKey, string> = {
  systems: "client-systems",
  products: "products",
  warriors: "warriors",
  drop: "drop",
};

/** Dedicated page per direction (localised at render time). */
export const DIRECTION_ROUTE: Record<DirectionKey, string> = {
  systems: "growth-systems",
  products: "products",
  warriors: "warriors-team",
  drop: "drop",
};

/** Prelaunch research interest. Frontend-only intent; the n8n contract is unchanged. */
export const DROP_INTENT = "drop_interest";

export type Tile = {
  name: string;
  /** One line: what this direction is for, in business language. */
  purpose: string;
  /** Honest current stage. */
  stage: string;
  /** 2–4 concrete capabilities or products that already exist. */
  examples: string[];
};

export type ProductItem = {
  key: string;
  name: string;
  tagline: string;
  problem: string;
  whoFor: string;
  status: string;
  slug: string;
};

export type EcosystemCopy = {
  navigator: {
    eyebrow: string;
    title: string;
    desc: string;
    stageLabel: string;
    jumpLabel: string;
    pageLabel: string;
    tiles: Record<DirectionKey, Tile>;
  };
  products: {
    metaTitle: string;
    metaDesc: string;
    eyebrow: string;
    title: string;
    desc: string;
    labels: { problem: string; whoFor: string; status: string };
    items: ProductItem[];
    open: string;
    allCta: string;
    note: string;
    heroLead: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
  warriors: {
    eyebrow: string;
    title: string;
    desc: string;
    whoForLabel: string;
    whoFor: string;
    principlesLabel: string;
    principles: string[];
    accessLabel: string;
    access: string;
    cta: string;
    open: string;
  };
  drop: {
    metaTitle: string;
    metaDesc: string;
    eyebrow: string;
    stageBadge: string;
    title: string;
    lead: string;
    concept: {
      label: string;
      name: string;
      what: string;
      whoFor: string;
      whyNow: string;
      researchingLabel: string;
      researching: string[];
      unknownLabel: string;
      unknown: string;
    };
    secondary: { title: string; desc: string; items: string[] };
    cta: string;
    dialogTitle: string;
    dialogDesc: string;
    helpLabel: string;
    helpPlaceholder: string;
    successTitle: string;
    successMessage: string;
    disclaimer: string;
    homeTitle: string;
    homeDesc: string;
    open: string;
  };
  social: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    desc: string;
    channels: { youtube: string; instagram: string; tiktok: string; x: string; telegram: string };
  };
};

const en: EcosystemCopy = {
  navigator: {
    eyebrow: "The ecosystem",
    title: "Four directions, one operating standard",
    desc: "Client work is the main commercial direction. Alongside it: my own products, Warriors Team and new consumer projects — each shown at the stage it is actually at.",
    stageLabel: "Stage",
    jumpLabel: "See on this page",
    pageLabel: "Open full page",
    tiles: {
      systems: {
        name: "Client Growth Systems",
        purpose: "Get qualified attention, and turn it into leads, bookings and deals.",
        stage: "Main direction · open to new projects",
        examples: ["Traffic Engine", "Conversion Engine", "Growth Engine", "Bottleneck diagnostic"],
      },
      products: {
        name: "Products & Software",
        purpose: "Owned digital products built from the same systems I run for clients.",
        stage: "Early access",
        examples: ["VisibilityOS — website audit", "AI Systems for Business"],
      },
      warriors: {
        name: "Warriors Team",
        purpose: "A private circle for people already building — standards, not motivation.",
        stage: "By application",
        examples: ["Business & execution", "Training & discipline", "Direct feedback"],
      },
      drop: {
        name: "Vlad Kuzmenko Drop",
        purpose: "Consumer products: validate the demand first, build second.",
        stage: "Concept · validating demand",
        examples: ["Performance meal kits — concept", "Training essentials — later"],
      },
    },
  },
  products: {
    metaTitle: "Products & Software — VisibilityOS & AI Systems for Business | Vlad Kuzmenko",
    metaDesc:
      "Owned digital products by Vlad Kuzmenko: VisibilityOS, an AI-assisted website visibility and conversion audit, and AI Systems for Business, a practical product for building lead, follow-up and content systems in-house.",
    eyebrow: "Products & software",
    title: "Owned products, not client projects",
    desc: "These are my own products. Client builds live in Work — they are not sold here.",
    labels: { problem: "What it solves", whoFor: "Who it is for", status: "Availability" },
    items: [
      {
        key: "visibilityos",
        name: "VisibilityOS",
        tagline: "See where a website loses leads, trust and visibility — and what to fix first.",
        problem:
          "A site gets visitors but few enquiries, and nobody can say which part of the page is responsible.",
        whoFor: "Any business whose website should be producing more enquiries than it does.",
        status: "Early access · audits are AI-assisted and reviewed personally",
        slug: "visibilityos",
      },
      {
        key: "ai-systems",
        name: "AI Systems for Business",
        tagline: "Turn manual business work into simple AI-assisted systems you run yourself.",
        problem:
          "Leads, follow-up and content depend on someone remembering, so things slip and nothing is tracked.",
        whoFor: "Founders, operators, freelancers and agency owners who want the system in-house.",
        status: "Early access · waitlist open, nothing charged at this stage",
        slug: "ai-systems",
      },
    ],
    open: "Open product",
    allCta: "Not sure which one fits? Describe the situation",
    note: "Both products are in early access. At this stage nothing is charged here.",
    heroLead:
      "Two products so far. Both came out of client work, both are in early access, and both are described here at the stage they are actually at.",
    faqTitle: "Questions",
    faq: [
      {
        q: "Are these finished products?",
        a: "No. Both are in early access. VisibilityOS audits are AI-assisted and reviewed personally; AI Systems for Business is open as a waitlist, and nothing is charged at this stage.",
      },
      {
        q: "How is this different from client work?",
        a: "Client work is built for one business and lives in Work. These are my own products, available to anyone who fits them.",
      },
      {
        q: "Will there be more products?",
        a: "Only when something is genuinely built and used. Nothing is listed here as a placeholder.",
      },
    ],
  },
  warriors: {
    eyebrow: "Private circle",
    title: "Warriors Team",
    desc: "A private circle around business, training, discipline, cars, content and execution. Real people building real things, holding each other to a higher bar.",
    whoForLabel: "Who it is for",
    whoFor:
      "People already building — a business, content or a skill — who want a sharper circle and higher standards around them.",
    principlesLabel: "What it runs on",
    principles: [
      "You contribute, you do not just consume",
      "Standards over motivation",
      "Honest feedback, including when it is inconvenient",
      "Execution is the only proof",
    ],
    accessLabel: "Access",
    access:
      "By application. Every application is read personally; if the format suits, we talk on a call and decide together. No public price — first we work out whether it suits both sides.",
    cta: "Apply to join",
    open: "Learn more",
  },
  drop: {
    metaTitle: "Vlad Kuzmenko Drop — Consumer Product Research | Vlad Kuzmenko",
    metaDesc:
      "A consumer-product lab, not a shop. The current concept under research is a performance meal system for active people. Nothing is for sale yet — this page exists to validate demand before anything is built.",
    eyebrow: "Consumer product lab",
    stageBadge: "Concept · research",
    title: "Validate the demand first, build the product second",
    lead: "No stock, no prices, no launch date. One concept at a time, worked through in the open — and it only becomes a product if the research holds up.",
    concept: {
      label: "Current concept under research",
      name: "Performance meal system",
      what: "Ready-to-eat meals organised as a weekly or daily system, for people who train and want structured food without cooking or deciding every day.",
      whoFor:
        "People who train regularly, work long hours, and currently solve food with whatever is fastest.",
      whyNow:
        "A problem I understand from the inside, and the one people around me actually ask about.",
      researchingLabel: "What is being researched",
      researching: [
        "Who exactly this is for, and where they live",
        "Whether a kitchen partner can produce it to a consistent standard",
        "What food-safety, labelling and allergen requirements apply",
        "Packaging, cold chain and how food would actually reach someone",
        "Weekly system versus one-off order",
        "Whether the unit economics work at a realistic pilot volume",
      ],
      unknownLabel: "Not decided yet",
      unknown:
        "Menu, macros, price, delivery area, production partner, packaging, shelf life and timing are all open. Nothing on this page should be read as a promise about any of them.",
    },
    secondary: {
      title: "Other ideas, further out",
      desc: "Mentioned so the direction is honest — not in production, not being researched yet.",
      items: ["Training essentials", "Execution planner"],
    },
    cta: "Join the research",
    dialogTitle: "Join the Drop research",
    dialogDesc:
      "This is research, not a pre-order. Tell me how you currently handle food on training days and what would have to be true for a system like this to be worth it. Nothing is charged and nothing is shipped.",
    helpLabel: "How you handle food now, and what would make this worth it",
    helpPlaceholder: "How you eat on training days, what you would change, what would stop you",
    successTitle: "You are on the list",
    successMessage:
      "Thanks — this goes straight to me. You will hear from me when there is something real to show, not before.",
    disclaimer:
      "Nothing on this page is for sale. No prices, no stock, no delivery, no launch date. If this becomes a product, it will be because the research supported it.",
    homeTitle: "Validate the demand first, build the product second",
    homeDesc:
      "Drop is a lab, not a shop. The current concept is a performance meal system for people who train — at the research stage, with nothing for sale.",
    open: "See the research",
  },
  social: {
    eyebrow: "Personal",
    titleA: "Life ",
    titleB: "outside work",
    desc: "Everyday life, training, cars, thoughts, projects and what happens off camera.",
    channels: {
      youtube: "Long-form video: ideas, projects and what happens off camera.",
      instagram: "Everyday life, training, cars.",
      tiktok: "Short videos and the moments worth keeping.",
      x: "Short thoughts and observations.",
      telegram: "Personal updates and things that do not fit the other channels.",
    },
  },
};

const ua: EcosystemCopy = {
  navigator: {
    eyebrow: "Екосистема",
    title: "Чотири напрями, один стандарт роботи",
    desc: "Робота з клієнтами — основний комерційний напрям. Поряд розвиваються власні продукти, Warriors Team і нові споживчі проєкти — кожен на своїй реальній стадії.",
    stageLabel: "Стадія",
    jumpLabel: "Подивитись на цій сторінці",
    pageLabel: "Відкрити повну сторінку",
    tiles: {
      systems: {
        name: "Client Growth Systems",
        purpose: "Отримати якісну увагу і перетворити її на звернення, зустрічі та угоди.",
        stage: "Основний напрям · відкритий до нових проєктів",
        examples: ["Traffic Engine", "Conversion Engine", "Growth Engine", "Діагностика вузького місця"],
      },
      products: {
        name: "Продукти та софт",
        purpose: "Власні цифрові продукти, зібрані з тих самих систем, які я роблю клієнтам.",
        stage: "Ранній доступ",
        examples: ["VisibilityOS — аудит сайту", "AI-системи для бізнесу"],
      },
      warriors: {
        name: "Warriors Team",
        purpose: "Приватне коло для тих, хто вже будує: стандарти, а не мотивація.",
        stage: "За заявкою",
        examples: ["Бізнес і виконання", "Тренування й дисципліна", "Прямий фідбек"],
      },
      drop: {
        name: "Vlad Kuzmenko Drop",
        purpose: "Споживчі продукти: спочатку перевіряємо попит, потім створюємо.",
        stage: "Концепт · перевіряємо попит",
        examples: ["Система харчування — концепт", "Тренувальні базові речі — пізніше"],
      },
    },
  },
  products: {
    metaTitle: "Продукти та софт — VisibilityOS і AI-системи для бізнесу | Vlad Kuzmenko",
    metaDesc:
      "Власні цифрові продукти Влада Кузьменка: VisibilityOS — AI-аудит видимості та конверсії сайту, і AI-системи для бізнесу — практичний продукт, щоб зібрати системи лідів, фолоу-апу й контенту всередині команди.",
    eyebrow: "Продукти та софт",
    title: "Власні продукти, а не клієнтські проєкти",
    desc: "Це мої власні продукти. Клієнтські роботи живуть у розділі «Роботи» — вони тут не продаються.",
    labels: { problem: "Яку задачу вирішує", whoFor: "Для кого", status: "Доступність" },
    items: [
      {
        key: "visibilityos",
        name: "VisibilityOS",
        tagline: "Побачити, де сайт втрачає лідів, довіру й видимість — і що виправляти першим.",
        problem:
          "На сайт заходять люди, але звернень мало, і ніхто не може сказати, яка саме частина сторінки за це відповідає.",
        whoFor: "Будь-який бізнес, чий сайт має приносити більше звернень, ніж приносить.",
        status: "Ранній доступ · аудит робиться з AI та переглядається особисто",
        slug: "visibilityos",
      },
      {
        key: "ai-systems",
        name: "AI-системи для бізнесу",
        tagline: "Перетворити ручну роботу на прості AI-системи, якими керуєте самі.",
        problem:
          "Ліди, фолоу-ап і контент тримаються на тому, що хтось згадає — тому щось губиться, а трекінгу немає.",
        whoFor: "Засновники, оператори, фрілансери та власники агенцій, яким потрібна система всередині.",
        status: "Ранній доступ · лист очікування відкритий, на цьому етапі оплати немає",
        slug: "ai-systems",
      },
    ],
    open: "Відкрити продукт",
    allCta: "Не впевнені, що підходить? Опишіть ситуацію",
    note: "Обидва продукти в ранньому доступі. На цьому етапі оплата тут не приймається.",
    heroLead:
      "Поки що два продукти. Обидва виросли з клієнтської роботи, обидва в ранньому доступі, і обидва описані тут на реальній стадії.",
    faqTitle: "Питання",
    faq: [
      {
        q: "Це завершені продукти?",
        a: "Ні. Обидва в ранньому доступі. Аудити VisibilityOS робляться за допомогою AI і переглядаються особисто; AI-системи для бізнесу відкриті як лист очікування, і на цьому етапі оплати немає.",
      },
      {
        q: "Чим це відрізняється від клієнтської роботи?",
        a: "Клієнтська робота будується під один бізнес і живе в розділі «Роботи». Це мої власні продукти, доступні кожному, кому вони підходять.",
      },
      {
        q: "Чи будуть інші продукти?",
        a: "Тільки коли щось справді побудовано й використовується. Нічого не додається сюди як заглушка.",
      },
    ],
  },
  warriors: {
    eyebrow: "Приватне коло",
    title: "Warriors Team",
    desc: "Приватне коло навколо бізнесу, тренувань, дисципліни, авто, контенту та виконання. Реальні люди, які будують реальні речі й тримають одне одного на вищій планці.",
    whoForLabel: "Для кого",
    whoFor:
      "Для тих, хто вже будує — бізнес, контент чи навичку — і хоче гостріше коло та вищі стандарти навколо себе.",
    principlesLabel: "На чому тримається",
    principles: [
      "Ви вкладаєте, а не лише споживаєте",
      "Стандарти замість мотивації",
      "Чесний фідбек, навіть коли він незручний",
      "Єдиний доказ — виконання",
    ],
    accessLabel: "Доступ",
    access:
      "За заявкою. Кожну заявку читаю особисто; якщо формат підходить — созвон і вирішуємо разом. Публічної ціни немає: спочатку розуміємо, чи підходимо одне одному.",
    cta: "Подати заявку",
    open: "Дізнатися більше",
  },
  drop: {
    metaTitle: "Vlad Kuzmenko Drop — дослідження споживчих продуктів | Vlad Kuzmenko",
    metaDesc:
      "Лабораторія споживчих продуктів, а не магазин. Поточний концепт у дослідженні — система харчування для активних людей. Нічого не продається: сторінка існує, щоб перевірити попит до того, як щось буде зроблено.",
    eyebrow: "Лабораторія споживчих продуктів",
    stageBadge: "Концепт · дослідження",
    title: "Спочатку перевіряємо попит, потім створюємо продукт",
    lead: "Ні складу, ні цін, ні дати запуску. Один концепт за раз: вивчаємо задачу відкрито, і продукт зʼявляється лише тоді, коли це підтвердилось.",
    concept: {
      label: "Поточний концепт у дослідженні",
      name: "Система готового харчування",
      what: "Готова їжа, зібрана як тижнева або денна система — для тих, хто тренується і хоче структуроване харчування без готування й щоденного вибору.",
      whoFor:
        "Люди, які регулярно тренуються, багато працюють і зараз закривають питання їжі тим, що швидше.",
      whyNow:
        "Задача, яку я розумію зсередини і про яку найчастіше питають довкола.",
      researchingLabel: "Що саме досліджую",
      researching: [
        "Хто саме цільова людина і де вона живе",
        "Чи може кухня-партнер робити це стабільно за якістю",
        "Які вимоги до безпечності харчових продуктів, маркування й алергенів",
        "Пакування, холодовий ланцюг і як їжа реально доїжджає до людини",
        "Тижнева система проти разового замовлення",
        "Чи сходиться економіка на реалістичному пілотному обсязі",
      ],
      unknownLabel: "Ще не вирішено",
      unknown:
        "Меню, БЖУ, ціна, зона доставки, виробничий партнер, пакування, термін придатності й терміни запуску — усе відкрите. Нічого на цій сторінці не варто читати як обіцянку про них.",
    },
    secondary: {
      title: "Інші ідеї, на потім",
      desc: "Згадані, щоб напрям був чесним — не у виробництві й поки навіть не в дослідженні.",
      items: ["Тренувальні базові речі", "Планер виконання"],
    },
    cta: "Долучитися до дослідження",
    dialogTitle: "Долучитися до дослідження Drop",
    dialogDesc:
      "Це дослідження, а не передзамовлення. Напишіть, як зараз вирішуєте питання їжі в тренувальні дні і що має бути правдою, щоб така система була вартою уваги. Оплати немає, доставки теж.",
    helpLabel: "Як ви харчуєтесь зараз і що зробило б це вартим уваги",
    helpPlaceholder: "Як їсте в тренувальні дні, що змінили б, що зупинило б вас",
    successTitle: "Ви у списку",
    successMessage:
      "Дякую — це йде напряму до мене. Напишу, коли буде що показати по-справжньому, не раніше.",
    disclaimer:
      "Ніщо на цій сторінці не продається. Без цін, без складу, без доставки, без дати запуску. Якщо це стане продуктом — то тому, що дослідження це підтвердило.",
    homeTitle: "Спочатку перевіряємо попит, потім створюємо продукт",
    homeDesc:
      "Drop — це лабораторія, а не магазин. Поточний концепт — система харчування для тих, хто тренується. Поки триває дослідження, нічого не продається.",
    open: "Подивитись дослідження",
  },
  social: {
    eyebrow: "Особисте",
    titleA: "Життя ",
    titleB: "поза роботою",
    desc: "Повсякденне життя, тренування, авто, думки, проєкти і те, що відбувається за кадром.",
    channels: {
      youtube: "Довгі відео: ідеї, проєкти й те, що відбувається за кадром.",
      instagram: "Повсякденне життя, тренування, авто.",
      tiktok: "Короткі відео й сильні моменти.",
      x: "Короткі думки й спостереження.",
      telegram: "Особисті апдейти й те, що не потрапляє в інші канали.",
    },
  },
};

const ru: EcosystemCopy = {
  navigator: {
    eyebrow: "Экосистема",
    title: "Четыре направления, один стандарт работы",
    desc: "Работа с клиентами — основное коммерческое направление. Рядом развиваются собственные продукты, Warriors Team и новые потребительские проекты — каждый на своей реальной стадии.",
    stageLabel: "Стадия",
    jumpLabel: "Посмотреть на этой странице",
    pageLabel: "Открыть полную страницу",
    tiles: {
      systems: {
        name: "Client Growth Systems",
        purpose: "Получить качественное внимание и превратить его в обращения, встречи и сделки.",
        stage: "Основное направление · открыт к новым проектам",
        examples: ["Traffic Engine", "Conversion Engine", "Growth Engine", "Диагностика узкого места"],
      },
      products: {
        name: "Продукты и софт",
        purpose: "Собственные цифровые продукты, собранные из тех же систем, которые я делаю клиентам.",
        stage: "Ранний доступ",
        examples: ["VisibilityOS — аудит сайта", "AI-системы для бизнеса"],
      },
      warriors: {
        name: "Warriors Team",
        purpose: "Приватный круг для тех, кто уже строит: стандарты, а не мотивация.",
        stage: "По заявке",
        examples: ["Бизнес и исполнение", "Тренировки и дисциплина", "Прямой фидбек"],
      },
      drop: {
        name: "Vlad Kuzmenko Drop",
        purpose: "Потребительские продукты: сначала проверяем спрос, потом создаём.",
        stage: "Концепт · проверяем спрос",
        examples: ["Система питания — концепт", "Тренировочные базовые вещи — позже"],
      },
    },
  },
  products: {
    metaTitle: "Продукты и софт — VisibilityOS и AI-системы для бизнеса | Vlad Kuzmenko",
    metaDesc:
      "Собственные цифровые продукты Влада Кузьменко: VisibilityOS — AI-аудит видимости и конверсии сайта, и AI-системы для бизнеса — практичный продукт, чтобы собрать системы лидов, фоллоу-апа и контента внутри команды.",
    eyebrow: "Продукты и софт",
    title: "Собственные продукты, а не клиентские проекты",
    desc: "Это мои собственные продукты. Клиентские работы живут в разделе «Работы» — они здесь не продаются.",
    labels: { problem: "Какую задачу решает", whoFor: "Для кого", status: "Доступность" },
    items: [
      {
        key: "visibilityos",
        name: "VisibilityOS",
        tagline: "Увидеть, где сайт теряет лидов, доверие и видимость — и что чинить первым.",
        problem:
          "На сайт заходят люди, но обращений мало, и никто не может сказать, какая именно часть страницы за это отвечает.",
        whoFor: "Любой бизнес, чей сайт должен приносить больше обращений, чем приносит.",
        status: "Ранний доступ · аудит делается с AI и просматривается лично",
        slug: "visibilityos",
      },
      {
        key: "ai-systems",
        name: "AI-системы для бизнеса",
        tagline: "Превратить ручную работу в простые AI-системы, которыми управляете сами.",
        problem:
          "Лиды, фоллоу-ап и контент держатся на том, что кто-то вспомнит — поэтому что-то теряется, а трекинга нет.",
        whoFor: "Основатели, операторы, фрилансеры и владельцы агентств, которым нужна система внутри.",
        status: "Ранний доступ · лист ожидания открыт, на этом этапе оплаты нет",
        slug: "ai-systems",
      },
    ],
    open: "Открыть продукт",
    allCta: "Не уверены, что подходит? Опишите ситуацию",
    note: "Оба продукта находятся в раннем доступе. На текущем этапе оплата здесь не принимается.",
    heroLead:
      "Пока два продукта. Оба выросли из клиентской работы, оба в раннем доступе, и оба описаны здесь на реальной стадии.",
    faqTitle: "Вопросы",
    faq: [
      {
        q: "Это законченные продукты?",
        a: "Нет. Оба в раннем доступе. Аудиты VisibilityOS делаются с помощью AI и просматриваются лично; AI-системы для бизнеса открыты как лист ожидания, и на этом этапе оплаты нет.",
      },
      {
        q: "Чем это отличается от клиентской работы?",
        a: "Клиентская работа строится под один бизнес и живёт в разделе «Работы». Это мои собственные продукты, доступные всем, кому они подходят.",
      },
      {
        q: "Будут ли другие продукты?",
        a: "Только когда что-то действительно построено и используется. Ничего не добавляется сюда как заглушка.",
      },
    ],
  },
  warriors: {
    eyebrow: "Приватный круг",
    title: "Warriors Team",
    desc: "Приватный круг вокруг бизнеса, тренировок, дисциплины, авто, контента и исполнения. Реальные люди, которые строят реальные вещи и держат друг друга на высокой планке.",
    whoForLabel: "Для кого",
    whoFor:
      "Для тех, кто уже строит — бизнес, контент или навык — и хочет более острый круг и высокие стандарты вокруг себя.",
    principlesLabel: "На чём держится",
    principles: [
      "Вы вкладываете, а не только потребляете",
      "Стандарты вместо мотивации",
      "Честный фидбек, даже когда он неудобный",
      "Единственное доказательство — исполнение",
    ],
    accessLabel: "Доступ",
    access:
      "По заявке. Каждую заявку читаю лично; если формат подходит — созваниваемся и решаем вместе. Публичной цены нет: сначала понимаем, подходим ли друг другу.",
    cta: "Подать заявку",
    open: "Узнать больше",
  },
  drop: {
    metaTitle: "Vlad Kuzmenko Drop — исследование потребительских продуктов | Vlad Kuzmenko",
    metaDesc:
      "Лаборатория потребительских продуктов, а не магазин. Текущий концепт в исследовании — система питания для активных людей. Ничего не продаётся: страница существует, чтобы проверить спрос до того, как что-то будет сделано.",
    eyebrow: "Лаборатория потребительских продуктов",
    stageBadge: "Концепт · исследование",
    title: "Сначала проверяем спрос, потом создаём продукт",
    lead: "Ни склада, ни цен, ни даты запуска. Один концепт за раз: изучаем задачу открыто, и продукт появляется только если это подтвердилось.",
    concept: {
      label: "Текущий концепт в исследовании",
      name: "Система готового питания",
      what: "Готовая еда, собранная как недельная или дневная система — для тех, кто тренируется и хочет структурированное питание без готовки и ежедневного выбора.",
      whoFor:
        "Люди, которые регулярно тренируются, много работают и сейчас закрывают вопрос еды тем, что быстрее.",
      whyNow:
        "Задача, которую я понимаю изнутри, и о которой чаще всего спрашивают вокруг.",
      researchingLabel: "Что именно исследую",
      researching: [
        "Кто именно целевой человек и где он живёт",
        "Может ли кухня-партнёр делать это стабильно по качеству",
        "Какие требования по безопасности пищевых продуктов, маркировке и аллергенам",
        "Упаковка, холодовая цепь и как еда реально доезжает до человека",
        "Недельная система против разового заказа",
        "Сходится ли экономика на реалистичном пилотном объёме",
      ],
      unknownLabel: "Ещё не решено",
      unknown:
        "Меню, БЖУ, цена, зона доставки, производственный партнёр, упаковка, срок годности и сроки запуска — всё открыто. Ничего на этой странице не стоит читать как обещание про них.",
    },
    secondary: {
      title: "Другие идеи, на потом",
      desc: "Упомянуты, чтобы направление было честным — не в производстве и пока даже не в исследовании.",
      items: ["Тренировочные базовые вещи", "Планер исполнения"],
    },
    cta: "Присоединиться к исследованию",
    dialogTitle: "Присоединиться к исследованию Drop",
    dialogDesc:
      "Это исследование, а не предзаказ. Напишите, как сейчас решаете вопрос еды в тренировочные дни и что должно быть правдой, чтобы такая система была нужна. Оплаты нет, доставки тоже.",
    helpLabel: "Как вы питаетесь сейчас и что сделало бы это нужным",
    helpPlaceholder: "Как едите в тренировочные дни, что бы изменили, что бы вас остановило",
    successTitle: "Вы в списке",
    successMessage:
      "Спасибо — это идёт напрямую мне. Напишу, когда будет что показать по-настоящему, не раньше.",
    disclaimer:
      "Ничто на этой странице не продаётся. Без цен, без склада, без доставки, без даты запуска. Если это станет продуктом — то потому, что исследование это подтвердило.",
    homeTitle: "Сначала проверяем спрос, потом создаём продукт",
    homeDesc:
      "Drop — это лаборатория, а не магазин. Текущий концепт — система питания для тех, кто тренируется. Пока идёт исследование, ничего не продаётся.",
    open: "Посмотреть исследование",
  },
  social: {
    eyebrow: "Личное",
    titleA: "Жизнь ",
    titleB: "вне работы",
    desc: "Повседневная жизнь, тренировки, авто, мысли, проекты и то, что происходит за кадром.",
    channels: {
      youtube: "Длинные видео: идеи, проекты и то, что происходит за кадром.",
      instagram: "Повседневная жизнь, тренировки, авто.",
      tiktok: "Короткие видео и сильные моменты.",
      x: "Короткие мысли и наблюдения.",
      telegram: "Личные апдейты и то, что не попадает в другие каналы.",
    },
  },
};

export const ECOSYSTEM_COPY: Record<Lang, EcosystemCopy> = { en, ua, ru };

export const getEcosystemCopy = (lang: Lang): EcosystemCopy => ECOSYSTEM_COPY[lang] ?? en;

function localePath(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

export const directionRoute = (lang: Lang, key: DirectionKey): string =>
  `${localePath(lang)}/${DIRECTION_ROUTE[key]}`;

export const productRoute = (lang: Lang, slug: string): string => `${localePath(lang)}/${slug}`;

/** hreflang-style language code for schema (Ukrainian is `uk`). */
const SCHEMA_LANG: Record<Lang, string> = { en: "en", ua: "uk", ru: "ru" };

/**
 * Per-locale WebPage node.
 *
 * The root layout emits one language-neutral WebSite node for the whole site.
 * Each localized home route adds this WebPage, which carries the native
 * description and the real page language and points back at that WebSite @id —
 * so no page ever claims `inLanguage: "en"` for RU/UA content, and there is
 * never a second, contradicting WebSite node.
 */
export function localeHomeJsonLd(lang: Lang, name: string, description: string) {
  const url = `https://vladkuzmenko.com${localePath(lang) || "/"}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SCHEMA_LANG[lang],
    isPartOf: { "@id": "https://vladkuzmenko.com/#website" },
    about: { "@id": "https://vladkuzmenko.com/#vlad" },
  };
}

/**
 * ItemList of the four real directions. Every entry points at a page that exists.
 * No offers, prices or availability are declared here.
 */
export function ecosystemItemListJsonLd(lang: Lang) {
  const x = getEcosystemCopy(lang);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: x.navigator.title,
    itemListElement: DIRECTION_ORDER.map((key, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: x.navigator.tiles[key].name,
      description: x.navigator.tiles[key].purpose,
      url: `https://vladkuzmenko.com${directionRoute(lang, key)}`,
    })),
  };
}

/** CollectionPage for /products — real owned products only, no price or availability. */
export function productsCollectionJsonLd(lang: Lang) {
  const x = getEcosystemCopy(lang);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: x.products.title,
    description: x.products.metaDesc,
    url: `https://vladkuzmenko.com${localePath(lang)}/products`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: x.products.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        description: item.tagline,
        url: `https://vladkuzmenko.com${productRoute(lang, item.slug)}`,
      })),
    },
  };
}

/**
 * /drop is research. It is deliberately NOT marked up as a Product or Offer:
 * nothing is purchasable, and there is no price, availability or launch date.
 */
export function dropWebPageJsonLd(lang: Lang) {
  const x = getEcosystemCopy(lang);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: x.drop.title,
    description: x.drop.metaDesc,
    url: `https://vladkuzmenko.com${localePath(lang)}/drop`,
    about: { "@type": "Thing", name: x.drop.concept.name, description: x.drop.concept.what },
    isPartOf: { "@type": "WebSite", url: "https://vladkuzmenko.com", name: "Vlad Kuzmenko" },
  };
}

/** BreadcrumbList helper for direction detail pages. */
export function breadcrumbJsonLd(lang: Lang, name: string, slug: string) {
  const home = `https://vladkuzmenko.com${localePath(lang) || "/"}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Vlad Kuzmenko", item: home },
      { "@type": "ListItem", position: 2, name, item: `https://vladkuzmenko.com${localePath(lang)}/${slug}` },
    ],
  };
}
