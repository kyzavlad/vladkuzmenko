"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Loader2, CheckCircle, ShieldCheck, Eye, TrendingUp, Gauge, FileCheck, Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead, SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

const checkIcons: LucideIcon[] = [TrendingUp, ShieldCheck, Search, Eye, Gauge];

export function VisibilityOsPage() {
  const { lang, t } = useI18n();
  const v = t.visibility;
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const set = (k: string, val: string) => setForm((p) => ({ ...p, [k]: val }));
  const valid = !!form.website?.trim() && !!form.name?.trim() && !!form.email?.trim();

  const submit = async () => {
    if (!valid) { setError(true); return; }
    setSubmitting(true); setError(false);
    const ok = await submitLead({
      intent: "visibilityos_audit_request",
      language: lang,
      buttonLabel: "VisibilityOS page — Request AI audit",
      ...form,
    });
    setSubmitting(false);
    if (ok) setDone(true); else setError(true);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="section-tint relative pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "64px 64px" }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="premium-badge">{v.badge}</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mt-6 mb-5">
            <span className="gradient-gold-text">{v.title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium mb-4">{v.positioning}</p>
          <p className="text-base text-gray-400 mb-8">{v.desc}</p>
          <a href="#audit">
            <Button className="premium-button h-12 px-8 text-base">{v.submit}</Button>
          </a>
        </div>
      </section>

      {/* What it checks */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="eyebrow">{v.checksTitle}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {v.checks.map((c, i) => {
              const Icon = checkIcons[i] ?? Search;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="luxe-card p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-2 text-[15px]">{c.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you receive + who it's for */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="luxe-card p-8">
            <div className="flex items-center gap-2 mb-5">
              <FileCheck className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl font-semibold">{v.receiveTitle}</h2>
            </div>
            <ul className="space-y-3">
              {v.receiveList.map((r) => (
                <li key={r} className="flex items-center gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                  </span>
                  <span className="text-sm">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="luxe-card p-8">
            <h2 className="text-xl font-semibold mb-5">{v.whoForTitle}</h2>
            <div className="flex flex-wrap gap-2.5">
              {v.whoForList.map((w) => (
                <span key={w} className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 text-sm text-gray-300">
                  {w}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">{v.honest}</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="audit" className="section-tint py-20 border-t border-zinc-900 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{v.formTitle}</h2>
          <div className="luxe-card p-8">
            {done ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{v.requestedTitle}</h3>
                <p className="text-gray-400">{v.requestedMsg}</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-200">
                    {v.websiteLabel} <span className="text-amber-400">*</span>
                  </label>
                  <Input value={form.website || ""} onChange={(e) => set("website", e.target.value)} placeholder={v.websitePh}
                    className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-200">{v.businessTypeLabel}</label>
                    <select value={form.businessType || ""} onChange={(e) => set("businessType", e.target.value)}
                      className="mt-1.5 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white">
                      <option value="" className="bg-black">{t.form.select}</option>
                      {v.businessTypes.map((bt) => <option key={bt} value={bt} className="bg-black">{bt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-200">{v.concernLabel}</label>
                    <select value={form.concern || ""} onChange={(e) => set("concern", e.target.value)}
                      className="mt-1.5 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white">
                      <option value="" className="bg-black">{t.form.select}</option>
                      {v.concerns.map((cc) => <option key={cc} value={cc} className="bg-black">{cc}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-200">{v.nameLabel} <span className="text-amber-400">*</span></label>
                    <Input value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder={v.namePh}
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-200">{v.emailLabel} <span className="text-amber-400">*</span></label>
                    <Input type="email" value={form.email || ""} onChange={(e) => set("email", e.target.value)} placeholder={v.emailPh}
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-200">{v.contactLabel}</label>
                  <Input value={form.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder={v.contactPh}
                    className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                </div>
                {error && <p className="text-sm text-red-400">{v.errorMsg}</p>}
                <Button onClick={submit} disabled={submitting || !valid} className="w-full premium-button h-12 text-base disabled:opacity-50">
                  {submitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />{v.sending}</>) : (<><Search className="mr-2 h-5 w-5" />{v.submit}</>)}
                </Button>
                <p className="text-[11px] text-gray-500 text-center">{t.form.noSpam}</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-200">
              <Calendar className="h-4 w-4" /> {t.cta.bookCall}
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
