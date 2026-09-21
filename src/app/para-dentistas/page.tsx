import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Para dentistas",
  description:
    "OdontoHub Care não é um marketplace. É a porta do paciente para clínicas que já usam o OdontoHub.",
};

const STEPS = [
  {
    n: "01",
    t: "O consultório já existe no Hub.",
    d: "Agenda, prontuário, especialidade, endereço. Care não pede um segundo cadastro para inventar um perfil.",
  },
  {
    n: "02",
    t: "A queixa chega em português.",
    d: "O paciente não escolhe “dentística”. Diz que o dente quebrou. O motor de intenção traduz.",
  },
  {
    n: "03",
    t: "Você aparece se trata aquilo.",
    d: "Sem lance, sem destaque pago. Compatibilidade e região. O restante é a clínica, como sempre foi.",
  },
] as const;

export default function DentistsPage() {
  return (
    <main>
      <section className="px-5 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-[15px] font-medium tracking-tight text-care-sage">Para dentistas</p>
          <h1 className="care-display mt-4 text-[40px] md:text-[64px]">
            Não é um marketplace.
          </h1>
          <p className="care-subhead mx-auto mt-5 max-w-[540px] text-[19px] md:text-[24px]">
            Care é a camada de descoberta do OdontoHub. O paciente encontra o consultório que já
            opera no sistema — não uma vitrine de anúncios.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[820px]">
          <h2 className="care-display text-center text-[32px] md:text-[44px]">Como a rede funciona</h2>
          <ol className="mt-14 space-y-10">
            {STEPS.map((step) => (
              <li key={step.n} className="grid gap-3 md:grid-cols-[80px_1fr]">
                <p className="text-[15px] tabular-nums text-care-muted">{step.n}</p>
                <div>
                  <h3 className="text-[24px] font-semibold tracking-tight text-care-ink">{step.t}</h3>
                  <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-care-muted">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[720px]">
          <h2 className="care-display text-[32px] md:text-[44px]">O valor extra do sistema</h2>
          <p className="mt-5 text-[18px] leading-relaxed text-care-ink/85">
            O OdontoHub já reduz o caos operacional: pacientes, agenda, retorno, a carga mental do
            dia. Care é o outro lado da mesma promessa. Quem organiza o consultório no Hub pode
            aparecer para quem está procurando exatamente aquele cuidado.
          </p>
          <p className="mt-5 text-[18px] leading-relaxed text-care-muted">
            Academy, Hub, Presença, Care. Quatro superfícies. Um ecossistema. O arquivo não começa
            no anúncio — começa na cadeira.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={SITE.sistema} className="care-btn-dark">
              Abrir o OdontoHub
            </a>
            <a
              href={SITE.hubWww}
              className="text-[17px] text-care-sage hover:underline underline-offset-4"
            >
              Conhecer o sistema <span aria-hidden>›</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-care-ink px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="care-display text-[32px] md:text-[44px]">O paciente já está falando.</h2>
          <p className="mt-5 text-[18px] leading-relaxed text-white/60">
            “Meu dente quebrou.” Care escuta. O Hub recebe. Você atende.
          </p>
          <Link
            href="/buscar?q=Meu%20dente%20quebrou"
            className="mt-8 inline-flex text-[17px] text-[#7ddec4] hover:underline underline-offset-4"
          >
            Ver como o paciente chega <span aria-hidden>›</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
