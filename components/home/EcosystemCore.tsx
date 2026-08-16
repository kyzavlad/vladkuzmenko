"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Dumbbell, Layers3, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { Direction, DirectionKey } from "@/lib/directions";

type EcosystemCoreProps = {
  directions: Record<DirectionKey, Direction>;
  hrefs: Record<DirectionKey, string>;
  onDirectionOpen?: (key: DirectionKey) => void;
};

const ORDER: DirectionKey[] = ["business", "visibility", "warriors", "performance"];

const ICONS: Record<DirectionKey, LucideIcon> = {
  business: Layers3,
  visibility: ScanSearch,
  warriors: Shield,
  performance: Dumbbell,
};

const ACCENTS: Record<
  DirectionKey,
  { solid: string; glow: string; border: string; surface: string }
> = {
  business: {
    solid: "#e8c547",
    glow: "rgba(232,197,71,.34)",
    border: "rgba(232,197,71,.46)",
    surface: "rgba(232,197,71,.075)",
  },
  visibility: {
    solid: "#7dd3fc",
    glow: "rgba(125,211,252,.27)",
    border: "rgba(125,211,252,.40)",
    surface: "rgba(125,211,252,.065)",
  },
  warriors: {
    solid: "#c4b5fd",
    glow: "rgba(196,181,253,.26)",
    border: "rgba(196,181,253,.40)",
    surface: "rgba(196,181,253,.065)",
  },
  performance: {
    solid: "#6ee7b7",
    glow: "rgba(110,231,183,.24)",
    border: "rgba(110,231,183,.38)",
    surface: "rgba(110,231,183,.06)",
  },
};

const PATHS: Record<DirectionKey, string> = {
  business: "M720 470 C640 560 420 610 245 780",
  visibility: "M720 470 C690 570 610 650 565 780",
  warriors: "M720 470 C760 570 840 650 875 780",
  performance: "M720 470 C810 555 1035 620 1190 780",
};

