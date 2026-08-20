import type { Lang } from "@/lib/i18n";

export type DirectionKey = "business" | "visibility" | "warriors" | "performance";
export const DIRECTION_ORDER: DirectionKey[] = ["business", "visibility", "warriors"];
export type DirectionAccent = "gold" | "blue" | "violet" | "green";
export const DIRECTION_ACCENT: Record<DirectionKey, DirectionAccent> = { business: "gold", visibility: "blue", warriors: "violet", performance: "green" };
export type Direction = { short: string; label: string; title: string; outcome: string; text: string; tags: string[]; cta: string; };
type DirectionCopy = { eyebrow: string; titleA: string; titleB: string; desc: string; outcomeLabel: string; items: Record<DirectionKey, Direction>; };

const en: DirectionCopy = { eyebrow: "Choose your entry point", titleA: "What do you want to ", titleB: "strengthen now?", desc: "Three core directions. Pick the result you need and move through one clear next step.", outcomeLabel: "What you get", items: {
  business: { short: "Client Growth Systems", label: "For business", title: "Client Growth Systems", outcome: "More qualified attention, enquiries, meetings and sales.", text: "Find the bottleneck between attention and sale, then build the system that removes it.", tags: ["Traffic", "Conversion", "Automation", "Sales"], cta: "Open Growth Systems" },
  visibility: { short: "VisibilityOS", label: "Software", title: "VisibilityOS", outcome: "See where your website loses conversion, trust and visibility, and what deserves attention first.", text: "A focused website intelligence layer for the pages that should be turning attention into action.", tags: ["Conversion", "Trust", "Search", "AI visibility"], cta: "Explore VisibilityOS" },
  warriors: { short: "Warriors", label: "Private club", title: "Warriors", outcome: "Practical skills, weekly implementation and a selective network around real work.", text: "Four learning paths, direct review and a private community built to help members execute faster.", tags: ["Skills", "Execution", "Network", "Review"], cta: "Explore Warriors" },
  performance: { short: "Performance", label: "Archived experiment", title: "Performance", outcome: "An archived product experiment that is no longer part of the core offer.", text: "Kept only for compatibility with existing links while owned ecommerce experiments move into the projects portfolio.", tags: ["Archived"], cta: "" },
} };

const ua: DirectionCopy = { eyebrow: "Оберіть точку входу", titleA: "Що ви хочете ", titleB: "посилити зараз?", desc: "Три основні напрями. Оберіть потрібний результат і переходьте до одного зрозумілого наступного кроку.", outcomeLabel: "Що ви отримуєте", items: {
  business: { short: "Client Growth Systems", label: "Для бізнесу", title: "Client Growth Systems", outcome: "Більше якісної уваги, звернень, зустрічей і продажів.", text: "Знаходимо вузьке місце між увагою та продажем і будуємо систему, яка його прибирає.", tags: ["Трафік", "Конверсія", "Автоматизація", "Продажі"], cta: "Відкрити Growth Systems" },
  visibility: { short: "VisibilityOS", label: "Програмний продукт", title: "VisibilityOS", outcome: "Побачити, де сайт втрачає конверсію, довіру та видимість і що варто виправити першим.", text: "Сфокусований шар аналітики для сторінок, які мають перетворювати увагу на дію.", tags: ["Конверсія", "Довіра", "Пошук", "ШІ-видимість"], cta: "Відкрити VisibilityOS" },
  warriors: { short: "Warriors", label: "Закритий клуб", title: "Warriors", outcome: "Практичні навички, щотижнева реалізація та відібране оточення навколо реальної роботи.", text: "Чотири напрями навчання, прямі розбори й закрита спільнота, що допомагає учасникам рухатись швидше.", tags: ["Навички", "Реалізація", "Оточення", "Розбори"], cta: "Відкрити Warriors" },
  performance: { short: "Performance", label: "Архівний експеримент", title: "Performance", outcome: "Архівний продуктовий експеримент, який більше не входить до основної пропозиції.", text: "Збережений лише для сумісності зі старими посиланнями, а власні ecommerce-експерименти перенесені до портфеля проєктів.", tags: ["Архів"], cta: "" },
} };

const ru: DirectionCopy = { eyebrow: "Выберите точку входа", titleA: "Что вы хотите ", titleB: "усилить сейчас?", desc: "Три основных направления. Выберите нужный результат и переходите к одному понятному следующему шагу.", outcomeLabel: "Что вы получаете", items: {
  business: { short: "Client Growth Systems", label: "Для бизнеса", title: "Client Growth Systems", outcome: "Больше качественного внимания, обращений, встреч и продаж.", text: "Находим узкое место между вниманием и продажей и строим систему, которая его убирает.", tags: ["Трафик", "Конверсия", "Автоматизация", "Продажи"], cta: "Открыть Growth Systems" },
  visibility: { short: "VisibilityOS", label: "Программный продукт", title: "VisibilityOS", outcome: "Увидеть, где сайт теряет конверсию, доверие и видимость и что стоит исправить первым.", text: "Сфокусированный слой аналитики для страниц, которые должны превращать внимание в действие.", tags: ["Конверсия", "Доверие", "Поиск", "ИИ-видимость"], cta: "Открыть VisibilityOS" },
  warriors: { short: "Warriors", label: "Закрытый клуб", title: "Warriors", outcome: "Практические навыки, еженедельная реализация и отобранное окружение вокруг реальной работы.", text: "Четыре направления обучения, прямые разборы и закрытое сообщество, которое помогает участникам двигаться быстрее.", tags: ["Навыки", "Реализация", "Окружение", "Разборы"], cta: "Открыть Warriors" },
  performance: { short: "Performance", label: "Архивный эксперимент", title: "Performance", outcome: "Архивный продуктовый эксперимент, который больше не входит в основное предложение.", text: "Сохранён только для совместимости со старыми ссылками, а собственные ecommerce-эксперименты перенесены в портфель проектов.", tags: ["Архив"], cta: "" },
} };

const COPY: Record<Lang, DirectionCopy> = { en, ua, ru };
export const getDirectionCopy = (lang: Lang): DirectionCopy => COPY[lang] ?? en;
export const getDirections = (lang: Lang): Record<DirectionKey, Direction> => getDirectionCopy(lang).items;
