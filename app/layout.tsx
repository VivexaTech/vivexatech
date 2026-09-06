import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import {
  CONTACT,
  ORGANIZATION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Affordable websites for startups`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Vivexa Tech",
    "web design Gurugram",
    "affordable website for startups",
    "website development Gurugram",
    "SEO for small business",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Affordable websites for startups in Gurugram`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/logo.svg", alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Affordable websites for startups`,
    description: SITE_DESCRIPTION,
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: ORGANIZATION.name,
            legalName: ORGANIZATION.legalName,
            url: ORGANIZATION.url,
            logo: ORGANIZATION.logo,
            description: SITE_DESCRIPTION,
            areaServed: ORGANIZATION.areaServed,
            telephone: ORGANIZATION.telephone,
            email: ORGANIZATION.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${CONTACT.addressLines[0]}, ${CONTACT.addressLines[1]}`,
              addressLocality: "Gurugram",
              postalCode: "122006",
              addressRegion: "Haryana",
              addressCountry: "IN",
            },
            sameAs: ORGANIZATION.sameAs,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
