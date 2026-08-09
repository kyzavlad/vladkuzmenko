import type { MetadataRoute } from "next";
import { CASE_DETAIL_SLUGS } from "@/lib/portfolio";

// Localized routes: home + product/community + portfolio pages in EN (/), UA (/ua)
// and RU (/ru). hreflang alternates are declared in each page's metadata.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vladkuzmenko.com";
  const lastModified = new Date();
  const prefixes = ["", "/ua", "/ru"];
  // slug → priority
  const pages: { slug: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { slug: "", priority: 1, freq: "weekly" },
    { slug: "work", priority: 0.9, freq: "monthly" },
    { slug: "visibilityos", priority: 0.8, freq: "monthly" },
    { slug: "ai-systems", priority: 0.8, freq: "monthly" },
    { slug: "auto-dealers", priority: 0.9, freq: "monthly" },
    { slug: "warriors-team", priority: 0.7, freq: "monthly" },
    // Portfolio case-detail pages (kept in sync with the portfolio data model).
    ...CASE_DETAIL_SLUGS.map((s) => ({ slug: `work/${s}`, priority: 0.7, freq: "monthly" as const })),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { slug, priority, freq } of pages) {
    for (const prefix of prefixes) {
      const url = slug
        ? `${baseUrl}${prefix}/${slug}`
        : `${baseUrl}${prefix || "/"}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: freq,
        // Slightly lower priority for non-default languages.
        priority: prefix === "" ? priority : Math.max(0.4, priority - 0.1),
      });
    }
  }
  return entries;
}
