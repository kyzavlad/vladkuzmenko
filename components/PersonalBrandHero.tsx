"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { ContactDialog } from "@/components/ui/contact-dialog";
import Link from "next/link";

export function PersonalBrandHero() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Artistic Effect */}
      <div className="absolute inset-0 z-0">
        {/* Main image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("/images/warriors-team-yacht.webp")',
            filter: 'brightness(0.7) contrast(1.1)'
          }}
        />
        
        {/* Artistic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        
        {/* Pattern overlay for artistic effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, black 100%),
                            radial-gradient(circle at 80% 50%, transparent 0%, black 100%)`,
          }}
        />
        
        {/* Edge fade effect */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-0 left-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          >
            <span className="gold-gradient">VLAD KUZMENKO</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Building tomorrow's business empires with AI and automation.
            <br />Join the revolution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <ContactDialog triggerText="Start Your Journey">
              <Button size="lg" className="premium-button text-lg px-8 py-6 h-auto">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </ContactDialog>
            
            <Link href="/warriors-team">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 h-auto border-gold-dark hover:bg-gold-dark/10"
              >
                Join Elite Community
              </Button>
            </Link>
          </motion.div>

          {/* Success Path Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => scrollToSection('success-path')}
              className="text-gold hover:text-gold-light transition-colors flex items-center gap-2 mx-auto group"
            >
              <span className="text-lg">Discover Your Success Path</span>
              <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated particles effect */}
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
    </section>
  );
}
