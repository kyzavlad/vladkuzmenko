import { Header } from "@/components/ui/header";
import { Hero } from "@/components/home/Hero";
import { StudioSection } from "@/components/home/StudioSection";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AutoDealerFocus } from "@/components/home/AutoDealerFocus";
import { ProductsOverview } from "@/components/home/ProductsOverview";
import { ShopDrop } from "@/components/home/ShopDrop";
import { BuildInPublic } from "@/components/home/BuildInPublic";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FooterSection } from "@/components/FooterSection";

/** Shared homepage composition rendered by each language route. */
export function HomeContent() {
  return (
    <>
      <Header />
      <Hero />
      <StudioSection />
      <SelectedWork />
      <AutoDealerFocus />
      <ProductsOverview />
      <ShopDrop />
      <BuildInPublic />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
