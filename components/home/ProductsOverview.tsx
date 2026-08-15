"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Gauge, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  promise: string;
  details: string;
  cta: string;
  secondary: string;
  demoLabel: string;
  rows: { label: string; text: string }[];
}> = {
  en: {
    eyebrow: "Software · VisibilityOS",
    titleA: "Know what your website is losing ",
    titleB: "before you redesign it.",
    desc: "VisibilityOS is a website intelligence layer for the moment when search is becoming AI-assisted and every qualified visit matters more. It checks the page through evidence, not generic advice.",
    promise: "One URL in. A prioritised view of conversion, trust, technical visibility and AI-search readiness out.",
    details: "The product is being built around a simple rule: every finding should point back to something visible or measurable on the site, then tell you what deserves attention first.",
    cta: "Open VisibilityOS",
    secondary: "See the software direction",
    demoLabel: "What the analysis is organised around",
    rows: [
      { label: "Conversion", text: "Offer clarity, CTA path, friction and handoff" },
      { label: "Trust", text: "Proof, authority, consistency and decision confidence" },
      { label: "AI + Search", text: "SEO, AEO, structure and answer-engine readiness" },
      { label: "Technical", text: "Mobile, speed, metadata and crawlability" },
    ],
  },
  ua: {
    eyebrow: "Software · VisibilityOS",
    titleA: "Зрозумійте, що втрачає сайт, ",
    titleB: "до того як переробляти його.",
    desc: "VisibilityOS — website intelligence layer для моменту, коли пошук стає AI-assisted, а кожен якісний візит має більшу цінність. Сайт перевіряється через evidence, а не загальні поради.",
    promise: "Один URL на вході. Пріоритетний розбір conversion, trust, технічної видимості та готовності до AI-search на виході.",
    details: "Принцип продукту простий: кожен висновок має спиратися на видимий або вимірюваний сигнал на сайті й показувати, що виправляти першим.",
    cta: "Відкрити VisibilityOS",
    secondary: "Подивитися software-напрям",
    demoLabel: "Навколо чого будується аналіз",
    rows: [
      { label: "Conversion", text: "Офер, CTA-шлях, тертя та передача заявки" },
      { label: "Trust", text: "Proof, authority, послідовність і довіра до рішення" },
      { label: "AI + Search", text: "SEO, AEO, структура та answer-engine readiness" },
      { label: "Technical", text: "Mobile, speed, metadata та crawlability" },
    ],
  },
  ru: {
    eyebrow: "Software · VisibilityOS",
    titleA: "Поймите, что теряет сайт, ",
    titleB: "до того как переделывать его.",
    desc: "VisibilityOS — website intelligence layer для момента, когда поиск становится AI-assisted, а каждый качественный визит ценнее. Сайт проверяется через evidence, а не общие советы.",
    promise: "Один URL на входе. Приоритетный разбор conversion, trust, технической видимости и готовности к AI-search на выходе.",
    details: "Принцип продукта простой: каждый вывод должен опираться на видимый или измеримый сигнал на сайте и показывать, что исправлять первым.",
    cta: "Открыть VisibilityOS",
    secondary: "Посмотреть software-направление",
    demoLabel: "Вокруг чего строится анализ",
    rows: [
      { label: "Conversion", text: "Оффер, CTA-путь, трение и передача заявки" },
      { label: "Trust", text: "Proof, authority, последовательность и доверие к решению" },
      { label: "AI + Search", text: "SEO, AEO, структура и answer-engine readiness" },
      { label: "Technical", text: "Mobile, speed, metadata и crawlability" },
    ],
  },
};

const icons = [Gauge, ShieldCheck, Bot, Search];

export function ProductsOverview() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  return (
    <section id="products" className="relative scroll-mt-24 overflow-hidden border-t border-zinc-900 bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(245,190,52,.10),transparent_34%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" /> {x.eyebrow}
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-.045em] sm:text-5xl md:text-6xl">
              {x.titleA}<span className="gradient-gold-text">{x.titleB}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.desc}</p>

            <div className="mt-7 rounded-2xl border border-amber-300/15 bg-amber-300/[.045] p-5">
              <p className="text-sm font-medium leading-6 text-amber-50">{x.promise}</p>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500">{x.details}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`${prefix}/visibilityos`} onClick={() => track("product_open", { product: "visibilityos", source: "home" })} className="w-full sm:w-auto">
                <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">
                  {x.cta}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href={`${prefix}/products`} className="w-full sm:w-auto">
                <Button className="h-auto min-h-12 w-full border border-white/15 bg-white/[.03] px-7 py-3 text-white hover:bg-white/[.08] sm:w-auto">
                  {x.secondary}
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="relative">
            <div className="absolute -inset-8 rounded-full bg-amber-300/[.035] blur-3xl" />
            <div className="relative overflow-hidden rounded-[30px] border border-white/[.1] bg-[#070707] shadow-[0_32px_100px_rgba(0,0,0,.45)]">
              <div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="text-xs font-bold tracking-[.08em] text-zinc-200">VisibilityOS</span>
                </div>
                <span className="text-[10px] uppercase tracking-[.18em] text-zinc-600">website intelligence</span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="rounded-2xl border border-white/[.08] bg-white/[.02] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">{x.demoLabel}</p>
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[.09] bg-black/40 px-4 py-3">
                    <Search className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-zinc-500">https://yourwebsite.com</span>
                    <span className="ml-auto rounded-full border border-amber-300/20 bg-amber-300/[.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-amber-200">scan</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {x.rows.map((row, index) => {
                    const Icon = icons[index];
                    return (
                      <div key={row.label} className="group flex items-start gap-4 rounded-2xl border border-white/[.08] bg-white/[.018] p-4 transition hover:border-amber-300/20">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[.08] bg-black/50 text-amber-300">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-zinc-100">{row.label}</div>
                          <div className="mt-1 text-xs leading-5 text-zinc-500">{row.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
