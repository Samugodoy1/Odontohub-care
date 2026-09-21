import Link from "next/link";

import { DentistPhoto } from "@/components/care/dentist-photo";
import type { ProfessionalCard } from "@/lib/catalog/types";
import { displayNameOf } from "@/lib/catalog/names";
import { citySlug } from "@/lib/seo/cities";

export function ProfessionalCardView({
  professional,
  featured = false,
}: {
  professional: ProfessionalCard;
  featured?: boolean;
}) {
  const href = `/profissional/${professional.slug}`;
  const cityHref = `/dentista/${citySlug(professional.region.city)}`;
  const displayName = displayNameOf(professional);

  return (
    <article
      className={`overflow-hidden rounded-[24px] bg-white ring-1 ring-[#e5e5ea] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${
        featured ? "w-full" : ""
      }`}
    >
      <Link href={href} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#d7e0e8]">
          <DentistPhoto
            name={professional.name}
            honorific={professional.honorific}
            photoUrl={professional.photoUrl}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#1d1d1f]">
            OdontoHub
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h3 className="text-[20px] font-semibold leading-tight tracking-tight">
              {displayName}
            </h3>
            <p className="mt-1 text-[13px] text-white/80">
              {professional.specialties.map((item) => item.shortName).join(" · ")}
            </p>
          </div>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[13px] text-[#6e6e73]">
            {professional.clinic.name}
          </p>
          <p className="mt-0.5 text-[13px] text-[#86868b]">
            {professional.clinic.neighborhood}, {professional.region.city}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-[#eeeef0] px-4 py-3">
        <Link href={cityHref} className="text-[12px] text-[#86868b] hover:text-[#1d1d1f]">
          Em {professional.region.city}
        </Link>
        <Link href={href} className="text-[13px] font-medium text-[#0f766e]">
          Ver perfil →
        </Link>
      </div>
    </article>
  );
}
