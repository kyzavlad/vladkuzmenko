'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Award, Target, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { LiveRevenueCounter } from './LiveRevenueCounter';

const instagramPosts = [
  { id: 1, image: '/instagram-1.jpg', likes: '12.4K', caption: 'Building the future' },
  { id: 2, image: '/instagram-2.jpg', likes: '8.7K', caption: 'Team meeting Dubai' },
  { id: 3, image: '/instagram-3.jpg', likes: '15.2K', caption: 'New AI launch' },
  { id: 4, image: '/instagram-4.jpg', likes: '9.8K', caption: 'Training warriors' },
  { id: 5, image: '/instagram-5.jpg', likes: '11.3K', caption: 'Closing millions' },
  { id: 6, image: '/instagram-6.jpg', likes: '13.6K', caption: 'Global expansion' },
];

export const AboutMeSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (currentIndex + 1) % instagramPosts.length;
        setCurrentIndex(nextIndex);
        const scrollAmount = nextIndex * 420;
        carouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      setCurrentIndex(index);
      const scrollAmount = index * 420;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-[#D4AF37] to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#B8860B] to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              THE <span className="gold-gradient">VISIONARY</span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Pioneering the future of business with AI
            </p>
          </div>

          {/* Content Grid */}
          <div className="space-y-24">
            {/* Section 1 - Story */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-lg">
                    <Award className="h-8 w-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">The Vision</h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  I believe in a future where <span className="font-bold text-foreground">AI empowers entrepreneurs</span> to build 
                  businesses that run themselves. Where <span className="font-bold text-foreground">automation creates freedom</span>, 
                  not just efficiency.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Through <span className="font-bold text-foreground">cutting-edge systems</span> and 
                  <span className="font-bold text-foreground gold-gradient"> elite mentorship</span>, 
                  I'm helping the next generation of entrepreneurs break free from traditional limitations.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  This isn't about quick wins. It's about building <span className="font-bold text-foreground">lasting empires</span> that 
                  generate wealth while you sleep.
                </p>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                <div className="relative">
                  <LiveRevenueCounter />
                </div>
              </div>
            </motion.div>

            {/* Section 2 - Premium Instagram Carousel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Behind The Scenes</h3>
              
              {/* Carousel Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Navigation Buttons */}
                <button
                  onClick={() => scrollToIndex((currentIndex - 1 + instagramPosts.length) % instagramPosts.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm p-4 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all holographic"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => scrollToIndex((currentIndex + 1) % instagramPosts.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm p-4 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all holographic"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Instagram Posts Carousel */}
                <div 
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto carousel-container px-12"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {[...instagramPosts, ...instagramPosts].map((post, index) => (
                    <motion.div
                      key={`${post.id}-${index}`}
                      className="flex-shrink-0 w-[400px] scroll-snap-align-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                    >
                      <div className="group relative aspect-square overflow-hidden rounded-2xl hover-lift cursor-pointer premium-shadow">
                        <Image
                          src={post.image}
                          alt={post.caption}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-lg font-semibold">❤️ {post.likes}</p>
                            <p className="text-base">{post.caption}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                  {instagramPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentIndex === index 
                          ? 'w-8 bg-gradient-to-r from-[#D4AF37] to-[#B8860B]' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <a href="https://instagram.com/vladkuzmenko" target="_blank" rel="noopener noreferrer" 
                   className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F4E4C1] transition-colors">
                  <Instagram className="h-6 w-6" />
                  <span className="font-semibold text-lg">Follow @vladkuzmenko</span>
                </a>
              </div>
            </motion.div>

            {/* Section 3 - Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="text-center p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover-lift holographic">
                <Zap className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Innovation Pioneer</h4>
                <p className="text-gray-400">Leading the AI revolution in business automation</p>
              </div>
              <div className="text-center p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover-lift holographic">
                <Target className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Elite Mentor</h4>
                <p className="text-gray-400">Transforming ambitious minds into empire builders</p>
              </div>
              <div className="text-center p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover-lift holographic">
                <Award className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Global Impact</h4>
                <p className="text-gray-400">Building a worldwide network of successful entrepreneurs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Smooth transition to next section */}
      <div className="section-transition" />
    </section>
  );
};
