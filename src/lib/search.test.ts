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

  it("maps pediatric queries only to pediatric dentists", () => {
    const result = searchCare("Preciso de um dentista infantil");
    expect(result.intent.primary?.intent.id).toBe("pediatrica");
    expect(result.matches.map((item) => item.slug).sort()).toEqual(
      ["ana-luisa-freire", "sofia-carvalho"].sort(),
    );
  });
});
