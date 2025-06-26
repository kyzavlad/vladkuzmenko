"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ 10 Изображений с правильными путями
const instagramPosts = [
  { id: 1, image: "/warriors-group-photo.jpg", caption: "Building The Future Together" },
  { id: 2, image: "/warriors-discussion.jpg", caption: "Strategy & Execution" },
  { id: 3, image: "/warriors-leaders.jpg", caption: "Leadership in Action" },
  { id: 4, image: "/team-meeting-1.webp", caption: "Innovation Session" },
  { id: 5, image: "/vlad-speaking-on-stage.jpg", caption: "Sharing Knowledge" },
  { id: 6, image: "/business-lunch.jpg", caption: "Deals & Partnerships" },
  { id: 7, image: "/warriors-yacht-meeting.jpg", caption: "Elite Mastermind" },
  { id: 8, image: "/team-training-1.webp", caption: "Leveling Up" },
  { id: 9, image: "/c21e3d219043635.67ab7c0a251c8.webp", caption: "High-Performance Lifestyle" },
  { id: 10, image: "/1.webp", caption: "Focused on The Vision" },
];

export function AboutMeSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    // ✅ Убраны z-index и отрицательные отступы, чтобы решить проблему наложения
    <section id="about" className="w-full py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gold-gradient">About Vlad</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Entrepreneur, innovator, and leader of the Warriors movement. 
            Building tomorrow's business empires through AI and automation.
          </p>
        </motion.div>
      </div>

      {/* ✅ ПОЛНОСТЬЮ ПЕРЕРАБОТАННАЯ КАРУСЕЛЬ */}
      <div className="w-full relative group">
        {/* Градиент слева для плавного исчезновения */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        {/* Градиент справа для плавного исчезновения */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4"
          style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
        >
          {/* Пустой div для отступа слева */}
          <div className="snap-center shrink-0 w-4 md:w-16" />

          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex-shrink-0 w-[70vw] sm:w-[350px] snap-center"
            >
              <div className="relative rounded-2xl overflow-hidden premium-shadow aspect-[4/5] transition-all duration-300 ease-in-out hover:scale-[1.03]">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 640px) 70vw, 350px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-5">
                  <p className="text-white font-semibold text-base md:text-lg line-clamp-2">{post.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Пустой div для отступа справа */}
          <div className="snap-center shrink-0 w-4 md:w-16" />
        </div>
        
        {/* Кнопки навигации */}
        <button onClick={() => scroll('left')} className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => scroll('right')} className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bio Section - контент не изменен */}
      <div className="container mx-auto px-4 mt-20 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">The Journey</h3>
              <p className="text-gray-400 leading-relaxed">
                From humble beginnings to building a multi-million dollar empire, 
                Vlad Kuzmenko's journey is a testament to the power of vision, 
                persistence, and innovation.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Today, he leads the Warriors movement - a global community of 
                entrepreneurs and innovators who are reshaping the business landscape 
                through AI and automation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card-premium p-6 text-center"><h4 className="text-4xl font-bold gold-gradient mb-2">50K+</h4><p className="text-gray-400">Warriors Worldwide</p></div>
              <div className="card-premium p-6 text-center"><h4 className="text-4xl font-bold gold-gradient mb-2">$10M+</h4><p className="text-gray-400">Generated Revenue</p></div>
              <div className="card-premium p-6 text-center"><h4 className="text-4xl font-bold gold-gradient mb-2">15+</h4><p className="text-gray-400">Countries Reached</p></div>
              <div className="card-premium p-6 text-center"><h4 className="text-4xl font-bold gold-gradient mb-2">24/7</h4><p className="text-gray-400">Community Support</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
