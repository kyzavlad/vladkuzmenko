"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Dumbbell, Layers, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { InteractiveSurface, SignalFlow } from "@/components/ui/premium-interaction";
import { track } from "@/lib/analytics";
import { langHref } from "@/lib/i18n";
import {
  DIRECTION_ACCENT,
  DIRECTION_ORDER,
  getDirectionCopy,
  type DirectionAccent,
  type DirectionKey,
} from "@/lib/directions";

const ICONS: Record<DirectionKey, LucideIcon> = {
  business: Layers,
  visibility: ScanSearch,
  warriors: Shield,
  performance: Dumbbell,
};

const TONE: Record<DirectionAccent, {
  label: string;
  icon: string;
  line: string;
  cta: string;
  halo: string;
}> = {
  gold: {
    label: "text-amber-200",
    icon: "border-amber-300/25 bg-amber-300/[.07] text-amber-200",
    line: "from-amber-300/70",
    cta: "text-amber-300 hover:text-amber-200",
    halo: "rgba(232,197,71,.10)",
  },
  blue: {
    label: "text-sky-200",
    icon: "border-sky-300/25 bg-sky-300/[.06] text-sky-200",
    line: "from-sky-300/65",
    cta: "text-sky-200 hover:text-sky-100",
    halo: "rgba(125,211,252,.09)",
  },
  violet: {
    label: "text-violet-200",
    icon: "border-violet-300/25 bg-violet-300/[.06] text-violet-200",
    line: "from-violet-300/65",
    cta: "text-violet-200 hover:text-violet-100",
    halo: "rgba(196,181,253,.09)",
  },
  green: {
    label: "text-emerald-200",
    icon: "border-emerald-300/25 bg-emerald-300/[.06] text-emerald-200",
    line: "from-emerald-300/65",
    cta: "text-emerald-200 hover:text-emerald-100",
    halo: "rgba(110,231,183,.08)",
  },
};

const VISUAL_LABELS: Record<DirectionKey, Record<string, string[]>> = {
  business: {
    en: ["Attention", "Enquiry", "Sale"],
    ua: ["Увага", "Звернення", "Продаж"],
    ru: ["Внимание", "Обращение", "Продажа"],
  },
  visibility: {
    en: ["Conversion", "Trust", "Search", "AI answers"],
    ua: ["Конверсія", "Довіра", "Пошук", "AI-відповіді"],
    ru: ["Конверсия", "Доверие", "Поиск", "AI-ответы"],
  },
  warriors: { en: [], ua: [], ru: [] },
  performance: {
    en: ["Morning", "Training", "Meal", "Evening"],
    ua: ["Ранок", "Тренування", "Їжа", "Вечір"],
    ru: ["Утро", "Тренировка", "Еда", "Вечер"],
  },
};

