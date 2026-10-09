import type { Metadata } from "next";

import { AboutSection } from "@/app/components/sections/about-section";
import { ValuesSection } from "@/app/components/sections/values-section";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = pageMetadata.about;

export default function AboutPage() {
  return (
    <>
      <AboutSection headingLevel="h1" />
      <ValuesSection />
    </>
  );
}
