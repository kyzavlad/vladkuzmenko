"use client";

import { useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import { ContactDialog } from "@/components/ui/contact-dialog";

export function AppsSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function(window){
        const host = "https://labs.heygen.com";
        const url = host + "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiIxNjFhYTM0YWRjZGE0ODljOTI2YjFkOGUzMjE5MThmNiIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzE2MWFhMzRhZGNkYTQ4OWM5MjZiMWQ4ZTMyMTkxOGY2L2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0LndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjdkOTM0ZWU3ZDVlZTQxMjI4YzM2NGUwOTc3MTczNDgzIiwidXNlcm5hbWUiOiIzMjM4ZWQyZmU5Nzg0ZDA5YjEzNzhjODY2MGU4MWE1YyJ9&inIFrame=1";

        const wrapDiv = document.createElement("div");
        wrapDiv.id = "heygen-streaming-embed";
        wrapDiv.style.cssText = "width: 360px; height: 360px; margin: 0 auto; border-radius: 16px; border: 2px solid #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.12); overflow: hidden;";

        const container = document.createElement("div");
        container.id = "heygen-streaming-container";
        container.style.width = "100%";
        container.style.height = "100%";

        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.allow = "microphone";
        iframe.allowFullscreen = false;
        iframe.title = "Streaming Embed";
        iframe.role = "dialog";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";

        container.appendChild(iframe);
        wrapDiv.appendChild(container);

        const hostElement = document.getElementById("heygen-streaming-embed-host");
        if (hostElement) {
          hostElement.innerHTML = ""; // clear previous
          hostElement.appendChild(wrapDiv);
        }
      })(window);
    `;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("heygen-streaming-embed");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div id="apps-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">AI-Powered Automation Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your business operations with our intelligent automation tools. Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>

          {/* Avatar embed target */}
          <div id="heygen-streaming-embed-host" className="max-w-4xl mx-auto mb-8" />

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <ContactDialog triggerText="Get Started" className="w-full md:w-auto" />
            <ContactDialog triggerText="View Demo" variant="outline" className="w-full md:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
