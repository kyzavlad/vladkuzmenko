'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { CheckCircle, ShoppingCart, Star, Users, Trophy, Zap, BookOpen, Target, Brain, Rocket, TrendingUp, Award, DollarSign, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { SmartRecommendation } from './SmartRecommendation';
import { useCart } from '../context/cart-context';
import { useToast } from '../hooks/use-toast';

// Campus data
const campuses = [
  { 
    title: 'AI & Automation Mastery', 
    description: 'Build intelligent systems that work 24/7. Master prompt engineering, workflow automation, and API integration.',
    icon: <Zap className="h-8 w-8 text-[#D4AF37]" />,
    modules: 12,
    duration: '8 weeks'
  },
  { 
    title: 'Content Creation Empire', 
    description: 'Turn content into currency. Master viral storytelling, video production, and audience psychology.',
    icon: <Target className="h-8 w-8 text-[#D4AF37]" />,
    modules: 10,
    duration: '6 weeks'
  },
  { 
    title: 'Sales Psychology', 
    description: 'Close deals like a master. Learn advanced persuasion, objection handling, and value communication.',
    icon: <Trophy className="h-8 w-8 text-[#D4AF37]" />,
    modules: 8,
    duration: '4 weeks'
  },
  { 
    title: 'E-commerce Domination', 
    description: 'Build stores that print money. Product research, paid ads mastery, and scaling strategies.',
    icon: <ShoppingCart className="h-8 w-8 text-[#D4AF37]" />,
    modules: 15,
    duration: '10 weeks'
  },
  { 
    title: 'Warrior Mindset', 
    description: 'Forge unbreakable discipline. Peak performance protocols, time mastery, and mental fortitude.',
    icon: <BookOpen className="h-8 w-8 text-[#D4AF37]" />,
    modules: 6,
    duration: '4 weeks'
  },
  { 
    title: 'Wealth Building', 
    description: 'Master money like the elite. Investment strategies, market psychology, and wealth preservation.',
    icon: <Users className="h-8 w-8 text-[#D4AF37]" />,
    modules: 12,
    duration: '8 weeks'
  },
];

// Success Journey Steps
const journeySteps = [
  {
    phase: "Foundation",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Master the Fundamentals",
    description: "Learn battle-tested strategies from real entrepreneurs",
    features: ["Live weekly calls", "24/7 community support", "Proven frameworks"]
  },
  {
    phase: "Implementation",
    icon: <Rocket className="w-6 h-6" />,
    title: "Launch Your Empire",
    description: "Apply what you learn with step-by-step guidance",
    features: ["Done-for-you templates", "Personal mentorship", "Real-world projects"]
  },
  {
    phase: "Scaling",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Accelerate Growth",
    description: "Scale your business to 6-7 figures and beyond",
    features: ["Advanced strategies", "Network access", "Funding opportunities"]
  },
  {
    phase: "Mastery",
    icon: <Award className="w-6 h-6" />,
    title: "Achieve Freedom",
    description: "Build passive income and live life on your terms",
    features: ["Exit strategies", "Wealth preservation", "Legacy building"]
  }
];

// Platform Benefits
const platformBenefits = [
  {
    icon: <Clock className="w-8 h-8 text-amber-400" />,
    title: "Lifetime Access",
    description: "Never pay again. Get all future updates and new courses forever."
  },
  {
    icon: <Shield className="w-8 h-8 text-amber-400" />,
    title: "30-Day Guarantee",
    description: "Not satisfied? Get a full refund within 30 days, no questions asked."
  },
  {
    icon: <Users className="w-8 h-8 text-amber-400" />,
    title: "Elite Network",
    description: "Connect with 10,000+ successful entrepreneurs worldwide."
  },
  {
    icon: <DollarSign className="w-8 h-8 text-amber-400" />,
    title: "ROI Focused",
    description: "Average student makes back investment within 60 days."
  }
];

// Success Statistics
const successStats = [
  { value: "$2.3M", label: "Average Annual Revenue", description: "per advanced student" },
  { value: "87%", label: "Success Rate", description: "students earning $10k+/mo" },
  { value: "6-12", label: "Weeks to Profit", description: "average time to first sale" },
  { value: "47+", label: "Countries", description: "global warrior community" }
];

export const EducationPlatformSection = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCampus, setSelectedCampus] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const { toast } = useToast();
  
  const theUniversityProduct = {
    id: 'university-monthly',
    name: "The University - Monthly",
    price: 97.00,
    image: '/university-preview.jpg'
  };

  const handleAddToCart = () => {
    addToCart({
      ...theUniversityProduct,
      quantity: 1
    });
    
    toast({
      title: "Added to cart!",
      description: "The University - Monthly subscription",
      duration: 3000,
    });
    
    setIsCartOpen(true);
  };

  return (
    <section id="education" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
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
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              THE <span className="gold-gradient">UNIVERSITY</span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Traditional education creates employees. We create <span className="font-bold text-foreground">empire builders</span>.
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get access to the exact systems and strategies that generate millions in revenue.
            </p>
            
            {/* Smart Recommendation Button */}
            <Button
              variant="outline"
              onClick={() => setShowRecommendation(true)}
              className="mt-6 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <Brain className="mr-2 h-4 w-4" />
              Get Personalized Campus Recommendation
            </Button>
          </motion.div>

          {/* Success Journey Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h3 className="text-3xl font-bold text-center mb-16">Your Journey to <span className="gradient-gold-text">Financial Freedom</span></h3>
            
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent transform -translate-y-1/2 hidden lg:block" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {journeySteps.map((step, index) => (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    {/* Step Number */}
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
            </div>
          </motion.div>

          {/* Success Statistics */}
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
                  <div className="text-4xl md:text-5xl font-bold gradient-gold-text mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Campus Showcase */}
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
                      <div className="flex gap-4 text-sm">
                        <span className="text-[#D4AF37]">{campus.modules} modules</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{campus.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview Card */}
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
                  <span>Lifetime access to all content</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Weekly live Q&A sessions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Private community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Direct mentor support</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$97</span>
                <span className="text-gray-400">/month</span>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black glow-effect"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                Enroll Now
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Cancel anytime. 30-day money-back guarantee.
              </p>
            </motion.div>
          </div>

          {/* Platform Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h3 className="text-3xl font-bold text-center mb-12">Why Warriors Choose <span className="gradient-gold-text">The University</span></h3>
            
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
            <h3 className="text-4xl font-bold mb-4">Ready to Level Up?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 10,000+ students who are building their empires with The University.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black px-12 py-6 text-lg glow-effect"
              onClick={handleAddToCart}
            >
              Get Instant Access - $97/month
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Smart Recommendation Modal */}
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
