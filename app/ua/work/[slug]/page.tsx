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
  const c = study.content.ua;
  return pageMeta("ua", `work/${params.slug}`, `${c.name} — кейс | Vlad Kuzmenko`, c.outcome, study.shots[0]);
}

export default function Page({ params }: { params: { slug: string } }) {
  const study = getCaseDetail(params.slug);
  return (
    <I18nProvider lang="ua">
      <WorkCasePage slug={params.slug} />
      {study && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd("ua", study)) }} />
      )}
    </I18nProvider>
  );
}
