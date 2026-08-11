"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ExternalLink, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  CATEGORY_ORDER,
  CATEGORY_SHORT,
  PORTFOLIO_UI,
  STATUS_TONE,
  statusText,
  type Category,
} from "@/lib/portfolio";
import { SHOWCASE_FEATURED, SHOWCASE_PORTFOLIO, type ShowcaseProject } from "@/lib/portfolio-showcase";

type Locale = "en" | "ua" | "ru";
type Filter = "all" | "featured" | Category;

const COPY = {
  en: { selected: "Selected proof", selectedIntro: "Projects with the clearest working proof, real interfaces or public live pages.", all: "All projects", result: "Delivered result", case: "View case study", live: "Open live site", fallback: "Product system / case study", projects: "projects" },
  ua: { selected: "Вибрані докази роботи", selectedIntro: "Проєкти з найсильнішими робочими доказами, реальними інтерфейсами або публічними live-сторінками.", all: "Усі проєкти", result: "Отриманий результат", case: "Відкрити кейс", live: "Відкрити живий сайт", fallback: "Продуктова система / кейс", projects: "проєктів" },
  ru: { selected: "Избранные доказательства работы", selectedIntro: "Проекты с самыми сильными рабочими доказательствами, реальными интерфейсами или публичными live-страницами.", all: "Все проекты", result: "Полученный результат", case: "Открыть кейс", live: "Открыть живой сайт", fallback: "Продуктовая система / кейс", projects: "проектов" },
} as const;

function StatusBadge({ p, locale }: { p: ShowcaseProject; locale: Locale }) {
  const green = STATUS_TONE[p.status] === "green";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold", green ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200" : "border-amber-400/35 bg-amber-400/10 text-amber-200")}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusText(locale, p.status, p.statusLabel)}
    </span>
  );
}

function RequestCta({ locale, route, project, label }: { locale: Locale; route: string; project?: string; label: string }) {
  const ui = PORTFOLIO_UI[locale];
  return (
    <RequestDialog
      intent="portfolio_request"
      title={project ? `${ui.dialogTitle} — ${project}` : ui.dialogTitle}
      description={ui.dialogDesc}
      submitLabel={ui.dialogSubmit}
      successTitle={ui.dialogOkTitle}
      successMessage={ui.dialogOkBody}
      buttonLabel={project ? `Portfolio — ${project}` : "Portfolio"}
      showBuildType={false}
      compact
      helpRequired
      helpLabel={ui.dialogHelp}
      context={{ source: "portfolio", section: "showcase", locale, route, ...(project ? { project } : {}) }}
    >
      <Button className="premium-button min-h-11 px-5">{label}<ArrowRight className="ml-2 h-4 w-4" /></Button>
    </RequestDialog>
  );
}

function Media({ p, locale, eager = false }: { p: ShowcaseProject; locale: Locale; eager?: boolean }) {
  const c = p.content[locale];
  if (!p.shots[0]) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(245,190,52,.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,.07),transparent_35%),#070707]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div><Layers3 className="mx-auto h-8 w-8 text-amber-300/80" /><p className="mt-4 text-xs uppercase tracking-[.2em] text-zinc-600">{COPY[locale].fallback}</p><p className="mt-3 text-2xl font-black">{c.name}</p></div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#050505]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.shots[0]} alt={`${c.name} — ${c.caption ?? c.type}`} loading={eager ? "eager" : "lazy"} decoding="async" className={cn("absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.018]", p.mediaFit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover object-top")} />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.05]" />
    </div>
  );
}

