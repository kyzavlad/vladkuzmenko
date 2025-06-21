import { PersonalBrandHero } from "@/components/PersonalBrandHero";
import { AboutMeSection } from "@/components/AboutMeSection";
import { EducationPlatformSection } from "@/components/EducationPlatformSection";
import { AutomationTeaserSection } from "@/components/AutomationTeaserSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { MerchSection } from "@/components/MerchSection";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <> 
      <Header />
      <PersonalBrandHero />
      <AboutMeSection />
      <EducationPlatformSection />
      <AutomationTeaserSection />
      <SaasLaunchSection />
      <MensCommunitySection />
      <MerchSection />
      <FooterSection />
    </>
  );
}
