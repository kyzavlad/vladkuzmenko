"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";

type DepthRoute = "visibilityos" | "warriors-team" | "drop";

type DepthCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: { title: string; text: string }[];
};

const COPY: Record<Lang, Record<DepthRoute, DepthCopy>> = {
  en: {
    visibilityos: {
      eyebrow: "After the audit",
      title: "Diagnosis should end in a decision, not another report",
      intro: "The useful sequence is simple: prove the leak, fix the highest-impact layer first, then check the same journey again.",
      cards: [
        { title: "Prioritize", text: "Separate issues that affect trust, conversion or visibility from cosmetic changes that can wait." },
        { title: "Implement", text: "Turn the evidence into a short execution list for your team or into the relevant Growth System." },
        { title: "Re-check", text: "Review the same pages and paths after changes so the next decision is based on evidence, not memory." },
      ],
    },
    "warriors-team": {
      eyebrow: "The point of the network",
      title: "A strong circle is valuable when it improves the quality of decisions",
      intro: "The format is built around real work, direct context and useful relationships rather than passive networking or motivational noise.",
      cards: [
        { title: "Real context", text: "Bring an actual business, training or execution problem instead of discussing ideas in the abstract." },
        { title: "Direct feedback", text: "Useful feedback should make the next move clearer, even when the answer is not comfortable." },
        { title: "Relevant network", text: "Introductions matter when there is a real reason for two people to help each other move faster." },
      ],
    },
    drop: {
      eyebrow: "Before launch",
      title: "The product has to survive three tests before it deserves scale",
      intro: "Performance stays in validation until the routine works for real users and the operating model works in the real world.",
      cards: [
        { title: "Repeatability", text: "The product should be simple enough to use repeatedly, not only interesting for the first week." },
        { title: "Operations", text: "Production, packaging and delivery have to be reliable enough to support the promise." },
        { title: "Economics", text: "Price and unit economics have to make sense before paid growth or a larger launch is justified." },
      ],
    },
  },
  ua: {
    visibilityos: {
      eyebrow: "Після аудиту",
      title: "Діагностика має завершуватися рішенням, а не ще одним звітом",
      intro: "Корисна послідовність проста: довести втрату, спочатку виправити шар із найбільшим впливом, а потім перевірити той самий шлях ще раз.",
      cards: [
        { title: "Пріоритет", text: "Відокремити проблеми довіри, конверсії та видимості від косметичних змін, які можуть зачекати." },
        { title: "Впровадження", text: "Перетворити докази на короткий список дій для вашої команди або на відповідну Growth System." },
        { title: "Повторна перевірка", text: "Після змін перевірити ті самі сторінки й шляхи, щоб наступне рішення спиралося на факти." },
      ],
    },
    "warriors-team": {
      eyebrow: "Сенс мережі",
      title: "Сильне коло має цінність, коли підвищує якість рішень",
      intro: "Формат будується навколо реальної роботи, прямого контексту й корисних зв’язків, а не пасивного нетворкінгу чи мотиваційного шуму.",
      cards: [
        { title: "Реальний контекст", text: "Приносити конкретну бізнес-, тренувальну або виконавчу задачу замість абстрактних розмов." },
        { title: "Прямий фідбек", text: "Корисний фідбек має робити наступний крок яснішим, навіть коли відповідь некомфортна." },
        { title: "Релевантна мережа", text: "Знайомства мають сенс, коли є реальна причина двом людям допомогти одне одному рухатися швидше." },
      ],
    },
    drop: {
      eyebrow: "До запуску",
      title: "Продукт має пройти три перевірки, перш ніж його варто масштабувати",
      intro: "Performance залишається у валідації, доки сам режим не працює для реальних людей, а операційна модель — у реальному світі.",
      cards: [
        { title: "Повторюваність", text: "Продукт має бути достатньо простим для регулярного використання, а не лише цікавим перший тиждень." },
        { title: "Операції", text: "Виробництво, пакування та доставка мають бути достатньо надійними для обіцяного досвіду." },
        { title: "Економіка", text: "Ціна та юніт-економіка мають сходитися до платного масштабування або більшого запуску." },
      ],
    },
  },
  ru: {
    visibilityos: {
      eyebrow: "После аудита",
      title: "Диагностика должна заканчиваться решением, а не ещё одним отчётом",
      intro: "Полезная последовательность проста: доказать потерю, сначала исправить слой с самым большим влиянием, затем проверить тот же путь ещё раз.",
      cards: [
        { title: "Приоритет", text: "Отделить проблемы доверия, конверсии и видимости от косметических изменений, которые могут подождать." },
        { title: "Внедрение", text: "Превратить доказательства в короткий список действий для вашей команды или в соответствующую Growth System." },
        { title: "Повторная проверка", text: "После изменений проверить те же страницы и пути, чтобы следующее решение опиралось на факты." },
      ],
    },
    "warriors-team": {
      eyebrow: "Смысл сети",
      title: "Сильное окружение ценно, когда повышает качество решений",
      intro: "Формат строится вокруг реальной работы, прямого контекста и полезных связей, а не пассивного нетворкинга или мотивационного шума.",
      cards: [
        { title: "Реальный контекст", text: "Приносить конкретную бизнес-, тренировочную или исполнительскую задачу вместо абстрактных разговоров." },
        { title: "Прямой фидбек", text: "Полезный фидбек должен делать следующий шаг яснее, даже когда ответ не самый комфортный." },
        { title: "Релевантная сеть", text: "Знакомства имеют смысл, когда есть реальная причина двум людям помочь друг другу двигаться быстрее." },
      ],
    },
    drop: {
      eyebrow: "До запуска",
      title: "Продукт должен пройти три проверки, прежде чем его стоит масштабировать",
      intro: "Performance остаётся в валидации, пока сам режим не работает для реальных людей, а операционная модель — в реальном мире.",
      cards: [
        { title: "Повторяемость", text: "Продукт должен быть достаточно простым для регулярного использования, а не только интересным первую неделю." },
        { title: "Операции", text: "Производство, упаковка и доставка должны быть достаточно надёжными для обещанного опыта." },
        { title: "Экономика", text: "Цена и юнит-экономика должны сходиться до платного масштабирования или большого запуска." },
      ],
    },
  },
};

