import Link from "next/link";

import { CareFaq } from "@/components/care/care-faq";
import { CaseRail } from "@/components/care/case-rail";
import { DentistRail } from "@/components/care/dentist-grid";
import { DeviceDossier } from "@/components/care/device-dossier";
import { HeroHeadline } from "@/components/care/hero-headline";
import { NeedSearch } from "@/components/care/need-search";
import { Reveal } from "@/components/care/reveal";
import { catalog } from "@/lib/catalog/query";
import { REGIONS } from "@/lib/catalog/regions";
import { citySlug } from "@/lib/seo/cities";
import { GOOGLE_QUERIES } from "@/lib/seo/queries";

const QUALITY = [
  {
    n: "01",
    t: "Selecionados um a um",
    d: "A posição não é comprada. Cada profissional entra pelos critérios de qualidade do Care.",
  },
  {
    n: "02",
    t: "A qualidade é contínua",
    d: "Problemas sérios no atendimento podem retirar o profissional da lista.",
  },
  {
    n: "03",
    t: "A lista é atualizada",
    d: "Você vê os profissionais que continuam ativos no Care.",
  },
] as const;

export default function HomePage() {
  const network = catalog.listProfessionals({ intentIds: [] });
  const taubate = network.filter((item) => item.region.id === "taubate");
  const featured = taubate.length > 0 ? taubate : network;

  return (
    <main>
      <section className="flex min-h-[calc(100svh-3rem)] items-center bg-[#fbfbfd] py-12 sm:py-16 md:py-20">
        <div className="care-align w-full text-center">
          <p className="care-enter text-[17px] font-semibold tracking-[-0.022em] text-[#1d1d1f] sm:text-[21px]">
            OdontoHub Care
          </p>
          <div className="care-enter mt-4 sm:mt-5" style={{ animationDelay: "90ms" }}>
            <HeroHeadline />
          </div>
          <p
            className="care-enter care-subhead mx-auto mt-8 max-w-[22rem] text-[19px] sm:mt-10 sm:max-w-[28rem] sm:text-[21px] md:mt-12 md:text-[28px]"
            style={{ animationDelay: "160ms" }}
          >
            Diga o tratamento e a cidade.
          </p>
          <div
            className="care-enter mx-auto mt-12 max-w-[40rem] sm:mt-14 md:mt-16"
            style={{ animationDelay: "240ms" }}
          >
            <NeedSearch />
          </div>
        </div>
      </section>

      <section id="tratamentos" className="care-band py-14 sm:py-24 md:py-32">
        <div className="care-align">
          <Reveal>
            <p className="care-eyebrow">Tratamentos</p>
            <h2 className="care-display mt-3 max-w-[12ch] text-[32px] sm:mt-4 sm:text-[40px] md:text-[64px]">
              O que você precisa.
            </h2>
            <p className="care-subhead mt-4 max-w-[28rem] text-[17px] sm:mt-5 sm:text-[19px] md:text-[21px]">
              Encontre profissionais que atendem à sua necessidade — não apenas uma lista genérica.
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-10 sm:mt-14" delay={80}>
          <CaseRail />
        </Reveal>
      </section>

      <section className="py-14 sm:py-24 md:py-32">
        <div className="care-align grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="care-eyebrow">Na sua cidade</p>
            <h2 className="care-display mt-3 text-[32px] sm:mt-4 sm:text-[40px] md:text-[64px]">
              Perto de você.
            </h2>
            <p className="care-subhead mt-4 max-w-[28rem] text-[17px] sm:mt-5 sm:text-[19px] md:text-[21px]">
              Procurou dentista em Taubaté? Estes são os profissionais da cidade. O tratamento e o
              lugar, juntos.
            </p>
            <Link
              href="/dentista/taubate"
              className="group mt-6 inline-flex items-center text-[17px] text-[#0066cc] sm:mt-8"
            >
              Ver dentistas em Taubaté <span className="care-arrow ml-1">›</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <DeviceDossier dentists={featured} />
          </Reveal>
        </div>
      </section>

      <section className="care-band py-14 sm:py-24 md:py-32">
        <div className="care-align">
          <Reveal>
            <p className="care-eyebrow">Profissionais</p>
            <h2 className="care-display mt-3 text-[32px] sm:mt-4 sm:text-[40px] md:text-[56px]">
              Dentistas para conhecer.
            </h2>
          </Reveal>
        </div>
        <Reveal className="mt-10 sm:mt-12" delay={80}>
          <DentistRail dentists={network.slice(0, 8)} />
        </Reveal>
      </section>

      <section id="qualidade" className="py-16 sm:py-24 md:py-32">
        <div className="care-align">
          <Reveal>
            <p className="care-eyebrow">Como escolhemos</p>
            <h2 className="care-display mt-3 max-w-[12ch] text-[32px] sm:mt-4 sm:text-[40px] md:text-[64px]">
              Escolhidos com rigor.
            </h2>
            <p className="care-subhead mt-4 max-w-[32rem] text-[17px] sm:mt-6 sm:text-[19px] md:text-[24px]">
              A entrada e a permanência no Care seguem critérios de qualidade. Assim você não
              precisa escolher no escuro.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:mt-16 md:grid-cols-3 md:gap-8">
            {QUALITY.map((item, index) => (
              <Reveal key={item.n} delay={index * 90}>
                <p className="text-[13px] tabular-nums text-[#86868b]">{item.n}</p>
                <h3 className="mt-4 text-[22px] font-semibold tracking-tight text-[#1d1d1f] sm:mt-5 sm:text-[24px] md:text-[28px]">
                  {item.t}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-[#86868b]">{item.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="care-band py-14 sm:py-24 md:py-32">
        <div className="care-align">
          <Reveal>
            <p className="care-eyebrow">Comece por aqui</p>
            <h2 className="care-display mt-3 max-w-[14ch] text-[32px] sm:mt-4 sm:text-[40px] md:text-[56px]">
              Como você já pesquisa.
            </h2>
          </Reveal>
          <Reveal className="mt-8 sm:mt-12" delay={60}>
            <ul>
              {GOOGLE_QUERIES.map((query) => (
                <li key={query}>
                  <Link href={`/buscar?q=${encodeURIComponent(query)}`} className="care-query group">
                    {query}
                    <span className="care-arrow text-[#86868b] group-hover:text-[#0071e3]">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-20 md:py-28">
        <div className="care-align">
          <Reveal>
            <h2 className="care-display text-[32px] md:text-[48px]">Cidades</h2>
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
              {REGIONS.map((region) => (
                <Link
                  key={region.id}
                  href={`/dentista/${citySlug(region.city)}`}
                  className="rounded-full bg-white px-3.5 py-2 text-[14px] text-[#1d1d1f] ring-1 ring-[#d2d2d7] transition-all duration-300 hover:bg-[#eaf3fb] hover:ring-[#0071e3]/20"
                >
                  {region.city}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 sm:bg-transparent sm:py-8 md:py-12">
        <Reveal>
          <div className="care-align sm:py-4">
            <div className="sm:rounded-[36px] sm:bg-white sm:px-12 sm:py-16 md:px-16">
              <p className="care-eyebrow">Você é dentista?</p>
              <h2 className="care-display mt-3 max-w-[16ch] text-[32px] sm:mt-4 sm:text-[36px] md:text-[52px]">
                Pacientes encontram você quando sua clínica faz parte do Care.
              </h2>
              <p className="care-subhead mt-4 max-w-[30rem] text-[17px] sm:mt-5 sm:text-[18px] md:text-[21px]">
                Cuidar bem é o começo. O Care ajuda sua clínica a aparecer para quem procura um
                dentista.
              </p>
              <Link href="/para-dentistas" className="care-btn mt-8 w-full sm:mt-10 sm:w-auto">
                Sou dentista
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-14 sm:py-24 md:py-32">
        <div className="care-align">
          <Reveal>
            <h2 className="care-display mb-6 text-[28px] sm:mb-10 sm:text-[36px] md:text-[52px]">
              Perguntas frequentes
            </h2>
            <CareFaq />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
