"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CircleDollarSign,
  Clock3,
  Flame,
  LayoutDashboard,
  MessageSquareText,
  Network,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
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

const TRACK_ICONS: LucideIcon[] = [Workflow, Target, PlayCircle, LayoutDashboard];
const LOOP_ICONS: LucideIcon[] = [BookOpenCheck, Rocket, MessageSquareText, Trophy];

const COPY: Record<Lang, {
  badge: string;
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  support: string;
  primary: string;
  secondary: string;
  proofLine: string;
  membershipLabel: string;
  membershipValue: string;
  membershipNote: string;
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
  platformEyebrow: string;
  platformTitle: string;
  platformLead: string;
  platformItems: { title: string; text: string }[];
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
  priceEyebrow: string;
  priceTitle: string;
  priceDesc: string;
  priceBullets: string[];
  noCharge: string;
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
}> = {
  en: {
    badge: "Founding access · applications open",
    eyebrow: "Warriors · learning + execution network",
    titleA: "Learn skills that pay. ",
    titleB: "Execute with people who do.",
    lead: "One membership for practical skill tracks, live implementation sessions and a private execution network. Learn the system, apply it to a real project and show the proof.",
    support: "The closest product model is an integrated learning community: structured tracks + live guidance + chat + execution. Warriors keeps that loop, but the content, positioning and operating system are original and built around the work we actually do.",
    primary: "Apply for founding access",
    secondary: "See what is inside",
    proofLine: "No fake member counts, fake income claims or borrowed course material. The first cohort is built around real execution and measurable output.",
    membershipLabel: "Founding membership",
    membershipValue: "$49 / month",
    membershipNote: "after acceptance · cancel anytime",
    tracksLabel: "Skill tracks",
    tracksValue: "4 starting tracks",
    liveLabel: "Implementation",
    liveValue: "Weekly live review",
    deliveryLabel: "Founding delivery",
    deliveryValue: "Private hub + Telegram",
    productEyebrow: "The product",
    productTitle: "Not a course library. An execution environment.",
    productLead: "A lesson only matters when it changes what you can build, sell or ship. Every track is designed around action, feedback and proof instead of passive completion.",
    anti: ["No separate course purchases", "No passive binge-watching", "No invented gurus or testimonials", "No public spam community"],
    tracksEyebrow: "Starting tracks",
    tracksTitle: "Four paths. One membership.",
    tracksLead: "Start with the bottleneck that matters most. All founding members can move between tracks as their next problem changes.",
    tracks: [
      { title: "AI Systems", text: "Build useful automations around leads, follow-up, operations and customer journeys without overengineering.", outcome: "Ship one working automation" },
      { title: "Client Acquisition", text: "Choose a market, sharpen the offer, find prospects, run outreach and improve the sales conversation from evidence.", outcome: "Create a repeatable acquisition loop" },
      { title: "Content Engine", text: "Turn ideas and real work into short-form and long-form content with a repeatable production and distribution system.", outcome: "Publish consistently with a system" },
      { title: "Business Operator", text: "Improve positioning, offer economics, priorities, delivery and decision-making around what actually moves cash flow.", outcome: "Run the business with clearer numbers" },
    ],
    loopEyebrow: "The execution loop",
    loopTitle: "Learn → apply → get feedback → show proof.",
    loopLead: "The loop borrows the strongest mechanic of modern membership platforms: education and community live in one operating rhythm instead of separate products.",
    loop: [
      { title: "Learn the next move", text: "Short, structured lessons explain only what is needed for the next implementation step.", meta: "Track" },
      { title: "Build on a real project", text: "Every module ends in an action: a page, workflow, offer, outreach batch, script, asset or measurable change.", meta: "Mission" },
      { title: "Get reviewed", text: "Use the private chat and weekly live review to unblock the work, pressure-test decisions and improve the output.", meta: "Feedback" },
      { title: "Post the proof", text: "Wins are concrete: shipped assets, replies, booked calls, working systems, published content or another verifiable result.", meta: "Proof" },
    ],
    platformEyebrow: "Founding delivery",
    platformTitle: "Lean first. Custom software only when members earn the need.",
    platformLead: "The Real World proves the power of putting learning, community and execution in one product. Warriors v1 keeps that product architecture without wasting cash on a custom app before paid behavior tells us exactly what to build.",
    platformItems: [
      { title: "Structured member hub", text: "Tracks, lessons, missions, templates and live-session archive live under the Warriors area of the main VladKuzmenko platform." },
      { title: "Private execution chat", text: "Telegram is the fast communication layer for the founding cohort: help, feedback, proof posts and useful peer conversations." },
      { title: "Weekly live implementation", text: "One focused session each week for reviews, hot seats, current tactics and decisions members are implementing now." },
      { title: "Future member app", text: "Profiles, searchable resources, progress, marketplace and deeper community tooling are built only after recurring paid usage justifies them." },
    ],
    fitEyebrow: "Who it is for",
    fitTitle: "For people trying to turn skills into output.",
    fitLead: "There is no follower-count or revenue gate for the founding cohort. The useful filter is willingness to execute and show what happened.",
    forYouTitle: "Strong fit",
    forYou: [
      "You want a practical path into AI systems, client acquisition, content or operating a small business.",
      "You are willing to implement each week, even if your project is still early.",
      "You want feedback from people doing the work rather than another isolated video course.",
      "You can share useful questions, lessons or proof instead of only consuming.",
      "You care about building income-producing capability, not motivational entertainment.",
    ],
    notForYouTitle: "Wrong fit",
    notForYou: [
      "You expect a guaranteed income result from buying access.",
      "You want copied courses, signals, shortcuts or a get-rich-quick promise.",
      "You will not execute outside the platform.",
      "You mainly want a group to spam with your offer.",
      "You need hundreds of hours of theory before taking the first action.",
    ],
    accessEyebrow: "Access",
    accessTitle: "A simple founding flow.",
    accessLead: "No separate Vercel product, no second website and no fake checkout. Warriors lives inside the main VladKuzmenko platform and uses the existing lead pipeline until billing deserves deeper automation.",
    access: [
      { title: "Apply", text: "Choose the starting track, describe the current goal and show what you are already working on." },
      { title: "Fit", text: "A short review confirms that the membership matches the goal and that the founding format is useful." },
      { title: "Activate", text: "Accepted founding members activate the $49/month membership. Nothing is charged for the application." },
      { title: "Start executing", text: "Enter the hub and private chat, pick the first mission and bring the result to the next live review." },
    ],
    priceEyebrow: "Founding membership",
    priceTitle: "$49/month for all starting tracks.",
    priceDesc: "One membership, not four course purchases. The founding price gives access to every starting track, the private execution network, weekly live implementation and new modules released into the same system.",
    priceBullets: ["All 4 starting tracks", "Private founding community", "Weekly live implementation", "Missions + templates", "Proof and feedback loop", "Cancel anytime"],
    noCharge: "The application is free. Payment is only requested after acceptance while the founding cohort and billing flow are being validated.",
    faqEyebrow: "Questions",
    faqTitle: "What Warriors is actually becoming.",
    faq: [
      { q: "Is Warriors a mastermind?", a: "No. The core product is broader: structured skill tracks, implementation, live guidance and community in one membership. Peer accountability is one mechanic, not the whole product." },
      { q: "Is it a copy of The Real World?", a: "No. The Real World is the closest benchmark for the integrated membership model, but Warriors uses original curriculum, a narrower operator-led scope and no borrowed branding, copy, lessons or fabricated scale claims." },
      { q: "Why not build a full custom community app now?", a: "Because software is not the first risk. The first risk is whether people pay, execute and stay. The founding stack proves that before we spend time and Vercel budget on features members may not need." },
      { q: "Do I get every track?", a: "Yes. Founding access is one membership with all current tracks. You start with the track closest to your bottleneck and can move later." },
      { q: "Are results guaranteed?", a: "No. The product supplies training, implementation structure, feedback and community. Outcomes still depend on the member doing the work and on the market they operate in." },
      { q: "What gets added later?", a: "Only features supported by member behavior: deeper progress tracking, searchable profiles/resources, marketplace mechanics, more live formats and additional tracks where there is real demand." },
    ],
    finalEyebrow: "Warriors founding access",
    finalTitle: "Stop collecting information. Build something with it.",
    finalDesc: "Choose the skill that matters now, execute it on a real project and use the network to move faster. That is the product.",
    dialogTitle: "Apply for Warriors Founding Access",
    dialogDesc: "Tell us what you are trying to build, which track is closest to your current goal and what you want to execute in the next 30 days.",
    dialogSubmit: "Submit application",
    dialogSuccessT: "Application received",
    dialogSuccessM: "Your application is in. If the founding format matches the goal, Vlad will reach out with the next step before any payment.",
    fields: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle or number" },
      { id: "track", label: "Best starting track", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] },
      { id: "project", label: "What are you working on now?", type: "textarea", required: true, placeholder: "Business, project, current stage and link if available" },
      { id: "goal30", label: "What do you want to execute in the next 30 days?", type: "textarea", required: true, placeholder: "A concrete outcome, not a vague goal" },
      { id: "proof", label: "What have you already done?", type: "textarea", required: true, placeholder: "Anything shipped, sold, published, tested or built so far" },
    ],
  },
  ua: {
    badge: "Founding access · заявки відкриті",
    eyebrow: "Warriors · навчання + execution network",
    titleA: "Освойте навички, що дають результат. ",
    titleB: "Виконуйте поруч із тими, хто діє.",
    lead: "Одна membership для практичних skill tracks, live implementation sessions і приватної execution network. Вивчіть систему, застосуйте її на реальному проєкті та покажіть proof.",
    support: "Найближча продуктова модель — інтегрована learning community: structured tracks + live guidance + chat + execution. Warriors бере цей сильний цикл, але контент, позиціонування й operating system є оригінальними та побудованими навколо роботи, яку ми реально робимо.",
    primary: "Подати заявку на founding access",
    secondary: "Що всередині",
    proofLine: "Без фейкової кількості учасників, вигаданих доходів чи запозичених курсів. Перша cohort будується навколо реального execution і вимірюваного output.",
    membershipLabel: "Founding membership",
    membershipValue: "$49 / місяць",
    membershipNote: "після прийняття · cancel anytime",
    tracksLabel: "Skill tracks",
    tracksValue: "4 стартові напрями",
    liveLabel: "Implementation",
    liveValue: "Weekly live review",
    deliveryLabel: "Founding delivery",
    deliveryValue: "Private hub + Telegram",
    productEyebrow: "Продукт",
    productTitle: "Не бібліотека курсів. Execution environment.",
    productLead: "Урок має сенс лише тоді, коли змінює те, що ви можете побудувати, продати або запустити. Кожен track побудований навколо action, feedback і proof замість пасивного completion.",
    anti: ["Без окремої купівлі курсів", "Без пасивного binge-watching", "Без вигаданих gurus чи testimonials", "Без public spam community"],
    tracksEyebrow: "Стартові tracks",
    tracksTitle: "Чотири шляхи. Одна membership.",
    tracksLead: "Починайте з bottleneck, який має найбільше значення. Усі founding members можуть переходити між tracks, коли змінюється наступна задача.",
    tracks: [
      { title: "AI Systems", text: "Створюйте корисні automation-системи для leads, follow-up, operations і customer journeys без overengineering.", outcome: "Запустити одну working automation" },
      { title: "Client Acquisition", text: "Оберіть market, посильте offer, знайдіть prospects, запустіть outreach і покращуйте sales conversation на основі evidence.", outcome: "Створити repeatable acquisition loop" },
      { title: "Content Engine", text: "Перетворюйте ідеї та реальну роботу на short-form і long-form content через repeatable production + distribution system.", outcome: "Публікувати стабільно через систему" },
      { title: "Business Operator", text: "Покращуйте positioning, offer economics, priorities, delivery і рішення навколо того, що реально рухає cash flow.", outcome: "Керувати бізнесом з яснішими numbers" },
    ],
    loopEyebrow: "Execution loop",
    loopTitle: "Learn → apply → get feedback → show proof.",
    loopLead: "Цикл бере найсильнішу механіку сучасних membership platforms: education і community живуть в одному operating rhythm, а не продаються як розрізнені продукти.",
    loop: [
      { title: "Вивчіть наступний крок", text: "Короткі structured lessons пояснюють лише те, що потрібно для наступної implementation дії.", meta: "Track" },
      { title: "Будуйте на реальному проєкті", text: "Кожен module завершується action: page, workflow, offer, outreach batch, script, asset або measurable change.", meta: "Mission" },
      { title: "Отримайте review", text: "Private chat і weekly live review допомагають розблокувати роботу, перевірити рішення й покращити output.", meta: "Feedback" },
      { title: "Покажіть proof", text: "Wins конкретні: shipped assets, replies, booked calls, working systems, published content або інший verifiable result.", meta: "Proof" },
    ],
    platformEyebrow: "Founding delivery",
    platformTitle: "Спочатку lean. Custom software лише коли учасники доведуть потребу.",
    platformLead: "The Real World показує силу об'єднання learning, community та execution в одному продукті. Warriors v1 залишає цю product architecture, але не спалює cash і Vercel budget на custom app до того, як paid behavior покаже, що саме треба будувати.",
    platformItems: [
      { title: "Structured member hub", text: "Tracks, lessons, missions, templates і live-session archive живуть у Warriors-зоні основної VladKuzmenko platform." },
      { title: "Private execution chat", text: "Telegram — швидкий communication layer для founding cohort: help, feedback, proof posts і корисні peer conversations." },
      { title: "Weekly live implementation", text: "Одна сфокусована сесія щотижня для reviews, hot seats, актуальних tactics і рішень, які учасники реалізують зараз." },
      { title: "Future member app", text: "Profiles, searchable resources, progress, marketplace та deeper community tooling будуємо лише після recurring paid usage." },
    ],
    fitEyebrow: "Для кого",
    fitTitle: "Для тих, хто хоче перетворити skills на output.",
    fitLead: "У founding cohort немає follower-count чи revenue gate. Корисний фільтр — готовність виконувати й показувати, що сталося.",
    forYouTitle: "Strong fit",
    forYou: [
      "Ви хочете практичний шлях в AI systems, client acquisition, content або operating small business.",
      "Готові implement щотижня, навіть якщо проєкт ще ранній.",
      "Хочете feedback від людей, які роблять роботу, а не ще один isolated video course.",
      "Можете ділитися корисними питаннями, lessons або proof, а не лише consume.",
      "Цікавить income-producing capability, а не motivational entertainment.",
    ],
    notForYouTitle: "Wrong fit",
    notForYou: [
      "Очікуєте guaranteed income result від купівлі доступу.",
      "Шукаєте copied courses, signals, shortcuts або get-rich-quick promise.",
      "Не будете execute поза платформою.",
      "Головна мета — spam групи своїм offer.",
      "Потрібні сотні годин theory до першої дії.",
    ],
    accessEyebrow: "Доступ",
    accessTitle: "Простий founding flow.",
    accessLead: "Без окремого Vercel product, другого сайту чи fake checkout. Warriors живе всередині основної VladKuzmenko platform і використовує існуючий lead pipeline, поки billing не виправдає глибшу automation.",
    access: [
      { title: "Apply", text: "Оберіть starting track, опишіть current goal і покажіть, над чим уже працюєте." },
      { title: "Fit", text: "Короткий review підтверджує, що membership відповідає цілі й founding format буде корисним." },
      { title: "Activate", text: "Accepted founding members активують membership за $49/місяць. За application оплати немає." },
      { title: "Start executing", text: "Увійдіть у hub і private chat, оберіть першу mission і принесіть результат на наступний live review." },
    ],
    priceEyebrow: "Founding membership",
    priceTitle: "$49/місяць за всі стартові tracks.",
    priceDesc: "Одна membership, а не чотири окремі курси. Founding price дає доступ до всіх стартових tracks, private execution network, weekly live implementation і нових modules в тій самій системі.",
    priceBullets: ["Усі 4 стартові tracks", "Private founding community", "Weekly live implementation", "Missions + templates", "Proof + feedback loop", "Cancel anytime"],
    noCharge: "Application безкоштовна. Payment запитується лише після acceptance, поки founding cohort і billing flow проходять validation.",
    faqEyebrow: "Питання",
    faqTitle: "Чим Warriors реально стає.",
    faq: [
      { q: "Warriors — це mastermind?", a: "Ні. Core product ширший: structured skill tracks, implementation, live guidance і community в одній membership. Peer accountability — одна механіка, а не весь продукт." },
      { q: "Це копія The Real World?", a: "Ні. The Real World — найближчий benchmark для integrated membership model, але Warriors використовує original curriculum, вужчий operator-led scope і не копіює branding, copy, lessons чи fabricated scale claims." },
      { q: "Чому не будувати full custom community app зараз?", a: "Бо software — не перший risk. Спочатку треба довести, що люди платять, виконують і залишаються. Founding stack перевіряє це до витрат на features, які можуть не знадобитися." },
      { q: "Я отримую всі tracks?", a: "Так. Founding access — одна membership з усіма поточними tracks. Починаєте з найближчого bottleneck і можете перейти пізніше." },
      { q: "Результати гарантовані?", a: "Ні. Product дає training, implementation structure, feedback і community. Outcome залежить від виконання та market." },
      { q: "Що додається пізніше?", a: "Лише features, підтверджені member behavior: deeper progress tracking, searchable profiles/resources, marketplace mechanics, більше live formats і додаткові tracks за реального demand." },
    ],
    finalEyebrow: "Warriors founding access",
    finalTitle: "Не збирайте інформацію. Побудуйте щось із неї.",
    finalDesc: "Оберіть skill, який потрібен зараз, реалізуйте його на реальному проєкті й використовуйте network, щоб рухатись швидше. Це і є продукт.",
    dialogTitle: "Заявка на Warriors Founding Access",
    dialogDesc: "Розкажіть, що хочете побудувати, який track найближчий до current goal і що хочете виконати за наступні 30 днів.",
    dialogSubmit: "Надіслати заявку",
    dialogSuccessT: "Заявку отримано",
    dialogSuccessM: "Заявка прийшла. Якщо founding format відповідає цілі, Vlad напише з наступним кроком до будь-якої оплати.",
    fields: [
      { id: "name", label: "Ваше ім'я", required: true, placeholder: "Ім'я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle або номер" },
      { id: "track", label: "Найкращий starting track", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] },
      { id: "project", label: "Над чим ви працюєте зараз?", type: "textarea", required: true, placeholder: "Business, project, current stage і link, якщо є" },
      { id: "goal30", label: "Що хочете виконати за наступні 30 днів?", type: "textarea", required: true, placeholder: "Конкретний outcome, не vague goal" },
      { id: "proof", label: "Що вже зроблено?", type: "textarea", required: true, placeholder: "Що вже shipped, sold, published, tested або built" },
    ],
  },
  ru: {
    badge: "Founding access · заявки открыты",
    eyebrow: "Warriors · обучение + execution network",
    titleA: "Освойте навыки, которые дают результат. ",
    titleB: "Исполняйте рядом с теми, кто действует.",
    lead: "Одна membership для практических skill tracks, live implementation sessions и закрытой execution network. Изучите систему, примените её на реальном проекте и покажите proof.",
    support: "Ближайшая продуктовая модель — интегрированная learning community: structured tracks + live guidance + chat + execution. Warriors берёт этот сильный цикл, но контент, позиционирование и operating system оригинальны и построены вокруг работы, которую мы реально делаем.",
    primary: "Подать заявку на founding access",
    secondary: "Что внутри",
    proofLine: "Без фейкового числа участников, выдуманных доходов или заимствованных курсов. Первая cohort строится вокруг реального execution и измеримого output.",
    membershipLabel: "Founding membership",
    membershipValue: "$49 / месяц",
    membershipNote: "после принятия · cancel anytime",
    tracksLabel: "Skill tracks",
    tracksValue: "4 стартовых направления",
    liveLabel: "Implementation",
    liveValue: "Weekly live review",
    deliveryLabel: "Founding delivery",
    deliveryValue: "Private hub + Telegram",
    productEyebrow: "Продукт",
    productTitle: "Не библиотека курсов. Execution environment.",
    productLead: "Урок имеет смысл только тогда, когда меняет то, что вы способны построить, продать или запустить. Каждый track построен вокруг action, feedback и proof вместо пассивного completion.",
    anti: ["Без отдельной покупки курсов", "Без пассивного binge-watching", "Без придуманных gurus или testimonials", "Без public spam community"],
    tracksEyebrow: "Стартовые tracks",
    tracksTitle: "Четыре пути. Одна membership.",
    tracksLead: "Начинайте с bottleneck, который важнее всего. Все founding members могут переходить между tracks, когда меняется следующая задача.",
    tracks: [
      { title: "AI Systems", text: "Стройте полезные automation-системы вокруг leads, follow-up, operations и customer journeys без overengineering.", outcome: "Запустить одну working automation" },
      { title: "Client Acquisition", text: "Выберите market, усилите offer, найдите prospects, запустите outreach и улучшайте sales conversation на основании evidence.", outcome: "Создать repeatable acquisition loop" },
      { title: "Content Engine", text: "Превращайте идеи и реальную работу в short-form и long-form content через repeatable production + distribution system.", outcome: "Публиковаться стабильно через систему" },
      { title: "Business Operator", text: "Улучшайте positioning, offer economics, priorities, delivery и решения вокруг того, что реально двигает cash flow.", outcome: "Управлять бизнесом с более ясными numbers" },
    ],
    loopEyebrow: "Execution loop",
    loopTitle: "Learn → apply → get feedback → show proof.",
    loopLead: "Цикл берёт сильнейшую механику современных membership platforms: education и community живут в одном operating rhythm, а не продаются как разрозненные продукты.",
    loop: [
      { title: "Изучите следующий шаг", text: "Короткие structured lessons объясняют только то, что нужно для следующего implementation-действия.", meta: "Track" },
      { title: "Стройте на реальном проекте", text: "Каждый module заканчивается action: page, workflow, offer, outreach batch, script, asset или measurable change.", meta: "Mission" },
      { title: "Получите review", text: "Private chat и weekly live review помогают разблокировать работу, проверить решения и улучшить output.", meta: "Feedback" },
      { title: "Покажите proof", text: "Wins конкретны: shipped assets, replies, booked calls, working systems, published content или другой verifiable result.", meta: "Proof" },
    ],
    platformEyebrow: "Founding delivery",
    platformTitle: "Сначала lean. Custom software только когда участники докажут потребность.",
    platformLead: "The Real World показывает силу объединения learning, community и execution в одном продукте. Warriors v1 сохраняет эту product architecture, но не сжигает cash и Vercel budget на custom app до того, как paid behavior покажет, что именно нужно строить.",
    platformItems: [
      { title: "Structured member hub", text: "Tracks, lessons, missions, templates и live-session archive живут в Warriors-зоне основной VladKuzmenko platform." },
      { title: "Private execution chat", text: "Telegram — быстрый communication layer для founding cohort: help, feedback, proof posts и полезные peer conversations." },
      { title: "Weekly live implementation", text: "Одна сфокусированная сессия в неделю для reviews, hot seats, актуальных tactics и решений, которые участники реализуют сейчас." },
      { title: "Future member app", text: "Profiles, searchable resources, progress, marketplace и deeper community tooling строим только после recurring paid usage." },
    ],
    fitEyebrow: "Для кого",
    fitTitle: "Для тех, кто хочет превратить skills в output.",
    fitLead: "В founding cohort нет follower-count или revenue gate. Полезный фильтр — готовность исполнять и показывать, что произошло.",
    forYouTitle: "Strong fit",
    forYou: [
      "Вам нужен практический путь в AI systems, client acquisition, content или operating small business.",
      "Готовы implement каждую неделю, даже если проект ещё ранний.",
      "Хотите feedback от людей, которые делают работу, а не ещё один isolated video course.",
      "Можете делиться полезными вопросами, lessons или proof, а не только consume.",
      "Вас интересует income-producing capability, а не motivational entertainment.",
    ],
    notForYouTitle: "Wrong fit",
    notForYou: [
      "Ожидаете guaranteed income result от покупки доступа.",
      "Ищете copied courses, signals, shortcuts или get-rich-quick promise.",
      "Не будете execute вне платформы.",
      "Главная цель — spam группы своим offer.",
      "Нужны сотни часов theory до первого действия.",
    ],
    accessEyebrow: "Доступ",
    accessTitle: "Простой founding flow.",
    accessLead: "Без отдельного Vercel product, второго сайта или fake checkout. Warriors живёт внутри основной VladKuzmenko platform и использует существующий lead pipeline, пока billing не оправдает более глубокую automation.",
    access: [
      { title: "Apply", text: "Выберите starting track, опишите current goal и покажите, над чем уже работаете." },
      { title: "Fit", text: "Короткий review подтверждает, что membership соответствует цели и founding format будет полезен." },
      { title: "Activate", text: "Accepted founding members активируют membership за $49/месяц. За application оплаты нет." },
      { title: "Start executing", text: "Войдите в hub и private chat, выберите первую mission и принесите результат на следующий live review." },
    ],
    priceEyebrow: "Founding membership",
    priceTitle: "$49/месяц за все стартовые tracks.",
    priceDesc: "Одна membership, а не четыре отдельных курса. Founding price даёт доступ ко всем стартовым tracks, private execution network, weekly live implementation и новым modules в той же системе.",
    priceBullets: ["Все 4 стартовых tracks", "Private founding community", "Weekly live implementation", "Missions + templates", "Proof + feedback loop", "Cancel anytime"],
    noCharge: "Application бесплатна. Payment запрашивается только после acceptance, пока founding cohort и billing flow проходят validation.",
    faqEyebrow: "Вопросы",
    faqTitle: "Чем Warriors реально становится.",
    faq: [
      { q: "Warriors — это mastermind?", a: "Нет. Core product шире: structured skill tracks, implementation, live guidance и community в одной membership. Peer accountability — одна механика, а не весь продукт." },
      { q: "Это копия The Real World?", a: "Нет. The Real World — ближайший benchmark для integrated membership model, но Warriors использует original curriculum, более узкий operator-led scope и не копирует branding, copy, lessons или fabricated scale claims." },
      { q: "Почему не строить full custom community app сейчас?", a: "Потому что software — не первый risk. Сначала нужно доказать, что люди платят, исполняют и остаются. Founding stack проверяет это до расходов на features, которые могут не понадобиться." },
      { q: "Я получаю все tracks?", a: "Да. Founding access — одна membership со всеми текущими tracks. Начинаете с ближайшего bottleneck и можете перейти позже." },
      { q: "Результаты гарантированы?", a: "Нет. Product даёт training, implementation structure, feedback и community. Outcome зависит от исполнения и market." },
      { q: "Что добавляется позже?", a: "Только features, подтверждённые member behavior: deeper progress tracking, searchable profiles/resources, marketplace mechanics, больше live formats и дополнительные tracks при реальном demand." },
    ],
    finalEyebrow: "Warriors founding access",
    finalTitle: "Не собирайте информацию. Постройте что-то из неё.",
    finalDesc: "Выберите skill, который нужен сейчас, реализуйте его на реальном проекте и используйте network, чтобы двигаться быстрее. Это и есть продукт.",
    dialogTitle: "Заявка на Warriors Founding Access",
    dialogDesc: "Расскажите, что хотите построить, какой track ближе к current goal и что хотите исполнить за следующие 30 дней.",
    dialogSubmit: "Отправить заявку",
    dialogSuccessT: "Заявка получена",
    dialogSuccessM: "Заявка пришла. Если founding format соответствует цели, Vlad напишет с следующим шагом до любой оплаты.",
    fields: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle или номер" },
      { id: "track", label: "Лучший starting track", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] },
      { id: "project", label: "Над чем вы работаете сейчас?", type: "textarea", required: true, placeholder: "Business, project, current stage и link, если есть" },
      { id: "goal30", label: "Что хотите исполнить за следующие 30 дней?", type: "textarea", required: true, placeholder: "Конкретный outcome, не vague goal" },
      { id: "proof", label: "Что уже сделано?", type: "textarea", required: true, placeholder: "Что уже shipped, sold, published, tested или built" },
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
      buttonLabel="Warriors Founding Access - Apply"
      fields={c.fields}
      context={{ source: "warriors_team_page", locale: lang, offer: "warriors_founding_membership_v1", founding_price_usd_monthly: 49 }}
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
      <h2 className="section-title mt-4 text-[clamp(2.45rem,5vw,4.7rem)] text-zinc-100">{title}</h2>
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
        <section className="relative overflow-hidden border-b border-white/[.07] pb-24 pt-32 sm:pb-32 sm:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[760px] w-[98%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,.18),rgba(212,175,55,.035)_38%,transparent_70%)]" />
            <div className="absolute right-[8%] top-28 h-72 w-72 rounded-full bg-violet-500/[.045] blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_.94fr] lg:gap-14">
              <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.17em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.7)]" />{c.badge}
                </span>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.24em] text-violet-200/70">{c.eyebrow}</p>
                <h1 className="section-title mt-4 max-w-4xl text-[clamp(3.25rem,7vw,6.7rem)] leading-[.91] tracking-[-.052em] text-zinc-100">
                  {c.titleA}<em className="bg-gradient-to-br from-violet-100 via-violet-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{c.titleB}</em>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">{c.lead}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">{c.support}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ApplyButton />
                  <a href="#inside"><Button className="h-auto min-h-12 w-full border border-violet-300/18 bg-violet-300/[.045] px-7 py-3.5 text-white hover:bg-violet-300/[.085] sm:w-auto">{c.secondary}</Button></a>
                </div>
                <p className="mt-4 flex max-w-xl items-start gap-2 text-xs leading-6 text-zinc-600"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-violet-200/55" />{c.proofLine}</p>
              </motion.div>

              <motion.div initial={reduced ? false : { opacity: 0, y: 20, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7, delay: .08 }} className="relative">
                <div className="relative overflow-hidden rounded-[32px] border border-violet-200/[.13] bg-[linear-gradient(145deg,rgba(196,181,253,.075),rgba(255,255,255,.018)_48%,rgba(0,0,0,.62))] p-4 shadow-[0_46px_120px_-54px_rgba(139,92,246,.28)] sm:p-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/[.08]">
                    <Image src="/warriors-discussion.jpg" alt="Warriors learning and execution community" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover opacity-72 saturate-[.78]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050307] via-transparent to-violet-950/10" />
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/[.08] bg-black/58 p-4 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-100/70">Warriors</p><p className="mt-1 text-sm text-zinc-300">Learn · build · review · prove</p></div><Flame className="h-5 w-5 shrink-0 text-violet-200" /></div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      [c.membershipLabel, c.membershipValue, c.membershipNote, CircleDollarSign],
                      [c.tracksLabel, c.tracksValue, "All included", Sparkles],
                      [c.liveLabel, c.liveValue, "Implementation, not lectures", Users],
                      [c.deliveryLabel, c.deliveryValue, "Inside the main site", Network],
                    ].map(([label, value, note, Icon]) => {
                      const I = Icon as LucideIcon;
                      return <div key={String(label)} className="rounded-2xl border border-white/[.07] bg-black/25 p-4"><div className="flex items-center justify-between gap-3"><p className="text-[9px] font-semibold uppercase tracking-[.17em] text-zinc-600">{String(label)}</p><I className="h-3.5 w-3.5 text-violet-200/55" /></div><p className="mt-2 text-base font-semibold text-zinc-100">{String(value)}</p><p className="mt-1 text-[10px] leading-5 text-zinc-600">{String(note)}</p></div>;
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="inside" className="scroll-mt-24 border-b border-white/[.06] py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.productEyebrow} title={c.productTitle} lead={c.productLead} />
            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {c.anti.map((item, index) => <div key={item} className="flex min-h-28 flex-col justify-between rounded-[22px] border border-white/[.07] bg-white/[.016] p-5"><X className="h-4 w-4 text-zinc-700" /><p className="mt-5 text-sm leading-6 text-zinc-400">{item}</p><span className="mt-4 text-[9px] tracking-[.16em] text-zinc-800">0{index + 1}</span></div>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,.075),transparent_55%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.tracksEyebrow} title={c.tracksTitle} lead={c.tracksLead} />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {c.tracks.map((track, index) => {
                const Icon = TRACK_ICONS[index] ?? Sparkles;
                return <motion.div key={track.title} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><InteractiveSurface accent="violet" className="h-full rounded-[28px] border border-white/[.08] bg-white/[.018] p-6"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200"><Icon className="h-4 w-4" /></span><span className="text-[9px] uppercase tracking-[.14em] text-zinc-700">0{index + 1}</span></div><h3 className="mt-6 text-lg font-semibold text-zinc-100">{track.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{track.text}</p><div className="mt-5 border-t border-white/[.06] pt-4"><p className="text-[9px] uppercase tracking-[.16em] text-zinc-700">Outcome</p><p className="mt-2 text-xs font-medium leading-5 text-violet-100/75">{track.outcome}</p></div></InteractiveSurface></motion.div>;
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.loopEyebrow} title={c.loopTitle} lead={c.loopLead} />
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">
              {c.loop.map((item, index) => {
                const Icon = LOOP_ICONS[index] ?? Target;
                return <div key={item.title} className="relative rounded-[25px] border border-white/[.075] bg-white/[.016] p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200"><Icon className="h-4 w-4" /></span><p className="mt-5 text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-700">{item.meta}</p><h3 className="mt-2 text-sm font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-xs leading-6 text-zinc-500">{item.text}</p>{index < c.loop.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-violet-300/25 md:block" /> : null}</div>;
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,.065),transparent_60%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.platformEyebrow} title={c.platformTitle} lead={c.platformLead} />
            <div className="mt-12 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/[.08]">
                <Image src="/warriors-group-photo.jpg" alt="Warriors founding community" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover opacity-58 saturate-[.7]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-violet-950/10" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/[.08] bg-black/62 p-5 backdrop-blur-xl"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-violet-200/65">Product principle</p><p className="mt-2 text-sm leading-6 text-zinc-300">Prove paid behavior first. Build deeper software second.</p></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">{c.platformItems.map((item, index) => <div key={item.title} className="rounded-[26px] border border-white/[.075] bg-[linear-gradient(145deg,rgba(255,255,255,.025),rgba(255,255,255,.009))] p-6"><div className="flex items-start justify-between gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[.04] text-violet-200">{index === 0 ? <LayoutDashboard className="h-4 w-4" /> : index === 1 ? <MessageSquareText className="h-4 w-4" /> : index === 2 ? <Users className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}</span><span className="text-[10px] tracking-[.17em] text-zinc-800">0{index + 1}</span></div><h3 className="mt-5 text-lg font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.fitEyebrow} title={c.fitTitle} lead={c.fitLead} />
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
              <div className="rounded-[28px] border border-emerald-300/[.12] bg-emerald-300/[.025] p-6 sm:p-7"><h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100"><Check className="h-5 w-5 text-emerald-200" />{c.forYouTitle}</h3><ul className="mt-6 space-y-4">{c.forYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-400"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-200/70" />{item}</li>)}</ul></div>
              <div className="rounded-[28px] border border-white/[.08] bg-white/[.014] p-6 sm:p-7"><h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100"><X className="h-5 w-5 text-zinc-600" />{c.notForYouTitle}</h3><ul className="mt-6 space-y-4">{c.notForYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-500"><X className="mt-1 h-4 w-4 shrink-0 text-zinc-700" />{item}</li>)}</ul></div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.accessEyebrow} title={c.accessTitle} lead={c.accessLead} />
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">
              {c.access.map((item, index) => <div key={item.title} className="relative rounded-[25px] border border-white/[.075] bg-white/[.016] p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200">{index === 0 ? <Target className="h-4 w-4" /> : index === 1 ? <ShieldCheck className="h-4 w-4" /> : index === 2 ? <CircleDollarSign className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}</span><p className="mt-5 text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-700">0{index + 1}</p><h3 className="mt-2 text-sm font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-xs leading-6 text-zinc-500">{item.text}</p>{index < c.access.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-violet-300/25 md:block" /> : null}</div>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.095),transparent_58%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-[34px] border border-violet-200/[.14] bg-[linear-gradient(145deg,rgba(139,92,246,.075),rgba(255,255,255,.018)_45%,rgba(212,175,55,.02))] p-6 sm:p-9 lg:p-10">
              <div className="grid gap-9 lg:grid-cols-[1fr_.78fr] lg:items-end">
                <div><p className="text-[10px] font-semibold uppercase tracking-[.21em] text-amber-200/70">{c.priceEyebrow}</p><h2 className="section-title mt-3 text-[clamp(2.8rem,5vw,4.8rem)] text-zinc-100">{c.priceTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{c.priceDesc}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{c.priceBullets.map((item) => <div key={item} className="flex items-start gap-2 text-sm text-zinc-400"><Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-200/75" />{item}</div>)}</div></div>
                <div className="rounded-[26px] border border-white/[.085] bg-black/35 p-6"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[.18em] text-zinc-600">Warriors Founding</p><Clock3 className="h-4 w-4 text-violet-200/60" /></div><p className="mt-5 text-4xl font-semibold tracking-[-.04em] text-white">$49<span className="ml-1 text-base font-normal text-zinc-500">/mo</span></p><p className="mt-2 text-xs leading-6 text-zinc-600">{c.membershipNote}</p><div className="mt-6"><ApplyButton className="w-full" /></div><p className="mt-4 text-[11px] leading-5 text-zinc-600">{c.noCharge}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-28">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6"><SectionHeading eyebrow={c.faqEyebrow} title={c.faqTitle} /><div className="mt-10 space-y-3">{c.faq.map((item) => <details key={item.q} className="group rounded-[22px] border border-white/[.075] bg-white/[.016] p-5 open:border-violet-300/15"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200"><span>{item.q}</span><ArrowRight className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-90" /></summary><p className="mt-4 pr-6 text-sm leading-7 text-zinc-500">{item.a}</p></details>)}</div></div>
        </section>

        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,.10),transparent_64%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-violet-200/70">{c.finalEyebrow}</p><h2 className="section-title mx-auto mt-4 max-w-4xl text-[clamp(3rem,6vw,5.7rem)] leading-[.95] text-zinc-100">{c.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{c.finalDesc}</p><div className="mt-8 flex justify-center"><ApplyButton /></div></div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
