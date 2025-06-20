'use client';

import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { CheckCircle, ShoppingCart, X, CreditCard, Star, Users, Trophy, Zap, BookOpen, Target, Brain } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { SmartRecommendation } from './SmartRecommendation';

// Context для корзины
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

// Shopping Cart Sidebar Component
export const ShoppingCartSidebar = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart } = useCart();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const hasMerch = cartItems.some(item => item.category);
  const hasPlatforms = cartItems.some(item => item.name.includes('University') || item.name.includes('AI Editing Platform'));
  
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

  const handleCheckout = () => {
    if (hasMerch && !showDeliveryForm) {
      setShowDeliveryForm(true);
    } else {
      // Process payment for platforms
      const platformItems = cartItems.filter(item => item.name.includes('University') || item.name.includes('AI Editing Platform'));
      
      if (platformItems.length > 0) {
        // Open platforms in new tabs
        platformItems.forEach(item => {
          if (item.name.includes('University')) {
            window.open('/university', '_blank');
          } else if (item.name.includes('AI Editing Platform')) {
            window.open('/ai-platform', '_blank');
          }
        });
        
        // Clear cart after successful "payment"
        platformItems.forEach(item => removeFromCart(item.name));
        
        if (!hasMerch) {
          toggleCart();
        }
      }
    }
  };

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
              {!showDeliveryForm ? (
                cartItems.length === 0 ? (
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
                )
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Delivery Information</h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg premium-input"
                    value={deliveryData.name}
                    onChange={(e) => setDeliveryData({...deliveryData, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-lg premium-input"
                    value={deliveryData.email}
                    onChange={(e) => setDeliveryData({...deliveryData, email: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-3 rounded-lg premium-input"
                    value={deliveryData.address}
                    onChange={(e) => setDeliveryData({...deliveryData, address: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="p-3 rounded-lg premium-input"
                      value={deliveryData.city}
                      onChange={(e) => setDeliveryData({...deliveryData, city: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="p-3 rounded-lg premium-input"
                      value={deliveryData.zipCode}
                      onChange={(e) => setDeliveryData({...deliveryData, zipCode: e.target.value})}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full p-3 rounded-lg premium-input"
                    value={deliveryData.country}
                    onChange={(e) => setDeliveryData({...deliveryData, country: e.target.value})}
                  />
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black"
                  onClick={handleCheckout}
                >
                  <CreditCard className="mr-2 h-5 w-5" /> 
                  {showDeliveryForm ? 'Process Payment' : 'Proceed to Checkout'}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Campus data
const campuses = [
  { 
    title: 'AI & Automation Mastery', 
    description: 'Build intelligent systems that work 24/7. Master prompt engineering, workflow automation, and API integration.',
    icon: <Zap className="h-8 w-8 text-[#D4AF37]" />,
    modules: 12,
    duration: '8 weeks'
  },
  { 
    title: 'Content Creation Empire', 
    description: 'Turn content into currency. Master viral storytelling, video production, and audience psychology.',
    icon: <Target className="h-8 w-8 text-[#D4AF37]" />,
    modules: 10,
    duration: '6 weeks'
  },
  { 
    title: 'Sales Psychology', 
    description: 'Close deals like a master. Learn advanced persuasion, objection handling, and value communication.',
    icon: <Trophy className="h-8 w-8 text-[#D4AF37]" />,
    modules: 8,
    duration: '4 weeks'
  },
  { 
    title: 'E-commerce Domination', 
    description: 'Build stores that print money. Product research, paid ads mastery, and scaling strategies.',
    icon: <ShoppingCart className="h-8 w-8 text-[#D4AF37]" />,
    modules: 15,
    duration: '10 weeks'
  },
  { 
    title: 'Warrior Mindset', 
    description: 'Forge unbreakable discipline. Peak performance protocols, time mastery, and mental fortitude.',
    icon: <BookOpen className="h-8 w-8 text-[#D4AF37]" />,
    modules: 6,
    duration: '4 weeks'
  },
  { 
    title: 'Wealth Building', 
    description: 'Master money like the elite. Investment strategies, market psychology, and wealth preservation.',
    icon: <Users className="h-8 w-8 text-[#D4AF37]" />,
    modules: 12,
    duration: '8 weeks'
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Alex Rodriguez",
    role: "AI Agency Owner",
    image: "/testimonial-1.jpg",
    content: "From zero to $50k/month in 6 months. The AI campus alone changed my life.",
    rating: 5,
    revenue: "$50,000/mo"
  },
  {
    name: "Marcus Chen",
    role: "Content Creator",
    image: "/testimonial-2.jpg",
    content: "100k followers and $25k/month. Vlad's systems are pure gold.",
    rating: 5,
    revenue: "$25,000/mo"
  },
  {
    name: "David Thompson",
    role: "E-commerce King",
    image: "/testimonial-3.jpg",
    content: "Scaled to 7 figures in my first year. This is the real deal.",
    rating: 5,
    revenue: "$120,000/mo"
  },
  {
    name: "James Wilson",
    role: "Sales Expert",
    image: "/testimonial-4.jpg",
    content: "Closing $100k+ deals weekly now. The sales training is unmatched.",
    rating: 5,
    revenue: "$80,000/mo"
  },
  {
    name: "Ryan Foster",
    role: "Automation Specialist",
    image: "/testimonial-5.jpg",
    content: "Built a $30k/month agency in 90 days. Life-changing program.",
    rating: 5,
    revenue: "$30,000/mo"
  },
  {
    name: "Michael Park",
    role: "Trader",
    image: "/testimonial-6.jpg",
    content: "Turned $5k into $200k. The wealth campus is incredible.",
    rating: 5,
    revenue: "$40,000/mo"
  }
];

// Main Education Platform Section
export const EducationPlatformSection = () => {
  const { addToCart } = useCart();
  const [selectedCampus, setSelectedCampus] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  const theUniversityProduct = {
    name: "The University - Monthly",
    price: 97.00
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialRef.current) {
        const scrollAmount = 2;
        testimonialRef.current.scrollLeft += scrollAmount;
        
        // Reset scroll when reaching the end
        const maxScroll = testimonialRef.current.scrollWidth / 2;
        if (testimonialRef.current.scrollLeft >= maxScroll) {
          testimonialRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="education" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background similar to Warriors Team */}
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
              THE <span className="gold-gradient">UNIVERSITY</span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Traditional education creates employees. We create <span className="font-bold text-foreground">empire builders</span>.
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get access to the exact systems and strategies that generate millions in revenue.
            </p>
            
            {/* Smart Recommendation Button */}
            <Button
              variant="outline"
              onClick={() => setShowRecommendation(true)}
              className="mt-6 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <Brain className="mr-2 h-4 w-4" />
              Get Personalized Campus Recommendation
            </Button>
          </motion.div>

          {/* Campus Showcase */}
          <div className="space-y-24">
            {/* Campus Grid with Holographic Effects */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                {campuses.map((campus, index) => (
                  <motion.div
                    key={campus.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCampus(index)}
                    className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover-lift holographic ${
                      selectedCampus === index 
                        ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/10 border-[#D4AF37]/50' 
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">{campus.icon}</div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2">{campus.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{campus.description}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-[#D4AF37]">{campus.modules} modules</span>
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
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black glow-effect"
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

            {/* Infinite Scrolling Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-center mb-12">Success Stories From Our Students</h3>
              
              <div className="relative">
                <div 
                  ref={testimonialRef}
                  className="flex gap-6 overflow-x-hidden carousel-container"
                >
                  {/* First set */}
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-1`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 w-[400px] bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 hover-lift"
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
                          <p className="text-sm font-bold text-[#D4AF37]">{testimonial.revenue}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-gray-300 italic">"{testimonial.content}"</p>
                    </motion.div>
                  ))}
                  
                  {/* Duplicate set for infinite scroll */}
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-2`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 w-[400px] bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 hover-lift"
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
                          <p className="text-sm font-bold text-[#D4AF37]">{testimonial.revenue}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-gray-300 italic">"{testimonial.content}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-2xl p-12 border border-[#D4AF37]/20 mt-20"
          >
            <h3 className="text-4xl font-bold mb-4">Ready to Level Up?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 10,000+ students who are building their empires with The University.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black px-12 py-6 text-lg glow-effect"
              onClick={() => addToCart(theUniversityProduct)}
            >
              Get Instant Access - $97/month
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Smart Recommendation Modal */}
      {showRecommendation && (
        <SmartRecommendation 
          onClose={() => setShowRecommendation(false)}
          onSelect={(index) => {
            setSelectedCampus(index);
            setShowRecommendation(false);
          }}
        />
      )}
      
      {/* Smooth transition to next section */}
      <div className="section-transition" />
    </div>
  );
};
