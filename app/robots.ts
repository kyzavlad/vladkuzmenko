import type { MetadataRoute } from "next";

const PRODUCTION_ORIGIN = "https://www.vladkuzmenko.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${PRODUCTION_ORIGIN}/sitemap.xml`,
    host: PRODUCTION_ORIGIN,
  };
}
