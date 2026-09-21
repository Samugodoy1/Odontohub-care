const FAQS = [
  {
    q: "O que é o OdontoHub Care?",
    a: "É o dossiê público dos dentistas que usam o OdontoHub. Não é um ranking pago nem um catálogo de cupom. É o lugar onde o paciente encontra profissionais verificados, específicos para o caso dele.",
  },
  {
    q: "Como o Care aparece no Google?",
    a: "Quando alguém pesquisa “dentista em Taubaté”, “dentista para limpeza” ou “dentista para extração”, o Care é a página que deve aparecer no topo: a cidade, o caso, os dentistas certos da rede.",
  },
  {
    q: "Quem pode aparecer no Care?",
    a: "Quem já opera a clínica no OdontoHub. Usar o sistema é o direito de entrar no dossiê. Não se compra posição. Não se aluga destaque.",
  },
  {
    q: "O que acontece se o dentista atender mal?",
    a: "Qualidade é critério, não slogan. Má prática ou um volume sério de reclamações desliga o profissional do OdontoHub — e, com isso, ele some do Care. A rede se protege para o paciente poder confiar.",
  },
  {
    q: "O paciente paga para usar o Care?",
    a: "Não. O Care é a porta. A consulta é com a clínica, no consultório, como sempre foi.",
  },
  {
    q: "Sou dentista. Como entro?",
    a: "Organizando o consultório no OdontoHub. Agenda, prontuário, o dia. Quem usa o sistema ganha o direito de aparecer para quem está procurando exatamente o que você trata.",
  },
] as const;

export function CareFaq() {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {FAQS.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-[21px] font-semibold tracking-tight text-white md:text-[28px]">
            {item.q}
            <span
              aria-hidden
              className="mt-1 text-[28px] font-light text-white/40 transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/55">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
