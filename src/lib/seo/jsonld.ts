import type { ProfessionalCard } from "@/lib/catalog/types";
import { displayNameOf } from "@/lib/catalog/names";
import { SITE } from "@/lib/site";

export function dentistJsonLd(professional: ProfessionalCard) {
  const name = displayNameOf(professional);
  const url = `${SITE.domain}/profissional/${professional.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${url}#dentist`,
    name,
    url,
    image: professional.photoUrl || undefined,
    description: professional.bio,
    medicalSpecialty: professional.specialties.map((item) => item.name),
    identifier: professional.cro,
    address: {
      "@type": "PostalAddress",
      streetAddress: professional.clinic.address,
      addressLocality: professional.region.city,
      addressRegion: professional.region.stateCode,
      addressCountry: "BR",
    },
    worksFor: {
      "@type": "MedicalClinic",
      name: professional.clinic.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: professional.clinic.address,
        addressLocality: professional.region.city,
        addressRegion: professional.region.stateCode,
        addressCountry: "BR",
      },
    },
    parentOrganization: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
  };
}

export function itemListJsonLd(professionals: ProfessionalCard[], listName: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url,
    numberOfItems: professionals.length,
    itemListElement: professionals.slice(0, 20).map((professional, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE.domain}/profissional/${professional.slug}`,
      name: displayNameOf(professional),
    })),
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.domain}${item.path}`,
    })),
  };
}

export const CARE_FAQS = [
  {
    q: "Como encontrar um dentista no OdontoHub Care?",
    a: "Pesquise o tratamento e a cidade. O Care mostra dentistas da rede OdontoHub selecionados para aquele caso.",
  },
  {
    q: "O Care mostra qualquer dentista?",
    a: "Não. Só entram clínicas com conta ativa no OdontoHub. Alunos do Academy não aparecem na lista de pacientes.",
  },
  {
    q: "Como marco uma consulta?",
    a: "Abra o perfil do dentista e envie um pedido de contato. A solicitação chega na clínica pelo OdontoHub.",
  },
] as const;
