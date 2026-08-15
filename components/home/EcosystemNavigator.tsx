"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Boxes, Flame, Layers, TestTube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  DIRECTION_ANCHOR,
  DIRECTION_ORDER,
  directionRoute,
  getEcosystemCopy,
  type DirectionKey,
} from "@/lib/ecosystem";

const ICONS: Record<DirectionKey, LucideIcon> = {
  systems: Layers,
  products: Boxes,
  warriors: Flame,
  drop: TestTube,
};

/** Bento spans: the primary business gets the widest tile. */
const SPAN: Record<DirectionKey, string> = {
  systems: "lg:col-span-4",
  products: "lg:col-span-2",
  warriors: "lg:col-span-3",
  drop: "lg:col-span-3",
};

/**
 * The map of the whole site: four directions, each with an honest stage, a jump
 * to its homepage section and a link to its dedicated page.
 */
export function EcosystemNavigator() {
  const { lang } = useI18n();
  const x = getEcosystemCopy(lang).navigator;

  return (
    <section
      id="ecosystem"
      className="section-accent relative scroll-mt-24 border-t border-zinc-900 bg-black py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-black tracking-[-.03em] sm:text-4xl md:text-5xl">{x.title}</h2>
          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">{x.desc}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-6">
          {DIRECTION_ORDER.map((key, i) => {
            const tile = x.tiles[key];
            const Icon = ICONS[key];
            const primary = key === "systems";
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[26px] border p-6 transition duration-300 sm:p-8",
                  SPAN[key],
                  primary
                    ? "border-amber-300/25 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.13),transparent_45%),#0a0a0a] hover:border-amber-300/40"
                    : "border-white/[.09] bg-[#080808] hover:border-amber-300/25",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border",
                      primary
                        ? "border-amber-300/30 bg-amber-300/10 text-amber-200"
                        : "border-white/10 bg-white/[.04] text-amber-300/80",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-400">
                    {x.stageLabel}: {tile.stage}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mt-6 font-black tracking-[-.03em]",
                    primary ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
                  )}
                >
                  {tile.name}
                </h3>
                <p
                  className={cn(
                    "mt-3 flex-1 leading-7",
                    primary ? "text-base text-zinc-200 sm:text-lg" : "text-sm text-zinc-400",
                  )}
                >
                  {tile.purpose}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {tile.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[11px] text-zinc-300"
                    >
                      {example}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[.07] pt-5">
                  <a
                    href={`#${DIRECTION_ANCHOR[key]}`}
                    onClick={() => track("ecosystem_jump", { direction: key })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-200"
                  >
                    {x.jumpLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={directionRoute(lang, key)}
                    onClick={() => track("ecosystem_open_page", { direction: key })}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    {x.pageLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
