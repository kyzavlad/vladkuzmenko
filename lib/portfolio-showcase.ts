import { type Lang, langHref } from "@/lib/i18n";
import {
  PORTFOLIO,
  type PortfolioCard,
  type CardContent,
} from "@/lib/portfolio";
import { SITE } from "@/lib/site";

export type MediaFit = "cover" | "contain";

export interface ShowcaseStory {
  context: string;
  previous: string;
  desired: string;
  system: string;
  flow: string[];
  evidence: string;
  resultNote: string;
}

export interface ShowcaseProject extends PortfolioCard {
  caseSlug: string;
  mediaFit?: MediaFit;
  story?: Record<Lang, ShowcaseStory>;
}

const local = <T,>(en: T, ua: T, ru: T): Record<Lang, T> => ({ en, ua, ru });

function withCase(p: PortfolioCard): ShowcaseProject {
  return {
    ...p,
    caseSlug: p.caseSlug ?? p.key,
    mediaFit: "cover",
  };
}

function replaceProject(
  projects: ShowcaseProject[],
  key: string,
  patch: Partial<ShowcaseProject>,
): ShowcaseProject[] {
  return projects.map((p) => (p.key === key ? { ...p, ...patch } : p));
}

const datingContent: Record<Lang, CardContent> = {
  en: {
    name: "Dating CRM",
    type: "CRM + automation · Communication operations",
    outcome:
      "Profiles, conversations and follow-up live in one operator workspace instead of being tracked across disconnected manual steps.",
    problem:
      "Conversation work depended on manual tracking: an operator had to remember who needed attention, what happened last and when to follow up.",
    built:
      "A CRM prototype with profile context, contact threads, unread-state visibility, follow-up logic and an admin/moderation layer.",
    value:
      "The product turns a repeated communication process into a visible operating queue: context stays attached to the profile and the next action is easier to control.",
    result:
      "A completed working prototype that demonstrates the full operator flow from profile context to active conversations and follow-up. The current proof is the real CRM interface shown in the project screenshot; no conversion or revenue metric is claimed.",
    capabilities: [
      "Profile context",
      "Conversation tracking",
      "Follow-up logic",
      "Unread states",
      "Admin & moderation",
      "Operator workflow",
    ],
    caption: "Romance Compass CRM — profile and conversation workspace",
  },
  ua: {
    name: "Dating CRM",
    type: "CRM + автоматизація · Комунікаційні процеси",
    outcome:
      "Профілі, діалоги та follow-up зібрані в одному робочому просторі оператора замість розрізненого ручного контролю.",
    problem:
      "Робота з діалогами залежала від ручного трекінгу: оператору потрібно було пам’ятати, кому потрібна увага, що було в останньому контакті й коли повертатися з follow-up.",
    built:
      "Прототип CRM із контекстом профілю, списком контактів і діалогів, індикаторами непрочитаного, follow-up логікою та шаром адміністрування / модерації.",
    value:
      "Повторюваний комунікаційний процес перетворено на видиму операційну чергу: контекст прив’язаний до профілю, а наступну дію легше контролювати.",
    result:
      "Завершений робочий прототип, що показує повний операторський flow від контексту профілю до активних діалогів і follow-up. Поточний доказ — реальний інтерфейс CRM на скриншоті; метрики конверсії або виручки не вигадуються.",
    capabilities: [
      "Контекст профілю",
      "Трекінг діалогів",
      "Follow-up логіка",
      "Непрочитані",
      "Адмін і модерація",
      "Робочий процес оператора",
    ],
    caption: "Romance Compass CRM — профіль і робоча зона діалогів",
  },
  ru: {
    name: "Dating CRM",
    type: "CRM + автоматизация · Коммуникационные процессы",
    outcome:
      "Профили, диалоги и follow-up собраны в одном рабочем пространстве оператора вместо разрозненного ручного контроля.",
    problem:
      "Работа с диалогами зависела от ручного трекинга: оператору нужно было помнить, кому требуется внимание, что было в последнем контакте и когда возвращаться с follow-up.",
    built:
      "Прототип CRM с контекстом профиля, списком контактов и диалогов, индикаторами непрочитанного, follow-up логикой и слоем администрирования / модерации.",
    value:
      "Повторяющийся коммуникационный процесс превращён в видимую операционную очередь: контекст привязан к профилю, а следующее действие легче контролировать.",
    result:
      "Завершённый рабочий прототип, показывающий полный операторский flow от контекста профиля до активных диалогов и follow-up. Текущее доказательство — реальный интерфейс CRM на скриншоте; метрики конверсии или выручки не придумываются.",
    capabilities: [
      "Контекст профиля",
      "Трекинг диалогов",
      "Follow-up логика",
      "Непрочитанные",
      "Админ и модерация",
      "Рабочий процесс оператора",
    ],
    caption: "Romance Compass CRM — профиль и рабочая зона диалогов",
  },
};

const datingStory = local<ShowcaseStory>(
  {
    context:
      "An internal communication product where one operator needs profile context and active contact threads in the same workspace.",
    previous:
      "The repeated work was fragmented: profile details, message state and follow-up decisions had to be checked and remembered manually.",
    desired:
      "Give the operator one place to see who the person is, which conversations need attention and what should happen next.",
    system:
      "A CRM workspace connects profile information with a contact list, unread indicators and follow-up control.",
    flow: [
      "Open a profile and recover the relevant person context.",
      "See active contacts and unread conversation states in the same workspace.",
      "Work the conversation and keep the next follow-up visible instead of relying on memory.",
    ],
    evidence:
      "Real CRM interface screenshot supplied from the completed prototype.",
    resultNote:
      "The verified result is a completed operator-flow prototype. Commercial performance data is not presented.",
  },
  {
    context:
      "Внутрішній комунікаційний продукт, де оператору потрібні контекст профілю та активні діалоги в одному робочому просторі.",
    previous:
      "Повторювана робота була розірвана між контекстом профілю, станом повідомлень і ручними рішеннями про follow-up.",
    desired:
      "Дати оператору одне місце, де видно, хто ця людина, які діалоги потребують уваги і що робити далі.",
    system:
      "CRM поєднує інформацію профілю зі списком контактів, непрочитаними повідомленнями та контролем follow-up.",
    flow: [
      "Відкрити профіль і відновити потрібний контекст людини.",
      "Побачити активні контакти та непрочитані діалоги в одному просторі.",
      "Опрацювати діалог і залишити наступний follow-up видимим замість покладання на пам’ять.",
    ],
    evidence:
      "Реальний скриншот CRM-інтерфейсу із завершеного прототипу.",
    resultNote:
      "Підтверджений результат — завершений прототип операторського flow. Комерційні метрики не заявляються.",
  },
  {
    context:
      "Внутренний коммуникационный продукт, где оператору нужны контекст профиля и активные диалоги в одном рабочем пространстве.",
    previous:
      "Повторяющаяся работа была разорвана между контекстом профиля, состоянием сообщений и ручными решениями о follow-up.",
    desired:
      "Дать оператору одно место, где видно, кто этот человек, какие диалоги требуют внимания и что делать дальше.",
    system:
      "CRM связывает информацию профиля со списком контактов, непрочитанными сообщениями и контролем follow-up.",
    flow: [
      "Открыть профиль и восстановить нужный контекст человека.",
      "Увидеть активные контакты и непрочитанные диалоги в одном рабочем пространстве.",
      "Обработать диалог и оставить следующий follow-up видимым вместо контроля по памяти.",
    ],
    evidence:
      "Реальный скриншот CRM-интерфейса из завершённого прототипа.",
    resultNote:
      "Подтверждённый результат — завершённый прототип операторского flow. Коммерческие метрики не заявляются.",
  },
);

