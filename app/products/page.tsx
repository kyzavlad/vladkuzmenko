import { I18nProvider } from "@/components/i18n-provider";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { pageMeta } from "@/lib/page-meta";
import {
  breadcrumbJsonLd,
  getEcosystemCopy,
  productsCollectionJsonLd,
} from "@/lib/ecosystem";

const x = getEcosystemCopy("en");

export const metadata = pageMeta("en", "products", x.products.metaTitle, x.products.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <ProductsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsCollectionJsonLd("en")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("en", x.products.eyebrow, "products")),
        }}
      />
    </I18nProvider>
  );
}
