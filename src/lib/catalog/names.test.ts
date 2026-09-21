import { describe, expect, it } from "vitest";

import { initialsOf, parseDentistName, shortNameOf } from "./names";

describe("parseDentistName", () => {
  it("does not leave Dr as the visible name", () => {
    expect(parseDentistName("Dr. João Silva")).toMatchObject({
      honorific: "Dr.",
      name: "João Silva",
      givenName: "João",
      displayName: "Dr. João Silva",
      shortName: "Dr. João",
      initials: "JS",
    });
    expect(parseDentistName("Dr Samuel Godoy").shortName).toBe("Dr. Samuel");
    expect(parseDentistName("Dra. Giovanna Favaris").displayName).toBe("Dra. Giovanna Favaris");
    expect(parseDentistName("Dr")).toMatchObject({
      displayName: "Dentista",
      shortName: "Dentista",
    });
    expect(shortNameOf({ name: "Dr Samuel Godoy" })).toBe("Dr. Samuel");
  });

  it("keeps names without honorific intact", () => {
    expect(parseDentistName("Marina Pires").displayName).toBe("Marina Pires");
    expect(shortNameOf({ honorific: "Dra.", name: "Marina Pires" })).toBe("Dra. Marina");
    expect(initialsOf({ name: "Dr. Marco Venâncio" })).toBe("MV");
  });
});
