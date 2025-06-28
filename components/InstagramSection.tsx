'use client';

import React, { useRef, useState, MouseEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram, ArrowRight, Heart, MessageCircle } from 'lucide-react';

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

// Отдельный компонент для карточки поста с восстановленной логикой
const PostCard = ({ post }: { post: typeof posts[0] }) => {
    const [stats, setStats] = useState({ likes: 0, comments: 0 });

    useEffect(() => {
        // Устанавливаем начальные случайные значения
        setStats({
            likes: Math.floor(1000 + Math.random() * 9000),
            comments: Math.floor(50 + Math.random() * 950),
        });
    }, []);

    const handleMouseEnter = () => {
        // Генерируем новые случайные значения при наведении
        setStats({
            likes: Math.floor(1000 + Math.random() * 9000),
            comments: Math.floor(50 + Math.random() * 950),
        });
    };

    return (
        <li 
            className="flex-shrink-0 w-[300px] h-[400px] group relative rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-amber-400/50 hover:scale-[1.03]"
            onMouseEnter={handleMouseEnter}
        >
            <Image
              src={post.img}
              alt={post.caption}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            {/* Оверлей при наведении для отображения статистики */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-6 text-white font-semibold">
                    <div className="flex items-center gap-2">
                        <Heart className="w-6 h-6"/>
                        <span>{stats.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-6 h-6"/>
                        <span>{stats.comments.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            {/* Градиент внизу для подписи */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-white font-semibold text-lg">{post.caption}</p>
            </div>
        </li>
    );
}


export function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: MouseEvent<HTMLUListElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const onMouseLeave = () => {
    if (!scrollRef.current) return;
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const onMouseUp = () => {
    if (!scrollRef.current) return;
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const onMouseMove = (e: MouseEvent<HTMLUListElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

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

      {/* ИСПРАВЛЕНО: Карусель с drag-to-scroll и без контейнера */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto pb-10 cursor-grab"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
         <style jsx>{`
          .cursor-grab { cursor: grab; }
          .cursor-grabbing { cursor: grabbing; }
          div::-webkit-scrollbar { display: none; }
        `}</style>
        <ul
          className="flex items-center px-[calc(50vw-150px)] gap-6"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
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
