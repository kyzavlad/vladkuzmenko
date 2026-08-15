"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { directionRoute, getEcosystemCopy, productRoute } from "@/lib/ecosystem";

const ICONS: Record<string, LucideIcon> = {
  visibilityos: Search,
  "ai-systems": Workflow,
};

/**
 * Owned digital products only. Client builds live in /work and are never
 * presented here as products.
 */
export function ProductsOverview() {
  const { lang } = useI18n();
  const x = getEcosystemCopy(lang).products;

  return (
    <section
      id="products"
      className="section-accent relative scroll-mt-24 border-t border-zinc-900 bg-black py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{x.title}</h2>
          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">{x.desc}</p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {x.items.map((item, i) => {
            const Icon = ICONS[item.key] ?? Search;
            const href = productRoute(lang, item.slug);
            return (
              <motion.article
                key={item.key}
                id={item.key === "visibilityos" ? "visibilityos" : undefined}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex scroll-mt-28 flex-col rounded-[26px] border border-white/[.09] bg-[#080808] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/25 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-400">
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-[-.03em]">{item.name}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-200">{item.tagline}</p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                      {x.labels.problem}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.problem}</p>
                  </div>
                  <div className="rounded-2xl border border-white/[.08] bg-white/[.018] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                      {x.labels.whoFor}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.whoFor}</p>
                  </div>
                </div>

                <div className="mt-6 flex-1" />
                <a
                  href={href}
                  onClick={() => track("product_open", { product: item.key, source: "home" })}
                  className="mt-2"
                >
                  <Button className="premium-button h-auto min-h-11 w-full px-6 py-2.5">
                    {x.open}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl text-center">
          <p className="text-sm leading-6 text-zinc-500">{x.note}</p>
          <a
            href={directionRoute(lang, "products")}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-200"
          >
            {x.title}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
