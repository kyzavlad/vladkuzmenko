'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { SuccessPathVisualizer } from './SuccessPathVisualizer';

export const PersonalBrandHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPathVisualizer, setShowPathVisualizer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden bg-black">
      {/* Neural Network Background */}
      <div className="neural-network">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="neural-node"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/warriors-yacht-meeting.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          {/* Premium Name with Gold Gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6">
            <span className="gold-gradient">VLAD KUZMENKO</span>
          </h1>

          <p className="text-xl md:text-2xl text-center max-w-3xl mb-8 text-gray-300">
            I build systems that generate money and freedom.
            <br />
            This is where you learn to do the same.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="#education">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FFD700] to-[#FFC107] hover:from-[#FFC107] to-[#FFD700] text-black font-bold glow-effect"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/warriors-team">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#FFD700] text-white hover:bg-[#FFD700]/10 hover:border-[#FFC107]"
              >
                Join The Warriors Team
              </Button>
            </Link>
          </div>

          {/* Interactive Success Path Button */}
          <Button
            variant="ghost"
            onClick={() => setShowPathVisualizer(true)}
            className="text-[#FFD700] hover:text-[#FFC107] underline-offset-4 hover:underline"
          >
            Visualize Your Success Path →
          </Button>
        </motion.div>
      </div>

      {/* Success Path Visualizer Modal */}
      {showPathVisualizer && (
        <SuccessPathVisualizer onClose={() => setShowPathVisualizer(false)} />
      )}
    </section>
  );
};
