import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DossierPage } from "@/components/care/dossier-page";
import { getListedCareCatalog } from "@/lib/catalog/adapter";
import { CARE_CASES, getCase } from "@/lib/seo/cases";
import { NOINDEX_FOLLOW } from "@/lib/seo/robots";
import { searchCare } from "@/lib/search";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CARE_CASES.map((item) => ({ caso: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ caso: string }>;
}): Promise<Metadata> {
  const { caso } = await params;
  const careCase = getCase(caso);
  if (!careCase) return { title: "Dentista" };
  const catalog = await getListedCareCatalog();
  const result = searchCare(careCase.googleQuery, "", catalog);
  return {
    title: `${careCase.title} | OdontoHub Care`,
    description: careCase.lede,
    keywords: [careCase.googleQuery, careCase.title, "dentista perto de mim"],
    alternates: { canonical: `${SITE.domain}/para/${caso}` },
    openGraph: { title: `${careCase.title} · OdontoHub Care`, description: careCase.lede },
    robots: result.matches.length === 0 ? NOINDEX_FOLLOW : undefined,
  };
}

export default async function CasePage({ params }: { params: Promise<{ caso: string }> }) {
  const { caso } = await params;
  const careCase = getCase(caso);
  if (!careCase) notFound();

  const catalog = await getListedCareCatalog();
  const result = searchCare(careCase.googleQuery, "", catalog);

  return (
    <DossierPage
      eyebrow="Tratamento"
      title={careCase.headline}
      lede={careCase.lede}
      dentists={result.matches}
      intentId={careCase.intentId}
      initialQuery={careCase.googleQuery}
    />
  );
}

export const dynamicParams = false;
