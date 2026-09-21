import Link from "next/link";

import { SUGGESTED_QUERIES } from "@/lib/site";

type EmptyStateProps = {
  title: string;
  body: string;
  withSuggestions?: boolean;
};

export function EmptyState({ title, body, withSuggestions = true }: EmptyStateProps) {
  return (
    <div className="rounded-[24px] bg-white px-5 py-12 text-center ring-1 ring-[#d2d2d7]/80 sm:rounded-[28px] sm:px-8 sm:py-16 md:px-12">
      <p className="text-[13px] text-[#86868b]">Resultado da busca</p>
      <h2 className="mx-auto mt-3 max-w-lg text-[24px] font-semibold tracking-tight text-[#1d1d1f] sm:text-[28px]">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#86868b]">{body}</p>
      {withSuggestions ? (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SUGGESTED_QUERIES.slice(0, 4).map((item) => (
            <Link
              key={item}
              href={`/buscar?q=${encodeURIComponent(item)}`}
              className="rounded-full bg-[#f5f5f7] px-3.5 py-1.5 text-[13px] text-[#1d1d1f] ring-1 ring-[#d2d2d7] hover:bg-[#eaf3fb]"
            >
              {item}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
