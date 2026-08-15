import { I18nProvider } from "@/components/i18n-provider";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { pageMeta } from "@/lib/page-meta";
import {
  breadcrumbJsonLd,
  getEcosystemCopy,
  productsCollectionJsonLd,
} from "@/lib/ecosystem";

const x = getEcosystemCopy("ru");

export const metadata = pageMeta("ru", "products", x.products.metaTitle, x.products.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <ProductsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsCollectionJsonLd("ru")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("ru", x.products.eyebrow, "products")),
        }}
      />
    </I18nProvider>
  );
}
