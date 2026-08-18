"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CircleDollarSign,
  Flame,
  LayoutDashboard,
  MessageSquareText,
  Network,
  Rocket,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  Workflow,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";

const TRACK_ICONS: LucideIcon[] = [Workflow, Target, BookOpenCheck, LayoutDashboard];
const LOOP_ICONS: LucideIcon[] = [BookOpenCheck, Rocket, MessageSquareText, Trophy];

type Copy = {
  badge: string;
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  support: string;
  primary: string;
  secondary: string;
  proofLine: string;
  accessLabel: string;
  accessValue: string;
  tracksLabel: string;
  tracksValue: string;
  liveLabel: string;
  liveValue: string;
  deliveryLabel: string;
  deliveryValue: string;
  productEyebrow: string;
  productTitle: string;
  productLead: string;
  anti: string[];
  tracksEyebrow: string;
  tracksTitle: string;
  tracksLead: string;
  tracks: { title: string; text: string; outcome: string }[];
  loopEyebrow: string;
  loopTitle: string;
  loopLead: string;
  loop: { title: string; text: string; meta: string }[];
  clubEyebrow: string;
  clubTitle: string;
  clubLead: string;
  clubItems: { title: string; text: string }[];
  fitEyebrow: string;
  fitTitle: string;
  fitLead: string;
  forYouTitle: string;
  forYou: string[];
  notForYouTitle: string;
  notForYou: string[];
  accessEyebrow: string;
  accessTitle: string;
  accessLead: string;
  access: { title: string; text: string }[];
  pricingEyebrow: string;
  pricingTitle: string;
  pricingLead: string;
  monthlyLabel: string;
  monthlyPrice: string;
  monthlyPeriod: string;
  monthlyDesc: string;
  annualLabel: string;
  annualPrice: string;
  annualPeriod: string;
  annualDesc: string;
  annualBadge: string;
  planBullets: string[];
  planFootnote: string;
  faqEyebrow: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  finalEyebrow: string;
  finalTitle: string;
  finalDesc: string;
  dialogTitle: string;
  dialogDesc: string;
  dialogSubmit: string;
  dialogSuccessT: string;
  dialogSuccessM: string;
  fields: RequestField[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    badge: "Private club · applications open",
    eyebrow: "Warriors · skills + execution + network",
    titleA: "Build useful skills. ",
    titleB: "Execute around people who do.",
    lead: "A private club for builders who want practical training, direct feedback, weekly implementation and a stronger circle around real work.",
    support: "Warriors combines structured learning with a selective community. You learn the next move, apply it to a real project, review the result and keep building with people who are doing the same.",
    primary: "Apply for access",
    secondary: "See what is inside",
    proofLine: "Access is selective. No fake member counts, income promises or borrowed course material.",
    accessLabel: "Access",
    accessValue: "Application only",
    tracksLabel: "Learning paths",
    tracksValue: "4 starting paths",
    liveLabel: "Working sessions",
    liveValue: "Weekly",
    deliveryLabel: "Private layer",
    deliveryValue: "Member hub + Telegram",
    productEyebrow: "The product",
    productTitle: "A private operating environment, not another video course.",
    productLead: "The value is the combination: practical knowledge, implementation pressure, review and a selective circle. The platform exists to make the work easier, not to manufacture activity.",
    anti: ["No passive course collecting", "No public spam community", "No guaranteed-income claims", "No access without application"],
    tracksEyebrow: "Learning paths",
    tracksTitle: "Four practical paths inside one club.",
    tracksLead: "Start with the bottleneck that matters most. Move between paths as your next business problem changes.",
    tracks: [
      { title: "AI Systems", text: "Build useful automation for leads, follow-up, operations and customer journeys without unnecessary complexity.", outcome: "Ship a working automation" },
      { title: "Client Acquisition", text: "Sharpen the offer, find prospects, run outreach, improve sales conversations and build a repeatable acquisition loop.", outcome: "Create a repeatable client pipeline" },
      { title: "Content Engine", text: "Turn ideas and real work into a repeatable short-form, long-form and distribution system.", outcome: "Publish consistently with a system" },
      { title: "Business Operator", text: "Improve positioning, priorities, delivery, economics and decisions around what actually moves cash flow.", outcome: "Operate with clearer priorities and numbers" },
    ],
    loopEyebrow: "How members work",
    loopTitle: "Learn → build → review → prove.",
    loopLead: "Every learning unit points toward an implementation step. The club is designed around output, not time spent watching lessons.",
    loop: [
      { title: "Learn the next move", text: "Use concise lessons, models and templates for the decision or skill you need now.", meta: "Learn" },
      { title: "Build on a real project", text: "Turn the material into a page, workflow, offer, outreach batch, content asset or another real change.", meta: "Build" },
      { title: "Get reviewed", text: "Bring blockers and decisions to the private community and weekly working session for direct feedback.", meta: "Review" },
      { title: "Show the result", text: "Progress is visible through shipped assets, conversations, systems, content and measurable business changes.", meta: "Prove" },
    ],
    clubEyebrow: "Why the club matters",
    clubTitle: "Knowledge is easier to act on when the room raises the standard.",
    clubLead: "The long-term product is the combination of skill, access and relationships. We start lean, but the club is designed to become more valuable as the quality of members and shared experience compounds.",
    clubItems: [
      { title: "Private member hub", text: "Learning paths, practical missions, templates and recordings live inside the main VladKuzmenko platform." },
      { title: "Private community", text: "Telegram is the fast communication layer for questions, feedback, useful introductions and proof of work." },
      { title: "Weekly working session", text: "Focused live review for current projects, decisions, hot seats and implementation problems." },
      { title: "Business-model exchange", text: "Members can openly break down what they are testing, what worked, what failed and what they would do differently." },
    ],
    fitEyebrow: "Who it is for",
    fitTitle: "For people who want to turn knowledge into capability.",
    fitLead: "There is no follower-count or revenue requirement. The useful filter is seriousness, execution and whether the person strengthens the room.",
    forYouTitle: "Good fit",
    forYou: [
      "You are building a business, product, content engine, service or serious professional skill.",
      "You want practical guidance and a place to implement it with accountability.",
      "You can contribute useful questions, experience, feedback or connections.",
      "You are comfortable sharing real work and receiving direct feedback.",
      "You value a smaller, higher-signal group over a huge public community.",
    ],
    notForYouTitle: "Not a fit",
    notForYou: [
      "You expect guaranteed income from buying access.",
      "You only want passive entertainment or hundreds of hours of theory.",
      "You will not implement outside the platform.",
      "You want a group mainly to pitch your own offer.",
      "You are not comfortable with a selective, contribution-based environment.",
    ],
    accessEyebrow: "Access",
    accessTitle: "Application first. Membership second.",
    accessLead: "Warriors stays inside the main VladKuzmenko platform. No second website, no separate Vercel project and no public instant checkout.",
    access: [
      { title: "Apply", text: "Tell us what you are building, the current bottleneck and the path you want to strengthen first." },
      { title: "Fit review", text: "We check whether the club can genuinely help and whether the applicant adds signal to the room." },
      { title: "Choose a plan", text: "Accepted members choose monthly or annual access. Payment happens only after approval." },
      { title: "Enter the club", text: "Get access to the member hub, private community and the next working session." },
    ],
    pricingEyebrow: "Private membership",
    pricingTitle: "Choose flexibility or commit for the year.",
    pricingLead: "Both plans include the same access. The annual plan is preferred for members who want the network and skill-building to compound over time.",
    monthlyLabel: "Monthly",
    monthlyPrice: "$290",
    monthlyPeriod: "/ month",
    monthlyDesc: "Flexible access for members who want to start without an annual commitment.",
    annualLabel: "Annual",
    annualPrice: "$2,900",
    annualPeriod: "/ year",
    annualDesc: "Best for long-term participation. Equivalent to two months included compared with monthly access.",
    annualBadge: "Preferred · 2 months included",
    planBullets: ["All 4 learning paths", "Private member hub", "Private Telegram community", "Weekly working sessions", "Templates and implementation missions", "Feedback and useful introductions"],
    planFootnote: "Application is free. Payment is offered only after approval. Founding pricing may increase as the member experience expands.",
    faqEyebrow: "Questions",
    faqTitle: "What Warriors is — and what it is not.",
    faq: [
      { q: "Is Warriors a course or a mastermind?", a: "Neither by itself. It is a private membership that combines practical learning, implementation, live review and a selective business network." },
      { q: "Why is access selective?", a: "Because the quality of the room is part of the product. A smaller group of serious contributors is more useful than unrestricted access." },
      { q: "Why $290/month or $2,900/year?", a: "The price is intentionally above a mass course subscription because membership includes a selective community and live implementation. It is still below mature high-ticket private networks while Warriors proves and expands its member value." },
      { q: "Do I get every learning path?", a: "Yes. Both plans include all current paths. Start with the area closest to your bottleneck and move later when priorities change." },
      { q: "Are business results guaranteed?", a: "No. Warriors provides training, environment, feedback and access. Results depend on execution, market conditions and the member's decisions." },
      { q: "What gets added later?", a: "Only what real member behavior justifies: deeper progress tracking, stronger member profiles, searchable resources, more events and other tools that materially improve the club." },
    ],
    finalEyebrow: "Warriors",
    finalTitle: "Build faster with a stronger room around you.",
    finalDesc: "If you want practical skills, direct feedback and a private network built around execution, apply for access.",
    dialogTitle: "Apply to Warriors",
    dialogDesc: "Tell us what you are building, what you want to improve and what you can bring to a private execution-focused club.",
    dialogSubmit: "Submit application",
    dialogSuccessT: "Application received",
    dialogSuccessM: "Your application is in. If the fit is strong, Vlad will reach out with the next step and membership options.",
    fields: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle or number" },
      { id: "track", label: "First area to strengthen", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] },
      { id: "project", label: "What are you building now?", type: "textarea", required: true, placeholder: "Business, project, current stage and link if available" },
      { id: "goal30", label: "What do you want to change in the next 30 days?", type: "textarea", required: true, placeholder: "A concrete outcome" },
      { id: "contribution", label: "What could you contribute to the club?", type: "textarea", required: true, placeholder: "Experience, skills, feedback, connections or perspective" },
    ],
  },
  ua: {
    badge: "Закритий клуб · заявки відкриті",
    eyebrow: "Warriors · навички + реалізація + оточення",
    titleA: "Розвивайте корисні навички. ",
    titleB: "Дійте поруч із тими, хто теж діє.",
    lead: "Закритий клуб для тих, хто будує реальні проєкти й хоче практичне навчання, прямий зворотний зв'язок, щотижневу роботу та сильніше оточення.",
    support: "Warriors поєднує структуроване навчання з відібраною спільнотою. Ви вивчаєте наступний крок, застосовуєте його на реальному проєкті, розбираєте результат і продовжуєте рухатись разом з іншими учасниками.",
    primary: "Подати заявку",
    secondary: "Що всередині",
    proofLine: "Доступ за відбором. Без вигаданих цифр, обіцянок доходу чи запозичених курсів.",
    accessLabel: "Доступ",
    accessValue: "Лише за заявкою",
    tracksLabel: "Напрями",
    tracksValue: "4 стартові напрями",
    liveLabel: "Робочі сесії",
    liveValue: "Щотижня",
    deliveryLabel: "Закрита частина",
    deliveryValue: "Кабінет + Telegram",
    productEyebrow: "Продукт",
    productTitle: "Закрите робоче середовище, а не ще один відеокурс.",
    productLead: "Цінність у поєднанні: практичні знання, тиск до реалізації, розбори та відібране оточення. Платформа існує для роботи, а не для імітації активності.",
    anti: ["Без пасивного накопичення курсів", "Без публічної спам-спільноти", "Без гарантій доходу", "Без автоматичного доступу"],
    tracksEyebrow: "Напрями навчання",
    tracksTitle: "Чотири практичні напрями в одному клубі.",
    tracksLead: "Починайте з того вузького місця, яке зараз найбільше впливає на результат. Переходьте між напрямами, коли змінюються пріоритети.",
    tracks: [
      { title: "ШІ-системи", text: "Створюйте корисні автоматизації для лідів, повторних контактів, операцій та клієнтського шляху без зайвої складності.", outcome: "Запустити робочу автоматизацію" },
      { title: "Залучення клієнтів", text: "Посильте пропозицію, знайдіть потенційних клієнтів, запустіть системний контакт і покращуйте продажі на основі реальних відповідей.", outcome: "Створити повторюваний потік клієнтів" },
      { title: "Контент-система", text: "Перетворюйте ідеї та реальну роботу на стабільну систему короткого, довгого контенту й дистрибуції.", outcome: "Публікувати стабільно через систему" },
      { title: "Управління бізнесом", text: "Покращуйте позиціонування, пріоритети, виконання, економіку та рішення навколо того, що реально рухає грошовий потік.", outcome: "Керувати з яснішими пріоритетами й цифрами" },
    ],
    loopEyebrow: "Як працюють учасники",
    loopTitle: "Вивчити → реалізувати → розібрати → показати результат.",
    loopLead: "Кожен навчальний блок веде до конкретної дії. Клуб побудований навколо результату, а не кількості переглянутих уроків.",
    loop: [
      { title: "Вивчіть наступний крок", text: "Використовуйте короткі уроки, моделі й шаблони саме для тієї задачі, яка потрібна зараз.", meta: "Навчання" },
      { title: "Зробіть на реальному проєкті", text: "Перетворіть матеріал на сторінку, автоматизацію, пропозицію, серію контактів, контент або іншу реальну зміну.", meta: "Реалізація" },
      { title: "Отримайте розбір", text: "Приносьте блокери й рішення у закриту спільноту та на щотижневу робочу сесію.", meta: "Розбір" },
      { title: "Покажіть результат", text: "Прогрес видно через запущені матеріали, діалоги, системи, контент і вимірювані зміни в бізнесі.", meta: "Результат" },
    ],
    clubEyebrow: "Чому клуб важливий",
    clubTitle: "Знання легше перетворювати на дію, коли оточення піднімає планку.",
    clubLead: "Довгострокова цінність Warriors — у поєднанні навичок, доступу й відносин. Ми починаємо просто, але клуб має ставати сильнішим разом із якістю учасників і накопиченим досвідом.",
    clubItems: [
      { title: "Закритий кабінет", text: "Напрями, практичні завдання, шаблони й записи сесій живуть у Warriors-зоні основної платформи VladKuzmenko." },
      { title: "Закрита спільнота", text: "Telegram — швидкий канал для запитань, зворотного зв'язку, корисних знайомств і результатів роботи." },
      { title: "Щотижнева робоча сесія", text: "Сфокусований живий розбір поточних проєктів, рішень, складних ситуацій та реалізації." },
      { title: "Обмін бізнес-моделями", text: "Учасники можуть відкрито розбирати, що вони тестують, що спрацювало, що ні та що зробили б інакше." },
    ],
    fitEyebrow: "Для кого",
    fitTitle: "Для тих, хто хоче перетворювати знання на реальні можливості.",
    fitLead: "Немає вимоги щодо кількості підписників або доходу. Важливі серйозність, готовність діяти та здатність посилювати оточення.",
    forYouTitle: "Підходить",
    forYou: [
      "Ви будуєте бізнес, продукт, контент-систему, послугу або серйозну професійну навичку.",
      "Хочете практичне навчання та середовище, де його потрібно застосовувати.",
      "Можете додавати корисні питання, досвід, зворотний зв'язок або контакти.",
      "Готові показувати реальну роботу та приймати прямий зворотний зв'язок.",
      "Цінуєте менше, але сильніше коло замість великої публічної спільноти.",
    ],
    notForYouTitle: "Не підходить",
    notForYou: [
      "Очікуєте гарантованого доходу лише від купівлі доступу.",
      "Хочете тільки пасивний контент або сотні годин теорії.",
      "Не плануєте нічого реалізовувати поза платформою.",
      "Шукаєте групу переважно для просування власної пропозиції.",
      "Не готові до відбору та середовища, де важливий внесок кожного.",
    ],
    accessEyebrow: "Доступ",
    accessTitle: "Спочатку заявка. Потім участь.",
    accessLead: "Warriors залишається всередині основної платформи VladKuzmenko. Без другого сайту, окремого Vercel-проєкту чи миттєвої публічної оплати.",
    access: [
      { title: "Заявка", text: "Розкажіть, що будуєте, де зараз головна проблема та який напрям хочете посилити першим." },
      { title: "Перевірка відповідності", text: "Ми дивимось, чи клуб справді може допомогти і чи кандидат посилить середовище." },
      { title: "Вибір плану", text: "Після схвалення можна обрати місячну або річну участь. Оплата лише після рішення." },
      { title: "Вхід у клуб", text: "Отримайте доступ до кабінету, закритої спільноти та найближчої робочої сесії." },
    ],
    pricingEyebrow: "Закрита участь",
    pricingTitle: "Оберіть гнучкість або рік у сильному середовищі.",
    pricingLead: "Обидва плани дають однаковий доступ. Річний варіант створений для тих, хто хоче накопичувати навички, зв'язки та результат протягом року.",
    monthlyLabel: "Щомісячно",
    monthlyPrice: "$290",
    monthlyPeriod: "/ місяць",
    monthlyDesc: "Гнучкий формат без річного зобов'язання.",
    annualLabel: "На рік",
    annualPrice: "$2,900",
    annualPeriod: "/ рік",
    annualDesc: "Основний формат для довгострокової участі. Два місяці фактично включені у вартість.",
    annualBadge: "Рекомендовано · 2 місяці включено",
    planBullets: ["Усі 4 напрями навчання", "Закритий кабінет", "Закрита Telegram-спільнота", "Щотижневі робочі сесії", "Шаблони та практичні завдання", "Зворотний зв'язок і корисні знайомства"],
    planFootnote: "Заявка безкоштовна. Оплата доступна лише після схвалення. Ціна першого набору може зростати разом із розвитком клубу.",
    faqEyebrow: "Питання",
    faqTitle: "Чим Warriors є — і чим не є.",
    faq: [
      { q: "Warriors — це курс чи mastermind?", a: "Не лише курс і не лише група. Це закрита участь, що поєднує практичне навчання, реалізацію, живі розбори та відібрану бізнес-мережу." },
      { q: "Чому доступ за відбором?", a: "Тому що якість оточення є частиною продукту. Менша група серйозних учасників корисніша за необмежений відкритий доступ." },
      { q: "Чому $290 на місяць або $2,900 на рік?", a: "Це вище за масову освітню підписку, тому що тут є закрите оточення та живі робочі сесії. Водночас ми не імітуємо ціну зрілих дорогих приватних мереж, поки Warriors ще нарощує свою цінність." },
      { q: "Чи доступні всі напрями?", a: "Так. Обидва плани включають усі поточні напрями. Починайте з головного вузького місця і переходьте далі, коли зміняться пріоритети." },
      { q: "Чи гарантований бізнес-результат?", a: "Ні. Warriors дає навчання, середовище, зворотний зв'язок і доступ. Результат залежить від реалізації, ринку та рішень учасника." },
      { q: "Що буде додано пізніше?", a: "Лише те, що підтвердить реальна поведінка учасників: глибший прогрес, профілі, пошук матеріалів, більше подій та інші функції, що реально підсилюють клуб." },
    ],
    finalEyebrow: "Warriors",
    finalTitle: "Рухайтесь швидше, коли поруч сильніше оточення.",
    finalDesc: "Якщо вам потрібні практичні навички, прямий зворотний зв'язок і закрита мережа навколо реальної роботи — подайте заявку.",
    dialogTitle: "Заявка у Warriors",
    dialogDesc: "Розкажіть, що будуєте, що хочете посилити та що можете додати до закритого клубу, орієнтованого на результат.",
    dialogSubmit: "Надіслати заявку",
    dialogSuccessT: "Заявку отримано",
    dialogSuccessM: "Заявка прийшла. Якщо відповідність сильна, Vlad напише з наступним кроком і варіантами участі.",
    fields: [
      { id: "name", label: "Ваше ім'я", required: true, placeholder: "Ім'я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle або номер" },
      { id: "track", label: "Перший напрям для посилення", type: "select", required: true, options: ["ШІ-системи", "Залучення клієнтів", "Контент-система", "Управління бізнесом"] },
      { id: "project", label: "Що ви будуєте зараз?", type: "textarea", required: true, placeholder: "Бізнес, проєкт, поточна стадія та посилання, якщо є" },
      { id: "goal30", label: "Що хочете змінити за наступні 30 днів?", type: "textarea", required: true, placeholder: "Конкретний результат" },
      { id: "contribution", label: "Що ви можете додати до клубу?", type: "textarea", required: true, placeholder: "Досвід, навички, зворотний зв'язок, контакти або погляд" },
    ],
  },
  ru: {
    badge: "Закрытый клуб · заявки открыты",
    eyebrow: "Warriors · навыки + реализация + окружение",
    titleA: "Развивайте полезные навыки. ",
    titleB: "Действуйте рядом с теми, кто тоже действует.",
    lead: "Закрытый клуб для тех, кто строит реальные проекты и хочет практическое обучение, прямую обратную связь, еженедельную совместную работу и более сильное окружение.",
    support: "Warriors объединяет структурированное обучение с отобранным сообществом. Вы изучаете следующий шаг, применяете его на реальном проекте, разбираете результат и продолжаете двигаться вместе с другими участниками.",
    primary: "Подать заявку",
    secondary: "Что внутри",
    proofLine: "Доступ по отбору. Без выдуманных цифр, обещаний дохода и заимствованных курсов.",
    accessLabel: "Доступ",
    accessValue: "Только по заявке",
    tracksLabel: "Направления",
    tracksValue: "4 стартовых направления",
    liveLabel: "Рабочие сессии",
    liveValue: "Каждую неделю",
    deliveryLabel: "Закрытая часть",
    deliveryValue: "Кабинет + Telegram",
    productEyebrow: "Продукт",
    productTitle: "Закрытая рабочая среда, а не ещё один видеокурс.",
    productLead: "Ценность в сочетании: практические знания, давление к реализации, разборы и отобранное окружение. Платформа существует для работы, а не для имитации активности.",
    anti: ["Без пассивного накопления курсов", "Без публичного спам-сообщества", "Без гарантий дохода", "Без автоматического доступа"],
    tracksEyebrow: "Направления обучения",
    tracksTitle: "Четыре практических направления внутри одного клуба.",
    tracksLead: "Начинайте с того узкого места, которое сильнее всего влияет на результат сейчас. Переходите между направлениями, когда меняются приоритеты.",
    tracks: [
      { title: "ИИ-системы", text: "Создавайте полезные автоматизации для лидов, повторных контактов, операций и клиентского пути без лишней сложности.", outcome: "Запустить рабочую автоматизацию" },
      { title: "Привлечение клиентов", text: "Усильте предложение, найдите потенциальных клиентов, запустите системный контакт и улучшайте продажи на основе реальных ответов.", outcome: "Создать повторяемый поток клиентов" },
      { title: "Контент-система", text: "Превращайте идеи и реальную работу в стабильную систему короткого, длинного контента и распространения.", outcome: "Публиковаться стабильно через систему" },
      { title: "Управление бизнесом", text: "Улучшайте позиционирование, приоритеты, выполнение, экономику и решения вокруг того, что реально двигает денежный поток.", outcome: "Управлять с более ясными приоритетами и цифрами" },
    ],
    loopEyebrow: "Как работают участники",
    loopTitle: "Изучить → реализовать → разобрать → показать результат.",
    loopLead: "Каждый учебный блок ведёт к конкретному действию. Клуб построен вокруг результата, а не количества просмотренных уроков.",
    loop: [
      { title: "Изучите следующий шаг", text: "Используйте короткие уроки, модели и шаблоны именно для той задачи, которая нужна сейчас.", meta: "Обучение" },
      { title: "Сделайте на реальном проекте", text: "Превратите материал в страницу, автоматизацию, предложение, серию контактов, контент или другое реальное изменение.", meta: "Реализация" },
      { title: "Получите разбор", text: "Приносите блокеры и решения в закрытое сообщество и на еженедельную рабочую сессию.", meta: "Разбор" },
      { title: "Покажите результат", text: "Прогресс виден через запущенные материалы, диалоги, системы, контент и измеримые изменения в бизнесе.", meta: "Результат" },
    ],
    clubEyebrow: "Почему клуб важен",
    clubTitle: "Знания легче превращать в действие, когда окружение поднимает планку.",
    clubLead: "Долгосрочная ценность Warriors — в сочетании навыков, доступа и отношений. Мы начинаем просто, но клуб должен становиться сильнее вместе с качеством участников и накопленным опытом.",
    clubItems: [
      { title: "Закрытый кабинет", text: "Направления, практические задания, шаблоны и записи сессий живут в зоне Warriors на основной платформе VladKuzmenko." },
      { title: "Закрытое сообщество", text: "Telegram — быстрый канал для вопросов, обратной связи, полезных знакомств и результатов работы." },
      { title: "Еженедельная рабочая сессия", text: "Сфокусированный живой разбор текущих проектов, решений, сложных ситуаций и реализации." },
      { title: "Обмен бизнес-моделями", text: "Участники могут открыто разбирать, что они тестируют, что сработало, что нет и что сделали бы иначе." },
    ],
    fitEyebrow: "Для кого",
    fitTitle: "Для тех, кто хочет превращать знания в реальные возможности.",
    fitLead: "Нет требования по количеству подписчиков или доходу. Важны серьёзность, готовность действовать и способность усиливать окружение.",
    forYouTitle: "Подходит",
    forYou: [
      "Вы строите бизнес, продукт, контент-систему, услугу или серьёзный профессиональный навык.",
      "Хотите практическое обучение и среду, где его нужно применять.",
      "Можете добавлять полезные вопросы, опыт, обратную связь или контакты.",
      "Готовы показывать реальную работу и принимать прямую обратную связь.",
      "Цените меньшее, но более сильное окружение вместо огромного публичного сообщества.",
    ],
    notForYouTitle: "Не подходит",
    notForYou: [
      "Ожидаете гарантированного дохода только от покупки доступа.",
      "Хотите лишь пассивный контент или сотни часов теории.",
      "Не планируете ничего реализовывать за пределами платформы.",
      "Ищете группу главным образом для продвижения собственного предложения.",
      "Не готовы к отбору и среде, где важен вклад каждого.",
    ],
    accessEyebrow: "Доступ",
    accessTitle: "Сначала заявка. Потом участие.",
    accessLead: "Warriors остаётся внутри основной платформы VladKuzmenko. Без второго сайта, отдельного Vercel-проекта и мгновенной публичной оплаты.",
    access: [
      { title: "Заявка", text: "Расскажите, что строите, где сейчас главная проблема и какое направление хотите усилить первым." },
      { title: "Проверка соответствия", text: "Мы смотрим, действительно ли клуб может помочь и усилит ли кандидат само окружение." },
      { title: "Выбор плана", text: "После одобрения можно выбрать помесячное или годовое участие. Оплата только после решения." },
      { title: "Вход в клуб", text: "Получите доступ к кабинету, закрытому сообществу и ближайшей рабочей сессии." },
    ],
    pricingEyebrow: "Закрытое участие",
    pricingTitle: "Выберите гибкость или год в сильном окружении.",
    pricingLead: "Оба плана дают одинаковый доступ. Годовой вариант создан для тех, кто хочет накапливать навыки, связи и результат в течение года.",
    monthlyLabel: "Ежемесячно",
    monthlyPrice: "$290",
    monthlyPeriod: "/ месяц",
    monthlyDesc: "Гибкий формат без годового обязательства.",
    annualLabel: "На год",
    annualPrice: "$2,900",
    annualPeriod: "/ год",
    annualDesc: "Основной формат для долгосрочного участия. Два месяца фактически включены в стоимость.",
    annualBadge: "Рекомендуем · 2 месяца включено",
    planBullets: ["Все 4 направления обучения", "Закрытый кабинет", "Закрытое Telegram-сообщество", "Еженедельные рабочие сессии", "Шаблоны и практические задания", "Обратная связь и полезные знакомства"],
    planFootnote: "Заявка бесплатна. Оплата доступна только после одобрения. Цена первого набора может повышаться по мере развития клуба.",
    faqEyebrow: "Вопросы",
    faqTitle: "Чем Warriors является — и чем не является.",
    faq: [
      { q: "Warriors — это курс или мастермайнд?", a: "Не только курс и не только группа. Это закрытое участие, которое объединяет практическое обучение, реализацию, живые разборы и отобранную бизнес-сеть." },
      { q: "Почему доступ по отбору?", a: "Потому что качество окружения является частью продукта. Меньшая группа серьёзных участников полезнее неограниченного открытого доступа." },
      { q: "Почему $290 в месяц или $2,900 в год?", a: "Это выше массовой образовательной подписки, потому что здесь есть закрытое окружение и живые рабочие сессии. При этом мы не изображаем цену зрелых дорогих частных сетей, пока Warriors ещё наращивает свою ценность." },
      { q: "Доступны все направления?", a: "Да. Оба плана включают все текущие направления. Начинайте с главного узкого места и переходите дальше, когда изменятся приоритеты." },
      { q: "Гарантирован ли бизнес-результат?", a: "Нет. Warriors даёт обучение, среду, обратную связь и доступ. Результат зависит от реализации, рынка и решений участника." },
      { q: "Что будет добавлено позже?", a: "Только то, что подтвердит реальное поведение участников: более глубокий прогресс, профили, поиск материалов, больше событий и другие функции, которые действительно усиливают клуб." },
    ],
    finalEyebrow: "Warriors",
    finalTitle: "Двигайтесь быстрее, когда рядом более сильное окружение.",
    finalDesc: "Если вам нужны практические навыки, прямая обратная связь и закрытая сеть вокруг реальной работы — подайте заявку.",
    dialogTitle: "Заявка в Warriors",
    dialogDesc: "Расскажите, что строите, что хотите усилить и что можете добавить в закрытый клуб, ориентированный на результат.",
    dialogSubmit: "Отправить заявку",
    dialogSuccessT: "Заявка получена",
    dialogSuccessM: "Заявка пришла. Если соответствие сильное, Vlad напишет с следующим шагом и вариантами участия.",
    fields: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Электронная почта", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@имя или номер" },
      { id: "track", label: "Первое направление для усиления", type: "select", required: true, options: ["ИИ-системы", "Привлечение клиентов", "Контент-система", "Управление бизнесом"] },
      { id: "project", label: "Что вы строите сейчас?", type: "textarea", required: true, placeholder: "Бизнес, проект, текущая стадия и ссылка, если есть" },
      { id: "goal30", label: "Что хотите изменить за следующие 30 дней?", type: "textarea", required: true, placeholder: "Конкретный результат" },
      { id: "contribution", label: "Что вы можете добавить в клуб?", type: "textarea", required: true, placeholder: "Опыт, навыки, обратная связь, контакты или взгляд" },
    ],
  },
};

