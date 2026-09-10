export type Icon3DCategory = 'info' | 'concept';

export type Icon3DKey =
  | 'profile'
  | 'email'
  | 'location'
  | 'education'
  | 'web'
  | 'mobile'
  | 'analytics'
  | 'laptop'
  | 'ship'
  | 'company'
  | 'team'
  | 'personal';

export type Icon3DAssetDef = {
  key: Icon3DKey;
  label: string;
  /** 카탈로그에 표시하는 한 줄 semantic meaning — 이 asset이 무엇을 대신 보여주는지. */
  meaning: string;
  category: Icon3DCategory;
  src: string;
};

/**
 * Soft Spatial 3D Family v1 — production 확정 11개 slot(review-decision.md Decision 1 근거,
 * docs/design-system/3d-assets.md 참고) + ship(Contact launcher 전용, 아래 참고).
 * public/assets/3d/**의 실제 webp 파일과 1:1 대응한다.
 *
 * email은 About Me의 실제 4번째 정보 필드(이름/위치/이메일/학력, mocks/myInfoData.tsx)와
 * 짝을 맞추기 위해 추가됐다 — Step 6에서 Info 3개(profile/location/education)만 만들고
 * email을 빠뜨렸던 것을 바로잡은 것.
 *
 * laptop은 Experiences 섹션의 "교육"(코딩 부트캠프 수료) 항목 전용 concept으로 추가됐다 —
 * 기존 education(졸업모자, About Me의 학력 필드용)과는 의미가 달라서 재사용하지 않고
 * 새로 만들었다(코딩 교육이라는 것을 보여주고 싶다는 요청).
 *
 * ship은 나머지와 달리 Astra Style Master 파이프라인으로 생성되지 않은 임시 asset이다 —
 * 사용자가 구해온 레퍼런스 PNG(흰 배경, 갈색/빨강 톤)의 배경만 sharp로 제거해 급하게
 * webp로 만들었다. 파란 유리 + 아이보리 팔레트(review-decision.md Decision 3)와 색감이
 * 맞지 않으니, 나중에 `npm run astra:3d-family`에 ship subject를 추가해 같은 style
 * master로 재생성해서 교체해야 한다.
 *
 * company/team/personal은 ProjectCard의 프로젝트 타입 배지(회사/팀/개인 프로젝트) 옆에
 * 붙는 concept으로 추가됐다(astra-review.md PoC 가정 검증 중 결정) — 텍스트 배지가
 * 여전히 유일한 근거이고 이 아이콘은 장식용 보조 표현이다(alt=""). 세 실루엣이 32px에서도
 * 서로 확실히 구분되도록 의도적으로 서로 다른 오브젝트를 썼다: company=작은 오피스 빌딩,
 * team=인물 토큰 3개가 뭉친 클러스터(단일 인물인 profile과 구분), personal=소형 로켓
 * (인물 형태를 전혀 쓰지 않음).
 *
 * 향후 추가 후보(아직 slot 없음, visual-direction.md §2-4):
 * sleep · health · ai · project
 */
export const icon3dAssets: Icon3DAssetDef[] = [
  {
    key: 'profile',
    label: 'Profile',
    meaning: 'Personal information',
    category: 'info',
    src: '/assets/3d/info/profile.webp',
  },
  {
    key: 'email',
    label: 'Email',
    meaning: 'Contact',
    category: 'info',
    src: '/assets/3d/info/email.webp',
  },
  {
    key: 'location',
    label: 'Location',
    meaning: 'Location information',
    category: 'info',
    src: '/assets/3d/info/location.webp',
  },
  {
    key: 'education',
    label: 'Education',
    meaning: 'Education background',
    category: 'info',
    src: '/assets/3d/info/education.webp',
  },
  {
    key: 'web',
    label: 'Web',
    meaning: 'Web platform',
    category: 'concept',
    src: '/assets/3d/concepts/web.webp',
  },
  {
    key: 'mobile',
    label: 'Mobile',
    meaning: 'Mobile app',
    category: 'concept',
    src: '/assets/3d/concepts/mobile.webp',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    meaning: 'Data analytics',
    category: 'concept',
    src: '/assets/3d/concepts/analytics.webp',
  },
  {
    key: 'laptop',
    label: 'Laptop',
    meaning: 'Coding / development education',
    category: 'concept',
    src: '/assets/3d/concepts/laptop.webp',
  },
  {
    key: 'ship',
    label: 'Ship',
    meaning: 'Contact / "join my crew" invitation (floating Contact launcher)',
    category: 'concept',
    src: '/assets/3d/concepts/ship.webp',
  },
  {
    key: 'company',
    label: 'Company',
    meaning: 'Company project (project type badge)',
    category: 'concept',
    src: '/assets/3d/concepts/company.webp',
  },
  {
    key: 'team',
    label: 'Team',
    meaning: 'Team project (project type badge)',
    category: 'concept',
    src: '/assets/3d/concepts/team.webp',
  },
  {
    key: 'personal',
    label: 'Personal',
    meaning: 'Personal project (project type badge)',
    category: 'concept',
    src: '/assets/3d/concepts/personal.webp',
  },
];

/**
 * semantic name(예: "profile")으로 asset을 바로 찾을 수 있는 단순 lookup —
 * `icon3dAssetsByKey.profile.src` 처럼 쓴다. 별도 registry/factory 없이 이 객체
 * 하나로 충분하다(review-decision.md 원칙 — 과설계 지양).
 */
export const icon3dAssetsByKey: Record<Icon3DKey, Icon3DAssetDef> = Object.fromEntries(
  icon3dAssets.map((asset) => [asset.key, asset]),
) as Record<Icon3DKey, Icon3DAssetDef>;
