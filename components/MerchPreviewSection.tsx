'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from './EducationPlatformSection';
import { motion } from 'framer-motion';

const merchItems = [
  { name: 'Performance Tee', image: '/merch/performance-tee.jpg', price: 45.00, category: 'Apparel', description: 'Premium athletic fit with moisture-wicking technology' },
  { name: 'WARRIOR FUEL Whey Protein', image: '/merch/warrior-protein.jpg', price: 69.99, category: 'Supplements', description: '25g pure isolate protein per serving' },
  { name: 'Pro Boxing Gloves', image: '/merch/boxing-gloves.jpg', price: 89.00, category: 'Equipment', description: 'Competition-grade genuine leather' },
  { name: 'Breathing Performance Strips', image: '/merch/breathing-strips.jpg', price: 29.99, category: 'Performance', description: 'Enhanced oxygen intake for peak performance' },
  { name: 'Elite Training Hoodie', image: '/merch/training-hoodie.jpg', price: 85.00, category: 'Apparel', description: 'Heavy-weight premium cotton blend' },
  { name: 'Resistance Band Set', image: '/merch/resistance-bands.jpg', price: 55.00, category: 'Equipment', description: '5 resistance levels for complete training' },
  { name: 'Shaker Bottle Pro', image: '/merch/shaker-bottle.jpg', price: 24.99, category: 'Accessories', description: 'Leak-proof design with storage compartment' },
  { name: 'Gym Duffel Bag', image: '/merch/gym-bag.jpg', price: 95.00, category: 'Accessories', description: 'Water-resistant with shoe compartment' },
];

export const MerchPreviewSection = () => {
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="merch" className="py-20 lg:py-32 bg-gradient-to-b from-black to-zinc-950 section-transition">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-heading uppercase mb-6">
            Elite <span className="text-orange-500">Equipment</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            High-performance gear designed for warriors. Every product tested and approved by our community.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 backdrop-blur-sm p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Products Carousel */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {merchItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80 bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500/30 transition-all duration-300 hover-lift group"
              >
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
                    <span className="text-3xl font-bold text-orange-500">${item.price}</span>
                    <Button 
                      size="icon" 
                      className="bg-orange-600 hover:bg-orange-500"
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
            <p className="text-gray-400">
              Every product is carefully selected and tested by our team to ensure maximum performance and durability.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Warrior Tested</h3>
            <p className="text-gray-400">
              Used daily by 3,500+ Warriors Team members worldwide. If it's not elite, it's not in our store.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Member Benefits</h3>
            <p className="text-gray-400">
              Warriors Team members get exclusive discounts and early access to new product launches.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