const leatherContent: Record<Lang, CardContent> = {
  en: {
    name: "Leather Clinic Myrtle Beach",
    type: "Live local-service website · Lead generation",
    outcome:
      "A visitor lands on one clear service promise, immediately sees the local coverage and can move straight to a request or phone call.",
    problem:
      "A specialist local service needs to explain what is repaired, where the team works and how to request help before a visitor loses intent.",
    built:
      "A focused service website with a visual hero, repair categories, local positioning, proof-oriented sections and direct Request / Call paths.",
    value:
      "The interface removes navigation friction from the highest-intent journey: understand the offer, confirm the service area, then contact the business.",
    result:
      "A live client website is available publicly and the current hero is shown here as direct proof of the delivered interface. No unsupported lead-volume or conversion uplift is claimed.",
    capabilities: [
      "Local-service positioning",
      "Conversion landing",
      "Request CTA",
      "Click-to-call",
      "Responsive UI",
      "Service architecture",
    ],
    caption: "Leather Clinic Myrtle Beach — live website hero",
  },
  ua: {
    name: "Leather Clinic Myrtle Beach",
    type: "Живий сайт локального сервісу · Lead generation",
    outcome:
      "Відвідувач одразу бачить одну зрозумілу пропозицію, географію роботи й може перейти прямо до заявки або дзвінка.",
    problem:
      "Локальному спеціалізованому сервісу потрібно швидко пояснити, що саме ремонтується, де працює команда і як замовити допомогу, поки намір користувача не втрачено.",
    built:
      "Фокусний сервісний сайт із сильним hero, категоріями ремонту, локальним позиціонуванням, proof-блоками та прямими Request / Call шляхами.",
    value:
      "Інтерфейс прибирає зайве тертя з найціннішого маршруту: зрозуміти послугу, підтвердити зону роботи й зв’язатися з бізнесом.",
    result:
      "Живий клієнтський сайт доступний публічно, а поточний hero показаний тут як прямий доказ виконаного інтерфейсу. Непідтверджені цифри лідів або приросту конверсії не заявляються.",
    capabilities: [
      "Локальне позиціонування",
      "Конверсійний лендинг",
      "Request CTA",
      "Click-to-call",
      "Responsive UI",
      "Структура послуг",
    ],
    caption: "Leather Clinic Myrtle Beach — hero живого сайту",
  },
  ru: {
    name: "Leather Clinic Myrtle Beach",
    type: "Живой сайт локального сервиса · Lead generation",
    outcome:
      "Посетитель сразу видит одно понятное предложение, географию работы и может перейти прямо к заявке или звонку.",
    problem:
      "Локальному специализированному сервису нужно быстро объяснить, что именно ремонтируется, где работает команда и как заказать помощь, пока намерение пользователя не потеряно.",
    built:
      "Фокусный сервисный сайт с сильным hero, категориями ремонта, локальным позиционированием, proof-блоками и прямыми Request / Call путями.",
    value:
      "Интерфейс убирает лишнее трение из самого ценного маршрута: понять услугу, подтвердить зону работы и связаться с бизнесом.",
    result:
      "Живой клиентский сайт доступен публично, а текущий hero показан здесь как прямое доказательство выполненного интерфейса. Неподтверждённые цифры лидов или роста конверсии не заявляются.",
    capabilities: [
      "Локальное позиционирование",
      "Конверсионный лендинг",
      "Request CTA",
      "Click-to-call",
      "Responsive UI",
      "Структура услуг",
    ],
    caption: "Leather Clinic Myrtle Beach — hero живого сайта",
  },
};

const leatherStory = local<ShowcaseStory>(
  {
    context: "A mobile local-service business selling specialist leather furniture repair in the Myrtle Beach area.",
    previous: "The offer needed a clearer first-screen path from service recognition to a request or call.",
    desired: "Make the service, geography and primary actions understandable in seconds.",
    system: "A conversion-focused local-service site with one strong hero, clear repair scope and direct contact paths.",
    flow: [
      "Land on a concrete Leather Furniture Repair promise.",
      "Confirm the repair types and local service area.",
      "Choose Request Now or Call Us without searching for the next step.",
    ],
    evidence: "Public live website plus the current live hero screenshot.",
    resultNote: "The verified result is the delivered live website. Lead and conversion metrics are not claimed without source data.",
  },
  {
    context: "Мобільний локальний сервіс спеціалізованого ремонту шкіряних меблів у районі Myrtle Beach.",
    previous: "Пропозиції потрібен був чіткіший шлях із першого екрана до заявки або дзвінка.",
    desired: "Зробити послугу, географію та головні дії зрозумілими за кілька секунд.",
    system: "Конверсійний локальний сайт з одним сильним hero, чітким scope ремонту і прямими контактними шляхами.",
    flow: [
      "Побачити конкретну пропозицію Leather Furniture Repair.",
      "Підтвердити типи ремонту та локальну зону обслуговування.",
      "Обрати Request Now або Call Us без пошуку наступного кроку.",
    ],
    evidence: "Публічний живий сайт і актуальний скриншот його hero.",
    resultNote: "Підтверджений результат — виконаний живий сайт. Метрики лідів і конверсії без джерела не заявляються.",
  },
  {
    context: "Мобильный локальный сервис специализированного ремонта кожаной мебели в районе Myrtle Beach.",
    previous: "Предложению нужен был более ясный путь с первого экрана к заявке или звонку.",
    desired: "Сделать услугу, географию и главные действия понятными за несколько секунд.",
    system: "Конверсионный локальный сайт с одним сильным hero, ясным scope ремонта и прямыми контактными путями.",
    flow: [
      "Увидеть конкретное предложение Leather Furniture Repair.",
      "Подтвердить виды ремонта и локальную зону обслуживания.",
      "Выбрать Request Now или Call Us без поиска следующего шага.",
    ],
    evidence: "Публичный живой сайт и актуальный скриншот его hero.",
    resultNote: "Подтверждённый результат — выполненный живой сайт. Метрики лидов и конверсии без источника не заявляются.",
  },
);

const scratchLab: ShowcaseProject = {
  key: "scratch-lab",
  category: "websites",
  status: "real_client",
  statusLabel: local(
    "Archived client website",
    "Архівний клієнтський сайт",
    "Архивный клиентский сайт",
  ),
  caseSlug: "scratch-lab",
  shots: ["/case-studies/scratch-lab/hero.jpg"],
  mediaFit: "cover",
  content: {
    en: {
      name: "Coastal Mobile Boat Detailing",
      type: "Website for mobile boat, car and RV detailing",
      outcome:
        "Visitors could see what the mobile team restores, where it operates and how to book from the first screen.",
      problem:
        "A broad detailing service can feel generic unless the site quickly anchors the core transformation, service area and booking action.",
      built:
        "I built a responsive service website with a detailing catalog, a service area and direct actions to call or request an appointment.",
      value:
        "The page turns a wide service menu into one coherent high-intent journey for local traffic.",
      result:
        "The delivered site presented the Myrtle Beach service area and both contact options in one place. The gallery shows the published design.",
      capabilities: [
        "Local-service website",
        "Offer hierarchy",
        "Call CTA",
        "Appointment CTA",
        "Service catalog",
        "Responsive landing",
      ],
      caption: "Homepage at launch",
    },
    ua: {
      name: "Coastal Mobile Boat Detailing",
      type: "Сайт виїзного детейлінгу човнів, авто та автобудинків",
      outcome:
        "З першого екрана клієнт міг дізнатися, що відновлює виїзна команда, де вона працює та як записатися.",
      problem:
        "Широкий detailing-сервіс легко виглядає загально, якщо сайт швидко не фіксує головну трансформацію, зону роботи та дію для бронювання.",
      built:
        "Я розробив адаптивний сайт із каталогом послуг, зоною виїзду, кнопкою дзвінка та записом на візит.",
      value:
        "Сторінка збирає широкий набір послуг в один зрозумілий high-intent маршрут для локального трафіку.",
      result:
        "На сайті клієнт бачив зону обслуговування в районі Міртл-Біч і міг одразу зателефонувати або записатися. У галереї збережено опублікований вигляд сайту.",
      capabilities: [
        "Локальний сервісний сайт",
        "Ієрархія оферу",
        "Call CTA",
        "Appointment CTA",
        "Каталог послуг",
        "Responsive landing",
      ],
      caption: "Головна сторінка на момент запуску",
    },
    ru: {
      name: "Coastal Mobile Boat Detailing",
      type: "Сайт выездного детейлинга лодок, автомобилей и автодомов",
      outcome:
        "С первого экрана клиент мог узнать, что восстанавливает выездная команда, где она работает и как записаться.",
      problem:
        "Широкий detailing-сервис легко выглядит общим, если сайт быстро не фиксирует главную трансформацию, зону работы и действие для бронирования.",
      built:
        "Я разработал адаптивный сайт с каталогом услуг, зоной выезда, кнопкой звонка и записью на визит.",
      value:
        "Страница собирает широкий набор услуг в один понятный high-intent маршрут для локального трафика.",
      result:
        "На сайте клиент видел зону обслуживания в районе Мертл-Бич и мог сразу позвонить или записаться. В галерее сохранён опубликованный вид сайта.",
      capabilities: [
        "Локальный сервисный сайт",
        "Иерархия оффера",
        "Call CTA",
        "Appointment CTA",
        "Каталог услуг",
        "Responsive landing",
      ],
      caption: "Главная страница на момент запуска",
    },
  },
  story: local(
    {
      context: "A mobile detailing business covering boats, cars and RVs around Myrtle Beach.",
      previous: "The service range needed to read as one clear commercial offer rather than a disconnected list of treatments.",
      desired: "Make the transformation, mobile-service model and next action obvious above the fold.",
      system: "A responsive page for restoration and protection services, with service details and direct booking actions.",
      flow: [
        "Arrive on the restoration & protection promise.",
        "Understand the mobile service and the core detailing options.",
        "Call immediately or schedule an appointment from the primary CTA pair.",
      ],
      evidence: "The gallery shows the client website as it appeared at launch.",
      resultNote: "From the homepage, customers could call or request an appointment.",
    },
    {
      context: "Мобільний detailing-бізнес для човнів, авто та RV у районі Myrtle Beach.",
      previous: "Широкий набір послуг потрібно було подати як одну комерційно зрозумілу пропозицію, а не як розрізнений список робіт.",
      desired: "Зробити трансформацію, мобільну модель сервісу та наступну дію очевидними вже на першому екрані.",
      system: "Адаптивна сторінка послуг із відновлення та захисту, описом робіт і прямим записом на візит.",
      flow: [
        "Потрапити на зрозумілу обіцянку restoration & protection.",
        "Зрозуміти мобільний формат і ключові detailing-послуги.",
        "Одразу зателефонувати або запланувати візит через пару головних CTA.",
      ],
      evidence: "У галереї показано клієнтський сайт на момент запуску.",
      resultNote: "Клієнти могли зателефонувати або записатися на візит із головної сторінки.",
    },
    {
      context: "Мобильный detailing-бизнес для лодок, авто и RV в районе Myrtle Beach.",
      previous: "Широкий набор услуг нужно было подать как одно коммерчески понятное предложение, а не как разрозненный список работ.",
      desired: "Сделать трансформацию, мобильную модель сервиса и следующее действие очевидными уже на первом экране.",
      system: "Адаптивная страница услуг по восстановлению и защите с описанием работ и записью на визит.",
      flow: [
        "Попасть на понятное обещание restoration & protection.",
        "Понять мобильный формат и ключевые detailing-услуги.",
        "Сразу позвонить или запланировать визит через пару главных CTA.",
      ],
      evidence: "В галерее показан клиентский сайт на момент запуска.",
      resultNote: "Клиенты могли позвонить или записаться на визит с главной страницы.",
    },
  ),
};

