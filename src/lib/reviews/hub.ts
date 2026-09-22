import type { PatientReview, ReviewDraft } from "@/lib/reviews/review";

function careApiUrl() {
  return (process.env.CARE_API_URL || "https://api.odontohub.app.br").replace(/\/$/, "");
}

function isPatientReview(value: unknown): value is PatientReview {
  if (!value || typeof value !== "object") return false;
  const review = value as Partial<PatientReview>;
  return typeof review.id === "string"
    && typeof review.professionalSlug === "string"
    && typeof review.authorName === "string"
    && typeof review.comment === "string"
    && typeof review.createdAt === "string"
    && Array.isArray(review.highlights);
}

export async function listReviewsFromHub(professionalSlug?: string): Promise<PatientReview[]> {
  const params = professionalSlug ? `?slug=${encodeURIComponent(professionalSlug)}` : "";
  const response = await fetch(`${careApiUrl()}/api/care/reviews${params}`, {
    next: professionalSlug ? { revalidate: 30 } : { revalidate: 60 },
  });
  if (!response.ok) return [];
  const payload: unknown = await response.json();
  const reviews = payload && typeof payload === "object" && Array.isArray((payload as { reviews?: unknown }).reviews)
    ? (payload as { reviews: unknown[] }).reviews
    : [];
  return reviews.filter(isPatientReview);
}

export async function addReviewToHub(
  draft: ReviewDraft,
): Promise<{ ok: true; review: PatientReview; created: boolean } | { ok: false; error: string; status: number }> {
  const response = await fetch(`${careApiUrl()}/api/care/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
    cache: "no-store",
  });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = payload && typeof payload === "object" && typeof (payload as { error?: unknown }).error === "string"
      ? (payload as { error: string }).error
      : "Não foi possível publicar o relato.";
    return { ok: false, error, status: response.status };
  }
  const review = payload && typeof payload === "object" ? (payload as { review?: unknown }).review : null;
  if (!isPatientReview(review)) {
    return { ok: false, error: "Resposta inválida do servidor.", status: 502 };
  }
  const created = Boolean(
    payload && typeof payload === "object" && (payload as { created?: unknown }).created,
  );
  return { ok: true, review, created };
}
