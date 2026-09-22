import type { Region } from "@/lib/catalog/types";

export const USER_REGION_STORAGE_KEY = "odontohub-care-user-region";

export type StoredUserRegion = Pick<Region, "id" | "city" | "stateCode">;

export function readStoredUserRegion(): StoredUserRegion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_REGION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredUserRegion;
    if (parsed?.id && parsed?.city) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function writeStoredUserRegion(region: StoredUserRegion) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USER_REGION_STORAGE_KEY, JSON.stringify(region));
  } catch {
    /* ignore */
  }
}

export function persistUserRegionFromCity(region: Region | null) {
  if (!region) return;
  writeStoredUserRegion({
    id: region.id,
    city: region.city,
    stateCode: region.stateCode,
  });
}
