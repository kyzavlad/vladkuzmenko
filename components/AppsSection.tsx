"use client";

import { Icons } from "@/components/ui/icons";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { CustomVideoDialog } from "@/components/ui/custom-video-dialog";

export function AppsSection() {
  return (
    <div id="apps-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your business operations with our intelligent automation tools. 
            Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
          
          {/* Fixed Video Container - Full Width 16:9 Aspect Ratio */}
          <div className="w-full max-w-6xl mx-auto mb-8">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
              <iframe 
                src="https://www.youtube.com/embed/ZEEfv3zrsXk?si=KoYNVQd64WmQcrgL"
                title="AI Automation Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <ContactDialog triggerText="Get Started" className="w-full md:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
