"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Dumbbell, Layers, ScanSearch, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { langHref, type Lang } from "@/lib/i18n";
import { DIRECTION_ORDER, getDirections, type DirectionKey } from "@/lib/directions";

const ICONS: Record<DirectionKey, LucideIcon> = {
  business: Layers,
  visibility: ScanSearch,
  warriors: Shield,
  performance: Dumbbell,
};

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  primary: string;
  secondary: string;
  railLabel: string;
}> = {
  en: {
    eyebrow: "Vlad Kuzmenko · Ecosystem",
    titleA: "An ecosystem for people who ",
    titleB: "build",
    desc:
      "Growth systems for business, software that shows where a website loses people, a private network of operators, and products for staying in shape. Four directions — each with one clear next step.",
    primary: "Explore the directions",
    secondary: "See real work",
    railLabel: "Four directions",
  },
  ua: {
    eyebrow: "Vlad Kuzmenko · Екосистема",
    titleA: "Екосистема для тих, хто ",
    titleB: "будує",
    desc:
      "Системи росту для бізнесу, софт, який показує, де сайт втрачає людей, закрита мережа тих, хто вже будує, і продукти для форми. Чотири напрями — у кожного один зрозумілий наступний крок.",
    primary: "Обрати напрям",
    secondary: "Подивитися роботи",
    railLabel: "Чотири напрями",
  },
  ru: {
    eyebrow: "Vlad Kuzmenko · Экосистема",
    titleA: "Экосистема для тех, кто ",
    titleB: "строит",
    desc:
      "Системы роста для бизнеса, софт, который показывает, где сайт теряет людей, закрытая среда тех, кто уже строит, и продукты для формы. Четыре направления — у каждого один понятный следующий шаг.",
    primary: "Выбрать направление",
    secondary: "Посмотреть работы",
    railLabel: "Четыре направления",
  },
};

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const directions = getDirections(lang);
  const reduced = useReducedMotion();
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  const href: Record<DirectionKey, string> = {
    business: "#client-systems",
    visibility: `${prefix}/visibilityos`,
    warriors: `${prefix}/warriors-team`,
    performance: `${prefix}/drop`,
  };

  return (
    <section id="top" className="relative flex min-h-[96vh] items-center overflow-hidden bg-black pt-24 sm:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_70%)]" />
        <motion.div
          animate={reduced ? undefined : { opacity: [.55, .9, .55], scale: [1, 1.06, 1] }}
          transition={reduced ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[26%] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-amber-300/[.10] opacity-70 blur-[170px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_0%,rgba(0,0,0,.24)_44%,rgba(0,0,0,.95)_84%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-5 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.img
            initial={{ opacity: 0, y: 18, scale: .97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}
            src="/brand/vlad-kuzmenko-logo-gold.png"
            alt="Vlad Kuzmenko"
            className="h-auto w-[250px] select-none drop-shadow-[0_16px_60px_rgba(212,175,55,.22)] sm:w-[330px] lg:w-[400px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .14, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col items-center"
          >
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-amber-300/18 bg-amber-300/[.045] px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-amber-300/80" />
              <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-200/85 sm:text-[11px]">
                {x.eyebrow}
              </span>
            </div>

            <h1 className="section-title mt-6 max-w-3xl text-[2.35rem] text-white sm:text-[54px] lg:text-[64px]">
              {x.titleA}
              <span className="gradient-gold-text italic">{x.titleB}</span>
            </h1>

            <p className="section-lead mt-6 max-w-2xl text-[15px] leading-7 text-zinc-400 sm:text-[17px] sm:leading-8">
              {x.desc}
            </p>
          </motion.div>

          {/* The four directions, introduced in the hero and expanded below. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 w-full"
          >
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/25" />
              <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[.26em] text-zinc-600 sm:text-[10px]">
                {x.railLabel}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/25" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
              {DIRECTION_ORDER.map((key, index) => {
                const Icon = ICONS[key];
                const item = directions[key];
                return (
                  <motion.a
                    key={key}
                    href={href[key]}
                    onClick={() => track("hero_direction_open", { direction: key })}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .5, delay: .38 + index * .07 }}
                    whileHover={{ y: -3 }}
                    className="group/pill flex min-h-[64px] items-center gap-3 rounded-2xl border border-white/[.09] bg-white/[.028] px-3.5 py-3 text-left backdrop-blur-sm transition-colors hover:border-amber-300/28 hover:bg-white/[.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 sm:px-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[.1] bg-black/40 text-amber-200/85 transition-colors group-hover/pill:border-amber-300/30">
                      <Icon className="h-[15px] w-[15px]" />
                    </span>
                    <span className="min-w-0 text-[12px] font-semibold leading-4 text-zinc-300 transition-colors group-hover/pill:text-white sm:text-[13px]">
                      {item.short}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .52 }}
            className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => {
                track("hero_primary", { target: "ecosystem" });
                scrollTo("ecosystem");
              }}
              className="premium-button h-auto min-h-12 px-7 py-3 text-base"
            >
              {x.primary}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                track("hero_view_work", { target: "selected-work" });
                scrollTo("selected-work");
              }}
              className="h-auto min-h-12 border-white/15 bg-white/[.025] px-7 py-3 text-base text-white hover:border-white/25 hover:bg-white/[.06]"
            >
              {x.secondary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
