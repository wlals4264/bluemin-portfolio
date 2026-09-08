import type { ProjectHighlightId } from '@/mocks/highlightsData';

export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectScreenshots = {
  /** public/ 기준 경로 (예: /images/portfolio/kkuljam) */
  basePath: string;
  /** 확장자 포함 파일명 목록 (예: ['screen-1.jpg', ..., 'demo.gif']) */
  files: string[];
  alt: string;
  /** 세로 폰 스크린샷(기본) 대신 가로형 웹 화면일 때 */
  orientation?: 'portrait' | 'landscape';
};

export type ProjectBlogPost = {
  title: string;
  excerpt: string;
  date: string;
  url: string;
};

export interface ProjectCardData {
  title: string;
  date: string;
  projectType: string;
  projectTitle: string;
  projectFeatures: string[];
  projectUrl?: string;
  projectLinks?: ProjectLink[];
  projectSkills: string[];
  background?: string[];
  meaning?: string[];
  projectVideoLink?: string;
  mainFeatures?: string;
  notionUrl?: string;
  githubUrl?: string;
  velogUrl?: string;
  troubleShootingNotionUrl?: string;
  /** Highlights에 연결되는 제품 id (회사 카드만) */
  highlightProjectId?: ProjectHighlightId;
  /** README 모달에 보여줄 실제 앱 스크린샷 */
  screenshots?: ProjectScreenshots;
  /** README 모달에 보여줄 기술 블로그 카드 */
  blogPost?: ProjectBlogPost;
}

/** 프로젝트 타입 라벨 (카드·모달·필터 공통) */
export const projectTypeLabel = (projectType: string) => {
  if (projectType === 'company') return '회사 프로젝트';
  if (projectType === 'team') return '팀 프로젝트';
  return '개인 프로젝트';
};

