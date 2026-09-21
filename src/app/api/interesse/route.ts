import { NextResponse } from "next/server";

type InterestBody = {
  name?: string;
  phone?: string;
  neighborhood?: string;
  message?: string;
  professionalSlug?: string;
  intentLabel?: string;
};

export async function POST(request: Request) {
  let body: InterestBody;
  try {
    body = (await request.json()) as InterestBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  if (name.length < 2 || phone.length < 8) {
    return NextResponse.json({ ok: false, error: "Dados incompletos." }, { status: 400 });
  }

  // MVP: accept the interest. A later sync can POST a lead into Hub without Care writing to Hub's DB.
  return NextResponse.json({
    ok: true,
    receivedAt: new Date().toISOString(),
    professionalSlug: body.professionalSlug ?? null,
  });
}
