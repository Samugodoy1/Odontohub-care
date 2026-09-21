"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Search } from "lucide-react";

import { SUGGESTED_QUERIES } from "@/lib/site";
import { REGIONS } from "@/lib/catalog/regions";

type NeedSearchProps = {
  initialQuery?: string;
  initialPlace?: string;
  autoFocus?: boolean;
  compact?: boolean;
};

function composeQuery(query: string, place: string) {
  const trimmed = query.trim();
  const city = place.trim();
  if (trimmed && city) {
    const already = trimmed.toLowerCase().includes(city.toLowerCase());
    return already ? trimmed : `${trimmed} em ${city}`;
  }
  return trimmed || city;
}

export function NeedSearch({
  initialQuery = "",
  initialPlace = "",
  autoFocus = false,
  compact = false,
}: NeedSearchProps) {
  const router = useRouter();
  const queryId = useId();
  const listId = useId();
  const [query, setQuery] = useState(composeQuery(initialQuery, initialPlace));
  const [error, setError] = useState("");

  function submit(nextQuery = query) {
    const trimmed = nextQuery.trim();
    if (!trimmed) {
      setError("Diga o tratamento ou a cidade.");
      return;
    }
    setError("");
    router.push(`/buscar?q=${encodeURIComponent(trimmed)}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  return (
    <div className={compact ? "" : "w-full"}>
      <form onSubmit={onSubmit} className="w-full" role="search">
        <label htmlFor={queryId} className="sr-only">
          Buscar tratamento ou cidade
        </label>
        <div className="care-search-shell">
          <div className="care-search-field">
            <Search className="size-[18px] shrink-0 text-[#86868b] sm:size-5" aria-hidden />
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
              enterKeyHint="search"
              type="search"
              list={listId}
              placeholder="Buscar tratamento ou cidade"
            />
          </div>
        </div>
        <datalist id={listId}>
          {SUGGESTED_QUERIES.map((item) => (
            <option key={item} value={item} />
          ))}
          {REGIONS.map((region) => (
            <option key={region.id} value={region.city} />
          ))}
        </datalist>
        {error ? (
          <p className="mt-3 px-2 text-[14px] text-[#b42318]" role="alert">
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
                setQuery(item);
                submit(item);
              }}
              className="rounded-full bg-white px-3.5 py-1.5 text-[13px] text-[#1d1d1f]/80 ring-1 ring-[#d2d2d7]/80 transition-colors hover:text-[#0071e3] hover:ring-[#0071e3]/25"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
