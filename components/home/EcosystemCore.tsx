"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Dumbbell, Layers, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useState } from "react";
import type { Direction, DirectionKey } from "@/lib/directions";

type EcosystemCoreProps = {
  directions: Record<DirectionKey, Direction>;
  hrefs: Record<DirectionKey, string>;
  onDirectionOpen?: (key: DirectionKey) => void;
};

const ORDER: DirectionKey[] = ["business", "visibility", "warriors", "performance"];

const ICONS: Record<DirectionKey, LucideIcon> = {
  business: Layers,
  visibility: ScanSearch,
  warriors: Shield,
  performance: Dumbbell,
};

const ACCENTS: Record<
  DirectionKey,
  { solid: string; glow: string; border: string; surface: string }
> = {
  business: {
    solid: "#e7bf3a",
    glow: "rgba(231,191,58,.34)",
    border: "rgba(231,191,58,.48)",
    surface: "rgba(231,191,58,.08)",
  },
  visibility: {
    solid: "#7dd3fc",
    glow: "rgba(125,211,252,.28)",
    border: "rgba(125,211,252,.42)",
    surface: "rgba(125,211,252,.07)",
  },
  warriors: {
    solid: "#c4b5fd",
    glow: "rgba(196,181,253,.28)",
    border: "rgba(196,181,253,.42)",
    surface: "rgba(196,181,253,.07)",
  },
  performance: {
    solid: "#6ee7b7",
    glow: "rgba(110,231,183,.26)",
    border: "rgba(110,231,183,.42)",
    surface: "rgba(110,231,183,.07)",
  },
};

const POSITIONS: Record<DirectionKey, string> = {
  business: "left-[1%] top-[42%]",
  visibility: "right-[1%] top-[14%]",
  warriors: "right-[-1%] bottom-[16%]",
  performance: "left-[8%] bottom-[3%]",
};

