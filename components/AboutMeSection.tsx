'use client';

import React from 'react';
import { motion } from 'framer-motion';

const instagramPosts = [
  {
    id: 1,
    image: '/team-meeting-1.webp',
    caption: 'Building the future with Warriors Team 🚀'
  },
  {
    id: 2,
    image: '/team-success-1.webp',
    caption: 'Another milestone achieved! 💪'
  },
  {
    id: 3,
    image: '/team-training-1.webp',
    caption: 'Never stop learning and growing 📚'
  },
  {
    id: 4,
    image: '/warriors-yacht-meeting.jpg',
    caption: 'Strategy session on the high seas ⛵'
  },
  {
    id: 5,
    image: '/warriors-group-photo.jpg',
    caption: 'Warriors unite for success 🏆'
  }
];

export const AboutMeSection = () => {
  return (
    <section className="py-24 md:py-32 gradient-section relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Meet <span className="gradient-gold-text">Vlad Kuzmenko</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Entrepreneur, AI Pioneer, and Leader of the Warriors Movement
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold">
                From Vision to <span className="gradient-gold-text">Reality</span>
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                My journey began with a simple belief: that technology should empower people, 
                not replace them. Today, I lead a global movement of entrepreneurs who are 
                reshaping the business landscape through AI and automation.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                The Warriors Team isn't just about business success—it's about creating a 
                community where innovation meets execution, where dreams transform into 
                sustainable enterprises.
              </p>

              <div className="space-y-4 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">01</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Visionary Leadership</h4>
                    <p className="text-gray-400">
                      Guiding entrepreneurs to leverage AI for exponential growth
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">02</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Community First</h4>
                    <p className="text-gray-400">
                      Building a brotherhood of success-driven individuals worldwide
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">03</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Proven Results</h4>
                    <p className="text-gray-400">
                      Transforming ideas into profitable ventures through strategic automation
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden glow-effect">
                <img
                  src="/warriors-leaders.jpg"
                  alt="Vlad Kuzmenko"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-black/90 backdrop-blur-xl border border-amber-400/30 rounded-xl p-6"
              >
                <div className="text-3xl font-bold gradient-gold-text">15+</div>
                <div className="text-gray-400 text-sm">Countries Reached</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -top-6 -right-6 bg-black/90 backdrop-blur-xl border border-amber-400/30 rounded-xl p-6"
              >
                <div className="text-3xl font-bold gradient-gold-text">24/7</div>
                <div className="text-gray-400 text-sm">Community Support</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Instagram Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              Follow The <span className="gradient-gold-text">Journey</span>
            </h3>
            
            <div className="instagram-grid">
              {instagramPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="instagram-post group cursor-pointer"
                >
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{post.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <a
                href="https://instagram.com/vladkuzmenko"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Follow @vladkuzmenko</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
