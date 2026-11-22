"use client";

import { useI18n } from "@/components/i18n-provider";
import { SITE } from "@/lib/site";

export function LeadDeliveryError() {
  const { t } = useI18n();

  return (
    <div role="alert" className="rounded-xl border border-red-400/20 bg-red-500/5 px-4 py-3 text-sm leading-6 text-red-200">
      <p>{t.contact.deliveryErrorMsg}</p>
      <a
        href={SITE.socials.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center rounded-sm font-medium text-sky-200 underline underline-offset-4 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
      >
        {t.contact.telegramContact}
      </a>
    </div>
  );
}
