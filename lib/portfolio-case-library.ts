import type { Lang } from "@/lib/i18n";
import type { Category } from "@/lib/portfolio";
import type { ShowcaseProject } from "@/lib/portfolio-showcase";
import catalog from "@/lib/portfolio-case-library.json";

type CaseCopy = { name: string; type: string; description: string };

export interface ProjectGallery {
  scope: "design" | "site";
  cover: string;
  images: string[];
  designSource?: { name: string; url: string };
}

interface CaseEntry {
  slug: string;
  category: Category;
  scope: ProjectGallery["scope"];
  copy: Record<Lang, CaseCopy>;
  images: string[];
  designSource?: ProjectGallery["designSource"];
}

export type LibraryProject = ShowcaseProject & { gallery: ProjectGallery };

function cardCopy(copy: CaseCopy) {
  return {
    name: copy.name,
    type: copy.type,
    outcome: copy.description.split(/(?<=[.!?])\s/, 1)[0],
    problem: "",
    built: copy.description,
    result: "",
    capabilities: [],
  };
}

export const PORTFOLIO_CASE_LIBRARY: LibraryProject[] = (catalog as CaseEntry[]).map((entry) => {
  const basePath = `/portfolio/projects/${entry.slug}`;
  const cover = `${basePath}/cover.webp`;

  return {
    key: entry.slug,
    caseSlug: entry.slug,
    category: entry.category,
    status: "concept",
    shots: [`${basePath}/card.webp`],
    mediaFit: "contain",
    gallery: {
      scope: entry.scope,
      cover,
      images: entry.images.map((image) => `${basePath}/${image}`),
      designSource: entry.designSource,
    },
    content: {
      en: cardCopy(entry.copy.en),
      ua: cardCopy(entry.copy.ua),
      ru: cardCopy(entry.copy.ru),
    },
  };
});
