import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  byNewest,
  type PatientReview,
  type ReviewDraft,
} from "@/lib/reviews/review";

function isReview(value: unknown): value is PatientReview {
  if (!value || typeof value !== "object") return false;
  const review = value as Partial<PatientReview>;
  return typeof review.id === "string"
    && typeof review.professionalSlug === "string"
    && typeof review.authorName === "string"
    && typeof review.comment === "string"
    && typeof review.createdAt === "string"
    && Array.isArray(review.highlights);
}

async function readReviewFile(filePath: string): Promise<PatientReview[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isReview) : [];
  } catch {
    return [];
  }
}

export function createReviewRepository(filePath: string, runtimePath = "") {
  let queue: Promise<unknown> = Promise.resolve();
  const mirrors = runtimePath ? [filePath, runtimePath] : [filePath];

  function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const run = queue.then(task, task);
    queue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  async function readAll(): Promise<PatientReview[]> {
    const batches = await Promise.all(mirrors.map((file) => readReviewFile(file)));
    const byId = new Map<string, PatientReview>();
    for (const review of batches.flat()) byId.set(review.id, review);
    return [...byId.values()];
  }

  async function writeAll(reviews: PatientReview[]) {
    const payload = `${JSON.stringify(reviews, null, 2)}\n`;
    let stored = false;
    for (const file of mirrors) {
      try {
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, payload, "utf8");
        stored = true;
        break;
      } catch {
        stored = false;
      }
    }
    if (!stored) {
      throw new Error("Não foi possível guardar o relato.");
    }
  }

  return {
    async list(professionalSlug?: string) {
      const reviews = await readAll();
      const filtered = professionalSlug
        ? reviews.filter((review) => review.professionalSlug === professionalSlug)
        : reviews;
      return byNewest(filtered);
    },
    async add(draft: ReviewDraft) {
      return enqueue(async () => {
        const reviews = await readAll();
        const duplicate = reviews.find(
          (review) =>
            review.professionalSlug === draft.professionalSlug
            && review.authorName.localeCompare(draft.authorName, "pt-BR", { sensitivity: "accent" }) === 0
            && review.comment === draft.comment,
        );
        if (duplicate) return { created: false as const, review: duplicate };
        const review: PatientReview = {
          ...draft,
          id: randomUUID(),
          createdAt: new Date().toISOString(),
        };
        await writeAll([review, ...reviews]);
        return { created: true as const, review };
      });
    },
  };
}

const dataFile = path.join(process.cwd(), "data", "reviews.json");
const runtimeFile = path.join("/tmp", "odontohub-care-reviews.json");

export const reviewRepository = createReviewRepository(dataFile, runtimeFile);
