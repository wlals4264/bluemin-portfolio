import type { ProjectHighlightId } from '@/mocks/highlightsData';

export interface ProjectCardData {
  title: string;
  date: string;
  projectType: string;
  projectTitle: string;
  projectFeatures: string[];
  projectUrl?: string;
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
}

/** 프로젝트 타입 라벨 (카드·모달·필터 공통) */
export const projectTypeLabel = (projectType: string) => {
  if (projectType === 'company') return '회사 프로젝트';
  if (projectType === 'team') return '팀 프로젝트';
  return '개인 프로젝트';
};

const kkuljamV3: ProjectCardData = {
  title: '꿀잠닥터 V3',
  date: '2026.01 ~',
  projectType: 'company',
  highlightProjectId: 'kkuljam-v3',
  projectTitle: '슬립포레스트 — RN → Flutter 마이그레이션 · 수면 측정/루틴·온보딩 고도화',
  projectFeatures: [
    'RN → Flutter 앱 셸 재구축으로 알람·수면 측정·오디오 등 네이티브 경로 안정화',
    'IosUnifiedAudioSession으로 루틴 재생·수면 녹음·웹(유튜브) 세션 충돌을 ownership 단위로 정리',
    '소셜 약관 중복 제거·온보딩 간소화, AppsFlyer 딥링크·OG 공유·디자인 토큰·Sentry까지 운영 품질 보강',
  ],
  projectSkills: [
    'Flutter',
    'Dart',
    'BLoC',
    'Provider',
    'Next.js',
    'AppsFlyer',
    'Sentry',
    'Health',
  ],
  mainFeatures:
    'Flutter 마이그레이션 · 오디오 세션 · 취침 자동화 · 온보딩/딥링크/공유 · 홈 세션 안정화',
  background: [
    '제품 고도화로 알람·측정·백그라운드 오디오 등 네이티브 비중이 커지며 RN 셸의 일정·안정성 리스크가 커졌습니다.',
    'V2에서 불안정했던 홈 세션·서비스 중 이슈 응대 경험을 바탕으로, V3에서는 앱 셸과 취침 플로우를 한 번에 안정화하는 것이 목표였습니다.',
  ],
  meaning: [
    'Flutter 메인 기여자로 UI뿐 아니라 Asleep 측정, 오디오 세션, 알람, 권한·배포 이슈까지 담당했습니다.',
    '재생·녹음이 서로 세션을 덮지 않도록 playAndRecord를 앱에서만 구성하고, 웹 유튜브 등 외부 세션과는 handoff 경계를 뒀습니다. 녹음 중 타 세션 개입·권한 거부 스낵바는 Figma 문구와 맞춰 제품에 반영했습니다.',
    'SNS 약관 중복 노출을 앱·웹 동의 흐름으로 제거하고, 프리필·권한 순서·Android 14 부분 미디어 권한 오인 등 엣지를 Jira·디자인과 함께 정리했습니다.',
    'AppsFlyer OneLink 딥링크, 서버 기반 OG/공유 이미지, 웹과 동일한 Flutter 디자인 토큰, Flutter Sentry로 진입·공유·UI 일관·장애 감지를 보강했습니다.',
    '홈 layout/page 세션 중복 해석을 React cache로 1회화해 V2에서 불안정했던 홈 진입을 V3에서 정리했습니다.',
  ],
};

const kkuljamAdmin: ProjectCardData = {
  title: '꿀잠닥터 Admin',
  date: '2025.09 ~',
  projectType: 'company',
  highlightProjectId: 'kkuljam-admin',
  projectTitle: '슬립포레스트 — 운영·분석 어드민 · AARRR 퍼널 · GA4·카카오 픽셀',
  projectFeatures: [
    'React·Vite·ECharts로 퍼널·DAU·유저/오류 로그 어드민을 기획부터 구축',
    'GA4 이벤트·user_properties와 카카오 픽셀(페이지뷰·가입완료)로 제품·광고 전환 기준 통일',
    'AARRR 관점 가입→온보딩→활성 퍼널을 대시보드·가이드로 정량화',
  ],
  projectSkills: [
    'React',
    'TypeScript',
    'Vite',
    'TanStack Query',
    'ECharts',
    'GA4',
    'Kakao Pixel',
    'Tailwind',
  ],
  mainFeatures: '퍼널·DAU 어드민 + GA4·카카오 픽셀 + AARRR 분석 기반 — 기획부터 구축',
  background: [
    '가입·온보딩·활성을 숫자로 보지 못하면 운영·마케팅 의사결정이 느려지고, 데이터 확인이 개발에 묶여 있었습니다.',
    '제품 지표(GA4)와 광고 전환(카카오 픽셀)이 어긋나면 성과를 같은 언어로 말하기 어려웠습니다.',
  ],
  meaning: [
    '어드민 레포 주 작성자로 퍼널·DAU·로그·공지와 ECharts 대시보드를 구현했습니다.',
    'GA4에 성별·나이대·login_type·목표 수면/기상·키워드 등 user_properties와 app_open 등 행동을 정의하고, 카카오 픽셀 가입완료와 맞춰 광고↔서비스 퍼널을 정렬했습니다.',
    'AARRR(Acquisition·Activation·Retention 등)을 서비스 구간에 맞게 자르고, BigQuery·코호트 한계를 문서화해 이후 리텐션 확장 비용을 낮췄습니다.',
    '사용 가이드까지 작성해 비개발 직군이 직접 현황을 보게 했습니다.',
  ],
};

