'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background';

// Именованный экспорт, как в вашем коде
export const PersonalBrandHero = () => {
  return (
    // AuroraBackground обеспечивает плавный фон
    <AuroraBackground>
        <section
            className="relative w-full h-screen flex flex-col items-center justify-center text-white text-center p-4 overflow-hidden"
        >
            {/* Фоновое изображение с эффектами */}
            <div 
                className="absolute inset-0 bg-center bg-cover brightness-50 contrast-125"
                style={{ 
                    backgroundImage: "url('/warriors-bg.jpg')", // УКАЖИТЕ ПРАВИЛЬНЫЙ ПУТЬ К ВАШЕМУ ФОНУ
                    transform: 'scale(1.1)', // Небольшое увеличение для эффекта
                }}
            />
            {/* Градиентный оверлей для плавного затемнения краев */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.h1 
                    className="text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg"
                    style={{textShadow: '0px 4px 15px rgba(0,0,0,0.5)'}}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    VLAD KUZMENKO
                </motion.h1>
                <motion.p 
                    className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl text-shadow"
                     style={{textShadow: '0px 2px 10px rgba(0,0,0,0.7)'}}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    I build systems that generate money and freedom. This is where you learn to do the same.
                </motion.p>
                <motion.div 
                    className="mt-8 flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <button className="px-8 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-all transform hover:scale-105">Start Learning</button>
                    <button className="px-8 py-3 rounded-md border border-white/50 text-white font-semibold hover:bg-white/10 transition-all transform hover:scale-105">Join The Warriors Team</button>
                </motion.div>
            </div>
        </section>
    </AuroraBackground>
  );
};
