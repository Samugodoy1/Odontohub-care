import type { IntentId } from "@/lib/intent/types";

export type CareCase = {
  slug: string;
  intentId: IntentId;
  googleQuery: string;
  shortLabel: string;
  headline: string;
  title: string;
  lede: string;
  tile: string;
  photo: string;
};

export const CARE_CASES: readonly CareCase[] = [
  {
    slug: "limpeza",
    intentId: "prevencao",
    googleQuery: "dentista para limpeza",
    shortLabel: "Limpeza",
    headline: "Limpeza.",
    title: "Dentista para limpeza",
    lede: "Revisão, profilaxia, o check-up que você anda adiando. Dentistas escolhidos para cuidar disso com calma.",
    tile: "from-[#e6f5f1] to-[#b7ddd4]",
    photo: "/care/tratamentos/tratamento-limpeza.jpg",
  },
  {
    slug: "extracao",
    intentId: "cirurgia",
    googleQuery: "dentista para extração",
    shortLabel: "Extração",
    headline: "Extração.",
    title: "Dentista para extração",
    lede: "Siso, dente que não tem mais jeito, extração simples. Quem faz isso todo dia — com cuidado no depois.",
    tile: "from-[#eaf1fb] to-[#c2d4ee]",
    photo: "/care/tratamentos/tratamento-extracao.jpg",
  },
  {
    slug: "siso",
    intentId: "cirurgia",
    googleQuery: "dentista para siso",
    shortLabel: "Siso",
    headline: "Siso.",
    title: "Dentista para siso",
    lede: "Incluso, inflamado, doendo. Cirurgiões para tirar o siso e te orientar no pós-operatório.",
    tile: "from-[#eef6e8] to-[#c6e0b6]",
    photo: "/care/tratamentos/tratamento-siso.jpg",
  },
  {
    slug: "aparelho",
    intentId: "ortodontia",
    googleQuery: "dentista para aparelho",
    shortLabel: "Aparelho",
    headline: "Aparelho.",
    title: "Dentista para aparelho",
    lede: "Fixo ou alinhador. Ortodontistas para começar o tratamento no ritmo certo — sem milagre em três meses.",
    tile: "from-[#f0eefb] to-[#d5d0f2]",
    photo: "/care/tratamentos/tratamento-aparelho.jpg",
  },
  {
    slug: "implante",
    intentId: "implante",
    googleQuery: "dentista para implante",
    shortLabel: "Implante",
    headline: "Implante.",
    title: "Dentista para implante",
    lede: "Falta um dente, ou mais. Quem planeja a reposição com calma, não com pressa de vender.",
    tile: "from-[#e8eef4] to-[#c7d5e4]",
    photo: "/care/tratamentos/tratamento-implante.jpg",
  },
  {
    slug: "canal",
    intentId: "endodontia",
    googleQuery: "dentista para canal",
    shortLabel: "Canal",
    headline: "Canal.",
    title: "Dentista para canal",
    lede: "Dor latejante, o dente que acorda à noite. Quem trata canal e alivia primeiro.",
    tile: "from-[#fbf0e8] to-[#f0cbb4]",
    photo: "/care/tratamentos/tratamento-canal.jpg",
  },
  {
    slug: "clareamento",
    intentId: "estetica",
    googleQuery: "dentista para clareamento",
    shortLabel: "Clareamento",
    headline: "Clareamento.",
    title: "Dentista para clareamento",
    lede: "Dente amarelo, manchado, o sorriso que você quer ver. Estética com o mesmo rigor do resto do cuidado.",
    tile: "from-[#e6f7f5] to-[#b8e5df]",
    photo: "/care/tratamentos/tratamento-clareamento.jpg",
  },
  {
    slug: "crianca",
    intentId: "pediatrica",
    googleQuery: "dentista para criança",
    shortLabel: "Criança",
    headline: "Criança.",
    title: "Dentista para criança",
    lede: "Primeira consulta, dente de leite, medo. Odontopediatras que recebem a criança antes do medo crescer.",
    tile: "from-[#e8f1fc] to-[#c4daf7]",
    photo: "/care/tratamentos/tratamento-crianca.jpg",
  },
  {
    slug: "urgencia",
    intentId: "urgencia",
    googleQuery: "dentista para urgência",
    shortLabel: "Urgência",
    headline: "Urgência.",
    title: "Dentista para urgência",
    lede: "Dor agora, um tombo, o dente que não espera. Quem consegue te ver quando é urgente.",
    tile: "from-[#fceeee] to-[#f3c9c9]",
    photo: "/care/tratamentos/tratamento-urgencia.jpg",
  },
  {
    slug: "gengiva",
    intentId: "periodontia",
    googleQuery: "dentista para gengiva",
    shortLabel: "Gengiva",
    headline: "Gengiva.",
    title: "Dentista para gengiva",
    lede: "Sangra na escova, recua, dói. Quem cuida da base do dente — para o resto fazer sentido.",
    tile: "from-[#eaf6ee] to-[#c4e6cf]",
    photo: "/care/tratamentos/tratamento-gengiva.jpg",
  },
] as const;

export const CASE_BY_SLUG = Object.fromEntries(CARE_CASES.map((item) => [item.slug, item])) as Record<
  string,
  CareCase
>;

export function getCase(slug: string): CareCase | undefined {
  return CASE_BY_SLUG[slug];
}
