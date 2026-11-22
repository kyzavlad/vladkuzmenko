import { SHOWCASE_PORTFOLIO, type ShowcaseProject } from "@/lib/portfolio-showcase";
import { PORTFOLIO_CASE_LIBRARY, type ProjectGallery } from "@/lib/portfolio-case-library";
import type { Lang } from "@/lib/i18n";

/**
 * Commercial ordering + final presentation overrides for the public portfolio.
 * The evidence/story source stays in portfolio-showcase.ts; this layer controls
 * prospect-facing ordering, current live URLs and the best verified proof asset.
 */
export type CuratedProject = ShowcaseProject & {
  /** Full proof media used only on the individual case page. Card previews stay lightweight. */
  caseShots?: string[];
  gallery?: ProjectGallery;
};

const COMPLETED = {
  en: "Completed project",
  ua: "Завершений проєкт",
  ru: "Завершённый проект",
} satisfies Record<Lang, string>;

const PROFESSIONAL_STATUS: Record<string, Record<Lang, string>> = {
  turbotaai: {
    en: "Working product · in development",
    ua: "Робочий продукт · у розвитку",
    ru: "Рабочий продукт · в развитии",
  },
  tutorivo: {
    en: "Launched MVP",
    ua: "Запущений MVP",
    ru: "Запущенный MVP",
  },
  "dating-crm": {
    en: "Completed CRM prototype",
    ua: "Завершений CRM-прототип",
    ru: "Завершённый CRM-прототип",
  },
  "status-auto": {
    en: "Interactive prototype",
    ua: "Інтерактивний прототип",
    ru: "Интерактивный прототип",
  },
  ikorka: {
    en: "Working audio demo",
    ua: "Робоче аудіодемо",
    ru: "Рабочее аудиодемо",
  },
  "ser-crypto": {
    en: "Website case study",
    ua: "Кейс сайту",
    ru: "Кейс сайта",
  },
  "leather-clinic": {
    en: "Launched client website",
    ua: "Запущений клієнтський сайт",
    ru: "Запущенный клиентский сайт",
  },
  "scratch-lab": {
    en: "Launched client website",
    ua: "Запущений клієнтський сайт",
    ru: "Запущенный клиентский сайт",
  },
  "cod-power-group": {
    en: "Platform project",
    ua: "Проєкт платформи",
    ru: "Проект платформы",
  },
  "ai-agent-interface": {
    en: "Interactive AI prototype",
    ua: "Інтерактивний AI-прототип",
    ru: "Интерактивный AI-прототип",
  },
  "telegram-mining": COMPLETED,
  "un-amour": COMPLETED,
  "nft-auction": COMPLETED,
  "nft-discovery": COMPLETED,
  "nft-collections": COMPLETED,
  iko: COMPLETED,
  convex: COMPLETED,
  wallet: COMPLETED,
  oxhash: COMPLETED,
  carluxe: COMPLETED,
  pure: COMPLETED,
  kinex: COMPLETED,
  velora: COMPLETED,
  aurea: COMPLETED,
  nevard: COMPLETED,
  bonatica: COMPLETED,
  verna: COMPLETED,
  ovulan: COMPLETED,
};

/** Full-length proof media. These files are not used as heavy card previews. */
const CASE_SHOTS: Record<string, string[]> = {
  "dating-crm": ["/portfolio/full/dating-crm-full.png"],
  "leather-clinic": ["/portfolio/full/leather-clinic-full.png"],
  "scratch-lab": ["/portfolio/full/scratch-lab-full.png"],
  "ai-agent-interface": ["/portfolio/full/ai-agent-voice-playground-full.png"],
  iko: ["/portfolio/full/iko/full-page.jpg"],
  convex: ["/portfolio/full/convex/full-page.jpg"],
  wallet: ["/portfolio/full/wallet/full-page.jpg"],
  oxhash: ["/portfolio/full/oxhash/full-page.jpg"],
  "cod-power-group": ["/portfolio/full/cod-power-group/full-page.jpg"],
  "telegram-mining": ["/portfolio/full/telegram-mining/product-screens.jpg"],
  "un-amour": ["/portfolio/full/un-amour/full-page.jpg"],
  "nft-auction": ["/portfolio/full/nft-auction/auction-screens.jpg"],
  "nft-discovery": ["/portfolio/full/nft-discovery/marketplace-overview.jpg"],
  "nft-collections": ["/portfolio/full/nft-collections/collection-screens.jpg"],
  carluxe: ["/portfolio/full/carluxe/full-page.jpg"],
  pure: ["/portfolio/full/pure/full-page.jpg"],
  kinex: ["/portfolio/full/kinex/full-page.jpg"],
  velora: ["/portfolio/full/velora/full-page.jpg"],
  aurea: [
    "/portfolio/full/aurea/full-page.jpg",
    "/portfolio/full/aurea/product-proof.jpg",
  ],
  nevard: [
    "/portfolio/full/nevard/full-page.jpg",
    "/portfolio/full/nevard/product-overview.jpg",
  ],
  bonatica: ["/portfolio/full/bonatica/full-page.jpg"],
  verna: ["/portfolio/full/verna/full-page.jpg"],
  ovulan: [
    "/portfolio/full/ovulan/full-page.jpg",
    "/portfolio/full/ovulan/hero.jpg",
  ],
};

