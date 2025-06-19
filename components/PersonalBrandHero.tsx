'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background'; // Импортируем фон

export default function PersonalBrandHero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const position = useTransform(scrollYProgress, (pos) => (pos >= 1 ? 'relative' : 'fixed'));

  return (
    <AuroraBackground>
        <motion.section
        ref={targetRef}
        className="relative w-full h-screen flex flex-col items-center justify-center text-white text-center p-4"
        >
        {/* Фоновое изображение с оверлеем */}
        <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/path-to-your-background.jpg')", zIndex: 0 }} // <-- УКАЖИТЕ ПУТЬ К ВАШЕМУ ФОНУ
        >
          <div className="absolute inset-0 bg-black/60"></div> {/* Полупрозрачный оверлей */}
        </div>

        <motion.div style={{ scale, opacity }} className="relative z-10 flex flex-col items-center">
            <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                VLAD KUZMENKO
            </motion.h1>
            <motion.p 
                className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                I build systems that generate money and freedom. This is where you learn to do the same.
            </motion.p>
            <motion.div 
                className="mt-8 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <button className="px-6 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-colors">Start Learning</button>
                <button className="px-6 py-2 rounded-md border border-white/50 text-white font-semibold hover:bg-white/10 transition-colors">Join The Warriors Team</button>
            </motion.div>
        </motion.div>
        </motion.section>
    </AuroraBackground>
  );
}
