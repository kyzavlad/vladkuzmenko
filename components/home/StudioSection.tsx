"use client";

import { motion } from "framer-motion";
import { Bot, Globe, MessageSquare, PenLine, Megaphone, Search, Calendar, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

// Icons line up by index with t.studio.services (6 entries).
const icons: LucideIcon[] = [Bot, Globe, MessageSquare, PenLine, Megaphone, Search];

export function StudioSection() {
  const { t } = useI18n();
  return (
    <section id="work" className="section-accent relative py-24 md:py-32 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="eyebrow">{t.studio.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            {t.studio.titleA}
            <span className="gradient-gold-text">{t.studio.titleB}</span>
          </h2>
          <p className="text-lg text-gray-400">{t.studio.desc}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.studio.services.map((s, i) => {
            const Icon = icons[i] ?? Bot;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="luxe-card p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Start-here banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-6 rounded-2xl p-8 md:p-10 bg-gradient-to-r from-amber-400/[0.08] via-amber-400/[0.03] to-transparent border border-amber-400/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="max-w-xl">
            <h3 className="text-2xl font-semibold mb-2">{t.studio.startTitle}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{t.studio.startDesc}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
              <Button className="premium-button h-11 px-6 w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                {t.cta.bookCall}
              </Button>
            </a>
            <RequestDialog
              intent="system_audit_request"
              title={t.studio.auditTitle}
              description={t.studio.auditDesc}
              submitLabel={t.studio.auditSubmit}
              buttonLabel="Studio — System audit"
              presetBuildIndex={0}
              successTitle={t.studio.auditSuccessT}
              successMessage={t.studio.auditSuccessM}
            >
              <Button variant="outline" className="h-11 px-6 border-amber-400/40 text-amber-100 hover:bg-amber-400/10 w-full sm:w-auto">
                {t.studio.systemAudit}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RequestDialog>
          </div>
        </motion.div>

        <p className="text-center text-sm text-gray-500 mt-10 max-w-2xl mx-auto">
          {t.studio.footnote}
        </p>
        <div className="text-center mt-6">
          <a
            href="#selected-work"
            className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 text-sm font-medium"
          >
            {t.studio.seeWork}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
