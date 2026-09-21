import { catalogFromCards } from "@/lib/catalog/query";
import { REGIONS } from "@/lib/catalog/regions";
import { SPECIALTY_BY_ID } from "@/lib/catalog/specialties";
import type { CatalogPort, ProfessionalCard, Region } from "@/lib/catalog/types";
import { CARE_INTENTS } from "@/lib/intent/taxonomy";
import { normalizeText } from "@/lib/intent/normalize";
import type { SpecialtyId } from "@/lib/intent/types";

export type HubDentistProjection = {
  id: string;
  name: string;
  cro: string | null;
  specialty: string | null;
  bio: string | null;
  clinicName: string | null;
  clinicAddress: string | null;
  photoUrl: string | null;
  clinicCity: string | null;
  clinicState: string | null;
  clinicNeighborhood: string | null;
};

const SPECIALTY_ALIASES: readonly [SpecialtyId, readonly string[]][] = [
  ["clinica-geral", ["clinica geral", "clinico geral", "odontologia geral"]],
  ["dentistica", ["dentistica", "restauracao"]],
  ["endodontia", ["endodontia", "canal"]],
  ["cirurgia-bucomaxilofacial", ["bucomaxilo", "cirurgia"]],
  ["ortodontia", ["ortodontia", "ortodontista", "aparelho"]],
  ["implantodontia", ["implantodontia", "implante"]],
  ["odontopediatria", ["odontopediatria", "odontopediatra", "infantil"]],
  ["estetica", ["estetica", "clareamento", "faceta"]],
  ["periodontia", ["periodontia", "gengiva"]],
  ["protese", ["protese", "protesista", "dentadura"]],
  ["dtm", ["dtm", "dor orofacial", "atm", "bruxismo"]],
  ["harmonizacao", ["harmonizacao"]],
];

function slugify(value: string) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function specialtyIds(value: string | null): SpecialtyId[] {
  const normalized = normalizeText(value ?? "");
  const matches = SPECIALTY_ALIASES
    .filter(([, aliases]) => aliases.some((alias) => normalized.includes(alias)))
    .map(([id]) => id);
  return matches.length > 0 ? [...new Set(matches)] : ["clinica-geral"];
}

function knownRegion(city: string | null, address: string | null): Region | undefined {
  const haystack = normalizeText([city, address].filter(Boolean).join(" "));
  return REGIONS.find((region) => haystack.includes(normalizeText(region.city)));
}

function mapRegion(projection: HubDentistProjection): Region {
  const known = knownRegion(projection.clinicCity, projection.clinicAddress);
  if (known) {
    const neighborhoods = projection.clinicNeighborhood
      ? [...new Set([...known.neighborhoods, projection.clinicNeighborhood])]
      : known.neighborhoods;
    return { ...known, neighborhoods };
  }

  const city = projection.clinicCity?.trim() || "Brasil";
  const stateCode = projection.clinicState?.trim().toUpperCase() || "BR";
  return {
    id: slugify(city) || "brasil",
    city,
    state: stateCode,
    stateCode,
    neighborhoods: projection.clinicNeighborhood ? [projection.clinicNeighborhood] : [],
  };
}

export function mapHubProfessional(projection: HubDentistProjection): ProfessionalCard {
  const mappedSpecialtyIds = specialtyIds(projection.specialty);
  const specialties = mappedSpecialtyIds.map((id) => SPECIALTY_BY_ID[id]).filter(Boolean);
  const intentIds = CARE_INTENTS
    .filter((intent) => intent.specialtyIds.some((id) => mappedSpecialtyIds.includes(id)))
    .map((intent) => intent.id);
  const region = mapRegion(projection);
  const neighborhood = projection.clinicNeighborhood?.trim()
    || region.neighborhoods.find((item) =>
      normalizeText(projection.clinicAddress ?? "").includes(normalizeText(item)))
    || "Endereço a confirmar";
  const clinicName = projection.clinicName?.trim() || `Consultório de ${projection.name}`;
  const clinicAddress = projection.clinicAddress?.trim()
    || [neighborhood, region.city, region.stateCode].filter(Boolean).join(", ");
  const specialtyNames = specialties.map((item) => item.name);

  return {
    id: `hub-${projection.id}`,
    slug: `${slugify(projection.name) || "dentista"}-${projection.id}`,
    name: projection.name.trim(),
    honorific: "",
    cro: projection.cro?.trim() || "CRO a confirmar",
    photoUrl: projection.photoUrl,
    specialtyIds: mappedSpecialtyIds,
    intentIds,
    clinicId: `hub-clinic-${projection.id}`,
    bio: projection.bio?.trim()
      || `${projection.name} atende pela rede OdontoHub em ${region.city}.`,
    treats: specialtyNames,
    approach: "Atendimento com agenda e prontuário integrados ao OdontoHub.",
    years: 0,
    acceptsNewPatients: false,
    clinic: {
      id: `hub-clinic-${projection.id}`,
      name: clinicName,
      slug: `${slugify(clinicName)}-${projection.id}`,
      regionId: region.id,
      neighborhood,
      address: clinicAddress,
      inOdontoHubNetwork: true,
      note: "Consultório conectado à rede OdontoHub.",
    },
    region,
    specialties,
  };
}

function isProjection(value: unknown): value is HubDentistProjection {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<HubDentistProjection>;
  return typeof candidate.id === "string"
    && typeof candidate.name === "string"
    && candidate.name.trim().length > 0;
}

export async function getCareProfessionals(): Promise<ProfessionalCard[]> {
  const apiUrl = (process.env.CARE_API_URL || "https://api.odontohub.app.br").replace(/\/$/, "");

  try {
    const response = await fetch(`${apiUrl}/api/care/professionals`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      console.error(`Care catalog request failed with ${response.status}.`);
      return [];
    }
    const payload: unknown = await response.json();
    const professionals = (
      payload && typeof payload === "object" && Array.isArray((payload as { professionals?: unknown }).professionals)
        ? (payload as { professionals: unknown[] }).professionals
        : []
    );
    return professionals.filter(isProjection).map(mapHubProfessional);
  } catch (error) {
    console.error("Care catalog request failed:", error);
    return [];
  }
}

export async function getCareCatalog(): Promise<CatalogPort> {
  return catalogFromCards(await getCareProfessionals());
}

export const HUB_SYNC = {
  source: "odontohub-api",
  status: "connected",
  note: "Care reads the public OdontoHub projection and never writes to the Hub.",
} as const;
