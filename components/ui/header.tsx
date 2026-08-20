"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { LANGS, LANG_LABELS, langHref, type Lang } from "@/lib/i18n";

const LOCALIZED_SLUGS = new Set([
  "",
  "growth-systems",
  "work",
  "products",
  "drop",
  "visibilityos",
  "auto-dealers",
  "warriors-team",
]);

const NAV_COPY: Record<Lang, {
  business: string;
  work: string;
  visibility: string;
  warriors: string;
  about: string;
}> = {
  en: { business: "Business", work: "Projects", visibility: "VisibilityOS", warriors: "Warriors", about: "About" },
  ua: { business: "Бізнес", work: "Проєкти", visibility: "VisibilityOS", warriors: "Warriors", about: "Про мене" },
  ru: { business: "Бизнес", work: "Проекты", visibility: "VisibilityOS", warriors: "Warriors", about: "Обо мне" },
};

export function Header() {
  const { lang, t } = useI18n();
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const labels = NAV_COPY[lang];

  const base = langHref(lang);
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);

  const navItems: { title: string; href: string; hash?: string }[] = [
    { title: labels.business, href: pageHref("growth-systems") },
    { title: labels.work, href: hashHref("owned-ventures"), hash: "owned-ventures" },
    { title: labels.visibility, href: pageHref("visibilityos") },
    { title: labels.warriors, href: pageHref("warriors-team") },
    { title: labels.about, href: hashHref("about"), hash: "about" },
  ];

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, item: { hash?: string }) => {
    setMobileMenuOpen(false);
    if (!item.hash || typeof document === "undefined") return;
    const element = document.getElementById(item.hash);
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stripped = pathname.match(/^\/(ua|ru)(\/.*)?$/);
  const rel = stripped ? stripped[2] || "/" : pathname;
  const slug = rel === "/" ? "" : rel.replace(/^\//, "").split("/")[0];
  const isHome = slug === "";

  const switchHref = (language: (typeof LANGS)[number]) => {
    const languageBase = language === "en" ? "" : `/${language}`;
    if (rel === "/visibilityos/app" || rel.startsWith("/visibilityos/app/")) {
      return `${languageBase}/visibilityos/app`;
    }
    if (slug === "work") return `${languageBase}${rel}` || "/";
    const useSlug = LOCALIZED_SLUGS.has(slug) ? slug : "";
    return useSlug ? `${languageBase}/${useSlug}` : languageBase || "/";
  };

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileMenuOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 150);
    onScroll();
    window.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const LangSwitcher = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-1 text-xs font-semibold ${className}`}>
      {LANGS.map((language, index) => (
        <React.Fragment key={language}>
          {index > 0 ? <span className="text-zinc-700">/</span> : null}
          <a
            href={switchHref(language)}
            aria-current={language === lang ? "true" : undefined}
            onClick={() => {
              try { localStorage.setItem("vk_lang", language); } catch { /* no-op */ }
            }}
            className={`rounded px-1.5 py-1 transition-colors ${language === lang ? "text-amber-300" : "text-gray-500 hover:text-amber-200"}`}
          >
            {LANG_LABELS[language]}
          </a>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <header className="fixed left-0 top-0 z-30 w-full border-b border-white/[.07] bg-black/72 backdrop-blur-2xl">
      <div className="container relative mx-auto flex h-[80px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href={base} className={`flex w-[170px] shrink-0 items-center transition-all duration-500 sm:w-[190px] ${isHome && !scrolled ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`} aria-label="Vlad Kuzmenko — Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-auto w-full select-none" />
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <a key={item.title} href={item.href} onClick={(event) => handleNavClick(event, item)} className="relative whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium text-zinc-400 transition-colors after:absolute after:bottom-0 after:left-3 after:h-px after:w-0 after:bg-amber-300/80 after:transition-all hover:text-white hover:after:w-[calc(100%-24px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60">{item.title}</a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <LangSwitcher />
          <a href={SITE.calcom} target="_blank" rel="noopener noreferrer"><Button className="premium-button h-10 px-4 xl:px-5"><Calendar className="mr-2 h-4 w-4" />{t.cta.bookCall}</Button></a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LangSwitcher className="md:hidden" />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="absolute left-0 right-0 top-full border-t border-white/[.07] bg-[#050505]/98 px-4 pb-5 pt-2 shadow-2xl backdrop-blur-2xl xl:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-0">
            {navItems.map((item) => <a key={item.title} href={item.href} onClick={(event) => handleNavClick(event, item)} className="rounded-xl border-b border-white/[.05] px-3 py-3 text-base font-medium text-zinc-200 last:border-0 hover:bg-white/[.04] hover:text-white">{item.title}</a>)}
            <div className="mt-2 border-t border-white/[.07] pt-4"><a href={SITE.calcom} target="_blank" rel="noopener noreferrer"><Button className="premium-button min-h-11 w-full"><Calendar className="mr-2 h-4 w-4" />{t.cta.bookCall}</Button></a></div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
