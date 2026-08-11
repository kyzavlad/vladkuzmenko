"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  ExternalLink,
  Layers3,
  Mic2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  CATEGORY_ORDER,
  CATEGORY_SHORT,
  STATUS_TONE,
  statusText,
  type Category,
} from "@/lib/portfolio";
import { CURATED_PORTFOLIO } from "@/lib/portfolio-curated";
import type { ShowcaseProject } from "@/lib/portfolio-showcase";

type Locale = "en" | "ua" | "ru";
type Filter = "all" | Category;

const COPY = {
  en: {
    eyebrow: "Selected work",
    title: "Products built to work, not just look finished",
    intro:
      "SaaS platforms, AI products, automation, marketplaces and conversion websites — ordered by the strength of the business problem solved and the proof that exists today.",
    honesty: "Every project shows its real build stage. Real product evidence, no invented metrics.",
    discuss: "Discuss my project",
    browse: "Browse projects",
    all: "All work",
    allTitle: "Projects",
    allIntro: "The strongest operational and client products first, then focused product and interface concepts.",
    result: "Verified result",
    problem: "Business problem",
    built: "System / product delivered",
    capabilities: "What is inside",
    case: "Open case study",
    live: "Open live site",
    audio: "Real voice demo",
    audioHint: "Listen to the actual assistant before opening the full case.",
    voiceProof: "Verified voice proof",
    voiceProofTitle: "A real AI call, not a mockup",
    voiceProofBody: "Ikorka is demonstrated with the actual recorded assistant. The audio stays attached to this project so the proof is unambiguous.",
    noVisual: "Verified project",
    noVisualBody: "The product story is documented; no unverified screenshot is used as decoration.",
    projects: "projects",
    ctaEyebrow: "Portfolio",
    ctaTitle: "Have a product or process that should work better?",
    ctaBody:
      "Send the situation as it is today. I’ll map the bottleneck, the smallest useful build and the proof needed before a larger rollout.",
    cta: "Describe the project",
  },
  ua: {
    eyebrow: "Вибрані роботи",
    title: "Продукти, створені працювати, а не просто виглядати завершеними",
    intro:
      "SaaS-платформи, AI-продукти, автоматизація, маркетплейси та конверсійні сайти — відсортовані за силою вирішеної бізнес-проблеми й доказами, які існують сьогодні.",
    honesty: "Кожен проєкт має реальний етап розробки. Реальні докази продукту, без вигаданих метрик.",
    discuss: "Обговорити мій проєкт",
    browse: "Переглянути проєкти",
    all: "Усі роботи",
    allTitle: "Проєкти",
    allIntro: "Спочатку найсильніші операційні та клієнтські продукти, далі — сфокусовані продуктові й інтерфейсні концепти.",
    result: "Підтверджений результат",
    problem: "Бізнес-проблема",
    built: "Створена система / продукт",
    capabilities: "Що всередині",
    case: "Відкрити кейс",
    live: "Відкрити живий сайт",
    audio: "Реальне голосове демо",
    audioHint: "Послухайте реального асистента ще до відкриття повного кейсу.",
    voiceProof: "Підтверджений голосовий proof",
    voiceProofTitle: "Реальний AI-дзвінок, а не макет",
    voiceProofBody: "Ikorka показана реальною записаною розмовою асистента. Аудіо залишається саме в цьому проєкті, щоб proof був однозначним.",
    noVisual: "Підтверджений проєкт",
    noVisualBody: "Історія продукту задокументована; неперевірений скриншот не використовується як декор.",
    projects: "проєктів",
    ctaEyebrow: "Portfolio",
    ctaTitle: "Є продукт або процес, який має працювати краще?",
    ctaBody:
      "Надішліть ситуацію такою, як вона є зараз. Я визначу вузьке місце, найменший корисний build і proof, потрібний перед більшим rollout.",
    cta: "Описати проєкт",
  },
  ru: {
    eyebrow: "Избранные работы",
    title: "Продукты, созданные работать, а не просто выглядеть завершёнными",
    intro:
      "SaaS-платформы, AI-продукты, автоматизация, маркетплейсы и конверсионные сайты — отсортированы по силе решённой бизнес-проблемы и доказательствам, которые существуют сегодня.",
    honesty: "У каждого проекта указан реальный этап. Реальные доказательства продукта, без выдуманных метрик.",
    discuss: "Обсудить мой проект",
    browse: "Посмотреть проекты",
    all: "Все работы",
    allTitle: "Проекты",
    allIntro: "Сначала самые сильные операционные и клиентские продукты, затем сфокусированные продуктовые и интерфейсные концепты.",
    result: "Подтверждённый результат",
    problem: "Бизнес-проблема",
    built: "Созданная система / продукт",
    capabilities: "Что внутри",
    case: "Открыть кейс",
    live: "Открыть живой сайт",
    audio: "Реальное голосовое демо",
    audioHint: "Послушайте реального ассистента ещё до открытия полного кейса.",
    voiceProof: "Подтверждённый голосовой proof",
    voiceProofTitle: "Реальный AI-звонок, а не макет",
    voiceProofBody: "Ikorka показана реальной записью разговора ассистента. Аудио находится именно в этом проекте, чтобы proof нельзя было перепутать.",
    noVisual: "Подтверждённый проект",
    noVisualBody: "История продукта задокументирована; непроверенный скриншот не используется как декор.",
    projects: "проектов",
    ctaEyebrow: "Portfolio",
    ctaTitle: "Есть продукт или процесс, который должен работать лучше?",
    ctaBody:
      "Пришлите ситуацию как она есть сейчас. Я разложу узкое место, минимальный полезный build и proof, который нужен до более крупного rollout.",
    cta: "Описать проект",
  },
} as const;

