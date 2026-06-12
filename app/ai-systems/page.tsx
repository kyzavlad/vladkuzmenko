import { I18nProvider } from "@/components/i18n-provider";
import { AiSystemsPage } from "@/components/pages/AiSystemsPage";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";

const d = getDict("en");
export const metadata = pageMeta("en", "ai-systems", d.meta.aiSystemsTitle, d.meta.aiSystemsDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <AiSystemsPage />
    </I18nProvider>
  );
}
