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
        '웹프론트엔드 중심으로 배우는 자기 주도형 학습 과정',
        'CS지식, 자료구조, 알고리즘 학습',
        'HTML, CSS, JavaScript 학습을 통한 웹 기반 기술 습득',
        'React.js, TypeScript, Recoil 등 프론트엔드 개발 기술 습득',
      ],
    },
    {
      title: 'Modern JavaScript Deep Dive Study',
      date: '2024.09 ~ 2025.02',
      subTitle: '모던 자바스크립트 Deep Dive 책을 통해 자바스크립트 기본 개념 Study',
      description: [
        '자바스크립트의 기초 개념부터 동작 방식까지 깊게 공부하며 자바스크립트에 대한 깊이를 넓힘',
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
        '홈·취향·영화관 등 핵심 UI 및 CustomPainter 차트·애니메이션 구현',
        '기획 단계 기능 구현 가능성 검수 및 TMDB·백엔드 데이터 누적 구조 협의',
      ],
    },
    {
      title: 'Team Momo',
      date: '2024.11 ~ 2025.02',
      subTitle: '제로베이스에서 진행하는 프론트엔드 & 백엔드 협업 프로젝트',
      description: [
        '12월 데모 발표 이후 MVP 기능 개발을 완료까지 연장해서 팀 유지',
        'MVP 개발 완료 (밥친구 모집, 모임 채팅, 알림기능)',
        '첫 백엔드, 프론트엔드의 협업 프로세스 경험',
        'Tanstack Query와 같은 새로운 기술을 실전을 통해 경험',
      ],
    },
  ],
};
