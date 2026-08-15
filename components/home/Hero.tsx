"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openAssistant } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, {
  pillars: string[];
  taglineA: string;
  taglineB: string;
  supporting: string;
  primary: string;
  work: string;
}> = {
  en: {
    pillars: ["BUSINESS SYSTEMS", "PRODUCTS", "PERFORMANCE", "MEDIA"],
    taglineA: "Systems for business. Products for people. ",
    taglineB: "Work that has to perform.",
    supporting:
      "Start with business growth, explore real projects, open VisibilityOS, learn about Warriors Team or follow what I am building through media and performance products.",
    primary: "Choose a direction",
    work: "See real work",
  },
  ua: {
    pillars: ["СИСТЕМИ ДЛЯ БІЗНЕСУ", "ПРОДУКТИ", "PERFORMANCE", "МЕДІА"],
    taglineA: "Системи для бізнесу. Продукти для людей. ",
    taglineB: "Робота, яка має давати результат.",
    supporting:
      "Почніть із росту бізнесу, подивіться реальні проєкти, відкрийте VisibilityOS, дізнайтеся про Warriors Team або стежте за тим, що я будую через медіа та performance-продукти.",
    primary: "Обрати напрям",
    work: "Подивитися роботи",
  },
  ru: {
    pillars: ["СИСТЕМЫ ДЛЯ БИЗНЕСА", "ПРОДУКТЫ", "PERFORMANCE", "МЕДИА"],
    taglineA: "Системы для бизнеса. Продукты для людей. ",
    taglineB: "Работа, которая должна давать результат.",
    supporting:
      "Начните с роста бизнеса, посмотрите реальные проекты, откройте VisibilityOS, узнайте о Warriors Team или следите за тем, что я строю через медиа и performance-продукты.",
    primary: "Выбрать направление",
    work: "Посмотреть работы",
  },
};

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const { lang, t } = useI18n();
  const x = COPY[lang];

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-0"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-[16%] h-[58%] w-[92%] -translate-x-1/2 blur-[120px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.16), rgba(184,134,11,0.05), transparent 75%)",
          }}
        />
        <div className="absolute right-[-12%] top-[22%] h-[460px] w-[460px] rounded-full bg-sky-400/[.045] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 50% 30%, transparent 40%, rgba(0,0,0,0.88))" }}
        />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-6 pt-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full flex-col items-center space-y-8"
        >
          <h1 className="sr-only">Vlad Kuzmenko — {x.taglineA}{x.taglineB}</h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/vlad-kuzmenko-logo-gold.png"
            alt="Vlad Kuzmenko"
            className="h-auto w-[280px] select-none drop-shadow-[0_10px_40px_rgba(212,175,55,0.18)] sm:w-[360px] md:w-[440px]"
          />

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-gray-400 sm:text-xs">
            {x.pillars.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && <span className="text-amber-300/45">·</span>}
                <span>{p}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          <p className="max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {x.taglineA}
            <span className="gradient-gold-text">{x.taglineB}</span>
          </p>

          <p className="max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
            {x.supporting}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              size="lg"
              onClick={() => {
                track("hero_choose_direction");
                scrollTo("ecosystem");
              }}
              className="premium-button h-12 min-w-[190px] text-base"
            >
              {x.primary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                track("hero_view_work");
                scrollTo("selected-work");
              }}
              className="h-12 min-w-[190px] border-amber-400/30 bg-amber-400/[0.03] text-base text-amber-100 hover:bg-amber-400/10"
            >
              {x.work}
            </Button>
            <button
              type="button"
              onClick={() => {
                track("hero_open_assistant");
                openAssistant();
              }}
              className="inline-flex h-12 min-w-[190px] items-center justify-center gap-2 rounded-xl border border-sky-300/15 bg-sky-300/[.035] px-5 text-sm font-semibold text-sky-100/80 transition hover:border-sky-300/30 hover:bg-sky-300/[.07]"
            >
              <Bot className="h-4 w-4" />
              {t.cta.askAI}
            </button>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("ecosystem")}
            className="mt-4 inline-flex flex-col items-center gap-2 text-gray-600 transition-colors hover:text-amber-300"
            aria-label={x.primary}
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
