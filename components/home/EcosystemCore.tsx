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
    glow: "rgba(232,197,71,.30)",
    border: "rgba(232,197,71,.44)",
    surface: "rgba(232,197,71,.070)",
  },
  visibility: {
    solid: "#7dd3fc",
    glow: "rgba(125,211,252,.25)",
    border: "rgba(125,211,252,.38)",
    surface: "rgba(125,211,252,.060)",
  },
  warriors: {
    solid: "#c4b5fd",
    glow: "rgba(196,181,253,.24)",
    border: "rgba(196,181,253,.38)",
    surface: "rgba(196,181,253,.060)",
  },
  performance: {
    solid: "#6ee7b7",
    glow: "rgba(110,231,183,.22)",
    border: "rgba(110,231,183,.36)",
    surface: "rgba(110,231,183,.055)",
  },
};

const PATHS: Record<DirectionKey, string> = {
  business: "M720 642 C650 690 410 724 225 812",
  visibility: "M720 642 C690 700 610 745 555 812",
  warriors: "M720 642 C758 700 842 744 885 812",
  performance: "M720 642 C810 690 1040 725 1215 812",
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
      <div className="relative h-8 w-11 overflow-hidden rounded-md border border-white/[.07] bg-black/35">
        <div className="absolute inset-[6px] rounded border border-white/[.06]" />
        <motion.span
          className="absolute inset-x-1.5 h-px"
          style={{ backgroundColor: accent.solid, boxShadow: `0 0 12px ${accent.glow}` }}
          animate={
            reduced || !active
              ? { top: "50%", opacity: 0.3 }
              : { top: ["18%", "78%", "18%"], opacity: [0.3, 0.95, 0.3] }
          }
          transition={
            reduced || !active
              ? { duration: 0.2 }
              : { duration: 2.1, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>
    );
  }

  if (type === "warriors") {
    return (
      <div className="relative h-8 w-11">
        <span className="absolute left-[7px] top-[16px] h-px w-7 -rotate-[18deg] bg-white/[.13]" />
        <span className="absolute left-[9px] top-[13px] h-px w-6 rotate-[32deg] bg-white/[.11]" />
        {[
          [6, 14],
          [29, 6],
          [33, 24],
        ].map(([left, top], index) => (
          <motion.span
            key={index}
            className="absolute h-2 w-2 rounded-full border bg-black"
            style={{
              left,
              top,
              borderColor: accent.border,
              boxShadow: active ? `0 0 12px ${accent.glow}` : undefined,
            }}
            animate={
              reduced || !active
                ? undefined
                : { scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }
            }
            transition={
              reduced || !active
                ? undefined
                : { duration: 2, delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </div>
    );
  }

  if (type === "performance") {
    return (
      <svg viewBox="0 0 44 32" className="h-8 w-11 overflow-visible" aria-hidden="true">
        <path
          d="M2 17h8l4-8 6 16 6-13 4 5h12"
          fill="none"
          stroke="rgba(255,255,255,.12)"
          strokeWidth="1"
        />
        <motion.path
          d="M2 17h8l4-8 6 16 6-13 4 5h12"
          fill="none"
          stroke={accent.solid}
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={false}
          animate={
            reduced || !active
              ? { pathLength: 0.34, opacity: 0.3 }
              : { pathLength: [0.1, 1, 0.1], opacity: [0.2, 0.95, 0.2] }
          }
          transition={
            reduced || !active
              ? { duration: 0.2 }
              : { duration: 2.3, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </svg>
    );
  }

  return (
    <div className="relative flex h-8 w-11 items-center justify-between px-1">
      <span className="absolute left-[8px] right-[8px] top-1/2 h-px bg-white/[.12]" />
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="relative h-2 w-2 rounded-full border bg-black"
          style={{
            borderColor: accent.border,
            boxShadow: active ? `0 0 12px ${accent.glow}` : undefined,
          }}
          animate={reduced || !active ? undefined : { scale: [1, 1.35, 1] }}
          transition={
            reduced || !active
              ? undefined
              : { duration: 1.8, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }
          }
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
  const reduced = Boolean(useReducedMotion());
  const [active, setActive] = useState<DirectionKey>("business");
  const accent = ACCENTS[active];

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 68, damping: 25, mass: 0.74 });
  const springY = useSpring(pointerY, { stiffness: 68, damping: 25, mass: 0.74 });
  const fieldX = useTransform(springX, [-0.5, 0.5], [-34, 34]);
  const fieldY = useTransform(springY, [-0.5, 0.5], [-22, 22]);
  const lensX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const lensY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const lensRotate = useTransform(springX, [-0.5, 0.5], [-3, 3]);

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
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      {/* Pointer-responsive ambient spotlight, inspired by interactive spotlight mechanics without a runtime 3D scene. */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[46%] h-[760px] w-[1180px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[118px]"
        style={
          reduced
            ? {
                background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.035) 36%, transparent 71%)`,
              }
            : {
                x: fieldX,
                y: fieldY,
                background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.035) 36%, transparent 71%)`,
              }
        }
      />

      {/* Slow background paths create continuity without crossing or obscuring the headline. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full lg:block"
      >
        <defs>
          <linearGradient id="ambient-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.45" stopColor={accent.solid} stopOpacity="0.14" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-80 270 C320 120 515 275 770 215 C1040 150 1180 245 1510 130"
          fill="none"
          stroke="url(#ambient-line)"
          strokeWidth="0.7"
          animate={reduced ? undefined : { pathLength: [0.65, 1, 0.65], opacity: [0.12, 0.32, 0.12] }}
          transition={reduced ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M-120 725 C260 590 465 720 710 690 C1010 650 1180 560 1550 700"
          fill="none"
          stroke="url(#ambient-line)"
          strokeWidth="0.7"
          animate={reduced ? undefined : { pathLength: [1, 0.62, 1], opacity: [0.11, 0.28, 0.11] }}
          transition={reduced ? undefined : { duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Perspective floor: a reusable spatial motif that fades before the content area. */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-[255px] left-1/2 hidden h-[560px] w-[1120px] -translate-x-1/2 opacity-[.26] sm:block"
        style={
          reduced
            ? {
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
                backgroundSize: "62px 62px",
                transform: "translateX(-50%) perspective(900px) rotateX(67deg)",
                maskImage: "linear-gradient(to bottom, transparent, black 24%, black 62%, transparent 88%)",
              }
            : {
                x: lensX,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
                backgroundSize: "62px 62px",
                transform: "translateX(-50%) perspective(900px) rotateX(67deg)",
                maskImage: "linear-gradient(to bottom, transparent, black 24%, black 62%, transparent 88%)",
              }
        }
      />

      {/* Refractive signal lens lives below the headline safe zone instead of covering text. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[68%] hidden h-[260px] w-[620px] -translate-x-1/2 -translate-y-1/2 sm:block"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="absolute inset-[4%] rounded-[50%] border border-white/[.055] bg-white/[.006] shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_0_80px_rgba(0,0,0,.32)] backdrop-blur-[1px]"
          style={
            reduced
              ? {
                  background: `radial-gradient(ellipse at 50% 52%, ${accent.surface}, rgba(255,255,255,.004) 42%, transparent 70%)`,
                }
              : {
                  x: lensX,
                  y: lensY,
                  rotateZ: lensRotate,
                  background: `radial-gradient(ellipse at 50% 52%, ${accent.surface}, rgba(255,255,255,.004) 42%, transparent 70%)`,
                }
          }
        >
          <motion.div
            className="absolute inset-[12%] rounded-[50%] border border-white/[.04]"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 42, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[26%] rounded-[50%] border"
            style={{ borderColor: accent.border, boxShadow: `0 0 42px ${accent.glow}` }}
            animate={reduced ? undefined : { scale: [0.98, 1.025, 0.98], opacity: [0.28, 0.56, 0.28] }}
            transition={reduced ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: accent.solid, boxShadow: `0 0 24px ${accent.glow}` }}
          />
        </motion.div>
      </div>

      {/* Signal routes begin below the main copy; they explain that every path resolves to one of four directions. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full lg:block"
      >
        {ORDER.map((key) => {
          const itemAccent = ACCENTS[key];
          const isActive = active === key;
          return (
            <g key={key}>
              <path
                d={PATHS[key]}
                fill="none"
                stroke="rgba(255,255,255,.07)"
                strokeWidth="0.8"
                strokeDasharray="4 8"
              />
              <motion.path
                d={PATHS[key]}
                fill="none"
                stroke={itemAccent.solid}
                strokeWidth={isActive ? 1.15 : 0.65}
                strokeLinecap="round"
                initial={false}
                animate={
                  reduced
                    ? { pathLength: 1, opacity: isActive ? 0.48 : 0.11 }
                    : isActive
                      ? { pathLength: [0.16, 1], opacity: [0.18, 0.72] }
                      : { pathLength: 1, opacity: 0.1 }
                }
                transition={
                  reduced || !isActive
                    ? { duration: 0.25 }
                    : { duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }
              />
            </g>
          );
        })}
      </svg>

      <div
        id="ecosystem-rail"
        className="pointer-events-auto absolute inset-x-4 bottom-5 z-20 mx-auto grid max-w-[1210px] grid-cols-2 gap-2.5 sm:inset-x-6 sm:bottom-6 lg:grid-cols-4 lg:gap-3"
      >
        {ORDER.map((key, index) => {
          const item = directions[key];
          const Icon = ICONS[key];
          const itemAccent = ACCENTS[key];
          const isActive = active === key;

          return (
            <motion.a
              key={key}
              href={hrefs[key]}
              aria-label={item.cta}
              onMouseEnter={() => setActive(key)}
              onFocus={() => setActive(key)}
              onClick={() => onDirectionOpen?.(key)}
              initial={false}
              animate={{ y: isActive && !reduced ? -4 : 0, scale: isActive && !reduced ? 1.008 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="group relative min-h-[76px] overflow-hidden rounded-[18px] border bg-black/46 px-3.5 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.045),0_18px_55px_rgba(0,0,0,.34)] backdrop-blur-2xl outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-white/55 sm:min-h-[86px] sm:px-4 sm:py-3.5"
              style={{
                borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.10)",
                background: isActive
                  ? `linear-gradient(145deg, ${itemAccent.surface}, rgba(0,0,0,.62) 62%)`
                  : "linear-gradient(145deg, rgba(255,255,255,.025), rgba(0,0,0,.64) 66%)",
                boxShadow: isActive
                  ? `inset 0 1px 0 rgba(255,255,255,.07), 0 18px 55px rgba(0,0,0,.34), 0 0 34px ${itemAccent.glow}`
                  : "inset 0 1px 0 rgba(255,255,255,.045), 0 18px 55px rgba(0,0,0,.34)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[.22] transition-opacity duration-500 group-hover:opacity-[.34]"
                style={{
                  background:
                    "radial-gradient(circle at 20% -20%,rgba(255,255,255,.16),transparent 38%),linear-gradient(120deg,transparent 25%,rgba(255,255,255,.025) 48%,transparent 70%)",
                }}
              />

              {isActive && !reduced ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-[42%]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${itemAccent.solid}, transparent)`,
                    boxShadow: `0 0 12px ${itemAccent.glow}`,
                  }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "340%" }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                />
              ) : null}

              <div className="relative flex h-full items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-black/32 sm:h-10 sm:w-10"
                  style={{ borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.10)" }}
                >
                  <Icon className="h-4 w-4" style={{ color: isActive ? itemAccent.solid : "rgba(255,255,255,.72)" }} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-[11px] font-medium text-zinc-100 sm:text-[13px]">
                      {item.short}
                    </p>
                    <span className="pt-0.5 text-[8px] tracking-[.18em] text-zinc-600 sm:text-[9px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[8px] text-zinc-500 sm:text-[9px]">
                    {tagLine(key, item)}
                  </p>
                </div>

                <div className="hidden shrink-0 sm:block">
                  <DirectionSignal
                    type={key}
                    accent={itemAccent}
                    active={isActive}
                    reduced={reduced}
                  />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
