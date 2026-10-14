// Site-wide content for the homepage and the /about, /services and /contact
// pages. Copy mirrors design-handoff/reference.html; see DESIGN_SPEC.md §9 for
// the lines the owner still needs to confirm.

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

export type NavLink = {
  label: string;
  href: string;
  /** Where the link goes in the phone layout, if different (e.g. the phone contact page). */
  phoneHref?: string;
};

/** WhatsApp / Call / Email buttons in the phone menu, contact card and contact page. */
export const quickContactLinks: { label: string; href: string; icon: "chat" | "phone" | "mail" }[] = [
  { label: "WhatsApp", href: siteConfig.contact.whatsappHref, icon: "chat" },
  { label: "Call", href: siteConfig.contact.phone.href, icon: "phone" },
  { label: "Email", href: siteConfig.contact.email.href, icon: "mail" },
];

export const socialLinks: { label: string; href: string; icon: "facebook" | "linkedin" }[] = [
  { label: "TefriX on Facebook", href: "https://www.facebook.com/tefrix", icon: "facebook" },
  { label: "TefriX on LinkedIn", href: "https://www.linkedin.com/company/tefrix/", icon: "linkedin" },
];

// ─── Placeholders: fill these before launch ─────────────────────────────────
// Each section is hidden while its array is empty (DESIGN_SPEC §9).

export type ClientLogo = {
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg". Shown at up to 28px tall; without one the name is shown. */
  logo?: string;
  href?: string;
};

export const clientLogos: ClientLogo[] = [
  // { name: "Acme Corp", logo: "/clients/acme.svg", href: "https://acme.example" },
];

export type CaseStudy = {
  name: string;
  industry: string;
  /** Second tag, e.g. "Web application", "E-commerce", "UI/UX design". */
  category: string;
  /** Shorter category for the phone cards, e.g. "Web app", "UI/UX". Defaults to category. */
  shortCategory?: string;
  /** One line on what was built and the result for the client. */
  result: string;
  /** Path under /public, e.g. "/work/acme.webp" (16:10 works best). */
  screenshot?: string;
  /** Where "View case study" goes. Defaults to the contact section. */
  href?: string;
};

export const caseStudies: CaseStudy[] = [
  // {
  //   name: "Acme booking platform",
  //   industry: "Hospitality",
  //   category: "Web application",
  //   result: "Online bookings up 40% in the first three months.",
  //   screenshot: "/work/acme.webp",
  // },
];

// ─── Navigation ─────────────────────────────────────────────────────────────

// Hash links on "/" so they scroll on the homepage and also work from the
// /about, /services and /contact pages. "Work" only appears once there are
// case studies, so it never points at a hidden section.
export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  ...(caseStudies.length > 0 ? [{ label: "Work", href: "/#work" }] : []),
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact", phoneHref: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Web development", href: "/#services" },
  { label: "UI/UX design", href: "/#services" },
  { label: "E-commerce", href: "/#services" },
  { label: "Digital marketing & SEO", href: "/#services" },
  { label: "Maintenance & support", href: "/#services" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "How we work", href: "/#process" },
  ...(caseStudies.length > 0 ? [{ label: "Work", href: "/#work" }] : []),
  { label: "Contact", href: "/#contact" },
];

/** Phone footer: the site links column (the contact column comes from siteConfig.contact). */
export const phoneFooterLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "How we work", href: "/#process" },
  ...(caseStudies.length > 0 ? [{ label: "Work", href: "/#work" }] : []),
];

// ─── Hero ───────────────────────────────────────────────────────────────────

export const heroProofPoints = ["99% client satisfaction", "50+ projects delivered", "Free consultation"];

/** The deploy terminal is an illustration, not a real log. */
export const deployTerminal = {
  title: "deploy — tefrix",
  command: "tefrix deploy --env production",
  steps: ["Build passed", "Tests passed", "Security scan clean", "Deployed to production"],
  status: "Live",
  ariaLabel:
    "Illustration of a deployment pipeline: build passed, tests passed, security scan clean, deployed to production",
  /** The compact three-line card in the phone hero. */
  phone: {
    command: "tefrix deploy",
    checks: ["build", "tests", "security"],
    ariaLabel: "Deployed to production, live",
  },
};

