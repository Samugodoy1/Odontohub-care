"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import { SUGGESTED_QUERIES } from "@/lib/site";
import { REGIONS } from "@/lib/catalog/regions";

type NeedSearchProps = {
  initialQuery?: string;
  initialPlace?: string;
  autoFocus?: boolean;
  compact?: boolean;
};

export function NeedSearch({
  initialQuery = "",
  initialPlace = "",
  autoFocus = false,
  compact = false,
}: NeedSearchProps) {
  const router = useRouter();
  const queryId = useId();
  const placeId = useId();
  const listId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [place, setPlace] = useState(initialPlace);
  const [error, setError] = useState("");

  function submit(nextQuery = query, nextPlace = place) {
    const trimmed = nextQuery.trim();
    const city = nextPlace.trim();
    if (!trimmed && !city) {
      setError("Diga o que você precisa ou a sua cidade.");
      return;
    }
    setError("");
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    if (city) params.set("onde", city);
    router.push(`/buscar?${params.toString()}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  return (
    <div className={compact ? "" : "w-full"}>
      <form onSubmit={onSubmit} className="w-full" role="search">
        <div className="grid gap-1 rounded-[22px] bg-white/90 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-white/80 backdrop-blur-xl sm:rounded-[28px] sm:p-2 sm:grid-cols-[1.25fr_1fr_auto] sm:gap-0 sm:divide-x sm:divide-[#d2d2d7]/70">
          <div className="px-4 py-2 text-left">
            <label htmlFor={queryId} className="block text-[11px] font-medium text-[#86868b]">
              Tratamento
            </label>
            <input
              id={queryId}
              name="q"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (error) setError("");
              }}
              autoFocus={autoFocus}
              autoComplete="off"
              placeholder="Limpeza, extração…"
              className="mt-0.5 h-9 w-full bg-transparent text-[17px] tracking-tight text-[#1d1d1f] outline-none placeholder:text-[#86868b] md:text-[19px]"
            />
          </div>
          <div className="px-4 py-2 text-left">
            <label htmlFor={placeId} className="block text-[11px] font-medium text-[#86868b]">
              Cidade
            </label>
            <input
              id={placeId}
              name="onde"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              list={listId}
              placeholder="Taubaté"
              className="mt-0.5 h-9 w-full bg-transparent text-[17px] tracking-tight text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
            />
            <datalist id={listId}>
              {REGIONS.flatMap((region) => [
                <option key={region.id} value={region.city} />,
                ...region.neighborhoods.map((n) => (
                  <option key={`${region.id}-${n}`} value={`${n}, ${region.city}`} />
                )),
              ])}
            </datalist>
          </div>
          <div className="flex items-center p-1">
            <button type="submit" className="care-btn h-11 w-full shrink-0 gap-2 px-5 text-[16px] sm:h-12 sm:w-auto sm:px-6 sm:text-[17px]">
              Buscar
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        {error ? (
          <p className="mt-3 px-2 text-[14px] text-[#b42318]" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {!compact ? (
        <div className="care-chip-row mt-6 sm:mt-7">
          {SUGGESTED_QUERIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                const isCity = item.toLowerCase().includes(" em ");
                if (isCity) {
                  const [, city] = item.split(/ em /i);
                  setQuery("dentista");
                  setPlace(city ?? "");
                  submit("dentista", city ?? "");
                  return;
                }
                setQuery(item);
                submit(item, place);
              }}
              className="rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] text-[#1d1d1f]/80 ring-1 ring-[#d2d2d7]/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0071e3] hover:ring-[#0071e3]/25"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
