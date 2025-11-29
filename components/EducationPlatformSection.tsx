'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  CheckCircle,
  ShoppingCart,
  Users,
  Trophy,
  Zap,
  BookOpen,
  Target,
  Brain,
  Rocket,
  TrendingUp,
  Award,
  DollarSign,
  Clock,
  Shield,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SmartRecommendation } from './SmartRecommendation';
import { useCart } from '../context/cart-context';
import { useToast } from '../hooks/use-toast';

// Core campuses
const campuses = [
  {
    title: 'AI & Automation Systems',
    description:
      'Build real automations for clients and your own projects: AI agents, n8n workflows, custom APIs and voice/chat assistants.',
    icon: <Zap className="h-8 w-8 text-[#D4AF37]" />,
    meta: '100+ lessons • New flows added monthly',
  },
  {
    title: 'Content Creation Empire',
    description:
      'Turn content into distribution and dealflow. Short-form systems, long-form breakdowns and TRW-style storytelling.',
    icon: <Target className="h-8 w-8 text-[#D4AF37]" />,
    meta: 'Scripts, frameworks, real case studies',
  },
  {
    title: 'Sales & Persuasion',
    description:
      'High-trust sales, offers that convert, and communication that actually closes—not cheesy tactics.',
    icon: <Trophy className="h-8 w-8 text-[#D4AF37]" />,
    meta: 'Offers, scripts, objection handling',
  },
  {
    title: 'E-commerce & Client Acquisition',
    description:
      'How to get clients and buyers with paid traffic and organic. Funnels, creatives, tracking and simple numbers.',
    icon: <ShoppingCart className="h-8 w-8 text-[#D4AF37]" />,
    meta: 'Traffic + conversion + retention',
  },
  {
    title: 'Warrior Operating System',
    description:
      'Discipline, schedule, nervous system recovery, training, and lifestyle design that lets you actually execute.',
    icon: <BookOpen className="h-8 w-8 text-[#D4AF37]" />,
    meta: 'Protocols, routines, checklists',
  },
  {
    title: 'Money & Long-Term Game',
    description:
      'Basic frameworks for money, capital allocation and long-term decisions. No fantasies, only what you can really apply.',
    icon: <Users className="h-8 w-8 text-[#D4AF37]" />,
    meta: 'Simple models for the next 5–10 years',
  },
];

// Journey steps
const journeySteps = [
  {
    phase: 'Foundation',
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Get your basics in order',
    description: 'Replace chaos with a clear weekly structure and one main path.',
    features: ['Clarity on skills', 'Weekly execution plan', 'No random courses'],
  },
  {
    phase: 'Implementation',
    icon: <Rocket className="w-6 h-6" />,
    title: 'Build your first system',
    description: 'Automation, content engine or service offer — one concrete asset.',
    features: ['Done-for-you templates', 'Real-world examples', 'Step-by-step actions'],
  },
  {
    phase: 'Scaling',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Turn it into income',
    description: 'Get clients or sales using simple, repeatable distribution.',
    features: ['Client acquisition frameworks', 'Follow-up systems', 'Profiles and funnels'],
  },
  {
    phase: 'Mastery',
    icon: <Award className="w-6 h-6" />,
    title: 'Stabilize and grow',
    description: 'Make the system boringly consistent and free your time.',
    features: ['Systems thinking', 'Delegation basics', 'Long-term positioning'],
  },
];

// Platform benefits
const platformBenefits = [
  {
    icon: <Clock className="w-8 h-8 text-amber-400" />,
    title: 'Ongoing access',
    description: 'One membership for all current and future campuses. Learn at your own rhythm.',
  },
  {
    icon: <Shield className="w-8 h-8 text-amber-400" />,
    title: 'No-nonsense content',
    description: 'Tactical videos, frameworks and checklists. No motivational fluff.',
  },
  {
    icon: <Users className="w-8 h-8 text-amber-400" />,
    title: 'Community of builders',
    description: 'People building real businesses, not arguing in comments.',
  },
  {
    icon: <DollarSign className="w-8 h-8 text-amber-400" />,
    title: 'Built to pay for itself',
    description: 'Everything is designed to help you create one working income system.',
  },
];

