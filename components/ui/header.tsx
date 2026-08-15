"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, openAssistant } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { LANGS, LANG_LABELS, langHref, type Lang } from "@/lib/i18n";

const LOCALIZED_SLUGS = new Set([
  "",
  "growth-systems",
  "work",
  "products",
  "drop",
  "visibilityos",
  "ai-systems",
  "auto-dealers",
  "warriors-team",
]);

const NAV_COPY: Record<Lang, {
  business: string;
  work: string;
  visibility: string;
  warriors: string;
  performance: string;
  about: string;
}> = {
  en: { business: "For business", work: "Work", visibility: "VisibilityOS", warriors: "Warriors", performance: "Performance", about: "About" },
  ua: { business: "Для бізнесу", work: "Роботи", visibility: "VisibilityOS", warriors: "Warriors", performance: "Performance", about: "Про мене" },
  ru: { business: "Для бизнеса", work: "Работы", visibility: "VisibilityOS", warriors: "Warriors", performance: "Performance", about: "Обо мне" },
};

export function Header() {
  const { lang, t } = useI18n();
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const labels = NAV_COPY[lang];

  const base = langHref(lang);
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);

  const navItems: { title: string; href: string; hash?: string }[] = [
    { title: labels.business, href: hashHref("growth-systems"), hash: "growth-systems" },
    { title: labels.work, href: pageHref("work") },
    { title: labels.visibility, href: pageHref("visibilityos") },
    { title: labels.warriors, href: pageHref("warriors-team") },
    { title: labels.performance, href: pageHref("drop") },
    { title: labels.about, href: hashHref("about"), hash: "about" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { hash?: string }) => {
    setMobileMenuOpen(false);
    if (!item.hash || typeof document === "undefined") return;
    const el = document.getElementById(item.hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stripped = pathname.match(/^\/(ua|ru)(\/.*)?$/);
  const rel = stripped ? stripped[2] || "/" : pathname;
  const slug = rel === "/" ? "" : rel.replace(/^\//, "").split("/")[0];
  const switchHref = (l: (typeof LANGS)[number]) => {
    const b = l === "en" ? "" : `/${l}`;
    if (slug === "work") return `${b}${rel}` || "/";
    const useSlug = LOCALIZED_SLUGS.has(slug) ? slug : "";
    return useSlug ? `${b}/${useSlug}` : b || "/";
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const LangSwitcher = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-1 text-xs font-semibold ${className}`}>
      {LANGS.map((l, idx) => (
        <React.Fragment key={l}>
          {idx > 0 && <span className="text-zinc-700">/</span>}
          <a
            href={switchHref(l)}
            aria-current={l === lang ? "true" : undefined}
            onClick={() => {
              try { localStorage.setItem("vk_lang", l); } catch { /* no-op */ }
            }}
            className={`rounded px-1.5 py-1 transition-colors ${l === lang ? "text-amber-300" : "text-zinc-500 hover:text-zinc-200"}`}
          >
            {LANG_LABELS[l]}
          </a>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <header className="fixed left-0 top-0 z-30 w-full border-b border-white/[.07] bg-black/70 backdrop-blur-2xl">
      <div className="container relative mx-auto flex h-[78px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href={base} className="flex shrink-0 items-center" aria-label="Vlad Kuzmenko — Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-10 w-auto select-none sm:h-11" />
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <a key={item.title} href={item.href} onClick={(e) => handleNavClick(e, item)} className="whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-white/[.045] hover:text-white">
              {item.title}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <LangSwitcher />
          <button type="button" onClick={openAssistant} className="hidden h-10 items-center gap-2 rounded-xl border border-sky-300/15 bg-sky-300/[.045] px-3.5 text-sm font-semibold text-sky-100/80 transition hover:border-sky-300/30 hover:bg-sky-300/[.08] xl:inline-flex">
            <Bot className="h-4 w-4" />
            {t.cta.askAI}
          </button>
          <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
            <Button className="premium-button h-10 px-4 xl:px-5">
              <Calendar className="mr-2 h-4 w-4" />
              {t.cta.bookCall}
            </Button>
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LangSwitcher className="md:hidden" />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-white/[.07] bg-[#050505]/98 px-4 pb-5 pt-2 shadow-2xl backdrop-blur-2xl xl:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-0">
            {navItems.map((item) => (
              <a key={item.title} href={item.href} onClick={(e) => handleNavClick(e, item)} className="rounded-xl border-b border-white/[.05] px-3 py-3 text-base font-medium text-zinc-200 last:border-0 hover:bg-white/[.04] hover:text-white">
                {item.title}
              </a>
            ))}
            <div className="mt-2 grid gap-2 border-t border-white/[.07] pt-4 sm:grid-cols-2">
              <button type="button" onClick={() => { setMobileMenuOpen(false); openAssistant(); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-sky-300/15 bg-sky-300/[.045] px-4 text-sm font-semibold text-sky-100/80">
                <Bot className="h-4 w-4" />
                {t.cta.askAI}
              </button>
              <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
                <Button className="premium-button min-h-11 w-full"><Calendar className="mr-2 h-4 w-4" />{t.cta.bookCall}</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
