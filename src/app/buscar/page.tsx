import type { Metadata } from "next";

import { EmptyState } from "@/components/care/empty-state";
import { IntentBanner } from "@/components/care/intent-banner";
import { NeedSearch } from "@/components/care/need-search";
import { DentistGrid } from "@/components/care/dentist-grid";
import { searchCare } from "@/lib/search";

export const metadata: Metadata = {
  title: "Encontrar dentista",
  description:
    "Encontre dentistas verificados da rede OdontoHub. Pesquise pela cidade ou pelo caso — limpeza, extração, aparelho.",
};

type SearchParams = Promise<{ q?: string; onde?: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const onde = typeof params.onde === "string" ? params.onde : "";
  const hasInput = Boolean(q.trim() || onde.trim());
  const result = hasInput ? searchCare(q || "dentista", onde) : null;

  const locationLabel = result?.location.neighborhood
    ? `${result.location.neighborhood}, ${result.location.region?.city}`
    : result?.location.region?.city;

  return (
    <main className="px-5 py-12 md:py-20">
      <div className="mx-auto max-w-[1080px]">
        <NeedSearch initialQuery={q} initialPlace={onde} compact />

        {!result ? (
          <div className="mt-14">
            <EmptyState
              title="Comece pela cidade ou pelo caso."
              body="“Dentista em Taubaté.” “Dentista para limpeza.” O Care monta o dossiê dos profissionais verificados."
            />
          </div>
        ) : (
          <div className="mt-14 space-y-12">
            <IntentBanner
              intent={result.intent}
              city={locationLabel}
              cityDossier={result.cityDossier}
            />

            {result.matches.length === 0 ? (
              <EmptyState
                title={
                  locationLabel
                    ? `Ainda não há dentistas para isso em ${locationLabel} nesta demonstração.`
                    : "Ainda não há dentistas para isso nesta demonstração."
                }
                body="O catálogo atual é um recorte da rede. Tente outra cidade ou outro caso."
              />
            ) : (
              <section aria-live="polite">
                <DentistGrid dentists={result.matches} />
              </section>
            )}

            {result.elsewhere.length > 0 ? (
              <section>
                <h2 className="mb-6 text-[13px] uppercase tracking-[0.12em] text-white/40">
                  Em outras cidades
                </h2>
                <DentistGrid dentists={result.elsewhere.slice(0, 6)} />
              </section>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
