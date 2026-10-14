import type { Metadata } from "next";

import { AboutSection } from "@/app/components/sections/about/about-section";
import { WhyTefrixSection } from "@/app/components/sections/about/why-tefrix-section";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = pageMetadata.about;

/** On phones /about keeps the full quote, vision, mission and values (DESIGN_SPEC §13). */
export default function AboutPage() {
  return (
    <>
      <WhyTefrixSection headingLevel="h1" phoneQuote={false} />
      <AboutSection showOnPhone />
    </>
  );
}
