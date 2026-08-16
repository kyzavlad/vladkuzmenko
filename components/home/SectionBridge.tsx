type BridgeTone = "gold" | "blue" | "violet" | "green" | "neutral";

const TONES: Record<BridgeTone, { glow: string; line: string }> = {
  gold: {
    glow: "rgba(212,175,55,.11)",
    line: "rgba(245,190,52,.28)",
  },
  blue: {
    glow: "rgba(56,189,248,.09)",
    line: "rgba(125,211,252,.24)",
  },
  violet: {
    glow: "rgba(139,92,246,.09)",
    line: "rgba(196,181,253,.22)",
  },
  green: {
    glow: "rgba(16,185,129,.08)",
    line: "rgba(110,231,183,.21)",
  },
  neutral: {
    glow: "rgba(255,255,255,.035)",
    line: "rgba(255,255,255,.09)",
  },
};

export function SectionBridge({ tone = "neutral" }: { tone?: BridgeTone }) {
  const t = TONES[tone];

  return (
    <div className="pointer-events-none relative z-20 h-0" aria-hidden="true">
      <div
        className="absolute left-0 right-0 top-0 h-36 -translate-y-1/2"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(2,2,2,.92) 42%, rgba(2,2,2,.98) 50%, rgba(2,2,2,.90) 58%, transparent 100%)`,
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-28 w-[min(900px,88vw)] -translate-x-1/2 -translate-y-1/2 blur-2xl"
        style={{ background: `radial-gradient(ellipse at center, ${t.glow}, transparent 68%)` }}
      />
      <div
        className="absolute left-1/2 top-0 h-px w-[min(760px,72vw)] -translate-x-1/2"
        style={{ background: `linear-gradient(90deg, transparent, ${t.line}, transparent)` }}
      />
    </div>
  );
}
