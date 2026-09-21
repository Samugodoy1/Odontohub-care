import Link from "next/link";

import { CareFaq } from "@/components/care/care-faq";
import { CaseRail } from "@/components/care/case-rail";
import { DentistRail } from "@/components/care/dentist-grid";
import { DeviceDossier } from "@/components/care/device-dossier";
import { NeedSearch } from "@/components/care/need-search";
import { catalog } from "@/lib/catalog/query";
import { REGIONS } from "@/lib/catalog/regions";
import { citySlug } from "@/lib/seo/cities";
import { GOOGLE_QUERIES } from "@/lib/seo/queries";

export default function HomePage() {
  const network = catalog.listProfessionals({ intentIds: [] });
  const taubate = network.filter((item) => item.region.id === "taubate");
  const featured = taubate.length > 0 ? taubate : network;

  return (
    <main>
      <section className="care-hero-wash relative overflow-hidden px-5 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="relative mx-auto max-w-[860px] text-center">
          <p className="care-enter text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
            OdontoHub Care
          </p>
          <h1
            className="care-enter care-display mx-auto mt-4 max-w-[12ch] text-[48px] sm:text-[72px] md:text-[84px]"
            style={{ animationDelay: "80ms" }}
          >
            Encontre o dentista certo.
          </h1>
          <p
            className="care-enter care-subhead mx-auto mt-6 max-w-[520px] text-[19px] md:text-[24px]"
            style={{ animationDelay: "140ms" }}
          >
            Diga o que você precisa e a sua cidade. Mostramos quem cuida disso — profissionais
            escolhidos com rigor, um a um.
          </p>
          <div className="care-enter mx-auto mt-10 max-w-[720px]" style={{ animationDelay: "200ms" }}>
            <NeedSearch />
          </div>
        </div>
      </section>

      <section id="tratamentos" className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="care-display max-w-[14ch] text-[36px] md:text-[52px]">
            O que você precisa.
          </h2>
          <p className="care-subhead mt-5 max-w-[480px] text-[19px] md:text-[21px]">
            Limpeza. Extração. Aparelho. Um dentista para aquilo que te trouxe aqui.
          </p>
          <div className="mt-12">
            <CaseRail />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1080px] items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-[15px] font-medium text-[#0071e3]">Na sua cidade</p>
            <h2 className="care-display mt-3 text-[36px] md:text-[52px]">Perto de você.</h2>
            <p className="care-subhead mt-5 text-[19px] md:text-[21px]">
              Procurou dentista em Taubaté? Estes são os profissionais da cidade. O mesmo vale
              para extração, limpeza, aparelho — o tratamento e o lugar, juntos.
            </p>
            <Link href="/dentista/taubate" className="mt-8 inline-block text-[17px] text-[#0066cc]">
              Ver dentistas em Taubaté ›
            </Link>
          </div>
          <DeviceDossier dentists={featured} />
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="care-display text-[32px] md:text-[44px]">Dentistas para conhecer.</h2>
          <div className="mt-10">
            <DentistRail dentists={network.slice(0, 8)} />
          </div>
        </div>
      </section>

      <section id="qualidade" className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-[15px] font-medium text-[#248a3d]">Como escolhemos</p>
          <h2 className="care-display mt-4 text-[36px] md:text-[52px]">Escolhidos com rigor.</h2>
          <p className="care-subhead mx-auto mt-6 max-w-[520px] text-[19px] md:text-[24px]">
            Só entra quem passa. Se o atendimento falha, ou se as reclamações se acumulam, o
            dentista sai desta lista. Assim você não precisa adivinhar.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-[980px] gap-4 md:grid-cols-3">
          {[
            {
              t: "Selecionados um a um",
              d: "Não é quem pagou para aparecer. É quem cuida bem — e continua cuidando.",
            },
            {
              t: "Se não atender bem, sai",
              d: "Má prática ou muitas reclamações sérias tiram o profissional da lista.",
            },
            {
              t: "Você encontra quem atende",
              d: "O que aparece aqui ainda está de pé. Quem saiu, some da busca.",
            },
          ].map((item) => (
            <div key={item.t} className="rounded-[28px] bg-white px-7 py-8 ring-1 ring-[#d2d2d7]/80">
              <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">{item.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#86868b]">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="care-display text-[36px] md:text-[52px]">Comece como você já pesquisa.</h2>
          <p className="care-subhead mx-auto mt-5 max-w-[460px] text-[19px]">
            No Google, ou aqui. O mesmo pedido, o dentista certo.
          </p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {GOOGLE_QUERIES.map((query) => (
              <li key={query}>
                <Link
                  href={`/buscar?q=${encodeURIComponent(query)}`}
                  className="block rounded-[22px] bg-white px-6 py-5 text-left text-[19px] font-medium tracking-tight text-[#1d1d1f] ring-1 ring-[#d2d2d7]/80 transition hover:bg-[#eaf3fb]"
                >
                  {query}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="care-display text-[32px] md:text-[44px]">Cidades</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {REGIONS.map((region) => (
              <Link
                key={region.id}
                href={`/dentista/${citySlug(region.city)}`}
                className="rounded-full bg-white px-4 py-2 text-[14px] text-[#1d1d1f] ring-1 ring-[#d2d2d7] hover:bg-[#eaf3fb]"
              >
                {region.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[36px] bg-white px-8 py-14 ring-1 ring-[#d2d2d7]/80 md:px-14">
          <p className="text-[15px] font-medium text-[#0071e3]">Você é dentista?</p>
          <h2 className="care-display mt-3 max-w-[18ch] text-[32px] md:text-[44px]">
            Pacientes te encontram quando você faz parte daqui.
          </h2>
          <p className="care-subhead mt-5 max-w-[520px] text-[18px] md:text-[21px]">
            Cuidar bem da clínica é o começo. Aparecer para quem pesquisa um dentista é o resto.
          </p>
          <Link href="/para-dentistas" className="care-btn mt-8">
            Sou dentista
          </Link>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[820px]">
          <h2 className="care-display mb-10 text-[36px] md:text-[48px]">Perguntas frequentes</h2>
          <CareFaq />
        </div>
      </section>
    </main>
  );
}
