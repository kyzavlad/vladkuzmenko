"use client";

import { ContactDialog } from "@/components/ui/contact-dialog";

export function AppsSection() {
  return (
    <section id="apps-section" className="w-full pt-2 pb-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your business operations with our intelligent automation tools.
            Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
        </div>

        {/* YouTube на широком контейнере и с «толстой» высотой */}
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="
              relative w-full overflow-hidden rounded-xl shadow-2xl bg-black
              h-[260px] sm:h-[360px] md:h-[480px] lg:h-[560px]
            "
          >
            <iframe
              className="absolute inset-0 w-full h-full block"
              src="https://www.youtube.com/embed/ZEEfv3zrsXk?rel=0&modestbranding=1&playsinline=1"
              title="AI Automation Services by VladKuzmenko.com"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <ContactDialog triggerText="Get Started" className="inline-block" />
        </div>
      </div>
    </section>
  );
}
