"use client";

import * as React from "react";
import { useState } from "react";
import { Check, Instagram, Loader2, MessageCircle, Send, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SITE, submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { TikTokIcon, XIcon } from "@/components/ui/social-icons";

type Copy = {
  line: string;
  newsletter: string;
  email: string;
  subscribed: string;
  ecosystem: string;
  contact: string;
  legal: string;
  links: { label: string; slug: string }[];
  privacy: string;
  terms: string;
  rights: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    line: "Growth systems, software, Warriors Team, performance products and the media around the build.",
    newsletter: "Occasional notes on what is being built and what changed. No content calendar spam.",
    email: "Email for updates",
    subscribed: "You're on the list.",
    ecosystem: "Ecosystem",
    contact: "Direct contact",
    legal: "Legal",
    links: [
      { label: "Growth Systems", slug: "growth-systems" },
      { label: "Work", slug: "work" },
      { label: "VisibilityOS", slug: "visibilityos" },
      { label: "Warriors Team", slug: "warriors-team" },
      { label: "Performance", slug: "drop" },
    ],
    privacy: "Privacy",
    terms: "Terms",
    rights: "All rights reserved.",
  },
  ua: {
    line: "Growth systems, software, Warriors Team, performance-продукти та медіа навколо побудови.",
    newsletter: "Іноді надсилаю, що будую і що змінилося. Без спаму заради контент-плану.",
    email: "Email для оновлень",
    subscribed: "Ви у списку.",
    ecosystem: "Екосистема",
    contact: "Прямий контакт",
    legal: "Документи",
    links: [
      { label: "Growth Systems", slug: "growth-systems" },
      { label: "Роботи", slug: "work" },
      { label: "VisibilityOS", slug: "visibilityos" },
      { label: "Warriors Team", slug: "warriors-team" },
      { label: "Performance", slug: "drop" },
    ],
    privacy: "Конфіденційність",
    terms: "Умови",
    rights: "Усі права захищено.",
  },
  ru: {
    line: "Growth systems, software, Warriors Team, performance-продукты и медиа вокруг построения.",
    newsletter: "Иногда отправляю, что строю и что изменилось. Без спама ради контент-плана.",
    email: "Email для обновлений",
    subscribed: "Вы в списке.",
    ecosystem: "Экосистема",
    contact: "Прямой контакт",
    legal: "Документы",
    links: [
      { label: "Growth Systems", slug: "growth-systems" },
      { label: "Работы", slug: "work" },
      { label: "VisibilityOS", slug: "visibilityos" },
      { label: "Warriors Team", slug: "warriors-team" },
      { label: "Performance", slug: "drop" },
    ],
    privacy: "Конфиденциальность",
    terms: "Условия",
    rights: "Все права защищены.",
  },
};

export function FooterSection() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    const ok = await submitLead({ intent: "newsletter_signup", language: lang, buttonLabel: "Footer — Newsletter", email });
    if (ok) { setStatus("done"); setEmail(""); } else setStatus("idle");
  };

  const socials = [
    { label: "Instagram", href: SITE.socials.instagram, icon: Instagram },
    { label: "YouTube", href: SITE.socials.youtube, icon: Youtube },
    { label: "TikTok", href: SITE.socials.tiktok, icon: TikTokIcon },
    { label: "X", href: SITE.socials.x, icon: XIcon },
    { label: "Telegram", href: SITE.socials.telegram, icon: Send },
    { label: "WhatsApp", href: SITE.socials.whatsapp, icon: MessageCircle },
  ];

  return (
    <footer className="border-t border-white/[.08] bg-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr_.75fr_.75fr]">
          <div>
            <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-auto w-[210px]" />
            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-500">{x.line}</p>
            <p className="mt-6 max-w-md text-xs leading-5 text-zinc-600">{x.newsletter}</p>
            {status === "done" ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-amber-300"><Check className="h-4 w-4" />{x.subscribed}</p>
            ) : (
              <form onSubmit={subscribe} className="relative mt-3 max-w-sm">
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={x.email} className="h-11 border-white/10 bg-white/[.03] pr-12 text-white placeholder:text-zinc-700" />
                <Button type="submit" size="icon" variant="ghost" disabled={status === "sending"} className="absolute right-1 top-1 h-9 w-9 text-zinc-500 hover:bg-white/[.04] hover:text-amber-300">{status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</Button>
              </form>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[.18em] text-zinc-600">{x.ecosystem}</h3>
            <nav className="mt-5 space-y-3">{x.links.map((item) => <a key={item.slug} href={`${prefix}/${item.slug}`} className="block text-sm text-zinc-400 transition hover:text-amber-300">{item.label}</a>)}</nav>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[.18em] text-zinc-600">{x.contact}</h3>
            <div className="mt-5 space-y-3"><a href={`mailto:${SITE.email}`} className="block break-all text-sm text-zinc-400 transition hover:text-amber-300">{SITE.email}</a><a href={SITE.calcom} target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-400 transition hover:text-amber-300">Cal.com</a></div>
            <div className="mt-5 flex flex-wrap gap-1.5">{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[.08] text-zinc-500 transition hover:border-amber-300/25 hover:text-amber-300"><Icon className="h-3.5 w-3.5" /></a>)}</div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[.18em] text-zinc-600">{x.legal}</h3>
            <div className="mt-5 space-y-3">
              <Dialog><DialogTrigger className="block text-sm text-zinc-400 transition hover:text-amber-300">{x.privacy}</DialogTrigger><DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-900"><DialogHeader><DialogTitle>{x.privacy}</DialogTitle></DialogHeader><div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300"><p>When you submit a form on this site, the contact and message information you provide is sent to Vlad Kuzmenko so the request can be handled.</p><p>Your information is not sold. To request access or deletion, email {SITE.email}.</p></div></DialogContent></Dialog>
              <Dialog><DialogTrigger className="block text-sm text-zinc-400 transition hover:text-amber-300">{x.terms}</DialogTrigger><DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-900"><DialogHeader><DialogTitle>{x.terms}</DialogTitle></DialogHeader><div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300"><p>Website pages describe services, software, community access and product directions. A waitlist or first-access form is an expression of interest unless a page explicitly presents a verified purchase flow.</p></div></DialogContent></Dialog>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[.08] pt-7 text-sm text-zinc-700 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Vlad Kuzmenko. {x.rights}</span><span>VladKuzmenko.com</span></div>
      </div>
    </footer>
  );
}