function curate(project: ShowcaseProject): CuratedProject {
  let curated: CuratedProject = {
    ...project,
    ...(PROFESSIONAL_STATUS[project.key]
      ? { statusLabel: PROFESSIONAL_STATUS[project.key] }
      : {}),
    ...(CASE_SHOTS[project.key] ? { caseShots: CASE_SHOTS[project.key] } : {}),
  };

  switch (project.key) {
    case "turbotaai":
      curated = {
        ...curated,
        mediaFit: "contain",
      };
      break;
    case "tutorivo":
      curated = { ...curated, liveUrl: "https://tutorivo.eu/" };
      break;
    case "dating-crm":
      curated = {
        ...curated,
        shots: ["/portfolio/full/dating-crm-full.png"],
        mediaFit: "contain",
      };
      break;
    case "leather-clinic":
      curated = {
        ...curated,
        shots: ["/portfolio/full/leather-clinic-full.png"],
        mediaFit: "contain",
      };
      break;
    case "scratch-lab":
      curated = {
        ...curated,
        shots: ["/portfolio/full/scratch-lab-full.png"],
        mediaFit: "contain",
      };
      break;
    case "ai-agent-interface":
      curated = {
        ...curated,
        shots: ["/portfolio/full/ai-agent-voice-playground-full.png"],
        mediaFit: "contain",
      };
      break;
    case "ikorka": {
      const story = project.story;
      curated = {
        ...curated,
        shots: [],
        mediaFit: "contain",
        story: story
          ? {
              en: {
                ...story.en,
                evidence: "The voice-assistant conversation is available as an audio demo in the case.",
              },
              ua: {
                ...story.ua,
                evidence: "Аудіозапис розмови голосового асистента доступний у кейсі.",
              },
              ru: {
                ...story.ru,
                evidence: "Аудиозапись разговора голосового ассистента доступна в кейсе.",
              },
            }
          : story,
      };
      break;
    }
  }

  return curated;
}

const REMOVED_CASE_KEYS = new Set(["dacha-tv", "reverie", "visibilityos-audit"]);
const LEGACY_CASES = SHOWCASE_PORTFOLIO
  .filter((project) => !REMOVED_CASE_KEYS.has(project.key))
  .map(curate);

function legacyCases(keys: string[]): CuratedProject[] {
  return keys
    .map((key) => LEGACY_CASES.find((project) => project.key === key))
    .filter((project): project is CuratedProject => Boolean(project));
}

export const CURATED_PORTFOLIO: CuratedProject[] = [
  ...PORTFOLIO_CASE_LIBRARY.slice(0, 6),
  ...legacyCases(["tutorivo", "turbotaai"]),
  ...PORTFOLIO_CASE_LIBRARY.slice(6, 23),
  ...legacyCases(["cod-power-group", "portfolio-enquiry-intake", "dating-crm"]),
  ...PORTFOLIO_CASE_LIBRARY.slice(23),
  ...legacyCases(["scratch-lab", "appointment-booking-automation"]),
];

const CASES_BY_SLUG = new Map(
  [...LEGACY_CASES, ...CURATED_PORTFOLIO].map((project) => [project.caseSlug, project]),
);

/**
 * Homepage proof, curated explicitly.
 *
 * Kept separate from CURATED_PORTFOLIO ordering so homepage evidence can change
 * without touching the commercial ordering of /work. Selection rules, in order:
 *   1. a real working / launched product beats a concept;
 *   2. a real public or client implementation beats an internal prototype;
 *   3. verified screenshots must exist;
 *   4. commercial relevance to the current Growth Systems offer;
 *   5. variety across AI product / platform / conversion web.
 *
 * tutorivo — launched, tested two-sided marketplace.
 * turbotaai — AI SaaS with a customer app and operations console.
 * portfolio-enquiry-intake — multilingual website with a tested enquiry workflow.
 */
export const HOME_FEATURED_KEYS = ["tutorivo", "turbotaai", "portfolio-enquiry-intake"] as const;

export const HOME_FEATURED: CuratedProject[] = HOME_FEATURED_KEYS.map((key) =>
  CURATED_PORTFOLIO.find((project) => project.key === key),
).filter((project): project is CuratedProject => Boolean(project));

export const CURATED_CASE_SLUGS = CURATED_PORTFOLIO.map(
  (project) => project.caseSlug ?? project.key,
);

export const AVAILABLE_CASE_SLUGS = [...CASES_BY_SLUG.keys()];

export function getCuratedProject(slug: string): CuratedProject | undefined {
  return CASES_BY_SLUG.get(slug);
}

function localePath(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

export function curatedCaseJsonLd(lang: Lang, project: CuratedProject) {
  const c = project.content[lang];
  const proofShots = project.gallery
    ? [project.gallery.cover, ...project.gallery.images.slice(0, 3)]
    : project.caseShots?.length ? project.caseShots : project.shots;
  const image = proofShots.length
    ? proofShots.map((shot) => `https://vladkuzmenko.com${shot}`)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.name,
    description: c.outcome,
    url: `https://vladkuzmenko.com${localePath(lang)}/work/${project.caseSlug ?? project.key}`,
    ...(image ? { image } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(!project.gallery && {
      creator: { "@type": "Person", name: "Vlad Kuzmenko", url: "https://vladkuzmenko.com" },
    }),
    ...(project.gallery?.designSource && { isBasedOn: project.gallery.designSource.url }),
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
        ...(project.shots[0]
          ? { image: `https://vladkuzmenko.com${project.shots[0]}` }
          : {}),
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
      };
    }),
  };
}
