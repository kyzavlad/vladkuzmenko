'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export const PersonalBrandHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with artistic effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/warriors-yacht-meeting.jpg"
          alt="Warriors Team"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        {/* Artistic texture overlay */}
        <div className="absolute inset-0 mix-blend-overlay opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-transparent to-yellow-600/20" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 text-amber-400 px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Welcome to the Warriors Movement</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block">VLAD KUZMENKO</span>
            <span className="block gradient-gold-text">AI PIONEER</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
          >
            Building tomorrow's business empires with AI and automation.
            Join the revolution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              asChild
              size="lg"
              className="btn-premium text-lg px-8 py-6"
            >
              <a href="https://cal.com/vladkuzmenko.com/call" target="_blank" rel="noopener noreferrer">
                Book a Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 text-lg px-8 py-6"
            >
              <Link href="/warriors-team">
                Join Elite Community
                <Play className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-xl"
          >
            <div>
              <div className="text-3xl font-bold gradient-gold-text">15+</div>
              <div className="text-sm text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-gold-text">250+</div>
              <div className="text-sm text-gray-400">Warriors</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-gold-text">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm">Discover Your Success Path</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-3 bg-amber-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
