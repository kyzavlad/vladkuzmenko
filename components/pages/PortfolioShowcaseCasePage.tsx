"use client";

import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  CASE_UI,
  CATEGORY_SHORT,
  STATUS_TONE,
  statusText,
} from "@/lib/portfolio";
import {
  getShowcaseProject,
  type ShowcaseProject,
  type ShowcaseStory,
} from "@/lib/portfolio-showcase";

type Locale = "en" | "ua" | "ru";

const EXTRA = {
  en: {
    previous: "Previous / manual process",
    desired: "Desired outcome",
    system: "System designed",
    evidence: "Evidence available",
    resultNote: "Verified result / current proof",
    visit: "Open live project",
    caseNotFound: "Case not found",
    back: "Back to all work",
    step: "Step",
  },
  ua: {
    previous: "Попередній / ручний процес",
    desired: "Бажаний результат",
    system: "Спроєктована система",
    evidence: "Доступні докази",
    resultNote: "Підтверджений результат / поточний proof",
    visit: "Відкрити живий проєкт",
    caseNotFound: "Кейс не знайдено",
    back: "Назад до всіх робіт",
    step: "Крок",
  },
  ru: {
    previous: "Предыдущий / ручной процесс",
    desired: "Желаемый результат",
    system: "Спроектированная система",
    evidence: "Доступные доказательства",
    resultNote: "Подтверждённый результат / текущий proof",
    visit: "Открыть живой проект",
    caseNotFound: "Кейс не найден",
    back: "Назад ко всем работам",
    step: "Шаг",
  },
} as const;

function defaultStory(p: ShowcaseProject, locale: Locale): ShowcaseStory {
  const c = p.content[locale];
  return {
    context: c.type,
    previous: c.problem,
    desired: c.outcome,
    system: c.built,
    flow: [c.problem, c.built, c.result],
    evidence: p.shots.length
      ? locale === "ru"
        ? "Реальные изображения / интерфейсы проекта показаны ниже."
        : locale === "ua"
          ? "Реальні зображення / інтерфейси проєкту показані нижче."
          : "Real project screens / interfaces are shown below."
      : locale === "ru"
        ? "На странице не публикуется визуальный материал, которого нет в проверенных материалах проекта."
        : locale === "ua"
          ? "На сторінці не публікується візуальний матеріал, якого немає в перевірених матеріалах проєкту."
          : "No visual asset is published unless it exists in the verified project materials.",
    resultNote: c.result,
  };
}

function StatusBadge({ p, locale }: { p: ShowcaseProject; locale: Locale }) {
  const tone = STATUS_TONE[p.status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide",
        tone === "green"
          ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
          : "border-amber-400/35 bg-amber-400/10 text-amber-200",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusText(locale, p.status, p.statusLabel)}
    </span>
  );
}

function CaseRequest({ project, locale, route }: { project: string; locale: Locale; route: string }) {
  const ui = CASE_UI[locale];
  return (
    <RequestDialog
      intent="portfolio_request"
      title={`${ui.ctaTitle} — ${project}`}
      description={ui.dialogDesc}
      submitLabel={ui.dialogSubmit}
      successTitle={ui.dialogOkTitle}
      successMessage={ui.dialogOkBody}
      buttonLabel={`Case — ${project}`}
      showBuildType={false}
      compact
      helpRequired
      helpLabel={ui.dialogHelp}
      context={{ source: "portfolio_case", project, locale, route }}
    >
      <Button className="premium-button min-h-12 px-7">
        {ui.ctaTitle}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </RequestDialog>
  );
}

