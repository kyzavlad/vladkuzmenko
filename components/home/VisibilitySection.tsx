"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ScanSearch, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { getDirectionCopy } from "@/lib/directions";
import { langHref, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  scanLabel: string;
  evidence: string;
  priority: string;
  categories: string[];
  open: string;
  audit: string;
}> = {
  en: {
    eyebrow: "Website intelligence",
    titleA: "See what the site is ",
    titleB: "really costing you.",
    desc: "VisibilityOS turns a website into an evidence-backed action list: what creates friction, what weakens trust, how visible the site is, and what to fix first.",
    scanLabel: "Live scan model",
    evidence: "Evidence before opinion",
    priority: "Prioritised fixes",
    categories: ["Conversion", "Trust", "Search", "AI visibility"],
    open: "Explore VisibilityOS",
    audit: "Request an audit",
  },
  ua: {
    eyebrow: "Аналітика сайту",
    titleA: "Побачте, що сайт ",
    titleB: "насправді вам коштує.",
    desc: "VisibilityOS перетворює сайт на список дій з доказами: де виникає тертя, що послаблює довіру, наскільки вас видно і що варто виправляти першим.",
    scanLabel: "Модель сканування",
    evidence: "Спочатку докази",
    priority: "Пріоритет виправлень",
    categories: ["Конверсія", "Довіра", "Пошук", "AI-видимість"],
    open: "Відкрити VisibilityOS",
    audit: "Запросити аудит",
  },
  ru: {
    eyebrow: "Аналитика сайта",
    titleA: "Увидьте, во что сайт ",
    titleB: "реально вам обходится.",
    desc: "VisibilityOS превращает сайт в список действий с доказательствами: где возникает трение, что ослабляет доверие, насколько вас видно и что стоит исправлять первым.",
    scanLabel: "Модель сканирования",
    evidence: "Сначала доказательства",
    priority: "Приоритет исправлений",
    categories: ["Конверсия", "Доверие", "Поиск", "AI-видимость"],
    open: "Открыть VisibilityOS",
    audit: "Запросить аудит",
  },
};

export function VisibilitySection() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const x = COPY[lang];
  const direction = getDirectionCopy(lang).items.visibility;
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;
  const href = `${prefix}/visibilityos`;

  return (
    <section
      id="visibilityos"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#020304] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[560px] w-[92%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,.10),rgba(212,175,55,.025)_36%,transparent_66%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(760px,76vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-300/28 to-transparent shadow-[0_0_28px_rgba(125,211,252,.12)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-sky-200/75">{x.eyebrow}</span>
            <h2 className="section-title mt-4 text-[clamp(2.8rem,5vw,4.8rem)] text-zinc-100">
              {x.titleA}
              <em className="bg-gradient-to-br from-sky-100 via-sky-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{x.titleB}</em>
            </h2>
            <p className="section-lead mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.desc}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {direction.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-sky-300/[.13] bg-sky-300/[.035] px-3 py-1.5 text-[11px] text-zinc-300">{tag}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={href} onClick={() => track("visibilityos_open", { source: "home" })}>
                <Button className="h-auto min-h-12 w-full border border-sky-200/20 bg-sky-200/[.08] px-7 py-3 text-sky-50 hover:bg-sky-200/[.13] sm:w-auto">
                  {x.open}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href={`${href}#audit`} onClick={() => track("visibilityos_audit_open", { source: "home" })}>
                <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">
                  {x.audit}
                  <ScanSearch className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: .985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveSurface
              accent="blue"
              lift={false}
              className="relative overflow-hidden rounded-[30px] border border-sky-200/[.13] bg-[linear-gradient(145deg,rgba(125,211,252,.06),rgba(255,255,255,.018)_48%,rgba(0,0,0,.48))] p-5 shadow-[0_42px_120px_-58px_rgba(14,165,233,.22)] sm:p-7"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/[.07] pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/[.06] text-sky-200">
                    <ScanSearch className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">VisibilityOS</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-zinc-600">{x.scanLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/[.08] bg-black/35 px-3 py-1.5 text-[9px] uppercase tracking-[.15em] text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,.65)]" />
                  scan
                </div>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-[22px] border border-white/[.07] bg-black/42 p-5 sm:p-6">
                <div aria-hidden="true" className="absolute inset-0 opacity-[.35] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:30px_30px]" />
                {!reduced && (
                  <motion.div
                    aria-hidden="true"
                    animate={{ y: [0, 205, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-3 top-3 z-20 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_24px_rgba(125,211,252,.55)]"
                  />
                )}

                <div className="relative grid gap-3 sm:grid-cols-2">
                  {x.categories.map((category, index) => {
                    const Icon = [Sparkles, ShieldCheck, Search, CheckCircle2][index] ?? Search;
                    return (
                      <motion.div
                        key={category}
                        whileHover={reduced ? undefined : { y: -3 }}
                        className="rounded-2xl border border-white/[.07] bg-white/[.022] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <Icon className="h-4 w-4 text-sky-200/75" />
                          <span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span>
                        </div>
                        <p className="mt-4 text-sm font-medium text-zinc-200">{category}</p>
                        <div className="mt-3 flex gap-1.5" aria-hidden="true">
                          {[0, 1, 2, 3].map((dot) => (
                            <motion.span
                              key={dot}
                              className="h-1 w-full rounded-full bg-sky-300"
                              animate={reduced ? { opacity: .28 } : { opacity: [.13, .58, .13] }}
                              transition={reduced ? { duration: .2 } : { duration: 2.2, repeat: Infinity, delay: index * .16 + dot * .08 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[x.evidence, x.priority].map((label, index) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.018] px-4 py-3.5">
                    {index === 0 ? <ShieldCheck className="h-4 w-4 text-amber-300/75" /> : <ArrowRight className="h-4 w-4 text-sky-200/75" />}
                    <span className="text-xs text-zinc-400">{label}</span>
                  </div>
                ))}
              </div>
            </InteractiveSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
