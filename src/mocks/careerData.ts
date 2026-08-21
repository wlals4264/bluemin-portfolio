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
    date: '2025.08 ~ 재직중',
    summary: '수면 케어 앱 꿀잠닥터의 웹/앱 FE · 운영 어드민 · Cursor 기반 개발 자동화',
    highlights: [
      'Web — WebView↔Native race queue, Next.js·React.cache 홈 세션 1회화, 회원가입 마법사',
      'App — RN → Flutter, 걸음수 버킷·표시/저장 분리, HealthKit, 루틴 자동화',
      'Admin — Query 10도메인 표준화·refresh 공유, ECharts 퍼널·GA4·카카오 픽셀',
      'Automation — 2026.02 팀 Cursor 도입, Playwright E2E 19 spec·303 케이스, 업무일지·보고서 자동화',
    ],
  },
  {
    company: '은강음악학원',
    role: '파트강사',
    date: '2021.04 ~ 2024.08 (3년 5개월)',
    summary:
      '음악교육에 뜻을 두고 피아노·작곡 입시를 맡았으나, 같은 환경에서 성장 폭이 좁다고 판단해 프론트엔드로 전환했습니다.',
    highlights: [
      '담임제 피아노 수업과 고등부 작곡 입시 강의',
      '연주회·콩쿨반 등 특강·행사 기획 및 운영',
      '학부모 응대·상담',
    ],
  },
];
