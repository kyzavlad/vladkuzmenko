'use client';

import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const instagramPosts = [
  { id: 1, image: '/warriors-yacht-meeting.jpg', caption: 'Strategy on the high seas ⛵' },
  { id: 2, image: '/warriors-group-photo.jpg', caption: 'Warriors unite for success 🏆' },
  { id: 3, image: '/warriors-leaders.jpg', caption: 'Leadership summit 2024 💪' },
  { id: 4, image: '/warriors-members-lounge.jpg', caption: 'Exclusive members lounge 🏛️' },
  { id: 5, image: '/warriors-video-preview.jpg', caption: 'Behind the scenes 🎬' },
  { id: 6, image: '/warriors-discussion.jpg', caption: 'Mastermind sessions 🧠' },
  { id: 7, image: '/warriors-location-7.jpg', caption: 'Innovation meets execution 🚀' },
  { id: 8, image: '/warriors-location-8.jpg', caption: 'Building tomorrow today 🔮' },
  { id: 9, image: '/team-meeting-1.webp', caption: 'Success mindset workshop 📚' },
  { id: 10, image: '/team-success-1.webp', caption: 'Case study presentation 📊' },
];

export const InstagramSection = () => {
  // Состояние для авто-паузы при наведении
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // --- НОВАЯ ЛОГИКА ДЛЯ РУЧНОЙ ПРОКРУТКИ ---
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // ------------------------------------------

  // Дублируем посты для бесконечной прокрутки
  const allPosts = [...instagramPosts, ...instagramPosts];

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const slider = carouselRef.current;
    if (!slider) return;
    setIsDragging(true);
    slider.style.cursor = 'grabbing';
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    const slider = carouselRef.current;
    if (!slider) return;
    setIsDragging(false);
    slider.style.cursor = 'grab';
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const slider = carouselRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Увеличиваем скорость
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* ИЗМЕНЕНО: Плашка теперь НАД заголовком */}
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full mb-6">
            <Instagram className="w-4 h-4" />
            <span className="text-sm font-medium">Follow The Journey</span>
          </div>
          
          <div className="section-title-wrapper" data-title="Behind The Success">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Behind The <span className="gradient-gold-text">Success</span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get exclusive insights into the Warriors lifestyle and community
          </p>
        </motion.div>
      </div>

      {/* Бесконечная карусель с ручной прокруткой */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="w-full flex flex-nowrap overflow-x-auto cursor-grab"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
            .scrolling-wrapper {
                animation: scroll 60s linear infinite;
                animation-play-state: ${isHovering || isDragging ? 'paused' : 'running'};
            }
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .scrolling-wrapper > * {
                flex-shrink: 0;
            }
            div::-webkit-scrollbar {
              display: none;
            }
        `}</style>
        <div className="flex scrolling-wrapper">
          {allPosts.map((post, index) => (
            <motion.div
              key={`${post.id}-${index}`}
              className="flex-none w-[300px] group mx-4" // Добавлен mx-4 для отступов
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium mb-2">{post.caption}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {Math.floor(Math.random() * 900 + 100)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {Math.floor(Math.random() * 50 + 10)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
        >
          <a href="https://instagram.com/vladkuzmenkosxy" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 mr-2" />
            Follow @vladkuzmenkosxy
          </a>
        </Button>
      </motion.div>
    </section>
  );
};
