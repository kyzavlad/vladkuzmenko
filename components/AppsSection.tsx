"use client";

import { ContactDialog } from "@/components/ui/contact-dialog";

/**
 * 16:9 обёртка: padding-top:56.25% → точная геометрия; iframe — абсолютный на всю площадь.
 * object-fit: contain — чтобы никакие внешние стили не «кропали» видео.
 */
export function AppsSection() {
  return (
    <section id="apps-section" className="w-full pt-2 pb-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your business operations with our intelligent automation tools.
            Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <div
            className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-black"
            style={{ paddingTop: "56.25%" }} // 9/16
          >
            <iframe
              title="AI Automation Services by VladKuzmenko.com"
              src="https://www.youtube.com/embed/ZEEfv3zrsXk?rel=0&modestbranding=1&playsinline=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                border: 0,
                objectFit: "contain",
              }}
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
