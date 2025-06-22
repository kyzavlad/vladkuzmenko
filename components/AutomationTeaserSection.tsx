'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Zap, BrainCircuit, LineChart, Phone, MessageSquare, Video, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const automationOffers = [
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "AI Chat Assistants",
    description: "24/7 customer support that never sleeps",
    features: ["Instant responses", "Multi-language", "Lead qualification"]
  },
  {
    icon: <Phone className="w-8 h-8" />,
    title: "Voice AI Agents",
    description: "Human-like phone conversations at scale",
    features: ["Natural speech", "Appointment booking", "Follow-ups"]
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: "Content Automation",
    description: "Create viral content on autopilot",
    features: ["Video editing", "Clip generation", "Multi-platform posting"]
  }
];

export const AutomationTeaserSection = () => {
  return (
    <div id="automation-teaser" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-amber-400 to-transparent blur-3xl" />
        <div className="absolute bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-radial from-yellow-600 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Automation Services</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            AI That Works While You
            <span className="gradient-gold-text"> Sleep</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transform your business with intelligent automation that handles customer interactions, 
            creates content, and scales your operations 24/7.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {automationOffers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="premium-hover bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl mb-6">
                  {offer.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>
                <p className="text-gray-400 mb-6">{offer.description}</p>
                
                <ul className="space-y-2">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {[
            { value: "10M+", label: "Messages Handled" },
            { value: "99.9%", label: "Uptime" },
            { value: "250+", label: "Happy Clients" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-gold-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-amber-400/20 to-yellow-600/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Automate Your Business?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses already using our AI automation to scale faster, 
              work smarter, and deliver exceptional customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="btn-premium"
              >
                <Link href="/automation">
                  <BrainCircuit className="w-5 h-5 mr-2" />
                  Explore Our Services
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
              >
                <a href="https://cal.com/vladkuzmenko.com/call" target="_blank" rel="noopener noreferrer">
                  <LineChart className="w-5 h-5 mr-2" />
                  Get Free Consultation
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
