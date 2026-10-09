import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  title: {
    default: "Tefrix Solutions",
    template: "%s | Tefrix Solutions",
  },
  description: "Web design, development, and digital marketing solutions.",
};

// Descriptions reuse the approved copy from each page's section.
export const pageMetadata = {
  about: {
    title: "About",
    description:
      "We are a team of passionate individuals dedicated to making a difference in the world through our innovative solutions and community-driven initiatives.",
  },
  services: {
    title: "Services",
    description:
      "We empower your digital journey with cutting-edge web design, robust development, and strategic digital marketing.",
  },
  contact: {
    title: "Contact",
    description:
      "We'd love to hear about your idea, product, or challenge. Let's build something powerful together.",
  },
} satisfies Record<string, Metadata>;
