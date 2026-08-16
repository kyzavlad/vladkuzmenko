"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Layers3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  CATEGORY_SHORT,
  STATUS_TONE,
  statusText,
} from "@/lib/portfolio";
import {
  CURATED_PORTFOLIO,
  HOME_FEATURED,
  type CuratedProject,
} from "@/lib/portfolio-curated";
import { track } from "@/lib/analytics";

type Locale = "en" | "ua" | "ru";

const COPY = {
  en: {
    eyebrow: "Proof",
    title: "What has actually been built",
    desc: "Three systems from this work, shown end to end: the problem, what was built and where it runs today.",
    task: "Task",
    built: "What was built",
    result: "Result",
    capabilities: "Key features",
    open: "Open project",
    live: "Open live site",
    all: "View all work",
    noVisual: "Project preview",
  },
  ua: {
    eyebrow: "Доказ",
    title: "Що вже побудовано",
    desc: "Три системи з цієї роботи повністю: задача, що було побудовано і де це працює сьогодні.",
    task: "Завдання",
    built: "Що зроблено",
    result: "Результат",
    capabilities: "Ключові можливості",
    open: "Відкрити проєкт",
    live: "Відкрити живий сайт",
    all: "Переглянути всі роботи",
    noVisual: "Прев’ю проєкту",
  },
  ru: {
    eyebrow: "Доказательство",
    title: "Что уже построено",
    desc: "Три системы из этой работы целиком: задача, что было построено и где это работает сегодня.",
    task: "Задача",
    built: "Что сделано",
    result: "Результат",
    capabilities: "Ключевые возможности",
    open: "Открыть проект",
    live: "Открыть живой сайт",
    all: "Смотреть все работы",
    noVisual: "Превью проекта",
  },
} as const;

function StatusBadge({ p, locale }: { p: CuratedProject; locale: Locale }) {
  const green = STATUS_TONE[p.status] === "green";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-white/[.035] px-3 py-1.5 text-[11px] font-semibold text-zinc-200 shadow-sm backdrop-blur-sm",
        green ? "border-emerald-300/20" : "border-amber-300/20",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          green ? "bg-emerald-300" : "bg-amber-300",
        )}
      />
      {statusText(locale, p.status, p.statusLabel)}
    </span>
  );
}

function Preview({ p, locale, i }: { p: CuratedProject; locale: Locale; i: number }) {
  const x = COPY[locale];
  const c = p.content[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const href = p.caseSlug ? `${localeBase}/work/${p.caseSlug}` : `${localeBase}/work`;
  const shot = p.shots[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="group overflow-hidden rounded-[28px] border border-white/[.09] bg-[#080808] shadow-[0_24px_80px_rgba(0,0,0,.3)] transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/22"
    >
      <div className="grid lg:grid-cols-[.88fr_1.12fr]">
        <div className="border-b border-white/[.07] lg:border-b-0 lg:border-r">
          {shot ? (
            <a
              href={href}
              aria-label={`${c.name} — ${x.open}`}
              className="relative flex min-h-[300px] h-full items-center justify-center overflow-hidden bg-[#050505] p-3 sm:p-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot}
                alt={`${c.name} — ${c.caption ?? c.type}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="max-h-[420px] w-full object-contain object-top transition duration-500 group-hover:scale-[1.006]"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.06]" />
            </a>
          ) : (
            <div className="relative flex min-h-[300px] h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(245,190,52,.11),transparent_34%),#050505] p-8 text-center">
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative z-10">
                <Layers3 className="mx-auto h-8 w-8 text-amber-300/65" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[.2em] text-amber-300/70">{x.noVisual}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusBadge p={p} locale={locale} />
            <span className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-amber-200/80">
              {CATEGORY_SHORT[p.category][locale]}
            </span>
            <span className="ml-auto hidden text-[10px] font-semibold uppercase tracking-[.16em] text-zinc-700 sm:block">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-5 text-3xl font-black tracking-[-.035em] sm:text-4xl">{c.name}</h3>
          <p className="mt-2 text-sm text-zinc-500">{c.type}</p>
          <p className="mt-4 text-base font-medium leading-7 text-zinc-100 sm:text-lg">{c.outcome}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">{x.task}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{c.problem}</p>
            </div>
            <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">{x.built}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{c.built}</p>
            </div>
          </div>

          {c.value && (
            <div className="mt-4 rounded-2xl border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,190,52,.07),rgba(255,255,255,.015))] p-4">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-amber-300/80">
                <ShieldCheck className="h-3.5 w-3.5" />
                {x.result}
              </div>
              <p className="text-sm leading-6 text-zinc-200">{c.value}</p>
            </div>
          )}

          <div className="mt-5 border-t border-white/[.07] pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">{x.capabilities}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.capabilities.slice(0, 6).map((cap) => (
                <span
                  key={cap}
                  className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[11px] text-zinc-300"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-white/[.07] pt-5 sm:flex-row">
            <a
              href={href}
              className="sm:w-auto"
              onClick={() => track("portfolio_open", { project: p.key, source: "home" })}
            >
              <Button className="premium-button min-h-11 w-full px-6 sm:w-auto">
                {x.open}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="sm:w-auto">
                <Button className="min-h-11 w-full border border-white/15 bg-white/[.035] px-6 text-white hover:bg-white/[.08] sm:w-auto">
                  {x.live}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SelectedWork() {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const x = COPY[locale];
  const base = langHref(locale);
  const workHref = base === "/" ? "/work" : `${base}/work`;
  // Explicit homepage curation — see HOME_FEATURED_KEYS in lib/portfolio-curated.
  const projects = HOME_FEATURED.length ? HOME_FEATURED : CURATED_PORTFOLIO.slice(0, 3);

  return (
    /* Proof lives inside Client Growth Systems — it inherits that section's background. */
    <section id="selected-work" className="relative scroll-mt-24 pb-4 pt-16 md:pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="section-title mt-4 text-3xl text-white sm:text-4xl md:text-[46px]">{x.title}</h2>
          <p className="section-lead mt-5 text-base leading-8 text-zinc-400 sm:text-lg">{x.desc}</p>
        </motion.div>

        <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
          {projects.map((p, i) => (
            <Preview key={p.key} p={p} locale={locale} i={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={workHref}>
            <Button className="premium-button h-auto min-h-12 px-7 py-3">
              {x.all}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
