'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export const PersonalBrandHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Explosion Mask */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black">
          <img
            src="/warriors-yacht-meeting.jpg"
            alt="Warriors Yacht Meeting"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Explosion Mask Effect */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
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
              
              {/* Explosion spikes */}
              <g transform="translate(960, 540)">
                {[...Array(12)].map((_, i) => (
                  <path
                    key={i}
                    d={`M 0,0 L ${200 + Math.random() * 100},${-20 + Math.random() * 40} L ${180 + Math.random() * 100},${20 + Math.random() * 40} Z`}
                    fill="white"
                    opacity="0.7"
                    transform={`rotate(${i * 30})`}
                  />
                ))}
              </g>
            </mask>
          </defs>
          
          <rect width="100%" height="100%" fill="black" />
          <rect width="100%" height="100%" fill="url(#bgImage)" mask="url(#explosionMask)" />
        </svg>
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-[40%] h-[40%] bg-gradient-radial from-amber-600/10 via-orange-600/5 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40%] h-[40%] bg-gradient-radial from-yellow-600/10 via-amber-600/5 to-transparent blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span className="animate-pulse w-2 h-2 bg-amber-400 rounded-full"></span>
            <span className="text-sm font-medium">Welcome to the Warriors Movement</span>
          </motion.div>

          {/* Main Title - Smaller with Animation */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="section-title-wrapper" data-title="VLAD KUZMENKO">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight">
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent animate-gradient-x">
                  VLAD KUZMENKO
                </span>
              </h1>
            </div>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
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
          </motion.div>

          {/* Stats - With proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-4xl mx-auto pt-12"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-400 animate-pulse-gold">47+</h3>
              <p className="text-gray-400 mt-2">Countries</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-400 animate-pulse-gold delay-300">10,000+</h3>
              <p className="text-gray-400 mt-2">Warriors</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-400 animate-pulse-gold delay-500">24/7</h3>
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
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes gradient-gold {
          0%, 100% {
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
          0%, 100% {
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
