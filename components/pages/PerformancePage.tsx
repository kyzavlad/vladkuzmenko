"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  Clock3,
  Dumbbell,
  PackageCheck,
  ShieldCheck,
  Sparkles,
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
import { PERFORMANCE_DIALOG, PERFORMANCE_PRODUCT } from "@/lib/performance";
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
  packLabel: string;
  packSub: string;
  servings: string;
  meal: string;
  subscription: string;
  target: string;
  specEyebrow: string;
  specTitle: string;
  specLead: string;
  spec: { value: string; label: string; note: string }[];
  useEyebrow: string;
  useTitle: string;
  useLead: string;
  uses: { title: string; text: string }[];
  formulaEyebrow: string;
  formulaTitle: string;
  formulaLead: string;
  formula: { title: string; text: string }[];
  formulaNote: string;
  priceEyebrow: string;
  priceTitle: string;
  priceLead: string;
  oneTime: string;
  recurring: string;
  recurringBadge: string;
  perMeal: string;
  priceFoot: string;
  validateEyebrow: string;
  validateTitle: string;
  validateLead: string;
  steps: { title: string; text: string }[];
  confirmedTitle: string;
  confirmed: string[];
  openTitle: string;
  open: string[];
  finalEyebrow: string;
  finalTitle: string;
  finalLead: string;
  finalCta: string;
  finalNote: string;
  fields: RequestField[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    badge: "Product 01 · formula validation",
    eyebrow: "Performance Complete · complete meal powder",
    titleA: "One reliable meal. ",
    titleB: "Ready in about a minute.",
    lead: "A complete-meal powder for the days when work, training, travel and real life make cooking the part of the routine most likely to fail.",
    support: "The first product stays deliberately narrow: one pouch, 17 servings, Vanilla and Chocolate as the first flavour targets, and a high-protein plant-based formula being developed with a qualified manufacturer.",
    primary: "Join the pilot",
    secondary: "See the target formula",
    truth: "Validation concept, not a preorder. Final ingredients, nutrition, allergens, claims, shelf life and price only become real after manufacturer and regulatory confirmation.",
    packLabel: "PERFORMANCE",
    packSub: "COMPLETE",
    servings: "17 meals",
    meal: "target €2.35 / meal",
    subscription: "target €1.99 / meal recurring",
    target: "TARGET SPEC",
    specEyebrow: "The target product",
    specTitle: "Built around a useful meal, not another supplement stack.",
    specLead: "The benchmark is simple enough to understand and strict enough to test. Every number below is a formulation target until the production formula is locked and verified.",
    spec: [
      { value: "90 g", label: "target serving", note: "one complete meal portion" },
      { value: "~400", label: "target kcal", note: "real meal energy, not a snack" },
      { value: "~40 g", label: "target protein", note: "plant-protein direction" },
      { value: "17", label: "servings / pouch", note: "one hero SKU first" },
    ],
    useEyebrow: "Where it earns its place",
    useTitle: "For the moments where the food plan usually breaks.",
    useLead: "Performance Complete is not meant to replace every meal. It is meant to make one difficult meal predictable enough to repeat.",
    uses: [
      { title: "Deep work", text: "A fast, measured meal when calls and focused work remove the time to cook." },
      { title: "Work → training", text: "A predictable option around training instead of deciding while already hungry." },
      { title: "Travel & commute", text: "A pouch-and-shaker format that is easier to plan than random convenience food." },
      { title: "Late finish", text: "A reliable fallback when the day runs longer than expected." },
    ],
    formulaEyebrow: "Formula direction",
    formulaTitle: "A clear starting specification for the manufacturer.",
    formulaLead: "The goal is a balanced powdered meal with a strong plant-protein base, fibre, carbohydrates, fats and a complete micronutrient system where the final formulation and market rules support it.",
    formula: [
      { title: "Protein base", text: "Pea + rice protein as the starting direction for a high-protein plant-based profile." },
      { title: "Fibre & fats", text: "Ground flaxseed plus a plant-oil powder system to support texture, fats and fibre." },
      { title: "Carbohydrate base", text: "A neutral carbohydrate component such as tapioca as part of the energy and texture system." },
      { title: "Micronutrients", text: "Vitamin/mineral premix designed and dosed by the manufacturer for the final nutrition target and legal market." },
      { title: "Flavour system", text: "Natural flavour direction. Vanilla and Chocolate first so taste can be compared before adding SKUs." },
      { title: "Mixability", text: "The product must mix in water with a normal shaker. Taste, texture and digestion have to pass the pilot, not just the nutrition sheet." },
    ],
    formulaNote: "We are using category leaders as a benchmark, not copying or relabelling another brand's retail formula. The Performance recipe, nutrition panel and claims must be independently produced and verified.",
    priceEyebrow: "Price hypothesis",
    priceTitle: "A concrete price to test before we pretend the economics are solved.",
    priceLead: "The public pilot anchor is intentionally competitive without racing to the bottom. It tests willingness to pay while manufacturing, packaging, fulfilment, VAT and acquisition costs are still being quoted.",
    oneTime: "€39.90",
    recurring: "€33.90",
    recurringBadge: "~15% recurring saving",
    perMeal: "17 servings · about €2.35 one-time / €1.99 recurring",
    priceFoot: "No checkout yet. Final selling price is locked only after the all-in contribution margin works in the launch market.",
    validateEyebrow: "Launch path",
    validateTitle: "Validate the product in the order that protects cash.",
    validateLead: "We do not need a factory, a huge catalogue or employees before demand and unit economics deserve them.",
    steps: [
      { title: "1. Demand", text: "Collect real use cases, flavour preference, frequency and price acceptance through the pilot form." },
      { title: "2. Manufacturer", text: "Get RFQs, MOQ, formulation support, nutrition/allergen documentation, shelf-life path and sample costs from qualified powder manufacturers." },
      { title: "3. Sample", text: "Compare Vanilla and Chocolate for taste, texture, mixability and real-life convenience." },
      { title: "4. Compliance", text: "Lock ingredients, label, nutrition panel and any claims only after qualified food/regulatory review." },
      { title: "5. Paid pilot", text: "Produce a small first batch and measure delivered margin, support load, satisfaction and reorder intent." },
      { title: "6. Scale", text: "Only then add subscriptions, more flavours, 3PL volume and paid acquisition." },
    ],
    confirmedTitle: "Already decided",
    confirmed: ["Powdered complete-meal format", "17-serving hero pouch", "Plant-based high-protein direction", "Vanilla + Chocolate first", "Pilot before catalogue expansion"],
    openTitle: "Must still earn a yes",
    open: ["Final recipe and exact nutrition", "Allergen statement and shelf life", "Manufacturer + MOQ", "Packaging and delivered COGS", "Final price and shipping threshold"],
    finalEyebrow: "Founding pilot",
    finalTitle: "If this solves a real meal problem in your week, help shape version one.",
    finalLead: "Tell us when you would use it, what you currently buy instead, which flavour you want first and whether the target price feels worth repeating.",
    finalCta: "Join the founding pilot",
    finalNote: "No payment. No fake launch date. We contact you only for a concrete sample, pilot or launch step.",
    fields: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / phone", type: "tel", placeholder: "@handle or number" },
      { id: "country", label: "Country / city", required: true, placeholder: "Where would you buy it?" },
      { id: "routine", label: "Closest use case", type: "select", required: true, options: ["Work / study", "Work + training", "Travel / commuting", "Unpredictable schedule"] },
      { id: "flavour", label: "First flavour", type: "select", required: true, options: ["Vanilla", "Chocolate", "Either"] },
      { id: "frequency", label: "How often would this help?", type: "select", required: true, options: ["1–2 meals / week", "3–4 meals / week", "5–7 meals / week", "More than 7"] },
      { id: "priceComfort", label: "How does €39.90 for 17 servings feel?", type: "select", required: true, options: ["Too high", "Reasonable", "Good value if taste is strong", "I would pay more for a better formula"] },
      { id: "message", label: "What would make you reorder it?", type: "textarea", required: true, placeholder: "What you use now, what usually goes wrong and what this product has to do better" },
    ],
  },
  ua: {
    badge: "Продукт 01 · валідація формули",
    eyebrow: "Performance Complete · повноцінний порошковий прийом їжі",
    titleA: "Один надійний прийом їжі. ",
    titleB: "Приблизно за хвилину.",
    lead: "Повноцінний порошковий прийом їжі для днів, коли робота, тренування, поїздки й реальне життя роблять готування найслабшим місцем режиму.",
    support: "Перший продукт навмисно вузький: один пакет, 17 порцій, Vanilla та Chocolate як перші цільові смаки й високобілкова рослинна формула, яку розробляємо з кваліфікованим виробником.",
    primary: "Долучитися до пілоту",
    secondary: "Цільова формула",
    truth: "Це концепт для валідації, не передзамовлення. Фінальні інгредієнти, харчова цінність, алергени, claims, строк придатності й ціна стають реальними лише після підтвердження виробником і regulatory review.",
    packLabel: "PERFORMANCE",
    packSub: "COMPLETE",
    servings: "17 прийомів",
    meal: "ціль €2.35 / прийом",
    subscription: "ціль €1.99 / прийом recurring",
    target: "TARGET SPEC",
    specEyebrow: "Цільовий продукт",
    specTitle: "Повноцінний прийом їжі, а не ще один набір добавок.",
    specLead: "Орієнтир має бути простим для покупця й достатньо конкретним для виробника. Усі цифри нижче — цілі формуляції, доки виробнича формула не зафіксована та не перевірена.",
    spec: [
      { value: "90 г", label: "цільова порція", note: "один повноцінний прийом" },
      { value: "~400", label: "ціль ккал", note: "енергія прийому, не snack" },
      { value: "~40 г", label: "ціль білка", note: "рослинний protein direction" },
      { value: "17", label: "порцій / пакет", note: "спочатку один hero SKU" },
    ],
    useEyebrow: "Де продукт має цінність",
    useTitle: "Для моментів, де план харчування зазвичай ламається.",
    useLead: "Performance Complete не має замінювати всі прийоми їжі. Його задача — зробити один складний прийом достатньо передбачуваним, щоб хотілося повторити.",
    uses: [
      { title: "Глибока робота", text: "Швидкий виміряний прийом їжі, коли дзвінки й фокус не залишають часу готувати." },
      { title: "Робота → тренування", text: "Передбачуваний варіант навколо тренування замість рішення вже на голодний шлунок." },
      { title: "Дорога й поїздки", text: "Пакет + shaker легше запланувати, ніж випадкову їжу в дорозі." },
      { title: "Пізній фініш", text: "Надійний fallback, коли день затягнувся довше, ніж планувалось." },
    ],
    formulaEyebrow: "Напрям формули",
    formulaTitle: "Чітка стартова специфікація для виробника.",
    formulaLead: "Ціль — збалансований порошковий прийом їжі з сильною рослинною білковою базою, клітковиною, вуглеводами, жирами та повним micronutrient system там, де це підтримує фінальна формула й правила ринку.",
    formula: [
      { title: "Білкова база", text: "Pea + rice protein як стартовий напрям високобілкового рослинного профілю." },
      { title: "Клітковина й жири", text: "Мелене насіння льону плюс plant-oil powder system для текстури, жирів і клітковини." },
      { title: "Вуглеводна база", text: "Нейтральний компонент на кшталт tapioca як частина energy/texture system." },
      { title: "Мікронутрієнти", text: "Vitamin/mineral premix, який дозує виробник під фінальний nutrition target і конкретний ринок." },
      { title: "Смак", text: "Натуральний flavour direction. Vanilla та Chocolate першими, щоб порівняти смак до розширення SKU." },
      { title: "Mixability", text: "Продукт має нормально змішуватись із водою у звичайному shaker. Смак, текстура й переносимість мають пройти пілот, а не лише nutrition sheet." },
    ],
    formulaNote: "Ми використовуємо лідерів категорії як benchmark, а не копіюємо чи перепаковуємо чужу роздрібну формулу. Рецепт, nutrition panel і claims Performance мають бути незалежно вироблені та перевірені.",
    priceEyebrow: "Гіпотеза ціни",
    priceTitle: "Конкретна ціна для тесту до того, як ми вдаватимемо, що економіка вже вирішена.",
    priceLead: "Публічний орієнтир пілоту достатньо конкурентний, але без гонки до найнижчої ціни. Він тестує willingness to pay, поки виробництво, упаковка, fulfilment, VAT та acquisition ще котируються.",
    oneTime: "€39.90",
    recurring: "€33.90",
    recurringBadge: "~15% економії recurring",
    perMeal: "17 порцій · близько €2.35 one-time / €1.99 recurring",
    priceFoot: "Checkout поки закритий. Фінальна ціна фіксується лише коли all-in contribution margin працює на ринку запуску.",
    validateEyebrow: "Шлях запуску",
    validateTitle: "Валідувати продукт у порядку, що захищає капітал.",
    validateLead: "Нам не потрібні власна фабрика, великий каталог чи штат до того, як попит та unit economics це заслужать.",
    steps: [
      { title: "1. Попит", text: "Зібрати реальні use cases, смак, частоту та прийняття ціни через форму пілоту." },
      { title: "2. Виробник", text: "Отримати RFQ, MOQ, formulation support, nutrition/allergen docs, shelf-life path і sample costs від кваліфікованих powder manufacturers." },
      { title: "3. Зразок", text: "Порівняти Vanilla та Chocolate за смаком, текстурою, mixability і реальною зручністю." },
      { title: "4. Compliance", text: "Фіксувати ingredients, label, nutrition panel і claims лише після кваліфікованого food/regulatory review." },
      { title: "5. Paid pilot", text: "Випустити малу першу партію й виміряти delivered margin, support load, satisfaction та reorder intent." },
      { title: "6. Scale", text: "Лише потім додавати subscriptions, більше смаків, 3PL volume і paid acquisition." },
    ],
    confirmedTitle: "Вже вирішено",
    confirmed: ["Порошковий complete-meal format", "Hero package на 17 порцій", "Рослинний high-protein direction", "Vanilla + Chocolate першими", "Пілот до розширення каталогу"],
    openTitle: "Ще має заслужити yes",
    open: ["Фінальний рецепт і точна nutrition", "Алергени та строк придатності", "Виробник + MOQ", "Упаковка й delivered COGS", "Фінальна ціна й shipping threshold"],
    finalEyebrow: "Founding pilot",
    finalTitle: "Якщо це вирішує реальну проблему харчування у вашому тижні, допоможіть сформувати версію один.",
    finalLead: "Розкажіть, коли ви б використовували продукт, що купуєте замість нього зараз, який смак хочете першим і чи вартий target price регулярної покупки.",
    finalCta: "Долучитися до founding pilot",
    finalNote: "Без оплати. Без вигаданої дати запуску. Пишемо лише щодо конкретного sample, pilot або launch step.",
    fields: [
      { id: "name", label: "Ваше ім'я", required: true, placeholder: "Ім'я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / телефон", type: "tel", placeholder: "@handle або номер" },
      { id: "country", label: "Країна / місто", required: true, placeholder: "Де ви б купували продукт?" },
      { id: "routine", label: "Найближчий сценарій", type: "select", required: true, options: ["Робота / навчання", "Робота + тренування", "Поїздки / дорога", "Непередбачуваний графік"] },
      { id: "flavour", label: "Перший смак", type: "select", required: true, options: ["Vanilla", "Chocolate", "Будь-який"] },
      { id: "frequency", label: "Як часто це було б корисно?", type: "select", required: true, options: ["1–2 прийоми / тиждень", "3–4 прийоми / тиждень", "5–7 прийомів / тиждень", "Більше 7"] },
      { id: "priceComfort", label: "Як сприймається €39.90 за 17 порцій?", type: "select", required: true, options: ["Задорого", "Нормально", "Хороша цінність за сильного смаку", "Заплачу більше за кращу формулу"] },
      { id: "message", label: "Що змусило б вас замовити повторно?", type: "textarea", required: true, placeholder: "Що використовуєте зараз, де режим ламається і що цей продукт має робити краще" },
    ],
  },
  ru: {
    badge: "Продукт 01 · валидация формулы",
    eyebrow: "Performance Complete · полноценный порошковый приём пищи",
    titleA: "Один надёжный приём пищи. ",
    titleB: "Примерно за минуту.",
    lead: "Полноценный порошковый приём пищи для дней, когда работа, тренировки, поездки и реальная жизнь делают готовку самым слабым местом режима.",
    support: "Первый продукт намеренно узкий: один пакет, 17 порций, Vanilla и Chocolate как первые целевые вкусы и высокобелковая растительная формула, которую разрабатываем с квалифицированным производителем.",
    primary: "Присоединиться к пилоту",
    secondary: "Целевая формула",
    truth: "Это концепт для валидации, не предзаказ. Финальные ингредиенты, пищевая ценность, аллергены, claims, срок хранения и цена становятся реальными только после подтверждения производителем и regulatory review.",
    packLabel: "PERFORMANCE",
    packSub: "COMPLETE",
    servings: "17 приёмов",
    meal: "цель €2.35 / приём",
    subscription: "цель €1.99 / приём recurring",
    target: "TARGET SPEC",
    specEyebrow: "Целевой продукт",
    specTitle: "Полноценный приём пищи, а не ещё один набор добавок.",
    specLead: "Ориентир должен быть простым для покупателя и достаточно конкретным для производителя. Все цифры ниже — цели формуляции, пока производственная формула не зафиксирована и не проверена.",
    spec: [
      { value: "90 г", label: "целевая порция", note: "один полноценный приём" },
      { value: "~400", label: "цель ккал", note: "энергия приёма, не snack" },
      { value: "~40 г", label: "цель белка", note: "растительный protein direction" },
      { value: "17", label: "порций / пакет", note: "сначала один hero SKU" },
    ],
    useEyebrow: "Где продукт зарабатывает место",
    useTitle: "Для моментов, где план питания обычно ломается.",
    useLead: "Performance Complete не должен заменять каждый приём пищи. Его задача — сделать один сложный приём достаточно предсказуемым, чтобы хотелось повторить.",
    uses: [
      { title: "Глубокая работа", text: "Быстрый измеренный приём, когда звонки и фокус не оставляют времени готовить." },
      { title: "Работа → тренировка", text: "Предсказуемый вариант вокруг тренировки вместо решения уже на голодный желудок." },
      { title: "Дорога и поездки", text: "Пакет + shaker легче планировать, чем случайную еду в дороге." },
      { title: "Поздний финиш", text: "Надёжный fallback, когда день затянулся дольше, чем ожидалось." },
    ],
    formulaEyebrow: "Направление формулы",
    formulaTitle: "Чёткая стартовая спецификация для производителя.",
    formulaLead: "Цель — сбалансированный порошковый приём пищи с сильной растительной белковой базой, клетчаткой, углеводами, жирами и полным micronutrient system там, где это поддерживает финальная формула и правила рынка.",
    formula: [
      { title: "Белковая база", text: "Pea + rice protein как стартовое направление высокобелкового растительного профиля." },
      { title: "Клетчатка и жиры", text: "Молотое льняное семя плюс plant-oil powder system для текстуры, жиров и клетчатки." },
      { title: "Углеводная база", text: "Нейтральный компонент вроде tapioca как часть energy/texture system." },
      { title: "Микронутриенты", text: "Vitamin/mineral premix, который дозирует производитель под финальный nutrition target и конкретный рынок." },
      { title: "Вкус", text: "Natural flavour direction. Vanilla и Chocolate первыми, чтобы сравнить вкус до расширения SKU." },
      { title: "Mixability", text: "Продукт должен нормально смешиваться с водой в обычном shaker. Вкус, текстура и переносимость должны пройти пилот, а не только nutrition sheet." },
    ],
    formulaNote: "Мы используем лидеров категории как benchmark, а не копируем или перепаковываем чужую розничную формулу. Рецепт, nutrition panel и claims Performance должны быть независимо произведены и проверены.",
    priceEyebrow: "Гипотеза цены",
    priceTitle: "Конкретная цена для теста до того, как мы притворимся, что экономика уже решена.",
    priceLead: "Публичный ориентир пилота достаточно конкурентный, но без гонки к самой низкой цене. Он тестирует willingness to pay, пока производство, упаковка, fulfilment, VAT и acquisition ещё котируются.",
    oneTime: "€39.90",
    recurring: "€33.90",
    recurringBadge: "~15% экономии recurring",
    perMeal: "17 порций · около €2.35 one-time / €1.99 recurring",
    priceFoot: "Checkout пока закрыт. Финальная цена фиксируется только когда all-in contribution margin работает на рынке запуска.",
    validateEyebrow: "Путь запуска",
    validateTitle: "Валидировать продукт в порядке, который защищает капитал.",
    validateLead: "Нам не нужны своя фабрика, огромный каталог или штат до того, как спрос и unit economics это заслужат.",
    steps: [
      { title: "1. Спрос", text: "Собрать реальные use cases, вкус, частоту и принятие цены через форму пилота." },
      { title: "2. Производитель", text: "Получить RFQ, MOQ, formulation support, nutrition/allergen docs, shelf-life path и sample costs от квалифицированных powder manufacturers." },
      { title: "3. Образец", text: "Сравнить Vanilla и Chocolate по вкусу, текстуре, mixability и реальной удобности." },
      { title: "4. Compliance", text: "Фиксировать ingredients, label, nutrition panel и claims только после квалифицированного food/regulatory review." },
      { title: "5. Paid pilot", text: "Выпустить небольшую первую партию и измерить delivered margin, support load, satisfaction и reorder intent." },
      { title: "6. Scale", text: "Только потом добавлять subscriptions, больше вкусов, 3PL volume и paid acquisition." },
    ],
    confirmedTitle: "Уже решено",
    confirmed: ["Порошковый complete-meal format", "Hero package на 17 порций", "Растительный high-protein direction", "Vanilla + Chocolate первыми", "Пилот до расширения каталога"],
    openTitle: "Ещё должно заслужить yes",
    open: ["Финальный рецепт и точная nutrition", "Аллергены и срок хранения", "Производитель + MOQ", "Упаковка и delivered COGS", "Финальная цена и shipping threshold"],
    finalEyebrow: "Founding pilot",
    finalTitle: "Если это решает реальную проблему питания в вашей неделе, помогите сформировать версию один.",
    finalLead: "Расскажите, когда вы бы использовали продукт, что покупаете вместо него сейчас, какой вкус хотите первым и стоит ли target price регулярной покупки.",
    finalCta: "Присоединиться к founding pilot",
    finalNote: "Без оплаты. Без выдуманной даты запуска. Пишем только по конкретному sample, pilot или launch step.",
    fields: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / телефон", type: "tel", placeholder: "@handle или номер" },
      { id: "country", label: "Страна / город", required: true, placeholder: "Где вы бы покупали продукт?" },
      { id: "routine", label: "Ближайший сценарий", type: "select", required: true, options: ["Работа / учёба", "Работа + тренировки", "Поездки / дорога", "Непредсказуемый график"] },
      { id: "flavour", label: "Первый вкус", type: "select", required: true, options: ["Vanilla", "Chocolate", "Любой"] },
      { id: "frequency", label: "Как часто это было бы полезно?", type: "select", required: true, options: ["1–2 приёма / неделю", "3–4 приёма / неделю", "5–7 приёмов / неделю", "Больше 7"] },
      { id: "priceComfort", label: "Как воспринимается €39.90 за 17 порций?", type: "select", required: true, options: ["Дорого", "Нормально", "Хорошая ценность при сильном вкусе", "Заплачу больше за лучшую формулу"] },
      { id: "message", label: "Что заставило бы вас заказать повторно?", type: "textarea", required: true, placeholder: "Что используете сейчас, где режим ломается и что этот продукт должен делать лучше" },
    ],
  },
};

