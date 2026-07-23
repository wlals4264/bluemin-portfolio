/**
 * 회사·최근 작업 스택 보정 (GitHub 공개 레포에 안 잡히는 비중).
 * 값은 상대 가중치 — 합이 100일 필요 없음. 정규화 후 블렌드됨.
 */
export const companyKeywordWeights: Record<string, number> = {
  flutter: 28,
  nextjs: 22,
  typescript: 18,
  react: 12,
  dart: 8,
  sass: 5,
  reactnative: 4,
  javascript: 3,
};

export const KEYWORD_LABELS: Record<string, string> = {
  flutter: 'Flutter',
  nextjs: 'Next.js',
  typescript: 'TypeScript',
  react: 'React',
  dart: 'Dart',
  sass: 'Sass',
  reactnative: 'React Native',
  javascript: 'JavaScript',
  css: 'CSS',
  html: 'HTML',
  other: 'Other',
};
