import type { Lang } from "@/lib/i18n";

/**
 * Growth systems positioning (EN / UA / RU).
 *
 * The site sells three offer paths, not a technology list:
 *   Traffic Engine     — the business has an offer that converts, but not enough attention.
 *   Conversion Engine  — attention exists, but demand leaks between first contact and a deal.
 *   Growth Engine      — both layers, sequenced by whichever is losing the most.
 *
 * Engine names are brand labels and stay in English in every locale.
 * Copy rule: no guaranteed revenue, no invented metrics, no fabricated proof.
 * This module is framework-free so route metadata, JSON-LD and the client page
 * all read from one source.
 */

export const GROWTH_ROUTE = "growth-systems";

export type EngineKey = "traffic" | "conversion" | "growth";

/** Lead intents kept distinct so the n8n Website Lead Intake can segment by offer path. */
export const ENGINE_INTENT: Record<EngineKey, string> = {
  traffic: "traffic_engine",
  conversion: "conversion_engine",
  growth: "growth_engine",
};

export const DIAGNOSTIC_INTENT = "growth_diagnostic";

export const ENGINE_LABEL: Record<EngineKey, string> = {
  traffic: "Traffic Engine",
  conversion: "Conversion Engine",
  growth: "Growth Engine",
};

export const ENGINE_ORDER: EngineKey[] = ["traffic", "conversion", "growth"];

export type Engine = {
  /** Short business problem this engine answers — used as the card lead-in. */
  bottleneck: string;
  /** One-line business outcome. No promised numbers. */
  outcome: string;
  /** Compact capability chips for the homepage card. */
  chips: string[];
  whoFor: string;
  when: string[];
  build: string[];
  pilot: string;
  measure: string[];
  /** Honest limitation shown under the metrics block. */
  note: string;
  cta: string;
};

export type DiagnosticPath = {
  situation: string;
  detail: string;
  engine: EngineKey;
  /** Machine-readable value sent with the lead payload. */
  value: string;
};

export type GrowthCopy = {
  metaTitle: string;
  metaDesc: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    support: string;
    primaryCta: string;
    secondaryCta: string;
  };
  diagnostic: {
    eyebrow: string;
    title: string;
    desc: string;
    startWith: string;
    paths: DiagnosticPath[];
    cta: string;
    dialogTitle: string;
    dialogDesc: string;
    helpLabel: string;
    helpPlaceholder: string;
    successTitle: string;
    successMessage: string;
  };
  engines: {
    eyebrow: string;
    title: string;
    desc: string;
    labels: {
      whoFor: string;
      when: string;
      build: string;
      pilot: string;
      measure: string;
    };
    items: Record<EngineKey, Engine>;
    dialogDesc: string;
    helpLabel: string;
    helpPlaceholder: string;
    successTitle: string;
    successMessage: string;
  };
  process: {
    eyebrow: string;
    title: string;
    desc: string;
    steps: { title: string; desc: string }[];
  };
  proof: {
    eyebrow: string;
    title: string;
    desc: string;
    open: string;
    all: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    desc: string;
    links: { title: string; desc: string; slug: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    desc: string;
    cta: string;
  };
  /** Short version of the model used on the homepage. */
  home: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    desc: string;
    details: string;
    seeAll: string;
    diagnosticTitle: string;
    diagnosticDesc: string;
    recommended: string;
  };
};

