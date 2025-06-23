'use client';

import React from 'react';
import { motion } from 'framer-motion';

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


        </motion.div>
      </div>
    </section>
  );
};
