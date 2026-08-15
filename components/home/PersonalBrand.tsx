"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Send, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { getEcosystemCopy } from "@/lib/ecosystem";
import { TikTokIcon, XIcon } from "@/components/ui/social-icons";

type ChannelKey = "youtube" | "instagram" | "tiktok" | "x" | "telegram";

/** Handles and links come from SITE.socials — never duplicated here. */
const CHANNELS: {
  key: ChannelKey;
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon | ((p: { className?: string }) => JSX.Element);
  /** Subtle platform personality, kept inside the black/gold system. */
  glow: string;
}[] = [
  {
    key: "youtube",
    label: "YouTube",
    handle: "@VladKuzmenkoSpeech",
    href: SITE.socials.youtube,
    icon: Youtube,
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(239,68,68,.45)]",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@vladkuzmenkosxy",
    href: SITE.socials.instagram,
    icon: Instagram,
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(217,70,160,.45)]",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "@vladkuzmenkosxy",
    href: SITE.socials.tiktok,
    icon: TikTokIcon,
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(34,211,238,.4)]",
  },
  {
    key: "x",
    label: "X",
    handle: "@vladkuzmenkosxy",
    href: SITE.socials.x,
    icon: XIcon,
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(255,255,255,.3)]",
  },
  {
    key: "telegram",
    label: "Telegram",
    handle: "@VladKuzmenkoSXY",
    href: SITE.socials.telegram,
    icon: Send,
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(56,161,219,.45)]",
  },
];

export function PersonalBrand() {
  const { lang } = useI18n();
  const x = getEcosystemCopy(lang).social;

  return (
    <section
      id="content"
      className="relative scroll-mt-24 border-t border-zinc-900 bg-black py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {x.titleA}
            <span className="gradient-gold-text">{x.titleB}</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">{x.desc}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {CHANNELS.map((channel, i) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.key}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("social_outbound", { platform: channel.key })}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group flex flex-col rounded-[24px] border border-white/[.09] bg-[#080808] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/25 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${channel.glow}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04] text-amber-300 transition-colors group-hover:border-amber-300/30 group-hover:bg-amber-300/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-amber-300" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{channel.label}</h3>
                <p className="mt-1 text-sm text-amber-300/75">{channel.handle}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{x.channels[channel.key]}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
