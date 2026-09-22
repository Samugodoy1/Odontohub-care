"use client";

import Link from "next/link";
import { useMemo } from "react";

import { DeviceDossier, type DeviceDossierState } from "@/components/care/device-dossier";
import { Reveal } from "@/components/care/reveal";
import type { ProfessionalCard, Region } from "@/lib/catalog/types";
import { useUserRegion } from "@/lib/geo/use-user-region";
import { citySlug } from "@/lib/seo/cities";

type NearYouSectionProps = {
  dentists: ProfessionalCard[];
  catalogRegions: Region[];
};

export function NearYouSection({ dentists, catalogRegions }: NearYouSectionProps) {
  const { phase, matchedRegion, displayCity, localDentists } = useUserRegion(
    catalogRegions,
    dentists,
  );

  const deviceState: DeviceDossierState = useMemo(() => {
    if (phase === "loading") return { kind: "loading" };
    if (!displayCity && !matchedRegion) return { kind: "unknown" };
    if (localDentists.length > 0 && displayCity) {
      return { kind: "list", city: displayCity, dentists: localDentists };
    }
    if (displayCity) {
      return {
        kind: "empty",
        city: displayCity,
        citySlug: matchedRegion ? citySlug(matchedRegion.city) : undefined,
      };
    }
    return { kind: "unknown" };
  }, [displayCity, localDentists, matchedRegion, phase]);

  const linkHref = matchedRegion
    ? `/dentista/${citySlug(matchedRegion.city)}`
    : displayCity
      ? `/buscar?q=${encodeURIComponent(`dentista em ${displayCity}`)}`
      : "/buscar";

  const linkLabel = matchedRegion
    ? `Ver dentistas em ${matchedRegion.city}`
    : displayCity
      ? `Buscar em ${displayCity}`
      : "Encontrar dentista";

  let lede: string;
  if (phase === "loading") {
    lede = "Estamos identificando sua região para mostrar profissionais perto de você.";
  } else if (localDentists.length > 0 && displayCity) {
    lede = `Estes são os dentistas Care em ${displayCity}. O tratamento certo, na sua cidade.`;
  } else if (displayCity) {
    lede = `Você está em ${displayCity}. Ainda não há profissionais Care aí — a busca cobre outras cidades e tratamentos.`;
  } else {
    lede = "Informe sua cidade na busca e mostramos profissionais conectados ao OdontoHub Care.";
  }

  return (
    <section className="py-14 sm:py-24 md:py-32">
      <div className="care-align grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <p className="care-eyebrow">Na sua cidade</p>
          <h2 className="care-display mt-3 text-[32px] sm:mt-4 sm:text-[40px] md:text-[64px]">
            Perto de você.
          </h2>
          <p className="care-subhead mt-4 max-w-[28rem] text-[17px] sm:mt-5 sm:text-[19px] md:text-[21px]">
            {lede}
          </p>
          <Link
            href={linkHref}
            className="group mt-6 inline-flex items-center text-[17px] text-[#0066cc] sm:mt-8"
          >
            {linkLabel}
            <span className="care-arrow ml-1">›</span>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <DeviceDossier state={deviceState} />
        </Reveal>
      </div>
    </section>
  );
}
