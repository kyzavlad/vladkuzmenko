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
    image: '/warriors-location-1.jpg',
    rating: 5,
    text: 'From zero to $50k/month in 6 months. The AI campus alone changed my life. Vlad\'s systems are pure gold!',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Content Creator',
    company: '$25,000/mo',
    image: '/warriors-location-2.jpg',
    rating: 5,
    text: '100k followers and $25k/month. Vlad\'s automation strategies transformed my content business completely.',
  },
  {
    id: 3,
    name: 'David Thompson',
    role: 'E-commerce King',
    company: '$120,000/mo',
    image: '/warriors-location-3.jpg',
    rating: 5,
    text: 'Scaled to 7 figures in my first year. This is the real deal. Best investment I\'ve ever made!',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Sales Expert',
    company: '$80,000/mo',
    image: '/warriors-location-4.jpg',
    rating: 5,
    text: 'Closing $100k+ deals weekly now. The sales training and community support is unmatched anywhere.',
  },
  {
    id: 5,
    name: 'Michael Foster',
    role: 'SaaS Founder',
    company: '$200,000/mo',
    image: '/warriors-location-5.jpg',
    rating: 5,
    text: 'Built and scaled my SaaS to $200k MRR. The Warriors community provided everything I needed.',
  },
  {
    id: 6,
    name: 'Ryan Mitchell',
    role: 'Crypto Trader',
    company: '$150,000/mo',
    image: '/warriors-location-6.jpg',
    rating: 5,
    text: 'From broke to banking $150k monthly. The mindset shifts alone are worth 10x the investment.',
  }
];

export const TestimonialsSection = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);

  // Triple testimonials for infinite scroll
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    const scrollSpeed = 1;

    const animate = () => {
      if (!isScrolling) {
        scrollRef.current += scrollSpeed;
        
        if (scrollRef.current >= carousel.scrollWidth / 3) {
          scrollRef.current = 0;
        }
        
        carousel.scrollLeft = scrollRef.current;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isScrolling]);

  return (
    <section className="py-24 md:py-32 bg-black overflow-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Success Stories From Our <span className="gradient-gold-text">Students</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real results from real Warriors who took action and transformed their lives
          </p>
        </motion.div>

        {/* Infinite Testimonials Carousel */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsScrolling(true)}
          onMouseLeave={() => setIsScrolling(false)}
        >
          {allTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-none w-[400px] group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden h-full hover:border-amber-400/50 transition-all duration-300">
                {/* Rectangular Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Quote Icon Overlay */}
                  <Quote className="absolute top-4 right-4 w-10 h-10 text-amber-400/30" />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Name and Role */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                    <p className="text-amber-400 text-sm font-medium">{testimonial.role}</p>
                    <p className="text-2xl font-bold gradient-gold-text mt-2">{testimonial.company}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6">Ready to Level Up?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Join 10,000+ students who are building their empires with The University.
            </p>
            <Button
              size="lg"
              className="btn-premium"
            >
              Get Instant Access - $97/month
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Import Button component
import { Button } from './ui/button';
