"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Instagram, Send, Twitter, Youtube, MessageCircle, Loader2, Check } from "lucide-react";
import { SITE, submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { langHref } from "@/lib/i18n";

export function FooterSection() {
  const { lang, t } = useI18n();
  const f = t.footer;
  const base = langHref(lang);
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);

  // Targets line up by index with the dictionary label arrays.
  const exploreTargets = [
    base,
    hashHref("work"),
    pageHref("visibilityos"),
    pageHref("ai-systems"),
    pageHref("warriors-team"),
    hashHref("shop"),
    hashHref("about"),
  ];
  const workTargets = [SITE.calcom, pageHref("visibilityos"), pageHref("ai-systems"), pageHref("warriors-team"), hashHref("shop")];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    await submitLead({ intent: "newsletter_signup", language: lang, buttonLabel: "Footer — Newsletter", email });
    setStatus("done");
    setEmail("");
  };

  return (
    <footer className="w-full py-12 md:py-16 border-t border-zinc-800 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight gold-gradient">{f.newsletterTitle}</h2>
            <p className="text-gray-400 text-sm">{f.newsletterDesc}</p>
            {status === "done" ? (
              <p className="flex items-center gap-2 text-amber-300 text-sm"><Check className="h-4 w-4" /> {f.subscribed}</p>
            ) : (
              <form className="relative flex" onSubmit={subscribe}>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={f.emailPh}
                  className="pr-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-[#D4AF37]" />
                <Button type="submit" size="icon" variant="ghost" disabled={status === "sending"}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800">
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">{f.newsletterTitle}</span>
                </Button>
              </form>
            )}
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">{f.exploreTitle}</h3>
            <nav className="space-y-1.5 text-sm">
              {f.explore.map((label, i) => (
                <a key={label} href={exploreTargets[i]} className="block text-gray-400 transition-colors hover:text-[#D4AF37]">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Work with me */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">{f.workTitle}</h3>
            <nav className="space-y-1.5 text-sm">
              {f.work.map((label, i) => (
                <a key={label} href={workTargets[i]}
                  {...(i === 0 ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block text-gray-400 transition-colors hover:text-[#D4AF37]">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">{f.contactTitle}</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href={`mailto:${SITE.email}`} className="hover:text-[#D4AF37] transition-colors underline">{SITE.email}</a>
            </div>
            <div className="pt-2 flex space-x-2">
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" asChild>
                  <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
                </Button></TooltipTrigger><TooltipContent><p>Instagram</p></TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" asChild>
                  <a href={SITE.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
                </Button></TooltipTrigger><TooltipContent><p>YouTube</p></TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" asChild>
                  <a href={SITE.socials.x} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><Twitter className="h-4 w-4" /></a>
                </Button></TooltipTrigger><TooltipContent><p>X / Twitter</p></TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" asChild>
                  <a href={SITE.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle className="h-4 w-4" /></a>
                </Button></TooltipTrigger><TooltipContent><p>WhatsApp</p></TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" asChild>
                  <a href={SITE.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Send className="h-4 w-4" /></a>
                </Button></TooltipTrigger><TooltipContent><p>Telegram</p></TooltipContent></Tooltip></TooltipProvider>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Vlad Kuzmenko. {f.rights}</p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Dialog>
              <DialogTrigger className="text-gray-500 hover:text-[#D4AF37] transition-colors">{f.privacy}</DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-800">
                <DialogHeader><DialogTitle className="text-white">{f.privacy}</DialogTitle></DialogHeader>
                <div className="prose prose-sm prose-invert mt-4 text-gray-300">
                  <p>When you submit a form on this site, the information you provide — name, email, contact handle and message — is sent to Vlad Kuzmenko so he can respond.</p>
                  <p>Your information is not sold. To request access or deletion, email <a href={`mailto:${SITE.email}`} className="text-[#D4AF37]">{SITE.email}</a>.</p>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className="text-gray-500 hover:text-[#D4AF37] transition-colors">{f.terms}</DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-800">
                <DialogHeader><DialogTitle className="text-white">{f.terms}</DialogTitle></DialogHeader>
                <div className="prose prose-sm prose-invert mt-4 text-gray-300">
                  <p>This site presents Vlad Kuzmenko's services and products. Reservations and waitlist / early-access requests are expressions of interest — not a completed purchase. Pricing and availability may change.</p>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </div>
    </footer>
  );
}
