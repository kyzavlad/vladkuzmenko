"use client";

import { Icons } from "@/components/ui/icons";
import { ContactDialog } from "@/components/ui/contact-dialog";

export function AppsSection() {
  return (
    <div id="apps-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">AI-Powered Automation Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your business operations with our intelligent automation tools. Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>

          {/* Replacing Video with Interactive HeyGen Avatar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div dangerouslySetInnerHTML={{ __html: `
              <script>
                !function(window){
                  const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiIxNjFhYTM0YWRjZGE0ODljOTI2YjFkOGUz%0D%0AMjE5MThmNiIsInByZXZpZXdJbW1nIjoi...весь длинный URL...",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
                  #heygen-streaming-embed {
                    z-index: 9999;
                    position: relative;
                    margin: 0 auto;
                    width: 360px;
                    height: 360px;
                    border-radius: 16px;
                    border: 2px solid #fff;
                    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
                    overflow: hidden;
                  }
                  #heygen-streaming-container {
                    width: 100%;
                    height: 100%;
                  }
                  #heygen-streaming-container iframe {
                    width: 100%;
                    height: 100%;
                    border: 0;
                  }
                \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.currentScript.parentElement.appendChild(wrapDiv)
                }(globalThis);
              </script>
            ` }} />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <ContactDialog triggerText="Get Started" className="w-full md:w-auto" />
            <ContactDialog triggerText="View Demo" variant="outline" className="w-full md:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
