export type KeywordStat = {
  id: string;
  label: string;
  percent: number;
  color: string;
};

export type KeywordStatsResponse = {
  keywords: KeywordStat[];
  updatedAt: string;
  source: 'github+weights' | 'fallback';
};
