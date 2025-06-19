'use client';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Zap, BrainCircuit, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

const automationFeatures = [
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Lead Generation Engine",
        description: "Automated multi-channel outreach and lead qualification systems that run 24/7."
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        title: "AI-Powered Operations",
        description: "Custom AI agents to handle customer support, onboarding, and internal workflows."
    },
    {
        icon: <LineChart className="h-8 w-8 text-primary" />,
        title: "Growth Systems",
        description: "End-to-end solutions that connect your marketing, sales, and operations for exponential growth."
    }
]

export const AutomationTeaserSection = () => {
    return (
        <section id="automation-teaser" className="py-20 lg:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-wider">AI AUTOMATION FOR BUSINESS</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        For established businesses ready to implement the systems that drive exponential growth. We don't just provide tools; we re-architect your operations for maximum efficiency and profitability.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
                    {automationFeatures.map((feature, index) => (
                        <motion.div 
                            key={feature.title} 
                            className="text-center p-6 bg-secondary/20 rounded-lg border border-border/30"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link href="/automation" passHref target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="outline">Explore All Services</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
