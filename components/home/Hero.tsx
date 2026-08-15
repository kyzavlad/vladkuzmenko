"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  supporting: string;
  primary: string;
  secondary: string;
  proof: string[];
}> = {
  en: {
    eyebrow: "Vlad Kuzmenko · Builder & operator",
    titleA: "Growth systems for businesses that need ",
    titleB: "action, not more noise.",
    supporting: "I build the path from qualified attention to enquiry, follow-up and sale. Around that work I am building software, Warriors Team, performance products and media under one personal brand.",
    primary: "Find the business bottleneck",
    secondary: "Explore the ecosystem",
    proof: ["Growth Systems", "Software", "Warriors Team", "Performance", "Media"],
  },
  ua: {
    eyebrow: "Vlad Kuzmenko · Builder & operator",
    titleA: "Системи росту для бізнесу, якому потрібні ",
    titleB: "дії, а не ще більше шуму.",
    supporting: "Будую шлях від якісної уваги до звернення, follow-up і продажу. Навколо цієї роботи розвиваю software, Warriors Team, performance-продукти та медіа під одним особистим брендом.",
    primary: "Знайти вузьке місце бізнесу",
    secondary: "Відкрити екосистему",
    proof: ["Growth Systems", "Software", "Warriors Team", "Performance", "Media"],
  },
  ru: {
    eyebrow: "Vlad Kuzmenko · Builder & operator",
    titleA: "Системы роста для бизнеса, которому нужны ",
    titleB: "действия, а не ещё больше шума.",
    supporting: "Строю путь от качественного внимания до обращения, follow-up и продажи. Вокруг этой работы развиваю software, Warriors Team, performance-продукты и медиа под одним личным брендом.",
    primary: "Найти узкое место бизнеса",
    secondary: "Открыть экосистему",
    proof: ["Growth Systems", "Software", "Warriors Team", "Performance", "Media"],
  },
};

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const { lang } = useI18n();
  const x = COPY[lang];

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-black py-0">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[10%] h-[62%] w-[92%] -translate-x-1/2 blur-[130px]" style={{ background: "radial-gradient(closest-side,rgba(212,175,55,.18),rgba(184,134,11,.045),transparent 76%)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(110% 80% at 50% 25%,transparent 32%,rgba(0,0,0,.92))" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-32 sm:px-6 md:pb-20 md:pt-36">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-6xl">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="mb-7 rounded-full border border-amber-300/20 bg-amber-300/[.055] px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-amber-200 sm:text-xs">
              {x.eyebrow}
            </span>

            <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="mb-9 h-auto w-[250px] select-none drop-shadow-[0_12px_42px_rgba(212,175,55,.18)] sm:w-[330px]" />

            <h1 className="text-balance text-4xl font-black tracking-[-.05em] text-white sm:text-5xl md:text-7xl md:leading-[1.02]">
              {x.titleA}<span className="gradient-gold-text">{x.titleB}</span>
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8 md:text-xl">{x.supporting}</p>

            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a href="#client-systems" onClick={() => track("hero_business_path")} className="w-full sm:w-auto">
                <Button size="lg" className="premium-button h-auto min-h-12 w-full px-7 py-3 text-base sm:w-auto">
                  {x.primary}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Button size="lg" variant="outline" onClick={() => { track("hero_ecosystem"); scrollTo("ecosystem"); }} className="h-auto min-h-12 w-full border-white/15 bg-white/[.025] px-7 py-3 text-base text-white hover:bg-white/[.07] sm:w-auto">
                {x.secondary}<ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.02] sm:grid-cols-5">
            {x.proof.map((item, index) => (
              <div key={item} className={`px-4 py-4 text-center text-[10px] font-semibold uppercase tracking-[.16em] text-zinc-500 sm:py-5 sm:text-[11px] ${index ? "border-l border-white/[.07]" : ""} ${index === 4 ? "col-span-2 border-t border-white/[.07] sm:col-span-1 sm:border-t-0" : ""}`}>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer" onClick={() => track("calcom_click", { source: "hero_secondary" })} className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-amber-300">
              <Calendar className="h-4 w-4" />
              {lang === "ru" ? "Или сразу обсудить задачу" : lang === "ua" ? "Або одразу обговорити задачу" : "Or discuss the project directly"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
