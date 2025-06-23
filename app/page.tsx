import { Header } from "@/components/ui/header";
import { PersonalBrandHero } from "@/components/PersonalBrandHero";
import { AboutMeSection } from "@/components/AboutMeSection";
import { EducationPlatformSection } from "@/components/EducationPlatformSection";
import { SaasAiPlatformSection } from "@/components/SaasLaunchSection";
import { WarriorsSection } from "@/components/MensCommunitySection";
import { AutomationTeaserSection } from "@/components/AutomationTeaserSection";
import { MerchPreviewSection } from "@/components/MerchPreviewSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <PersonalBrandHero />
      <AboutMeSection />
      <EducationPlatformSection />
      <SaasAiPlatformSection />
      <WarriorsSection />
      <AutomationTeaserSection />
      <MerchPreviewSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
