"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  PORTFOLIO,
  CATEGORY_ORDER,
  CATEGORY_LABEL,
  PORTFOLIO_UI,
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

export function PortfolioPage() {
  const { lang } = useI18n();
  const locale: "en" | "ua" | "ru" = lang === "ua" || lang === "ru" ? lang : "en";
  const ui = PORTFOLIO_UI[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const productHref = localeBase
    ? `${localeBase}/ai-product-development`
    : "/ai-product-development";

  const categoriesWithProjects = CATEGORY_ORDER.filter((cat) =>
    PORTFOLIO.some((p) => p.category === cat),
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <section className="section-tint relative pt-36 pb-14 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <span className="eyebrow">{ui.eyebrow}</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-4">{ui.title}</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">{ui.intro}</p>
        </div>
      </section>

      {categoriesWithProjects.map((cat) => {
        const projects = PORTFOLIO.filter((p) => p.category === cat);
        return (
          <section key={cat} className="py-14 border-b border-zinc-900">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-amber-400/50" />
                {CATEGORY_LABEL[cat][locale]}
              </h2>
              <div className="grid md:grid-cols-2 gap-5 items-start">
                {projects.map((p) => {
                  const c = p.content[locale];
                  const caseHref = p.caseSlug ? `${localeBase}/work/${p.caseSlug}` : undefined;
                  return (
                    <article key={p.key} className="luxe-card overflow-hidden flex flex-col self-start">
                      {p.shots.length > 0 && (
                        <figure className="border-b border-zinc-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.shots[0]}
                            alt={`${c.name} — ${c.caption ?? c.type}`}
                            loading="lazy"
                            className="w-full h-auto"
                          />
                          {c.caption && (
                            <figcaption className="px-4 py-2 text-[11px] text-gray-500">
                              {c.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <h3 className="text-xl font-bold">{c.name}</h3>
                          <StatusBadge status={p.status} lang={locale} />
                        </div>
                        <p className="text-xs uppercase tracking-wide text-amber-300/80 mb-4">
                          {c.type}
                        </p>

                        <dl className="space-y-3 text-sm flex-1">
                          <div>
                            <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-0.5">
                              {ui.problemLabel}
                            </dt>
                            <dd className="text-gray-300 leading-relaxed">{c.problem}</dd>
                          </div>
                          <div>
                            <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-0.5">
                              {ui.builtLabel}
                            </dt>
                            <dd className="text-gray-300 leading-relaxed">{c.built}</dd>
                          </div>
                        </dl>

                        <div className="mt-4">
                          <dt className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-2">
                            {ui.capabilitiesLabel}
                          </dt>
                          <div className="flex flex-wrap gap-1.5">
                            {c.capabilities.map((cap) => (
                              <span
                                key={cap}
                                className="rounded-full border border-zinc-700 bg-black/40 px-2.5 py-0.5 text-[11px] text-gray-300"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-2.5">
                          {caseHref && (
                            <a href={caseHref} className="max-sm:w-full">
                              <Button className="premium-button max-sm:w-full h-auto min-h-11 px-5">
                                {ui.viewCase}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {p.liveUrl && (
                            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="max-sm:w-full">
                              <Button className="max-sm:w-full h-auto min-h-11 px-5 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
                                {ui.live}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {!caseHref && !p.liveUrl && (
                            <RequestSimilar project={c.name} locale={locale} label={ui.requestSimilar} />
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-accent py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-lg text-gray-300 mb-5">{ui.productCta}</p>
          <a href={productHref} className="inline-block">
            <Button className="premium-button h-auto min-h-12 px-7 py-3">
              {ui.productCtaBtn}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

function RequestSimilar({
  project,
  locale,
  label,
}: {
  project: string;
  locale: "en" | "ua" | "ru";
  label: string;
}) {
  const t = {
    en: {
      title: `Request a system like ${project}`,
      desc: "Tell me what you're working on and I'll come back on how I'd build something similar for you.",
      submit: "Send request",
      okT: "Request received",
      okM: "Got it — I'll reach out about building something similar for you.",
      help: "Tell me about your project",
    },
    ua: {
      title: `Замовити систему як ${project}`,
      desc: "Розкажіть, над чим працюєте, і я повернусь із тим, як побудував би щось подібне для вас.",
      submit: "Надіслати запит",
      okT: "Запит отримано",
      okM: "Прийнято — зв'яжусь щодо створення чогось подібного для вас.",
      help: "Розкажіть про ваш проєкт",
    },
    ru: {
      title: `Заказать систему как ${project}`,
      desc: "Расскажите, над чем работаете, и я вернусь с тем, как построил бы нечто подобное для вас.",
      submit: "Отправить запрос",
      okT: "Запрос получен",
      okM: "Принято — свяжусь насчёт создания чего-то похожего для вас.",
      help: "Расскажите о вашем проекте",
    },
  }[locale];
  return (
    <RequestDialog
      intent="portfolio_request"
      title={t.title}
      description={t.desc}
      submitLabel={t.submit}
      successTitle={t.okT}
      successMessage={t.okM}
      buttonLabel={`Portfolio — ${project}`}
      showBuildType={false}
      compact
      helpRequired
      helpLabel={t.help}
      context={{ project, section: "portfolio" }}
      className="max-sm:w-full"
    >
      <Button className="max-sm:w-full h-auto min-h-11 px-5 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10">
        {label}
      </Button>
    </RequestDialog>
  );
}
