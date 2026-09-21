import { describe, expect, it } from "vitest";

import { mapHubProfessional, type HubDentistProjection } from "./adapter";

const dentist: HubDentistProjection = {
  id: "42",
  name: "Marina Pires",
  cro: "CRO-SP 102441",
  specialty: "Periodontia e Clínica Geral",
  bio: "Atendimento preventivo e periodontal.",
  clinicName: "Clínica Centro",
  clinicAddress: "Rua das Flores, 10, Centro, Taubaté - SP",
  clinicCity: "Taubaté",
  clinicState: "SP",
  clinicNeighborhood: "Centro",
  photoUrl: null,
};

describe("OdontoHub Care catalog adapter", () => {
  it("maps a Hub dentist to the Care public card", () => {
    const professional = mapHubProfessional(dentist);

    expect(professional.id).toBe("hub-42");
    expect(professional.slug).toBe("marina-pires-42");
    expect(professional.honorific).toBe("");
    expect(professional.name).toBe("Marina Pires");
    expect(professional.region.id).toBe("taubate");
    expect(professional.clinic.neighborhood).toBe("Centro");
    expect(professional.specialtyIds).toEqual(
      expect.arrayContaining(["periodontia", "clinica-geral"]),
    );
    expect(professional.intentIds).toEqual(expect.arrayContaining(["periodontia", "prevencao"]));
  });

  it("keeps incomplete approved profiles discoverable without inventing an address", () => {
    const professional = mapHubProfessional({
      ...dentist,
      id: "77",
      name: "João Lima",
      specialty: null,
      clinicAddress: null,
      clinicCity: null,
      clinicState: null,
      clinicNeighborhood: null,
    });

    expect(professional.region.city).toBe("Brasil");
    expect(professional.clinic.neighborhood).toBe("Endereço a confirmar");
    expect(professional.specialtyIds).toEqual(["clinica-geral"]);
  });

  it("extracts Dr/Dra from Hub names so the UI never shows only Dr", () => {
    const professional = mapHubProfessional({
      ...dentist,
      name: "Dr. João Silva",
    });

    expect(professional.honorific).toBe("Dr.");
    expect(professional.name).toBe("João Silva");
    expect(professional.slug).toBe("joao-silva-42");
  });
});
