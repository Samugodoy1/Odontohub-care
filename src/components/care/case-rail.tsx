import Image from "next/image";
import Link from "next/link";

import { CARE_CASES } from "@/lib/seo/cases";

function RailInset() {
  return <div aria-hidden className="care-rail-inset" />;
}

export function CaseRail() {
  return (
    <div className="care-rail-mask">
      <div className="care-rail">
        <RailInset />
        {CARE_CASES.map((item, index) => (
          <Link
            key={item.slug}
            href={`/para/${item.slug}`}
            className="care-rail-item care-lift group relative flex h-[300px] w-[min(70vw,240px)] flex-col justify-end overflow-hidden rounded-[28px] sm:h-[340px] sm:rounded-[32px] md:h-[400px] md:w-[268px]"
          >
            <Image
              src={item.photo}
              alt=""
              fill
              sizes="(max-width: 733px) 70vw, 268px"
              priority={index < 2}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
            <div className="relative p-5 sm:p-6">
              <p className="text-[13px] text-white/75">Tratamento</p>
              <h3 className="mt-1 text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
                {item.headline}
              </h3>
            </div>
          </Link>
        ))}
        <RailInset />
      </div>
    </div>
  );
}
