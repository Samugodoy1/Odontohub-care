import Link from "next/link";

import type { ProfessionalCard } from "@/lib/catalog/types";
import { citySlug } from "@/lib/seo/cities";

const TILES = [
  "from-[#1c3a5a] to-[#64d2ff]",
  "from-[#3a1848] to-[#bf5af2]",
  "from-[#1a2a14] to-[#30d158]",
  "from-[#4a1c1c] to-[#ff9f0a]",
  "from-[#1e3a5f] to-[#0a84ff]",
  "from-[#2a1840] to-[#ff375f]",
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
      className={`overflow-hidden rounded-[28px] bg-[#1d1d1f] ${
        featured ? "min-w-[280px] max-w-[320px]" : ""
      }`}
    >
      <Link href={href} className="block">
        <div
          className={`relative flex h-44 items-end bg-gradient-to-br p-5 ${tileFor(professional.id)}`}
        >
          <span className="absolute right-4 top-4 rounded-full bg-black/35 px-2.5 py-1 text-[11px] text-white backdrop-blur">
            Verificado
          </span>
          <div
            aria-hidden
            className="flex size-14 items-center justify-center rounded-full bg-black/25 text-[16px] font-semibold text-white backdrop-blur"
          >
            {initials(professional.name)}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-[19px] font-semibold tracking-tight text-white">
            {professional.honorific} {professional.name}
          </h3>
          <p className="mt-1 text-[13px] text-white/55">
            {professional.specialties.map((item) => item.shortName).join(" · ")}
          </p>
          <p className="mt-3 text-[13px] text-white/70">
            {professional.clinic.neighborhood}, {professional.region.city}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
        <Link href={cityHref} className="text-[12px] text-white/45 hover:text-white">
          Dentista em {professional.region.city}
        </Link>
        <Link href={href} className="text-[13px] text-[#64d2ff] hover:underline">
          Ver dossiê ›
        </Link>
      </div>
    </article>
  );
}
