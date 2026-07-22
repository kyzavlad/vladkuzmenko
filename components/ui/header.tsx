"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, openAssistant } from "@/lib/site";
import { track } from "@/lib/analytics";
import { useI18n } from "@/components/i18n-provider";
import { LANGS, LANG_LABELS, langHref } from "@/lib/i18n";

// Sub-pages that exist in all three languages (for the language switcher).
const LOCALIZED_SLUGS = new Set([
  "",
  "automation",
  "auto-dealers",
  "visibilityos",
  "ai-systems",
  "warriors-team",
]);

export function Header() {
  const { lang, t } = useI18n();
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const base = langHref(lang); // "/" | "/ua" | "/ru"
  // Locale-aware absolute hash links: /#work, /ua#work, /ru#work
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);

  const navItems: { title: string; href: string; hash?: string }[] = [
    { title: t.nav.home, href: base },
    { title: t.nav.work, href: hashHref("work"), hash: "work" },
    { title: t.nav.automation, href: pageHref("automation") },
    { title: t.nav.products, href: hashHref("products"), hash: "products" },
    { title: t.nav.visibilityos, href: pageHref("visibilityos") },
    { title: t.nav.warriors, href: pageHref("warriors-team") },
    { title: t.nav.shop, href: hashHref("shop"), hash: "shop" },
    { title: t.nav.about, href: hashHref("about"), hash: "about" },
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

  // Path-aware language switch: keep the same localized sub-page when possible.
  const stripped = pathname.match(/^\/(ua|ru)(\/.*)?$/);
  const rel = stripped ? stripped[2] || "/" : pathname;
  const slug = rel === "/" ? "" : rel.replace(/^\//, "").split("/")[0];
  const switchHref = (l: (typeof LANGS)[number]) => {
    const b = l === "en" ? "" : `/${l}`;
    // Case-study routes: preserve the full /work/<slug> sub-path across locales.
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
              if (l !== lang) track("locale_change", { from: lang, to: l });
              try {
                localStorage.setItem("vk_lang", l);
              } catch {
                /* no-op */
              }
            }}
            className={`px-1.5 py-1 rounded transition-colors ${
              l === lang ? "text-amber-300" : "text-gray-500 hover:text-amber-200"
            }`}
          >
            {LANG_LABELS[l]}
          </a>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <header className="w-full z-30 fixed top-0 left-0 bg-black/70 backdrop-blur-xl border-b border-amber-400/10">
      <div className="container relative mx-auto h-[80px] flex items-center justify-between gap-4">
        {/* Logo */}
        <a href={base} className="flex items-center shrink-0" aria-label="Vlad Kuzmenko — Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/vlad-kuzmenko-logo-gold.png"
            alt="Vlad Kuzmenko"
            className="h-11 sm:h-12 w-auto select-none"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="px-3.5 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-white/5 hover:text-amber-200 transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <LangSwitcher />
          <button
            type="button"
            onClick={openAssistant}
            className="text-sm font-medium text-gray-400 hover:text-amber-200 transition-colors"
          >
            {t.cta.askAI}
          </button>
          <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
            <Button className="premium-button h-10 px-5">
              <Calendar className="mr-2 h-4 w-4" />
              {t.cta.bookCall}
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LangSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-amber-400/10 bg-black/95 backdrop-blur-xl shadow-2xl px-4 pt-2 pb-5 flex flex-col gap-1 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="py-2.5 px-2 text-base font-medium text-gray-200 hover:text-amber-200 border-b border-border/20 last:border-0"
            >
              {item.title}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAssistant();
              }}
              className="text-sm font-medium text-gray-400 hover:text-amber-200 transition-colors py-2 text-left"
            >
              {t.cta.askAI}
            </button>
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
              <Button className="w-full premium-button">
                <Calendar className="mr-2 h-4 w-4" />
                {t.cta.bookCall}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
