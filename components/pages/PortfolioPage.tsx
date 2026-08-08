"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ArrowDown, ExternalLink, ShieldCheck } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  PORTFOLIO,
  FEATURED,
  CATEGORY_ORDER,
  CATEGORY_LABEL,
  CATEGORY_SHORT,
  PORTFOLIO_UI,
  STATUS_LABEL,
  STATUS_TONE,
  EXPERIENCE_MATRIX,
  type Category,
  type PortfolioCard,
  type Status,
} from "@/lib/portfolio";

type Locale = "en" | "ua" | "ru";
type Filter = "all" | "featured" | Category;

const toneClass: Record<"green" | "amber", string> = {
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

function StatusBadge({ status, lang }: { status: Status; lang: Locale }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        toneClass[STATUS_TONE[status]],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
      {STATUS_LABEL[status][lang]}
    </span>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.slice(0, 5).map((cap) => (
        <span
          key={cap}
          className="rounded-full border border-zinc-700 bg-black/40 px-2.5 py-0.5 text-[11px] text-gray-300"
        >
          {cap}
        </span>
      ))}
    </div>
  );
}

/** Portfolio lead dialog — always carries portfolio attribution context. */
function PortfolioRequest({
  locale,
  route,
  project,
  section,
  title,
  children,
  className,
}: {
  locale: Locale;
  route: string;
  project?: string;
  section: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ui = PORTFOLIO_UI[locale];
  return (
    <RequestDialog
      intent="portfolio_request"
      title={title ?? ui.dialogTitle}
      description={ui.dialogDesc}
      submitLabel={ui.dialogSubmit}
      successTitle={ui.dialogOkTitle}
      successMessage={ui.dialogOkBody}
      buttonLabel={project ? `Portfolio — ${project}` : `Portfolio — ${section}`}
      showBuildType={false}
      compact
      helpRequired
      helpLabel={ui.dialogHelp}
      context={{
        source: "portfolio",
        section,
        locale,
        route,
        ...(project ? { project } : {}),
      }}
      className={className}
    >
      {children}
    </RequestDialog>
  );
}

function CardActions({
  p,
  locale,
  route,
  full,
}: {
  p: PortfolioCard;
  locale: Locale;
  route: string;
  full?: boolean;
}) {
  const ui = PORTFOLIO_UI[locale];
  const c = p.content[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const caseHref = p.caseSlug ? `${localeBase}/work/${p.caseSlug}` : undefined;

  return (
    <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-2.5">
      {caseHref && (
        <a
          href={caseHref}
          className="max-sm:w-full"
          onClick={() => track("portfolio_case_open", { locale, project: p.key })}
        >
          <Button className={cn("premium-button max-sm:w-full h-auto min-h-11 px-5", full && "sm:px-7")}>
            {ui.viewCase}
            <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </a>
      )}
      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:w-full"
          onClick={() => track("portfolio_live_open", { locale, project: p.key })}
        >
          <Button className="max-sm:w-full h-auto min-h-11 px-5 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
            {ui.live}
            <ExternalLink className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </a>
      )}
      {!caseHref && (
        <PortfolioRequest
          locale={locale}
          route={route}
          project={c.name}
          section="card"
          title={`${ui.dialogTitle} — ${c.name}`}
          className="max-sm:w-full"
        >
          <Button className="max-sm:w-full h-auto min-h-11 px-5 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
            {ui.requestSimilar}
          </Button>
        </PortfolioRequest>
      )}
    </div>
  );
}

function Shot({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  // globals.css forces `.h-full { height: auto !important }`, so `h-full` cannot be
  // used to fill a container. Absolute inset-0 fills reliably instead.
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("media-fill", className)}
    />
  );
}

