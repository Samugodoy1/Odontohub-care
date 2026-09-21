"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight, MapPin } from "lucide-react";

import { SUGGESTED_QUERIES } from "@/lib/site";
import { REGIONS } from "@/lib/catalog/regions";

type NeedSearchProps = {
  initialQuery?: string;
  initialPlace?: string;
  autoFocus?: boolean;
  compact?: boolean;
  variant?: "default" | "stage";
};

export function NeedSearch({
  initialQuery = "",
  initialPlace = "",
  autoFocus = false,
  compact = false,
  variant = "default",
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
    if (!trimmed) {
      setError("Descreva o que está acontecendo.");
      return;
    }
    setError("");
    const params = new URLSearchParams({ q: trimmed });
    if (nextPlace.trim()) params.set("onde", nextPlace.trim());
    router.push(`/buscar?${params.toString()}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  const stage = variant === "stage";

  return (
    <div className={compact ? "" : "w-full"}>
      <form onSubmit={onSubmit} className="w-full" role="search">
        <div
          className={
            stage
              ? "care-glass rounded-[32px] p-3 transition-shadow duration-300 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_0_0_1px_rgba(31,107,87,0.35),0_22px_60px_-28px_rgba(0,0,0,0.28)] md:p-4"
              : `rounded-[28px] bg-white ring-1 ring-care-line shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
                  compact ? "p-3 md:p-4" : "p-3 md:p-5"
                }`
          }
        >
          <label htmlFor={queryId} className="sr-only">
            O que você está sentindo
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
            placeholder="Ex.: Meu dente quebrou"
            className={
              stage
                ? "h-14 w-full bg-transparent px-3 text-[19px] tracking-[-0.02em] text-care-ink outline-none placeholder:text-care-muted md:h-[4.25rem] md:text-[22px]"
                : "h-14 w-full bg-transparent px-3 text-[19px] tracking-tight text-care-ink outline-none placeholder:text-care-muted md:h-16 md:text-[22px]"
            }
          />
          <div
            className={`flex flex-col gap-3 border-t border-care-line/80 px-2 pt-3 sm:flex-row sm:items-center ${
              stage ? "mt-1" : "mt-2"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <MapPin className="size-4 shrink-0 text-care-muted" aria-hidden />
              <label htmlFor={placeId} className="sr-only">
                Cidade ou bairro
              </label>
              <input
                id={placeId}
                name="onde"
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                list={listId}
                placeholder="Cidade ou bairro no Brasil"
                className="h-10 w-full bg-transparent text-[15px] text-care-ink outline-none placeholder:text-care-muted"
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
            <button type="submit" className="care-btn shrink-0 gap-2">
              Encontrar
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
        <div className={`flex flex-wrap justify-center ${stage ? "mt-8 gap-2" : "mt-6 gap-2"}`}>
          {SUGGESTED_QUERIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setQuery(item);
                submit(item, place);
              }}
              className={
                stage
                  ? "rounded-full bg-white/80 px-3.5 py-[7px] text-[13px] tracking-[-0.01em] text-care-ink/80 ring-1 ring-black/[0.05] transition-colors hover:bg-white hover:text-care-ink"
                  : "rounded-full bg-white px-3.5 py-1.5 text-[13px] text-care-ink ring-1 ring-care-line transition-colors hover:bg-care-sage-soft hover:text-care-sage-deep hover:ring-care-sage/20"
              }
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
