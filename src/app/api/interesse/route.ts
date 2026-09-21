import { NextResponse } from "next/server";

type InterestBody = {
  name?: string;
  phone?: string;
  neighborhood?: string;
  message?: string;
  professionalSlug?: string;
  intentLabel?: string;
  dentistId?: string | number;
};

function hubIdFromSlug(slug?: string) {
  const match = String(slug || "").match(/-(\d+)$/);
  return match?.[1] ?? null;
}

export async function POST(request: Request) {
  let body: InterestBody;
  try {
    body = (await request.json()) as InterestBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const dentistId = String(body.dentistId || hubIdFromSlug(body.professionalSlug) || "").trim();
  if (name.length < 2 || phone.replace(/\D/g, "").length < 8 || !dentistId) {
    return NextResponse.json({ ok: false, error: "Dados incompletos." }, { status: 400 });
  }

  const apiUrl = (process.env.CARE_API_URL || "https://api.odontohub.app.br").replace(/\/$/, "");

  try {
    const response = await fetch(`${apiUrl}/api/care/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dentistId,
        name,
        phone,
        neighborhood: body.neighborhood?.trim() || "",
        message: body.message?.trim() || "",
        intentLabel: body.intentLabel?.trim() || "",
        professionalSlug: body.professionalSlug || "",
      }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      return NextResponse.json(
        { ok: false, error: payload?.error || "Não foi possível enviar agora." },
        { status: response.status === 404 ? 404 : 502 },
      );
    }
    return NextResponse.json({
      ok: true,
      receivedAt: new Date().toISOString(),
      professionalSlug: body.professionalSlug ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Não foi possível enviar agora." }, { status: 502 });
  }
}
