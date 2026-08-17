import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPremiumPage } from "@/components/pages/VisibilityOsPremiumPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "visibilityos",
  "VisibilityOS — Live Website Evidence Scan",
  "Scan a public website for observable SEO, trust, technical and conversion-path signals, see evidence and priorities, then request human review where judgment is required."
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <VisibilityOsPremiumPage />
    </I18nProvider>
  );
}
