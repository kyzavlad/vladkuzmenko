'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    role: 'AI Agency Owner',
    company: '$50,000/mo',
    image: '/warriors-testimonial-1.jpg',
    text: 'From zero to $50k/month in 6 months. The AI tools and strategies in this community are unmatched. Every dollar spent returned 100x.'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Content Creator',
    company: '$25,000/mo',
    image: '/warriors-testimonial-2.jpg',
    text: '100k followers and $25k/month. Vlad\'s content systems transformed my business. The ROI is absolutely insane.'
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'E-commerce Expert',
    company: '$75,000/mo',
    image: '/warriors-testimonial-3.jpg',
    text: 'Scaled from $5k to $75k/month using these strategies. The automation systems alone saved me 40 hours per week.'
  },
  {
    id: 4,
    name: 'Michael Foster',
    role: 'SaaS Founder',
    company: '$200,000/mo',
    image: '/warriors-testimonial-4.jpg',
    text: 'Built a $200k/month SaaS in under a year. The network and knowledge here is worth millions. Best investment ever.'
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Crypto Trader',
    company: '$150,000/mo',
    image: '/warriors-testimonial-5.jpg',
    text: 'The trading strategies and AI tools helped me reach $150k/month consistently. Life-changing community.'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Digital Nomad',
    company: '$40,000/mo',
    image: '/warriors-testimonial-6.jpg',
    text: 'Living the dream while earning $40k/month. The freedom this knowledge provides is priceless.'
  }
];

export const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple testimonials for infinite scroll
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    let animationId: number;

    const animate = () => {
      if (!isPaused) {
        scrollPos += 0.5;
        if (scrollPos >= scrollContainer.scrollWidth / 3) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-title-wrapper" data-title="Real Results From Warriors">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Real Results From <span className="gradient-gold-text">Warriors</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Students achieving life-changing results with our proven systems
          </p>
        </motion.div>
      </div>

      {/* Testimonials Carousel - Full Width, NO VERTICAL SCROLL */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden overflow-y-visible"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          paddingLeft: '20px',
          paddingRight: '20px'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {allTestimonials.map((testimonial, index) => (
          <motion.div
            key={`${testimonial.id}-${index}`}
            className="flex-none w-[400px]"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 h-full">
              {/* Rectangular Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://source.unsplash.com/400x200?portrait,professional,${index}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-400/50" />
              </div>

              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>

                {/* Person Info */}
                <div className="border-t border-gray-800 pt-4">
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-amber-400 font-bold">{testimonial.company}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
