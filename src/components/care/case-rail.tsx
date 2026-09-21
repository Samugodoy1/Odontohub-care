import Link from "next/link";

import { CARE_CASES } from "@/lib/seo/cases";

export function CaseRail() {
  return (
    <div className="care-rail -mx-5 px-5 md:-mx-0 md:px-0">
      {CARE_CASES.map((item) => (
        <Link
          key={item.slug}
          href={`/para/${item.slug}`}
          className="care-rail-item group relative flex h-[300px] w-[220px] flex-col justify-end overflow-hidden rounded-[28px] md:h-[340px] md:w-[240px]"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.tile}`} />
          <div className="relative p-6">
            <p className="text-[13px] text-[#1d1d1f]/50">Tratamento</p>
            <h3 className="mt-1 text-[28px] font-semibold tracking-tight text-[#1d1d1f]">
              {item.headline}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
