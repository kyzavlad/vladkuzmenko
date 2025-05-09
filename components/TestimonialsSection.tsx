"use client";

import ReactPlayer from "react-player";
import Marquee from "react-fast-marquee"; // если хочешь плавный скролл
import "tailwindcss/tailwind.css";

export function TestimonialsSection() {
  const videos = [
    {
      name: "E-commerce Candle Shop",
      videoUrl: "https://youtu.be/F2c6znHQnzE"
    },
    {
      name: "E-commerce Candle Shop",
      videoUrl: "https://youtu.be/F2c6znHQnzE"
    },
    {
      name: "E-commerce Candle Shop",
      videoUrl: "https://youtu.be/F2c6znHQnzE"
    },
    {
      name: "E-commerce Candle Shop",
      videoUrl: "https://youtu.be/F2c6znHQnzE"
    }
  ];

  return (
    <div id="testimonials-section" className="w-full bg-background py-12">
      <h2 className="text-center text-3xl font-bold mb-4">
        Trusted by innovative companies worldwide
      </h2>
      <p className="text-center mb-8">
        Join thousands of businesses that have transformed their operations with our AI automation platform
      </p>
      <Marquee speed={40} gradient={false}>
        {videos.map((item, index) => (
          <div
            key={index}
            className="mx-4 w-64 flex flex-col items-center bg-white rounded-lg shadow-lg p-2"
          >
            <ReactPlayer
              url={item.videoUrl}
              width="240px"
              height="135px"
              controls={true}
              style={{ borderRadius: "10px", overflow: "hidden" }}
            />
            <p className="text-center mt-2 font-semibold text-sm">{item.name}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
