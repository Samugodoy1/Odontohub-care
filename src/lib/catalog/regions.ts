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

export function parseLocation(query: string, explicitPlace?: string): LocationGuess {
  const haystack = [explicitPlace, query].filter(Boolean).join(" ");
  const normalized = normalizeText(haystack);

  let region: Region | null = null;
  let neighborhood: string | null = null;

  for (const item of REGIONS) {
    const cityNorm = normalizeText(item.city);
    const stateNorm = normalizeText(item.stateCode);
    if (normalized.includes(cityNorm) || normalized.split(" ").includes(stateNorm.toLowerCase())) {
      region = item;
      break;
    }
    if (item.city === "São Paulo" && (normalized.includes("sao paulo") || normalized.includes("sampa"))) {
      region = item;
      break;
    }
  }

  for (const item of region ? [region] : REGIONS) {
    for (const n of item.neighborhoods) {
      if (normalized.includes(normalizeText(n))) {
        neighborhood = n;
        region = item;
        break;
      }
    }
    if (neighborhood) break;
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
