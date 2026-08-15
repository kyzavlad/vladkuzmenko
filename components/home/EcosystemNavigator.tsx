"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Dumbbell, Layers, PlayCircle, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { InteractiveSurface, SignalFlow } from "@/components/ui/premium-interaction";
import { track } from "@/lib/analytics";
import { langHref, type Lang } from "@/lib/i18n";

type PathKey = "business" | "visibility" | "warriors" | "performance" | "media";
type Accent = "gold" | "blue" | "violet" | "green" | "rose";

type PathCopy = {
  label: string;
  title: string;
  /** The single result a visitor gets from this direction. */
  outcome: string;
  text: string;
  tags: string[];
  cta: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  desc: string;
  outcomeLabel: string;
  paths: Record<PathKey, PathCopy>;
  visuals: Record<PathKey, string[]>;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Where to start",
    title: "Start with what you need now.",
    desc: "Every direction below solves a different problem and ends in one clear next step. Pick the result you want next.",
    outcomeLabel: "What you get",
    paths: {
      business: {
        label: "For business",
        title: "Client Growth Systems",
        outcome: "More qualified attention, enquiries, meetings and sales.",
        text: "Find the bottleneck between attention, enquiry and sale, then build the smallest system that changes the commercial result.",
        tags: ["Traffic", "Conversion", "Automation", "Sales"],
        cta: "Open Growth Systems",
      },
      visibility: {
        label: "Software",
        title: "VisibilityOS",
        outcome: "Know where your website loses conversion, trust and visibility — and what to fix first.",
        text: "A read on the pages that carry your revenue: what stops an enquiry, what breaks trust, and how you appear in search and AI answers.",
        tags: ["Conversion", "Trust", "Search", "AI visibility"],
        cta: "Open VisibilityOS",
      },
      warriors: {
        label: "Private network",
        title: "Warriors Team",
        outcome: "A stronger circle, direct feedback and a higher execution standard.",
        text: "A selective network for people already building — peers who tell you the truth, useful introductions and a standard that pulls your work up.",
        tags: ["Business", "Training", "Feedback", "Network"],
        cta: "Explore Warriors Team",
      },
      performance: {
        label: "Performance",
        title: "Performance products",
        outcome: "Nutrition, training days and daily routine made easier to keep.",
        text: "Practical products for people who train and want less friction around food, recovery and everyday discipline.",
        tags: ["Meal sets", "Training days", "Routine", "Essentials"],
        cta: "See Performance",
      },
      media: {
        label: "Media",
        title: "Vlad Kuzmenko Media",
        outcome: "Follow the projects, the business, training, cars and the thinking behind them.",
        text: "The content layer around the work — what is being built, what worked, what did not, across YouTube and social platforms.",
        tags: ["YouTube", "Instagram", "TikTok", "Telegram"],
        cta: "Open media",
      },
    },
    visuals: {
      business: ["Attention", "Enquiry", "Sale"],
      visibility: ["Conversion", "Trust", "Speed", "AI visibility"],
      warriors: [],
      performance: ["Morning", "Training", "Meal", "Evening"],
      media: [],
    },
  },
  ua: {
    eyebrow: "З чого почати",
    title: "Почніть із того, що потрібно вам зараз.",
    desc: "Кожен напрям нижче вирішує іншу задачу і веде до одного зрозумілого наступного кроку. Оберіть результат, який потрібен вам наступним.",
    outcomeLabel: "Що ви отримуєте",
    paths: {
      business: {
        label: "Для бізнесу",
        title: "Client Growth Systems",
        outcome: "Більше якісної уваги, звернень, зустрічей і продажів.",
        text: "Знайти вузьке місце між увагою, зверненням і продажем та зібрати найменшу систему, яка змінює комерційний результат.",
        tags: ["Traffic", "Conversion", "Automation", "Sales"],
        cta: "Відкрити Growth Systems",
      },
      visibility: {
        label: "Софт",
        title: "VisibilityOS",
        outcome: "Зрозуміти, де сайт втрачає конверсію, довіру та видимість — і що виправляти першим.",
        text: "Погляд на сторінки, які приносять гроші: що зупиняє звернення, що ламає довіру і як вас видно в пошуку та AI-відповідях.",
        tags: ["Конверсія", "Довіра", "Пошук", "AI-видимість"],
        cta: "Відкрити VisibilityOS",
      },
      warriors: {
        label: "Приватна мережа",
        title: "Warriors Team",
        outcome: "Сильніше оточення, прямий фідбек і вищий стандарт виконання.",
        text: "Вибіркова мережа для тих, хто вже будує: люди, які кажуть правду, корисні знайомства і планка, яка підтягує вашу роботу.",
        tags: ["Бізнес", "Тренування", "Фідбек", "Нетворк"],
        cta: "Відкрити Warriors Team",
      },
      performance: {
        label: "Performance",
        title: "Performance-продукти",
        outcome: "Харчування, тренувальні дні та щоденний режим, які легше витримувати.",
        text: "Практичні продукти для тих, хто тренується і хоче менше тертя навколо їжі, відновлення та щоденної дисципліни.",
        tags: ["Набори їжі", "Тренувальні дні", "Режим", "Essentials"],
        cta: "Відкрити Performance",
      },
      media: {
        label: "Медіа",
        title: "Vlad Kuzmenko Media",
        outcome: "Стежити за проєктами, бізнесом, тренуваннями, авто та ідеями за ними.",
        text: "Контентний шар навколо роботи — що будується, що спрацювало, а що ні, у YouTube і соціальних платформах.",
        tags: ["YouTube", "Instagram", "TikTok", "Telegram"],
        cta: "Відкрити медіа",
      },
    },
    visuals: {
      business: ["Увага", "Звернення", "Продаж"],
      visibility: ["Конверсія", "Довіра", "Швидкість", "AI-видимість"],
      warriors: [],
      performance: ["Ранок", "Тренування", "Їжа", "Вечір"],
      media: [],
    },
  },
  ru: {
    eyebrow: "С чего начать",
    title: "Начните с того, что нужно вам сейчас.",
    desc: "Каждое направление ниже решает свою задачу и ведёт к одному понятному следующему шагу. Выберите результат, который нужен вам следующим.",
    outcomeLabel: "Что вы получаете",
    paths: {
      business: {
        label: "Для бизнеса",
        title: "Client Growth Systems",
        outcome: "Больше качественного внимания, обращений, встреч и продаж.",
        text: "Найти узкое место между вниманием, обращением и продажей и собрать минимальную систему, которая меняет коммерческий результат.",
        tags: ["Traffic", "Conversion", "Automation", "Sales"],
        cta: "Открыть Growth Systems",
      },
      visibility: {
        label: "Софт",
        title: "VisibilityOS",
        outcome: "Понять, где сайт теряет конверсию, доверие и видимость — и что исправлять первым.",
        text: "Взгляд на страницы, которые приносят деньги: что останавливает заявку, что ломает доверие и как вас видно в поиске и AI-ответах.",
        tags: ["Конверсия", "Доверие", "Скорость", "AI-видимость"],
        cta: "Открыть VisibilityOS",
      },
      warriors: {
        label: "Закрытая сеть",
        title: "Warriors Team",
        outcome: "Сильное окружение, прямой фидбек и более высокий стандарт исполнения.",
        text: "Отборная сеть для тех, кто уже строит: люди, которые говорят правду, полезные знакомства и планка, которая подтягивает вашу работу.",
        tags: ["Бизнес", "Тренировки", "Фидбек", "Нетворк"],
        cta: "Открыть Warriors Team",
      },
      performance: {
        label: "Performance",
        title: "Performance-продукты",
        outcome: "Питание, тренировочные дни и ежедневный режим, которые легче выдерживать.",
        text: "Практичные продукты для тех, кто тренируется и хочет меньше трения вокруг еды, восстановления и ежедневной дисциплины.",
        tags: ["Наборы еды", "Тренировочные дни", "Режим", "Essentials"],
        cta: "Открыть Performance",
      },
      media: {
        label: "Медиа",
        title: "Vlad Kuzmenko Media",
        outcome: "Следить за проектами, бизнесом, тренировками, машинами и идеями за ними.",
        text: "Контентный слой вокруг работы — что строится, что сработало, а что нет, в YouTube и социальных платформах.",
        tags: ["YouTube", "Instagram", "TikTok", "Telegram"],
        cta: "Открыть медиа",
      },
    },
    visuals: {
      business: ["Внимание", "Обращение", "Продажа"],
      visibility: ["Конверсия", "Доверие", "Скорость", "AI-видимость"],
      warriors: [],
      performance: ["Утро", "Тренировка", "Еда", "Вечер"],
      media: [],
    },
  },
};

