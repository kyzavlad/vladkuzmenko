"use client";

import { Button } from "@/components/ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const animatedWords = useMemo(() => [
    "automated",
    "simplified",
    "optimized",
    "revolutionized",
    "transformed",
    "enhanced"
  ], []);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 3000);
    
    return () => clearInterval(wordInterval);
  }, [animatedWords]);

  return (
    <div id="hero-section" className="w-full mt-[64px] md:mt-[72px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-8 md:gap-16">
          {/* Left content */}
          <div className="flex flex-col items-start text-left w-full md:w-1/2 pr-0 md:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-brand">AI automation</span>
              <span className="block relative h-[1.2em] overflow-hidden">
                {animatedWords.map((word, index) => (
                  <motion.span 
                    key={word} 
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      currentWordIndex === index
                        ? { y: 0, opacity: 1 }
                        : { y: currentWordIndex > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-foreground mt-6 mb-2">
              Automate routine business tasks with AI
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Transform your business with AI-powered solutions that help you engage customers, 
              streamline operations, and drive growth without the complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="https://cal.com/vladkuzmenko.com/call" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Schedule a free consultation
                </Button>
              </a>

              <ContactDialog triggerText="Get started now">
                <Button size="lg" className="flex items-center gap-2">
                  Get started now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </ContactDialog>
            </div>
          </div>

          {/* Right content - АЛЬТЕРНАТИВА РОБОТУ */}
          <div className="w-full md:w-1/2 h-[500px] md:h-[600px]">
            <div className="w-full h-full rounded-3xl relative overflow-hidden bg-gradient-to-br from-brand/20 via-black to-brand/10 backdrop-blur">
              {/* Анимированный фон вместо робота */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-transparent animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-8"
                    >
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-brand/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </motion.div>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-2xl font-bold text-white mb-4"
                    >
                      300+ Businesses Automated
                    </motion.h3>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="space-y-2 text-gray-400"
                    >
                      <p>✓ 120+ hours saved monthly</p>
                      <p>✓ 315% average ROI</p>
                      <p>✓ 7-day implementation</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
ЕСЛИ ХОТИТЕ ВЕРНУТЬ SPLINE:
1. Создайте НОВЫЙ проект в Spline
2. Нажмите Export → Web → Public URL
3. Включите "Public" toggle
4. Вставьте код:
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"></script>
<spline-viewer url="ВАШ_URL"></spline-viewer>
*/
