"use client";

import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/site";
import { track } from "@/lib/analytics";
import { useI18n } from "@/components/i18n-provider";

export type RequestField = {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  defaultValue?: string;
};

interface RequestDialogProps {
  intent: string;
  title: string;
  description?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  /** Sent as a hidden field for attribution (which button opened the form). */
  buttonLabel?: string;
  /** Override the field set entirely (advanced). Otherwise the universal set is used. */
  fields?: RequestField[];
  /** Universal-form toggles (ignored when `fields` is provided). */
  showBuildType?: boolean;
  /** Index into the localized build-options list to pre-select. */
  presetBuildIndex?: number;
  helpLabel?: string;
  helpPlaceholder?: string;
  helpRequired?: boolean;
  /** Extra hidden context sent with the lead (e.g. product, project, offer). */
  context?: Record<string, string | number>;
  children: ReactNode;
  className?: string;
}

export function RequestDialog({
  intent,
  title,
  description,
  submitLabel,
  successTitle,
  successMessage,
  buttonLabel,
  fields,
  showBuildType = true,
  presetBuildIndex,
  helpLabel,
  helpPlaceholder,
  helpRequired = true,
  context,
  children,
  className,
}: RequestDialogProps) {
  const { lang, t } = useI18n();
  const f = t.form;

  const effectiveFields: RequestField[] =
    fields ??
    (() => {
      const list: RequestField[] = [
        { id: "name", label: f.name, required: true, placeholder: f.namePh },
        { id: "email", label: f.email, type: "email", required: true, placeholder: f.emailPh },
        { id: "phone", label: f.phone, placeholder: f.phonePh },
        { id: "company", label: f.company, placeholder: f.companyPh },
        { id: "website", label: f.website, placeholder: f.websitePh },
      ];
      if (showBuildType) {
        list.push({
          id: "buildType",
          label: f.buildTypeLabel,
          type: "select",
          options: f.buildOptions,
          defaultValue:
            presetBuildIndex != null ? f.buildOptions[presetBuildIndex] : undefined,
        });
      }
      list.push({
        id: "message",
        label: helpLabel ?? f.helpLabel,
        type: "textarea",
        required: helpRequired,
        placeholder: helpPlaceholder ?? f.helpPh,
      });
      return list;
    })();

  const seed = () => {
    const o: Record<string, string> = {};
    effectiveFields.forEach((field) => {
      if (field.defaultValue) o[field.id] = field.defaultValue;
    });
    return o;
  };

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Record<string, string>>(seed);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const set = (id: string, v: string) => setData((p) => ({ ...p, [id]: v }));
  const valid = effectiveFields.every(
    (field) => !field.required || (data[field.id] && data[field.id].trim() !== "")
  );

  const reset = () => {
    setData(seed());
    setSubmitting(false);
    setDone(false);
    setError(false);
    setSubmitError(false);
  };

  const onOpenChange = (o: boolean) => {
    setOpen(o);
    if (o) track("form_open", { intent, ...(buttonLabel ? { buttonLabel } : {}) });
    if (!o) setTimeout(reset, 300);
  };

  const submit = async () => {
    if (!valid) {
      setError(true);
      return;
    }
    setSubmitting(true);
    setError(false);
    setSubmitError(false);
    const ok = await submitLead({
      intent,
      language: lang,
      ...(buttonLabel ? { buttonLabel } : {}),
      ...(context || {}),
      ...data,
    });
    setSubmitting(false);
    if (ok) {
      setDone(true);
      track("form_submit", { intent, ...(buttonLabel ? { buttonLabel } : {}) });
      track("contact_form_submit", {
        intent,
        ...(buttonLabel ? { buttonLabel } : {}),
      });
    } else setSubmitError(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Open via onOpenChange so the form_open analytics event fires (a plain
          setOpen(true) bypasses Radix's controlled onOpenChange callback). */}
      <div
        onClick={() => onOpenChange(true)}
        className={cn("cursor-pointer", className)}
      >
        {children}
      </div>

      <DialogContent className="bg-black text-white border-amber-400/20 p-0 max-w-[560px] max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="p-8 text-center">
            <DialogHeader>
              <DialogTitle className="sr-only">{successTitle ?? f.successTitle}</DialogTitle>
            </DialogHeader>
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{successTitle ?? f.successTitle}</h3>
            <p className="text-gray-400">{successMessage ?? f.successMsg}</p>
            <Button className="mt-6 premium-button" onClick={() => onOpenChange(false)}>
              {f.close}
            </Button>
          </div>
        ) : (
          <div className="p-8">
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
            </DialogHeader>
            {description && <p className="text-sm text-gray-400 mt-2">{description}</p>}

            <div className="space-y-4 mt-6">
              {effectiveFields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-200">
                    {field.label}
                    {field.required && <span className="text-amber-400 ml-1">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea
                      value={data[field.id] || ""}
                      placeholder={field.placeholder}
                      onChange={(e) => set(field.id, e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={data[field.id] || ""}
                      onChange={(e) => set(field.id, e.target.value)}
                      className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    >
                      <option value="" className="bg-black">
                        {f.select}
                      </option>
                      {field.options?.map((o) => (
                        <option key={o} value={o} className="bg-black">
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={field.type || "text"}
                      value={data[field.id] || ""}
                      placeholder={field.placeholder}
                      onChange={(e) => set(field.id, e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  )}
                </div>
              ))}

              {error && <p className="text-sm text-red-400">{f.errorRequired}</p>}
              {submitError && (
                <p className="text-sm text-red-400">{f.errorSubmit}</p>
              )}

              <Button
                onClick={submit}
                disabled={submitting || !valid}
                className="w-full premium-button h-11 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {f.sending}
                  </>
                ) : (
                  <>
                    {submitLabel ?? f.submit}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-[11px] text-gray-500 text-center">{f.noSpam}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
