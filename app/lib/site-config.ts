// Site-wide content and data for the Cherry homepage. All copy is final and
// mirrors the approved design hand-off (reference.html).

export const siteConfig = {
  name: "TefriX Solutions",
  url: "https://www.tefrix.com",
  gaMeasurementId: "G-HW51VZVK92",
  contact: {
    phone: { label: "+94 76 590 7934", href: "tel:+94765907934" },
    email: {
      label: "tefrixsolutions@gmail.com",
      href: "mailto:tefrixsolutions@gmail.com",
    },
    location: "Colombo, Sri Lanka",
    whatsappHref: "https://wa.me/94765907934",
    website: { label: "www.tefrix.com", href: "https://www.tefrix.com" },
  },
} as const;

export type NavLink = { label: string; href: string };

// Hash links on "/" so they scroll on the homepage and also work from the
// /about, /services and /contact pages.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks: NavLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/tefrix" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/tefrix/" },
];

export type PillarIcon = "layers" | "shield" | "bolt" | "target";

export const pillars: { title: string; description: string; icon: PillarIcon }[] = [
  {
    title: "Scalable architecture",
    description: "Modern stacks designed to grow with your business needs.",
    icon: "layers",
  },
  {
    title: "Security-first",
    description: "Built with enterprise-grade security from the ground up.",
    icon: "shield",
  },
  {
    title: "Optimal performance",
    description: "Engineered for speed and efficiency at any scale.",
    icon: "bolt",
  },
  {
    title: "Real-world impact",
    description: "Solutions focused on delivering measurable business results.",
    icon: "target",
  },
];

export const services: { title: string; description: string; featured?: boolean }[] = [
  {
    title: "Custom web development",
    description:
      "Tailored web solutions from concept to launch. Scalable, secure, high-performance websites and web apps on the latest technologies.",
    featured: true,
  },
  {
    title: "Responsive web design",
    description:
      "Visually stunning, user-friendly designs that adapt seamlessly to any device for an optimal experience.",
  },
  {
    title: "E-commerce solutions",
    description:
      "Powerful online stores with secure payment gateways, inventory management and intuitive experiences that boost sales.",
  },
  {
    title: "Digital marketing & SEO",
    description:
      "Grow your visibility and attract more customers with expert SEO, content marketing and social media management.",
  },
  {
    title: "Maintenance & support",
    description:
      "Keep your website running smoothly and securely with maintenance plans, updates and dedicated technical support.",
  },
  {
    title: "UI/UX design",
    description:
      "Intuitive, engaging interfaces and exceptional user experiences that make your website a joy to navigate.",
  },
];

export const technologies = [
  "React",
  "React Native",
  "Node.js",
  "Express",
  "Python",
  "Django",
  "PHP Laravel",
  "Spring Boot",
  "MongoDB",
];

export const stats: { value: string; label: string; highlight?: boolean }[] = [
  { value: "20+", label: "Team members" },
  { value: "50+", label: "Projects delivered" },
  { value: "3+", label: "Years in industry" },
  { value: "99%", label: "Client satisfaction", highlight: true },
];

export const aboutHighlights = [
  "Diverse expertise",
  "Innovation & excellence",
  "Meaningful impact",
];

export const visionAndMission: { title: string; text: string }[] = [
  {
    title: "Our vision",
    text: "To empower individuals and organizations to achieve their goals through innovative technology solutions and exceptional service.",
  },
  {
    title: "Our mission",
    text: "To deliver cutting-edge digital products and services that drive real impact for our clients, guided by integrity, creativity, and a relentless pursuit of excellence.",
  },
];

export const values: { title: string; description: string }[] = [
  {
    title: "Customer oriented",
    description:
      "Positive, lasting client relationships are the foundation of every product we ship.",
  },
  {
    title: "Continuous improvement",
    description:
      "Client feedback flows straight back into our products and processes.",
  },
  {
    title: "Cultural diversity",
    description:
      "We celebrate Sri Lanka's diversity — a driven family of tech people working in harmony.",
  },
  {
    title: "Technological superiority",
    description:
      "Cloud-native, scalable and resilient architecture with modern tools.",
  },
];

export const uniqueTraits: { title: string; description: string }[] = [
  {
    title: "Young talent, big vision",
    description: "Driven by passionate engineers solving real-world problems.",
  },
  {
    title: "Real projects in progress",
    description:
      "Early builds and academic prototypes shape our future offerings.",
  },
  {
    title: "Built on security & trust",
    description: "From day one, our focus is on stable, secure infrastructure.",
  },
];
