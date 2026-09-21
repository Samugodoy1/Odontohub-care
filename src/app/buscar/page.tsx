import type { Metadata } from "next";
import Link from "next/link";

import { EmptyState } from "@/components/care/empty-state";
import { IntentBanner } from "@/components/care/intent-banner";
import { NeedSearch } from "@/components/care/need-search";
import { ProfessionalCardView } from "@/components/care/professional-card";
import { searchCare } from "@/lib/search";

export const metadata: Metadata = {
  title: "Buscar cuidado",
  description: "Descreva o que você sente. OdontoHub Care encontra profissionais compatíveis na sua região.",
};

type SearchParams = Promise<{ q?: string; onde?: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const onde = typeof params.onde === "string" ? params.onde : "";
  const result = q.trim() ? searchCare(q, onde) : null;

  const locationLabel = result?.location.neighborhood
    ? `${result.location.neighborhood}, ${result.location.region?.city}`
    : result?.location.region?.city;

  return (
    <main className="px-5 py-10 md:py-16">
      <div className="mx-auto max-w-[820px]">
        <p className="text-[15px] font-medium tracking-tight text-care-sage">Buscar</p>
        <h1 className="care-display mt-2 text-[32px] md:text-[44px]">O que está acontecendo?</h1>
        <div className="mt-8">
          <NeedSearch initialQuery={q} initialPlace={onde} compact />
        </div>

        {!result ? (
          <div className="mt-10">
            <EmptyState
              title="Comece pela queixa."
              body="Escreva o que sente, como falaria no telefone. Care interpreta e mostra quem trata isso perto de você."
            />
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            <IntentBanner intent={result.intent} />

            {result.intent.unknown ? null : result.matches.length === 0 ? (
              <EmptyState
                title={
                  locationLabel
                    ? `Ninguém para isso em ${locationLabel} nesta demonstração.`
                    : "Ninguém para isso nesta demonstração."
                }
                body="O catálogo atual é um recorte da rede. Tente outra cidade, ou veja profissionais em outras regiões."
              />
            ) : (
              <section aria-live="polite">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
                    {locationLabel
                      ? `${result.matches.length} em ${locationLabel}`
                      : `${result.matches.length} na rede`}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {result.matches.map((professional) => (
                    <li key={professional.id}>
                      <ProfessionalCardView professional={professional} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {result.elsewhere.length > 0 ? (
              <section>
                <h2 className="mb-5 text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
                  Em outras cidades
                </h2>
                <ul className="space-y-4">
                  {result.elsewhere.slice(0, 4).map((professional) => (
                    <li key={professional.id}>
                      <ProfessionalCardView professional={professional} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <p className="text-center text-[13px] text-care-muted">
              Dentista na rede?{" "}
              <Link href="/para-dentistas" className="text-care-sage hover:underline">
                Como o consultório entra no Care
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
