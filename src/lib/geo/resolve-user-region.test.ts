import { describe, expect, it } from "vitest";

import { decodeGeoCityHeader, resolveUserRegion } from "@/lib/geo/resolve-user-region";

describe("resolveUserRegion", () => {
  it("matches Vercel city headers to catalog regions", () => {
    expect(resolveUserRegion("Taubaté")).toMatchObject({ id: "taubate" });
    expect(resolveUserRegion(decodeGeoCityHeader("Sao%20Paulo"))).toMatchObject({ id: "sao-paulo" });
  });
});
