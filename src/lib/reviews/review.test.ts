import { describe, expect, it } from "vitest";

import { mentionedHighlights, parseReviewInput } from "@/lib/reviews/review";

describe("patient reviews", () => {
  it("accepts a written account and drops any star score", () => {
    const parsed = parseReviewInput({
      professionalSlug: "samuel-godoy-11",
      authorName: "Marina",
      comment: "Explicou cada etapa da limpeza com calma e sem pressa.",
      highlights: ["clareza", "nota", "estrelas"],
      rating: 5,
      stars: 4,
    });

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value.highlights).toEqual(["clareza"]);
    expect(parsed.value).not.toHaveProperty("rating");
    expect(parsed.value).not.toHaveProperty("stars");
  });

  it("keeps mentioned themes in a fixed order, without a score", () => {
    const themes = mentionedHighlights([
      {
        id: "1",
        professionalSlug: "samuel-godoy-11",
        authorName: "Ana",
        highlights: ["acolhimento", "clareza"],
        comment: "Fui bem recebida e entendi o tratamento.",
        createdAt: "2026-09-01T12:00:00.000Z",
      },
    ]);

    expect(themes.map((item) => item.id)).toEqual(["clareza", "acolhimento"]);
  });

});