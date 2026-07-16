import { I18nProvider } from "@/components/i18n-provider";
import { AutoDealersPage } from "@/components/pages/AutoDealersPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "auto-dealers",
  "AI Lead Qualification for Automotive Dealers | Vlad Kuzmenko",
  "Interactive demonstration of an AI-assisted enquiry qualification and manager handoff system for automotive dealers.",
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <AutoDealersPage />
    </I18nProvider>
  );
}
