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
  projectTitle: '슬립포레스트 — RN → Flutter 마이그레이션 · 수면 측정/루틴 고도화',
  projectFeatures: [
    'Flutter 앱 메인 기여자로 RN → Flutter 재구축에 참여해 크로스플랫폼 UI·네이티브 연동을 담당',
    'Asleep 수면 측정 세션 종료/백그라운드 복구·환경 가이드를 다듬어 측정이 끊기거나 유실되는 실패를 줄임',
    '루틴·수면 측정 중 iOS 오디오 세션 정리로 재생/녹음 충돌·끊김을 완화',
    '알람 → 루틴 → 수면 음악 → 측정 → 일기 자동 작성 플로우와 걸음수 싱크/누락 보정을 구현',
    'V3부터 Cursor 기반 AI 개발 플로우·Playwright E2E 자동화를 도입·정착 (별도 카드 참고)',
  ],
  projectSkills: ['Flutter', 'Dart', 'BLoC', 'Provider', 'Dio', 'Firebase', 'Health'],
  mainFeatures:
    'Flutter 마이그레이션 + 수면 측정 안정화 (AI·E2E 자동화는 별도 카드)',
  background: [
    '제품 고도화를 위해 기존 React Native 앱을 Flutter로 이전하는 V3가 시작되었습니다.',
    '단순 화면 이식이 아니라, 수면 측정·루틴·알람처럼 실패 비용이 큰 네이티브 플로우를 안정화하는 것이 핵심이었습니다.',
  ],
  meaning: [
    'Flutter 레포에서 최다 커밋 기여자로 UI뿐 아니라 Asleep 측정, 오디오 세션, 알람, Health 연동까지 담당했습니다.',
    '측정 종료 누락·백그라운드 재진입·iOS 오디오 충돌처럼 사용자에게 바로 체감되는 장애를 커밋 단위로 잡고 수정했습니다.',
    '웹 FE(Next.js)와 병행하며 루틴 CTA/설문, 권한·스토어 심사 대응 등 웹·앱 경계를 넘나드는 이슈도 처리했습니다.',
  ],
};

const kkuljamAdmin: ProjectCardData = {
  title: '꿀잠닥터 Admin',
  date: '2025.09 ~',
  projectType: 'company',
  projectTitle: '슬립포레스트 — 운영·분석용 어드민 기획 및 구축',
  projectFeatures: [
    '어드민 기획부터 화면 구축까지 담당해 운영·마케팅이 데이터를 스스로 볼 수 있는 기반을 마련',
    '퍼널 전환 차트·DAU 리포트·증감률 시각화로 가입/활성 구간을 정량적으로 추적',
    '유저·오류·행동·콘텐츠 로그 조회와 필터/페이지네이션으로 장애·행동 분석 속도를 높임',
    '공지·팝업 CRUD·노출 스위치, 사용 가이드 작성으로 비개발 직군 운영을 지원',
  ],
  projectSkills: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'ECharts', 'Tailwind'],
  mainFeatures: '퍼널·DAU·오류 로그 중심의 운영 어드민 — 기획부터 구축까지 소유',
  background: [
    '앱 성장을 위해 가입·온보딩 등 핵심 퍼널을 숫자로 보고 빠르게 의사결정할 내부 도구가 필요했습니다.',
    '데이터 확인이 개발·분석에 묶여 있어, 비개발 직군이 직접 현황을 볼 수 있는 어드민이 요구되었습니다.',
  ],
  meaning: [
    '어드민 레포의 주 작성자로 퍼널·DAU·유저/오류 로그·공지 기능을 구현했습니다.',
    '“무엇을 보여줄지”와 “어떻게 조회할지”를 기획 단계부터 정의하며, FE가 제품·운영 입력값을 만드는 역할을 경험했습니다.',
    '사용 가이드까지 작성해 도구가 실제로 쓰이도록 전달 범위까지 챙겼습니다.',
  ],
};

