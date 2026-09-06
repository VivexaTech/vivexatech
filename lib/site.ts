export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.vivexatech.in";

export const SITE_NAME = "Vivexa Tech";

export const SITE_DESCRIPTION =
  "Gurugram-based web designers helping new businesses and startups launch professional, attractive, and budget-friendly websites.";

export const CONTACT = {
  phoneDisplay: "+91 95821 94338",
  phoneHref: "tel:+919582194338",
  email: "info@vivexatech.in",
  emailHref: "mailto:info@vivexatech.in",
  supportEmail: "support@vivexatech.in",
  addressLines: [
    "Plot No. 13, Basement, Near Ekta Group",
    "Ashok Vihar Extension III",
    "Gurugram – 122006",
    "Haryana, India",
  ],
  mapsUrl: "https://maps.app.goo.gl/GmhAVRH4byHbsqpC6",
  mapsLabel: "Get directions",
} as const;

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vivexa-tech/",
  },
  { label: "X", href: "https://x.com/VivexaTech" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vivexatech/",
  },
  { label: "GitHub", href: "https://github.com/VivexaTech" },
] as const;

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Vivexa Tech",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  foundingLocation: "Gurugram, Haryana, India",
  areaServed: "India",
  sameAs: SOCIAL_LINKS.map((item) => item.href),
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  email: CONTACT.email,
};
