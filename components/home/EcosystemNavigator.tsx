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

/** Every card is structurally identical — only the accent changes. */
const TONE: Record<DirectionAccent, {
  badge: string;
  icon: string;
  hover: string;
  cta: string;
  rule: string;
}> = {
  gold: {
    badge: "border-amber-300/20 bg-amber-300/[.06] text-amber-200/90",
    icon: "border-amber-300/22 text-amber-200",
    hover: "hover:border-amber-300/28",
    cta: "text-amber-300 hover:text-amber-200",
    rule: "from-amber-300/45",
  },
  blue: {
    badge: "border-sky-300/20 bg-sky-300/[.06] text-sky-200/90",
    icon: "border-sky-300/22 text-sky-200",
    hover: "hover:border-sky-300/28",
    cta: "text-sky-200 hover:text-sky-100",
    rule: "from-sky-300/45",
  },
  violet: {
    badge: "border-violet-300/20 bg-violet-300/[.06] text-violet-200/90",
    icon: "border-violet-300/22 text-violet-200",
    hover: "hover:border-violet-300/28",
    cta: "text-violet-200 hover:text-violet-100",
    rule: "from-violet-300/45",
  },
  green: {
    badge: "border-emerald-300/20 bg-emerald-300/[.06] text-emerald-200/90",
    icon: "border-emerald-300/22 text-emerald-200",
    hover: "hover:border-emerald-300/28",
    cta: "text-emerald-200 hover:text-emerald-100",
    rule: "from-emerald-300/45",
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

/**
 * Conceptual interface visuals. They illustrate how each direction works —
 * none of them represent measured business data.
 */
function DirectionVisual({ path, labels }: { path: DirectionKey; labels: string[] }) {
  const reduced = useReducedMotion();

  if (path === "business") {
    return (
      <div className="relative flex h-[168px] items-center overflow-hidden rounded-2xl border border-amber-300/10 bg-black/40 px-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.028)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_76%)]"
        />
        <div className="relative w-full overflow-x-auto py-4">
          <SignalFlow nodes={labels} accent="gold" compact />
        </div>
      </div>
    );
  }

  if (path === "visibility") {
    return (
      <div className="relative h-[168px] overflow-hidden rounded-2xl border border-sky-300/10 bg-black/40 p-5">
        {!reduced && (
          <motion.div
            animate={{ y: [0, 108, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-sky-300/80 to-transparent shadow-[0_0_18px_rgba(125,211,252,.45)]"
          />
        )}
        <div className="space-y-4 pt-2">
          {labels.map((label, i) => (
            <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-3">
              <span className="truncate text-[10px] font-semibold uppercase tracking-[.13em] text-zinc-500">
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
      <div className="relative h-[168px] overflow-hidden rounded-2xl border border-violet-300/10 bg-black/40">
        <svg viewBox="0 0 420 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[[70,90,180,40],[70,90,180,140],[180,40,310,90],[180,140,310,90],[180,40,180,140],[310,90,368,46],[310,90,368,134]].map((line, i) => (
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
          {[[70,90],[180,40],[180,140],[310,90],[368,46],[368,134]].map((point, i) => (
            <motion.circle
              key={i}
              cx={point[0]}
              cy={point[1]}
              r={i === 0 ? 8 : 5.5}
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

  return (
    <div className="grid h-[168px] grid-cols-4 gap-2 rounded-2xl border border-emerald-300/10 bg-black/40 p-4">
      {labels.map((label, i) => (
        <motion.div
          key={label}
          whileHover={{ y: -4 }}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-emerald-300/10 bg-emerald-300/[.035] px-1 text-center"
        >
          <span className={`h-2 w-2 shrink-0 rounded-full ${i < 3 ? "bg-emerald-300/75 shadow-[0_0_12px_rgba(110,231,183,.4)]" : "bg-white/15"}`} />
          <span className="text-[8.5px] font-bold uppercase leading-3 tracking-[.06em] text-zinc-500">{label}</span>
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
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-black py-20 md:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(245,190,52,.07),transparent_62%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
        >
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="section-title mt-4 text-4xl text-white sm:text-5xl md:text-[56px]">
            {x.titleA}
            <span className="gradient-gold-text italic">{x.titleB}</span>
          </h2>
          <p className="section-lead mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            {x.desc}
          </p>
        </motion.div>

        {/* Four cards on one grid — identical footprint keeps them equal in status. */}
        <div className="mx-auto grid max-w-6xl gap-4 sm:gap-5 lg:grid-cols-2">
          {DIRECTION_ORDER.map((key, index) => {
            const item = x.items[key];
            const Icon = ICONS[key];
            const accent = DIRECTION_ACCENT[key];
            const tone = TONE[accent];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: .55, delay: Math.min(index, 1) * .08, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full"
              >
                <InteractiveSurface
                  accent={accent}
                  className={`flex h-full w-full flex-col rounded-[26px] border border-white/[.09] bg-[linear-gradient(155deg,rgba(255,255,255,.05),rgba(255,255,255,.012))] p-6 shadow-[0_40px_90px_-50px_rgba(0,0,0,.95)] transition-colors sm:p-7 ${tone.hover}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border bg-black/40 ${tone.icon}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[.16em] ${tone.badge}`}>
                      {item.label}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-[-.02em] text-white sm:text-[28px]">
                    {item.title}
                  </h3>
                  <div className={`mt-3 h-px w-14 bg-gradient-to-r to-transparent ${tone.rule}`} />

                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[.17em] text-zinc-600">
                    {x.outcomeLabel}
                  </p>
                  <p className="mt-2 text-base font-medium leading-7 text-zinc-100">{item.outcome}</p>

                  <p className="section-lead mt-3 text-sm leading-7 text-zinc-500">{item.text}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[.09] bg-white/[.028] px-3 py-1.5 text-[11px] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <DirectionVisual path={key} labels={VISUAL_LABELS[key][lang] ?? []} />
                  </div>

                  {/* Pushed to the bottom so all four CTAs align across the grid. */}
                  <div className="mt-auto pt-6">
                    <a
                      href={href[key]}
                      onClick={() => track("ecosystem_direction_open", { direction: key })}
                      className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors ${tone.cta}`}
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
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
