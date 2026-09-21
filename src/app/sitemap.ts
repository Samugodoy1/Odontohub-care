import type { MetadataRoute } from "next";

import { PROFESSIONALS } from "@/lib/catalog/seed";
import { CARE_CASES } from "@/lib/seo/cases";
import { CITY_SLUGS } from "@/lib/seo/cities";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/buscar", "/para-dentistas"].map((path) => ({
    url: `${SITE.domain}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const cases = CARE_CASES.map((item) => ({
    url: `${SITE.domain}/para/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const cities = CITY_SLUGS.map((slug) => ({
    url: `${SITE.domain}/dentista/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const combos = CITY_SLUGS.flatMap((slug) =>
    CARE_CASES.map((item) => ({
      url: `${SITE.domain}/dentista/${slug}/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const profiles = PROFESSIONALS.map((professional) => ({
    url: `${SITE.domain}/profissional/${professional.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...cases, ...cities, ...combos, ...profiles];
}
