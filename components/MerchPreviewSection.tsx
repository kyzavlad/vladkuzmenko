'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './EducationPlatformSection'; // Импортируем хук корзины

const merchItems = [
    { name: 'VK Performance Tee', image: '/images/merch/t-shirt.png', price: 45.00, category: 'Apparel' },
    { name: 'WARRIOR FUEL Whey Protein', image: '/images/merch/protein.png', price: 69.99, category: 'Supplements' },
    { name: 'VK Pro Boxing Gloves', image: '/images/merch/gloves.png', price: 89.00, category: 'Equipment' },
    { name: 'AURA Breathing Strips', image: '/images/merch/nasal-strips.png', price: 29.99, category: 'Performance Gear' },
];

export const MerchPreviewSection = () => {
    const { addToCart } = useCart();
    
    return (
        <section id="merch" className="py-20 lg:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl lg:text-5xl font-black uppercase mb-4 tracking-wider">EQUIPMENT & APPAREL</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                    High-performance gear for those who operate at peak level.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {merchItems.map((item) => (
                        <div key={item.name} className="group relative bg-background border border-border/50 rounded-lg p-4 flex flex-col text-left transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
                            <div className="aspect-square bg-secondary/30 rounded-md mb-4 overflow-hidden">
                                <Image src={item.image} alt={item.name} width={400} height={400} className="object-contain" />
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                                <h3 className="text-xl font-bold mt-1">{item.name}</h3>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                                <Button size="icon" onClick={() => addToCart(item)}>
                                    <ShoppingCart className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
