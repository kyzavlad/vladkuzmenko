"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  text: string;
  tags: string[];
  cta: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  desc: string;
  paths: Record<PathKey, PathCopy>;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "FIVE DIRECTIONS · ONE ECOSYSTEM",
    title: "Start with what you need now.",
    desc: "Business growth, website visibility, a stronger circle, performance products or media - choose the direction that matches the result you want next.",
    paths: {
      business: {
        label: "FOR BUSINESS",
        title: "Client Growth Systems",
        text: "Find the bottleneck between attention, enquiry and sale, then build the smallest system that changes the commercial result.",
        tags: ["Traffic", "Conversion", "Automation", "Sales"],
        cta: "Open Growth Systems",
      },
      visibility: {
        label: "SOFTWARE",
        title: "VisibilityOS",
        text: "See where a website loses enquiries, trust and visibility in search and AI answers, then know what deserves attention first.",
        tags: ["Conversion", "Trust", "SEO", "AI visibility"],
        cta: "Open VisibilityOS",
      },
      warriors: {
        label: "PRIVATE NETWORK",
        title: "Warriors Team",
        text: "A selective private network for people already building: stronger peers, direct feedback, useful connections and a higher execution standard.",
        tags: ["Business", "Training", "Feedback", "Network"],
        cta: "Explore Warriors Team",
      },
      performance: {
        label: "PERFORMANCE",
        title: "Performance products",
        text: "Practical products for people who train and want less friction around food, recovery and everyday discipline.",
        tags: ["Meal sets", "Training days", "Routine", "Essentials"],
        cta: "See Performance",
      },
      media: {
        label: "MEDIA",
        title: "Vlad Kuzmenko Media",
        text: "Projects, business, training, cars and the process behind the work across YouTube and social platforms.",
        tags: ["YouTube", "Instagram", "TikTok", "Telegram"],
        cta: "Open media",
      },
    },
  },
  ua: {
    eyebrow: "П’ЯТЬ НАПРЯМІВ · ОДНА ЕКОСИСТЕМА",
    title: "Почніть із того, що потрібно вам зараз.",
    desc: "Ріст бізнесу, видимість сайту, сильніше оточення, performance-продукти або медіа - оберіть напрям під результат, який потрібен вам наступним.",
    paths: {
      business: {
        label: "ДЛЯ БІЗНЕСУ",
        title: "Client Growth Systems",
        text: "Знайти вузьке місце між увагою, зверненням і продажем та зібрати найменшу систему, яка змінює комерційний результат.",
        tags: ["Traffic", "Conversion", "Automation", "Sales"],
        cta: "Відкрити Growth Systems",
      },
      visibility: {
        label: "СОФТ",
        title: "VisibilityOS",
        text: "Побачити, де сайт втрачає звернення, довіру та видимість у пошуку й AI-відповідях, і що виправляти першим.",
        tags: ["Конверсія", "Довіра", "SEO", "AI-видимість"],
        cta: "Відкрити VisibilityOS",
      },
      warriors: {
        label: "ПРИВАТНА МЕРЕЖА",
        title: "Warriors Team",
        text: "Вибіркова приватна мережа для тих, хто вже будує: сильніше оточення, прямий фідбек, корисні зв’язки та вищий стандарт виконання.",
        tags: ["Бізнес", "Тренування", "Фідбек", "Нетворк"],
        cta: "Відкрити Warriors Team",
      },
      performance: {
        label: "PERFORMANCE",
        title: "Performance-продукти",
        text: "Практичні продукти для тих, хто тренується і хоче менше тертя навколо харчування, відновлення та щоденної дисципліни.",
        tags: ["Набори їжі", "Тренувальні дні", "Режим", "Essentials"],
        cta: "Відкрити Performance",
      },
      media: {
        label: "МЕДІА",
        title: "Vlad Kuzmenko Media",
        text: "Проєкти, бізнес, тренування, авто та процес за кадром у YouTube і соціальних платформах.",
        tags: ["YouTube", "Instagram", "TikTok", "Telegram"],
        cta: "Відкрити медіа",
      },
    },
  },
  ru: {
    eyebrow: "ПЯТЬ НАПРАВЛЕНИЙ · ОДНА ЭКОСИСТЕМА",
    title: "Начните с того, что нужно вам сейчас.",
    desc: "Рост бизнеса, видимость сайта, сильное окружение, performance-продукты или медиа - выберите направление под результат, который нужен вам следующим.",
    paths: {
      business: {
        label: "ДЛЯ БИЗНЕСА",
        title: "Client Growth Systems",
        text: "Найти узкое место между вниманием, обращением и продажей и собрать минимальную систему, которая меняет коммерческий результат.",
        tags: ["Traffic", "Conversion", "Automation", "Sales"],
        cta: "Открыть Growth Systems",
      },
      visibility: {
        label: "СОФТ",
        title: "VisibilityOS",
        text: "Понять, где сайт теряет заявки, доверие и видимость в поиске и AI-ответах, и что исправлять первым.",
        tags: ["Конверсия", "Доверие", "SEO", "AI-видимость"],
        cta: "Открыть VisibilityOS",
      },
      warriors: {
        label: "ЗАКРЫТАЯ СЕТЬ",
        title: "Warriors Team",
        text: "Отборная закрытая сеть для тех, кто уже строит: сильное окружение, прямой фидбек, полезные связи и более высокий стандарт исполнения.",
        tags: ["Бизнес", "Тренировки", "Фидбек", "Нетворк"],
        cta: "Открыть Warriors Team",
      },
      performance: {
        label: "PERFORMANCE",
        title: "Performance-продукты",
        text: "Практичные продукты для тех, кто тренируется и хочет меньше трения вокруг питания, восстановления и ежедневной дисциплины.",
        tags: ["Наборы еды", "Тренировочные дни", "Режим", "Essentials"],
        cta: "Открыть Performance",
      },
      media: {
        label: "МЕДИА",
        title: "Vlad Kuzmenko Media",
        text: "Проекты, бизнес, тренировки, машины и процесс за кадром в YouTube и социальных платформах.",
        tags: ["YouTube", "Instagram", "TikTok", "Telegram"],
        cta: "Открыть медиа",
      },
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

function DirectionVisual({ path }: { path: PathKey }) {
  if (path === "business") {
    return <SignalFlow nodes={["Attention", "Lead", "Sale"]} accent="gold" compact />;
  }

  if (path === "visibility") {
    return (
      <div className="relative h-52 overflow-hidden rounded-[24px] border border-sky-300/10 bg-black/35 p-6">
        <motion.div
          animate={{ y: [0, 130, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-sky-300/80 to-transparent shadow-[0_0_18px_rgba(125,211,252,.48)]"
        />
        <div className="space-y-5 pt-4">
          {[84, 61, 92, 73].map((width, i) => (
            <div key={width} className="grid grid-cols-[70px_1fr_30px] items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-[.14em] text-zinc-600">0{i + 1}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: .8, delay: .15 + i * .08 }}
                  className="h-full rounded-full bg-gradient-to-r from-sky-300/75 to-sky-300/15"
                />
              </div>
              <span className="text-right text-[9px] text-zinc-600">{width}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (path === "warriors") {
    return (
      <div className="relative h-52 overflow-hidden rounded-[24px] border border-violet-300/10 bg-black/35">
        <svg viewBox="0 0 420 210" className="absolute inset-0 h-full w-full">
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
      <div className="grid h-52 grid-cols-4 gap-3 rounded-[24px] border border-emerald-300/10 bg-black/35 p-5">
        {["AM", "TRAIN", "MEAL", "PM"].map((label, i) => (
          <motion.div
            key={label}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-300/10 bg-emerald-300/[.035]"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${i < 3 ? "bg-emerald-300/75 shadow-[0_0_12px_rgba(110,231,183,.4)]" : "bg-white/15"}`} />
            <span className="mt-4 text-[9px] font-bold tracking-[.13em] text-zinc-500">{label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-52 items-center gap-1.5 rounded-[24px] border border-rose-300/10 bg-black/35 px-6">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ height: [12 + (i % 4) * 4, 45 + ((i * 9) % 70), 12 + (i % 4) * 4] }}
          transition={{ duration: 1.7, repeat: Infinity, delay: i * .04, ease: "easeInOut" }}
          className="w-1 flex-1 rounded-full bg-gradient-to-t from-rose-300/15 to-rose-300/75"
        />
      ))}
    </div>
  );
}

export function EcosystemNavigator() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const [active, setActive] = useState<PathKey>("business");
  const item = x.paths[active];
  const Icon = ICONS[active];
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

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-2 rounded-[24px] border border-white/[.08] bg-white/[.018] p-2 md:grid-cols-5">
            {ORDER.map((key, index) => {
              const TabIcon = ICONS[key];
              const selected = key === active;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive(key);
                    track("ecosystem_direction_select", { direction: key });
                  }}
                  className={`relative min-h-[92px] overflow-hidden rounded-[18px] px-3 py-3 text-left transition-colors ${
                    selected ? "bg-white/[.07]" : "hover:bg-white/[.035]"
                  }`}
                >
                  {selected && (
                    <motion.div
                      layoutId="ecosystem-active"
                      className="absolute inset-0 rounded-[18px] border border-amber-300/20"
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    />
                  )}
                  <div className="relative flex items-center justify-between gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[.08] bg-black/25 text-zinc-300">
                      <TabIcon className="h-4 w-4" />
                    </span>
                    <span className="text-[9px] font-bold tracking-[.18em] text-zinc-700">0{index + 1}</span>
                  </div>
                  <p className={`relative mt-3 text-[11px] font-bold leading-4 ${selected ? "text-white" : "text-zinc-500"}`}>
                    {x.paths[key].title}
                  </p>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: .32 }}
            >
              <InteractiveSurface
                accent={ACCENTS[active]}
                lift={false}
                className="mt-4 rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012))] shadow-[0_40px_100px_-45px_rgba(0,0,0,.95)]"
              >
                <div className="grid lg:grid-cols-[1.05fr_.95fr]">
                  <div className="border-b border-white/[.07] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[.09] bg-black/30 text-amber-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-bold tracking-[.2em] text-zinc-700">
                        0{ORDER.indexOf(active) + 1}
                      </span>
                    </div>
                    <p className="mt-7 text-[10px] font-bold uppercase tracking-[.2em] text-amber-300/70">{item.label}</p>
                    <h3 className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">{item.title}</h3>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{item.text}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={href[active]}
                      onClick={() => track("ecosystem_direction_open", { direction: active })}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-200"
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                    <div className="mb-5 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">Interactive view</p>
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.14em] text-emerald-300/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Active
                      </span>
                    </div>
                    <DirectionVisual path={active} />
                  </div>
                </div>
              </InteractiveSurface>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
