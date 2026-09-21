import { REGIONS } from "@/lib/catalog/regions";
import type { Region } from "@/lib/catalog/types";
import { normalizeText } from "@/lib/intent/normalize";

export function citySlug(city: string) {
  return normalizeText(city).replace(/\s+/g, "-");
}

export function regionByCitySlug(slug: string): Region | undefined {
  return REGIONS.find((region) => citySlug(region.city) === slug);
}

export const CITY_SLUGS = REGIONS.map((region) => citySlug(region.city));
