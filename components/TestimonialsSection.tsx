"use client";

import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";
import { useState } from "react";

export function TestimonialsSection() {
  const testimonials = [
    { title: "Law Firm", url: "https://youtu.be/F2c6znHQnzE" },
    { title: "Kid's School Camp", url: "https://youtu.be/HTUyqpaqiaw" },
    { title: "Fashion Clothes Store", url: "https://youtu.be/NDCsos_f7zo" },
    { title: "Auto Dealership", url: "https://youtu.be/PZ3ANMCcbRw" },
    { title: "Car Showroom Business", url: "https://youtu.be/SzTgz9TP4Ho" },
    { title: "E-commerce Candle Shop", url: "https://youtu.be/ENZzYovQQsw" }
  ];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div id="testimonials-section" className="w-full bg-background py-10">
      <h2 className="text-center text-3xl font-bold mb-4">
        Trusted by innovative companies worldwide
      </h2>
      <p className="text-center mb-8">
        Join thousands of businesses that have transformed their operations with our AI automation platform
      </p>

      <Marquee gradient={false} speed={20} pauseOnHover={true}>
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center mx-6 w-64 cursor-pointer"
            onClick={() => setSelectedVideo(item.url)}
          >
            <div className="rounded-lg overflow-hidden shadow-lg w-full aspect-video mb-2">
              <ReactPlayer
                url={item.url}
                width="100%"
                height="100%"
                controls={false}
                playing={true}
                muted={true}
                loop={true}
                config={{ youtube: { playerVars: { cc_load_policy: 0 } } }} // ✂️ убираем субтитры
              />
            </div>
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </Marquee>

      {/* Модальное окно с видео на весь экран */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full h-full max-w-6xl">
            <ReactPlayer
              url={selectedVideo}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              muted={false}
              config={{ youtube: { playerVars: { cc_load_policy: 0 } } }} // ✂️ убираем субтитры
            />
          </div>
        </div>
      )}
    </div>
  );
}
