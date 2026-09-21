import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-[13px] text-white/40">404</p>
      <h1 className="care-display mt-3 text-[40px] text-white md:text-[56px]">
        Esta página não existe.
      </h1>
      <p className="care-subhead mt-4 max-w-md text-[18px]">
        O dossiê continua na busca. Cidade ou caso — o Care monta o restante.
      </p>
      <Link href="/" className="care-btn mt-8">
        Voltar ao Care
      </Link>
    </main>
  );
}
