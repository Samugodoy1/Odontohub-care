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
      <section className="care-hero-wash px-5 pb-10 pt-16 md:pt-24">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-[15px] font-medium text-[#0071e3]">{eyebrow}</p>
          <h1 className="care-display mx-auto mt-4 max-w-[18ch] text-[44px] sm:text-[64px] md:text-[80px]">
            {title}
          </h1>
          <p className="care-subhead mx-auto mt-5 max-w-[540px] text-[19px] md:text-[24px]">{lede}</p>
          <div className="mx-auto mt-10 max-w-[720px]">
            <NeedSearch initialQuery={initialQuery} initialPlace={initialPlace} compact />
          </div>
        </div>
      </section>
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-[1080px]">
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
