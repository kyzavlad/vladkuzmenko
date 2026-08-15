"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Dumbbell,
  Layers,
  PlayCircle,
  ScanSearch,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { langHref, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type PathKey = "business" | "visibility" | "warriors" | "performance" | "media";

type PathCopy = {
  label: string;
  title: string;
  text: string;
  tags: string[];
  cta: string;
};

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  paths: Record<PathKey, PathCopy>;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "CHOOSE YOUR PATH",
    titleA: "Five directions. ",
    titleB: "One place to start.",
    desc:
      "Choose what is relevant to you now: business growth, website visibility, a stronger circle, performance products or media.",
    paths: {
      business: {
        label: "FOR BUSINESS",
        title: "Client Growth Systems",
        text: "Increase qualified attention, stop losing enquiries and automate the next step around the real business bottleneck.",
        tags: ["Traffic", "Conversion", "Automation"],
        cta: "Start with the business problem",
      },
      visibility: {
        label: "SOFTWARE",
        title: "VisibilityOS",
        text: "See where a website loses conversion, trust and visibility across search and AI answers, then know what to fix first.",
        tags: ["Conversion", "SEO", "AI visibility"],
        cta: "Open VisibilityOS",
      },
      warriors: {
        label: "PRIVATE NETWORK",
        title: "Warriors Team",
        text: "A selective circle for people already building, training and willing to execute, contribute and accept direct feedback.",
        tags: ["Business", "Training", "Network"],
        cta: "Explore Warriors Team",
      },
      performance: {
        label: "PERFORMANCE",
        title: "Performance products",
        text: "Practical products for training days and demanding schedules. The first direction is a structured meal-set line.",
        tags: ["Meal sets", "Training", "Routine"],
        cta: "See the first direction",
      },
      media: {
        label: "PERSONAL BRAND",
        title: "Vlad Kuzmenko Media",
        text: "Projects, business, training, cars and ideas across YouTube, Instagram, TikTok, X and Telegram.",
        tags: ["YouTube", "TikTok", "Telegram"],
        cta: "Open media",
      },
    },
  },
  ua: {
    eyebrow: "ОБЕРІТЬ НАПРЯМ",
    titleA: "П’ять напрямів. ",
    titleB: "Одна точка входу.",
    desc:
      "Оберіть те, що актуально для вас зараз: ріст бізнесу, видимість сайту, сильніше оточення, performance-продукти або медіа.",
    paths: {
      business: {
        label: "ДЛЯ БІЗНЕСУ",
        title: "Client Growth Systems",
        text: "Збільшуємо якісну увагу, не даємо зверненням губитися й автоматизуємо наступний крок навколо реального вузького місця бізнесу.",
        tags: ["Traffic", "Conversion", "Automation"],
        cta: "Почати з бізнес-проблеми",
      },
      visibility: {
        label: "СОФТ",
        title: "VisibilityOS",
        text: "Показує, де сайт втрачає конверсію, довіру та видимість у пошуку й AI-відповідях, і що виправляти насамперед.",
        tags: ["Конверсія", "SEO", "AI-видимість"],
        cta: "Відкрити VisibilityOS",
      },
      warriors: {
        label: "ПРИВАТНА МЕРЕЖА",
        title: "Warriors Team",
        text: "Вибіркове коло для тих, хто вже будує, тренується, готовий виконувати, робити внесок і приймати прямий фідбек.",
        tags: ["Бізнес", "Тренування", "Нетворк"],
        cta: "Відкрити Warriors Team",
      },
      performance: {
        label: "PERFORMANCE",
        title: "Performance-продукти",
        text: "Практичні продукти для тренувальних днів і щільного графіка. Перший напрям — структуровані набори готового харчування.",
        tags: ["Набори їжі", "Тренування", "Режим"],
        cta: "Подивитися перший напрям",
      },
      media: {
        label: "ОСОБИСТИЙ БРЕНД",
        title: "Vlad Kuzmenko Media",
        text: "Проєкти, бізнес, тренування, авто та ідеї в YouTube, Instagram, TikTok, X і Telegram.",
        tags: ["YouTube", "TikTok", "Telegram"],
        cta: "Відкрити медіа",
      },
    },
  },
  ru: {
    eyebrow: "ВЫБЕРИТЕ НАПРАВЛЕНИЕ",
    titleA: "Пять направлений. ",
    titleB: "Одна точка входа.",
    desc:
      "Выберите то, что актуально для вас сейчас: рост бизнеса, видимость сайта, сильнее окружение, performance-продукты или медиа.",
    paths: {
      business: {
        label: "ДЛЯ БИЗНЕСА",
        title: "Client Growth Systems",
        text: "Увеличиваем качественное внимание, не даём заявкам теряться и автоматизируем следующий шаг вокруг реального узкого места бизнеса.",
        tags: ["Traffic", "Conversion", "Automation"],
        cta: "Начать с бизнес-проблемы",
      },
      visibility: {
        label: "СОФТ",
        title: "VisibilityOS",
        text: "Показывает, где сайт теряет конверсию, доверие и видимость в поиске и AI-ответах, и что исправлять в первую очередь.",
        tags: ["Конверсия", "SEO", "AI-видимость"],
        cta: "Открыть VisibilityOS",
      },
      warriors: {
        label: "ЗАКРЫТАЯ СЕТЬ",
        title: "Warriors Team",
        text: "Отборное окружение для тех, кто уже строит, тренируется, готов исполнять, вносить вклад и принимать прямой фидбек.",
        tags: ["Бизнес", "Тренировки", "Нетворк"],
        cta: "Открыть Warriors Team",
      },
      performance: {
        label: "PERFORMANCE",
        title: "Performance-продукты",
        text: "Практичные продукты для тренировочных дней и плотного графика. Первое направление — структурированные наборы готового питания.",
        tags: ["Наборы еды", "Тренировки", "Режим"],
        cta: "Посмотреть первое направление",
      },
      media: {
        label: "ЛИЧНЫЙ БРЕНД",
        title: "Vlad Kuzmenko Media",
        text: "Проекты, бизнес, тренировки, машины и идеи в YouTube, Instagram, TikTok, X и Telegram.",
        tags: ["YouTube", "TikTok", "Telegram"],
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

const STYLE: Record<PathKey, string> = {
  business:
    "lg:col-span-4 border-amber-300/25 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.13),transparent_44%),#090909] hover:border-amber-300/40",
  visibility:
    "lg:col-span-2 border-sky-300/15 bg-[radial-gradient(circle_at_82%_0%,rgba(125,211,252,.08),transparent_46%),#080808] hover:border-sky-300/30",
  warriors:
    "lg:col-span-2 border-violet-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(196,181,253,.075),transparent_46%),#080808] hover:border-violet-300/30",
  performance:
    "lg:col-span-2 border-emerald-300/15 bg-[radial-gradient(circle_at_80%_0%,rgba(110,231,183,.065),transparent_46%),#080808] hover:border-emerald-300/30",
  media:
    "lg:col-span-2 border-rose-300/15 bg-[radial-gradient(circle_at_50%_0%,rgba(253,164,175,.055),transparent_46%),#080808] hover:border-rose-300/25",
};

export function EcosystemNavigator() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  const href: Record<PathKey, string> = {
    business: "#client-systems",
    visibility: `${prefix}/visibilityos`,
    warriors: "#warriors",
    performance: "#drop",
    media: "#content",
  };

  return (
    <section
      id="ecosystem"
      className="section-accent relative scroll-mt-24 border-t border-zinc-900 bg-black py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(ellipse_at_top,rgba(245,190,52,.075),transparent_65%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-black tracking-[-.035em] sm:text-4xl md:text-5xl">
            {x.titleA}
            <span className="gradient-gold-text">{x.titleB}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg">
            {x.desc}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-6">
          {ORDER.map((key, i) => {
            const item = x.paths[key];
            const Icon = ICONS[key];
            return (
              <motion.a
                key={key}
                href={href[key]}
                onClick={() => track("ecosystem_path_open", { direction: key })}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.045 }}
                className={cn(
                  "group relative flex min-h-[290px] flex-col overflow-hidden rounded-[26px] border p-6 transition duration-300 sm:p-8",
                  STYLE[key],
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04] text-amber-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-amber-300/65">
                  {item.label}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-[-.03em] sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                  {item.text}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/[.07] pt-5 text-sm font-semibold text-amber-300">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
