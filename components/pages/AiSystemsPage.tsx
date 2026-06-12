"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Workflow, AlertCircle, Target, Boxes, Sparkles, Plus } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import type { Dict } from "@/lib/i18n";

/** Expanded waitlist fields: name, email, Telegram/phone, role, experience,
 *  what they want to build, biggest bottleneck, and an optional note.
 *  Field ids map 1:1 to the n8n payload keys. */
function waitlistFields(t: Dict): RequestField[] {
  const f = t.form;
  const w = t.aiproduct.waitlist;
  return [
    { id: "name", label: f.name, required: true, placeholder: f.namePh },
    { id: "email", label: f.email, type: "email", required: true, placeholder: f.emailPh },
    { id: "phone", label: f.phone, type: "tel", placeholder: f.phonePh },
    { id: "role", label: w.roleLabel, placeholder: w.rolePh },
    { id: "experienceLevel", label: w.experienceLabel, type: "select", options: w.experienceOptions },
    { id: "projectGoal", label: w.goalLabel, type: "textarea", placeholder: w.goalPh },
    { id: "currentBottleneck", label: w.bottleneckLabel, type: "textarea", placeholder: w.bottleneckPh },
    { id: "message", label: t.aiproduct.helpLabel, type: "textarea", placeholder: t.aiproduct.helpPh },
  ];
}

function WaitlistButton({
  label,
  tier,
  block = false,
  subtle = false,
}: {
  label?: string;
  tier?: string;
  block?: boolean;
  subtle?: boolean;
}) {
  const { t } = useI18n();
  const a = t.aiproduct;
  return (
    <RequestDialog
      intent="ai_systems_product_waitlist"
      title={a.dialogTitle}
      description={a.dialogDesc}
      submitLabel={a.dialogSubmit}
      successTitle={a.dialogSuccessT}
      successMessage={a.dialogSuccessM}
      buttonLabel={label ?? "AI Systems for Business — Waitlist"}
      fields={waitlistFields(t)}
      context={{ product: "AI Systems for Business", ...(tier ? { tier } : {}) }}
      className={cn(block && "w-full")}
    >
      <Button
        className={cn(
          subtle
            ? "w-full h-11 bg-transparent border border-amber-400/30 text-white hover:bg-amber-400/10"
            : "premium-button h-12 px-8 text-base",
          block && !subtle && "w-full"
        )}
      >
        <Check className="mr-2 h-5 w-5" />
        {a.cta}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </RequestDialog>
  );
}

export function AiSystemsPage() {
  const { t } = useI18n();
  const a = t.aiproduct;
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
          <span className="premium-badge">{a.badge}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-6 mb-5">
            {a.titleA}<span className="gradient-gold-text">{a.titleB}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium mb-4">{a.positioning}</p>
          <p className="text-base text-gray-400 mb-8">{a.desc}</p>
          <div className="flex justify-center"><WaitlistButton label="AI Systems for Business — Hero" /></div>
          <p className="text-xs text-gray-500 mt-4">{a.note}</p>
        </div>
      </section>

      {/* Problem / Outcome */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <div className="luxe-card p-8">
            <div className="flex items-center gap-2 mb-3"><AlertCircle className="h-4 w-4 text-amber-400/80" /><span className="eyebrow">{a.problemLabel}</span></div>
            <p className="text-gray-300 leading-relaxed">{a.problem}</p>
          </div>
          <div className="luxe-card p-8">
            <div className="flex items-center gap-2 mb-3"><Target className="h-4 w-4 text-amber-400/80" /><span className="eyebrow">{a.outcomeLabel}</span></div>
            <p className="text-gray-300 leading-relaxed">{a.outcome}</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 max-w-2xl mx-auto mt-8 px-4">
          <span className="text-amber-300 font-medium">{a.whoForLabel}:</span> {a.whoFor}
        </p>
      </section>

      {/* Curriculum — 6 modules */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 mb-3 justify-center"><Workflow className="h-5 w-5 text-amber-400" /><span className="eyebrow">{a.modulesTitle}</span></div>
          <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">{a.modulesIntro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {a.modules.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="luxe-card p-6"
              >
                <span className="inline-flex w-7 h-7 rounded-md bg-amber-400/10 items-center justify-center text-xs font-bold text-amber-300 mb-3">{i + 1}</span>
                <h3 className="font-semibold mb-1.5">{m.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-2 mb-8 justify-center"><Boxes className="h-5 w-5 text-amber-400" /><span className="eyebrow">{a.insideTitle}</span></div>
          <ul className="grid sm:grid-cols-2 gap-3.5">
            {a.insideList.map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-300 luxe-card px-5 py-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center"><Check className="h-3 w-3 text-amber-400" /></span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Example systems */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12"><span className="eyebrow">{a.exampleTitle}</span></div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {a.exampleSystems.map((s) => (
              <motion.div key={s} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="luxe-card p-6 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300 leading-relaxed">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access tiers */}
      <section className="section-accent py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="eyebrow">{a.tiersTitle}</span>
            <p className="text-gray-400 mt-3">{a.tiersIntro}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {a.tiers.map((tier, i) => {
              const recommended = i === 1;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "luxe-card p-7 flex flex-col",
                    recommended && "ring-1 ring-amber-400/30 border-amber-400/40"
                  )}
                >
                  {recommended && <span className="premium-badge self-start mb-3">{a.recommendedLabel}</span>}
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  <p className="text-amber-300/80 text-sm mt-1">{tier.access}</p>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">{tier.tagline}</p>
                  <ul className="space-y-2.5 mt-5 mb-6 flex-1">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <WaitlistButton block subtle={!recommended} label={`AI Systems — ${tier.name}`} tier={tier.name} />
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto">{a.tiersNote}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10"><span className="eyebrow">{a.faqTitle}</span></div>
          <div className="space-y-3">
            {a.faq.map((item) => (
              <details key={item.q} className="luxe-card p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-white">
                  <span>{item.q}</span>
                  <Plus className="h-4 w-4 text-amber-400 shrink-0 transition-transform group-open:rotate-45" />
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-tint py-20 border-t border-zinc-900 relative">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{a.finalTitle}</h2>
          <p className="text-gray-400 mb-8">{a.finalDesc}</p>
          <div className="flex justify-center"><WaitlistButton label="AI Systems for Business — Final CTA" /></div>
          <p className="text-xs text-gray-500 mt-4">{a.note}</p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
