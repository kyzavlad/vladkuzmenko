"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  X,
  Zap,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { DROP_INTENT } from "@/lib/ecosystem";
import { PERFORMANCE_DIALOG } from "@/lib/performance";
import type { Lang } from "@/lib/i18n";

type Copy = {
  badge: string;
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  support: string;
  primary: string;
  secondary: string;
  truth: string;
  mockKicker: string;
  mockStatus: string;
  mockName: string;
  mockLine: string;
  mockStats: { value: string; label: string }[];
  mockTags: string[];
  conceptEyebrow: string;
  conceptTitle: string;
  conceptLead: string;
  conceptCards: { title: string; text: string }[];
  momentsEyebrow: string;
  momentsTitle: string;
  momentsLead: string;
  moments: { title: string; text: string; tag: string }[];
  differenceEyebrow: string;
  differenceTitle: string;
  differenceLead: string;
  difference: { title: string; text: string }[];
  notTitle: string;
  notItems: string[];
  pilotEyebrow: string;
  pilotTitle: string;
  pilotLead: string;
  pilotSteps: { title: string; text: string }[];
  pilotFacts: { title: string; value: string; note: string }[];
  priceEyebrow: string;
  priceTitle: string;
  priceLead: string;
  priceCards: { title: string; value: string; text: string }[];
  waitEyebrow: string;
  waitTitle: string;
  waitLead: string;
  waitCta: string;
  waitNote: string;
  faqEyebrow: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  form: RequestField[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    badge: "Pilot list open · no payment",
    eyebrow: "Performance · ready meals for active days",
    titleA: "Food that fits the day. ",
    titleB: "Not the other way around.",
    lead: "Performance is a ready-meal brand for people moving between work, training, commuting and life. The first pilot is built to remove the two meals most likely to become a bad last-minute decision.",
    support: "The model is intentionally narrow: one city, one production partner, one compact meal set and scheduled delivery. We validate the routine before scaling the menu, geography or software.",
    primary: "Request a pilot invite",
    secondary: "See the Core Set",
    truth: "This is product validation, not a pre-order. Nothing is charged until production, food-safety, delivery and unit economics are confirmed.",
    mockKicker: "Pilot concept",
    mockStatus: "validation",
    mockName: "CORE SET",
    mockLine: "Six ready meals for three busy days.",
    mockStats: [
      { value: "6", label: "ready meals" },
      { value: "3", label: "busy days" },
      { value: "2", label: "friction meals / day" },
    ],
    mockTags: ["Work", "Move", "Train", "Recover"],
    conceptEyebrow: "The first product",
    conceptTitle: "Cover the weak points in the routine, not every meal of the day.",
    conceptLead: "Most meal plans try to control an entire day. Core Set starts smaller: protect the moments when a busy schedule usually turns into skipped food, random takeout or another cooking task.",
    conceptCards: [
      { title: "Real ready food", text: "Cooked meals you can take, heat and eat. No powder-first positioning and no restaurant ordering loop every day." },
      { title: "A compact set", text: "The working pilot hypothesis is six meals covering three high-friction days instead of five boxes arriving for every day." },
      { title: "Clear nutrition", text: "Recipes should show ingredients, calories and macros clearly once the production specification is final." },
      { title: "Scheduled convenience", text: "Fewer planned deliveries should make the routine simpler and the operating model more predictable." },
    ],
    momentsEyebrow: "Where it earns its place",
    momentsTitle: "Built for the transitions that normally break the plan.",
    momentsLead: "Performance is not only for gym days. The useful product has to survive a normal week with work, movement, training and changing plans.",
    moments: [
      { title: "Workday", text: "A dependable lunch or later meal when meetings, calls and focused work leave no room for cooking.", tag: "Desk → next task" },
      { title: "Work → training", text: "A prepared option for the gap before or after training instead of improvising when hunger is already high.", tag: "Office → gym" },
      { title: "Busy evening", text: "A simple fallback when travel, errands or a late finish would otherwise turn dinner into random delivery.", tag: "Day → night" },
    ],
    differenceEyebrow: "The position",
    differenceTitle: "Convenience without turning food into a full-time project.",
    differenceLead: "The product is designed around a repeatable behavior, not around a dramatic diet promise. If it cannot make an ordinary week easier, it does not deserve to scale.",
    difference: [
      { title: "Routine first", text: "Start from the customer's real schedule and the meals that fail most often." },
      { title: "Narrow choice", text: "A limited rotating menu is easier to trust, produce, improve and repeat than an endless catalog at the pilot stage." },
      { title: "Useful transparency", text: "Ingredients, allergens and nutrition should be easy to understand once recipes are locked." },
      { title: "No lock-in tricks", text: "The future recurring model should be easy to pause or change; retention has to come from usefulness." },
    ],
    notTitle: "What Performance is not",
    notItems: [
      "Not a weight-loss promise or medical diet",
      "Not a bodybuilding-only meal prep service",
      "Not a five-meals-a-day program that takes over your routine",
      "Not a fake store selling before production and delivery are proven",
    ],
    pilotEyebrow: "Pilot path",
    pilotTitle: "Prove the meal, the delivery and the repeat behavior before launch.",
    pilotLead: "The first city pilot stays deliberately small. Customer feedback changes the specification before we spend money scaling inventory, logistics or software.",
    pilotSteps: [
      { title: "Interest", text: "Collect routines, pain points, desired meal frequency and price comfort from real potential customers." },
      { title: "Specification", text: "Lock the meal-set format, recipes, portions, labels, allergens, packaging and storage requirements." },
      { title: "Partner", text: "Confirm one production kitchen, quality process, costs, capacity and delivery handoff." },
      { title: "Small pilot", text: "Serve a limited cohort in one city and measure taste, convenience, delivery reliability and repeat intent." },
      { title: "Repeatability", text: "Only then decide final price, recurring cadence, menu expansion and broader geography." },
    ],
    pilotFacts: [
      { title: "Geography", value: "One city", note: "before expansion" },
      { title: "Production", value: "One partner", note: "no own kitchen first" },
      { title: "Menu", value: "Narrow", note: "improve before adding" },
      { title: "Checkout", value: "Closed", note: "until the model is ready" },
    ],
    priceEyebrow: "Pricing discipline",
    priceTitle: "No invented launch price before the real costs exist.",
    priceLead: "The site can validate willingness to pay, but the final offer only opens after food, packaging, delivery, waste and partner costs are known. That keeps the first sale honest and the recurring model economically usable.",
    priceCards: [
      { title: "Now", value: "Pilot list", text: "Free application. We learn who wants the product, when they need it and what price range feels reasonable." },
      { title: "Next", value: "Small paid pilot", text: "A limited real test only after the kitchen, food-safety process, shelf life and delivery terms are confirmed." },
      { title: "Later", value: "Recurring sets", text: "Subscription or scheduled reorder only if customers actually repeat and the unit economics hold." },
    ],
    waitEyebrow: "Performance pilot",
    waitTitle: "Help shape the first set before it becomes a catalog.",
    waitLead: "Tell us where food becomes inconvenient in your week, how many ready meals would actually help and what you would comfortably pay for a six-meal set.",
    waitCta: "Request a pilot invite",
    waitNote: "No payment. No launch-date promise. You will only be contacted when there is something concrete to test or confirm.",
    faqEyebrow: "Questions",
    faqTitle: "What is decided, and what is still being validated.",
    faq: [
      { q: "Is Performance already selling meals?", a: "No. The first product is in validation. The page collects pilot demand while production, packaging, food safety, delivery and economics are confirmed." },
      { q: "Why six meals?", a: "Six meals is the working pilot hypothesis: two high-friction meals across three busy days. The pilot can change that number if customer behavior points somewhere better." },
      { q: "Is this only for athletes?", a: "No. Training is one use case. The broader customer is someone with an active schedule who values predictable ready food around work, commuting, training and life." },
      { q: "Will you show calories and macros?", a: "That is part of the product specification. Exact values will only be published after recipes and portions are finalized and verified with the production partner." },
      { q: "Will it be a subscription?", a: "Potentially, but recurring billing is not the first thing to prove. We first need people to enjoy the meals, use them in the intended moments and want another set." },
      { q: "Where will the pilot launch?", a: "The first pilot is planned around one city and one production partner. The exact city and delivery zone will be announced only after operations are confirmed." },
    ],
    form: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / phone", type: "tel", placeholder: "@handle or number" },
      { id: "city", label: "City", required: true, placeholder: "Where would you want delivery?" },
      { id: "routine", label: "Closest routine", type: "select", required: true, options: ["Mostly work / study", "Work + training", "Travel / commuting heavy", "Unpredictable schedule"] },
      { id: "meals", label: "Ready meals that would help per week", type: "select", required: true, options: ["4–6", "6–8", "8–10", "Not sure yet"] },
      { id: "priceComfort", label: "Comfortable price for a 6-meal set", type: "select", required: true, options: ["Up to 1,200 UAH", "1,200–1,500 UAH", "1,500–1,800 UAH", "1,800+ UAH if the quality justifies it"] },
      { id: "message", label: "Where does food break down in your week?", type: "textarea", required: true, placeholder: "What usually happens, what you buy instead, and what would make the set genuinely useful" },
    ],
  },
  ua: {
    badge: "Список пілоту відкрито · без оплати",
    eyebrow: "Performance · готова їжа для активних днів",
    titleA: "Їжа підлаштовується під день. ",
    titleB: "Не навпаки.",
    lead: "Performance — бренд готових страв для людей, чий день проходить між роботою, тренуваннями, дорогою та звичайним життям. Перший пілот прибирає два прийоми їжі, які найчастіше перетворюються на випадкове рішення в останню хвилину.",
    support: "Модель навмисно вузька: одне місто, один виробничий партнер, один компактний набір і планова доставка. Спочатку перевіряємо реальний сценарій використання, а вже потім розширюємо меню, географію чи програмну частину.",
    primary: "Запросити участь у пілоті",
    secondary: "Подивитися Core Set",
    truth: "Це валідація продукту, не передзамовлення. Оплати немає, доки не підтверджені виробництво, безпека, доставка та економіка продукту.",
    mockKicker: "Концепт пілоту",
    mockStatus: "пілот",
    mockName: "CORE SET",
    mockLine: "Шість готових страв на три насичені дні.",
    mockStats: [
      { value: "6", label: "готових страв" },
      { value: "3", label: "насичені дні" },
      { value: "2", label: "складні прийоми / день" },
    ],
    mockTags: ["Робота", "Дорога", "Тренування", "Відновлення"],
    conceptEyebrow: "Перший продукт",
    conceptTitle: "Закрити слабкі місця режиму, а не контролювати кожен прийом їжі.",
    conceptLead: "Більшість раціонів намагаються керувати всім днем. Core Set починає з меншого: захищає моменти, коли щільний графік зазвичай закінчується пропущеною їжею, випадковою доставкою або ще одним обов’язком готувати.",
    conceptCards: [
      { title: "Справжня готова їжа", text: "Приготовані страви, які можна взяти, розігріти й з’їсти. Не порошок як основа і не щоденне замовлення з ресторану." },
      { title: "Компактний набір", text: "Робоча гіпотеза пілоту — шість страв на три складні дні замість п’яти контейнерів на кожен день." },
      { title: "Зрозуміле харчування", text: "Після фіналізації рецептури на кожній страві мають бути чітко вказані склад, калорійність і макронутрієнти." },
      { title: "Планова доставка", text: "Менша кількість запланованих доставок має спрощувати режим і робити операційну модель передбачуванішою." },
    ],
    momentsEyebrow: "Де продукт справді потрібен",
    momentsTitle: "Для переходів між справами, де режим зазвичай ламається.",
    momentsLead: "Performance не лише для тренувальних днів. Корисний продукт має витримувати звичайний тиждень із роботою, дорогою, тренуваннями та зміною планів.",
    moments: [
      { title: "Робочий день", text: "Надійний обід або пізніший прийом їжі, коли дзвінки, зустрічі й сфокусована робота не залишають місця для готування.", tag: "Робота → наступна справа" },
      { title: "Робота → тренування", text: "Готовий варіант до або після тренування замість імпровізації, коли голод уже сильний.", tag: "Офіс → зал" },
      { title: "Насичений вечір", text: "Простий резерв, коли дорога, справи чи пізнє завершення дня інакше перетворюють вечерю на випадкову доставку.", tag: "День → вечір" },
    ],
    differenceEyebrow: "Позиціонування",
    differenceTitle: "Зручність без перетворення харчування на окремий проєкт.",
    differenceLead: "Продукт будується навколо повторюваної поведінки, а не гучної обіцянки дієти. Якщо він не робить звичайний тиждень простішим, масштабувати його не потрібно.",
    difference: [
      { title: "Спочатку режим", text: "Відштовхуємося від реального графіка людини й тих прийомів їжі, які найчастіше зриваються." },
      { title: "Обмежений вибір", text: "Невелике змінне меню на пілоті легше контролювати, покращувати й повторювати, ніж нескінченний каталог." },
      { title: "Корисна прозорість", text: "Склад, алергени й харчова цінність мають бути зрозумілими після затвердження рецептур." },
      { title: "Без пасток підписки", text: "Майбутню регулярну модель має бути легко призупинити чи змінити; утримання повинно триматися на користі." },
    ],
    notTitle: "Чим Performance не є",
    notItems: [
      "Не обіцянка схуднення і не медична дієта",
      "Не харчування лише для бодібілдерів",
      "Не програма з п’яти прийомів на день, яка підпорядковує собі весь режим",
      "Не фальшивий магазин із продажами до готовності виробництва й доставки",
    ],
    pilotEyebrow: "Шлях до пілоту",
    pilotTitle: "Спочатку довести якість страв, доставки й повторного використання.",
    pilotLead: "Перший міський пілот навмисно невеликий. Зворотний зв’язок змінює специфікацію до того, як ми витрачаємо гроші на масштабування меню, логістики чи програмної частини.",
    pilotSteps: [
      { title: "Попит", text: "Зібрати реальні графіки, проблеми, бажану кількість страв і комфортну ціну потенційних клієнтів." },
      { title: "Специфікація", text: "Зафіксувати формат набору, рецепти, порції, маркування, алергени, пакування й умови зберігання." },
      { title: "Партнер", text: "Підтвердити одну кухню, контроль якості, собівартість, потужність і передачу в доставку." },
      { title: "Малий пілот", text: "Обслугувати обмежену групу в одному місті й виміряти смак, зручність, надійність доставки та бажання повторити." },
      { title: "Повторюваність", text: "Лише після цього визначати фінальну ціну, регулярність, розширення меню та географії." },
    ],
    pilotFacts: [
      { title: "Географія", value: "Одне місто", note: "до розширення" },
      { title: "Виробництво", value: "Один партнер", note: "без власної кухні на старті" },
      { title: "Меню", value: "Вузьке", note: "спочатку покращуємо" },
      { title: "Оплата", value: "Закрита", note: "доки модель не готова" },
    ],
    priceEyebrow: "Дисципліна ціни",
    priceTitle: "Не вигадуємо ціну запуску до появи реальних витрат.",
    priceLead: "Сайт може перевірити готовність платити, але фінальна пропозиція відкриється лише після підтвердження вартості їжі, пакування, доставки, списань і роботи партнера. Так перший продаж буде чесним, а регулярна модель — життєздатною.",
    priceCards: [
      { title: "Зараз", value: "Список пілоту", text: "Безкоштовна заявка. Дізнаємося, кому потрібен продукт, у які моменти й який діапазон ціни сприймається нормально." },
      { title: "Далі", value: "Малий платний пілот", text: "Обмежений реальний тест лише після підтвердження кухні, безпеки, терміну зберігання й доставки." },
      { title: "Пізніше", value: "Регулярні набори", text: "Підписка або планове повторне замовлення лише якщо люди реально повертаються, а економіка сходиться." },
    ],
    waitEyebrow: "Пілот Performance",
    waitTitle: "Допоможіть сформувати перший набір до того, як він стане каталогом.",
    waitLead: "Розкажіть, де харчування створює найбільше незручностей протягом тижня, скільки готових страв реально допомогло б і яку суму ви комфортно заплатили б за набір із шести страв.",
    waitCta: "Запросити участь у пілоті",
    waitNote: "Без оплати й обіцянки дати запуску. Ми напишемо лише тоді, коли буде конкретний продукт для тесту або підтвердження.",
    faqEyebrow: "Питання",
    faqTitle: "Що вже вирішено, а що ще перевіряємо.",
    faq: [
      { q: "Performance уже продає готові страви?", a: "Ні. Перший продукт проходить валідацію. Сторінка збирає попит на пілот, поки підтверджуються виробництво, пакування, безпека, доставка й економіка." },
      { q: "Чому саме шість страв?", a: "Шість страв — робоча гіпотеза пілоту: два складні прийоми їжі протягом трьох насичених днів. Пілот може змінити цю кількість, якщо поведінка клієнтів покаже кращий формат." },
      { q: "Це лише для спортсменів?", a: "Ні. Тренування — один зі сценаріїв. Ширша аудиторія — люди з активним графіком, яким потрібна передбачувана готова їжа між роботою, дорогою, тренуваннями й іншими справами." },
      { q: "Чи будуть вказані калорії та макронутрієнти?", a: "Це частина специфікації продукту. Точні значення з’являться лише після фіналізації рецептів і порцій та перевірки з виробничим партнером." },
      { q: "Буде підписка?", a: "Можливо, але регулярна оплата — не перше, що треба довести. Спочатку люди мають полюбити страви, реально використовувати їх у потрібні моменти й захотіти наступний набір." },
      { q: "Де буде перший пілот?", a: "Перший пілот планується в одному місті з одним виробничим партнером. Точне місто й зону доставки оголосимо лише після підтвердження операційної моделі." },
    ],
    form: [
      { id: "name", label: "Ваше ім’я", required: true, placeholder: "Ім’я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / телефон", type: "tel", placeholder: "@нік або номер" },
      { id: "city", label: "Місто", required: true, placeholder: "Де вам була б потрібна доставка?" },
      { id: "routine", label: "Найближчий до вас режим", type: "select", required: true, options: ["Переважно робота / навчання", "Робота + тренування", "Багато дороги / переїздів", "Непередбачуваний графік"] },
      { id: "meals", label: "Скільки готових страв допомогло б на тиждень", type: "select", required: true, options: ["4–6", "6–8", "8–10", "Поки не знаю"] },
      { id: "priceComfort", label: "Комфортна ціна за набір із 6 страв", type: "select", required: true, options: ["До 1 200 грн", "1 200–1 500 грн", "1 500–1 800 грн", "1 800+ грн, якщо якість виправдовує"] },
      { id: "message", label: "Де харчування найчастіше ламається у вашому тижні?", type: "textarea", required: true, placeholder: "Що зазвичай відбувається, що ви купуєте замість нормальної їжі та що зробило б набір справді корисним" },
    ],
  },
  ru: {
    badge: "Список пилота открыт · без оплаты",
    eyebrow: "Performance · готовая еда для активных дней",
    titleA: "Еда подстраивается под день. ",
    titleB: "Не наоборот.",
    lead: "Performance — бренд готовых блюд для людей, чей день проходит между работой, тренировками, дорогой и обычной жизнью. Первый пилот убирает два приёма пищи, которые чаще всего превращаются в случайное решение в последнюю минуту.",
    support: "Модель намеренно узкая: один город, один производственный партнёр, один компактный набор и плановая доставка. Сначала проверяем реальный сценарий использования, а уже потом расширяем меню, географию или программную часть.",
    primary: "Запросить участие в пилоте",
    secondary: "Посмотреть Core Set",
    truth: "Это валидация продукта, не предзаказ. Оплаты нет, пока не подтверждены производство, безопасность, доставка и экономика продукта.",
    mockKicker: "Концепт пилота",
    mockStatus: "пилот",
    mockName: "CORE SET",
    mockLine: "Шесть готовых блюд на три насыщенных дня.",
    mockStats: [
      { value: "6", label: "готовых блюд" },
      { value: "3", label: "насыщенных дня" },
      { value: "2", label: "сложных приёма / день" },
    ],
    mockTags: ["Работа", "Дорога", "Тренировка", "Восстановление"],
    conceptEyebrow: "Первый продукт",
    conceptTitle: "Закрыть слабые места режима, а не контролировать каждый приём пищи.",
    conceptLead: "Большинство рационов пытаются управлять всем днём. Core Set начинает с меньшего: защищает моменты, когда плотный график обычно заканчивается пропущенной едой, случайной доставкой или ещё одной обязанностью готовить.",
    conceptCards: [
      { title: "Настоящая готовая еда", text: "Приготовленные блюда, которые можно взять, разогреть и съесть. Не порошок как основа и не ежедневные заказы из ресторана." },
      { title: "Компактный набор", text: "Рабочая гипотеза пилота — шесть блюд на три сложных дня вместо пяти контейнеров на каждый день." },
      { title: "Понятное питание", text: "После финализации рецептуры на каждом блюде должны быть ясно указаны состав, калорийность и макронутриенты." },
      { title: "Плановая доставка", text: "Меньшее количество запланированных доставок должно упрощать режим и делать операционную модель предсказуемее." },
    ],
    momentsEyebrow: "Где продукт действительно нужен",
    momentsTitle: "Для переходов между делами, где режим обычно ломается.",
    momentsLead: "Performance не только для тренировочных дней. Полезный продукт должен выдерживать обычную неделю с работой, дорогой, тренировками и меняющимися планами.",
    moments: [
      { title: "Рабочий день", text: "Надёжный обед или более поздний приём пищи, когда звонки, встречи и сфокусированная работа не оставляют места для готовки.", tag: "Работа → следующая задача" },
      { title: "Работа → тренировка", text: "Готовый вариант до или после тренировки вместо импровизации, когда голод уже сильный.", tag: "Офис → зал" },
      { title: "Насыщенный вечер", text: "Простой резерв, когда дорога, дела или позднее завершение дня иначе превращают ужин в случайную доставку.", tag: "День → вечер" },
    ],
    differenceEyebrow: "Позиционирование",
    differenceTitle: "Удобство без превращения питания в отдельный проект.",
    differenceLead: "Продукт строится вокруг повторяемого поведения, а не громкого обещания диеты. Если он не делает обычную неделю проще, масштабировать его не нужно.",
    difference: [
      { title: "Сначала режим", text: "Отталкиваемся от реального графика человека и тех приёмов пищи, которые чаще всего срываются." },
      { title: "Ограниченный выбор", text: "Небольшое меняющееся меню на пилоте легче контролировать, улучшать и повторять, чем бесконечный каталог." },
      { title: "Полезная прозрачность", text: "Состав, аллергены и пищевая ценность должны быть понятными после утверждения рецептур." },
      { title: "Без ловушек подписки", text: "Будущую регулярную модель должно быть легко приостановить или изменить; удержание должно держаться на пользе." },
    ],
    notTitle: "Чем Performance не является",
    notItems: [
      "Не обещание похудения и не медицинская диета",
      "Не питание только для бодибилдеров",
      "Не программа из пяти приёмов в день, которая подчиняет себе весь режим",
      "Не фальшивый магазин с продажами до готовности производства и доставки",
    ],
    pilotEyebrow: "Путь к пилоту",
    pilotTitle: "Сначала доказать качество блюд, доставки и повторного использования.",
    pilotLead: "Первый городской пилот намеренно небольшой. Обратная связь меняет спецификацию до того, как мы тратим деньги на масштабирование меню, логистики или программной части.",
    pilotSteps: [
      { title: "Спрос", text: "Собрать реальные графики, проблемы, желаемое количество блюд и комфортную цену потенциальных клиентов." },
      { title: "Спецификация", text: "Зафиксировать формат набора, рецепты, порции, маркировку, аллергены, упаковку и условия хранения." },
      { title: "Партнёр", text: "Подтвердить одну кухню, контроль качества, себестоимость, мощность и передачу в доставку." },
      { title: "Малый пилот", text: "Обслужить ограниченную группу в одном городе и измерить вкус, удобство, надёжность доставки и желание повторить." },
      { title: "Повторяемость", text: "Только после этого определять финальную цену, регулярность, расширение меню и географии." },
    ],
    pilotFacts: [
      { title: "География", value: "Один город", note: "до расширения" },
      { title: "Производство", value: "Один партнёр", note: "без своей кухни на старте" },
      { title: "Меню", value: "Узкое", note: "сначала улучшаем" },
      { title: "Оплата", value: "Закрыта", note: "пока модель не готова" },
    ],
    priceEyebrow: "Дисциплина цены",
    priceTitle: "Не придумываем цену запуска до появления реальных затрат.",
    priceLead: "Сайт может проверить готовность платить, но финальное предложение откроется только после подтверждения стоимости еды, упаковки, доставки, списаний и работы партнёра. Так первая продажа будет честной, а регулярная модель — жизнеспособной.",
    priceCards: [
      { title: "Сейчас", value: "Список пилота", text: "Бесплатная заявка. Узнаём, кому нужен продукт, в какие моменты и какой диапазон цены воспринимается нормально." },
      { title: "Дальше", value: "Малый платный пилот", text: "Ограниченный реальный тест только после подтверждения кухни, безопасности, срока хранения и доставки." },
      { title: "Позже", value: "Регулярные наборы", text: "Подписка или плановые повторные заказы только если люди реально возвращаются, а экономика сходится." },
    ],
    waitEyebrow: "Пилот Performance",
    waitTitle: "Помогите сформировать первый набор до того, как он станет каталогом.",
    waitLead: "Расскажите, где питание создаёт больше всего неудобств в течение недели, сколько готовых блюд реально помогло бы и какую сумму вы комфортно заплатили бы за набор из шести блюд.",
    waitCta: "Запросить участие в пилоте",
    waitNote: "Без оплаты и обещания даты запуска. Мы напишем только тогда, когда будет конкретный продукт для теста или подтверждения.",
    faqEyebrow: "Вопросы",
    faqTitle: "Что уже решено, а что ещё проверяем.",
    faq: [
      { q: "Performance уже продаёт готовые блюда?", a: "Нет. Первый продукт проходит валидацию. Страница собирает спрос на пилот, пока подтверждаются производство, упаковка, безопасность, доставка и экономика." },
      { q: "Почему именно шесть блюд?", a: "Шесть блюд — рабочая гипотеза пилота: два сложных приёма пищи в течение трёх насыщенных дней. Пилот может изменить это количество, если поведение клиентов покажет лучший формат." },
      { q: "Это только для спортсменов?", a: "Нет. Тренировка — один из сценариев. Более широкая аудитория — люди с активным графиком, которым нужна предсказуемая готовая еда между работой, дорогой, тренировками и остальными делами." },
      { q: "Будут указаны калории и макронутриенты?", a: "Это часть спецификации продукта. Точные значения появятся только после финализации рецептов и порций и проверки с производственным партнёром." },
      { q: "Будет подписка?", a: "Возможно, но регулярная оплата — не первое, что нужно доказать. Сначала люди должны полюбить блюда, реально использовать их в нужные моменты и захотеть следующий набор." },
      { q: "Где будет первый пилот?", a: "Первый пилот планируется в одном городе с одним производственным партнёром. Точный город и зону доставки объявим только после подтверждения операционной модели." },
    ],
    form: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / телефон", type: "tel", placeholder: "@ник или номер" },
      { id: "city", label: "Город", required: true, placeholder: "Где вам была бы нужна доставка?" },
      { id: "routine", label: "Ближайший к вам режим", type: "select", required: true, options: ["В основном работа / учёба", "Работа + тренировки", "Много дороги / переездов", "Непредсказуемый график"] },
      { id: "meals", label: "Сколько готовых блюд помогло бы в неделю", type: "select", required: true, options: ["4–6", "6–8", "8–10", "Пока не знаю"] },
      { id: "priceComfort", label: "Комфортная цена за набор из 6 блюд", type: "select", required: true, options: ["До 1 200 грн", "1 200–1 500 грн", "1 500–1 800 грн", "1 800+ грн, если качество оправдывает"] },
      { id: "message", label: "Где питание чаще всего ломается в вашей неделе?", type: "textarea", required: true, placeholder: "Что обычно происходит, что вы покупаете вместо нормальной еды и что сделало бы набор действительно полезным" },
    ],
  },
};

