"use client";

import Link from "next/link";

import { DentistGrid, DentistRail } from "@/components/care/dentist-grid";
import { Reveal } from "@/components/care/reveal";
import type { ProfessionalCard, Region } from "@/lib/catalog/types";
import { useUserRegion } from "@/lib/geo/use-user-region";
import { citySlug } from "@/lib/seo/cities";

type HomeProfessionalsSectionProps = {
  dentists: ProfessionalCard[];
  catalogRegions: Region[];
};

function ProfessionalsSkeleton() {
  return (
    <div className="care-align space-y-8">
      <div className="space-y-4">
        <div className="h-4 w-28 animate-pulse rounded bg-[#eeeef0]" aria-hidden />
        <div className="h-10 max-w-md animate-pulse rounded-lg bg-[#eeeef0]" aria-hidden />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-2">
        {[0, 1].map((key) => (
          <div
            key={key}
            className="h-[280px] animate-pulse rounded-[24px] bg-white ring-1 ring-[#eeeef0]"
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export function HomeProfessionalsSection({
  dentists,
  catalogRegions,
}: HomeProfessionalsSectionProps) {
  const { phase, displayCity, localDentists } = useUserRegion(catalogRegions, dentists);

  if (phase === "loading") {
    return (
      <section className="care-band py-14 sm:py-20 md:py-28" aria-busy="true">
        <ProfessionalsSkeleton />
      </section>
    );
  }

  const hasLocal = localDentists.length > 0;
  const showcase = hasLocal ? localDentists : dentists;
  const localEmptyWithNetwork =
    !hasLocal && dentists.length > 0 && Boolean(displayCity);
  const networkEmpty = dentists.length === 0;

  if (networkEmpty) {
    return (
      <section className="care-band py-14 sm:py-20 md:py-28">
        <div className="care-align">
          <Reveal>
            <div className="mx-auto max-w-xl rounded-[28px] bg-white px-8 py-10 text-center ring-1 ring-[#eeeef0] sm:px-10 sm:py-12">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0071e3]">
                Profissionais
              </p>
              <h2 className="care-display mt-3 text-[28px] sm:text-[32px] md:text-[40px]">
                A rede Care está crescendo.
              </h2>
              <p className="care-subhead mt-4 text-[17px] text-[#6e6e73] sm:text-[19px]">
                {displayCity
                  ? `Ainda não há consultórios publicados em ${displayCity}. Enquanto isso, busque por tratamento ou explore como entrar na rede.`
                  : "Novos consultórios entram conforme passam pelos critérios de qualidade. Encontre um tratamento ou conheça o OdontoHub."}
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link href="/buscar" className="care-btn w-full sm:w-auto">
                  Encontrar dentista
                </Link>
                <Link
                  href="/para-dentistas"
                  className="text-[17px] text-[#0066cc] hover:underline"
                >
                  Sou dentista ›
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  if (hasLocal) {
    return null;
  }

  const title = localEmptyWithNetwork
    ? "Consultórios em outras cidades"
    : "Dentistas para conhecer.";
  const lede = localEmptyWithNetwork
    ? `Em ${displayCity} ainda não há dentistas Care publicados. Estes profissionais atendem nas cidades abaixo — você pode buscar por tratamento e filtrar por região.`
    : "Profissionais que passaram pelos critérios do Care e estão ativos na rede OdontoHub.";

  const preview = localEmptyWithNetwork ? showcase.slice(0, 4) : showcase.slice(0, 8);
  const useGrid = localEmptyWithNetwork || preview.length <= 3;

  return (
    <section className="care-band py-14 sm:py-20 md:py-28">
      <div className="care-align">
        <Reveal>
          <p className="care-eyebrow">Profissionais</p>
          <h2 className="care-display mt-3 max-w-[18ch] text-[32px] sm:mt-4 sm:text-[40px] md:text-[48px]">
            {title}
          </h2>
          <p className="care-subhead mt-4 max-w-[34rem] text-[17px] sm:mt-5 sm:text-[19px]">
            {lede}
          </p>
        </Reveal>

        <Reveal className="mt-10 sm:mt-12" delay={80}>
          {useGrid ? (
            <div className="lg:max-w-5xl">
              <DentistGrid dentists={preview} />
            </div>
          ) : (
            <DentistRail dentists={preview} />
          )}
        </Reveal>

        {localEmptyWithNetwork && catalogRegions.length > 0 ? (
          <Reveal className="mt-10 sm:mt-12" delay={120}>
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#86868b]">
              Cidades com Care hoje
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {catalogRegions.map((region) => (
                <Link
                  key={region.id}
                  href={`/dentista/${citySlug(region.city)}`}
                  className="rounded-full bg-white px-3.5 py-2 text-[14px] text-[#1d1d1f] ring-1 ring-[#d2d2d7] transition-all duration-300 hover:bg-[#eaf3fb] hover:ring-[#0071e3]/20"
                >
                  {region.city}
                </Link>
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal className="mt-8 sm:mt-10" delay={140}>
          <Link href="/buscar" className="care-btn inline-flex w-full sm:w-auto">
            Ver todos os profissionais
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
