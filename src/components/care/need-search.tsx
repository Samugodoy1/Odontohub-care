"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";

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
      setError("Diga o tratamento ou a cidade.");
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
        <div className="rounded-[18px] bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-[#e8e8ed] sm:p-2.5">
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] sm:items-end">
            <div className="rounded-[14px] bg-[#f4f4f5] px-4 py-3 text-left">
              <label htmlFor={queryId} className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">
                Tratamento
              </label>
              <div className="mt-1 flex items-center gap-2">
                <Search className="size-4 shrink-0 text-[#0f766e]" aria-hidden />
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
                  placeholder="Limpeza, canal, implante"
                  className="h-8 w-full bg-transparent text-[16px] text-[#1d1d1f] outline-none placeholder:text-[#a1a1a6]"
                />
              </div>
            </div>
            <div className="rounded-[14px] bg-[#f4f4f5] px-4 py-3 text-left">
              <label htmlFor={placeId} className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73]">
                Cidade
              </label>
              <div className="mt-1 flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-[#0f766e]" aria-hidden />
                <input
                  id={placeId}
                  name="onde"
                  value={place}
                  onChange={(event) => setPlace(event.target.value)}
                  list={listId}
                  placeholder="Taubaté, SP"
                  className="h-8 w-full bg-transparent text-[16px] text-[#1d1d1f] outline-none placeholder:text-[#a1a1a6]"
                />
              </div>
              <datalist id={listId}>
                {REGIONS.flatMap((region) => [
                  <option key={region.id} value={region.city} />,
                  ...region.neighborhoods.map((n) => (
                    <option key={`${region.id}-${n}`} value={`${n}, ${region.city}`} />
                  )),
                ])}
              </datalist>
            </div>
            <button
              type="submit"
              className="h-12 rounded-[14px] bg-[#0f766e] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#0d9488] sm:h-[68px] sm:px-7"
            >
              Buscar
            </button>
          </div>
        </div>
        {error ? (
          <p className="mt-3 px-1 text-[14px] text-[#b42318]" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {!compact ? (
        <div className="care-chip-row mt-5 sm:mt-6">
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
              className="rounded-full bg-white px-3.5 py-1.5 text-[13px] text-[#3f3f46] ring-1 ring-[#e5e5ea] transition-colors hover:text-[#0f766e] hover:ring-[#0f766e]/30"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
