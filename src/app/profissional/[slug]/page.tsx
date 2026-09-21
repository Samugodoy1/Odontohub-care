import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InterestForm } from "@/components/care/interest-form";
import { NetworkBadge } from "@/components/care/network-badge";
import { ProfessionalPhoto } from "@/components/care/professional-photo";
import { getCareCatalog, getCareProfessionals } from "@/lib/catalog/adapter";
import { citySlug } from "@/lib/seo/cities";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const professionals = await getCareProfessionals();
  return professionals.map((professional) => ({ slug: professional.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCareCatalog();
  const professional = catalog.getProfessional(slug);
  if (!professional) {
    return { title: "Dentista" };
  }
  const title = [professional.honorific, professional.name].filter(Boolean).join(" ");
  const description = `${professional.bio} ${professional.clinic.neighborhood}, ${professional.region.city}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.domain}/profissional/${slug}` },
    openGraph: {
      title: `${title} · OdontoHub Care`,
      description,
      images: professional.photoUrl ? [professional.photoUrl] : undefined,
    },
  };
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const catalog = await getCareCatalog();
  const professional = catalog.getProfessional(slug);
  if (!professional) notFound();

  const city = professional.region.city;
  const displayName = [professional.honorific, professional.name].filter(Boolean).join(" ");

  return (
    <main>
      <section className="care-hero-wash pb-12 pt-10 sm:pb-16 sm:pt-14 md:pt-20">
        <div className="care-align">
          <p className="text-[13px] text-[#86868b]">
            <Link href={`/dentista/${citySlug(city)}`} className="hover:text-[#1d1d1f]">
              Dentista em {city}
            </Link>
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-start sm:gap-5">
            <ProfessionalPhoto
              src={professional.photoUrl}
              name={professional.name}
              className="size-16 text-[16px] ring-1 ring-[#d2d2d7] sm:size-20 sm:text-[18px]"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="care-display text-[32px] sm:text-[40px] md:text-[56px]">
                  {displayName}
                </h1>
                {professional.clinic.inOdontoHubNetwork ? <NetworkBadge /> : null}
              </div>
              <p className="mt-3 text-[17px] text-[#86868b]">
                {professional.specialties.map((item) => item.name).join(" · ")} · {professional.cro}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24">
        <div className="care-align grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <article>
            <p className="max-w-xl text-[18px] leading-relaxed tracking-tight text-[#1d1d1f] sm:text-[22px]">
              {professional.bio}
            </p>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#6e6e73]">
              {professional.approach}
            </p>

            <section className="mt-14">
              <h2 className="text-[13px] text-[#86868b]">O que trata</h2>
              <ul className="mt-4 space-y-2">
                {professional.treats.map((item) => (
                  <li key={item} className="text-[18px] text-[#1d1d1f]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12 rounded-[28px] bg-white p-7 ring-1 ring-[#d2d2d7]/80">
              <h2 className="text-[13px] text-[#86868b]">O consultório</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[#1d1d1f]/80">
                {displayName} atende em{" "}
                {professional.clinic.name}. Faz parte desta lista pelos critérios de qualidade do
                Care e permanece enquanto mantiver esse padrão no atendimento.
              </p>
              <p className="mt-6 text-[15px] text-[#1d1d1f]">{professional.clinic.address}</p>
              <p className="mt-1 text-[14px] text-[#86868b]">
                {professional.years > 0 ? `${professional.years} anos de prática · ` : ""}
                {professional.acceptsNewPatients
                  ? "Aceita novos pacientes"
                  : "Consulte a disponibilidade"}
              </p>
            </section>
          </article>

          <aside className="lg:pt-4">
            <InterestForm
              professionalName={displayName}
              professionalSlug={professional.slug}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
