'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Award, Target, Zap } from 'lucide-react';
import { LiveRevenueCounter } from './LiveRevenueCounter';

const instagramPosts = [
  { id: 1, image: '/instagram-1.jpg', likes: '12.4K', caption: 'Building empires...' },
  { id: 2, image: '/instagram-2.jpg', likes: '8.7K', caption: 'Warriors meeting in Dubai' },
  { id: 3, image: '/instagram-3.jpg', likes: '15.2K', caption: 'New AI system launched' },
  { id: 4, image: '/instagram-4.jpg', likes: '9.8K', caption: 'Training session' },
  { id: 5, image: '/instagram-5.jpg', likes: '11.3K', caption: 'Closing deals' },
  { id: 6, image: '/instagram-6.jpg', likes: '13.6K', caption: 'Team expansion' },
];

export const AboutMeSection = () => {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-[#FFD700] to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#FFC107] to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              THE <span className="gold-gradient">ARCHITECT</span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              From zero to building multi-million dollar systems
            </p>
          </div>

          {/* Content Grid */}
          <div className="space-y-24">
            {/* Section 1 - Story */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#FFD700]/10 rounded-lg">
                    <Award className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">The Journey</h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  From the streets of Ukraine to building <span className="font-bold text-foreground">multi-million dollar systems</span>, 
                  I've cracked the code on what separates the <span className="font-bold text-foreground">winners</span> from the wannabes.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Today, I run <span className="font-bold text-foreground">multiple 7-figure businesses</span>, 
                  lead the Warriors Team community of <span className="font-bold text-foreground">3,500+ elite men</span>, 
                  and teach entrepreneurs how to build unstoppable AI-powered systems.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  My mission is simple: Create <span className="font-bold text-foreground gold-gradient">1,000 millionaires</span> by 
                  sharing the exact systems and strategies that transformed my life.
                </p>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 to-[#FFC107]/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                <div className="relative">
                  <LiveRevenueCounter />
                </div>
              </div>
            </motion.div>

            {/* Section 2 - Instagram Grid */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative group md:order-1">
                <div className="grid grid-cols-3 gap-4">
                  {instagramPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative aspect-square overflow-hidden rounded-lg hover-lift cursor-pointer"
                    >
                      <Image
                        src={post.image}
                        alt={post.caption}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="text-sm font-semibold">❤️ {post.likes}</p>
                          <p className="text-xs">{post.caption}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="https://instagram.com/vladkuzmenko" target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFC107] transition-colors">
                    <Instagram className="h-5 w-5" />
                    <span className="font-semibold">@vladkuzmenko</span>
                  </a>
                </div>
              </div>

              <div className="space-y-6 md:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#FFC107]/10 rounded-lg">
                    <Zap className="h-8 w-8 text-[#FFC107]" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">The Systems</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <h4 className="font-bold mb-2">AI Automation Agency</h4>
                    <p className="text-sm text-muted-foreground">300+ businesses transformed with AI</p>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <h4 className="font-bold mb-2">The University</h4>
                    <p className="text-sm text-muted-foreground">10,000+ students building empires</p>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <h4 className="font-bold mb-2">Warriors Team</h4>
                    <p className="text-sm text-muted-foreground">3,500+ elite men worldwide</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <a href="#" className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors holographic">
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a href="#" className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors holographic">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors holographic">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
