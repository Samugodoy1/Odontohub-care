import Link from "next/link";

import { SITE } from "@/lib/site";
import { CARE_CASES } from "@/lib/seo/cases";
import { REGIONS } from "@/lib/catalog/regions";
import { citySlug } from "@/lib/seo/cities";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#d2d2d7] bg-white">
      <div className="mx-auto grid max-w-[980px] gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-[19px] font-semibold tracking-tight text-[#1d1d1f]">OdontoHub Care</p>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[#86868b]">
            Dentistas escolhidos com rigor, para o seu caso e a sua cidade.
          </p>
        </div>
        <div>
          <p className="text-[12px] text-[#86868b]">Tratamentos</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            {CARE_CASES.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <Link className="text-[#1d1d1f] hover:underline" href={`/para/${item.slug}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] text-[#86868b]">Cidades</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            {REGIONS.slice(0, 6).map((region) => (
              <li key={region.id}>
                <Link
                  className="text-[#1d1d1f] hover:underline"
                  href={`/dentista/${citySlug(region.city)}`}
                >
                  Dentista em {region.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] text-[#86868b]">Mais</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            <li>
              <Link className="text-[#1d1d1f] hover:underline" href="/para-dentistas">
                Sou dentista
              </Link>
            </li>
            <li>
              <a className="text-[#1d1d1f] hover:underline" href={SITE.hubWww}>
                OdontoHub
              </a>
            </li>
            <li>
              <a className="text-[#1d1d1f] hover:underline" href={SITE.instagram}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#d2d2d7]">
        <p className="mx-auto max-w-[980px] px-5 py-6 text-[12px] text-[#86868b]">
          © {new Date().getFullYear()} OdontoHub Care. Encontre um dentista. Sem ranking pago, sem
          cupom.
        </p>
      </div>
    </footer>
  );
}
