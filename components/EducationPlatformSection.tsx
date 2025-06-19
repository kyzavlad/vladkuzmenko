import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const campuses = [
  {
    title: 'AI Development',
    description: 'Learn to build the AI systems that power modern business. No prior experience needed.',
    icon: '/images/icons/ai-chip.svg', // Пример пути, замени на свой
  },
  {
    title: 'Content & Branding',
    description: 'Master the art of attention. Build a content machine that works for you 24/7.',
    icon: '/images/icons/content.svg',
  },
  {
    title: 'Sales & Persuasion',
    description: 'Learn the frameworks that close high-ticket deals. Master the psychology of selling.',
    icon: '/images/icons/sales.svg',
  },
  {
    title: 'E-commerce',
    description: 'Build, scale, and automate your own e-commerce empire from scratch.',
    icon: '/images/icons/ecommerce.svg',
  },
  {
    title: 'Mindset & Discipline',
    description: 'Develop the mental fortitude, discipline, and framework required to win in any environment.',
    icon: '/images/icons/mindset.svg',
  },
    {
    title: 'Financial Markets',
    description: 'Understand how money really works and learn the strategies to make it work for you.',
    icon: '/images/icons/finance.svg',
  },
];

export const EducationPlatformSection = () => {
  return (
    <section id="education" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-black uppercase">THE UNIVERSITY</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Traditional education is a scam. It teaches you to be a cog in the machine. Here, we teach you how to build the machine. We provide you with the knowledge required to become wealthy, independent, and free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {campuses.map((campus) => (
            <div key={campus.title} className="bg-secondary/30 p-6 rounded-lg border border-border/50">
              {/* <Image src={campus.icon} alt={campus.title} width={40} height={40} className="mb-4" /> */}
              <h3 className="text-2xl font-bold mb-2">{campus.title}</h3>
              <p className="text-muted-foreground">{campus.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold mb-8">What's Inside?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-lg">
                <div className="flex items-center gap-3"><CheckCircle className="text-primary w-6 h-6" /><span>Video Lessons</span></div>
                <div className="flex items-center gap-3"><CheckCircle className="text-primary w-6 h-6" /><span>Live Q&A Sessions</span></div>
                <div className="flex items-center gap-3"><CheckCircle className="text-primary w-6 h-6" /><span>Private Community</span></div>
                <div className="flex items-center gap-3"><CheckCircle className="text-primary w-6 h-6" /><span>Expert Instructors</span></div>
            </div>
             <div className="mt-12">
                 <Link href="/university-waitlist" passHref>
                    <Button size="lg" className="w-full sm:w-auto text-lg py-7 px-10">Join The Waitlist</Button>
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
};
