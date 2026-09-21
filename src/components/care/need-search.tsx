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
  light?: boolean;
};

export function NeedSearch({
  initialQuery = "",
  initialPlace = "",
  autoFocus = false,
  compact = false,
  light = false,
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
      setError("Diga a cidade ou o que você precisa.");
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

  const field = light
    ? "bg-white text-care-ink-light placeholder:text-black/35"
    : "bg-white/[0.08] text-white placeholder:text-white/35 ring-1 ring-white/15";

  return (
    <div className={compact ? "" : "w-full"}>
      <form onSubmit={onSubmit} className="w-full" role="search">
        <div
          className={`grid gap-2 rounded-[22px] p-2 sm:grid-cols-[1.3fr_1fr_auto] ${
            light ? "bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]" : "bg-white/10 backdrop-blur-xl"
          }`}
        >
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
            className={`h-14 rounded-[16px] px-4 text-[17px] tracking-tight outline-none md:text-[19px] ${field}`}
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
            placeholder="Cidade — ex.: Taubaté"
            className={`h-14 rounded-[16px] px-4 text-[17px] tracking-tight outline-none ${field}`}
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
          <p className="mt-3 px-2 text-[14px] text-[#ff8a80]" role="alert">
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
              className="rounded-full bg-white/8 px-3.5 py-1.5 text-[13px] text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/14 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