const aiAgent: ShowcaseProject = {
  key: "ai-agent-interface",
  category: "ai_products",
  status: "prototype",
  statusLabel: local(
    "Completed AI product prototype",
    "Завершений прототип AI-продукту",
    "Завершённый прототип AI-продукта",
  ),
  caseSlug: "ai-agent-interface",
  shots: ["/case-studies/ai-agent-interface/hero.jpg"],
  mediaFit: "contain",
  content: {
    en: {
      name: "AI Agent Voice Playground",
      type: "AI product UX · Multi-agent voice interface",
      outcome:
        "A user can understand the available agent roles, select a use case and move into a voice-first interaction without learning an AI tool first.",
      problem:
        "A multi-agent product becomes confusing when users see technology instead of clear roles and outcomes.",
      built:
        "A clean agent-selection interface with use-case cards, named agent personas and a dedicated voice-call entry point.",
      value:
        "The UX turns an abstract 'AI agents' concept into concrete jobs: support, tutoring, games and travel guidance.",
      result:
        "A completed interface prototype that makes the multi-agent model testable as a product flow. The proof shown is the actual playground UI; production usage metrics are not claimed.",
      capabilities: [
        "Agent catalog",
        "Voice-first UX",
        "Role-based agents",
        "Use-case cards",
        "Call entry flow",
        "Product prototyping",
      ],
      caption: "AI Agent Voice Playground — agent selection and call entry",
    },
    ua: {
      name: "AI Agent Voice Playground",
      type: "UX AI-продукту · Multi-agent voice interface",
      outcome:
        "Користувач розуміє доступні ролі агентів, обирає потрібний сценарій і переходить до voice-first взаємодії без необхідності спочатку розбиратися в AI-інструменті.",
      problem:
        "Multi-agent продукт швидко стає незрозумілим, коли користувач бачить технологію замість конкретних ролей і результатів.",
      built:
        "Чистий інтерфейс вибору агентів із use-case картками, іменованими персонами та окремою точкою входу в голосовий дзвінок.",
      value:
        "UX перетворює абстрактну ідею «AI-агентів» на конкретні задачі: support, навчання, ігрові сценарії та travel guidance.",
      result:
        "Завершений інтерфейсний прототип, який дозволяє перевіряти multi-agent модель як продуктовий flow. Доказ — реальний UI playground; production-метрики не заявляються.",
      capabilities: [
        "Каталог агентів",
        "Voice-first UX",
        "Рольові агенти",
        "Use-case картки",
        "Call entry flow",
        "Прототипування продукту",
      ],
      caption: "AI Agent Voice Playground — вибір агента і вхід у дзвінок",
    },
    ru: {
      name: "AI Agent Voice Playground",
      type: "UX AI-продукта · Multi-agent voice interface",
      outcome:
        "Пользователь понимает доступные роли агентов, выбирает нужный сценарий и переходит к voice-first взаимодействию без необходимости сначала разбираться в AI-инструменте.",
      problem:
        "Multi-agent продукт быстро становится непонятным, когда пользователь видит технологию вместо конкретных ролей и результатов.",
      built:
        "Чистый интерфейс выбора агентов с use-case карточками, именованными персонами и отдельной точкой входа в голосовой звонок.",
      value:
        "UX превращает абстрактную идею «AI-агентов» в конкретные задачи: support, обучение, игровые сценарии и travel guidance.",
      result:
        "Завершённый интерфейсный прототип, который позволяет проверять multi-agent модель как продуктовый flow. Доказательство — реальный UI playground; production-метрики не заявляются.",
      capabilities: [
        "Каталог агентов",
        "Voice-first UX",
        "Ролевые агенты",
        "Use-case карточки",
        "Call entry flow",
        "Прототипирование продукта",
      ],
      caption: "AI Agent Voice Playground — выбор агента и вход в звонок",
    },
  },
  story: local(
    {
      context: "A product concept for offering multiple specialised AI agents from one simple interface.",
      previous: "Agent capabilities are difficult to understand when presented as model features or technical configuration.",
      desired: "Let a user choose an agent by job-to-be-done and start a voice interaction with minimal explanation.",
      system: "A role-led catalog of agents paired with a dedicated voice-call surface.",
      flow: [
        "Scan concrete agent roles and short outcome descriptions.",
        "Select the specialist that matches the current job.",
        "Move into the voice interaction from one clear Try a call entry point.",
      ],
      evidence: "Real completed UI prototype screenshot.",
      resultNote: "Verified: the product interface and interaction direction are complete enough for UX validation. Production usage is not claimed.",
    },
    {
      context: "Концепт продукту для кількох спеціалізованих AI-агентів в одному простому інтерфейсі.",
      previous: "Можливості агентів складно зрозуміти, коли вони подані як функції моделі або технічні налаштування.",
      desired: "Дати користувачу вибір агента за задачею та швидкий старт голосової взаємодії.",
      system: "Каталог агентів, побудований навколо ролей, плюс окрема voice-call поверхня.",
      flow: [
        "Переглянути конкретні ролі агентів і короткі описи результату.",
        "Обрати спеціаліста під поточну задачу.",
        "Перейти у voice interaction через одну чітку кнопку Try a call.",
      ],
      evidence: "Реальний скриншот завершеного UI-прототипу.",
      resultNote: "Підтверджено: інтерфейс і напрям взаємодії достатньо завершені для UX-валідації. Production usage не заявляється.",
    },
    {
      context: "Концепт продукта для нескольких специализированных AI-агентов в одном простом интерфейсе.",
      previous: "Возможности агентов сложно понять, когда они представлены как функции модели или технические настройки.",
      desired: "Дать пользователю выбор агента по задаче и быстрый старт голосового взаимодействия.",
      system: "Каталог агентов, построенный вокруг ролей, плюс отдельная voice-call поверхность.",
      flow: [
        "Просмотреть конкретные роли агентов и короткие описания результата.",
        "Выбрать специалиста под текущую задачу.",
        "Перейти в voice interaction через одну понятную кнопку Try a call.",
      ],
      evidence: "Реальный скриншот завершённого UI-прототипа.",
      resultNote: "Подтверждено: интерфейс и направление взаимодействия достаточно завершены для UX-валидации. Production usage не заявляется.",
    },
  ),
};

