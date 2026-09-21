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
        <div className="grid gap-2 rounded-[22px] bg-white p-2 shadow-[0_2px_24px_rgba(0,0,0,0.06)] ring-1 ring-[#d2d2d7]/80 sm:grid-cols-[1.3fr_1fr_auto]">
          <label htmlFor={queryId} className="sr-only">
            O que você precisa
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
            placeholder="Limpeza, extração, aparelho…"
            className="h-14 rounded-[16px] bg-[#f5f5f7] px-4 text-[17px] tracking-tight text-[#1d1d1f] outline-none placeholder:text-[#86868b] md:text-[19px]"
          />
          <label htmlFor={placeId} className="sr-only">
            Cidade
          </label>
          <input
            id={placeId}
            name="onde"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            list={listId}
            placeholder="Sua cidade"
            className="h-14 rounded-[16px] bg-[#f5f5f7] px-4 text-[17px] tracking-tight text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
          />
          <datalist id={listId}>
            {REGIONS.flatMap((region) => [
              <option key={region.id} value={region.city} />,
              ...region.neighborhoods.map((n) => (
                <option key={`${region.id}-${n}`} value={`${n}, ${region.city}`} />
              )),
            ])}
          </datalist>
          <button type="submit" className="care-btn h-14 shrink-0 gap-2 px-6">
            Buscar
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
        {error ? (
          <p className="mt-3 px-2 text-[14px] text-[#b42318]" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {!compact ? (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
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
              className="rounded-full bg-white px-3.5 py-1.5 text-[13px] text-[#1d1d1f] ring-1 ring-[#d2d2d7] transition-colors hover:bg-[#eaf3fb] hover:text-[#0071e3] hover:ring-[#0071e3]/20"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
