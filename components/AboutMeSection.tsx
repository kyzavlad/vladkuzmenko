'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutMeSection = () => {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-black"
    >
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
              Founder of the Vlad Kuzmenko ecosystem: The University, AI Automation, Warriors Team, Content Platform & Elite Equipment
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold">
                From <span className="gradient-gold-text">zero</span> to a full ecosystem
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                I didn&apos;t start with investors, connections or a rich family. I started with a laptop, an Internet connection and the decision to build my own system instead of waiting for permission from anyone.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Today that system has grown into an ecosystem:{" "}
                <span className="text-gray-100 font-medium">
                  The University
                </span>{" "}
                for skills and structure,{" "}
                <span className="text-gray-100 font-medium">
                  AI Automation
                </span>{" "}
                for client systems,{" "}
                <span className="text-gray-100 font-medium">
                  Warriors Team
                </span>{" "}
                as a private community, a{" "}
                <span className="text-gray-100 font-medium">
                  Content Platform
                </span>{" "}
                that runs 24/7, and{" "}
                <span className="text-gray-100 font-medium">
                  Elite Equipment
                </span>{" "}
                for physical products that support the lifestyle.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Everything is connected. What works in my own systems becomes lessons, frameworks and automations inside The University and for clients. No theory for the sake of theory — only what survives real execution.
              </p>

              <div className="space-y-4 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">01</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Skin in the game</h4>
                    <p className="text-gray-400">
                      Every strategy and framework is first tested on my own brands and client systems before it ever becomes a lesson.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">02</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Execution over theory</h4>
                    <p className="text-gray-400">
                      No motivational fluff. Only processes, systems and checklists you can deploy this week to move your life and business forward.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">03</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Elite standards</h4>
                    <p className="text-gray-400">
                      Discipline, responsibility and long-term thinking. The goal is not a quick dopamine hit, but building an unfair advantage that compounds over years.
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
                <Image
                  src="/warriors-leaders.jpg"
                  alt="Vlad Kuzmenko and Warriors leaders"
                  width={900}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-black/90 backdrop-blur-xl border border-amber-400/30 rounded-xl p-6"
              >
                <div className="text-3xl font-bold gradient-gold-text">4+</div>
                <div className="text-gray-400 text-sm">
                  Core business lines inside one ecosystem
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -top-6 -right-6 bg-black/90 backdrop-blur-xl border border-amber-400/30 rounded-xl p-6"
              >
                <div className="text-3xl font-bold gradient-gold-text">1</div>
                <div className="text-gray-400 text-sm">
                  Ecosystem to escape average and build your own life system
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
