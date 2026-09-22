import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DentistPhoto } from "@/components/care/dentist-photo";
import { InterestForm } from "@/components/care/interest-form";
import { NetworkBadge } from "@/components/care/network-badge";
import { ReviewPanel } from "@/components/care/review-panel";
import { getListedCareCatalog, getListedCareProfessionals } from "@/lib/catalog/adapter";
import { displayNameOf, hubDentistId } from "@/lib/catalog/names";
import { citySlug } from "@/lib/seo/cities";
import { dentistJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const professionals = await getListedCareProfessionals();
  return professionals.map((professional) => ({ slug: professional.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getListedCareCatalog();
  const professional = catalog.getProfessional(slug);
  if (!professional) {
    return { title: "Dentista", robots: { index: false, follow: false } };
  }
  const title = displayNameOf(professional);
  const description = `${title}, ${professional.specialties.map((item) => item.name).join(", ")} em ${professional.region.city}. ${professional.bio}`;
  return {
    title: `${title} | Dentista em ${professional.region.city}`,
    description,
    keywords: [
      `dentista ${professional.region.city}`,
      title,
      ...professional.treats.map((item) => `dentista para ${item.toLowerCase()}`),
      professional.cro,
    ],
    alternates: { canonical: `${SITE.domain}/profissional/${slug}` },
    openGraph: {
      title: `${title} · OdontoHub Care`,
      description,
      type: "profile",
    },
  };
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const catalog = await getListedCareCatalog();
  const professional = catalog.getProfessional(slug);
  if (!professional) notFound();

  const city = professional.region.city;
  const displayName = displayNameOf(professional);
  const dentistId = hubDentistId(professional.id);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistJsonLd(professional)) }}
      />
      <section className="pb-10 pt-8 sm:pb-14 sm:pt-12">
        <div className="care-align">
          <p className="text-[13px] text-[#86868b]">
            <Link href={`/dentista/${citySlug(city)}`} className="hover:text-[#1d1d1f]">
              Dentista em {city}
            </Link>
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12">
            <div className="overflow-hidden rounded-[28px] bg-[#d7e0e8] shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                <DentistPhoto
                  name={professional.name}
                  honorific={professional.honorific}
                  photoUrl={professional.photoUrl}
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="care-display text-[34px] sm:text-[48px] md:text-[56px]">
                  {displayName}
                </h1>
                {professional.clinic.inOdontoHubNetwork ? <NetworkBadge /> : null}
              </div>
              <p className="mt-3 text-[17px] text-[#6e6e73]">
                {professional.specialties.map((item) => item.name).join(" · ")}
              </p>
              <p className="mt-1 text-[14px] text-[#86868b]">{professional.cro}</p>
              <p className="mt-6 max-w-xl text-[18px] leading-relaxed tracking-tight text-[#1d1d1f] sm:text-[20px]">
                {professional.bio}
              </p>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#6e6e73]">
                {professional.approach}
              </p>
              <p className="mt-6 text-[15px] text-[#1d1d1f]">
                {professional.clinic.name} · {professional.clinic.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="care-align grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <article>
            <section>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                O que trata
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {professional.treats.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-white px-4 py-3 text-[16px] text-[#1d1d1f] ring-1 ring-[#eeeef0]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 rounded-[28px] bg-white p-7 ring-1 ring-[#eeeef0]">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                O consultório
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[#1d1d1f]/80">
                {displayName} atende em {professional.clinic.name}. Aparece no Care porque usa o
                OdontoHub na clínica — agenda, prontuário e contato no mesmo lugar.
              </p>
              <p className="mt-6 text-[15px] text-[#1d1d1f]">{professional.clinic.address}</p>
              <p className="mt-1 text-[14px] text-[#86868b]">
                {professional.years > 0 ? `${professional.years} anos de prática · ` : ""}
                {professional.acceptsNewPatients
                  ? "Aceita novos pacientes"
                  : "Consulte a disponibilidade"}
              </p>
            </section>

            <ReviewPanel professionalSlug={professional.slug} professionalName={displayName} />
          </article>

          <aside className="lg:-mt-4">
            <InterestForm
              professionalName={displayName}
              professionalSlug={professional.slug}
              dentistId={dentistId}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
