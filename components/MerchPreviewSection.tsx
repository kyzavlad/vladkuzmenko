"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Performance Tee",
    price: "$45",
    category: "Apparel",
    description: "Premium athletic fit with moisture-wicking",
    image: "/images/performance-tee.webp",
    color: "Black",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "WARRIOR Protein",
    price: "$69.99",
    category: "Supplements",
    description: "25g pure isolate protein per serving",
    image: "/images/warrior-protein.webp",
    flavor: "Vanilla",
    servings: 30
  },
  {
    id: 3,
    name: "Pro Boxing Gloves",
    price: "$89",
    category: "Equipment",
    description: "Competition-grade genuine leather",
    image: "/images/boxing-gloves.webp",
    weight: "16oz",
    material: "Leather"
  },
  {
    id: 4,
    name: "Breathing Strips",
    price: "$29.99",
    category: "Performance",
    description: "Enhanced oxygen intake technology",
    image: "/images/breathing-strips.webp",
    quantity: 30,
    type: "Nasal"
  },
  {
    id: 5,
    name: "Training Hoodie",
    price: "$85",
    category: "Apparel",
    description: "Heavy-weight premium cotton blend",
    image: "/images/training-hoodie.webp",
    color: "Grey",
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];

export function MerchSection() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle card
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalProducts = products.length;
    
    // Handle circular positioning
    let position = diff;
    if (Math.abs(diff) > totalProducts / 2) {
      position = diff > 0 ? diff - totalProducts : diff + totalProducts;
    }

    const baseTranslateX = position * 120;
    const translateZ = Math.abs(position) * -100;
    const rotateY = position * -15;
    const scale = 1 - Math.abs(position) * 0.2;
    const opacity = Math.abs(position) > 2 ? 0 : 1 - Math.abs(position) * 0.3;

    return {
      transform: `translateX(${baseTranslateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - Math.abs(position),
      pointerEvents: Math.abs(position) > 1 ? 'none' as const : 'auto' as const,
    };
  };

  const navigate = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % products.length;
      } else {
        return prev === 0 ? products.length - 1 : prev - 1;
      }
    });
  };

  return (
    <section id="merch" className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gold-gradient">Elite Equipment</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tested and approved by elite athletes worldwide.
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative h-[600px] perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-6xl h-full preserve-3d">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[480px] cursor-pointer preserve-3d"
                  style={getCardStyle(index)}
                  animate={getCardStyle(index)}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    duration: 0.8 
                  }}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={index === currentIndex ? { scale: 1.05 } : {}}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden premium-shadow bg-gradient-to-br from-gray-900 to-black border border-gold/20">
                    {/* Product Image */}
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gold/20 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-semibold text-gold">{product.category}</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-gray-400 text-sm">{product.description}</p>
                      </div>

                      {/* Product Details */}
                      <div className="space-y-2">
                        {product.sizes && (
                          <div className="flex gap-2">
                            {product.sizes.map((size) => (
                              <div key={size} className="px-2 py-1 border border-gray-700 rounded text-xs text-gray-400">
                                {size}
                              </div>
                            ))}
                          </div>
                        )}
                        {product.flavor && (
                          <p className="text-sm text-gray-400">Flavor: {product.flavor}</p>
                        )}
                        {product.weight && (
                          <p className="text-sm text-gray-400">Weight: {product.weight}</p>
                        )}
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-3xl font-bold gold-gradient">{product.price}</span>
                        <Button 
                          size="sm" 
                          className="premium-button"
                          disabled={index !== currentIndex}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* 3D effect overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(105deg, 
                          transparent 40%, 
                          rgba(212, 175, 55, 0.1) 45%, 
                          rgba(212, 175, 55, 0.2) 50%, 
                          rgba(212, 175, 55, 0.1) 55%, 
                          transparent 60%
                        )`,
                        transform: 'translateX(-100%)',
                        animation: index === currentIndex ? 'shine 3s ease-in-out infinite' : 'none',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigate('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-gold/20 hover:bg-gold/10 transition-colors"
            onMouseEnter={() => setIsAutoPlaying(false)}
          >
            <ChevronLeft className="w-6 h-6 text-gold" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-gold/20 hover:bg-gold/10 transition-colors"
            onMouseEnter={() => setIsAutoPlaying(false)}
          >
            <ChevronRight className="w-6 h-6 text-gold" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-gold' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">
            Warriors Team membership includes exclusive discounts on all products
          </p>
          <p className="text-2xl font-bold text-gold">
            Join Warriors Team - Investment: $9,997
          </p>
          <p className="text-sm text-gray-500 mt-2">
            *Available after strategy call
          </p>
        </motion.div>
      </div>

      {/* CSS for shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          20% { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
