"use client";

import { Icons } from "@/components/ui/icons"; // Этот импорт остается, так как может использоваться другими компонентами ContactDialog или внутри него.
import { ContactDialog } from "@/components/ui/contact-dialog";
import { CustomVideoDialog } from "@/components/ui/custom-video-dialog";

export function AppsSection() {
  return (
    <div id="apps-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">AI-Powered Automation Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your business operations with our intelligent automation tools. Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
          
          {/* Custom Video Dialog with Rainbow Animation */}
          <div className="max-w-4xl mx-auto mb-8">
            <CustomVideoDialog 
              videoSrc="https://www.youtube.com/embed/ZEEfv3zrsXk?si=KoYNVQd64WmQcrgL"
              title="AI Automation Introduction"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <ContactDialog triggerText="Get Started" className="w-full md:w-auto" />
            {/* Кнопка "View Demo" была здесь и теперь удалена */}
            {/* <ContactDialog triggerText="View Demo" variant="outline" className="w-full md:w-auto" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
