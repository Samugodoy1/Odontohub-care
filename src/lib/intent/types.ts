export type IntentId =
  | "dentistica"
  | "endodontia"
  | "cirurgia"
  | "ortodontia"
  | "implante"
  | "pediatrica"
  | "estetica"
  | "periodontia"
  | "prevencao"
  | "protese"
  | "dtm"
  | "urgencia";

export type SpecialtyId =
  | "clinica-geral"
  | "dentistica"
  | "endodontia"
  | "cirurgia-bucomaxilofacial"
  | "ortodontia"
  | "implantodontia"
  | "odontopediatria"
  | "estetica"
  | "periodontia"
  | "protese"
  | "dtm"
  | "harmonizacao";

export type CareIntent = {
  id: IntentId;
  label: string;
  patientLabel: string;
  explanation: string;
  specialtyIds: SpecialtyId[];
  phrases: readonly string[];
};