// Simple stats (no fake millions)
const successStats = [
  { value: '10,000+', label: 'People reached', description: 'students, clients and subscribers' },
  { value: '47+', label: 'Countries', description: 'in the extended warrior network' },
  { value: '3–12', label: 'Months', description: 'typical window to build your first system' },
  { value: '1', label: 'Ecosystem', description: 'education, agency and tools in one place' },
];

export const EducationPlatformSection = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCampus, setSelectedCampus] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const { toast } = useToast();

  const theUniversityProduct = {
    id: 'university-monthly',
    name: 'The University - Monthly',
    price: 49.0,
    image: '/university-preview.jpg',
  };

  const handleAddToCart = () => {
    addToCart({
      ...theUniversityProduct,
      quantity: 1,
    });

    toast({
      title: 'Added to cart',
      description: 'The University - Monthly membership',
      duration: 3000,
    });

    setIsCartOpen(true);
  };

  return (
    <section id="education" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-[#D4AF37] to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#B8860B] to-transparent blur-3xl" />
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
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              THE <span className="gold-gradient">UNIVERSITY</span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Practical education for people who want to build systems, not just collect theory.
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              One membership. All campuses. Real skills you can use inside your agency, e-commerce, SaaS or
              personal brand.
            </p>

            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowRecommendation(true)}
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Brain className="mr-2 h-4 w-4" />
                Get a campus recommendation
              </Button>
            </div>
          </motion.div>

          {/* Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h3 className="text-3xl font-bold text-center mb-16">
              Your path from <span className="gradient-gold-text">confusion</span> to a working system
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center font-bold text-black text-lg z-10">
                    {index + 1}
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-amber-400/50 transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4 text-amber-400">
                      {step.icon}
                    </div>

                    <span className="text-sm text-amber-400 font-medium">{step.phase}</span>
                    <h4 className="text-xl font-bold mt-2 mb-3">{step.title}</h4>
                    <p className="text-gray-400 mb-4">{step.description}</p>

                    <ul className="space-y-2">
                      {step.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {successStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-gold-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Campuses list + preview */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
            <div className="space-y-4">
              {campuses.map((campus, index) => (
                <motion.div
                  key={campus.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCampus(index)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover-lift ${
                    selectedCampus === index
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/10 border-[#D4AF37]/50'
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{campus.icon}</div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{campus.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{campus.description}</p>
                      <div className="flex gap-2 text-sm text-[#D4AF37]">
                        <span>{campus.meta}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sticky top-20 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 premium-shadow"
            >
              <div className="mb-6">{campuses[selectedCampus].icon}</div>
              <h3 className="text-3xl font-bold mb-4">{campuses[selectedCampus].title}</h3>
              <p className="text-gray-300 mb-6">{campuses[selectedCampus].description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>All current campuses included in one membership</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>New lessons and updates added regularly</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Private community and future live calls</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Designed to plug directly into your business</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-400">/month</span>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black glow-effect"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Join The University
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Cancel any time. You keep the skills and frameworks you learn.
              </p>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              Why builders choose <span className="gradient-gold-text">The University</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400/10 rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-2xl p-12 border border-[#D4AF37]/20"
          >
            <h3 className="text-4xl font-bold mb-4">You do the work. We give you the system.</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              If you can stay consistent, The University gives you the structure and tools to build something real.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black px-12 py-6 text-lg glow-effect"
                onClick={handleAddToCart}
              >
                Get instant access – $49/month
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Smart recommendation modal */}
      {showRecommendation && (
        <SmartRecommendation
          onClose={() => setShowRecommendation(false)}
          onSelect={(index) => {
            setSelectedCampus(index);
            setShowRecommendation(false);
          }}
        />
      )}
    </section>
  );
};
