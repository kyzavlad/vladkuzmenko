import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export const AutomationTeaserSection = () => {
    return (
        <section id="automation-teaser" className="py-20 lg:py-32 text-center bg-secondary/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl lg:text-5xl font-bold">AI AUTOMATION FOR BUSINESS</h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
                    For established businesses ready to implement the systems that drive exponential growth. We don't just provide tools; we re-architect your operations for maximum efficiency and profitability.
                </p>
                <div className="mt-8">
                    <Link href="/automation" passHref target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="outline">Explore Services</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