function nftProject(
  key: string,
  shot: string,
  content: Record<Lang, CardContent>,
  story: Record<Lang, ShowcaseStory>,
): ShowcaseProject {
  return {
    key,
    category: "mobile",
    status: "concept",
    statusLabel: local(
      "Completed product concept",
      "Завершений продуктовий концепт",
      "Завершённый продуктовый концепт",
    ),
    caseSlug: key,
    shots: [shot],
    mediaFit: "contain",
    content,
    story,
  };
}

const nftDiscovery = nftProject(
  "nft-discovery",
  "/case-studies/nft-marketplace/discovery.webp",
  {
    en: {
      name: "NFT Discovery",
      type: "Mobile marketplace surface · Discovery",
      outcome: "A discovery-first mobile surface helps a collector scan what is worth opening before entering a specific asset or auction.",
      problem: "Marketplace discovery becomes noisy when collections, creators and assets compete for attention without a clear browsing hierarchy.",
      built: "A focused discovery experience using visual hierarchy, grouped marketplace content and mobile-first navigation.",
      value: "This separates the browsing problem from the transaction problem so each part of the marketplace can be validated independently.",
      result: "A completed discovery concept from the NFT marketplace product family, represented by the real interface screen. It is a product-design deliverable, not a claim of a launched marketplace.",
      capabilities: ["Marketplace discovery", "Mobile UX", "Content hierarchy", "Collection browsing", "Navigation", "Product concept"],
      caption: "NFT marketplace — discovery surface",
    },
    ua: {
      name: "NFT Discovery",
      type: "Мобільна marketplace-поверхня · Discovery",
      outcome: "Discovery-first екран допомагає колекціонеру швидко зрозуміти, що варто відкрити, ще до переходу до конкретного asset або аукціону.",
      problem: "Discovery у marketplace стає шумним, коли колекції, автори та assets конкурують за увагу без чіткої ієрархії перегляду.",
      built: "Фокусний discovery experience з візуальною ієрархією, згрупованим marketplace-контентом і mobile-first навігацією.",
      value: "Це відокремлює задачу пошуку від задачі транзакції, щоб кожну частину marketplace можна було валідовувати окремо.",
      result: "Завершений discovery-концепт із сімейства NFT marketplace, підтверджений реальним екраном інтерфейсу. Це продуктовий design deliverable, а не заява про запущений marketplace.",
      capabilities: ["Marketplace discovery", "Mobile UX", "Ієрархія контенту", "Перегляд колекцій", "Навігація", "Product concept"],
      caption: "NFT marketplace — discovery екран",
    },
    ru: {
      name: "NFT Discovery",
      type: "Мобильная marketplace-поверхность · Discovery",
      outcome: "Discovery-first экран помогает коллекционеру быстро понять, что стоит открыть, ещё до перехода к конкретному asset или аукциону.",
      problem: "Discovery в marketplace становится шумным, когда коллекции, авторы и assets конкурируют за внимание без ясной иерархии просмотра.",
      built: "Фокусный discovery experience с визуальной иерархией, сгруппированным marketplace-контентом и mobile-first навигацией.",
      value: "Это отделяет задачу поиска от задачи транзакции, чтобы каждую часть marketplace можно было валидировать отдельно.",
      result: "Завершённый discovery-концепт из семейства NFT marketplace, подтверждённый реальным экраном интерфейса. Это продуктовый design deliverable, а не заявление о запущенном marketplace.",
      capabilities: ["Marketplace discovery", "Mobile UX", "Иерархия контента", "Просмотр коллекций", "Навигация", "Product concept"],
      caption: "NFT marketplace — discovery экран",
    },
  },
  local(
    {
      context: "One product surface from a broader mobile NFT marketplace concept.",
      previous: "Discovery, collection context and bidding were bundled into one story, making the actual UX problems hard to judge.",
      desired: "Treat discovery as its own job: help a user find something worth opening.",
      system: "A dedicated mobile discovery surface with grouped content and strong visual hierarchy.",
      flow: ["Enter the marketplace discovery surface.", "Scan grouped collections / assets.", "Open the item or collection that earns attention."],
      evidence: "Real completed discovery screen from the original marketplace concept.",
      resultNote: "Verified design output: one complete discovery surface. Launch and marketplace traction are not claimed.",
    },
    {
      context: "Одна продуктова поверхня з ширшого концепту мобільного NFT marketplace.",
      previous: "Discovery, контекст колекцій і bidding були змішані в одну історію, через що окремі UX-задачі складно оцінити.",
      desired: "Розглядати discovery як окрему задачу: допомогти користувачу знайти те, що варто відкрити.",
      system: "Окрема мобільна discovery-поверхня зі згрупованим контентом і сильною візуальною ієрархією.",
      flow: ["Увійти в discovery поверхню marketplace.", "Переглянути згруповані колекції / assets.", "Відкрити item або колекцію, що привернула увагу."],
      evidence: "Реальний завершений discovery-екран з початкового marketplace-концепту.",
      resultNote: "Підтверджений design output: одна завершена discovery-поверхня. Запуск і traction marketplace не заявляються.",
    },
    {
      context: "Одна продуктовая поверхность из более широкого концепта мобильного NFT marketplace.",
      previous: "Discovery, контекст коллекций и bidding были смешаны в одну историю, из-за чего отдельные UX-задачи сложно оценить.",
      desired: "Рассматривать discovery как отдельную задачу: помочь пользователю найти то, что стоит открыть.",
      system: "Отдельная мобильная discovery-поверхность со сгруппированным контентом и сильной визуальной иерархией.",
      flow: ["Войти в discovery-поверхность marketplace.", "Просмотреть сгруппированные коллекции / assets.", "Открыть item или коллекцию, которая заслужила внимание."],
      evidence: "Реальный завершённый discovery-экран из исходного marketplace-концепта.",
      resultNote: "Подтверждённый design output: одна завершённая discovery-поверхность. Запуск и traction marketplace не заявляются.",
    },
  ),
);

