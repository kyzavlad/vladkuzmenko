import type { Lang } from "@/lib/i18n";

export type DirectionKey = "business" | "visibility" | "warriors" | "performance";
export const DIRECTION_ORDER: DirectionKey[] = ["business", "visibility", "warriors"];
export type DirectionAccent = "gold" | "blue" | "violet" | "green";
export const DIRECTION_ACCENT: Record<DirectionKey, DirectionAccent> = { business: "gold", visibility: "blue", warriors: "violet", performance: "green" };
export type Direction = { short: string; label: string; title: string; outcome: string; text: string; tags: string[]; cta: string; };
type DirectionCopy = { eyebrow: string; titleA: string; titleB: string; desc: string; outcomeLabel: string; items: Record<DirectionKey, Direction>; };

const en: DirectionCopy = {
  eyebrow: "Choose the bottleneck",
  titleA: "What is stopping the next ",
  titleB: "step right now?",
  desc: "Do not start with a tool. Start with the result you are missing, then enter through the system built for that problem.",
  outcomeLabel: "The result",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "For business",
      title: "Client Growth Systems",
      outcome: "Bring more of the right people in and lose less demand before it becomes a conversation or sale.",
      text: "If attention is too low or good enquiries disappear along the way, we find the biggest leak first and build the system around it.",
      tags: ["Demand", "Conversion", "Automation", "Sales"],
      cta: "Find the growth bottleneck",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Website intelligence",
      title: "VisibilityOS",
      outcome: "See why the site is losing trust, visibility or action, and know what deserves fixing first.",
      text: "VisibilityOS turns scattered website problems into a prioritised view of what blocks understanding, confidence and the next click.",
      tags: ["Conversion", "Trust", "Search", "AI visibility"],
      cta: "Scan with VisibilityOS",
    },
    warriors: {
      short: "Warriors",
      label: "Private execution club",
      title: "Warriors",
      outcome: "Strengthen the skills, discipline and environment that determine how well you execute every week.",
      text: "Practical learning, working sessions and a selective network built around implementation rather than passive consumption.",
      tags: ["Skills", "Discipline", "Network", "Review"],
      cta: "Explore Warriors",
    },
    performance: {
      short: "Performance",
      label: "Archived experiment",
      title: "Performance",
      outcome: "An archived product experiment that is no longer part of the core offer.",
      text: "Kept only for compatibility with existing links while owned ecommerce experiments live in the projects portfolio.",
      tags: ["Archived"],
      cta: "",
    },
  },
};

const ua: DirectionCopy = {
  eyebrow: "Оберіть вузьке місце",
  titleA: "Що зараз стримує ваш ",
  titleB: "наступний крок?",
  desc: "Не починайте з інструмента. Почніть із результату, якого бракує, і оберіть систему під цю проблему.",
  outcomeLabel: "Результат",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "Для бізнесу",
      title: "Client Growth Systems",
      outcome: "Залучати більше потрібних людей і втрачати менше попиту до розмови чи продажу.",
      text: "Якщо уваги замало або хороші звернення губляться по дорозі, спочатку знаходимо найбільшу втрату й будуємо систему навколо неї.",
      tags: ["Попит", "Конверсія", "Автоматизація", "Продажі"],
      cta: "Знайти вузьке місце росту",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Аналітика сайту",
      title: "VisibilityOS",
      outcome: "Побачити, чому сайт втрачає довіру, видимість або дію, і зрозуміти, що виправляти першим.",
      text: "VisibilityOS перетворює розрізнені проблеми сайту на пріоритетну картину того, що заважає зрозуміти, довіритися й зробити наступний крок.",
      tags: ["Конверсія", "Довіра", "Пошук", "AI-видимість"],
      cta: "Перевірити через VisibilityOS",
    },
    warriors: {
      short: "Warriors",
      label: "Закритий клуб реалізації",
      title: "Warriors",
      outcome: "Посилити навички, дисципліну та оточення, які визначають якість виконання щотижня.",
      text: "Практичне навчання, робочі сесії й відібрана мережа навколо реалізації, а не пасивного споживання контенту.",
      tags: ["Навички", "Дисципліна", "Оточення", "Розбори"],
      cta: "Відкрити Warriors",
    },
    performance: {
      short: "Performance",
      label: "Архівний експеримент",
      title: "Performance",
      outcome: "Архівний продуктовий експеримент, який більше не входить до основної пропозиції.",
      text: "Збережений лише для сумісності зі старими посиланнями, а власні ecommerce-експерименти живуть у портфелі проєктів.",
      tags: ["Архів"],
      cta: "",
    },
  },
};

const ru: DirectionCopy = {
  eyebrow: "Выберите узкое место",
  titleA: "Что сейчас тормозит ваш ",
  titleB: "следующий шаг?",
  desc: "Не начинайте с инструмента. Начните с результата, которого не хватает, и выберите систему под эту проблему.",
  outcomeLabel: "Результат",
  items: {
    business: {
      short: "Client Growth Systems",
      label: "Для бизнеса",
      title: "Client Growth Systems",
      outcome: "Привлекать больше подходящих людей и терять меньше спроса до разговора или сделки.",
      text: "Если внимания мало или хорошие обращения пропадают по пути, сначала находим главную потерю и строим систему вокруг неё.",
      tags: ["Спрос", "Конверсия", "Автоматизация", "Продажи"],
      cta: "Найти узкое место роста",
    },
    visibility: {
      short: "VisibilityOS",
      label: "Аналитика сайта",
      title: "VisibilityOS",
      outcome: "Понять, почему сайт теряет доверие, видимость или действие, и что нужно исправить первым.",
      text: "VisibilityOS превращает разрозненные проблемы сайта в приоритетную картину того, что мешает понять предложение, довериться и сделать следующий шаг.",
      tags: ["Конверсия", "Доверие", "Поиск", "AI-видимость"],
      cta: "Проверить через VisibilityOS",
    },
    warriors: {
      short: "Warriors",
      label: "Закрытый клуб реализации",
      title: "Warriors",
      outcome: "Усилить навыки, дисциплину и окружение, которые определяют качество вашей реализации каждую неделю.",
      text: "Практическое обучение, рабочие сессии и отобранная сеть вокруг выполнения, а не пассивного потребления контента.",
      tags: ["Навыки", "Дисциплина", "Окружение", "Разборы"],
      cta: "Открыть Warriors",
    },
    performance: {
      short: "Performance",
      label: "Архивный эксперимент",
      title: "Performance",
      outcome: "Архивный продуктовый эксперимент, который больше не входит в основное предложение.",
      text: "Сохранён только для совместимости со старыми ссылками, а собственные ecommerce-эксперименты живут в портфеле проектов.",
      tags: ["Архив"],
      cta: "",
    },
  },
};

const COPY: Record<Lang, DirectionCopy> = { en, ua, ru };
export const getDirectionCopy = (lang: Lang): DirectionCopy => COPY[lang] ?? en;
export const getDirections = (lang: Lang): Record<DirectionKey, Direction> => getDirectionCopy(lang).items;
