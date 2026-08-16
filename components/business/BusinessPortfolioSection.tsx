"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Layers3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref, type Lang } from "@/lib/i18n";
import { CATEGORY_ORDER, CATEGORY_SHORT, STATUS_TONE, statusText, type Category } from "@/lib/portfolio";
import { CURATED_PORTFOLIO } from "@/lib/portfolio-curated";
import type { ShowcaseProject } from "@/lib/portfolio-showcase";

type Filter = "all" | Category;

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  intro: string;
  all: string;
  projects: string;
  problem: string;
  built: string;
  result: string;
  capabilities: string;
  open: string;
  live: string;
  noVisual: string;
}> = {
  en: {
    eyebrow: "Selected & complete work",
    title: "The systems behind the offer, shown in real projects",
    intro: "Client platforms, AI products, automation, marketplaces and websites. Every project is shown at its real stage, with the task, what was built and the practical outcome.",
    all: "All projects",
    projects: "projects",
    problem: "Task",
    built: "What was built",
    result: "Practical value",
    capabilities: "Key capabilities",
    open: "Open project",
    live: "Open live site",
    noVisual: "Project without a public visual preview",
  },
  ua: {
    eyebrow: "Вибрані та всі роботи",
    title: "Системи з оферу, показані на реальних проєктах",
    intro: "Клієнтські платформи, AI-продукти, автоматизація, маркетплейси та сайти. Для кожного проєкту показано реальний етап, задачу, що було створено і практичний результат.",
    all: "Усі проєкти",
    projects: "проєктів",
    problem: "Завдання",
    built: "Що створено",
    result: "Практична цінність",
    capabilities: "Ключові можливості",
    open: "Відкрити проєкт",
    live: "Відкрити живий сайт",
    noVisual: "Проєкт без публічного візуального прев’ю",
  },
  ru: {
    eyebrow: "Избранные и все работы",
    title: "Системы из предложения, показанные на реальных проектах",
    intro: "Клиентские платформы, AI-продукты, автоматизация, маркетплейсы и сайты. Для каждого проекта показаны реальный этап, задача, что было создано и практический результат.",
    all: "Все проекты",
    projects: "проектов",
    problem: "Задача",
    built: "Что создано",
    result: "Практическая ценность",
    capabilities: "Ключевые возможности",
    open: "Открыть проект",
    live: "Открыть живой сайт",
    noVisual: "Проект без публичного визуального превью",
  },
};

