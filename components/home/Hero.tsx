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
    headlineA1: string;
    headlineA2: string;
    headlineB: string;
    headlineAccent: string;
    desc: string;
    primary: string;
    secondary: string;
  }
> = {
  en: {
    eyebrow: "ECOSYSTEM • 4 DIRECTIONS",
    headlineA1: "Systems, products",
    headlineA2: "and the right environment",
    headlineB: "for people who",
    headlineAccent: "build.",
    desc:
      "Business growth, VisibilityOS, Warriors Team and Performance — four independent directions under one brand. Choose what helps you move forward now.",
    primary: "Choose a direction",
    secondary: "View real work",
  },
  ua: {
    eyebrow: "ЕКОСИСТЕМА • 4 НАПРЯМКИ",
    headlineA1: "Системи, продукти",
    headlineA2: "і сильне оточення",
    headlineB: "для тих, хто",
    headlineAccent: "будує.",
    desc:
      "Зростання бізнесу, VisibilityOS, Warriors Team і Performance — чотири самостійні напрями під одним брендом. Оберіть те, що допоможе рухатися далі саме зараз.",
    primary: "Обрати напрям",
    secondary: "Подивитися роботи",
  },
  ru: {
    eyebrow: "ЭКОСИСТЕМА • 4 НАПРАВЛЕНИЯ",
    headlineA1: "Системы, продукты",
    headlineA2: "и сильное окружение",
    headlineB: "для тех, кто",
    headlineAccent: "строит.",
    desc:
      "Рост бизнеса, VisibilityOS, Warriors Team и Performance — четыре самостоятельных направления под одним брендом. Выберите то, что поможет двигаться дальше именно сейчас.",
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
      className="relative flex min-h-[980px] items-center overflow-hidden bg-black !py-0 sm:min-h-[940px] lg:min-h-[900px]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,.095),transparent_34%),radial-gradient(ellipse_at_18%_72%,rgba(255,255,255,.025),transparent_30%),radial-gradient(ellipse_at_82%_72%,rgba(125,211,252,.024),transparent_28%),linear-gradient(180deg,#030303_0%,#000_54%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[.26] [background-image:linear-gradient(rgba(255,255,255,.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.022)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_52%,black_4%,transparent_78%)]" />
        <div
          className="absolute inset-0 opacity-[.026] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/72 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent via-black/54 to-black" />
      </div>

      <EcosystemCore
        directions={directions}
        hrefs={hrefs}
        onDirectionOpen={(direction) =>
          track("hero_direction_open", { direction })
        }
      />

      <div className="container relative z-10 mx-auto flex w-full justify-center px-5 pb-[250px] pt-[112px] sm:px-6 sm:pb-[228px] sm:pt-[116px] lg:pb-[206px] lg:pt-[98px]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center text-center">
          <motion.img
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.978 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            src="/brand/vlad-kuzmenko-logo-gold.png"
            alt="Vlad Kuzmenko"
            className="h-auto w-[244px] select-none drop-shadow-[0_22px_72px_rgba(212,175,55,.20)] sm:w-[294px] lg:w-[330px]"
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduced ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 inline-flex max-w-[94vw] items-center gap-2.5 rounded-full border border-amber-200/[.16] bg-black/44 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_12px_40px_rgba(0,0,0,.28)] backdrop-blur-xl"
          >
            <span className="relative flex h-3 w-3 shrink-0 items-center justify-center" aria-hidden="true">
              <motion.span
                className="absolute inset-[2px] rounded-full border border-amber-300/55"
                animate={
                  reduced
                    ? { opacity: 0.36 }
                    : { opacity: [0.1, 0.58, 0.1], scale: [0.9, 1.7, 0.9] }
                }
                transition={reduced ? { duration: 0.2 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="relative h-1.5 w-1.5 rounded-full bg-amber-300"
                animate={
                  reduced
                    ? { opacity: 0.88 }
                    : {
                        opacity: [0.58, 1, 0.58],
                        scale: [0.92, 1.14, 0.92],
                        boxShadow: [
                          "0 0 7px rgba(252,211,77,.34)",
                          "0 0 17px rgba(252,211,77,.88)",
                          "0 0 7px rgba(252,211,77,.34)",
                        ],
                      }
                }
                transition={reduced ? { duration: 0.2 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="truncate text-[8px] font-semibold uppercase tracking-[.22em] text-amber-100/78 sm:text-[9px] lg:text-[10px]">
              {x.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.84, delay: reduced ? 0 : 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-5 w-full overflow-visible px-1 text-white sm:px-4"
          >
            <span className="mx-auto block max-w-[1140px] text-[clamp(2.08rem,4.05vw,3.72rem)] font-medium leading-[1.01] tracking-[-.047em]">
              {x.headlineA1}
            </span>
            <span className="mx-auto mt-1 block max-w-[1140px] text-[clamp(2.08rem,4.05vw,3.72rem)] font-medium leading-[1.01] tracking-[-.047em] text-zinc-200">
              {x.headlineA2}
            </span>
            <span className="font-display mx-auto mt-2 block max-w-[1210px] overflow-visible pb-[.18em] text-[clamp(2.9rem,5.4vw,5rem)] font-normal leading-[1.06] tracking-[-.036em] text-zinc-100">
              {x.headlineB}{" "}
              <em className="inline-block overflow-visible bg-gradient-to-br from-[#fff0a2] via-[#e2b62d] to-[#8c6207] bg-clip-text pb-[.10em] pl-[.04em] pr-[.28em] font-normal italic text-transparent drop-shadow-[0_12px_36px_rgba(212,175,55,.14)]">
                {x.headlineAccent}
              </em>
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-3 max-w-[780px] text-[12px] leading-6 text-zinc-400 sm:text-[14px] sm:leading-7 lg:text-[15px]"
          >
            {x.desc}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: reduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 mt-6 flex w-full max-w-[520px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
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
              className="h-auto min-h-12 rounded-xl border-white/[.13] bg-black/62 px-7 py-3.5 text-[14px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.055),0_14px_42px_rgba(0,0,0,.24)] backdrop-blur-md hover:border-white/25 hover:bg-white/[.06] sm:text-[15px]"
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