export function EcosystemCore({
  directions,
  hrefs,
  onDirectionOpen,
}: EcosystemCoreProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<DirectionKey>("business");
  const accent = ACCENTS[active];

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.7 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const shiftX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[720px]"
      style={{ perspective: "1200px" }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <div className="relative aspect-[1/1] min-h-[430px] w-full sm:min-h-[520px] lg:min-h-0">
        <div
          aria-hidden="true"
          className="absolute inset-[7%] rounded-full blur-[70px] transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accent.glow} 0%, transparent 68%)`,
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute inset-[9%]"
          style={reduced ? undefined : { rotateX, rotateY, x: shiftX, y: shiftY }}
        >
          <motion.div
            className="absolute inset-[7%] rounded-full border border-white/[.06]"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 58, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-amber-200/80 shadow-[0_0_20px_rgba(244,211,94,.7)]" />
            <span className="absolute bottom-[12%] right-[8%] h-1.5 w-1.5 rounded-full bg-white/30" />
          </motion.div>

          <motion.div
            className="absolute inset-[16%] rounded-full border border-white/[.075]"
            animate={reduced ? undefined : { rotate: -360 }}
            transition={reduced ? undefined : { duration: 42, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute right-[8%] top-[20%] h-2 w-2 rounded-full transition-colors duration-500"
              style={{ backgroundColor: accent.solid, boxShadow: `0 0 22px ${accent.glow}` }}
            />
          </motion.div>

          <div className="absolute inset-[23%] rounded-full border border-white/[.08] bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,.16),transparent_19%),radial-gradient(circle_at_65%_72%,rgba(255,196,70,.12),transparent_26%),linear-gradient(145deg,#171717_0%,#050505_42%,#141414_72%,#020202_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,.13),inset_0_-18px_50px_rgba(0,0,0,.9),0_42px_100px_rgba(0,0,0,.72)]">
            <motion.div
              aria-hidden="true"
              className="absolute inset-[4%] rounded-full opacity-90"
              animate={reduced ? undefined : { rotate: [0, 16, 0, -12, 0] }}
              transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "conic-gradient(from 215deg, transparent 0deg, rgba(255,255,255,.11) 34deg, transparent 68deg, rgba(212,175,55,.22) 126deg, transparent 184deg, rgba(255,255,255,.07) 242deg, transparent 312deg)",
                filter: "blur(1px)",
              }}
            />
            <div className="absolute inset-[13%] rounded-full border border-amber-200/20 bg-[radial-gradient(circle_at_50%_42%,rgba(250,211,88,.24),rgba(92,66,8,.09)_32%,rgba(5,5,5,.96)_68%)] shadow-[inset_0_0_48px_rgba(212,175,55,.10),0_0_70px_rgba(212,175,55,.10)]">
              <div className="absolute inset-[18%] rounded-full border border-white/[.09] bg-black/80 shadow-[inset_0_0_32px_rgba(255,220,110,.10)]" />
              <div
                className="absolute inset-[31%] rounded-full border transition-colors duration-500"
                style={{
                  borderColor: accent.border,
                  background: `radial-gradient(circle at 38% 34%, rgba(255,255,255,.24), transparent 18%), radial-gradient(circle, ${accent.surface}, rgba(0,0,0,.96) 70%)`,
                  boxShadow: `0 0 54px ${accent.glow}, inset 0 0 22px ${accent.glow}`,
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[1px] w-[38%] origin-left -translate-y-1/2 bg-gradient-to-r from-amber-200/70 to-transparent"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={reduced ? undefined : { duration: 16, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          <div className="absolute inset-[2%] rounded-full border border-white/[.035]" />
          <div className="absolute inset-[30%] rounded-full border border-amber-200/[.08]" />
        </motion.div>

        <div className="pointer-events-none absolute inset-[18%] hidden rounded-full border border-dashed border-white/[.045] lg:block" />

        {ORDER.map((key, index) => {
          const Icon = ICONS[key];
          const item = directions[key];
          const itemAccent = ACCENTS[key];
          const isActive = active === key;

          return (
            <motion.a
              key={key}
              href={hrefs[key]}
              onMouseEnter={() => setActive(key)}
              onFocus={() => setActive(key)}
              onClick={() => onDirectionOpen?.(key)}
              whileHover={reduced ? undefined : { y: -4, scale: 1.012 }}
              whileFocus={reduced ? undefined : { y: -2 }}
              className={`group absolute z-20 hidden w-[190px] rounded-2xl border bg-black/65 px-3.5 py-3 text-left backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 lg:block ${POSITIONS[key]}`}
              style={{
                borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.09)",
                backgroundColor: isActive ? itemAccent.surface : "rgba(5,5,5,.68)",
                boxShadow: isActive ? `0 18px 50px rgba(0,0,0,.42), 0 0 36px ${itemAccent.glow}` : "0 14px 42px rgba(0,0,0,.30)",
              }}
              aria-label={item.title}
            >
              <span className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-black/70 transition-colors duration-300"
                  style={{ borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.09)", color: itemAccent.solid }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold uppercase tracking-[.22em] text-zinc-600">
                    0{index + 1}
                  </span>
                  <span className="mt-0.5 block text-[12px] font-semibold leading-4 text-zinc-200 transition-colors group-hover:text-white">
                    {item.short}
                  </span>
                </span>
              </span>
            </motion.a>
          );
        })}

        <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-2 px-1 lg:hidden">
          {ORDER.map((key, index) => {
            const Icon = ICONS[key];
            const item = directions[key];
            const itemAccent = ACCENTS[key];

            return (
              <a
                key={key}
                href={hrefs[key]}
                onClick={() => onDirectionOpen?.(key)}
                className="flex min-h-[58px] items-center gap-2.5 rounded-2xl border border-white/[.09] bg-black/70 px-3 py-2.5 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50"
                aria-label={item.title}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border bg-black/70"
                  style={{ borderColor: itemAccent.border, color: itemAccent.solid }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[8px] font-semibold uppercase tracking-[.2em] text-zinc-600">
                    0{index + 1}
                  </span>
                  <span className="block truncate text-[11px] font-semibold text-zinc-200 sm:text-[12px]">
                    {item.short}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