const nftCollections = nftProject(
  "nft-collections",
  "/case-studies/nft-marketplace/collections.webp",
  {
    en: {
      name: "NFT Collections",
      type: "Mobile marketplace surface · Collections",
      outcome: "A collection-focused screen gives assets a coherent context instead of presenting every item as an isolated tile.",
      problem: "Collectors need to understand a group before drilling into a single asset; flat grids lose that relationship.",
      built: "A collection browsing surface that groups assets into a recognisable marketplace structure and keeps the mobile hierarchy compact.",
      value: "The collection becomes a navigable product object, not just a visual label above a grid.",
      result: "A completed collections concept with a real interface screen from the marketplace prototype. No ownership, volume or transaction metric is invented.",
      capabilities: ["Collection UX", "Asset grouping", "Mobile hierarchy", "Marketplace UI", "Navigation", "Product concept"],
      caption: "NFT marketplace — collections surface",
    },
    ua: {
      name: "NFT Collections",
      type: "Мобільна marketplace-поверхня · Collections",
      outcome: "Екран колекцій дає assets цілісний контекст замість того, щоб показувати кожен item як ізольовану плитку.",
      problem: "Колекціонеру потрібно зрозуміти групу до переходу в окремий asset; плоскі grid-екрани втрачають цей зв’язок.",
      built: "Поверхня перегляду колекцій, що групує assets у зрозумілу marketplace-структуру і зберігає компактну mobile hierarchy.",
      value: "Колекція стає навігаційним продуктовим об’єктом, а не просто підписом над grid.",
      result: "Завершений collections-концепт із реальним екраном marketplace-прототипу. Ownership, volume або transaction metrics не вигадуються.",
      capabilities: ["Collection UX", "Групування assets", "Mobile hierarchy", "Marketplace UI", "Навігація", "Product concept"],
      caption: "NFT marketplace — collections екран",
    },
    ru: {
      name: "NFT Collections",
      type: "Мобильная marketplace-поверхность · Collections",
      outcome: "Экран коллекций даёт assets цельный контекст вместо того, чтобы показывать каждый item как изолированную плитку.",
      problem: "Коллекционеру нужно понять группу до перехода в отдельный asset; плоские grid-экраны теряют эту связь.",
      built: "Поверхность просмотра коллекций, которая группирует assets в понятную marketplace-структуру и сохраняет компактную mobile hierarchy.",
      value: "Коллекция становится навигационным продуктовым объектом, а не просто подписью над grid.",
      result: "Завершённый collections-концепт с реальным экраном marketplace-прототипа. Ownership, volume или transaction metrics не придумываются.",
      capabilities: ["Collection UX", "Группировка assets", "Mobile hierarchy", "Marketplace UI", "Навигация", "Product concept"],
      caption: "NFT marketplace — collections экран",
    },
  },
  local(
    {
      context: "The collection-management and browsing surface of the mobile NFT marketplace concept.",
      previous: "A flat asset grid does not explain the relationship between items or give a collection enough product identity.",
      desired: "Make the collection itself understandable and easy to browse before an individual asset is opened.",
      system: "A compact mobile collection view with clear grouping and navigation.",
      flow: ["Open the collections surface.", "Choose a collection with enough visual context.", "Browse grouped items and move deeper only when relevant."],
      evidence: "Real completed collections screen from the original marketplace concept.",
      resultNote: "Verified design output: a complete collections surface. No commercial marketplace outcome is asserted.",
    },
    {
      context: "Поверхня колекцій і перегляду з мобільного NFT marketplace-концепту.",
      previous: "Плоский grid assets не пояснює зв’язок між items і не дає колекції достатньої продуктової ідентичності.",
      desired: "Зробити саму колекцію зрозумілою та зручною для перегляду до відкриття окремого asset.",
      system: "Компактний mobile collection view з чітким групуванням і навігацією.",
      flow: ["Відкрити collections поверхню.", "Обрати колекцію з достатнім візуальним контекстом.", "Переглянути згруповані items і переходити глибше лише за потреби."],
      evidence: "Реальний завершений collections-екран з початкового marketplace-концепту.",
      resultNote: "Підтверджений design output: завершена collections-поверхня. Комерційний результат marketplace не заявляється.",
    },
    {
      context: "Поверхность коллекций и просмотра из мобильного NFT marketplace-концепта.",
      previous: "Плоский grid assets не объясняет связь между items и не даёт коллекции достаточной продуктовой идентичности.",
      desired: "Сделать саму коллекцию понятной и удобной для просмотра до открытия отдельного asset.",
      system: "Компактный mobile collection view с ясной группировкой и навигацией.",
      flow: ["Открыть collections-поверхность.", "Выбрать коллекцию с достаточным визуальным контекстом.", "Просмотреть сгруппированные items и переходить глубже только при необходимости."],
      evidence: "Реальный завершённый collections-экран из исходного marketplace-концепта.",
      resultNote: "Подтверждённый design output: завершённая collections-поверхность. Коммерческий результат marketplace не заявляется.",
    },
  ),
);

const nftAuction = nftProject(
  "nft-auction",
  "/case-studies/nft-marketplace/auction.webp",
  {
    en: {
      name: "NFT Live Auction",
      type: "Mobile marketplace surface · Live bidding",
      outcome: "The highest-friction marketplace moment is reduced to one focused screen: current state, time pressure, bid context and a clear action.",
      problem: "A bidding flow fails quickly when price, countdown, history and the place-bid action compete instead of forming one decision hierarchy.",
      built: "A mobile live-auction concept with current bid context, countdown, bid history and a focused place-bid interaction.",
      value: "The transaction moment is treated as a dedicated product flow rather than another content card.",
      result: "A completed live-auction interaction concept shown through the real auction screen. The result is UX proof, not a claim that real-money bidding was launched.",
      capabilities: ["Live bidding UX", "Auction state", "Countdown", "Bid history", "Transaction flow", "Mobile UI"],
      caption: "NFT marketplace — live auction and place-bid flow",
    },
    ua: {
      name: "NFT Live Auction",
      type: "Мобільна marketplace-поверхня · Live bidding",
      outcome: "Найскладніший момент marketplace зведено до одного фокусного екрана: поточний стан, час, контекст bid і чітка дія.",
      problem: "Bidding-flow швидко ламається, коли ціна, countdown, історія та place-bid дія конкурують між собою замість однієї decision hierarchy.",
      built: "Мобільний live-auction концепт із контекстом поточного bid, countdown, bid history та фокусною place-bid взаємодією.",
      value: "Транзакційний момент розглядається як окремий product flow, а не як ще одна контентна картка.",
      result: "Завершений live-auction interaction concept, показаний реальним auction-екраном. Результат — UX proof, а не твердження про запущені real-money торги.",
      capabilities: ["Live bidding UX", "Auction state", "Countdown", "Bid history", "Transaction flow", "Mobile UI"],
      caption: "NFT marketplace — live auction і place-bid flow",
    },
    ru: {
      name: "NFT Live Auction",
      type: "Мобильная marketplace-поверхность · Live bidding",
      outcome: "Самый сложный момент marketplace сведён к одному фокусному экрану: текущее состояние, время, контекст bid и понятное действие.",
      problem: "Bidding-flow быстро ломается, когда цена, countdown, история и place-bid действие конкурируют между собой вместо одной decision hierarchy.",
      built: "Мобильный live-auction концепт с контекстом текущего bid, countdown, bid history и фокусным place-bid взаимодействием.",
      value: "Транзакционный момент рассматривается как отдельный product flow, а не как ещё одна контентная карточка.",
      result: "Завершённый live-auction interaction concept, показанный реальным auction-экраном. Результат — UX proof, а не утверждение о запущенных real-money торгах.",
      capabilities: ["Live bidding UX", "Auction state", "Countdown", "Bid history", "Transaction flow", "Mobile UI"],
      caption: "NFT marketplace — live auction и place-bid flow",
    },
  },
  local(
    {
      context: "The transaction surface of the same mobile NFT marketplace concept.",
      previous: "Auction information can become visually noisy at exactly the moment a user needs certainty before acting.",
      desired: "Put the current bid, remaining time, recent bid context and action into one decision hierarchy.",
      system: "A dedicated live-auction screen and place-bid interaction.",
      flow: ["Open the live auction and understand the current state.", "Check time and recent bid context.", "Move into one focused place-bid action."],
      evidence: "Real completed auction screen from the original marketplace concept.",
      resultNote: "Verified design output: a complete auction interaction direction. Real-money launch or transaction volume is not claimed.",
    },
    {
      context: "Транзакційна поверхня того самого мобільного NFT marketplace-концепту.",
      previous: "Auction-інформація легко стає візуально шумною саме тоді, коли користувачу потрібна впевненість перед дією.",
      desired: "Зібрати current bid, час, недавній bid-контекст і дію в одну decision hierarchy.",
      system: "Окремий live-auction екран і place-bid interaction.",
      flow: ["Відкрити live auction і зрозуміти поточний стан.", "Перевірити час і recent bid context.", "Перейти до однієї фокусної place-bid дії."],
      evidence: "Реальний завершений auction-екран із початкового marketplace-концепту.",
      resultNote: "Підтверджений design output: завершений напрям auction interaction. Real-money launch або transaction volume не заявляються.",
    },
    {
      context: "Транзакционная поверхность того же мобильного NFT marketplace-концепта.",
      previous: "Auction-информация легко становится визуально шумной именно тогда, когда пользователю нужна уверенность перед действием.",
      desired: "Собрать current bid, время, недавний bid-контекст и действие в одну decision hierarchy.",
      system: "Отдельный live-auction экран и place-bid interaction.",
      flow: ["Открыть live auction и понять текущее состояние.", "Проверить время и recent bid context.", "Перейти к одному фокусному place-bid действию."],
      evidence: "Реальный завершённый auction-экран из исходного marketplace-концепта.",
      resultNote: "Подтверждённый design output: завершённое направление auction interaction. Real-money launch или transaction volume не заявляются.",
    },
  ),
);

let projects: ShowcaseProject[] = PORTFOLIO
  .filter((p) => p.key !== "nft-marketplace")
  .map(withCase);

