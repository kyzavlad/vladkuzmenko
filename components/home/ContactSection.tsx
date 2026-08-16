"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Loader2, CheckCircle, Send, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE, submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";

const EYEBROW: Record<Lang, string> = {
  en: "Next step",
  ua: "Наступний крок",
  ru: "Следующий шаг",
};

export function ContactSection() {
  const { lang, t } = useI18n();
  const c = t.contact;
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const set = (key: string, value: string) => setForm((previous) => ({ ...previous, [key]: value }));
  const valid = Boolean(form.name?.trim() && form.email?.trim() && form.message?.trim());

  const submit = async () => {
    if (!valid) {
      setError(true);
      return;
    }
    setSubmitting(true);
    setError(false);
    const ok = await submitLead({
      intent: "general_request",
      language: lang,
      buttonLabel: "Contact - Send message",
      ...form,
    });
    setSubmitting(false);
    if (ok) setDone(true);
    else setError(true);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#020202] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.085),rgba(255,255,255,.012)_38%,transparent_68%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(760px,76vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/32 to-transparent shadow-[0_0_30px_rgba(212,175,55,.13)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/70">{EYEBROW[lang]}</span>
          <h2 className="section-title mt-4 text-[clamp(2.8rem,5vw,4.7rem)] text-zinc-100">
            {c.titleA}
            <em className="gradient-gold-text font-normal italic">{c.titleB}</em>
          </h2>
          <p className="section-lead mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{c.desc}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.012))] p-6 sm:p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/22 bg-amber-300/[.06] text-amber-200">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-100">{t.cta.bookCall}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-500">{c.desc}</p>

            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer" className="mt-7">
              <Button className="premium-button h-auto min-h-12 w-full px-6 py-3.5">
                {t.cta.bookCall}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>

            <div className="mt-7 border-t border-white/[.07] pt-5">
              <div className="grid gap-2.5">
                <a href={SITE.socials.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-black/28 px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-white/[.14] hover:text-white">
                  <Send className="h-4 w-4 text-sky-300/75" /> Telegram
                </a>
                <a href={SITE.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-black/28 px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-white/[.14] hover:text-white">
                  <MessageCircle className="h-4 w-4 text-emerald-300/75" /> WhatsApp
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-black/28 px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-white/[.14] hover:text-white">
                  <Mail className="h-4 w-4 text-amber-300/75" /> {SITE.email}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012))] p-6 shadow-[0_36px_100px_-62px_rgba(212,175,55,.16)] sm:p-8"
          >
            {done ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[.08] text-amber-300">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold">{c.sentTitle}</h3>
                <p className="mt-2 max-w-md text-sm leading-7 text-zinc-500">{c.sentMsg}</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-zinc-100">{c.sendMsgTitle}</h3>
                  <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_15px_rgba(212,175,55,.5)]" />
                </div>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input value={form.name || ""} onChange={(event) => set("name", event.target.value)} placeholder={c.namePh} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                    <Input type="email" value={form.email || ""} onChange={(event) => set("email", event.target.value)} placeholder={c.emailPh} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  </div>
                  <Input value={form.phone || ""} onChange={(event) => set("phone", event.target.value)} placeholder={c.contactPh} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  <Textarea value={form.message || ""} onChange={(event) => set("message", event.target.value)} placeholder={c.messagePh} className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  {error && <p className="text-sm text-red-400">{c.errorMsg}</p>}
                  <Button onClick={submit} disabled={submitting || !valid} className="premium-button h-auto min-h-12 w-full px-6 py-3.5 text-base disabled:opacity-50">
                    {submitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{c.sending}</>
                    ) : (
                      <><Send className="mr-2 h-5 w-5" />{c.send}</>
                    )}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
