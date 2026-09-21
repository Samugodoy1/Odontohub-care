import Link from "next/link";

export function CareMark({ inverted = true }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-baseline gap-1.5 leading-none"
      aria-label="OdontoHub Care, página inicial"
    >
      <span
        className={`text-[17px] font-semibold tracking-tight md:text-[19px] ${
          inverted ? "text-white" : "text-care-ink-light"
        }`}
      >
        OdontoHub
      </span>
      <span
        className={`text-[17px] font-semibold tracking-tight md:text-[19px] ${
          inverted ? "text-white/55" : "text-care-muted"
        }`}
      >
        Care
      </span>
    </Link>
  );
}

export function CareRings({ className = "" }: { className?: string }) {
  return (
    <div className={`care-rings ${className}`} aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}