const ORDER: PathKey[] = ["business", "visibility", "warriors", "performance", "media"];

const ICONS: Record<PathKey, LucideIcon> = {
  business: Layers,
  visibility: ScanSearch,
  warriors: Shield,
  performance: Dumbbell,
  media: PlayCircle,
};

const ACCENTS: Record<PathKey, Accent> = {
  business: "gold",
  visibility: "blue",
  warriors: "violet",
  performance: "green",
  media: "rose",
};

/** Every direction gets the same structure — only the accent changes. */
const TONE: Record<Accent, { label: string; icon: string; hover: string; cta: string }> = {
  gold: {
    label: "text-amber-300/80",
    icon: "border-amber-300/20 text-amber-200",
    hover: "hover:border-amber-300/25",
    cta: "text-amber-300 hover:text-amber-200",
  },
  blue: {
    label: "text-sky-200/80",
    icon: "border-sky-300/20 text-sky-200",
    hover: "hover:border-sky-300/25",
    cta: "text-sky-200 hover:text-sky-100",
  },
  violet: {
    label: "text-violet-200/80",
    icon: "border-violet-300/20 text-violet-200",
    hover: "hover:border-violet-300/25",
    cta: "text-violet-200 hover:text-violet-100",
  },
  green: {
    label: "text-emerald-200/80",
    icon: "border-emerald-300/20 text-emerald-200",
    hover: "hover:border-emerald-300/25",
    cta: "text-emerald-200 hover:text-emerald-100",
  },
  rose: {
    label: "text-rose-200/80",
    icon: "border-rose-300/20 text-rose-200",
    hover: "hover:border-rose-300/25",
    cta: "text-rose-200 hover:text-rose-100",
  },
};

