"use client";

import { Header } from "@/components/ui/header";
import { Hero } from "@/components/home/Hero";
import { EcosystemNavigator } from "@/components/home/EcosystemNavigator";
import { GrowthSystems } from "@/components/home/GrowthSystems";
import { VisibilitySection } from "@/components/home/VisibilitySection";
import { WarriorsSection } from "@/components/home/WarriorsSection";
import { DropSection } from "@/components/home/DropSection";
import { PersonalBrand } from "@/components/home/PersonalBrand";
import { ContactSection } from "@/components/home/ContactSection";
import { SectionBridge } from "@/components/home/SectionBridge";
import { FooterSection } from "@/components/FooterSection";

export function HomeContent() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <Hero />
      <SectionBridge tone="gold" />
      <EcosystemNavigator />
      <SectionBridge tone="gold" />
      <GrowthSystems />
      <SectionBridge tone="blue" />
      <VisibilitySection />
      <SectionBridge tone="violet" />
      <WarriorsSection />
      <SectionBridge tone="green" />
      <DropSection />
      <SectionBridge tone="gold" />
      <PersonalBrand />
      <SectionBridge tone="gold" />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
