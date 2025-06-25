'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// --- РЕШЕНИЕ ПРОБЛЕМЫ АНИМАЦИЙ ---
// Варианты для оркестрации анимации без конфликтов
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- РЕШЕНИЕ ПРОБЛЕМЫ "client-side exception" ---
// Компонент для частиц, который рендерится только на клиенте
const ClientOnlyParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          }}
          animate={{
            y: -100,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export function PersonalBrandHero() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Background - без изменений */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/warriors-team-yacht.webp")',
            filter: 'brightness(0.4) contrast(1.2)'
          }}
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, transparent 20%, black 80%),
                radial-gradient(circle at 80% 20%, transparent 20%, black 80%),
                radial-gradient(circle at 40% 40%, black 20%, transparent 80%)
              `,
              mixBlendMode: 'multiply'
            }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")',
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Content - с исправленной анимацией */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="gold-gradient">VLAD KUZMENKO</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Building tomorrow's business empires with AI and automation.
            <br />Join the revolution.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="default"
              className="premium-button text-base px-6 py-2"
              onClick={() => window.open('https://cal.com/vladkuzmenko.com/call', '_blank')}
            >
              Book a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Link href="/warriors-team">
              <Button
                size="default"
                variant="outline"
                className="text-base px-6 py-2 border-gold-dark hover:bg-gold-dark/10"
              >
                Join Elite Community
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              onClick={() => scrollToSection('success-path')} // Убедитесь что у вас есть секция с id="success-path"
              className="text-gold hover:text-gold-light transition-colors flex items-center gap-2 mx-auto group"
            >
              <span className="text-base">Discover Your Success Path</span>
              <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Анимированные частицы - теперь безопасно */}
      <ClientOnlyParticles />
    </section>
  );
}
