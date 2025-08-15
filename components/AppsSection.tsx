"use client";

import { ContactDialog } from "@/components/ui/contact-dialog";

/**
 * Видео — FULL-BLEED: выходит за пределы .container и растягивается на всю ширину экрана.
 * Делается отрицательными margin'ами на 50vw. Высота — «толстая» и адаптивная.
 */
export function AppsSection() {
  return (
    <section id="apps-section" className="w-full pt-2 pb-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your business operations with our intelligent automation tools. Streamline
            customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
        </div>
      </div>

      {/* FULL-BLEED ВИДЕО (вне контейнера) */}
      <div className="relative w-screen left-1/2 -ml-[50vw]">
        <div
          className="
            mx-auto w-screen
            overflow-hidden bg-black shadow-2xl
            rounded-none md:rounded-xl
            h-[260px] sm:h-[360px] md:h-[480px] lg:h-[560px] xl:h-[640px]
          "
        >
          <iframe
            className="w-full h-full block"
            src="https://www.youtube.com/embed/ZEEfv3zrsXk?rel=0&modestbranding=1&playsinline=1"
            title="AI Automation Services by VladKuzmenko.com"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      {/* Кнопка под видео — минимальный отступ */}
      <div className="container mx-auto px-4">
        <div className="mt-6 flex justify-center">
          <ContactDialog triggerText="Get Started" className="inline-block" />
        </div>
      </div>
    </section>
  );
}
