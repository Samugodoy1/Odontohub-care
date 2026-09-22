import Link from "next/link";
import { MapPin, Search } from "lucide-react";

import { DentistPhoto } from "@/components/care/dentist-photo";
import { shortNameOf } from "@/lib/catalog/names";
import type { ProfessionalCard } from "@/lib/catalog/types";
export type DeviceDossierState =
  | { kind: "loading" }
  | { kind: "unknown" }
  | { kind: "empty"; city: string; citySlug?: string }
  | { kind: "list"; city: string; dentists: ProfessionalCard[] };

export function DeviceDossier({ state }: { state: DeviceDossierState }) {
  return (
    <div className="care-float relative mx-auto w-[min(100%,280px)] md:w-[310px]">
      <div className="rounded-[40px] bg-[#ececf1] p-[10px] shadow-[0_32px_64px_rgba(15,23,42,0.14)]">
        <div className="overflow-hidden rounded-[30px] bg-white">
          <div className="flex h-8 items-center justify-center">
            <div className="h-[18px] w-[84px] rounded-full bg-[#1d1d1f]" />
          </div>
          <div className="px-4 pb-7 pt-1">
            {state.kind === "loading" ? <LoadingBody /> : null}
            {state.kind === "unknown" ? <UnknownBody /> : null}
            {state.kind === "empty" ? <EmptyBody city={state.city} citySlug={state.citySlug} /> : null}
            {state.kind === "list" ? <ListBody city={state.city} dentists={state.dentists} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingBody() {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Perto de você</p>
      <p className="mt-1 text-[20px] font-semibold tracking-tight text-[#1d1d1f]">Sua região</p>
      <div className="mt-5 space-y-2.5" aria-hidden>
        {[0, 1, 2].map((key) => (
          <div key={key} className="flex items-center gap-3 rounded-2xl bg-[#f4f4f5] px-2.5 py-2.5">
            <div className="size-11 animate-pulse rounded-xl bg-[#e5e5ea]" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3 w-24 animate-pulse rounded-full bg-[#e5e5ea]" />
              <div className="h-2.5 w-32 animate-pulse rounded-full bg-[#eeeef0]" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function UnknownBody() {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-2 py-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-[#f5f5f7] text-[#86868b]">
        <MapPin className="size-7" strokeWidth={1.5} aria-hidden />
      </div>
      <p className="mt-4 text-[17px] font-semibold tracking-tight text-[#1d1d1f]">Onde você está?</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#86868b]">
        Informe a cidade na busca e mostramos os profissionais certos para o seu caso.
      </p>
      <Link
        href="/buscar"
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-4 py-2 text-[13px] font-medium text-white"
      >
        <Search className="size-3.5" aria-hidden />
        Buscar cidade
      </Link>
    </div>
  );
}

function EmptyBody({ city, citySlug }: { city: string; citySlug?: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-2 py-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-[#eaf3fb] text-[#0071e3]">
        <MapPin className="size-7" strokeWidth={1.5} aria-hidden />
      </div>
      <p className="mt-4 text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
        Em breve em {city}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#86868b]">
        Ainda não há dentistas Care aí. A lista cresce com critério — tente outra cidade ou
        tratamento.
      </p>
      <Link
        href={`/buscar?q=${encodeURIComponent(`dentista em ${city}`)}`}
        className="mt-5 text-[13px] font-medium text-[#0066cc] hover:underline"
      >
        Buscar em {city}
      </Link>
      {citySlug ? (
        <Link
          href={`/dentista/${citySlug}`}
          className="mt-2 text-[12px] text-[#86868b] hover:text-[#1d1d1f]"
        >
          Ver página da cidade ›
        </Link>
      ) : null}
    </div>
  );
}

function ListBody({ city, dentists }: { city: string; dentists: ProfessionalCard[] }) {
  const slice = dentists.slice(0, 4);
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0071e3]">Perto de você</p>
      <p className="mt-1 text-[20px] font-semibold tracking-tight text-[#1d1d1f]">
        Dentistas em {city}
      </p>
      <p className="mt-1 text-[12px] text-[#86868b]">Selecionados pelo OdontoHub Care</p>
      <ul className="mt-4 space-y-2">
        {slice.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-2xl bg-[#f4f4f5] px-2.5 py-2"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="size-11 overflow-hidden rounded-xl bg-[#d7e0e8]">
              <DentistPhoto
                name={item.name}
                honorific={item.honorific}
                photoUrl={item.photoUrl}
                compact
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-[#1d1d1f]">
                {shortNameOf(item)}
              </p>
              <p className="truncate text-[12px] text-[#86868b]">
                {item.specialties[0]?.shortName} · {item.clinic.neighborhood}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
