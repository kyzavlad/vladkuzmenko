"use client";

import { ContactDialog } from "@/components/ui/contact-dialog";

export function AppsSection() {
  return (
    <section id="apps-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your business operations with our intelligent automation tools.
            Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
        </div>

        {/* ВИДЕО: строго внутри контейнера, 16:9, не «узкая полоска» */}
        <div className="mx-auto w-full max-w-6xl">
          <div
            className="relative overflow-hidden rounded-xl shadow-2xl bg-black"
            style={{ aspectRatio: "16 / 9", minHeight: 280 }}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/ZEEfv3zrsXk?rel=0&modestbranding=1&playsinline=1"
              title="AI Automation Services by VladKuzmenko.com"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <ContactDialog triggerText="Get Started" className="inline-block" />
        </div>
      </div>
    </section>
  );
}
