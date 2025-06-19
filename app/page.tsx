import { PersonalBrandHero } from "@/components/PersonalBrandHero";
import { EducationPlatformSection } from "@/components/EducationPlatformSection";
import { AutomationTeaserSection } from "@/components/AutomationTeaserSection";
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { MerchPreviewSection } from "@/components/MerchPreviewSection";

export default function Home() {
  return (
    <> {/* Используем Fragment, так как Header и Footer теперь в layout.tsx */}
      
      {/* 1. Твой новый главный экран */}
      <PersonalBrandHero />
      
      {/* 2. Детальный блок образовательной платформы - главный продукт */}
      <EducationPlatformSection />

      {/* Я убрал TestimonialsSection и заменил старые тизеры на новые */}
      
      {/* 3. Новый, мощный тизер Агентства */}
      <AutomationTeaserSection />

      {/* 4. Тизер SaaS */}
      <SaasLaunchSection />

      {/* 5. Тизер Warriors Team */}
      <MensCommunitySection />

      {/* 6. Превью Мерча */}
      <MerchPreviewSection />
      
    </>
  );
}

