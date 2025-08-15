"use client";

import { Button } from "@/components/ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

          {/* Right content - РАБОЧИЙ 3D РОБОТ */}
          <div className="w-full md:w-1/2 h-[500px] md:h-[600px]">
            <div className="w-full h-full rounded-3xl relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
              {/* Fallback gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5" />
              
              {/* Spline 3D Model */}
              <script 
                type="module" 
                src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"
                defer
              />
              <spline-viewer 
                url="https://prod.spline.design/tJ4jUZRp1dWv5A8l/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              
              {/* Loading state overlay that disappears when Spline loads */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 animate-pulse pointer-events-none">
                <div className="text-amber-500/50 text-sm">Loading 3D Model...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
