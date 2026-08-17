import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE = {
  gold: {
    eyebrow: "text-amber-300/75",
    accent: "from-[#fff0a2] via-[#e2b62d] to-[#8c6207]",
    line: "via-amber-300/32",
    halo: "rgba(212,175,55,.11)",
  },
  blue: {
    eyebrow: "text-sky-200/75",
    accent: "from-sky-100 via-sky-300 to-amber-200",
    line: "via-sky-300/28",
    halo: "rgba(56,189,248,.11)",
  },
  violet: {
    eyebrow: "text-violet-200/75",
    accent: "from-violet-100 via-violet-300 to-amber-200",
    line: "via-violet-300/26",
    halo: "rgba(167,139,250,.10)",
  },
  green: {
    eyebrow: "text-emerald-200/75",
    accent: "from-emerald-100 via-emerald-300 to-amber-200",
    line: "via-emerald-300/26",
    halo: "rgba(52,211,153,.09)",
  },
} as const;

export function DirectionPageHero({
  accent = "gold",
  eyebrow,
  titleA,
  titleB,
  lead,
  support,
  children,
  className,
}: {
  accent?: keyof typeof TONE;
  eyebrow: string;
  titleA: string;
  titleB?: string;
  lead: string;
  support?: string;
  children?: ReactNode;
  className?: string;
}) {
  const tone = TONE[accent];
  // VisibilityOS uses the actionable scan heading below the brand mark as the
  // page's single H1. The hero title is a product wordmark, not a second topic.
  const productWordmark = titleA === "Visibility" && titleB === "OS.";
  const titleContent = (
    <>
      {titleA}
      {titleB ? (
        <em className={cn("bg-gradient-to-br bg-clip-text font-normal italic text-transparent", tone.accent)}>{titleB}</em>
      ) : null}
    </>
  );

  return (
    <section className={cn("relative overflow-hidden border-b border-white/[.07] bg-black pb-20 pt-36 sm:pb-24 sm:pt-40", className)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-0 h-[660px] w-[96%] -translate-x-1/2"
          style={{ background: `radial-gradient(ellipse at top, ${tone.halo}, rgba(212,175,55,.02) 38%, transparent 68%)` }}
        />
        <div className={cn("absolute left-1/2 top-12 h-px w-[min(760px,76vw)] -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent", tone.line)} />
        <div className="absolute inset-0 opacity-[.22] [background-image:linear-gradient(rgba(255,255,255,.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.022)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_34%,black_4%,transparent_72%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 text-center">
        <span className={cn("text-[10px] font-semibold uppercase tracking-[.24em]", tone.eyebrow)}>{eyebrow}</span>
        {productWordmark ? (
          <div className="section-title mx-auto mt-5 max-w-5xl text-[clamp(3.1rem,6vw,5.8rem)] text-zinc-100" aria-label={`${titleA}${titleB}`}>
            {titleContent}
          </div>
        ) : (
          <h1 className="section-title mx-auto mt-5 max-w-5xl text-[clamp(3.1rem,6vw,5.8rem)] text-zinc-100">
            {titleContent}
          </h1>
        )}
        <p className="section-lead mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">{lead}</p>
        {support ? <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-zinc-500">{support}</p> : null}
        {children ? <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">{children}</div> : null}
      </div>
    </section>
  );
}
