"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { getEcosystemCopy, directionRoute } from "@/lib/ecosystem";

/** Full-width homepage preview of the private circle. No member counts, no exclusivity claims. */
export function WarriorsSection() {
  const { lang, t } = useI18n();
  const x = getEcosystemCopy(lang).warriors;
  const w = t.warriors;
  const href = directionRoute(lang, "warriors");

  return (
    <section
      id="warriors"
      className="relative scroll-mt-24 overflow-hidden border-t border-zinc-900 bg-black py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(245,190,52,.09),transparent_42%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-amber-200">
              <Flame className="h-3.5 w-3.5" />
              {x.eyebrow}
            </span>
            <h2 className="mt-5 text-4xl font-black tracking-[-.035em] sm:text-5xl">{x.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">{x.desc}</p>

            <div className="mt-7 rounded-2xl border border-white/[.08] bg-white/[.018] p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">{x.whoForLabel}</p>
              <p className="mt-2.5 text-sm leading-6 text-zinc-300">{x.whoFor}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/[.08] bg-white/[.018] p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">{x.accessLabel}</p>
              <p className="mt-2.5 text-sm leading-6 text-zinc-300">{x.access}</p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <RequestDialog
                intent="warriors_application"
                title={w.dialogTitle}
                description={w.dialogDesc}
                submitLabel={w.dialogSubmit}
                successTitle={w.dialogSuccessT}
                successMessage={w.dialogSuccessM}
                buttonLabel="Home — Warriors application"
                showBuildType={false}
                compact
                helpLabel={w.helpLabel}
                helpPlaceholder={w.helpPh}
                context={{ source: "home_warriors", locale: lang }}
              >
                <Button
                  className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto"
                  onClick={() => track("warriors_application_open", { source: "home" })}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="rounded-[26px] border border-white/[.09] bg-[#080808] p-6 sm:p-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-300/75">
              {x.principlesLabel}
            </p>
            <ul className="mt-6 space-y-4">
              {x.principles.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-200">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-6 text-zinc-300">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/[.07] pt-6">
              <div className="flex flex-wrap gap-2">
                {w.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[11px] text-zinc-300"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
