'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckCircle, ShoppingCart, X, CreditCard } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
            className="fixed inset-0 bg-black/60 z-cart"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-cart flex flex-col"
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
