import Link from "next/link";

import { SUGGESTED_QUERIES } from "@/lib/site";

type EmptyStateProps = {
  title: string;
  body: string;
  withSuggestions?: boolean;
};

export function EmptyState({ title, body, withSuggestions = true }: EmptyStateProps) {
  return (
    <div className="rounded-[28px] bg-[#1d1d1f] px-6 py-16 text-center md:px-12">
      <p className="text-[13px] text-white/40">Nada neste recorte</p>
      <h2 className="mx-auto mt-3 max-w-lg text-[28px] font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/50">{body}</p>
      {withSuggestions ? (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SUGGESTED_QUERIES.slice(0, 4).map((item) => (
            <Link
              key={item}
              href={`/buscar?q=${encodeURIComponent(item)}`}
              className="rounded-full bg-white/8 px-3.5 py-1.5 text-[13px] text-white/80 ring-1 ring-white/15 hover:bg-white/14"
            >
              {item}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
