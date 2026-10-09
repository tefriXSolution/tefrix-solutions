import type { Metadata } from "next";

import { ContactSection } from "@/app/components/sections/contact-section";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = pageMetadata.contact;

export default function ContactPage() {
  return <ContactSection headingLevel="h1" />;
}
