// components/AutomationTeaserSection.tsx
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const AutomationTeaserSection = () => {
  return (
    <section id="automation-teaser" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2 flex justify-center">
            {/* Здесь можно использовать скриншот твоего n8n воркфлоу или другую релевантную графику */}
            <Image 
              src="/path-to-automation-graphic.jpg"
              alt="AI Automation"
              width={700}
              height={500}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="lg:order-1 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">AI AUTOMATION AGENCY</h2>
            <p className="text-lg text-muted-foreground mb-8">
              For established businesses ready to implement the systems that drive exponential growth. We don't just provide tools; we re-architect your operations for maximum efficiency and profitability. This is where the heavy lifting happens.
            </p>
            {/* target="_blank" открывает в новой вкладке. rel="noopener noreferrer" для безопасности. */}
            <Link href="/automation" passHref target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">Explore Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
