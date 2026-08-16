"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Instagram, Send, Youtube, MessageCircle, Loader2, Check, Mail } from "lucide-react";
import { SITE, submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { TikTokIcon, XIcon } from "@/components/ui/social-icons";

const COPY: Record<Lang, {
  signoff: string;
  nav: string;
  growth: string;
  work: string;
  visibility: string;
  warriors: string;
  performance: string;
  about: string;
}> = {
  en: {
    signoff: "Systems, products and a stronger standard of execution.",
    nav: "Explore",
    growth: "For business",
    work: "Work",
    visibility: "VisibilityOS",
    warriors: "Warriors Team",
    performance: "Performance",
    about: "About",
  },
  ua: {
    signoff: "Системи, продукти і вища планка виконання.",
    nav: "Навігація",
    growth: "Для бізнесу",
    work: "Роботи",
    visibility: "VisibilityOS",
    warriors: "Warriors Team",
    performance: "Performance",
    about: "Про мене",
  },
  ru: {
    signoff: "Системы, продукты и более высокая планка исполнения.",
    nav: "Навигация",
    growth: "Для бизнеса",
    work: "Работы",
    visibility: "VisibilityOS",
    warriors: "Warriors Team",
    performance: "Performance",
    about: "Обо мне",
  },
};

export function FooterSection() {
  const { lang, t } = useI18n();
  const f = t.footer;
  const x = COPY[lang];
  const base = langHref(lang);
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const nav = [
    [x.growth, pageHref("growth-systems")],
    [x.work, pageHref("work")],
    [x.visibility, pageHref("visibilityos")],
    [x.warriors, pageHref("warriors-team")],
    [x.performance, pageHref("drop")],
    [x.about, hashHref("about")],
  ];

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    const ok = await submitLead({ intent: "newsletter_signup", language: lang, buttonLabel: "Footer - Newsletter", email });
    setStatus(ok ? "done" : "idle");
    if (ok) setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[.08] bg-[#010101] py-12 md:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.055),transparent_67%)]" aria-hidden="true" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.7fr_1.25fr] lg:gap-14">
          <div>
            <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-auto w-[210px]" />
            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-500">{x.signoff}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                ["Instagram", SITE.socials.instagram, Instagram],
                ["YouTube", SITE.socials.youtube, Youtube],
                ["X", SITE.socials.x, XIcon],
                ["TikTok", SITE.socials.tiktok, TikTokIcon],
                ["Telegram", SITE.socials.telegram, Send],
                ["WhatsApp", SITE.socials.whatsapp, MessageCircle],
              ].map(([label, href, Icon]) => {
                const SocialIcon = Icon as React.ComponentType<{ className?: string }>;
                return (
                  <a key={String(label)} href={String(href)} target="_blank" rel="noopener noreferrer" aria-label={String(label)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[.08] bg-white/[.025] text-zinc-500 transition-colors hover:border-amber-300/25 hover:text-amber-300">
                    <SocialIcon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[.2em] text-zinc-600">{x.nav}</h3>
            <nav className="mt-5 space-y-2.5">
              {nav.map(([label, href]) => (
                <a key={label} href={href} className="block text-sm text-zinc-400 transition-colors hover:text-amber-300">{label}</a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-100">{f.newsletterTitle}</h3>
            <p className="mt-2 max-w-md text-sm leading-7 text-zinc-500">{f.newsletterDesc}</p>
            {status === "done" ? (
              <p className="mt-5 flex items-center gap-2 text-sm text-amber-300"><Check className="h-4 w-4" />{f.subscribed}</p>
            ) : (
              <form className="relative mt-5 flex max-w-md" onSubmit={subscribe}>
                <Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={f.emailPh} className="h-12 rounded-xl bg-white/[.035] pr-12 text-white placeholder:text-zinc-600" />
                <Button type="submit" size="icon" variant="ghost" disabled={status === "sending"} className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg text-zinc-500 hover:bg-white/[.05] hover:text-amber-300">
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">{f.newsletterTitle}</span>
                </Button>
              </form>
            )}

            <a href={`mailto:${SITE.email}`} className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-amber-300">
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[.07] pt-7 text-center md:flex-row">
          <p className="text-xs text-zinc-700">© {new Date().getFullYear()} Vlad Kuzmenko. {f.rights}</p>
          <nav className="flex flex-wrap justify-center gap-4 text-xs">
            <Dialog>
              <DialogTrigger className="text-zinc-600 transition-colors hover:text-amber-300">{f.privacy}</DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-950">
                <DialogHeader><DialogTitle className="text-white">{f.privacy}</DialogTitle></DialogHeader>
                <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
                  <p>When you submit a form on this site, the information you provide is sent to Vlad Kuzmenko so he can respond.</p>
                  <p>Your information is not sold. To request access or deletion, email <a href={`mailto:${SITE.email}`} className="text-amber-300">{SITE.email}</a>.</p>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className="text-zinc-600 transition-colors hover:text-amber-300">{f.terms}</DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-950">
                <DialogHeader><DialogTitle className="text-white">{f.terms}</DialogTitle></DialogHeader>
                <div className="mt-4 text-sm leading-7 text-zinc-400">
                  <p>This site presents Vlad Kuzmenko services, projects and product concepts. Research-list and early-access requests are expressions of interest, not a purchase.</p>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </div>
    </footer>
  );
}
