import type { Metadata } from "next";

import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsAppPage } from "@/components/pages/VisibilityOsAppPage";

export const metadata: Metadata = {
  title: "VisibilityOS Workspace",
  description: "Saved projects, Growth Queue, scan history and recurring visibility monitoring.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <I18nProvider lang="en">
      <VisibilityOsAppPage />
    </I18nProvider>
  );
}
