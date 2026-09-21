import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DossierPage } from "@/components/care/dossier-page";
import { catalog } from "@/lib/catalog/query";
import { regionByCitySlug, CITY_SLUGS } from "@/lib/seo/cities";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CITY_SLUGS.map((cidade) => ({ cidade }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cidade: string }>;
}): Promise<Metadata> {
  const { cidade } = await params;
  const region = regionByCitySlug(cidade);
  if (!region) return { title: "Dentista" };
  const title = `Dentista em ${region.city}`;
  const description = `Dentistas em ${region.city} selecionados pelo Care. Encontre profissionais para o tratamento que você procura.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.domain}/dentista/${cidade}` },
    openGraph: { title: `${title} · OdontoHub Care`, description },
  };
}

export default async function CityPage({ params }: { params: Promise<{ cidade: string }> }) {
  const { cidade } = await params;
  const region = regionByCitySlug(cidade);
  if (!region) notFound();

  const dentists = catalog
    .listProfessionals({ intentIds: [] })
    .filter((item) => item.region.id === region.id);

  return (
    <DossierPage
      eyebrow="Na sua cidade"
      title={`Dentista em ${region.city}.`}
      lede={`Profissionais selecionados pelo Care em ${region.city}. A permanência na lista depende da qualidade do atendimento.`}
      dentists={dentists}
      initialQuery="dentista"
      initialPlace={region.city}
    />
  );
}

export const dynamicParams = false;
