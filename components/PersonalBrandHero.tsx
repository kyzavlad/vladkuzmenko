"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "./ui/button";

export const PersonalBrandHero = () => {
  const handleScroll = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black">
          <Image
            src="/warriors-yacht-meeting.jpg"
            alt="Background"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Soft gradient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[40%] h-[40%] bg-gradient-radial from-amber-500/10 via-orange-500/5 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40%] h-[40%] bg-gradient-radial from-yellow-500/10 via-amber-500/5 to-transparent blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 container mx-auto px-6 flex flex-col justify-center items-center text-center"
        style={{
          paddingTop: "calc(var(--header-height, 72px) + 28px)",
          paddingBottom: "24px",
          minHeight: "100vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8 w-full max-w-5xl"
        >
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-200 px-4 py-2 rounded-full backdrop-blur-sm border border-amber-300/15"
          >
            <span className="w-2 h-2 bg-amber-300 rounded-full" />
            <span className="text-sm font-medium tracking-wide">
              Business • AI Systems • Network
            </span>
          </motion.div>

          {/* Name + main message */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="relative"
          >
            <div className="section-title-wrapper" data-title="VLAD KUZMENKO">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight relative">
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent animate-gradient-gold">
                  VLAD KUZMENKO
                </span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Education, AI systems, and a global network — built for people who
              want real leverage, not noise.
            </p>
          </motion.div>

          {/* Two main paths */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-semibold hover:scale-[1.03] transition-transform min-w-[220px]"
              onClick={() => handleScroll("education")}
            >
              Start with The University
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10 min-w-[220px]"
              onClick={() => handleScroll("automation-teaser")}
            >
              See automation & systems
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Ecosystem chips */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-gray-400 max-w-3xl mx-auto"
          >
            <span className="uppercase tracking-[0.16em] text-gray-500 mr-1">
              Inside the ecosystem:
            </span>

            <button
              type="button"
              onClick={() => handleScroll("warriors-team")}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 hover:border-amber-400/60 hover:text-amber-200 transition-colors"
            >
              <span>Warriors Team</span>
              <MoveRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll("saas-launch-section")}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 hover:border-amber-400/60 hover:text-amber-200 transition-colors"
            >
              <span>Content Platform</span>
              <MoveRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll("merch")}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 hover:border-amber-400/60 hover:text-amber-200 transition-colors"
            >
              <span>Elite Equipment</span>
              <MoveRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="grid grid-cols-3 gap-6 sm:gap-10 max-w-4xl mx-auto pt-8"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300 tabular-nums">
                75+
              </h3>
              <p className="text-gray-400 mt-2">Countries reached</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300 tabular-nums">
                10,000+
              </h3>
              <p className="text-gray-400 mt-2">Builders in the ecosystem</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300 tabular-nums">
                7+
              </h3>
              <p className="text-gray-400 mt-2">Income streams</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full pt-8"
        >
          <div className="w-6 h-10 border-2 border-amber-400/40 rounded-full flex justify-center mx-auto">
            <button
              type="button"
              aria-label="Scroll down"
              onClick={() => handleScroll("education")}
              className="w-full h-full flex justify-center"
            >
              <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-bounce" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Scroll to see The University and all paths inside the ecosystem
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        /* Большой контурный дубль заголовка за основным */
        .section-title-wrapper {
          position: relative;
          display: inline-block;
        }
        .section-title-wrapper::before {
          content: attr(data-title);
          position: absolute;
          left: 50%;
          top: 52%;
          transform: translate(-50%, -50%);
          font-weight: 900;
          letter-spacing: 0.22em;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          opacity: 0.28;

          /* размер адаптивно (очень большой, как ты хотел) */
          font-size: clamp(56px, 9vw, 220px);

          color: transparent;
          -webkit-text-stroke: 1px rgba(251, 191, 36, 0.38);
          text-shadow: 0 0 40px rgba(251, 191, 36, 0.08);
        }

        /* Премиум-градиент: медленнее и без “едкого” перелива */
        @keyframes gradient-gold {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-gold {
          background-size: 220% 220%;
          animation: gradient-gold 9s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
