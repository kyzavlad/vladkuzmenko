import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Manrope, Playfair_Display } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { SITE } from "@/lib/site";

// Both faces ship Cyrillic, so RU and UA get the same typographic quality as EN
// instead of falling back to the system UI stack.
const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const TITLE = "Vlad Kuzmenko — Growth Systems for Attention, Leads & Sales";
const DESCRIPTION =
  "Vlad Kuzmenko builds growth systems for business: content and distribution that earn qualified attention, and web, AI automation and sales operations that turn it into leads, bookings and deals.";
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
      publisher: { "@id": `${SITE.url}/#vlad` },
      inLanguage: ["en", "uk", "ru"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
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
  const lang = headers().get("x-site-lang") || "en";

  return (
    <html lang={lang} className={`dark ${sans.variable} ${display.variable}`}>
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
