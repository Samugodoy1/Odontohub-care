import type { IntentId, SpecialtyId } from "@/lib/intent/types";

export type Region = {
  id: string;
  city: string;
  state: string;
  stateCode: string;
  neighborhoods: string[];
};

export type Specialty = {
  id: SpecialtyId;
  name: string;
  shortName: string;
};

export type Clinic = {
  id: string;
  name: string;
  slug: string;
  regionId: string;
  neighborhood: string;
  address: string;
  inOdontoHubNetwork: boolean;
  note: string;
};

export type Professional = {
  id: string;
  slug: string;
  name: string;
  honorific: "Dr." | "Dra." | "";
  cro: string;
  photoUrl?: string | null;
  specialtyIds: SpecialtyId[];
  intentIds: IntentId[];
  clinicId: string;
  bio: string;
  treats: string[];
  approach: string;
  years: number;
  acceptsNewPatients: boolean;
};

export type ProfessionalCard = Professional & {
  clinic: Clinic;
  region: Region;
  specialties: Specialty[];
};

export type CatalogQuery = {
  intentIds: IntentId[];
  city?: string;
  neighborhood?: string;
  regionId?: string;
};

/**
 * Care reads the OdontoHub public projection behind this port.
 * Visibility is administered in Hub; Care never mutates it.
 */
export type CatalogPort = {
  listProfessionals(query: CatalogQuery): ProfessionalCard[];
  getProfessional(slug: string): ProfessionalCard | null;
  listRegions(): Region[];
  listSpecialties(): Specialty[];
};
