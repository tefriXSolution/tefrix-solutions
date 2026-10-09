import type { Metadata } from "next";

import { ServicesSection } from "@/app/components/sections/services-section";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = pageMetadata.services;

export default function ServicesPage() {
  return <ServicesSection headingLevel="h1" />;
}
