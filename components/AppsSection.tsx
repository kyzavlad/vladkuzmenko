"use client";

import { ContactDialog } from "@/components/ui/contact-dialog";
import { CustomVideoDialog } from "@/components/ui/custom-video-dialog";

export function AppsSection() {
  return (
    <div id="apps-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your business operations with our intelligent automation tools. 
            Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
          
          {/* ПРАВИЛЬНЫЙ КОНТЕЙНЕР ДЛЯ ВИДЕО */}
          <div className="w-full max-w-6xl mx-auto mb-12">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 rounded-xl overflow-hidden bg-black/50 border border-white/10">
                <iframe
                  src="https://www.youtube.com/embed/ZEEfv3zrsXk?si=KoYNVQd64WmQcrgL"
                  title="AI Automation Solutions Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <ContactDialog triggerText="Get Started with AI Automation" className="inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
}
