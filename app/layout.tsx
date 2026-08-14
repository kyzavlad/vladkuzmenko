import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { SITE } from "@/lib/site";

const TITLE = "Vlad Kuzmenko — Growth Systems for Attention, Leads & Sales";
const DESCRIPTION =
  "Vlad Kuzmenko builds growth systems for business: content and distribution that earn qualified attention, and web, AI automation and sales operations that turn it into leads, bookings and deals.";
// Share images are written out as absolute production URLs so a card never
// resolves against a deployment preview host.
const SHARE_IMAGE = `${SITE.url}/og-banner.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: "%s | Vlad Kuzmenko",
  },
  description: DESCRIPTION,
  applicationName: "Vlad Kuzmenko",
  keywords: [
    "Vlad Kuzmenko",
    "growth systems",
    "AI systems",
    "web platforms",
    "content systems",
    "AI automation",
    "AI assistants",
    "lead generation",
    "website audit",
    "personal brand",
    "business automation",
  ],
  authors: [{ name: "Vlad Kuzmenko", url: SITE.url }],
  creator: "Vlad Kuzmenko",
  publisher: "Vlad Kuzmenko",
  manifest: "/manifest.json",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/brand/vlad-kuzmenko-icon-512.png", type: "image/png" }],
    shortcut: "/brand/vlad-kuzmenko-icon-512.png",
    apple: "/brand/vlad-kuzmenko-icon-512.png",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "Vlad Kuzmenko",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@vladkuzmenkosxy",
    images: [SHARE_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#vlad`,
      name: "Vlad Kuzmenko",
      url: SITE.url,
      jobTitle: "Builder — growth systems for business",
      description:
        "Builds growth systems for business: content and distribution that earn attention, and web, AI automation and sales operations that turn it into leads and deals.",
      sameAs: [
        SITE.socials.instagram,
        SITE.socials.youtube,
        SITE.socials.x,
        SITE.socials.telegram,
        SITE.socials.tiktok,
        SITE.socials.whatsapp,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: "Vlad Kuzmenko",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE.url}/#vlad` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      name: "Vlad Kuzmenko — Growth Systems",
      url: SITE.url,
      description:
        "Growth systems for business: content and distribution, websites and web platforms, AI assistants, automation, CRM and follow-up, and website audits.",
      areaServed: "Worldwide",
      email: SITE.email,
      founder: { "@id": `${SITE.url}/#vlad` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