const STYLE: Record<DepthRoute, { eyebrow: string; glow: string; border: string; number: string }> = {
  visibilityos: { eyebrow: "text-sky-200/70", glow: "bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,.065),transparent_62%)]", border: "hover:border-sky-300/18", number: "text-sky-200/45" },
  "warriors-team": { eyebrow: "text-violet-200/70", glow: "bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,.065),transparent_62%)]", border: "hover:border-violet-300/18", number: "text-violet-200/45" },
  drop: { eyebrow: "text-emerald-200/70", glow: "bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,.06),transparent_62%)]", border: "hover:border-emerald-300/18", number: "text-emerald-200/45" },
};

function routeFromPath(pathname: string): DepthRoute | null {
  if (pathname === "/visibilityos" || pathname.endsWith("/visibilityos")) return "visibilityos";
  if (pathname === "/warriors-team" || pathname.endsWith("/warriors-team")) return "warriors-team";
  if (pathname === "/drop" || pathname.endsWith("/drop")) return "drop";
  return null;
}

export function PageDepthSection() {
  const { lang } = useI18n();
  const pathname = usePathname() || "/";
  const route = routeFromPath(pathname);
  if (!route) return null;

  const x = COPY[lang][route];
  const style = STYLE[route];

  return (
    <section className="relative overflow-hidden border-t border-white/[.06] bg-[#020202] py-20 md:py-24">
      <div className={`pointer-events-none absolute inset-0 ${style.glow}`} aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className={`text-[10px] font-semibold uppercase tracking-[.24em] ${style.eyebrow}`}>{x.eyebrow}</span>
          <h2 className="section-title mx-auto mt-4 max-w-4xl text-[clamp(2.3rem,4vw,3.8rem)] text-zinc-100">{x.title}</h2>
          <p className="section-lead mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base sm:leading-8">{x.intro}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {x.cards.map((card, index) => (
            <div key={card.title} className={`rounded-[24px] border border-white/[.08] bg-white/[.018] p-6 transition-colors ${style.border}`}>
              <span className={`text-[10px] font-semibold tracking-[.16em] ${style.number}`}>0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-zinc-100">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-500">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
