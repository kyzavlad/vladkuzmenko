"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, openAssistant } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const { t } = useI18n();
  return (
    <section
      id="top"
      className="relative min-h-screen py-0 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Premium black/gold backdrop */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[90%] h-[55%] blur-[120px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.16), rgba(184,134,11,0.05), transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(0,0,0,0.85))" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 w-full flex flex-col items-center"
        >
          {/* SEO heading (visual identity is the logo) */}
          <h1 className="sr-only">
            Vlad Kuzmenko — {t.hero.pillars.join(" · ")}. {t.hero.tagline}
          </h1>

          {/* Brand wordmark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/vlad-kuzmenko-logo-gold.png"
            alt="Vlad Kuzmenko"
            className="w-[280px] sm:w-[360px] md:w-[440px] h-auto select-none drop-shadow-[0_10px_40px_rgba(212,175,55,0.18)]"
          />

          {/* Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-300">
            {t.hero.pillars.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && <span className="pillar-dot">·</span>}
                <span>{p}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          {/* Tagline */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-3xl">
            {t.hero.tagline}
          </p>

          {/* Supporting */}
          <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
            {t.hero.supporting}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="premium-button min-w-[190px] h-12 text-base">
                <Calendar className="mr-2 h-5 w-5" />
                {t.cta.bookCall}
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("selected-work")}
              className="min-w-[190px] h-12 text-base border-amber-400/30 bg-amber-400/[0.03] text-amber-100 hover:bg-amber-400/10"
            >
              {t.cta.viewWork}
            </Button>
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-amber-200 transition-colors h-12 px-3"
            >
              <Sparkles className="h-4 w-4" />
              {t.cta.askAI}
            </button>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("work")}
            className="mt-4 inline-flex flex-col items-center gap-2 text-gray-600 hover:text-amber-300 transition-colors"
            aria-label={t.hero.viewWork}
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