const kkuljamV2: ProjectCardData = {
  title: '꿀잠닥터 V2',
  date: '2025.08 ~',
  projectType: 'company',
  highlightProjectId: 'kkuljam-v2',
  projectTitle: '슬립포레스트 — 서비스 중 유지보수·이슈 응대 · UX 고도화',
  projectFeatures: [
    '서비스 중 웹/앱 버그픽스·이슈 응대와 낮잠 기록·리포트 UX 개선을 병행',
    'HealthKit/Health Connect로 워치 수면 데이터 기반 일기 자동 채움 UX 구현',
    '회원가입 마법사 플로우·카카오톡 플친 연동·Sentry로 온보딩·상담·장애 대응 강화',
  ],
  projectSkills: [
    'Next.js',
    'TypeScript',
    'Zustand',
    'TanStack Query',
    'React Native',
    'Expo',
    'HealthKit',
    'Sentry',
    'Kakao Channel',
  ],
  mainFeatures: '유지보수·버그픽스 + 기록/리포트 UX + Health 자동 일기 + 마법사 가입',
  background: [
    '입사 이후 이미 서비스 중인 V2(Next.js + Expo/RN)의 유지보수와 사용자 이슈 응대가 최우선이었습니다.',
    '매일 쓰는 기록·리포트·온보딩이 불편하거나 깨지면 바로 이탈로 이어지므로, 안정성과 사용성을 같이 올리는 것이 목표였습니다.',
  ],
  meaning: [
    '낮잠/리포트/온보딩 경로의 반복 버그를 우선 수정하며 서비스 중 제품의 이슈 응대를 담당했습니다.',
    '기록·수정 UI 단순화, 리포트 무한 스크롤·통계 그래프, 회원가입 마법사로 핵심 경로 마찰을 줄였습니다.',
    '워치 수면 데이터가 있으면 일기를 자동 채우고 스낵바로 안내하고, 없으면 수동 기입을 유지하는 UX를 구현했습니다.',
    '웹 카카오톡 채널(플친) 연동과 앱·웹 Sentry로 상담 진입·장애 조기 감지를 보강했습니다.',
    '홈 세션 중복 해석 문제는 이후 V3에서 cache로 안정화했으며, V2 시점의 문제 인식과 초기 정리가 그 출발점이었습니다.',
  ],
};

