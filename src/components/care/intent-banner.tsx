import Link from "next/link";

import type { IntentMatchResult } from "@/lib/intent/matcher";
import { CARE_CASES } from "@/lib/seo/cases";
import { citySlug } from "@/lib/seo/cities";

export function IntentBanner({
  intent,
  city,
  cityDossier,
}: {
  intent: IntentMatchResult;
  city?: string | null;
  cityDossier?: boolean;
}) {
  if (cityDossier && city) {
    return (
      <div className="text-center md:text-left">
        <p className="text-[15px] font-medium text-[#64d2ff]">OdontoHub Care</p>
        <h2 className="care-display mt-2 text-[32px] text-white md:text-[48px]">
          Dentistas em {city}.
        </h2>
        <p className="care-subhead mx-auto mt-3 max-w-xl text-[17px] md:mx-0">
          Quem usa o OdontoHub nesta cidade — e só permanece se a qualidade aguenta.
        </p>
      </div>
    );
  }

  if (intent.unknown || !intent.primary) {
    return (
      <div className="text-center md:text-left">
        <p className="text-[15px] font-medium text-[#64d2ff]">Dossiê</p>
        <h2 className="care-display mt-2 text-[32px] text-white md:text-[44px]">
          Diga o caso ou a cidade.
        </h2>
        <p className="care-subhead mx-auto mt-3 max-w-xl text-[17px] md:mx-0">
          “Dentista em Taubaté”. “Dentista para extração”. O Care mostra os profissionais certos
          para aquilo.
        </p>
      </div>
    );
  }

  const primary = intent.primary;
  const relatedCase = CARE_CASES.find((item) => item.intentId === primary.intent.id);
  const href = relatedCase
    ? city
      ? `/dentista/${citySlug(city)}/${relatedCase.slug}`
      : `/para/${relatedCase.slug}`
    : null;

  return (
    <div className="text-center md:text-left">
      <p className="text-[15px] font-medium text-[#64d2ff]">
        {city ? `${primary.intent.label} · ${city}` : primary.intent.label}
      </p>
      <h2 className="care-display mt-2 text-[32px] text-white md:text-[48px]">
        {relatedCase?.headline ?? `${primary.intent.label}.`}
      </h2>
      <p className="care-subhead mx-auto mt-3 max-w-xl text-[17px] md:mx-0">
        {primary.intent.explanation} Dentistas da rede OdontoHub, verificados.
      </p>
      {href ? (
        <Link href={href} className="mt-4 inline-block text-[15px] text-[#64d2ff] hover:underline">
          Abrir este dossiê ›
        </Link>
      ) : null}
    </div>
  );
}
