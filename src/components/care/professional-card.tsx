import Link from "next/link";

import type { ProfessionalCard } from "@/lib/catalog/types";
import { citySlug } from "@/lib/seo/cities";

const TILES = [
  "from-[#e6f5f1] to-[#b7ddd4]",
  "from-[#eaf1fb] to-[#c2d4ee]",
  "from-[#eef6e8] to-[#c6e0b6]",
  "from-[#fbf0e8] to-[#f0cbb4]",
  "from-[#e8f1fc] to-[#c4daf7]",
  "from-[#f0eefb] to-[#d5d0f2]",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function tileFor(id: string) {
  let hash = 0;
  for (const ch of id) hash = (hash + ch.charCodeAt(0)) % TILES.length;
  return TILES[hash] ?? TILES[0];
}

export function ProfessionalCardView({
  professional,
  featured = false,
}: {
  professional: ProfessionalCard;
  featured?: boolean;
}) {
  const href = `/profissional/${professional.slug}`;
  const cityHref = `/dentista/${citySlug(professional.region.city)}`;

  return (
    <article
      className={`care-lift overflow-hidden rounded-[28px] bg-white ring-1 ring-[#d2d2d7]/70 ${
        featured ? "w-full" : ""
      }`}
    >
      <Link href={href} className="group block">
        <div
          className={`care-sheen relative flex h-44 items-end bg-gradient-to-br p-5 ${tileFor(professional.id)}`}
        >
          <span className="absolute right-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-[#1d1d1f] backdrop-blur">
            Selecionado pelo Care
          </span>
          <div
            aria-hidden
            className="flex size-12 items-center justify-center rounded-full bg-white/85 text-[14px] font-semibold text-[#1d1d1f]"
          >
            {initials(professional.name)}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-[19px] font-semibold tracking-tight text-[#1d1d1f]">
            {professional.honorific} {professional.name}
          </h3>
          <p className="mt-1 text-[13px] text-[#86868b]">
            {professional.specialties.map((item) => item.shortName).join(" · ")}
          </p>
          <p className="mt-3 text-[13px] text-[#6e6e73]">
            {professional.clinic.neighborhood}, {professional.region.city}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-[#d2d2d7]/70 px-5 py-3">
        <Link href={cityHref} className="text-[12px] text-[#86868b] hover:text-[#1d1d1f]">
          Em {professional.region.city}
        </Link>
        <Link href={href} className="group text-[13px] text-[#0066cc]">
          Ver perfil <span className="care-arrow">›</span>
        </Link>
      </div>
    </article>
  );
}
