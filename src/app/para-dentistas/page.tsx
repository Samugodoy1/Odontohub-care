import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sou dentista",
  description:
    "Pacientes te encontram no Care quando você faz parte da lista. Qualidade cobrada. Sem anúncio comprado.",
};

export default function DentistsPage() {
  return (
    <main>
      <section className="care-hero-wash pb-16 pt-12 sm:pb-20 sm:pt-16 md:pb-28 md:pt-24">
        <div className="care-align text-center">
          <p className="text-[15px] font-medium text-[#0071e3]">Para dentistas</p>
          <h1 className="care-display mx-auto mt-3 max-w-[20ch] text-[34px] sm:mt-4 sm:text-[44px] md:text-[64px]">
            Pacientes procuram um dentista. Você pode ser o que eles encontram.
          </h1>
          <p className="care-subhead mx-auto mt-5 max-w-[34rem] text-[17px] sm:mt-6 sm:text-[19px] md:text-[24px]">
            Quando alguém pesquisa “dentista em Taubaté” ou “dentista para extração”, o Care mostra
            quem cuida daquilo. Sem comprar um anúncio.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:mt-10 sm:flex-row sm:items-center">
            <a href={SITE.sistema} className="care-btn w-full sm:w-auto">
              Quero aparecer
            </a>
            <Link href="/buscar" className="text-center text-[17px] text-[#0066cc]">
              Ver como o paciente vê ›
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 md:py-28">
        <div className="care-align">
          <h2 className="care-display text-[28px] sm:text-center sm:text-[32px] md:text-[44px]">Como isso funciona</h2>
          <ol className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
            {[
              {
                n: "01",
                t: "Você cuida da clínica com seriedade.",
                d: "O Care não inventa um perfil. Mostra o consultório que já existe — e só se a qualidade segura.",
              },
              {
                n: "02",
                t: "O paciente pesquisa o que precisa.",
                d: "Limpeza. Extração. A cidade. Palavras de quem dói o dente, não de quem vende software.",
              },
              {
                n: "03",
                t: "Você aparece se trata aquilo.",
                d: "E some se o atendimento falhar. Má prática ou muitas reclamações sérias: fora da lista.",
              },
            ].map((step) => (
              <li key={step.n} className="grid gap-3 md:grid-cols-[88px_1fr]">
                <p className="text-[15px] tabular-nums text-[#86868b]">{step.n}</p>
                <div>
                  <h3 className="text-[24px] font-semibold tracking-tight text-[#1d1d1f]">{step.t}</h3>
                  <p className="mt-2 max-w-xl text-[17px] leading-relaxed text-[#6e6e73]">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
