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
      eyebrow: "What compounds",
      title: "Training becomes valuable when it turns into repeatable capability",
      intro: "Warriors is designed to move members from information to implementation: learn the next move, build it on a real project, get feedback and keep the proof.",
      cards: [
        { title: "Skill", text: "Build practical capability in AI systems, client acquisition, content and business operations instead of collecting disconnected theory." },
        { title: "Execution", text: "Every track pushes toward a real artifact, conversation, workflow, published asset or measurable business change." },
        { title: "Network", text: "Use live reviews and the private community to unblock work, compare experience and move faster with relevant people around you." },
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
      eyebrow: "Що накопичується",
      title: "Навчання стає цінним, коли перетворюється на повторювану здатність",
      intro: "Warriors переводить від інформації до implementation: вивчити наступний крок, реалізувати його на реальному проєкті, отримати feedback і зберегти proof.",
      cards: [
        { title: "Skill", text: "Будувати практичні навички в AI systems, client acquisition, content і business operations замість накопичення розрізненої теорії." },
        { title: "Execution", text: "Кожен track веде до реального artifact, conversation, workflow, published asset або measurable business change." },
        { title: "Network", text: "Використовувати live reviews і private community, щоб розблоковувати роботу, порівнювати досвід і рухатись швидше з релевантними людьми поруч." },
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
      eyebrow: "Что накапливается",
      title: "Обучение становится ценным, когда превращается в повторяемый навык",
      intro: "Warriors переводит от информации к implementation: изучить следующий шаг, реализовать его на реальном проекте, получить feedback и сохранить proof.",
      cards: [
        { title: "Skill", text: "Строить практические навыки в AI systems, client acquisition, content и business operations вместо накопления разрозненной теории." },
        { title: "Execution", text: "Каждый track ведёт к реальному artifact, conversation, workflow, published asset или measurable business change." },
        { title: "Network", text: "Использовать live reviews и private community, чтобы разблокировать работу, сравнивать опыт и двигаться быстрее с релевантными людьми рядом." },
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
