"use client";

import { useEffect, useMemo, useState } from "react";

import type { ProfessionalCard, Region } from "@/lib/catalog/types";
import { resolveUserRegion } from "@/lib/geo/resolve-user-region";
import {
  readStoredUserRegion,
  writeStoredUserRegion,
  type StoredUserRegion,
} from "@/lib/geo/user-region-storage";

export type UserRegionPhase = "loading" | "ready";

export function useUserRegion(catalogRegions: readonly Region[], dentists: readonly ProfessionalCard[]) {
  const [phase, setPhase] = useState<UserRegionPhase>("loading");
  const [userRegion, setUserRegion] = useState<StoredUserRegion | null>(null);
  const [rawCityLabel, setRawCityLabel] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function resolve() {
      const stored = readStoredUserRegion();
      if (stored) {
        if (active) {
          setUserRegion(stored);
          setPhase("ready");
        }
        return;
      }

      try {
        const response = await fetch("/api/geo", { cache: "no-store" });
        if (response.ok) {
          const payload = (await response.json()) as {
            city?: string | null;
            region?: StoredUserRegion | null;
          };
          if (!active) return;
          setRawCityLabel(payload.city ?? null);
          if (payload.region) {
            setUserRegion(payload.region);
            writeStoredUserRegion(payload.region);
            setPhase("ready");
            return;
          }
          if (payload.city) {
            setPhase("ready");
            return;
          }
        }
      } catch {
        /* fall through */
      }

      if (active) setPhase("ready");
    }

    void resolve();
    return () => {
      active = false;
    };
  }, []);

  const matchedRegion = useMemo(() => {
    if (userRegion) {
      return resolveUserRegion(userRegion.city, catalogRegions) ?? userRegion;
    }
    if (rawCityLabel) {
      return resolveUserRegion(rawCityLabel, catalogRegions);
    }
    return null;
  }, [catalogRegions, rawCityLabel, userRegion]);

  const displayCity = matchedRegion?.city ?? rawCityLabel ?? null;

  const localDentists = useMemo(() => {
    if (!matchedRegion?.id) return [];
    return dentists.filter((item) => item.region.id === matchedRegion.id);
  }, [dentists, matchedRegion]);

  return {
    phase,
    matchedRegion,
    displayCity,
    localDentists,
  };
}
