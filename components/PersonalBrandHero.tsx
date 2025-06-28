'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image'; // Используем Next.js Image для оптимизации

export const PersonalBrandHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {/* ИСПРАВЛЕНО: Добавлена SVG маска и затемнение */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: 'url(#explosion-mask)',
            WebkitMaskImage: 'url(#explosion-mask)',
          }}
        >
          <Image
            src="/warriors-yacht-meeting.jpg"
            alt="Warriors Yacht Meeting"
            layout="fill"
            objectFit="cover"
            priority
          />
          {/* Легкое затемнение для читаемости */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* SVG Defs for Explosion Mask */}
        <svg width="0" height="0">
          <defs>
            <mask id="explosion-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white"/>
              <circle cx="50%" cy="50%" r="40%" fill="black"/>
                <g transform="translate(50, 50)">
                    <motion.path
                        fill="black"
                        d="M 23.3 -1.8 C 25.3 -6.1 27.2 -10.3 30.2 -12.9 C 33.3 -15.5 37.4 -16.5 41.2 -16.2 C 45 -15.9 48.4 -14.4 51.4 -12.2 C 54.4 -10 56.9 -7.1 58.4 -3.7 C 59.9 -0.3 60.4 3.6 59.9 7.4 C 59.3 11.2 57.7 14.8 55.4 17.8 C 53.1 20.8 50.1 23.1 46.8 24.5 C 43.5 25.9 40 26.3 36.5 26.3 C 33.1 26.3 29.7 25.8 26.6 24.8 C 23.5 23.8 20.8 22.3 18.5 20.2 C 16.2 18.1 14.3 15.5 13.1 12.7 C 11.9 9.8 11.4 6.7 11.8 3.7 C 12.2 0.7 13.5 -2.2 15.2 -4.8 C 16.9 -7.4 19.1 -9.7 21.7 -10.9 C 24.3 -12.1 27.3 -12.2 29.9 -12.4"
                        animate={{
                            d: [
                                "M 23.3 -1.8 C 25.3 -6.1 27.2 -10.3 30.2 -12.9 C 33.3 -15.5 37.4 -16.5 41.2 -16.2 C 45 -15.9 48.4 -14.4 51.4 -12.2 C 54.4 -10 56.9 -7.1 58.4 -3.7 C 59.9 -0.3 60.4 3.6 59.9 7.4 C 59.3 11.2 57.7 14.8 55.4 17.8 C 53.1 20.8 50.1 23.1 46.8 24.5 C 43.5 25.9 40 26.3 36.5 26.3 C 33.1 26.3 29.7 25.8 26.6 24.8 C 23.5 23.8 20.8 22.3 18.5 20.2 C 16.2 18.1 14.3 15.5 13.1 12.7 C 11.9 9.8 11.4 6.7 11.8 3.7 C 12.2 0.7 13.5 -2.2 15.2 -4.8 C 16.9 -7.4 19.1 -9.7 21.7 -10.9 C 24.3 -12.1 27.3 -12.2 29.9 -12.4",
                                "M 26.9 2.1 C 26.6 -5.3 30.5 -10.6 35.3 -14.1 C 40.1 -17.6 45.8 -19.3 51.3 -18.9 C 56.8 -18.5 62 -16 66.2 -12.1 C 70.4 -8.2 73.6 -2.9 74.8 3 C 76 8.9 75.1 15.4 72.4 20.7 C 69.7 26 65.2 30.1 60 32.5 C 54.8 34.9 48.9 35.6 43.3 35.4 C 37.7 35.2 32.4 34.1 27.8 31.5 C 23.2 28.9 19.3 24.8 16.6 20.2 C 13.9 15.6 12.4 10.5 12.5 5.4 C 12.6 0.3 14.2 -4.8 17.2 -8.7 C 20.2 -12.6 24.6 -15.3 29.4 -16.5 C 34.2 -17.7 39.4 -17.3 44.1 -16.6",
                                "M 23.3 -1.8 C 25.3 -6.1 27.2 -10.3 30.2 -12.9 C 33.3 -15.5 37.4 -16.5 41.2 -16.2 C 45 -15.9 48.4 -14.4 51.4 -12.2 C 54.4 -10 56.9 -7.1 58.4 -3.7 C 59.9 -0.3 60.4 3.6 59.9 7.4 C 59.3 11.2 57.7 14.8 55.4 17.8 C 53.1 20.8 50.1 23.1 46.8 24.5 C 43.5 25.9 40 26.3 36.5 26.3 C 33.1 26.3 29.7 25.8 26.6 24.8 C 23.5 23.8 20.8 22.3 18.5 20.2 C 16.2 18.1 14.3 15.5 13.1 12.7 C 11.9 9.8 11.4 6.7 11.8 3.7 C 12.2 0.7 13.5 -2.2 15.2 -4.8 C 16.9 -7.4 19.1 -9.7 21.7 -10.9 C 24.3 -12.1 27.3 -12.2 29.9 -12.4",
                            ],
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                    />
                </g>
            </mask>
          </defs>
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[40%] h-[40%] bg-gradient-radial from-amber-600/10 via-orange-600/5 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40%] h-[40%] bg-gradient-radial from-yellow-600/10 via-amber-600/5 to-transparent blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Контент остается таким же */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex flex-col justify-center items-center text-center">
        <div className="flex-grow flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full backdrop-blur-sm"
              >
                <span className="animate-pulse w-2 h-2 bg-amber-400 rounded-full"></span>
                <span className="text-sm font-medium">Welcome to the Warriors Movement</span>
              </motion.div>

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
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-full pb-4"
        >
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center mx-auto">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Discover Your Success Path</p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-gold { /* ... */ }
        @keyframes pulse-gold { /* ... */ }
        .animate-gradient-gold { /* ... */ }
        .animate-pulse-gold { /* ... */ }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </section>
  );
};