const USE_ICONS = [Briefcase, Dumbbell, PackageCheck, Clock3];

function ProductPack({ lang }: { lang: Lang }) {
  const x = COPY[lang];
  return (
    <div className="relative mx-auto w-full max-w-[470px] py-8">
      <div className="pointer-events-none absolute inset-x-8 bottom-4 h-20 rounded-full bg-emerald-300/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto min-h-[530px] w-[82%] overflow-hidden rounded-[36px_36px_46px_46px] border border-white/[.12] bg-[linear-gradient(145deg,#111713,#050706_55%,#0c1712)] shadow-[0_50px_100px_-45px_rgba(52,211,153,.38)]"
      >
        <div className="absolute inset-x-0 top-0 h-16 border-b border-white/[.06] bg-white/[.025]" />
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-emerald-300/[.08] blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-amber-300/[.06] blur-3xl" />
        <div className="relative flex min-h-[530px] flex-col p-8 sm:p-10">
          <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[.2em] text-zinc-500">
            <span>{x.target}</span><span>V1</span>
          </div>
          <div className="mt-20">
            <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-emerald-300/70">{x.packLabel}</p>
            <h3 className="mt-3 text-[clamp(3.1rem,8vw,5.7rem)] font-black leading-[.84] tracking-[-.07em] text-white">{x.packSub}</h3>
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-emerald-300/70 to-transparent" />
          </div>
          <div className="mt-auto grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4"><p className="text-xl font-semibold text-white">17</p><p className="mt-1 text-[10px] uppercase tracking-[.13em] text-zinc-500">{x.servings}</p></div>
            <div className="rounded-2xl border border-emerald-300/[.14] bg-emerald-300/[.035] p-4"><p className="text-xl font-semibold text-emerald-200">~40g</p><p className="mt-1 text-[10px] uppercase tracking-[.13em] text-zinc-500">protein target</p></div>
          </div>
          <p className="mt-5 text-[10px] leading-5 text-zinc-600">90 g target serving · ~400 kcal target · formula in validation</p>
        </div>
      </motion.div>
    </div>
  );
}

