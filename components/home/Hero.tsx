"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { EcosystemCore } from "@/components/home/EcosystemCore";
import { track } from "@/lib/analytics";
import { langHref, type Lang } from "@/lib/i18n";
import { getDirections, type DirectionKey } from "@/lib/directions";

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    desc: string;
    primary: string;
    secondary: string;
    transition: string;
  }
> = {
  en: {
    eyebrow: "Vlad Kuzmenko · Ecosystem",
    line1: "Systems for business.",
    line2: "Products for people.",
    line3: "An environment for growth.",
    desc:
      "Four independent directions — Client Growth Systems, VisibilityOS, Warriors Team and Performance — connected by one standard: less friction, a clearer next step and stronger execution.",
    primary: "Explore the ecosystem",
    secondary: "View real work",
    transition: "Four directions · one operating standard",
  },
  ua: {
    eyebrow: "Vlad Kuzmenko · Екосистема",
    line1: "Системи для бізнесу.",
    line2: "Продукти для людей.",
    line3: "Середовище для зростання.",
    desc:
      "Чотири самостійні напрями — Client Growth Systems, VisibilityOS, Warriors Team і Performance — поєднані одним стандартом: менше тертя, зрозуміліший наступний крок і вища якість виконання.",
    primary: "Відкрити екосистему",
    secondary: "Подивитися роботи",
    transition: "Чотири напрями · один стандарт виконання",
  },
  ru: {
    eyebrow: "Vlad Kuzmenko · Экосистема",
    line1: "Системы для бизнеса.",
    line2: "Продукты для людей.",
    line3: "Среда для роста.",
    desc:
      "Четыре самостоятельных направления — Client Growth Systems, VisibilityOS, Warriors Team и Performance — объединены одним стандартом: меньше трения, яснее следующий шаг и выше качество исполнения.",
    primary: "Открыть экосистему",
    secondary: "Посмотреть работы",
    transition: "Четыре направления · один стандарт исполнения",
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

  const hrefs: Record<DirectionKey, string> = {
    business: "#client-systems",
    visibility: `${prefix}/visibilityos`,
    warriors: `${prefix}/warriors-team`,
    performance: `${prefix}/drop`,
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black !py-0 lg:min-h-[900px]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,175,55,.09),transparent_31%),radial-gradient(circle_at_82%_44%,rgba(255,255,255,.035),transparent_32%),linear-gradient(180deg,#030303_0%,#000_58%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[.42] [background-image:linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.028)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_52%_46%,black_8%,transparent_76%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      <div className="container relative z-10 mx-auto px-5 py-24 sm:px-6 sm:py-24 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(520px,1.1fr)] lg:gap-6 xl:gap-10">
          <div className="relative z-20 max-w-[690px] pt-2 lg:pt-0">
            <motion.img
              initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              src="/brand/vlad-kuzmenko-logo-gold.png"
              alt="Vlad Kuzmenko"
              className="h-auto w-[270px] select-none drop-shadow-[0_18px_54px_rgba(212,175,55,.17)] sm:w-[330px] lg:w-[365px]"
            />

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: reduced ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-amber-200/[.16] bg-white/[.025] px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.045)] backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,.72)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-100/80 sm:text-[11px]">
                  {x.eyebrow}
                </span>
              </div>

              <h1 className="mt-7 max-w-[690px] text-[2.55rem] font-semibold leading-[.98] tracking-[-.045em] text-white sm:text-[3.6rem] lg:text-[4.35rem] xl:text-[4.65rem]">
                <span className="block">{x.line1}</span>
                <span className="mt-2 block text-zinc-200">{x.line2}</span>
                <span className="font-display mt-2 block bg-gradient-to-r from-[#f8dc73] via-[#d9ab21] to-[#8b6508] bg-clip-text pb-1 pr-3 text-transparent italic">
                  {x.line3}
                </span>
              </h1>

              <p className="section-lead mt-7 max-w-xl text-[14px] leading-7 text-zinc-400 sm:text-[16px] sm:leading-8">
                {x.desc}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => {
                    track("hero_primary", { target: "ecosystem" });
                    scrollTo("ecosystem");
                  }}
                  className="premium-button h-auto min-h-12 rounded-xl px-7 py-3.5 text-[15px]"
                >
                  {x.primary}
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto min-h-12 rounded-xl border-white/[.13] bg-white/[.025] px-7 py-3.5 text-[15px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.045)] backdrop-blur-xl hover:border-white/25 hover:bg-white/[.06]"
                >
                  <a
                    href={`${prefix}/work`}
                    onClick={() => track("hero_view_work", { target: "work" })}
                  >
                    {x.secondary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: reduced ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 -mx-3 sm:mx-0 lg:-mr-8 xl:-mr-12"
          >
            <EcosystemCore
              directions={directions}
              hrefs={hrefs}
              onDirectionOpen={(direction) =>
                track("hero_direction_open", { direction })
              }
            />
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo("ecosystem")}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: reduced ? 0 : 0.72 }}
        className="group absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-4 text-[9px] font-semibold uppercase tracking-[.28em] text-zinc-600 transition-colors hover:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 sm:flex"
        aria-label={x.primary}
      >
        <span className="h-px w-20 bg-gradient-to-r from-transparent to-amber-300/25" />
        <span>{x.transition}</span>
        <span className="relative h-px w-20 overflow-hidden bg-white/[.07]">
          <motion.span
            className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent"
            animate={reduced ? undefined : { x: [-36, 86] }}
            transition={reduced ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
          />
        </span>
      </motion.button>
    </section>
  );
}
