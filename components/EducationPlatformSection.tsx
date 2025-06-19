'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export const EducationPlatformSection = () => {
  const campuses = [
    {
      title: "AI Development",
      description: "Learn to build AI systems that power modern business. No prior experience needed.",
    },
    {
      title: "Content & Branding",
      description: "Master the art of attention. Build a content machine that works for you 24/7.",
    },
    {
      title: "Sales & Persuasion",
      description: "Learn the frameworks that close high-ticket deals. Master the psychology of selling.",
    },
    {
      title: "E-commerce",
      description: "Build, scale, and automate your own e-commerce empire from scratch.",
    },
    {
      title: "Mindset & Discipline",
      description: "Develop the mental fortitude, discipline, and framework required to win in any environment.",
    },
    {
      title: "Financial Markets",
      description: "Understand how money really works and learn the strategies to make it work for you.",
    },
  ];

  const features = [
    { icon: "📹", text: "Video Lessons" },
    { icon: "💬", text: "Live Q&A Sessions" },
    { icon: "👥", text: "Private Community" },
    { icon: "🎓", text: "Expert Instructors" },
  ];

  return (
    <section id="education" className="py-20 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">THE UNIVERSITY</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Traditional education is a scam. It teaches you to be a cog in the machine. Here, we teach you how to build the 
            machine. We provide you with the knowledge required to become wealthy, independent, and free.
          </p>
        </div>

        {/* Campuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {campuses.map((campus, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-zinc-600 transition-colors">
              <h3 className="text-2xl font-bold mb-4">{campus.title}</h3>
              <p className="text-gray-400">{campus.description}</p>
            </div>
          ))}
        </div>

        {/* What's Inside */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-8">What's Inside?</h3>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-lg">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-3xl font-bold mb-2">$97/month</p>
          <p className="text-gray-400 mb-8">Cancel anytime. No contracts.</p>
          <Link href="/education-waitlist">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg">
              Join The Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
