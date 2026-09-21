/**
 * Adapter boundary for a future OdontoHub API sync.
 *
 * Hub models today (read-only observation of odontohub-api):
 *   users.name, users.cro, users.specialty, users.bio,
 *   users.clinic_name, users.clinic_address, users.photo_url
 *
 * Care maps those to Professional + Clinic without sharing a database.
 * When sync exists, implement CatalogPort against a read replica or
 * public projection. Do not write back to Hub from Care.
 */

export type HubDentistProjection = {
  id: string;
  name: string;
  cro: string | null;
  specialty: string | null;
  bio: string | null;
  clinicName: string | null;
  clinicAddress: string | null;
  photoUrl: string | null;
};

export const HUB_SYNC = {
  source: "odontohub-api",
  status: "not-connected",
  note: "Care MVP uses a local catalog. Sync is a later read-only projection.",
} as const;
