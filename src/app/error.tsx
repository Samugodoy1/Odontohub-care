"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-[13px] text-care-muted">Erro</p>
      <h1 className="care-display mt-3 text-[40px] md:text-[56px]">Algo saiu do lugar.</h1>
      <p className="care-subhead mt-4 max-w-md text-[18px]">
        Recarregue esta página. Se continuar, a busca na página inicial continua funcionando.
      </p>
      <button type="button" onClick={reset} className="care-btn mt-8">
        Tentar de novo
      </button>
    </main>
  );
}
