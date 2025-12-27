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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/warriors-yacht-meeting.jpg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[40%] h-[40%] bg-gradient-radial from-amber-600/10 via-orange-600/5 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40%] h-[40%] bg-gradient-radial from-yellow-600/10 via-amber-600/5 to-transparent blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center pt-28 sm:pt-32 md:pt-36 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8 w-full"
        >
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-200 px-4 py-2 rounded-full backdrop-blur-sm border border-amber-400/15"
          >
            <span className="animate-pulse w-2 h-2 bg-amber-300 rounded-full" />
            <span className="text-sm font-medium">
              Business • AI Systems • Network
            </span>
          </motion.div>

          {/* Name + main message */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative"
          >
            <div className="relative inline-block">
              {/* Outline title behind */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-black tracking-[0.12em] hero-outline text-transparent opacity-40 select-none"
                style={{
                  fontSize: 'clamp(64px, 10vw, 180px)',
                }}
              >
                VLAD KUZMENKO
              </div>

              <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent animate-gradient-gold">
                  VLAD KUZMENKO
                </span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Education, systems, and a global network — built into one ecosystem.
            </p>
          </motion.div>

          {/* Two main paths */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-300 to-yellow-300 text-black font-semibold hover:scale-105 transition-transform min-w-[220px]"
              onClick={() => handleScroll('education')}
            >
              Start with The University
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-amber-300/40 text-amber-200 hover:bg-amber-400/10 min-w-[220px]"
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-gray-400 max-w-3xl mx-auto"
          >
            <span className="uppercase tracking-[0.16em] text-gray-500 mr-1">
              Inside the ecosystem:
            </span>

            <button
              type="button"
              onClick={() => handleScroll('warriors-team')}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 hover:border-amber-400/60 hover:text-amber-200 transition-colors"
            >
              <span>Warriors Team</span>
              <MoveRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('saas-launch-section')}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 hover:border-amber-400/60 hover:text-amber-200 transition-colors"
            >
              <span>Content Platform</span>
              <MoveRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('merch')}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 hover:border-amber-400/60 hover:text-amber-200 transition-colors"
            >
              <span>Elite Equipment</span>
              <MoveRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="grid grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto pt-10"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300 animate-pulse-gold">
                75+
              </h3>
              <p className="text-gray-400 mt-2">Countries reached</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300 animate-pulse-gold delay-300">
                10,000+
              </h3>
              <p className="text-gray-400 mt-2">People in the ecosystem</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300 animate-pulse-gold delay-500">
                7+
              </h3>
              <p className="text-gray-400 mt-2">Ways to earn</p>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="w-full pt-6"
          >
            <div className="w-6 h-10 border-2 border-amber-300/40 rounded-full flex justify-center mx-auto">
              <button
                type="button"
                aria-label="Scroll down"
                onClick={() => handleScroll('education')}
                className="w-full h-full flex justify-center"
              >
                <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-bounce" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Scroll to see The University and all paths inside the ecosystem
            </p>
          </motion.div>
        </motion.div>

        <style jsx>{`
          .hero-outline {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.22);
            text-shadow: 0 0 40px rgba(255, 255, 255, 0.04);
            filter: blur(0.2px);
          }

          @keyframes gradient-gold {
            0% {
              background-position: 0% 50%;
              filter: brightness(1);
            }
            50% {
              background-position: 100% 50%;
              filter: brightness(1.05);
            }
            100% {
              background-position: 0% 50%;
              filter: brightness(1);
            }
          }

          @keyframes pulse-gold {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.86;
              transform: scale(1.035);
            }
          }

          .animate-gradient-gold {
            background-size: 200% 200%;
            animation: gradient-gold 10s ease-in-out infinite;
          }

          .animate-pulse-gold {
            animation: pulse-gold 2.4s ease-in-out infinite;
          }

          .delay-300 {
            animation-delay: 300ms;
          }

          .delay-500 {
            animation-delay: 500ms;
          }
        `}</style>
      </div>
    </section>
  );
};
