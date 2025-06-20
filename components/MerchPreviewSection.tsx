'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from './EducationPlatformSection';
import { motion } from 'framer-motion';

const merchItems = [
  { name: 'Performance Tee', image: '/merch/performance-tee.jpg', price: 45.00, category: 'Apparel', description: 'Premium athletic fit with moisture-wicking' },
  { name: 'WARRIOR Protein', image: '/merch/warrior-protein.jpg', price: 69.99, category: 'Supplements', description: '25g pure isolate protein per serving' },
  { name: 'Pro Boxing Gloves', image: '/merch/boxing-gloves.jpg', price: 89.00, category: 'Equipment', description: 'Competition-grade genuine leather' },
  { name: 'Breathing Strips', image: '/merch/breathing-strips.jpg', price: 29.99, category: 'Performance', description: 'Enhanced oxygen intake technology' },
  { name: 'Training Hoodie', image: '/merch/training-hoodie.jpg', price: 85.00, category: 'Apparel', description: 'Heavy-weight premium cotton blend' },
  { name: 'Resistance Bands', image: '/merch/resistance-bands.jpg', price: 55.00, category: 'Equipment', description: '5 resistance levels included' },
  { name: 'Shaker Bottle', image: '/merch/shaker-bottle.jpg', price: 24.99, category: 'Accessories', description: 'Leak-proof with storage' },
  { name: 'Gym Duffel', image: '/merch/gym-bag.jpg', price: 95.00, category: 'Accessories', description: 'Water-resistant design' },
];

export const MerchPreviewSection = () => {
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          const scrollAmount = 2; // pixels per frame
          scrollRef.current.scrollLeft += scrollAmount;
          
          // Check if we've scrolled to the end of the first set
          const maxScroll = scrollRef.current.scrollWidth / 2;
          if (scrollRef.current.scrollLeft >= maxScroll) {
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 30); // ~33fps
    };

    startAutoScroll();

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          const scrollAmount = 2;
          scrollRef.current.scrollLeft += scrollAmount;
          const maxScroll = scrollRef.current.scrollWidth / 2;
          if (scrollRef.current.scrollLeft >= maxScroll) {
            scrollRef.current.scrollLeft = 0;
          }
        }
      }, 30);
    };
    startAutoScroll();
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="merch" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-[#D4AF37] to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#B8860B] to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              ELITE <span className="gold-gradient">EQUIPMENT</span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Premium gear for peak performance.
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tested and approved by elite athletes worldwide.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm p-3 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-colors holographic"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm p-3 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-colors holographic"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Products Carousel - Duplicated for infinite scroll */}
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden carousel-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* First set of items */}
              {merchItems.map((item, index) => (
                <motion.div
                  key={`${item.name}-1`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                    <div className="relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#D4AF37]/30 transition-all duration-300 hover-lift">
                      <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-xs font-semibold">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold gold-gradient-subtle">${item.price}</span>
                          <Button 
                            size="icon" 
                            className="bg-[#D4AF37] hover:bg-[#B8860B] text-black holographic"
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for infinite scroll */}
              {merchItems.map((item, index) => (
                <motion.div
                  key={`${item.name}-2`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                    <div className="relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#D4AF37]/30 transition-all duration-300 hover-lift">
                      <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-xs font-semibold">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold gold-gradient-subtle">${item.price}</span>
                          <Button 
                            size="icon" 
                            className="bg-[#D4AF37] hover:bg-[#B8860B] text-black holographic"
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quality Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 gold-gradient-subtle">Premium Quality</h3>
              <p className="text-gray-400">
                Every product meets the highest standards of performance and durability.
              </p>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 gold-gradient-subtle">Elite Tested</h3>
              <p className="text-gray-400">
                Used daily by professional athletes and high performers worldwide.
              </p>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 gold-gradient-subtle">Member Benefits</h3>
              <p className="text-gray-400">
                Exclusive discounts and early access for Warriors Team members.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Smooth transition to next section */}
      <div className="section-transition" />
    </section>
  );
};
