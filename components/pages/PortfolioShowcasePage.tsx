"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
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
  type Category,
} from "@/lib/portfolio";
import { CURATED_PORTFOLIO } from "@/lib/portfolio-curated";
import { PortfolioProjectGrid } from "@/components/ui/portfolio-project-grid";

type Locale = "en" | "ua" | "ru";
type Filter = "all" | Category;

const COPY = {
  en: {
    title: "Software for the way people work",
    intro:
      "Explore SaaS platforms, web products and mobile apps through their interfaces, workflows and full-stack implementations.",
    discuss: "Discuss my project",
    browse: "Browse projects",
    all: "All work",
    ctaTitle: "Have a product or process you want to improve?",
    ctaBody:
      "Tell me what you want to build or improve. I’ll suggest the most practical starting point and format.",
    cta: "Describe the project",
  },
  ua: {
    title: "Цифрові продукти для щоденної роботи",
    intro:
      "SaaS-платформи, вебсервіси й мобільні застосунки. У кейсах показано інтерфейси, робочі сценарії та приклади full-stack розробки.",
    discuss: "Обговорити мій проєкт",
    browse: "Переглянути проєкти",
    all: "Усі роботи",
    ctaTitle: "Є продукт або процес, який хочете покращити?",
    ctaBody:
      "Опишіть, що хочете створити або покращити. Я запропоную практичний перший крок і відповідний формат роботи.",
    cta: "Описати проєкт",
  },
  ru: {
    title: "Цифровые продукты для ежедневной работы",
    intro:
      "SaaS-платформы, веб-сервисы и мобильные приложения. В кейсах показаны интерфейсы, рабочие сценарии и примеры full-stack разработки.",
    discuss: "Обсудить мой проект",
    browse: "Посмотреть проекты",
    all: "Все работы",
    ctaTitle: "Есть продукт или процесс, который хотите улучшить?",
    ctaBody:
      "Опишите, что хотите создать или улучшить. Я предложу практичный первый шаг и подходящий формат работы.",
    cta: "Описать проект",
  },
} as const;

export function PortfolioShowcasePage() {
  const { lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const x = COPY[locale];
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? CURATED_PORTFOLIO
        : CURATED_PORTFOLIO.filter((project) => project.category === filter),
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
            <h1 className="max-w-5xl text-4xl font-black tracking-[-.045em] sm:text-6xl lg:text-7xl">{x.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">{x.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestDialog
                intent="portfolio_request"
                title={x.ctaTitle}
                description={x.ctaBody}
                submitLabel={x.cta}
                buttonLabel={x.discuss}
                showBuildType={false}
                compact
                allowEmailOnly
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
                aria-pressed={filter === "all"}
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
                    aria-pressed={filter === category}
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

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <PortfolioProjectGrid projects={filtered} lang={locale} featured={filter === "all"} />
          </div>
        </section>

        <section className="border-t border-white/[.07] py-14 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#080808] p-7 sm:p-10">
              <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{x.ctaTitle}</h2>
              <p className="mt-4 max-w-2xl text-zinc-400">{x.ctaBody}</p>
              <div className="mt-7">
                <RequestDialog
                  intent="portfolio_request"
                  title={x.ctaTitle}
                  description={x.ctaBody}
                  submitLabel={x.cta}
                  buttonLabel={x.cta}
                  showBuildType={false}
                  compact
                  allowEmailOnly
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
