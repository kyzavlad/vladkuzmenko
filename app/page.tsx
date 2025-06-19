import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/HeroSection";
import { AppsSection } from "@/components/AppsSection";
import { MapSection } from "@/components/MapSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AppsSection />
      <TestimonialsSection />
      <MapSection />
      <SaasLaunchSection />
      <MensCommunitySection />
      <FooterSection />
    </main>
  );
}
