import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsMarketPageV3 } from "@/components/pages/VisibilityOsMarketPageV3";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "visibilityos",
  "VisibilityOS — Website Visibility Map, Growth Queue & Monitoring",
  "Run a public Visibility Map, save projects, execute a Growth Queue, verify completed changes and keep website visibility under recurring monitoring."
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <VisibilityOsMarketPageV3 />
    </I18nProvider>
  );
}
