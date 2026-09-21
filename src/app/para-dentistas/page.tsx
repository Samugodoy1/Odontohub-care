import type { Metadata } from "next";
import Link from "next/link";

import { CareFaq } from "@/components/care/care-faq";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Para dentistas — o sistema encontra pacientes",
  description:
    "Quem usa o OdontoHub tem o direito de aparecer no Care. O sistema organiza a clínica e coloca o consultório na frente de quem pesquisa dentista no Google.",
};

export default function DentistsPage() {
  return (
    <main>
      <section className="care-hero-wash px-5 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="text-[15px] font-medium text-[#64d2ff]">Para dentistas</p>
          <h1 className="care-display mt-4 text-[44px] text-white md:text-[72px]">
            Além de cuidar da clínica, o sistema encontra pacientes.
          </h1>
          <p className="care-subhead mx-auto mt-6 max-w-[560px] text-[19px] md:text-[24px]">
            OdontoHub organiza o consultório. Care é o direito de aparecer quando alguém pesquisa
            “dentista em Taubaté” ou “dentista para extração”.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={SITE.sistema} className="care-btn">
              Entrar no OdontoHub
            </a>
            <Link href="/buscar" className="text-[17px] text-[#64d2ff]">
              Ver o Care como o paciente vê ›
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[820px]">
          <h2 className="care-display text-center text-[32px] text-white md:text-[48px]">
            Como o direito de aparecer funciona
          </h2>
          <ol className="mt-14 space-y-12">
            {[
              {
                n: "01",
                t: "Você usa o OdontoHub.",
                d: "Agenda, prontuário, o dia da clínica. Care não pede um segundo cadastro para inventar um perfil. O consultório que já existe no sistema é o que o paciente vê.",
              },
              {
                n: "02",
                t: "O paciente pesquisa o caso.",
                d: "No Google, não no jargão da especialidade. “Dentista para limpeza.” “Dentista para extração.” “Dentista em Taubaté.” O Care é a página que responde.",
              },
              {
                n: "03",
                t: "Você aparece se trata aquilo — e se a qualidade segura.",
                d: "Sem lance, sem destaque pago. Compatibilidade, cidade, verificação. Má qualidade ou volume sério de reclamações: desligado do OdontoHub, fora do Care.",
              },
            ].map((step) => (
              <li key={step.n} className="grid gap-3 md:grid-cols-[88px_1fr]">
                <p className="text-[15px] tabular-nums text-white/35">{step.n}</p>
                <div>
                  <h3 className="text-[26px] font-semibold tracking-tight text-white">{step.t}</h3>
                  <p className="mt-2 max-w-xl text-[17px] leading-relaxed text-white/50">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="care-display text-[36px] text-white md:text-[52px]">
            Um atrativo. Não um anúncio.
          </h2>
          <p className="care-subhead mx-auto mt-5 text-[19px] md:text-[24px]">
            O dentista escolhe o OdontoHub para operar a clínica. O Care é o outro lado da mesma
            promessa: o sistema também traz quem ainda não é paciente.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[820px]">
          <h2 className="care-display mb-10 text-[36px] text-white md:text-[48px]">
            Perguntas? Temos as respostas.
          </h2>
          <CareFaq />
        </div>
      </section>
    </main>
  );
}
