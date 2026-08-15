import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPage } from "@/components/pages/VisibilityOsPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "visibilityos",
  "VisibilityOS Website Intelligence | Conversion, Trust та AI Search",
  "Evidence-led website intelligence для conversion, trust, technical health, SEO, AEO та AI-search readiness, з особистим review ранніх scans.",
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <VisibilityOsPage />
    </I18nProvider>
  );
}
