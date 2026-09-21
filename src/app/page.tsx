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
    d: "Não é quem pagou para aparecer. É quem cuida bem — e continua cuidando.",
  },
  {
    n: "02",
    t: "Se não atender bem, sai",
    d: "Má prática ou muitas reclamações sérias tiram o profissional da lista.",
  },
  {
    n: "03",
    t: "Você encontra quem atende",
    d: "O que aparece aqui ainda está de pé. Quem saiu, some da busca.",
  },
] as const;

export default function HomePage() {
  const network = catalog.listProfessionals({ intentIds: [] });
  const taubate = network.filter((item) => item.region.id === "taubate");
  const featured = taubate.length > 0 ? taubate : network;

  return (
    <main>
      <section className="care-hero-wash relative overflow-hidden px-5 pb-24 pt-20 md:pb-36 md:pt-28">
        <div
          className="care-orb -left-24 top-8 size-[340px] bg-[#0071e3]/18"
          aria-hidden
        />
        <div
          className="care-orb right-[-80px] top-24 size-[280px] bg-[#32ade6]/20"
          style={{ animationDelay: "-6s" }}
          aria-hidden
        />
        <div
          className="care-orb bottom-0 left-1/3 size-[220px] bg-[#34c759]/12"
          style={{ animationDelay: "-11s" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[900px] text-center">
          <p className="care-enter care-eyebrow">OdontoHub Care</p>
          <div className="care-enter mt-5" style={{ animationDelay: "90ms" }}>
            <HeroHeadline />
          </div>
          <p
            className="care-enter care-subhead mx-auto mt-7 max-w-[500px] text-[19px] md:text-[24px]"
            style={{ animationDelay: "160ms" }}
          >
            Diga o tratamento e a cidade. Mostramos quem cuida disso — escolhidos com rigor, um a
            um.
          </p>
          <div className="care-enter mx-auto mt-12 max-w-[740px]" style={{ animationDelay: "240ms" }}>
            <NeedSearch />
          </div>
        </div>
      </section>

      <section id="tratamentos" className="care-band px-5 py-24 md:py-32">
        <div className="mx-auto max-w-[1080px]">
          <Reveal>
            <p className="care-eyebrow">Tratamentos</p>
            <h2 className="care-display mt-4 max-w-[12ch] text-[40px] md:text-[64px]">
              O que você precisa.
            </h2>
            <p className="care-subhead mt-5 max-w-[440px] text-[19px] md:text-[21px]">
              Um dentista para aquilo que te trouxe aqui. Não uma lista genérica.
            </p>
          </Reveal>
          <Reveal className="mt-14" delay={80}>
            <CaseRail />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1080px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="care-eyebrow">Na sua cidade</p>
            <h2 className="care-display mt-4 text-[40px] md:text-[64px]">Perto de você.</h2>
            <p className="care-subhead mt-5 max-w-[460px] text-[19px] md:text-[21px]">
              Procurou dentista em Taubaté? Estes são os profissionais da cidade. O tratamento e o
              lugar, juntos.
            </p>
            <Link
              href="/dentista/taubate"
              className="group mt-8 inline-flex items-center text-[17px] text-[#0066cc]"
            >
              Ver dentistas em Taubaté <span className="care-arrow ml-1">›</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <DeviceDossier dentists={featured} />
          </Reveal>
        </div>
      </section>

      <section className="care-band px-5 py-24 md:py-32">
        <div className="mx-auto max-w-[1080px]">
          <Reveal>
            <p className="care-eyebrow">Profissionais</p>
            <h2 className="care-display mt-4 text-[40px] md:text-[56px]">
              Dentistas para conhecer.
            </h2>
          </Reveal>
          <Reveal className="mt-12" delay={80}>
            <DentistRail dentists={network.slice(0, 8)} />
          </Reveal>
        </div>
      </section>

      <section id="qualidade" className="px-5 py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-[680px] text-center">
            <p className="care-eyebrow">Como escolhemos</p>
            <h2 className="care-display mt-4 text-[40px] md:text-[64px]">Escolhidos com rigor.</h2>
            <p className="care-subhead mx-auto mt-6 max-w-[500px] text-[19px] md:text-[24px]">
              Só entra quem passa. Se o atendimento falha, o dentista sai desta lista. Assim você
              não precisa adivinhar.
            </p>
          </div>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-[980px] gap-10 md:grid-cols-3 md:gap-8">
          {QUALITY.map((item, index) => (
            <Reveal key={item.n} delay={index * 90}>
              <p className="text-[13px] tabular-nums text-[#86868b]">{item.n}</p>
              <h3 className="mt-5 text-[24px] font-semibold tracking-tight text-[#1d1d1f] md:text-[28px]">
                {item.t}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[#86868b]">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="care-band px-5 py-24 md:py-32">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <p className="care-eyebrow">Comece por aqui</p>
            <h2 className="care-display mt-4 text-[40px] md:text-[56px]">
              Como você já pesquisa.
            </h2>
          </Reveal>
          <Reveal className="mt-12" delay={60}>
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

      <section className="px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1080px]">
          <Reveal>
            <h2 className="care-display text-[32px] md:text-[48px]">Cidades</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {REGIONS.map((region) => (
                <Link
                  key={region.id}
                  href={`/dentista/${citySlug(region.city)}`}
                  className="rounded-full bg-white px-4 py-2 text-[14px] text-[#1d1d1f] ring-1 ring-[#d2d2d7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eaf3fb] hover:ring-[#0071e3]/20"
                >
                  {region.city}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-8 md:pb-12">
        <Reveal>
          <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[36px] bg-white px-8 py-16 md:px-16">
            <p className="care-eyebrow">Você é dentista?</p>
            <h2 className="care-display mt-4 max-w-[16ch] text-[36px] md:text-[52px]">
              Pacientes te encontram quando você faz parte daqui.
            </h2>
            <p className="care-subhead mt-5 max-w-[480px] text-[18px] md:text-[21px]">
              Cuidar bem da clínica é o começo. Aparecer para quem pesquisa um dentista é o resto.
            </p>
            <Link href="/para-dentistas" className="care-btn mt-10">
              Sou dentista
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <h2 className="care-display mb-10 text-[36px] md:text-[52px]">Perguntas frequentes</h2>
            <CareFaq />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
