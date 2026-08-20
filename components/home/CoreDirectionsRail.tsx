"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers3, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DIRECTION_ORDER, type Direction, type DirectionKey } from "@/lib/directions";

type Props = {
  directions: Record<DirectionKey, Direction>;
  hrefs: Record<DirectionKey, string>;
  onDirectionOpen?: (key: DirectionKey) => void;
};

type Accent = {
  solid: string;
  border: string;
  surface: string;
  glow: string;
};

const ICONS: Record<"business" | "visibility" | "warriors", LucideIcon> = {
  business: Layers3,
  visibility: ScanSearch,
  warriors: Shield,
};

const ACCENTS: Record<"business" | "visibility" | "warriors", Accent> = {
  business: { solid: "#e8c547", border: "rgba(232,197,71,.43)", surface: "rgba(232,197,71,.065)", glow: "rgba(232,197,71,.28)" },
  visibility: { solid: "#7dd3fc", border: "rgba(125,211,252,.37)", surface: "rgba(125,211,252,.055)", glow: "rgba(125,211,252,.23)" },
  warriors: { solid: "#c4b5fd", border: "rgba(196,181,253,.37)", surface: "rgba(196,181,253,.055)", glow: "rgba(196,181,253,.22)" },
};

const tagline = (key: DirectionKey, item: Direction) => {
  if (key === "business") return [item.tags[0], item.tags[1], item.tags[item.tags.length - 1]].filter(Boolean).join(" · ");
  return item.tags.slice(0, 3).join(" · ");
};

export function CoreDirectionsRail({ directions, hrefs, onDirectionOpen }: Props) {
  const reduced = Boolean(useReducedMotion());
  const order = DIRECTION_ORDER.filter((key): key is "business" | "visibility" | "warriors" => key !== "performance");

  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      <div aria-hidden="true" className="absolute left-1/2 top-[37%] h-[620px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(232,197,71,.20)_0%,rgba(212,175,55,.026)_34%,transparent_70%)] blur-[94px]" />

      <div id="ecosystem-rail" className="pointer-events-auto absolute inset-x-4 bottom-5 z-20 mx-auto grid max-w-[1040px] grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6 sm:gap-3">
        {order.map((key, index) => {
          const item = directions[key];
          const Icon = ICONS[key];
          const accent = ACCENTS[key];

          return (
            <motion.a
              key={key}
              href={hrefs[key]}
              aria-label={item.cta}
              onClick={() => onDirectionOpen?.(key)}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: reduced ? 0 : .3 + index * .08 }}
              whileHover={reduced ? undefined : { y: -4, scale: 1.006 }}
              className="group relative min-h-[78px] overflow-hidden rounded-[18px] border bg-black/58 px-2.5 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.045),0_18px_55px_rgba(0,0,0,.34)] backdrop-blur-xl outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/55 sm:min-h-[86px] sm:px-4 sm:py-3.5"
              style={{ borderColor: accent.border, background: `linear-gradient(145deg, ${accent.surface}, rgba(0,0,0,.70) 66%)` }}
            >
              <div aria-hidden="true" className="absolute inset-0 opacity-[.16] transition-opacity duration-300 group-hover:opacity-[.30]" style={{ background: `radial-gradient(circle at 20% -20%,${accent.glow},transparent 44%)` }} />
              <div className="relative flex h-full items-center gap-2 sm:gap-3">
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-black/32 sm:flex sm:h-10 sm:w-10" style={{ borderColor: accent.border }}>
                  <Icon className="h-4 w-4" style={{ color: accent.solid }} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                    <p className="truncate text-[9px] font-semibold text-zinc-100 sm:text-[13px]">{item.short}</p>
                    <span className="pt-0.5 text-[7px] tracking-[.16em] text-zinc-600 sm:text-[9px]">0{index + 1}</span>
                  </div>
                  <p className="mt-1 hidden truncate text-[8px] text-zinc-500 sm:block sm:text-[9px]">{tagline(key, item)}</p>
                  <span className="mt-2 block h-px w-8 bg-gradient-to-r from-white/25 to-transparent sm:hidden" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
