import { CONTACT, ORGANIZATION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;

const address = {
  "@type": "PostalAddress",
  streetAddress: `${CONTACT.addressLines[0]}, ${CONTACT.addressLines[1]}`,
  addressLocality: "Gurugram",
  postalCode: "122006",
  addressRegion: "Haryana",
  addressCountry: "IN",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZATION.logo,
    },
    image: ORGANIZATION.logo,
    description: SITE_DESCRIPTION,
    foundingLocation: ORGANIZATION.foundingLocation,
    areaServed: ORGANIZATION.areaServed,
    telephone: ORGANIZATION.telephone,
    email: ORGANIZATION.email,
    address,
    sameAs: ORGANIZATION.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: ORGANIZATION.logo,
    telephone: ORGANIZATION.telephone,
    email: ORGANIZATION.email,
    address,
    areaServed: ["Gurugram", "Haryana", "India"],
    parentOrganization: { "@id": ORGANIZATION_ID },
    sameAs: ORGANIZATION.sameAs,
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
}) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : item.path === "/"
          ? SITE_URL
          : `${SITE_URL}${item.path}`,
    })),
  };
}

export function organizationRef() {
  return { "@id": ORGANIZATION_ID };
}
