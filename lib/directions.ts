import type { Lang } from "@/lib/i18n";

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
  short: string;
  label: string;
  title: string;
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
  eyebrow: "Choose your entry point",
  titleA: "What do you want to ",
  titleB: "strengthen now?",
  desc: "Four independent directions. Pick the result you need and move through one clear next step.",
  outcomeLabel: "What you get",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "For business",
      title: "Client Growth Systems",
      outcome: "More qualified attention, enquiries, meetings and sales.",
      text: "Find the bottleneck between attention and sale, then build the system that removes it.",
      tags: ["Traffic", "Conversion", "Automation", "Sales"],
      cta: "Open Growth Systems",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Software",
      title: "VisibilityOS",
      outcome: "See where your website loses conversion, trust and visibility, and what deserves attention first.",
      text: "A focused website intelligence layer for the pages that should be turning attention into action.",
      tags: ["Conversion", "Trust", "Search", "AI visibility"],
      cta: "Explore VisibilityOS",
    },
    warriors: {
      short: "Warriors Team",
      label: "Private network",
      title: "Warriors Team",
      outcome: "A stronger circle, direct feedback and a higher execution standard.",
      text: "A selective network for people already building and looking for stronger people around them.",
      tags: ["Business", "Training", "Feedback", "Network"],
      cta: "Explore Warriors Team",
    },
    performance: {
      short: "Performance",
      label: "Performance",
      title: "Performance",
      outcome: "Practical products that make training days and a demanding routine easier to keep.",
      text: "Starting with food systems for active people, then expanding only where the product genuinely earns its place.",
      tags: ["Meal sets", "Training days", "Routine", "Essentials"],
      cta: "Explore Performance",
    },
  },
};

const ua: DirectionCopy = {
  eyebrow: "Оберіть точку входу",
  titleA: "Що ви хочете ",
  titleB: "посилити зараз?",
  desc: "Чотири самостійні напрями. Оберіть потрібний результат і переходьте до одного зрозумілого наступного кроку.",
  outcomeLabel: "Що ви отримуєте",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "Для бізнесу",
      title: "Client Growth Systems",
      outcome: "Більше якісної уваги, звернень, зустрічей і продажів.",
      text: "Знаходимо вузьке місце між увагою та продажем і будуємо систему, яка його прибирає.",
      tags: ["Traffic", "Conversion", "Automation", "Sales"],
      cta: "Відкрити Growth Systems",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Софт",
      title: "VisibilityOS",
      outcome: "Побачити, де сайт втрачає конверсію, довіру та видимість і що варто виправити першим.",
      text: "Сфокусований шар аналітики для сторінок, які мають перетворювати увагу на дію.",
      tags: ["Конверсія", "Довіра", "Пошук", "AI-видимість"],
      cta: "Відкрити VisibilityOS",
    },
    warriors: {
      short: "Warriors Team",
      label: "Приватна мережа",
      title: "Warriors Team",
      outcome: "Сильніше оточення, прямий фідбек і вищий стандарт виконання.",
      text: "Вибіркова мережа для тих, хто вже будує і хоче сильніших людей поруч.",
      tags: ["Бізнес", "Тренування", "Фідбек", "Нетворк"],
      cta: "Відкрити Warriors Team",
    },
    performance: {
      short: "Performance",
      label: "Performance",
      title: "Performance",
      outcome: "Практичні продукти, з якими легше тримати тренувальний день і насичений ритм.",
      text: "Починаємо з системи харчування для активних людей і розширюємо лінійку лише там, де продукт справді потрібен.",
      tags: ["Набори їжі", "Тренувальні дні", "Режим", "Essentials"],
      cta: "Відкрити Performance",
    },
  },
};

const ru: DirectionCopy = {
  eyebrow: "Выберите точку входа",
  titleA: "Что вы хотите ",
  titleB: "усилить сейчас?",
  desc: "Четыре самостоятельных направления. Выберите нужный результат и переходите к одному понятному следующему шагу.",
  outcomeLabel: "Что вы получаете",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "Для бизнеса",
      title: "Client Growth Systems",
      outcome: "Больше качественного внимания, обращений, встреч и продаж.",
      text: "Находим узкое место между вниманием и продажей и строим систему, которая его убирает.",
      tags: ["Traffic", "Conversion", "Automation", "Sales"],
      cta: "Открыть Growth Systems",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Софт",
      title: "VisibilityOS",
      outcome: "Увидеть, где сайт теряет конверсию, доверие и видимость и что стоит исправить первым.",
      text: "Сфокусированный слой аналитики для страниц, которые должны превращать внимание в действие.",
      tags: ["Конверсия", "Доверие", "Поиск", "AI-видимость"],
      cta: "Открыть VisibilityOS",
    },
    warriors: {
      short: "Warriors Team",
      label: "Закрытая сеть",
      title: "Warriors Team",
      outcome: "Сильное окружение, прямой фидбек и более высокий стандарт исполнения.",
      text: "Отборная сеть для тех, кто уже строит и хочет более сильных людей рядом.",
      tags: ["Бизнес", "Тренировки", "Фидбек", "Нетворк"],
      cta: "Открыть Warriors Team",
    },
    performance: {
      short: "Performance",
      label: "Performance",
      title: "Performance",
      outcome: "Практичные продукты, с которыми легче держать тренировочный день и плотный ритм.",
      text: "Начинаем с системы питания для активных людей и расширяем линейку только там, где продукт действительно нужен.",
      tags: ["Наборы еды", "Тренировочные дни", "Режим", "Essentials"],
      cta: "Открыть Performance",
    },
  },
};

const COPY: Record<Lang, DirectionCopy> = { en, ua, ru };

export const getDirectionCopy = (lang: Lang): DirectionCopy => COPY[lang] ?? en;

export const getDirections = (lang: Lang): Record<DirectionKey, Direction> =>
  getDirectionCopy(lang).items;
