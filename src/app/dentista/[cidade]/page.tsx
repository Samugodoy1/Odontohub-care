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
  const description = `Dentistas em ${region.city} que usam o OdontoHub. Dossiê verificado do Care — qualidade cobrada, sem ranking pago.`;
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
      eyebrow="OdontoHub Care"
      title={`Dentista em ${region.city}.`}
      lede={`O dossiê de quem usa o OdontoHub em ${region.city}. Verificados. Fora da rede, fora do Care.`}
      dentists={dentists}
      initialQuery="dentista"
      initialPlace={region.city}
    />
  );
}

export const dynamicParams = false;
