import { I18nProvider } from "@/components/i18n-provider";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { pageMeta } from "@/lib/page-meta";
import {
  breadcrumbJsonLd,
  getEcosystemCopy,
  productsCollectionJsonLd,
} from "@/lib/ecosystem";

const x = getEcosystemCopy("ua");

export const metadata = pageMeta("ua", "products", x.products.metaTitle, x.products.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <ProductsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsCollectionJsonLd("ua")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("ua", x.products.eyebrow, "products")),
        }}
      />
    </I18nProvider>
  );
}
