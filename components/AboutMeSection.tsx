"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- ИСПОЛЬЗУЕМ ВАШИ КАРТИНКИ С ПРАВИЛЬНЫМИ ПУТЯМИ ---
const instagramPosts = [
  { id: 1, image: "/warriors-group-photo.jpg", caption: "Building the future of business with AI 🚀", date: "2025/02/10" },
  { id: 2, image: "/warriors-discussion.jpg", caption: "Success is a journey, not a destination 💪", date: "2025/03/21" },
  { id: 3, image: "/warriors-leaders.jpg", caption: "Warriors Team conquering new heights 🏆", date: "2025/04/19" },
  { id: 4, image: "/vlad-speaking-on-stage.jpg", caption: "Innovation meets execution 💡", date: "2025/06/14" },
  { id: 5, image: "/business-lunch.jpg", caption: "Creating value through technology 🔥", date: "2025/03/07" }
];

export function AboutMeSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.9;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="w-full py-20 md:py-32 relative overflow-hidden">
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

      {/* --- ПОЛНОСТЬЮ ПЕРЕРАБОТАННАЯ КАРУСЕЛЬ --- */}
      <div className="w-full relative">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-24"
          style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
        >
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[80vw] sm:w-[400px] snap-center"
            >
              <div className="instagram-post group relative rounded-2xl overflow-hidden premium-shadow aspect-[4/5]">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="instagram-post-overlay" />
                <div className="instagram-post-caption">
                  <p className="text-white font-semibold text-lg">{post.caption}</p>
                  <p className="text-gray-300 text-sm mt-1">{post.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Кнопки навигации */}
        <button onClick={() => scroll('left')} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => scroll('right')} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bio Section */}
      <div className="container mx-auto px-4 mt-24 md:mt-32">
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
