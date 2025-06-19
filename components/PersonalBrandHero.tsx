'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SparklesCore } from './ui/sparkles';

export const PersonalBrandHero = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToEducation = () => {
    const educationSection = document.getElementById('education');
    if (educationSection) {
      educationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      style={{ opacity }}
      ref={targetRef}
      className="relative w-full h-screen text-white overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/warriors-yacht-meeting.jpg" // Твое фото с командой на яхте
          alt="Warriors Team Meeting"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#FFFFFF"
            />
        </div>
      </div>
      <motion.div 
        style={{ scale }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider">
          VLAD KUZMENKO
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-muted-foreground max-w-3xl">
          I build systems that generate money and freedom.
          <br />
          This is where you learn how to build your own.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="w-full sm:w-auto" onClick={scrollToEducation}>
            Explore The University
          </Button>
          <Link href="/warriors-team" passHref target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Join The Warriors Team
            </Button>
          </Link>
        </div>
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute bottom-10 cursor-pointer"
            onClick={scrollToEducation}
        >
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};
