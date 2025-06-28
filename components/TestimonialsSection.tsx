'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    role: 'AI Agency Owner',
    company: '$50,000/mo',
    image: '/warriors-group-photo.jpg', // ИСПРАВЛЕНО
    text: 'From zero to $50k/month in 6 months. The AI tools and strategies in this community are unmatched. Every dollar spent returned 100x.'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Content Creator',
    company: '$25,000/mo',
    image: '/team-meeting-1.webp', // ИСПРАВЛЕНО
    text: "100k followers and $25k/month. Vlad's content systems transformed my business. The ROI is absolutely insane."
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'E-commerce Expert',
    company: '$75,000/mo',
    image: '/warriors-discussion.jpg', // ИСПРАВЛЕНО
    text: 'Scaled from $5k to $75k/month using these strategies. The automation systems alone saved me 40 hours per week.'
  },
  {
    id: 4,
    name: 'Michael Foster',
    role: 'SaaS Founder',
    company: '$200,000/mo',
    image: '/warriors-leaders.jpg', // ИСПРАВЛЕНО
    text: 'Built a $200k/month SaaS in under a year. The network and knowledge here is worth millions. Best investment ever.'
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Crypto Trader',
    company: '$150,000/mo',
    image: '/team-success-1.webp', // ИСПРАВЛЕНО
    text: 'The trading strategies and AI tools helped me reach $150k/month consistently. Life-changing community.'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Digital Nomad',
    company: '$40,000/mo',
    image: '/warriors-yacht-meeting.jpg', // ИСПРАВЛЕНО
    text: 'Living the dream while earning $40k/month. The freedom this knowledge provides is priceless.'
  }
];

export const TestimonialsSection = () => {
  // Дублируем массив для создания идеальной петли анимации
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* ИСПРАВЛЕНО: Плавный переход сверху УДАЛЕН */}
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-title-wrapper" data-title="Social Proof">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Real Results From <span className="gradient-gold-text">Warriors</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Students achieving life-changing results with our proven systems
          </p>
        </motion.div>
      </div>

      {/* ИСПРАВЛЕНО: Бесконечная CSS-карусель БЕЗ вертикального скролла и пустого начала */}
      <div
        className="w-full inline-flex flex-nowrap overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <ul className="flex items-stretch justify-center md:justify-start [&_li]:mx-4 animate-infinite-scroll [animation-direction:reverse] hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <li key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-[400px]">
              <div className="h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-400/50" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic flex-grow">"{testimonial.text}"</p>
                  <div className="border-t border-gray-800 pt-4 mt-auto">
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-amber-400 font-bold">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
