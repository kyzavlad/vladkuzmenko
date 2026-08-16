import type { MetadataRoute } from "next";
import { CURATED_CASE_SLUGS } from "@/lib/portfolio-curated";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vladkuzmenko.com";
  const lastModified = new Date();
  const prefixes = ["", "/ua", "/ru"];
  const pages: { slug: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { slug: "", priority: 1, freq: "weekly" },
    { slug: "growth-systems", priority: 0.9, freq: "monthly" },
    { slug: "visibilityos", priority: 0.8, freq: "monthly" },
    { slug: "warriors-team", priority: 0.8, freq: "monthly" },
    { slug: "drop", priority: 0.7, freq: "monthly" },
    { slug: "auto-dealers", priority: 0.7, freq: "monthly" },
    ...CURATED_CASE_SLUGS.map((slug) => ({
      slug: `work/${slug}`,
      priority: 0.7,
      freq: "monthly" as const,
    })),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { slug, priority, freq } of pages) {
    for (const prefix of prefixes) {
      const url = slug ? `${baseUrl}${prefix}/${slug}` : `${baseUrl}${prefix || "/"}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: freq,
        priority: prefix === "" ? priority : Number(Math.max(0.4, priority - 0.1).toFixed(1)),
      });
    }
  }
  return entries;
}
