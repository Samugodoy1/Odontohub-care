const FAQS = [
  {
    q: "O que é o Care?",
    a: "É a lista pública de dentistas da rede OdontoHub. Você pesquisa o tratamento e a cidade e vê clínicas que usam o sistema na prática.",
  },
  {
    q: "Como vocês escolhem os dentistas?",
    a: "Só entram contas ativas do OdontoHub, com clínica identificada. Alunos do Academy não aparecem aqui. A posição na lista não é comprada.",
  },
  {
    q: "A lista é atualizada?",
    a: "Sim. A permanência depende da continuidade do padrão de atendimento. O administrador pode retirar um profissional do Care sem bloquear o sistema da clínica.",
  },
  {
    q: "Preciso pagar para usar?",
    a: "Não. Procurar aqui é grátis. A consulta é com a clínica, como sempre foi.",
  },
  {
    q: "Como marco uma consulta?",
    a: "Abra o perfil do dentista e envie um pedido. A solicitação chega na inbox da clínica no OdontoHub, com seu nome e WhatsApp.",
  },
  {
    q: "Sou dentista. Posso aparecer?",
    a: "Sim, se a sua clínica usa o OdontoHub. Faça login no sistema, complete CRO e cidade do consultório e mantenha a publicação no Care.",
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
