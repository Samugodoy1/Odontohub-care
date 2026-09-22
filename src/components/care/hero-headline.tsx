"use client";

import { useEffect, useState } from "react";

const NEEDS = ["limpeza", "extração", "aparelho", "implante"] as const;

export function HeroHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % NEEDS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <h1 className="care-display mx-auto max-w-[13ch] text-[56px] sm:text-[80px] md:text-[104px]">
      Encontre o dentista certo
      <span className="mt-1 block">
        para{" "}
        <span className="inline-grid text-left text-[#0071e3]">
          <span className="invisible col-start-1 row-start-1" aria-hidden>
            extração.
          </span>
          <span key={NEEDS[index]} className="care-word col-start-1 row-start-1">
            {NEEDS[index]}.
          </span>
        </span>
      </span>
    </h1>
  );
}
