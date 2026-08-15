"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Megaphone, Repeat, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { langHref } from "@/lib/i18n";
import {
  DIAGNOSTIC_INTENT,
  ENGINE_INTENT,
  ENGINE_LABEL,
  ENGINE_ORDER,
  engineAnchor,
  getGrowthCopy,
  growthRoute,
  type EngineKey,
} from "@/lib/growth-systems";

const ENGINE_ICON: Record<EngineKey, LucideIcon> = {
  traffic: Megaphone,
  conversion: Workflow,
  growth: Repeat,
};

/**
 * Homepage positioning block: the three growth systems, then a short diagnostic
 * that lets a visitor pick a business situation instead of a technology.
 */
export function GrowthSystems() {
  const { lang } = useI18n();
  const x = getGrowthCopy(lang);
  const base = langHref(lang);
  const page = growthRoute(lang);
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked === null ? null : x.diagnostic.paths[picked];

  return (
    <section
      id="client-systems"
      className="section-accent relative scroll-mt-24 border-t border-zinc-900 bg-black py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="eyebrow">{x.home.eyebrow}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {x.home.titleA}
            <span className="gradient-gold-text">{x.home.titleB}</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-400">{x.home.desc}</p>
        </motion.div>

        {/* Three systems, separated by the business problem they solve */}
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {ENGINE_ORDER.map((key, i) => {
            const e = x.engines.items[key];
            const Icon = ENGINE_ICON[key];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="luxe-card flex flex-col p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10">
                    <Icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-zinc-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight">{ENGINE_LABEL[key]}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-amber-200/90">{e.bottleneck}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-400">{e.outcome}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {e.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[11px] text-zinc-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 border-t border-white/[.07] pt-5">
                  <RequestDialog
                    intent={ENGINE_INTENT[key]}
                    title={e.cta}
                    description={x.engines.dialogDesc}
                    buttonLabel={`Home — ${ENGINE_LABEL[key]}`}
                    showBuildType={false}
                    helpLabel={x.engines.helpLabel}
                    helpPlaceholder={x.engines.helpPlaceholder}
                    successTitle={x.engines.successTitle}
                    successMessage={x.engines.successMessage}
                    context={{ offer: ENGINE_INTENT[key], source: "home_growth_systems", locale: lang, route: base }}
                  >
                    <Button
                      className="premium-button h-auto min-h-11 w-full px-5 py-2.5 text-sm"
                      onClick={() => track("engine_select", { engine: key, source: "home" })}
                    >
                      {e.cta}
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </RequestDialog>
                  <a
                    href={`${page}#${engineAnchor(key)}`}
                    className="inline-flex items-center justify-center gap-1 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
                  >
                    {x.home.details}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Diagnostic: pick a business situation, not a tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-6xl rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_18%_0%,rgba(245,190,52,.10),transparent_42%),#080808] p-7 sm:p-10"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-amber-300/80">
                <Compass className="h-3.5 w-3.5" />
                {x.diagnostic.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{x.home.diagnosticTitle}</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-400">{x.home.diagnosticDesc}</p>
          </div>

          <div className="mt-7 grid gap-3 lg:grid-cols-3">
            {x.diagnostic.paths.map((path, i) => {
              const active = picked === i;
              return (
                <button
                  key={path.value}
                  type="button"
                  onClick={() => setPicked(active ? null : i)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-2xl border p-5 text-left transition duration-300",
                    active
                      ? "border-amber-300/45 bg-amber-300/[.07]"
                      : "border-white/[.08] bg-white/[.018] hover:border-amber-300/25 hover:bg-white/[.03]",
                  )}
                >
                  <p className="text-base font-semibold leading-6 text-white">{path.situation}</p>
                  <p className="mt-2.5 text-sm leading-6 text-gray-400">{path.detail}</p>
                  <span
                    className={cn(
                      "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[.14em] transition-colors",
                      active ? "text-amber-200" : "text-zinc-400",
                    )}
                  >
                    {x.diagnostic.startWith} {ENGINE_LABEL[path.engine]}
                  </span>
                </button>
              );
            })}
          </div>

          {chosen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 flex flex-col gap-5 rounded-2xl border border-white/[.09] bg-black/50 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300/75">
                  {x.home.recommended}
                </p>
                <p className="mt-2 text-xl font-bold tracking-tight">{ENGINE_LABEL[chosen.engine]}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {x.engines.items[chosen.engine].outcome}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <RequestDialog
                  intent={DIAGNOSTIC_INTENT}
                  title={x.diagnostic.dialogTitle}
                  description={x.diagnostic.dialogDesc}
                  buttonLabel={`Home — Diagnostic (${ENGINE_LABEL[chosen.engine]})`}
                  showBuildType={false}
                  helpLabel={x.diagnostic.helpLabel}
                  helpPlaceholder={x.diagnostic.helpPlaceholder}
                  successTitle={x.diagnostic.successTitle}
                  successMessage={x.diagnostic.successMessage}
                  context={{
                    offer: ENGINE_INTENT[chosen.engine],
                    situation: chosen.value,
                    source: "home_growth_diagnostic",
                    locale: lang,
                    route: base,
                  }}
                >
                  <Button className="premium-button h-auto min-h-11 w-full px-6 py-2.5 sm:w-auto">
                    {x.diagnostic.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RequestDialog>
                <a href={`${page}#${engineAnchor(chosen.engine)}`} className="w-full sm:w-auto">
                  <Button className="h-auto min-h-11 w-full border border-white/15 bg-white/[.035] px-6 py-2.5 text-white hover:bg-white/[.08] sm:w-auto">
                    {x.home.details}
                  </Button>
                </a>
              </div>
            </motion.div>
          )}

          <div className="mt-7 text-center sm:text-left">
            <a
              href={page}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-200"
            >
              {x.home.seeAll}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
