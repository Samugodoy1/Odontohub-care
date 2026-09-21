import Link from "next/link";

import { NeedSearch } from "@/components/care/need-search";
import { SITE } from "@/lib/site";

const SURFACES = [
  {
    name: "Academy",
    line: "A clínica começa no box.",
    href: SITE.academy,
    external: true,
  },
  {
    name: "Hub",
    line: "O sistema para o consultório.",
    href: SITE.hubWww,
    external: true,
  },
  {
    name: "Presença",
    line: "O paciente que já é da casa.",
    href: SITE.hubWww,
    external: true,
  },
  {
    name: "Care",
    line: "Quem ainda não tem dentista.",
    href: "/",
    external: false,
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section
        aria-labelledby="care-hero-title"
        className="care-stage relative -mt-12 flex min-h-svh flex-col justify-center overflow-hidden px-5 pb-20 pt-12 md:pb-24"
      >
        <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center text-center">
          <p className="care-enter text-[17px] font-semibold tracking-[-0.022em] text-care-ink md:text-[21px]">
            OdontoHub Care
          </p>
          <h1
            id="care-hero-title"
            className="care-enter care-display mx-auto mt-2 max-w-[12em] text-balance text-[clamp(3rem,7.6vw,6rem)] leading-[1.02] tracking-[-0.042em] text-care-ink"
            style={{ animationDelay: "80ms" }}
          >
            Diga o que sente.
          </h1>
          <p
            className="care-enter mx-auto mt-5 max-w-[40rem] text-pretty text-[19px] font-normal leading-[1.35] tracking-[-0.018em] text-care-gray md:mt-6 md:text-[24px] md:leading-[1.28]"
            style={{ animationDelay: "150ms" }}
          >
            Você não precisa saber o nome do tratamento. Descreva o que está acontecendo.
            Encontramos quem cuida — perto de você.
          </p>
          <div
            className="care-enter mt-12 w-full max-w-[720px] md:mt-16"
            style={{ animationDelay: "230ms" }}
          >
            <NeedSearch autoFocus variant="stage" />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="care-display text-[32px] md:text-[48px]">
            Sem especialidade.
            <span className="mt-2 block text-care-muted">Sem catálogo de ofertas.</span>
          </h2>
          <p className="care-subhead mx-auto mt-6 max-w-[520px] text-[18px] md:text-[21px]">
            Care traduz a queixa em cuidado. O dentista que já usa o OdontoHub aparece porque o
            consultório já existe — não porque pagou um anúncio.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <p className="text-center text-[15px] font-medium tracking-tight text-care-sage">
            O mesmo ecossistema
          </p>
          <h2 className="care-display mx-auto mt-3 max-w-[18ch] text-center text-[32px] md:text-[48px]">
            Quatro superfícies. Um arquivo.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {SURFACES.map((surface) => {
              const className =
                "block rounded-[28px] bg-care-surface px-7 py-8 text-left transition-colors hover:bg-care-sage-soft";
              const inner = (
                <>
                  <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
                    {surface.name}
                  </p>
                  <p className="mt-3 text-[22px] font-semibold tracking-tight text-care-ink">
                    {surface.line}
                  </p>
                </>
              );
              if (surface.external) {
                return (
                  <a key={surface.name} href={surface.href} className={className}>
                    {inner}
                  </a>
                );
              }
              return (
                <Link key={surface.name} href={surface.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
          <p className="mx-auto mt-10 max-w-[560px] text-center text-[15px] leading-relaxed text-care-muted">
            Academy forma o arquivo. Hub opera o consultório. Presença fala com quem já é
            paciente. Care encontra quem ainda não é.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="care-display text-[32px] md:text-[44px]">Não é um marketplace.</h2>
          <p className="care-subhead mx-auto mt-5 max-w-[500px] text-[18px] md:text-[21px]">
            Não há ranking pago, cupom nem leilão de consulta. Há clínicas que já organizam o dia
            no OdontoHub — e um paciente que descreveu o problema com as próprias palavras.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <Link href="/para-dentistas" className="care-btn-dark">
              Sou dentista
            </Link>
            <Link href="/buscar" className="text-[17px] text-care-sage hover:underline underline-offset-4">
              Ver profissionais <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