const cursorAiWorkflow: ProjectCardData = {
  title: 'AI · E2E 자동화',
  date: '2025.12 ~ (V3~)',
  projectType: 'company',
  highlightProjectId: 'ai-e2e',
  projectTitle: '슬립포레스트 — Cursor 워크플로 · Playwright E2E · Closeout 품질 게이트',
  projectFeatures: [
    'PRD→Plan→구현을 Cursor·MCP로 자동화하고, 프로덕트·디자인 시나리오를 검수해 Notion 테스트 시트를 개선',
    'Playwright ~290 시나리오와 e2e-scenario 스킬로 작성→통과 상태까지 연결',
    'MCP 교차 검증으로 누락 페이지를 발견해 출시 에픽에 이슈 자동 등록, Closeout으로 E2E·커밋·MR까지 묶음',
  ],
  projectSkills: ['Cursor', 'Playwright', 'MCP', 'Jira', 'Notion', 'Figma'],
  mainFeatures:
    'AI Native 품질 게이트 — MCP · E2E ~290 · 에픽 자동 등록 · Closeout(커밋·MR)',
  background: [
    'V3에서 화면이 늘수록 수동 회귀와 사람 기억에만 의존하는 완료 정의로는 품질을 지키기 어려웠습니다.',
    'AI로 구현만 빨라지면 검증·티켓화가 따라가지 못하는 문제를, 검증까지 닫히는 워크플로로 풀고자 했습니다.',
  ],
  meaning: [
    'Figma·Jira·Notion MCP로 디자인·이슈·문서를 한 환경에서 다루며 PRD→Plan→구현을 반복 가능하게 만들었습니다.',
    '프로덕트·디자이너 시나리오를 검수하고 Notion 시트를 개선한 뒤, 스킬이 시나리오 ID 기준으로 Playwright 코드와 상태 갱신까지 수행하게 했습니다.',
    'POM·API Mock·storageState 구조로 온보딩~HFF 등 ~290 시나리오를 쌓고 가이드를 팀에 남겼습니다.',
    'MCP로 스펙·화면 갭을 찾아 8월 출시 에픽에 이슈가 자동 등록되게 해, 누락을 출시 전에 드러냈습니다.',
    '기능 완료에 E2E를 포함하고 typecheck/lint/test→커밋→MR까지 Closeout으로 묶어 DoD를 습관화했습니다.',
  ],
};

const ooottt: ProjectCardData = {
  title: 'OOOTTT',
  date: '2026.01 ~',
  projectType: 'team',
  projectTitle: 'OTT 구독 가치를 기록·시각화하는 Flutter 앱',
  projectFeatures: [
    '홈·취향·영화관 등 핵심 화면 UI를 Flutter로 구현',
    '취향 도넛·월별 그래프 등을 CustomPainter로 직접 그려 차트·애니메이션 구현',
    '기획 단계에서 기능 구현 가능성을 개발자 관점으로 검수',
    'TMDB 의존도를 줄이기 위해 클라이언트 검색 API 호출 + 백엔드 데이터 누적 구조를 백엔드와 협의·반영',
  ],
  projectUrl: 'https://apps.apple.com/kr/app/ooottt/id6774486889',
  projectSkills: ['Flutter', 'Dart', 'BLoC', 'CustomPainter', 'TMDB', 'Dio'],
  mainFeatures:
    'Flutter UI·차트/모션 구현과 TMDB 검색·서버 누적 데이터 흐름에 대한 개발 관점 협의',
  githubUrl: 'https://github.com/OOOTTT-dev/app',
  background: [
    '매달 나가는 OTT 구독료를 “매몰 비용”이 아니라 기록·취향 데이터로 관리할 수 있게 돕는 서비스입니다.',
    'iOS App Store 배포 완료, Android는 심사 중. Flobby 종료 후 일부 팀원이 재결성한 팀 프로젝트로, 배포·전체 기획 오너는 아니며 Flutter 화면·차트와 데이터 흐름 협의에 집중했습니다.',
  ],
  meaning: [
    '취향 탭의 자주 보는 OTT 도넛, 월별 히스토리, 기록 그래프 등을 라이브러리 의존 없이 CustomPainter와 애니메이션으로 구현했습니다.',
    '홈·영화관 등 주요 화면 퍼블리싱과 모션을 맡으며 Flutter UI 구현 경험을 쌓았습니다.',
    '콘텐츠 메타데이터가 TMDB에 과도하게 묶이면 백엔드 부담과 제약이 커진다는 문제를 팀과 공유하고, 검색은 클라이언트에서 TMDB를 직접 호출하되 시청 기록·통계는 서버에 누적하는 방향으로 데이터 책임을 나눴습니다.',
    '기획 Q&A 과정에서 온보딩·검색 등 기능의 구현 가능 여부를 개발자로서 검수하며 스펙·데이터 요구사항을 맞추는 데도 참여했습니다.',
  ],
};

