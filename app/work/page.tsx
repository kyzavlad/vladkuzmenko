import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";

const baseMetadata = pageMeta(
  "en",
  "work",
  "Projects — SaaS, AI Products, Marketplaces & Web Apps | Vlad Kuzmenko",
  "SaaS platforms, marketplaces, AI products, client portals and websites — completed projects, working products and interface solutions by Vlad Kuzmenko.",
);

export const metadata = {
  ...baseMetadata,
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://vladkuzmenko.com/growth-systems",
    languages: {
      en: "https://vladkuzmenko.com/growth-systems",
      uk: "https://vladkuzmenko.com/ua/growth-systems",
      ru: "https://vladkuzmenko.com/ru/growth-systems",
      "x-default": "https://vladkuzmenko.com/growth-systems",
    },
  },
};

export default function Page() {
  return (
    <I18nProvider lang="en">
      <PortfolioShowcasePage />
    </I18nProvider>
  );
}
