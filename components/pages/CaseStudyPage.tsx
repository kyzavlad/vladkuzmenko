"use client";

import { useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  getCaseStudy,
  orderedCaseStudies,
  CASE_LABELS,
  STATUS_LABEL,
  STATUS_TONE,
} from "@/lib/case-studies";

const toneClass: Record<"green" | "amber" | "blue", string> = {
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  blue: "border-sky-400/40 bg-sky-400/10 text-sky-300",
};

function StatusBadge({
  status,
  lang,
}: {
  status: keyof typeof STATUS_LABEL;
  lang: "en" | "ua" | "ru";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        toneClass[STATUS_TONE[status]],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status][lang]}
    </span>
  );
}

export function CaseStudyPage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const locale: "en" | "ua" | "ru" =
    lang === "ua" || lang === "ru" ? lang : "en";
  const study = getCaseStudy(slug);
  const L = CASE_LABELS[locale];
  const base = langHref(locale);
  const workBase = base === "/" ? "" : base;

  useEffect(() => {
    if (study) track("case_study_view", { locale, slug });
  }, [locale, slug, study]);

  if (!study) return null;
  const c = study.content[locale];

  const others = orderedCaseStudies().filter((s) => s.slug !== slug);

  const cta = (
    <RequestDialog
      intent="case_study_request"
      title={c.ctaLabel}
      description={
        locale === "ua"
          ? "Розкажіть, над чим працюєте, і я повернусь із тим, як побудував би щось подібне для вас."
          : locale === "ru"
            ? "Расскажите, над чем работаете, и я вернусь с тем, как построил бы нечто подобное для вас."
            : "Tell me what you're working on and I'll come back on how I'd build something similar for you."
      }
      submitLabel={
        locale === "ua" ? "Надіслати запит" : locale === "ru" ? "Отправить запрос" : "Send request"
      }
      successTitle={
        locale === "ua" ? "Запит отримано" : locale === "ru" ? "Запрос получен" : "Request received"
      }
      successMessage={
        locale === "ua"
          ? "Прийнято — зв'яжусь щодо створення чогось подібного для вас."
          : locale === "ru"
            ? "Принято — свяжусь насчёт создания чего-то похожего для вас."
            : "Got it — I'll reach out about building something similar for you."
      }
      buttonLabel={`Case study — ${slug}`}
      showBuildType={false}
      helpRequired
      helpLabel={
        locale === "ua"
          ? "Розкажіть про ваш проєкт"
          : locale === "ru"
            ? "Расскажите о вашем проекте"
            : "Tell me about your project"
      }
      context={{ project: slug, section: "case_study" }}
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

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="section-tint relative pt-36 pb-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <a
            href={`${workBase || "/"}#selected-work`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-amber-200 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {L.allWork}
          </a>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="eyebrow">{c.projectType}</span>
            <StatusBadge status={study.status} lang={locale} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            {c.title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
            {c.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {cta}
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer" className="max-sm:w-full">
              <Button
                className="max-sm:w-full h-auto min-h-12 px-6 py-3 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10"
              >
                {locale === "ua" ? "Забронювати дзвінок" : locale === "ru" ? "Забронировать звонок" : "Book a call"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-4">
            <OverviewCell label={L.projectType} value={c.projectType} />
            {c.audience && <OverviewCell label={L.audience} value={c.audience} />}
            {c.context && <OverviewCell label={L.context} value={c.context} />}
          </div>
        </div>
      </section>

      {/* Problem / process / outcome */}
      <section className="py-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <Block title={L.problem} text={c.problem} />
          {c.process && <Block title={L.process} text={c.process} />}
          {c.outcome && <Block title={L.outcome} text={c.outcome} />}
        </div>
      </section>

      {/* Architecture diagram */}
      {c.architecture && c.architecture.length > 0 && (
        <section className="section-accent py-16 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="h-5 w-5 text-amber-400" />
              <h2 className="text-2xl md:text-3xl font-bold">{L.architecture}</h2>
            </div>
            <ol className="flex flex-wrap items-stretch gap-2" aria-label={L.architecture}>
              {c.architecture.map((node, i) => (
                <li key={node} className="flex items-center gap-2">
                  <span className="rounded-xl border border-amber-400/20 bg-black/50 px-3.5 py-2.5 text-sm text-gray-200 leading-tight">
                    <span className="text-amber-400/70 mr-1.5 text-xs font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {node}
                  </span>
                  {i < c.architecture!.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-zinc-600 shrink-0" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* What was built */}
      <section className="py-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{L.built}</h2>
          <ul className="grid sm:grid-cols-2 gap-3.5">
            {c.built.map((item) => (
              <li key={item} className="flex items-start gap-3 luxe-card px-5 py-4">
                <span className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </span>
                <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* User journey */}
      {c.journey && c.journey.length > 0 && (
        <section className="section-accent py-16 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{L.journey}</h2>
            <ol className="space-y-3">
              {c.journey.map((step, i) => (
                <li key={step} className="flex items-start gap-3.5 luxe-card px-5 py-4">
                  <span className="inline-flex w-7 h-7 rounded-md bg-amber-400/10 items-center justify-center text-xs font-bold text-amber-300 shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-300 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Screens */}
      {study.shots.length > 0 && (
        <section className="py-16 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{L.screens}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {study.shots.map((src, i) => (
                <figure key={src} className="luxe-card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${c.title} — ${c.captions?.[i] ?? L.screens}`}
                    loading="lazy"
                    className="w-full h-auto border-b border-zinc-800"
                  />
                  {c.captions?.[i] && (
                    <figcaption className="px-4 py-3 text-xs text-gray-400">
                      {c.captions[i]}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Result + honest status */}
      <section className="section-tint py-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{L.result}</h2>
          <div className="luxe-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.16em] text-gray-500">
                {L.status}
              </span>
              <StatusBadge status={study.status} lang={locale} />
            </div>
            <p className="text-gray-300 leading-relaxed">
              {c.resultVerified ?? c.resultFallback}
            </p>
            {c.scopeNote && (
              <p className="text-xs text-gray-500 leading-relaxed mt-4 pt-4 border-t border-zinc-800">
                {c.scopeNote}
              </p>
            )}
          </div>
          {c.integrations && c.integrations.length > 0 && (
            <div className="mt-6">
              <span className="text-xs uppercase tracking-[0.16em] text-gray-500">
                {L.integrations}
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                {c.integrations.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1 text-xs text-gray-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* More case studies */}
      {others.length > 0 && (
        <section className="py-16 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-xl font-bold mb-6">{L.allWork}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((o) => {
                const oc = o.content[locale];
                return (
                  <a
                    key={o.slug}
                    href={`${workBase}/work/${o.slug}`}
                    className="luxe-card p-5 block group"
                  >
                    <div className="mb-2">
                      <StatusBadge status={o.status} lang={locale} />
                    </div>
                    <h3 className="font-semibold group-hover:text-amber-200 transition-colors">
                      {oc.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {oc.tagline}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-tint py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {locale === "ua"
              ? "Хочете подібну систему?"
              : locale === "ru"
                ? "Хотите похожую систему?"
                : "Want a system like this?"}
          </h2>
          <div className="flex justify-center">{cta}</div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}

function OverviewCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="luxe-card p-5">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-2">
        {label}
      </dt>
      <dd className="text-sm text-gray-200 leading-relaxed">{value}</dd>
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      <p className="text-gray-300 leading-relaxed max-w-3xl">{text}</p>
    </div>
  );
}