export const getProjectLinks = (project: Pick<ProjectCardData, 'projectUrl' | 'projectLinks'>): ProjectLink[] => {
  if (project.projectLinks && project.projectLinks.length > 0) {
    return project.projectLinks;
  }
  if (project.projectUrl) {
    return [{ label: project.projectUrl.replace(/^https?:\/\//, ''), url: project.projectUrl }];
  }
  return [];
};

/** 회사 프로젝트 — 포트폴리오 PDF 기준으로 V2/V3/Admin/AI·E2E를 하나로 통합 */
const kkuljam: ProjectCardData = {
  title: '꿀잠닥터',
  date: '2025.08 ~ 재직중',
  projectType: 'company',
  highlightProjectId: 'kkuljam',
  projectTitle:
    '슬립포레스트 · 수면 헬스케어 B2C 앱 신규 개발·고도화\n· Web(Next.js) / Hybrid App(Flutter) / Admin(React)',
  projectFeatures: [],
  projectLinks: [
    { label: 'App Store', url: 'https://apps.apple.com/kr/app/꿀잠닥터/id6748598105' },
    {
      label: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=net.sleepforest.kkuljamdoctor',
    },
  ],
  projectSkills: [
    'Next.js',
    'TypeScript',
    'Flutter',
    'Dart',
    'React',
    'Figma',
    'Storybook',
    'Vitest',
    'Playwright',
    'Sentry',
    'TanStack Query',
    'ECharts',
    'GA4',
    'Kakao Pixel',
    'Jira',
    'Cursor',
  ],
  screenshots: {
    basePath: '/images/portfolio/kkuljam',
    files: ['screen-1.jpg', 'screen-2.jpg', 'screen-3.jpg', 'screen-4.jpg', 'screen-5.jpg'],
    alt: '꿀잠닥터 앱 화면',
  },
};

const ooottt: ProjectCardData = {
  title: 'OOOTTT',
  date: '2026.03 ~ 2026.08',
  projectType: 'team',
  projectTitle: '5인 팀 · 취향 기반 OTT 추천 및 구독 요금제 관리 플랫폼 · App Store / Google Play 배포',
  projectFeatures: [
    'iOS/Android 빌드 관리와 App Store·Google Play 심사 대응을 직접 진행해 실 사용자가 다운로드할 수 있는 앱으로 배포',
    '라이브러리로 표현하기 어려운 인터랙션을 위해 CustomPainter 기반 커스텀 차트·애니메이션을 직접 설계',
    '검색 데이터는 클라이언트 조회, 시청 기록·통계는 서버 누적으로 분리하는 데이터 책임 범위를 팀과 협의해 설계',
  ],
  projectLinks: [
    { label: 'App Store', url: 'https://apps.apple.com/kr/app/ooottt/id6774486889' },
    {
      label: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.ooottt.app',
    },
  ],
  projectSkills: ['Flutter', 'Dart', 'BLoC', 'CustomPainter', 'TMDB', 'Dio'],
  githubUrl: 'https://github.com/OOOTTT-dev/app',
  screenshots: {
    basePath: '/images/portfolio/ooottt',
    files: ['screen-1.png', 'screen-2.png', 'screen-3.png', 'screen-4.png', 'screen-5.png'],
    alt: 'OOOTTT 앱 화면',
  },
};

const momo: ProjectCardData = {
  title: 'MOMO',
  date: '2024.12 ~ 2025.02',
  projectType: 'team',
  projectTitle: '5인 팀 · 밥친구 매칭 서비스',
  projectFeatures: [
    'React·TypeScript 기반으로 UI와 핵심 기능을 개발하고, TanStack Query로 서버 상태를 관리',
    'STOMP 기반 실시간 양방향 채팅을 구현하고, Recoil로 클라이언트 상태를, Tailwind CSS로 UI 스타일링을 구성',
  ],
  projectSkills: ['React', 'TypeScript', 'TanStack Query', 'Stomp', 'Recoil', 'Tailwind'],
  projectVideoLink: 'https://youtu.be/d-O7LfYi7po',
  githubUrl: 'https://github.com/Team-momo-front/momo-front',
};

const olaola: ProjectCardData = {
  title: 'OlaOla',
  date: '2024.11 ~ 2024.12 (약 1개월)',
  projectType: 'personal',
  projectTitle: '개인 프로젝트 · 클라이밍 커뮤니티 사진·영상 공유 플랫폼 · 백엔드 서버 미사용',
  projectFeatures: [
    '별도 백엔드 없이 브라우저 IndexedDB를 저장소로 활용해 미디어 업로드·게시글 CRUD를 클라이언트에서 직접 설계',
    '무한 스크롤·페이지네이션·이미지 캐러셀을 라이브러리 없이 순수 JavaScript로 직접 구현, Firebase Authentication으로 로그인 연동',
  ],
  projectUrl: 'https://ola-ola-nine.vercel.app',
  projectSkills: ['React', 'TypeScript', 'Recoil', 'Vite', 'Firebase Authentication', 'IndexedDB'],
  githubUrl: 'https://github.com/wlals4264/olaola',
  velogUrl:
    'https://velog.io/@wlals4264/개인-프로젝트-OlaOla-IndexedDB로-브라우저-환경에서-로컬-데이터베이스-구축하기',
  screenshots: {
    basePath: '/images/portfolio/olaola',
    files: ['screen-1.mp4', 'screen-2.mp4', 'screen-3.mp4'],
    alt: 'OlaOla 화면',
    orientation: 'landscape',
  },
  blogPost: {
    title: '[개인 프로젝트 - OlaOla] IndexedDB로 브라우저 환경에서 로컬 데이터베이스 구축하기',
    excerpt:
      '백엔드 구현보다 프론트엔드 역량 강화에 집중하기 위해, Firebase 같은 서버 환경 대신 IndexedDB로 브라우저에서 직접 로컬 데이터베이스를 구축한 과정을 정리했습니다.',
    date: '2024.12.18',
    url: 'https://velog.io/@wlals4264/개인-프로젝트-OlaOla-IndexedDB로-브라우저-환경에서-로컬-데이터베이스-구축하기',
  },
};

/** 포트폴리오 PDF 순서: 꿀잠닥터 → OOOTTT → MOMO → OlaOla */
export const projects: ProjectCardData[] = [kkuljam, ooottt, momo, olaola];
