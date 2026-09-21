import Link from "next/link";

export function CareMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-baseline gap-1.5 leading-none"
      aria-label="OdontoHub Care, página inicial"
    >
      <span
        className={`text-[19px] md:text-[21px] font-semibold tracking-tight ${
          inverted ? "text-white" : "text-care-ink"
        }`}
      >
        OdontoHub
      </span>
      <span
        className={`text-[11px] md:text-[12px] font-medium tracking-tight ${
          inverted ? "text-white/60" : "text-care-sage"
        }`}
      >
        Care
      </span>
    </Link>
  );
}
