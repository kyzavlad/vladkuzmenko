import { SHOWCASE_PORTFOLIO, type ShowcaseProject } from "@/lib/portfolio-showcase";

/**
 * Commercial ordering + final presentation overrides for the public portfolio.
 *
 * Keep the evidence/story source in portfolio-showcase.ts. This layer only
 * controls how verified projects are presented to a prospect: strongest proof
 * first, current live URLs, and the best available proof asset.
 */
const COMMERCIAL_PRIORITY = [
  "turbotaai",
  "tutorivo",
  "dating-crm",
  "status-auto",
  "ikorka",
  "ser-crypto",
  "leather-clinic",
  "scratch-lab",
  "cod-power-group",
  "ai-agent-interface",
  "telegram-mining",
  "un-amour",
  "nft-auction",
  "nft-discovery",
  "nft-collections",
  "iko",
  "convex",
  "wallet",
  "oxhash",
  "carluxe",
  "pure",
  "kinex",
  "velora",
  "aurea",
  "nevard",
  "bonatica",
  "verna",
  "ovulan",
  "reverie",
] as const;

const rank = new Map<string, number>(COMMERCIAL_PRIORITY.map((key, index) => [key, index]));

function curate(project: ShowcaseProject): ShowcaseProject {
  switch (project.key) {
    case "tutorivo":
      return {
        ...project,
        liveUrl: "https://tutorivo.eu/",
      };
    case "dating-crm":
      return {
        ...project,
        shots: ["/case-studies/dating-crm/hero.avif"],
        mediaFit: "contain",
      };
    case "leather-clinic":
      return {
        ...project,
        shots: ["/case-studies/leather-clinic/hero.avif"],
        mediaFit: "cover",
      };
    case "scratch-lab":
      return {
        ...project,
        shots: ["/case-studies/scratch-lab/hero.avif"],
        mediaFit: "cover",
      };
    case "ai-agent-interface":
      return {
        ...project,
        shots: ["/case-studies/ai-agent-interface/hero.avif"],
        mediaFit: "contain",
      };
    case "ikorka":
      // Do not show the blockchain IKO screenshot here. Ikorka's verified proof
      // is its real voice recording, so the portfolio renders a dedicated voice
      // proof surface and keeps the audio player attached to this project only.
      return {
        ...project,
        shots: [],
        mediaFit: "contain",
      };
    default:
      return project;
  }
}

export const CURATED_PORTFOLIO: ShowcaseProject[] = SHOWCASE_PORTFOLIO
  .map(curate)
  .sort((a, b) => {
    const ar = rank.get(a.key) ?? 10_000;
    const br = rank.get(b.key) ?? 10_000;
    return ar - br;
  });

export function getCuratedProject(slug: string): ShowcaseProject | undefined {
  return CURATED_PORTFOLIO.find((project) => project.caseSlug === slug || project.key === slug);
}
