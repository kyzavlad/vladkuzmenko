'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Используем Image из next/image
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const instagramPosts = [
  { id: 1, image: '/warriors-yacht-meeting.jpg', caption: 'Strategy on the high seas ⛵' },
  { id: 2, image: '/warriors-group-photo.jpg', caption: 'Warriors unite for success 🏆' },
  { id: 3, image: '/warriors-leaders.jpg', caption: 'Leadership summit 2024 💪' },
  { id: 4, image: '/warriors-members-lounge.jpg', caption: 'Exclusive members lounge 🏛️' },
  { id: 5, image: '/warriors-video-preview.jpg', caption: 'Behind the scenes 🎬' },
  { id: 6, image: '/warriors-discussion.jpg', caption: 'Mastermind sessions 🧠' },
  { id: 7, image: '/warriors-location-7.jpg', caption: 'Innovation meets execution 🚀' },
  { id: 8, image: '/warriors-location-8.jpg', caption: 'Building tomorrow today 🔮' },
  { id: 9, image: '/team-meeting-1.webp', caption: 'Success mindset workshop 📚' },
  { id: 10, image: '/team-success-1.webp', caption: 'Case study presentation 📊' },
];

export const InstagramSection = () => {
  // Дублируем массив для создания идеальной петли анимации
  const duplicatedPosts = [...instagramPosts, ...instagramPosts];

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* ИСПРАВЛЕНО: Плашка "Follow The Journey" полностью удалена */}
          <div className="section-title-wrapper" data-title="Behind The Success">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Behind The <span className="gradient-gold-text">Success</span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get exclusive insights into the Warriors lifestyle and community
          </p>
        </motion.div>
      </div>

      {/* ИСПРАВЛЕНО: Настоящая бесконечная и зацикленная CSS-карусель */}
      <div
        className="w-full flex-nowrap overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
      >
        <ul className="flex items-center justify-start animate-infinite-scroll hover:[animation-play-state:paused]">
          {duplicatedPosts.map((post, index) => (
            <li key={`${post.id}-${index}`} className="flex-shrink-0 w-[300px] group mx-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group-hover:border-amber-400/50 transition-colors duration-300">
                {/* ИСПРАВЛЕНО: Image теперь корректно заполняет всю карточку */}
                <Image
                  src={post.image}
                  alt={post.caption}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium mb-2">{post.caption}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {Math.floor(Math.random() * 900 + 100)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {Math.floor(Math.random() * 50 + 10)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
        >
          <a href="https://instagram.com/vladkuzmenkosxy" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 mr-2" />
            Follow @vladkuzmenkosxy
          </a>
        </Button>
      </motion.div>
    </section>
  );
};
