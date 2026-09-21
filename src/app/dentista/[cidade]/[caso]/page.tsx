import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DossierPage } from "@/components/care/dossier-page";
import { getCareCatalog } from "@/lib/catalog/adapter";
import { CITY_SLUGS, regionByCitySlug } from "@/lib/seo/cities";
import { CARE_CASES, getCase } from "@/lib/seo/cases";
import { searchCare } from "@/lib/search";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CITY_SLUGS.flatMap((cidade) => CARE_CASES.map((item) => ({ cidade, caso: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cidade: string; caso: string }>;
}): Promise<Metadata> {
  const { cidade, caso } = await params;
  const catalog = await getCareCatalog();
  const region = regionByCitySlug(cidade)
    ?? catalog.listRegions().find((item) => item.id === cidade);
  const careCase = getCase(caso);
  if (!region || !careCase) return { title: "Dentista" };
  const title = `${careCase.title} em ${region.city}`;
  const description = `${careCase.lede} Dentistas em ${region.city}, selecionados pelo Care.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.domain}/dentista/${cidade}/${caso}` },
    openGraph: { title: `${title} · OdontoHub Care`, description },
  };
}

export default async function CityCasePage({
  params,
}: {
  params: Promise<{ cidade: string; caso: string }>;
}) {
  const { cidade, caso } = await params;
  const catalog = await getCareCatalog();
  const region = regionByCitySlug(cidade)
    ?? catalog.listRegions().find((item) => item.id === cidade);
  const careCase = getCase(caso);
  if (!region || !careCase) notFound();

  const result = searchCare(careCase.googleQuery, region.city, catalog);

  return (
    <DossierPage
      eyebrow="Tratamento"
      title={`${careCase.headline.replace(".", "")} em ${region.city}.`}
      lede={careCase.lede}
      dentists={result.matches}
      elsewhere={result.elsewhere}
      initialQuery={careCase.googleQuery}
      initialPlace={region.city}
    />
  );
}
