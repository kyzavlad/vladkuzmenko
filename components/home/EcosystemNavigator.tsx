"use client";

import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Layers, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { DirectionVisual } from "@/components/home/DirectionVisuals";
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
    halo: "rgba(232,197,71,.11)",
  },
  blue: {
    label: "text-sky-200",
    icon: "border-sky-300/25 bg-sky-300/[.06] text-sky-200",
    line: "from-sky-300/65",
    cta: "text-sky-200 hover:text-sky-100",
    halo: "rgba(125,211,252,.10)",
  },
  violet: {
    label: "text-violet-200",
    icon: "border-violet-300/25 bg-violet-300/[.06] text-violet-200",
    line: "from-violet-300/65",
    cta: "text-violet-200 hover:text-violet-100",
    halo: "rgba(196,181,253,.10)",
  },
  green: {
    label: "text-emerald-200",
    icon: "border-emerald-300/25 bg-emerald-300/[.06] text-emerald-200",
    line: "from-emerald-300/65",
    cta: "text-emerald-200 hover:text-emerald-100",
    halo: "rgba(110,231,183,.09)",
  },
};

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
    <section id="ecosystem" className="relative scroll-mt-24 overflow-hidden bg-[#020202] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[560px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.10),rgba(212,175,55,.025)_38%,transparent_69%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(820px,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/38 to-transparent shadow-[0_0_30px_rgba(212,175,55,.16)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-4xl text-center md:mb-16"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/72">{x.eyebrow}</span>
          <h2 className="section-title mt-4 text-[clamp(2.7rem,5vw,4.8rem)] text-zinc-100">
            {x.titleA}
            <em className="gradient-gold-text font-normal italic">{x.titleB}</em>
          </h2>
          <p className="section-lead mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.desc}</p>
        </motion.div>

        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          {DIRECTION_ORDER.map((key, index) => {
            const item = x.items[key];
            const Icon = ICONS[key];
            const accent = DIRECTION_ACCENT[key];
            const tone = TONE[accent];

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: .62, ease: [0.16, 1, 0.3, 1] }}
              >
                <InteractiveSurface
                  accent={accent}
                  className="group relative overflow-hidden rounded-[32px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012)_50%,rgba(0,0,0,.36))] shadow-[0_42px_120px_-66px_rgba(0,0,0,.95)]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-28 h-96 w-96 rounded-full blur-[95px] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${tone.halo}, transparent 68%)` }}
                  />

                  <div className="grid min-h-[370px] lg:grid-cols-[.98fr_1.02fr]">
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

                      <h3 className="mt-7 text-3xl font-semibold tracking-[-.035em] text-white sm:text-[38px]">{item.title}</h3>
                      <div className={`mt-4 h-px w-20 bg-gradient-to-r to-transparent ${tone.line}`} />

                      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.17em] text-zinc-600">{x.outcomeLabel}</p>
                      <p className="mt-2 max-w-xl text-lg font-medium leading-8 text-zinc-100">{item.outcome}</p>
                      <p className="section-lead mt-3 max-w-xl text-sm leading-7 text-zinc-500">{item.text}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-300">{tag}</span>
                        ))}
                      </div>

                      <a
                        href={href[key]}
                        onClick={() => track("direction_open", { direction: key, source: "home_ecosystem" })}
                        className={`mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors ${tone.cta}`}
                      >
                        {item.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="border-t border-white/[.07] p-5 sm:p-7 lg:flex lg:items-center lg:border-l lg:border-t-0 lg:p-8">
                      <div className="w-full">
                        <DirectionVisual type={key} lang={lang} />
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
