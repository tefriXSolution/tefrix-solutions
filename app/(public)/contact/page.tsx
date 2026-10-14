import type { Metadata } from "next";

import { ContactSection } from "@/app/components/sections/contact/contact-section";
import { MobileContactPage } from "@/app/components/sections/contact/mobile-contact-page";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = pageMetadata.contact;

/** Desktop: the contact section. Phones: the standalone contact page. */
export default function ContactPage() {
  return (
    <>
      <ContactSection headingLevel="h1" phoneCard={false} />
      <MobileContactPage />
    </>
  );
}
