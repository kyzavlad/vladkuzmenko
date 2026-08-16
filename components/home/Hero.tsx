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
    headlineAccent: string;
    desc: string;
    primary: string;
    secondary: string;
  }
> = {
  en: {
    eyebrow: "BUSINESS · SOFTWARE · PRIVATE NETWORK · PERFORMANCE",
    headlineA: "Systems, products and the right environment",
    headlineB: "for people who",
    headlineAccent: "build.",
    desc:
      "Business growth, VisibilityOS, Warriors Team and Performance are four independent directions built around one principle: less friction, a clearer next move and a higher standard of execution.",
    primary: "Choose a direction",
    secondary: "View real work",
  },
  ua: {
    eyebrow: "БІЗНЕС · СОФТ · ПРИВАТНА МЕРЕЖА · PERFORMANCE",
    headlineA: "Системи, продукти й сильне оточення",
    headlineB: "для тих, хто",
    headlineAccent: "будує.",
    desc:
      "Зростання бізнесу, VisibilityOS, Warriors Team і Performance — чотири самостійні напрями, об’єднані одним принципом: менше тертя, зрозуміліший наступний крок і вищий стандарт виконання.",
    primary: "Обрати напрям",
    secondary: "Подивитися роботи",
  },
  ru: {
    eyebrow: "БИЗНЕС · СОФТ · ЗАКРЫТАЯ СЕТЬ · PERFORMANCE",
    headlineA: "Системы, продукты и сильное окружение",
    headlineB: "для тех, кто",
    headlineAccent: "строит.",
    desc:
      "Рост бизнеса, VisibilityOS, Warriors Team и Performance — четыре самостоятельных направления, объединённые одним принципом: меньше трения, яснее следующий шаг и выше стандарт исполнения.",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,rgba(212,175,55,.10),transparent_34%),radial-gradient(ellipse_at_18%_72%,rgba(255,255,255,.025),transparent_30%),radial-gradient(ellipse_at_82%_70%,rgba(125,211,252,.025),transparent_30%),linear-gradient(180deg,#030303_0%,#000_52%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[.32] [background-image:linear-gradient(rgba(255,255,255,.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.024)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_48%,black_5%,transparent_76%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/72 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-black/58 to-black" />
      </div>

      <EcosystemCore
        directions={directions}
        hrefs={hrefs}
        onDirectionOpen={(direction) =>
          track("hero_direction_open", { direction })
        }
      />

      <div className="container relative z-10 mx-auto flex w-full justify-center px-5 pb-[208px] pt-[122px] sm:px-6 sm:pb-[198px] sm:pt-[126px] lg:pb-[190px] lg:pt-[108px]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
          <motion.img
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.978 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            src="/brand/vlad-kuzmenko-logo-gold.png"
            alt="Vlad Kuzmenko"
            className="h-auto w-[252px] select-none drop-shadow-[0_22px_72px_rgba(212,175,55,.20)] sm:w-[310px] lg:w-[350px]"
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduced ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 inline-flex max-w-[94vw] items-center gap-2.5 rounded-full border border-amber-200/[.16] bg-black/42 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_12px_40px_rgba(0,0,0,.28)] backdrop-blur-2xl"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_15px_rgba(252,211,77,.82)]" />
            <span className="truncate text-[8px] font-semibold uppercase tracking-[.22em] text-amber-100/78 sm:text-[9px] lg:text-[10px]">
              {x.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.84, delay: reduced ? 0 : 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 w-full text-white"
          >
            <span className="mx-auto block max-w-[1140px] text-[clamp(2.2rem,5.15vw,4.55rem)] font-medium leading-[.98] tracking-[-.052em] lg:whitespace-nowrap">
              {x.headlineA}
            </span>
            <span className="font-display mt-1.5 block text-[clamp(3.15rem,6.7vw,5.95rem)] font-normal leading-[.92] tracking-[-.045em] text-zinc-100">
              {x.headlineB}{" "}
              <em className="inline-block bg-gradient-to-br from-[#fff0a2] via-[#e2b62d] to-[#8c6207] bg-clip-text pr-[.08em] font-normal italic text-transparent drop-shadow-[0_12px_36px_rgba(212,175,55,.14)]">
                {x.headlineAccent}
              </em>
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[820px] text-[12px] leading-6 text-zinc-400 sm:text-[14px] sm:leading-7 lg:text-[15px]"
          >
            {x.desc}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: reduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex w-full max-w-[520px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => {
                track("hero_primary", { target: "ecosystem_rail" });
                scrollTo("ecosystem-rail");
              }}
              className="premium-button h-auto min-h-12 rounded-xl px-7 py-3.5 text-[14px] shadow-[0_16px_45px_rgba(184,134,11,.16)] sm:text-[15px]"
            >
              {x.primary}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto min-h-12 rounded-xl border-white/[.13] bg-black/38 px-7 py-3.5 text-[14px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.055),0_14px_42px_rgba(0,0,0,.24)] backdrop-blur-2xl hover:border-white/25 hover:bg-white/[.06] sm:text-[15px]"
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
