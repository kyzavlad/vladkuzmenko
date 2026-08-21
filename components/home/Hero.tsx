"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { CoreDirectionsRail } from "@/components/home/CoreDirectionsRail";
import { track } from "@/lib/analytics";
import { langHref, type Lang } from "@/lib/i18n";
import { getDirections, type DirectionKey } from "@/lib/directions";

const COPY: Record<Lang, {
  headlineA1: string;
  headlineA2: string;
  headlineB: string;
  headlineAccent: string;
  desc: string;
  primary: string;
  secondary: string;
}> = {
  en: {
    headlineA1: "More demand.",
    headlineA2: "Clearer systems. A stronger environment.",
    headlineB: "For people who",
    headlineAccent: "build",
    desc: "Choose the bottleneck in front of you: earn more qualified demand and turn it into sales, see where your website loses trust and action, or strengthen the skills and environment that help you execute faster.",
    primary: "Choose your entry point",
    secondary: "See real work",
  },
  ua: {
    headlineA1: "Більше попиту.",
    headlineA2: "Ясніші системи. Сильніше оточення.",
    headlineB: "Для тих, хто",
    headlineAccent: "будує",
    desc: "Оберіть вузьке місце, яке стримує наступний крок: залучити й довести більше попиту до угоди, побачити, де сайт втрачає довіру та дію, або посилити навички й оточення, щоб рухатися швидше.",
    primary: "Обрати точку входу",
    secondary: "Дивитися реальні роботи",
  },
  ru: {
    headlineA1: "Больше спроса.",
    headlineA2: "Яснее системы. Сильнее окружение.",
    headlineB: "Для тех, кто",
    headlineAccent: "строит",
    desc: "Выберите узкое место, которое тормозит следующий шаг: привлечь и довести больше спроса до сделки, увидеть, где сайт теряет доверие и действие, или усилить навыки и окружение, чтобы двигаться быстрее.",
    primary: "Выбрать точку входа",
    secondary: "Смотреть реальные работы",
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
    <section id="top" className="relative flex min-h-[980px] items-center overflow-hidden bg-black !py-0 sm:min-h-[940px] lg:min-h-[900px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_27%,rgba(212,175,55,.11),transparent_35%),radial-gradient(ellipse_at_18%_72%,rgba(255,255,255,.025),transparent_30%),radial-gradient(ellipse_at_82%_72%,rgba(125,211,252,.024),transparent_28%),linear-gradient(180deg,#030303_0%,#000_54%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[.24] [background-image:linear-gradient(rgba(255,255,255,.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.022)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_52%,black_4%,transparent_78%)]" />
        <div className="absolute inset-0 opacity-[.024] mix-blend-soft-light" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E\")", backgroundSize: "180px 180px" }} />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/72 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent via-black/54 to-black" />
      </div>

      <CoreDirectionsRail directions={directions} hrefs={hrefs} onDirectionOpen={(direction) => track("hero_direction_open", { direction })} />

      <div className="container relative z-10 mx-auto flex w-full justify-center px-5 pb-[250px] pt-[112px] sm:px-6 sm:pb-[228px] sm:pt-[116px] lg:pb-[206px] lg:pt-[108px]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center text-center">
          <motion.img initial={reduced ? false : { opacity: 0, y: 16, scale: 0.978 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-auto w-[244px] select-none drop-shadow-[0_22px_72px_rgba(212,175,55,.20)] sm:w-[294px] lg:w-[330px]" />

          <div className="relative mt-6 w-full">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-4 hidden lg:block">
              <div className="mx-auto h-px w-[430px] bg-gradient-to-r from-transparent via-amber-200/[.17] to-transparent" />
              <div className="mx-auto -mt-8 h-20 w-[560px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(232,197,71,.07),transparent_68%)] blur-2xl" />
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute left-[3%] top-[20%] hidden h-[58%] w-px bg-gradient-to-b from-transparent via-amber-200/[.09] to-transparent lg:block" />
            <span aria-hidden="true" className="pointer-events-none absolute right-[3%] top-[20%] hidden h-[58%] w-px bg-gradient-to-b from-transparent via-amber-200/[.09] to-transparent lg:block" />

            <motion.h1 initial={reduced ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.84, delay: reduced ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }} className="relative z-20 w-full overflow-visible px-1 text-white sm:px-4">
              <span className="mx-auto block max-w-[1140px] text-[clamp(2.08rem,4.05vw,3.72rem)] font-medium leading-[1.01] tracking-[-.047em]">{x.headlineA1}</span>
              <span className="mx-auto mt-1 block max-w-[1140px] text-[clamp(2.08rem,4.05vw,3.72rem)] font-medium leading-[1.01] tracking-[-.047em] text-zinc-200">{x.headlineA2}</span>
              <span className="font-display mx-auto mt-2 block max-w-[1210px] overflow-visible pb-[.18em] text-[clamp(2.9rem,5.4vw,5rem)] font-normal leading-[1.06] tracking-[-.036em] text-zinc-100">
                {x.headlineB}{" "}<em className="relative inline-block overflow-visible bg-gradient-to-br from-[#fff0a2] via-[#e2b62d] to-[#8c6207] bg-clip-text pb-[.10em] pl-[.04em] pr-[.12em] font-normal italic text-transparent drop-shadow-[0_12px_36px_rgba(212,175,55,.14)]">{x.headlineAccent}<span id="hero-signal-source" aria-hidden="true" className="ml-[.075em] inline-block h-[.105em] w-[.105em] translate-y-[.08em] rounded-full bg-[#e2b62d] shadow-[0_0_18px_rgba(226,182,45,.58)]" /><span className="sr-only">.</span></em>
              </span>
            </motion.h1>
          </div>

          <motion.p initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: reduced ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }} className="relative z-20 mt-2 max-w-[840px] text-[12px] leading-6 text-zinc-400 sm:text-[14px] sm:leading-7 lg:text-[15px]">{x.desc}</motion.p>

          <motion.div initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: reduced ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }} className="relative z-30 mt-6 flex w-full max-w-[520px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <Button size="lg" onClick={() => { track("hero_primary", { target: "ecosystem_rail" }); scrollTo("ecosystem-rail"); }} className="premium-button h-auto min-h-12 rounded-xl px-7 py-3.5 text-[14px] shadow-[0_16px_45px_rgba(184,134,11,.16)] sm:text-[15px]">{x.primary}<ArrowDown className="ml-2 h-4 w-4" /></Button>
            <Button asChild size="lg" variant="outline" className="h-auto min-h-12 rounded-xl border-white/[.13] bg-black/62 px-7 py-3.5 text-[14px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.055),0_14px_42px_rgba(0,0,0,.24)] backdrop-blur-md hover:border-white/25 hover:bg-white/[.06] sm:text-[15px]">
              <a href={`${prefix}/growth-systems#portfolio`} onClick={() => track("hero_view_work", { target: "business_portfolio" })}>{x.secondary}<ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
