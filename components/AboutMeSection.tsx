"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const visionCards = [
  {
    id: 1,
    title: "The Vision",
    description: "Creating a new generation of entrepreneurs who leverage AI to build empires",
    icon: "🚀",
    color: "from-gold to-gold-dark"
  },
  {
    id: 2,
    title: "The Mission",
    description: "Empowering warriors worldwide with cutting-edge tools and knowledge",
    icon: "⚔️",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 3,
    title: "The Brotherhood",
    description: "United by ambition, driven by excellence, bound by success",
    icon: "🤝",
    color: "from-red-500 to-orange-500"
  },
  {
    id: 4,
    title: "The Future",
    description: "Building tomorrow's business landscape, one warrior at a time",
    icon: "🌟",
    color: "from-green-500 to-teal-500"
  }
];

const teamImages = [
  { id: 1, src: "/images/warriors-team-1.webp", size: "large" },
  { id: 2, src: "/images/warriors-team-2.webp", size: "medium" },
  { id: 3, src: "/images/warriors-team-3.webp", size: "small" },
  { id: 4, src: "/images/warriors-team-4.webp", size: "large" },
  { id: 5, src: "/images/warriors-team-5.webp", size: "medium" },
];

export function AboutMeSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="about" className="w-full py-20 md:py-32 relative overflow-visible">
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gold-gradient">The Warrior's Path</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            More than success. More than wealth. It's about becoming the person 
            capable of achieving the impossible.
          </p>
        </motion.div>

        {/* 3D Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {visionCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                relative p-8 rounded-3xl backdrop-blur-sm overflow-hidden
                ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                ${index === 3 ? 'lg:col-span-2' : ''}
                card-3d
              `}
              style={{
                background: hoveredCard === card.id 
                  ? `linear-gradient(135deg, ${card.color.split(' ')[1]} 0%, ${card.color.split(' ')[3]} 100%)`
                  : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Floating icon */}
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  y: hoveredCard === card.id ? -10 : 0,
                  rotateZ: hoveredCard === card.id ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {card.icon}
              </motion.div>

              <h3 className="text-2xl font-bold mb-3 text-white">{card.title}</h3>
              <p className="text-gray-300">{card.description}</p>

              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at ${hoveredCard === card.id ? '50%' : '100%'} 50%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)`,
                  transition: 'all 0.5s ease',
                }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Gallery - Floating 3D Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[600px] overflow-visible"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Living the Vision
          </h3>
          
          <div className="relative w-full h-full">
            {teamImages.map((image, index) => {
              const positions = [
                { left: '10%', top: '20%' },
                { right: '15%', top: '10%' },
                { left: '30%', bottom: '20%' },
                { right: '25%', bottom: '15%' },
                { left: '50%', top: '40%', transform: 'translate(-50%, -50%)' },
              ];

              const sizes = {
                large: 'w-80 h-80',
                medium: 'w-64 h-64',
                small: 'w-48 h-48',
              };

              return (
                <motion.div
                  key={image.id}
                  className={`absolute ${sizes[image.size as keyof typeof sizes]} floating-card`}
                  style={{
                    ...positions[index],
                    '--float-delay': `${index * 0.5}s`,
                  } as any}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 180,
                    zIndex: 50,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden premium-shadow">
                    {/* Front side */}
                    <div className="absolute inset-0">
                      <Image
                        src={image.src}
                        alt="Warriors Team"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Back side */}
                    <div 
                      className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center p-6"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <p className="text-black font-bold text-center">
                        "Success is not a destination, it's a way of life"
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-32 text-center"
        >
          <div className="card-premium p-12">
            <h3 className="text-3xl font-bold mb-6 gold-gradient">Our Philosophy</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We don't just teach business. We forge warriors. Men and women who understand 
              that true success comes from within - from discipline, vision, and relentless execution.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              The Warriors movement isn't about quick wins or shortcuts. It's about building 
              something that lasts. Something that matters. Something that changes the world.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Parallax decorative elements */}
      <motion.div
        style={{ y }}
        className="absolute -z-10 top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(y, (val) => val * -1) }}
        className="absolute -z-10 bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
      />
    </section>
  );
}
