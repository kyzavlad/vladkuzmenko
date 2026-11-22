"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { PortfolioProjectGrid } from "@/components/ui/portfolio-project-grid";
import { cn } from "@/lib/utils";
import { CATEGORY_ORDER, CATEGORY_SHORT, type Category } from "@/lib/portfolio";
import { CURATED_PORTFOLIO } from "@/lib/portfolio-curated";

type Filter = "all" | Category;

const COPY = {
  en: {
    title: "Platforms, apps and websites",
    intro: "Explore product interfaces, end-to-end workflows and full-stack work in the case studies.",
    all: "All projects",
  },
  ua: {
    title: "Платформи, застосунки й сайти",
    intro: "У кейсах показано інтерфейси, робочі сценарії та приклади full-stack розробки.",
    all: "Усі проєкти",
  },
  ru: {
    title: "Платформы, приложения и сайты",
    intro: "В кейсах показаны интерфейсы, рабочие сценарии и примеры full-stack разработки.",
    all: "Все проекты",
  },
};

export function BusinessPortfolioSection() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(() => filter === "all" ? CURATED_PORTFOLIO : CURATED_PORTFOLIO.filter((project) => project.category === filter), [filter]);

  return (
    <section id="portfolio" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.055),transparent_62%)]" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-title text-[clamp(2.3rem,4vw,3.8rem)] text-zinc-100">{x.title}</h2>
          <p className="section-lead mx-auto mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.intro}</p>
        </div>

        <div className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          <button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={cn("shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition", filter === "all" ? "border-amber-300/45 bg-amber-300/10 text-amber-100" : "border-white/[.09] bg-white/[.02] text-zinc-400 hover:border-white/20 hover:text-white")}>{x.all} <span className="ml-1 text-zinc-600">{CURATED_PORTFOLIO.length}</span></button>
          {CATEGORY_ORDER.map((category) => {
            const count = CURATED_PORTFOLIO.filter((project) => project.category === category).length;
            if (!count) return null;
            return <button key={category} type="button" onClick={() => setFilter(category)} aria-pressed={filter === category} className={cn("shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition", filter === category ? "border-amber-300/45 bg-amber-300/10 text-amber-100" : "border-white/[.09] bg-white/[.02] text-zinc-400 hover:border-white/20 hover:text-white")}>{CATEGORY_SHORT[category][lang]} <span className="ml-1 text-zinc-600">{count}</span></button>;
          })}
        </div>

        <div className="mt-7">
          <PortfolioProjectGrid projects={filtered} lang={lang} featured={filter === "all"} />
        </div>
      </div>
    </section>
  );
}
