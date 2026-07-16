import { I18nProvider } from "@/components/i18n-provider";
import { AutomationPortfolioPage } from "@/components/pages/AutomationPortfolioPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "automation",
  "AI-системы и автоматизация для бизнеса | Vlad Kuzmenko",
  "Интерактивные примеры AI-систем для обработки обращений, поддержки, записи, продаж и передачи данных менеджеру.",
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <AutomationPortfolioPage />
    </I18nProvider>
  );
}
