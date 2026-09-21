import Link from "next/link";

import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-care-line bg-white">
      <div className="mx-auto grid max-w-[980px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-[21px] font-semibold tracking-tight text-care-ink">OdontoHub Care</p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-care-muted">
            A camada de descoberta do ecossistema. O paciente descreve o que sente. A clínica que já
            usa o Hub aparece.
          </p>
        </div>
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-care-muted">Família</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a className="text-care-ink hover:underline" href={SITE.hubWww}>
                OdontoHub
              </a>
            </li>
            <li>
              <a className="text-care-ink hover:underline" href={SITE.academy}>
                Academy
              </a>
            </li>
            <li>
              <Link className="text-care-ink hover:underline" href="/para-dentistas">
                Care para dentistas
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-care-muted">Paciente</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <Link className="text-care-ink hover:underline" href="/buscar">
                Buscar cuidado
              </Link>
            </li>
            <li>
              <a className="text-care-ink hover:underline" href={SITE.instagram}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-care-line">
        <p className="mx-auto max-w-[980px] px-5 py-6 text-[12px] text-care-muted">
          © {new Date().getFullYear()} OdontoHub. Care não é um marketplace. É a porta do paciente
          para a mesma clínica contínua.
        </p>
      </div>
    </footer>
  );
}
