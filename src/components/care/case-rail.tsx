import Link from "next/link";

import { CARE_CASES } from "@/lib/seo/cases";

export function CaseRail() {
  return (
    <div className="care-rail -mx-5 px-5 md:-mx-0 md:px-0">
      {CARE_CASES.map((item) => (
        <Link
          key={item.slug}
          href={`/para/${item.slug}`}
          className="care-rail-item group relative h-[340px] w-[240px] overflow-hidden rounded-[28px] md:h-[380px] md:w-[260px]"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.tile}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[13px] text-white/70">OdontoHub Care</p>
            <h3 className="mt-1 text-[28px] font-semibold tracking-tight text-white">
              {item.headline}
            </h3>
            <p className="mt-2 text-[13px] text-white/75 opacity-0 transition-opacity group-hover:opacity-100">
              {item.googleQuery}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
