"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "./ui/button";

export const PersonalBrandHero = () => {
  const handleScroll = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
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
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Subtle orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[40%] h-[40%] bg-gradient-radial from-amber-600/10 via-orange-600/5 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40%] h-[40%] bg-gradient-radial from-yellow-600/10 via-amber-600/5 to-transparent blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 w-full"
        >
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-300 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-amber-400 rounded-full opacity-90" />
            <span className="text-sm font-medium">
              Business • AI Systems • Network
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="hero-title-wrap">
              {/* outline behind */}
              <div className="hero-outline" aria-hidden="true">
                VLAD KUZMENKO
              </div>

              {/* main */}
              <h1 className="hero-main">
                <span className="gold-text">VLAD KUZMENKO</span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              A complete ecosystem of education, AI automation, community and
              elite products for people who refuse an average life.
            </p>
          </motion.div>

          {/* Main CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-semibold hover:scale-105 transition-transform min-w-[220px]"
              onClick={() => handleScroll("education")}
            >
              Start with The University
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 min-w-[220px]"
              onClick={() => handleScroll("automation-teaser")}
            >
              See automation & systems
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-4xl mx-auto pt-10"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300">
                75+
              </h3>
              <p className="text-gray-400 mt-2">Countries reached</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300">
                10,000+
              </h3>
              <p className="text-gray-400 mt-2">People in the ecosystem</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300">
                7+
              </h3>
              <p className="text-gray-400 mt-2">Income paths</p>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="w-full pb-6 pt-2"
          >
            <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center mx-auto">
              <button
                type="button"
                aria-label="Scroll down"
                onClick={() => handleScroll("education")}
                className="w-full h-full flex justify-center"
              >
                <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Scroll to see The University and all paths inside the ecosystem
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero-title-wrap {
          position: relative;
          display: inline-block;
          max-width: 100%;
        }

        .hero-outline {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -58%);
          font-weight: 900;
          letter-spacing: -0.02em;
          white-space: nowrap;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.16);
          opacity: 0.55;
          pointer-events: none;
          user-select: none;

          font-size: clamp(3.2rem, 7.2vw, 7.4rem);
          line-height: 1;
        }

        .hero-main {
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: clamp(3rem, 6.8vw, 7rem);
          line-height: 1;
          margin: 0;
        }

        .gold-text {
          background: linear-gradient(
            90deg,
            rgba(252, 211, 77, 0.95),
            rgba(251, 191, 36, 0.98),
            rgba(245, 158, 11, 0.9)
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: goldShift 5.5s ease-in-out infinite;
          filter: drop-shadow(0 10px 26px rgba(0, 0, 0, 0.35));
        }

        @keyframes goldShift {
          0% {
            background-position: 0% 50%;
            filter: brightness(1);
          }
          50% {
            background-position: 100% 50%;
            filter: brightness(1.08);
          }
          100% {
            background-position: 0% 50%;
            filter: brightness(1);
          }
        }

        @media (max-width: 420px) {
          .hero-outline {
            -webkit-text-stroke: 1.6px rgba(255, 255, 255, 0.16);
            transform: translate(-50%, -60%);
          }
        }
      `}</style>
    </section>
  );
};
