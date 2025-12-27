'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MoveRight } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

export const PersonalBrandHero = () => {
  const handleScroll = (id: string) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black pt-24 sm:pt-28 md:pt-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/warriors-yacht-meeting.jpg"
          alt="Private meeting"
          fill
          priority
          className="object-cover opacity-35"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Soft gold haze */}
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full blur-3xl bg-gradient-to-br from-amber-400/10 via-yellow-300/5 to-transparent" />
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl bg-gradient-to-tr from-amber-400/10 via-yellow-300/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="min-h-[calc(100svh-6rem)] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 max-w-5xl"
          >
            {/* Top pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-200 px-4 py-2 rounded-full backdrop-blur-sm border border-amber-400/15"
            >
              <span className="w-2 h-2 bg-amber-300 rounded-full" />
              <span className="text-sm font-medium">
                Business • AI Systems • Network
              </span>
            </motion.div>

            {/* Name + message */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="relative"
            >
              {/* OUTLINE BACK-TITLE (behind the main name) */}
              <div
                aria-hidden
                className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] whitespace-nowrap text-transparent opacity-25"
                style={{
                  WebkitTextStroke: '1px rgba(212,175,55,0.55)',
                }}
              >
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
                  VLAD KUZMENKO
                </div>
              </div>

              <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
                <span className="gold-text animate-gold">
                  VLAD KUZMENKO
                </span>
              </h1>

              <p className="text-base md:text-lg text-zinc-200/90 max-w-2xl mx-auto">
                Education, AI systems and a global network — built to help you
                create leverage, skills and real results.
              </p>
            </motion.div>

            {/* Two main paths */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-300 to-yellow-500 text-black font-semibold hover:scale-[1.03] transition-transform min-w-[240px]"
                onClick={() => handleScroll('education')}
              >
                Start with The University
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-amber-300/35 text-amber-200 hover:bg-amber-300/10 min-w-[240px]"
                onClick={() => handleScroll('automation-teaser')}
              >
                See automation & systems
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Ecosystem chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-zinc-300/70 max-w-3xl mx-auto"
            >
              <span className="uppercase tracking-[0.16em] text-zinc-400/70 mr-1">
                Inside the ecosystem:
              </span>

              <button
                type="button"
                onClick={() => handleScroll('warriors-team')}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-700/70 bg-zinc-900/55 px-3 py-1 hover:border-amber-300/50 hover:text-amber-100 transition-colors"
              >
                <span>Warriors Team</span>
                <MoveRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('saas-launch-section')}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-700/70 bg-zinc-900/55 px-3 py-1 hover:border-amber-300/50 hover:text-amber-100 transition-colors"
              >
                <span>Content Platform</span>
                <MoveRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('merch')}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-700/70 bg-zinc-900/55 px-3 py-1 hover:border-amber-300/50 hover:text-amber-100 transition-colors"
              >
                <span>Elite Equipment</span>
                <MoveRight className="w-3 h-3" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8"
            >
              <div className="text-center rounded-xl border border-white/5 bg-white/0 px-4 py-3">
                <div className="text-3xl md:text-4xl font-bold text-amber-300">
                  75+
                </div>
                <div className="text-zinc-300/70 mt-1 text-sm md:text-base">
                  Countries reached
                </div>
              </div>

              <div className="text-center rounded-xl border border-white/5 bg-white/0 px-4 py-3">
                <div className="text-3xl md:text-4xl font-bold text-amber-300">
                  10,000+
                </div>
                <div className="text-zinc-300/70 mt-1 text-sm md:text-base">
                  Builders in the ecosystem
                </div>
              </div>

              <div className="text-center rounded-xl border border-white/5 bg-white/0 px-4 py-3">
                <div className="text-3xl md:text-4xl font-bold text-amber-300">
                  7+
                </div>
                <div className="text-zinc-300/70 mt-1 text-sm md:text-base">
                  Revenue paths inside
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="w-full pb-6 pt-10"
          >
            <div className="w-6 h-10 border-2 border-amber-300/45 rounded-full flex justify-center mx-auto">
              <button
                type="button"
                aria-label="Scroll down"
                onClick={() => handleScroll('education')}
                className="w-full h-full flex justify-center"
              >
                <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-bounce" />
              </button>
            </div>
            <p className="text-xs text-zinc-400/70 mt-2 text-center">
              Scroll to see The University and all paths inside the ecosystem
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .gold-text {
          background-image: linear-gradient(
            90deg,
            #b8891f,
            #f5e6b3,
            #d4af37,
            #f5e6b3,
            #b8891f
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: saturate(0.95) brightness(1.05);
        }

        @keyframes goldShift {
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

        .animate-gold {
          animation: goldShift 14s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
