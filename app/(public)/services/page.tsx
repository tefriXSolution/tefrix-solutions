import type { Metadata } from "next";

import { ProcessSection } from "@/app/components/sections/process/process-section";
import { ServicesSection } from "@/app/components/sections/services/services-section";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = pageMetadata.services;

export default function ServicesPage() {
  return (
    <>
      <ServicesSection headingLevel="h1" />
      <ProcessSection />
    </>
  );
}
