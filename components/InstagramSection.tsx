'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { Button } from './ui/button';

const instagramPosts = [
  { id: 1, image: '/warriors-yacht-meeting.jpg', caption: 'Strategy on the high seas ⛵' },
  { id: 2, image: '/warriors-group-photo.jpg', caption: 'Warriors unite for success 🏆' },
  { id: 3, image: '/warriors-leaders.jpg', caption: 'Leadership summit 2024 💪' },
  { id: 4, image: '/warriors-location-5.jpg', caption: 'Global expansion continues 🌍' },
  { id: 5, image: '/warriors-location-6.jpg', caption: 'Elite training session 🎯' },
  { id: 6, image: '/warriors-members-lounge.jpg', caption: 'Exclusive members lounge 🏛️' },
  { id: 7, image: '/warriors-location-7.jpg', caption: 'Innovation meets execution 🚀' },
  { id: 8, image: '/warriors-location-8.jpg', caption: 'Building tomorrow today 🔮' },
];

export const InstagramSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * 320; // card width + gap
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, instagramPosts.length - 4); // Show 4 items at a time
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <section className="py-24 md:py-32 bg-black overflow-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full mb-6">
            <Instagram className="w-4 h-4" />
            <span className="text-sm font-medium">Follow The Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Behind The <span className="gradient-gold-text">Success</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get exclusive insights into the Warriors lifestyle and community
          </p>
        </motion.div>

        {/* Carousel Container - Full Width */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 backdrop-blur-sm border border-amber-400/30 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 backdrop-blur-sm border border-amber-400/30 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= instagramPosts.length - 4}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-hidden scroll-smooth px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-[300px] group cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Caption */}
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

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(instagramPosts.length / 4) }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i * 4)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 4) === i 
                    ? 'w-8 bg-amber-400' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
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
            <a href="https://instagram.com/vladkuzmenko" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 mr-2" />
              Follow @vladkuzmenko
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