/** Big editorial card — image on one side, story on the other. */
function FeatureCard({
  p,
  locale,
  route,
  flip,
  priority,
}: {
  p: PortfolioCard;
  locale: Locale;
  route: string;
  flip?: boolean;
  priority?: boolean;
}) {
  const ui = PORTFOLIO_UI[locale];
  const c = p.content[locale];
  return (
    <article className="luxe-card overflow-hidden">
      <div className={cn("grid lg:grid-cols-2 items-stretch", flip && "lg:[&>figure]:order-2")}>
        {p.shots.length > 0 && (
          <figure className="relative bg-black/40 border-b lg:border-b-0 lg:border-r border-zinc-800 min-w-0 lg:min-h-[440px]">
            {/* On lg the figure is a stretched grid item; fill it absolutely so the
                visual always spans the full height of the card. */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
              <Shot src={p.shots[0]} alt={`${c.name} — ${c.caption ?? c.type}`} priority={priority} />
            </div>
          </figure>
        )}
        <div className="p-6 sm:p-8 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] uppercase tracking-[0.16em] text-amber-300/80">
              {CATEGORY_SHORT[p.category][locale]}
            </span>
            <StatusBadge status={p.status} lang={locale} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-1.5 break-words">{c.name}</h3>
          <p className="text-sm text-gray-400 mb-5">{c.type}</p>

          <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-5">{c.outcome}</p>

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-0.5">{ui.problemLabel}</dt>
              <dd className="text-gray-400 leading-relaxed">{c.problem}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-0.5">{ui.builtLabel}</dt>
              <dd className="text-gray-300 leading-relaxed">{c.built}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <Tags items={c.capabilities} />
          </div>

          <CardActions p={p} locale={locale} route={route} full />
        </div>
      </div>
    </article>
  );
}

/** Standard grid card. */
function ProjectCard({ p, locale, route }: { p: PortfolioCard; locale: Locale; route: string }) {
  const ui = PORTFOLIO_UI[locale];
  const c = p.content[locale];
  return (
    <article className="luxe-card overflow-hidden flex flex-col self-start">
      {p.shots.length > 0 && (
        <figure className="border-b border-zinc-800 bg-black/40">
          <div className="relative aspect-[16/10]">
            <Shot src={p.shots[0]} alt={`${c.name} — ${c.caption ?? c.type}`} />
          </div>
        </figure>
      )}
      <div className="p-6 flex flex-col flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11px] uppercase tracking-[0.16em] text-amber-300/80">
            {CATEGORY_SHORT[p.category][locale]}
          </span>
          <StatusBadge status={p.status} lang={locale} />
        </div>
        <h3 className="text-xl font-bold mb-1 break-words">{c.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{c.type}</p>

        <p className="text-sm text-gray-200 leading-relaxed mb-4">{c.outcome}</p>

        <div className="text-sm flex-1">
          <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-0.5">{ui.builtLabel}</p>
          <p className="text-gray-400 leading-relaxed">{c.built}</p>
        </div>

        <div className="mt-4">
          <Tags items={c.capabilities} />
        </div>

        <CardActions p={p} locale={locale} route={route} />
      </div>
    </article>
  );
}

export function PortfolioPage() {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const ui = PORTFOLIO_UI[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const route = `${localeBase}/work`;
  const productHref = localeBase ? `${localeBase}/ai-product-development` : "/ai-product-development";

  const [filter, setFilter] = useState<Filter>("all");

  const chips = useMemo(() => {
    const list: { id: Filter; label: string; count: number }[] = [
      { id: "all", label: ui.filterAll, count: PORTFOLIO.length },
      { id: "featured", label: ui.filterFeatured, count: FEATURED.length },
    ];
    for (const cat of CATEGORY_ORDER) {
      const count = PORTFOLIO.filter((p) => p.category === cat).length;
      if (count > 0) list.push({ id: cat, label: CATEGORY_SHORT[cat][locale], count });
    }
    return list;
  }, [locale, ui.filterAll, ui.filterFeatured]);

  const showFeaturedBlock = filter === "all" || filter === "featured";
  const rest = useMemo(() => {
    if (filter === "featured") return [];
    if (filter === "all") return PORTFOLIO.filter((p) => p.featured == null);
    return PORTFOLIO.filter((p) => p.category === filter);
  }, [filter]);

  const heroCta = (
    <PortfolioRequest locale={locale} route={route} section="hero" className="max-sm:w-full">
      <Button
        onClick={() => track("portfolio_hero_cta", { locale })}
        className="premium-button max-sm:w-full h-auto min-h-12 px-7 py-3 text-base"
      >
        {ui.heroPrimary}
        <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </PortfolioRequest>
  );

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Header />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="section-tint relative pt-36 pb-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <span className="eyebrow">{ui.eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-3 mb-5 max-w-4xl">{ui.title}</h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-5">{ui.intro}</p>

          <p className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed max-w-2xl mb-8">
            <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{ui.trustLine}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {heroCta}
            <a href="#work" className="max-sm:w-full">
              <Button className="max-sm:w-full h-auto min-h-12 px-7 py-3 text-base bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
                {ui.heroSecondary}
                <ArrowDown className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- FILTERS */}
      <section id="work" className="!py-0 border-b border-zinc-900 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div
            className="flex gap-2 overflow-x-auto py-5 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
            role="tablist"
            aria-label={ui.allWorkTitle}
          >
            {chips.map((chip) => {
              const active = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(chip.id);
                    track("portfolio_filter", { locale, filter: String(chip.id) });
                  }}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap min-h-10",
                    active
                      ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                      : "border-zinc-700 bg-black/40 text-gray-300 hover:border-amber-400/40 hover:text-white",
                  )}
                >
                  {chip.label}
                  <span className="ml-1.5 text-[11px] text-gray-500">{chip.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ FEATURED */}
      {showFeaturedBlock && FEATURED.length > 0 && (
        <section className="py-14 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-400/50 shrink-0" />
              {ui.featuredTitle}
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl">{ui.featuredIntro}</p>

            <div className="space-y-6">
              {/* Lead case — full editorial width */}
              <FeatureCard p={FEATURED[0]} locale={locale} route={route} priority />

              {/* Two-up */}
              {FEATURED.length > 2 && (
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  {FEATURED.slice(1, 3).map((p) => (
                    <ProjectCard key={p.key} p={p} locale={locale} route={route} />
                  ))}
                </div>
              )}
              {FEATURED.length === 2 && (
                <ProjectCard p={FEATURED[1]} locale={locale} route={route} />
              )}

              {/* Fourth case — mirrored editorial row */}
              {FEATURED.length > 3 && (
                <FeatureCard p={FEATURED[3]} locale={locale} route={route} flip />
              )}

              {/* Anything beyond four featured falls into a grid */}
              {FEATURED.length > 4 && (
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  {FEATURED.slice(4).map((p) => (
                    <ProjectCard key={p.key} p={p} locale={locale} route={route} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ ALL WORK */}
      {rest.length > 0 && (
        <section className="py-14 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-400/50 shrink-0" />
              {filter === "all" || filter === "featured"
                ? ui.allWorkTitle
                : CATEGORY_LABEL[filter as Category][locale]}
            </h2>
            {(filter === "all" || filter === "featured") && (
              <p className="text-gray-400 mb-8 max-w-2xl">{ui.allWorkIntro}</p>
            )}
            <div className={cn("grid md:grid-cols-2 gap-6 items-start", filter !== "all" && "mt-8")}>
              {rest.map((p) => (
                <ProjectCard key={p.key} p={p} locale={locale} route={route} />
              ))}
            </div>
          </div>
        </section>
      )}

      {rest.length === 0 && !showFeaturedBlock && (
        <section className="py-20 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <p className="text-gray-400">{ui.emptyFilter}</p>
          </div>
        </section>
      )}

      {/* -------------------------------------------------- CAPABILITY MATRIX */}
      <section className="py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400/50 shrink-0" />
            {ui.capsTitle}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl">{ui.capsIntro}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {EXPERIENCE_MATRIX.map((row) => (
              <div key={row.capability.en} className="luxe-card p-4 min-w-0">
                <p className="font-semibold text-sm mb-1.5 break-words">{row.capability[locale]}</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gray-500 mb-1">{ui.capsWhere}</p>
                <p className="text-sm text-gray-400 break-words">{row.projects.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CLOSING */}
      <section className="section-tint py-20 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ui.ctaTitle}</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">{ui.ctaBody}</p>
          <div className="flex justify-center">
            <PortfolioRequest locale={locale} route={route} section="footer" className="max-sm:w-full">
              <Button
                onClick={() => track("portfolio_footer_cta", { locale })}
                className="premium-button max-sm:w-full h-auto min-h-12 px-8 py-3 text-base"
              >
                {ui.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </PortfolioRequest>
          </div>
        </div>
      </section>

      <section className="section-accent py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-lg text-gray-300 mb-5">{ui.productCta}</p>
          <a href={productHref} className="inline-block">
            <Button className="h-auto min-h-12 px-7 py-3 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
              {ui.productCtaBtn}
              <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
            </Button>
          </a>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
