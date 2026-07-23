import {
  GITHUB_BLEND,
  KEYWORD_COLORS,
  LANGUAGE_TO_KEYWORDS,
  TOP_KEYWORD_LIMIT,
  WEIGHTS_BLEND,
} from '@/lib/keywordMap';
import { KEYWORD_LABELS, companyKeywordWeights } from '@/mocks/keywordWeights';
import type { KeywordStat, KeywordStatsResponse } from '@/types/keywordStats';

function normalize(map: Record<string, number>): Record<string, number> {
  const total = Object.values(map).reduce((sum, v) => sum + v, 0);
  if (total <= 0) return {};
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, v / total]));
}

/** GitHub language bytes → keyword relative scores */
export function languageBytesToKeywordScores(
  languageBytes: Record<string, number>,
): Record<string, number> {
  const scores: Record<string, number> = {};

  for (const [lang, bytes] of Object.entries(languageBytes)) {
    const shares = LANGUAGE_TO_KEYWORDS[lang];
    if (!shares) {
      scores.other = (scores.other ?? 0) + bytes;
      continue;
    }
    for (const share of shares) {
      scores[share.id] = (scores[share.id] ?? 0) + bytes * share.weight;
    }
  }

  return scores;
}

export function blendKeywordScores(
  githubScores: Record<string, number>,
  weightScores: Record<string, number> = companyKeywordWeights,
): Record<string, number> {
  const g = normalize(githubScores);
  const w = normalize(weightScores);
  const ids = new Set([...Object.keys(g), ...Object.keys(w)]);
  const blended: Record<string, number> = {};

  for (const id of ids) {
    blended[id] = (g[id] ?? 0) * GITHUB_BLEND + (w[id] ?? 0) * WEIGHTS_BLEND;
  }

  return blended;
}

export function scoresToKeywordStats(
  scores: Record<string, number>,
  source: KeywordStatsResponse['source'],
): KeywordStatsResponse {
  const normalized = normalize(scores);
  const keywords: KeywordStat[] = Object.entries(normalized)
    .map(([id, ratio]) => ({
      id,
      label: KEYWORD_LABELS[id] ?? id,
      percent: Math.round(ratio * 1000) / 10,
      color: KEYWORD_COLORS[id] ?? KEYWORD_COLORS.other,
    }))
    .filter((k) => k.percent > 0)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, TOP_KEYWORD_LIMIT);

  // Re-normalize top N so percents sum ~100
  const sum = keywords.reduce((s, k) => s + k.percent, 0);
  if (sum > 0 && Math.abs(sum - 100) > 0.5) {
    for (const k of keywords) {
      k.percent = Math.round((k.percent / sum) * 1000) / 10;
    }
  }

  return {
    keywords,
    updatedAt: new Date().toISOString(),
    source,
  };
}

export function buildKeywordStatsFromLanguages(
  languageBytes: Record<string, number>,
): KeywordStatsResponse {
  const githubScores = languageBytesToKeywordScores(languageBytes);
  const blended = blendKeywordScores(githubScores);
  return scoresToKeywordStats(blended, 'github+weights');
}
