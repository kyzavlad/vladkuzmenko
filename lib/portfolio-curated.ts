import { SHOWCASE_PORTFOLIO, type ShowcaseProject } from "@/lib/portfolio-showcase";
import type { Lang } from "@/lib/i18n";

/**
 * Commercial ordering + final presentation overrides for the public portfolio.
 * The evidence/story source stays in portfolio-showcase.ts; this layer controls
 * prospect-facing ordering, current live URLs and the best verified proof asset.
 */
export type CuratedProject = ShowcaseProject & {
  /** Full proof media used only on the individual case page. Card previews stay lightweight. */
  caseShots?: string[];
};

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
] as const;

const rank = new Map<string, number>(COMMERCIAL_PRIORITY.map((key, index) => [key, index]));

/**
 * Status copy is intentionally project-specific. It tells a buyer what proof or
 * operating maturity exists without inflating concepts into launched products.
 */
const PROFESSIONAL_STATUS: Record<string, Record<Lang, string>> = {
  turbotaai: {
    en: "Working SaaS · active product development",
    ua: "Робочий SaaS · активний розвиток продукту",
    ru: "Рабочий SaaS · активное развитие продукта",
  },
  tutorivo: {
    en: "Live MVP · tested marketplace flow",
    ua: "Запущений MVP · перевірений marketplace flow",
    ru: "Запущенный MVP · проверенный marketplace flow",
  },
  "dating-crm": {
    en: "Operational CRM · validated workflow",
    ua: "Операційна CRM · перевірений робочий процес",
    ru: "Операционная CRM · проверенный рабочий процесс",
  },
  "status-auto": {
    en: "Buyer journey · interactive system prototype",
    ua: "Buyer journey · інтерактивний системний прототип",
    ru: "Buyer journey · интерактивный системный прототип",
  },
  ikorka: {
    en: "Voice AI · working call demo",
    ua: "Voice AI · робоче аудіодемо дзвінка",
    ru: "Voice AI · рабочее аудиодемо звонка",
  },
  "ser-crypto": {
    en: "Live delivery · public conversion site",
    ua: "Production-сайт · публічний клієнтський запуск",
    ru: "Production-сайт · публичный клиентский запуск",
  },
  "leather-clinic": {
    en: "Live client website · lead-capture flow",
    ua: "Production-сайт · lead capture локального сервісу",
    ru: "Production-сайт · lead capture локального сервиса",
  },
  "scratch-lab": {
    en: "Live service website · booking-ready journey",
    ua: "Production-сайт · шлях до запису й дзвінка",
    ru: "Production-сайт · путь к записи и звонку",
  },
  "cod-power-group": {
    en: "Operations platform · implementation-ready blueprint",
    ua: "Операційна платформа · blueprint до реалізації",
    ru: "Операционная платформа · blueprint к реализации",
  },
  "ai-agent-interface": {
    en: "Voice-agent product · validated interaction model",
    ua: "Voice-agent продукт · перевірена модель взаємодії",
    ru: "Voice-agent продукт · проверенная модель взаимодействия",
  },
  "telegram-mining": {
    en: "Telegram Mini App · retention model defined",
    ua: "Telegram Mini App · модель утримання й рефералів",
    ru: "Telegram Mini App · модель удержания и рефералов",
  },
  "un-amour": {
    en: "Commerce storefront · purchase journey designed",
    ua: "Ecommerce-вітрина · спроєктований purchase flow",
    ru: "Ecommerce-витрина · спроектированный purchase flow",
  },
  "nft-auction": {
    en: "Live-bidding UX · bid flow validated",
    ua: "Live-bidding UX · перевірений bid flow",
    ru: "Live-bidding UX · проверенный bid flow",
  },
  "nft-discovery": {
    en: "Marketplace discovery · mobile flow validated",
    ua: "Marketplace discovery · перевірений mobile flow",
    ru: "Marketplace discovery · проверенный mobile flow",
  },
  "nft-collections": {
    en: "Collections UX · mobile navigation system defined",
    ua: "Collections UX · мобільна система навігації",
    ru: "Collections UX · мобильная система навигации",
  },
  iko: {
    en: "B2B Web3 positioning · commercial interface",
    ua: "B2B Web3-позиціонування · комерційний інтерфейс",
    ru: "B2B Web3-позиционирование · коммерческий интерфейс",
  },
  convex: {
    en: "DeFi staking UX · trust model defined",
    ua: "DeFi staking UX · trust-first модель",
    ru: "DeFi staking UX · trust-first модель",
  },
  wallet: {
    en: "Self-custody wallet · security-first product flow",
    ua: "Self-custody wallet · security-first flow",
    ru: "Self-custody wallet · security-first flow",
  },
  oxhash: {
    en: "Developer platform · ecosystem acquisition flow",
    ua: "Developer platform · ecosystem acquisition flow",
    ru: "Developer platform · ecosystem acquisition flow",
  },
  carluxe: {
    en: "Service commerce · package-to-booking journey",
    ua: "Service commerce · шлях від пакета до запису",
    ru: "Service commerce · путь от пакета к записи",
  },
  pure: {
    en: "Product launch · comparison-led purchase flow",
    ua: "Product launch · comparison-led purchase flow",
    ru: "Product launch · comparison-led purchase flow",
  },
  kinex: {
    en: "Wearable launch · benefit-led product story",
    ua: "Wearable launch · benefit-led product story",
    ru: "Wearable launch · benefit-led product story",
  },
  velora: {
    en: "Commerce catalog · room-first discovery model",
    ua: "Commerce catalog · room-first discovery",
    ru: "Commerce catalog · room-first discovery",
  },
  aurea: {
    en: "Beauty commerce · proof-led product story",
    ua: "Beauty commerce · proof-led product story",
    ru: "Beauty commerce · proof-led product story",
  },
  nevard: {
    en: "Reusable ecommerce · multi-product framework",
    ua: "Reusable ecommerce · multi-product framework",
    ru: "Reusable ecommerce · multi-product framework",
  },
  bonatica: {
    en: "Skincare commerce · need-based merchandising",
    ua: "Skincare commerce · need-based merchandising",
    ru: "Skincare commerce · need-based merchandising",
  },
  verna: {
    en: "Repeat-purchase commerce · variant-led ordering",
    ua: "Repeat-purchase ecommerce · variant-led ordering",
    ru: "Repeat-purchase ecommerce · variant-led ordering",
  },
  ovulan: {
    en: "Premium commerce · trust-first positioning",
    ua: "Premium ecommerce · trust-first positioning",
    ru: "Premium ecommerce · trust-first positioning",
  },
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
      // Ikorka is represented by its verified voice recording. Do not reuse the
      // unrelated blockchain IKO artwork or any decorative screenshot here.
      const story = project.story;
      curated = {
        ...curated,
        shots: [],
        mediaFit: "contain",
        story: story
          ? {
              en: {
                ...story.en,
                evidence: "The case includes the actual recorded voice-assistant conversation.",
              },
              ua: {
                ...story.ua,
                evidence: "У кейсі доступний фактичний аудіозапис розмови голосового асистента.",
              },
              ru: {
                ...story.ru,
                evidence: "В кейсе доступна фактическая аудиозапись разговора голосового ассистента.",
              },
            }
          : story,
      };
      break;
    }
  }

  return curated;
}

export const CURATED_PORTFOLIO: CuratedProject[] = SHOWCASE_PORTFOLIO
  .filter((project) => project.key !== "reverie")
  .map(curate)
  .sort((a, b) => (rank.get(a.key) ?? 10_000) - (rank.get(b.key) ?? 10_000));

export const CURATED_CASE_SLUGS = CURATED_PORTFOLIO.map(
  (project) => project.caseSlug ?? project.key,
);

export function getCuratedProject(slug: string): CuratedProject | undefined {
  return CURATED_PORTFOLIO.find((project) => project.caseSlug === slug || project.key === slug);
}

function localePath(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

export function curatedCaseJsonLd(lang: Lang, project: CuratedProject) {
  const c = project.content[lang];
  const proofShots = project.caseShots?.length ? project.caseShots : project.shots;
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
        ...(project.shots[0]
          ? { image: `https://vladkuzmenko.com${project.shots[0]}` }
          : {}),
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
      };
    }),
  };
}
