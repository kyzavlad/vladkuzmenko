"use client";

import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, openAssistant } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

export function AboutSection() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <section id="about" className="relative py-24 md:py-32 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {a.titleA}
              <span className="gradient-gold-text">{a.titleB}</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{a.p1}</p>
            <p className="text-base text-gray-400 max-w-3xl mx-auto mt-4">{a.p2}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2.5 mb-14"
          >
            {a.themes.map((theme) => (
              <span
                key={theme}
                className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-sm text-gray-300"
              >
                {theme}
              </span>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {a.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="luxe-card p-6"
              >
                <div className="text-2xl font-black gradient-gold-text mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
              <Button className="premium-button h-11 px-7">
                <Calendar className="mr-2 h-4 w-4" />
                {t.cta.bookCall}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
