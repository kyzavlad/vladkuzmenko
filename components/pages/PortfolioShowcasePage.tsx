"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
  type Status,
} from "@/lib/portfolio";
import {
  SHOWCASE_FEATURED,
  SHOWCASE_PORTFOLIO,
  type ShowcaseProject,
} from "@/lib/portfolio-showcase";

type Locale = "en" | "ua" | "ru";
type Filter = "all" | "featured" | Category;

const EXTRA = {
  en: {
    selected: "Selected proof",
    selectedIntro: "A few projects with the clearest working proof, real interfaces or public live pages.",
    all: "All projects",
    proof: "Current proof",
    openCase: "View case study",
    live: "Open live site",
    noShot: "Product system / case study",
    result: "Delivered result",
    count: "projects",
  },
  ua: {
    selected: "Вибрані докази роботи",
    selectedIntro: "Кілька проєктів із найсильнішими робочими доказами, реальними інтерфейсами або публічними live-сторінками.",
    all: "Усі проєкти",
    proof: "Поточний доказ",
    openCase: "Відкрити кейс",
    live: "Відкрити живий сайт",
    noShot: "Продуктова система / кейс",
    result: "Отриманий результат",
    count: "проєктів",
  },
  ru: {
    selected: "Избранные доказательства работы",
    selectedIntro: "Несколько проектов с самыми сильными рабочими доказательствами, реальными интерфейсами или публичными live-страницами.",
    all: "Все проекты",
    proof: "Текущее доказательство",
    openCase: "Открыть кейс",
    live: "Открыть живой сайт",
    noShot: "Продуктовая система / кейс",
    result: "Полученный результат",
    count: "проектов",
  },
} as const;

const toneClass: Record<"green" | "amber", string> = {
  green: "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-400/35 bg-amber-400/10 text-amber-200",
};

function StatusBadge({ p, locale }: { p: ShowcaseProject; locale: Locale }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur",
        toneClass[STATUS_TONE[p.status as Status]],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusText(locale, p.status, p.statusLabel)}
    </span>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.slice(0, 6).map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] text-zinc-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function PortfolioRequest({
  locale,
  route,
  project,
  children,
  className,
}: {
  locale: Locale;
  route: string;
  project?: string;
  children: React.ReactNode;
  className?: string;
}) {
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
      className={className}
    >
      {children}
    </RequestDialog>
  );
}

