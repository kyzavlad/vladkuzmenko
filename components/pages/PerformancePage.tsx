"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
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
    badge: "Founding demand validation",
    eyebrow: "Performance Complete",
    titleA: "A complete meal for ",
    titleB: "fast-moving days.",
    lead: "One measured powdered meal for work, training, travel and late finishes. Add water, shake and keep moving. It gives you one predictable meal when time is limited.",
    support: "The first version validates a proven complete-meal format, Performance positioning, packaging experience and willingness to pay before inventory or scale.",
    primary: "Join the founding test",
    truth: "Target format: 17 meals · 90 g serving · around 400 kcal / 40 g plant protein as the current category benchmark · target pilot price €59.90. Paid sales open after the supply, packing, label and traceability path is compliant.",
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
    whyEyebrow: "The use case",
    whyTitle: "A repeatable complete meal for work, training and travel.",
    whyLead: "Performance is designed for the recurring moments when speed and convenience matter most, with a simple format that fits an active week.",
    whyCards: [
      { title: "Focused workdays", text: "A measured option for lunch between calls, deep work or study." },
      { title: "Training days", text: "A predictable meal format before or after training when you need something simple." },
      { title: "Travel and commuting", text: "A light, easy-to-carry format that only needs water when it is time to eat." },
      { title: "Everyday consistency", text: "One repeatable meal removes a recurring food decision from a busy day." },
    ],
    prepEyebrow: "The format",
    prepTitle: "Water. Portion. Shake. Done.",
    prepLead: "The first product keeps the preparation model intentionally simple while Performance owns the use case, packaging and customer experience.",
    prepSteps: [
      { title: "Add water", text: "Cold water in a shaker or bottle." },
      { title: "Add one measured serving", text: "Working format: 90 g per meal." },
      { title: "Shake", text: "Roughly 20 seconds, or blend for a smoother texture." },
      { title: "Use it in your active routine", text: "Workday lunch, training, travel or a late finish." },
    ],
    formulaEyebrow: "Formula benchmark",
    formulaTitle: "A clear complete-meal structure built from familiar components.",
    formulaLead: "The category benchmark uses plant proteins, flaxseed, a carbohydrate and texture base, fats, fibre and a micronutrient blend. The final public ingredient list will match the exact approved sourced batch and label.",
    ingredients: [
      { title: "Plant protein base", text: "Pea protein and brown-rice protein form the high-protein structure in the benchmark format." },
      { title: "Flaxseed + carbohydrate base", text: "Ground flaxseed and tapioca support texture, fibre and the overall meal structure." },
      { title: "Fat system", text: "Sunflower-oil powder plus coconut and medium-chain triglyceride components are used in the reference architecture." },
      { title: "Micronutrients", text: "A vitamin and mineral premix completes the nutrition profile alongside flavour, stabiliser and sweetener systems." },
    ],
    formulaNote: "Before sale, the product page and package will use the exact ingredient, allergen, nutrition, storage and date information of the legally supplied batch.",
    priceEyebrow: "Offer test",
    priceTitle: "One concrete price gives demand something real to react to.",
    priceLead: "The site tests €59.90 for a 17-meal pouch. Final unit economics will be confirmed with the compliant supply and packing route before inventory is purchased.",
    priceCards: [
      { title: "Founding target", value: "€59.90", text: "17 meals · approximately €3.52 per meal · demand validation first." },
      { title: "First flavour direction", value: "Vanilla", text: "Start with one broadly usable flavour before adding a second product variant." },
      { title: "Scale condition", value: "Reorder", text: "Inventory and paid acquisition expand after customers use the product and want another pouch." },
    ],
    pathEyebrow: "Lean launch",
    pathTitle: "Validate the customer loop with a small compliant pilot.",
    pathLead: "The early setup stays reversible: validate demand, use a documented supply route, run a controlled micro-batch and scale only after repeat demand and margin are visible.",
    path: [
      { title: "1. Demand", text: "Publish the concept and collect use cases, flavour preference and price acceptance." },
      { title: "2. Supply path", text: "Use a route that permits resale or packing and provides the documents required for the final label." },
      { title: "3. Micro-batch", text: "Use food-safe pouches, controlled portioning, batch traceability and a very small paid cohort." },
      { title: "4. Measure", text: "Track taste, convenience, support load, margin and reorder intent." },
      { title: "5. Scale", text: "Improve sourcing and fulfilment only after repeat demand and contribution margin are proven." },
    ],
    ctaEyebrow: "Founding test",
    ctaTitle: "Would this earn a place in your week?",
    ctaLead: "Tell me when you would use it, how often, which flavour you would choose and how €59.90 feels for 17 meals.",
    ctaButton: "Join the founding test",
    ctaNote: "This form validates demand. You are contacted when there is a concrete compliant product test or purchase step.",
    faqEyebrow: "Questions",
    faqTitle: "What is ready today and what comes next.",
    faq: [
      { q: "Is Performance Complete for sale already?", a: "The concept and target price are public for demand validation. Paid sales open after the sourcing, packing, label and traceability path is compliant." },
      { q: "Why start from an existing complete-meal format?", a: "It lets the first pilot answer the most important business question: whether the use case, packaging and Performance brand create real demand." },
      { q: "Are 400 kcal and 40 g protein final?", a: "They are the current category benchmark. Final nutrition data will match the exact legally sourced product batch being sold." },
      { q: "Why 17 meals?", a: "It gives enough uses to judge convenience and reorder intent while keeping the first pilot compact." },
      { q: "Will there be more flavours?", a: "The first flavour direction is vanilla. A second flavour is added after the first one proves demand." },
      { q: "Will it become a subscription?", a: "Recurring purchase becomes useful when customers naturally reorder, so repeat behavior is measured first." },
    ],
    form: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "country", label: "Country", required: true, placeholder: "Where would you buy it?" },
      { id: "routine", label: "Main use case", type: "select", required: true, options: ["Work / study", "Work + training", "Travel / commuting", "Late / unpredictable days"] },
      { id: "frequency", label: "How many meals per week would you use?", type: "select", required: true, options: ["1–2", "3–4", "5–7", "More than 7"] },
      { id: "flavour", label: "First flavour", type: "select", required: true, options: ["Vanilla", "Chocolate", "No preference"] },
      { id: "priceComfort", label: "How does €59.90 for 17 meals feel?", type: "select", required: true, options: ["Too high", "Reasonable", "Good value", "I would pay more if the experience is strong"] },
      { id: "message", label: "When would this meal help most?", type: "textarea", required: true, placeholder: "The recurring situation where a fast complete meal would be useful" },
    ],
  },
  ua: {
    badge: "Перша перевірка попиту",
    eyebrow: "Performance Complete",
    titleA: "Повноцінний прийом їжі для ",
    titleB: "швидкого ритму.",
    lead: "Одна відміряна порція порошкового харчування для роботи, тренувань, дороги та пізнього завершення дня. Додати воду, збовтати й рухатися далі. Один передбачуваний прийом їжі, коли часу мало.",
    support: "Перша версія перевіряє вже знайомий формат повноцінного порошкового харчування, позиціонування Performance, досвід упаковки та готовність платити до закупівлі запасів і масштабування.",
    primary: "Долучитися до першого тесту",
    truth: "Цільовий формат: 17 прийомів · порція 90 г · близько 400 ккал / 40 г рослинного білка як поточний орієнтир категорії · цільова ціна пілоту €59.90. Платні продажі відкриються після оформлення коректного шляху постачання, фасування, маркування та простежуваності.",
    pouchKicker: "Performance 01",
    pouchName: "COMPLETE",
    pouchLine: "Швидкий повноцінний прийом їжі · формат для активного дня",
    pouchPrice: "€59.90",
    pouchPriceNote: "цільова ціна пілоту · 17 прийомів",
    pouchPerMeal: "≈ €3.52 / прийом",
    stats: [
      { value: "17", label: "прийомів / пакет" },
      { value: "90 г", label: "формат порції" },
      { value: "~60 сек", label: "приготування" },
      { value: "40 г", label: "орієнтир білка" },
    ],
    whyEyebrow: "Сценарій використання",
    whyTitle: "Повноцінний прийом їжі для роботи, тренувань і дороги.",
    whyLead: "Performance створений для повторюваних моментів, коли особливо важливі швидкість і зручність, та легко вбудовується в активний тиждень.",
    whyCards: [
      { title: "Насичений робочий день", text: "Відміряний варіант для обіду між дзвінками, фокусною роботою або навчанням." },
      { title: "День із тренуванням", text: "Передбачуваний формат до або після тренування, коли потрібне просте рішення." },
      { title: "Дорога та подорожі", text: "Легкий формат, який зручно взяти із собою та приготувати водою у потрібний момент." },
      { title: "Щоденна стабільність", text: "Один повторюваний прийом їжі прибирає зайве рішення з насиченого дня." },
    ],
    prepEyebrow: "Формат",
    prepTitle: "Вода. Порція. Збовтати. Готово.",
    prepLead: "Перший продукт зберігає максимально простий спосіб приготування, а Performance відповідає за сценарій використання, упаковку та досвід клієнта.",
    prepSteps: [
      { title: "Додати воду", text: "Холодна вода в шейкер або пляшку." },
      { title: "Додати одну порцію", text: "Робочий формат: 90 г на прийом." },
      { title: "Збовтати", text: "Приблизно 20 секунд або використати блендер для м’якшої текстури." },
      { title: "Вбудувати у свій ритм", text: "Робочий обід, тренування, дорога або пізнє завершення дня." },
    ],
    formulaEyebrow: "Орієнтир формули",
    formulaTitle: "Зрозуміла структура повноцінного харчування зі знайомих компонентів.",
    formulaLead: "Категорійний орієнтир поєднує рослинні білки, льон, вуглеводну й текстурну основу, жири, клітковину та мікронутрієнти. Фінальний публічний склад точно відповідатиме погодженій партії та етикетці.",
    ingredients: [
      { title: "Рослинна білкова база", text: "Гороховий і рисовий білок формують високобілкову основу орієнтирного формату." },
      { title: "Льон + вуглеводна база", text: "Мелений льон і тапіока підтримують текстуру, клітковину та загальну структуру прийому їжі." },
      { title: "Жирова система", text: "В орієнтирній архітектурі використовуються порошкова соняшникова олія, кокосові компоненти та середньоланцюгові тригліцериди." },
      { title: "Мікронутрієнти", text: "Вітамінно-мінеральна суміш доповнює харчовий профіль разом зі смаковими компонентами, стабілізатором і підсолоджувачем." },
    ],
    formulaNote: "Перед продажем сторінка та упаковка використовуватимуть точні дані про склад, алергени, харчову цінність, умови зберігання та строки конкретної легально отриманої партії.",
    priceEyebrow: "Перевірка пропозиції",
    priceTitle: "Одна конкретна ціна дає змогу чесно перевірити попит.",
    priceLead: "Сайт перевіряє €59.90 за пакет на 17 прийомів. Фінальну економіку підтвердимо після вибору легального постачання та фасування, до закупівлі запасів.",
    priceCards: [
      { title: "Ціль першого тесту", value: "€59.90", text: "17 прийомів · приблизно €3.52 за прийом · спочатку перевіряємо попит." },
      { title: "Перший смак", value: "Ваніль", text: "Починаємо з одного універсального смаку, а потім за потреби додаємо другий варіант." },
      { title: "Умова масштабування", value: "Повторна покупка", text: "Запаси й платне залучення збільшуються після реального використання та повторного попиту." },
    ],
    pathEyebrow: "Компактний запуск",
    pathTitle: "Перевірити клієнтський цикл малою легальною партією.",
    pathLead: "Стартова система залишається легкою та зворотною: перевірити попит, обрати документований шлях постачання, провести контрольовану мікропартію й масштабуватися після підтвердження повторного попиту та маржі.",
    path: [
      { title: "1. Попит", text: "Публікуємо концепцію та збираємо сценарії використання, вибір смаку й реакцію на ціну." },
      { title: "2. Постачання", text: "Обираємо шлях, який дозволяє перепродаж або фасування та надає документи для коректного маркування." },
      { title: "3. Мікропартія", text: "Харчова упаковка, контрольоване фасування, простежуваність партії та дуже мала платна група." },
      { title: "4. Вимірювання", text: "Оцінюємо смак, зручність, навантаження підтримки, маржу та бажання повторної покупки." },
      { title: "5. Масштабування", text: "Покращуємо закупівлю, комплектацію та доставку після підтвердження повторного попиту й маржинальності." },
    ],
    ctaEyebrow: "Перший тест",
    ctaTitle: "Чи знайшов би цей продукт місце у вашому тижні?",
    ctaLead: "Розкажіть, коли використовували б його, як часто, який смак обрали б і як сприймаєте €59.90 за 17 прийомів.",
    ctaButton: "Долучитися до першого тесту",
    ctaNote: "Ця форма перевіряє попит. Ми зв’яжемося, коли буде конкретний легальний тест продукту або крок покупки.",
    faqEyebrow: "Питання",
    faqTitle: "Що готово сьогодні та що буде далі.",
    faq: [
      { q: "Performance Complete уже продається?", a: "Концепція та цільова ціна вже відкриті для перевірки попиту. Платні продажі відкриються після оформлення коректного постачання, фасування, маркування та простежуваності." },
      { q: "Чому починаємо з уже відомого формату повноцінного порошкового харчування?", a: "Так перший пілот відповідає на головне бізнес-питання: чи створюють сценарій використання, упаковка та бренд Performance реальний попит." },
      { q: "400 ккал і 40 г білка вже фінальні?", a: "Це поточні орієнтири категорії. Фінальні показники харчової цінності точно відповідатимуть конкретній легально отриманій партії продукту." },
      { q: "Чому 17 прийомів?", a: "Такої кількості достатньо, щоб оцінити зручність і бажання повторної покупки, зберігаючи перший пілот компактним." },
      { q: "Буде більше смаків?", a: "Перший напрям — ваніль. Другий смак додаємо після підтвердження попиту на перший." },
      { q: "Буде підписка?", a: "Регулярна покупка має сенс після появи природного повторного попиту, тому спочатку вимірюємо поведінку клієнтів." },
    ],
    form: [
      { id: "name", label: "Ваше ім’я", required: true, placeholder: "Ім’я та прізвище" },
      { id: "email", label: "Електронна пошта", type: "email", required: true, placeholder: "you@email.com" },
      { id: "country", label: "Країна", required: true, placeholder: "Де ви купували б продукт?" },
      { id: "routine", label: "Головний сценарій", type: "select", required: true, options: ["Робота / навчання", "Робота + тренування", "Дорога / подорожі", "Пізні / непередбачувані дні"] },
      { id: "frequency", label: "Скільки прийомів на тиждень використовували б?", type: "select", required: true, options: ["1–2", "3–4", "5–7", "Більше 7"] },
      { id: "flavour", label: "Перший смак", type: "select", required: true, options: ["Ваніль", "Шоколад", "Без різниці"] },
      { id: "priceComfort", label: "Як сприймаєте €59.90 за 17 прийомів?", type: "select", required: true, options: ["Занадто дорого", "Нормально", "Вигідно", "Готовий заплатити більше за сильний досвід"] },
      { id: "message", label: "Коли цей прийом їжі був би найкориснішим?", type: "textarea", required: true, placeholder: "Повторювана ситуація, де швидкий повноцінний прийом їжі реально допоміг би" },
    ],
  },
  ru: {
    badge: "Первая проверка спроса",
    eyebrow: "Performance Complete",
    titleA: "Полноценный приём пищи для ",
    titleB: "быстрого ритма.",
    lead: "Одна отмеренная порция порошкового питания для работы, тренировок, дороги и позднего завершения дня. Добавить воду, встряхнуть и двигаться дальше. Один предсказуемый приём пищи, когда времени мало.",
    support: "Первая версия проверяет уже знакомый формат полноценного порошкового питания, позиционирование Performance, впечатление от упаковки и готовность платить до закупки запасов и масштабирования.",
    primary: "Присоединиться к первому тесту",
    truth: "Целевой формат: 17 приёмов · порция 90 г · около 400 ккал / 40 г растительного белка как текущий ориентир категории · целевая цена пилота €59.90. Платные продажи откроются после оформления корректного пути поставки, фасовки, маркировки и прослеживаемости.",
    pouchKicker: "Performance 01",
    pouchName: "COMPLETE",
    pouchLine: "Быстрый полноценный приём пищи · формат для активного дня",
    pouchPrice: "€59.90",
    pouchPriceNote: "целевая цена пилота · 17 приёмов",
    pouchPerMeal: "≈ €3.52 / приём",
    stats: [
      { value: "17", label: "приёмов / пакет" },
      { value: "90 г", label: "формат порции" },
      { value: "~60 сек", label: "приготовление" },
      { value: "40 г", label: "ориентир белка" },
    ],
    whyEyebrow: "Сценарий использования",
    whyTitle: "Полноценный приём пищи для работы, тренировок и дороги.",
    whyLead: "Performance создан для повторяющихся моментов, когда особенно важны скорость и удобство, и легко встраивается в активную неделю.",
    whyCards: [
      { title: "Насыщенный рабочий день", text: "Отмеренный вариант для обеда между звонками, сосредоточенной работой или учёбой." },
      { title: "День с тренировкой", text: "Предсказуемый формат до или после тренировки, когда нужно простое решение." },
      { title: "Дорога и поездки", text: "Лёгкий формат, который удобно взять с собой и приготовить с водой в нужный момент." },
      { title: "Ежедневная стабильность", text: "Один повторяемый приём пищи убирает лишнее решение из насыщенного дня." },
    ],
    prepEyebrow: "Формат",
    prepTitle: "Вода. Порция. Встряхнуть. Готово.",
    prepLead: "Первый продукт сохраняет максимально простой способ приготовления, а Performance отвечает за сценарий использования, упаковку и клиентский опыт.",
    prepSteps: [
      { title: "Добавить воду", text: "Холодная вода в шейкер или бутылку." },
      { title: "Добавить одну порцию", text: "Рабочий формат: 90 г на приём." },
      { title: "Встряхнуть", text: "Примерно 20 секунд или использовать блендер для более мягкой текстуры." },
      { title: "Встроить в свой ритм", text: "Рабочий обед, тренировка, дорога или позднее завершение дня." },
    ],
    formulaEyebrow: "Ориентир формулы",
    formulaTitle: "Понятная структура полноценного питания из знакомых компонентов.",
    formulaLead: "Категорийный ориентир сочетает растительные белки, лён, углеводную и текстурную основу, жиры, клетчатку и микронутриенты. Финальный публичный состав будет точно соответствовать согласованной партии и этикетке.",
    ingredients: [
      { title: "Растительная белковая база", text: "Гороховый и рисовый белок формируют высокобелковую основу ориентирного формата." },
      { title: "Лён + углеводная база", text: "Молотый лён и тапиока поддерживают текстуру, клетчатку и общую структуру приёма пищи." },
      { title: "Жировая система", text: "В ориентирной структуре используются порошковое подсолнечное масло, кокосовые компоненты и среднецепочечные триглицериды." },
      { title: "Микронутриенты", text: "Витаминно-минеральная смесь дополняет пищевой профиль вместе со вкусовыми компонентами, стабилизатором и подсластителем." },
    ],
    formulaNote: "Перед продажей страница и упаковка будут использовать точные данные о составе, аллергенах, пищевой ценности, условиях хранения и сроках конкретной легально полученной партии.",
    priceEyebrow: "Проверка предложения",
    priceTitle: "Одна конкретная цена позволяет честно проверить спрос.",
    priceLead: "Сайт проверяет €59.90 за пакет на 17 приёмов. Финальную экономику подтвердим после выбора легальной поставки и фасовки, до закупки запасов.",
    priceCards: [
      { title: "Цель первого теста", value: "€59.90", text: "17 приёмов · примерно €3.52 за приём · сначала проверяем спрос." },
      { title: "Первый вкус", value: "Ваниль", text: "Начинаем с одного универсального вкуса, а затем при необходимости добавляем второй вариант." },
      { title: "Условие масштабирования", value: "Повторная покупка", text: "Запасы и платное привлечение увеличиваются после реального использования и повторного спроса." },
    ],
    pathEyebrow: "Компактный запуск",
    pathTitle: "Проверить клиентский цикл небольшой легальной партией.",
    pathLead: "Стартовая система остаётся лёгкой и обратимой: проверить спрос, выбрать документированный путь поставки, провести контролируемую микропартию и масштабироваться после подтверждения повторного спроса и маржи.",
    path: [
      { title: "1. Спрос", text: "Публикуем концепцию и собираем сценарии использования, выбор вкуса и реакцию на цену." },
      { title: "2. Поставка", text: "Выбираем путь, который разрешает перепродажу или фасовку и предоставляет документы для корректной маркировки." },
      { title: "3. Микропартия", text: "Пищевая упаковка, контролируемая фасовка, прослеживаемость партии и очень небольшая платная группа." },
      { title: "4. Измерение", text: "Оцениваем вкус, удобство, нагрузку поддержки, маржу и желание повторной покупки." },
      { title: "5. Масштабирование", text: "Улучшаем закупку, комплектацию и доставку после подтверждения повторного спроса и маржинальности." },
    ],
    ctaEyebrow: "Первый тест",
    ctaTitle: "Нашёл бы этот продукт место в вашей неделе?",
    ctaLead: "Расскажите, когда использовали бы его, как часто, какой вкус выбрали бы и как воспринимаете €59.90 за 17 приёмов.",
    ctaButton: "Присоединиться к первому тесту",
    ctaNote: "Эта форма проверяет спрос. Мы свяжемся, когда будет конкретный легальный тест продукта или шаг покупки.",
    faqEyebrow: "Вопросы",
    faqTitle: "Что готово сегодня и что будет дальше.",
    faq: [
      { q: "Performance Complete уже продаётся?", a: "Концепция и целевая цена уже открыты для проверки спроса. Платные продажи откроются после оформления корректной поставки, фасовки, маркировки и прослеживаемости." },
      { q: "Почему начинаем с уже известного формата полноценного порошкового питания?", a: "Так первый пилот отвечает на главный бизнес-вопрос: создают ли сценарий использования, упаковка и бренд Performance реальный спрос." },
      { q: "400 ккал и 40 г белка уже финальные?", a: "Это текущие ориентиры категории. Финальные показатели пищевой ценности будут точно соответствовать конкретной легально полученной партии продукта." },
      { q: "Почему 17 приёмов?", a: "Этого достаточно, чтобы оценить удобство и желание повторной покупки, сохраняя первый пилот компактным." },
      { q: "Будет больше вкусов?", a: "Первое направление — ваниль. Второй вкус добавляем после подтверждения спроса на первый." },
      { q: "Будет подписка?", a: "Регулярная покупка имеет смысл после появления естественного повторного спроса, поэтому сначала измеряем поведение клиентов." },
    ],
    form: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Электронная почта", type: "email", required: true, placeholder: "you@email.com" },
      { id: "country", label: "Страна", required: true, placeholder: "Где вы покупали бы продукт?" },
      { id: "routine", label: "Главный сценарий", type: "select", required: true, options: ["Работа / учёба", "Работа + тренировки", "Дорога / поездки", "Поздние / непредсказуемые дни"] },
      { id: "frequency", label: "Сколько приёмов в неделю использовали бы?", type: "select", required: true, options: ["1–2", "3–4", "5–7", "Больше 7"] },
      { id: "flavour", label: "Первый вкус", type: "select", required: true, options: ["Ваниль", "Шоколад", "Без разницы"] },
      { id: "priceComfort", label: "Как воспринимаете €59.90 за 17 приёмов?", type: "select", required: true, options: ["Слишком дорого", "Нормально", "Выгодно", "Готов заплатить больше за сильный опыт"] },
      { id: "message", label: "Когда этот приём пищи был бы полезнее всего?", type: "textarea", required: true, placeholder: "Повторяющаяся ситуация, где быстрый полноценный приём пищи действительно помог бы" },
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

                <h1 className="mt-5 text-[clamp(2.65rem,5.8vw,5.7rem)] font-semibold leading-[.94] tracking-[-.045em] text-zinc-100">
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
                      <h2 className="mt-4 text-4xl font-black tracking-[-.045em] text-white sm:text-5xl">{x.pouchName}</h2>
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
