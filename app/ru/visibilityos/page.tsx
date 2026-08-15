import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPage } from "@/components/pages/VisibilityOsPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "visibilityos",
  "VisibilityOS Website Intelligence | Conversion, Trust и AI Search",
  "Evidence-led website intelligence для conversion, trust, technical health, SEO, AEO и AI-search readiness, с личным review ранних scans.",
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <VisibilityOsPage />
    </I18nProvider>
  );
}
