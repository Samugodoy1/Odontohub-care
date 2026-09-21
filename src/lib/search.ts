import { catalog } from "@/lib/catalog/query";
import { parseLocation, REGIONS } from "@/lib/catalog/regions";
import type { CatalogPort, ProfessionalCard, Region } from "@/lib/catalog/types";
import { matchIntent, type IntentMatchResult } from "@/lib/intent/matcher";
import { normalizeText } from "@/lib/intent/normalize";

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
  cityDossier: boolean;
};

const GENERIC_NEED = /^(dentista|dentistas|odontologista|odontologia)?$/;

function isGenericNeed(remainder: string) {
  return GENERIC_NEED.test(normalizeText(remainder));
}

export function searchCare(
  query: string,
  place = "",
  source: CatalogPort = catalog,
): SearchResult {
  const regions = [
    ...new Map(
      [...REGIONS, ...source.listRegions()].map((region) => [region.id, region]),
    ).values(),
  ];
  const location = parseLocation(query, place, regions);
  const intentQuery = location.remainder || query;
  const generic = isGenericNeed(intentQuery);
  const intent = generic ? matchIntent("") : matchIntent(intentQuery);
  const primaryIds = intent.primary ? [intent.primary.intent.id] : [];

  const pool = source.listProfessionals({
    intentIds: primaryIds,
    regionId: location.region?.id,
    neighborhood: location.neighborhood ?? undefined,
  });

  const local = location.region
    ? pool.filter((item) => item.region.id === location.region?.id)
    : pool;
  const elsewhere = location.region
    ? source
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
    cityDossier: Boolean(location.region && (generic || intent.unknown)),
  };
}
