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

type Accent = {
  solid: string;
  glow: string;
  border: string;
  surface: string;
};

const ORDER: DirectionKey[] = ["business", "visibility", "warriors", "performance"];

const ICONS: Record<DirectionKey, LucideIcon> = {
  business: Layers3,
  visibility: ScanSearch,
  warriors: Shield,
  performance: Dumbbell,
};

const ACCENTS: Record<DirectionKey, Accent> = {
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
  business: "M720 505 C640 585 420 640 245 795",
  visibility: "M720 505 C690 590 610 670 565 795",
  warriors: "M720 505 C760 590 840 670 875 795",
  performance: "M720 505 C810 580 1035 645 1190 795",
};

const tagLine = (key: DirectionKey, item: Direction) => {
  if (key === "business") {
    return [item.tags[0], item.tags[1], item.tags[item.tags.length - 1]]
      .filter(Boolean)
      .join(" · ");
  }
  if (key === "warriors" || key === "performance") {
    return [item.tags[0], item.tags[2], item.tags[3]].filter(Boolean).join(" · ");
  }
  return item.tags.slice(0, 3).join(" · ");
};

function DirectionSignal({
  type,
  accent,
  active,
  reduced,
}: {
  type: DirectionKey;
  accent: Accent;
  active: boolean;
  reduced: boolean;
}) {
  if (type === "visibility") {
    return (
      <div className="relative h-9 w-12 overflow-hidden rounded-lg border border-white/[.07] bg-black/35">
        <div className="absolute inset-[6px] rounded border border-white/[.06]" />
        <motion.span
          className="absolute inset-x-1.5 h-px"
          style={{ backgroundColor: accent.solid, boxShadow: `0 0 12px ${accent.glow}` }}
          animate={reduced || !active ? { top: "50%", opacity: 0.35 } : { top: ["18%", "78%", "18%"], opacity: [0.35, 0.9, 0.35] }}
          transition={reduced || !active ? { duration: 0.2 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (type === "warriors") {
    return (
      <div className="relative h-9 w-12">
        <span className="absolute left-[8px] top-[18px] h-px w-8 -rotate-[18deg] bg-white/[.12]" />
        <span className="absolute left-[10px] top-[14px] h-px w-7 rotate-[32deg] bg-white/[.10]" />
        {[
          [7, 16],
          [31, 7],
          [36, 27],
        ].map(([left, top], index) => (
          <motion.span
            key={index}
            className="absolute h-2 w-2 rounded-full border bg-black"
            style={{ left, top, borderColor: accent.border, boxShadow: active ? `0 0 12px ${accent.glow}` : undefined }}
            animate={reduced || !active ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
            transition={reduced || !active ? undefined : { duration: 2, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  if (type === "performance") {
    return (
      <svg viewBox="0 0 48 36" className="h-9 w-12 overflow-visible" aria-hidden="true">
        <path d="M2 19h9l4-9 7 18 6-14 4 5h14" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
        <motion.path
          d="M2 19h9l4-9 7 18 6-14 4 5h14"
          fill="none"
          stroke={accent.solid}
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={false}
          animate={reduced || !active ? { pathLength: 0.36, opacity: 0.35 } : { pathLength: [0.12, 1, 0.12], opacity: [0.25, 0.95, 0.25] }}
          transition={reduced || !active ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  return (
    <div className="relative flex h-9 w-12 items-center justify-between px-1">
      <span className="absolute left-[9px] right-[9px] top-1/2 h-px bg-white/[.12]" />
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="relative h-2 w-2 rounded-full border bg-black"
          style={{ borderColor: accent.border, boxShadow: active ? `0 0 12px ${accent.glow}` : undefined }}
          animate={reduced || !active ? undefined : { scale: [1, 1.35, 1] }}
          transition={reduced || !active ? undefined : { duration: 1.8, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

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
  const springX = useSpring(pointerX, { stiffness: 72, damping: 25, mass: 0.72 });
  const springY = useSpring(pointerY, { stiffness: 72, damping: 25, mass: 0.72 });
  const fieldX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const fieldY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const coreX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const coreY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const coreRotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const coreRotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);

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
        className="absolute left-1/2 top-[48%] h-[700px] w-[1080px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[105px]"
        style={
          reduced
            ? { background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.045) 34%, transparent 70%)` }
            : {
                x: fieldX,
                y: fieldY,
                background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.045) 34%, transparent 70%)`,
              }
        }
      />

      <div aria-hidden="true" className="absolute inset-0 hidden overflow-hidden sm:block">
        <motion.div
          className="absolute bottom-[-270px] left-[16%] h-[760px] w-[150px] origin-bottom rotate-[28deg] rounded-full blur-[44px]"
          style={{ background: `linear-gradient(to top, ${accent.glow}, transparent 74%)` }}
          animate={reduced ? undefined : { opacity: [0.05, 0.13, 0.05], scaleY: [0.94, 1.05, 0.94] }}
          transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-260px] right-[16%] h-[720px] w-[130px] origin-bottom -rotate-[30deg] rounded-full blur-[42px]"
          style={{ background: `linear-gradient(to top, ${accent.glow}, transparent 74%)` }}
          animate={reduced ? undefined : { opacity: [0.04, 0.11, 0.04], scaleY: [1.04, 0.94, 1.04] }}
          transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[50%] hidden h-[560px] w-[760px] -translate-x-1/2 -translate-y-1/2 sm:block"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_28%,black_43%,transparent_78%)]">
          <motion.div
            className="absolute inset-[8%] rounded-[48%] border border-white/[.045]"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 54, repeat: Infinity, ease: "linear" }}
            style={{
              background: `conic-gradient(from 210deg, transparent 0deg, rgba(255,255,255,.025) 52deg, transparent 100deg, ${accent.glow} 168deg, transparent 228deg, rgba(255,255,255,.018) 312deg, transparent 360deg)`,
            }}
          />
          <motion.div
            className="absolute inset-[18%] rounded-[46%] border border-white/[.04]"
            animate={reduced ? undefined : { rotate: -360 }}
            transition={reduced ? undefined : { duration: 68, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2"
          style={
            reduced
              ? { transformStyle: "preserve-3d" }
              : {
                  x: coreX,
                  y: coreY,
                  rotateX: coreRotateX,
                  rotateY: coreRotateY,
                  transformStyle: "preserve-3d",
                }
          }
        >
          <motion.div
            className="absolute inset-5 rounded-[38%] border border-white/[.075] bg-white/[.012] shadow-[inset_0_1px_0_rgba(255,255,255,.10),inset_0_-24px_60px_rgba(0,0,0,.78),0_34px_100px_rgba(0,0,0,.42)] backdrop-blur-[3px]"
            animate={reduced ? undefined : { rotate: [0, 7, 0, -7, 0] }}
            transition={reduced ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle at 34% 26%, rgba(255,255,255,.11), transparent 20%), radial-gradient(circle at 62% 68%, ${accent.glow}, transparent 38%), linear-gradient(145deg, rgba(255,255,255,.035), rgba(0,0,0,.18))`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,.10), inset 0 -24px 60px rgba(0,0,0,.78), 0 0 70px ${accent.glow}, 0 34px 100px rgba(0,0,0,.42)`,
              transform: "translateZ(10px)",
            }}
          >
            <div className="absolute inset-[18%] rounded-[42%] border border-white/[.07] bg-black/25" />
            <div
              className="absolute inset-[31%] rounded-full border"
              style={{ borderColor: accent.border, boxShadow: `0 0 34px ${accent.glow}, inset 0 0 28px ${accent.glow}` }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: accent.solid, boxShadow: `0 0 18px ${accent.glow}` }}
              animate={reduced ? undefined : { scale: [1, 1.8, 1], opacity: [0.65, 1, 0.65] }}
              transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full lg:block"
      >
        <defs>
          <linearGradient id="signal-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,.075)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.018)" />
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
                strokeWidth={isActive ? 1.25 : 0.65}
                strokeLinecap="round"
                strokeDasharray="4 18"
                initial={false}
                animate={
                  reduced
                    ? { opacity: isActive ? 0.48 : 0.08 }
                    : {
                        opacity: isActive ? 0.68 : 0.08,
                        strokeDashoffset: isActive ? [0, -88] : 0,
                      }
                }
                transition={
                  reduced
                    ? { duration: 0.25 }
                    : {
                        opacity: { duration: 0.35 },
                        strokeDashoffset: { duration: 4.4, repeat: Infinity, ease: "linear" },
                      }
                }
              />
            </g>
          );
        })}
      </svg>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-[143px] hidden justify-center lg:flex">
        <div className="relative h-6 w-[70%] max-w-5xl">
          <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[.08] to-transparent" />
          <motion.span
            className="absolute left-[12%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: accent.solid, boxShadow: `0 0 16px ${accent.glow}` }}
            animate={reduced ? undefined : { left: ["12%", "88%", "12%"] }}
            transition={reduced ? undefined : { duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
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
                whileHover={reduced ? undefined : { y: -6, scale: 1.012 }}
                whileTap={reduced ? undefined : { scale: 0.99 }}
                className="group relative min-h-[78px] overflow-hidden rounded-2xl border bg-black/55 px-3.5 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_18px_60px_rgba(0,0,0,.34)] backdrop-blur-2xl transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 sm:min-h-[84px] sm:px-4"
                style={{
                  borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.095)",
                  backgroundColor: isActive ? itemAccent.surface : "rgba(6,6,6,.60)",
                  boxShadow: isActive
                    ? `inset 0 1px 0 rgba(255,255,255,.075), 0 18px 64px rgba(0,0,0,.42), 0 0 38px ${itemAccent.glow}`
                    : "inset 0 1px 0 rgba(255,255,255,.045), 0 18px 60px rgba(0,0,0,.30)",
                }}
                aria-label={item.title}
              >
                <motion.div
                  aria-hidden="true"
                  className="absolute -right-8 -top-12 h-32 w-32 rounded-full blur-2xl"
                  style={{ backgroundColor: itemAccent.solid }}
                  animate={{ opacity: isActive ? 0.08 : 0.015 }}
                  transition={{ duration: 0.3 }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${itemAccent.solid}, transparent)`,
                    opacity: isActive ? 0.68 : 0.12,
                  }}
                />

                <div className="relative z-10 flex items-center gap-3 pr-10 sm:pr-12">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-black/55 transition-colors duration-300"
                    style={{
                      borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.09)",
                      color: itemAccent.solid,
                      boxShadow: isActive ? `inset 0 1px 0 rgba(255,255,255,.08), 0 0 18px ${itemAccent.glow}` : undefined,
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

                <div className="absolute bottom-2.5 right-2.5 z-10 opacity-80 sm:bottom-3 sm:right-3">
                  <DirectionSignal
                    type={key}
                    accent={itemAccent}
                    active={isActive}
                    reduced={Boolean(reduced)}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
