import { INTENT_BY_ID } from "@/lib/intent/taxonomy";
import type { ProfessionalCard } from "@/lib/catalog/types";
import type { IntentId } from "@/lib/intent/types";

export function isSpecialistForIntent(card: ProfessionalCard, intentId: IntentId) {
  const intent = INTENT_BY_ID[intentId];
  if (!intent) return false;
  const specific = intent.specialtyIds.filter((id) => id !== "clinica-geral");
  if (specific.length === 0) return card.specialtyIds.includes("clinica-geral");
  return specific.some((id) => card.specialtyIds.includes(id));
}

export function splitByRecommendation(dentists: readonly ProfessionalCard[], intentId?: IntentId | null) {
  if (!intentId) {
    return { recommended: [...dentists], also: [] as ProfessionalCard[] };
  }
  const recommended: ProfessionalCard[] = [];
  const also: ProfessionalCard[] = [];
  for (const dentist of dentists) {
    if (isSpecialistForIntent(dentist, intentId)) recommended.push(dentist);
    else also.push(dentist);
  }
  return { recommended, also };
}
