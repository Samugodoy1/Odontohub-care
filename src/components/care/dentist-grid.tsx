import Link from "next/link";

import { ProfessionalCardView } from "@/components/care/professional-card";
import type { ProfessionalCard } from "@/lib/catalog/types";

export function DentistGrid({ dentists }: { dentists: ProfessionalCard[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {dentists.map((professional) => (
        <li key={professional.id}>
          <ProfessionalCardView professional={professional} />
        </li>
      ))}
    </ul>
  );
}

export function DentistRail({ dentists }: { dentists: ProfessionalCard[] }) {
  return (
    <div className="care-rail -mx-5 px-5">
      {dentists.map((professional) => (
        <div key={professional.id} className="care-rail-item w-[280px]">
          <ProfessionalCardView professional={professional} featured />
        </div>
      ))}
      <Link
        href="/buscar"
        className="care-rail-item flex h-full min-h-[360px] w-[220px] items-center justify-center rounded-[28px] bg-[#1d1d1f] text-[17px] text-[#64d2ff]"
      >
        Ver todos ›
      </Link>
    </div>
  );
}
