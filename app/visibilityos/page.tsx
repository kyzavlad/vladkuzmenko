import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPage } from "@/components/pages/VisibilityOsPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "visibilityos",
  "VisibilityOS Website Intelligence | Conversion, Trust & AI Search",
  "Evidence-led website intelligence for conversion, trust, technical health, SEO, AEO and AI-search readiness, with personally reviewed early-access scans.",
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <VisibilityOsPage />
    </I18nProvider>
  );
}
