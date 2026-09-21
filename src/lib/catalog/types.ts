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
  honorific: "Dr." | "Dra.";
  cro: string;
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
 * Future sync from OdontoHub API lands behind this port.
 * Care never mutates Hub. The adapter can later map users.specialty,
 * users.clinic_name, users.clinic_address, users.cro, users.bio.
 */
export type CatalogPort = {
  listProfessionals(query: CatalogQuery): ProfessionalCard[];
  getProfessional(slug: string): ProfessionalCard | null;
  listRegions(): Region[];
  listSpecialties(): Specialty[];
};
