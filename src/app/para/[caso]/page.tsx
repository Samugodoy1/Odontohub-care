import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DossierPage } from "@/components/care/dossier-page";
import { CARE_CASES, getCase } from "@/lib/seo/cases";
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
  return {
    title: careCase.title,
    description: careCase.lede,
    alternates: { canonical: `${SITE.domain}/para/${caso}` },
    openGraph: { title: `${careCase.title} · OdontoHub Care`, description: careCase.lede },
  };
}

export default async function CasePage({ params }: { params: Promise<{ caso: string }> }) {
  const { caso } = await params;
  const careCase = getCase(caso);
  if (!careCase) notFound();

  const result = searchCare(careCase.googleQuery);

  return (
    <DossierPage
      eyebrow="Tratamento"
      title={careCase.headline}
      lede={careCase.lede}
      dentists={result.matches}
      initialQuery={careCase.googleQuery}
    />
  );
}

export const dynamicParams = false;
