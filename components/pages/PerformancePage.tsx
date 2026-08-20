"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  Clock3,
  Dumbbell,
  Leaf,
  PackageCheck,
  ShieldCheck,
  TimerReset,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
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
  truth: string;
  pouchKicker: string;
  pouchName: string;
  pouchLine: string;
  pouchPrice: string;
  pouchPriceNote: string;
  pouchPerMeal: string;
  stats: { value: string; label: string }[];
  whyEyebrow: string;
  whyTitle: string;
  whyLead: string;
  whyCards: { title: string; text: string }[];
  prepEyebrow: string;
  prepTitle: string;
  prepLead: string;
  prepSteps: { title: string; text: string }[];
  formulaEyebrow: string;
  formulaTitle: string;
  formulaLead: string;
  ingredients: { title: string; text: string }[];
  formulaNote: string;
  priceEyebrow: string;
  priceTitle: string;
  priceLead: string;
  priceCards: { title: string; value: string; text: string }[];
  pathEyebrow: string;
  pathTitle: string;
  pathLead: string;
  path: { title: string; text: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
  ctaNote: string;
  faqEyebrow: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  form: RequestField[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    badge: "Founding validation · no checkout",
    eyebrow: "Performance Complete",
    titleA: "A complete meal for the days ",
    titleB: "that move too fast.",
    lead: "One measured powdered meal for work, training, travel and late finishes. Add water, shake, eat, move on. No meal-prep ritual and no need to turn your whole diet into a system.",
    support: "V1 stays deliberately simple: validate an already proven complete-meal format, the Performance positioning, the packaging experience and willingness to pay before committing to inventory or scale.",
    primary: "Join the founding test",
    truth: "Target public format: 17 meals · 90 g serving · around 400 kcal / 40 g plant protein as the current category benchmark · target pilot price €59.90. Paid sale stays closed until the supply, repacking and label path is permitted and compliant.",
    pouchKicker: "Performance 01",
    pouchName: "COMPLETE",
    pouchLine: "Fast complete meal · active-day format",
    pouchPrice: "€59.90",
    pouchPriceNote: "target pilot price · 17 meals",
    pouchPerMeal: "≈ €3.52 / meal",
    stats: [
      { value: "17", label: "meals / pouch" },
      { value: "90 g", label: "serving format" },
      { value: "~60 sec", label: "prep target" },
      { value: "40 g", label: "protein benchmark" },
    ],
    whyEyebrow: "The job",
    whyTitle: "Not a protein shake. A fallback meal you can actually repeat.",
    whyLead: "Performance is built around the moments where normal food becomes inconvenient, not around dramatic transformation claims.",
    whyCards: [
      { title: "Work without the food scramble", text: "A measured option for the lunch that gets pushed between calls, deep work or study." },
      { title: "Training without random decisions", text: "A predictable meal-format before or after training when hunger arrives before planning does." },
      { title: "Travel without rebuilding the day", text: "Powder is lighter, easier to carry and simpler to store than a prepared-meal routine." },
      { title: "Consistency without meal prep", text: "The value is removing one recurring decision, not controlling every meal you eat." },
    ],
    prepEyebrow: "The format",
    prepTitle: "Water. Portion. Shake. Done.",
    prepLead: "The first product copies the simplicity of the strongest complete-meal category behavior, while Performance owns the use case, packaging and customer experience.",
    prepSteps: [
      { title: "Add water", text: "Cold water in a shaker or bottle." },
      { title: "Add one measured serving", text: "Working format: 90 g per meal." },
      { title: "Shake", text: "Roughly 20 seconds, or blend for a smoother texture." },
      { title: "Use it where food usually breaks", text: "Workday lunch, training, travel or a late finish." },
    ],
    formulaEyebrow: "What the benchmark is built from",
    formulaTitle: "A familiar complete-meal architecture, not a mystery blend.",
    formulaLead: "The category benchmark we are validating uses plant proteins, flaxseed, a carbohydrate/texture base, fats, fibre and a micronutrient blend. The final public ingredient list must always match the exact approved sourced batch and label.",
    ingredients: [
      { title: "Plant protein base", text: "Pea protein and brown-rice protein are the core high-protein structure in the benchmark format." },
      { title: "Flaxseed + carbohydrate base", text: "Ground flaxseed and tapioca support texture, fibre and the overall meal structure." },
      { title: "Fat system", text: "Sunflower-oil powder plus coconut/MCT components are used in the reference architecture." },
      { title: "Micronutrients", text: "A vitamin/mineral premix completes the nutrition profile alongside flavour, stabiliser and sweetener systems." },
    ],
    formulaNote: "Performance does not invent nutrition numbers. Before sale, the product page and package must use the exact ingredient, allergen, nutrition, storage and date information of the legally supplied batch.",
    priceEyebrow: "Offer test",
    priceTitle: "One concrete price so demand has something real to react to.",
    priceLead: "The site tests €59.90 for a 17-meal pouch. That is not a claim that final unit economics are solved. The point is to learn whether the use case and brand can support a price above the raw source cost before buying inventory.",
    priceCards: [
      { title: "Founding target", value: "€59.90", text: "17 meals · approximately €3.52 per meal · checkout closed during validation." },
      { title: "First flavour direction", value: "Vanilla", text: "Start with one broadly usable flavour before adding a second SKU." },
      { title: "Scale condition", value: "Repeat", text: "No broad inventory or paid acquisition until people use it and want another pouch." },
    ],
    pathEyebrow: "Asset-light launch",
    pathTitle: "Prove the customer loop before building a food company.",
    pathLead: "No team, factory or custom formulation first. The early job is to validate the product experience and economics with the smallest reversible setup.",
    path: [
      { title: "1. Demand", text: "Publish the full concept, collect use cases, flavour preference and price acceptance." },
      { title: "2. Source path", text: "Use only a supply route that explicitly permits resale/repacking and gives the documentation required for the final label." },
      { title: "3. Micro-batch", text: "Food-safe branded pouches, controlled portioning, batch traceability and a very small paid cohort." },
      { title: "4. Measure", text: "Taste, convenience, support load, margin and reorder intent are the real success metrics." },
      { title: "5. Scale only the winner", text: "If repeat demand and contribution work, improve sourcing and fulfilment. If not, stop cheaply." },
    ],
    ctaEyebrow: "Founding test",
    ctaTitle: "Would this earn a place in your week?",
    ctaLead: "Tell me when you would use it, how often, which flavour you would choose and how €59.90 feels for 17 meals.",
    ctaButton: "Join the founding test",
    ctaNote: "No payment here. You are contacted only when there is a concrete compliant product test or purchase step.",
    faqEyebrow: "Questions",
    faqTitle: "What is real now, and what is not.",
    faq: [
      { q: "Is Performance Complete for sale already?", a: "No. The full concept and price are public for demand validation, but checkout stays closed until the sourcing, repacking, label and traceability path is valid." },
      { q: "Why start from an existing complete-meal format?", a: "Because the first business question is whether the use case, packaging and Performance brand earn demand. Custom food development before that would add cost without answering the main question." },
      { q: "Is 400 kcal and 40 g protein guaranteed?", a: "Those are the current benchmark targets. Exact nutrition is only published as final product data when it matches the legally sourced batch being sold." },
      { q: "Why 17 meals?", a: "It matches a proven pouch-size behavior in the category and gives enough usage to judge convenience and repeat intent without creating a huge first order." },
      { q: "Will there be more flavours?", a: "Only after one flavour proves demand. Vanilla is the simplest first direction; chocolate is the obvious second test." },
      { q: "Will it become a subscription?", a: "Only if customers genuinely reorder. Recurring billing is an optimization after repeat behavior exists, not the first thing to build." },
    ],
    form: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "country", label: "Country", required: true, placeholder: "Where would you buy it?" },
      { id: "routine", label: "Main use case", type: "select", required: true, options: ["Work / study", "Work + training", "Travel / commuting", "Late / unpredictable days"] },
      { id: "frequency", label: "How many meals per week would you use?", type: "select", required: true, options: ["1–2", "3–4", "5–7", "More than 7"] },
      { id: "flavour", label: "First flavour", type: "select", required: true, options: ["Vanilla", "Chocolate", "No preference"] },
      { id: "priceComfort", label: "How does €59.90 for 17 meals feel?", type: "select", required: true, options: ["Too high", "Reasonable", "Good value", "I would pay more if the experience is strong"] },
      { id: "message", label: "When would this replace a bad food decision?", type: "textarea", required: true, placeholder: "The recurring situation where a fast complete meal would actually help" },
    ],
  },
  ua: {
    badge: "Перша валідація · без оплати",
    eyebrow: "Performance Complete",
    titleA: "Повноцінний прийом їжі для днів, ",
    titleB: "які рухаються надто швидко.",
    lead: "Один порційний порошковий прийом їжі для роботи, тренувань, дороги та пізніх завершень дня. Додати воду, збовтати, поїсти й рухатися далі. Без постійного meal prep і без перетворення всього раціону на систему.",
    support: "V1 навмисно простий: перевіряємо вже доведений формат complete meal, позиціонування Performance, досвід упаковки та готовність платити до великих закупівель або масштабування.",
    primary: "Долучитися до першого тесту",
    truth: "Цільовий публічний формат: 17 прийомів · порція 90 г · близько 400 ккал / 40 г рослинного білка як поточний категорійний орієнтир · цільова ціна пілоту €59.90. Оплата закрита, доки шлях постачання, перепакування та маркування не буде дозволеним і коректним.",
    pouchKicker: "Performance 01",
    pouchName: "COMPLETE",
    pouchLine: "Швидкий complete meal · формат для активного дня",
    pouchPrice: "€59.90",
    pouchPriceNote: "цільова ціна пілоту · 17 прийомів",
    pouchPerMeal: "≈ €3.52 / прийом",
    stats: [
      { value: "17", label: "прийомів / пакет" },
      { value: "90 г", label: "формат порції" },
      { value: "~60 сек", label: "ціль приготування" },
      { value: "40 г", label: "орієнтир білка" },
    ],
    whyEyebrow: "Завдання продукту",
    whyTitle: "Не протеїновий шейк. Запасний повноцінний прийом їжі, який легко повторювати.",
    whyLead: "Performance створюється навколо моментів, коли звичайне харчування стає незручним, а не навколо гучних обіцянок трансформації.",
    whyCards: [
      { title: "Робота без хаосу з їжею", text: "Виміряний варіант для обіду, який постійно зсувається між дзвінками, фокусною роботою або навчанням." },
      { title: "Тренування без випадкових рішень", text: "Передбачуваний формат до або після тренування, коли голод приходить раніше, ніж план." },
      { title: "Дорога без перебудови дня", text: "Порошок легше переносити й зберігати, ніж готові страви або складний meal prep." },
      { title: "Стабільність без meal prep", text: "Цінність у тому, щоб прибрати одне повторюване рішення, а не контролювати весь раціон." },
    ],
    prepEyebrow: "Формат",
    prepTitle: "Вода. Порція. Збовтати. Готово.",
    prepLead: "Перший продукт бере простоту найсильнішої поведінки в категорії complete meal, а Performance відповідає за сценарій використання, упаковку та досвід клієнта.",
    prepSteps: [
      { title: "Додати воду", text: "Холодна вода в шейкер або пляшку." },
      { title: "Додати одну порцію", text: "Робочий формат: 90 г на прийом." },
      { title: "Збовтати", text: "Приблизно 20 секунд або використати блендер." },
      { title: "Використати там, де їжа зазвичай зривається", text: "Робочий обід, тренування, дорога або пізній день." },
    ],
    formulaEyebrow: "З чого побудований орієнтир",
    formulaTitle: "Знайома архітектура complete meal, а не загадкова суміш.",
    formulaLead: "Категорійний орієнтир, який ми перевіряємо, використовує рослинні білки, льон, вуглеводну/текстурну основу, жири, клітковину та мікронутрієнти. Фінальний публічний склад завжди має точно відповідати дозволеній партії та етикетці.",
    ingredients: [
      { title: "Рослинна білкова база", text: "Гороховий і рисовий білок формують основну високобілкову частину орієнтирного формату." },
      { title: "Льон + вуглеводна база", text: "Мелений льон і тапіока підтримують текстуру, клітковину та структуру прийому їжі." },
      { title: "Жирова система", text: "У референсній архітектурі використовуються порошкова соняшникова олія та компоненти кокосу/MCT." },
      { title: "Мікронутрієнти", text: "Вітамінно-мінеральна суміш доповнює профіль разом зі смаком, стабілізатором і підсолоджувачем." },
    ],
    formulaNote: "Performance не вигадує цифри харчової цінності. Перед продажем сторінка й упаковка мають використовувати точні дані про склад, алергени, харчову цінність, зберігання та строки саме тієї партії, що легально продається.",
    priceEyebrow: "Тест оферу",
    priceTitle: "Одна конкретна ціна, щоб попит міг відреагувати на щось реальне.",
    priceLead: "Сайт перевіряє €59.90 за пакет на 17 прийомів. Це не означає, що фінальна економіка вже вирішена. Ми перевіряємо, чи сценарій і бренд підтримують ціну вище за сировинну закупівлю до інвестицій у запас.",
    priceCards: [
      { title: "Ціль для founding test", value: "€59.90", text: "17 прийомів · приблизно €3.52 за прийом · checkout закритий під час валідації." },
      { title: "Перший смак", value: "Vanilla", text: "Один максимально універсальний смак до появи другого SKU." },
      { title: "Умова масштабування", value: "Repeat", text: "Жодних великих запасів або платного залучення, доки люди не використають продукт і не захочуть ще один пакет." },
    ],
    pathEyebrow: "Asset-light запуск",
    pathTitle: "Спочатку довести цикл клієнта, а не будувати харчову компанію.",
    pathLead: "На старті не потрібні штат, фабрика чи власна формула. Потрібно перевірити продукт, досвід та економіку найменшою зворотною системою.",
    path: [
      { title: "1. Попит", text: "Публікуємо повну концепцію й збираємо сценарії, смак та реакцію на ціну." },
      { title: "2. Шлях постачання", text: "Використовуємо лише постачання, яке прямо дозволяє перепродаж/перепакування і дає документи для коректного маркування." },
      { title: "3. Мікропартія", text: "Харчові пакети, контрольоване фасування, відстеження партії та дуже мала платна когорта." },
      { title: "4. Вимірювання", text: "Смак, зручність, навантаження підтримки, маржа та бажання повторної покупки." },
      { title: "5. Масштаб тільки переможця", text: "Якщо повтор і contribution працюють, покращуємо закупівлю та fulfillment. Якщо ні, дешево зупиняємося." },
    ],
    ctaEyebrow: "Перший тест",
    ctaTitle: "Чи заслужив би цей продукт місце у вашому тижні?",
    ctaLead: "Розкажіть, коли використовували б його, як часто, який смак обрали б і як сприймаєте €59.90 за 17 прийомів.",
    ctaButton: "Долучитися до першого тесту",
    ctaNote: "Без оплати. Ми зв’яжемося лише тоді, коли буде конкретний легальний тест продукту або крок покупки.",
    faqEyebrow: "Питання",
    faqTitle: "Що вже реальне, а що ще ні.",
    faq: [
      { q: "Performance Complete вже продається?", a: "Ні. Повна концепція та ціна публічні для перевірки попиту, але checkout закритий, доки постачання, перепакування, маркування та простежуваність не будуть коректними." },
      { q: "Чому починати з уже існуючого формату complete meal?", a: "Бо перше бізнес-питання — чи потрібні людям цей сценарій, упаковка та бренд Performance. Власна харчова розробка до цього додає витрати, але не відповідає на головне питання." },
      { q: "400 ккал і 40 г білка гарантовані?", a: "Це поточні категорійні орієнтири. Точні значення стають фінальними лише тоді, коли вони відповідають конкретній легально придбаній партії." },
      { q: "Чому 17 прийомів?", a: "Це перевірений розмір пакета в категорії, який дає достатньо використань, щоб оцінити зручність і бажання повторної покупки." },
      { q: "Буде більше смаків?", a: "Лише після підтвердження одного. Vanilla — найпростіший перший напрям, Chocolate — очевидний другий тест." },
      { q: "Буде підписка?", a: "Лише якщо клієнти реально повторно купують. Регулярна оплата — оптимізація після появи repeat behavior, а не перша задача." },
    ],
    form: [
      { id: "name", label: "Ваше ім’я", required: true, placeholder: "Ім’я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "country", label: "Країна", required: true, placeholder: "Де ви купували б продукт?" },
      { id: "routine", label: "Головний сценарій", type: "select", required: true, options: ["Робота / навчання", "Робота + тренування", "Дорога / подорожі", "Пізні / непередбачувані дні"] },
      { id: "frequency", label: "Скільки прийомів на тиждень використовували б?", type: "select", required: true, options: ["1–2", "3–4", "5–7", "Більше 7"] },
      { id: "flavour", label: "Перший смак", type: "select", required: true, options: ["Vanilla", "Chocolate", "Без різниці"] },
      { id: "priceComfort", label: "Як сприймаєте €59.90 за 17 прийомів?", type: "select", required: true, options: ["Занадто дорого", "Нормально", "Хороша цінність", "Заплатив би більше за сильний досвід"] },
      { id: "message", label: "Коли це замінило б погане рішення з їжею?", type: "textarea", required: true, placeholder: "Повторювана ситуація, де швидкий complete meal реально допоміг би" },
    ],
  },
  ru: {
    badge: "Первая валидация · без оплаты",
    eyebrow: "Performance Complete",
    titleA: "Полноценный приём пищи для дней, ",
    titleB: "которые движутся слишком быстро.",
    lead: "Один порционный порошковый приём пищи для работы, тренировок, дороги и поздних завершений дня. Добавить воду, встряхнуть, поесть и двигаться дальше. Без постоянного meal prep и без превращения всего рациона в систему.",
    support: "V1 намеренно простой: проверяем уже доказанный формат complete meal, позиционирование Performance, опыт упаковки и готовность платить до больших закупок или масштабирования.",
    primary: "Присоединиться к первому тесту",
    truth: "Целевой публичный формат: 17 приёмов · порция 90 г · около 400 ккал / 40 г растительного белка как текущий категорийный ориентир · целевая цена пилота €59.90. Оплата закрыта, пока путь поставки, перепаковки и маркировки не будет разрешённым и корректным.",
    pouchKicker: "Performance 01",
    pouchName: "COMPLETE",
    pouchLine: "Быстрый complete meal · формат для активного дня",
    pouchPrice: "€59.90",
    pouchPriceNote: "целевая цена пилота · 17 приёмов",
    pouchPerMeal: "≈ €3.52 / приём",
    stats: [
      { value: "17", label: "приёмов / пакет" },
      { value: "90 г", label: "формат порции" },
      { value: "~60 сек", label: "цель приготовления" },
      { value: "40 г", label: "ориентир белка" },
    ],
    whyEyebrow: "Задача продукта",
    whyTitle: "Не протеиновый шейк. Запасной полноценный приём пищи, который легко повторять.",
    whyLead: "Performance строится вокруг моментов, когда обычная еда становится неудобной, а не вокруг громких обещаний трансформации.",
    whyCards: [
      { title: "Работа без хаоса с едой", text: "Измеренный вариант для обеда, который постоянно сдвигается между звонками, фокусной работой или учёбой." },
      { title: "Тренировка без случайных решений", text: "Предсказуемый формат до или после тренировки, когда голод приходит раньше, чем план." },
      { title: "Дорога без перестройки дня", text: "Порошок легче переносить и хранить, чем готовые блюда или сложный meal prep." },
      { title: "Стабильность без meal prep", text: "Ценность в том, чтобы убрать одно повторяющееся решение, а не контролировать весь рацион." },
    ],
    prepEyebrow: "Формат",
    prepTitle: "Вода. Порция. Встряхнуть. Готово.",
    prepLead: "Первый продукт берёт простоту самой сильной модели поведения в категории complete meal, а Performance отвечает за сценарий использования, упаковку и клиентский опыт.",
    prepSteps: [
      { title: "Добавить воду", text: "Холодная вода в шейкер или бутылку." },
      { title: "Добавить одну порцию", text: "Рабочий формат: 90 г на приём." },
      { title: "Встряхнуть", text: "Примерно 20 секунд или использовать блендер." },
      { title: "Использовать там, где питание обычно срывается", text: "Рабочий обед, тренировка, дорога или поздний день." },
    ],
    formulaEyebrow: "Из чего построен ориентир",
    formulaTitle: "Знакомая архитектура complete meal, а не загадочная смесь.",
    formulaLead: "Категорийный ориентир, который мы проверяем, использует растительные белки, лён, углеводную/текстурную основу, жиры, клетчатку и микронутриенты. Финальный публичный состав всегда должен точно соответствовать разрешённой партии и этикетке.",
    ingredients: [
      { title: "Растительная белковая база", text: "Гороховый и рисовый белок формируют основную высокобелковую часть ориентирного формата." },
      { title: "Лён + углеводная база", text: "Молотый лён и тапиока поддерживают текстуру, клетчатку и структуру приёма пищи." },
      { title: "Жировая система", text: "В референсной архитектуре используются порошковое подсолнечное масло и компоненты кокоса/MCT." },
      { title: "Микронутриенты", text: "Витаминно-минеральная смесь дополняет профиль вместе со вкусом, стабилизатором и подсластителем." },
    ],
    formulaNote: "Performance не придумывает цифры пищевой ценности. Перед продажей страница и упаковка должны использовать точные данные о составе, аллергенах, питательной ценности, хранении и сроках именно той партии, которая легально продаётся.",
    priceEyebrow: "Тест оффера",
    priceTitle: "Одна конкретная цена, чтобы спрос мог отреагировать на что-то реальное.",
    priceLead: "Сайт проверяет €59.90 за пакет на 17 приёмов. Это не значит, что финальная экономика уже решена. Мы проверяем, поддерживают ли сценарий и бренд цену выше сырьевой закупки до инвестиций в запас.",
    priceCards: [
      { title: "Цель founding test", value: "€59.90", text: "17 приёмов · примерно €3.52 за приём · checkout закрыт во время валидации." },
      { title: "Первый вкус", value: "Vanilla", text: "Один максимально универсальный вкус до появления второго SKU." },
      { title: "Условие масштабирования", value: "Repeat", text: "Никаких больших запасов или платного привлечения, пока люди не используют продукт и не захотят ещё один пакет." },
    ],
    pathEyebrow: "Asset-light запуск",
    pathTitle: "Сначала доказать клиентский цикл, а не строить пищевую компанию.",
    pathLead: "На старте не нужны штат, фабрика или собственная формула. Нужно проверить продукт, опыт и экономику самой маленькой обратимой системой.",
    path: [
      { title: "1. Спрос", text: "Публикуем полную концепцию и собираем сценарии, вкус и реакцию на цену." },
      { title: "2. Путь поставки", text: "Используем только поставку, которая прямо разрешает перепродажу/перепаковку и даёт документы для корректной маркировки." },
      { title: "3. Микропартия", text: "Пищевые пакеты, контролируемая фасовка, прослеживаемость партии и очень маленькая платная когорта." },
      { title: "4. Измерение", text: "Вкус, удобство, нагрузка поддержки, маржа и желание повторной покупки." },
      { title: "5. Масштаб только победителя", text: "Если повтор и contribution работают, улучшаем закупку и fulfillment. Если нет, дёшево останавливаемся." },
    ],
    ctaEyebrow: "Первый тест",
    ctaTitle: "Заслужил бы этот продукт место в вашей неделе?",
    ctaLead: "Расскажите, когда использовали бы его, как часто, какой вкус выбрали бы и как воспринимаете €59.90 за 17 приёмов.",
    ctaButton: "Присоединиться к первому тесту",
    ctaNote: "Без оплаты. Мы свяжемся только тогда, когда будет конкретный легальный тест продукта или шаг покупки.",
    faqEyebrow: "Вопросы",
    faqTitle: "Что уже реально, а что ещё нет.",
    faq: [
      { q: "Performance Complete уже продаётся?", a: "Нет. Полная концепция и цена публичны для проверки спроса, но checkout закрыт, пока поставка, перепаковка, маркировка и прослеживаемость не будут корректными." },
      { q: "Почему начинать с уже существующего формата complete meal?", a: "Потому что первый бизнес-вопрос — нужны ли людям этот сценарий, упаковка и бренд Performance. Собственная пищевая разработка до этого добавляет расходы, но не отвечает на главный вопрос." },
      { q: "400 ккал и 40 г белка гарантированы?", a: "Это текущие категорийные ориентиры. Точные значения становятся финальными только тогда, когда они соответствуют конкретной легально закупленной партии." },
      { q: "Почему 17 приёмов?", a: "Это проверенный размер пакета в категории, который даёт достаточно использований, чтобы оценить удобство и желание повторной покупки." },
      { q: "Будет больше вкусов?", a: "Только после подтверждения одного. Vanilla — самый простой первый вариант, Chocolate — очевидный второй тест." },
      { q: "Будет подписка?", a: "Только если клиенты реально повторно покупают. Регулярная оплата — оптимизация после появления repeat behavior, а не первая задача." },
    ],
    form: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "country", label: "Страна", required: true, placeholder: "Где вы покупали бы продукт?" },
      { id: "routine", label: "Главный сценарий", type: "select", required: true, options: ["Работа / учёба", "Работа + тренировки", "Дорога / путешествия", "Поздние / непредсказуемые дни"] },
      { id: "frequency", label: "Сколько приёмов в неделю использовали бы?", type: "select", required: true, options: ["1–2", "3–4", "5–7", "Больше 7"] },
      { id: "flavour", label: "Первый вкус", type: "select", required: true, options: ["Vanilla", "Chocolate", "Без разницы"] },
      { id: "priceComfort", label: "Как воспринимаете €59.90 за 17 приёмов?", type: "select", required: true, options: ["Слишком дорого", "Нормально", "Хорошая ценность", "Заплатил бы больше за сильный опыт"] },
      { id: "message", label: "Когда это заменило бы плохое решение с едой?", type: "textarea", required: true, placeholder: "Повторяющаяся ситуация, где быстрый complete meal реально помог бы" },
    ],
  },
};

