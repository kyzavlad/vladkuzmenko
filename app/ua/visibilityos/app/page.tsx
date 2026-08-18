import type { Metadata } from "next";

import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsAppPage } from "@/components/pages/VisibilityOsAppPage";

export const metadata: Metadata = {
  title: "VisibilityOS — Кабінет",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <VisibilityOsAppPage />
    </I18nProvider>
  );
}
