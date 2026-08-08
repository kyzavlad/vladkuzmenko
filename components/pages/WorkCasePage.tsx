"use client";

import { ArrowRight, ArrowLeft, Check, ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  getCaseDetail,
  CASE_DETAILS,
  CASE_UI,
  CATEGORY_SHORT,
  STATUS_LABEL,
  STATUS_TONE,
  type Status,
} from "@/lib/portfolio";

type Locale = "en" | "ua" | "ru";

const toneClass: Record<"green" | "amber", string> = {
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

function StatusBadge({ status, lang }: { status: Status; lang: Locale }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap",
        toneClass[STATUS_TONE[status]],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
      {STATUS_LABEL[status][lang]}
    </span>
  );
}

export function WorkCasePage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const study = getCaseDetail(slug);
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const t = CASE_UI[locale];

  if (!study) return null;
  const c = study.content[locale];
  const captions = study.captions?.[locale] ?? [];
  const route = `${localeBase}/work/${slug}`;

  const cta = (
    <RequestDialog
      intent="portfolio_case_request"
      title={c.ctaLabel}
      description={t.dialogDesc}
      submitLabel={t.dialogSubmit}
      successTitle={t.dialogOkTitle}
      successMessage={t.dialogOkBody}
      buttonLabel={`Case — ${slug}`}
      showBuildType={false}
      compact
      helpRequired
      helpLabel={t.dialogHelp}
      context={{
        source: "portfolio",
        section: "case",
        project: c.name,
        case: slug,
        locale,
        route,
      }}
      className="max-sm:w-full"
    >
      <Button
        onClick={() => track("case_study_cta_click", { locale, slug })}
        className="premium-button max-sm:w-full h-auto min-h-12 px-6 py-3"
      >
        {c.ctaLabel}
        <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </RequestDialog>
  );

  const liveBtn = study.liveUrl ? (
    <a
      href={study.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="max-sm:w-full"
      onClick={() => track("case_study_live_click", { locale, slug })}
    >
      <Button className="max-sm:w-full h-auto min-h-12 px-6 py-3 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
        {c.liveLabel}
        <ExternalLink className="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </a>
  ) : null;

  const others = CASE_DETAILS.filter((o) => o.slug !== slug);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Header />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="section-tint relative pt-36 pb-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <a
            href={`${localeBase}/work`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-amber-200 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            {t.allWork}
          </a>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="eyebrow">{CATEGORY_SHORT[study.category][locale]}</span>
            <StatusBadge status={study.status} lang={locale} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 break-words">{c.name}</h1>
          <p className="text-sm text-gray-400 mb-5">{c.type}</p>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mb-8">{c.outcome}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {cta}
            {liveBtn}
          </div>
        </div>
      </section>

      {/* Lead visual — the first screen, edge to edge, natural aspect ratio. */}
      {study.shots.length > 0 && (
        <section className="!py-0 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-6xl py-10">
            <figure className="luxe-card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.shots[0]}
                alt={`${c.name} — ${captions[0] ?? c.type}`}
                decoding="async"
                className="w-full h-auto"
              />
              {captions[0] && (
                <figcaption className="px-4 sm:px-5 py-3 text-xs text-gray-500 border-t border-zinc-800">
                  {captions[0]}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      {/* ------------------------------------------------- CONTEXT / CHALLENGE */}
      <section className="py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.contextLabel}</h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl">{c.context}</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.problemLabel}</h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl">{c.problem}</p>
          </div>
          <div className="luxe-card p-6">
            <h2 className="text-xl font-bold mb-3">{t.outcomeLabel}</h2>
            <p className="text-gray-200 leading-relaxed">{c.outcome}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- WHAT WAS BUILT */}
      <section className="py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.builtLabel}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.built.map((item) => (
              <li key={item} className="flex items-start gap-3 luxe-card px-5 py-3.5 min-w-0">
                <span className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </span>
                <span className="text-sm text-gray-300 leading-relaxed break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- PRODUCT FLOW */}
      {c.flow && c.flow.length > 0 && (
        <section className="py-14 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.flowLabel}</h2>
            <ol className="flex flex-wrap items-stretch gap-2">
              {c.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-2 min-w-0">
                  <span className="luxe-card px-4 py-2.5 text-sm text-gray-200 break-words">
                    <span className="text-amber-400/70 mr-1.5 text-xs">{i + 1}</span>
                    {step}
                  </span>
                  {i < c.flow!.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-amber-400/40 shrink-0" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- CAPABILITIES */}
      <section className="py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{t.capabilitiesLabel}</h2>
          <div className="flex flex-wrap gap-2">
            {c.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-zinc-700 bg-black/40 px-3.5 py-1.5 text-sm text-gray-300"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- VISUAL WALKTHROUGH */}
      {study.shots.length > 1 && (
        <section className="py-14 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.galleryLabel}</h2>
            <p className="text-gray-400 mb-8">{t.galleryNote}</p>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              {study.shots.slice(1).map((src, i) => {
                const idx = i + 1;
                const span = study.shotSpan?.[idx] ?? "half";
                return (
                  <figure
                    key={src}
                    className={cn("luxe-card overflow-hidden", span === "full" && "md:col-span-2")}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${c.name} — ${captions[idx] ?? c.type}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto"
                    />
                    {captions[idx] && (
                      <figcaption className="px-4 sm:px-5 py-3 text-xs text-gray-500 border-t border-zinc-800">
                        {captions[idx]}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ TECHNICAL */}
      {c.tech && c.tech.length > 0 && (
        <section className="py-14 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-xl md:text-2xl font-bold mb-5">{t.techLabel}</h2>
            <div className="flex flex-wrap gap-2">
              {c.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-gray-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ PROOF & STATUS */}
      <section className="py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.proofLabel}</h2>
          <ul className="space-y-3">
            {c.proof.map((item) => (
              <li key={item} className="flex items-start gap-3 luxe-card px-5 py-3.5 min-w-0">
                <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300 leading-relaxed break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scope honesty — what is and is NOT claimed */}
      <section className="section-accent py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="luxe-card p-6 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h2 className="font-semibold mb-2">{t.scopeLabel}</h2>
              <p className="text-sm text-gray-300 leading-relaxed">{c.scopeNote}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mt-4 mb-2">
                {t.notClaimedLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.notClaimed.map((nc) => (
                  <span
                    key={nc}
                    className="rounded-full border border-zinc-700 bg-black/30 px-2.5 py-0.5 text-[11px] text-gray-400"
                  >
                    {nc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="section-tint py-20 border-b border-zinc-900">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">{t.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {cta}
            {liveBtn}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- MORE CASES */}
      {others.length > 0 && (
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-xl font-bold mb-6">{t.moreTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((o) => {
                const oc = o.content[locale];
                return (
                  <a
                    key={o.slug}
                    href={`${localeBase}/work/${o.slug}`}
                    className="luxe-card overflow-hidden block group"
                  >
                    {o.shots.length > 0 && (
                      <div className="relative aspect-[16/10] bg-black/40 border-b border-zinc-800 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={o.shots[0]}
                          alt={`${oc.name} — ${oc.type}`}
                          loading="lazy"
                          decoding="async"
                          className="media-fill"
                        />
                      </div>
                    )}
                    <div className="p-5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <StatusBadge status={o.status} lang={locale} />
                      </div>
                      <p className="font-bold group-hover:text-amber-200 transition-colors break-words">
                        {oc.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{oc.type}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </div>
  );
}
