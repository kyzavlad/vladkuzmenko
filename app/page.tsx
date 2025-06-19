import { Header } from "@/components/ui/header";
import { PersonalBrandHero } from "@/components/PersonalBrandHero";
import { EducationPlatformSection } from "@/components/EducationPlatformSection";
import { AutomationTeaserSection } from "@/components/AutomationTeaserSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { MerchPreviewSection } from "@/components/MerchPreviewSection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-[72px]">
        <PersonalBrandHero />
        <EducationPlatformSection />
        <AutomationTeaserSection />
        <SaasLaunchSection />
        <MensCommunitySection />
        <MerchPreviewSection />
      </main>
      <FooterSection />
    </div>
  );
}
