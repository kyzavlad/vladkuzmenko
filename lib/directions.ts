import type { Lang } from "@/lib/i18n";

/**
 * The four business directions of the ecosystem, shared by the hero rail and the
 * overview cards so the two can never drift apart.
 *
 * Media / personal brand is deliberately not a direction here — it belongs to the
 * About / personal-brand layer, not to the business-model set.
 */
export type DirectionKey = "business" | "visibility" | "warriors" | "performance";

export const DIRECTION_ORDER: DirectionKey[] = [
  "business",
  "visibility",
  "warriors",
  "performance",
];

export type DirectionAccent = "gold" | "blue" | "violet" | "green";

export const DIRECTION_ACCENT: Record<DirectionKey, DirectionAccent> = {
  business: "gold",
  visibility: "blue",
  warriors: "violet",
  performance: "green",
};

export type Direction = {
  /** Compact name for the hero rail. */
  short: string;
  /** Category badge on the overview card. */
  label: string;
  title: string;
  /** The single result a visitor gets from this direction. */
  outcome: string;
  text: string;
  tags: string[];
  cta: string;
};

type DirectionCopy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  outcomeLabel: string;
  items: Record<DirectionKey, Direction>;
};

const en: DirectionCopy = {
  eyebrow: "The ecosystem",
  titleA: "Four directions, ",
  titleB: "one standard",
  desc: "Each one solves a different problem and ends in one clear next step. Start with the result you need next.",
  outcomeLabel: "What you get",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "For business",
      title: "Client Growth Systems",
      outcome: "More qualified attention, enquiries, meetings and sales.",
      text: "Find the bottleneck between attention, enquiry and sale, then build the smallest system that changes the commercial result.",
      tags: ["Traffic", "Conversion", "Automation", "Sales"],
      cta: "Open Growth Systems",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Software",
      title: "VisibilityOS",
      outcome: "Know where your website loses conversion, trust and visibility — and what to fix first.",
      text: "A read on the pages that carry your revenue: what stops an enquiry, what breaks trust, and how you appear in search and AI answers.",
      tags: ["Conversion", "Trust", "Search", "AI visibility"],
      cta: "Open VisibilityOS",
    },
    warriors: {
      short: "Warriors Team",
      label: "Private network",
      title: "Warriors Team",
      outcome: "A stronger circle, direct feedback and a higher execution standard.",
      text: "A selective network for people already building — peers who tell you the truth, useful introductions and a standard that pulls your work up.",
      tags: ["Business", "Training", "Feedback", "Network"],
      cta: "Explore Warriors Team",
    },
    performance: {
      short: "Performance",
      label: "Performance",
      title: "Performance products",
      outcome: "Nutrition, training days and daily routine made easier to keep.",
      text: "Practical products for people who train and want less friction around food, recovery and everyday discipline.",
      tags: ["Meal sets", "Training days", "Routine", "Essentials"],
      cta: "See Performance",
    },
  },
};

const ua: DirectionCopy = {
  eyebrow: "Екосистема",
  titleA: "Чотири напрями, ",
  titleB: "один стандарт",
  desc: "Кожен вирішує свою задачу і веде до одного зрозумілого наступного кроку. Почніть із результату, який потрібен вам наступним.",
  outcomeLabel: "Що ви отримуєте",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "Для бізнесу",
      title: "Client Growth Systems",
      outcome: "Більше якісної уваги, звернень, зустрічей і продажів.",
      text: "Знайти вузьке місце між увагою, зверненням і продажем та зібрати найменшу систему, яка змінює комерційний результат.",
      tags: ["Traffic", "Conversion", "Automation", "Sales"],
      cta: "Відкрити Growth Systems",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Софт",
      title: "VisibilityOS",
      outcome: "Зрозуміти, де сайт втрачає конверсію, довіру та видимість — і що виправляти першим.",
      text: "Погляд на сторінки, які приносять гроші: що зупиняє звернення, що ламає довіру і як вас видно в пошуку та AI-відповідях.",
      tags: ["Конверсія", "Довіра", "Пошук", "AI-видимість"],
      cta: "Відкрити VisibilityOS",
    },
    warriors: {
      short: "Warriors Team",
      label: "Приватна мережа",
      title: "Warriors Team",
      outcome: "Сильніше оточення, прямий фідбек і вищий стандарт виконання.",
      text: "Вибіркова мережа для тих, хто вже будує: люди, які кажуть правду, корисні знайомства і планка, яка підтягує вашу роботу.",
      tags: ["Бізнес", "Тренування", "Фідбек", "Нетворк"],
      cta: "Відкрити Warriors Team",
    },
    performance: {
      short: "Performance",
      label: "Performance",
      title: "Performance-продукти",
      outcome: "Харчування, тренувальні дні та щоденний режим, які легше витримувати.",
      text: "Практичні продукти для тих, хто тренується і хоче менше тертя навколо їжі, відновлення та щоденної дисципліни.",
      tags: ["Набори їжі", "Тренувальні дні", "Режим", "Essentials"],
      cta: "Відкрити Performance",
    },
  },
};

const ru: DirectionCopy = {
  eyebrow: "Экосистема",
  titleA: "Четыре направления, ",
  titleB: "один стандарт",
  desc: "Каждое решает свою задачу и ведёт к одному понятному следующему шагу. Начните с результата, который нужен вам следующим.",
  outcomeLabel: "Что вы получаете",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "Для бизнеса",
      title: "Client Growth Systems",
      outcome: "Больше качественного внимания, обращений, встреч и продаж.",
      text: "Найти узкое место между вниманием, обращением и продажей и собрать минимальную систему, которая меняет коммерческий результат.",
      tags: ["Traffic", "Conversion", "Automation", "Sales"],
      cta: "Открыть Growth Systems",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Софт",
      title: "VisibilityOS",
      outcome: "Понять, где сайт теряет конверсию, доверие и видимость — и что исправлять первым.",
      text: "Взгляд на страницы, которые приносят деньги: что останавливает заявку, что ломает доверие и как вас видно в поиске и AI-ответах.",
      tags: ["Конверсия", "Доверие", "Поиск", "AI-видимость"],
      cta: "Открыть VisibilityOS",
    },
    warriors: {
      short: "Warriors Team",
      label: "Закрытая сеть",
      title: "Warriors Team",
      outcome: "Сильное окружение, прямой фидбек и более высокий стандарт исполнения.",
      text: "Отборная сеть для тех, кто уже строит: люди, которые говорят правду, полезные знакомства и планка, которая подтягивает вашу работу.",
      tags: ["Бизнес", "Тренировки", "Фидбек", "Нетворк"],
      cta: "Открыть Warriors Team",
    },
    performance: {
      short: "Performance",
      label: "Performance",
      title: "Performance-продукты",
      outcome: "Питание, тренировочные дни и ежедневный режим, которые легче выдерживать.",
      text: "Практичные продукты для тех, кто тренируется и хочет меньше трения вокруг еды, восстановления и ежедневной дисциплины.",
      tags: ["Наборы еды", "Тренировочные дни", "Режим", "Essentials"],
      cta: "Открыть Performance",
    },
  },
};

const COPY: Record<Lang, DirectionCopy> = { en, ua, ru };

export const getDirectionCopy = (lang: Lang): DirectionCopy => COPY[lang] ?? en;

export const getDirections = (lang: Lang): Record<DirectionKey, Direction> =>
  getDirectionCopy(lang).items;
