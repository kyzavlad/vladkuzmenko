'use client';

import { Button } from './ui/button';
import { ContactDialog } from './ui/contact-dialog';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function PersonalBrandHero() {
  return (
    <section className="relative min-h-[640px] md:min-h-[80vh] bg-gradient-to-b from-black via-zinc-950 to-black pt-24 md:pt-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[90%] h-[90%] bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.35),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.25),_rgba(0,0,0,0.95))]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] md:text-xs uppercase tracking-[0.25em] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Welcome to the Warriors movement</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
          >
            <span className="gold-gradient">VLAD KUZMENKO</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="max-w-3xl text-base md:text-lg text-muted-foreground mb-8"
          >
            AI automation, content infrastructure and education for people who want leverage instead of
            busywork. One ecosystem: agency, tools and The University.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-3 mb-10"
          >
            <ContactDialog triggerText="Get started">
              <Button className="premium-button px-8 h-11 text-sm md:text-base">
                <ArrowRight className="mr-2 h-4 w-4" />
                Book a strategy call
              </Button>
            </ContactDialog>

            <Button
              variant="outline"
              className="border-zinc-700 bg-black/40 hover:bg-black/70 text-sm md:text-base px-6 h-11"
              asChild
            >
              <a href="#education">
                <Play className="mr-2 h-4 w-4" />
                Explore The University
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="grid grid-cols-3 gap-6 md:gap-10 text-xs md:text-sm text-muted-foreground"
          >
            <div className="text-left sm:text-center">
              <div className="text-xl md:text-2xl font-semibold text-amber-400 mb-1">47+</div>
              <div>countries in the network</div>
            </div>
            <div className="text-left sm:text-center">
              <div className="text-xl md:text-2xl font-semibold text-amber-400 mb-1">10,000+</div>
              <div>people reached across brand & systems</div>
            </div>
            <div className="text-left sm:text-center">
              <div className="text-xl md:text-2xl font-semibold text-amber-400 mb-1">24/7</div>
              <div>focus on builders, not spectators</div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-col items-center gap-2 text-xs text-muted-foreground"
          >
            <div className="h-10 w-6 rounded-full border border-zinc-700 flex items-start justify-center p-1">
              <div className="h-2 w-1 rounded-full bg-amber-400 animate-bounce" />
            </div>
            <span>Discover your path below</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
