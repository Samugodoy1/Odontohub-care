"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import { REGIONS } from "@/lib/catalog/regions";

const HERO_SHORTCUTS = [
  { label: "Limpeza", query: "dentista para limpeza" },
  { label: "Extração", query: "dentista para extração" },
  { label: "Aparelho", query: "dentista para aparelho" },
  { label: "Implante", query: "dentista para implante" },
] as const;

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

  const fields = (
    <>
      <div className={compact ? "px-4 py-2 text-left" : "min-w-0 flex-1 px-4 py-1 text-left sm:px-5"}>
        <label
          htmlFor={queryId}
          className={compact ? "block text-[11px] font-medium text-[#86868b]" : "sr-only"}
        >
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
          className={
            compact
              ? "mt-0.5 h-9 w-full bg-transparent text-[17px] tracking-tight text-[#1d1d1f] outline-none placeholder:text-[#86868b] md:text-[19px]"
              : "h-14 w-full bg-transparent text-[17px] tracking-[-0.022em] text-[#1d1d1f] outline-none placeholder:text-[#86868b] sm:h-16 sm:text-[19px]"
          }
        />
      </div>
      <div
        className={
          compact
            ? "hidden"
            : "mx-4 h-px bg-[#d2d2d7] sm:mx-0 sm:my-4 sm:h-8 sm:w-px sm:self-center"
        }
        aria-hidden
      />
      <div className={compact ? "px-4 py-2 text-left" : "min-w-0 flex-1 px-4 py-1 text-left sm:px-5"}>
        <label
          htmlFor={placeId}
          className={compact ? "block text-[11px] font-medium text-[#86868b]" : "sr-only"}
        >
          Cidade
        </label>
        <input
          id={placeId}
          name="onde"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
          list={listId}
          placeholder={compact ? "Taubaté" : "Sua cidade"}
          className={
            compact
              ? "mt-0.5 h-9 w-full bg-transparent text-[17px] tracking-tight text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
              : "h-14 w-full bg-transparent text-[17px] tracking-[-0.022em] text-[#1d1d1f] outline-none placeholder:text-[#86868b] sm:h-16 sm:text-[19px]"
          }
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
    </>
  );

  return (
    <div className={compact ? "" : "w-full"}>
      <form onSubmit={onSubmit} className="w-full" role="search">
        {compact ? (
          <div className="grid gap-1 rounded-[22px] bg-white/90 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-white/80 backdrop-blur-xl sm:rounded-[28px] sm:grid-cols-[1.25fr_1fr_auto] sm:gap-0 sm:divide-x sm:divide-[#d2d2d7]/70 sm:p-2">
            {fields}
            <div className="flex items-center p-1">
              <button
                type="submit"
                className="care-btn h-11 w-full shrink-0 gap-2 px-5 text-[16px] sm:h-12 sm:w-auto sm:px-6 sm:text-[17px]"
              >
                Buscar
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[22px] bg-white p-2 text-left shadow-[0_4px_24px_rgba(0,0,0,0.04)] ring-1 ring-[#d2d2d7] transition-shadow focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.06)] focus-within:ring-[#0071e3]/35 sm:rounded-[28px] sm:p-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center">
              {fields}
              <div className="p-1.5 sm:pl-2 sm:pr-1">
                <button type="submit" className="care-btn h-12 w-full gap-2 px-6 sm:w-auto sm:px-7">
                  Buscar
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        )}
        {error ? (
          <p className="mt-3 px-2 text-left text-[14px] text-[#b42318]" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {!compact ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-12 sm:gap-x-10">
          {HERO_SHORTCUTS.map((item) => (
            <button
              key={item.query}
              type="button"
              onClick={() => {
                setQuery(item.query);
                submit(item.query, place);
              }}
              className="text-[17px] text-[#0066cc] transition-opacity hover:underline hover:underline-offset-[5px]"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
