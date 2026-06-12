"use client";

import { motion } from "framer-motion";
import { Youtube, Instagram, Send, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

// Handles + links are language-independent; descriptions come from the dictionary.
const channelMeta: { handle: string; href: string; icon: LucideIcon | null }[] = [
  { handle: "@vladkuzmenkoai", href: SITE.socials.youtube, icon: Youtube },
  { handle: "@vladkuzmenkosxy", href: SITE.socials.instagram, icon: Instagram },
  { handle: "@vladkuzmenkosxy", href: SITE.socials.x, icon: null },
  { handle: "@vladkuzmenkoai", href: SITE.socials.telegram, icon: Send },
];

export function BuildInPublic() {
  const { t } = useI18n();
  return (
    <section id="content" className="relative py-24 md:py-32 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-[0.16em]">
            {t.content.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            {t.content.titleA}
            <span className="gradient-gold-text">{t.content.titleB}</span>
          </h2>
          <p className="text-lg text-gray-400">{t.content.desc}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {t.content.channels.map((c, i) => {
            const meta = channelMeta[i];
            const Icon = meta.icon;
            return (
              <motion.a
                key={c.name}
                href={meta.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="luxe-card p-6 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 flex items-center justify-center">
                    {Icon ? (
                      <Icon className="h-5 w-5 text-amber-400" />
                    ) : (
                      <span className="text-amber-400 font-bold text-lg leading-none">𝕏</span>
                    )}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-500 group-hover:text-amber-300 transition-colors" />
                </div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-amber-300/80 mb-2">{meta.handle}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
