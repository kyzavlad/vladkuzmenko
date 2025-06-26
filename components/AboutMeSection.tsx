"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ✅ 10 изображений, включая замененные 6, 7, 8, 9
const instagramPosts = [
  { id: 1, image: "/warriors-group-photo.jpg", caption: "Building The Future Together" },
  { id: 2, image: "/warriors-discussion.jpg", caption: "Strategy & Execution" },
  { id: 3, image: "/warriors-leaders.jpg", caption: "Leadership in Action" },
  { id: 4, image: "/team-meeting-1.webp", caption: "Innovation Session" },
  { id: 5, image: "/vlad-speaking-on-stage.jpg", caption: "Sharing Knowledge" },
  { id: 6, image: "/warriors-yacht-meeting.jpg", caption: "Elite Mastermind" }, // ЗАМЕНЕНО
  { id: 7, image: "/team-training-1.webp", caption: "Leveling Up The Team" }, // ЗАМЕНЕНО
  { id: 8, image: "/c21e3d219043635.67ab7c0a251c8.webp", caption: "High-Performance Lifestyle" }, // ЗАМЕНЕНО
  { id: 9, image: "/1.webp", caption: "Focused on The Vision" }, // ЗАМЕНЕНО
  { id: 10, image: "/business-lunch.jpg", caption: "Deals & Partnerships" },
];

// Дублируем массив для создания бесшовной ленты
const duplicatedPosts = [...instagramPosts, ...instagramPosts];

export function AboutMeSection() {
  return (
    // ✅ Полностью переработанная секция для решения проблемы наложения
    <section id="about" className="w-full py-20 md:py-32 bg-black overflow-hidden">
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

      {/* ✅ БЕСКОНЕЧНАЯ АНИМИРОВАННАЯ КАРУСЕЛЬ */}
      <div
        className="w-full inline-flex flex-nowrap overflow-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]"
      >
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll">
          {duplicatedPosts.map((post, index) => (
            <li key={index}>
              <div className="relative rounded-2xl overflow-hidden premium-shadow aspect-[4/5] w-[300px] h-[375px] transition-all duration-300 ease-in-out hover:scale-[1.03]">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-5">
                  <p className="text-white font-semibold text-base md:text-lg line-clamp-2">{post.caption}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bio Section - контент не изменен, но теперь он гарантированно не будет обрезан */}
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