/**
 * Conceptual interface visuals. They illustrate how each direction works —
 * none of them represent measured business data.
 */
function DirectionVisual({ path, labels }: { path: PathKey; labels: string[] }) {
  const reduced = useReducedMotion();

  if (path === "business") {
    return (
      <div className="relative flex h-52 items-center overflow-hidden rounded-[24px] border border-amber-300/10 bg-black/35 px-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]"
        />
        <div className="relative w-full overflow-x-auto py-6">
          <SignalFlow nodes={labels} accent="gold" compact />
        </div>
      </div>
    );
  }

  if (path === "visibility") {
    return (
      <div className="relative h-52 overflow-hidden rounded-[24px] border border-sky-300/10 bg-black/35 p-6">
        {!reduced && (
          <motion.div
            animate={{ y: [0, 130, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-sky-300/80 to-transparent shadow-[0_0_18px_rgba(125,211,252,.48)]"
          />
        )}
        <div className="space-y-5 pt-4">
          {labels.map((label, i) => (
            <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-3">
              <span className="truncate text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-500">
                {label}
              </span>
              {/* A scan pass across each area — no scores, no measured values. */}
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={reduced ? undefined : { opacity: [.16, .9, .16] }}
                    transition={
                      reduced
                        ? undefined
                        : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * .18 + dot * .1 }
                    }
                    className="h-1.5 w-1.5 rounded-full bg-sky-300 opacity-50"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (path === "warriors") {
    return (
      <div className="relative h-52 overflow-hidden rounded-[24px] border border-violet-300/10 bg-black/35">
        <svg viewBox="0 0 420 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[[70,105,180,48],[70,105,180,162],[180,48,310,105],[180,162,310,105],[180,48,180,162],[310,105,370,55],[310,105,370,155]].map((line, i) => (
            <motion.line
              key={i}
              x1={line[0]}
              y1={line[1]}
              x2={line[2]}
              y2={line[3]}
              stroke="rgba(196,181,253,.24)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: .75, delay: i * .06 }}
            />
          ))}
          {[[70,105],[180,48],[180,162],[310,105],[370,55],[370,155]].map((point, i) => (
            <motion.circle
              key={i}
              cx={point[0]}
              cy={point[1]}
              r={i === 0 ? 9 : 6}
              fill="rgba(196,181,253,.88)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: .18 + i * .07 }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (path === "performance") {
    return (
      <div className="grid h-52 grid-cols-4 gap-2 rounded-[24px] border border-emerald-300/10 bg-black/35 p-4 sm:gap-3 sm:p-5">
        {labels.map((label, i) => (
          <motion.div
            key={label}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-300/10 bg-emerald-300/[.035] px-1 text-center"
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${i < 3 ? "bg-emerald-300/75 shadow-[0_0_12px_rgba(110,231,183,.4)]" : "bg-white/15"}`} />
            <span className="text-[9px] font-bold uppercase leading-3 tracking-[.08em] text-zinc-500">{label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-52 items-center gap-1.5 rounded-[24px] border border-rose-300/10 bg-black/35 px-6" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          style={reduced ? { height: 28 + ((i * 9) % 46) } : undefined}
          animate={reduced ? undefined : { height: [12 + (i % 4) * 4, 45 + ((i * 9) % 70), 12 + (i % 4) * 4] }}
          transition={reduced ? undefined : { duration: 1.7, repeat: Infinity, delay: i * .04, ease: "easeInOut" }}
          className="w-1 flex-1 rounded-full bg-gradient-to-t from-rose-300/15 to-rose-300/75"
        />
      ))}
    </div>
  );
}

export function EcosystemNavigator() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  const href: Record<PathKey, string> = {
    business: "#client-systems",
    visibility: `${prefix}/visibilityos`,
    warriors: `${prefix}/warriors-team`,
    performance: `${prefix}/drop`,
    media: "#content",
  };

  return (
    <section id="ecosystem" className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-black py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[88%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(245,190,52,.075),transparent_64%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl md:text-6xl">{x.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">{x.desc}</p>
        </motion.div>

        {/* Every direction is one full-width row with identical structure and weight. */}
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
          {ORDER.map((key, index) => {
            const item = x.paths[key];
            const Icon = ICONS[key];
            const accent = ACCENTS[key];
            const tone = TONE[accent];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: .55, delay: Math.min(index, 2) * .06, ease: [0.16, 1, 0.3, 1] }}
              >
                <InteractiveSurface
                  accent={accent}
                  className={`rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012))] shadow-[0_40px_100px_-45px_rgba(0,0,0,.95)] transition-colors ${tone.hover}`}
                >
                  <div className="grid lg:grid-cols-[1.08fr_.92fr]">
                    <div className="min-w-0 border-b border-white/[.07] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                      <div className="flex items-center justify-between gap-4">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-black/30 ${tone.icon}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-[10px] font-bold tracking-[.2em] text-zinc-700">
                          0{index + 1}
                        </span>
                      </div>

                      <p className={`mt-6 text-[10px] font-bold uppercase tracking-[.2em] ${tone.label}`}>
                        {item.label}
                      </p>
                      <h3 className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">
                        {item.title}
                      </h3>

                      <p className="mt-5 text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                        {x.outcomeLabel}
                      </p>
                      <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-zinc-100 sm:text-lg sm:leading-8">
                        {item.outcome}
                      </p>

                      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">{item.text}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={href[key]}
                        onClick={() => track("ecosystem_direction_open", { direction: key })}
                        className={`mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors ${tone.cta}`}
                      >
                        {item.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
                      <DirectionVisual path={key} labels={x.visuals[key]} />
                    </div>
                  </div>
                </InteractiveSurface>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
