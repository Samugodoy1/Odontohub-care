import { findCitiesInText, pickCity, REGIONS } from "@/lib/catalog/regions";
import type { Region } from "@/lib/catalog/types";
import { normalizeText } from "@/lib/intent/normalize";

function regionPool(catalogRegions: readonly Region[]) {
  return [...new Map([...REGIONS, ...catalogRegions].map((region) => [region.id, region])).values()];
}

export function resolveUserRegion(
  cityLabel: string | null | undefined,
  catalogRegions: readonly Region[] = [],
): Region | null {
  const trimmed = cityLabel?.trim();
  if (!trimmed) return null;

  const pool = regionPool(catalogRegions);
  const exact = pool.find((region) => normalizeText(region.city) === normalizeText(trimmed));
  if (exact) return exact;

  const fromText = pickCity(findCitiesInText(trimmed, pool));
  if (fromText) return fromText;

  const loose = pool.find((region) => {
    const city = normalizeText(region.city);
    const probe = normalizeText(trimmed);
    return probe.includes(city) || city.includes(probe);
  });
  return loose ?? null;
}

export function decodeGeoCityHeader(value: string | null): string | null {
  if (!value?.trim()) return null;
  try {
    return decodeURIComponent(value.replace(/\+/g, " ")).trim();
  } catch {
    return value.trim();
  }
}
