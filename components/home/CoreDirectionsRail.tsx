"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Layers3, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Direction, DirectionKey } from "@/lib/directions";

type CoreDirectionKey = "business" | "visibility" | "warriors";

type Props = {
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

type Point = { x: number; y: number };
type Geometry = {
  width: number;
  height: number;
  source: Point;
  targets: Record<CoreDirectionKey, Point>;
};

const ORDER: CoreDirectionKey[] = ["business", "visibility", "warriors"];

const ICONS: Record<CoreDirectionKey, LucideIcon> = {
  business: Layers3,
  visibility: ScanSearch,
  warriors: Shield,
};

const ACCENTS: Record<CoreDirectionKey, Accent> = {
  business: {
    solid: "#e8c547",
    glow: "rgba(232,197,71,.28)",
    border: "rgba(232,197,71,.43)",
    surface: "rgba(232,197,71,.065)",
  },
  visibility: {
    solid: "#7dd3fc",
    glow: "rgba(125,211,252,.23)",
    border: "rgba(125,211,252,.37)",
    surface: "rgba(125,211,252,.055)",
  },
  warriors: {
    solid: "#c4b5fd",
    glow: "rgba(196,181,253,.22)",
    border: "rgba(196,181,253,.37)",
    surface: "rgba(196,181,253,.055)",
  },
};

const tagline = (key: CoreDirectionKey, item: Direction) => {
  if (key === "business") return [item.tags[0], item.tags[1], item.tags[item.tags.length - 1]].filter(Boolean).join(" · ");
  return item.tags.slice(0, 3).join(" · ");
};

const curvePath = (source: Point, target: Point) => {
  const deltaY = Math.max(target.y - source.y, 1);
  const deltaX = target.x - source.x;
  const firstY = source.y + Math.min(118, deltaY * 0.34);
  const secondY = target.y - Math.min(74, deltaY * 0.22);
  const firstX = source.x + deltaX * 0.12;
  const secondX = target.x - deltaX * 0.08;
  return `M ${source.x.toFixed(1)} ${source.y.toFixed(1)} C ${firstX.toFixed(1)} ${firstY.toFixed(1)}, ${secondX.toFixed(1)} ${secondY.toFixed(1)}, ${target.x.toFixed(1)} ${target.y.toFixed(1)}`;
};

function DirectionSignal({ type, accent, active, reduced }: { type: CoreDirectionKey; accent: Accent; active: boolean; reduced: boolean }) {
  if (type === "visibility") {
    return (
      <div className="relative h-8 w-11 overflow-hidden rounded-md border border-white/[.07] bg-black/35">
        <div className="absolute inset-[6px] rounded border border-white/[.06]" />
        <motion.span
          className="absolute inset-x-1.5 h-px"
          style={{ backgroundColor: accent.solid, boxShadow: `0 0 12px ${accent.glow}` }}
          animate={reduced || !active ? { top: "50%", opacity: 0.3 } : { top: ["18%", "78%", "18%"], opacity: [0.3, 0.95, 0.3] }}
          transition={reduced || !active ? { duration: 0.2 } : { duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (type === "warriors") {
    return (
      <div className="relative h-8 w-11">
        <span className="absolute left-[7px] top-[16px] h-px w-7 -rotate-[18deg] bg-white/[.13]" />
        <span className="absolute left-[9px] top-[13px] h-px w-6 rotate-[32deg] bg-white/[.11]" />
        {[[6, 14], [29, 6], [33, 24]].map(([left, top], index) => (
          <motion.span
            key={index}
            className="absolute h-2 w-2 rounded-full border bg-black"
            style={{ left, top, borderColor: accent.border, boxShadow: active ? `0 0 12px ${accent.glow}` : undefined }}
            animate={reduced || !active ? undefined : { scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
            transition={reduced || !active ? undefined : { duration: 2, delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex h-8 w-11 items-center justify-between px-1">
      <span className="absolute left-[8px] right-[8px] top-1/2 h-px bg-white/[.12]" />
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

export function CoreDirectionsRail({ directions, hrefs, onDirectionOpen }: Props) {
  const reduced = Boolean(useReducedMotion());
  const [active, setActive] = useState<CoreDirectionKey>("business");
  const [paused, setPaused] = useState(false);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const accent = ACCENTS[active];

  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Partial<Record<CoreDirectionKey, HTMLAnchorElement | null>>>({});
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 27, mass: 0.72 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 27, mass: 0.72 });
  const fieldX = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const fieldY = useTransform(springY, [-0.5, 0.5], [-16, 16]);

  const measureGeometry = useCallback(() => {
    const root = rootRef.current;
    const sourceElement = document.getElementById("hero-signal-source");
    if (!root || !sourceElement) return;

    const rootRect = root.getBoundingClientRect();
    const sourceRect = sourceElement.getBoundingClientRect();
    const source: Point = {
      x: sourceRect.left - rootRect.left + sourceRect.width / 2,
      y: sourceRect.top - rootRect.top + sourceRect.height / 2,
    };

    const targetEntries = ORDER.map((key) => {
      const node = cardRefs.current[key];
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      return [key, { x: rect.left - rootRect.left + rect.width / 2, y: rect.top - rootRect.top + 3 }] as const;
    }).filter(Boolean) as Array<readonly [CoreDirectionKey, Point]>;

    if (targetEntries.length !== ORDER.length) return;
    setGeometry({ width: rootRect.width, height: rootRect.height, source, targets: Object.fromEntries(targetEntries) as Record<CoreDirectionKey, Point> });
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  useEffect(() => {
    const raf = window.requestAnimationFrame(measureGeometry);
    const observer = new ResizeObserver(() => window.requestAnimationFrame(measureGeometry));
    if (rootRef.current) observer.observe(rootRef.current);
    const sourceElement = document.getElementById("hero-signal-source");
    if (sourceElement) observer.observe(sourceElement);
    ORDER.forEach((key) => {
      const node = cardRefs.current[key];
      if (node) observer.observe(node);
    });
    const onResize = () => window.requestAnimationFrame(measureGeometry);
    window.addEventListener("resize", onResize, { passive: true });
    if (document.fonts?.ready) document.fonts.ready.then(() => window.requestAnimationFrame(measureGeometry));
    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measureGeometry]);

  useEffect(() => {
    if (reduced) return;
    const handlePointer = (event: PointerEvent) => {
      pointerX.set(event.clientX / Math.max(window.innerWidth, 1) - 0.5);
      pointerY.set(event.clientY / Math.max(window.innerHeight, 1) - 0.5);
    };
    const resetPointer = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, [pointerX, pointerY, reduced]);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[37%] h-[620px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[94px]"
        style={reduced ? { background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.026) 34%, transparent 70%)` } : { x: fieldX, y: fieldY, background: `radial-gradient(ellipse at center, ${accent.glow} 0%, rgba(212,175,55,.026) 34%, transparent 70%)` }}
      />

      {geometry ? (
        <svg aria-hidden="true" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" className="absolute inset-0 hidden h-full w-full lg:block">
          <defs>
            <linearGradient id="active-core-signal-gradient" gradientUnits="userSpaceOnUse" x1={geometry.source.x} y1={geometry.source.y} x2={geometry.targets[active].x} y2={geometry.targets[active].y}>
              <stop offset="0" stopColor="#e8c547" stopOpacity="0.78" />
              <stop offset="0.34" stopColor="#e8c547" stopOpacity="0.34" />
              <stop offset="1" stopColor={accent.solid} stopOpacity="0.9" />
            </linearGradient>
            <filter id="active-core-signal-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {ORDER.map((key) => (
            <path key={`base-${key}`} d={curvePath(geometry.source, geometry.targets[key])} fill="none" stroke="rgba(255,255,255,.075)" strokeWidth="0.85" strokeDasharray="2 9" strokeLinecap="round" />
          ))}

          <motion.path
            key={`active-${active}-${geometry.width}-${geometry.height}`}
            d={curvePath(geometry.source, geometry.targets[active])}
            fill="none"
            stroke="url(#active-core-signal-gradient)"
            strokeWidth="1.35"
            strokeLinecap="round"
            filter="url(#active-core-signal-glow)"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: reduced ? 0.5 : 0.84 }}
            transition={reduced ? { duration: 0.2 } : { duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      ) : null}

      <div id="ecosystem-rail" className="pointer-events-auto absolute inset-x-4 bottom-5 z-20 mx-auto grid max-w-[1120px] grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6 sm:gap-3">
        {ORDER.map((key, index) => {
          const item = directions[key];
          const Icon = ICONS[key];
          const itemAccent = ACCENTS[key];
          const isActive = active === key;
          return (
            <motion.a
              key={key}
              ref={(node) => { cardRefs.current[key] = node; }}
              href={hrefs[key]}
              aria-label={item.cta}
              onMouseEnter={() => { setPaused(true); setActive(key); }}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => { setPaused(true); setActive(key); }}
              onBlur={() => setPaused(false)}
              onClick={() => onDirectionOpen?.(key)}
              initial={false}
              animate={{ y: isActive && !reduced ? -4 : 0, scale: isActive && !reduced ? 1.008 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="group relative min-h-[76px] overflow-hidden rounded-[18px] border bg-black/52 px-2.5 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,.045),0_18px_55px_rgba(0,0,0,.34)] backdrop-blur-xl outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-white/55 sm:min-h-[86px] sm:px-4 sm:py-3.5"
              style={{
                borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.10)",
                background: isActive ? `linear-gradient(145deg, ${itemAccent.surface}, rgba(0,0,0,.68) 62%)` : "linear-gradient(145deg, rgba(255,255,255,.024), rgba(0,0,0,.70) 66%)",
                boxShadow: isActive ? `inset 0 1px 0 rgba(255,255,255,.07), 0 18px 55px rgba(0,0,0,.34), 0 0 30px ${itemAccent.glow}` : "inset 0 1px 0 rgba(255,255,255,.045), 0 18px 55px rgba(0,0,0,.34)",
              }}
            >
              <div aria-hidden="true" className="absolute inset-0 opacity-[.20] transition-opacity duration-500 group-hover:opacity-[.32]" style={{ background: "radial-gradient(circle at 20% -20%,rgba(255,255,255,.15),transparent 38%),linear-gradient(120deg,transparent 25%,rgba(255,255,255,.024) 48%,transparent 70%)" }} />
              {isActive && !reduced ? (
                <motion.span aria-hidden="true" className="absolute left-0 top-0 h-px w-[42%]" style={{ background: `linear-gradient(90deg, transparent, ${itemAccent.solid}, transparent)`, boxShadow: `0 0 12px ${itemAccent.glow}` }} initial={{ x: "-120%" }} animate={{ x: "340%" }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }} />
              ) : null}

              <div className="relative flex h-full items-center gap-2 sm:gap-3">
                <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-black/32 sm:flex sm:h-10 sm:w-10" style={{ borderColor: isActive ? itemAccent.border : "rgba(255,255,255,.10)" }}>
                  <Icon className="h-4 w-4" style={{ color: isActive ? itemAccent.solid : "rgba(255,255,255,.72)" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1.5 sm:gap-2">
                    <p className="truncate text-[9px] font-semibold text-zinc-100 sm:text-[13px]">{item.short}</p>
                    <span className="pt-0.5 text-[7px] tracking-[.16em] text-zinc-600 sm:text-[9px]">0{index + 1}</span>
                  </div>
                  <p className="mt-1 hidden truncate text-[8px] text-zinc-500 sm:block sm:text-[9px]">{tagline(key, item)}</p>
                  <span className="mt-2 block h-px w-8 bg-gradient-to-r from-white/25 to-transparent sm:hidden" />
                </div>
                <div className="hidden shrink-0 lg:block"><DirectionSignal type={key} accent={itemAccent} active={isActive} reduced={reduced} /></div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
