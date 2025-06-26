import { Header } from "@/components/ui/header";
import { PersonalBrandHero } from "@/components/PersonalBrandHero";
import { AboutMeSection } from "@/components/AboutMeSection";
import { InstagramSection } from "@/components/InstagramSection";
import { EducationPlatformSection } from "@/components/EducationPlatformSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { MerchPreviewSection } from "@/components/MerchPreviewSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <PersonalBrandHero />
      <AboutMeSection />
      <InstagramSection />
      <EducationPlatformSection />
      <TestimonialsSection />
      <SaasLaunchSection />
      <MensCommunitySection />
      <MerchPreviewSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
