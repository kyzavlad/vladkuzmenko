import type { MetadataRoute } from "next";

// Localized routes: home + product/community pages in EN (/), UA (/ua) and RU (/ru).
// hreflang alternates are declared in each page's metadata.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vladkuzmenko.com";
  const lastModified = new Date();
  const prefixes = ["", "/ua", "/ru"];
  // slug → priority
  const pages: { slug: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { slug: "", priority: 1, freq: "weekly" },
    { slug: "visibilityos", priority: 0.8, freq: "monthly" },
    { slug: "ai-systems", priority: 0.8, freq: "monthly" },
    { slug: "auto-dealers", priority: 0.9, freq: "monthly" },
    { slug: "warriors-team", priority: 0.7, freq: "monthly" },
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