const tagLine = (key: DirectionKey, item: Direction) => {
  if (key === "business") return [item.tags[0], item.tags[1], item.tags[item.tags.length - 1]].filter(Boolean).join(" · ");
  if (key === "warriors") return [item.tags[0], item.tags[2], item.tags[3]].filter(Boolean).join(" · ");
  if (key === "performance") return [item.tags[0], item.tags[2], item.tags[3]].filter(Boolean).join(" · ");
  return item.tags.slice(0, 3).join(" · ");
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
  const springX = useSpring(pointerX, { stiffness: 75, damping: 26, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 75, damping: 26, mass: 0.7 });
  const fieldX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const fieldY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const sheenX = useTransform(springX, [-0.5, 0.5], [-35, 35]);
  const sheenY = useTransform(springY, [-0.5, 0.5], [-24, 24]);

  useEffect(() => {
    if (reduced) return;

    const handlePointer = (event: PointerEvent) => {
      pointerX.set(event.clientX / Math.max(window.innerWidth, 1) - 0.5);
      pointerY.set(event.clientY / Math.max(window.innerHeight, 1) - 0.5);
    };

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, [pointerX, pointerY, reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden="false">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[48%] h-[620px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[90px]"
        style={
          reduced
            ? { background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.06) 30%, transparent 68%)` }
            : {
                x: fieldX,
                y: fieldY,
                background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.06) 30%, transparent 68%)`,
              }
        }
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[47%] h-[530px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[48%] opacity-75 blur-[1px]"
        style={
          reduced
            ? undefined
            : {
                x: sheenX,
                y: sheenY,
              }
        }
      >
        <motion.div
          className="absolute inset-[4%] rounded-[48%] border border-white/[.035]"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 42, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 210deg, transparent 0deg, rgba(255,255,255,.025) 58deg, transparent 104deg, rgba(231,191,58,.07) 172deg, transparent 236deg, rgba(255,255,255,.02) 312deg, transparent 360deg)",
            boxShadow: "inset 0 0 100px rgba(212,175,55,.025)",
          }}
        />
        <motion.div
          className="absolute inset-[17%] rounded-[48%] border border-white/[.045]"
          animate={reduced ? undefined : { rotate: -360 }}
          transition={reduced ? undefined : { duration: 58, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-[27%] rounded-[46%] border border-white/[.055]"
          style={{
            background:
              "radial-gradient(ellipse at 42% 35%, rgba(255,255,255,.065), transparent 22%), radial-gradient(ellipse at 58% 62%, rgba(212,175,55,.07), transparent 38%)",
            boxShadow: `0 0 90px ${accent.glow}, inset 0 0 54px rgba(255,255,255,.025)`,
          }}
        />
      </motion.div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full lg:block"
      >
        <defs>
          <linearGradient id="signal-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="46%" stopColor="rgba(255,255,255,.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.02)" />
          </linearGradient>
        </defs>
        {ORDER.map((key) => {
          const isActive = active === key;
          const itemAccent = ACCENTS[key];
          return (
            <g key={key}>
              <path d={PATHS[key]} fill="none" stroke="url(#signal-fade)" strokeWidth="1" />
              <motion.path
                d={PATHS[key]}
                fill="none"
                stroke={itemAccent.solid}
                strokeWidth={isActive ? 1.2 : 0.7}
                strokeLinecap="round"
                strokeDasharray="4 16"
                initial={false}
                animate={
                  reduced
                    ? { opacity: isActive ? 0.55 : 0.12 }
                    : {
                        opacity: isActive ? 0.72 : 0.11,
                        strokeDashoffset: isActive ? [0, -80] : 0,
                      }
                }
                transition={
                  reduced
                    ? { duration: 0.25 }
                    : {
                        opacity: { duration: 0.35 },
                        strokeDashoffset: { duration: 4.2, repeat: Infinity, ease: "linear" },
                      }
                }
              />
            </g>
          );
        })}
      </svg>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-[142px] hidden justify-center lg:flex">
        <div className="relative h-6 w-[68%] max-w-5xl">
          <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200/[.13] to-transparent" />
          <motion.span
            className="absolute left-[12%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_16px_rgba(232,197,71,.8)]"
            animate={reduced ? undefined : { left: ["12%", "88%", "12%"] }}
            transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div
        id="ecosystem-rail"
        className="pointer-events-auto absolute inset-x-0 bottom-5 z-20 mx-auto w-full max-w-[1180px] px-4 sm:bottom-7 sm:px-6 lg:bottom-8"
      >
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
          {ORDER.map((key, index) => {
            const item = directions[key];
            const Icon = ICONS[key];
            const itemAccent = ACCENTS[key];
            const isActive = active === key;

            return (
              <motion.a
                key={key}
                href={hrefs[key]}
                onMouseEnter={() => setActive(key)}
                onFocus={() => setActive(key)}
                onClick={() => onDirectionOpen?.(key)}
                whileHover={reduced ? undefined : { y: -5 }}
                whileTap={reduced ? undefined : { scale: 0.99 }}
                className="group relative min-h-[76px] overflow-hidden rounded-2xl border bg-black/55 px-3.5 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.045),0_18px_60px_rgba(0,0,0,.32)] backdrop-blur-2xl transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 sm:min-h-[82px] sm:px-4"
                style={{
                  borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.095)",
                  backgroundColor: isActive ? itemAccent.surface : "rgba(6,6,6,.58)",
                  boxShadow: isActive
                    ? `inset 0 1px 0 rgba(255,255,255,.065), 0 18px 60px rgba(0,0,0,.38), 0 0 34px ${itemAccent.glow}`
                    : "inset 0 1px 0 rgba(255,255,255,.04), 0 18px 60px rgba(0,0,0,.28)",
                }}
                aria-label={item.title}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px opacity-80 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${itemAccent.solid}, transparent)`,
                    opacity: isActive ? 0.62 : 0.12,
                  }}
                />
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-black/55 transition-colors duration-300"
                    style={{
                      borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.09)",
                      color: itemAccent.solid,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[12px] font-semibold text-zinc-100 sm:text-[13px]">
                        {item.short}
                      </span>
                      <span className="hidden text-[9px] font-semibold tracking-[.18em] text-zinc-600 sm:block">
                        0{index + 1}
                      </span>
                    </span>
                    <span className="mt-1 block truncate text-[9px] font-medium text-zinc-500 sm:text-[10px]">
                      {tagLine(key, item)}
                    </span>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