const MOMENT_ICONS = [Briefcase, Dumbbell, Clock3];
const CONCEPT_ICONS = [UtensilsCrossed, PackageCheck, ShieldCheck, Truck];

export function PerformancePage() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const x = COPY[lang];
  const modal = PERFORMANCE_DIALOG[lang];
  const route = `${lang === "en" ? "" : `/${lang}`}/drop`;

  const dialog = (source: string) => ({
    intent: DROP_INTENT,
    title: modal.title,
    description: modal.description,
    submitLabel: x.waitCta,
    successTitle: modal.successTitle,
    successMessage: modal.successMessage,
    buttonLabel: `Performance pilot - ${source}`,
    fields: x.form,
    context: { concept: "performance_core_set", stage: "pilot_validation", source, locale: lang, route },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020302] text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-20 pt-28 sm:pb-28 sm:pt-36">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[760px] w-[100%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,.16),rgba(212,175,55,.045)_38%,transparent_70%)]" />
          </div>
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.03fr_.97fr] lg:gap-14">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .55 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.15em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{x.badge}
                </span>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.22em] text-emerald-200/65">{x.eyebrow}</p>
                <h1 className="section-title mt-4 max-w-3xl text-[clamp(2.75rem,5.2vw,5.15rem)] leading-[.96] tracking-[-.045em] text-zinc-100">
                  {x.titleA}<em className="bg-gradient-to-br from-emerald-100 via-emerald-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{x.titleB}</em>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{x.lead}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">{x.support}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <RequestDialog {...dialog("hero")}>
                    <Button className="premium-button h-auto min-h-12 px-7 py-3.5 text-sm sm:text-base" onClick={() => track("drop_interest_open", { source: "performance_hero" })}>
                      {x.primary}<ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </RequestDialog>
                  <a href="#core-set">
                    <Button className="h-auto min-h-12 w-full border border-emerald-300/18 bg-emerald-300/[.045] px-7 py-3.5 text-white hover:bg-emerald-300/[.085] sm:w-auto">
                      {x.secondary}<UtensilsCrossed className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <p className="mt-4 flex max-w-xl items-start gap-2 text-xs leading-6 text-zinc-600"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-200/55" />{x.truth}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .65, delay: reduced ? 0 : .08 }}>
                <InteractiveSurface accent="green" lift={false} className="overflow-hidden rounded-[32px] border border-emerald-200/[.14] bg-[linear-gradient(145deg,rgba(110,231,183,.075),rgba(255,255,255,.018)_48%,rgba(0,0,0,.68))] p-5 shadow-[0_44px_110px_-58px_rgba(52,211,153,.32)] sm:p-6">
                  <div className="rounded-[26px] border border-white/[.08] bg-[#070a08] p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-emerald-200/55">{x.mockKicker}</p>
                        <p className="mt-3 text-4xl font-semibold tracking-[-.055em] text-zinc-100 sm:text-5xl">PERFORMANCE</p>
                        <p className="mt-1 text-lg font-medium tracking-[.19em] text-amber-100/70">{x.mockName}</p>
                      </div>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-300/[.06] text-emerald-200"><Flame className="h-5 w-5" /></span>
                    </div>
                    <p className="mt-7 max-w-sm text-sm leading-7 text-zinc-400">{x.mockLine}</p>
                    <div className="mt-7 grid grid-cols-3 gap-2">
                      {x.mockStats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/[.07] bg-white/[.018] p-3.5">
                          <p className="text-2xl font-semibold tracking-[-.04em] text-zinc-100">{stat.value}</p>
                          <p className="mt-1 text-[9px] leading-4 text-zinc-600">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {x.mockTags.map((tag) => <span key={tag} className="rounded-full border border-emerald-300/[.13] bg-emerald-300/[.035] px-3 py-1.5 text-[9px] font-medium text-emerald-100/70">{tag}</span>)}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] bg-black/28 px-4 py-3.5">
                    <div><p className="text-[9px] uppercase tracking-[.15em] text-zinc-700">Performance 01</p><p className="mt-1 text-xs text-zinc-400">Core Set · {x.mockStatus}</p></div>
                    <Zap className="h-4 w-4 text-amber-200/65" />
                  </div>
                </InteractiveSurface>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="core-set" className="scroll-mt-24 border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.conceptEyebrow}</p>
              <h2 className="section-title mt-4 text-[clamp(2.35rem,4.7vw,4.5rem)] text-zinc-100">{x.conceptTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.conceptLead}</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {x.conceptCards.map((card, index) => {
                const Icon = CONCEPT_ICONS[index] ?? PackageCheck;
                return (
                  <InteractiveSurface key={card.title} accent="green" className="h-full rounded-[27px] border border-white/[.08] bg-white/[.018] p-6">
                    <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/16 bg-emerald-300/[.045] text-emerald-200"><Icon className="h-4 w-4" /></span><span className="text-[9px] tracking-[.14em] text-zinc-700">0{index + 1}</span></div>
                    <h3 className="mt-6 text-lg font-semibold text-zinc-100">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-500">{card.text}</p>
                  </InteractiveSurface>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(52,211,153,.07),transparent_64%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.momentsEyebrow}</p>
              <h2 className="section-title mt-4 text-[clamp(2.35rem,4.7vw,4.5rem)] text-zinc-100">{x.momentsTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.momentsLead}</p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {x.moments.map((moment, index) => {
                const Icon = MOMENT_ICONS[index] ?? Clock3;
                return (
                  <motion.div key={moment.title} whileHover={reduced ? undefined : { y: -5 }} className="rounded-[28px] border border-white/[.08] bg-white/[.016] p-6">
                    <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/16 bg-emerald-300/[.045] text-emerald-200"><Icon className="h-4 w-4" /></span><span className="rounded-full border border-white/[.07] px-2.5 py-1 text-[9px] text-zinc-600">{moment.tag}</span></div>
                    <h3 className="mt-6 text-lg font-semibold text-zinc-100">{moment.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-500">{moment.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.differenceEyebrow}</p>
                <h2 className="section-title mt-4 text-[clamp(2.35rem,4.5vw,4.2rem)] text-zinc-100">{x.differenceTitle}</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">{x.differenceLead}</p>
                <div className="mt-8 rounded-[26px] border border-white/[.075] bg-white/[.014] p-6">
                  <h3 className="text-sm font-semibold text-zinc-200">{x.notTitle}</h3>
                  <div className="mt-5 space-y-3">
                    {x.notItems.map((item) => <div key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-500"><X className="mt-1 h-4 w-4 shrink-0 text-zinc-700" />{item}</div>)}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {x.difference.map((card, index) => (
                  <div key={card.title} className="rounded-[27px] border border-white/[.08] bg-white/[.018] p-6">
                    <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/[.04] text-emerald-200"><Check className="h-4 w-4" /></span><span className="text-[9px] tracking-[.16em] text-zinc-800">0{index + 1}</span></div>
                    <h3 className="mt-5 text-lg font-semibold text-zinc-100">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-500">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,.08),transparent_60%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.pilotEyebrow}</p>
              <h2 className="section-title mt-4 text-[clamp(2.35rem,4.7vw,4.5rem)] text-zinc-100">{x.pilotTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.pilotLead}</p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-5">
              {x.pilotSteps.map((step, index) => (
                <div key={step.title} className="rounded-[23px] border border-white/[.075] bg-white/[.016] p-5">
                  <span className="text-[10px] font-semibold tracking-[.16em] text-emerald-200/45">0{index + 1}</span>
                  <h3 className="mt-4 text-sm font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-zinc-500">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {x.pilotFacts.map((fact, index) => {
                const icons = [MapPin, PackageCheck, UtensilsCrossed, ShieldCheck];
                const Icon = icons[index] ?? Check;
                return <div key={fact.title} className="rounded-[22px] border border-emerald-300/[.09] bg-emerald-300/[.02] p-5"><div className="flex items-center justify-between"><p className="text-[9px] uppercase tracking-[.16em] text-zinc-700">{fact.title}</p><Icon className="h-3.5 w-3.5 text-emerald-200/55" /></div><p className="mt-3 text-lg font-semibold text-zinc-100">{fact.value}</p><p className="mt-1 text-[10px] text-zinc-600">{fact.note}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-amber-200/65">{x.priceEyebrow}</p>
              <h2 className="section-title mt-4 text-[clamp(2.35rem,4.7vw,4.5rem)] text-zinc-100">{x.priceTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.priceLead}</p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {x.priceCards.map((card, index) => {
                const icons = [CalendarDays, PackageCheck, Truck];
                const Icon = icons[index] ?? PackageCheck;
                return <div key={card.title} className={`rounded-[28px] border p-6 ${index === 1 ? "border-amber-200/[.16] bg-amber-200/[.025]" : "border-white/[.08] bg-white/[.016]"}`}><div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[.17em] text-zinc-600">{card.title}</p><Icon className={`h-4 w-4 ${index === 1 ? "text-amber-200/70" : "text-emerald-200/55"}`} /></div><p className="mt-5 text-2xl font-semibold tracking-[-.035em] text-zinc-100">{card.value}</p><p className="mt-3 text-sm leading-7 text-zinc-500">{card.text}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,.10),rgba(212,175,55,.025)_45%,transparent_67%)]" />
          <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.waitEyebrow}</p>
            <h2 className="section-title mx-auto mt-4 max-w-4xl text-[clamp(2.7rem,5vw,4.9rem)] leading-[.98] text-zinc-100">{x.waitTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.waitLead}</p>
            <div className="mt-8 flex justify-center">
              <RequestDialog {...dialog("pilot_cta")}>
                <Button className="premium-button h-auto min-h-12 px-8 py-3.5 text-sm sm:text-base" onClick={() => track("drop_interest_open", { source: "performance_pilot_cta" })}>{x.waitCta}<ArrowRight className="ml-2 h-4 w-4" /></Button>
              </RequestDialog>
            </div>
            <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-zinc-600">{x.waitNote}</p>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-28">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.faqEyebrow}</p>
              <h2 className="section-title mt-4 text-[clamp(2.35rem,4.7vw,4.5rem)] text-zinc-100">{x.faqTitle}</h2>
            </div>
            <div className="mt-10 space-y-3">
              {x.faq.map((item) => (
                <details key={item.q} className="group rounded-[22px] border border-white/[.075] bg-white/[.016] p-5 open:border-emerald-300/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200"><span>{item.q}</span><ArrowRight className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-90" /></summary>
                  <p className="mt-4 pr-6 text-sm leading-7 text-zinc-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
