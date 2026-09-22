import Link from "next/link";

import { CareFaq } from "@/components/care/care-faq";
import { CaseRail } from "@/components/care/case-rail";
import { DentistRail } from "@/components/care/dentist-grid";
import { DeviceDossier } from "@/components/care/device-dossier";
import { HeroHeadline } from "@/components/care/hero-headline";
import { NeedSearch } from "@/components/care/need-search";
import { Reveal } from "@/components/care/reveal";
import { getListedCareCatalog, getListedCareRegions } from "@/lib/catalog/adapter";
import { citySlug } from "@/lib/seo/cities";
import { itemListJsonLd } from "@/lib/seo/jsonld";
import { GOOGLE_QUERIES } from "@/lib/seo/queries";
import { SITE } from "@/lib/site";

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

export default async function HomePage() {
  const catalog = await getListedCareCatalog();
  const network = catalog.listProfessionals({ intentIds: [] });
  const taubate = network.filter((item) => item.region.id === "taubate");
  const featured = taubate.length > 0 ? taubate : network;
  const featuredCity = featured[0]?.region.city;
  const regions = await getListedCareRegions();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd(network, "Dentistas do OdontoHub Care", SITE.domain)),
        }}
      />
      <section className="care-hero">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="care-orb -left-24 top-8 size-[220px] bg-[#0071e3]/14 sm:size-[320px]" />
          <div
            className="care-orb right-[-60px] top-24 size-[180px] bg-[#32ade6]/12 sm:size-[240px]"
            style={{ animationDelay: "-6s" }}
          />
        </div>
        <div className="care-align relative flex min-h-[calc(100dvh-3rem)] flex-col justify-between py-10 sm:py-14 md:py-16">
          <div className="care-hero-copy mx-auto w-full max-w-[40rem] text-center">
            <p className="care-enter care-eyebrow">OdontoHub Care</p>
            <div className="care-enter mt-4 sm:mt-5" style={{ animationDelay: "90ms" }}>
              <HeroHeadline />
            </div>
            <p
              className="care-enter care-subhead mx-auto mt-4 max-w-[28rem] text-[17px] sm:mt-6 sm:text-[19px] md:max-w-[32rem] md:text-[21px]"
              style={{ animationDelay: "160ms" }}
            >
              Diga o tratamento e a cidade. Mostramos dentistas da rede OdontoHub para o que você
              precisa.
            </p>
          </div>
          <div className="care-enter mx-auto mt-10 w-full max-w-[40rem] sm:mt-12" style={{ animationDelay: "240ms" }}>
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
              {featuredCity
                ? `Procurou dentista em ${featuredCity}? Estes são os profissionais da cidade. O tratamento e o lugar, juntos.`
                : "Informe sua cidade para encontrar profissionais conectados ao OdontoHub Care."}
            </p>
            <Link
              href={featuredCity ? `/dentista/${citySlug(featuredCity)}` : "/buscar"}
              className="group mt-6 inline-flex items-center text-[17px] text-[#0066cc] sm:mt-8"
            >
              {featuredCity ? `Ver dentistas em ${featuredCity}` : "Encontrar dentista"}{" "}
              <span className="care-arrow ml-1">›</span>
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
              {regions.map((region) => (
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
