"use client";

import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import { CASE_UI, CATEGORY_SHORT, STATUS_TONE, statusText } from "@/lib/portfolio";
import { type ShowcaseProject, type ShowcaseStory } from "@/lib/portfolio-showcase";
import { getCuratedProject } from "@/lib/portfolio-curated";

type Locale = "en" | "ua" | "ru";

const COPY = {
  en: {
    previous: "Before the project",
    desired: "Goal",
    system: "What was built",
    evidence: "Project materials",
    verified: "Result",
    visit: "Open live project",
    missing: "Case not found",
    back: "Back to all work",
    step: "Step",
    audio: "Voice assistant demo",
    full: "Open image",
    proof: "Project gallery",
    proofNote: "Main screens and details from the project.",
  },
  ua: {
    previous: "До проєкту",
    desired: "Завдання",
    system: "Що було зроблено",
    evidence: "Матеріали проєкту",
    verified: "Результат",
    visit: "Відкрити живий проєкт",
    missing: "Кейс не знайдено",
    back: "Назад до всіх робіт",
    step: "Крок",
    audio: "Аудіодемо асистента",
    full: "Відкрити зображення",
    proof: "Галерея проєкту",
    proofNote: "Основні екрани та деталі проєкту.",
  },
  ru: {
    previous: "До проекта",
    desired: "Задача",
    system: "Что было сделано",
    evidence: "Материалы проекта",
    verified: "Результат",
    visit: "Открыть живой проект",
    missing: "Кейс не найден",
    back: "Назад ко всем работам",
    step: "Шаг",
    audio: "Аудиодемо ассистента",
    full: "Открыть изображение",
    proof: "Галерея проекта",
    proofNote: "Основные экраны и детали проекта.",
  },
} as const;

function fallbackStory(p: ShowcaseProject, locale: Locale): ShowcaseStory {
  const c = p.content[locale];
  const hasScreens = p.shots.length > 0;
  return {
    context: c.type,
    previous: c.problem,
    desired: c.outcome,
    system: c.built,
    flow: [c.problem, c.built, c.value],
    evidence: hasScreens
      ? locale === "ru"
        ? "Материалы проекта доступны на этой странице."
        : locale === "ua"
          ? "Матеріали проєкту доступні на цій сторінці."
          : "Project materials are available on this page."
      : p.audio
        ? locale === "ru"
          ? "Аудиодемо проекта доступно на этой странице."
          : locale === "ua"
            ? "Аудіодемо проєкту доступне на цій сторінці."
            : "The project audio demo is available on this page."
        : locale === "ru"
          ? "Описание проекта представлено на этой странице."
          : locale === "ua"
            ? "Опис проєкту представлений на цій сторінці."
            : "The project is described on this page.",
    resultNote: c.value,
  };
}

function Badge({ p, locale }: { p: ShowcaseProject; locale: Locale }) {
  const green = STATUS_TONE[p.status] === "green";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-white/[.035] px-3 py-1.5 text-[11px] font-semibold text-zinc-200",
        green ? "border-emerald-300/20" : "border-amber-300/20",
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", green ? "bg-emerald-300" : "bg-amber-300")} />
      {statusText(locale, p.status, p.statusLabel)}
    </span>
  );
}

function CaseRequest({ locale, route, name }: { locale: Locale; route: string; name: string }) {
  const ui = CASE_UI[locale];
  return (
    <RequestDialog
      intent="portfolio_request"
      title={`${ui.ctaTitle} — ${name}`}
      description={ui.dialogDesc}
      submitLabel={ui.dialogSubmit}
      successTitle={ui.dialogOkTitle}
      successMessage={ui.dialogOkBody}
      buttonLabel={`Case — ${name}`}
      showBuildType={false}
      compact
      helpRequired
      helpLabel={ui.dialogHelp}
      context={{ source: "portfolio_case", project: name, locale, route }}
    >
      <Button className="premium-button min-h-12 px-7">
        {ui.ctaTitle}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </RequestDialog>
  );
}

