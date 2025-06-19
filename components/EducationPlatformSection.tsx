'use client';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckCircle, ShoppingCart, X, CreditCard } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Создаем контекст для корзины
const CartContext = createContext({
  cartItems: [] as any[],
  addToCart: (item: any) => {},
  removeFromCart: (itemName: string) => {},
  isCartOpen: false,
  toggleCart: () => {},
});

export const useCart = () => useContext(CartContext);

// Провайдер корзины
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

// Компонент корзины
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


const campuses = [
    { title: 'AI Development & Automation', description: 'Build the systems that power modern business. No prior experience needed.' },
    { title: 'Content & Personal Branding', description: 'Master the art of attention. Build a content machine that works for you 24/7.' },
    { title: 'Sales & Persuasion', description: 'Learn the frameworks that close high-ticket deals. Master the psychology of selling.' },
    { title: 'E-commerce & Dropshipping', description: 'Build, scale, and automate your own e-commerce empire from scratch.' },
    { title: 'Mindset & Discipline', description: 'Develop the mental fortitude and framework required to win in any environment.' },
    { title: 'Financial Markets & Crypto', description: 'Understand how money really works and learn strategies to make it work for you.' },
];

const whatsInside = [
    "100+ Hours of Video Lessons",
    "Weekly Live Q&A with Experts",
    "Private Global Community",
    "Actionable Step-by-Step Plans",
    "Access to AI Tools & Software",
    "Networking with Millionaires"
];

export const EducationPlatformSection = () => {
    const { addToCart } = useCart();
    const theUniversityProduct = {
        name: "The University Subscription",
        price: 97.00
    };

    return (
        <section id="education" className="py-20 lg:py-32 bg-background border-y border-border/20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-wider">THE UNIVERSITY</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Traditional education is a scam designed to create obedient workers. Here, we teach you how to build the machine. We provide the knowledge required to become wealthy, independent, and free.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {campuses.map((campus) => (
                        <div key={campus.title} className="bg-gradient-to-br from-secondary/30 to-background p-6 rounded-lg border border-border/50 transform hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-2xl font-bold mb-2">{campus.title}</h3>
                            <p className="text-muted-foreground">{campus.description}</p>
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-24 items-center">
                    <div>
                        <h3 className="text-4xl font-bold mb-8">What's Inside?</h3>
                        <ul className="space-y-4">
                            {whatsInside.map(item => (
                                <li key={item} className="flex items-center text-xl gap-4">
                                    <CheckCircle className="text-primary w-7 h-7 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="bg-secondary/30 border border-border/50 rounded-lg p-8 text-center">
                        <h4 className="text-3xl font-bold">LIFETIME ACCESS</h4>
                        <p className="text-muted-foreground my-4">One payment. All current and future knowledge.</p>
                        <div className="my-8">
                            <span className="text-6xl font-black">$97</span>
                            <span className="text-muted-foreground">/ month</span>
                        </div>
                        <Button size="lg" className="w-full text-lg py-7" onClick={() => addToCart(theUniversityProduct)}>
                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart & Start Now
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">Cancel Anytime. 14-Day Money-Back Guarantee.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
