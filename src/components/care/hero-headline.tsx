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
    }, 3400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <h1 className="care-hero-title">
      <span className="block">Encontre o</span>
      <span className="block">dentista certo</span>
      <span className="mt-[0.08em] block text-[#0071e3]">
        para{" "}
        <span className="inline-grid text-left">
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
