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
  en: { previous: "Previous / manual process", desired: "Desired outcome", system: "System designed", evidence: "Evidence available", verified: "Verified result / current proof", visit: "Open live project", missing: "Case not found", back: "Back to all work", step: "Step", audio: "Real audio proof" },
  ua: { previous: "Попередній / ручний процес", desired: "Бажаний результат", system: "Спроєктована система", evidence: "Доступні докази", verified: "Підтверджений результат / поточний proof", visit: "Відкрити живий проєкт", missing: "Кейс не знайдено", back: "Назад до всіх робіт", step: "Крок", audio: "Реальний аудіодоказ" },
  ru: { previous: "Предыдущий / ручной процесс", desired: "Желаемый результат", system: "Спроектированная система", evidence: "Доступные доказательства", verified: "Подтверждённый результат / текущий proof", visit: "Открыть живой проект", missing: "Кейс не найден", back: "Назад ко всем работам", step: "Шаг", audio: "Реальное аудиодоказательство" },
} as const;

function fallbackStory(p: ShowcaseProject, locale: Locale): ShowcaseStory {
  const c = p.content[locale];
  const hasScreens = p.shots.length > 0;
  return {
    context: c.type,
    previous: c.problem,
    desired: c.outcome,
    system: c.built,
    flow: [c.problem, c.built, c.result],
    evidence: hasScreens
      ? locale === "ru" ? "Реальные изображения проекта показаны на этой странице." : locale === "ua" ? "Реальні зображення проєкту показані на цій сторінці." : "Real project images are shown on this page."
      : p.audio
        ? locale === "ru" ? "Реальная запись голосового ассистента доступна на этой странице." : locale === "ua" ? "Реальний запис голосового асистента доступний на цій сторінці." : "A real recording of the voice assistant is available on this page."
        : locale === "ru" ? "Визуальный материал не публикуется, пока его нет в проверенных материалах проекта." : locale === "ua" ? "Візуальний матеріал не публікується, доки його немає в перевірених матеріалах проєкту." : "No visual asset is published until it exists in verified project materials.",
    resultNote: c.result,
  };
}

function Badge({ p, locale }: { p: ShowcaseProject; locale: Locale }) {
  const green = STATUS_TONE[p.status] === "green";
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold", green ? "border-emerald-200/70 bg-emerald-300 text-emerald-950" : "border-amber-100/70 bg-amber-300 text-black")}><span className="h-1.5 w-1.5 rounded-full bg-current" />{statusText(locale, p.status, p.statusLabel)}</span>;
}

