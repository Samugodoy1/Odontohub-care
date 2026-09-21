import Link from "next/link";

import { CareFaq } from "@/components/care/care-faq";
import { CareRings } from "@/components/care/care-mark";
import { CaseRail } from "@/components/care/case-rail";
import { DentistRail } from "@/components/care/dentist-grid";
import { DeviceDossier } from "@/components/care/device-dossier";
import { NeedSearch } from "@/components/care/need-search";
import { catalog } from "@/lib/catalog/query";
import { REGIONS } from "@/lib/catalog/regions";
import { citySlug } from "@/lib/seo/cities";
import { GOOGLE_QUERIES } from "@/lib/seo/queries";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const network = catalog.listProfessionals({ intentIds: [] });
  const taubate = network.filter((item) => item.region.id === "taubate");
  const featured = taubate.length > 0 ? taubate : network;

  return (
    <main>
      <section className="care-hero-wash relative overflow-hidden px-5 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="relative mx-auto max-w-[920px] text-center">
          <div className="care-enter mb-8 flex justify-center">
            <CareRings />
          </div>
          <p className="care-enter text-[19px] font-semibold tracking-tight text-white md:text-[21px]">
            OdontoHub Care
          </p>
          <h1
            className="care-enter care-display mx-auto mt-4 max-w-[14ch] text-[48px] text-white sm:text-[72px] md:text-[88px]"
            style={{ animationDelay: "80ms" }}
          >
            Os dentistas certos. Para o seu caso.
          </h1>
          <p
            className="care-enter care-subhead mx-auto mt-6 max-w-[560px] text-[19px] md:text-[24px]"
            style={{ animationDelay: "140ms" }}
          >
            Você pesquisa no Google. O Care mostra quem usa o OdontoHub — verificados, no seu
            caso, na sua cidade.
          </p>
          <div
            className="care-enter mx-auto mt-10 max-w-[720px]"
            style={{ animationDelay: "200ms" }}
          >
            <NeedSearch />
          </div>
        </div>
      </section>

      <section id="casos" className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="care-display max-w-[16ch] text-[36px] text-white md:text-[56px]">
            O dentista certo para o que você precisa.
          </h2>
          <p className="care-subhead mt-5 max-w-[520px] text-[19px] md:text-[21px]">
            Limpeza. Extração. Aparelho. Não uma lista genérica — um dossiê para o caso.
          </p>
          <div className="mt-12">
            <CaseRail />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1080px] items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-[15px] font-medium text-[#64d2ff]">Para você</p>
            <h2 className="care-display mt-3 text-[36px] text-white md:text-[56px]">
              Feito para o seu caso. Feito para a sua cidade.
            </h2>
            <p className="care-subhead mt-5 text-[19px] md:text-[21px]">
              “Dentista em Taubaté.” O Care abre o dossiê da cidade. “Dentista para extração.”
              Mostra quem opera isso — e só quem continua na rede.
            </p>
            <Link href="/dentista/taubate" className="mt-8 inline-block text-[17px] text-[#64d2ff]">
              Ver dentistas em Taubaté ›
            </Link>
          </div>
          <DeviceDossier dentists={featured} />
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="care-display text-[32px] text-white md:text-[44px]">Na rede agora</h2>
          <div className="mt-10">
            <DentistRail dentists={network.slice(0, 8)} />
          </div>
        </div>
      </section>

      <section id="qualidade" className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-[15px] font-medium text-[#30d158]">Qualidade</p>
          <h2 className="care-display mt-4 text-[36px] text-white md:text-[56px]">
            Verificado. Ou fora.
          </h2>
          <p className="care-subhead mx-auto mt-6 max-w-[540px] text-[19px] md:text-[24px]">
            O dentista que usa o OdontoHub tem o direito de aparecer no Care. Má qualidade ou
            muitas reclamações: desligado do sistema — e some daqui. O paciente não precisa
            adivinhar.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-[980px] gap-4 md:grid-cols-3">
          {[
            {
              t: "Usa o OdontoHub",
              d: "Agenda, prontuário, o consultório no sistema. Sem isso, não entra no dossiê.",
            },
            {
              t: "Qualidade cobrada",
              d: "Reclamações sérias e má prática não viram “avaliação baixa”. Viram desligamento.",
            },
            {
              t: "Paciente protegido",
              d: "O Care só mostra quem ainda pertence à rede. Quem saiu, desaparece da busca.",
            },
          ].map((item) => (
            <div key={item.t} className="rounded-[28px] bg-[#1d1d1f] px-7 py-8">
              <h3 className="text-[22px] font-semibold tracking-tight text-white">{item.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/50">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="care-display text-[36px] text-white md:text-[56px]">
            Você pesquisa. O Care aparece.
          </h2>
          <p className="care-subhead mx-auto mt-5 max-w-[500px] text-[19px]">
            As buscas de verdade. Não um funil de SaaS.
          </p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {GOOGLE_QUERIES.map((query) => (
              <li key={query}>
                <Link
                  href={`/buscar?q=${encodeURIComponent(query)}`}
                  className="block rounded-[22px] bg-[#1d1d1f] px-6 py-5 text-left text-[19px] font-medium tracking-tight text-white transition hover:bg-[#2a2a2c]"
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
          <h2 className="care-display text-[32px] text-white md:text-[44px]">Cidades</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {REGIONS.map((region) => (
              <Link
                key={region.id}
                href={`/dentista/${citySlug(region.city)}`}
                className="rounded-full bg-white/8 px-4 py-2 text-[14px] text-white/80 ring-1 ring-white/10 hover:bg-white/14"
              >
                {region.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 overflow-hidden rounded-[36px] bg-[#1d1d1f] px-8 py-14 md:grid-cols-2 md:px-14">
          <div>
            <p className="text-[15px] font-medium text-[#64d2ff]">Para dentistas</p>
            <h2 className="care-display mt-3 text-[32px] text-white md:text-[48px]">
              O sistema cuida da clínica. O Care encontra pacientes.
            </h2>
            <p className="care-subhead mt-5 text-[18px] md:text-[21px]">
              Quem já usa o OdontoHub ganha o direito de aparecer. Não é anúncio. É a rede
              trabalhando nos dois lados da cadeira.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/para-dentistas" className="care-btn">
                Quero aparecer no Care
              </Link>
              <a href={SITE.sistema} className="text-[17px] text-[#64d2ff]">
                Abrir o sistema ›
              </a>
            </div>
          </div>
          <p className="text-[28px] font-semibold leading-snug tracking-tight text-white/90 md:text-[36px]">
            Usar o OdontoHub é o ingresso. Qualidade é a permanência.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[820px]">
          <h2 className="care-display mb-10 text-[36px] text-white md:text-[48px]">
            Perguntas? Temos as respostas.
          </h2>
          <CareFaq />
        </div>
      </section>
    </main>
  );
}
