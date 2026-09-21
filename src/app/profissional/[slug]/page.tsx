import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InterestForm } from "@/components/care/interest-form";
import { NetworkBadge } from "@/components/care/network-badge";
import { catalog } from "@/lib/catalog/query";
import { PROFESSIONALS } from "@/lib/catalog/seed";
import { citySlug } from "@/lib/seo/cities";
import { SITE } from "@/lib/site";

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function generateStaticParams() {
  return PROFESSIONALS.map((professional) => ({ slug: professional.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const professional = catalog.getProfessional(slug);
  if (!professional) {
    return { title: "Dentista" };
  }
  const title = `${professional.honorific} ${professional.name}`;
  const description = `${professional.bio} ${professional.clinic.neighborhood}, ${professional.region.city}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.domain}/profissional/${slug}` },
    openGraph: { title: `${title} · OdontoHub Care`, description },
  };
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const professional = catalog.getProfessional(slug);
  if (!professional) notFound();

  const city = professional.region.city;

  return (
    <main>
      <section className="care-hero-wash px-5 pb-16 pt-14 md:pt-20">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[13px] text-[#86868b]">
            <Link href={`/dentista/${citySlug(city)}`} className="hover:text-[#1d1d1f]">
              Dentista em {city}
            </Link>
          </p>
          <div className="mt-8 flex items-start gap-5">
            <div
              aria-hidden
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white text-[18px] font-semibold text-[#1d1d1f] ring-1 ring-[#d2d2d7]"
            >
              {initials(professional.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="care-display text-[40px] md:text-[56px]">
                  {professional.honorific} {professional.name}
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

      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-[980px] gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <article>
            <p className="max-w-xl text-[22px] leading-relaxed tracking-tight text-[#1d1d1f]">
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
                {professional.honorific} {professional.name.split(" ")[0]} atende em{" "}
                {professional.clinic.name}. Está nesta lista porque o cuidado foi escolhido com
                rigor — e permanece só enquanto a qualidade se sustenta.
              </p>
              <p className="mt-6 text-[15px] text-[#1d1d1f]">{professional.clinic.address}</p>
              <p className="mt-1 text-[14px] text-[#86868b]">
                {professional.years} anos de prática · Aceita novos pacientes
              </p>
            </section>
          </article>

          <aside className="lg:pt-4">
            <InterestForm
              professionalName={`${professional.honorific} ${professional.name}`}
              professionalSlug={professional.slug}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
