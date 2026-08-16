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
    headlineA: string;
    headlineB: string;
    desc: string;
    primary: string;
    secondary: string;
  }
> = {
  en: {
    eyebrow: "Vlad Kuzmenko · Ecosystem",
    headlineA: "Systems, software and a stronger environment",
    headlineB: "for people building businesses — and themselves.",
    desc:
      "Four independent directions under one brand: Client Growth Systems, VisibilityOS, Warriors Team and Performance. Choose what you need next.",
    primary: "Choose a direction",
    secondary: "View real work",
  },
  ua: {
    eyebrow: "Vlad Kuzmenko · Екосистема",
    headlineA: "Системи, софт і сильне середовище",
    headlineB: "для тих, хто будує бізнес і себе.",
    desc:
      "Чотири самостійні напрями під одним брендом: Client Growth Systems, VisibilityOS, Warriors Team і Performance. Оберіть те, що потрібно вам зараз.",
    primary: "Обрати напрям",
    secondary: "Подивитися роботи",
  },
  ru: {
    eyebrow: "Vlad Kuzmenko · Экосистема",
    headlineA: "Системы, софт и сильная среда",
    headlineB: "для тех, кто строит бизнес и себя.",
    desc:
      "Четыре самостоятельных направления под одним брендом: Client Growth Systems, VisibilityOS, Warriors Team и Performance. Выберите то, что нужно вам сейчас.",
    primary: "Выбрать направление",
    secondary: "Смотреть работы",
  },
};

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(212,175,55,.075),transparent_38%),radial-gradient(ellipse_at_50%_82%,rgba(255,255,255,.025),transparent_34%),linear-gradient(180deg,#030303_0%,#000_54%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[.40] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:radial-gradient(ellipse_at_50%_46%,black_4%,transparent_76%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-black/55 to-black" />
      </div>

      <EcosystemCore
        directions={directions}
        hrefs={hrefs}
        onDirectionOpen={(direction) =>
          track("hero_direction_open", { direction })
        }
      />

      <div className="container relative z-10 mx-auto flex w-full justify-center px-5 pb-[205px] pt-[128px] sm:px-6 sm:pb-[190px] sm:pt-[132px] lg:pb-[188px] lg:pt-[116px]">
        <div className="mx-auto flex w-full max-w-[980px] flex-col items-center text-center">
          <motion.img
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            src="/brand/vlad-kuzmenko-logo-gold.png"
            alt="Vlad Kuzmenko"
            className="h-auto w-[255px] select-none drop-shadow-[0_20px_64px_rgba(212,175,55,.18)] sm:w-[315px] lg:w-[350px]"
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: reduced ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-amber-200/[.18] bg-black/40 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.055),0_12px_40px_rgba(0,0,0,.22)] backdrop-blur-2xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,.78)]" />
            <span className="text-[9px] font-semibold uppercase tracking-[.25em] text-amber-100/80 sm:text-[10px]">
              {x.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.84, delay: reduced ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[960px] text-[2.45rem] font-semibold leading-[.98] tracking-[-.048em] text-white sm:text-[3.55rem] lg:text-[4.35rem] xl:text-[4.8rem]"
          >
            <span className="block">{x.headlineA}</span>
            <span className="mt-2 block bg-gradient-to-r from-[#f6df7c] via-[#e5bc3c] to-[#b88712] bg-clip-text pb-1 text-transparent">
              {x.headlineB}
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: reduced ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[760px] text-[13px] leading-6 text-zinc-400 sm:text-[15px] sm:leading-7 lg:text-[16px]"
          >
            {x.desc}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex w-full max-w-[520px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => {
                track("hero_primary", { target: "ecosystem_rail" });
                scrollTo("ecosystem-rail");
              }}
              className="premium-button h-auto min-h-12 rounded-xl px-7 py-3.5 text-[14px] sm:text-[15px]"
            >
              {x.primary}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-12 rounded-xl border-white/[.13] bg-black/35 px-7 py-3.5 text-[14px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl hover:border-white/25 hover:bg-white/[.06] sm:text-[15px]"
            >
              <a
                href={`${prefix}/work`}
                onClick={() => track("hero_view_work", { target: "work" })}
              >
                {x.secondary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
