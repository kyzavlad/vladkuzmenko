'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export const PersonalBrandHero = () => {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/warriors-yacht-meeting.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6">
          VLAD KUZMENKO
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mb-8 text-gray-300">
          I build systems that generate money and freedom.
          <br />
          This is where you learn to do the same.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="#education">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Start Learning
            </Button>
          </Link>
          <Link href="/warriors-team">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Join The Warriors Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
