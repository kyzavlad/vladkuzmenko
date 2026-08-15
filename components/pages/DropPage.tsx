"use client";

import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, FlaskConical, Search, Utensils } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { DROP_INTENT, getEcosystemCopy } from "@/lib/ecosystem";

/**
 * Research page. Nothing here is purchasable: no price, no stock, no delivery,
 * no launch date, no macros, no certifications. Those facts do not exist yet.
 */
export function DropPage() {
  const { lang } = useI18n();
  const x = getEcosystemCopy(lang).drop;
  const route = `${lang === "en" ? "" : `/${lang}`}/drop`;

  const dialog = (source: string) => ({
    intent: DROP_INTENT,
    title: x.dialogTitle,
    description: x.dialogDesc,
    successTitle: x.successTitle,
    successMessage: x.successMessage,
    buttonLabel: `Drop — ${source}`,
    showBuildType: false,
    compact: true,
    helpLabel: x.helpLabel,
    helpPlaceholder: x.helpPlaceholder,
    context: { concept: "performance_meal_system", stage: "research", source, locale: lang, route },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-14 pt-36 sm:pb-20 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.12),transparent_36%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-amber-200">
                <FlaskConical className="h-3.5 w-3.5" />
                {x.eyebrow}
              </span>
              <span className="rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-zinc-300">
                {x.stageBadge}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.045em] sm:text-6xl">{x.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{x.lead}</p>

            <div className="mt-9">
              <RequestDialog {...dialog("hero")}>
                <Button
                  className="premium-button h-auto min-h-12 px-7 py-3"
                  onClick={() => track("drop_interest_open", { source: "drop_hero" })}
                >
                  {x.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RequestDialog>
            </div>
          </div>
        </section>

        {/* Current concept */}
        <section className="border-b border-white/[.07] py-14 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[28px] border border-white/[.09] bg-[radial-gradient(circle_at_14%_0%,rgba(245,190,52,.10),transparent_44%),#080808]"
            >
              <div className="border-b border-white/[.07] p-7 sm:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300/75">
                  {x.concept.label}
                </p>
                <div className="mt-4 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-200">
                    <Utensils className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-3xl font-black tracking-[-.035em] sm:text-4xl">{x.concept.name}</h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">{x.concept.what}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-7 sm:p-10 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                    {getEcosystemCopy(lang).products.labels.whoFor}
                  </p>
                  <p className="mt-2.5 text-sm leading-6 text-zinc-300">{x.concept.whoFor}</p>
                </div>
                <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                    {x.concept.label}
                  </p>
                  <p className="mt-2.5 text-sm leading-6 text-zinc-300">{x.concept.whyNow}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is being researched / what is not decided */}
        <section className="border-b border-white/[.07] bg-[#050505] py-14 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
              <div className="rounded-[26px] border border-white/[.09] bg-[#080808] p-7 sm:p-9">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-amber-300/75">
                  <Search className="h-3.5 w-3.5" />
                  {x.concept.researchingLabel}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {x.concept.researching.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-6 text-zinc-300">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[26px] border border-white/[.09] bg-[#080808] p-7 sm:p-9">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {x.concept.unknownLabel}
                </p>
                <p className="mt-6 text-sm leading-6 text-zinc-400">{x.concept.unknown}</p>
                <p className="mt-6 border-t border-white/[.07] pt-5 text-xs leading-6 text-zinc-500">
                  {x.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Later ideas — explicitly not in production */}
        <section className="border-b border-white/[.07] py-14 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{x.secondary.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">{x.secondary.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {x.secondary.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-sm text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#080808] p-7 sm:p-10">
              <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{x.cta}</h2>
              <p className="mt-4 max-w-2xl text-zinc-400">{x.dialogDesc}</p>
              <div className="mt-7">
                <RequestDialog {...dialog("footer")}>
                  <Button
                    className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto"
                    onClick={() => track("drop_interest_open", { source: "drop_footer" })}
                  >
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
