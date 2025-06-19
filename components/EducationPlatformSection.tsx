// components/EducationPlatformSection.tsx
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const EducationPlatformSection = () => {
  return (
    <section id="education" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">THE UNIVERSITY</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
          The educational platform where I teach the skills necessary to win in the new economy: from AI development and sales frameworks to content creation and personal branding. This is where theory dies and action begins.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Пример 3-х кампусов */}
          <div className="bg-background p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Content Creation</h3>
            <p className="text-muted-foreground">Master the art of attention. Learn to build a content machine that works for you 24/7.</p>
          </div>
          <div className="bg-background p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">AI for Business</h3>
            <p className="text-muted-foreground">Implement the same automation systems I use to scale businesses and eliminate repetitive work.</p>
          </div>
          <div className="bg-background p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">The Warrior's Mindset</h3>
            <p className="text-muted-foreground">Develop the mental fortitude, discipline, and framework required to win in any environment.</p>
          </div>
        </div>
        <Link href="/education-waitlist" passHref>
          <Button size="lg">Join The Waitlist</Button>
        </Link>
      </div>
    </section>
  );
};
