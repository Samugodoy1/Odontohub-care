const FAQS = [
  {
    q: "O que é o Care?",
    a: "É uma lista de dentistas selecionados para diferentes tratamentos e cidades. Você pesquisa o que precisa e conhece os profissionais disponíveis.",
  },
  {
    q: "Como vocês escolhem os dentistas?",
    a: "A entrada segue critérios de qualidade do Care. A posição na lista não é comprada.",
  },
  {
    q: "A lista é atualizada?",
    a: "Sim. A permanência depende da continuidade do padrão de atendimento. Problemas sérios podem retirar o profissional da lista.",
  },
  {
    q: "Preciso pagar para usar?",
    a: "Não. Procurar aqui é grátis. A consulta é com a clínica, como sempre foi.",
  },
  {
    q: "Como marco uma consulta?",
    a: "Abra o perfil do dentista e envie um pedido de contato. A clínica fala com você para confirmar a disponibilidade e combinar o horário.",
  },
  {
    q: "Sou dentista. Posso aparecer?",
    a: "Você pode solicitar a participação da sua clínica. A entrada depende dos critérios de qualidade do Care.",
  },
] as const;

export function CareFaq() {
  return (
    <div className="divide-y divide-[#d2d2d7] border-y border-[#d2d2d7]">
      {FAQS.map((item) => (
        <details key={item.q} className="group py-5 sm:py-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[19px] font-semibold tracking-tight text-[#1d1d1f] transition-colors group-open:text-[#0071e3] sm:gap-6 sm:text-[22px] md:text-[28px]">
            {item.q}
            <span
              aria-hidden
              className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f5f5f7] text-[20px] font-light text-[#86868b] transition-transform duration-300 group-open:rotate-45 sm:size-8 sm:text-[22px]"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#6e6e73] md:text-[19px]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
