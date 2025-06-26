'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export const PersonalBrandHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[60%] h-[60%] bg-gradient-radial from-amber-600/20 via-orange-600/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-gradient-radial from-yellow-600/20 via-amber-600/10 to-transparent blur-3xl animate-pulse delay-1000" />
        
        {/* Cloud/Explosion Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
            <svg viewBox="0 0 1000 1000" className="w-full h-full">
              <defs>
                <radialGradient id="cloudGradient">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="500" cy="500" r="200" fill="url(#cloudGradient)" className="animate-pulse" />
              <circle cx="350" cy="400" r="150" fill="url(#cloudGradient)" className="animate-pulse delay-300" />
              <circle cx="650" cy="450" r="180" fill="url(#cloudGradient)" className="animate-pulse delay-500" />
              <circle cx="400" cy="600" r="160" fill="url(#cloudGradient)" className="animate-pulse delay-700" />
              <circle cx="600" cy="550" r="140" fill="url(#cloudGradient)" className="animate-pulse delay-1000" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full mb-8"
          >
            <span className="animate-pulse w-2 h-2 bg-amber-400 rounded-full"></span>
            <span className="text-sm font-medium">Welcome to the Warriors Movement</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-7xl md:text-9xl font-bold mb-8 relative">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent animate-gradient">
              VLAD KUZMENKO
            </span>
            {/* Glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-30">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                VLAD KUZMENKO
              </span>
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Building tomorrow's business empires with AI and automation. 
            Join the revolution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-semibold hover:scale-105 transition-transform"
            >
              Join Elite Community
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-amber-400">47+</h3>
              <p className="text-gray-400 mt-2">Countries</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-amber-400">10,000+</h3>
              <p className="text-gray-400 mt-2">Warriors</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-amber-400">24/7</h3>
              <p className="text-gray-400 mt-2">Community</p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Discover Your Success Path</p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};
