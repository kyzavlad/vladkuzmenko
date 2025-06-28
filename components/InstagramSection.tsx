'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, ArrowRight } from 'lucide-react';

const posts = [
  { id: 1, img: '/warriors-location-1.jpg', caption: 'Strategy Session in Dubai' },
  { id: 2, img: '/warriors-location-2.jpg', caption: 'Networking in London' },
  { id: 3, img: '/warriors-location-3.jpg', caption: 'Mastermind in the Alps' },
  { id: 4, img: '/warriors-location-4.jpg', caption: 'Closing Deals in NYC' },
  { id: 5, img: '/warriors-location-5.jpg', caption: 'Building Empires Together' },
  { id: 6, img: '/warriors-location-6.jpg', caption: 'The Warriors Lifestyle' },
  { id: 7, img: '/warriors-location-7.jpg', caption: 'Unbreakable Brotherhood' },
  { id: 8, img: '/warriors-location-8.jpg', caption: 'Vision & Execution' },
];

export const InstagramSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const slider = scrollContainerRef.current;
    if (!slider) return;
    setIsDown(true);
    slider.classList.add('active');
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseLeave = () => {
    const slider = scrollContainerRef.current;
    if (!slider) return;
    setIsDown(false);
    slider.classList.remove('active');
  };

  const handleMouseUp = () => {
    const slider = scrollContainerRef.current;
    if (!slider) return;
    setIsDown(false);
    slider.classList.remove('active');
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = scrollContainerRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Увеличиваем скорость прокрутки
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Эффект маски "взрыва" для плавного перехода */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-black"
        style={{
          maskImage: 'linear-gradient(to top, black 5%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 5%, transparent 100%)',
          zIndex: 10
        }}
      />
      
      <div className="container mx-auto px-4 text-center">
        {/* Плашка "Follow The Journey" перенесена наверх */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
        >
          <Instagram className="h-4 w-4" />
          <span>Follow The Journey</span>
        </motion.div>

        <div className="section-title-wrapper mb-16" data-title="Behind The Success">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Behind The <span className="gradient-gold-text">Success</span>
          </h2>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto">
            Get exclusive insights into the Warriors lifestyle and community.
          </p>
        </div>
      </div>

      {/* Карусель с горизонтальной прокруткой мышью */}
      <div
        ref={scrollContainerRef}
        className="w-full flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing pb-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <style jsx>{`
          .active:cursor-grabbing {
            cursor: grabbing;
          }
          .flex::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Пустое пространство слева для центрирования */}
        <div className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4"></div>

        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="flex-shrink-0 w-[300px] md:w-[350px] group relative rounded-2xl overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={post.img}
              alt={post.caption}
              width={350}
              height={450}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Затемнение для читаемости текста */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-white font-semibold">{post.caption}</p>
            </div>
          </motion.div>
        ))}
        
        {/* Пустое пространство справа */}
        <div className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4"></div>
      </div>

      <div className="text-center mt-12">
        <Link href="https://instagram.com/vladkuzmenkosxy" passHref target="_blank">
          <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10">
            Follow on Instagram
            <ArrowRight className="w-4 h-4 ml-2"/>
          </Button>
        </Link>
      </div>

    </section>
  );
};
