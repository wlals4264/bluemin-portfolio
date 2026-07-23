export type HighlightIssue = {
  problem: string;
  action: string;
  result: string;
};

export type ProjectHighlightId =
  | 'kkuljam-v3'
  | 'kkuljam-admin'
  | 'kkuljam-v2'
  | 'ai-e2e';

/** 포트폴리오(공개)용 — 면접관이 읽는 요약. 코드·티켓·내부 기밀 제외 */
export type HighlightCase = {
  id: string;
  projectId: ProjectHighlightId;
  title: string;
  subtitle: string;
  period: string;
  tags: string[];
  context: string[];
  decision: string[];
  issues: HighlightIssue[];
  outcomes: string[];
};

export const highlightsData: HighlightCase[] = [
  {
    id: 'rn-to-flutter',
    projectId: 'kkuljam-v3',
    title: 'RN → Flutter 앱 셸 마이그레이션',
    subtitle: '수면 케어 앱 V3 — 네이티브 확장에 맞춘 앱 셸 재구축',
    period: '2025.12 ~ 2026.03',
    tags: ['Flutter', 'React Native', 'WebView', 'Alarm', 'Mobile'],
    context: [
      '초기에는 속도를 위해 React Native 셸과 웹뷰 기반 구조를 사용했습니다.',
      '알람·수면 측정·백그라운드 오디오·기기 연동 등 네이티브 비중이 커지며 기존 셸의 일정·안정성 리스크가 커졌습니다.',
    ],
    decision: [
      '앱 셸을 Flutter로 재구축하고, 기록·리포트 등 서비스 UI는 웹뷰로 역할을 분리했습니다.',
      '로그인·알람처럼 안정성이 중요한 진입점은 앱 쪽으로 옮겼습니다.',
    ],
    issues: [
      {
        problem: '외부 푸시 의존 알람은 기기·네트워크에 따라 불안정했습니다.',
        action: '앱 자체 알람으로 전환하고 잠금·백그라운드 등 OS별 시나리오를 검증했습니다.',
        result: '기상·루틴 핵심 알람을 OS 제약 안에서 안정화했습니다.',
      },
      {
        problem: '루틴 영상 백그라운드 연속 재생과 안정성을 동시에 맞추기 어려웠습니다.',
        action: '취침 전 루틴은 앱 오디오, 낮 루틴은 웹 비디오로 재생 책임을 분리했습니다.',
        result: '취침 전 루틴의 백그라운드 재생 안정성을 확보했습니다.',
      },
    ],
    outcomes: [
      'RN WebView 셸을 Flutter로 재구축해 알람·수면 측정·오디오 네이티브 경로의 일정·운영 예측성 확보',
      '웹 화면 자산은 WebView로 유지하면서 앱 셸 안정성 향상',
    ],
  },
  {
    id: 'ios-audio-session',
    projectId: 'kkuljam-v3',
    title: 'iOS 오디오 세션 통합 · 외부 세션 충돌 대응',
    subtitle: '루틴 재생·수면 녹음·웹(유튜브) 세션이 서로 덮지 않도록 ownership 정리',
    period: '2026.01 ~',
    tags: ['Flutter', 'iOS', 'Audio Session', 'YouTube', 'Sleep Tracking'],
    context: [
      '취침 플로우는 루틴 오디오(just_audio)와 수면 녹음이 연달아, 때로는 겹쳐 동작합니다.',
      'iOS에서 모듈이 각자 AVAudioSession을 바꾸면 끊김·무음·녹음 실패가 납니다.',
      '웹뷰 유튜브·낮 루틴 비디오 등 외부 세션이 잡히면 Flutter 재설정과 싸움을 만듭니다.',
    ],
    decision: [
      'IosUnifiedAudioSession으로 playAndRecord를 앱 기동 시 한 곳에서만 구성하고, 플레이어는 세션을 덮지 않게 했습니다.',
      '루틴→측정 전환에서는 cleanup과 세션 다운시프트를 분리해 플로우 중 세션을 유지했습니다.',
      '취침 전=앱 오디오 / 낮 루틴=웹 비디오로 책임을 나누고, 외부 세션과는 ownership·handoff 경계를 명시했습니다.',
      '자러가기 경로는 오디오 권한 → 수면 음악 → 수면 분석 순서로 고정했습니다.',
    ],
    issues: [
      {
        problem: '재생·녹음이 각자 세션을 활성화해 충돌했습니다.',
        action: '통합 세션을 앱에서만 구성·활성화하고 플레이어 임의 재설정을 막았습니다.',
        result: '루틴 재생과 수면 녹음이 같은 취침 플로우에서 안정적으로 이어졌습니다.',
      },
      {
        problem: '웹 유튜브·외부 SDK가 세션을 잡으면 Flutter audio_session 재설정이 충돌했습니다.',
        action: 'ownership 플래그와 handoff/release로 경계를 두고, 취침 전/낮 루틴 재생 책임을 분리했습니다.',
        result: '외부 미디어와 앱 측정 경로가 서로 세션을 뺏지 않도록 정리했습니다.',
      },
      {
        problem: '녹음 중 카메라·다른 오디오가 끼어들면 측정이 끊겼습니다.',
        action: '중단 UX·재개 경로를 구현하고, 안내 문구를 디자인과 합의해 측정 화면에 반영했습니다.',
        result: '예외 상황에서도 사용자에게 상태를 알리고 측정을 이어갈 수 있게 됐습니다.',
      },
    ],
    outcomes: [
      'playAndRecord 통합과 ownership 경계로 재생·녹음·외부(유튜브) 세션 충돌을 완화',
      '취침 자동화 플로우의 끊김·무음 장애를 줄이고 QA 재현 가능한 엣지 케이스를 문서화',
    ],
  },
  {
    id: 'sleep-routine-automation',
    projectId: 'kkuljam-v3',
    title: '취침 루틴 → 수면 측정 → 일기 자동화',
    subtitle: '알람부터 일기까지 끊김 없는 취침 플로우',
    period: '2026.01 ~',
    tags: ['Flutter', 'Alarm', 'Sleep Tracking', 'UX Flow'],
    context: [
      '취침 경험은 알람·루틴·음악·측정·일기로 나뉘어 단계마다 이탈하기 쉬웠습니다.',
    ],
    decision: [
      '알람 확인 → 루틴 → 수면 음악 → 측정 → 일기 자동 작성의 단일 플로우를 설계했습니다.',
      '네이티브 구간은 앱, 기록·리포트 UI는 웹이 이어받도록 역할을 나눴습니다.',
    ],
    issues: [
      {
        problem: '단계가 끊기면 사용자가 다음 행동을 스스로 찾아야 했습니다.',
        action: '알람·루틴 종료 시 다음 단계로 자동 진입하도록 연결했습니다.',
        result: '취침부터 일기까지 한 흐름으로 이어지게 했습니다.',
      },
    ],
    outcomes: [
      '알람→루틴→음악→측정→일기를 자동화해 취침 이탈 구간 축소',
      '앱·웹 경계를 넘나들면서도 사용자 관점의 연속 경험 확보',
    ],
  },
  {
    id: 'onboarding-sns-terms',
    projectId: 'kkuljam-v3',
    title: '소셜 로그인 · 약관 · 온보딩 간소화와 엣지 대응',
    subtitle: '동의 중복 제거 · 프리필 · 권한/UI 엣지를 제품·디자인과 맞춰 정리',
    period: '2026.03 ~',
    tags: ['Onboarding', 'OAuth', 'UX', 'Edge Case'],
    context: [
      'SNS로 이미 동의한 사용자가 앱에서 약관을 다시 보면 온보딩 마찰이 커집니다.',
      '권한·타임피커·캐릭터 이미지 등 작은 엣지가 첫인상을 좌우했습니다.',
    ],
    decision: [
      '앱에 마케팅 동의 상태를 저장하고 웹 온보딩에 전달해 중복 약관 바텀시트를 제거했습니다.',
      'SNS 기본 정보 허용 사용자는 온보딩 데이터를 프리필해 입력 단계를 줄였습니다.',
      '권한 요청 순서를 조정하고, OS별 권한 안내·거부 스낵바를 디자인 스펙과 맞춰 요구·반영했습니다.',
    ],
    issues: [
      {
        problem: '네이버·카카오에서 동의한 뒤에도 앱 내부 약관 팝업이 다시 떴습니다.',
        action: '앱·웹 동의 데이터 흐름을 맞춰 불필요한 바텀시트를 제거했습니다.',
        result: '소셜 가입 온보딩 진입 마찰을 줄였습니다.',
      },
      {
        problem: 'Android 14 부분 미디어 권한이 DENIED로 오인되어 공유 권한 시트가 반복됐습니다.',
        action: 'OS STATUS를 분석해 “오류가 아닌 정책”으로 정리하고 OS별 안내 문구를 제안했습니다.',
        result: '권한 UX를 제품·디자인과 함께 바로잡았습니다.',
      },
      {
        problem: '오디오 권한 거부 사용자가 루틴·측정으로 들어가면 실패만 겪었습니다.',
        action: '거부 시 스낵바 안내를 Figma 스펙에 맞춰 루틴 재생 경로에 반영하도록 협의했습니다.',
        result: '권한 실패를 사용자에게 즉시 설명하는 경로를 만들었습니다.',
      },
    ],
    outcomes: [
      '소셜 약관 중복 제거·프리필로 온보딩 단계를 간소화',
      '권한·UI 엣지를 Jira·Figma와 맞춰 기획·꼼꼼함 기반으로 해소',
    ],
  },
  {
    id: 'v3-native-ops',
    projectId: 'kkuljam-v3',
    title: '딥링크 · 공유 OG · 디자인 토큰 · Sentry',
    subtitle: 'AppsFlyer OneLink, 서버 공유 이미지, FE 토큰 이식, Flutter 모니터링',
    period: '2026.01 ~',
    tags: ['AppsFlyer', 'OG Image', 'Design Tokens', 'Sentry'],
    context: [
      '웹↔앱 진입·공유·UI 일관성·장애 감지가 V3 운영 품질을 좌우했습니다.',
      '앱에는 디자인 시스템이 없어 웹 FE와 톤이 어긋날 위험이 있었습니다.',
    ],
    decision: [
      'AppsFlyer OneLink로 딥링크·어트리뷰션 진입 경로를 초기화하고 웹↔앱 경계를 안정화했습니다.',
      'SNS 공유는 클라이언트 base64 한계를 넘어 서버에서 OG/공유 이미지를 생성·제공하도록 바꿨습니다.',
      '웹과 동일한 디자인 토큰을 Flutter에 이식해 UI 일관성을 맞췄습니다.',
      'Flutter에 Sentry를 도입해 네이티브 경로 오류를 조기에 추적했습니다.',
    ],
    issues: [
      {
        problem: '공유 이미지를 클라이언트에서 다루면 용량·품질·캐시 한계가 컸습니다.',
        action: '서버 컴포넌트 경로로 OG/공유 이미지를 생성해 전달했습니다.',
        result: '공유 미리보기 품질과 생성 경로를 서버 책임으로 정리했습니다.',
      },
      {
        problem: '앱 UI가 웹 디자인 시스템과 따로 놀면 제품 톤이 깨집니다.',
        action: 'FE 토큰/스타일을 Flutter에 맞춰 이식했습니다.',
        result: '웹·앱 시각 언어를 같은 토큰 기준으로 맞췄습니다.',
      },
    ],
    outcomes: [
      '딥링크·공유·토큰·모니터링으로 V3 운영·브랜드·장애 대응 기반을 보강',
    ],
  },
  {
    id: 'admin-funnel-ga',
    projectId: 'kkuljam-admin',
    title: '운영 어드민 · AARRR 퍼널 · GA4·카카오 픽셀',
    subtitle: '기획부터 대시보드·광고 전환 추적·가이드까지',
    period: '2025.09 ~',
    tags: ['Admin', 'GA4', 'Kakao Pixel', 'AARRR', 'ECharts'],
    context: [
      '가입·온보딩·활성을 숫자로 보지 못하면 운영·마케팅 의사결정이 느려졌습니다.',
      '광고 전환과 제품 퍼널이 어긋나면 성과를 같은 언어로 말하기 어려웠습니다.',
    ],
    decision: [
      'React·Vite·ECharts 어드민을 기획부터 구축해 퍼널·DAU·유저/오류 로그를 한곳에서 보게 했습니다.',
      'GA4 이벤트·user_properties(성별·나이대·login_type·목표 수면/기상·키워드)와 app_open 등 행동을 정의했습니다.',
      '카카오 픽셀 PageView·Complete Registration으로 광고↔서비스 전환을 맞췄습니다.',
      'AARRR(Acquisition·Activation·Retention 등)을 가입→온보딩→활성→일기/루틴 사용 구간에 맞게 잘라 대시보드화했습니다.',
    ],
    issues: [
      {
        problem: 'GA4 UI만으로는 가입일 코호트·리텐션 커스텀에 한계가 있었습니다.',
        action: 'BigQuery export·코호트 설계를 정리하고 어드민에 보여줄 지표 우선순위를 문서화했습니다.',
        result: '제품·광고·리텐션을 같은 분석 언어로 확장할 기반을 만들었습니다.',
      },
      {
        problem: '이벤트 정의가 흩어지면 지표 신뢰도가 떨어집니다.',
        action: '커스텀 이벤트·유저 속성·픽셀 수집 범위를 가이드로 통일했습니다.',
        result: '추적·대시보드·가이드가 같은 기준으로 연결됐습니다.',
      },
    ],
    outcomes: [
      '비개발 직군이 퍼널·DAU를 직접 보는 어드민 기반 마련',
      'GA4 + 카카오 픽셀로 제품·광고 전환 기준 통일',
      'AARRR 관점 가입→활성 퍼널을 차트·문서로 정량화',
    ],
  },
  {
    id: 'ai-e2e-automation',
    projectId: 'ai-e2e',
    title: 'Cursor 워크플로 · Playwright E2E · Closeout 자동화',
    subtitle: 'PRD→구현→시나리오 검수→E2E→이슈 등록·MR까지 품질 게이트',
    period: '2025.12 ~',
    tags: ['Cursor', 'Playwright', 'MCP', 'E2E', 'DoD'],
    context: [
      '화면·플로우가 늘수록 수동 회귀만으로는 품질을 지키기 어려웠습니다.',
      'AI로 구현만 빨라지면 검증·티켓화가 따라가지 못하는 문제가 있었습니다.',
    ],
    decision: [
      'Cursor + Figma·Jira·Notion MCP로 PRD→Plan→구현 워크플로를 자동화했습니다.',
      '프로덕트·디자이너 시나리오를 검수하고 Notion 테스트 시트를 개선한 뒤, e2e-scenario 스킬로 코드·상태 갱신까지 연결했습니다.',
      'Playwright ~290 시나리오(온보딩/홈/MY/리포트/일기/챗/루틴/HFF 등)를 구축했습니다.',
      'MCP 교차 검증으로 누락 페이지를 발견하면 출시 에픽에 이슈가 자동 등록되게 했습니다.',
      '기능 완료에 E2E를 포함하고 typecheck/lint/test→커밋→MR까지 Closeout으로 묶었습니다.',
    ],
    issues: [
      {
        problem: '시나리오가 문서·티켓·코드에 흩어지면 자동화 범위가 불명확합니다.',
        action: '시나리오 ID를 Jira·Notion·스펙 제목과 맞추고 스킬이 범위→작성→상태까지 반복하게 했습니다.',
        result: '수백 개 E2E를 체계적으로 쌓을 수 있었습니다.',
      },
      {
        problem: '스펙·화면 누락이 출시 직전에야 발견됐습니다.',
        action: 'Figma·Notion·Jira MCP로 시나리오를 교차 검증하고 갭을 에픽 이슈로 자동 등록했습니다.',
        result: '누락을 구현·검증 루프 안에서 조기에 드러냈습니다.',
      },
      {
        problem: '완료 정의가 사람마다 다르면 품질 편차가 큽니다.',
        action: 'E2E 포함 DoD와 Closeout(커밋·일지·MR)을 습관화했습니다.',
        result: '검증·티켓화·완료까지 닫히는 품질 게이트를 만들었습니다.',
      },
    ],
    outcomes: [
      'Playwright ~290 시나리오로 핵심 플로우 회귀 기반 마련',
      'AI 구현 + MCP 검수 + 에픽 자동 등록 + Closeout으로 완료 정의를 자동화',
    ],
  },
  {
    id: 'v2-ux-onboarding',
    projectId: 'kkuljam-v2',
    title: 'V2 유지보수 · 기록·리포트·온보딩 UX',
    subtitle: '서비스 중 제품의 버그픽스·응대와 사용성 고도화',
    period: '2025.08 ~',
    tags: ['Next.js', 'Bugfix', 'UX', 'Onboarding'],
    context: [
      '이미 서비스 중인 V2의 유지보수와 이슈 응대가 우선이었습니다.',
      '낮잠 기록·리포트·회원가입처럼 매일 쓰는 경로에 마찰과 버그가 있었습니다.',
    ],
    decision: [
      '운영 버그픽스와 병행해 낮잠 기록/수정 UI를 단순화했습니다.',
      '리포트·통계를 무한 스크롤·그래프로 탐색하기 쉽게 만들었습니다.',
      '회원가입을 마법사(스텝) 플로우로 나눠 온보딩 이탈을 줄였습니다.',
    ],
    issues: [
      {
        problem: '기록·리포트·온보딩 경로의 버그가 사용자 이탈로 이어졌습니다.',
        action: '반복 제보·재현 이슈를 우선 수정하고 UX 병목을 같이 정리했습니다.',
        result: '서비스 중 제품의 안정성과 사용성을 함께 끌어올렸습니다.',
      },
      {
        problem: '회원가입 한 화면에 정보가 몰리면 이탈하기 쉽습니다.',
        action: '단계형 마법사로 입력 부담을 나눴습니다.',
        result: '온보딩 진입 경험을 단순화했습니다.',
      },
    ],
    outcomes: [
      '유지보수·버그픽스와 UX 개선을 병행해 서비스 중 제품 품질 향상',
      '낮잠 기록·통계·회원가입 마법사로 핵심 경로 마찰 축소',
    ],
  },
  {
    id: 'healthkit-wearable',
    projectId: 'kkuljam-v2',
    title: '스마트워치 수면 데이터로 일기 자동 채움',
    subtitle: 'HealthKit/Health Connect 연동 UX',
    period: '2025.08 ~',
    tags: ['HealthKit', 'Health Connect', 'UX', 'Diary'],
    context: [
      '앱 자체 측정 전에 일기는 매번 수동 기입이라 워치 유저까지 중복 입력이 생겼습니다.',
    ],
    decision: [
      '워치 수면 데이터가 있으면 일기 초안을 자동 채우고 스낵바로 안내했습니다.',
      '데이터가 없으면 수동 기입을 유지해 진입 장벽을 올리지 않았습니다.',
    ],
    issues: [
      {
        problem: 'OS·권한마다 읽을 수 있는 수면 데이터가 달랐습니다.',
        action: '플랫폼별 권한을 구분해 공통 지표로 정규화한 뒤 일기에 반영했습니다.',
        result: '자동 채움과 수동 기입이 같은 일기 UX에서 공존했습니다.',
      },
    ],
    outcomes: [
      '워치 유저 기록 마찰을 줄이는 UX 결정을 실행하고 이후 앱 측정 자동화의 기반으로 삼음',
    ],
  },
  {
    id: 'auth-react-cache',
    projectId: 'kkuljam-v3',
    title: '홈 세션 조회 중복 제거 · 진입 안정화',
    subtitle: 'V2에서 불안정했던 홈 세션을 동일 요청 내 1회 해석으로 정리',
    period: '2026.04',
    tags: ['Next.js', 'Auth.js', 'RSC', 'Performance'],
    context: [
      'V2 홈 진입에서 layout·page가 각각 세션을 조회하며 비용·불안정 요인이 됐습니다.',
      'V3에서도 홈은 세션이 필요한 데이터가 많아 동일 요청 내 중복 해석을 막을 필요가 있었습니다.',
    ],
    decision: [
      '세션 조회를 React 요청 단위 캐시로 감싸 호출처는 유지한 채 1회만 실행되게 했습니다.',
      '범위를 서버 컴포넌트 요청 내 중복 제거로 한정해 변경 영향을 최소화했습니다.',
    ],
    issues: [
      {
        problem: '같은 RSC 요청에서 세션 해석이 여러 번 돌았습니다.',
        action: '인증 모듈의 세션 함수를 cache로 메모이제이션했습니다.',
        result: '홈 진입 경로의 불필요한 세션 비용을 줄이고 안정화했습니다.',
      },
    ],
    outcomes: [
      'V2 홈 세션 이슈를 V3에서 요청당 1회 해석으로 정리',
      '호출 패턴은 유지한 채 인증 모듈만 바꿔 영향 범위를 최소화',
    ],
  },
  {
    id: 'error-monitoring',
    projectId: 'kkuljam-v2',
    title: '클라이언트 오류 모니터링(Sentry) 도입',
    subtitle: '앱·웹 재현 어려운 오류의 조기 감지',
    period: '2025.08 ~',
    tags: ['Sentry', 'React Native', 'Next.js', 'Reliability'],
    context: [
      '로컬 미재현 오류를 사용자 신고에만 의존하면 대응이 늦어집니다.',
    ],
    decision: [
      'RN·Next.js에 Sentry를 연동하고 디바이스·OS·URL 컨텍스트를 남겼습니다.',
      '대시보드 보는 법·대응 방향을 가이드로 공유했습니다.',
    ],
    issues: [
      {
        problem: '스택만으로는 화면·환경을 알기 어렵습니다.',
        action: '컨텍스트·이벤트 흐름을 함께 보도록 구성했습니다.',
        result: '재현 경로를 좁혀 수정 속도를 높였습니다.',
      },
    ],
    outcomes: [
      '운영 중 장애를 선제적으로 다루는 모니터링 기반 구축',
    ],
  },
];

export function getHighlightsByProjectId(projectId: ProjectHighlightId): HighlightCase[] {
  return highlightsData.filter((h) => h.projectId === projectId);
}