const whyIcons = [Briefcase, Dumbbell, PackageCheck, Check];
const prepIcons = [UtensilsCrossed, PackageCheck, TimerReset, Zap];

export function PerformancePage() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const x = COPY[lang];
  const modal = PERFORMANCE_DIALOG[lang];

  return (
    <div className="min-h-screen overflow-hidden bg-[#020403] text-white">
      <Header />

      <main>
        <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[760px] w-[1100px] max-w-[100vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(110,231,183,.13),rgba(212,175,55,.045)_38%,transparent_72%)]" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/80">{x.eyebrow}</span>
                  <span className="rounded-full border border-emerald-300/[.16] bg-emerald-300/[.045] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-emerald-100/70">{x.badge}</span>
                </div>

                <h1 className="mt-5 text-[clamp(3.2rem,7vw,6.7rem)] font-semibold leading-[.9] tracking-[-.055em] text-zinc-100">
                  {x.titleA}<em className="bg-gradient-to-br from-emerald-100 via-emerald-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{x.titleB}</em>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{x.lead}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">{x.support}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <RequestDialog
                    intent={DROP_INTENT}
                    title={modal.title}
                    description={modal.description}
                    successTitle={modal.successTitle}
                    successMessage={modal.successMessage}
                    buttonLabel="Performance page - founding test"
                    fields={x.form}
                    context={{ concept: "performance_complete", stage: "demand_validation", source: "performance_page", locale: lang }}
                  >
                    <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("drop_interest_open", { source: "performance_page" })}>
                      {x.primary}<ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </RequestDialog>
                </div>

                <p className="mt-5 max-w-2xl text-xs leading-6 text-zinc-600">{x.truth}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7 }}>
                <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-[40px] border border-emerald-300/[.14] bg-[linear-gradient(145deg,rgba(110,231,183,.08),rgba(255,255,255,.018)_45%,rgba(0,0,0,.65))] p-5 shadow-[0_60px_160px_-70px_rgba(16,185,129,.35)] sm:p-7">
                  <div className="relative mx-auto flex min-h-[510px] max-w-[360px] flex-col justify-between overflow-hidden rounded-[34px_34px_24px_24px] border border-white/[.12] bg-[linear-gradient(155deg,#111712,#050706_52%,#010201)] p-7 shadow-2xl">
                    <div className="absolute -right-20 top-12 h-48 w-48 rounded-full bg-emerald-300/10 blur-3xl" />
                    <div className="absolute -left-20 bottom-10 h-44 w-44 rounded-full bg-amber-300/[.055] blur-3xl" />
                    <div className="relative">
                      <p className="text-[10px] font-semibold uppercase tracking-[.26em] text-emerald-200/75">{x.pouchKicker}</p>
                      <h2 className="mt-4 text-5xl font-black tracking-[-.06em] text-white sm:text-6xl">{x.pouchName}</h2>
                      <p className="mt-3 max-w-[230px] text-sm leading-6 text-zinc-400">{x.pouchLine}</p>
                    </div>
                    <div className="relative grid grid-cols-2 gap-2">
                      {x.stats.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4">
                          <p className="text-xl font-semibold text-zinc-100">{item.value}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[.11em] text-zinc-600">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="relative border-t border-white/[.08] pt-5">
                      <div className="flex items-end justify-between gap-4">
                        <div><p className="text-3xl font-semibold text-white">{x.pouchPrice}</p><p className="mt-1 text-[10px] text-zinc-600">{x.pouchPriceNote}</p></div>
                        <p className="text-xs text-emerald-200/75">{x.pouchPerMeal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[.06] bg-white/[.012] px-4 py-20 sm:py-24">
          <div className="container mx-auto max-w-6xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/70">{x.whyEyebrow}</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.04em] text-zinc-100 sm:text-5xl">{x.whyTitle}</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">{x.whyLead}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {x.whyCards.map((card, index) => {
                const Icon = whyIcons[index] ?? Check;
                return <motion.div key={card.title} whileHover={reduced ? undefined : { y: -5 }} className="rounded-[24px] border border-white/[.08] bg-black/30 p-6"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/16 bg-emerald-300/[.05] text-emerald-200"><Icon className="h-4 w-4" /></span><h3 className="mt-5 text-lg font-semibold text-zinc-100">{card.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{card.text}</p></motion.div>;
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-200/70">{x.prepEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-zinc-100 sm:text-5xl">{x.prepTitle}</h2><p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">{x.prepLead}</p></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {x.prepSteps.map((step, index) => { const Icon = prepIcons[index] ?? Check; return <div key={step.title} className="rounded-[24px] border border-white/[.08] bg-white/[.018] p-6"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/14 bg-amber-300/[.04] text-amber-200"><Icon className="h-4 w-4" /></span><span className="text-[10px] font-semibold tracking-[.14em] text-zinc-700">0{index + 1}</span></div><h3 className="mt-5 text-base font-semibold text-zinc-100">{step.title}</h3><p className="mt-2 text-sm leading-7 text-zinc-500">{step.text}</p></div>; })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[.06] bg-emerald-300/[.018] px-4 py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/70">{x.formulaEyebrow}</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.04em] text-zinc-100 sm:text-5xl">{x.formulaTitle}</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">{x.formulaLead}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {x.ingredients.map((item) => <div key={item.title} className="rounded-[24px] border border-white/[.08] bg-black/28 p-6"><div className="flex items-center gap-3"><Leaf className="h-4 w-4 text-emerald-200" /><h3 className="font-semibold text-zinc-100">{item.title}</h3></div><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></div>)}
            </div>
            <div className="mt-5 rounded-2xl border border-amber-300/[.12] bg-amber-300/[.025] p-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-amber-200" /><p className="text-xs leading-6 text-zinc-500">{x.formulaNote}</p></div></div>
          </div>
        </section>

        <section className="px-4 py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/70">{x.priceEyebrow}</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.04em] text-zinc-100 sm:text-5xl">{x.priceTitle}</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">{x.priceLead}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">{x.priceCards.map((item) => <div key={item.title} className="rounded-[26px] border border-white/[.08] bg-white/[.018] p-7"><p className="text-[10px] uppercase tracking-[.16em] text-zinc-600">{item.title}</p><p className="mt-4 text-3xl font-semibold tracking-[-.03em] text-zinc-100">{item.value}</p><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></div>)}</div>
          </div>
        </section>

        <section className="border-y border-white/[.06] bg-white/[.012] px-4 py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl">
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-200/70">{x.pathEyebrow}</p><h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.04em] text-zinc-100 sm:text-5xl">{x.pathTitle}</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">{x.pathLead}</p>
            <div className="mt-10 grid gap-3">{x.path.map((step) => <div key={step.title} className="grid gap-3 rounded-[22px] border border-white/[.07] bg-black/25 p-5 sm:grid-cols-[220px_1fr] sm:items-start"><h3 className="font-semibold text-zinc-100">{step.title}</h3><p className="text-sm leading-7 text-zinc-500">{step.text}</p></div>)}</div>
          </div>
        </section>

        <section className="px-4 py-20 sm:py-28">
          <div className="container mx-auto max-w-5xl rounded-[34px] border border-emerald-300/[.14] bg-[linear-gradient(145deg,rgba(110,231,183,.07),rgba(255,255,255,.018)_48%,rgba(0,0,0,.5))] p-7 sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/70">{x.ctaEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-zinc-100 sm:text-5xl">{x.ctaTitle}</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">{x.ctaLead}</p>
            <div className="mt-7"><RequestDialog intent={DROP_INTENT} title={modal.title} description={modal.description} successTitle={modal.successTitle} successMessage={modal.successMessage} buttonLabel="Performance page - closing founding test" fields={x.form} context={{ concept: "performance_complete", stage: "demand_validation", source: "performance_page_closing", locale: lang }}><Button className="premium-button h-auto min-h-12 px-7 py-3" onClick={() => track("drop_interest_open", { source: "performance_page_closing" })}>{x.ctaButton}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog></div>
            <p className="mt-4 text-xs leading-6 text-zinc-600">{x.ctaNote}</p>
          </div>
        </section>

        <section className="border-t border-white/[.06] px-4 py-20 sm:py-28">
          <div className="container mx-auto max-w-5xl"><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-zinc-600">{x.faqEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-zinc-100 sm:text-5xl">{x.faqTitle}</h2><div className="mt-9 divide-y divide-white/[.07] border-y border-white/[.07]">{x.faq.map((item) => <div key={item.q} className="py-6"><h3 className="text-base font-semibold text-zinc-200">{item.q}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.a}</p></div>)}</div></div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
