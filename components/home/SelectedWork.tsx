"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import type { Dict } from "@/lib/i18n";

type FeaturedKey = keyof Dict["selected"]["featured"];
type CompactKey = keyof Dict["selected"]["compact"];

const featuredConfig: { key: FeaturedKey; name: string; buildIndex: number; images: string[] }[] = [
  {
    key: "tutorivo",
    name: "Tutorivo",
    buildIndex: 1,
    images: [
      "/case-studies/tutorivo/home.webp",
      "/case-studies/tutorivo/catalog.webp",
      "/case-studies/tutorivo/become-tutor.webp",
      "/case-studies/tutorivo/admin.webp",
    ],
  },
  {
    key: "statusauto",
    name: "Status Auto",
    buildIndex: 0,
    images: [
      "/case-studies/status-auto/home.webp",
      "/case-studies/status-auto/catalog.webp",
      "/case-studies/status-auto/form.webp",
    ],
  },
  {
    key: "turbotaai",
    name: "TurbotaAI",
    buildIndex: 2,
    images: [
      "/case-studies/turbotaai/home.webp",
      "/case-studies/turbotaai/video.webp",
      "/case-studies/turbotaai/pricing.webp",
    ],
  },
];

const compactConfig: { key: CompactKey; name: string; buildIndex: number; audio?: string }[] = [
  { key: "ikorka", name: "Ikorka AI Voice Assistant", buildIndex: 2, audio: "/voice_assistant.MP3" },
  { key: "datingcrm", name: "Dating CRM", buildIndex: 0 },
  { key: "leather", name: "Leather Clinic", buildIndex: 1 },
];

function RequestSimilar({
  project,
  buildIndex,
  variant = "outline",
}: {
  project: string;
  buildIndex: number;
  variant?: "premium" | "outline";
}) {
  const { t } = useI18n();
  const s = t.selected;
  return (
    <RequestDialog
      intent="case_study_request"
      title={`${s.requestLikePrefix} ${project}`}
      description={s.dialogDescPrefix}
      submitLabel={s.requestSimilar}
      successTitle={s.dialogSuccessT}
      successMessage={s.dialogSuccessM}
      buttonLabel={`Request similar system — ${project}`}
      presetBuildIndex={buildIndex}
      helpLabel={s.helpLabel}
      helpPlaceholder={s.helpPh}
      context={{ project }}
    >
      <Button
        className={
          variant === "premium"
            ? "premium-button w-full"
            : "w-full border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
        }
        variant={variant === "outline" ? "outline" : "default"}
      >
        {s.requestSimilar}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </RequestDialog>
  );
}

function FeaturedCard({ cfg, i }: { cfg: (typeof featuredConfig)[number]; i: number }) {
  const { t } = useI18n();
  const s = t.selected;
  const cap = s.featured[cfg.key];
  const [active, setActive] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="luxe-card overflow-hidden grid lg:grid-cols-2"
    >
      {/* Gallery */}
      <div className="p-4 sm:p-6 flex flex-col gap-3 bg-gradient-to-br from-zinc-950 to-black">
        <div className="relative rounded-xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cfg.images[active]}
            alt={`${cfg.name} — ${cap.labels[active]}`}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
          <span className="absolute top-3 right-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/70 border border-amber-400/30 text-amber-200">
            {cap.status}
          </span>
        </div>

        <div className="flex gap-2">
          {cfg.images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={cap.labels[idx]}
              className={`flex-1 relative rounded-md overflow-hidden border aspect-video transition-colors ${
                active === idx ? "border-amber-400" : "border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={cap.labels[idx]} loading="lazy" className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">{cap.labels[active]}</p>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col">
        <h3 className="text-2xl font-bold">{cfg.name}</h3>
        <p className="text-xs uppercase tracking-wide text-amber-300/80 mb-5">{cap.tag}</p>

        <dl className="space-y-4 text-sm flex-1">
          <div>
            <dt className="eyebrow mb-1">{s.problem}</dt>
            <dd className="text-gray-300 leading-relaxed">{cap.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">{s.built}</dt>
            <dd className="text-gray-300 leading-relaxed">{cap.built}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">{s.why}</dt>
            <dd className="text-gray-300 leading-relaxed">{cap.why}</dd>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div>
              <dt className="eyebrow mb-1">{s.status}</dt>
              <dd className="text-gray-400">{cap.status}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">{s.tech}</dt>
              <dd className="text-gray-400">{cap.tech}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-6 sm:max-w-xs">
          <RequestSimilar project={cfg.name} buildIndex={cfg.buildIndex} variant="premium" />
        </div>
      </div>
    </motion.div>
  );
}

function CompactCard({ cfg, i }: { cfg: (typeof compactConfig)[number]; i: number }) {
  const { t } = useI18n();
  const cap = t.selected.compact[cfg.key];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="luxe-card p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{cfg.name}</h3>
        {cfg.audio && <Mic className="h-5 w-5 text-amber-400/80" />}
      </div>
      <p className="text-xs uppercase tracking-wide text-amber-300/80 mb-3">{cap.tag}</p>
      <p className="text-sm text-gray-400 leading-relaxed flex-1">{cap.blurb}</p>

      {cfg.audio && (
        <div className="mt-4">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls preload="none" src={cfg.audio} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="mt-5">
        <RequestSimilar project={cfg.name} buildIndex={cfg.buildIndex} />
      </div>
    </motion.div>
  );
}

export function SelectedWork() {
  const { t } = useI18n();
  return (
    <section
      id="selected-work"
      className="section-accent relative py-24 md:py-32 bg-black border-t border-zinc-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow">{t.selected.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tight">
            {t.selected.titleA}
            <span className="gradient-gold-text">{t.selected.titleB}</span>
          </h2>
          <p className="text-lg text-gray-400">{t.selected.desc}</p>
        </motion.div>

        <div className="space-y-6 max-w-6xl mx-auto">
          {featuredConfig.map((cfg, i) => (
            <FeaturedCard key={cfg.key} cfg={cfg} i={i} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {compactConfig.map((cfg, i) => (
            <CompactCard key={cfg.key} cfg={cfg} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
