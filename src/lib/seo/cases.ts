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
};

export const CARE_CASES: readonly CareCase[] = [
  {
    slug: "limpeza",
    intentId: "prevencao",
    googleQuery: "dentista para limpeza",
    shortLabel: "Limpeza",
    headline: "Limpeza.",
    title: "Dentista para limpeza",
    lede: "Revisão, profilaxia, o check-up que você pesquisa no Google. Dentistas da rede OdontoHub, verificados.",
    tile: "from-[#1c3a5a] via-[#2f6f8f] to-[#7ec8d4]",
  },
  {
    slug: "extracao",
    intentId: "cirurgia",
    googleQuery: "dentista para extração",
    shortLabel: "Extração",
    headline: "Extração.",
    title: "Dentista para extração",
    lede: "Siso, dente incluso, extração simples. Quem opera isso no OdontoHub — e só permanece se a qualidade aguenta.",
    tile: "from-[#3a1848] via-[#7a2e6e] to-[#e07a9a]",
  },
  {
    slug: "siso",
    intentId: "cirurgia",
    googleQuery: "dentista para siso",
    shortLabel: "Siso",
    headline: "Siso.",
    title: "Dentista para siso",
    lede: "Incluso, inflamado, para extrair. Cirurgiões da rede, com o pós-operatório no mesmo sistema da clínica.",
    tile: "from-[#1a2a14] via-[#3d6b2a] to-[#b7d36a]",
  },
  {
    slug: "aparelho",
    intentId: "ortodontia",
    googleQuery: "dentista para aparelho",
    shortLabel: "Aparelho",
    headline: "Aparelho.",
    title: "Dentista para aparelho",
    lede: "Fixo, alinhador, a correção que você quer começar. Ortodontistas que já rodam a clínica no OdontoHub.",
    tile: "from-[#2a1840] via-[#5b3dcc] to-[#c4b5fd]",
  },
  {
    slug: "implante",
    intentId: "implante",
    googleQuery: "dentista para implante",
    shortLabel: "Implante",
    headline: "Implante.",
    title: "Dentista para implante",
    lede: "Reposição com planejamento, não com anúncio. Implantodontistas verificados da rede.",
    tile: "from-[#1c2430] via-[#3d5a80] to-[#9bb7d4]",
  },
  {
    slug: "canal",
    intentId: "endodontia",
    googleQuery: "dentista para canal",
    shortLabel: "Canal",
    headline: "Canal.",
    title: "Dentista para canal",
    lede: "Dor latejante, abscesso, tratamento de canal. Endodontia da rede OdontoHub.",
    tile: "from-[#4a1c1c] via-[#c2410c] to-[#fbbf24]",
  },
  {
    slug: "clareamento",
    intentId: "estetica",
    googleQuery: "dentista para clareamento",
    shortLabel: "Clareamento",
    headline: "Clareamento.",
    title: "Dentista para clareamento",
    lede: "Cor, faceta, o sorriso que você quer ver. Estética com o mesmo rigor clínico do restante da rede.",
    tile: "from-[#0f2a2a] via-[#0d9488] to-[#99f6e4]",
  },
  {
    slug: "crianca",
    intentId: "pediatrica",
    googleQuery: "dentista para criança",
    shortLabel: "Criança",
    headline: "Criança.",
    title: "Dentista para criança",
    lede: "Primeira consulta, dente de leite, medo. Odontopediatras da rede, com ficha no OdontoHub.",
    tile: "from-[#1e3a5f] via-[#2563eb] to-[#93c5fd]",
  },
  {
    slug: "urgencia",
    intentId: "urgencia",
    googleQuery: "dentista para urgência",
    shortLabel: "Urgência",
    headline: "Urgência.",
    title: "Dentista para urgência",
    lede: "Dor agora, trauma, o dente que não espera. Clínicas da rede com janela real de atendimento.",
    tile: "from-[#3f1010] via-[#b91c1c] to-[#fb7185]",
  },
  {
    slug: "gengiva",
    intentId: "periodontia",
    googleQuery: "dentista para gengiva",
    shortLabel: "Gengiva",
    headline: "Gengiva.",
    title: "Dentista para gengiva",
    lede: "Sangramento, tártaro, periodontite. Quem trata a base do dente — e responde por isso.",
    tile: "from-[#14532d] via-[#16a34a] to-[#86efac]",
  },
] as const;

export const CASE_BY_SLUG = Object.fromEntries(CARE_CASES.map((item) => [item.slug, item])) as Record<
  string,
  CareCase
>;

export function getCase(slug: string): CareCase | undefined {
  return CASE_BY_SLUG[slug];
}
