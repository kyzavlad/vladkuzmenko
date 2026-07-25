"use client";

import { ArrowRight, ArrowLeft, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import { getCaseDetail, STATUS_LABEL, STATUS_TONE, type Status } from "@/lib/portfolio";

const toneClass: Record<"green" | "amber", string> = {
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

function StatusBadge({ status, lang }: { status: Status; lang: "en" | "ua" | "ru" }) {
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

export function WorkCasePage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const locale: "en" | "ua" | "ru" = lang === "ua" || lang === "ru" ? lang : "en";
  const study = getCaseDetail(slug);
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const allWork = locale === "ua" ? "Усі роботи" : locale === "ru" ? "Все работы" : "All work";
  const builtLabel = locale === "ua" ? "Що було побудовано" : locale === "ru" ? "Что было построено" : "What was built";
  const capLabel = locale === "ua" ? "Можливості" : locale === "ru" ? "Возможности" : "Capabilities";
  const scopeLabel = locale === "ua" ? "Межі та чесність" : locale === "ru" ? "Границы и честность" : "Scope & honesty";
  const notClaimedLabel = locale === "ua" ? "Що я НЕ приписую собі" : locale === "ru" ? "Что я НЕ приписываю себе" : "Not claimed";

  if (!study) return null;
  const c = study.content[locale];

  const cta = (
    <RequestDialog
      intent="portfolio_case_request"
      title={c.ctaLabel}
      description={
        locale === "ua"
          ? "Розкажіть про ваш проєкт — я повернуся з тим, як побудував би подібне для вас."
          : locale === "ru"
            ? "Расскажите о вашем проекте — я вернусь с тем, как построил бы подобное для вас."
            : "Tell me about your project and I'll come back on how I'd build something similar for you."
      }
      submitLabel={locale === "ua" ? "Надіслати запит" : locale === "ru" ? "Отправить запрос" : "Send request"}
      successTitle={locale === "ua" ? "Запит отримано" : locale === "ru" ? "Запрос получен" : "Request received"}
      successMessage={
        locale === "ua"
          ? "Прийнято — зв'яжусь щодо створення подібного для вас."
          : locale === "ru"
            ? "Принято — свяжусь насчёт создания подобного для вас."
            : "Got it — I'll reach out about building something similar for you."
      }
      buttonLabel={`Case — ${slug}`}
      showBuildType={false}
      compact
      helpRequired
      helpLabel={locale === "ua" ? "Розкажіть про ваш проєкт" : locale === "ru" ? "Расскажите о вашем проекте" : "Tell me about your project"}
      context={{ project: slug, section: "case" }}
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
    <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="max-sm:w-full">
      <Button className="max-sm:w-full h-auto min-h-12 px-6 py-3 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
        {c.liveLabel}
        <ExternalLink className="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </a>
  ) : null;

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <section className="section-tint relative pt-36 pb-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <a
            href={`${localeBase}/work`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-amber-200 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {allWork}
          </a>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="eyebrow">{c.type}</span>
            <StatusBadge status={study.status} lang={locale} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{c.name}</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">{c.context}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {cta}
            {liveBtn}
          </div>
        </div>
      </section>

      {study.shots.length > 0 && (
        <section className="py-14 border-b border-zinc-900">
          <div className="container mx-auto px-4 max-w-5xl grid sm:grid-cols-3 gap-5">
            {study.shots.map((src, i) => (
              <figure key={src} className="luxe-card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${c.name} — ${study.captions?.[locale]?.[i] ?? c.name}`}
                  loading="lazy"
                  className="w-full h-auto border-b border-zinc-800"
                />
                {study.captions?.[locale]?.[i] && (
                  <figcaption className="px-4 py-2 text-[11px] text-gray-500">
                    {study.captions[locale][i]}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {locale === "ua" ? "Проблема" : locale === "ru" ? "Проблема" : "Problem"}
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl">{c.problem}</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-5">{builtLabel}</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {c.built.map((item) => (
                <li key={item} className="flex items-start gap-3 luxe-card px-5 py-3.5">
                  <span className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-amber-400" />
                  </span>
                  <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">{capLabel}</h2>
            <div className="flex flex-wrap gap-2">
              {c.capabilities.map((cap) => (
                <span key={cap} className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1 text-xs text-gray-300">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scope honesty — what is and is NOT claimed */}
      <section className="section-accent py-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="luxe-card p-6 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">{scopeLabel}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{c.scopeNote}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mt-4 mb-2">
                {notClaimedLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.notClaimed.map((nc) => (
                  <span key={nc} className="rounded-full border border-zinc-700 bg-black/30 px-2.5 py-0.5 text-[11px] text-gray-400">
                    {nc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tint py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {locale === "ua" ? "Хочете подібний проєкт?" : locale === "ru" ? "Хотите похожий проект?" : "Want a project like this?"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {cta}
            {liveBtn}
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}
