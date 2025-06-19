'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckCircle, ShoppingCart, X, CreditCard, Star, Users, Trophy, Zap, BookOpen, Target } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

// Context и компоненты корзины остаются как есть...
const CartContext = createContext({
  cartItems: [] as any[],
  addToCart: (item: any) => {},
  removeFromCart: (itemName: string) => {},
  isCartOpen: false,
  toggleCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemName: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.name !== itemName));
  };
  
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const ShoppingCartSidebar = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold flex items-center gap-2"><ShoppingCart /> Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={toggleCart}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="outline" size="icon" className="w-8 h-8" onClick={() => removeFromCart(item.name)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full">
                  <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Расширенные данные для кампусов
const campuses = [
  { 
    title: 'AI Development & Automation', 
    description: 'Master the art of building AI systems. Learn prompt engineering, API integration, and create automated workflows that scale.',
    icon: <Zap className="h-8 w-8 text-orange-500" />,
    modules: 12,
    duration: '8 weeks'
  },
  { 
    title: 'Content & Personal Branding', 
    description: 'Build a content machine that works 24/7. Master storytelling, video creation, and social media algorithms.',
    icon: <Target className="h-8 w-8 text-orange-500" />,
    modules: 10,
    duration: '6 weeks'
  },
  { 
    title: 'Sales & Persuasion', 
    description: 'Learn psychological frameworks that close high-ticket deals. Master objection handling and value communication.',
    icon: <Trophy className="h-8 w-8 text-orange-500" />,
    modules: 8,
    duration: '4 weeks'
  },
  { 
    title: 'E-commerce & Dropshipping', 
    description: 'Build profitable online stores from scratch. Product research, Facebook ads, and scaling strategies included.',
    icon: <ShoppingCart className="h-8 w-8 text-orange-500" />,
    modules: 15,
    duration: '10 weeks'
  },
  { 
    title: 'Mindset & Discipline', 
    description: 'Develop unbreakable mental fortitude. Time management, goal setting, and peak performance protocols.',
    icon: <BookOpen className="h-8 w-8 text-orange-500" />,
    modules: 6,
    duration: '4 weeks'
  },
  { 
    title: 'Financial Markets & Crypto', 
    description: 'Understand market psychology, technical analysis, and build wealth through strategic investments.',
    icon: <Users className="h-8 w-8 text-orange-500" />,
    modules: 12,
    duration: '8 weeks'
  },
];

const testimonials = [
  {
    name: "Alex Rodriguez",
    role: "E-commerce Entrepreneur",
    image: "/testimonial-1.jpg",
    content: "The University completely transformed my business. Went from $2k to $50k/month in 6 months.",
    rating: 5
  },
  {
    name: "Marcus Chen",
    role: "AI Agency Owner",
    image: "/testimonial-2.jpg",
    content: "The AI automation campus alone is worth 10x the price. Now running a 6-figure agency.",
    rating: 5
  },
  {
    name: "David Thompson",
    role: "Content Creator",
    image: "/testimonial-3.jpg",
    content: "From 0 to 100k followers in 90 days using Vlad's content systems. Life-changing.",
    rating: 5
  }
];

export const EducationPlatformSection = () => {
  const { addToCart } = useCart();
  const [selectedCampus, setSelectedCampus] = useState(0);
  
  const theUniversityProduct = {
    name: "The University - Monthly",
    price: 97.00
  };

  return (
    <section id="education" className="py-20 lg:py-32 bg-gradient-to-b from-zinc-950 to-black section-transition">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-heading uppercase mb-6">
            The <span className="text-orange-500">University</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Traditional education creates employees. We create <span className="text-white font-semibold">empire builders</span>. 
            Get access to the exact systems and strategies that generate millions in revenue.
          </p>
        </motion.div>

        {/* Campus Showcase */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Campus List */}
            <div className="space-y-4">
              {campuses.map((campus, index) => (
                <motion.div
                  key={campus.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCampus(index)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover-lift ${
                    selectedCampus === index 
                      ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-orange-500/50' 
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{campus.icon}</div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{campus.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{campus.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-orange-500">{campus.modules} modules</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{campus.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sticky top-20 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 premium-shadow"
            >
              <div className="mb-6">{campuses[selectedCampus].icon}</div>
              <h3 className="text-3xl font-bold mb-4">{campuses[selectedCampus].title}</h3>
              <p className="text-gray-300 mb-6">{campuses[selectedCampus].description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Lifetime access to all content</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Weekly live Q&A sessions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Private community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Direct mentor support</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$97</span>
                <span className="text-gray-400">/month</span>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400"
                onClick={() => addToCart(theUniversityProduct)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                Enroll Now
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Cancel anytime. 30-day money-back guarantee.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Success Stories From Our Students</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl p-12 border border-orange-500/20"
        >
          <h3 className="text-4xl font-bold mb-4">Ready to Level Up?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 10,000+ students who are building their empires with The University.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 px-12 py-6 text-lg"
            onClick={() => addToCart(theUniversityProduct)}
          >
            Get Instant Access - $97/month
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
