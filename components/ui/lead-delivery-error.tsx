"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/site";

interface DraftField {
  label: string;
  value?: string;
}

export function LeadDeliveryError({ fields }: { fields: readonly DraftField[] }) {
  const { t } = useI18n();
  const draft = fields.flatMap(({ label, value }) => {
    const text = value?.trim();
    return text ? [label + "\n" + text] : [];
  }).join("\n\n");
  const [copying, setCopying] = useState(false);
  const [copy, setCopy] = useState<{ draft: string; status: "copied" | "manual" }>();
  const copyStatus = copy?.draft === draft ? copy.status : undefined;
  const manualInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (copyStatus === "manual") {
      manualInput.current?.focus();
      manualInput.current?.select();
    }
  }, [copyStatus]);

  async function copyRequest() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(draft);
      setCopy({ draft, status: "copied" });
    } catch {
      setCopy({ draft, status: "manual" });
    } finally {
      setCopying(false);
    }
  }

  return (
    <div role="alert" className="rounded-xl border border-red-400/20 bg-red-500/5 px-4 py-3 text-sm leading-6 text-red-200">
      <p>{t.contact.deliveryErrorMsg}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          disabled={copying || !draft}
          onClick={copyRequest}
          className="min-h-11 rounded-md border border-sky-200/30 px-3 font-medium text-sky-100 hover:bg-sky-200/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 disabled:opacity-50"
        >
          {t.contact.copyRequest}
        </button>
        <a
          href={SITE.socials.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-sm font-medium text-sky-200 underline underline-offset-4 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
        >
          {t.contact.telegramContact}
        </a>
      </div>
      {copyStatus === "copied" && (
        <p role="status" className="mt-2 text-sky-100">{t.contact.requestCopied}</p>
      )}
      {copyStatus === "manual" && (
        <div className="mt-2">
          <p>{t.contact.manualCopy}</p>
          <Textarea
            ref={manualInput}
            aria-label={t.contact.copyRequest}
            readOnly
            value={draft}
            className="mt-2 border-white/10 bg-black/30 text-white"
          />
        </div>
      )}
    </div>
  );
}
