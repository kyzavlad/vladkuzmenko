import { Header } from "@/components/ui/header";
import { Hero } from "@/components/home/Hero";
import { EcosystemNavigator } from "@/components/home/EcosystemNavigator";
import { GrowthSystems } from "@/components/home/GrowthSystems";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ProductsOverview } from "@/components/home/ProductsOverview";
import { WarriorsSection } from "@/components/home/WarriorsSection";
import { DropSection } from "@/components/home/DropSection";
import { PersonalBrand } from "@/components/home/PersonalBrand";
import { ContactSection } from "@/components/home/ContactSection";
import { FooterSection } from "@/components/FooterSection";

/** Shared homepage composition for EN / UA / RU. */
export function HomeContent() {
  return (
    <>
      <Header />
      <Hero />
      <EcosystemNavigator />
      <GrowthSystems />
      <SelectedWork />
      <ProductsOverview />
      <WarriorsSection />
      <DropSection />
      <div id="about" className="scroll-mt-24" aria-hidden="true" />
      <PersonalBrand />
      <ContactSection />
      <FooterSection />
    </>
  );
}
