import { catalogFromCards } from "@/lib/catalog/query";
import { parseDentistName } from "@/lib/catalog/names";
import { REGIONS, resolvePracticeCity } from "@/lib/catalog/regions";
import { SPECIALTY_BY_ID } from "@/lib/catalog/specialties";
import type { CatalogPort, ProfessionalCard, Region } from "@/lib/catalog/types";
import { CARE_INTENTS } from "@/lib/intent/taxonomy";
import { normalizeText } from "@/lib/intent/normalize";
import type { IntentId, SpecialtyId } from "@/lib/intent/types";

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

function enlargePhotoUrl(url: string | null): string | null {
  if (!url) return null;
  const googleSized = url.replace(/=s\d+(?:-c)?(?:\/)?$/i, "=s1200-c");
  if (googleSized !== url) return googleSized;
  return url.replace(
    /\/image\/upload\/(?!.*(?:w_|h_|c_fill))/,
    "/image/upload/f_auto,q_auto,c_fill,g_face,w_1200,h_1500/",
  );
}

function slugify(value: string) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function hasAlias(haystack: string, alias: string) {
  if (` ${haystack} `.includes(` ${alias} `)) return true;
  if (alias === "bucomaxilo" || alias === "implante") {
    return haystack.split(" ").some((token) => token.startsWith(alias));
  }
  return false;
}

export function specialtyIdsFromLabel(value: string | null): SpecialtyId[] {
  const normalized = normalizeText(value ?? "").replace(/\bcirurgiao\s+dentista\b/g, " ");
  const matches = SPECIALTY_ALIASES
    .filter(([, aliases]) => aliases.some((alias) => hasAlias(normalized, alias)))
    .map(([id]) => id);
  return matches.length > 0 ? [...new Set(matches)] : ["clinica-geral"];
}

export function intentsForSpecialties(ids: readonly SpecialtyId[]): IntentId[] {
  return CARE_INTENTS.filter((intent) => {
    const specific = intent.specialtyIds.filter((id) => id !== "clinica-geral");
    if (specific.some((id) => ids.includes(id))) return true;
    return ids.includes("clinica-geral");
  }).map((intent) => intent.id);
}

export function isListedOnCare(card: ProfessionalCard) {
  const city = normalizeText(card.region.city);
  const id = normalizeText(card.region.id);
  return city.length > 0 && city !== "brasil" && id !== "brasil";
}

function knownRegion(city: string | null, address: string | null): Region | undefined {
  return resolvePracticeCity(city, address, REGIONS);
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
  const mappedSpecialtyIds = specialtyIdsFromLabel(projection.specialty);
  const specialties = mappedSpecialtyIds.map((id) => SPECIALTY_BY_ID[id]).filter(Boolean);
  const intentIds = intentsForSpecialties(mappedSpecialtyIds);
  const region = mapRegion(projection);
  const neighborhood = projection.clinicNeighborhood?.trim()
    || region.neighborhoods.find((item) =>
      normalizeText(projection.clinicAddress ?? "").includes(normalizeText(item)))
    || "Endereço a confirmar";
  const parsed = parseDentistName(projection.name);
  const rawClinicName = projection.clinicName?.trim() || "";
  const clinicNameLooksLikePerson = rawClinicName
    && (normalizeText(rawClinicName) === normalizeText(parsed.displayName)
      || normalizeText(rawClinicName) === normalizeText(parsed.name));
  const clinicName = !rawClinicName || clinicNameLooksLikePerson
    ? `Consultório de ${parsed.displayName}`
    : rawClinicName;
  const clinicAddress = projection.clinicAddress?.trim()
    || [neighborhood, region.city, region.stateCode].filter(Boolean).join(", ");
  const specialtyNames = specialties.map((item) => item.name);

  return {
    id: `hub-${projection.id}`,
    slug: `${slugify(parsed.name) || "dentista"}-${projection.id}`,
    name: parsed.name,
    honorific: parsed.honorific,
    cro: projection.cro?.trim() || "CRO a confirmar",
    photoUrl: enlargePhotoUrl(projection.photoUrl),
    specialtyIds: mappedSpecialtyIds,
    intentIds,
    clinicId: `hub-clinic-${projection.id}`,
    bio: projection.bio?.trim()
      || `${parsed.displayName} atende pela rede OdontoHub em ${region.city}.`,
    treats: specialtyNames,
    approach: "Atendimento com agenda e prontuário integrados ao OdontoHub.",
    years: 0,
    acceptsNewPatients: true,
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
  note: "Care reads the public OdontoHub projection. Patient interest is posted to the Hub as a CARE appointment request.",
} as const;
