import Link from "next/link";

import type { IntentMatchResult } from "@/lib/intent/matcher";

function percent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function IntentBanner({ intent }: { intent: IntentMatchResult }) {
  if (intent.unknown || !intent.primary) {
    return (
      <div className="rounded-[28px] bg-white px-6 py-6 ring-1 ring-care-line md:px-8">
        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
          Interpretação
        </p>
        <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-care-ink">
          Ainda não entendemos com clareza.
        </h2>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-care-muted">
          Tente uma frase do dia a dia — o que dói, o que caiu, o que você quer resolver. Care
          começa pela queixa, não pelo nome da especialidade.
        </p>
      </div>
    );
  }

  const primary = intent.primary;

  return (
    <div className="rounded-[28px] bg-white px-6 py-6 ring-1 ring-care-line md:px-8">
      <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
        Interpretação
      </p>
      <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-care-ink md:text-[28px]">
        {primary.intent.patientLabel}
      </h2>
      <p className="mt-2 text-[15px] text-care-muted">{primary.intent.label}</p>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-care-ink/75">
        {primary.intent.explanation}
      </p>
      <p className="mt-4 text-[13px] tabular-nums text-care-muted">
        Confiança {percent(primary.confidence)}
      </p>
      {intent.alternatives.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="self-center text-[13px] text-care-muted">Também pode ser</span>
          {intent.alternatives.map((item) => (
            <Link
              key={item.intent.id}
              href={`/buscar?q=${encodeURIComponent(item.intent.label)}`}
              className="rounded-full bg-care-surface px-3 py-1 text-[13px] text-care-ink ring-1 ring-care-line hover:bg-care-sage-soft"
            >
              {item.intent.label}
              <span className="ml-1 text-care-muted">{percent(item.confidence)}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
