"use client";

import { Icons } from "@/components/ui/icons";
import { ContactDialog } from "@/components/ui/contact-dialog";

export function AppsSection() {
  return (
    <section id="apps-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              AI-Powered Automation Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Transform your business operations with our intelligent automation tools. 
              Streamline customer support, marketing, and content creation with cutting-edge AI technology.
            </p>
          </div>
          
          {/* ВИДЕО НА ВСЮ ШИРИНУ */}
          <div className="w-full mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black" style={{ paddingTop: '56.25%' }}>
              <iframe 
                src="https://www.youtube.com/embed/ZEEfv3zrsXk?si=KoYNVQd64WmQcrgL"
                title="AI Automation Services by VladKuzmenko.com"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <ContactDialog triggerText="Get Started" className="inline-block" />
          </div>
        </div>
      </div>
    </section>
  );
}
