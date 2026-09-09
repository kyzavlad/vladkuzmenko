"use client";

import { Header } from "@/components/ui/header";
import { Hero } from "@/components/home/Hero";
import { GrowthSystems } from "@/components/home/GrowthSystems";
import { OwnedVentures } from "@/components/home/OwnedVentures";
import { PersonalBrandFinal } from "@/components/home/PersonalBrandFinal";
import { ContactSection } from "@/components/home/ContactSection";
import { SectionBridge } from "@/components/home/SectionBridge";
import { FooterSection } from "@/components/FooterSection";

export function HomeContent() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <Hero />
      <SectionBridge tone="gold" />
      <GrowthSystems />
      <SectionBridge tone="gold" />
      <OwnedVentures />
      <SectionBridge tone="gold" />
      <PersonalBrandFinal />
      <SectionBridge tone="gold" />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
