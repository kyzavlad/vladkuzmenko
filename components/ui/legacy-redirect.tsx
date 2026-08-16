"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

const COPY = {
  en: { title: "This page has moved.", text: "Taking you to the current page.", cta: "Continue" },
  ua: { title: "Ця сторінка переїхала.", text: "Переходимо до актуальної сторінки.", cta: "Продовжити" },
  ru: { title: "Эта страница переехала.", text: "Переходим на актуальную страницу.", cta: "Продолжить" },
};

export function LegacyRedirect({ href }: { href: string }) {
  const pathname = usePathname() || "/";
  const lang = pathname.startsWith("/ru") ? "ru" : pathname.startsWith("/ua") ? "ua" : "en";
  const x = COPY[lang];

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="max-w-md text-center">
        <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="mx-auto h-auto w-[220px]" />
        <Loader2 className="mx-auto mt-8 h-6 w-6 animate-spin text-amber-300/70" aria-hidden="true" />
        <h1 className="mt-6 text-2xl font-semibold">{x.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">{x.text}</p>
        <a href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200">
          {x.cta}<ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </main>
  );
}
