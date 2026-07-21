import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Analytics } from "@/components/analytics";
import { SITE } from "@/lib/site";

const TITLE = "Vlad Kuzmenko — AI Systems, Web Platforms & Content Systems";
const DESCRIPTION =
  "Vlad Kuzmenko builds AI systems, web platforms and content systems for businesses and personal brands — built for attention, leads, sales and execution.";

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
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Vlad Kuzmenko — AI Systems, Web Platforms & Content Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@vladkuzmenkosxy",
    images: ["/og-banner.png"],
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
      jobTitle: "Builder — AI systems, web platforms and content systems",
      description:
        "Builds AI systems, web platforms and content systems for businesses and personal brands.",
      knowsLanguage: ["en", "uk", "ru"],
      sameAs: [
        SITE.socials.instagram,
        SITE.socials.youtube,
        SITE.socials.x,
        SITE.socials.telegram,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: "Vlad Kuzmenko",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE.url}/#vlad` },
      // Trilingual site — declare all published content languages rather than
      // English-only. Per-page <html lang> still reflects the active locale.
      inLanguage: ["en", "uk", "ru"],
    },
    {
      "@type": "ProfessionalService",
      name: "Vlad Kuzmenko — Digital Systems",
      url: SITE.url,
      description:
        "AI systems, web platforms, content systems, automation, lead capture and website audits for businesses and personal brands.",
      areaServed: "Worldwide",
      availableLanguage: ["en", "uk", "ru"],
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
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
