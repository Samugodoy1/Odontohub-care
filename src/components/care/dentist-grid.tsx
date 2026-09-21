import Link from "next/link";

import { ProfessionalCardView } from "@/components/care/professional-card";
import type { ProfessionalCard } from "@/lib/catalog/types";

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

export function DentistRail({ dentists }: { dentists: ProfessionalCard[] }) {
  return (
    <div className="care-rail-mask">
      <div className="care-rail care-align-start">
        {dentists.map((professional) => (
          <div key={professional.id} className="care-rail-item w-[min(76vw,280px)]">
            <ProfessionalCardView professional={professional} featured />
          </div>
        ))}
        <Link
          href="/buscar"
          className="care-rail-item care-lift flex min-h-[320px] w-[min(56vw,220px)] items-center justify-center rounded-[28px] bg-white text-[17px] text-[#0066cc] ring-1 ring-[#d2d2d7]/70 sm:min-h-[360px]"
        >
          Ver todos <span className="care-arrow ml-1">›</span>
        </Link>
      </div>
    </div>
  );
}
