'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram, ArrowRight } from 'lucide-react';

// Увеличиваем количество постов для плавности бесконечной ленты
const posts = [
  { id: 1, img: '/warriors-location-1.jpg', caption: 'Strategy Session in Dubai' },
  { id: 2, img: '/warriors-location-2.jpg', caption: 'Networking in London' },
  { id: 3, img: '/warriors-location-3.jpg', caption: 'Mastermind in the Alps' },
  { id: 4, img: '/warriors-location-4.jpg', caption: 'Closing Deals in NYC' },
  { id: 5, img: '/warriors-location-5.jpg', caption: 'Building Empires Together' },
  { id: 6, img: '/warriors-location-6.jpg', caption: 'The Warriors Lifestyle' },
  { id: 7, img: '/warriors-discussion.jpg', caption: "Warriors Discussion" },
  { id: 8, img: '/warriors-members-lounge.jpg', caption: "Warriors Members Lounge" }
];

// Дублируем массив для создания бесшовной петли
const duplicatedPosts = [...posts, ...posts];

export function InstagramSection() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* ИСПРАВЛЕНО: Плашка теперь над заголовком */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
        >
          <Instagram className="h-4 w-4" />
          <span>Follow The Journey</span>
        </motion.div>

        <div className="section-title-wrapper mb-16" data-title="Behind The Success">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Behind The <span className="gradient-gold-text">Success</span>
          </h2>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto">
            Get exclusive insights into the Warriors lifestyle and community.
          </p>
        </div>
      </div>

      {/* ИСПРАВЛЕНО: Бесконечная CSS-карусель */}
      <div
        className="w-full inline-flex flex-nowrap overflow-hidden pb-10"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-infinite-scroll group-hover:pause-animation">
          {duplicatedPosts.map((post, index) => (
            <li key={index} className="flex-shrink-0 w-[300px] h-[400px] group relative rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-amber-400/50 hover:scale-105">
                {/* ИСПРАВЛЕНО: Image теперь растягивается на всю карточку */}
                <Image
                  src={post.img}
                  alt={post.caption}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white font-semibold text-lg">{post.caption}</p>
                </div>
            </li>
          ))}
        </ul>
        {/* Добавьте это в tailwind.config.ts в theme.extend.animation */}
        {/* 'infinite-scroll': 'infinite-scroll 60s linear infinite' */}
        {/* Добавьте это в tailwind.config.ts в theme.extend.keyframes */}
        {/* 'infinite-scroll': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' }, } */}
      </div>

      <div className="text-center mt-12">
        <Link href="https://instagram.com/vladkuzmenkosxy" passHref target="_blank">
          <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10">
            Follow on Instagram
            <ArrowRight className="w-4 h-4 ml-2"/>
          </Button>
        </Link>
      </div>
    </section>
  );
};
