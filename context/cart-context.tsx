import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, ShoppingCart, X, Star, Trophy, Users, 
  Zap, Target, TrendingUp, Globe, Award, Crown,
  Sparkles, Play, ChevronLeft, ChevronRight, CheckCircle,
  Menu, Brain, Rocket, Shield, Clock, Calendar
} from 'lucide-react';

// Cart Context
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, { ...item, id: Date.now() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      getTotalPrice,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Premium gradient colors
const gradients = {
  gold: 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600',
  goldText: 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent',
  purple: 'bg-gradient-to-r from-purple-600 to-indigo-600',
  blue: 'bg-gradient-to-r from-blue-600 to-cyan-600',
  dark: 'bg-gradient-to-b from-gray-900 via-black to-gray-900'
};

// Success Path Visualizer Component
const SuccessPathVisualizer = ({ onClose }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  
  const nodes = [
    { id: 1, x: 50, y: 10, label: 'Financial Freedom', icon: '💰' },
    { id: 2, x: 20, y: 30, label: 'AI Systems', icon: '🤖' },
    { id: 3, x: 80, y: 30, label: 'Elite Network', icon: '👥' },
    { id: 4, x: 20, y: 60, label: 'High-Income Skills', icon: '📈' },
    { id: 5, x: 80, y: 60, label: 'Warrior Mindset', icon: '🧠' },
    { id: 6, x: 50, y: 80, label: 'Your Current Position', icon: '📍' }
  ];

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        
        <h2 className={`text-3xl font-bold mb-8 ${gradients.goldText}`}>Your Success Path</h2>
        
        <div className="relative h-96 bg-black/50 rounded-xl overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {/* Draw connections */}
            {nodes.map((node, i) => 
              nodes.slice(i + 1).map(targetNode => (
                <line
                  key={`${node.id}-${targetNode.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke="url(#goldGradient)"
                  strokeWidth="2"
                  opacity="0.3"
                />
              ))
            )}
            
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EAB308" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Render nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                selectedNode === node.id ? 'scale-125' : 'hover:scale-110'
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setSelectedNode(node.id)}
            >
              <div className={`w-20 h-20 rounded-full ${gradients.gold} flex items-center justify-center text-3xl shadow-2xl`}>
                {node.icon}
              </div>
              <p className="text-xs text-center mt-2 text-white font-medium">{node.label}</p>
            </div>
          ))}
        </div>
        
        <p className="text-gray-400 text-center mt-6">Click on any node to explore your path to success</p>
      </div>
    </div>
  );
};
