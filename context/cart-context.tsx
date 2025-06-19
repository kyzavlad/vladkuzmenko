'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} добавлен в корзину!`);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.error("Товар удален из корзины.");
  }, []);

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.info("Корзина очищена.");
  }, []);

  const totalItems = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);

  const value = useMemo(() => ({
    items, isOpen, setIsOpen, addItem, removeItem, updateItemQuantity, clearCart, totalItems, totalPrice,
  }), [items, isOpen, addItem, removeItem, updateItemQuantity, clearCart, totalItems, totalPrice]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
