export const REVIEW_HIGHLIGHTS = [
  { id: "clareza", label: "Explicou com clareza" },
  { id: "pontualidade", label: "Foi pontual" },
  { id: "acolhimento", label: "Acolheu bem" },
  { id: "cuidado", label: "Teve cuidado" },
  { id: "ambiente", label: "Ambiente tranquilo" },
] as const;

export type ReviewHighlightId = (typeof REVIEW_HIGHLIGHTS)[number]["id"];

export type PatientReview = {
  id: string;
  professionalSlug: string;
  authorName: string;
  highlights: ReviewHighlightId[];
  comment: string;
  createdAt: string;
};

const HIGHLIGHT_IDS = new Set<string>(REVIEW_HIGHLIGHTS.map((item) => item.id));

export type ReviewDraft = Omit<PatientReview, "id" | "createdAt">;

export function parseReviewInput(
  body: unknown,
): { ok: true; value: ReviewDraft } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Dados incompletos." };
  const raw = body as Record<string, unknown>;
  const professionalSlug = String(raw.professionalSlug || "").trim();
  const authorName = String(raw.authorName || "").trim().replace(/\s+/g, " ");
  const comment = String(raw.comment || "").trim().replace(/\s+/g, " ");
  const highlights = Array.isArray(raw.highlights)
    ? [...new Set(raw.highlights.map((item) => String(item)))].filter(
        (id): id is ReviewHighlightId => HIGHLIGHT_IDS.has(id),
      )
    : [];

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(professionalSlug) || professionalSlug.length > 80) {
    return { ok: false, error: "Profissional inválido." };
  }
  if (authorName.length < 2 || authorName.length > 60) {
    return { ok: false, error: "Diga como podemos te chamar." };
  }
  if (comment.length < 20 || comment.length > 800) {
    return { ok: false, error: "Conte em algumas frases como foi o atendimento." };
  }
  if (/https?:\/\/|www\./i.test(`${authorName} ${comment}`)) {
    return { ok: false, error: "O relato não pode incluir links." };
  }

  return {
    ok: true,
    value: { professionalSlug, authorName, highlights, comment },
  };
}

export function mentionedHighlights(reviews: readonly PatientReview[]) {
  const used = new Set(reviews.flatMap((review) => review.highlights));
  return REVIEW_HIGHLIGHTS.filter((item) => used.has(item.id));
}

export function byNewest(reviews: readonly PatientReview[]) {
  return [...reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
