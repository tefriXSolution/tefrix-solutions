import { AboutSection } from "@/app/components/sections/about-section";
import { ContactSection } from "@/app/components/sections/contact-section";
import { HeroSection } from "@/app/components/sections/hero-section";
import { MilestonesSection } from "@/app/components/sections/milestones-section";
import { ServicesSection } from "@/app/components/sections/services-section";
import { ValuesSection } from "@/app/components/sections/values-section";
import { WhyTefrixSection } from "@/app/components/sections/why-tefrix-section";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      {/* Hero and the Why panel are joined by the "Why TefriX?" circle. */}
      <div id="top" className={styles.top}>
        <HeroSection />
        <WhyTefrixSection />
      </div>
      <ServicesSection />
      <MilestonesSection />
      <AboutSection />
      <ValuesSection />
      <ContactSection />
    </>
  );
}
