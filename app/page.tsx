import { Header } from "@/components/ui/header";
import { PersonalBrandHero } from "@/components/PersonalBrandHero";
import { EducationPlatformSection } from "@/components/EducationPlatformSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AutomationTeaserSection } from "@/components/AutomationTeaserSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { MerchPreviewSection } from "@/components/MerchPreviewSection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* 1. Твой новый главный экран */}
      <PersonalBrandHero />
      
      {/* 2. Детальный блок образовательной платформы */}
      <EducationPlatformSection />

      {/* 3. Отзывы как социальное доказательство */}
      <TestimonialsSection />

      {/* 4. Тизер Агентства */}
      <AutomationTeaserSection />

      {/* 5. Тизер SaaS */}
      <SaasLaunchSection />

      {/* 6. Тизер Warriors Team */}
      <MensCommunitySection />

      {/* 7. Превью Мерча */}
      <MerchPreviewSection />
      
      <FooterSection />
    </main>
  );
}
