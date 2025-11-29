'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { ContactDialog } from '@/components/ui/contact-dialog';

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
        <div className="absolute inset-0 bg-black">
          <Image
            src="/warriors-yacht-meeting.jpg"
            alt="Warriors private meeting"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>

        {/* Explosion mask placeholder (kept for future motion / FX if needed) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="explosionMask">
              <rect width="100%" height="100%" fill="white" />
              <radialGradient id="explosion" cx="50%" cy="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="30%" stopColor="white" stopOpacity="0.9" />
                <stop offset="50%" stopColor="white" stopOpacity="0.7" />
                <stop offset="70%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="black" stopOpacity="0" />
              </radialGradient>
              <circle cx="50%" cy="50%" r="60%" fill="url(#explosion)" />

              <g transform="translate(960, 540)">
                {[...Array(12)].map((_, i) => (
                  <path
                    key={i}
                    d={`M 0,0 L ${200 + Math.random() * 100},${
                      -20 + Math.random() * 40
                    } L ${180 + Math.random() * 100},${
                      20 + Math.random() * 40
                    } Z`}
                    fill="white"
                    opacity="0.7"
                    transform={`rotate(${i * 30})`}
                  />
                ))}
              </g>
            </mask>
          </defs>
          {/* Mask usage is currently not applied – background is handled by Image + overlay */}
        </svg>

        {/* Global dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[40%] h-[40%] bg-gradient-radial from-amber-600/10 via-orange-600/5 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40%] h-[40%] bg-gradient-radial from-yellow-600/10 via-amber-600/5 to-transparent blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex flex-col justify-center items-center text-center">
        <div className="flex-grow flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Top pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-300 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <span className="animate-pulse w-2 h-2 bg-amber-400 rounded-full" />
              <span className="text-sm font-medium">
                Personal brand • AI automation • Education
              </span>
            </motion.div>

            {/* Name + subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div
                className="section-title-wrapper"
                data-title="VLAD KUZMENKO"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent animate-gradient-gold">
                    VLAD KUZMENKO
                  </span>
                </h1>
              </div>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                Building a global ecosystem of AI systems, content and education
                for people who refuse an average life.
              </p>
            </motion.div>

            {/* Single main CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactDialog triggerText="">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-semibold hover:scale-105 transition-transform min-w-[220px]"
                >
                  Book a strategy call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </ContactDialog>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-4xl mx-auto pt-12"
            >
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-amber-400 animate-pulse-gold">
                  47+
                </h3>
                <p className="text-gray-400 mt-2">Countries reached</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-amber-400 animate-pulse-gold delay-300">
                  10,000+
                </h3>
                <p className="text-gray-400 mt-2">People in the ecosystem</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-amber-400 animate-pulse-gold delay-500">
                  24/7
                </h3>
                <p className="text-gray-400 mt-2">Content & automation</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-full pb-4"
        >
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center mx-auto">
            <button
              type="button"
              aria-label="Scroll to The University"
              onClick={() => handleScroll('education')}
              className="w-full h-full flex justify-center"
            >
              <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Scroll to see The University and the full ecosystem
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-gold {
          0%,
          100% {
            background-position: 0% 50%;
            filter: brightness(1);
          }
          25% {
            background-position: 50% 50%;
            filter: brightness(1.2);
          }
          50% {
            background-position: 100% 50%;
            filter: brightness(1.1);
          }
          75% {
            background-position: 50% 50%;
            filter: brightness(1.3);
          }
        }

        @keyframes pulse-gold {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-gradient-gold {
          background-size: 200% 200%;
          animation: gradient-gold 3s ease infinite;
        }

        .animate-pulse-gold {
          animation: pulse-gold 2s ease-in-out infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
};
