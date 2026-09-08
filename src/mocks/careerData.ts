export type CareerSection = {
  title: string;
  text: string;
};

export type CareerItem = {
  company: string;
  role: string;
  date: string;
  summary: string;
  /** Web/App/Admin 등 영역별 상세 문단 (있으면 highlights 대신 렌더링) */
  sections?: CareerSection[];
  highlights?: string[];
};

export const careerData: CareerItem[] = [
  {
    company: '슬립포레스트',
    role: 'Frontend Developer',
    date: '2025.08 ~ 재직중',
    summary: '수면 케어 앱 꿀잠닥터의 웹/앱 FE · 운영 어드민 · Cursor 기반 개발 자동화',
    sections: [
      {
        title: 'Web (Next.js)',
        text: 'Next.js 15 App Router 기반 WebView 서비스의 꿀잠닥터 주요 기능(수면 분석 리포트·일기 작성 및 공유하기·온보딩 등)을 기획 단계부터 참여해 개발했습니다. Figma 디자인을 AI로 퍼블리싱 자동화하고 Storybook·Vitest 기반 디자인 시스템·테스트 체계를 구축했으며, Playwright 기반 E2E 회귀 검증 체계(19개 spec·약 303개 케이스)도 함께 운영했습니다.',
      },
      {
        title: 'Hybrid App (RN → Flutter)',
        text: 'RN 유지 시의 성능·메모리 관리·3rd party 의존성 리스크를 검토해 Flutter 전환 전략 수립에 참여하고, 꿀잠닥터 핵심 Native 기능(WebView·소셜 로그인·수면 측정 SDK 연동·백그라운드 오디오 재생·HealthKit·권한 요청 등) 구현을 주도하였습니다. 운영 중인 React Native 앱 코드도 함께 유지보수하고 있습니다.',
      },
      {
        title: 'Admin (React)',
        text: '기존 임시로 구축되어 있던 문서화되지 않은 레거시 Admin을 재구축하며 폴더 구조·API 통신 규약을 새로 정의하고, AI를 활용해 UI 디자인까지 직접 적용했습니다. CMS·유저·쿠폰·오류 관리 화면과 GA Data API·ECharts 기반 통계 대시보드를 10개 Query 도메인 표준화 구조로 구축하고, Jira Sprint API를 연동해 팀 보고 체계를 자동화했습니다.',
      },
      {
        title: 'Automation',
        text: '2026.02 팀 전체 Cursor 도입을 계기로 PRD→Plan→구현 워크플로를 자동화하고, Playwright 기반 E2E(19개 spec·약 303개 케이스)로 회귀 검증 체계를 운영하며 업무일지·보고서 작성까지 자동화했습니다.',
      },
    ],
  },
  {
    company: '은강음악학원',
    role: '파트강사',
    date: '2021.04 ~ 2024.08 (3년 5개월)',
    summary:
      '음악교육에 뜻을 두고 피아노 교육과 작곡 입시를 맡았으나, 같은 환경에서 성장 폭이 좁다고 판단해 프론트엔드로 전환했습니다.',
    highlights: [
      '담임제 피아노 수업과 고등부 작곡 입시 강의',
      '연주회·콩쿨반 등 특강·행사 기획 및 운영',
      '학부모 응대·상담',
    ],
  },
];
