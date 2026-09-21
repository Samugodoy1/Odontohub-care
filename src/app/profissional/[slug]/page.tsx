import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InterestForm } from "@/components/care/interest-form";
import { NetworkBadge } from "@/components/care/network-badge";
import { catalog } from "@/lib/catalog/query";
import { PROFESSIONALS } from "@/lib/catalog/seed";
import { INTENT_BY_ID } from "@/lib/intent/taxonomy";
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
    return { title: "Profissional" };
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

  const intents = professional.intentIds.map((id) => INTENT_BY_ID[id]).filter(Boolean);

  return (
    <main className="px-5 py-10 md:py-16">
      <div className="mx-auto grid max-w-[980px] gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <article>
          <p className="text-[13px] text-care-muted">
            <Link href="/buscar" className="hover:text-care-ink">
              Buscar
            </Link>
            <span aria-hidden> · </span>
            {professional.region.city}
          </p>
          <div className="mt-6 flex items-start gap-5">
            <div
              aria-hidden
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-care-sage-soft text-[18px] font-semibold text-care-sage-deep"
            >
              {initials(professional.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="care-display text-[34px] md:text-[48px]">
                  {professional.honorific} {professional.name}
                </h1>
                {professional.clinic.inOdontoHubNetwork ? <NetworkBadge /> : null}
              </div>
              <p className="mt-2 text-[16px] text-care-muted">
                {professional.specialties.map((item) => item.name).join(" · ")} · {professional.cro}
              </p>
            </div>
          </div>

          <p className="mt-10 max-w-xl text-[19px] leading-relaxed text-care-ink/90">
            {professional.bio}
          </p>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-care-muted">
            {professional.approach}
          </p>

          <section className="mt-12">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
              O que trata
            </h2>
            <ul className="mt-4 space-y-2">
              {professional.treats.map((item) => (
                <li key={item} className="text-[16px] text-care-ink">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-[28px] bg-white p-7 ring-1 ring-care-line">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
              Como o Care chegou aqui
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-care-ink/85">
              {professional.honorific} {professional.name.split(" ")[0]} atende em{" "}
              {professional.clinic.name}. O consultório usa o OdontoHub — agenda, prontuário,
              confirmações. Care não inventou este profissional. Apenas mostrou quem já cuida deste
              tipo de queixa.
            </p>
            <p className="mt-3 text-[15px] text-care-muted">{professional.clinic.note}</p>
            <p className="mt-6 text-[15px] text-care-ink">
              {professional.clinic.address}
            </p>
            <p className="mt-1 text-[14px] text-care-muted">
              {professional.years} anos de prática · Aceita novos pacientes
            </p>
          </section>

          {intents.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
                Queixas que este perfil cobre
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {intents.map((intent) => (
                  <Link
                    key={intent.id}
                    href={`/buscar?q=${encodeURIComponent(intent.phrases[0] ?? intent.label)}`}
                    className="rounded-full bg-white px-3.5 py-1.5 text-[13px] text-care-ink ring-1 ring-care-line hover:bg-care-sage-soft"
                  >
                    {intent.label}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="lg:pt-16">
          <InterestForm
            professionalName={`${professional.honorific} ${professional.name}`}
            professionalSlug={professional.slug}
          />
        </aside>
      </div>
    </main>
  );
}
