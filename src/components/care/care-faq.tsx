const FAQS = [
  {
    q: "O que é o Care?",
    a: "É o lugar para encontrar um dentista — o certo para o que você precisa, na sua cidade. Não é uma lista comprada. São profissionais escolhidos com rigor.",
  },
  {
    q: "Como vocês escolhem os dentistas?",
    a: "Só entra quem já cuida bem da clínica e passa pelo critério de qualidade. Não se compra um lugar nesta lista.",
  },
  {
    q: "E se o dentista não atender bem?",
    a: "Ele sai. Má prática ou muitas reclamações sérias tiram o profissional da lista. Você não precisa ficar adivinhando.",
  },
  {
    q: "Preciso pagar para usar?",
    a: "Não. Procurar aqui é grátis. A consulta é com a clínica, como sempre foi.",
  },
  {
    q: "Como marco uma consulta?",
    a: "Abra o perfil do dentista e peça contato. A clínica fala com você para combinar o horário.",
  },
  {
    q: "Sou dentista. Posso aparecer?",
    a: "Sim — se você faz parte do Care e sustenta a qualidade. Comece pela página para dentistas.",
  },
] as const;

export function CareFaq() {
  return (
    <div className="divide-y divide-[#d2d2d7] border-y border-[#d2d2d7]">
      {FAQS.map((item) => (
        <details key={item.q} className="group py-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[22px] font-semibold tracking-tight text-[#1d1d1f] transition-colors group-open:text-[#0071e3] md:text-[28px]">
            {item.q}
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f5f5f7] text-[22px] font-light text-[#86868b] transition-transform duration-300 group-open:rotate-45"
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
