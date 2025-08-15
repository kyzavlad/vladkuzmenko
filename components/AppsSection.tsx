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
      </div>

      {/* FULL-BLEED: ломаемся из контейнера на всю ширину вьюпорта */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* 16:9 контейнер */}
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            src="https://www.youtube.com/embed/ZEEfv3zrsXk?rel=0&modestbranding=1&playsinline=1"
            title="AI Automation Services by VladKuzmenko.com"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-center mt-12">
          <ContactDialog triggerText="Get Started" className="inline-block" />
        </div>
      </div>
    </section>
  );
}
