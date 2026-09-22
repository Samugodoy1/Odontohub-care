import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sou dentista",
  description:
    "Quem usa o OdontoHub na clínica pode aparecer no Care — o dossiê onde pacientes encontram dentistas verificados no Google. Conheça o sistema em odontohub.app.br.",
  alternates: { canonical: `${SITE.domain}/para-dentistas` },
};

const STEPS = [
  {
    n: "01",
    t: "Assine o OdontoHub",
    d: "O Care faz parte do sistema para o consultório: agenda, prontuário, confirmações e inbox de pedidos de pacientes. Planos a partir de R$ 190 por mês, com um mês incluso na primeira assinatura.",
  },
  {
    n: "02",
    t: "Use o sistema na clínica",
    d: "Só entram contas OdontoHub ativas e aprovadas — não é ranking pago nem cadastro avulso. Alunos do Academy, sem clínica no Hub, não aparecem para pacientes.",
  },
  {
    n: "03",
    t: "Complete o perfil público",
    d: "Informe CRO, especialidade, foto e endereço da clínica (cidade e estado). Sem isso, o Care não consegue mostrar você na busca por cidade ou tratamento.",
  },
  {
    n: "04",
    t: "Pacientes te encontram",
    d: "Quem pesquisa “dentista em Taubaté” ou “dentista para limpeza” vê seu dossiê no Care. O pedido de consulta chega na inbox do OdontoHub, com nome e WhatsApp.",
  },
] as const;

const NOTES = [
  {
    t: "O Care não substitui o OdontoHub",
    d: "Care é a vitrine para quem ainda não tem dentista. O consultório continua no sistema — agenda, prontuário e financeiro em sistema.odontohub.app.br.",
  },
  {
    t: "Qualidade e visibilidade",
    d: "A posição não é comprada. Problemas graves de atendimento podem retirar o profissional da lista; o administrador também pode pausar a publicação sem bloquear o acesso ao sistema.",
  },
] as const;

const DENTIST_FAQ = [
  {
    q: "Preciso pagar extra pelo Care?",
    a: "Não. O Care está incluído no OdontoHub (e no OdontoHub+). Quem assina o sistema e mantém o perfil elegível pode ser encontrado no dossiê.",
  },
  {
    q: "Onde assino?",
    a: "Em odontohub.app.br — planos mensais ou anuais, com um mês incluso na primeira assinatura. Depois de aprovado, acesse o consultório em sistema.odontohub.app.br.",
  },
  {
    q: "Por que não apareço ainda?",
    a: "Verifique se a conta OdontoHub está ativa, se cidade e estado da clínica estão preenchidos e se a publicação no Care não foi pausada no admin.",
  },
] as const;

export default function DentistsPage() {
  return (
    <main>
      <section className="care-hero-wash pb-16 pt-12 sm:pb-20 sm:pt-16 md:pb-28 md:pt-24">
        <div className="care-align text-center">
          <p className="text-[15px] font-medium text-[#0071e3]">Para dentistas</p>
          <h1 className="care-display mx-auto mt-3 max-w-[16ch] text-[34px] sm:mt-4 sm:text-[44px] md:text-[64px]">
            O sistema da clínica. O Care traz o paciente.
          </h1>
          <p className="care-subhead mx-auto mt-5 max-w-[36rem] text-[17px] sm:mt-6 sm:text-[19px] md:text-[24px]">
            O OdontoHub cuida da agenda, do prontuário e do caixa. O{" "}
            <strong className="font-semibold text-[#1d1d1f]">OdontoHub Care</strong> é o dossiê
            público: pacientes que procuram um bom dentista no Google encontram quem usa o sistema
            na prática — com qualidade verificada, não anúncio.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:mt-10 sm:flex-row sm:items-center">
            <a href={SITE.hub} className="care-btn w-full sm:w-auto">
              Conhecer o OdontoHub
            </a>
            <a
              href={SITE.sistema}
              className="text-center text-[17px] text-[#0066cc] hover:underline"
            >
              Já sou cliente — abrir o sistema ›
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-md text-[14px] leading-relaxed text-[#86868b]">
            Assinatura e planos em{" "}
            <a href={SITE.hub} className="text-[#0066cc] hover:underline">
              odontohub.app.br
            </a>
            . O Care entra automaticamente para clínicas elegíveis.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 md:py-28">
        <div className="care-align">
          <h2 className="care-display text-[28px] sm:text-center sm:text-[32px] md:text-[44px]">
            Como aparecer no Care
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[17px] leading-relaxed text-[#6e6e73] sm:text-[19px]">
            Não há formulário separado no Care. Você entra pela assinatura do OdontoHub e pelo
            perfil da clínica no sistema.
          </p>
          <ol className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
            {STEPS.map((step) => (
              <li key={step.n} className="grid gap-3 md:grid-cols-[88px_1fr]">
                <p className="text-[15px] tabular-nums text-[#86868b]">{step.n}</p>
                <div>
                  <h3 className="text-[24px] font-semibold tracking-tight text-[#1d1d1f]">
                    {step.t}
                  </h3>
                  <p className="mt-2 max-w-xl text-[17px] leading-relaxed text-[#6e6e73]">
                    {step.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href={SITE.hub} className="care-btn w-full sm:w-auto">
              Ver planos no OdontoHub
            </a>
            <Link href="/buscar" className="text-[17px] text-[#0066cc] hover:underline">
              Ver como o paciente busca ›
            </Link>
          </div>
        </div>
      </section>

      <section className="care-band py-14 sm:py-20 md:py-28">
        <div className="care-align grid gap-10 md:grid-cols-2 md:gap-12">
          {NOTES.map((item) => (
            <article key={item.t} className="rounded-[28px] bg-white p-7 ring-1 ring-[#eeeef0] sm:p-8">
              <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">{item.t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[#6e6e73]">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-20 md:py-28">
        <div className="care-align">
          <h2 className="care-display mb-6 text-[28px] sm:mb-10 sm:text-[36px] md:text-[44px]">
            Perguntas de quem é dentista
          </h2>
          <div className="divide-y divide-[#d2d2d7] border-y border-[#d2d2d7]">
            {DENTIST_FAQ.map((item) => (
              <details key={item.q} className="group py-5 sm:py-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[19px] font-semibold tracking-tight text-[#1d1d1f] transition-colors group-open:text-[#0071e3] sm:text-[22px]">
                  {item.q}
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f5f5f7] text-[20px] font-light text-[#86868b] transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#6e6e73]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
