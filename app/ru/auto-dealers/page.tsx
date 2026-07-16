import { I18nProvider } from "@/components/i18n-provider";
import { AutoDealersPage } from "@/components/pages/AutoDealersPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "auto-dealers",
  "AI-система обработки заявок для автодилеров | Vlad Kuzmenko",
  "Интерактивная демонстрация квалификации обращений, формирования готовой заявки и передачи менеджеру автосалона.",
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <AutoDealersPage />
    </I18nProvider>
  );
}
