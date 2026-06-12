"use client";

import { Rocket, Dumbbell, Car, Brain, Flame, Calendar, ArrowRight, Check, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

const pillarIcons: LucideIcon[] = [Rocket, Dumbbell, Car, Brain];

function ApplyButton({ variant = "premium" }: { variant?: "premium" | "outline" }) {
  const { t } = useI18n();
  const w = t.warriors;
  return (
    <RequestDialog
      intent="warriors_team_application"
      title={w.dialogTitle}
      description={w.dialogDesc}
      submitLabel={w.dialogSubmit}
      successTitle={w.dialogSuccessT}
      successMessage={w.dialogSuccessM}
      buttonLabel="Warriors Team page — Apply"
      showBuildType={false}
      helpLabel={w.helpLabel}
      helpPlaceholder={w.helpPh}
    >
      <Button
        size="lg"
        variant={variant === "outline" ? "outline" : "default"}
        className={variant === "premium" ? "premium-button h-12 px-8 text-base" : "h-12 px-8 text-base border-amber-400/40 text-amber-100 hover:bg-amber-400/10"}
      >
        {w.apply}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </RequestDialog>
  );
}

export function WarriorsTeamPage() {
  const { t } = useI18n();
  const w = t.warriors;
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[80vh] py-0 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none flex items-center justify-center" aria-hidden="true">
          <span className="text-[26vw] font-black leading-none text-white">WARRIORS</span>
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold uppercase tracking-[0.16em] mb-6">
            <Flame className="h-4 w-4" /> {w.eyebrow}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
            {w.titleA}<span className="gradient-gold-text">{w.titleB}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-300 mb-4">{w.desc}</p>
          <p className="max-w-xl mx-auto text-sm text-gray-500 mb-10">{w.note}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ApplyButton />
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/15 text-white hover:bg-white/5">
                <Calendar className="mr-2 h-5 w-5" /> {w.talkToVlad}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {w.pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? Rocket;
              return (
                <div key={p} className="luxe-card p-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-5"><Icon className="h-6 w-6 text-amber-400" /></div>
                  <h3 className="font-semibold">{p}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What happens inside */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{w.insideTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {w.inside.map((item) => (
              <div key={item} className="luxe-card p-6 flex items-start gap-3">
                <Check className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For you / not for you */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="luxe-card p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><Check className="h-5 w-5 text-amber-400" /> {w.forYouTitle}</h3>
            <ul className="space-y-3">
              {w.forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-8 border border-zinc-800 bg-zinc-900/40">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><X className="h-5 w-5 text-gray-500" /> {w.notForYouTitle}</h3>
            <ul className="space-y-3">
              {w.notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                  <X className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works + final CTA */}
      <section className="section-tint py-20 border-t border-zinc-900 relative">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl">
          <span className="eyebrow">{w.howTitle}</span>
          <p className="text-lg text-gray-300 mt-4 mb-10">{w.how}</p>
          <div className="flex justify-center"><ApplyButton /></div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