projects = replaceProject(projects, "portfolio-enquiry-intake", {
  story: local(
    {
      context: "My portfolio shares the same site as my project contact form. A visitor can explore case studies and reach the contact section in any of the three site languages.",
      previous: "A portfolio link alone left the visitor to start a new conversation elsewhere. I wanted them to be able to leave a brief with their question and contact details while the project was still fresh in mind.",
      desired: "Keep the form short and give the visitor a clear outcome on every attempt.",
      system: "I built the frontend and connected it to n8n. The workflow checks the submission, writes it to Google Sheets, then returns a receipt with the enquiry ID. The browser shows confirmation only after it receives that receipt.",
      flow: [
        "Review a case and open the contact section in your language.",
        "Enter your name, email and project description. A second contact method is optional.",
        "Send the form and wait for confirmation. If delivery fails, review the message and try again with the same draft.",
      ],
      evidence: "The screenshots show the live contact section on desktop and mobile. A controlled test on the public site matched the browser confirmation to the saved enquiry record.",
      resultNote: "The site and form are public and working. The case covers the implemented intake path and its verified delivery behavior.",
    },
    {
      context: "Портфоліо й форма проєктних заявок розміщені на моєму сайті. Відвідувач може переглянути кейси й відкрити контакти однією з трьох мов сайту.",
      previous: "Посилання на портфоліо саме по собі залишає відвідувачу окремий крок для початку розмови. Я хотів дати можливість описати проєкт і залишити контакт прямо на сайті.",
      desired: "Зробити форму короткою й показувати відвідувачу зрозумілий результат кожної спроби.",
      system: "Розробив інтерфейс і під’єднав n8n. Процес перевіряє дані, записує заявку в Google Sheets і повертає квитанцію з її ідентифікатором. Браузер показує підтвердження після отримання цієї квитанції.",
      flow: [
        "Перегляньте кейс і відкрийте контакти своєю мовою.",
        "Вкажіть ім’я, електронну пошту й опис проєкту. Додатковий контакт необов’язковий.",
        "Надішліть форму й дочекайтеся підтвердження. Якщо сталася помилка, прочитайте повідомлення і повторіть спробу зі збереженим текстом.",
      ],
      evidence: "На знімках — діючий розділ контактів на комп’ютері й телефоні. Контрольна перевірка на робочому сайті підтвердила відповідність між повідомленням у браузері та збереженою заявкою.",
      resultNote: "Сайт і форма працюють публічно. Кейс описує реалізований шлях заявки й перевірену доставку.",
    },
    {
      context: "Портфолио и форма проектных заявок находятся на моём сайте. Посетитель может посмотреть кейсы и открыть контакты на любом из трёх языков сайта.",
      previous: "Одной ссылки на портфолио мало, чтобы начать разговор. Я хотел дать посетителю возможность описать проект и оставить контакты сразу на сайте.",
      desired: "Сделать форму короткой и показать понятный результат каждой попытки отправки.",
      system: "Разработал интерфейс и подключил n8n. Процесс проверяет данные, записывает заявку в Google Sheets и возвращает квитанцию с её идентификатором. Браузер показывает подтверждение после получения этой квитанции.",
      flow: [
        "Посмотрите кейс и откройте контакты на своём языке.",
        "Введите имя, почту и описание проекта. Дополнительный контакт можно указать по желанию.",
        "Отправьте форму и дождитесь подтверждения. Если возникла ошибка, прочитайте сообщение и повторите попытку с сохранённым текстом.",
      ],
      evidence: "На снимках рабочий раздел контактов на компьютере и телефоне. При контрольной проверке на действующем сайте подтверждение в браузере совпало с сохранённой заявкой.",
      resultNote: "Сайт и форма открыты для посетителей. Кейс описывает реализованный путь заявки и проверенную доставку.",
    },
  ),
});

projects = replaceProject(projects, "turbotaai", {
  story: local(
    {
      context: "TurbotaAI brings emotional support, astrology, numerology and style into a single web product in English, Ukrainian and Russian.",
      previous: "Each direction has its own prompts and inputs. The product needed to preserve those differences while keeping onboarding, trial access and consent consistent.",
      desired: "Let a visitor open daily content immediately, then choose where to start and decide which details to share when personalizing the experience.",
      system: "I built the public web routes and account workflows in Next.js, with server-side access rules for trials and Premium. The separate operations console gives authorized staff access to activation, subscription status, AI usage and support lookups.",
      flow: [
        "Open Today as a guest and browse the daily card or one of the four directions.",
        "Follow the personalization prompt to sign in and add the details needed for that direction.",
        "Compare free access with Premium on the pricing page.",
        "Manage permissions and account data from the profile. Staff use a separate console to monitor usage and support accounts.",
      ],
      evidence: "Public screenshots from the live home, Today and pricing pages.",
      resultNote: "The public web product is live and remains in active development.",
    },
    {
      context: "TurbotaAI об’єднує емоційну підтримку, астрологію, нумерологію та стиль в одному вебпродукті українською, англійською й російською.",
      previous: "Кожен напрям має свої запити й потрібні йому дані. Водночас для всіх напрямів потрібні спільні правила входу, пробного доступу та згоди.",
      desired: "Дати відвідувачу доступ до щоденного контенту відразу, а далі — можливість обрати напрям і вирішити, які дані надати для персоналізації.",
      system: "Я розробив публічні сторінки й сценарії акаунта на Next.js із серверними правилами пробного й Premium-доступу. Окрема консоль дає уповноваженим працівникам дані про активацію, статус підписки, використання AI та пошук акаунтів для підтримки.",
      flow: [
        "Відкрити «Сьогодні» як гість і переглянути картку дня або один із чотирьох напрямів.",
        "Перейти до входу за підказкою персоналізації й надати потрібні для обраного напряму дані.",
        "Порівняти безплатний доступ із Premium на сторінці тарифів.",
        "Керувати дозволами й даними у профілі. Команда користується окремою консоллю для моніторингу й підтримки.",
      ],
      evidence: "Кадри з робочих публічних сторінок головної, розділу «Сьогодні» й тарифів.",
      resultNote: "Публічний вебпродукт працює й далі розвивається.",
    },
    {
      context: "TurbotaAI объединяет эмоциональную поддержку, астрологию, нумерологию и стиль в одном веб-продукте на русском, украинском и английском.",
      previous: "У каждого направления свои запросы и необходимые данные. Вместе с этим для всех направлений нужны общие правила входа, пробного доступа и согласия.",
      desired: "Открыть посетителю ежедневный контент сразу, затем дать выбрать направление и решить, какие данные предоставить для персонализации.",
      system: "Я разработал публичные страницы и сценарии аккаунта на Next.js с серверными правилами пробного и Premium-доступа. Отдельная консоль даёт сотрудникам с нужной ролью доступ к данным об активации, статусе подписок, использовании AI и поиску аккаунтов для поддержки.",
      flow: [
        "Открыть «Сегодня» без входа и посмотреть карточку дня или одно из четырёх направлений.",
        "Перейти ко входу по подсказке персонализации и добавить данные для выбранного направления.",
        "Сравнить бесплатный доступ с Premium на странице тарифов.",
        "Управлять разрешениями и данными в профиле. Команда пользуется отдельной консолью для мониторинга и поддержки.",
      ],
      evidence: "Кадры с рабочих публичных страниц главной, раздела «Сегодня» и тарифов.",
      resultNote: "Публичный веб-продукт работает и продолжает развиваться.",
    },
  ),
});

