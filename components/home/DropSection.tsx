"use client";

import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { DROP_INTENT, directionRoute, getEcosystemCopy } from "@/lib/ecosystem";

/**
 * Consumer-product research, not a shop. No prices, no stock, no scarcity,
 * no availability and no launch date — because none of those exist.
 */
export function DropSection() {
  const { lang } = useI18n();
  const x = getEcosystemCopy(lang).drop;
  const href = directionRoute(lang, "drop");

  return (
    <section
      id="drop"
      className="relative scroll-mt-24 border-t border-zinc-900 bg-black py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-white/[.09] bg-[radial-gradient(circle_at_16%_0%,rgba(245,190,52,.10),transparent_44%),#080808]"
        >
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="border-b border-white/[.07] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300/80">
                  <FlaskConical className="h-3.5 w-3.5" />
                  {x.eyebrow}
                </span>
                <span className="rounded-full border border-amber-300/25 bg-amber-300/[.07] px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-amber-200">
                  {x.stageBadge}
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-[-.035em] sm:text-4xl">{x.homeTitle}</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300">{x.homeDesc}</p>

              <div className="mt-7 rounded-2xl border border-white/[.08] bg-white/[.018] p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">
                  {x.concept.label}
                </p>
                <p className="mt-2.5 text-lg font-bold tracking-tight text-white">{x.concept.name}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{x.concept.what}</p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <RequestDialog
                  intent={DROP_INTENT}
                  title={x.dialogTitle}
                  description={x.dialogDesc}
                  successTitle={x.successTitle}
                  successMessage={x.successMessage}
                  buttonLabel="Home — Drop research list"
                  showBuildType={false}
                  compact
                  helpLabel={x.helpLabel}
                  helpPlaceholder={x.helpPlaceholder}
                  context={{ concept: "performance_meal_system", stage: "research", source: "home_drop", locale: lang }}
                >
                  <Button
                    className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto"
                    onClick={() => track("drop_interest_open", { source: "home" })}
                  >
                    {x.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RequestDialog>
                <a href={href} className="w-full sm:w-auto">
                  <Button className="h-auto min-h-12 w-full border border-white/15 bg-white/[.035] px-7 py-3 text-white hover:bg-white/[.08] sm:w-auto">
                    {x.open}
                  </Button>
                </a>
              </div>
            </div>

            <div className="p-7 sm:p-10">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-amber-300/75">
                <Search className="h-3.5 w-3.5" />
                {x.concept.researchingLabel}
              </p>
              <ul className="mt-5 space-y-3">
                {x.concept.researching.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-zinc-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-white/[.07] pt-5 text-xs leading-6 text-zinc-500">
                {x.disclaimer}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
