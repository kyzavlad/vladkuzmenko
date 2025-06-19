'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter } from 'lucide-react';

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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black to-zinc-950 section-transition">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Левая часть - Instagram коллаж */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
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
            
            {/* Instagram handle */}
            <div className="mt-6 text-center">
              <a href="https://instagram.com/vladkuzmenko" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="font-semibold">@vladkuzmenko</span>
              </a>
            </div>
          </motion.div>

          {/* Правая часть - Информация */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-heading uppercase">
              The <span className="text-orange-500">Architect</span> of Success
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                From the streets of Ukraine to building multi-million dollar systems, I've cracked the code on 
                what separates the winners from the wannabes.
              </p>
              
              <p className="text-lg leading-relaxed">
                Today, I run multiple 7-figure businesses, lead the Warriors Team community of 3,500+ elite men, 
                and teach entrepreneurs how to build unstoppable AI-powered systems.
              </p>

              <p className="text-lg leading-relaxed">
                My mission is simple: <span className="text-white font-semibold">Create 1,000 millionaires</span> by 
                sharing the exact systems and strategies that transformed my life.
              </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-orange-500">$10M+</p>
                <p className="text-sm text-gray-400">Revenue Generated</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-orange-500">3,500+</p>
                <p className="text-sm text-gray-400">Warriors Team Members</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-orange-500">100K+</p>
                <p className="text-sm text-gray-400">Students Worldwide</p>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="flex gap-4 pt-6">
              <a href="#" className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
