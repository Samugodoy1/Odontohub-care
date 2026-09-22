import { describe, expect, it } from "vitest";

import { parseLocation, resolvePracticeCity } from "./regions";

describe("practice city resolution", () => {
  it("prefers Taubaté over the state name São Paulo", () => {
    expect(
      resolvePracticeCity("São Paulo", "Rua 1, Centro, Taubaté - São Paulo")?.id,
    ).toBe("taubate");
  });

  it("keeps a São Paulo clinic in the capital", () => {
    expect(resolvePracticeCity("São Paulo", "Rua dos Pinheiros, 10, Pinheiros, São Paulo")?.id).toBe(
      "sao-paulo",
    );
  });

  it("reads Taubaté SP as Taubaté, not the capital", () => {
    expect(parseLocation("dentista em Taubaté SP").region?.city).toBe("Taubaté");
  });

  it("does not assign a city from the shared neighborhood Centro", () => {
    expect(parseLocation("dentista no centro").region).toBeNull();
  });

  it("uses a neighborhood only when it belongs to one city", () => {
    const location = parseLocation("dentista em Pinheiros");
    expect(location.region?.id).toBe("sao-paulo");
    expect(location.neighborhood).toBe("Pinheiros");
  });
});
