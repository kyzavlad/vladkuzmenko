import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/HeroSection";
import { AppsSection } from "@/components/AppsSection";
import { EnterpriseAISection } from "@/components/EnterpriseAISection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { MapSection } from "@/components/MapSection";
import { AudioSection } from "@/components/AudioSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BlogSection } from "@/components/BlogSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { CTASection } from "@/components/CTASection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AppsSection />
      <EnterpriseAISection />
      <FeaturesSection />
      <ProjectsSection />
      <AudioSection />
      <PricingSection />
      <TestimonialsSection />
      <MapSection />
      <BlogSection />
      <SaasLaunchSection />
      <CTASection />
      <MensCommunitySection />
      <FooterSection />
    </main>
  );
}