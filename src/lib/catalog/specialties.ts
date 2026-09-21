import type { Specialty } from "@/lib/catalog/types";

export const SPECIALTIES: readonly Specialty[] = [
  { id: "clinica-geral", name: "Clínica geral", shortName: "Clínica geral" },
  { id: "dentistica", name: "Dentística", shortName: "Dentística" },
  { id: "endodontia", name: "Endodontia", shortName: "Endodontia" },
  { id: "cirurgia-bucomaxilofacial", name: "Cirurgia bucomaxilofacial", shortName: "Cirurgia" },
  { id: "ortodontia", name: "Ortodontia", shortName: "Ortodontia" },
  { id: "implantodontia", name: "Implantodontia", shortName: "Implante" },
  { id: "odontopediatria", name: "Odontopediatria", shortName: "Infantil" },
  { id: "estetica", name: "Estética dental", shortName: "Estética" },
  { id: "periodontia", name: "Periodontia", shortName: "Periodontia" },
  { id: "protese", name: "Prótese", shortName: "Prótese" },
  { id: "dtm", name: "DTM e dor orofacial", shortName: "DTM" },
  { id: "harmonizacao", name: "Harmonização orofacial", shortName: "Harmonização" },
] as const;

export const SPECIALTY_BY_ID = Object.fromEntries(
  SPECIALTIES.map((item) => [item.id, item]),
) as Record<Specialty["id"], Specialty>;
