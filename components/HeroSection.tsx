"use client";

import { Button } from "@/components/ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";

export function HeroSection() {
  
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  
  const animatedWords = useMemo(() => [
    "automated",
    "simplified",
    "optimized",
    "revolutionized",
    "transformed",
    "enhanced"
  ], []);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const serviceDescriptions = [
    "Automate routine business tasks with AI",
    "Personalized email marketing that converts",
    "Smart content creation that saves time",
    "Data-driven insights that drive growth",
    "Seamless workflow automation that scales",
    "Conversational AI that understands context"
  ];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 3000);
    
    return () => clearInterval(wordInterval);
  }, [animatedWords]);
  
  useEffect(() => {
    const descriptionInterval = setInterval(() => {
      setCurrentDescriptionIndex((prevIndex) => (prevIndex + 1) % serviceDescriptions.length);
    }, 4000);
    
    return () => clearInterval(descriptionInterval);
  }, [serviceDescriptions]);

  return (
    <div id="hero-section" className="w-full mt-[64px] md:mt-[72px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-8 md:gap-16">
          {/* Left content */}
          <div className="flex flex-col items-start text-left w-full md:w-1/2 pr-0 md:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight min-w-[110%]">
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
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: currentWordIndex > index ? -150 : 150,
                            opacity: 0,
                          }
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
              Transform your business with AI-powered solutions that help you engage customers, streamline operations, and drive growth without the complexity.
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

          {/* Right content - 3D Model FIXED */}
          <div className="w-full md:w-1/2 h-[500px] md:h-[600px]">
            <div className="w-full h-full rounded-3xl relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
              {/* Fallback background while loading */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-600">Loading 3D Model...</div>
              </div>
              
              {/* Spline iframe - проверьте что URL правильный! */}
              <iframe
                src="https://prod.spline.design/tJ4jUZRp1dWv5A8l/scene.splinecode"
                frameBorder="0"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                loading="eager"
                title="3D Robot Animation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
ПРОВЕРКА SPLINE:
1. Зайдите в ваш Spline аккаунт: https://spline.design
2. Найдите вашу модель робота
3. Нажмите Share → Public URL
4. Скопируйте правильный URL и вставьте в src="" выше
5. Убедитесь что модель опубликована (Published)
*/
