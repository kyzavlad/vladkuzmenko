"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Loader2, CheckCircle, ShieldCheck, Eye, TrendingUp, Gauge, FileCheck, Calendar, ArrowRight, ScanSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DirectionPageHero } from "@/components/ui/direction-page-hero";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { submitLead, SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

const checkIcons: LucideIcon[] = [TrendingUp, ShieldCheck, Search, Eye, Gauge];

export function VisibilityOsPage() {
  const { lang, t } = useI18n();
  const v = t.visibility;
  const reduced = useReducedMotion();
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const set = (key: string, value: string) => setForm((previous) => ({ ...previous, [key]: value }));
  const valid = Boolean(form.website?.trim() && form.name?.trim() && form.email?.trim());

  const submit = async () => {
    if (!valid) {
      setError(true);
      return;
    }
    setSubmitting(true);
    setError(false);
    const ok = await submitLead({
      intent: "visibilityos_audit_request",
      language: lang,
      buttonLabel: "VisibilityOS page - Request audit",
      ...form,
    });
    setSubmitting(false);
    if (ok) setDone(true);
    else setError(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <DirectionPageHero
          accent="blue"
          eyebrow={v.badge}
          titleA="Visibility"
          titleB="OS."
          lead={v.positioning}
          support={v.desc}
        >
          <a href="#audit">
            <Button className="premium-button h-auto min-h-12 px-8 py-3.5">
              {v.submit}<ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#system">
            <Button className="h-auto min-h-12 border border-sky-200/18 bg-sky-200/[.05] px-8 py-3.5 text-white hover:bg-sky-200/[.09]">
              {v.checksTitle}<ScanSearch className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </DirectionPageHero>

        <section id="system" className="relative scroll-mt-24 overflow-hidden border-b border-white/[.07] bg-[#020304] py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,.08),transparent_58%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-sky-200/70">VisibilityOS scan</span>
              <h2 className="section-title mt-4 text-[clamp(2.6rem,4.5vw,4.2rem)] text-zinc-100">{v.checksTitle}</h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {v.checks.map((check, index) => {
                const Icon = checkIcons[index] ?? Search;
                return (
                  <motion.div key={check.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }}>
                    <InteractiveSurface accent="blue" className="h-full rounded-[24px] border border-white/[.08] bg-white/[.018] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/18 bg-sky-300/[.05] text-sky-200">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span>
                      </div>
                      <h3 className="mt-5 text-sm font-semibold text-zinc-100">{check.title}</h3>
                      <p className="mt-2 text-xs leading-6 text-zinc-500">{check.desc}</p>
                    </InteractiveSurface>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <InteractiveSurface accent="blue" lift={false} className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-sky-200/[.12] bg-[linear-gradient(145deg,rgba(125,211,252,.05),rgba(255,255,255,.014),rgba(0,0,0,.45))] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">VisibilityOS</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-zinc-600">Evidence layer</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/18 bg-sky-300/[.05] text-sky-200"><ScanSearch className="h-4 w-4" /></span>
                </div>
                <div className="relative mt-6 overflow-hidden rounded-[22px] border border-white/[.07] bg-black/35 p-5">
                  {!reduced ? (
                    <motion.span aria-hidden="true" className="absolute inset-x-3 top-3 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_24px_rgba(125,211,252,.5)]" animate={{ y: [0, 190, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
                  ) : null}
                  <div className="space-y-3">
                    {v.checks.slice(0, 4).map((check, index) => (
                      <div key={check.title} className="flex items-center justify-between gap-4 rounded-xl border border-white/[.06] bg-white/[.018] px-4 py-3">
                        <span className="text-xs text-zinc-400">{check.title}</span>
                        <div className="flex gap-1" aria-hidden="true">
                          {[0,1,2,3].map((dot) => <span key={dot} className="h-1 w-4 rounded-full bg-sky-300/35" />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </InteractiveSurface>

              <div className="grid gap-5">
                <div className="rounded-[28px] border border-white/[.08] bg-white/[.018] p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-sky-200"><FileCheck className="h-4 w-4" /><h2 className="text-lg font-semibold text-zinc-100">{v.receiveTitle}</h2></div>
                  <ul className="mt-5 space-y-3">
                    {v.receiveList.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><CheckCircle className="mt-1 h-4 w-4 shrink-0 text-sky-300/70" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[28px] border border-white/[.08] bg-white/[.018] p-6 sm:p-7">
                  <h2 className="text-lg font-semibold text-zinc-100">{v.whoForTitle}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {v.whoForList.map((item) => <span key={item} className="rounded-full border border-white/[.08] bg-black/30 px-3 py-1.5 text-[11px] text-zinc-400">{item}</span>)}
                  </div>
                  <p className="mt-5 text-xs leading-6 text-zinc-600">{v.honest}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="audit" className="relative scroll-mt-24 overflow-hidden border-b border-white/[.07] bg-[#020202] py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,.07),transparent_60%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-2xl px-4">
            <div className="text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/70">Audit request</span>
              <h2 className="section-title mt-4 text-4xl text-zinc-100 sm:text-5xl">{v.formTitle}</h2>
            </div>

            <div className="mt-9 rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.012))] p-6 sm:p-8">
              {done ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/[.06] text-sky-200"><CheckCircle className="h-7 w-7" /></div>
                  <h3 className="text-2xl font-semibold">{v.requestedTitle}</h3>
                  <p className="mt-2 text-zinc-500">{v.requestedMsg}</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium text-zinc-300">{v.websiteLabel} <span className="text-amber-300">*</span></label>
                    <Input value={form.website || ""} onChange={(event) => set("website", event.target.value)} placeholder={v.websitePh} className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-zinc-600" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-zinc-300">{v.businessTypeLabel}</label>
                      <select value={form.businessType || ""} onChange={(event) => set("businessType", event.target.value)} className="mt-1.5 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                        <option value="" className="bg-black">{t.form.select}</option>
                        {v.businessTypes.map((item) => <option key={item} value={item} className="bg-black">{item}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-300">{v.concernLabel}</label>
                      <select value={form.concern || ""} onChange={(event) => set("concern", event.target.value)} className="mt-1.5 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                        <option value="" className="bg-black">{t.form.select}</option>
                        {v.concerns.map((item) => <option key={item} value={item} className="bg-black">{item}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-zinc-300">{v.nameLabel} <span className="text-amber-300">*</span></label>
                      <Input value={form.name || ""} onChange={(event) => set("name", event.target.value)} placeholder={v.namePh} className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-zinc-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-300">{v.emailLabel} <span className="text-amber-300">*</span></label>
                      <Input type="email" value={form.email || ""} onChange={(event) => set("email", event.target.value)} placeholder={v.emailPh} className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-zinc-600" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300">{v.contactLabel}</label>
                    <Input value={form.phone || ""} onChange={(event) => set("phone", event.target.value)} placeholder={v.contactPh} className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-zinc-600" />
                  </div>
                  {error ? <p className="text-sm text-red-400">{v.errorMsg}</p> : null}
                  <Button onClick={submit} disabled={submitting || !valid} className="premium-button h-auto min-h-12 w-full py-3 text-base disabled:opacity-50">
                    {submitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{v.sending}</> : <><Search className="mr-2 h-5 w-5" />{v.submit}</>}
                  </Button>
                  <p className="text-center text-[11px] text-zinc-600">{t.form.noSpam}</p>
                </div>
              )}
            </div>

            <div className="mt-7 text-center">
              <a href={SITE.calcom} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-amber-200"><Calendar className="h-4 w-4" />{t.cta.bookCall}</a>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
