import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getListedCareRegions } from "@/lib/catalog/adapter";
import { decodeGeoCityHeader, resolveUserRegion } from "@/lib/geo/resolve-user-region";

export async function GET() {
  const headerStore = await headers();
  const rawCity =
    decodeGeoCityHeader(headerStore.get("x-vercel-ip-city"))
    ?? decodeGeoCityHeader(headerStore.get("cf-ipcity"));
  const catalogRegions = await getListedCareRegions();
  const region = resolveUserRegion(rawCity, catalogRegions);

  return NextResponse.json({
    city: rawCity,
    region: region
      ? { id: region.id, city: region.city, stateCode: region.stateCode }
      : null,
  });
}
