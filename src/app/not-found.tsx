import Link from "next/link";

export default function NotFound() {
  return (
    <main className="care-align flex flex-1 flex-col items-center justify-center py-20 text-center sm:py-24">
      <p className="text-[13px] text-[#86868b]">404</p>
      <h1 className="care-display mt-3 text-[40px] md:text-[56px]">Esta página não existe.</h1>
      <p className="care-subhead mt-4 max-w-md text-[18px]">
        Volte à busca e diga o que você precisa — ou a sua cidade.
      </p>
      <Link href="/" className="care-btn mt-8">
        Encontrar um dentista
      </Link>
    </main>
  );
}