function ProjectMedia({
  p,
  locale,
  eager,
}: {
  p: ShowcaseProject;
  locale: Locale;
  eager?: boolean;
}) {
  const c = p.content[locale];
  if (!p.shots[0]) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(245,190,52,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_35%),#090909]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div>
            <Layers3 className="mx-auto mb-4 h-8 w-8 text-amber-300/80" />
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{EXTRA[locale].noShot}</p>
            <p className="mt-3 text-2xl font-black text-white/90">{c.name}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.shots[0]}
        alt={`${c.name} — ${c.caption ?? c.type}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.018]",
          p.mediaFit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover object-top",
        )}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

function Actions({ p, locale, route }: { p: ShowcaseProject; locale: Locale; route: string }) {
  const c = p.content[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const caseHref = `${localeBase}/work/${p.caseSlug}`;

  return (
    <div className="mt-5 flex flex-wrap gap-2.5">
      <a
        href={caseHref}
        className="max-sm:w-full"
        onClick={() => track("portfolio_case_open", { locale, project: p.key })}
      >
        <Button className="premium-button h-11 max-sm:w-full px-5">
          {EXTRA[locale].openCase}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </a>

      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:w-full"
          onClick={() => track("portfolio_live_open", { locale, project: p.key })}
        >
          <Button className="h-11 max-sm:w-full border border-white/15 bg-white/[0.035] px-5 text-white hover:bg-white/[0.08]">
            {EXTRA[locale].live}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      )}

      {!p.liveUrl && (
        <PortfolioRequest locale={locale} route={route} project={c.name} className="max-sm:hidden">
          <Button className="h-11 border border-white/10 bg-transparent px-5 text-zinc-300 hover:bg-white/[0.05] hover:text-white">
            {PORTFOLIO_UI[locale].requestSimilar}
          </Button>
        </PortfolioRequest>
      )}
    </div>
  );
}

function ProjectCard({
  p,
  locale,
  route,
  eager,
}: {
  p: ShowcaseProject;
  locale: Locale;
  route: string;
  eager?: boolean;
}) {
  const c = p.content[locale];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#090909] shadow-[0_24px_80px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-1 hover:border-amber-300/25 hover:shadow-[0_30px_90px_rgba(0,0,0,.46)]">
      <div className="relative">
        <ProjectMedia p={p} locale={locale} eager={eager} />
        <div className="absolute left-4 top-4">
          <StatusBadge p={p} locale={locale} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300/75">
          <span>{CATEGORY_SHORT[p.category][locale]}</span>
          <span className="text-zinc-700">•</span>
          <span className="normal-case tracking-normal text-zinc-500">{c.type}</span>
        </div>

        <h3 className="text-2xl font-black tracking-tight text-white sm:text-[28px]">{c.name}</h3>
        <p className="mt-3 text-[15px] leading-7 text-zinc-300">{c.outcome}</p>

        <div className="mt-5 rounded-2xl border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,190,52,.07),rgba(255,255,255,.02))] p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-amber-300/75">
            <ShieldCheck className="h-3.5 w-3.5" />
            {EXTRA[locale].result}
          </div>
          <p className="text-sm leading-6 text-zinc-200">{c.result}</p>
        </div>

        <div className="mt-5">
          <Tags items={c.capabilities} />
        </div>

        {p.audio && (
          <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls preload="none" src={p.audio} className="w-full" />
          </div>
        )}

        <div className="mt-auto">
          <Actions p={p} locale={locale} route={route} />
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
    const list: { id: Filter; label: string; count: number }[] = [
      { id: "all", label: ui.filterAll, count: SHOWCASE_PORTFOLIO.length },
      { id: "featured", label: ui.filterFeatured, count: SHOWCASE_FEATURED.length },
    ];
    CATEGORY_ORDER.forEach((category) => {
      const count = SHOWCASE_PORTFOLIO.filter((p) => p.category === category).length;
      if (count) list.push({ id: category, label: CATEGORY_SHORT[category][locale], count });
    });
    return list;
  }, [locale, ui.filterAll, ui.filterFeatured]);

  const filtered = useMemo(() => {
    if (filter === "featured") return SHOWCASE_FEATURED;
    if (filter === "all") return SHOWCASE_PORTFOLIO;
    return SHOWCASE_PORTFOLIO.filter((p) => p.category === filter);
  }, [filter]);

  const featuredKeys = new Set(SHOWCASE_FEATURED.map((p) => p.key));
  const rest = filter === "all" ? filtered.filter((p) => !featuredKeys.has(p.key)) : filtered;
  const showFeatured = filter === "all" || filter === "featured";

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.07] pt-36 pb-14 sm:pt-40 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.13),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(109,40,217,.09),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                <Sparkles className="h-3.5 w-3.5" />
                {ui.eyebrow}
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">{ui.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">{ui.intro}</p>
              <p className="mt-5 flex max-w-3xl items-start gap-2.5 text-sm leading-6 text-zinc-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>{ui.trustLine}</span>
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PortfolioRequest locale={locale} route={route} className="max-sm:w-full">
                  <Button className="premium-button min-h-12 max-sm:w-full px-7 text-base">
                    {ui.heroPrimary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </PortfolioRequest>
                <a href="#portfolio-grid" className="max-sm:w-full">
                  <Button className="min-h-12 max-sm:w-full border border-white/15 bg-white/[0.035] px-7 text-base text-white hover:bg-white/[0.08]">
                    {ui.heroSecondary}
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio-grid" className="scroll-mt-24 border-b border-white/[0.07] bg-[#050505]">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 py-5 sm:mx-0 sm:flex-wrap sm:px-0">
              {chips.map((chip) => {
                const active = chip.id === filter;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => {
                      setFilter(chip.id);
                      track("portfolio_filter", { locale, filter: String(chip.id) });
                    }}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                      active
                        ? "border-amber-300/45 bg-amber-300/10 text-amber-100"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white",
                    )}
                  >
                    {chip.label} <span className="ml-1 text-zinc-600">{chip.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {showFeatured && (
          <section className="py-14 sm:py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/75">{EXTRA[locale].proof}</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{EXTRA[locale].selected}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">{EXTRA[locale].selectedIntro}</p>
                </div>
                <div className="text-xs text-zinc-600">{SHOWCASE_FEATURED.length} {EXTRA[locale].count}</div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {SHOWCASE_FEATURED.map((p, index) => (
                  <ProjectCard key={p.key} p={p} locale={locale} route={route} eager={index < 2} />
                ))}
              </div>
            </div>
          </section>
        )}

        {filter !== "featured" && (
          <section className="border-t border-white/[0.06] bg-[#030303] py-14 sm:py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">Portfolio</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{filter === "all" ? EXTRA[locale].all : chips.find((c) => c.id === filter)?.label}</h2>
                </div>
                <div className="text-xs text-zinc-600">{rest.length} {EXTRA[locale].count}</div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {rest.map((p) => (
                  <ProjectCard key={p.key} p={p} locale={locale} route={route} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-white/[0.07] py-14 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="overflow-hidden rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#080808] p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/75">{ui.finalEyebrow}</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{ui.finalTitle}</h2>
              <p className="mt-4 max-w-2xl text-zinc-400">{ui.finalBody}</p>
              <div className="mt-7">
                <PortfolioRequest locale={locale} route={route}>
                  <Button className="premium-button min-h-12 px-7">
                    {ui.finalCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </PortfolioRequest>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
