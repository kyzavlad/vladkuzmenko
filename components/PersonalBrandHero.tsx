'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export const PersonalBrandHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Динамический фон с параллаксом */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
        >
          <Image
            src="/vlad-hero-bg.jpg"
            alt="Vlad Kuzmenko"
            fill
            className="object-cover hero-image-mask"
            priority
            quality={100}
          />
        </motion.div>
        
        {/* Градиентные слои для эффекта глубины */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        
        {/* Анимированные частицы */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
              animate={{
                x: [0, Math.random() * 1000 - 500],
                y: [0, Math.random() * 1000 - 500],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Контент */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          {/* Премиальное имя с анимацией */}
          <h1 className="relative mb-8">
            <span className="block text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight">
              <span className="animated-gradient">VLAD</span>
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-light italic mt-2">
              <span className="text-white/90">KUZMENKO</span>
            </span>
            
            {/* Декоративные элементы */}
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-orange-500/30" />
            <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-orange-500/30" />
          </h1>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-12 text-gray-300 font-light leading-relaxed"
          >
            I build <span className="text-orange-500 font-semibold">systems</span> that generate{" "}
            <span className="text-orange-500 font-semibold">money</span> and{" "}
            <span className="text-orange-500 font-semibold">freedom</span>.
            <br />
            This is where you learn to do the same.
          </motion.p>

          {/* CTA кнопки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="#education">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-6 text-lg font-semibold glow-effect"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link href="/warriors-team">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-500/50 text-white hover:bg-orange-500/10 hover:border-orange-500 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                Join Warriors Team
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Индикатор скролла */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
              <motion.div
                className="w-1 h-2 bg-white/50 rounded-full mx-auto"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
