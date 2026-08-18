import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsMarketPageV3 } from "@/components/pages/VisibilityOsMarketPageV3";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "visibilityos",
  "VisibilityOS — Visibility Map, Growth Queue та моніторинг сайту",
  "Побудуйте public Visibility Map, збережіть проєкт, виконуйте Growth Queue, перевіряйте completed changes і тримайте visibility сайту під recurring monitoring."
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <VisibilityOsMarketPageV3 />
    </I18nProvider>
  );
}
