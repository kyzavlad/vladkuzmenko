'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Zap, BrainCircuit, LineChart, Phone, MessageSquare, Video, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const automationOffers = [
  {
    icon: <MessageSquare className="h-10 w-10 text-orange-500" />,
    title: "AI Chat Lead Capture",
    subtitle: "24/7 Lead Converter",
    price: "$2,500",
    description: "Smart AI agent that engages visitors, qualifies leads, and books appointments automatically.",
    features: [
      "2-3x conversion rate increase",
      "24/7 availability",
      "CRM integration",
      "Multi-language support"
    ]
  },
  {
    icon: <Phone className="h-10 w-10 text-orange-500" />,
    title: "AI Calling Assistant",
    subtitle: "Never Miss a Call",
    price: "$3,000",
    description: "Voice AI that handles all incoming calls, answers questions, and schedules appointments.",
    features: [
      "Natural voice conversations",
      "Calendar integration",
      "Call recording & analytics",
      "Custom voice training"
    ]
  },
  {
    icon: <Video className="h-10 w-10 text-orange-500" />,
    title: "Content Automation System",
    subtitle: "Content Multiplication",
    price: "$2,000",
    description: "Turn one video into 30 days of content across all platforms automatically.",
    features: [
      "AI video editing",
      "Auto-captioning",
      "Multi-platform posting",
      "Viral clip detection"
    ]
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-orange-500" />,
    title: "Full AI Business System",
    subtitle: "Complete Transformation",
    price: "From $15,000",
    description: "End-to-end AI integration across marketing, sales, and operations.",
    features: [
      "Custom AI strategy",
      "Full implementation",
      "Team training",
      "Ongoing optimization"
    ]
  }
];

export const AutomationTeaserSection = () => {
  return (
    <section id="automation-teaser" className="py-20 lg:py-32 bg-gradient-to-b from-black to-zinc-950 section-transition">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <p className="text-orange-500 font-semibold mb-4 uppercase tracking-wider">For Established Businesses</p>
          <h2 className="text-5xl lg:text-7xl font-heading uppercase mb-6">
            AI <span className="text-orange-500">Automation</span> Agency
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            We don't just implement tools. We architect <span className="text-white font-semibold">intelligent systems</span> that 
            transform your operations and multiply your revenue while you sleep.
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {automationOffers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 hover:border-orange-500/30 transition-all duration-300 hover-lift"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  {offer.icon}
                  <h3 className="text-2xl font-bold mt-4">{offer.title}</h3>
                  <p className="text-orange-500 font-semibold">{offer.subtitle}</p>
                </div>
                <span className="text-2xl font-bold text-orange-500">{offer.price}</span>
              </div>
              
              <p className="text-gray-400 mb-6">{offer.description}</p>
              
              <ul className="space-y-2">
                {offer.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <p className="text-5xl font-bold text-orange-500">300+</p>
            <p className="text-gray-400 mt-2">Active Clients</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-orange-500">95%</p>
            <p className="text-gray-400 mt-2">Automation Rate</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-orange-500">3.2x</p>
            <p className="text-gray-400 mt-2">Average ROI</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-orange-500">24/7</p>
            <p className="text-gray-400 mt-2">System Uptime</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/automation" target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 px-12 py-6 text-lg font-semibold"
            >
              Explore All Services →
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Free AI opportunity audit for qualified businesses
          </p>
        </motion.div>
      </div>
    </section>
  );
};
