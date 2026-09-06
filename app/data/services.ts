export type ServicePage = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  summary: string;
  body: string[];
  outcomes: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-dev",
    name: "Web Development",
    eyebrow: "Core service",
    title: "Websites that feel considered and work hard.",
    summary:
      "Functional, fast, and conversion-minded websites for startups that need to look established from day one.",
    body: [
      "We design and build responsive websites for new businesses that need a professional presence without an enterprise budget.",
      "From information architecture to launch, we keep the stack clean, the pages fast, and the experience easy for your customers to trust.",
    ],
    outcomes: [
      "Responsive marketing and product sites",
      "Clean, crawler-friendly code",
      "Launch-ready in 1–2 weeks for standard sites",
    ],
  },
  {
    slug: "website-design",
    name: "Website Design",
    eyebrow: "Core service",
    title: "A visual system that shows your value.",
    summary:
      "Premium interface design for startups who know they are better than their current website suggests.",
    body: [
      "Design is how the market reads your ambition. We shape layout, type, color, and motion so your brand feels as sharp as the product behind it.",
      "Every composition is built to convert: clear hierarchy, generous spacing, and calls to action that feel inevitable rather than loud.",
    ],
    outcomes: [
      "Brand-aligned visual language",
      "Desktop and mobile compositions",
      "Design systems your site can grow with",
    ],
  },
  {
    slug: "branding",
    name: "Branding",
    eyebrow: "Growth & retainer",
    title: "Memorable identity for companies still being introduced.",
    summary:
      "Names, marks, and visual systems that help a new business feel coherent across the website, decks, and social.",
    body: [
      "We build identities that can live on a landing page today and a product tomorrow — distinctive without becoming theatrical.",
      "The work includes positioning language, logo usage, color, type, and the small rules that keep a young brand from looking improvised.",
    ],
    outcomes: [
      "Logo and identity direction",
      "Color, type, and usage guidance",
      "Website-ready brand application",
    ],
  },
  {
    slug: "ux-ui",
    name: "UX/UI",
    eyebrow: "Product design",
    title: "Interfaces people can move through without thinking.",
    summary:
      "User experience and interface design for marketing sites and product flows that need to feel simple under pressure.",
    body: [
      "We map how someone arrives, understands, and acts — then design screens that reduce friction at every step.",
      "The result is an interface that looks premium and behaves intuitively on every device.",
    ],
    outcomes: [
      "User flows and wireframes",
      "High-fidelity UI",
      "Usable, accessible interaction patterns",
    ],
  },
  {
    slug: "motion-design",
    name: "Motion Design",
    eyebrow: "Expression",
    title: "Motion that adds meaning, not noise.",
    summary:
      "Subtle animation for websites and brand moments — used where it helps people understand, not where it distracts.",
    body: [
      "We treat motion as part of the design system: page entrances, hover states, and product storytelling that stay lightweight on mobile.",
      "If it does not improve clarity or confidence, it does not ship.",
    ],
    outcomes: [
      "UI micro-interactions",
      "Hero and section motion",
      "Performance-conscious animation",
    ],
  },
  {
    slug: "seo",
    name: "SEO Optimization",
    eyebrow: "Core service",
    title: "Built to be found, not retrofitted later.",
    summary:
      "Search fundamentals baked into the build: structure, metadata, speed, and content that Google can actually read.",
    body: [
      "We implement SEO from the development phase — keyword research, titles, descriptions, and a crawler-friendly code structure.",
      "The goal is durable organic reach for startups that cannot buy every click.",
    ],
    outcomes: [
      "On-page SEO and metadata",
      "Technical structure and speed",
      "Keyword-informed page copy",
    ],
  },
  {
    slug: "security",
    name: "Web Security",
    eyebrow: "Core service",
    title: "Protect the site your customers have to trust.",
    summary:
      "Practical security for young companies: safer browsing, protected assets, and fewer obvious ways to inspect or abuse the site.",
    body: [
      "Web security is one of our priorities. We apply hardening practices during build and launch so your pages are safer by default.",
      "That includes protecting assets, reducing casual source inspection, and keeping the browsing experience clean for your users.",
    ],
    outcomes: [
      "Secure defaults at launch",
      "Asset and source-code protections",
      "Safer visitor experience",
    ],
  },
  {
    slug: "landing-page",
    name: "Landing Pages",
    eyebrow: "Growth & retainer",
    title: "Single-page sites that explain, then convert.",
    summary:
      "High-converting landing pages for launches, campaigns, and first-offer stories — designed to ship quickly.",
    body: [
      "A landing page should do one job with elegance: make the offer obvious and the next step easy.",
      "We write and design around that job, then build a fast page you can launch in about one to two weeks.",
    ],
    outcomes: [
      "Campaign and launch pages",
      "Clear offer hierarchy",
      "Fast, mobile-first builds",
    ],
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    eyebrow: "Growth",
    title: "Words and visuals that carry the brand.",
    summary:
      "Website copy, section narratives, and supporting graphics that match the tone of a premium, early-stage company.",
    body: [
      "We help you say the thing cleanly — headlines, supporting copy, and on-page content that sounds like a real business, not a template.",
      "Visual content is produced to sit inside the same design system as the site itself.",
    ],
    outcomes: [
      "Website copy and messaging",
      "Promotional graphics",
      "Consistent brand voice",
    ],
  },
  {
    slug: "webflow-development",
    name: "Webflow Development",
    eyebrow: "Build",
    title: "A site your team can update without waiting on a release.",
    summary:
      "Webflow builds for marketing teams that want visual control after launch, without giving up a designed, premium front end.",
    body: [
      "When the right platform is Webflow, we build it with the same care we bring to custom development: structure, CMS, and performance.",
      "You get a site that looks intentional and can be edited as campaigns change.",
    ],
    outcomes: [
      "Production Webflow builds",
      "CMS collections where needed",
      "Launch support and handoff",
    ],
  },
];

export function getService(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}

export const serviceIndex = [
  { group: "Core Services", slugs: ["web-dev", "seo", "security"] },
  {
    group: "Design",
    slugs: ["website-design", "branding", "ux-ui", "motion-design"],
  },
  {
    group: "Growth",
    slugs: ["landing-page", "content-creation", "webflow-development"],
  },
];
