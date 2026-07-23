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
      'Web — Next.js 기반 홈 세션 중복 조회 제거, 회원가입 마법사, 화면별 엣지 케이스 검토·구현',
      'App — RN → Flutter 마이그레이션, 수면 측정·루틴 자동화 플로우 구축, HealthKit·스마트워치(iOS) 연동',
      'Admin — 퍼널·DAU·오류 로그 등 운영 어드민 기획·구축',
      'Automation — Cursor AI 개발 플로우, Playwright E2E, 업무일지·보고서 자동화',
    ],
  },
];
