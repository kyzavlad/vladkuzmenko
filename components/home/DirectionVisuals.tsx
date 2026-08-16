"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle2, Dumbbell, Search, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import type { DirectionKey } from "@/lib/directions";

const COPY: Record<Lang, {
  business: string[];
  visibility: string[];
  performance: string[];
  network: string;
  signal: string;
}> = {
  en: {
    business: ["Traffic", "Conversion", "Sales"],
    visibility: ["Conversion", "Trust", "Search", "AI visibility"],
    performance: ["Work", "Training", "Ready meal", "Routine"],
    network: "Stronger people, shorter feedback loops",
    signal: "One system, one next step",
  },
  ua: {
    business: ["Traffic", "Conversion", "Sales"],
    visibility: ["Конверсія", "Довіра", "Пошук", "AI-видимість"],
    performance: ["Робота", "Тренування", "Готова їжа", "Режим"],
    network: "Сильніші люди, коротший шлях до фідбеку",
    signal: "Одна система, один наступний крок",
  },
  ru: {
    business: ["Traffic", "Conversion", "Sales"],
    visibility: ["Конверсия", "Доверие", "Поиск", "AI-видимость"],
    performance: ["Работа", "Тренировка", "Готовая еда", "Режим"],
    network: "Сильнее окружение, короче путь к обратной связи",
    signal: "Одна система, один следующий шаг",
  },
};

const ICONS = [Briefcase, Dumbbell, UtensilsCrossed, CheckCircle2];

export function DirectionVisual({ type, lang }: { type: DirectionKey; lang: Lang }) {
  const reduced = useReducedMotion();
  const x = COPY[lang];

  if (type === "business") {
    return (
      <div className="relative flex min-h-[280px] items-center overflow-hidden rounded-[26px] border border-amber-300/12 bg-[#050504] p-6 sm:p-8">
        <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.028)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_80%)]" />
        <div className="relative w-full">
          <div className="mb-8 flex items-center justify-between gap-4">
            <span className="text-[9px] font-bold uppercase tracking-[.18em] text-amber-300/65">Growth path</span>
            <span className="text-[10px] text-zinc-600">{x.signal}</span>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-4">
            {x.business.flatMap((label, index) => {
              const node = (
                <motion.div key={`node-${label}`} initial={reduced ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .12 }} className="relative rounded-2xl border border-white/[.08] bg-white/[.025] px-3 py-5 text-center">
                  <span className="mx-auto mb-3 block h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(245,190,52,.42)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[.1em] text-zinc-300">{label}</span>
                </motion.div>
              );
              if (index === x.business.length - 1) return [node];
              return [node, <div key={`line-${label}`} className="relative h-px min-w-5 overflow-hidden bg-white/[.08]">{!reduced && <motion.span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-amber-300 to-transparent" animate={{ x: ["-120%", "220%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: index * .35 }} />}</div>];
            })}
          </div>
        </div>
      </div>
    );
  }

  if (type === "visibility") {
    return (
      <div className="relative min-h-[280px] overflow-hidden rounded-[26px] border border-sky-300/12 bg-[#040607] p-6 sm:p-8">
        {!reduced && <motion.div aria-hidden="true" className="absolute inset-x-5 top-5 z-20 h-px bg-gradient-to-r from-transparent via-sky-300/90 to-transparent shadow-[0_0_24px_rgba(125,211,252,.5)]" animate={{ y: [0, 225, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />}
        <div className="relative grid grid-cols-2 gap-3">
          {x.visibility.map((label, index) => {
            const Icon = [Sparkles, ShieldCheck, Search, CheckCircle2][index] ?? Search;
            return (
              <motion.div key={label} whileHover={reduced ? undefined : { y: -3 }} className="min-h-[105px] rounded-2xl border border-white/[.075] bg-white/[.022] p-4">
                <div className="flex items-center justify-between"><Icon className="h-4 w-4 text-sky-200/75" /><span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span></div>
                <p className="mt-5 text-xs font-medium text-zinc-300">{label}</p>
                <div className="mt-3 flex gap-1">{[0, 1, 2, 3].map((bar) => <span key={bar} className="h-1 flex-1 rounded-full bg-sky-300/35" />)}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "warriors") {
    const nodes = [[72,140],[190,65],[190,210],[330,140],[455,78],[455,200]];
    const lines = [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,5]];
    return (
      <div className="relative min-h-[280px] overflow-hidden rounded-[26px] border border-violet-300/12 bg-[#050405]">
        <svg viewBox="0 0 530 280" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {lines.map(([a,b], index) => <motion.line key={index} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(196,181,253,.24)" strokeWidth="1.2" strokeDasharray="4 7" initial={reduced ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: index * .06 }} />)}
          {nodes.map(([cx,cy], index) => <motion.circle key={index} cx={cx} cy={cy} r={index === 0 ? 9 : 6} fill={index === 0 ? "rgba(245,190,52,.95)" : "rgba(196,181,253,.85)"} initial={reduced ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: .15 + index * .07 }} />)}
        </svg>
        <div className="absolute inset-x-6 bottom-5 rounded-2xl border border-white/[.07] bg-black/55 px-4 py-3 backdrop-blur-xl"><p className="text-center text-[10px] font-medium tracking-[.04em] text-zinc-400">{x.network}</p></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-[26px] border border-emerald-300/12 bg-[#030604] p-6 sm:p-8">
      <div className="absolute left-10 right-10 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-emerald-300/0 via-emerald-300/30 to-emerald-300/0" aria-hidden="true" />
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        {x.performance.map((label, index) => {
          const Icon = ICONS[index] ?? CheckCircle2;
          return (
            <motion.div key={label} whileHover={reduced ? undefined : { y: -4 }} className="flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-white/[.07] bg-black/45 px-3 text-center">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${index === 2 ? "border-amber-300/24 bg-amber-300/[.06] text-amber-200" : "border-emerald-300/18 bg-emerald-300/[.045] text-emerald-200/80"}`}><Icon className="h-4 w-4" /></span>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[.08em] text-zinc-400">{label}</p>
              {index < x.performance.length - 1 && <ArrowRight className="mt-3 h-3.5 w-3.5 text-zinc-700 sm:hidden" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
