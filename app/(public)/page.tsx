import { AboutSection } from "@/app/components/sections/about/about-section";
import { WhyTefrixSection } from "@/app/components/sections/about/why-tefrix-section";
import { ContactSection } from "@/app/components/sections/contact/contact-section";
import { HeroSection } from "@/app/components/sections/hero/hero-section";
import { ProcessSection } from "@/app/components/sections/process/process-section";
import { ServicesSection } from "@/app/components/sections/services/services-section";
import { SelectedWorkSection } from "@/app/components/sections/work/selected-work-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <SelectedWorkSection />
      <WhyTefrixSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
