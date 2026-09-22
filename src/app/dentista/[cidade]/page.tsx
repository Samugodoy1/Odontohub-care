import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DossierPage } from "@/components/care/dossier-page";
import { getListedCareCatalog } from "@/lib/catalog/adapter";
import { regionByCitySlug, CITY_SLUGS } from "@/lib/seo/cities";
import { NOINDEX_FOLLOW } from "@/lib/seo/robots";
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
  const catalog = await getListedCareCatalog();
  const region = regionByCitySlug(cidade)
    ?? catalog.listRegions().find((item) => item.id === cidade);
  if (!region) return { title: "Dentista" };
  const dentists = catalog.listProfessionals({ intentIds: [], regionId: region.id });
  const title = `Dentista em ${region.city}`;
  const description = `Encontre dentista em ${region.city} para limpeza, extração, aparelho, implante e canal. Clínicas da rede OdontoHub selecionadas pelo Care.`;
  return {
    title,
    description,
    keywords: [`dentista em ${region.city}`, `dentista ${region.city}`, `clínica odontológica ${region.city}`],
    alternates: { canonical: `${SITE.domain}/dentista/${cidade}` },
    openGraph: { title: `${title} · OdontoHub Care`, description },
    robots: dentists.length === 0 ? NOINDEX_FOLLOW : undefined,
  };
}

export default async function CityPage({ params }: { params: Promise<{ cidade: string }> }) {
  const { cidade } = await params;
  const catalog = await getListedCareCatalog();
  const region = regionByCitySlug(cidade)
    ?? catalog.listRegions().find((item) => item.id === cidade);
  if (!region) notFound();

  const dentists = catalog.listProfessionals({ intentIds: [], regionId: region.id });

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
