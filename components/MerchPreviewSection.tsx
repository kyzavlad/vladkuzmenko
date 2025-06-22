'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from './ui/button';

const merchItems = [
  {
    id: 1,
    name: 'Warriors Hoodie',
    price: '$89',
    category: 'Apparel',
    image: '/warriors-location-1.jpg',
    badge: 'Best Seller',
    rating: 5
  },
  {
    id: 2,
    name: 'Elite Performance Shorts',
    price: '$69',
    category: 'Apparel',
    image: '/warriors-location-2.jpg',
    badge: 'New',
    rating: 5
  },
  {
    id: 3,
    name: 'Success Mindset Book',
    price: '$29',
    category: 'Education',
    image: '/warriors-location-3.jpg',
    badge: 'Limited',
    rating: 5
  },
  {
    id: 4,
    name: 'Warriors Cap',
    price: '$49',
    category: 'Accessories',
    image: '/warriors-location-4.jpg',
    rating: 4
  }
];

export const MerchPreviewSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-black relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {merchItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden premium-hover">
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                  >
                    <Button className="btn-premium">
                      Quick View
                    </Button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <p className="text-amber-400 text-sm mb-2">{item.category}</p>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-gold-text">{item.price}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
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
