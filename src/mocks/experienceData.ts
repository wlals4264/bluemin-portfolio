export type ExperienceItemData = {
  title: string;
  date: string;
  subTitle: string;
  description: string[];
  linkUrl?: string;
  linkLabel?: string;
};

export const experienceData: {
  education: ExperienceItemData[];
  team: ExperienceItemData[];
} = {
  education: [
    {
      title: 'Zerobase Front-end School',
      date: '2024.03 ~ 2025.01.25',
      subTitle: '제로베이스에서 진행하는 프론트엔드 개발자 양성 교육 과정 수료',
      description: [
        'HTML·CSS·JavaScript로 반응형 UI·DOM 인터랙션 기반 웹 페이지 구현',
        '자료구조·알고리즘·CS 기초를 문제 풀이로 학습해 FE 구현 판단 근거 강화',
        'React·TypeScript·Recoil로 SPA 상태 관리·컴포넌트 구조를 프로젝트에 적용',
        'HTML/CSS/JS → React·TypeScript까지 웹 FE 스택을 프로젝트 단위로 학습·적용',
      ],
    },
    {
      title: 'Modern JavaScript Deep Dive Study',
      date: '2024.09 ~ 2025.02',
      subTitle: '모던 자바스크립트 Deep Dive 책을 통해 자바스크립트 기본 개념 Study',
      description: [
        '《모던 자바스크립트 Deep Dive》 기반 실행 컨텍스트·프로토타입·비동기를 정리하고 Velog 시리즈로 학습 기록 공개',
      ],
      linkUrl:
        'https://velog.io/@wlals4264/series/%EB%94%A5%EB%8B%A4%EC%9D%B4%EB%B8%8C-%EC%8A%A4%ED%84%B0%EB%94%94',
      linkLabel: '딥다이브 스터디 시리즈 보기',
    },
  ],
  team: [
    {
      title: 'Team OOOTTT',
      date: '2026.01 ~',
      subTitle: 'OTT 구독 가치 기록·취향 시각화 Flutter 앱',
      description: [
        'Flutter·CustomPainter로 홈·취향·영화관 핵심 UI·차트·애니메이션 구현',
        '기획 스펙 구현 가능성을 검수하고 TMDB 클라이언트 검색 + 서버 시청기록 누적으로 데이터 책임 분리·협의',
      ],
    },
    {
      title: 'Team Momo',
      date: '2024.11 ~ 2025.02',
      subTitle: '제로베이스에서 진행하는 프론트엔드 & 백엔드 협업 프로젝트',
      description: [
        '데모 이후 React·Stomp 기반 채팅·알림 MVP를 완료할 때까지 스프린트 연장·출시 범위 확정',
        'React·TypeScript로 밥친구 모집·모임 채팅·알림 등 MVP 핵심 FE 구현',
        'Git Flow·CORS·배포 이슈를 백엔드와 함께 풀어 FE/BE 협업·배포 프로세스 정착',
        'TanStack Query로 서버 상태 캐싱·로딩/성공 UI를 연동해 회원·채팅 비동기 UX 개선',
      ],
    },
  ],
};
