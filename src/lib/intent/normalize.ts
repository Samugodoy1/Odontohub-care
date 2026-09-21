const ACCENTS = /\p{Diacritic}/gu;

export function stripAccents(value: string): string {
  return value.normalize("NFD").replace(ACCENTS, "");
}

export function normalizeText(value: string): string {
  return stripAccents(value)
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(value: string): string[] {
  const normalized = normalizeText(value);
  if (!normalized) return [];
  return normalized.split(" ").filter((token) => token.length > 0);
}

const STOPWORDS = new Set([
  "o",
  "a",
  "os",
  "as",
  "um",
  "uma",
  "uns",
  "umas",
  "de",
  "da",
  "do",
  "das",
  "dos",
  "em",
  "no",
  "na",
  "nas",
  "nos",
  "para",
  "pra",
  "pro",
  "com",
  "por",
  "e",
  "ou",
  "que",
  "meu",
  "minha",
  "meus",
  "minhas",
  "eu",
  "estou",
  "to",
  "ta",
  "estah",
  "esta",
  "preciso",
  "queria",
  "quero",
  "gostaria",
  "tem",
  "tenho",
  "foi",
  "ta",
  "tá",
]);

export function contentTokens(value: string): string[] {
  return tokenize(value).filter((token) => !STOPWORDS.has(token) && token.length > 1);
}
