import { I18nProvider } from "@/components/i18n-provider";
import { AutomationPortfolioPage } from "@/components/pages/AutomationPortfolioPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "automation",
  "AI Automation & Business Systems | Vlad Kuzmenko",
  "Interactive examples of AI systems for enquiries, support, booking, sales and handoff to a manager — outcomes, not just chatbots.",
);

// Unified with /ua/automation and /ru/automation: one shared honest architecture
// (AutomationPortfolioPage) with locale-specific copy. The legacy EN-only
// HeroSection + PricingSection page was retired.
export default function Page() {
  return (
    <I18nProvider lang="en">
      <AutomationPortfolioPage />
    </I18nProvider>
  );
}
