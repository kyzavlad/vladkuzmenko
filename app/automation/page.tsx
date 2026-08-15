import { I18nProvider } from "@/components/i18n-provider";
import { AutomationPortfolioPage } from "@/components/pages/AutomationPortfolioPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "automation",
  "AI Systems & Automation for Business | Vlad Kuzmenko",
  "Interactive examples of AI systems for lead handling, support, booking, sales and structured handoff to a manager.",
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <AutomationPortfolioPage />
    </I18nProvider>
  );
}
