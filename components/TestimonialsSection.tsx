"use client";

import Marquee from "react-fast-marquee";
import { useState } from "react";

export function TestimonialsSection() {
  const testimonials = [
    {
      title: "Law Firm",
      embedUrl: "https://www.youtube.com/embed/F2c6znHQnzE?rel=0&modestbranding=1&showinfo=0&controls=0&mute=1&autoplay=1&loop=1&playlist=F2c6znHQnzE"
    },
    {
      title: "Kid's School Camp",
      embedUrl: "https://www.youtube.com/embed/HTUyqpaqiaw?rel=0&modestbranding=1&showinfo=0&controls=0&mute=1&autoplay=1&loop=1&playlist=HTUyqpaqiaw"
    },
    {
      title: "Fashion Clothes Store",
      embedUrl: "https://www.youtube.com/embed/NDCsos_f7zo?rel=0&modestbranding=1&showinfo=0&controls=0&mute=1&autoplay=1&loop=1&playlist=NDCsos_f7zo"
    },
    {
      title: "Auto Dealership",
      embedUrl: "https://www.youtube.com/embed/PZ3ANMCcbRw?rel=0&modestbranding=1&showinfo=0&controls=0&mute=1&autoplay=1&loop=1&playlist=PZ3ANMCcbRw"
    },
    {
      title: "Car Showroom Business",
      embedUrl: "https://www.youtube.com/embed/SzTgz9TP4Ho?rel=0&modestbranding=1&showinfo=0&controls=0&mute=1&autoplay=1&loop=1&playlist=SzTgz9TP4Ho"
    },
    {
      title: "E-commerce Candle Shop",
      embedUrl: "https://www.youtube.com/embed/ENZzYovQQsw?rel=0&modestbranding=1&showinfo=0&controls=0&mute=1&autoplay=1&loop=1&playlist=ENZzYovQQsw"
    }
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
            onClick={() => setSelectedVideo(item.embedUrl)}
          >
            <div className="rounded-lg overflow-hidden shadow-lg w-full aspect-video mb-2">
              <iframe
                width="100%"
                height="100%"
                src={item.embedUrl}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </Marquee>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full h-full max-w-6xl">
            <iframe
              width="100%"
              height="100%"
              src={selectedVideo.replace('controls=0', 'controls=1').replace('mute=1', 'mute=0')}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
