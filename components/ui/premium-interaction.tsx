"use client";

import type { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Accent = "gold" | "blue" | "violet" | "green" | "rose";

const ACCENTS: Record<Accent, { glow: string; line: string; dot: string }> = {
  gold: {
    glow: "rgba(245,190,52,.16)",
    line: "from-amber-300/70 via-amber-300/30 to-transparent",
    dot: "bg-amber-300 shadow-[0_0_16px_rgba(245,190,52,.65)]",
  },
  blue: {
    glow: "rgba(56,189,248,.14)",
    line: "from-sky-300/70 via-sky-300/30 to-transparent",
    dot: "bg-sky-300 shadow-[0_0_16px_rgba(125,211,252,.62)]",
  },
  violet: {
    glow: "rgba(167,139,250,.14)",
    line: "from-violet-300/70 via-violet-300/30 to-transparent",
    dot: "bg-violet-300 shadow-[0_0_16px_rgba(196,181,253,.62)]",
  },
  green: {
    glow: "rgba(52,211,153,.13)",
    line: "from-emerald-300/70 via-emerald-300/30 to-transparent",
    dot: "bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.58)]",
  },
  rose: {
    glow: "rgba(251,113,133,.12)",
    line: "from-rose-300/70 via-rose-300/30 to-transparent",
    dot: "bg-rose-300 shadow-[0_0_16px_rgba(253,164,175,.55)]",
  },
};

export function InteractiveSurface({
  children,
  className,
  accent = "gold",
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  lift?: boolean;
}) {
  const palette = ACCENTS[accent];

  const move = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      onMouseMove={move}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn("group/surface relative overflow-hidden", className)}
      style={{
        ["--surface-glow" as string]: palette.glow,
        ["--spot-x" as string]: "50%",
        ["--spot-y" as string]: "50%",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/surface:opacity-100"
        style={{
          background:
            "radial-gradient(440px circle at var(--spot-x) var(--spot-y), var(--surface-glow), transparent 43%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function SignalFlow({
  nodes,
  accent = "gold",
  compact = false,
}: {
  nodes: string[];
  accent?: Accent;
  compact?: boolean;
}) {
  const palette = ACCENTS[accent];

  return (
    <div className={cn("flex min-w-0 items-center", compact ? "gap-2" : "gap-3 sm:gap-4")}>
      {nodes.map((node, index) => (
        <div key={`${node}-${index}`} className="contents">
          <motion.div
            initial={{ opacity: 0, scale: .92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * .09, type: "spring", stiffness: 220, damping: 20 }}
            className={cn(
              "relative shrink-0 rounded-full border border-white/[.09] bg-black/35 text-center font-semibold text-zinc-200 backdrop-blur",
              compact ? "px-3 py-2 text-[10px]" : "px-4 py-2.5 text-[11px] sm:px-5 sm:text-xs",
            )}
          >
            <span className={cn("mr-2 inline-block h-1.5 w-1.5 rounded-full", palette.dot)} />
            {node}
          </motion.div>

          {index < nodes.length - 1 && (
            <div className="relative h-px min-w-3 flex-1 overflow-hidden bg-white/[.07]">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * .3, ease: "linear" }}
                className={cn("absolute inset-y-0 w-2/3 bg-gradient-to-r", palette.line)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
