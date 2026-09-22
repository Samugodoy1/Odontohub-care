import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DossierPage } from "@/components/care/dossier-page";
import { getListedCareCatalog } from "@/lib/catalog/adapter";
import { CITY_SLUGS, regionByCitySlug } from "@/lib/seo/cities";
import { CARE_CASES, getCase } from "@/lib/seo/cases";
import { NOINDEX_FOLLOW } from "@/lib/seo/robots";
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
  const catalog = await getListedCareCatalog();
  const region = regionByCitySlug(cidade)
    ?? catalog.listRegions().find((item) => item.id === cidade);
  const careCase = getCase(caso);
  if (!region || !careCase) return { title: "Dentista" };
  const result = searchCare(careCase.googleQuery, region.city, catalog);
  const title = `${careCase.title} em ${region.city}`;
  const description = `Encontre ${careCase.title.toLowerCase()} em ${region.city}. ${careCase.lede}`;
  return {
    title,
    description,
    keywords: [`${careCase.googleQuery} em ${region.city}`, `dentista em ${region.city}`],
    alternates: { canonical: `${SITE.domain}/dentista/${cidade}/${caso}` },
    openGraph: { title: `${title} · OdontoHub Care`, description },
    robots: result.matches.length === 0 ? NOINDEX_FOLLOW : undefined,
  };
}

export default async function CityCasePage({
  params,
}: {
  params: Promise<{ cidade: string; caso: string }>;
}) {
  const { cidade, caso } = await params;
  const catalog = await getListedCareCatalog();
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
      intentId={careCase.intentId}
      initialQuery={careCase.googleQuery}
      initialPlace={region.city}
    />
  );
}
