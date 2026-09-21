import type { MetadataRoute } from "next";

import { PROFESSIONALS } from "@/lib/catalog/seed";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/buscar", "/para-dentistas"].map((path) => ({
    url: `${SITE.domain}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const profiles = PROFESSIONALS.map((professional) => ({
    url: `${SITE.domain}/profissional/${professional.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...profiles];
}
