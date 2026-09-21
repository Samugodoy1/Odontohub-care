import Link from "next/link";

import { SITE } from "@/lib/site";
import { CARE_CASES } from "@/lib/seo/cases";
import { REGIONS } from "@/lib/catalog/regions";
import { citySlug } from "@/lib/seo/cities";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-[980px] gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-[19px] font-semibold tracking-tight text-white">OdontoHub Care</p>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/50">
            O dossiê de dentistas que usam o OdontoHub. Qualidade cobrada. Má prática, fora da
            rede — e fora do Care.
          </p>
        </div>
        <div>
          <p className="text-[12px] text-white/40">Casos</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            {CARE_CASES.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <Link className="text-white/80 hover:underline" href={`/para/${item.slug}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] text-white/40">Cidades</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            {REGIONS.slice(0, 6).map((region) => (
              <li key={region.id}>
                <Link
                  className="text-white/80 hover:underline"
                  href={`/dentista/${citySlug(region.city)}`}
                >
                  Dentista em {region.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] text-white/40">Família</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            <li>
              <a className="text-white/80 hover:underline" href={SITE.hubWww}>
                OdontoHub
              </a>
            </li>
            <li>
              <a className="text-white/80 hover:underline" href={SITE.sistema}>
                Sistema da clínica
              </a>
            </li>
            <li>
              <Link className="text-white/80 hover:underline" href="/para-dentistas">
                Aparecer no Care
              </Link>
            </li>
            <li>
              <a className="text-white/80 hover:underline" href={SITE.instagram}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[980px] px-5 py-6 text-[12px] text-white/35">
          © {new Date().getFullYear()} OdontoHub. Care não é um ranking pago. É o direito de
          aparecer — reservado a quem usa o sistema e sustenta a qualidade.
        </p>
      </div>
    </footer>
  );
}