function StatusBadge({ p, locale }: { p: ShowcaseProject; locale: Locale }) {
  const green = STATUS_TONE[p.status] === "green";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold shadow-sm",
        green
          ? "border-emerald-200/70 bg-emerald-300 text-emerald-950 shadow-emerald-400/10"
          : "border-amber-100/70 bg-amber-300 text-black shadow-amber-300/10",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusText(locale, p.status, p.statusLabel)}
    </span>
  );
}

function VoiceProof({ locale }: { locale: Locale }) {
  const x = COPY[locale];
  return (
    <div className="relative aspect-[16/8.4] overflow-hidden bg-[radial-gradient(circle_at_20%_25%,rgba(245,190,52,.18),transparent_28%),radial-gradient(circle_at_80%_65%,rgba(109,40,217,.16),transparent_32%),#050505]">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-3xl rounded-[28px] border border-amber-300/20 bg-black/55 p-6 shadow-[0_24px_100px_rgba(0,0,0,.5)] backdrop-blur-xl sm:p-9">
          <div className="flex items-center gap-3 text-amber-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10">
              <Mic2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300/70">{x.voiceProof}</p>
              <p className="mt-1 text-lg font-black text-white sm:text-2xl">{x.voiceProofTitle}</p>
            </div>
          </div>
          <div className="mt-7 flex h-16 items-center justify-center gap-1.5 sm:h-20 sm:gap-2">
            {[32, 56, 42, 74, 48, 88, 62, 96, 54, 82, 44, 70, 38, 58, 34].map((height, index) => (
              <span
                key={index}
                className="w-1.5 rounded-full bg-gradient-to-t from-amber-500/45 to-amber-200 sm:w-2"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-zinc-400 sm:text-base">{x.voiceProofBody}</p>
        </div>
      </div>
    </div>
  );
}

function Media({ p, locale, eager }: { p: ShowcaseProject; locale: Locale; eager?: boolean }) {
  const c = p.content[locale];
  const shot = p.shots[0];
  if (!shot && p.audio) return <VoiceProof locale={locale} />;

  if (!shot) {
    const x = COPY[locale];
    return (
      <div className="relative aspect-[16/8.4] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(245,190,52,.12),transparent_30%),#050505]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div>
            <Layers3 className="mx-auto h-8 w-8 text-amber-300/65" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[.2em] text-amber-300/70">{x.noVisual}</p>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-zinc-500">{x.noVisualBody}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/8.4] overflow-hidden bg-[#050505]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot}
        alt={`${c.name} — ${c.caption ?? c.type}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.012]",
          p.mediaFit === "contain" ? "object-contain p-3 sm:p-5" : "object-cover object-top",
        )}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.06]" />
    </div>
  );
}

function Card({ p, locale, index }: { p: ShowcaseProject; locale: Locale; index: number }) {
  const x = COPY[locale];
  const c = p.content[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const href = p.caseSlug ? `${localeBase}/work/${p.caseSlug}` : `${localeBase}/work`;

  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/[.09] bg-[#080808] shadow-[0_28px_100px_rgba(0,0,0,.34)] transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/22">
      <Media p={p} locale={locale} eager={index < 2} />

      <div className="border-t border-white/[.07] p-5 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <StatusBadge p={p} locale={locale} />
          <span className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-amber-200/80">
            {CATEGORY_SHORT[p.category][locale]}
          </span>
          <span className="ml-auto hidden text-[10px] font-semibold uppercase tracking-[.16em] text-zinc-700 sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div>
            <h2 className="text-3xl font-black tracking-[-.035em] sm:text-4xl lg:text-[42px]">{c.name}</h2>
            <p className="mt-2 text-sm text-zinc-500 sm:text-base">{c.type}</p>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-zinc-100 sm:text-xl">{c.outcome}</p>

            <div className="mt-7 rounded-2xl border border-amber-300/15 bg-[linear-gradient(135deg,rgba(245,190,52,.075),rgba(255,255,255,.018))] p-5 sm:p-6">
              <div className="mb-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-amber-300/80">
                <ShieldCheck className="h-3.5 w-3.5" />
                {x.result}
              </div>
              <p className="text-[15px] leading-7 text-zinc-200 sm:text-base">{c.result}</p>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">{x.problem}</p>
              <p className="mt-2.5 text-sm leading-6 text-zinc-400 sm:text-[15px]">{c.problem}</p>
            </div>
            <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">{x.built}</p>
              <p className="mt-2.5 text-sm leading-6 text-zinc-300 sm:text-[15px]">{c.built}</p>
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-white/[.07] pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">{x.capabilities}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.capabilities.map((cap) => (
              <span key={cap} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[11px] text-zinc-300 sm:text-xs">
                {cap}
              </span>
            ))}
          </div>
        </div>

        {p.audio && (
          <div className="mt-7 rounded-2xl border border-amber-300/15 bg-black/45 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AudioLines className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[.17em] text-amber-200">{x.audio}</p>
                <p className="mt-1 text-sm text-zinc-500">{x.audioHint}</p>
              </div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls preload="metadata" src={p.audio} className="mt-4 w-full" />
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 border-t border-white/[.07] pt-6 sm:flex-row">
          <a href={href} className="sm:w-auto">
            <Button className="premium-button min-h-12 w-full px-7 sm:w-auto">
              {x.case}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="sm:w-auto">
              <Button className="min-h-12 w-full border border-white/15 bg-white/[.035] px-7 text-white hover:bg-white/[.08] sm:w-auto">
                {x.live}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function PortfolioShowcasePage() {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const x = COPY[locale];
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? CURATED_PORTFOLIO : CURATED_PORTFOLIO.filter((project) => project.category === filter)),
    [filter],
  );

  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const route = `${localeBase}/work`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-14 pt-36 sm:pb-20 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.13),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(109,40,217,.09),transparent_28%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
              {x.eyebrow}
            </span>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-.045em] sm:text-6xl lg:text-7xl">{x.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">{x.intro}</p>
            <p className="mt-5 flex max-w-3xl items-start gap-2.5 text-sm leading-6 text-zinc-500">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              {x.honesty}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestDialog
                intent="portfolio_request"
                title={x.ctaTitle}
                description={x.ctaBody}
                submitLabel={x.cta}
                successTitle={x.ctaTitle}
                successMessage={x.ctaBody}
                buttonLabel={x.discuss}
                showBuildType={false}
                compact
                context={{ source: "portfolio_index", locale, route }}
              >
                <Button className="premium-button min-h-12 px-7">
                  {x.discuss}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RequestDialog>
              <a href="#portfolio-grid">
                <Button className="min-h-12 border border-white/15 bg-white/[.035] px-7 text-white hover:bg-white/[.08]">
                  {x.browse}
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="portfolio-grid" className="scroll-mt-24 border-b border-white/[.07] bg-[#050505]">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 py-5 sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                  filter === "all"
                    ? "border-amber-300/45 bg-amber-300/10 text-amber-100"
                    : "border-white/10 bg-white/[.02] text-zinc-400 hover:border-white/20 hover:text-white",
                )}
              >
                {x.all} <span className="ml-1 text-zinc-600">{CURATED_PORTFOLIO.length}</span>
              </button>
              {CATEGORY_ORDER.map((category) => {
                const count = CURATED_PORTFOLIO.filter((project) => project.category === category).length;
                if (!count) return null;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                      filter === category
                        ? "border-amber-300/45 bg-amber-300/10 text-amber-100"
                        : "border-white/10 bg-white/[.02] text-zinc-400 hover:border-white/20 hover:text-white",
                    )}
                  >
                    {CATEGORY_SHORT[category][locale]} <span className="ml-1 text-zinc-600">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-18 lg:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300/70">{x.all}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{x.allTitle}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">{x.allIntro}</p>
              </div>
              <span className="text-xs text-zinc-600">{filtered.length} {x.projects}</span>
            </div>

            <div className="space-y-8 sm:space-y-10">
              {filtered.map((project, index) => (
                <Card key={project.key} p={project} locale={locale} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.07] py-14 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#080808] p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/75">{x.ctaEyebrow}</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{x.ctaTitle}</h2>
              <p className="mt-4 max-w-2xl text-zinc-400">{x.ctaBody}</p>
              <div className="mt-7">
                <RequestDialog
                  intent="portfolio_request"
                  title={x.ctaTitle}
                  description={x.ctaBody}
                  submitLabel={x.cta}
                  successTitle={x.ctaTitle}
                  successMessage={x.ctaBody}
                  buttonLabel={x.cta}
                  showBuildType={false}
                  compact
                  context={{ source: "portfolio_index_bottom", locale, route }}
                >
                  <Button className="premium-button min-h-12 px-7">
                    {x.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RequestDialog>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
