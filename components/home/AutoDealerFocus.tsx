"use client";

import { motion } from "framer-motion";
import { Car, Zap, PhoneCall, CalendarCheck, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { langHref } from "@/lib/i18n";

const icons = [Zap, PhoneCall, CalendarCheck, Target];

export function AutoDealerFocus() {
  const { t, lang } = useI18n();
  const base = langHref(lang);
  const dealersHref = base === "/" ? "/auto-dealers" : `${base}/auto-dealers`;
  return (
    <section id="focus" className="relative py-24 md:py-32 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold uppercase tracking-[0.16em]">
              <Car className="h-4 w-4" /> {t.autodealer.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              {t.autodealer.titleA}
              <span className="gradient-gold-text">{t.autodealer.titleB}</span>
            </h2>
            <p className="text-lg text-gray-400 mb-4">{t.autodealer.desc}</p>
            <p className="text-sm text-gray-500 mb-8">{t.autodealer.note}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={dealersHref}>
                <Button className="premium-button h-11 px-6">
                  {t.autodealer.seeSystem}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <RequestDialog
                intent="system_audit_request"
                title={t.autodealer.auditTitle}
                description={t.autodealer.auditDesc}
                submitLabel={t.autodealer.auditSubmit}
                buttonLabel="Auto-dealer — System audit"
                presetBuildIndex={0}
                successTitle={t.autodealer.auditSuccessT}
                successMessage={t.autodealer.auditSuccessM}
              >
                <Button
                  variant="outline"
                  className="h-11 px-6 border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
                >
                  {t.autodealer.requestAudit}
                </Button>
              </RequestDialog>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {t.autodealer.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={p.title}
                  className="luxe-card p-6"
                >
                  <Icon className="h-7 w-7 text-amber-400 mb-4" />
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
