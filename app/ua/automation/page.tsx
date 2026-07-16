import { I18nProvider } from "@/components/i18n-provider";
import { AutomationPortfolioPage } from "@/components/pages/AutomationPortfolioPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "automation",
  "AI-системи та автоматизація для бізнесу | Vlad Kuzmenko",
  "Інтерактивні приклади AI-систем для обробки звернень, підтримки, запису, продажів і передачі даних менеджеру.",
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <AutomationPortfolioPage />
    </I18nProvider>
  );
}
