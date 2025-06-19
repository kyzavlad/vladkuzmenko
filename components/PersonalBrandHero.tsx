import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export const PersonalBrandHero = () => {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-2.png" // Используй свое лучшее фото здесь
          alt="Vlad Kuzmenko"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider">
          VLAD KUZMENKO
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-muted-foreground max-w-3xl">
          I build systems that generate money and freedom.
          <br />
          This is where you learn to do the same.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="#education" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              Start Learning
            </Button>
          </Link>
          <Link href="/warriors-team" passHref target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Join The Warriors Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