function StatusBadge({ project, lang }: { project: ShowcaseProject; lang: Lang }) {
  const green = STATUS_TONE[project.status] === "green";
  return (
    <span className={cn(
      "inline-flex items-center gap-2 rounded-full border bg-white/[.03] px-3 py-1.5 text-[11px] font-semibold text-zinc-300",
      green ? "border-emerald-300/18" : "border-amber-300/18",
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", green ? "bg-emerald-300" : "bg-amber-300")} />
      {statusText(lang, project.status, project.statusLabel)}
    </span>
  );
}

function ProjectCard({ project, lang, index }: { project: ShowcaseProject; lang: Lang; index: number }) {
  const x = COPY[lang];
  const c = project.content[lang];
  const base = langHref(lang);
  const localeBase = base === "/" ? "" : base;
  const href = project.caseSlug ? `${localeBase}/work/${project.caseSlug}` : undefined;
  const shot = project.shots[0];

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/[.085] bg-[linear-gradient(145deg,rgba(255,255,255,.032),rgba(255,255,255,.009))] transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/20">
      <div className="grid lg:grid-cols-[.88fr_1.12fr]">
        <div className="relative min-h-[260px] overflow-hidden border-b border-white/[.07] bg-[#050505] lg:min-h-[360px] lg:border-b-0 lg:border-r">
          {shot ? (
            <a href={href ?? "#portfolio"} className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot} alt={`${c.name} — ${c.caption ?? c.type}`} loading={index < 2 ? "eager" : "lazy"} decoding="async" className="max-h-full w-full object-contain object-top transition duration-500 group-hover:scale-[1.008]" />
            </a>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_10%,rgba(245,190,52,.1),transparent_45%),#050505] p-8 text-center">
              <div><Layers3 className="mx-auto h-7 w-7 text-amber-300/60" /><p className="mt-4 text-sm text-zinc-500">{x.noVisual}</p></div>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusBadge project={project} lang={lang} />
            <span className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-amber-200/75">{CATEGORY_SHORT[project.category][lang]}</span>
            <span className="ml-auto hidden text-[10px] tracking-[.15em] text-zinc-700 sm:block">{String(index + 1).padStart(2, "0")}</span>
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-.03em] text-white sm:text-3xl">{c.name}</h3>
          <p className="mt-2 text-xs text-zinc-600">{c.type}</p>
          <p className="mt-4 text-sm font-medium leading-7 text-zinc-200 sm:text-base">{c.outcome}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[.07] bg-black/28 p-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600">{x.problem}</p><p className="mt-2 text-sm leading-6 text-zinc-400">{c.problem}</p></div>
            <div className="rounded-2xl border border-white/[.07] bg-black/28 p-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600">{x.built}</p><p className="mt-2 text-sm leading-6 text-zinc-300">{c.built}</p></div>
          </div>

          {c.value && <div className="mt-4 rounded-2xl border border-amber-300/[.13] bg-amber-300/[.035] p-4"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-amber-300/75"><ShieldCheck className="h-3.5 w-3.5" />{x.result}</p><p className="mt-2 text-sm leading-6 text-zinc-300">{c.value}</p></div>}

          <div className="mt-5 border-t border-white/[.07] pt-4"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600">{x.capabilities}</p><div className="mt-3 flex flex-wrap gap-2">{c.capabilities.slice(0, 6).map((cap) => <span key={cap} className="rounded-full border border-white/[.08] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-400">{cap}</span>)}</div></div>

          {project.audio && <div className="mt-5 rounded-2xl border border-white/[.07] bg-black/30 p-3">{/* eslint-disable-next-line jsx-a11y/media-has-caption */}<audio controls preload="metadata" src={project.audio} className="w-full" /></div>}

          <div className="mt-5 flex flex-col gap-2.5 border-t border-white/[.07] pt-5 sm:flex-row">
            {href && <a href={href}><Button className="premium-button min-h-11 w-full px-6 sm:w-auto">{x.open}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><Button className="min-h-11 w-full border border-white/[.12] bg-white/[.03] px-6 text-white hover:bg-white/[.07] sm:w-auto">{x.live}<ExternalLink className="ml-2 h-4 w-4" /></Button></a>}
          </div>
        </div>
      </div>
    </article>
  );
}

export function BusinessPortfolioSection() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(() => filter === "all" ? CURATED_PORTFOLIO : CURATED_PORTFOLIO.filter((project) => project.category === filter), [filter]);

  return (
    <section id="portfolio" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.055),transparent_62%)]" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/70">{x.eyebrow}</span>
          <h2 className="section-title mt-4 text-[clamp(2.3rem,4vw,3.8rem)] text-zinc-100">{x.title}</h2>
          <p className="section-lead mx-auto mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.intro}</p>
        </div>

        <div className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          <button type="button" onClick={() => setFilter("all")} className={cn("shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition", filter === "all" ? "border-amber-300/45 bg-amber-300/10 text-amber-100" : "border-white/[.09] bg-white/[.02] text-zinc-400 hover:border-white/20 hover:text-white")}>{x.all} <span className="ml-1 text-zinc-600">{CURATED_PORTFOLIO.length}</span></button>
          {CATEGORY_ORDER.map((category) => {
            const count = CURATED_PORTFOLIO.filter((project) => project.category === category).length;
            if (!count) return null;
            return <button key={category} type="button" onClick={() => setFilter(category)} className={cn("shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition", filter === category ? "border-amber-300/45 bg-amber-300/10 text-amber-100" : "border-white/[.09] bg-white/[.02] text-zinc-400 hover:border-white/20 hover:text-white")}>{CATEGORY_SHORT[category][lang]} <span className="ml-1 text-zinc-600">{count}</span></button>;
          })}
        </div>

        <div className="mb-7 mt-3 flex justify-end"><span className="text-xs text-zinc-600">{filtered.length} {x.projects}</span></div>
        <div className="space-y-6 sm:space-y-8">{filtered.map((project, index) => <ProjectCard key={project.key} project={project} lang={lang} index={index} />)}</div>
      </div>
    </section>
  );
}
