'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, Star, X, Plus, Minus, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '../context/cart-context';

const merchItems = [
  {
    id: 'merch-1',
    name: 'Warriors Hoodie Premium',
    price: 89,
    originalPrice: 129,
    category: 'Limited Edition',
    image: '/warriors-group-photo.jpg', // ИСПРАВЛЕНО
    badge: 'Best Seller',
    rating: 5,
    description: 'Premium quality hoodie with embroidered Warriors logo. Made from 100% organic cotton.',
    features: ['Water-resistant coating', 'Hidden zipper pockets', 'Adjustable hood', 'Lifetime warranty']
  },
  {
    id: 'merch-2',
    name: 'Elite Performance Jacket',
    price: 149,
    category: 'Premium Collection',
    image: '/warriors-yacht-meeting.jpg', // ИСПРАВЛЕНО
    badge: 'New',
    rating: 5,
    description: 'High-performance jacket designed for winners. Breathable, lightweight, and stylish.',
    features: ['Windproof material', 'Thermal insulation', 'Reflective details', 'Multiple pockets']
  },
  {
    id: 'merch-3',
    name: 'Success Mindset Bundle',
    price: 297,
    originalPrice: 497,
    category: 'Education',
    image: '/team-success-1.webp', // ИСПРАВЛЕНО
    badge: 'Limited',
    rating: 5,
    description: 'Complete mindset transformation package including books, courses, and exclusive content.',
    features: ['10 HD video courses', '3 bestselling books', 'Private community access', 'Monthly Q&A calls']
  },
  {
    id: 'merch-4',
    name: 'Warriors Tech Backpack',
    price: 197,
    category: 'Accessories',
    image: '/team-meeting-1.webp', // ИСПРАВЛЕНО
    rating: 5,
    description: 'Ultimate tech backpack for digital nomads and entrepreneurs on the move.',
    features: ['USB charging port', 'Anti-theft design', 'Laptop compartment', 'Waterproof']
  },
  {
    id: 'merch-5',
    name: 'Champion Training Set',
    price: 247,
    category: 'Sportswear',
    image: '/warriors-discussion.jpg', // ИСПРАВЛЕНО
    badge: 'Exclusive',
    rating: 5,
    description: 'Complete training outfit for peak performance. Includes shirt, shorts, and accessories.',
    features: ['Moisture-wicking fabric', 'Compression technology', 'UV protection', 'Antimicrobial']
  },
  {
    id: 'merch-6',
    name: 'VIP Member Box',
    price: 997,
    category: 'Membership',
    image: '/warriors-leaders.jpg', // ИСПРАВЛЕНО
    badge: 'VIP Only',
    rating: 5,
    description: 'Exclusive VIP membership box with premium merchandise and lifetime benefits.',
    features: ['All products included', 'VIP event access', 'Personal mentorship', 'Signed certificate']
  }
];

export const MerchPreviewSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof merchItems[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart, setIsCartOpen } = useCart();
  
  const duplicatedItems = [...merchItems, ...merchItems];

  const handleAddToCart = (product: typeof merchItems[0], qty: number = 1) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty
    });
    
    toast({
      title: "Added to cart!",
      description: `${qty}x ${product.name}`,
    });
    
    setIsCartOpen(true);
    
    if (selectedProduct) {
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  return (
    <section id="merch" className="py-24 md:py-32 bg-black overflow-x-hidden">
      <style jsx global>{`
        .marquee {
          width: 100%;
          overflow: hidden;
        }
        .marquee-content {
          display: flex;
          width: fit-content;
          animation: marquee 90s linear infinite;
        }
        .marquee:hover .marquee-content {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* ИСПРАВЛЕНО: Плашка удалена */}
          <div className="section-title-wrapper" data-title="Gear Up">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Gear Up for <span className="gradient-gold-text">Success</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Premium merchandise designed for Warriors who demand excellence in every aspect of life
          </p>
        </motion.div>
      </div>

      <div className="marquee">
        <div className="marquee-content">
          {duplicatedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex-shrink-0 w-[300px] mx-4 group">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 h-full flex flex-col">
                {/* ИСПРАВЛЕНО: Контейнер для изображения теперь квадратный */}
                <div className="relative aspect-square w-full bg-gradient-to-br from-gray-900 to-gray-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  {item.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <Button 
                      className="btn-premium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      onClick={() => setSelectedProduct(item)}
                    >
                      Quick View
                    </Button>
                  </div>
                </div>
                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-amber-400 text-sm mb-2">{item.category}</p>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">(5.0)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-2xl font-bold gradient-gold-text">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">${item.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-amber-400 text-black hover:bg-amber-500 font-semibold"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Preview Dialog (остается без изменений) */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="sr-only">Product Preview</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-800">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  layout="fill"
                  objectFit="cover"
                />
                {selectedProduct.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black text-sm font-bold px-4 py-2 rounded-full">
                      {selectedProduct.badge}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex-1">
                  <p className="text-amber-400 text-sm mb-2">{selectedProduct.category}</p>
                  <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < selectedProduct.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-gray-400">(5.0) • 127 reviews</span>
                  </div>
                  <p className="text-gray-300 mb-6">{selectedProduct.description}</p>
                  <div className="space-y-3 mb-8">
                    <h3 className="font-semibold text-amber-400">Key Features:</h3>
                    {selectedProduct.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold gradient-gold-text">${selectedProduct.price}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-2">${selectedProduct.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                      <Button size="sm" variant="ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 p-0">
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <Button size="sm" variant="ghost" onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 p-0">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button size="lg" className="w-full btn-premium" onClick={() => handleAddToCart(selectedProduct, quantity)}>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart - ${selectedProduct.price * quantity}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