function CaseRequest({ locale, route, name }: { locale: Locale; route: string; name: string }) {
  const ui = CASE_UI[locale];
  return (
    <RequestDialog intent="portfolio_request" title={`${ui.ctaTitle} — ${name}`} description={ui.dialogDesc} submitLabel={ui.dialogSubmit} successTitle={ui.dialogOkTitle} successMessage={ui.dialogOkBody} buttonLabel={`Case — ${name}`} showBuildType={false} compact helpRequired helpLabel={ui.dialogHelp} context={{ source: "portfolio_case", project: name, locale, route }}>
      <Button className="premium-button min-h-12 px-7">{ui.ctaTitle}<ArrowRight className="ml-2 h-4 w-4" /></Button>
    </RequestDialog>
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

  if (!p) return <div className="min-h-screen bg-black text-white"><Header /><main className="container mx-auto max-w-4xl px-4 pt-40 pb-24"><h1 className="text-4xl font-black">{x.missing}</h1><a href={workHref} className="mt-8 inline-flex items-center text-amber-300"><ArrowLeft className="mr-2 h-4 w-4" />{x.back}</a></main><FooterSection /></div>;

  const c = p.content[locale];
  const story = p.story?.[locale] ?? fallbackStory(p, locale);
  const route = `${workHref}/${p.caseSlug}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pt-32 pb-10 sm:pt-40 sm:pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(90,52,180,.08),transparent_30%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <a href={workHref} className="inline-flex items-center text-sm text-zinc-500 hover:text-amber-300"><ArrowLeft className="mr-2 h-4 w-4" />{x.back}</a>
            <div className="mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5"><span className="text-xs font-semibold uppercase tracking-[.18em] text-amber-300/75">{CATEGORY_SHORT[p.category][locale]}</span><Badge p={p} locale={locale} /></div>
              <h1 className="mt-5 text-4xl font-black tracking-[-.04em] sm:text-6xl lg:text-7xl">{c.name}</h1>
              <p className="mt-3 text-sm text-zinc-500 sm:text-base">{c.type}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">{c.outcome}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"><Button className="premium-button min-h-12 px-7">{x.visit}<ExternalLink className="ml-2 h-4 w-4" /></Button></a>}
                <CaseRequest locale={locale} route={route} name={c.name} />
              </div>
            </div>
          </div>
        </section>

        {p.shots[0] && <section className="py-8 sm:py-12"><div className="container mx-auto max-w-6xl px-4"><div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/[.09] bg-[#070707] shadow-[0_30px_100px_rgba(0,0,0,.45)]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.shots[0]} alt={`${c.name} — ${c.caption ?? c.type}`} className={cn("absolute inset-0 h-full w-full", p.mediaFit === "contain" ? "object-contain p-3 sm:p-5" : "object-cover object-top")} /></div></div></section>}

        {p.audio && !p.shots[0] && <section className="py-8 sm:py-12"><div className="container mx-auto max-w-6xl px-4"><div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#070707] p-6 shadow-[0_30px_100px_rgba(0,0,0,.45)] sm:p-9"><p className="text-xs font-bold uppercase tracking-[.19em] text-amber-300/75">{x.audio}</p><p className="mt-3 max-w-2xl text-lg leading-7 text-zinc-300">{story.evidence}</p>{/* eslint-disable-next-line jsx-a11y/media-has-caption */}<audio controls preload="metadata" src={p.audio} className="mt-6 w-full" /></div></div></section>}

        <section className="py-10 sm:py-16"><div className="container mx-auto max-w-6xl px-4"><div className="grid gap-4 md:grid-cols-2">
          {[[ui.contextLabel, story.context], [ui.problemLabel, c.problem], [x.previous, story.previous], [x.desired, story.desired]].map(([label, body], index) => <div key={label} className={cn("rounded-[24px] border p-6 sm:p-7", index === 3 ? "border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,190,52,.07),#080808)]" : "border-white/[.08] bg-[#080808]")}><p className={cn("text-[10px] font-semibold uppercase tracking-[.19em]", index === 3 ? "text-amber-300/70" : "text-zinc-600")}>{label}</p><p className="mt-3 leading-7 text-zinc-300">{body}</p></div>)}
        </div></div></section>

        <section className="border-y border-white/[.06] bg-[#040404] py-12 sm:py-20"><div className="container mx-auto max-w-6xl px-4"><div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/70">{ui.solutionLabel}</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{x.system}</h2><p className="mt-5 leading-8 text-zinc-300">{story.system}</p><div className="mt-7 rounded-2xl border border-white/[.08] bg-white/[.025] p-5"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-600">{ui.builtLabel}</p><p className="mt-2 text-sm leading-6 text-zinc-300">{c.built}</p></div></div>
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-zinc-600">{ui.flowLabel}</p><div className="mt-5 space-y-3">{story.flow.map((step, index) => <div key={`${p.key}-${index}`} className="flex gap-4 rounded-2xl border border-white/[.08] bg-[#090909] p-5"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/[.07] text-xs font-bold text-amber-200">{index + 1}</div><div><p className="text-[10px] uppercase tracking-[.18em] text-zinc-600">{x.step} {index + 1}</p><p className="mt-1.5 leading-6 text-zinc-200">{step}</p></div></div>)}</div></div>
        </div></div></section>

        <section className="py-12 sm:py-20"><div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-5 lg:grid-cols-3"><div className="rounded-[26px] border border-amber-300/15 bg-[radial-gradient(circle_at_0%_0%,rgba(245,190,52,.1),transparent_45%),#080808] p-6 sm:p-8 lg:col-span-2"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.19em] text-amber-300/75"><ShieldCheck className="h-4 w-4" />{x.verified}</div><p className="mt-4 text-lg leading-8 text-zinc-100">{story.resultNote}</p><p className="mt-4 text-sm leading-6 text-zinc-500">{c.result}</p></div><div className="rounded-[26px] border border-white/[.08] bg-[#080808] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.19em] text-zinc-600">{x.evidence}</p><p className="mt-4 text-sm leading-7 text-zinc-300">{story.evidence}</p>{p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center text-sm font-semibold text-amber-300">{x.visit}<ExternalLink className="ml-2 h-3.5 w-3.5" /></a>}</div></div>
          <div className="mt-5 rounded-[26px] border border-white/[.08] bg-[#080808] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.19em] text-zinc-600">{ui.capabilitiesLabel}</p><div className="mt-4 flex flex-wrap gap-2">{c.capabilities.map((cap) => <span key={cap} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-xs text-zinc-300">{cap}</span>)}</div></div>
          {p.audio && p.shots[0] && <div className="mt-5 rounded-[26px] border border-white/[.08] bg-[#080808] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.19em] text-zinc-600">{x.audio}</p>{/* eslint-disable-next-line jsx-a11y/media-has-caption */}<audio controls preload="none" src={p.audio} className="mt-4 w-full" /></div>}
        </div></section>

        {p.shots.length > 1 && <section className="border-t border-white/[.06] bg-[#040404] py-12 sm:py-20"><div className="container mx-auto max-w-6xl px-4"><p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/70">{ui.galleryLabel}</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{ui.galleryNote}</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{p.shots.slice(1).map((shot, index) => <div key={shot} className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-white/[.08] bg-[#090909]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={shot} alt={`${c.name} — ${index + 2}`} className="absolute inset-0 h-full w-full object-contain p-2" loading="lazy" /></div>)}</div></div></section>}

        <section className="border-t border-white/[.07] py-14 sm:py-20"><div className="container mx-auto max-w-5xl px-4"><div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_42%),#080808] p-7 sm:p-10"><h2 className="text-3xl font-black tracking-tight sm:text-4xl">{ui.ctaTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-zinc-400">{ui.ctaBody}</p><div className="mt-7"><CaseRequest locale={locale} route={route} name={c.name} /></div></div></div></section>
      </main>
      <FooterSection />
    </div>
  );
}
