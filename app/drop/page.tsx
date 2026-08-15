import { I18nProvider } from "@/components/i18n-provider";
import { DropPage } from "@/components/pages/DropPage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd } from "@/lib/ecosystem";

export const metadata = pageMeta(
  "en",
  "drop",
  "Performance Meal Sets & Essentials | Vlad Kuzmenko",
  "Performance food for training days, work and travel. Get first access to the first local meal-set line when the real menu and conditions are ready.",
);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <DropPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("en", "Performance", "drop")) }}
      />
    </I18nProvider>
  );
}
