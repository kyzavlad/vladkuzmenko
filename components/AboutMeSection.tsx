'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function AboutMeSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-background border-t border-border/40"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 text-sm uppercase tracking-[0.25em] text-muted-foreground">
          ABOUT VLAD
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-start">
          {/* Left column – main story */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Building a real life, not just a “personal brand”
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I&apos;m Vlad Kuzmenko, 18 y/o entrepreneur from Ukraine.
              I build systems that combine{' '}
              <span className="font-semibold text-foreground">
                AI automation, content, and real business
              </span>{' '}
              – first for myself, then for clients.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              This platform is not about “quick hacks”.
              It&apos;s a long–term ecosystem where I document how I build:
              an AI agency, SaaS products, content machines and, in the future,
              a full education platform and private community.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              Everything you see here – website, automations, assistants,
              systems – is built in real time. You can learn from it,
              plug into it, or hire me to build something similar for your brand.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center rounded-full border border-border/60 px-3 py-1">
                AI Automation & Voice / Chat Assistants
              </span>
              <span className="inline-flex items-center rounded-full border border-border/60 px-3 py-1">
                Short-form content systems
              </span>
              <span className="inline-flex items-center rounded-full border border-border/60 px-3 py-1">
                SaaS & workflow design
              </span>
            </div>
          </div>

          {/* Right column – “ecosystem” summary */}
          <div className="space-y-5 rounded-2xl border border-border/60 bg-card/60 p-5 md:p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">
              What this ecosystem gives you
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">The University – </span>
                structured lessons on content, AI and building systems.
              </li>
              <li>
                <span className="text-foreground font-medium">AI Automation Agency – </span>
                done–for–you builds for car dealerships, e-commerce and expert brands.
              </li>
              <li>
                <span className="text-foreground font-medium">Content Platform – </span>
                auto-clipping, repurposing and distribution for YouTube & socials.
              </li>
              <li>
                <span className="text-foreground font-medium">Warriors Team – </span>
                small, selective community for people who actually execute.
              </li>
            </ul>

            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                className="w-full justify-between text-sm md:text-base"
              >
                <a href="#education">
                  Start with The University
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              You can always book a call from the navigation if you prefer
              to speak directly and map out your system together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
