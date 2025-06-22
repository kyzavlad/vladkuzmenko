import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { UniversitySection } from "@/components/UniversitySection";
import { InstagramSection } from "@/components/InstagramSection";
import { MerchPreviewSection } from "@/components/MerchPreviewSection"; // ИСПРАВЛЕНО!
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/ui/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <UniversitySection />
      <InstagramSection />
      <MerchPreviewSection />
      <CTASection />
      <Footer />
    </>
  );
}