function ApplyButton({ className = "" }: { className?: string }) {
  const { lang } = useI18n();
  const c = COPY[lang];
  return (
    <RequestDialog
      intent="warriors_team_application"
      title={c.dialogTitle}
      description={c.dialogDesc}
      submitLabel={c.dialogSubmit}
      successTitle={c.dialogSuccessT}
      successMessage={c.dialogSuccessM}
      buttonLabel="Warriors - Apply"
      fields={c.fields}
      context={{ source: "warriors_team_page", locale: lang, offer: "warriors_private_club_v1", monthly_price_usd: 290, annual_price_usd: 2900 }}
    >
      <Button className={`premium-button h-auto min-h-12 px-7 py-3.5 text-sm sm:text-base ${className}`}>
        {c.primary}<ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </RequestDialog>
  );
}

function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-violet-200/70">{eyebrow}</p>
      <h2 className="section-title mt-4 text-[clamp(2.35rem,4.7vw,4.5rem)] text-zinc-100">{title}</h2>
      {lead ? <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{lead}</p> : null}
    </div>
  );
}

export function WarriorsTeamFinalPage() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const c = COPY[lang];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020203] text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-20 pt-28 sm:pb-28 sm:pt-36">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[720px] w-[98%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,.17),rgba(212,175,55,.035)_38%,transparent_70%)]" />
          </div>
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
              <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.15em] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{c.badge}</span>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.22em] text-violet-200/70">{c.eyebrow}</p>
                <h1 className="section-title mt-4 max-w-3xl text-[clamp(2.75rem,5.3vw,5.25rem)] leading-[.96] tracking-[-.045em] text-zinc-100">{c.titleA}<em className="bg-gradient-to-br from-violet-100 via-violet-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{c.titleB}</em></h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{c.lead}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">{c.support}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ApplyButton /><a href="#inside"><Button className="h-auto min-h-12 w-full border border-violet-300/18 bg-violet-300/[.045] px-7 py-3.5 text-white hover:bg-violet-300/[.085] sm:w-auto">{c.secondary}</Button></a></div>
                <p className="mt-4 flex max-w-xl items-start gap-2 text-xs leading-6 text-zinc-600"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-violet-200/55" />{c.proofLine}</p>
              </motion.div>

              <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .06 }}>
                <div className="overflow-hidden rounded-[30px] border border-violet-200/[.13] bg-[linear-gradient(145deg,rgba(196,181,253,.07),rgba(255,255,255,.018)_48%,rgba(0,0,0,.62))] p-4 shadow-[0_44px_110px_-58px_rgba(139,92,246,.3)] sm:p-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/[.08]">
                    <Image src="/warriors-discussion.jpg" alt="Warriors private club" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover opacity-72 saturate-[.8]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050307] via-transparent to-violet-950/10" />
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/[.08] bg-black/58 p-4 backdrop-blur-xl"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.17em] text-violet-100/70">Warriors</p><p className="mt-1 text-sm text-zinc-300">Skills · execution · network</p></div><Flame className="h-5 w-5 text-violet-200" /></div></div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      [c.accessLabel, c.accessValue, ShieldCheck],
                      [c.tracksLabel, c.tracksValue, BookOpenCheck],
                      [c.liveLabel, c.liveValue, Users],
                      [c.deliveryLabel, c.deliveryValue, Network],
                    ].map(([label, value, Icon]) => { const I = Icon as LucideIcon; return <div key={String(label)} className="rounded-2xl border border-white/[.07] bg-black/25 p-4"><div className="flex items-center justify-between gap-3"><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-600">{String(label)}</p><I className="h-3.5 w-3.5 text-violet-200/55" /></div><p className="mt-2 text-base font-semibold text-zinc-100">{String(value)}</p></div>; })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="inside" className="scroll-mt-24 border-b border-white/[.06] py-20 md:py-24"><div className="container mx-auto max-w-6xl px-4 sm:px-6"><SectionHeading eyebrow={c.productEyebrow} title={c.productTitle} lead={c.productLead} /><div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">{c.anti.map((item, index) => <div key={item} className="flex min-h-28 flex-col justify-between rounded-[22px] border border-white/[.07] bg-white/[.016] p-5"><X className="h-4 w-4 text-zinc-700" /><p className="mt-5 text-sm leading-6 text-zinc-400">{item}</p><span className="mt-4 text-[9px] tracking-[.16em] text-zinc-800">0{index + 1}</span></div>)}</div></div></section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32"><div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6"><SectionHeading eyebrow={c.tracksEyebrow} title={c.tracksTitle} lead={c.tracksLead} /><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{c.tracks.map((track, index) => { const Icon = TRACK_ICONS[index] ?? Target; return <InteractiveSurface key={track.title} accent="violet" className="h-full rounded-[28px] border border-white/[.08] bg-white/[.018] p-6"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200"><Icon className="h-4 w-4" /></span><span className="text-[9px] tracking-[.14em] text-zinc-700">0{index + 1}</span></div><h3 className="mt-6 text-lg font-semibold text-zinc-100">{track.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{track.text}</p><div className="mt-5 border-t border-white/[.06] pt-4"><p className="text-xs font-medium leading-5 text-violet-100/75">{track.outcome}</p></div></InteractiveSurface>; })}</div></div></section>

        <section className="border-b border-white/[.06] py-24 md:py-32"><div className="container mx-auto max-w-6xl px-4 sm:px-6"><SectionHeading eyebrow={c.loopEyebrow} title={c.loopTitle} lead={c.loopLead} /><div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">{c.loop.map((item, index) => { const Icon = LOOP_ICONS[index] ?? Target; return <div key={item.title} className="relative rounded-[25px] border border-white/[.075] bg-white/[.016] p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200"><Icon className="h-4 w-4" /></span><p className="mt-5 text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-700">{item.meta}</p><h3 className="mt-2 text-sm font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-xs leading-6 text-zinc-500">{item.text}</p>{index < c.loop.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-violet-300/25 md:block" /> : null}</div>; })}</div></div></section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32"><div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6"><SectionHeading eyebrow={c.clubEyebrow} title={c.clubTitle} lead={c.clubLead} /><div className="mt-12 grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/[.08]"><Image src="/warriors-group-photo.jpg" alt="Warriors members" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover opacity-58 saturate-[.72]" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-violet-950/10" /><div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/[.08] bg-black/62 p-5 backdrop-blur-xl"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-violet-200/65">Warriors</p><p className="mt-2 text-sm leading-6 text-zinc-300">A stronger room around real work.</p></div></div><div className="grid gap-4 sm:grid-cols-2">{c.clubItems.map((item, index) => <div key={item.title} className="rounded-[26px] border border-white/[.075] bg-white/[.018] p-6"><div className="flex items-start justify-between gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[.04] text-violet-200">{index === 0 ? <LayoutDashboard className="h-4 w-4" /> : index === 1 ? <MessageSquareText className="h-4 w-4" /> : index === 2 ? <Users className="h-4 w-4" /> : <Network className="h-4 w-4" />}</span><span className="text-[10px] tracking-[.17em] text-zinc-800">0{index + 1}</span></div><h3 className="mt-5 text-lg font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></div>)}</div></div></div></section>

        <section className="border-b border-white/[.06] py-24 md:py-32"><div className="container mx-auto max-w-6xl px-4 sm:px-6"><SectionHeading eyebrow={c.fitEyebrow} title={c.fitTitle} lead={c.fitLead} /><div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2"><div className="rounded-[28px] border border-emerald-300/[.12] bg-emerald-300/[.025] p-6 sm:p-7"><h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100"><Check className="h-5 w-5 text-emerald-200" />{c.forYouTitle}</h3><ul className="mt-6 space-y-4">{c.forYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-400"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-200/70" />{item}</li>)}</ul></div><div className="rounded-[28px] border border-white/[.08] bg-white/[.014] p-6 sm:p-7"><h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100"><X className="h-5 w-5 text-zinc-600" />{c.notForYouTitle}</h3><ul className="mt-6 space-y-4">{c.notForYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-500"><X className="mt-1 h-4 w-4 shrink-0 text-zinc-700" />{item}</li>)}</ul></div></div></div></section>

        <section className="border-b border-white/[.06] py-24 md:py-32"><div className="container mx-auto max-w-6xl px-4 sm:px-6"><SectionHeading eyebrow={c.accessEyebrow} title={c.accessTitle} lead={c.accessLead} /><div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">{c.access.map((item, index) => <div key={item.title} className="relative rounded-[25px] border border-white/[.075] bg-white/[.016] p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200">{index === 0 ? <Target className="h-4 w-4" /> : index === 1 ? <ShieldCheck className="h-4 w-4" /> : index === 2 ? <CircleDollarSign className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}</span><p className="mt-5 text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-700">0{index + 1}</p><h3 className="mt-2 text-sm font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-xs leading-6 text-zinc-500">{item.text}</p></div>)}</div></div></section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.11),transparent_60%)]" /><div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6"><SectionHeading eyebrow={c.pricingEyebrow} title={c.pricingTitle} lead={c.pricingLead} /><div className="mt-12 grid gap-5 md:grid-cols-2"><div className="rounded-[30px] border border-white/[.09] bg-white/[.018] p-7 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.18em] text-zinc-500">{c.monthlyLabel}</p><div className="mt-5 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-.05em] text-white">{c.monthlyPrice}</span><span className="pb-1 text-sm text-zinc-500">{c.monthlyPeriod}</span></div><p className="mt-4 text-sm leading-7 text-zinc-500">{c.monthlyDesc}</p><div className="mt-7"><ApplyButton className="w-full" /></div></div><div className="relative rounded-[30px] border border-violet-300/[.22] bg-[linear-gradient(145deg,rgba(139,92,246,.12),rgba(255,255,255,.02)_55%,rgba(212,175,55,.035))] p-7 shadow-[0_32px_90px_-48px_rgba(139,92,246,.45)] sm:p-8"><span className="absolute right-5 top-5 rounded-full border border-amber-200/20 bg-amber-200/[.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-[.14em] text-amber-100">{c.annualBadge}</span><p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-200/70">{c.annualLabel}</p><div className="mt-5 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-.05em] text-white">{c.annualPrice}</span><span className="pb-1 text-sm text-zinc-500">{c.annualPeriod}</span></div><p className="mt-4 text-sm leading-7 text-zinc-400">{c.annualDesc}</p><div className="mt-7"><ApplyButton className="w-full" /></div></div></div><div className="mx-auto mt-7 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">{c.planBullets.map((item) => <div key={item} className="flex items-start gap-2 rounded-2xl border border-white/[.06] bg-black/20 p-4 text-sm text-zinc-400"><Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-200/75" />{item}</div>)}</div><p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-6 text-zinc-600">{c.planFootnote}</p></div></section>

        <section className="border-b border-white/[.06] py-24 md:py-28"><div className="container mx-auto max-w-4xl px-4 sm:px-6"><SectionHeading eyebrow={c.faqEyebrow} title={c.faqTitle} /><div className="mt-10 space-y-3">{c.faq.map((item) => <details key={item.q} className="group rounded-[22px] border border-white/[.075] bg-white/[.016] p-5 open:border-violet-300/15"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200"><span>{item.q}</span><ArrowRight className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-90" /></summary><p className="mt-4 pr-6 text-sm leading-7 text-zinc-500">{item.a}</p></details>)}</div></div></section>

        <section className="relative overflow-hidden py-24 md:py-32"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,.10),transparent_64%)]" /><div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-violet-200/70">{c.finalEyebrow}</p><h2 className="section-title mx-auto mt-4 max-w-4xl text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[.96] text-zinc-100">{c.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{c.finalDesc}</p><div className="mt-8 flex justify-center"><ApplyButton /></div></div></section>
      </main>
      <FooterSection />
    </div>
  );
}
