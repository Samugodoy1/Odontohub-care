import { NextResponse } from "next/server";

import { parseReviewInput } from "@/lib/reviews/review";
import { reviewRepository } from "@/lib/reviews/store";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")?.trim() || "";
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ reviews: [] });
  }
  const reviews = await reviewRepository.list(slug || undefined);
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dados incompletos." }, { status: 400 });
  }

  const parsed = parseReviewInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const result = await reviewRepository.add(parsed.value);
  return NextResponse.json(
    { ok: true, review: result.review },
    { status: result.created ? 201 : 200 },
  );
}