const en: GrowthCopy = {
  metaTitle: "Growth Systems — Traffic, Conversion & Growth Engines | Vlad Kuzmenko",
  metaDesc:
    "Growth systems for business: content and distribution that earn qualified attention, and web, AI automation and sales operations that turn it into leads, bookings and deals — built around your actual bottleneck.",
  hero: {
    eyebrow: "Growth systems",
    title: "Growth systems that earn attention and turn it into leads and sales",
    lead: "Two levers decide whether a business grows: how much qualified attention it gets, and how much of that attention survives the path to a deal.",
    support:
      "I combine content, web, AI automation and sales operations around whichever of the two is currently costing you the most. You describe the business situation — choosing the tools is my job.",
    primaryCta: "Find your bottleneck",
    secondaryCta: "See the three systems",
  },
  diagnostic: {
    eyebrow: "Diagnostic",
    title: "Where is the bottleneck right now?",
    desc: "Pick the situation that matches your business. No need to know which tools are involved — that comes later.",
    startWith: "Start with",
    paths: [
      {
        situation: "Attention comes in, but too little of it becomes a lead",
        detail:
          "People find you, message you or visit the site — and a large part of that interest quietly disappears before anyone talks to them.",
        engine: "conversion",
        value: "attention_ok_conversion_weak",
      },
      {
        situation: "We handle demand well, there just is not enough of it",
        detail:
          "When someone reaches you, the conversation usually goes somewhere. The problem is how few people reach you in the first place.",
        engine: "traffic",
        value: "conversion_ok_attention_low",
      },
      {
        situation: "Both sides need work — or what works needs to scale",
        detail:
          "Attention and conversion both need attention, or something already works and you want to scale it without losing control of the process.",
        engine: "growth",
        value: "both_layers_or_scale",
      },
    ],
    cta: "Describe your situation",
    dialogTitle: "Where is your growth being lost?",
    dialogDesc:
      "Tell me about the business and what the current path from first contact to a deal looks like. I will come back with where I would start, what the first pilot covers and what we would measure.",
    helpLabel: "Your business and where growth is being lost",
    helpPlaceholder: "What you sell, where enquiries come from, what happens after the first contact",
    successTitle: "Request received",
    successMessage:
      "Got it. I will look at your situation and come back with where I would start and what a first pilot would cover.",
  },
  engines: {
    eyebrow: "Three systems",
    title: "Three offer paths, separated by problem — not by technology",
    desc: "Each system starts from a different business bottleneck. The stack behind it is chosen after the diagnosis, not before.",
    labels: {
      whoFor: "Who it is for",
      when: "When this is the bottleneck",
      build: "What we can build",
      pilot: "What the first pilot looks like",
      measure: "What we measure",
    },
    items: {
      traffic: {
        bottleneck: "The offer works. Not enough people see it.",
        outcome:
          "A systematic flow of qualified attention, turned into a managed acquisition channel instead of occasional posting.",
        chips: ["Content strategy", "Production workflow", "Distribution", "Content-to-lead capture"],
        whoFor:
          "Businesses with a real product and a sales path that already converts, but not enough qualified attention reaching it.",
        when: [
          "Sales depend on referrals and word of mouth, with no repeatable inbound flow.",
          "Content happens in bursts, whenever someone remembers to post.",
          "Warm leads convert well, but the pipeline runs dry between them.",
          "Paid ads are the only lever available for getting attention.",
        ],
        build: [
          "Short-form content strategy built around your offer and your buyer",
          "Content production workflows a real team can sustain",
          "Editing, hooks and storytelling that hold attention past the first seconds",
          "AI-assisted production to raise output without dropping quality",
          "Repurposing so one idea becomes a week of assets",
          "Multi-platform distribution across Reels, Shorts, TikTok and YouTube",
          "Social profile and CTA architecture that gives attention somewhere to go",
          "Content-to-inbound lead capture instead of untracked DMs",
          "Analytics and an iteration loop on what actually gets watched and clicked",
        ],
        pilot:
          "One platform, one content format. We build the production and distribution workflow, run it for an agreed period and track what earns attention and what turns into profile visits and enquiries.",
        measure: [
          "Published output against the plan",
          "Retention and watch-through on hooks",
          "Profile visits and link clicks",
          "Inbound enquiries attributable to content",
        ],
        note: "No promised view counts or lead volumes. The pilot exists to produce, measure and improve — the numbers depend on your market and offer.",
        cta: "Discuss a Traffic Engine",
      },
      conversion: {
        bottleneck: "Demand arrives. Part of it never reaches a conversation.",
        outcome:
          "Fewer manual losses, and a clear path from first contact to the next commercial step.",
        chips: ["Lead capture", "AI assistants", "CRM & routing", "Follow-up & booking"],
        whoFor:
          "Businesses that already get traffic and enquiries, but lose part of that demand between the first contact and a commercial action.",
        when: [
          "Enquiries wait hours — sometimes a day — for a first reply.",
          "Leads live scattered across DMs, inboxes and spreadsheets.",
          "Follow-up depends on someone remembering to do it.",
          "The site gets visits, but few of them turn into a conversation.",
          "Nobody can say what happened to last month's enquiries.",
        ],
        build: [
          "Website and landing page conversion improvements",
          "Lead capture wired into where the team actually works",
          "AI chat and voice assistants for the first response",
          "Qualification that separates a real buyer from a browser",
          "CRM structure and routing to the right person",
          "Automated follow-up and reminders",
          "Booking and handoff to a human at the right moment",
          "n8n integrations between site, AI, CRM and notifications",
          "Operational dashboards so the pipeline is visible day to day",
        ],
        pilot:
          "One flow, end to end — usually from website enquiry to booked conversation. Capture, instant response, qualification, routing and follow-up wired together and switched on for an agreed period.",
        measure: [
          "Time to first response",
          "Share of enquiries that receive a reply at all",
          "Enquiry to qualified conversation rate",
          "Booked conversations and handoffs",
          "Leads that ended without follow-up",
        ],
        note: "The system removes manual losses and makes the path visible. How many of those conversations close still depends on your offer, pricing and team.",
        cta: "Discuss a Conversion Engine",
      },
      growth: {
        bottleneck: "Both layers need work — or a working system needs to scale.",
        outcome:
          "Attention and conversion connected into one measurable system, sequenced by whichever layer is losing the most.",
        chips: ["Diagnosis first", "Traffic + Conversion", "Automation", "Analytics & feedback loop"],
        whoFor:
          "Businesses that need both layers connected, or that already have something working and want to scale it without losing control of the process.",
        when: [
          "Attention and conversion both need work, and you want a sequence rather than five projects at once.",
          "Content produces interest that nothing downstream picks up.",
          "The system works, but only because specific people hold it together.",
          "You want the whole funnel visible in one place before scaling spend or headcount.",
        ],
        build: [
          "Traffic Engine and Conversion Engine, sequenced by bottleneck",
          "Automation across the full path, not one isolated step",
          "Analytics from first touch to commercial action",
          "A content-to-lead funnel instead of two disconnected efforts",
          "CRM and follow-up as one operating layer",
          "A feedback loop from sales conversations back into content and offer",
        ],
        pilot:
          "It starts with a diagnosis. We agree which layer loses the most, build there first, and add the second layer only once the first produces measurable movement.",
        measure: [
          "Attention to enquiry rate",
          "Enquiry to commercial action rate",
          "Effort and cost per qualified conversation",
          "Where the funnel loses the most, month over month",
        ],
        note: "This is a growth system, not a profit guarantee. It is built to make the path measurable and improvable — results depend on your market, offer and team.",
        cta: "Discuss a Growth Engine",
      },
    },
    dialogDesc:
      "Tell me about the business and the current situation. I will come back with where I would start, what the first pilot covers and what we would measure.",
    helpLabel: "Your business and what you want to change",
    helpPlaceholder: "The goal, the current process, anything relevant",
    successTitle: "Request received",
    successMessage: "Got it. I will come back with a starting point and what a first pilot would cover.",
  },
  process: {
    eyebrow: "How we start",
    title: "Bottleneck first, build second",
    desc: "Every engagement follows the same four steps — small, verifiable and reversible before anything large is built.",
    steps: [
      {
        title: "Bottleneck",
        desc: "A short diagnosis of where growth is actually being lost: attention, conversion, or both. Nothing gets built before that is agreed.",
      },
      {
        title: "Proof or prototype",
        desc: "You see the specific thing being proposed — a flow, a prototype, a piece of content, a working demo — before committing to a full build.",
      },
      {
        title: "Minimal pilot",
        desc: "One narrow system, built end to end and switched on, with the measurements defined before it starts.",
      },
      {
        title: "Measured next decision",
        desc: "We look at what the pilot produced and decide together: extend it, adjust it, or stop. No open-ended retainer.",
      },
    ],
  },
  proof: {
    eyebrow: "Selected work",
    title: "Systems and products already built",
    desc: "Platforms, AI products and automation built for specific business and product needs. Each case shows what was built and its current stage.",
    open: "Open project",
    all: "View all work",
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "Where each system goes deeper",
    desc: "The pages behind the capabilities used inside these systems.",
    links: [
      {
        title: "VisibilityOS",
        desc: "A visibility and conversion audit of an existing website — a fast way to see where the conversion layer is losing people.",
        slug: "visibilityos",
      },
      {
        title: "Automotive lead system",
        desc: "A worked example of a Conversion Engine: enquiry qualification and manager handoff for automotive dealers.",
        slug: "auto-dealers",
      },
      {
        title: "AI Systems for Business",
        desc: "The same systems as a digital product, for teams that want to build and run them in-house.",
        slug: "ai-systems",
      },
      {
        title: "Selected work",
        desc: "Completed projects, working products and interface work across platforms, AI and automation.",
        slug: "work",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Before we talk",
    items: [
      {
        q: "Do you guarantee a number of leads or revenue?",
        a: "No. Results depend on your market, offer, pricing and team. What I build makes the path from attention to a commercial action visible, measurable and improvable — and we agree up front what we are measuring.",
      },
      {
        q: "How do you decide which system I need?",
        a: "By diagnosis. If demand exists and is lost after the first contact, we start with the Conversion Engine. If the sales path works but too few people reach it, we start with the Traffic Engine. If both need work, the Growth Engine sequences them, beginning with the larger loss.",
      },
      {
        q: "Do I need to understand AI, n8n or CRM tooling?",
        a: "No. You describe the business situation. The tooling is an implementation detail on my side, and what you get back is a system your team can operate.",
      },
      {
        q: "What does a first project usually look like?",
        a: "One narrow pilot rather than a full rebuild: a single flow or channel, built end to end, with the measurements agreed before it starts.",
      },
      {
        q: "Do you publish fixed prices?",
        a: "No. Scope differs too much between a single conversion flow and a connected growth system. After the diagnostic conversation you get a concrete scope and price for the pilot.",
      },
      {
        q: "Can you work with an existing site, CRM or team?",
        a: "Yes. Most work starts inside what already exists — I replace only the parts that are actually costing you.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Start with the bottleneck, not a list of tools",
    desc: "Tell me where your business is losing growth right now. You get back where I would start, what a first pilot covers and what we would measure.",
    cta: "Describe your situation",
  },
  home: {
    eyebrow: "Growth systems",
    titleA: "Growth systems built around your ",
    titleB: "bottleneck",
    desc: "Businesses lose growth in one of two places: not enough qualified attention, or too much of that attention lost between first contact and a commercial step. Each system starts from the one that is costing you.",
    details: "See details",
    seeAll: "Explore growth systems",
    diagnosticTitle: "Where is the bottleneck right now?",
    diagnosticDesc: "Pick the situation that matches your business — no tooling knowledge required.",
    recommended: "Suggested starting point",
  },
};

const ua: GrowthCopy = {
  metaTitle: "Growth Systems — системи росту для уваги, лідів і продажів | Vlad Kuzmenko",
  metaDesc:
    "Системи росту для бізнесу: контент і дистрибуція, що дають якісну увагу, та веб, AI-автоматизація і процеси продажів, що перетворюють її на ліди, записи й угоди — навколо вашого справжнього вузького місця.",
  hero: {
    eyebrow: "Системи росту",
    title: "Системи росту, що дають увагу й перетворюють її на ліди та продажі",
    lead: "Ріст бізнесу тримається на двох важелях: скільки якісної уваги він отримує і яка її частина доходить шляхом до угоди.",
    support:
      "Я поєдную контент, веб, AI-автоматизацію та процеси продажів навколо того з двох важелів, який зараз коштує вам найдорожче. Ви описуєте бізнес-ситуацію — підбір інструментів це вже моя робота.",
    primaryCta: "Визначити вузьке місце",
    secondaryCta: "Переглянути три системи",
  },
  diagnostic: {
    eyebrow: "Діагностика",
    title: "Де зараз вузьке місце?",
    desc: "Оберіть ситуацію, яка збігається з вашою. Не треба розбиратися в інструментах — це наступний крок.",
    startWith: "Почати з",
    paths: [
      {
        situation: "Увага є, але замало її стає лідами",
        detail:
          "Люди знаходять вас, пишуть, заходять на сайт — і значна частина цього інтересу тихо зникає ще до розмови.",
        engine: "conversion",
        value: "attention_ok_conversion_weak",
      },
      {
        situation: "Ми добре опрацьовуємо попит, просто його замало",
        detail:
          "Коли до вас звертаються, розмова зазвичай кудись веде. Проблема в тому, як мало людей звертається взагалі.",
        engine: "traffic",
        value: "conversion_ok_attention_low",
      },
      {
        situation: "Обидва шари потребують роботи — або те, що працює, треба масштабувати",
        detail:
          "І увага, і конверсія потребують роботи, або щось уже працює і ви хочете масштабувати це, не втрачаючи контроль над процесом.",
        engine: "growth",
        value: "both_layers_or_scale",
      },
    ],
    cta: "Описати ситуацію",
    dialogTitle: "Де ваш бізнес втрачає ріст?",
    dialogDesc:
      "Розкажіть про бізнес і про те, який зараз шлях від першого контакту до угоди. Я повернусь із тим, з чого почав би, що входить у перший пілот і що ми вимірюватимемо.",
    helpLabel: "Ваш бізнес і де втрачається ріст",
    helpPlaceholder: "Що продаєте, звідки приходять звернення, що відбувається після першого контакту",
    successTitle: "Запит отримано",
    successMessage:
      "Прийнято. Подивлюсь вашу ситуацію й повернусь із тим, з чого почав би і що охопить перший пілот.",
  },
  engines: {
    eyebrow: "Три системи",
    title: "Три напрями, розділені за проблемою — а не за технологіями",
    desc: "Кожна система починається з іншого бізнес-вузького місця. Стек за нею обирається після діагностики, а не до неї.",
    labels: {
      whoFor: "Для кого",
      when: "Коли це і є вузьке місце",
      build: "Що можемо побудувати",
      pilot: "Який вигляд має перший пілот",
      measure: "Що вимірюємо",
    },
    items: {
      traffic: {
        bottleneck: "Оффер працює. Замало людей його бачать.",
        outcome:
          "Системний потік якісної уваги, перетворений на керований канал залучення замість епізодичних публікацій.",
        chips: ["Контент-стратегія", "Процес виробництва", "Дистрибуція", "Контент → лід"],
        whoFor:
          "Бізнеси з реальним продуктом і шляхом продажу, який уже конвертує, але до якого доходить замало якісної уваги.",
        when: [
          "Продажі тримаються на рекомендаціях і сарафанному радіо, повторюваного вхідного потоку немає.",
          "Контент виходить ривками — коли хтось згадає, що треба щось опублікувати.",
          "Теплі ліди конвертуються добре, але між ними воронка порожніє.",
          "Платна реклама — єдиний важіль, яким можна дістати увагу.",
        ],
        build: [
          "Стратегія короткого відео навколо вашого оферу й вашого покупця",
          "Процеси виробництва контенту, які реальна команда здатна витримати",
          "Монтаж, гуки та сторітелінг, що утримують увагу далі за перші секунди",
          "AI-асистоване виробництво, щоб підняти обсяг без втрати якості",
          "Репурпосинг: одна ідея стає тижнем матеріалів",
          "Дистрибуція на кількох платформах — Reels, Shorts, TikTok, YouTube",
          "Архітектура профілю й CTA, щоб увазі було куди йти",
          "Захоплення вхідних лідів із контенту замість невідстежених директів",
          "Аналітика й цикл ітерацій на тому, що реально дивляться й клікають",
        ],
        pilot:
          "Одна платформа, один формат. Будуємо процес виробництва й дистрибуції, запускаємо на погоджений період і дивимось, що приносить увагу та що перетворюється на візити профілю й звернення.",
        measure: [
          "Фактичний випуск контенту проти плану",
          "Утримання й досмотри на гуках",
          "Візити профілю та кліки за посиланнями",
          "Вхідні звернення, які можна віднести до контенту",
        ],
        note: "Жодних обіцяних переглядів чи кількості лідів. Пілот існує, щоб виробляти, вимірювати й покращувати — цифри залежать від вашого ринку й оферу.",
        cta: "Обговорити Traffic Engine",
      },
      conversion: {
        bottleneck: "Попит приходить. Частина його не доходить до розмови.",
        outcome:
          "Менше ручних втрат і зрозумілий шлях від першого контакту до наступного комерційного кроку.",
        chips: ["Захоплення лідів", "AI-асистенти", "CRM і маршрутизація", "Фолоу-ап і запис"],
        whoFor:
          "Бізнеси, які вже отримують трафік і звернення, але втрачають частину попиту між першим контактом і комерційною дією.",
        when: [
          "Звернення чекають на першу відповідь годинами, іноді добу.",
          "Ліди розкидані по директах, поштах і таблицях.",
          "Фолоу-ап тримається на тому, що хтось про нього згадає.",
          "Сайт має відвідувачів, але мало хто з них доходить до розмови.",
          "Ніхто не може сказати, що сталося зі зверненнями минулого місяця.",
        ],
        build: [
          "Покращення конверсії сайту й лендингів",
          "Захоплення лідів у зв'язці з тим, де команда справді працює",
          "AI-чат і голосові асистенти для першої відповіді",
          "Кваліфікація, що відділяє реального покупця від того, хто просто дивиться",
          "Структура CRM і маршрутизація до потрібної людини",
          "Автоматичний фолоу-ап і нагадування",
          "Запис і передача людині в правильний момент",
          "n8n-інтеграції між сайтом, AI, CRM і сповіщеннями",
          "Операційні дашборди, щоб воронка була видима щодня",
        ],
        pilot:
          "Один потік від початку до кінця — зазвичай від звернення на сайті до призначеної розмови. Захоплення, миттєва відповідь, кваліфікація, маршрутизація і фолоу-ап, зібрані разом і ввімкнені на погоджений період.",
        measure: [
          "Час до першої відповіді",
          "Частка звернень, які взагалі отримали відповідь",
          "Конверсія звернення в кваліфіковану розмову",
          "Призначені розмови й передачі менеджеру",
          "Ліди, що завершились без жодного фолоу-апу",
        ],
        note: "Система прибирає ручні втрати й робить шлях видимим. Скільки з цих розмов закриється — все одно залежить від вашого оферу, цін і команди.",
        cta: "Обговорити Conversion Engine",
      },
      growth: {
        bottleneck: "Обидва шари потребують роботи — або робоча система має масштабуватись.",
        outcome:
          "Увага й конверсія, з'єднані в одну вимірювану систему, з послідовністю за тим шаром, що втрачає найбільше.",
        chips: ["Спочатку діагностика", "Traffic + Conversion", "Автоматизація", "Аналітика й зворотний зв'язок"],
        whoFor:
          "Бізнеси, яким потрібно з'єднати обидва шари, або ті, у кого щось уже працює і хто хоче масштабувати це, не втрачаючи контроль над процесом.",
        when: [
          "І увага, і конверсія потребують роботи, а ви хочете послідовність, а не п'ять проєктів одночасно.",
          "Контент створює інтерес, який далі ніхто не підхоплює.",
          "Система працює, але лише тому, що конкретні люди тримають її на собі.",
          "Ви хочете бачити всю воронку в одному місці, перш ніж збільшувати бюджет чи команду.",
        ],
        build: [
          "Traffic Engine і Conversion Engine, вибудувані за черговістю вузького місця",
          "Автоматизація по всьому шляху, а не на одному ізольованому кроці",
          "Аналітика від першого дотику до комерційної дії",
          "Воронка «контент → лід» замість двох непов'язаних напрямів",
          "CRM і фолоу-ап як один операційний шар",
          "Зворотний зв'язок із продажів назад у контент і офер",
        ],
        pilot:
          "Починається з діагностики. Погоджуємо, який шар втрачає найбільше, будуємо спершу там, і додаємо другий шар лише коли перший дає вимірюваний зсув.",
        measure: [
          "Конверсія уваги у звернення",
          "Конверсія звернення в комерційну дію",
          "Витрати й зусилля на одну кваліфіковану розмову",
          "Де воронка втрачає найбільше — від місяця до місяця",
        ],
        note: "Це система росту, а не гарантія прибутку. Вона робить шлях вимірюваним і придатним до покращення — результат залежить від вашого ринку, оферу й команди.",
        cta: "Обговорити Growth Engine",
      },
    },
    dialogDesc:
      "Розкажіть про бізнес і поточну ситуацію. Я повернусь із тим, з чого почав би, що входить у перший пілот і що ми вимірюватимемо.",
    helpLabel: "Ваш бізнес і що саме хочете змінити",
    helpPlaceholder: "Ціль, поточний процес, будь-що релевантне",
    successTitle: "Запит отримано",
    successMessage: "Прийнято. Повернусь із відправною точкою і тим, що охопить перший пілот.",
  },
  process: {
    eyebrow: "Як починаємо",
    title: "Спочатку вузьке місце, потім побудова",
    desc: "Будь-яка співпраця йде тими самими чотирма кроками — невеликими, перевірюваними й оборотними до того, як будується щось велике.",
    steps: [
      {
        title: "Вузьке місце",
        desc: "Коротка діагностика того, де саме втрачається ріст: увага, конверсія чи обидва шари. До погодження цього нічого не будується.",
      },
      {
        title: "Доказ або прототип",
        desc: "Ви бачите конкретну річ, яку пропонують — потік, прототип, матеріал, робоче демо — ще до повноцінної побудови.",
      },
      {
        title: "Мінімальний пілот",
        desc: "Одна вузька система, зібрана від початку до кінця й увімкнена, з метриками, визначеними до старту.",
      },
      {
        title: "Рішення за результатом",
        desc: "Дивимось, що дав пілот, і вирішуємо разом: розширювати, коригувати чи зупинити. Без безкінечного ретейнера.",
      },
    ],
  },
  proof: {
    eyebrow: "Вибрані роботи",
    title: "Системи й продукти, які вже побудовані",
    desc: "Платформи, AI-продукти й автоматизація під конкретні задачі бізнесу та продукту. У кожному кейсі видно, що зроблено і на якому це етапі.",
    open: "Відкрити проєкт",
    all: "Переглянути всі роботи",
  },
  capabilities: {
    eyebrow: "Можливості",
    title: "Де кожна система розкривається глибше",
    desc: "Сторінки під можливостями, які використовуються всередині цих систем.",
    links: [
      {
        title: "VisibilityOS",
        desc: "Аудит видимості та конверсії наявного сайту — швидкий спосіб побачити, де конверсійний шар втрачає людей.",
        slug: "visibilityos",
      },
      {
        title: "Система лідів для автодилерів",
        desc: "Розібраний приклад Conversion Engine: кваліфікація звернень і передача менеджеру для автодилерів.",
        slug: "auto-dealers",
      },
      {
        title: "AI-системи для бізнесу",
        desc: "Ті самі системи як цифровий продукт — для команд, які хочуть будувати й вести їх усередині.",
        slug: "ai-systems",
      },
      {
        title: "Вибрані роботи",
        desc: "Завершені проєкти, працюючі продукти й інтерфейсні роботи в платформах, AI та автоматизації.",
        slug: "work",
      },
    ],
  },
  faq: {
    eyebrow: "Питання",
    title: "Перед тим, як говорити",
    items: [
      {
        q: "Ви гарантуєте кількість лідів або дохід?",
        a: "Ні. Результат залежить від вашого ринку, оферу, цін і команди. Те, що я будую, робить шлях від уваги до комерційної дії видимим, вимірюваним і придатним до покращення — і ми наперед домовляємось, що саме вимірюємо.",
      },
      {
        q: "Як ви визначаєте, яка система мені потрібна?",
        a: "Через діагностику. Якщо попит є і втрачається після першого контакту — починаємо з Conversion Engine. Якщо шлях продажу працює, але до нього доходить замало людей — з Traffic Engine. Якщо роботи потребують обидва шари, Growth Engine вибудовує їх послідовно, починаючи з більшої втрати.",
      },
      {
        q: "Чи треба мені розбиратися в AI, n8n чи CRM?",
        a: "Ні. Ви описуєте бізнес-ситуацію. Інструменти — це деталь реалізації з мого боку, а на виході ви отримуєте систему, якою ваша команда може користуватись.",
      },
      {
        q: "Який вигляд зазвичай має перший проєкт?",
        a: "Це вузький пілот, а не повна перебудова: один потік чи канал, зібраний від початку до кінця, з метриками, погодженими до старту.",
      },
      {
        q: "Чи публікуєте ви фіксовані ціни?",
        a: "Ні. Обсяг занадто різний між одним конверсійним потоком і зв'язаною системою росту. Після діагностичної розмови ви отримуєте конкретний обсяг і ціну пілота.",
      },
      {
        q: "Чи можете працювати з наявним сайтом, CRM або командою?",
        a: "Так. Більшість роботи починається всередині того, що вже є — я замінюю лише те, що справді коштує вам грошей.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Наступний крок",
    title: "Почніть із вузького місця, а не зі списку інструментів",
    desc: "Напишіть, де ваш бізнес зараз втрачає ріст. У відповідь отримаєте, з чого я почав би, що охоплює перший пілот і що ми вимірюватимемо.",
    cta: "Описати ситуацію",
  },
  home: {
    eyebrow: "Системи росту",
    titleA: "Системи росту навколо вашого ",
    titleB: "вузького місця",
    desc: "Бізнес втрачає ріст в одному з двох місць: замало якісної уваги — або надто багато цієї уваги губиться між першим контактом і комерційним кроком. Кожна система починається з того, що коштує вам дорожче.",
    details: "Детальніше",
    seeAll: "Переглянути системи росту",
    diagnosticTitle: "Де зараз вузьке місце?",
    diagnosticDesc: "Оберіть ситуацію, яка збігається з вашою — розбиратися в інструментах не потрібно.",
    recommended: "Рекомендована відправна точка",
  },
};

const ru: GrowthCopy = {
  metaTitle: "Growth Systems — системы роста для внимания, лидов и продаж | Vlad Kuzmenko",
  metaDesc:
    "Системы роста для бизнеса: контент и дистрибуция, дающие качественное внимание, и веб, AI-автоматизация и процессы продаж, превращающие его в лиды, записи и сделки — вокруг вашего реального узкого места.",
  hero: {
    eyebrow: "Системы роста",
    title: "Системы роста, которые дают внимание и превращают его в лиды и продажи",
    lead: "Рост бизнеса держится на двух рычагах: сколько качественного внимания он получает и какая его часть доходит по пути до сделки.",
    support:
      "Я объединяю контент, веб, AI-автоматизацию и процессы продаж вокруг того из двух рычагов, который сейчас стоит вам дороже всего. Вы описываете бизнес-ситуацию — подбор инструментов уже моя работа.",
    primaryCta: "Определить узкое место",
    secondaryCta: "Посмотреть три системы",
  },
  diagnostic: {
    eyebrow: "Диагностика",
    title: "Где сейчас узкое место?",
    desc: "Выберите ситуацию, которая совпадает с вашей. Разбираться в инструментах не нужно — это следующий шаг.",
    startWith: "Начать с",
    paths: [
      {
        situation: "Внимание есть, но слишком мало его становится лидами",
        detail:
          "Люди находят вас, пишут, заходят на сайт — и заметная часть этого интереса тихо исчезает ещё до разговора.",
        engine: "conversion",
        value: "attention_ok_conversion_weak",
      },
      {
        situation: "Мы хорошо обрабатываем спрос, просто его мало",
        detail:
          "Когда к вам обращаются, разговор обычно куда-то ведёт. Проблема в том, как мало людей обращается вообще.",
        engine: "traffic",
        value: "conversion_ok_attention_low",
      },
      {
        situation: "Оба слоя требуют работы — или то, что работает, нужно масштабировать",
        detail:
          "И внимание, и конверсия требуют работы, либо что-то уже работает и вы хотите масштабировать это, не теряя контроль над процессом.",
        engine: "growth",
        value: "both_layers_or_scale",
      },
    ],
    cta: "Описать ситуацию",
    dialogTitle: "Где ваш бизнес теряет рост?",
    dialogDesc:
      "Расскажите о бизнесе и о том, как сейчас выглядит путь от первого контакта до сделки. Я вернусь с тем, с чего бы начал, что входит в первый пилот и что мы будем измерять.",
    helpLabel: "Ваш бизнес и где теряется рост",
    helpPlaceholder: "Что продаёте, откуда приходят обращения, что происходит после первого контакта",
    successTitle: "Запрос получен",
    successMessage:
      "Принято. Посмотрю вашу ситуацию и вернусь с тем, с чего бы начал и что охватит первый пилот.",
  },
  engines: {
    eyebrow: "Три системы",
    title: "Три направления, разделённые по проблеме — а не по технологиям",
    desc: "Каждая система начинается с другого бизнес-узкого места. Стек за ней выбирается после диагностики, а не до неё.",
    labels: {
      whoFor: "Для кого",
      when: "Когда это и есть узкое место",
      build: "Что можем построить",
      pilot: "Как выглядит первый пилот",
      measure: "Что измеряем",
    },
    items: {
      traffic: {
        bottleneck: "Оффер работает. Слишком мало людей его видят.",
        outcome:
          "Системный поток качественного внимания, превращённый в управляемый канал привлечения вместо эпизодических публикаций.",
        chips: ["Контент-стратегия", "Процесс производства", "Дистрибуция", "Контент → лид"],
        whoFor:
          "Бизнесы с реальным продуктом и путём продажи, который уже конвертирует, но до которого доходит слишком мало качественного внимания.",
        when: [
          "Продажи держатся на рекомендациях и сарафанном радио, повторяемого входящего потока нет.",
          "Контент выходит рывками — когда кто-то вспомнит, что надо что-то опубликовать.",
          "Тёплые лиды конвертируются хорошо, но между ними воронка пустеет.",
          "Платная реклама — единственный рычаг, которым можно достать внимание.",
        ],
        build: [
          "Стратегия короткого видео вокруг вашего оффера и вашего покупателя",
          "Процессы производства контента, которые реальная команда способна выдержать",
          "Монтаж, хуки и сторителлинг, удерживающие внимание дальше первых секунд",
          "AI-ассистированное производство, чтобы поднять объём без потери качества",
          "Репурпосинг: одна идея становится неделей материалов",
          "Дистрибуция на нескольких платформах — Reels, Shorts, TikTok, YouTube",
          "Архитектура профиля и CTA, чтобы вниманию было куда идти",
          "Захват входящих лидов из контента вместо неотслеживаемых директов",
          "Аналитика и цикл итераций на том, что реально смотрят и кликают",
        ],
        pilot:
          "Одна платформа, один формат. Строим процесс производства и дистрибуции, запускаем на согласованный период и смотрим, что приносит внимание и что превращается в визиты профиля и обращения.",
        measure: [
          "Фактический выпуск контента против плана",
          "Удержание и досмотры на хуках",
          "Визиты профиля и клики по ссылкам",
          "Входящие обращения, которые можно отнести к контенту",
        ],
        note: "Никаких обещанных просмотров или количества лидов. Пилот существует, чтобы производить, измерять и улучшать — цифры зависят от вашего рынка и оффера.",
        cta: "Обсудить Traffic Engine",
      },
      conversion: {
        bottleneck: "Спрос приходит. Часть его не доходит до разговора.",
        outcome:
          "Меньше ручных потерь и понятный путь от первого контакта до следующего коммерческого шага.",
        chips: ["Захват лидов", "AI-ассистенты", "CRM и маршрутизация", "Фоллоу-ап и запись"],
        whoFor:
          "Бизнесы, которые уже получают трафик и обращения, но теряют часть спроса между первым контактом и коммерческим действием.",
        when: [
          "Обращения ждут первого ответа часами, иногда сутки.",
          "Лиды разбросаны по директам, почтам и таблицам.",
          "Фоллоу-ап держится на том, что кто-то о нём вспомнит.",
          "У сайта есть посетители, но мало кто из них доходит до разговора.",
          "Никто не может сказать, что случилось с обращениями прошлого месяца.",
        ],
        build: [
          "Улучшение конверсии сайта и лендингов",
          "Захват лидов в связке с тем, где команда действительно работает",
          "AI-чат и голосовые ассистенты для первого ответа",
          "Квалификация, отделяющая реального покупателя от того, кто просто смотрит",
          "Структура CRM и маршрутизация к нужному человеку",
          "Автоматический фоллоу-ап и напоминания",
          "Запись и передача человеку в правильный момент",
          "n8n-интеграции между сайтом, AI, CRM и уведомлениями",
          "Операционные дашборды, чтобы воронка была видна каждый день",
        ],
        pilot:
          "Один поток от начала до конца — обычно от обращения на сайте до назначенного разговора. Захват, мгновенный ответ, квалификация, маршрутизация и фоллоу-ап, собранные вместе и включённые на согласованный период.",
        measure: [
          "Время до первого ответа",
          "Доля обращений, которые вообще получили ответ",
          "Конверсия обращения в квалифицированный разговор",
          "Назначенные разговоры и передачи менеджеру",
          "Лиды, завершившиеся без единого фоллоу-апа",
        ],
        note: "Система убирает ручные потери и делает путь видимым. Сколько из этих разговоров закроется — по-прежнему зависит от вашего оффера, цен и команды.",
        cta: "Обсудить Conversion Engine",
      },
      growth: {
        bottleneck: "Оба слоя требуют работы — или рабочая система должна масштабироваться.",
        outcome:
          "Внимание и конверсия, соединённые в одну измеримую систему, с последовательностью по тому слою, который теряет больше.",
        chips: ["Сначала диагностика", "Traffic + Conversion", "Автоматизация", "Аналитика и обратная связь"],
        whoFor:
          "Бизнесы, которым нужно соединить оба слоя, или те, у кого что-то уже работает и кто хочет масштабировать это, не теряя контроль над процессом.",
        when: [
          "И внимание, и конверсия требуют работы, а вам нужна последовательность, а не пять проектов сразу.",
          "Контент создаёт интерес, который дальше никто не подхватывает.",
          "Система работает, но только потому, что конкретные люди держат её на себе.",
          "Вы хотите видеть всю воронку в одном месте, прежде чем увеличивать бюджет или команду.",
        ],
        build: [
          "Traffic Engine и Conversion Engine, выстроенные по очерёдности узкого места",
          "Автоматизация по всему пути, а не на одном изолированном шаге",
          "Аналитика от первого касания до коммерческого действия",
          "Воронка «контент → лид» вместо двух несвязанных направлений",
          "CRM и фоллоу-ап как один операционный слой",
          "Обратная связь из продаж назад в контент и оффер",
        ],
        pilot:
          "Начинается с диагностики. Согласуем, какой слой теряет больше, строим сначала там и добавляем второй слой только когда первый даёт измеримый сдвиг.",
        measure: [
          "Конверсия внимания в обращение",
          "Конверсия обращения в коммерческое действие",
          "Затраты и усилия на один квалифицированный разговор",
          "Где воронка теряет больше всего — от месяца к месяцу",
        ],
        note: "Это система роста, а не гарантия прибыли. Она делает путь измеримым и улучшаемым — результат зависит от вашего рынка, оффера и команды.",
        cta: "Обсудить Growth Engine",
      },
    },
    dialogDesc:
      "Расскажите о бизнесе и текущей ситуации. Я вернусь с тем, с чего бы начал, что входит в первый пилот и что мы будем измерять.",
    helpLabel: "Ваш бизнес и что именно хотите изменить",
    helpPlaceholder: "Цель, текущий процесс, что угодно релевантное",
    successTitle: "Запрос получен",
    successMessage: "Принято. Вернусь с отправной точкой и тем, что охватит первый пилот.",
  },
  process: {
    eyebrow: "Как начинаем",
    title: "Сначала узкое место, потом стройка",
    desc: "Любая работа идёт одними и теми же четырьмя шагами — небольшими, проверяемыми и обратимыми до того, как строится что-то крупное.",
    steps: [
      {
        title: "Узкое место",
        desc: "Короткая диагностика того, где именно теряется рост: внимание, конверсия или оба слоя. До согласования этого ничего не строится.",
      },
      {
        title: "Доказательство или прототип",
        desc: "Вы видите конкретную вещь, которую предлагают — поток, прототип, материал, рабочее демо — ещё до полноценной стройки.",
      },
      {
        title: "Минимальный пилот",
        desc: "Одна узкая система, собранная от начала до конца и включённая, с метриками, определёнными до старта.",
      },
      {
        title: "Решение по результату",
        desc: "Смотрим, что дал пилот, и решаем вместе: расширять, корректировать или остановить. Без бесконечного ретейнера.",
      },
    ],
  },
  proof: {
    eyebrow: "Избранные работы",
    title: "Системы и продукты, которые уже построены",
    desc: "Платформы, AI-продукты и автоматизация под конкретные задачи бизнеса и продукта. В каждом кейсе видно, что сделано и на каком это этапе.",
    open: "Открыть проект",
    all: "Смотреть все работы",
  },
  capabilities: {
    eyebrow: "Возможности",
    title: "Где каждая система раскрывается глубже",
    desc: "Страницы под возможностями, которые используются внутри этих систем.",
    links: [
      {
        title: "VisibilityOS",
        desc: "Аудит видимости и конверсии существующего сайта — быстрый способ увидеть, где конверсионный слой теряет людей.",
        slug: "visibilityos",
      },
      {
        title: "Система лидов для автодилеров",
        desc: "Разобранный пример Conversion Engine: квалификация обращений и передача менеджеру для автодилеров.",
        slug: "auto-dealers",
      },
      {
        title: "AI-системы для бизнеса",
        desc: "Те же системы как цифровой продукт — для команд, которые хотят строить и вести их внутри.",
        slug: "ai-systems",
      },
      {
        title: "Избранные работы",
        desc: "Завершённые проекты, работающие продукты и интерфейсные работы в платформах, AI и автоматизации.",
        slug: "work",
      },
    ],
  },
  faq: {
    eyebrow: "Вопросы",
    title: "Перед тем, как говорить",
    items: [
      {
        q: "Вы гарантируете количество лидов или доход?",
        a: "Нет. Результат зависит от вашего рынка, оффера, цен и команды. То, что я строю, делает путь от внимания до коммерческого действия видимым, измеримым и улучшаемым — и мы заранее договариваемся, что именно измеряем.",
      },
      {
        q: "Как вы определяете, какая система мне нужна?",
        a: "Через диагностику. Если спрос есть и теряется после первого контакта — начинаем с Conversion Engine. Если путь продажи работает, но до него доходит слишком мало людей — с Traffic Engine. Если работы требуют оба слоя, Growth Engine выстраивает их последовательно, начиная с большей потери.",
      },
      {
        q: "Нужно ли мне разбираться в AI, n8n или CRM?",
        a: "Нет. Вы описываете бизнес-ситуацию. Инструменты — это деталь реализации с моей стороны, а на выходе вы получаете систему, которой ваша команда может пользоваться.",
      },
      {
        q: "Как обычно выглядит первый проект?",
        a: "Это узкий пилот, а не полная перестройка: один поток или канал, собранный от начала до конца, с метриками, согласованными до старта.",
      },
      {
        q: "Публикуете ли вы фиксированные цены?",
        a: "Нет. Объём слишком разный между одним конверсионным потоком и связанной системой роста. После диагностического разговора вы получаете конкретный объём и цену пилота.",
      },
      {
        q: "Можете работать с существующим сайтом, CRM или командой?",
        a: "Да. Большая часть работы начинается внутри того, что уже есть — я заменяю только то, что действительно стоит вам денег.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Следующий шаг",
    title: "Начните с узкого места, а не со списка инструментов",
    desc: "Напишите, где ваш бизнес сейчас теряет рост. В ответ получите, с чего бы я начал, что охватывает первый пилот и что мы будем измерять.",
    cta: "Описать ситуацию",
  },
  home: {
    eyebrow: "Системы роста",
    titleA: "Системы роста вокруг вашего ",
    titleB: "узкого места",
    desc: "Бизнес теряет рост в одном из двух мест: слишком мало качественного внимания — или слишком много этого внимания теряется между первым контактом и коммерческим шагом. Каждая система начинается с того, что стоит вам дороже.",
    details: "Подробнее",
    seeAll: "Посмотреть системы роста",
    diagnosticTitle: "Где сейчас узкое место?",
    diagnosticDesc: "Выберите ситуацию, которая совпадает с вашей — разбираться в инструментах не нужно.",
    recommended: "Рекомендуемая отправная точка",
  },
};

export const GROWTH_COPY: Record<Lang, GrowthCopy> = { en, ua, ru };

export const getGrowthCopy = (lang: Lang): GrowthCopy => GROWTH_COPY[lang] ?? en;

/** Anchor id for an engine section on the growth systems page. */
export const engineAnchor = (key: EngineKey): string =>
  `${ENGINE_LABEL[key].toLowerCase().replace(/\s+/g, "-")}`;

function localePath(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

export function growthRoute(lang: Lang): string {
  return `${localePath(lang)}/${GROWTH_ROUTE}`;
}

/**
 * Service + OfferCatalog for the three offer paths. Every entry maps to a section
 * that is actually rendered on the page, and no prices are declared because none
 * are published.
 */
export function growthServiceJsonLd(lang: Lang) {
  const x = getGrowthCopy(lang);
  const url = `https://vladkuzmenko.com${growthRoute(lang)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Growth Systems",
    serviceType: "Business growth systems",
    description: x.metaDesc,
    url,
    provider: {
      "@type": "Person",
      name: "Vlad Kuzmenko",
      url: "https://vladkuzmenko.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Growth Systems",
      itemListElement: ENGINE_ORDER.map((key) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: ENGINE_LABEL[key],
          description: x.engines.items[key].outcome,
          url: `${url}#${engineAnchor(key)}`,
        },
      })),
    },
  };
}

/** FAQPage schema — only valid because the same questions are visible on the page. */
export function growthFaqJsonLd(lang: Lang) {
  const x = getGrowthCopy(lang);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: x.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