function Card({ p, locale, route, eager }: { p: ShowcaseProject; locale: Locale; route: string; eager?: boolean }) {
  const c = p.content[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[.09] bg-[#090909] shadow-[0_24px_80px_rgba(0,0,0,.3)] transition duration-300 hover:-translate-y-1 hover:border-amber-300/25">
      <div className="relative"><Media p={p} locale={locale} eager={eager} /><div className="absolute left-4 top-4"><StatusBadge p={p} locale={locale} /></div></div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-amber-300/75">{CATEGORY_SHORT[p.category][locale]}</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-[28px]">{c.name}</h3>
        <p className="mt-1 text-xs text-zinc-500">{c.type}</p>
        <p className="mt-4 text-[15px] leading-7 text-zinc-300">{c.outcome}</p>
        <div className="mt-5 rounded-2xl border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,190,52,.07),rgba(255,255,255,.02))] p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-amber-300/75"><ShieldCheck className="h-3.5 w-3.5" />{COPY[locale].result}</div>
          <p className="text-sm leading-6 text-zinc-200">{c.result}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">{c.capabilities.slice(0, 6).map((cap) => <span key={cap} className="rounded-full border border-white/10 bg-white/[.035] px-2.5 py-1 text-[11px] text-zinc-300">{cap}</span>)}</div>
        {p.audio && <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3">{/* eslint-disable-next-line jsx-a11y/media-has-caption */}<audio controls preload="none" src={p.audio} className="w-full" /></div>}
        <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
          <a href={`${localeBase}/work/${p.caseSlug}`} className="max-sm:w-full"><Button className="premium-button min-h-11 max-sm:w-full px-5">{COPY[locale].case}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="max-sm:w-full" onClick={() => track("portfolio_live_open", { locale, project: p.key })}><Button className="min-h-11 max-sm:w-full border border-white/15 bg-white/[.035] px-5 text-white hover:bg-white/[.08]">{COPY[locale].live}<ExternalLink className="ml-2 h-4 w-4" /></Button></a>}
        </div>
      </div>
    </article>
  );
}

export function PortfolioShowcasePage() {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const ui = PORTFOLIO_UI[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const route = `${localeBase}/work`;
  const [filter, setFilter] = useState<Filter>("all");

  const chips = useMemo(() => {
    const rows: { id: Filter; label: string; count: number }[] = [
      { id: "all", label: ui.filterAll, count: SHOWCASE_PORTFOLIO.length },
      { id: "featured", label: ui.filterFeatured, count: SHOWCASE_FEATURED.length },
    ];
    CATEGORY_ORDER.forEach((category) => {
      const count = SHOWCASE_PORTFOLIO.filter((p) => p.category === category).length;
      if (count) rows.push({ id: category, label: CATEGORY_SHORT[category][locale], count });
    });
    return rows;
  }, [locale, ui.filterAll, ui.filterFeatured]);

  const filtered = filter === "featured" ? SHOWCASE_FEATURED : filter === "all" ? SHOWCASE_PORTFOLIO : SHOWCASE_PORTFOLIO.filter((p) => p.category === filter);
  const featuredKeys = new Set(SHOWCASE_FEATURED.map((p) => p.key));
  const rest = filter === "all" ? filtered.filter((p) => !featuredKeys.has(p.key)) : filtered;
  const showFeatured = filter === "all" || filter === "featured";

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pt-36 pb-14 sm:pt-40 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.13),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(109,40,217,.09),transparent_28%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-amber-200"><Sparkles className="h-3.5 w-3.5" />{ui.eyebrow}</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.04em] sm:text-6xl lg:text-7xl">{ui.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">{ui.intro}</p>
            <p className="mt-5 flex max-w-3xl items-start gap-2.5 text-sm leading-6 text-zinc-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{ui.trustLine}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><RequestCta locale={locale} route={route} label={ui.heroPrimary} /><a href="#portfolio-grid"><Button className="min-h-12 border border-white/15 bg-white/[.035] px-7 text-white hover:bg-white/[.08]">{ui.heroSecondary}<ArrowDown className="ml-2 h-4 w-4" /></Button></a></div>
          </div>
        </section>

        <section id="portfolio-grid" className="scroll-mt-24 border-b border-white/[.07] bg-[#050505]"><div className="container mx-auto max-w-6xl px-4"><div className="-mx-4 flex gap-2 overflow-x-auto px-4 py-5 sm:mx-0 sm:flex-wrap sm:px-0">{chips.map((chip) => <button key={chip.id} type="button" onClick={() => setFilter(chip.id)} className={cn("shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition", filter === chip.id ? "border-amber-300/45 bg-amber-300/10 text-amber-100" : "border-white/10 bg-white/[.02] text-zinc-400 hover:border-white/20 hover:text-white")}>{chip.label} <span className="ml-1 text-zinc-600">{chip.count}</span></button>)}</div></div></section>

        {showFeatured && <section className="py-14 sm:py-20"><div className="container mx-auto max-w-6xl px-4"><div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/75">Proof</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{COPY[locale].selected}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">{COPY[locale].selectedIntro}</p></div><div className="grid gap-5 lg:grid-cols-2">{SHOWCASE_FEATURED.map((p, index) => <Card key={p.key} p={p} locale={locale} route={route} eager={index < 2} />)}</div></div></section>}

        {filter !== "featured" && <section className="border-t border-white/[.06] bg-[#030303] py-14 sm:py-20"><div className="container mx-auto max-w-6xl px-4"><div className="mb-8 flex items-end justify-between gap-4"><h2 className="text-3xl font-black tracking-tight sm:text-4xl">{filter === "all" ? COPY[locale].all : chips.find((c) => c.id === filter)?.label}</h2><span className="text-xs text-zinc-600">{rest.length} {COPY[locale].projects}</span></div><div className="grid gap-5 lg:grid-cols-2">{rest.map((p) => <Card key={p.key} p={p} locale={locale} route={route} />)}</div></div></section>}

        <section className="border-t border-white/[.07] py-14 sm:py-20"><div className="container mx-auto max-w-5xl px-4"><div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#080808] p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/75">Portfolio</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{ui.ctaTitle}</h2><p className="mt-4 max-w-2xl text-zinc-400">{ui.ctaBody}</p><div className="mt-7"><RequestCta locale={locale} route={route} label={ui.ctaButton} /></div></div></div></section>
      </main>
      <FooterSection />
    </div>
  );
}
