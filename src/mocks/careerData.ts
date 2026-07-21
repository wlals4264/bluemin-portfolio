export type CareerItem = {
  company: string;
  role: string;
  date: string;
  summary: string;
  highlights: string[];
};

export const careerData: CareerItem[] = [
  {
    company: '슬립포레스트',
    role: 'Frontend Developer',
    date: '2025.08 ~',
    summary: '수면 케어 앱 꿀잠닥터의 웹/앱 FE · 운영 어드민 · Cursor 기반 개발 자동화',
    highlights: [
      '꿀잠닥터 V3 — Flutter 마이그레이션, 수면 측정/루틴 안정화 (메인 기여)',
      '꿀잠닥터 Admin — 퍼널·DAU·오류 로그 어드민 기획·구축',
      '꿀잠닥터 V2 — Next.js 리포트/기록 UX, Health 연동, 홈 세션 중복 갱신 제거',
      'Cursor AI 플로우 · Playwright E2E(~290 시나리오) · 업무일지/보고서 자동화',
    ],
  },
];
