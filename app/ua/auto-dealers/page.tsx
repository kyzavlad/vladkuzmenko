import { I18nProvider } from "@/components/i18n-provider";
import { AutoDealersPage } from "@/components/pages/AutoDealersPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "auto-dealers",
  "AI-система обробки заявок для автодилерів | Vlad Kuzmenko",
  "Інтерактивна демонстрація кваліфікації звернень, формування готової заявки та передачі менеджеру автосалону.",
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <AutoDealersPage />
    </I18nProvider>
  );
}
