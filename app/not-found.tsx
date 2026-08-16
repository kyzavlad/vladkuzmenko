"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, SearchX } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type Copy = { eyebrow: string; title: string; desc: string; home: string };

const COPY: Record<"en" | "ua" | "ru", Copy> = {
  en: { eyebrow: "Signal lost", title: "This route does not exist.", desc: "The page may have moved or the address is wrong. Return to the ecosystem and choose a direction from there.", home: "Back to home" },
  ua: { eyebrow: "Сигнал втрачено", title: "Такого маршруту немає.", desc: "Сторінка могла переїхати або адреса введена неправильно. Поверніться на головну і оберіть потрібний напрям звідти.", home: "На головну" },
  ru: { eyebrow: "Сигнал потерян", title: "Такого маршрута нет.", desc: "Страница могла переехать или адрес введён неправильно. Вернитесь на главную и выберите нужное направление оттуда.", home: "На главную" },
};

export default function NotFound() {
  const pathname = usePathname() || "/";
  const reduced = useReducedMotion();
  const lang: "en" | "ua" | "ru" = pathname.startsWith("/ru") ? "ru" : pathname.startsWith("/ua") ? "ua" : "en";
  const x = COPY[lang];
  const home = lang === "en" ? "/" : `/${lang}`;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,.10),rgba(56,189,248,.025)_38%,transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 opacity-[.23] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(circle_at_center,black_3%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <motion.img
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          src="/brand/vlad-kuzmenko-logo-gold.png"
          alt="Vlad Kuzmenko"
          className="mx-auto h-auto w-[230px] sm:w-[270px]"
        />

        <div className="relative mx-auto mt-10 flex h-40 w-40 items-center justify-center" aria-hidden="true">
          <motion.div
            className="absolute inset-0 rounded-full border border-white/[.06]"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-5 rounded-full border border-amber-300/20"
            animate={reduced ? undefined : { scale: [.94, 1.06, .94], opacity: [.3, .8, .3] }}
            transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <SearchX className="h-7 w-7 text-amber-300/75" />
          <span className="absolute -right-2 top-1/2 h-px w-16 bg-gradient-to-r from-amber-300/50 to-transparent" />
          <span className="absolute -left-2 top-1/2 h-px w-16 bg-gradient-to-l from-amber-300/50 to-transparent" />
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/65">404 · {x.eyebrow}</p>
        <h1 className="section-title mt-4 text-[clamp(2.8rem,6vw,5rem)] text-zinc-100">{x.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base sm:leading-8">{x.desc}</p>
        <a href={home} className="mt-8 inline-block">
          <Button className="premium-button h-auto min-h-12 px-7 py-3">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {x.home}
          </Button>
        </a>
      </div>
    </main>
  );
}