const kkuljamV2: ProjectCardData = {
  title: '꿀잠닥터 V2',
  date: '2025.08 ~',
  projectType: 'company',
  projectTitle: '슬립포레스트 — 수면 케어 웹/앱 유지보수 및 기능 고도화',
  projectFeatures: [
    '낮잠·수면 기록 UX를 사용자 관점에서 단순화하고, 낮/밤 리포트·통계(무한 스크롤·그래프)로 과거 기록을 끊김 없이 탐색할 수 있게 함',
    '수면 통계 API 연동과 Chart 기반 시각화로 “내 수면이 어떤지”를 한눈에 이해하도록 개선',
    '온보딩·권한 요청 플로우를 정리해 첫 진입 장벽을 낮춤',
    'HealthKit/Health Connect로 걸음·수면(TIB/TOB/WASO) 데이터를 불러와 앱·웹이 같은 맥락을 쓰도록 연동',
    '홈 진입 시 auth() 세션 중복 해석을 React cache로 1회화해 불필요한 세션 갱신을 줄임',
  ],
  projectSkills: ['Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'React Native', 'Expo'],
  mainFeatures:
    '기록·리포트 UX 고도화 + Health 연동 + 홈 세션 중복 갱신 제거 (Next.js FE / RN 셸)',
  background: [
    '입사 이후 이미 서비스 중인 꿀잠닥터 V2(Next.js 웹 FE + Expo/RN 셸)의 유지보수·고도화를 담당했습니다.',
    '사용자가 매일 쓰는 기록·리포트·온보딩이 불편하면 이탈로 이어지므로, 사용성과 데이터 신뢰도를 같이 올리는 것이 목표였습니다.',
  ],
  meaning: [
    'Next.js FE에서 낮잠 기록·리포트 무한 스크롤·통계 그래프 등 핵심 사용 경로를 구현·개선했습니다.',
    'RN 셸에서는 HealthKit/Health Connect 수면·걸음 연동, 흔들기 오류 보고 등 네이티브 접점을 맡았습니다.',
    '홈 경로의 세션(auth) 중복 호출을 cache로 정리한 뒤, 이후 세션 동기화 레이어는 팀에서 확장·보완되었습니다. 포트폴리오에는 제가 커밋한 중복 제거 범위를 기준으로 적었습니다.',
  ],
};

const cursorAiWorkflow: ProjectCardData = {
  title: 'AI · E2E 자동화',
  date: '2025.12 ~ (V3~)',
  projectType: 'company',
  projectTitle: '슬립포레스트 — Cursor 기반 개발 플로우 · Playwright E2E 자동화',
  projectFeatures: [
    'Playwright E2E 도입·가이드 문서화 — POM·API Mock·storageState 구조로 온보딩/홈/MY/리포트/일기/챗/루틴/HFF 등 ~290개 시나리오 자동화',
    'Jira 티켓 + Notion Test Scenario ID → Playwright 작성 → Notion「작성중/통과」까지 이어지는 e2e-scenario 스킬로 AI가 E2E를 끝까지 수행',
    '「작업 끝」Closeout 플로우 구성: 영향도 검증 → DoD(typecheck/lint/unit) → E2E → 커밋 컨벤션 → Notion 업무일지 → Jira 상태 전환',
    'Cursor에 Figma·Jira·Notion MCP를 연동해 디자인·이슈·코드·문서를 한 환경에서 처리',
    'Jira 스프린트 → Notion 업무일지 자동 생성, AI 업무 활용 보고서 초안 자동 생성으로 기록 공수 절감',
    'PRD·Figma·코드를 교차 검수해 스펙 누락·API 불일치를 구현 전에 식별하고, 생성 코드는 빌드·실기기/E2E로 검증',
  ],
  projectSkills: ['Cursor', 'Playwright', 'MCP', 'Jira', 'Notion', 'Figma'],
  mainFeatures:
    'AI Native 개발 OS — MCP 연동 · Closeout/E2E 스킬 · Playwright ~290 시나리오 · 업무일지/보고서 자동화',
  background: [
    'V3부터 Cursor를 도입해, 요구사항·디자인·구현·테스트·문서화가 사람 기억에 의존하지 않도록 자동화 플로우를 짰습니다.',
    '동시에 웹 FE에 Playwright를 도입해 Stage/로컬에서 사용자 플로우를 결과 기반으로 검증하는 E2E 레이어를 구축했습니다.',
  ],
  meaning: [
    'E2E는 “실제 인증 재현”이 아니라 API Mock 가정 하에 UI 플로우가 이어지는지 검증하는 방향으로 설계했고, 가이드 문서와 fixtures/mocks/pages 구조를 팀에 남겼습니다.',
    '시나리오 ID(ONB/HOME/MY/RPT 등)를 Jira·Notion·spec title과 맞춰, AI가 티켓만 받아도 범위 검증 → 코드 → Notion 상태 갱신까지 반복 가능하게 만들었습니다.',
    'work-done-closeout 스킬로 「작업 끝」한 번에 품질 게이트·커밋·일지·Jira까지 묶여, 기능 단위 완료 정의(DoD)를 습관화했습니다.',
    '환각·미확정 API 가정을 막기 위해 Jira/코드/스펙으로 확인된 사실만 반영하도록 스킬·프롬프트 규칙을 두었습니다.',
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
