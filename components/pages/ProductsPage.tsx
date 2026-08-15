"use client";

import { motion } from "framer-motion";
import { ArrowRight, Boxes, Search, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { getEcosystemCopy, productRoute } from "@/lib/ecosystem";
import { getGrowthCopy, DIAGNOSTIC_INTENT, growthRoute } from "@/lib/growth-systems";

const ICONS: Record<string, LucideIcon> = {
  visibilityos: Search,
  "ai-systems": Workflow,
};

/** Owned digital products. Client builds are not listed here. */
export function ProductsPage() {
  const { lang } = useI18n();
  const x = getEcosystemCopy(lang).products;
  const g = getGrowthCopy(lang);
  const route = `${lang === "en" ? "" : `/${lang}`}/products`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-14 pt-36 sm:pb-20 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.13),transparent_36%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-amber-200">
              <Boxes className="h-3.5 w-3.5" />
              {x.eyebrow}
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.045em] sm:text-6xl">{x.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{x.heroLead}</p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-500">{x.desc}</p>
          </div>
        </section>

        <section className="border-b border-white/[.07] py-14 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-5 lg:grid-cols-2">
              {x.items.map((item, i) => {
                const Icon = ICONS[item.key] ?? Search;
                const href = productRoute(lang, item.slug);
                return (
                  <motion.article
                    key={item.key}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex flex-col rounded-[28px] border border-white/[.09] bg-[#080808] p-7 sm:p-9"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-400">
                        {item.status}
                      </span>
                    </div>

                    <h2 className="mt-6 text-3xl font-black tracking-[-.035em]">{item.name}</h2>
                    <p className="mt-3 text-base leading-7 text-zinc-200">{item.tagline}</p>

                    <div className="mt-6 grid gap-3">
                      <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                          {x.labels.problem}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">{item.problem}</p>
                      </div>
                      <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                          {x.labels.whoFor}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">{item.whoFor}</p>
                      </div>
                    </div>

                    <div className="mt-7 flex-1" />
                    <a href={href} onClick={() => track("product_open", { product: item.key, source: "products_page" })}>
                      <Button className="premium-button h-auto min-h-12 w-full px-7 py-3">
                        {x.open}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </motion.article>
                );
              })}
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-6 text-zinc-500">{x.note}</p>
          </div>
        </section>

        <section className="border-b border-white/[.07] bg-[#050505] py-14 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{x.faqTitle}</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {x.faq.map((item) => (
                <div key={item.q} className="rounded-[24px] border border-white/[.09] bg-[#080808] p-6">
                  <h3 className="text-base font-semibold leading-7">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#080808] p-7 sm:p-10">
              <h2 className="max-w-3xl text-2xl font-black tracking-tight sm:text-3xl">{x.allCta}</h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <RequestDialog
                  intent={DIAGNOSTIC_INTENT}
                  title={g.diagnostic.dialogTitle}
                  description={g.diagnostic.dialogDesc}
                  buttonLabel="Products — describe situation"
                  showBuildType={false}
                  helpLabel={g.diagnostic.helpLabel}
                  helpPlaceholder={g.diagnostic.helpPlaceholder}
                  successTitle={g.diagnostic.successTitle}
                  successMessage={g.diagnostic.successMessage}
                  context={{ source: "products_page", locale: lang, route }}
                >
                  <Button
                    className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto"
                    onClick={() => track("business_cta", { source: "products_page" })}
                  >
                    {g.diagnostic.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RequestDialog>
                <a href={growthRoute(lang)} className="w-full sm:w-auto">
                  <Button className="h-auto min-h-12 w-full border border-white/15 bg-white/[.035] px-7 py-3 text-white hover:bg-white/[.08] sm:w-auto">
                    {g.hero.secondaryCta}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
