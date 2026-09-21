import { describe, expect, it } from "vitest";

import { matchIntent } from "./matcher";

function primaryId(query: string) {
  const result = matchIntent(query);
  expect(result.primary).toBeTruthy();
  return result.primary?.intent.id;
}

describe("matchIntent", () => {
  it("maps the launch examples", () => {
    expect(primaryId("Meu dente quebrou")).toBe("dentistica");
    expect(primaryId("Estou com dor de dente")).toBe("endodontia");
    expect(primaryId("Preciso tirar o siso")).toBe("cirurgia");
    expect(primaryId("Quero colocar aparelho")).toBe("ortodontia");
    expect(primaryId("Preciso de implante")).toBe("implante");
    expect(primaryId("Minha restauração caiu")).toBe("dentistica");
    expect(primaryId("Meu dente está escuro")).toBe("estetica");
    expect(primaryId("Preciso de um dentista infantil")).toBe("pediatrica");
  });

  it("understands colloquial PT-BR", () => {
    expect(primaryId("Meu siso está doendo")).toBe("cirurgia");
    expect(primaryId("A massa do dente caiu")).toBe("dentistica");
    expect(primaryId("Meu filho está com dor de dente")).toBe("pediatrica");
    expect(primaryId("Gengiva sangrando na escova")).toBe("periodontia");
    expect(primaryId("Range os dentes à noite")).toBe("dtm");
    expect(primaryId("Bati a boca e o dente saiu")).toBe("urgencia");
    expect(primaryId("Quero clarear os dentes")).toBe("estetica");
    expect(primaryId("Perdi um dente e quero repor")).toBe("implante");
    expect(primaryId("Preciso de dentadura")).toBe("protese");
    expect(primaryId("Quero uma limpeza")).toBe("prevencao");
  });

  it("returns alternatives and confidence", () => {
    const result = matchIntent("Meu siso está doendo");
    expect(result.unknown).toBe(false);
    expect(result.primary).toBeTruthy();
    expect(result.primary!.confidence).toBeGreaterThan(0.4);
    expect(result.primary!.confidence).toBeLessThanOrEqual(0.98);
    const altIds = result.alternatives.map((item) => item.intent.id);
    expect(altIds.includes("endodontia") || altIds.includes("urgencia")).toBe(true);
  });

  it("handles empty and unknown queries", () => {
    expect(matchIntent("").unknown).toBe(true);
    expect(matchIntent("   ").unknown).toBe(true);
    const unknown = matchIntent("quero pintar a casa de azul");
    expect(unknown.unknown).toBe(true);
    expect(unknown.primary).toBeNull();
  });

  it("is accent and case insensitive", () => {
    expect(primaryId("RESTAURAÇÃO CAIU")).toBe("dentistica");
    expect(primaryId("restauracao caiu")).toBe("dentistica");
    expect(primaryId("odontopediatra")).toBe("pediatrica");
  });
});
