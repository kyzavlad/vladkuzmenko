import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n-provider";
import { WorkCasePage } from "@/components/pages/WorkCasePage";
import { pageMeta } from "@/lib/page-meta";
import { CASE_DETAIL_SLUGS, getCaseDetail, caseJsonLd } from "@/lib/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_DETAIL_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseDetail(params.slug);
  if (!study) return {};
  const c = study.content.ru;
  return pageMeta("ru", `work/${params.slug}`, `${c.name} — кейс | Vlad Kuzmenko`, c.context);
}

export default function Page({ params }: { params: { slug: string } }) {
  const study = getCaseDetail(params.slug);
  return (
    <I18nProvider lang="ru">
      <WorkCasePage slug={params.slug} />
      {study && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd("ru", study)) }} />
      )}
    </I18nProvider>
  );
}
