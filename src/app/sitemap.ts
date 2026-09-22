import type { MetadataRoute } from "next";

import { getListedCareProfessionals } from "@/lib/catalog/adapter";
import { CARE_CASES } from "@/lib/seo/cases";
import { citySlug } from "@/lib/seo/cities";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const professionals = await getListedCareProfessionals();
  const citySlugs = [...new Set(professionals.map((professional) => citySlug(professional.region.city)))];
  const staticRoutes = ["", "/buscar", "/para-dentistas"].map((path) => ({
    url: `${SITE.domain}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const cases = CARE_CASES.map((item) => ({
    url: `${SITE.domain}/para/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const cities = citySlugs.map((slug) => ({
    url: `${SITE.domain}/dentista/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const combos = citySlugs.flatMap((slug) =>
    CARE_CASES.map((item) => ({
      url: `${SITE.domain}/dentista/${slug}/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const profiles = professionals.map((professional) => ({
    url: `${SITE.domain}/profissional/${professional.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...cases, ...cities, ...combos, ...profiles];
}
