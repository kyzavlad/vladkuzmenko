"use client";

import { ContactDialog } from "@/components/ui/contact-dialog";

export function AppsSection() {
  return (
    <section id="apps-section" className="w-full pt-8 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your business operations with our intelligent automation tools. Streamline
            customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
        </div>

        {/* ВИДЕО: стабильный «padding-top 56.25%» (не схлопнется) */}
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-black" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full block"
              src="https://www.youtube.com/embed/ZEEfv3zrsXk?rel=0&modestbranding=1&playsinline=1"
              title="AI Automation Services by VladKuzmenko.com"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <ContactDialog triggerText="Get Started" className="inline-block" />
        </div>
      </div>
    </section>
  );
}
