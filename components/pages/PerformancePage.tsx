"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
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
  mockPrice: string;
  mockPriceNote: string;
  mockPerMeal: string;
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
    badge: "Pilot applications open · no payment",
    eyebrow: "Performance · ready meals for active days",
    titleA: "Six ready meals.",
    titleB: "Three busy days without last-minute food decisions.",
    lead: "Core Set covers the two meals that most often break on busy days. Real prepared food for work, commuting, training and late finishes, without turning the rest of your diet into a program.",
    support: "The first model stays deliberately narrow: one city, one production partner, one six-meal set and scheduled delivery. We prove usefulness and repeat demand before expanding anything.",
    primary: "Apply for the pilot",
    secondary: "See the Core Set",
    truth: "Target pilot price: ₴1,190. No payment opens until production, food safety, delivery and unit economics are confirmed.",
    mockKicker: "Pilot concept",
    mockStatus: "validation",
    mockName: "CORE SET",
    mockLine: "Six prepared meals that protect the weak points in three busy days.",
    mockPrice: "₴1,190",
    mockPriceNote: "target pilot price · 6 meals",
    mockPerMeal: "≈ ₴198 / meal",
    mockStats: [
      { value: "6", label: "prepared meals" },
      { value: "3", label: "busy days covered" },
      { value: "2", label: "high-friction meals / day" },
    ],
    mockTags: ["Work", "Commute", "Training", "Late day"],
    conceptEyebrow: "The hero product",
    conceptTitle: "Solve the recurring food problem, not the entire day.",
    conceptLead: "Performance starts with one clear product and one clear job: make the meals most likely to fail predictable, convenient and easy to repeat.",
    conceptCards: [
      { title: "Ready when time disappears", text: "Cooked meals you can take, heat and eat when meetings, travel or training remove the time to cook." },
      { title: "Six meals, not a full-day regime", text: "Core Set supports the difficult moments while leaving breakfast, snacks and the rest of the week in your control." },
      { title: "No nutrition guesswork", text: "Final meals must show ingredients, allergens, calories and macros clearly once recipes and portions are verified." },
      { title: "One planned delivery", text: "The pilot aims to replace several reactive food decisions with one predictable set and one delivery window." },
    ],
    momentsEyebrow: "Where the value is felt",
    momentsTitle: "Built for the transitions where good intentions usually lose.",
    momentsLead: "The product has to work in a normal week, not only in a perfect fitness routine.",
    moments: [
      { title: "Deep work day", text: "A dependable lunch or later meal when calls, meetings and focused work leave no space for cooking.", tag: "Work → next task" },
      { title: "Work → training", text: "A prepared option before or after training instead of deciding while already hungry.", tag: "Office → gym" },
      { title: "Late finish", text: "A reliable fallback when commuting, errands or a long day would otherwise become random delivery.", tag: "Day → evening" },
    ],
    differenceEyebrow: "Positioning",
    differenceTitle: "Convenience that earns a place in the routine.",
    differenceLead: "The value is not a dramatic diet promise. It is less decision friction, predictable food and a format useful enough to reorder.",
    difference: [
      { title: "One customer problem first", text: "We start from the schedule and the meals that repeatedly fail, then build the product around that behavior." },
      { title: "A narrow menu on purpose", text: "A small rotating selection is easier to produce consistently, improve quickly and trust during the pilot." },
      { title: "Useful transparency", text: "Ingredients, allergens, storage and nutrition need to be obvious before anyone pays." },
      { title: "Retention through usefulness", text: "Any future recurring order must be easy to pause or change. Repeat demand has to come from the product working." },
    ],
    notTitle: "What Performance is not",
    notItems: [
      "Not a weight-loss or medical promise",
      "Not bodybuilding-only meal prep",
      "Not a five-meals-a-day plan that controls your routine",
      "Not a fake preorder before operations are proven",
    ],
    pilotEyebrow: "Pilot path",
    pilotTitle: "Prove the product before scaling the catalog.",
    pilotLead: "The first pilot is intentionally small so feedback can change the specification before money is committed to wider production, logistics or acquisition.",
    pilotSteps: [
      { title: "Demand", text: "Collect schedules, pain points, meal frequency and price acceptance from real potential customers." },
      { title: "Specification", text: "Lock recipes, portions, labels, allergens, packaging, storage and shelf-life requirements." },
      { title: "Partner", text: "Confirm one kitchen, quality process, all-in costs, capacity and delivery handoff." },
      { title: "Paid pilot", text: "Serve a small cohort and measure taste, reliability, convenience, support load and repeat intent." },
      { title: "Repeat", text: "Only then decide final price, cadence, menu expansion, acquisition and broader geography." },
    ],
    pilotFacts: [
      { title: "Geography", value: "One city", note: "before expansion" },
      { title: "Production", value: "One partner", note: "no own kitchen first" },
      { title: "Hero offer", value: "One set", note: "six meals" },
      { title: "Checkout", value: "Closed", note: "until economics pass" },
    ],
    priceEyebrow: "Pilot price",
    priceTitle: "A real price anchor now. Checkout only after the economics are real.",
    priceLead: "Core Set is being validated at ₴1,190 for six meals, about ₴198 per meal. That gives demand a concrete price to react to while keeping the sale closed until food, packaging, delivery, waste and partner costs are confirmed.",
    priceCards: [
      { title: "Core Set", value: "₴1,190", text: "Target pilot price · 6 prepared meals · 3 busy days · approximately ₴198 per meal." },
      { title: "What the set must include", value: "6 meals", text: "Prepared food, clear labels and nutrition, safe packaging and the confirmed city delivery model." },
      { title: "Launch condition", value: "Real margin", text: "If the all-in economics cannot support the price after production, packaging, delivery and acquisition, we change the offer before selling it." },
    ],
    waitEyebrow: "Performance pilot",
    waitTitle: "Help decide whether Core Set deserves to launch.",
    waitLead: "Tell us where food breaks down in your week, how many ready meals would actually help and whether ₴1,190 for six meals feels reasonable for a product you would reorder.",
    waitCta: "Apply for the pilot",
    waitNote: "No payment today. No fake launch date. You are contacted only when there is a concrete pilot to confirm or test.",
    faqEyebrow: "Questions",
    faqTitle: "What is decided, and what still has to earn a yes.",
    faq: [
      { q: "Is Performance already selling meals?", a: "No. The page validates demand while production, packaging, food safety, delivery and economics are being confirmed." },
      { q: "Why six meals?", a: "Six is the working hero-product hypothesis: two high-friction meals across three busy days. Pilot behavior can still change the format." },
      { q: "Why ₴1,190?", a: "It is a target pilot price used to test real willingness to pay, not an open checkout. Final pricing only becomes real after the full cost structure is confirmed." },
      { q: "Is this only for athletes?", a: "No. Training is one use case. The broader customer is someone with a busy schedule who values predictable ready food around work, commuting and life." },
      { q: "Will calories and macros be shown?", a: "Yes in the final specification, but exact values are only published after recipes and portions are locked and verified with the production partner." },
      { q: "Will it become a subscription?", a: "Possibly, but only after customers actually use the set, like the food and want another one. Recurring billing is not the first thing to prove." },
      { q: "Where will the pilot launch?", a: "One city with one production partner. The exact city and delivery zone are announced only after operations are confirmed." },
    ],
    form: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / phone", type: "tel", placeholder: "@handle or number" },
      { id: "city", label: "City", required: true, placeholder: "Where would you want delivery?" },
      { id: "routine", label: "Closest routine", type: "select", required: true, options: ["Mostly work / study", "Work + training", "Travel / commuting heavy", "Unpredictable schedule"] },
      { id: "meals", label: "Ready meals that would help per week", type: "select", required: true, options: ["4–6", "6–8", "8–10", "Not sure yet"] },
      { id: "priceComfort", label: "How does ₴1,190 for 6 meals feel?", type: "select", required: true, options: ["Too high", "Reasonable", "Good value if quality is strong", "I would pay more for better quality / delivery"] },
      { id: "message", label: "Where does food break down in your week?", type: "textarea", required: true, placeholder: "What usually happens, what you buy instead, and what would make the set genuinely useful" },
    ],
  },
  ua: {
    badge: "Заявки на пілот відкриті · без оплати",
    eyebrow: "Performance · готова їжа для активних днів",
    titleA: "Шість готових страв.",
    titleB: "Три насичені дні без випадкової їжі.",
    lead: "Core Set закриває два прийоми їжі, які найчастіше зриваються в насичені дні. Справжня готова їжа для роботи, дороги, тренувань і пізніх завершень дня, без перетворення решти раціону на програму.",
    support: "Перша модель навмисно вузька: одне місто, один виробничий партнер, один набір із шести страв і планова доставка. Спочатку доводимо користь і повторний попит, а вже потім розширюємося.",
    primary: "Подати заявку на пілот",
    secondary: "Подивитися Core Set",
    truth: "Цільова ціна пілоту: 1 190 грн. Оплата не відкривається, доки не підтверджені виробництво, безпека, доставка та економіка.",
    mockKicker: "Концепт пілоту",
    mockStatus: "валідація",
    mockName: "CORE SET",
    mockLine: "Шість готових страв, що закривають слабкі місця трьох насичених днів.",
    mockPrice: "1 190 грн",
    mockPriceNote: "цільова ціна пілоту · 6 страв",
    mockPerMeal: "≈ 198 грн / страва",
    mockStats: [
      { value: "6", label: "готових страв" },
      { value: "3", label: "насичені дні" },
      { value: "2", label: "складні прийоми / день" },
    ],
    mockTags: ["Робота", "Дорога", "Тренування", "Пізній день"],
    conceptEyebrow: "Головний продукт",
    conceptTitle: "Вирішити повторювану проблему з їжею, а не контролювати весь день.",
    conceptLead: "Performance починає з одного зрозумілого продукту й одного завдання: зробити прийоми їжі, які найчастіше зриваються, передбачуваними, зручними та повторюваними.",
    conceptCards: [
      { title: "Готово, коли зникає час", text: "Приготовані страви, які можна взяти, розігріти й з’їсти, коли робота, дорога чи тренування не залишають часу на кухню." },
      { title: "Шість страв, не режим на весь день", text: "Core Set закриває складні моменти, а сніданок, перекуси та решта тижня залишаються під вашим контролем." },
      { title: "Без здогадок про склад", text: "Фінальні страви мають чітко показувати склад, алергени, калорійність і макронутрієнти після перевірки рецептур." },
      { title: "Одна планова доставка", text: "Пілот має замінити кілька випадкових рішень про їжу одним передбачуваним набором і одним вікном доставки." },
    ],
    momentsEyebrow: "Де відчувається цінність",
    momentsTitle: "Для переходів між справами, де добрі наміри зазвичай програють.",
    momentsLead: "Продукт має працювати у звичайному тижні, а не лише в ідеальному спортивному режимі.",
    moments: [
      { title: "День глибокої роботи", text: "Надійний обід або пізніший прийом їжі, коли дзвінки, зустрічі й сфокусована робота не залишають часу на готування.", tag: "Робота → далі" },
      { title: "Робота → тренування", text: "Готовий варіант до або після тренування замість рішення в момент, коли голод уже сильний.", tag: "Офіс → зал" },
      { title: "Пізнє завершення", text: "Надійний резерв, коли дорога, справи чи довгий день інакше закінчуються випадковою доставкою.", tag: "День → вечір" },
    ],
    differenceEyebrow: "Позиціонування",
    differenceTitle: "Зручність, яка заслуговує місце в режимі.",
    differenceLead: "Цінність не в гучній обіцянці дієти. Вона в меншій кількості рішень, передбачуваній їжі та форматі, який справді хочеться замовити знову.",
    difference: [
      { title: "Спочатку одна проблема", text: "Відштовхуємося від реального графіка й прийомів їжі, які повторювано зриваються, а потім будуємо продукт навколо цієї поведінки." },
      { title: "Вузьке меню навмисно", text: "Невеликий змінний вибір на пілоті легше стабільно готувати, швидко покращувати й контролювати." },
      { title: "Корисна прозорість", text: "Склад, алергени, зберігання й харчова цінність мають бути очевидними до будь-якої оплати." },
      { title: "Повтор через користь", text: "Майбутнє регулярне замовлення має легко призупинятися або змінюватися. Повторний попит має створювати сам продукт." },
    ],
    notTitle: "Чим Performance не є",
    notItems: [
      "Не обіцянка схуднення і не медична дієта",
      "Не харчування лише для бодібілдерів",
      "Не програма з п’яти прийомів на день, що керує всім режимом",
      "Не фальшиве передзамовлення до готовності операційної моделі",
    ],
    pilotEyebrow: "Шлях до пілоту",
    pilotTitle: "Довести продукт до того, як масштабувати каталог.",
    pilotLead: "Перший пілот навмисно невеликий, щоб відгуки могли змінити специфікацію до витрат на ширше виробництво, логістику чи залучення клієнтів.",
    pilotSteps: [
      { title: "Попит", text: "Зібрати реальні графіки, проблеми, потрібну кількість страв і реакцію на ціну." },
      { title: "Специфікація", text: "Зафіксувати рецепти, порції, маркування, алергени, пакування, зберігання й термін придатності." },
      { title: "Партнер", text: "Підтвердити одну кухню, контроль якості, повну собівартість, потужність і передачу в доставку." },
      { title: "Платний пілот", text: "Обслугувати невелику групу й виміряти смак, надійність, зручність, навантаження на підтримку та бажання повторити." },
      { title: "Повтор", text: "Лише потім визначати фінальну ціну, регулярність, меню, залучення клієнтів і нову географію." },
    ],
    pilotFacts: [
      { title: "Географія", value: "Одне місто", note: "до розширення" },
      { title: "Виробництво", value: "Один партнер", note: "без власної кухні на старті" },
      { title: "Головна пропозиція", value: "Один набір", note: "шість страв" },
      { title: "Оплата", value: "Закрита", note: "доки економіка не пройде перевірку" },
    ],
    priceEyebrow: "Ціна пілоту",
    priceTitle: "Зрозумілий ціновий орієнтир уже зараз. Оплата лише після перевірки економіки.",
    priceLead: "Core Set перевіряємо з ціною 1 190 грн за шість страв, приблизно 198 грн за страву. Так попит реагує на конкретну суму, але продаж залишається закритим до підтвердження витрат на їжу, пакування, доставку, списання й партнера.",
    priceCards: [
      { title: "Core Set", value: "1 190 грн", text: "Цільова ціна пілоту · 6 готових страв · 3 насичені дні · приблизно 198 грн за страву." },
      { title: "Що має входити", value: "6 страв", text: "Готова їжа, зрозуміле маркування й харчова цінність, безпечне пакування та підтверджена міська доставка." },
      { title: "Умова запуску", value: "Робоча маржа", text: "Якщо повна економіка не витримує ціну після виробництва, пакування, доставки й залучення клієнта, змінюємо пропозицію до продажу." },
    ],
    waitEyebrow: "Пілот Performance",
    waitTitle: "Допоможіть вирішити, чи заслуговує Core Set на запуск.",
    waitLead: "Розкажіть, де харчування ламається у вашому тижні, скільки готових страв реально допоможе та чи виглядає 1 190 грн за шість страв розумною ціною для продукту, який ви замовили б повторно.",
    waitCta: "Подати заявку на пілот",
    waitNote: "Сьогодні без оплати й без вигаданої дати запуску. Ми напишемо лише тоді, коли буде конкретний пілот для підтвердження або тесту.",
    faqEyebrow: "Питання",
    faqTitle: "Що вже вирішено, а що ще має заслужити відповідь «так».",
    faq: [
      { q: "Performance уже продає готові страви?", a: "Ні. Сторінка перевіряє попит, поки підтверджуються виробництво, пакування, безпека, доставка й економіка." },
      { q: "Чому саме шість страв?", a: "Шість — робоча гіпотеза головного продукту: два складні прийоми їжі протягом трьох насичених днів. Поведінка учасників пілоту ще може змінити формат." },
      { q: "Чому 1 190 грн?", a: "Це цільова ціна пілоту для перевірки реальної готовності платити, а не відкрите оформлення замовлення. Фінальна ціна стає реальною лише після підтвердження повної собівартості." },
      { q: "Це лише для спортсменів?", a: "Ні. Тренування — один зі сценаріїв. Ширша аудиторія — люди з насиченим графіком, яким потрібна передбачувана готова їжа між роботою, дорогою та іншими справами." },
      { q: "Чи будуть вказані калорії та макронутрієнти?", a: "Так у фінальній специфікації, але точні значення публікуються лише після фіксації рецептів і порцій та перевірки з виробничим партнером." },
      { q: "Буде підписка?", a: "Можливо, але лише після того, як люди реально використають набір, оцінять страви й захочуть наступний. Регулярна оплата не є першою гіпотезою." },
      { q: "Де буде перший пілот?", a: "В одному місті з одним виробничим партнером. Точне місто й зону доставки оголосимо лише після підтвердження операційної моделі." },
    ],
    form: [
      { id: "name", label: "Ваше ім’я", required: true, placeholder: "Ім’я та прізвище" },
      { id: "email", label: "Електронна пошта", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / телефон", type: "tel", placeholder: "@нік або номер" },
      { id: "city", label: "Місто", required: true, placeholder: "Де вам була б потрібна доставка?" },
      { id: "routine", label: "Найближчий до вас режим", type: "select", required: true, options: ["Переважно робота / навчання", "Робота + тренування", "Багато дороги / переїздів", "Непередбачуваний графік"] },
      { id: "meals", label: "Скільки готових страв допомогло б на тиждень", type: "select", required: true, options: ["4–6", "6–8", "8–10", "Поки не знаю"] },
      { id: "priceComfort", label: "Як сприймається 1 190 грн за 6 страв?", type: "select", required: true, options: ["Задорого", "Нормальна ціна", "Вигідно за високої якості", "Готовий платити більше за кращу якість / доставку"] },
      { id: "message", label: "Де харчування найчастіше ламається у вашому тижні?", type: "textarea", required: true, placeholder: "Що зазвичай відбувається, що ви купуєте замість нормальної їжі та що зробило б набір справді корисним" },
    ],
  },
  ru: {
    badge: "Заявки на пилот открыты · без оплаты",
    eyebrow: "Performance · готовая еда для активных дней",
    titleA: "Шесть готовых блюд.",
    titleB: "Три насыщенных дня без случайной еды.",
    lead: "Core Set закрывает два приёма пищи, которые чаще всего срываются в насыщенные дни. Настоящая готовая еда для работы, дороги, тренировок и поздних завершений дня, без превращения остального рациона в программу.",
    support: "Первая модель намеренно узкая: один город, один производственный партнёр, один набор из шести блюд и плановая доставка. Сначала доказываем пользу и повторный спрос, а уже потом расширяемся.",
    primary: "Подать заявку на пилот",
    secondary: "Посмотреть Core Set",
    truth: "Целевая цена пилота: 1 190 грн. Оплата не открывается, пока не подтверждены производство, безопасность, доставка и экономика.",
    mockKicker: "Концепт пилота",
    mockStatus: "проверка спроса",
    mockName: "CORE SET",
    mockLine: "Шесть готовых блюд, которые закрывают слабые места трёх насыщенных дней.",
    mockPrice: "1 190 грн",
    mockPriceNote: "целевая цена пилота · 6 блюд",
    mockPerMeal: "≈ 198 грн / блюдо",
    mockStats: [
      { value: "6", label: "готовых блюд" },
      { value: "3", label: "насыщенных дня" },
      { value: "2", label: "сложных приёма / день" },
    ],
    mockTags: ["Работа", "Дорога", "Тренировка", "Поздний день"],
    conceptEyebrow: "Главный продукт",
    conceptTitle: "Решить повторяющуюся проблему с едой, а не контролировать весь день.",
    conceptLead: "Performance начинает с одного понятного продукта и одной задачи: сделать приёмы пищи, которые чаще всего срываются, предсказуемыми, удобными и повторяемыми.",
    conceptCards: [
      { title: "Готово, когда пропадает время", text: "Приготовленные блюда, которые можно взять, разогреть и съесть, когда работа, дорога или тренировка не оставляют времени на кухню." },
      { title: "Шесть блюд, а не режим на весь день", text: "Core Set закрывает сложные моменты, а завтрак, перекусы и остальная неделя остаются под вашим контролем." },
      { title: "Без догадок о составе", text: "Финальные блюда должны понятно показывать состав, аллергены, калорийность и макронутриенты после проверки рецептур." },
      { title: "Одна плановая доставка", text: "Пилот должен заменить несколько случайных решений о еде одним предсказуемым набором и одним окном доставки." },
    ],
    momentsEyebrow: "Где чувствуется ценность",
    momentsTitle: "Для переходов между делами, где хорошие намерения обычно проигрывают.",
    momentsLead: "Продукт должен работать в обычной неделе, а не только в идеальном спортивном режиме.",
    moments: [
      { title: "День глубокой работы", text: "Надёжный обед или более поздний приём пищи, когда звонки, встречи и сфокусированная работа не оставляют времени на готовку.", tag: "Работа → дальше" },
      { title: "Работа → тренировка", text: "Готовый вариант до или после тренировки вместо решения в момент, когда голод уже сильный.", tag: "Офис → зал" },
      { title: "Позднее завершение", text: "Надёжный резерв, когда дорога, дела или длинный день иначе заканчиваются случайной доставкой.", tag: "День → вечер" },
    ],
    differenceEyebrow: "Позиционирование",
    differenceTitle: "Удобство, которое заслуживает место в режиме.",
    differenceLead: "Ценность не в громком обещании диеты. Она в меньшем количестве решений, предсказуемой еде и формате, который действительно хочется заказать снова.",
    difference: [
      { title: "Сначала одна проблема", text: "Отталкиваемся от реального графика и приёмов пищи, которые регулярно срываются, а затем строим продукт вокруг этого поведения." },
      { title: "Узкое меню намеренно", text: "Небольшой меняющийся выбор на пилоте проще стабильно готовить, быстро улучшать и контролировать." },
      { title: "Полезная прозрачность", text: "Состав, аллергены, хранение и пищевая ценность должны быть очевидны до любой оплаты." },
      { title: "Повтор через пользу", text: "Будущий регулярный заказ должно быть легко поставить на паузу или изменить. Повторный спрос должен создавать сам продукт." },
    ],
    notTitle: "Чем Performance не является",
    notItems: [
      "Не обещание похудения и не медицинская диета",
      "Не питание только для бодибилдеров",
      "Не программа из пяти приёмов в день, которая управляет всем режимом",
      "Не фальшивый предзаказ до готовности операционной модели",
    ],
    pilotEyebrow: "Путь к пилоту",
    pilotTitle: "Доказать продукт до масштабирования каталога.",
    pilotLead: "Первый пилот намеренно небольшой, чтобы отзывы могли изменить спецификацию до затрат на более широкое производство, логистику или привлечение клиентов.",
    pilotSteps: [
      { title: "Спрос", text: "Собрать реальные графики, проблемы, нужное количество блюд и реакцию на цену." },
      { title: "Спецификация", text: "Зафиксировать рецепты, порции, маркировку, аллергены, упаковку, хранение и срок годности." },
      { title: "Партнёр", text: "Подтвердить одну кухню, контроль качества, полную себестоимость, мощность и передачу в доставку." },
      { title: "Платный пилот", text: "Обслужить небольшую группу и измерить вкус, надёжность, удобство, нагрузку на поддержку и желание повторить." },
      { title: "Повтор", text: "Только затем определять финальную цену, регулярность, меню, привлечение клиентов и новую географию." },
    ],
    pilotFacts: [
      { title: "География", value: "Один город", note: "до расширения" },
      { title: "Производство", value: "Один партнёр", note: "без своей кухни на старте" },
      { title: "Главное предложение", value: "Один набор", note: "шесть блюд" },
      { title: "Оплата", value: "Закрыта", note: "пока экономика не пройдёт проверку" },
    ],
    priceEyebrow: "Цена пилота",
    priceTitle: "Понятный ценовой ориентир уже сейчас. Оплата только после проверки экономики.",
    priceLead: "Core Set проверяем с ценой 1 190 грн за шесть блюд, примерно 198 грн за блюдо. Так спрос реагирует на конкретную сумму, но продажа остаётся закрытой до подтверждения затрат на еду, упаковку, доставку, списания и партнёра.",
    priceCards: [
      { title: "Core Set", value: "1 190 грн", text: "Целевая цена пилота · 6 готовых блюд · 3 насыщенных дня · примерно 198 грн за блюдо." },
      { title: "Что должно входить", value: "6 блюд", text: "Готовая еда, понятная маркировка и пищевая ценность, безопасная упаковка и подтверждённая городская доставка." },
      { title: "Условие запуска", value: "Рабочая маржа", text: "Если полная экономика не выдерживает цену после производства, упаковки, доставки и привлечения клиента, меняем предложение до продажи." },
    ],
    waitEyebrow: "Пилот Performance",
    waitTitle: "Помогите решить, заслуживает ли Core Set запуска.",
    waitLead: "Расскажите, где питание ломается в вашей неделе, сколько готовых блюд реально поможет и выглядит ли 1 190 грн за шесть блюд разумной ценой для продукта, который вы заказали бы повторно.",
    waitCta: "Подать заявку на пилот",
    waitNote: "Сегодня без оплаты и без выдуманной даты запуска. Мы напишем только тогда, когда будет конкретный пилот для подтверждения или теста.",
    faqEyebrow: "Вопросы",
    faqTitle: "Что уже решено, а что ещё должно заслужить ответ «да».",
    faq: [
      { q: "Performance уже продаёт готовые блюда?", a: "Нет. Страница проверяет спрос, пока подтверждаются производство, упаковка, безопасность, доставка и экономика." },
      { q: "Почему именно шесть блюд?", a: "Шесть — рабочая гипотеза главного продукта: два сложных приёма пищи в течение трёх насыщенных дней. Поведение участников пилота ещё может изменить формат." },
      { q: "Почему 1 190 грн?", a: "Это целевая цена пилота для проверки реальной готовности платить, а не открытое оформление заказа. Финальная цена становится реальной только после подтверждения полной себестоимости." },
      { q: "Это только для спортсменов?", a: "Нет. Тренировка — один из сценариев. Более широкая аудитория — люди с насыщенным графиком, которым нужна предсказуемая готовая еда между работой, дорогой и остальными делами." },
      { q: "Будут указаны калории и макронутриенты?", a: "Да в финальной спецификации, но точные значения публикуются только после фиксации рецептов и порций и проверки с производственным партнёром." },
      { q: "Будет подписка?", a: "Возможно, но только после того, как люди реально используют набор, оценят блюда и захотят следующий. Регулярная оплата не является первой гипотезой." },
      { q: "Где будет первый пилот?", a: "В одном городе с одним производственным партнёром. Точный город и зону доставки объявим только после подтверждения операционной модели." },
    ],
    form: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Электронная почта", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / телефон", type: "tel", placeholder: "@ник или номер" },
      { id: "city", label: "Город", required: true, placeholder: "Где вам была бы нужна доставка?" },
      { id: "routine", label: "Ближайший к вам режим", type: "select", required: true, options: ["В основном работа / учёба", "Работа + тренировки", "Много дороги / переездов", "Непредсказуемый график"] },
      { id: "meals", label: "Сколько готовых блюд помогло бы в неделю", type: "select", required: true, options: ["4–6", "6–8", "8–10", "Пока не знаю"] },
      { id: "priceComfort", label: "Как воспринимается 1 190 грн за 6 блюд?", type: "select", required: true, options: ["Дорого", "Нормальная цена", "Выгодно при высоком качестве", "Готов платить больше за лучшее качество / доставку"] },
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
    context: {
      concept: "performance_core_set",
      stage: "pilot_validation",
      target_price_uah: 1190,
      source,
      locale: lang,
      route,
    },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020302] text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-20 pt-28 sm:pb-28 sm:pt-36">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[760px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,.16),rgba(212,175,55,.045)_38%,transparent_70%)]" />
          </div>
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.03fr_.97fr] lg:gap-14">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.55 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.15em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{x.badge}
                </span>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.22em] text-emerald-200/65">{x.eyebrow}</p>
                <h1 className="section-title mt-4 max-w-3xl text-[clamp(2.65rem,4.8vw,4.8rem)] leading-[.96] tracking-[-.045em] text-zinc-100">
                  <span>{x.titleA}</span>
                  <span className="mt-2 block bg-gradient-to-br from-emerald-100 via-emerald-300 to-amber-200 bg-clip-text font-normal text-transparent">{x.titleB}</span>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{x.lead}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">{x.support}</p>
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
                <p className="mt-4 flex max-w-xl items-start gap-2 text-xs leading-6 text-zinc-500"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-200/60" />{x.truth}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.08 }}>
                <InteractiveSurface accent="green" lift={false} className="overflow-hidden rounded-[32px] border border-emerald-200/[.14] bg-[linear-gradient(145deg,rgba(110,231,183,.075),rgba(255,255,255,.018)_48%,rgba(0,0,0,.68))] p-5 shadow-[0_44px_110px_-58px_rgba(52,211,153,.32)] sm:p-6">
                  <div className="rounded-[26px] border border-white/[.08] bg-[#070a08] p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-emerald-200/70">{x.mockKicker}</p>
                        <p className="mt-3 text-4xl font-semibold tracking-[-.055em] text-zinc-100 sm:text-5xl">PERFORMANCE</p>
                        <p className="mt-1 text-lg font-medium tracking-[.19em] text-amber-100/75">{x.mockName}</p>
                      </div>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-300/[.06] text-emerald-200"><Flame className="h-5 w-5" /></span>
                    </div>
                    <p className="mt-7 max-w-md text-sm leading-7 text-zinc-300">{x.mockLine}</p>

                    <div className="mt-5 flex items-end justify-between gap-4 rounded-[20px] border border-amber-200/[.16] bg-amber-200/[.03] p-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-amber-100/55">{x.mockPriceNote}</p>
                        <p className="mt-1 text-3xl font-semibold tracking-[-.04em] text-zinc-100">{x.mockPrice}</p>
                      </div>
                      <p className="pb-1 text-xs font-medium text-zinc-400">{x.mockPerMeal}</p>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {x.mockStats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/[.08] bg-white/[.025] p-3.5">
                          <p className="text-2xl font-semibold tracking-[-.04em] text-zinc-100">{stat.value}</p>
                          <p className="mt-1 text-[11px] leading-5 text-zinc-400 sm:text-xs">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {x.mockTags.map((tag) => <span key={tag} className="rounded-full border border-emerald-300/[.15] bg-emerald-300/[.04] px-3 py-1.5 text-[10px] font-medium text-emerald-100/80 sm:text-[11px]">{tag}</span>)}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] bg-black/28 px-4 py-3.5">
                    <div><p className="text-[10px] uppercase tracking-[.14em] text-zinc-600">Performance 01</p><p className="mt-1 text-sm text-zinc-300">Core Set · {x.mockStatus}</p></div>
                    <Zap className="h-4 w-4 text-amber-200/70" />
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
                    <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/16 bg-emerald-300/[.045] text-emerald-200"><Icon className="h-4 w-4" /></span><span className="rounded-full border border-white/[.07] px-2.5 py-1 text-[10px] text-zinc-500">{moment.tag}</span></div>
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
                return <div key={fact.title} className="rounded-[22px] border border-emerald-300/[.09] bg-emerald-300/[.02] p-5"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[.14em] text-zinc-600">{fact.title}</p><Icon className="h-3.5 w-3.5 text-emerald-200/55" /></div><p className="mt-3 text-lg font-semibold text-zinc-100">{fact.value}</p><p className="mt-1 text-[11px] leading-5 text-zinc-500">{fact.note}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-amber-200/70">{x.priceEyebrow}</p>
              <h2 className="section-title mt-4 text-[clamp(2.35rem,4.7vw,4.5rem)] text-zinc-100">{x.priceTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{x.priceLead}</p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {x.priceCards.map((card, index) => {
                const icons = [Zap, PackageCheck, ShieldCheck];
                const Icon = icons[index] ?? PackageCheck;
                return (
                  <div key={card.title} className={`rounded-[28px] border p-6 ${index === 0 ? "border-amber-200/[.2] bg-[linear-gradient(145deg,rgba(251,191,36,.06),rgba(255,255,255,.015))] shadow-[0_26px_90px_-62px_rgba(251,191,36,.7)]" : "border-white/[.08] bg-white/[.016]"}`}>
                    <div className="flex items-center justify-between"><p className={`text-[10px] font-semibold uppercase tracking-[.17em] ${index === 0 ? "text-amber-100/65" : "text-zinc-600"}`}>{card.title}</p><Icon className={`h-4 w-4 ${index === 0 ? "text-amber-200" : "text-emerald-200/55"}`} /></div>
                    <p className={`mt-5 font-semibold tracking-[-.04em] text-zinc-100 ${index === 0 ? "text-4xl" : "text-2xl"}`}>{card.value}</p>
                    <p className="mt-3 text-sm leading-7 text-zinc-500">{card.text}</p>
                  </div>
                );
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
