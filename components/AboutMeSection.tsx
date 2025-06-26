"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

// ✅ Обновленный список изображений (10 штук, правильные пути)
const instagramPosts = [
  { id: 1, image: "/warriors-group-photo.jpg", caption: "Team Empowerment", date: "2024/01/15" },
  { id: 2, image: "/warriors-discussion.jpg", caption: "Strategic Planning", date: "2024/02/20" },
  { id: 3, image: "/warriors-leaders.jpg", caption: "Leadership Excellence", date: "2024/03/25" },
  { id: 4, image: "/team-meeting-1.webp", caption: "Collaborative Sessions", date: "2024/04/30" },
  { id: 5, image: "/vlad-speaking-event.webp", caption: "Inspiring Audiences", date: "2024/05/05" },
  { id: 6, image: "/networking-event.webp", caption: "Building Connections", date: "2024/06/10" },
  { id: 7, image: "/workspace-setup.webp", caption: "Focused Productivity", date: "2024/07/15" },
  { id: 8, image: "/success-celebration.webp", caption: "Celebrating Milestones", date: "2024/08/20" },
  { id: 9, image: "/innovation-lab.webp", caption: "Driving Innovation", date: "2024/09/25" },
  { id: 10, image: "/mentorship-session.webp", caption: "Guiding the Future", date: "2024/10/30" },
];

const DISTANCE = 300;

export function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setInstance(containerRef.current);
    }
  }, []);

  const { scrollXProgress } = useScroll({
    container: instance,
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollXProgress, (progress) => {
    return isMobile ? -(progress * (DISTANCE * (instagramPosts.length - 1))) : -(progress * DISTANCE * instagramPosts.length);
  });

  return (
    <section id="about" className="w-full py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 mb-16 relative z-10">
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

      {/* ✅ Зацикленная карусель */}
      <div className="relative w-full overflow-hidden">
        <motion.div ref={containerRef} className="absolute top-0 left-0 w-fit h-full">
          <motion.div
            style={{ x }}
            className="flex w-fit h-full"
          >
            {[...instagramPosts, ...instagramPosts].map((post) => (
              <motion.div key={post.id} className="relative w-[280px] h-[350px] md:w-[350px] md:h-[450px] mr-4 md:mr-8 rounded-lg overflow-hidden shadow-xl premium-shadow">
                <Image src={post.image} alt={post.caption} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-end p-4">
                  <motion.p className="text-white font-semibold text-lg line-clamp-2">{post.caption}</motion.p>
                  <motion.p className="text-gray-300 text-sm mt-1">{post.date}</motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bio Section */}
      <div className="container mx-auto px-4 mt-20 relative z-10">
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
      <div className="pb-32" /> {/* Дополнительный отступ снизу */}
    </section>
  );
}
