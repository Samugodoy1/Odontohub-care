import Link from "next/link";

export function CareMark() {
  return (
    <Link
      href="/"
      className="inline-flex items-baseline gap-1.5 leading-none"
      aria-label="OdontoHub Care, página inicial"
    >
      <span className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] md:text-[19px]">
        OdontoHub
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-[#86868b] md:text-[19px]">
        Care
      </span>
    </Link>
  );
}