function ProofImage({ shot, name, label, eager = false }: { shot: string; name: string; label: string; eager?: boolean }) {
  return (
    <a
      href={shot}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[260px] items-start justify-center overflow-hidden rounded-[26px] border border-white/[.09] bg-[#070707] p-3 shadow-[0_24px_80px_rgba(0,0,0,.32)] sm:p-5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot}
        alt={name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="max-h-[820px] w-full object-contain object-top transition duration-500 group-hover:scale-[1.003]"
      />
      <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3.5 py-2 text-[11px] font-semibold text-white shadow-xl backdrop-blur-md transition group-hover:border-amber-300/35 group-hover:text-amber-200">
        {label}
        <ExternalLink className="h-3.5 w-3.5" />
      </span>
    </a>
  );
}

export function PortfolioShowcaseCasePage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const ui = CASE_UI[locale];
  const x = COPY[locale];
  const p = getCuratedProject(slug);
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const workHref = `${localeBase}/work`;

  if (!p) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="container mx-auto max-w-4xl px-4 pb-24 pt-40">
          <h1 className="text-4xl font-black">{x.missing}</h1>
          <a href={workHref} className="mt-8 inline-flex items-center text-amber-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {x.back}
          </a>
        </main>
        <FooterSection />
      </div>
    );
  }

  const c = p.content[locale];
  const story = p.story?.[locale] ?? fallbackStory(p, locale);
  const route = `${workHref}/${p.caseSlug}`;
  const proofShots = p.caseShots?.length ? p.caseShots : p.shots;
  const materialsText = proofShots.length > 0
    ? locale === "ru"
      ? "Изображения проекта доступны в галерее выше."
      : locale === "ua"
        ? "Зображення проєкту доступні в галереї вище."
        : "Project images are available in the gallery above."
    : p.audio
      ? locale === "ru"
        ? "Аудиодемо проекта доступно на этой странице."
        : locale === "ua"
          ? "Аудіодемо проєкту доступне на цій сторінці."
          : "The project audio demo is available on this page."
      : p.liveUrl
        ? locale === "ru"
          ? "Проект можно открыть по ссылке на этой странице."
          : locale === "ua"
            ? "Проєкт можна відкрити за посиланням на цій сторінці."
            : "The project can be opened from the link on this page."
        : locale === "ru"
          ? "Описание и детали проекта представлены в этом кейсе."
          : locale === "ua"
            ? "Опис і деталі проєкту представлені в цьому кейсі."
            : "The project description and details are included in this case.";

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-10 pt-32 sm:pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(90,52,180,.08),transparent_30%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <a href={workHref} className="inline-flex items-center text-sm text-zinc-500 hover:text-amber-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {x.back}
            </a>
            <div className="mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-[.18em] text-amber-300/75">
                  {CATEGORY_SHORT[p.category][locale]}
                </span>
                <Badge p={p} locale={locale} />
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-[-.04em] sm:text-6xl lg:text-7xl">{c.name}</h1>
              <p className="mt-3 text-sm text-zinc-500 sm:text-base">{c.type}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">{c.outcome}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="premium-button min-h-12 px-7">
                      {x.visit}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}
                <CaseRequest locale={locale} route={route} name={c.name} />
              </div>
            </div>
          </div>
        </section>

        {proofShots.length > 0 && (
          <section className="py-8 sm:py-12">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/70">{x.proof}</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">{x.proofNote}</p>
              </div>
              <div className="space-y-5">
                {proofShots.map((shot, index) => (
                  <ProofImage
                    key={shot}
                    shot={shot}
                    name={`${c.name} — ${c.caption ?? c.type} — ${index + 1}`}
                    label={x.full}
                    eager={index === 0}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {p.audio && proofShots.length === 0 && (
          <section className="py-8 sm:py-12">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#070707] p-6 shadow-[0_30px_100px_rgba(0,0,0,.45)] sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[.19em] text-amber-300/75">{x.audio}</p>
                <p className="mt-3 max-w-2xl text-lg leading-7 text-zinc-300">{materialsText}</p>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio controls preload="metadata" src={p.audio} className="mt-6 w-full" />
              </div>
            </div>
          </section>
        )}

        <section className="py-10 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                [ui.contextLabel, story.context],
                [ui.problemLabel, c.problem],
                [x.previous, story.previous],
                [x.desired, story.desired],
              ].map(([label, body], index) => (
                <div
                  key={label}
                  className={cn(
                    "rounded-[24px] border p-6 sm:p-7",
                    index === 3
                      ? "border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,190,52,.07),#080808)]"
                      : "border-white/[.08] bg-[#080808]",
                  )}
                >
                  <p className={cn("text-[10px] font-semibold uppercase tracking-[.19em]", index === 3 ? "text-amber-300/70" : "text-zinc-600")}>{label}</p>
                  <p className="mt-3 leading-7 text-zinc-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/[.06] bg-[#040404] py-12 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/70">{ui.solutionLabel}</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{x.system}</h2>
                <p className="mt-5 leading-8 text-zinc-300">{story.system}</p>
                <div className="mt-7 rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-600">{ui.builtLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{c.built}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-zinc-600">{ui.flowLabel}</p>
                <div className="mt-5 space-y-3">
                  {story.flow.map((step, index) => (
                    <div key={`${p.key}-${index}`} className="flex gap-4 rounded-2xl border border-white/[.08] bg-[#090909] p-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/[.07] text-xs font-bold text-amber-200">{index + 1}</div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[.18em] text-zinc-600">{x.step} {index + 1}</p>
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
              <div className="rounded-[26px] border border-amber-300/15 bg-[radial-gradient(circle_at_0%_0%,rgba(245,190,52,.1),transparent_45%),#080808] p-6 sm:p-8 lg:col-span-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.19em] text-amber-300/75">
                  <ShieldCheck className="h-4 w-4" />
                  {x.verified}
                </div>
                <p className="mt-4 text-lg leading-8 text-zinc-100">{c.value}</p>
              </div>
              <div className="rounded-[26px] border border-white/[.08] bg-[#080808] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[.19em] text-zinc-600">{x.evidence}</p>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{materialsText}</p>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center text-sm font-semibold text-amber-300">
                    {x.visit}
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-[26px] border border-white/[.08] bg-[#080808] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[.19em] text-zinc-600">{ui.capabilitiesLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.capabilities.map((cap) => (
                  <span key={cap} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-xs text-zinc-300">{cap}</span>
                ))}
              </div>
            </div>

            {p.audio && proofShots.length > 0 && (
              <div className="mt-5 rounded-[26px] border border-white/[.08] bg-[#080808] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[.19em] text-zinc-600">{x.audio}</p>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio controls preload="none" src={p.audio} className="mt-4 w-full" />
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-white/[.06] py-14 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{ui.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">{ui.ctaBody}</p>
            <div className="mt-7 flex justify-center">
              <CaseRequest locale={locale} route={route} name={c.name} />
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
