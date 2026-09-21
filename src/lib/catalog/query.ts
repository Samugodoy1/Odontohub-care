import { CLINICS, PROFESSIONALS } from "@/lib/catalog/seed";
import { REGION_BY_ID, REGIONS } from "@/lib/catalog/regions";
import { SPECIALTIES, SPECIALTY_BY_ID } from "@/lib/catalog/specialties";
import type {
  CatalogPort,
  CatalogQuery,
  Clinic,
  Professional,
  ProfessionalCard,
  Region,
  Specialty,
} from "@/lib/catalog/types";
import { normalizeText } from "@/lib/intent/normalize";

function hydrate(professional: Professional, clinic: Clinic, region: Region): ProfessionalCard {
  return {
    ...professional,
    clinic,
    region,
    specialties: professional.specialtyIds.map((id) => SPECIALTY_BY_ID[id]).filter(Boolean),
  };
}

function allCards(): ProfessionalCard[] {
  const clinics = new Map(CLINICS.map((clinic) => [clinic.id, clinic]));
  return PROFESSIONALS.flatMap((professional) => {
    const clinic = clinics.get(professional.clinicId);
    if (!clinic) return [];
    const region = REGION_BY_ID[clinic.regionId];
    if (!region) return [];
    return [hydrate(professional, clinic, region)];
  });
}

function rank(card: ProfessionalCard, query: CatalogQuery): number {
  let score = 0;
  if (query.intentIds.some((id) => card.intentIds.includes(id))) score += 10;
  if (query.intentIds[0] && card.intentIds[0] === query.intentIds[0]) score += 6;
  if (query.regionId && card.region.id === query.regionId) score += 8;
  if (
    query.neighborhood &&
    normalizeText(card.clinic.neighborhood) === normalizeText(query.neighborhood)
  ) {
    score += 5;
  }
  if (card.clinic.inOdontoHubNetwork) score += 1;
  if (card.acceptsNewPatients) score += 1;
  return score;
}

function queryCards(cards: ProfessionalCard[], query: CatalogQuery): ProfessionalCard[] {
  return cards
    .map((card) => ({ card, score: rank(card, query) }))
    .filter((item) => {
      if (query.intentIds.length === 0) return true;
      return query.intentIds.some((id) => item.card.intentIds.includes(id));
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.card);
}

export function catalogFromCards(cards: ProfessionalCard[]): CatalogPort {
  const regions = [...new Map(cards.map((card) => [card.region.id, card.region])).values()];

  return {
    listProfessionals(query: CatalogQuery): ProfessionalCard[] {
      return queryCards(cards, query);
    },
    getProfessional(slug: string): ProfessionalCard | null {
      return cards.find((card) => card.slug === slug) ?? null;
    },
    listRegions(): Region[] {
      return regions;
    },
    listSpecialties(): Specialty[] {
      return [...SPECIALTIES];
    },
  };
}

export const localCatalog: CatalogPort = {
  listProfessionals(query: CatalogQuery): ProfessionalCard[] {
    return queryCards(allCards(), query);
  },
  getProfessional(slug: string): ProfessionalCard | null {
    return allCards().find((card) => card.slug === slug) ?? null;
  },
  listRegions(): Region[] {
    return [...REGIONS];
  },
  listSpecialties(): Specialty[] {
    return [...SPECIALTIES];
  },
};

export const catalog: CatalogPort = localCatalog;
