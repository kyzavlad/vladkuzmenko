"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Layers, Search, Workflow, Flame, ShoppingBag, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { langHref } from "@/lib/i18n";

type CardKey = "visibilityos" | "aisystems" | "warriors" | "drop";

export function ProductsOverview() {
  const { lang, t } = useI18n();
  const p = t.products;
  const base = langHref(lang);
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);

  const cards: { key: CardKey; icon: LucideIcon; href: string; id?: string }[] = [
    { key: "visibilityos", icon: Search, href: pageHref("visibilityos"), id: "visibilityos" },
    { key: "aisystems", icon: Workflow, href: pageHref("ai-systems") },
    { key: "warriors", icon: Flame, href: pageHref("warriors-team"), id: "warriors" },
    { key: "drop", icon: ShoppingBag, href: hashHref("shop") },
  ];

  const cw = p.cards.clientWork;

  return (
    <section id="products" className="section-accent relative py-24 md:py-32 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            {p.titleA}<span className="gradient-gold-text">{p.titleB}</span>
          </h2>
          <p className="text-lg text-gray-400">{p.desc}</p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Featured: Client work (wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href={hashHref("work")} className="luxe-card p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0">
                <Layers className="h-7 w-7 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{cw.title}</h3>
                <p className="text-gray-300 leading-relaxed max-w-2xl">{cw.outcome}</p>
                <p className="text-xs text-amber-300/70 mt-3">{cw.whoFor}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-300 group-hover:text-amber-200 shrink-0">
                {cw.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>

          {/* 4 product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((m, i) => {
              const c = p.cards[m.key];
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.key}
                  id={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="scroll-mt-28"
                >
                  <Link href={m.href} className="luxe-card p-7 flex flex-col h-full group">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">{c.outcome}</p>
                    <p className="text-xs text-amber-300/70 mt-4 mb-4">{c.whoFor}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-300 group-hover:text-amber-200">
                      {c.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
