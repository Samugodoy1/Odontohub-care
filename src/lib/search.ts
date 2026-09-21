import { catalog } from "@/lib/catalog/query";
import { parseLocation } from "@/lib/catalog/regions";
import type { ProfessionalCard, Region } from "@/lib/catalog/types";
import { matchIntent, type IntentMatchResult } from "@/lib/intent/matcher";

export type SearchResult = {
  query: string;
  place: string;
  location: {
    region: Region | null;
    neighborhood: string | null;
  };
  intent: IntentMatchResult;
  matches: ProfessionalCard[];
  elsewhere: ProfessionalCard[];
};

export function searchCare(query: string, place = ""): SearchResult {
  const location = parseLocation(query, place);
  const intentQuery = location.remainder || query;
  const intent = matchIntent(intentQuery);
  const primaryIds = intent.primary ? [intent.primary.intent.id] : [];

  const pool = catalog.listProfessionals({
    intentIds: primaryIds,
    regionId: location.region?.id,
    neighborhood: location.neighborhood ?? undefined,
  });

  const local = location.region
    ? pool.filter((item) => item.region.id === location.region?.id)
    : pool;
  const elsewhere = location.region
    ? catalog
        .listProfessionals({ intentIds: primaryIds })
        .filter((item) => item.region.id !== location.region?.id)
    : [];

  return {
    query,
    place,
    location: {
      region: location.region,
      neighborhood: location.neighborhood,
    },
    intent,
    matches: local,
    elsewhere,
  };
}
