"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref } from "@/lib/i18n";
import {
  FEATURED,
  PORTFOLIO_UI,
  CATEGORY_SHORT,
  STATUS_TONE,
  statusText,
  type PortfolioCard,
} from "@/lib/portfolio";

type Locale = "en" | "ua" | "ru";

/** The homepage shows a preview only — the three strongest projects.
 *  Everything comes from the canonical portfolio data, so a project tells the
 *  same story here, on /work and on its case page. */
const HOME_COUNT = 3;

const toneClass: Record<"green" | "amber", string> = {
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

function Preview({ p, locale, i }: { p: PortfolioCard; locale: Locale; i: number }) {
  const ui = PORTFOLIO_UI[locale];
  const c = p.content[locale];
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const href = p.caseSlug ? `${localeBase}/work/${p.caseSlug}` : `${localeBase}/work`;
  const flip = i % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="luxe-card overflow-hidden"
    >
      <div className={cn("grid lg:grid-cols-2 items-stretch", flip && "lg:[&>figure]:order-2")}>
        {p.shots.length > 0 && (
          <figure className="relative bg-black/40 border-b lg:border-b-0 lg:border-r border-zinc-800 min-w-0 lg:min-h-[420px]">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.shots[0]}
                alt={`${c.name} — ${c.caption ?? c.type}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="media-fill"
              />
            </div>
          </figure>
        )}

        <div className="p-6 sm:p-8 lg:p-10 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-[11px] uppercase tracking-[0.16em] text-amber-300/80">
              {CATEGORY_SHORT[p.category][locale]}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
                toneClass[STATUS_TONE[p.status]],
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
              {statusText(locale, p.status, p.statusLabel)}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-1.5 break-words">{c.name}</h3>
          <p className="text-sm text-gray-400 mb-5">{c.type}</p>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-5">{c.outcome}</p>

          <div className="text-sm">
            <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-1">{ui.builtLabel}</p>
            <p className="text-gray-400 leading-relaxed">{c.built}</p>
          </div>

          <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/[0.04] p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-amber-300/80 mb-1.5">
              {ui.resultLabel}
            </p>
            <p className="text-sm text-gray-100 leading-relaxed">{c.result}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {c.capabilities.slice(0, 5).map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-zinc-700 bg-black/40 px-2.5 py-0.5 text-[11px] text-gray-300"
              >
                {cap}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <a href={href} className="max-sm:block">
              <Button className="premium-button max-sm:w-full h-auto min-h-11 px-6">
                {p.caseSlug ? ui.viewCase : ui.allWorkTitle}
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SelectedWork() {
  const { t, lang } = useI18n();
  const locale: Locale = lang === "ua" || lang === "ru" ? lang : "en";
  const base = langHref(locale);
  const workHref = base === "/" ? "/work" : `${base}/work`;
  const allLabel =
    locale === "ua" ? "Переглянути всі роботи" : locale === "ru" ? "Смотреть все работы" : "View all work";
  const projects = FEATURED.slice(0, HOME_COUNT);

  return (
    <section
      id="selected-work"
      className="section-accent relative py-24 md:py-32 bg-black border-t border-zinc-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow">{t.selected.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            {t.selected.titleA}
            <span className="gradient-gold-text">{t.selected.titleB}</span>
          </h2>
          <p className="text-lg text-gray-400">{t.selected.desc}</p>
        </motion.div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <Preview key={p.key} p={p} locale={locale} i={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href={workHref}>
            <Button className="premium-button h-auto min-h-12 px-7 py-3">
              {allLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
