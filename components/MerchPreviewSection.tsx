'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';

export const MerchPreviewSection = () => {
  const [notification, setNotification] = useState('');
  
  const products = [
    {
      id: 'performance-tee',
      name: 'VK Performance Tee',
      price: 45,
      description: 'Premium athletic fit. Moisture-wicking fabric.',
    },
    {
      id: 'warrior-protein',
      name: 'WARRIOR FUEL Whey Protein',
      price: 65,
      description: 'Premium isolate. 25g protein per serving.',
    },
    {
      id: 'training-hoodie',
      name: 'Elite Training Hoodie',
      price: 85,
      description: 'Heavy-weight cotton. Built for champions.',
    },
    {
      id: 'boxing-gloves',
      name: 'Professional Boxing Gloves',
      price: 120,
      description: 'Real leather. Competition grade.',
    },
    {
      id: 'breathe-right',
      name: 'Performance Nasal Strips',
      price: 29,
      description: 'Enhance oxygen intake. Pack of 30.',
    },
    {
      id: 'resistance-bands',
      name: 'Elite Resistance Band Set',
      price: 55,
      description: '5 levels. Travel-ready training.',
    },
  ];

  const handleNotifyLaunch = (productName: string) => {
    setNotification(`You'll be notified when ${productName} launches!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <section className="py-20 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">EQUIPMENT</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            High-performance apparel and supplements for those who operate at peak level.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition-colors">
              <div className="aspect-square bg-zinc-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-zinc-600 text-lg">{product.name}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <Button 
                    onClick={() => handleNotifyLaunch(product.name)}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-lg px-6 py-3 shadow-lg">
            {notification}
          </div>
        )}

        {/* Coming Soon CTA */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Get Notified on Launch
          </Button>
        </div>
      </div>
    </section>
  );
};
