'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Crown, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function MensCommunitySection() {
  return (
    <div id="warriors-team" className="w-full min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-[#D4AF37] to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#B8860B] to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-8">
              <Flame className="h-5 w-5 text-[#D4AF37] animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider">Elite Brotherhood</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              WARRIORS <span className="gold-gradient">TEAM</span>
            </h2>
            
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Where ambitious men forge unbreakable bonds and build empires together.
            </p>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              3,500+ elite men worldwide pushing boundaries and achieving the impossible.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover-lift holographic"
            >
              <Crown className="h-16 w-16 text-[#D4AF37] mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Elite Mentorship</h3>
              <p className="text-gray-400">
                Direct access to millionaire mentors who've built multiple successful businesses
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover-lift holographic"
            >
              <Users className="h-16 w-16 text-[#D4AF37] mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Global Network</h3>
              <p className="text-gray-400">
                Connect with driven entrepreneurs from every corner of the world
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover-lift holographic"
            >
              <Flame className="h-16 w-16 text-[#D4AF37] mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Daily Accountability</h3>
              <p className="text-gray-400">
                Push yourself beyond limits with brothers who hold you to the highest standards
              </p>
            </motion.div>
          </div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-24"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl premium-shadow">
              <Image
                src="/warriors-group-photo.jpg"
                alt="Warriors Team Meeting"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl premium-shadow">
              <Image
                src="/warriors-yacht-meeting.jpg"
                alt="Warriors Yacht Meeting"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl premium-shadow">
              <Image
                src="/warriors-leaders.jpg"
                alt="Warriors Leaders"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* What You Get */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-3xl p-12 border border-zinc-800 mb-24"
          >
            <h3 className="text-3xl font-bold text-center mb-12">What You Get as a Warrior</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Weekly Mastermind Calls</h4>
                    <p className="text-gray-400 text-sm">Strategy sessions with successful entrepreneurs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Private Community</h4>
                    <p className="text-gray-400 text-sm">Get instant help and feedback anytime</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Exclusive Events</h4>
                    <p className="text-gray-400 text-sm">Private meetups in major cities worldwide</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Business Partnerships</h4>
                    <p className="text-gray-400 text-sm">Find co-founders and business partners</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Fitness Challenges</h4>
                    <p className="text-gray-400 text-sm">Push your physical limits with the team</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Investment Opportunities</h4>
                    <p className="text-gray-400 text-sm">Access to exclusive deals and ventures</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <h3 className="text-4xl font-bold mb-6">Ready to Join the Elite?</h3>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              This isn't for everyone. Only those committed to excellence need apply.
            </p>
            
            <Link href="/warriors-team" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black px-12 py-6 text-xl font-bold glow-effect premium-shadow"
              >
                Apply to Join Warriors Team
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500 mt-6">
              Limited spots available • Application required • $297/month
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Smooth transition to next section */}
      <div className="section-transition" />
    </div>
  );
}