projects = replaceProject(projects, "nikas-restaurant-assistant", {
  story: local(
    {
      context: "A conversational prototype for the Nikas Restaurant use case, preserved as an original Voiceflow export.",
      previous: "A guest may want to look at a menu or ask a more specific question about a table. Those requests need different paths.",
      desired: "Give the guest two obvious starting points and make room for questions outside the initial options.",
      system: "The main dialogue contains the menu and reservation topics. The export also includes the Ask Clarifying Question, Knowledge Base and Reduce Hallucinations components.",
      flow: ["Open the guest dialogue.", "Choose a menu path or ask a table question.", "Use the assistant components when the question needs clarification or reference information."],
      evidence: "Three views reconstructed from the original Voiceflow project export. The gallery shows the guest paths, assistant components and documented export contents.",
      resultNote: "The guest assistant brings menu navigation and table questions into one conversation. The original workflow includes an API action for reservation requests.",
    },
    {
      context: "Діалоговий прототип для сценарію ресторану Nikas, збережений в оригінальному експорті Voiceflow.",
      previous: "Гість може переглядати меню або ставити конкретне запитання про столик. Для цих запитів потрібні різні шляхи.",
      desired: "Дати гостю два зрозумілі варіанти на початку і можливість поставити запитання поза початковими варіантами.",
      system: "Основний діалог містить теми меню й бронювання. В експорті є компоненти Ask Clarifying Question, Knowledge Base та Reduce Hallucinations.",
      flow: ["Відкрити діалог для гостей.", "Перейти до меню або запитати про столик.", "Коли потрібне уточнення або довідкова інформація, скористатися компонентами асистента."],
      evidence: "Три схеми відтворено за оригінальним експортом Voiceflow. Галерея показує шляхи гостя, компоненти асистента й вміст експорту.",
      resultNote: "Асистент поєднує перегляд меню й запитання про столики в одному діалозі. В оригінальній схемі передбачено дію API для запитів на бронювання.",
    },
    {
      context: "Диалоговый прототип для сценария ресторана Nikas, сохранённый в оригинальном экспорте Voiceflow.",
      previous: "Гость может смотреть меню или задать конкретный вопрос о столике. Для этих запросов нужны разные пути.",
      desired: "Дать гостю два понятных варианта на входе и возможность задать вопрос вне них.",
      system: "Основной диалог содержит темы меню и бронирования. В экспорте есть компоненты Ask Clarifying Question, Knowledge Base и Reduce Hallucinations.",
      flow: ["Открыть диалог для гостей.", "Перейти к меню или задать вопрос о столике.", "При необходимости уточнить запрос или найти справочную информацию с помощью компонентов ассистента."],
      evidence: "Три схемы восстановлены по оригинальному экспорту Voiceflow. Галерея показывает пути гостя, компоненты ассистента и состав экспорта.",
      resultNote: "Ассистент объединяет просмотр меню и вопросы о столиках в одном диалоге. В исходной схеме предусмотрено действие API для запросов на бронь.",
    },
  ),
});

projects = replaceProject(projects, "tutorivo", {
  story: local(
    {
      context: "Tutorivo is an education marketplace for students and families looking for an online tutor, and for teachers who want to join the platform.",
      previous: "Offers and applications were scattered across conversations and spreadsheets. Comparing teachers and keeping track of the information they submitted took manual work.",
      desired: "Give families enough information to choose a tutor on their own, and give the operator a consistent way to review applications before publication.",
      system: "I developed Tutorivo as a full-stack marketplace. The public catalogue and tutor profiles serve students. Applications go into a separate review workflow, where the operator decides which profiles appear in the catalogue.",
      flow: [
        "A student filters the catalogue by subject or language.",
        "They open a tutor profile to check the teaching focus, experience and lesson price before choosing a lesson package and requesting a time.",
        "A tutor submits an application with teaching subjects, languages, experience, rates and availability.",
        "The operator reviews the application and publishes the profile after approval.",
      ],
      evidence: "The gallery shows the marketplace home page, tutor catalogue and application form. The live link opens the public product.",
      resultNote: "The launched MVP brings tutor discovery, lesson enquiries and application review together in one product.",
    },
    {
      context: "Tutorivo — освітній маркетплейс для учнів і родин, які шукають онлайн-репетитора, та викладачів, які хочуть приєднатися до платформи.",
      previous: "Пропозиції й анкети зберігалися в окремих діалогах і таблицях. Порівнювати викладачів та впорядковувати інформацію з анкет доводилося вручну.",
      desired: "Дати родинам достатньо інформації для самостійного вибору репетитора, а оператору — єдиний процес перевірки анкет перед публікацією.",
      system: "Я розробив Tutorivo як full-stack маркетплейс. Для учнів доступні відкритий каталог і профілі. Анкети викладачів надходять на окрему перевірку, після якої оператор вирішує, які профілі з’являться в каталозі.",
      flow: [
        "Учень фільтрує каталог за предметом або мовою.",
        "Відкриває профіль, переглядає напрям викладання, досвід і ціну, обирає пакет уроків та залишає запит на час.",
        "Репетитор заповнює анкету й зазначає предмети, мови, досвід, вартість уроку та доступність.",
        "Оператор перевіряє анкету й публікує профіль після схвалення.",
      ],
      evidence: "У галереї показано головну сторінку, каталог і форму анкети. За посиланням відкривається публічний продукт.",
      resultNote: "Запущений MVP об’єднує пошук репетитора, запити на уроки й перевірку анкет викладачів в одному продукті.",
    },
    {
      context: "Tutorivo — образовательный маркетплейс для учеников и семей, которые ищут онлайн-репетитора, и преподавателей, которые хотят присоединиться к платформе.",
      previous: "Предложения и анкеты хранились в отдельных переписках и таблицах. Сравнивать преподавателей и упорядочивать данные из анкет приходилось вручную.",
      desired: "Дать семьям достаточно информации для самостоятельного выбора репетитора, а оператору — единый процесс проверки анкет перед публикацией.",
      system: "Я разработал Tutorivo как full-stack маркетплейс. Для учеников доступны открытый каталог и профили. Анкеты преподавателей поступают на отдельную проверку, после которой оператор решает, какие профили появятся в каталоге.",
      flow: [
        "Ученик фильтрует каталог по предмету или языку.",
        "Открывает профиль, смотрит направление преподавания, опыт и цену, выбирает пакет занятий и оставляет запрос на время.",
        "Репетитор заполняет анкету и указывает предметы, языки, опыт, стоимость урока и доступное время.",
        "Оператор проверяет анкету и публикует профиль после одобрения.",
      ],
      evidence: "В галерее показаны главная страница, каталог и форма анкеты. По ссылке открывается публичный продукт.",
      resultNote: "Запущенный MVP объединяет поиск репетитора, запросы на занятия и проверку анкет преподавателей в одном продукте.",
    },
  ),
});

projects = replaceProject(projects, "appointment-booking-automation", {
  story: local(
    {
      context: "A booking assistant built for an independent aesthetics practice. The practice is anonymized in this case.",
      previous: "Choosing a time and handling a change are two steps in the same client journey. The design needed to account for both.",
      desired: "Guide a client through an appointment conversation and handle each subsequent change as a calendar event.",
      system: "Voiceflow holds the conversation. One n8n workflow runs the assistant. A second listens for Cal.com webhooks and routes booking events by type.",
      flow: [
        "The client starts an appointment conversation.",
        "A booking creates a calendar event and enters the creation branch.",
        "A change of time enters the reschedule branch. A cancellation enters its own branch.",
      ],
      evidence: "One original Voiceflow export and two original n8n exports were verified against the project archive. The gallery shows the reconstructed demo with sample data.",
      resultNote: "The public demo lets you verify how the state changes as you create, move and cancel a sample booking.",
    },
    {
      context: "Асистент запису для незалежного косметологічного кабінету. Назву кабінету в кейсі приховано.",
      previous: "Вибір часу й подальша зміна запису є частинами одного клієнтського сценарію. Важливо було врахувати обидві.",
      desired: "Спрямувати клієнта в діалозі про прийом і обробляти кожну наступну зміну як подію календаря.",
      system: "Voiceflow веде діалог. Один сценарій n8n відповідає за асистента, другий слухає вебхуки Cal.com і розподіляє події за типом.",
      flow: [
        "Клієнт починає діалог про запис.",
        "Створення запису викликає подію календаря й запускає відповідну гілку.",
        "Зміна часу й скасування запускають окремі гілки.",
      ],
      evidence: "Інтерактивний приклад відтворює створення, перенесення і скасування запису на тестових даних за схемами Voiceflow та n8n.",
      resultNote: "У відкритому демо можна перевірити, як змінюється стан після створення, перенесення та скасування тестового запису.",
    },
    {
      context: "Ассистент записи для независимого косметологического кабинета. Название кабинета в кейсе скрыто.",
      previous: "Выбор времени и последующее изменение записи входят в один клиентский сценарий. Важно было учесть оба шага.",
      desired: "Помочь клиенту в диалоге о приёме и обрабатывать каждое последующее изменение как событие календаря.",
      system: "Voiceflow ведёт диалог. Один сценарий n8n отвечает за ассистента, второй слушает вебхуки Cal.com и распределяет события по типу.",
      flow: [
        "Клиент начинает диалог о записи.",
        "Создание записи вызывает событие календаря и запускает соответствующую ветку.",
        "Изменение времени и отмена запускают отдельные ветки.",
      ],
      evidence: "Интерактивный пример показывает создание, перенос и отмену записи на тестовых данных по исходным схемам Voiceflow и n8n.",
      resultNote: "В открытом демо можно проверить, как меняется состояние после создания, переноса и отмены тестовой записи.",
    },
  ),
});

projects = replaceProject(projects, "dating-crm", {
  caseSlug: "dating-crm",
  shots: ["/case-studies/dating-crm/hero.jpg"],
  mediaFit: "cover",
  content: datingContent,
  story: datingStory,
});

