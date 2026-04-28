import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();

  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/prozess`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/schweiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/impressum`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/datenschutz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}

