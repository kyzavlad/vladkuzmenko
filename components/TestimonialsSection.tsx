"use client";

import Marquee from "react-fast-marquee";
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';
import { useState } from "react";

export function TestimonialsSection() {
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  const testimonials = [
    { title: "Law Firm", id: "F2c6znHQnzE" },
    { title: "Kid's School Camp", id: "HTUyqpaqiaw" },
    { title: "Fashion Clothes Store", id: "NDCsos_f7zo" },
    { title: "Auto Dealership", id: "PZ3ANMCcbRw" },
    { title: "Car Showroom Business", id: "SzTgz9TP4Ho" },
    { title: "E-commerce Candle Shop", id: "ENZzYovQQsw" }
  ];

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
            onClick={() => {
              setVideoId(item.id);
              setOpen(true);
            }}
          >
            <div className="rounded-lg overflow-hidden shadow-lg w-full aspect-video mb-2 bg-black">
              <img
                src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </Marquee>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
