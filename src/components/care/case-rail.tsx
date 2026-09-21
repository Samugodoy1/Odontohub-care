import Link from "next/link";

import { CARE_CASES } from "@/lib/seo/cases";

export function CaseRail() {
  return (
    <div className="care-rail-mask">
      <div className="care-rail -mx-5 px-5 md:mx-0 md:px-1">
        {CARE_CASES.map((item) => (
          <Link
            key={item.slug}
            href={`/para/${item.slug}`}
            className="care-rail-item care-lift group relative flex h-[320px] w-[230px] flex-col justify-end overflow-hidden rounded-[32px] md:h-[380px] md:w-[260px]"
          >
            <div className={`care-sheen absolute inset-0 bg-gradient-to-br ${item.tile}`} />
            <div className="relative p-7">
              <p className="text-[13px] text-[#1d1d1f]/45">Tratamento</p>
              <h3 className="mt-1 text-[32px] font-semibold tracking-tight text-[#1d1d1f]">
                {item.headline}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