const momo: ProjectCardData = {
  title: 'momo',
  date: '2024.12 ~ 2025.02',
  projectType: 'team',
  projectTitle: '간편히 밥친구를 구할 수 있는 밥친구 구하기 사이트',
  projectFeatures: [
    '회원·마이페이지·채팅 등 핵심 기능 구현 (프론트 기능 개발 약 60% 기여)',
    'TanStack Query로 서버 상태 캐싱 및 로딩/성공 UI 피드백 연동',
    '디자인 시스템·공통 컴포넌트로 팀 협업 효율 향상',
    '백엔드와 API·OAuth·이미지 업로드 구조를 함께 점검하며 이슈 해결',
  ],
  projectSkills: ['React', 'TypeScript', 'Recoil', 'Tanstack Query', 'Stomp', 'Tailwind', 'DaisyUI', 'Vite'],
  projectVideoLink: 'https://youtu.be/gnk4T6RWXUs',
  background: [
    '혼밥이 싫은 사람들을 위해, 간편하게 밥친구를 구할 수 있는 서비스를 만들고자 했습니다.',
    '모임 개설·참여·승인·채팅 등 핵심 기능을 복잡한 절차 없이 쓸 수 있도록 UX를 우선해 개발했습니다.',
  ],
  meaning: [
    '처음으로 백엔드와 협업한 팀 프로젝트로, CORS·배포·Git Flow·직군 간 소통을 실전에서 배웠습니다.',
    '회원 기능, 역할별 마이페이지, 웹소켓 채팅 등을 담당하며 MVP·리팩토링 기간 동안 프론트 핵심 기능의 상당 부분을 구현했습니다.',
    'Recoil과 React Query로 클라이언트/서버 상태를 분리하고, isPending·isSuccess를 UI에 연결해 사용자 피드백을 명확히 했습니다.',
    '이미지 업로드·소셜 로그인 등 API 설계 이슈를 백엔드와 함께 풀어 가며 전체 시스템 관점을 넓힌 프로젝트입니다.',
  ],
  mainFeatures:
    '디자인 시스템과 TanStack Query 기반 상태 관리로 UI 일관성·서버 상태 UX를 개선. 회원·채팅 등 핵심 기능 중심 기여.',
  notionUrl: 'https://skitter-chord-6cc.notion.site/836b52c3253b4803974d1d6b42d99338?pvs=74',
  githubUrl: 'https://github.com/Team-momo-front/momo-front',
  troubleShootingNotionUrl:
    'https://platinum-literature-af9.notion.site/momo-Trouble-Shooting-21f9b3c1166f8092a39bc4cc2c3e44ea?pvs=73',
};

const olaola: ProjectCardData = {
  title: 'OlaOla',
  date: '2024.11.18 ~ 2024.12.12',
  projectType: 'personal',
  projectTitle: '클라이머들을 위한 영상 및 사진 기록 커뮤니티 플랫폼',
  projectFeatures: [
    'IndexedDB로 서버 없이 영상·이미지 업로드 및 게시글 CRUD 구현',
    '무한 스크롤, 페이지네이션, 캐러셀 등을 라이브러리 없이 구현',
    'Firebase Authentication으로 이메일·구글 로그인 구현',
    '카카오 지도 API를 커스터마이징해 클라이밍 암장 검색 UX 제공',
  ],
  projectUrl: 'https://ola-ola-nine.vercel.app/',
  projectSkills: [
    'React',
    'TypeScript',
    'Recoil',
    'Vite',
    'Styled Component',
    'Tailwind',
    'Firebase Authentication',
    'IndexedDB',
  ],
  mainFeatures: '커뮤니티 CRUD와 무한 스크롤 피드 — 개인이 기획부터 구현까지 완수한 첫 웹 서비스',
  background: [
    '클라이머가 기록과 암장 정보를 남기고 소통할 공간이 부족해, 클라이밍에 특화된 커뮤니티를 직접 기획·개발했습니다.',
  ],
  meaning: [
    '처음부터 끝까지 혼자 구현한 첫 웹사이트로, 피드·게시판·인증·지도 검색 등 기본기를 한 사이클 돌린 프로젝트입니다.',
    'IndexedDB로 클라이언트 사이드 저장 구조를 설계하며 CRUD와 Blob 처리에 대한 이해를 쌓았습니다.',
  ],
  notionUrl: 'https://platinum-literature-af9.notion.site/OlaOla-13b9b3c1166f816ab8c1ef869977bfce?pvs=74',
  githubUrl: 'https://github.com/wlals4264/olaola',
  troubleShootingNotionUrl:
    'https://platinum-literature-af9.notion.site/OlaOla-Trouble-Shooting-21f9b3c1166f80ec8ce5f0ecb613910e',
};

/** 이직용 우선순위: V3 → Admin → V2 → AI 자동화 → OOOTTT → momo → OlaOla */
export const projects: ProjectCardData[] = [
  kkuljamV3,
  kkuljamAdmin,
  kkuljamV2,
  cursorAiWorkflow,
  ooottt,
  momo,
  olaola,
];
