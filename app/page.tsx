// app/page.tsx
import Header from "@/components/ui/header";
import PersonalBrandHero from "@/components/PersonalBrandHero";
import EducationPlatformSection from "@/components/EducationPlatformSection";
import AutomationTeaserSection from "@/components/AutomationTeaserSection";
import SaasLaunchSection from "@/components/SaasLaunchSection";
import MensCommunitySection from "@/components/MensCommunitySection";
import MerchPreviewSection from "@/components/MerchPreviewSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PersonalBrandHero />
      <EducationPlatformSection />
      <AutomationTeaserSection />
      <SaasLaunchSection />
      <MensCommunitySection />
      <MerchPreviewSection />
      <FooterSection />
    </main>
  );
}
