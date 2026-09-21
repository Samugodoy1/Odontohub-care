"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="care-align flex flex-1 flex-col items-center justify-center py-20 text-center sm:py-24">
      <p className="text-[13px] text-[#86868b]">Erro</p>
      <h1 className="care-display mt-3 text-[40px] md:text-[56px]">Algo deu errado.</h1>
      <p className="care-subhead mt-4 max-w-md text-[18px]">
        Recarregue a página. A busca na página inicial continua funcionando.
      </p>
      <button type="button" onClick={reset} className="care-btn mt-8">
        Tentar de novo
      </button>
    </main>
  );
}