export function PerformancePage() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const x = COPY[lang];
  const modal = PERFORMANCE_DIALOG[lang];

  const openPilot = (source: string) => track("drop_interest_open", { source, product: "performance_complete" });

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />

      <section className="relative overflow-hidden border-b border-white/[.06] pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[760px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(52,211,153,.12),rgba(212,175,55,.035)_38%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
        </div>
        <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 lg:grid-cols-[1.03fr_.97fr] lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/75">{x.eyebrow}</span>
              <span className="rounded-full border border-emerald-300/18 bg-emerald-300/[.045] px-3 py-1.5 text-[9px] uppercase tracking-[.14em] text-emerald-100/70">{x.badge}</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-[clamp(3.4rem,7vw,6.9rem)] font-semibold leading-[.91] tracking-[-.06em] text-zinc-50">
              {x.titleA}<em className="bg-gradient-to-br from-emerald-100 via-emerald-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{x.titleB}</em>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">{x.lead}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">{x.support}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestDialog intent={DROP_INTENT} title={modal.title} description={modal.description} submitLabel={x.finalCta} successTitle={modal.successTitle} successMessage={modal.successMessage} buttonLabel="Performance Complete hero pilot" fields={x.fields} context={{ concept: "performance_complete", stage: "formula_validation", source: "performance_hero", servings: PERFORMANCE_PRODUCT.servings }}>
                <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => openPilot("performance_hero")}>{x.primary}<ArrowRight className="ml-2 h-4 w-4" /></Button>
              </RequestDialog>
              <a href="#target-formula" className="w-full sm:w-auto"><Button className="h-auto min-h-12 w-full border border-white/[.12] bg-white/[.04] px-7 py-3 text-white hover:bg-white/[.08] sm:w-auto">{x.secondary}</Button></a>
            </div>
            <div className="mt-7 rounded-2xl border border-amber-300/[.12] bg-amber-300/[.025] px-5 py-4"><p className="text-xs leading-6 text-zinc-500"><ShieldCheck className="mr-2 inline h-4 w-4 text-amber-200/70" />{x.truth}</p></div>
          </motion.div>
          <ProductPack lang={lang} />
        </div>
      </section>

      <section id="target-formula" className="relative py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.specEyebrow}</p><h2 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-.05em] text-white">{x.specTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.specLead}</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {x.spec.map((item) => <InteractiveSurface key={item.label} accent="green" className="rounded-[24px] border border-white/[.08] bg-white/[.022] p-6"><p className="text-3xl font-semibold tracking-[-.04em] text-emerald-100">{item.value}</p><p className="mt-3 text-sm font-medium text-white">{item.label}</p><p className="mt-2 text-xs leading-5 text-zinc-600">{item.note}</p></InteractiveSurface>)}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.06] bg-[#020403] py-24 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-amber-200/70">{x.useEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-white sm:text-5xl">{x.useTitle}</h2><p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">{x.useLead}</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{x.uses.map((item, index) => { const Icon = USE_ICONS[index] ?? Zap; return <motion.div key={item.title} whileHover={reduced ? undefined : { y: -4 }} className="rounded-[24px] border border-white/[.08] bg-black/45 p-6"><span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/16 bg-emerald-300/[.04] text-emerald-200"><Icon className="h-4 w-4" /></span><h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></motion.div>; })}</div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-3xl"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.formulaEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-white sm:text-5xl">{x.formulaTitle}</h2><p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">{x.formulaLead}</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{x.formula.map((item, index) => <div key={item.title} className="rounded-[24px] border border-white/[.08] bg-[linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.012))] p-6"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-600">0{index + 1}</span><Sparkles className="h-4 w-4 text-emerald-200/55" /></div><h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></div>)}</div>
          <div className="mt-6 rounded-[24px] border border-amber-300/[.12] bg-amber-300/[.025] p-6"><p className="text-sm leading-7 text-zinc-400">{x.formulaNote}</p></div>
        </div>
      </section>

      <section className="border-y border-white/[.06] bg-[#030303] py-24 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-amber-200/70">{x.priceEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-white sm:text-5xl">{x.priceTitle}</h2><p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">{x.priceLead}</p></div>
            <InteractiveSurface accent="green" className="rounded-[32px] border border-emerald-300/[.12] bg-[linear-gradient(145deg,rgba(52,211,153,.06),rgba(255,255,255,.015)_50%,rgba(0,0,0,.4))] p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/[.08] bg-black/38 p-5"><p className="text-[10px] uppercase tracking-[.17em] text-zinc-600">One-time target</p><p className="mt-3 text-4xl font-semibold tracking-[-.05em] text-white">{x.oneTime}</p></div><div className="rounded-2xl border border-emerald-300/[.14] bg-emerald-300/[.035] p-5"><div className="flex flex-wrap items-center gap-2"><p className="text-[10px] uppercase tracking-[.17em] text-zinc-600">Recurring target</p><span className="rounded-full border border-emerald-300/15 px-2 py-1 text-[9px] text-emerald-200/70">{x.recurringBadge}</span></div><p className="mt-3 text-4xl font-semibold tracking-[-.05em] text-emerald-100">{x.recurring}</p></div></div>
              <p className="mt-5 text-sm text-zinc-300">{x.perMeal}</p><p className="mt-3 text-xs leading-6 text-zinc-600">{x.priceFoot}</p>
            </InteractiveSurface>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.validateEyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-white sm:text-5xl">{x.validateTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.validateLead}</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{x.steps.map((step) => <div key={step.title} className="rounded-[24px] border border-white/[.08] bg-white/[.02] p-6"><h3 className="text-lg font-semibold text-white">{step.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{step.text}</p></div>)}</div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2"><div className="rounded-[28px] border border-emerald-300/[.12] bg-emerald-300/[.025] p-7"><h3 className="text-xl font-semibold text-white">{x.confirmedTitle}</h3><div className="mt-5 space-y-3">{x.confirmed.map((item) => <p key={item} className="flex gap-3 text-sm text-zinc-400"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</p>)}</div></div><div className="rounded-[28px] border border-amber-300/[.12] bg-amber-300/[.02] p-7"><h3 className="text-xl font-semibold text-white">{x.openTitle}</h3><div className="mt-5 space-y-3">{x.open.map((item) => <p key={item} className="flex gap-3 text-sm text-zinc-400"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-amber-200/70" />{item}</p>)}</div></div></div>
        </div>
      </section>

      <section className="border-t border-white/[.06] bg-[#020403] py-24 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-emerald-200/70">{x.finalEyebrow}</p><h2 className="mx-auto mt-4 max-w-4xl text-[clamp(2.6rem,5vw,4.8rem)] font-semibold tracking-[-.055em] text-white">{x.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.finalLead}</p><div className="mt-8 flex justify-center"><RequestDialog intent={DROP_INTENT} title={modal.title} description={modal.description} submitLabel={x.finalCta} successTitle={modal.successTitle} successMessage={modal.successMessage} buttonLabel="Performance Complete final pilot" fields={x.fields} context={{ concept: "performance_complete", stage: "formula_validation", source: "performance_final", servings: PERFORMANCE_PRODUCT.servings }}><Button className="premium-button h-auto min-h-12 px-8 py-3" onClick={() => openPilot("performance_final")}>{x.finalCta}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog></div><p className="mt-5 text-xs text-zinc-600">{x.finalNote}</p></div>
      </section>

      <FooterSection />
    </main>
  );
}
