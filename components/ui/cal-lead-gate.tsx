"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { track } from "@/lib/analytics";
import type { Lang } from "@/lib/i18n";
import { SITE, submitLead } from "@/lib/site";

type PendingBooking = {
  href: string;
  buttonLabel: string;
};

type Copy = {
  title: string;
  description: string;
  submit: string;
  saving: string;
  error: string;
  direct: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    title: "Start with context, then choose a time",
    description:
      "Leave your name, email and website. The request stays tied to this page and its campaign context, then you continue to the calendar.",
    submit: "Continue to calendar",
    saving: "Saving request…",
    error: "The request could not be saved. Try again or continue to the calendar directly.",
    direct: "Open calendar directly",
  },
  ua: {
    title: "Спочатку контекст, потім час дзвінка",
    description:
      "Залиште ім’я, email і сайт. Заявка збереже сторінку та джерело переходу, після чого ви перейдете до вибору часу.",
    submit: "Перейти до вибору часу",
    saving: "Зберігаємо заявку…",
    error: "Не вдалося зберегти заявку. Спробуйте ще раз або відкрийте календар напряму.",
    direct: "Відкрити календар напряму",
  },
  ru: {
    title: "Сначала контекст, потом время звонка",
    description:
      "Оставьте имя, email и сайт. Заявка сохранит страницу и источник перехода, после чего вы перейдёте к выбору времени.",
    submit: "Перейти к выбору времени",
    saving: "Сохраняем заявку…",
    error: "Не удалось сохранить заявку. Попробуйте ещё раз или откройте календарь напрямую.",
    direct: "Открыть календарь напрямую",
  },
};

const EMPTY_FORM = {
  name: "",
  email: "",
  website: "",
  message: "",
};

export function CalLeadGate() {
  const { lang, t } = useI18n();
  const copy = COPY[lang];
  const formCopy = t.form;
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<PendingBooking | null>(null);
  const [data, setData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const interceptCalClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.dataset.calLeadGate === "skip") return;

      const href = anchor.href;
      if (!href.startsWith(SITE.calcom)) return;

      event.preventDefault();

      const buttonLabel =
        anchor.textContent?.replace(/\s+/g, " ").trim() || "Book a call";

      setPending({ href, buttonLabel });
      setError(false);
      setOpen(true);
      track("form_open", { intent: "call_booking_request", buttonLabel });
    };

    document.addEventListener("click", interceptCalClick, true);
    return () => document.removeEventListener("click", interceptCalClick, true);
  }, []);

  const update = (field: keyof typeof EMPTY_FORM, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  const reset = () => {
    setPending(null);
    setData(EMPTY_FORM);
    setSubmitting(false);
    setError(false);
  };

  const onOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) window.setTimeout(reset, 250);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pending || submitting || !data.name.trim() || !data.email.trim()) return;

    setSubmitting(true);
    setError(false);

    const ok = await submitLead({
      intent: "call_booking_request",
      language: lang,
      buttonLabel: pending.buttonLabel,
      bookingProvider: "cal.com",
      bookingUrl: pending.href,
      conversionPath: "website_lead_then_calendar",
      name: data.name.trim(),
      email: data.email.trim(),
      website: data.website.trim(),
      message: data.message.trim(),
    });

    setSubmitting(false);

    if (!ok) {
      setError(true);
      return;
    }

    track("form_submit", {
      intent: "call_booking_request",
      buttonLabel: pending.buttonLabel,
    });

    window.location.assign(pending.href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[560px] overflow-y-auto border-amber-400/20 bg-black p-0 text-white">
        <div className="p-7 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">{copy.title}</DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{copy.description}</p>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div className="space-y-1.5">
              <label htmlFor="cal-lead-name" className="text-sm font-medium text-zinc-200">
                {formCopy.name}<span className="ml-1 text-amber-400">*</span>
              </label>
              <Input
                id="cal-lead-name"
                autoComplete="name"
                required
                value={data.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder={formCopy.namePh}
                className="border-white/10 bg-white/5 text-white placeholder:text-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cal-lead-email" className="text-sm font-medium text-zinc-200">
                {formCopy.email}<span className="ml-1 text-amber-400">*</span>
              </label>
              <Input
                id="cal-lead-email"
                type="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={(event) => update("email", event.target.value)}
                placeholder={formCopy.emailPh}
                className="border-white/10 bg-white/5 text-white placeholder:text-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cal-lead-website" className="text-sm font-medium text-zinc-200">
                {formCopy.website}
              </label>
              <Input
                id="cal-lead-website"
                autoComplete="url"
                value={data.website}
                onChange={(event) => update("website", event.target.value)}
                placeholder={formCopy.websitePh}
                className="border-white/10 bg-white/5 text-white placeholder:text-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cal-lead-message" className="text-sm font-medium text-zinc-200">
                {formCopy.helpLabel}
              </label>
              <Textarea
                id="cal-lead-message"
                value={data.message}
                onChange={(event) => update("message", event.target.value)}
                placeholder={formCopy.helpPh}
                className="min-h-24 border-white/10 bg-white/5 text-white placeholder:text-zinc-600"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-400/15 bg-red-400/[.05] p-3">
                <p className="text-sm leading-6 text-red-300">{copy.error}</p>
                {pending ? (
                  <a
                    href={pending.href}
                    data-cal-lead-gate="skip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:text-white"
                  >
                    {copy.direct}<ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={submitting || !data.name.trim() || !data.email.trim()}
              className="premium-button h-11 w-full disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {copy.saving}
                </>
              ) : (
                <>
                  {copy.submit}<ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-center text-[11px] text-zinc-600">{formCopy.noSpam}</p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
