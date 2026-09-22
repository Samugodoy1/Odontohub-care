import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { mentionedHighlights, parseReviewInput } from "@/lib/reviews/review";
import { createReviewRepository } from "@/lib/reviews/store";

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

  it("stores reviews by time and does not rank them", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "care-reviews-"));
    const repository = createReviewRepository(path.join(directory, "reviews.json"));
    const older = await repository.add({
      professionalSlug: "samuel-godoy-11",
      authorName: "Ana",
      highlights: ["pontualidade"],
      comment: "A consulta começou no horário combinado.",
    });
    const newer = await repository.add({
      professionalSlug: "samuel-godoy-11",
      authorName: "Paulo",
      highlights: [],
      comment: "O consultório explicou o retorno com clareza.",
    });

    const listed = await repository.list("samuel-godoy-11");
    expect(listed.map((item) => item.id)).toEqual([newer.review.id, older.review.id]);
    expect(listed.every((item) => !("rating" in item) && !("stars" in item))).toBe(true);

    const raw = JSON.parse(await readFile(path.join(directory, "reviews.json"), "utf8")) as unknown[];
    expect(raw).toHaveLength(2);
  });
});