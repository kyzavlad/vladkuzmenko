'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { SuccessPathVisualizer } from './SuccessPathVisualizer';

export const PersonalBrandHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPathVisualizer, setShowPathVisualizer] = useState(false);
  const [showLogoAnimation, setShowLogoAnimation] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Hide logo animation after 2 seconds
    const timer = setTimeout(() => {
      setShowLogoAnimation(false);
    }, 2000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Logo Animation */}
      <AnimatePresence>
        {showLogoAnimation && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-animation"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="loading-logo"
            >
              <span className="text-5xl font-bold font-serif italic gold-gradient">
                VladKuzmenko
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full min-h-screen text-white overflow-hidden bg-black">
        {/* Neural Network Background */}
        <div className="neural-network">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`node-${i}`}
              className="neural-node"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Background Image with Stylish Cutout */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: `radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 70%)`
            }}
          >
            <Image
              src="/vlad-hero-bg.jpg"
              alt="Background"
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: showLogoAnimation ? 2.2 : 0.2 }}
            className="text-center"
          >
            {/* Premium Name with Elite Gold Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6">
              <span className="gold-gradient">VLAD KUZMENKO</span>
            </h1>

            <p className="text-xl md:text-2xl text-center max-w-3xl mb-8 text-gray-300">
              Building tomorrow's business empires with AI and automation.
              <br />
              Join the revolution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="#education">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black font-bold glow-effect premium-shadow-sm"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/warriors-team">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#D4AF37] text-white hover:bg-[#D4AF37]/10 hover:border-[#F4E4C1]"
                >
                  Join Elite Community
                </Button>
              </Link>
            </div>

            {/* Interactive Success Path Button */}
            <Button
              variant="ghost"
              onClick={() => setShowPathVisualizer(true)}
              className="text-[#D4AF37] hover:text-[#F4E4C1] underline-offset-4 hover:underline"
            >
              Discover Your Success Path →
            </Button>
          </motion.div>
        </div>

        {/* Success Path Visualizer Modal */}
        {showPathVisualizer && (
          <SuccessPathVisualizer onClose={() => setShowPathVisualizer(false)} />
        )}
      </section>
      
      {/* Smooth transition to next section */}
      <div className="section-transition" />
    </>
  );
};
