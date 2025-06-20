'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Zap, BrainCircuit, LineChart, Phone, MessageSquare, Video, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const automationOffers = [
  {
    icon: <MessageSquare className="h-10 w-10 text-[#D4AF37]" />,
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
    icon: <Phone className="h-10 w-10 text-[#D4AF37]" />,
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
    icon: <Video className="h-10 w-10 text-[#D4AF37]" />,
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
    icon: <BrainCircuit className="h-10 w-10 text-[#D4AF37]" />,
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
    <div id="automation-teaser" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-[#D4AF37] to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#B8860B] to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-[#D4AF37] font-semibold mb-4 uppercase tracking-wider">For Established Businesses</p>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              AI <span className="gold-gradient">AUTOMATION</span> AGENCY
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              We don't just implement tools. We architect <span className="font-bold text-foreground">intelligent systems</span>.
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your operations and multiply your revenue while you sleep.
            </p>
          </motion.div>

          {/* Offers Grid */}
          <div className="space-y-24">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {automationOffers.map((offer, index) => (
                <motion.div
                  key={offer.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                  <div className="relative bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 hover:border-[#D4AF37]/30 transition-all duration-300 hover-lift holographic">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        {offer.icon}
                        <h3 className="text-2xl font-bold mt-4">{offer.title}</h3>
                        <p className="text-[#D4AF37] font-semibold">{offer.subtitle}</p>
                      </div>
                      <span className="text-2xl font-bold text-[#D4AF37]">{offer.price}</span>
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
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <p className="text-5xl font-bold gold-gradient">300+</p>
                <p className="text-gray-400 mt-2">Active Clients</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold gold-gradient">95%</p>
                <p className="text-gray-400 mt-2">Automation Rate</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold gold-gradient">3.2x</p>
                <p className="text-gray-400 mt-2">Average ROI</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold gold-gradient">24/7</p>
                <p className="text-gray-400 mt-2">System Uptime</p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mt-24"
          >
            <Link href="/automation" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black px-12 py-6 text-lg font-semibold glow-effect"
              >
                Explore All Services →
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Free AI opportunity audit for qualified businesses
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Smooth transition to next section */}
      <div className="section-transition" />
    </div>
  );
};
