import { SHOWCASE_PORTFOLIO, type ShowcaseProject } from "@/lib/portfolio-showcase";
import type { Lang } from "@/lib/i18n";

/**
 * Commercial ordering + final presentation overrides for the public portfolio.
 * The evidence/story source stays in portfolio-showcase.ts; this layer controls
 * prospect-facing ordering, current live URLs and the best verified proof asset.
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
      return { ...project, liveUrl: "https://tutorivo.eu/" };
    case "dating-crm":
      return { ...project, shots: ["/case-studies/dating-crm/hero.avif"], mediaFit: "contain" };
    case "leather-clinic":
      return { ...project, shots: ["/case-studies/leather-clinic/hero.avif"], mediaFit: "cover" };
    case "scratch-lab":
      return { ...project, shots: ["/case-studies/scratch-lab/hero.avif"], mediaFit: "cover" };
    case "ai-agent-interface":
      return { ...project, shots: ["/case-studies/ai-agent-interface/hero.avif"], mediaFit: "contain" };
    case "ikorka": {
      // Never reuse the unrelated blockchain IKO artwork here. Ikorka's verified
      // proof is the actual voice recording, so visual + structured data both
      // stay image-free until a verified Ikorka photo is available.
      const story = project.story;
      return {
        ...project,
        shots: [],
        mediaFit: "contain",
        story: story
          ? {
              en: { ...story.en, evidence: "A real audio recording of the voice assistant is embedded in this case." },
              ua: { ...story.ua, evidence: "У кейсі вбудований реальний аудіозапис голосового асистента." },
              ru: { ...story.ru, evidence: "В кейс встроена реальная аудиозапись голосового ассистента." },
            }
          : story,
      };
    }
    default:
      return project;
  }
}

export const CURATED_PORTFOLIO: ShowcaseProject[] = SHOWCASE_PORTFOLIO
  .map(curate)
  .sort((a, b) => (rank.get(a.key) ?? 10_000) - (rank.get(b.key) ?? 10_000));

export function getCuratedProject(slug: string): ShowcaseProject | undefined {
  return CURATED_PORTFOLIO.find((project) => project.caseSlug === slug || project.key === slug);
}

function localePath(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

export function curatedCaseJsonLd(lang: Lang, project: ShowcaseProject) {
  const c = project.content[lang];
  const image = project.shots.length
    ? project.shots.map((shot) => `https://vladkuzmenko.com${shot}`)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.name,
    description: c.outcome,
    url: `https://vladkuzmenko.com${localePath(lang)}/work/${project.caseSlug ?? project.key}`,
    ...(image ? { image } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    creator: {
      "@type": "Person",
      name: "Vlad Kuzmenko",
      url: "https://vladkuzmenko.com",
    },
  };
}

export function curatedWorkJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      lang === "ru"
        ? "Проекты Vlad Kuzmenko"
        : lang === "ua"
          ? "Проєкти Vlad Kuzmenko"
          : "Vlad Kuzmenko projects",
    url: `https://vladkuzmenko.com${localePath(lang)}/work`,
    hasPart: CURATED_PORTFOLIO.map((project) => {
      const c = project.content[lang];
      return {
        "@type": "CreativeWork",
        name: c.name,
        url: `https://vladkuzmenko.com${localePath(lang)}/work/${project.caseSlug ?? project.key}`,
        description: c.outcome,
        ...(project.shots[0] ? { image: `https://vladkuzmenko.com${project.shots[0]}` } : {}),
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
      };
    }),
  };
}