projects = replaceProject(projects, "leather-clinic", {
  caseSlug: "leather-clinic",
  shots: ["/case-studies/leather-clinic/hero.jpg"],
  mediaFit: "cover",
  content: leatherContent,
  story: leatherStory,
});

projects = replaceProject(projects, "ikorka", {
  caseSlug: "ikorka",
  shots: ["/case-studies/iko/hero.webp"],
  mediaFit: "cover",
  story: local(
    {
      context: "A voice-assistant prototype for handling incoming calls with natural speech.",
      previous: "A caller can be lost when a business cannot answer immediately or route the request to the right place.",
      desired: "Answer naturally, capture the intent and route the caller without forcing a menu-tree experience.",
      system: "A voice AI prototype with a real recorded conversation sample.",
      flow: ["Incoming call reaches the assistant.", "The assistant answers in natural speech and understands the request.", "The call is routed according to the intended path."],
      evidence: "Project photo plus the real audio recording embedded on this case page.",
      resultNote: "Verified proof is the working voice prototype and its real audio demo; no call-volume or commercial metric is invented.",
    },
    {
      context: "Прототип голосового асистента для обробки вхідних дзвінків природним мовленням.",
      previous: "Дзвінок можна втратити, коли бізнес не встигає відповісти або швидко скерувати запит.",
      desired: "Відповідати природно, розуміти намір і маршрутизувати дзвінок без складного menu-tree.",
      system: "Voice AI прототип із реальним записом розмови.",
      flow: ["Вхідний дзвінок потрапляє асистенту.", "Асистент відповідає природним мовленням і розуміє запит.", "Дзвінок маршрутизується за потрібним сценарієм."],
      evidence: "Фото проєкту плюс реальний аудіозапис, вбудований у сторінку кейсу.",
      resultNote: "Підтвердження — робочий voice-прототип і його реальне аудіодемо; метрики дзвінків або комерційні цифри не вигадуються.",
    },
    {
      context: "Прототип голосового ассистента для обработки входящих звонков естественной речью.",
      previous: "Звонок можно потерять, когда бизнес не успевает ответить или быстро направить запрос.",
      desired: "Отвечать естественно, понимать намерение и маршрутизировать звонок без сложного menu-tree.",
      system: "Voice AI прототип с реальной записью разговора.",
      flow: ["Входящий звонок попадает ассистенту.", "Ассистент отвечает естественной речью и понимает запрос.", "Звонок маршрутизируется по нужному сценарию."],
      evidence: "Фото проекта плюс реальная аудиозапись, встроенная в страницу кейса.",
      resultNote: "Подтверждение — рабочий voice-прототип и его реальное аудиодемо; метрики звонков или коммерческие цифры не придумываются.",
    },
  ),
});

projects = replaceProject(projects, "visibilityos-audit", {
  mediaFit: "contain",
  story: {
    "en": {
      "context": "VisibilityOS is my own web product for turning website observations into improvements that can be checked again.",
      "previous": "Audit findings often live in a document, away from the URL and evidence needed to decide what to fix.",
      "desired": "Give a site owner a repeatable path from a public URL to a task with a clear reason, priority and next step.",
      "system": "I developed the Next.js front end and the TypeScript server flow. The scan reads page signals, evaluates rules and groups potential work by priority and effort.",
      "flow": [
        "Choose the public site and a service topic to check.",
        "The API reads the homepage and a limited sample of related pages.",
        "Rules turn an observable finding into a task with evidence and a suggested action.",
        "Run a fresh scan after the change and compare the evidence."
      ],
      "evidence": "The gallery pairs an actual public-page screenshot with two formatted views of a live API run against my own website. The private workspace has a separate sign-in.",
      "resultNote": "The recorded sample covers five pages, 12 passed checks and one flagged check. The run describes public signals observed on that date."
    },
    "ua": {
      "context": "VisibilityOS — мій вебпродукт, що перетворює спостереження за сайтом на зміни, які можна перевірити повторно.",
      "previous": "Зауваження з аудиту часто залишаються в документі окремо від адреси сторінки й доказів, потрібних для рішення.",
      "desired": "Дати власнику відтворюваний шлях від відкритої адреси до завдання з причиною, пріоритетом і наступною дією.",
      "system": "Розробив фронтенд на Next.js і серверний процес на TypeScript. Сканер читає сигнали сторінок, застосовує правила та групує завдання за пріоритетом і складністю.",
      "flow": [
        "Вказати адресу відкритого сайту й напрям послуг для перевірки.",
        "API читає головну сторінку й обмежену вибірку пов’язаних сторінок.",
        "Спостереження стає завданням із доказами й дією.",
        "Після змін повторити перевірку й порівняти результати."
      ],
      "evidence": "У галереї є скриншот відкритої сторінки й два подання результату реального виклику API для мого сайту. Для робочого кабінету потрібен окремий вхід.",
      "resultNote": "У зафіксованій вибірці п’ять сторінок пройшли 12 перевірок і дали одне зауваження. Це результат спостереження на дату запуску."
    },
    "ru": {
      "context": "VisibilityOS — мой веб-продукт для поиска улучшений сайта и повторной проверки результата.",
      "previous": "Замечания аудита часто остаются в документе отдельно от ссылок и фактов, нужных для решения.",
      "desired": "Дать владельцу повторяемый путь от публичного адреса до задачи с причиной, приоритетом и следующим действием.",
      "system": "Разработал фронтенд на Next.js и серверный процесс на TypeScript. Сканер читает сигналы страниц, применяет правила и группирует задачи по приоритету и трудоёмкости.",
      "flow": [
        "Указать адрес открытого сайта и тему услуги для проверки.",
        "API читает главную и ограниченную выборку связанных страниц.",
        "Наблюдение превращается в задачу с доказательством и предлагаемым действием.",
        "После изменений повторить запуск и сравнить наблюдения."
      ],
      "evidence": "В галерее показаны скриншот публичной страницы и два представления результата реального вызова API для моего сайта. Для рабочего кабинета предусмотрен отдельный вход.",
      "resultNote": "В сохранённой выборке из пяти страниц — 12 успешно пройденных проверок и одно замечание. Результат отражает наблюдения на дату запуска."
    }
  },
});

projects.push(scratchLab, aiAgent, nftDiscovery, nftCollections, nftAuction);

const priority = [
  "turbotaai",
  "tutorivo",
  "status-auto",
  "dating-crm",
  "leather-clinic",
  "scratch-lab",
  "ikorka",
  "ai-agent-interface",
];

const rank = new Map(priority.map((key, index) => [key, index]));

export const SHOWCASE_PORTFOLIO = [...projects].sort((a, b) => {
  const ar = rank.get(a.key);
  const br = rank.get(b.key);
  if (ar != null || br != null) return (ar ?? 999) - (br ?? 999);
  return 0;
});

export const SHOWCASE_FEATURED = SHOWCASE_PORTFOLIO.filter((p) =>
  priority.slice(0, 6).includes(p.key),
);

export const SHOWCASE_CASE_SLUGS = SHOWCASE_PORTFOLIO.map((p) => p.caseSlug);

export function getShowcaseProject(slug: string): ShowcaseProject | undefined {
  return SHOWCASE_PORTFOLIO.find((p) => p.caseSlug === slug);
}

export function showcaseWorkJsonLd(lang: Lang) {
  const base = langHref(lang);
  const localeBase = base === "/" ? "" : base;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      lang === "ru"
        ? "Избранные проекты Vlad Kuzmenko"
        : lang === "ua"
          ? "Вибрані проєкти Vlad Kuzmenko"
          : "Selected work by Vlad Kuzmenko",
    url: `${SITE.url}${localeBase}/work`,
    hasPart: SHOWCASE_PORTFOLIO.map((p) => ({
      "@type": "CreativeWork",
      name: p.content[lang].name,
      url: `${SITE.url}${localeBase}/work/${p.caseSlug}`,
      image: p.shots[0] ? `${SITE.url}${p.shots[0]}` : undefined,
      description: p.content[lang].outcome,
    })),
  };
}

export function showcaseCaseJsonLd(lang: Lang, project: ShowcaseProject) {
  const base = langHref(lang);
  const localeBase = base === "/" ? "" : base;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.content[lang].name,
    description: project.content[lang].outcome,
    url: `${SITE.url}${localeBase}/work/${project.caseSlug}`,
    image: project.shots.map((shot) => `${SITE.url}${shot}`),
    creator: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
  };
}
