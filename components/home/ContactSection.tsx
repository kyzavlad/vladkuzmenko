"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Mail, Loader2, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE, openAssistant, submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

export function ContactSection() {
  const { lang, t } = useI18n();
  const c = t.contact;
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const valid = !!form.name?.trim() && !!form.email?.trim() && !!form.message?.trim();

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
      buttonLabel: "Contact — Send message",
      ...form,
    });
    setSubmitting(false);
    if (ok) setDone(true);
    else setError(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              {c.titleA}
              <span className="gradient-gold-text">{c.titleB}</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">{c.desc}</p>

            <div className="space-y-3">
              <a href={SITE.calcom} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full premium-button h-12 justify-start text-base">
                  <Calendar className="mr-3 h-5 w-5" />
                  {t.cta.bookCall}
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={openAssistant}
                className="w-full h-12 justify-start text-base border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
              >
                <Sparkles className="mr-3 h-5 w-5" />
                {c.askAI}
              </Button>
              <a href={`mailto:${SITE.email}`} className="block">
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-base border-white/15 text-white hover:bg-white/5"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  {SITE.email}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right: message form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxe-card p-8"
          >
            {done ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{c.sentTitle}</h3>
                <p className="text-gray-400">{c.sentMsg}</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-6">{c.sendMsgTitle}</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      value={form.name || ""}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder={c.namePh}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                    <Input
                      type="email"
                      value={form.email || ""}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder={c.emailPh}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Input
                    value={form.phone || ""}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder={c.contactPh}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  <Textarea
                    value={form.message || ""}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder={c.messagePh}
                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  {error && <p className="text-sm text-red-400">{c.errorMsg}</p>}
                  <Button
                    onClick={submit}
                    disabled={submitting || !valid}
                    className="w-full premium-button h-12 text-base disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {c.sending}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {c.send}
                      </>
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
