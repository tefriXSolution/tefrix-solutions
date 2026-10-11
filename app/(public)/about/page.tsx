import type { Metadata } from "next";

import { AboutSection } from "@/app/components/sections/about/about-section";
import { WhyTefrixSection } from "@/app/components/sections/about/why-tefrix-section";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = pageMetadata.about;

export default function AboutPage() {
  return (
    <>
      <WhyTefrixSection headingLevel="h1" />
      <AboutSection />
    </>
  );
}
