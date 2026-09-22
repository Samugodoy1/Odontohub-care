import Link from "next/link";

import { ProfessionalCardView } from "@/components/care/professional-card";
import { splitByRecommendation } from "@/lib/catalog/recommend";
import type { ProfessionalCard } from "@/lib/catalog/types";
import type { IntentId } from "@/lib/intent/types";

export function DentistGrid({ dentists }: { dentists: ProfessionalCard[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {dentists.map((professional) => (
        <li key={professional.id}>
          <ProfessionalCardView professional={professional} />
        </li>
      ))}
    </ul>
  );
}

export function RankedDentistList({
  dentists,
  intentId,
}: {
  dentists: ProfessionalCard[];
  intentId?: IntentId | null;
}) {
  const { recommended, also } = splitByRecommendation(dentists, intentId);
  if (recommended.length === 0 || also.length === 0) {
    return <DentistGrid dentists={dentists} />;
  }

  return (
    <div className="space-y-12">
      <section>
        <p className="mb-6 text-[13px] text-[#86868b]">Especialistas para este tratamento</p>
        <DentistGrid dentists={recommended} />
      </section>
      <section>
        <p className="mb-2 text-[13px] text-[#86868b]">Clínica geral também atende</p>
        <p className="mb-6 max-w-xl text-[14px] leading-relaxed text-[#86868b]">
          O clínico geral pode realizar o procedimento. O especialista aparece primeiro.
        </p>
        <DentistGrid dentists={also} />
      </section>
    </div>
  );
}

export function DentistRail({ dentists }: { dentists: ProfessionalCard[] }) {
  if (dentists.length === 0) {
    return null;
  }

  return (
    <div className="care-rail-mask">
      <div className="care-rail">
        {dentists.map((professional) => (
          <div key={professional.id} className="care-rail-item w-[min(78vw,280px)]">
            <ProfessionalCardView professional={professional} featured />
          </div>
        ))}
        <Link
          href="/buscar"
          className="care-rail-item flex w-[min(58vw,220px)] items-center justify-center self-stretch rounded-[24px] bg-white text-[17px] text-[#0071e3] ring-1 ring-[#e5e5ea]"
        >
          Ver todos <span className="care-arrow ml-1">›</span>
        </Link>
      </div>
    </div>
  );
}
