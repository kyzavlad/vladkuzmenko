"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const instagramPosts = [
  {
    id: 1,
    image: "/images/vlad-post-1.webp",
    caption: "Building the future of business with AI 🚀",
    date: "2025/02/10"
  },
  {
    id: 2,
    image: "/images/vlad-post-2.webp", 
    caption: "Success is a journey, not a destination 💪",
    date: "2025/03/21"
  },
  {
    id: 3,
    image: "/images/vlad-post-3.webp",
    caption: "Warriors Team conquering new heights 🏆",
    date: "2025/04/19"
  },
  {
    id: 4,
    image: "/images/vlad-post-4.webp",
    caption: "Innovation meets execution 💡",
    date: "2025/06/14"
  },
  {
    id: 5,
    image: "/images/vlad-post-5.webp",
    caption: "Creating value through technology 🔥",
    date: "2025/03/07"
  }
];

export function AboutMeSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="w-full py-20 md:py-32 relative">
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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

      {/* Full-width Instagram Gallery */}
      <div className="carousel-container">
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-[calc((100vw-1200px)/2)] snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[350px] snap-center"
              >
                <div className="instagram-post group relative rounded-2xl overflow-hidden premium-shadow">
                  <div className="aspect-square relative">
                    <Image
                      src={post.image}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="instagram-post-overlay" />
                    
                    {/* Caption on Hover */}
                    <div className="instagram-post-caption">
                      <p className="text-white font-medium text-lg mb-2">
                        {post.caption}
                      </p>
                      <p className="text-gray-300 text-sm">{post.date}</p>
                    </div>

                    {/* Instagram Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="container mx-auto px-4 mt-20">
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
              <div className="card-premium p-6 text-center">
                <h4 className="text-4xl font-bold gold-gradient mb-2">50K+</h4>
                <p className="text-gray-400">Warriors Worldwide</p>
              </div>
              <div className="card-premium p-6 text-center">
                <h4 className="text-4xl font-bold gold-gradient mb-2">$10M+</h4>
                <p className="text-gray-400">Generated Revenue</p>
              </div>
              <div className="card-premium p-6 text-center">
                <h4 className="text-4xl font-bold gold-gradient mb-2">15+</h4>
                <p className="text-gray-400">Countries Reached</p>
              </div>
              <div className="card-premium p-6 text-center">
                <h4 className="text-4xl font-bold gold-gradient mb-2">24/7</h4>
                <p className="text-gray-400">Community Support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
