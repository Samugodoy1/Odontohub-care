import Link from "next/link";

import { NetworkBadge } from "@/components/care/network-badge";
import type { ProfessionalCard } from "@/lib/catalog/types";

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function ProfessionalCardView({ professional }: { professional: ProfessionalCard }) {
  const href = `/profissional/${professional.slug}`;

  return (
    <article className="rounded-[28px] bg-white p-6 ring-1 ring-care-line transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 md:p-8">
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-care-sage-soft text-[13px] font-semibold text-care-sage-deep"
        >
          {initials(professional.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[21px] font-semibold tracking-tight text-care-ink">
              <Link href={href} className="hover:underline underline-offset-4">
                {professional.honorific} {professional.name}
              </Link>
            </h3>
            {professional.clinic.inOdontoHubNetwork ? <NetworkBadge compact /> : null}
          </div>
          <p className="mt-1 text-[14px] text-care-muted">
            {professional.specialties.map((item) => item.shortName).join(" · ")}
          </p>
        </div>
      </div>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-care-ink/80">{professional.bio}</p>
      <p className="mt-4 text-[13px] text-care-muted">
        {professional.clinic.name} · {professional.clinic.neighborhood}, {professional.region.city}
      </p>
      <div className="mt-6">
        <Link href={href} className="text-[15px] text-care-sage hover:underline underline-offset-4">
          Ver perfil <span aria-hidden>›</span>
        </Link>
      </div>
    </article>
  );
}
