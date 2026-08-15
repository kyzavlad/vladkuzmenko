"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, Megaphone, Repeat, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { InteractiveSurface, SignalFlow } from "@/components/ui/premium-interaction";
import { SelectedWork } from "@/components/home/SelectedWork";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { langHref } from "@/lib/i18n";
import {
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

const ACCENT: Record<EngineKey, "gold" | "blue" | "violet"> = {
  traffic: "gold",
  conversion: "blue",
  growth: "violet",
};

const TONE: Record<EngineKey, { active: string; text: string; dot: string }> = {
  traffic: {
    active: "border-amber-300/22 bg-amber-300/[.055]",
    text: "text-amber-300/80",
    dot: "bg-amber-300",
  },
  conversion: {
    active: "border-sky-300/22 bg-sky-300/[.05]",
    text: "text-sky-200/80",
    dot: "bg-sky-300",
  },
  growth: {
    active: "border-violet-300/22 bg-violet-300/[.05]",
    text: "text-violet-200/80",
    dot: "bg-violet-300",
  },
};

export function GrowthSystems() {
  const { lang } = useI18n();
  const x = getGrowthCopy(lang);
  const base = langHref(lang);
  const page = growthRoute(lang);
  const [active, setActive] = useState<EngineKey>("traffic");
  const e = x.engines.items[active];
  const Icon = ENGINE_ICON[active];

  return (
    <section
      id="client-systems"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#030303] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,190,52,.08),transparent_62%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="eyebrow">{x.home.eyebrow}</span>
          <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-.045em] sm:text-5xl md:text-6xl">
            {x.home.titleA}
            <span className="gradient-gold-text">{x.home.titleB}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            {x.home.desc}
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="grid gap-2 rounded-[22px] border border-white/[.08] bg-white/[.02] p-2 sm:grid-cols-3">
            {ENGINE_ORDER.map((key, index) => {
              const TabIcon = ENGINE_ICON[key];
              const selected = key === active;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive(key);
                    track("engine_select", { engine: key, source: "home_workspace" });
                  }}
                  className={`relative min-h-[94px] overflow-hidden rounded-2xl border px-4 py-4 text-left transition-colors ${
                    selected ? TONE[key].active : "border-transparent hover:bg-white/[.035]"
                  }`}
                >
                  {selected && (
                    <motion.div
                      layoutId="growth-engine-active"
                      className="absolute inset-0 rounded-2xl border border-white/[.08]"
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[.08] bg-black/25">
                      <TabIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold tracking-[.18em] text-zinc-600">0{index + 1}</p>
                      <p className="mt-1 text-xs font-bold tracking-[.1em] text-zinc-300 sm:text-sm">{ENGINE_LABEL[key]}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: .32 }}
            >
              <InteractiveSurface
                accent={ACCENT[active]}
                lift={false}
                className="mt-4 rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012))] shadow-[0_40px_100px_-45px_rgba(0,0,0,.95)]"
              >
                <div className="grid lg:grid-cols-[1.03fr_.97fr]">
                  <div className="min-w-0 border-b border-white/[.07] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[.09] bg-black/30">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-bold tracking-[.2em] text-zinc-700">
                        0{ENGINE_ORDER.indexOf(active) + 1}
                      </span>
                    </div>

                    <p className={cn("mt-7 text-[10px] font-bold uppercase tracking-[.2em]", TONE[active].text)}>
                      {ENGINE_LABEL[active]}
                    </p>
                    <h3 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-.04em] text-white sm:text-4xl">
                      {e.bottleneck}
                    </h3>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                      {e.outcome}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {e.chips.map((chip, index) => (
                        <div
                          key={chip}
                          className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.018] px-4 py-3"
                        >
                          <span className={cn("h-2 w-2 shrink-0 rounded-full", index === 0 ? TONE[active].dot : "bg-white/20")} />
                          <span className="text-sm text-zinc-300">{chip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between p-7 sm:p-9 lg:p-10">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                        {x.home.systemView}
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">{ENGINE_LABEL[active]}</p>

                      <div className="mt-7 overflow-x-auto pb-2">
                        <SignalFlow nodes={e.chips.slice(0, 3)} accent={ACCENT[active]} compact />
                      </div>

                      {/* What the engine actually contains — real scope, not measured data. */}
                      <ul className="mt-8 space-y-px">
                        {e.build.slice(0, 4).map((line, index) => (
                          <motion.li
                            key={line}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: .4, delay: .1 + index * .07 }}
                            className="relative flex gap-4 py-3"
                          >
                            <span className="relative flex w-6 shrink-0 justify-center">
                              {index < Math.min(e.build.length, 4) - 1 && (
                                <span
                                  aria-hidden="true"
                                  className="absolute left-1/2 top-5 h-[calc(100%+.75rem)] w-px -translate-x-1/2 bg-white/[.08]"
                                />
                              )}
                              <span className={cn("relative mt-1.5 h-2 w-2 rounded-full", TONE[active].dot)} />
                            </span>
                            <span className="text-[13px] leading-6 text-zinc-400">{line}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <RequestDialog
                        intent={ENGINE_INTENT[active]}
                        title={e.cta}
                        description={x.engines.dialogDesc}
                        buttonLabel={`Home workspace - ${ENGINE_LABEL[active]}`}
                        showBuildType={false}
                        helpLabel={x.engines.helpLabel}
                        helpPlaceholder={x.engines.helpPlaceholder}
                        successTitle={x.engines.successTitle}
                        successMessage={x.engines.successMessage}
                        context={{ offer: ENGINE_INTENT[active], source: "home_growth_workspace", locale: lang, route: base }}
                      >
                        <Button className="premium-button h-auto min-h-12 w-full px-6 py-3">
                          {e.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </RequestDialog>
                      <a href={`${page}#${engineAnchor(active)}`} className="w-full">
                        <Button className="h-auto min-h-12 w-full border border-white/15 bg-white/[.025] px-6 py-3 text-white hover:bg-white/[.065]">
                          {x.home.details}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </InteractiveSurface>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 rounded-[26px] border border-white/[.08] bg-[#070707] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[.08] bg-white/[.025] text-amber-300">
                  <Compass className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200">{x.home.diagnosticTitle}</p>
                  <p className="mt-1 text-xs text-zinc-500">{x.home.diagnosticDesc}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[.18em] text-zinc-700">{x.home.situationHint}</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {x.diagnostic.paths.map((path) => {
                const selected = path.engine === active;
                return (
                  <button
                    key={path.value}
                    type="button"
                    onClick={() => {
                      setActive(path.engine);
                      track("growth_diagnostic_select", { engine: path.engine, situation: path.value });
                    }}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all",
                      selected ? TONE[path.engine].active : "border-white/[.07] bg-white/[.015] hover:border-white/[.13]",
                    )}
                  >
                    <p className={cn("text-[9px] font-bold uppercase tracking-[.16em]", TONE[path.engine].text)}>
                      {ENGINE_LABEL[path.engine]}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-zinc-200">{path.situation}</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-500">{path.detail}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 border-t border-white/[.06] pt-1">
        <SelectedWork />
      </div>
    </section>
  );
}
