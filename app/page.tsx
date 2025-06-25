import { Header } from "@/components/ui/header";
import { PersonalBrandHero } from "@/components/PersonalBrandHero";
import { AboutMeSection } from "@/components/AboutMeSection";
import { EducationPlatformSection } from "@/components/EducationPlatformSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { AutomationTeaserSection } from "@/components/AutomationTeaserSection";
import { InstagramSection } from "@/components/InstagramSection";
import { MerchPreviewSection } from "@/components/MerchPreviewSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";

export default function HomePage() {
  return (
    <>
      {/* <Header /> */} {/* <<<<<<<<<< ВОТ ТАК. ВРЕМЕННО ВЫКЛЮЧАЕМ ХЕДЕР */}
      
      <PersonalBrandHero /> {/* Здесь остается тестовый синий блок */}
      
      {/* Пока можем закомментировать и все остальное, чтобы ничего не мешало */}
      {/* <AboutMeSection />
      <EducationPlatformSection />
      <SaasLaunchSection />
      <MensCommunitySection />
      <AutomationTeaserSection />
      <InstagramSection />
      <MerchPreviewSection />
      <CTASection />
      <FooterSection /> 
      */}
    </>
  );
}