function DirectionVisual({
  type,
  labels,
  accent,
}: {
  type: DirectionKey;
  labels: string[];
  accent: DirectionAccent;
}) {
  const reduced = useReducedMotion();

  if (type === "business") {
    return (
      <div className="relative flex min-h-[220px] items-center overflow-hidden rounded-[24px] border border-amber-300/10 bg-black/40 px-5 sm:px-7">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_16%,transparent_78%)]"
        />
        <div className="relative w-full overflow-x-auto py-6">
          <SignalFlow nodes={labels} accent={accent} compact />
        </div>
      </div>
    );
  }

  if (type === "visibility") {
    return (
      <div className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-sky-300/10 bg-black/40 p-6 sm:p-7">
        {!reduced && (
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 150, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-sky-300/80 to-transparent shadow-[0_0_22px_rgba(125,211,252,.45)]"
          />
        )}
        <div className="relative space-y-5 pt-3">
          {labels.map((label, row) => (
            <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-500">{label}</span>
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-sky-300"
                    animate={
                      reduced
                        ? { opacity: .45 }
                        : { opacity: [.16, .95, .16], scale: [.9, 1.18, .9] }
                    }
                    transition={
                      reduced
                        ? { duration: .2 }
                        : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: row * .17 + dot * .09 }
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "warriors") {
    return (
      <div className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-violet-300/10 bg-black/40">
        <svg viewBox="0 0 520 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[
            [65, 115, 190, 48], [65, 115, 190, 182], [190, 48, 325, 115],
            [190, 182, 325, 115], [190, 48, 190, 182], [325, 115, 445, 60],
            [325, 115, 445, 170], [445, 60, 445, 170],
          ].map((line, index) => (
            <motion.line
              key={index}
              x1={line[0]}
              y1={line[1]}
              x2={line[2]}
              y2={line[3]}
              stroke="rgba(196,181,253,.22)"
              strokeWidth="1"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: .75, delay: index * .05 }}
            />
          ))}
          {[[65,115],[190,48],[190,182],[325,115],[445,60],[445,170]].map((point, index) => (
            <motion.circle
              key={index}
              cx={point[0]}
              cy={point[1]}
              r={index === 0 ? 8 : 5.5}
              fill={index === 0 ? "rgba(232,197,71,.95)" : "rgba(196,181,253,.88)"}
              initial={reduced ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: .15 + index * .06 }}
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="grid min-h-[220px] grid-cols-2 gap-2 rounded-[24px] border border-emerald-300/10 bg-black/40 p-4 sm:grid-cols-4">
      {labels.map((label, index) => (
        <motion.div
          key={label}
          whileHover={reduced ? undefined : { y: -4 }}
          className="relative flex min-h-[90px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-emerald-300/10 bg-emerald-300/[.03] px-2 text-center"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              index < 3
                ? "bg-emerald-300/80 shadow-[0_0_14px_rgba(110,231,183,.4)]"
                : "bg-white/15"
            }`}
          />
          <span className="text-[9px] font-bold uppercase tracking-[.07em] text-zinc-500">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function EcosystemNavigator() {
  const { lang } = useI18n();
  const x = getDirectionCopy(lang);
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  const href: Record<DirectionKey, string> = {
    business: "#client-systems",
    visibility: `${prefix}/visibilityos`,
    warriors: `${prefix}/warriors-team`,
    performance: `${prefix}/drop`,
  };

  return (
    <section
      id="ecosystem"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#020202] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[520px] w-[92%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.085),transparent_64%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(760px,76vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent shadow-[0_0_28px_rgba(212,175,55,.14)]" />
        <div className="absolute bottom-0 left-1/2 top-44 hidden w-px -translate-x-[590px] bg-gradient-to-b from-amber-300/0 via-amber-300/[.09] to-transparent xl:block" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-4xl text-center md:mb-16"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/70">{x.eyebrow}</span>
          <h2 className="section-title mt-4 text-[clamp(2.7rem,5vw,4.7rem)] text-zinc-100">
            {x.titleA}
            <em className="gradient-gold-text font-normal italic">{x.titleB}</em>
          </h2>
          <p className="section-lead mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
            {x.desc}
          </p>
        </motion.div>

        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:gap-6">
          {DIRECTION_ORDER.map((key, index) => {
            const item = x.items[key];
            const Icon = ICONS[key];
            const accent = DIRECTION_ACCENT[key];
            const tone = TONE[accent];
            const labels = VISUAL_LABELS[key][lang] ?? [];

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: .6, ease: [0.16, 1, 0.3, 1] }}
              >
                <InteractiveSurface
                  accent={accent}
                  className="group relative overflow-hidden rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012)_50%,rgba(0,0,0,.32))] shadow-[0_38px_110px_-64px_rgba(0,0,0,.95)]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full blur-[85px] transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${tone.halo}, transparent 68%)` }}
                  />

                  <div className="grid min-h-[330px] lg:grid-cols-[1.04fr_.96fr]">
                    <div className="relative flex flex-col justify-center p-7 sm:p-9 lg:p-11">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${tone.icon}`}>
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                          <span className={`text-[10px] font-semibold uppercase tracking-[.18em] ${tone.label}`}>{item.label}</span>
                        </div>
                        <span className="font-display text-2xl italic text-white/[.13]">{String(index + 1).padStart(2, "0")}</span>
                      </div>

                      <h3 className="mt-7 text-3xl font-semibold tracking-[-.035em] text-white sm:text-[36px]">{item.title}</h3>
                      <div className={`mt-4 h-px w-20 bg-gradient-to-r to-transparent ${tone.line}`} />

                      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.17em] text-zinc-600">{x.outcomeLabel}</p>
                      <p className="mt-2 max-w-xl text-lg font-medium leading-8 text-zinc-100">{item.outcome}</p>
                      <p className="section-lead mt-3 max-w-xl text-sm leading-7 text-zinc-500">{item.text}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-300">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={href[key]}
                        onClick={() => track("ecosystem_direction_open", { direction: key })}
                        className={`mt-7 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold transition-colors ${tone.cta}`}
                      >
                        {item.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="flex items-center border-t border-white/[.07] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                      <div className="w-full">
                        <DirectionVisual type={key} labels={labels} accent={accent} />
                      </div>
                    </div>
                  </div>
                </InteractiveSurface>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
