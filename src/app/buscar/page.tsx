import type { Metadata } from "next";

import { EmptyState } from "@/components/care/empty-state";
import { IntentBanner } from "@/components/care/intent-banner";
import { NeedSearch } from "@/components/care/need-search";
import { DentistGrid } from "@/components/care/dentist-grid";
import { getCareCatalog } from "@/lib/catalog/adapter";
import { searchCare } from "@/lib/search";

export const metadata: Metadata = {
  title: "Encontrar dentista",
  description:
    "Encontre dentistas selecionados para limpeza, extração, aparelho e outros tratamentos na sua cidade.",
};

type SearchParams = Promise<{ q?: string; onde?: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const onde = typeof params.onde === "string" ? params.onde : "";
  const hasInput = Boolean(q.trim() || onde.trim());
  const catalog = hasInput ? await getCareCatalog() : null;
  const result = hasInput && catalog ? searchCare(q || "dentista", onde, catalog) : null;

  const locationLabel = result?.location.neighborhood
    ? `${result.location.neighborhood}, ${result.location.region?.city}`
    : result?.location.region?.city;

  return (
    <main className="py-8 sm:py-12 md:py-20">
      <div className="care-align">
        <NeedSearch initialQuery={q} initialPlace={onde} compact />

        {!result ? (
          <div className="mt-14">
            <EmptyState
              title="Diga o que você precisa."
              body="Informe o tratamento ou a cidade para conhecer os profissionais disponíveis."
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
                    ? `Ainda não há dentistas para isso em ${locationLabel}.`
                    : "Ainda não há dentistas para isso."
                }
                body="Tente outra cidade ou outro tratamento."
              />
            ) : (
              <section aria-live="polite">
                <DentistGrid dentists={result.matches} />
              </section>
            )}

            {result.elsewhere.length > 0 ? (
              <section>
                <h2 className="mb-6 text-[13px] text-[#86868b]">Em outras cidades</h2>
                <DentistGrid dentists={result.elsewhere.slice(0, 6)} />
              </section>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
