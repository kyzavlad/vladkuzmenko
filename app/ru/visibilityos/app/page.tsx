import type { Metadata } from "next";

import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsAppPage } from "@/components/pages/VisibilityOsAppPage";

export const metadata: Metadata = {
  title: "VisibilityOS — Кабинет",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <VisibilityOsAppPage />
    </I18nProvider>
  );
}