export function PortfolioShowcaseCasePage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const ui = CASE_UI[locale];
  const x = EXTRA[locale];
  const p = getShowcaseProject(slug);
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const workHref = `${localeBase}/work`;

  if (!p) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="container mx-auto max-w-4xl px-4 pt-40 pb-24">
          <h1 className="text-4xl font-black">{x.caseNotFound}</h1>
          <a href={workHref} className="mt-8 inline-flex items-center text-amber-300">
            <ArrowLeft className="mr-2 h-4 w-4" /> {x.back}
          </a>
        </main>
        <FooterSection />
      </div>
    );
  }

  const c = p.content[locale];
  const story = p.story?.[locale] ?? defaultStory(p, locale);
  const route = `${workHref}/${p.caseSlug}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[0.07] pt-32 pb-10 sm:pt-40 sm:pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(90,52,180,.08),transparent_30%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <a href={workHref} className="inline-flex items-center text-sm text-zinc-500 transition hover:text-amber-300">
              <ArrowLeft className="mr-2 h-4 w-4" /> {x.back}
            </a>

            <div className="mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/75">
                  {CATEGORY_SHORT[p.category][locale]}
                </span>
                <StatusBadge p={p} locale={locale} />
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">{c.name}</h1>
              <p className="mt-3 text-sm text-zinc-500 sm:text-base">{c.type}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">{c.outcome}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="max-sm:w-full">
                    <Button className="premium-button min-h-12 max-sm:w-full px-7">
                      {x.visit}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}
                <CaseRequest project={c.name} locale={locale} route={route} />
              </div>
            </div>
          </div>
        </section>

        {p.shots[0] && (
          <section className="py-8 sm:py-12">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="group relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#080808] shadow-[0_30px_100px_rgba(0,0,0,.45)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.shots[0]}
                  alt={`${c.name} — ${c.caption ?? c.type}`}
                  className={cn(
                    "absolute inset-0 h-full w-full",
                    p.mediaFit === "contain" ? "object-contain p-3 sm:p-5" : "object-cover object-top",
                  )}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
              </div>
            </div>
          </section>
        )}

        <section className="py-10 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/[0.08] bg-[#080808] p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-zinc-600">{ui.contextLabel}</p>
                <p className="mt-3 leading-7 text-zinc-300">{story.context}</p>
              </div>
              <div className="rounded-[24px] border border-white/[0.08] bg-[#080808] p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-zinc-600">{ui.problemLabel}</p>
                <p className="mt-3 leading-7 text-zinc-300">{c.problem}</p>
              </div>
              <div className="rounded-[24px] border border-white/[0.08] bg-[#080808] p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-zinc-600">{x.previous}</p>
                <p className="mt-3 leading-7 text-zinc-300">{story.previous}</p>
              </div>
              <div className="rounded-[24px] border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,190,52,.07),#080808)] p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-amber-300/70">{x.desired}</p>
                <p className="mt-3 leading-7 text-zinc-200">{story.desired}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#040404] py-12 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/70">{ui.solutionLabel}</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{x.system}</h2>
                <p className="mt-5 leading-8 text-zinc-300">{story.system}</p>
                <div className="mt-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">{ui.builtLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{c.built}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">{ui.flowLabel}</p>
                <div className="mt-5 space-y-3">
                  {story.flow.map((step, index) => (
                    <div key={`${p.key}-step-${index}`} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-[#090909] p-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/[0.07] text-xs font-bold text-amber-200">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">{x.step} {index + 1}</p>
                        <p className="mt-1.5 leading-6 text-zinc-200">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-[26px] border border-amber-300/15 bg-[radial-gradient(circle_at_0%_0%,rgba(245,190,52,.1),transparent_45%),#080808] p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-amber-300/75">
                  <ShieldCheck className="h-4 w-4" /> {x.resultNote}
                </div>
                <p className="mt-4 text-lg leading-8 text-zinc-100">{story.resultNote}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-500">{c.result}</p>
              </div>
              <div className="rounded-[26px] border border-white/[0.08] bg-[#080808] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.19em] text-zinc-600">{x.evidence}</p>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{story.evidence}</p>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center text-sm font-semibold text-amber-300 hover:text-amber-200">
                    {x.visit}<ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-[26px] border border-white/[0.08] bg-[#080808] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.19em] text-zinc-600">{ui.capabilitiesLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.capabilities.map((cap) => (
                  <span key={cap} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-zinc-300">{cap}</span>
                ))}
              </div>
            </div>

            {p.audio && (
              <div className="mt-5 rounded-[26px] border border-white/[0.08] bg-[#080808] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.19em] text-zinc-600">Audio proof</p>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio controls preload="none" src={p.audio} className="mt-4 w-full" />
              </div>
            )}
          </div>
        </section>

        {p.shots.length > 1 && (
          <section className="border-t border-white/[0.06] bg-[#040404] py-12 sm:py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/70">{ui.galleryLabel}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{ui.galleryNote}</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {p.shots.slice(1).map((shot, index) => (
                  <div key={shot} className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#090909]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shot} alt={`${c.name} — ${index + 2}`} className="absolute inset-0 h-full w-full object-contain p-2" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-white/[0.07] py-14 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_42%),#080808] p-7 sm:p-10">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{ui.ctaTitle}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-zinc-400">{ui.ctaBody}</p>
              <div className="mt-7">
                <CaseRequest project={c.name} locale={locale} route={route} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
