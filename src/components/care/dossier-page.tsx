import Link from "next/link";

import { EmptyState } from "@/components/care/empty-state";
import { DentistGrid } from "@/components/care/dentist-grid";
import { NeedSearch } from "@/components/care/need-search";
import type { ProfessionalCard } from "@/lib/catalog/types";

type DossierPageProps = {
  eyebrow: string;
  title: string;
  lede: string;
  dentists: ProfessionalCard[];
  emptyTitle?: string;
  emptyBody?: string;
  initialQuery?: string;
  initialPlace?: string;
  elsewhere?: ProfessionalCard[];
};

export function DossierPage({
  eyebrow,
  title,
  lede,
  dentists,
  emptyTitle = "Ainda não há dentistas para isso.",
  emptyBody = "Tente outra cidade ou outro tratamento. A lista cresce com cuidado.",
  initialQuery = "",
  initialPlace = "",
  elsewhere = [],
}: DossierPageProps) {
  return (
    <main>
      <section className="care-hero-wash pb-10 pt-10 sm:pt-16 md:pt-24">
        <div className="care-align text-center">
          <p className="text-[15px] font-medium text-[#0071e3]">{eyebrow}</p>
          <h1 className="care-display mx-auto mt-3 max-w-[18ch] text-[36px] sm:mt-4 sm:text-[56px] md:text-[72px]">
            {title}
          </h1>
          <p className="care-subhead mx-auto mt-4 max-w-[34rem] text-[17px] sm:mt-5 sm:text-[19px] md:text-[24px]">{lede}</p>
          <div className="mx-auto mt-8 max-w-[45rem] sm:mt-10">
            <NeedSearch initialQuery={initialQuery} initialPlace={initialPlace} compact />
          </div>
        </div>
      </section>
      <section className="pb-20 sm:pb-24">
        <div className="care-align">
          {dentists.length === 0 ? (
            <EmptyState title={emptyTitle} body={emptyBody} />
          ) : (
            <>
              <p className="mb-6 text-[13px] text-[#86868b]">
                {dentists.length} {dentists.length === 1 ? "dentista" : "dentistas"} · escolhidos com
                rigor
              </p>
              <DentistGrid dentists={dentists} />
            </>
          )}
          {elsewhere.length > 0 ? (
            <div className="mt-16">
              <h2 className="care-display text-[28px]">Em outras cidades</h2>
              <div className="mt-8">
                <DentistGrid dentists={elsewhere.slice(0, 6)} />
              </div>
            </div>
          ) : null}
          <p className="mt-12 text-center text-[14px] text-[#86868b]">
            Você é dentista?{" "}
            <Link href="/para-dentistas" className="text-[#0066cc] hover:underline">
              Como aparecer aqui
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
