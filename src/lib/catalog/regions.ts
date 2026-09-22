import type { Region } from "@/lib/catalog/types";
import { normalizeText } from "@/lib/intent/normalize";

export const REGIONS: readonly Region[] = [
  {
    id: "sao-paulo",
    city: "São Paulo",
    state: "São Paulo",
    stateCode: "SP",
    neighborhoods: ["Pinheiros", "Jardins", "Moema", "Vila Mariana", "Itaim Bibi", "Vila Madalena"],
  },
  {
    id: "rio-de-janeiro",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    stateCode: "RJ",
    neighborhoods: ["Copacabana", "Botafogo", "Ipanema", "Tijuca"],
  },
  {
    id: "belo-horizonte",
    city: "Belo Horizonte",
    state: "Minas Gerais",
    stateCode: "MG",
    neighborhoods: ["Savassi", "Lourdes"],
  },
  {
    id: "curitiba",
    city: "Curitiba",
    state: "Paraná",
    stateCode: "PR",
    neighborhoods: ["Batel"],
  },
  {
    id: "porto-alegre",
    city: "Porto Alegre",
    state: "Rio Grande do Sul",
    stateCode: "RS",
    neighborhoods: ["Moinhos de Vento"],
  },
  {
    id: "recife",
    city: "Recife",
    state: "Pernambuco",
    stateCode: "PE",
    neighborhoods: ["Boa Viagem"],
  },
  {
    id: "salvador",
    city: "Salvador",
    state: "Bahia",
    stateCode: "BA",
    neighborhoods: ["Caminho das Árvores"],
  },
  {
    id: "brasilia",
    city: "Brasília",
    state: "Distrito Federal",
    stateCode: "DF",
    neighborhoods: ["Asa Sul"],
  },
  {
    id: "florianopolis",
    city: "Florianópolis",
    state: "Santa Catarina",
    stateCode: "SC",
    neighborhoods: ["Centro"],
  },
  {
    id: "taubate",
    city: "Taubaté",
    state: "São Paulo",
    stateCode: "SP",
    neighborhoods: ["Centro", "Jardim das Nações", "Esplanada", "Independência"],
  },
  {
    id: "sao-jose-dos-campos",
    city: "São José dos Campos",
    state: "São Paulo",
    stateCode: "SP",
    neighborhoods: ["Centro", "Vila Ema", "Jardim Aquarius"],
  },
] as const;

export const REGION_BY_ID = Object.fromEntries(REGIONS.map((item) => [item.id, item])) as Record<
  string,
  Region
>;

export type LocationGuess = {
  region: Region | null;
  neighborhood: string | null;
  remainder: string;
};

function padded(value: string) {
  return ` ${normalizeText(value)} `;
}

function mentionsCity(text: string, city: string) {
  return padded(text).includes(` ${normalizeText(city)} `);
}

export function isStateNamedCity(region: Region) {
  return normalizeText(region.city) === normalizeText(region.state);
}

export function findCitiesInText(text: string, regions: readonly Region[] = REGIONS): Region[] {
  if (!normalizeText(text)) return [];
  return regions.filter((region) => mentionsCity(text, region.city));
}

export function pickCity(matches: readonly Region[]): Region | null {
  if (matches.length === 0) return null;
  const specific = matches.filter((region) => !isStateNamedCity(region));
  const pool = specific.length > 0 ? specific : [...matches];
  return [...pool].sort(
    (a, b) => normalizeText(b.city).length - normalizeText(a.city).length,
  )[0] ?? null;
}

/**
 * Clinic city wins when it names a municipality.
 * "São Paulo" in an address is often the state; a more specific city in the
 * same text keeps the dentist off the capital's pages.
 */
export function resolvePracticeCity(
  city: string | null,
  address: string | null,
  regions: readonly Region[] = REGIONS,
): Region | undefined {
  const exact = city
    ? regions.find((region) => normalizeText(region.city) === normalizeText(city))
    : undefined;
  const inAddress = address ? findCitiesInText(address, regions) : [];
  const specificAddress = pickCity(inAddress.filter((region) => !isStateNamedCity(region)));

  if (exact && isStateNamedCity(exact) && specificAddress) return specificAddress;
  if (exact) return exact;
  return pickCity(inAddress) ?? undefined;
}

function neighborhoodHits(text: string, regions: readonly Region[]) {
  const haystack = padded(text);
  const hits: { region: Region; neighborhood: string }[] = [];
  for (const region of regions) {
    for (const neighborhood of region.neighborhoods) {
      if (haystack.includes(` ${normalizeText(neighborhood)} `)) {
        hits.push({ region, neighborhood });
      }
    }
  }
  return hits;
}

export function parseLocation(
  query: string,
  explicitPlace?: string,
  regions: readonly Region[] = REGIONS,
): LocationGuess {
  const placeCities = explicitPlace ? findCitiesInText(explicitPlace, regions) : [];
  const queryCities = findCitiesInText(query, regions);
  let region = placeCities.length > 0 ? pickCity(placeCities) : pickCity(queryCities);
  let neighborhood: string | null = null;

  const hits = neighborhoodHits([explicitPlace, query].filter(Boolean).join(" "), regions);
  if (region) {
    neighborhood = hits.find((hit) => hit.region.id === region?.id)?.neighborhood ?? null;
  } else {
    const regionIds = new Set(hits.map((hit) => hit.region.id));
    if (regionIds.size === 1 && hits[0]) {
      region = hits[0].region;
      neighborhood = hits[0].neighborhood;
    }
  }

  let remainder = query;
  if (region) {
    remainder = remainder.replace(new RegExp(region.city, "ig"), " ");
    remainder = remainder.replace(new RegExp(`\\b${region.stateCode}\\b`, "ig"), " ");
  }
  if (neighborhood) {
    remainder = remainder.replace(new RegExp(neighborhood, "ig"), " ");
  }
  remainder = remainder.replace(/\b(em|no|na|perto de|região de|regiao de)\b/gi, " ").replace(/\s+/g, " ").trim();

  return { region, neighborhood, remainder };
}
