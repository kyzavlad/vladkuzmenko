import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsMarketPage } from "@/components/pages/VisibilityOsMarketPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "visibilityos",
  "VisibilityOS — Website, Local SEO & Conversion Visibility Map",
  "Scan a website in its real service and location context. Map crawl, SEO, local relevance, trust and conversion gaps, compare competitors and get a Growth Queue."
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <VisibilityOsMarketPage />
    </I18nProvider>
  );
}