export const stats: {
  value: number;
  suffix: string;
  label: string;
  /** Phone label (DESIGN_SPEC §13). */
  shortLabel: string;
  highlight?: boolean;
}[] = [
  { value: 20, suffix: "+", label: "Team members", shortLabel: "Team members" },
  { value: 50, suffix: "+", label: "Projects delivered", shortLabel: "Projects" },
  { value: 3, suffix: "+", label: "Years in industry", shortLabel: "Years" },
  { value: 99, suffix: "%", label: "Client satisfaction", shortLabel: "Satisfaction", highlight: true },
];

// ─── Services ───────────────────────────────────────────────────────────────

export type ServiceIcon = "code" | "devices" | "cart" | "chart" | "shield" | "layout";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
  tags: string[];
  /** Phone tile: the short name and its position in the 2-column grid (DESIGN_SPEC §13). */
  phone: { label: string; order: number };
};

export const services: Service[] = [
  {
    title: "Custom web development",
    description:
      "Tailored web solutions from concept to launch. We build scalable, secure, and high-performance websites and web applications using the latest technologies.",
    icon: "code",
    tags: ["Web applications", "Concept to launch"],
    phone: { label: "Web development", order: 1 },
  },
  {
    title: "Responsive web design",
    description:
      "Visually stunning and user-friendly designs that adapt seamlessly to any device, ensuring an optimal experience for all your visitors.",
    icon: "devices",
    tags: ["Mobile", "Tablet", "Desktop"],
    phone: { label: "Responsive design", order: 5 },
  },
  {
    title: "E-commerce solutions",
    description:
      "Powerful online stores with secure payment gateways, inventory management, and intuitive user experiences to boost your sales.",
    icon: "cart",
    tags: ["Secure payments", "Inventory"],
    phone: { label: "E-commerce", order: 3 },
  },
  {
    title: "Digital marketing & SEO",
    description:
      "Increase your online visibility and attract more customers with expert SEO strategies, content marketing, and social media management.",
    icon: "chart",
    tags: ["SEO", "Content", "Social media"],
    phone: { label: "Marketing & SEO", order: 4 },
  },
  {
    title: "Website maintenance & support",
    description:
      "Keep your website running smoothly and securely with our ongoing maintenance plans, updates, and dedicated technical support.",
    icon: "shield",
    tags: ["Updates", "Technical support"],
    phone: { label: "Maintenance & support", order: 6 },
  },
  {
    title: "UI/UX design",
    description:
      "Crafting intuitive and engaging user interfaces and exceptional user experiences, so your website is a joy to navigate.",
    icon: "layout",
    tags: ["User interfaces", "User experience"],
    phone: { label: "UI/UX design", order: 2 },
  },
];

/** `short` is the phone chip label (DESIGN_SPEC §13). */
export const technologies: { name: string; short?: string }[] = [
  { name: "React" },
  { name: "React Native" },
  { name: "Node.js" },
  { name: "Express" },
  { name: "Python" },
  { name: "Django" },
  { name: "PHP Laravel", short: "Laravel" },
  { name: "Spring Boot" },
  { name: "MongoDB" },
];

/** `short` is the one-line phone version (DESIGN_SPEC §13). */
export const processSteps: { title: string; description: string; short: string }[] = [
  {
    title: "Discover",
    description:
      "We learn your goals, users and constraints, then agree on scope, timeline and what success looks like.",
    short: "Goals, scope and plan",
  },
  {
    title: "Design",
    description:
      "Wireframes and UI/UX designs you can click through and approve before any code is written.",
    short: "Clickable UI/UX you approve",
  },
  {
    title: "Build & test",
    description:
      "Development in short cycles with regular demos — secure, tested code on a modern, scalable stack.",
    short: "Secure, tested code",
  },
  {
    title: "Launch & support",
    description:
      "We launch your product, then keep it fast, secure and up to date with ongoing maintenance and support.",
    short: "Live, monitored, maintained",
  },
];

// ─── Why TefriX / About ─────────────────────────────────────────────────────

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
      "Positive, lasting client relationships are the foundation of everything we ship.",
  },
  {
    title: "Continuous improvement",
    description: "Client feedback flows straight back into our products and processes.",
  },
  {
    title: "Cultural diversity",
    description:
      "We celebrate Sri Lanka's diversity — a driven family of tech people working in harmony.",
  },
  {
    title: "Technological superiority",
    description: "Cloud-native, scalable and resilient architecture with modern tools.",
  },
];
