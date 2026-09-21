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
        <p className="text-[15px] font-medium text-[#0071e3]">Na sua cidade</p>
        <h2 className="care-display mt-2 text-[32px] md:text-[48px]">Dentistas em {city}.</h2>
        <p className="care-subhead mx-auto mt-3 max-w-xl text-[17px] md:mx-0">
          Profissionais escolhidos com rigor. Se o atendimento não se sustenta, eles saem da lista.
        </p>
      </div>
    );
  }

  if (intent.unknown || !intent.primary) {
    return (
      <div className="text-center md:text-left">
        <p className="text-[15px] font-medium text-[#0071e3]">Busca</p>
        <h2 className="care-display mt-2 text-[32px] md:text-[44px]">
          Diga o que você precisa.
        </h2>
        <p className="care-subhead mx-auto mt-3 max-w-xl text-[17px] md:mx-0">
          Limpeza, extração, aparelho — e a sua cidade. Encontramos o dentista para isso.
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
      <p className="text-[15px] font-medium text-[#0071e3]">
        {city ? `${relatedCase?.shortLabel ?? primary.intent.label} · ${city}` : relatedCase?.shortLabel}
      </p>
      <h2 className="care-display mt-2 text-[32px] md:text-[48px]">
        {relatedCase?.headline ?? `${primary.intent.label}.`}
      </h2>
      <p className="care-subhead mx-auto mt-3 max-w-xl text-[17px] md:mx-0">
        {relatedCase?.lede ?? primary.intent.explanation}
      </p>
      {href ? (
        <Link href={href} className="mt-4 inline-block text-[15px] text-[#0066cc] hover:underline">
          Ver este tratamento ›
        </Link>
      ) : null}
    </div>
  );
}
