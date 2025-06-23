'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const merchItems = [
  {
    id: 1,
    name: 'Warriors Hoodie Premium',
    price: '$89',
    originalPrice: '$129',
    category: 'Limited Edition',
    image: '/gorillamindpage.webp',
    badge: 'Best Seller',
    rating: 5
  },
  {
    id: 2,
    name: 'Elite Performance Jacket',
    price: '$149',
    category: 'Premium Collection',
    image: '/case-study-1.webp',
    badge: 'New',
    rating: 5
  },
  {
    id: 3,
    name: 'Success Mindset Bundle',
    price: '$297',
    originalPrice: '$497',
    category: 'Education',
    image: '/case-study-2.webp',
    badge: 'Limited',
    rating: 5
  },
  {
    id: 4,
    name: 'Warriors Tech Backpack',
    price: '$197',
    category: 'Accessories',
    image: '/case-study-3.webp',
    rating: 5
  },
  {
    id: 5,
    name: 'Champion Training Set',
    price: '$247',
    category: 'Sportswear',
    image: '/case-study-4.webp',
    badge: 'Exclusive',
    rating: 5
  },
  {
    id: 6,
    name: 'VIP Member Box',
    price: '$997',
    category: 'Membership',
    image: '/case-study-5.webp',
    badge: 'VIP Only',
    rating: 5
  }
];

export const MerchPreviewSection = () => {
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
    const maxIndex = Math.max(0, merchItems.length - 4); // Show 4 items at a time on desktop
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-[30%] -left-[20%] w-[60%] h-[60%] bg-gradient-radial from-amber-400 to-transparent blur-3xl" />
        <div className="absolute bottom-[30%] -right-[20%] w-[60%] h-[60%] bg-gradient-radial from-yellow-600 to-transparent blur-3xl" />
      </div>

      <div className="w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full mb-6">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium">Elite Equipment</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Gear Up for <span className="gradient-gold-text">Success</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Premium merchandise designed for Warriors who demand excellence in every aspect of life
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
            disabled={currentIndex >= merchItems.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Products Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-hidden scroll-smooth px-8 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {merchItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-[300px] group"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 h-full">
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <Button className="btn-premium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Quick View
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <p className="text-amber-400 text-sm mb-2">{item.category}</p>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{item.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">(5.0)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold gradient-gold-text">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">{item.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 border border-amber-400/30"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {merchItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`transition-all duration-300 ${
                  currentIndex === i 
                    ? 'w-8 h-2 bg-amber-400 rounded-full' 
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500 rounded-full'
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
            size="lg"
            className="btn-premium"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            View Full Collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
