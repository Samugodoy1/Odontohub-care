import { describe, expect, it } from "vitest";

import { searchCare } from "./search";

describe("searchCare", () => {
  it("maps a broken tooth in São Paulo to restoration dentists", () => {
    const result = searchCare("Meu dente quebrou", "São Paulo");
    expect(result.intent.primary?.intent.id).toBe("dentistica");
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches[0].slug).toBe("helena-vasconcelos");
    expect(result.matches.every((item) => item.intentIds.includes("dentistica"))).toBe(true);
  });

  it("maps siso pain to surgery", () => {
    const result = searchCare("Meu siso está doendo");
    expect(result.intent.primary?.intent.id).toBe("cirurgia");
    expect(result.matches.map((item) => item.slug)).toEqual(
      expect.arrayContaining(["camila-duarte", "joao-paulo-mendes"]),
    );
    expect(result.matches.every((item) => item.intentIds.includes("cirurgia"))).toBe(true);
  });

  it("recommends pediatric dentists first for a child query", () => {
    const result = searchCare("Preciso de um dentista infantil");
    expect(result.intent.primary?.intent.id).toBe("pediatrica");
    expect(result.matches.slice(0, 2).map((item) => item.slug).sort()).toEqual(
      ["ana-luisa-freire", "sofia-carvalho"].sort(),
    );
  });

  it("opens a city dossier for dentista em Taubaté", () => {
    const result = searchCare("dentista em Taubaté");
    expect(result.location.region?.city).toBe("Taubaté");
    expect(result.cityDossier).toBe(true);
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches.every((item) => item.region.city === "Taubaté")).toBe(true);
  });

  it("maps dentista para extração to surgery in Taubaté", () => {
    const result = searchCare("dentista para extração", "Taubaté");
    expect(result.intent.primary?.intent.id).toBe("cirurgia");
    expect(result.matches.map((item) => item.slug)).toEqual(expect.arrayContaining(["eduardo-leal"]));
  });

  it("maps dentista para limpeza", () => {
    const result = searchCare("dentista para limpeza", "Taubaté");
    expect(result.intent.primary?.intent.id).toBe("prevencao");
    expect(result.matches.map((item) => item.slug)).toEqual(expect.arrayContaining(["marina-pires"]));
  });
});
