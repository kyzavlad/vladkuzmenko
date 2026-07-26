"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  PRODUCT_CASES,
  EXPERIENCE_MATRIX,
  APD_UI,
  STATUS_LABEL,
  STATUS_TONE,
  type Status,
} from "@/lib/portfolio";

const toneClass: Record<"green" | "amber", string> = {
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

function StatusBadge({ status, lang }: { status: Status; lang: "en" | "ua" | "ru" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        toneClass[STATUS_TONE[status]],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status][lang]}
    </span>
  );
}

export function AiProductDevelopmentPage() {
  const { lang } = useI18n();
  const locale: "en" | "ua" | "ru" = lang === "ua" || lang === "ru" ? lang : "en";
  const ui = APD_UI[locale];

  const mvpCta = (placement: string) => (
    <MvpDialog
      locale={locale}
      label={ui.ctaPrimary}
      onClick={() => track("primary_cta_click", { locale, page: "ai-product-development", placement })}
    />
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <section className="section-tint relative pt-36 pb-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5">{ui.heroTitle}</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-4">{ui.heroSub}</p>
          <p className="inline-flex items-center gap-2 text-sm text-amber-200/90 border border-amber-400/20 rounded-full px-3.5 py-1.5 mb-6">
            <Sparkles className="h-4 w-4 shrink-0" />
            {ui.accel}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-3xl mb-8">{ui.leadIntro}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {mvpCta("hero")}
            <a href="#technical-discovery" className="max-sm:w-full">
              <Button className="max-sm:w-full h-auto min-h-12 px-6 py-3 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
                {ui.ctaSecondary}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10">
            <span className="eyebrow">{ui.casesEyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">{ui.casesTitle}</h2>
          </div>
          <div className="space-y-8">
            {PRODUCT_CASES.map((pc) => {
              const c = pc.content[locale];
              return (
                <article key={pc.key} className="luxe-card p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <h3 className="text-2xl font-bold">{c.name}</h3>
                    <StatusBadge status={pc.status} lang={locale} />
                  </div>

                  {pc.shots.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {pc.shots.map((src, i) => (
                        <figure key={src} className="rounded-xl overflow-hidden border border-zinc-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={`${c.name} — ${c.captions?.[i] ?? c.name}`}
                            loading="lazy"
                            className="w-full h-auto border-b border-zinc-800"
                          />
                          {c.captions?.[i] && (
                            <figcaption className="px-3 py-2 text-[11px] text-gray-500">
                              {c.captions[i]}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
                    <Field label={ui.contextLabel} value={c.context} />
                    <Field label={ui.problemLabel} value={c.problem} />
                    <Field label={ui.designedLabel} value={c.designed} />
                    <Field label={ui.implementedLabel} value={c.implemented} />
                    <Field label={ui.roleLabel} value={c.role} />
                    <Field label={ui.provesLabel} value={c.proves} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-5 pt-5 border-t border-zinc-800">
                    <ChipRow label={ui.capabilitiesLabel} items={c.capabilities} />
                    <ChipRow label={ui.techLabel} items={c.technologies} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-accent py-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{ui.matrixTitle}</h2>
          <div className="luxe-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left">
                    <th className="px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-gray-500 font-medium">
                      {ui.matrixCapability}
                    </th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-gray-500 font-medium">
                      {ui.matrixProjects}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {EXPERIENCE_MATRIX.map((row, i) => (
                    <tr key={row.capability.en} className={cn(i % 2 === 1 && "bg-white/[0.02]", "align-top")}>
                      <td className="px-5 py-3 text-gray-200 font-medium whitespace-nowrap">
                        {row.capability[locale]}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {row.projects.map((p) => (
                            <span
                              key={p}
                              className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[11px] text-amber-200"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{ui.howTitle}</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ui.how.map((step, i) => (
              <li key={step} className="luxe-card p-5 flex items-start gap-3">
                <span className="inline-flex w-7 h-7 rounded-md bg-amber-400/10 items-center justify-center text-xs font-bold text-amber-300 shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-200 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="technical-discovery" className="section-accent py-16 border-b border-zinc-900 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{ui.discoveryTitle}</h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl mb-8">{ui.discoveryIntro}</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {ui.discovery.map((item) => (
              <li key={item} className="flex items-start gap-3 luxe-card px-5 py-3.5">
                <span className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </span>
                <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {mvpCta("discovery")}
            <DiscoveryDialog locale={locale} label={ui.ctaSecondary} />
          </div>
        </div>
      </section>

      <section className="section-tint py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{ui.ctaTitle}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {mvpCta("final")}
            <DiscoveryDialog locale={locale} label={ui.ctaSecondary} />
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-1">{label}</dt>
      <dd className="text-gray-300 leading-relaxed">{value}</dd>
    </div>
  );
}

function ChipRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-2">{label}</dt>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span key={it} className="rounded-full border border-zinc-700 bg-black/40 px-2.5 py-0.5 text-[11px] text-gray-300">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

const DIALOG_COPY = {
  en: {
    mvpTitle: "Discuss your MVP",
    mvpDesc: "Tell me about the product you want to build — the goal, the users and where it is today.",
    discTitle: "Start with Technical Discovery",
    discDesc: "Tell me about your idea. Technical Discovery turns it into MVP boundaries, architecture, AI logic, a roadmap, timeline and a final development estimate.",
    submit: "Send request",
    okT: "Request received",
    okM: "Got it — I'll review it and come back with a concrete next step.",
    help: "Describe your product idea",
  },
  ua: {
    mvpTitle: "Обговорити ваш MVP",
    mvpDesc: "Розкажіть про продукт, який хочете побудувати — ціль, користувачів і де він зараз.",
    discTitle: "Почати з Technical Discovery",
    discDesc: "Розкажіть про ідею. Technical Discovery перетворює її на межі MVP, архітектуру, AI-логіку, дорожню карту, терміни та фінальну оцінку розробки.",
    submit: "Надіслати запит",
    okT: "Запит отримано",
    okM: "Прийнято — перегляну й повернуся з конкретним наступним кроком.",
    help: "Опишіть ідею продукту",
  },
  ru: {
    mvpTitle: "Обсудить ваш MVP",
    mvpDesc: "Расскажите о продукте, который хотите построить — цель, пользователи и где он сейчас.",
    discTitle: "Начать с Technical Discovery",
    discDesc: "Расскажите об идее. Technical Discovery превращает её в границы MVP, архитектуру, AI-логику, дорожную карту, сроки и финальную оценку разработки.",
    submit: "Отправить запрос",
    okT: "Запрос получен",
    okM: "Принято — изучу и вернусь с конкретным следующим шагом.",
    help: "Опишите идею продукта",
  },
};

function MvpDialog({ locale, label, onClick }: { locale: "en" | "ua" | "ru"; label: string; onClick: () => void }) {
  const t = DIALOG_COPY[locale];
  return (
    <RequestDialog
      intent="ai_product_mvp_request"
      title={t.mvpTitle}
      description={t.mvpDesc}
      submitLabel={t.submit}
      successTitle={t.okT}
      successMessage={t.okM}
      buttonLabel="AI product development — Discuss MVP"
      showBuildType={false}
      compact
      helpRequired
      helpLabel={t.help}
      context={{ page: "ai-product-development", offer: "AI product / MVP development" }}
      className="max-sm:w-full"
    >
      <Button onClick={onClick} className="premium-button max-sm:w-full h-auto min-h-12 px-7 py-3">
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </RequestDialog>
  );
}

function DiscoveryDialog({ locale, label }: { locale: "en" | "ua" | "ru"; label: string }) {
  const t = DIALOG_COPY[locale];
  return (
    <RequestDialog
      intent="technical_discovery_request"
      title={t.discTitle}
      description={t.discDesc}
      submitLabel={t.submit}
      successTitle={t.okT}
      successMessage={t.okM}
      buttonLabel="AI product development — Technical Discovery"
      showBuildType={false}
      compact
      helpRequired
      helpLabel={t.help}
      context={{ page: "ai-product-development", offer: "Technical Discovery" }}
      className="max-sm:w-full"
    >
      <Button className="max-sm:w-full h-auto min-h-12 px-6 py-3 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
        {label}
      </Button>
    </RequestDialog>
  );
}
