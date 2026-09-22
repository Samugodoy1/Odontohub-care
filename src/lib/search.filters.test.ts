import { describe, expect, it } from "vitest";

import { mapHubProfessional, type HubDentistProjection } from "@/lib/catalog/adapter";
import { catalogFromCards } from "@/lib/catalog/query";
import { searchCare } from "@/lib/search";

const base: HubDentistProjection = {
  id: "11",
  name: "Samuel Godoy",
  cro: "CRO-SP 1",
  specialty: "Clínica geral",
  bio: null,
  clinicName: "Consultório",
  clinicAddress: "Rua 1, Centro, Taubaté - SP",
  photoUrl: null,
  clinicCity: "Taubaté",
  clinicState: "SP",
  clinicNeighborhood: "Centro",
};

describe("search filters", () => {
  it("hides dentists without a city from a city search", () => {
    const local = mapHubProfessional(base);
    const unlocated = mapHubProfessional({
      ...base,
      id: "50",
      name: "Juan Pablo",
      clinicName: "JP Odontologia",
      clinicCity: null,
      clinicAddress: null,
      clinicNeighborhood: null,
      clinicState: null,
    });
    const result = searchCare("dentista para limpeza", "Taubaté", catalogFromCards([local, unlocated]));

    expect(result.matches.map((item) => item.slug)).toContain("samuel-godoy-11");
    expect(result.matches.map((item) => item.slug)).not.toContain("juan-pablo-50");
    expect(result.elsewhere.map((item) => item.slug)).not.toContain("juan-pablo-50");
  });

  it("does not list a general dentist on the siso or canal pages", () => {
    const general = mapHubProfessional(base);
    const surgeon = mapHubProfessional({
      ...base,
      id: "12",
      name: "Eduardo Leal",
      specialty: "Cirurgia e traumatologia bucomaxilofacial",
    });
    const catalog = catalogFromCards([general, surgeon]);

    const siso = searchCare("dentista para siso", "Taubaté", catalog);
    expect(siso.matches.map((item) => item.slug)).toEqual(["eduardo-leal-12"]);

    const canal = searchCare("dentista para canal", "Taubaté", catalog);
    expect(canal.matches).toEqual([]);
  });

  it("does not move a Taubaté search onto São Paulo because of the state code", () => {
    const local = mapHubProfessional(base);
    const capital = mapHubProfessional({
      ...base,
      id: "20",
      name: "Helena Vasconcelos",
      specialty: "Clínica geral",
      clinicCity: "São Paulo",
      clinicAddress: "Rua dos Pinheiros, 10, Pinheiros, São Paulo",
      clinicNeighborhood: "Pinheiros",
    });
    const result = searchCare(
      "dentista em Taubaté SP",
      "",
      catalogFromCards([local, capital]),
    );

    expect(result.location.region?.id).toBe("taubate");
    expect(result.matches.map((item) => item.slug)).toEqual(["samuel-godoy-11"]);
  });
});
