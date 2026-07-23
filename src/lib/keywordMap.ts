/**
 * GitHub language → portfolio keyword 분배.
 * weight 합은 해당 언어 바이트를 키워드들에 나누는 비율.
 */
export type KeywordShare = { id: string; label: string; weight: number };

export const KEYWORD_COLORS: Record<string, string> = {
  typescript: '#007acc',
  javascript: '#f0db4f',
  react: '#61dafb',
  nextjs: '#000000',
  flutter: '#02569b',
  dart: '#0175c2',
  sass: '#cd6799',
  css: '#264de4',
  html: '#e34c26',
  reactnative: '#61dafb',
  python: '#3776ab',
  other: '#64748b',
};

/** Skills 라벨과 동일하게 밝은 배경은 검정 글자 */
export const KEYWORD_LABEL_ON_DARK: Record<string, boolean> = {
  javascript: true,
  react: true,
  reactnative: true,
};

/** GitHub linguist 언어명 → 키워드 분배 */
export const LANGUAGE_TO_KEYWORDS: Record<string, KeywordShare[]> = {
  TypeScript: [
    { id: 'typescript', label: 'TypeScript', weight: 0.45 },
    { id: 'nextjs', label: 'Next.js', weight: 0.3 },
    { id: 'react', label: 'React', weight: 0.25 },
  ],
  JavaScript: [
    { id: 'javascript', label: 'JavaScript', weight: 0.35 },
    { id: 'react', label: 'React', weight: 0.4 },
    { id: 'nextjs', label: 'Next.js', weight: 0.25 },
  ],
  Dart: [
    { id: 'flutter', label: 'Flutter', weight: 0.75 },
    { id: 'dart', label: 'Dart', weight: 0.25 },
  ],
  SCSS: [{ id: 'sass', label: 'Sass', weight: 1 }],
  Sass: [{ id: 'sass', label: 'Sass', weight: 1 }],
  CSS: [
    { id: 'css', label: 'CSS', weight: 0.7 },
    { id: 'sass', label: 'Sass', weight: 0.3 },
  ],
  HTML: [{ id: 'html', label: 'HTML', weight: 1 }],
  Python: [{ id: 'other', label: 'Other', weight: 1 }],
  Shell: [{ id: 'other', label: 'Other', weight: 1 }],
  Dockerfile: [{ id: 'other', label: 'Other', weight: 1 }],
};

export const GITHUB_USERNAME = 'wlals4264';

/** GitHub 비중 vs 회사/의도 보정 가중치 */
export const GITHUB_BLEND = 0.7;
export const WEIGHTS_BLEND = 0.3;

export const TOP_KEYWORD_LIMIT = 10;
