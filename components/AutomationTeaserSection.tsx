'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export const AutomationTeaserSection = () => {
  const benefits = [
    {
      title: "24/7 Customer Engagement",
      description: "AI agents that never sleep, handling inquiries and converting leads around the clock.",
    },
    {
      title: "Exponential Efficiency",
      description: "Automate 80% of repetitive tasks, freeing your team to focus on growth.",
    },
    {
      title: "Predictable Revenue",
      description: "Turn your business into a machine with consistent, scalable systems.",
    },
    {
      title: "Competitive Advantage",
      description: "Deploy cutting-edge AI before your competitors even know it exists.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-zinc-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-blue-500 font-semibold mb-4">🚀 LIMITED EARLY ACCESS</p>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">AI AUTOMATION FOR BUSINESS</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            For established businesses ready to implement the systems that drive exponential growth. We 
            don't just provide tools; we re-architect your operations for maximum efficiency and profitability.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mb-16">
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-500">95%</p>
            <p className="text-gray-400">Task Automation</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-500">75%</p>
            <p className="text-gray-400">Cost Reduction</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-500">300+</p>
            <p className="text-gray-400">Active Clients</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/automation" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg">
              Explore Services →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
