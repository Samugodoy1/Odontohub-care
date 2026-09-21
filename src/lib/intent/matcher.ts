import { CARE_INTENTS } from "@/lib/intent/taxonomy";
import { contentTokens, normalizeText } from "@/lib/intent/normalize";
import type { CareIntent, IntentId } from "@/lib/intent/types";

export type MatchedIntent = {
  intent: CareIntent;
  score: number;
  confidence: number;
  matchedPhrases: string[];
};

export type IntentMatchResult = {
  query: string;
  normalized: string;
  primary: MatchedIntent | null;
  alternatives: MatchedIntent[];
  unknown: boolean;
};

const PHRASE_WEIGHT = 8;
const TOKEN_WEIGHT = 1.4;
const MIN_SCORE = 3.2;

const CHILD_TOKENS = new Set([
  "filho",
  "filha",
  "crianca",
  "criancas",
  "bebe",
  "nenem",
  "infantil",
  "leite",
  "odontopediatria",
  "odontopediatra",
]);

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function hasPhraseBoundary(haystack: string, phrase: string) {
  const padded = ` ${haystack} `;
  const needle = ` ${phrase} `;
  return padded.includes(needle);
}

function scoreIntent(normalizedQuery: string, queryTokens: string[], intent: CareIntent) {
  let phraseScore = 0;
  const matchedPhrases: string[] = [];
  const lexicon = new Set<string>();

  for (const rawPhrase of intent.phrases) {
    const phrase = normalizeText(rawPhrase);
    if (!phrase) continue;
    for (const token of contentTokens(phrase)) lexicon.add(token);

    if (normalizedQuery.includes(phrase) && hasPhraseBoundary(normalizedQuery, phrase)) {
      const lengthBonus = Math.min(phrase.split(" ").length, 4) * 2;
      phraseScore = Math.max(phraseScore, PHRASE_WEIGHT + lengthBonus);
      matchedPhrases.push(rawPhrase);
    }
  }

  const overlap = queryTokens.filter((token) => lexicon.has(token)).length;
  const tokenScore = overlap * TOKEN_WEIGHT;
  return { score: phraseScore + tokenScore, matchedPhrases: unique(matchedPhrases).slice(0, 4) };
}

const RELATED_INTENTS: Partial<Record<IntentId, IntentId[]>> = {
  cirurgia: ["urgencia", "endodontia"],
  endodontia: ["urgencia", "dentistica"],
  dentistica: ["urgencia", "estetica"],
  pediatrica: ["endodontia", "prevencao"],
  urgencia: ["endodontia", "cirurgia"],
  implante: ["protese"],
  protese: ["implante"],
  estetica: ["dentistica"],
};

export function matchIntent(query: string): IntentMatchResult {
  const normalized = normalizeText(query);
  const queryTokens = contentTokens(query);

  if (!normalized) {
    return {
      query,
      normalized,
      primary: null,
      alternatives: [],
      unknown: true,
    };
  }

  const mentionsChild = queryTokens.some((token) => CHILD_TOKENS.has(token));

  const ranked = CARE_INTENTS.map((intent) => {
    const { score, matchedPhrases } = scoreIntent(normalized, queryTokens, intent);
    const childBoost = mentionsChild && intent.id === "pediatrica" ? 14 : 0;
    return { intent, score: score + childBoost, matchedPhrases };
  })
    .filter((item) => item.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return {
      query,
      normalized,
      primary: null,
      alternatives: [],
      unknown: true,
    };
  }

  const top = ranked[0];
  const second = ranked[1];
  const confidenceBase = second ? top.score / (top.score + second.score) : 0.92;
  const confidence = Math.max(0.42, Math.min(0.98, Number(confidenceBase.toFixed(2))));

  const toMatched = (item: (typeof ranked)[number], conf: number): MatchedIntent => ({
    intent: item.intent,
    score: Number(item.score.toFixed(2)),
    confidence: conf,
    matchedPhrases: item.matchedPhrases,
  });

  const alternatives = ranked.slice(1, 3).map((item, index) =>
    toMatched(item, Number((confidence * (index === 0 ? 0.62 : 0.45)).toFixed(2))),
  );

  const relatedIds = RELATED_INTENTS[top.intent.id] ?? [];
  for (const relatedId of relatedIds) {
    if (alternatives.some((item) => item.intent.id === relatedId)) continue;
    const relatedIntent = CARE_INTENTS.find((intent) => intent.id === relatedId);
    if (!relatedIntent) continue;
    alternatives.push({
      intent: relatedIntent,
      score: 0,
      confidence: Number((confidence * 0.4).toFixed(2)),
      matchedPhrases: [],
    });
    if (alternatives.length >= 2) break;
  }

  return {
    query,
    normalized,
    primary: toMatched(top, confidence),
    alternatives: alternatives.slice(0, 2),
    unknown: false,
  };
}

export function intentIdsFromMatch(result: IntentMatchResult): IntentId[] {
  if (!result.primary) return [];
  return [result.primary.intent.id, ...result.alternatives.map((item) => item.intent.id)];
}
