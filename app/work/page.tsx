import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";
import { curatedWorkJsonLd } from "@/lib/portfolio-curated";

export const metadata = pageMeta(
  "en",
  "work",
  "Projects — SaaS, AI Products, Marketplaces & Web Apps | Vlad Kuzmenko",
  "SaaS platforms, marketplaces, AI products, client portals and conversion websites — from MVPs to production systems. Real build stages, real screenshots, no invented metrics.",
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <PortfolioShowcasePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(curatedWorkJsonLd("en")) }} />
    </I18nProvider>
  );
}
