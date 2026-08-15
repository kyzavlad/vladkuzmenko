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
  "ai-systems",
  "auto-dealers",
  "warriors-team",
]);

const NAV_COPY: Record<Lang, { home: string; business: string; work: string; software: string; warriors: string; performance: string; about: string }> = {
  en: { home: "Home", business: "For Business", work: "Work", software: "Software", warriors: "Warriors", performance: "Performance", about: "About" },
  ua: { home: "Головна", business: "Для бізнесу", work: "Роботи", software: "Software", warriors: "Warriors", performance: "Performance", about: "Про мене" },
  ru: { home: "Главная", business: "Для бизнеса", work: "Работы", software: "Software", warriors: "Warriors", performance: "Performance", about: "Обо мне" },
};

export function Header() {
  const { lang, t } = useI18n();
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const base = langHref(lang);
  const n = NAV_COPY[lang];
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);

  const navItems: { title: string; href: string; hash?: string }[] = [
    { title: n.home, href: base },
    { title: n.business, href: pageHref("growth-systems") },
    { title: n.work, href: pageHref("work") },
    { title: n.software, href: pageHref("products") },
    { title: n.warriors, href: pageHref("warriors-team") },
    { title: n.performance, href: pageHref("drop") },
    { title: n.about, href: hashHref("about"), hash: "about" },
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
              try {
                localStorage.setItem("vk_lang", l);
              } catch {
                /* no-op */
              }
            }}
            className={`rounded px-1.5 py-1 transition-colors ${l === lang ? "text-amber-300" : "text-gray-500 hover:text-amber-200"}`}
          >
            {LANG_LABELS[l]}
          </a>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <header className="fixed left-0 top-0 z-30 w-full border-b border-amber-400/10 bg-black/75 backdrop-blur-xl">
      <div className="container relative mx-auto flex h-[80px] items-center justify-between gap-4">
        <a href={base} className="flex shrink-0 items-center" aria-label="Vlad Kuzmenko — Home">
          <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-11 w-auto select-none sm:h-12" />
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <a key={item.title} href={item.href} onClick={(e) => handleNavClick(e, item)} className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60">
              {item.title}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex xl:gap-3">
          <LangSwitcher />
          <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
            <Button className="premium-button h-10 px-5"><Calendar className="mr-2 h-4 w-4" />{t.cta.bookCall}</Button>
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LangSwitcher className="md:hidden" />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen((o) => !o)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-1 border-t border-amber-400/10 bg-black/95 px-4 pb-5 pt-2 shadow-2xl backdrop-blur-xl xl:hidden">
          {navItems.map((item) => (
            <a key={item.title} href={item.href} onClick={(e) => handleNavClick(e, item)} className="rounded-md border-b border-border/20 px-2 py-2.5 text-base font-medium text-gray-200 last:border-0 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60">
              {item.title}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3">
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer"><Button className="premium-button w-full"><Calendar className="mr-2 h-4 w-4" />{t.cta.bookCall}</Button></a>
          </div>
        </div>
      )}
    </header>
  );
}
