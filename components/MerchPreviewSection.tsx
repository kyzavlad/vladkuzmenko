import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const merchItems = [
    {
        name: 'VK Performance Tee',
        image: '/images/merch/tshirt.png', // Замени на путь к мокапу футболки
    },
    {
        name: 'WARRIOR FUEL Whey Protein',
        image: '/images/merch/protein.png', // Замени на путь к мокапу спортпита
    },
];

export const MerchPreviewSection = () => {
    return (
        <section id="merch" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">EQUIPMENT</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                    High-performance apparel and supplements for those who operate at peak level.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {merchItems.map((item) => (
                        <div key={item.name} className="bg-secondary/30 border border-border/50 rounded-lg p-6">
                            <div className="aspect-square bg-background rounded-md mb-4 flex items-center justify-center">
                                <Image src={item.image} alt={item.name} width={400} height={400} className="object-contain" />
                            </div>
                            <h3 className="text-2xl font-bold">{item.name}</h3>
                        </div>
                    ))}
                </div>
                <div className="mt-12">
                    <Link href="/merch-waitlist" passHref>
                        <Button size="lg" variant="secondary">Get Notified on Launch</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

