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
    <h1 className="care-hero-title">
      Encontre o dentista certo
      <span className="care-hero-need">
        <span className="invisible col-start-1 row-start-1" aria-hidden>
          para extração.
        </span>
        <span key={NEEDS[index]} className="care-word col-start-1 row-start-1">
          para {NEEDS[index]}.
        </span>
      </span>
    </h1>
  );
}
