import Link from "next/link";

type CareMarkProps = {
  href?: string | false;
  tone?: "ink" | "light";
  size?: "sm" | "md";
};

export function CareMark({ href = "/", tone = "ink", size = "md" }: CareMarkProps) {
  const compact = size === "sm";
  const light = tone === "light";
  const mark = (
    <span
      className={`inline-flex items-baseline gap-1 leading-none tracking-tight ${
        compact ? "text-[12px] font-semibold sm:text-[13px]" : "text-[17px] font-semibold md:text-[19px]"
      }`}
    >
      <span className={light ? "text-white" : "text-[#1d1d1f]"}>OdontoHub</span>
      <span className={light ? "text-white/70" : "text-[#86868b]"}>Care</span>
    </span>
  );

  if (!href) {
    return mark;
  }

  return (
    <Link href={href} className="inline-flex items-baseline leading-none" aria-label="OdontoHub Care, página inicial">
      {mark}
    </Link>
  );
}
