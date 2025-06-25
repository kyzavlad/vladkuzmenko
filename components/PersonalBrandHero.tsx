'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const PersonalBrandHero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/warriors-yacht-meeting.jpg"
          alt="Warriors Team on a Yacht"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full mb-6 border border-amber-400/20">
            <span className="text-sm font-medium">AI Entrepreneurship & Personal Growth</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Build Your Empire. <br />
            <span className="gradient-gold-text">Master Your Reality.</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
            Join a global movement of Warriors leveraging AI and automation to build profitable businesses and design lives of absolute freedom.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="btn-premium w-full sm:w-auto">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-gray-600 hover:bg-gray-800 hover:text-white">
              Explore Platforms
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
