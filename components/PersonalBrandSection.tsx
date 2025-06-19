// components/PersonalBrandSection.tsx
import React from "react";
import Image from "next/image";

export const PersonalBrandSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              VLAD KUZMENKO
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I build systems that generate money and freedom. Strength is the only metric that matters.
              <br /><br />
              I am a tech entrepreneur and strategist. My mission is to build a global ecosystem of businesses and provide ambitious individuals with the tools to dominate their fields. I believe that technology, specifically AI, is the ultimate lever for achieving absolute freedom. I don't follow trends, I set them.
            </p>
            {/* Можно добавить кнопки на соцсети, если нужно */}
          </div>
          <div className="flex justify-center">
            {/* Замени на путь к твоему фото. Рекомендую 800x800px */}
            <Image
              src="/path-to-your-photo.jpg" 
              alt="Vlad Kuzmenko"
              width={500}
              height={500}
              className="rounded-lg object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
