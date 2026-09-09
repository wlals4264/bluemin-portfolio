# 현재 UI 감사 (Current UI Audit)

> 목적: 3D Icon + Glass UI 기반 디자인 시스템으로 점진 리팩토링하기 전, 현재 코드베이스의 스타일 실태를 있는 그대로 기록한다.
> 이 문서는 **분석 전용**이며 코드 변경은 포함하지 않는다.
> 조사 범위: `src/styles/**/*.scss`(전 26개 파일, 총 3,594줄), `src/components/**/*.tsx`, `src/mocks/**/*.tsx`, `src/app/layout.tsx`.

---

## 0. 아키텍처 개요

- 스타일링 방식: **plain SCSS**를 컴포넌트별 파일로 분리(`src/styles/components/*.scss`)해 `import`. CSS Module은 `InfoHeader.module.scss` **한 곳뿐**이라 컨벤션이 섞여 있음.
- SCSS 고유 기능(변수 `$`, `@mixin`, `@function`, `@use`, `@forward`) 사용은 **`src/styles/components/ProjectCard.scss`의 `@mixin project-card-btn` 1개**가 전부. 사실상 "SCSS 문법을 쓰는 CSS"에 가깝고, 디자인 토큰은 전부 **CSS 커스텀 프로퍼티(`--*`)** 로만 관리되고 있음 → 토큰화 자체는 이미 절반쯤 되어 있는 유리한 출발점.
- 테마: `[data-theme='dark']` 속성 셀렉터 기반 라이트/다크 두 세트. `globals.scss:1-70`.
- 재사용 프리미티브는 `GlassButton`(`src/components/common/buttons/GlassButton.tsx`) 하나뿐이고, 나머지 버튼/카드/배지는 각 컴포넌트 scss에 개별 구현됨.

---

## 1. Color System

### 1-1. 토큰 정의 위치: `globals.scss`

| 토큰 | Light | Dark | 용도 |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0b1220` | 페이지 배경 |
| `--bg-elevated` | `#f8fafc` | `#111827` | 카드보다 한 단 낮은 표면(다이어그램 박스, readme 섹션 등) |
| `--bg-muted` | `#f1f6ff` | `#152033` | 배지/보조 표면 |
| `--text` | `#111827` | `#e8edf5` | 본문 텍스트 |
| `--text-muted` | `#6b7280` | `#9aa4b2` | 보조 텍스트 |
| `--text-soft` | `#374151` | `#c5ced9` | 본문보다 약하지만 muted보다 강한 중간 톤 |
| `--border` | `#e5e7eb` | `#243044` | 기본 보더 |
| `--accent` | `#2563eb` | `#60a5fa` | 브랜드 블루, CTA/링크/포커스 |
| `--accent-hover` | `#1d4ed8` | `#93c5fd` | accent hover |
| `--accent-soft` | `#dbeafe` | `#1e3a5f` | accent 배경(배지, 선택 상태) |
| `--accent-contrast` | `#ffffff` | `#0b1220` | accent 배경 위 텍스트 |
| `--card` | `#ffffff` | `#111827` | 카드 배경 |
| `--shadow` | `rgba(15,23,42,.08)` | `rgba(0,0,0,.45)` | 범용 그림자 색 |
| `--header-bg` | `rgba(255,255,255,.6)` | `rgba(11,18,32,.5)` | 헤더 유리 배경 |
| `--header-hairline` | `rgba(15,23,42,.08)` | `rgba(255,255,255,.1)` | 헤더 하단 경계선 |
| `--modal-overlay` | `rgba(15,23,42,.45)` | `rgba(0,0,0,.65)` | 모달 오버레이 |
| `--success` | `#16a34a` | `#4ade80` | "team" 배지 |
| `--company` | `#0f766e` | `#2dd4bf` | "company" 배지, 경력 role 텍스트 |
| `--glass-bg` / `-strong` | `rgba(255,255,255,.55/.75)` | `rgba(255,255,255,.08/.16)` | 유리 배경 2단계 |
| `--glass-border` | `rgba(255,255,255,.65)` | `rgba(255,255,255,.16)` | 유리 테두리 |
| `--glass-highlight` | `rgba(255,255,255,.85)` | `rgba(255,255,255,.22)` | inset 하이라이트 |
| `--glass-specular` | `rgba(255,255,255,.95)` | `rgba(255,255,255,.3)` | 스페큘러 그라디언트 |
| `--glass-shadow` | `rgba(15,23,42,.14)` | `rgba(0,0,0,.5)` | 유리 그림자 |

**의미**: liquid-glass 토큰(`--glass-*`)이 이미 존재하고 라이트/다크 모두 정의돼 있음. 새 디자인 시스템은 이걸 확장하면 되고 새로 발명할 필요가 적음.

### 1-2. 토큰을 벗어난 하드코딩 색상 (문제 지점)

| 위치 | 값 | 비고 |
|---|---|---|
| `Skills.scss:47-184` | `#e34c26`, `#264de4`, `#f0db4f`, `#007acc`, `#61dafb`, `#000`, `#3578e5`, `#ffdd57`, `#38b2ac`, `#cd6799`, `#db7093`, `#6a5acd`, `#ff4154`, `#f9ab00`, `#362d59`, `#5470c6`, `#0175c2`, `#02569b`, `#646cff`, `#1483d3`, `#024d84`, `#ffca28`, `#2ead33`, `#111827` 등 24개 브랜드 색 | 기술 스택 뱃지의 "브랜드 고유색"이라 토큰화 대상은 아니지만, 라이트/다크 모드에서 대비 검증 없이 고정값 사용. 다크 테마에서 가독성 이슈 가능(`html`, `next-js`, `vercel`, `expo`, `cursor`는 검정 배경이라 다크 모드 카드 위에서 경계가 옅어짐). |
| `CodeSnap.scss:11,26,30,34,40,53,62,81,89,94` | `#00ff88`, `#ff5f56`, `#ffbd2e`, `#27c93f`, `#191919` | 터미널 컴포넌트 전용 팔레트. 의도된 하드코딩(터미널 룩 유지 목적)으로 보이나 다크/라이트 테마 전환에 반응하지 않음. |
| `ProjectCard.scss:221` | `#dc2626` (trouble 링크) | 유일한 시맨틱 "danger/warning" 색인데 토큰이 없어 즉석 하드코딩됨 → `--danger` 토큰 부재. |
| `DiagramZoom.scss:101,108`, `ProjectScreens.scss:155,161` | `rgba(255,255,255,.12/.24)`, `#fff` | 라이트박스 닫기/네비 버튼은 항상 "다크 오버레이 위"라는 전제로 흰색 고정. 토큰 미사용이지만 문맥상 합리적(오버레이 자체가 항상 어둡기 때문). |
| `KeywordBubbleChart.scss:49,84` | `color:#fff` / `#111` | 버블 배경색(JS에서 동적 계산)에 따라 텍스트를 흰색/검정으로 분기 — 토큰화 어려운 동적 대비 로직. |

### 1-3. 관찰
- 시맨틱 색상이 `--accent`, `--success`, `--company` 3개뿐이고 `--danger`/`--warning`/`--info`가 없음 → `project-card-trouble`이 하드코딩된 이유.
- `color-mix(in srgb, …)`가 30곳 이상에서 반투명 변형을 즉석으로 만드는 데 쓰임(`ProjectCard.scss`, `HighlightDiagrams.scss`, `GlassButton.scss` 등) — 패턴은 일관되지만 같은 조합(`accent 35%, border`, `accent 12%, card` 등)이 파일마다 반복 타이핑됨.

---

## 2. Typography

### 2-1. 폰트 패밀리
- `--font-body` = Noto Sans KR (`layout.tsx:7-12`), `--font-display` = Poetsen One(영문 전용 디스플레이 폰트, `layout.tsx:14-19`).
- `globals.scss:4-8`에 레거시 별칭 4개(`--font-sans`, `--font-nanum-gothic-coding`, `--font-poesen-one`, `--font-jua`)가 전부 위 두 값으로 매핑됨 — **더 이상 실제로 구분되지 않는 죽은 별칭**. 실제 컴포넌트에서 참조되는 건 `--font-body`, `--font-display`, 그리고 `Skills.scss:45`의 `--font-poesen-one`(레거시 별칭 경유) 정도.
- `font-family` 선언이 거의 모든 scss 파일에서 `var(--font-body), sans-serif` / `var(--font-display), sans-serif` 형태로 **반복 타이핑**됨(약 20곳).

### 2-2. Font size 스케일 (px 하드코딩, rem 거의 미사용)
관찰된 값(내림차순, 데스크톱 기준): `60px`(히어로 강조 span) · `56px`(h1) · `32px`(readme 제목 clamp 상한) · `28px`(InfoHeader) · `26px`(project-card-title clamp 상한) · `22px`(career-company, about-me-icon) · `18px`(skill-title, intro 서브텍스트) · `17px`(highlight-case-title) · `16px`(nav, sentences) · `15px`(다수 본문) · `14px`(다수 본문/라벨) · `13px`(caption류) · `12px`(caption/badge) · `11px`(badge/label) · `10px`(초소형 label) · `9~8px`(퍼널 스테이지 서브 라벨, 극소).
- `clamp()`를 쓰는 곳은 3곳뿐(`ProjectCard.scss:87`, `ReadMe.scss:88`, `Introduction.scss` 미디어쿼리 내부) — 나머지는 브레이크포인트별로 `font-size`를 개별 재정의하는 방식(§9 참고).
- 전역 base: `html,body{font-size:16px; line-height:1.6; letter-spacing:-0.01em}` (`globals.scss:91-93`), 헤딩은 `line-height:1.35; letter-spacing:-0.02em`(`globals.scss:109-115`) — 두 값이 사실상 유일한 "타이포 토큰".
- 정리하면 실질적으로 **약 13단계의 font-size**가 rem 스케일이나 명명된 토큰 없이 매직 넘버로 흩어져 있음.

### 2-3. Font weight
- `400`(readme-title 예외) / `500` / `600` / `700` / `800`(bold) / `bold` 키워드(1곳, `Skills.scss:24`) 혼용. 대부분 컴포넌트가 "라벨=700, 본문=400~500, 강조 텍스트=600" 규칙을 암묵적으로 따르고 있으나 명시적 스케일은 없음.

---

## 3. Spacing

- rem/em 기반 spacing scale이 없고 **px 매직 넘버**가 전부 (`gap`, `margin`, `padding`에 `4/6/8/10/12/14/16/18/20/22/24/28/30/32/36/40/48/56/64/72px` 등 20종 이상 관찰).
- 섹션 간격은 거의 모든 `*-container`가 `margin: 72px 0;`으로 통일되어 있음(`AboutMe.scss:2`, `Career.scss:2`, `Experiences.scss:2`, `Skills.scss:3`, `Projects.scss:2` 등 6곳) — **이 값 자체는 이미 사실상의 토큰**이라 `--space-section` 같은 변수로 승격하기 좋음.
- `scroll-margin-top: 72px`도 섹션 컨테이너마다 반복(`AboutMe.scss:3`, `Career.scss:3`, `Experiences.scss:3`, `Skills.scss:6` 등) — 헤더 높이와 연동된 값인데 헤더 실제 높이를 나타내는 토큰이 없어 매직 넘버로 중복.
- 카드 내부 padding은 `18~24px` 대역, 배지/칩 padding은 `4~10px` 대역으로 크게 두 그룹으로 나뉨 → 4px 그리드(`4/8/12/16/20/24/32/40/48/64/72`)로 정규화 가능.

---

## 4. Border Radius

관찰된 값과 대표 위치:

| 값 | 용도 | 위치 예 |
|---|---|---|
| `999px` (pill/full) | 버튼, 배지, 스킬칩, 스크롤바 thumb | `GlassButton.scss:9`, `ProjectCard.scss:6,108,239`, `ReadMe.scss:111,314`, `ProjectScreens.scss:22` |
| `50%` (circle) | 원형 아바타/아이콘 버튼/도트/스켈레톤 | `Introduction.scss:73,88,108`, `DiagramZoom.scss:16,100`, `ProjectScreens.scss:60,154`, `KeywordBubbleChart.scss:33,48` |
| `20px` | 레거시 pill 버튼(hire-me, more-btn) | `Nav.scss:41`, `Navigator.scss:17` |
| `16~18px` | 카드/모달/스크린샷 아이템 큰 라운드 | `ProjectCard.scss:45`, `ReadMe.scss:20`, `ProjectScreens.scss:30`, `DiagramZoom.scss:70` |
| `12~14px` | 중간 카드/섹션 박스 | `ProjectCard.scss:157`, `HighlightDiagrams.scss:12`, `ReadMe.scss:169,224,245,279` |
| `10px` | 소형 카드/입력/버튼 | `HighlightDiagrams.scss:64,144`, `CodeSnap.scss:2,42`, `ReadMe.scss:50,194` |
| `8px` | 소형 배지/스텝/칩 | `HighlightDiagrams.scss:114,214,311,345`, `ReadMe.scss:297` |

**패턴**: 반경이 명확히 5단계(`8/10/12~14/16~18/999 or 50%`)로 수렴하지만 각 값이 개별 숫자로 반복 타이핑됨. 예외적으로 `20px`(Nav/Navigator)이 이 스케일에서 벗어난 레거시 값.

---

## 5. Border

- 거의 전부 `1px solid var(--border)` (기본 카드/구분선), hover 시 `color-mix(in srgb, var(--accent) NN%, var(--border))`로 강조하는 패턴이 `ProjectCard`, `BlogPostCard`, `ReadMe`의 링크/카드에서 반복.
- 상태별 보더 색 오버라이드가 컴포넌트마다 독립적으로 정의됨: `company`/`team`/`personal` 3색 보더가 `ProjectCard.scss:115-131`과 `ReadMe.scss:118-129`에 **똑같은 로직으로 두 번** 존재(§10 참고).
- `DiagramZoom`/`ProjectScreens` 라이트박스 닫기 버튼은 `border:none` + 반투명 흰 배경으로 보더 없는 원형 버튼 별도 계열.
- 헤더 계열만 유일하게 "하단 한 줄" 보더(`border-bottom`)를 쓰는 hairline 패턴(`Header.scss:17`, `Nav.scss:68`, `InfoHeader.module.scss:14`, `Career.scss:14`, `ReadMe.scss:31,83,148`).

---

## 6. Shadow

세 계열로 나뉨:

1. **평면 그림자(단일 레이어)**: `0 1px 2px var(--shadow)`(기본 카드, `ProjectCard.scss:53`), `0 6px 14px var(--shadow)`(스크린샷 hover), `0 16px 48px var(--shadow)`(모달) 등. 순수하게 `--shadow` 토큰의 blur/offset만 바꿔가며 반복.
2. **accent 틴트 그림자**: `color-mix(in srgb, var(--accent) NN%, transparent)`를 그림자 색으로 사용해 "브랜드색이 배어나는 입체감" 연출. `ProjectCard.scss:26,66,93,100,317`, `Projects.scss:112-132`, `DiagramZoom.scss:26` 등 10곳 이상.
3. **유리 전용 다층 그림자**: outer shadow + `inset 0 1px 0 var(--glass-highlight)`(윗면 하이라이트) + `inset 0 -1px 1px rgba(0,0,0,.06~.14)`(아랫면 음영) 3겹 조합. `GlassButton.scss:23-26,58-61,92-95,99-102`, `Introduction.scss:99-103`에서 거의 동일한 3겹 패턴이 값만 바꿔 반복.

라이트박스류(`DiagramZoom`, `ProjectScreens`)는 토큰이 아닌 `rgba(0,0,0,.5)` 하드코딩 — "항상 어두운 오버레이 위"라는 전제라 다크모드에서도 문제는 없지만 토큰 체계 밖에 있음.

---

## 7. Background

- **표면 배경 토큰**: `--bg`(페이지) → `--bg-elevated`(다이어그램/서브섹션) → `--bg-muted`(배지) → `--card`(카드) 4단 계층이 이미 존재하고 대체로 일관되게 쓰임.
- **그라디언트 배경**: `ProjectCard.scss:46-52`(카드에 165deg 3-stop 그라디언트로 은은한 깊이감), `Introduction.scss:74-79,90-95`(radial glow + 135deg 유리판 그라디언트), `AmbientBackground.scss:19`(페이지 전체 워시, `to bottom, var(--bg), var(--accent-soft)` — 이 위에 `jquery.ripples` WebGL 캔버스로 실제 물결 텍스처를 얹는 구조, `AmbientBackground.tsx` 참고).
- **backdrop-filter 사용처(유리 배경의 핵심)**: `Header.scss:15`, `Nav.scss:66`(모바일 드롭다운), `GlassButton.scss:21`, `Projects.scss:109`(캐러셀 nav-button), `Introduction.scss:96`(프로필 유리판), `ReadMe.scss:12`(모달 오버레이 blur) — 총 6곳. 전부 `blur(Npx) [saturate(180%)]` 형태지만 blur 강도(4/8/10/20/24px)가 파일마다 제각각.
- **이미지 배경**: `Skills.scss:106`(zustand 로고만 예외적으로 `background-image: url(...)`), `KeywordBubbleChart`는 배경 없이 SVG/DOM 버블.

---

## 8. Button Variants (변형이 가장 많이 분산된 영역)

현재 코드베이스에 존재하는 "버튼처럼 동작하는" 구현이 최소 **8종류**, 서로 다른 파일에 독립적으로 존재:

| # | 구현 | 위치 | 모양 | 비고 |
|---|---|---|---|---|
| 1 | `GlassButton` (pill/circle × neutral/accent) | `GlassButton.tsx/scss` | pill 999px / circle 44px | **유일한 공식 프리미티브**. `TopBtn`, `IntroductionBtns`, `FilteringButton`에서 사용 |
| 2 | `project-card-btn` mixin (readme/video/notion/github/velog) | `ProjectCard.scss:1-33,260-303` | pill, `border+bg=var(--card)` | hover 시 3D `perspective/rotateX` 틸트 애니메이션 — 다른 버튼엔 없는 유일한 효과. `read-me-btn`만 shimmer+pulse 애니메이션 추가 |
| 3 | `nav-button`(캐러셀 화살표) | `Projects.scss:93-151` | circle 44px, `backdrop-filter: blur(10px)` | GlassButton circle과 거의 동일한 의도인데 별도 구현(유리 효과 이미 적용됨) |
| 4 | `theme-toggle` | `ThemeToggle.scss` | circle 40px, `border+bg-elevated` | 유리 아님, 불투명 |
| 5 | `hire-me-btn` | `Nav.scss:36-44` | pill, `border-radius:20px` | 현재 마크업에서 주석 처리되어 미사용(`Nav.tsx:36`) — 죽은 스타일 |
| 6 | `more-btn` | `Navigator.scss:2-34` | pill, `border-radius:20px` | GlassButton과 통합 후보 |
| 7 | `close-modal-btn`(ReadMe) | `ReadMe.scss:42-69` | square 36px, `border-radius:10px` | 사각 아이콘 버튼 계열(유일) |
| 8 | 라이트박스 close/nav 버튼 | `DiagramZoom.scss:90-110`, `ProjectScreens.scss:147-187` | circle 38~48px, `rgba(255,255,255,.12)` | **거의 동일한 스타일이 두 파일에 중복 정의** |

**결론**: 버튼 시스템은 `GlassButton` 하나로 이미 절반은 정리되어 있으나, 카드 내부 액션 버튼(#2), 캐러셀/모달 아이콘 버튼(#3,7,8), 레거시 pill(#5,6)이 아직 프리미티브 밖에 있음.

---

## 9. Card Variants

| 카드 유형 | 위치 | 특징 |
|---|---|---|
| 프로젝트 카드 | `ProjectCard.scss:35-67` | 그라디언트 배경 + hover 시 accent 틴트 그림자, border-radius 18px |
| README 모달 컨테이너 | `ReadMe.scss:14-23` | 불투명 `--card`, 그림자만(유리 없음) |
| 하이라이트 다이어그램 박스(`hl-diagram-box`) | `HighlightDiagrams.scss:6-14` | `--bg-elevated` 배경, radius 12px — 가장 많이 재사용되는 "미니 카드" 셸 |
| 통계/퍼널/비교/스텝 카드 (`hl-stat-card`, `hl-funnel-stage`, `hl-compare-card`, `hl-flow-step`, `hl-chip`) | `HighlightDiagrams.scss` 전역 | **5개 변형이 전부 "1px border + var(--card) 배경 + radius 8~10px" 동일 셸**에 폰트 크기·강조색만 다름 |
| 블로그 포스트 카드 | `BlogPostCard.scss` | `--bg-elevated` 배경, hover는 보더 색만 변경(유일하게 그림자 없는 카드) |
| README 링크/피처 리스트 아이템 | `ReadMe.scss:189-240` | `ProjectCard`의 `project-card-features`, `project-card-link`와 **클래스명까지 동일하게 재사용**(`ReadMe.scss:210,220` 이 `ProjectCard.scss`와 같은 셀렉터를 그대로 재정의) → 사실상 같은 컴포넌트를 두 파일이 각각 정의하는 상태 |

**결론**: "1px border + 표면색 배경 + 8~18px radius" 셸이 최소 7곳에서 반복 정의됨. `Card` 프리미티브(surface: base/elevated/accent, radius: sm/md/lg) 하나로 흡수 가능.

---

## 10. Badges / Chips

| 배지 | 위치 | 색상 로직 |
|---|---|---|
| 프로젝트 타입(company/team/personal) | `ProjectCard.scss:104-132` **그리고** `ReadMe.scss:107-129`(거의 동일 로직 중복, team 색만 success→accent로 다름) | `border/bg/color`를 시맨틱 토큰(`--company`,`--success`,`--accent`)으로 매핑 |
| 스킬 칩(카드 하단) | `ProjectCard.scss:232-253`, `ReadMe.scss:307-321` | accent 틴트 고정, 브랜드색 미반영 |
| 기술 스택 배지(Skills 섹션) | `Skills.scss:35-191` | §1-2에서 다룬 24개 하드코딩 브랜드색 — 유일하게 "브랜드 고유색 배지" 카테고리 |
| 다이어그램 미니 배지(`hl-chip`, `hl-flow-step`, `hl-stepsync-highlight-label`) | `HighlightDiagrams.scss` | 중립/accent 2-state 토글 패턴 반복(`is-highlighted`, `is-after`, `is-ok`) |
| 확대 배지(⤢ 아이콘 원형 뱃지) | `DiagramZoom.scss:7-27`, `ProjectScreens.scss:51-71` | 완전히 동일한 목적의 배지가 두 파일에 각각 정의(크기만 26px vs 22px) |
| 블로그 라벨(`blog-post-card-label`) | `BlogPostCard.scss:23-29` | 텍스트뿐인 uppercase 라벨, 배경 없음 |

**결론**: "상태 토글 배지"(중립⇄accent)와 "확대 힌트 배지"(원형+아이콘) 두 그룹으로 수렴 가능. company/team/personal 3색 배지는 로직이 완전히 중복되어 있어 가장 먼저 컴포넌트화할 후보.

---

## 11. Icons

- 아이콘 라이브러리: **`react-icons`** 단일 의존성 (`package.json`), 여러 서브셋(`fa`, `fa6`, `io`, `io5`, `hi2`, `md`, `lu`, `ri`, `si`, `tb`, `go`, `gi`) 혼용 — 즉 지금은 **전부 2D 플랫/라인 아이콘(monochrome, currentColor 상속)**.
- 로컬 이미지 아이콘은 `public/zustand_logo.svg` 1개뿐(다른 스킬 로고는 `react-icons/si`의 브랜드 아이콘으로 대체됨).
- 아이콘이 쓰이는 주요 위치와 현재 처리 방식:
  - `mocks/myInfoData.tsx`, `mocks/experienceData.tsx`: about-me/experience 정보 리스트의 아이콘(`IoPersonSharp`, `MdPlace`, `IoIosMail`, `RiGraduationCapFill`) — `font-size:28px; color:var(--accent)`로 단색 렌더(`AboutMe.scss:20-28`, `Experiences.scss:19-27`).
  - `mocks/skillsInfo.tsx`: 기술 스택 배지 아이콘(`FaHtml5` 등) — 배지 배경 위 흰색/검정 단색.
  - `IntroductionBtns.tsx`: 소셜 링크(GitHub/Velog/Resume/Notebook) 아이콘 — `GlassButton` circle 안에 배치.
  - `ThemeToggle.tsx`: 해/달 아이콘 토글.
  - 내비게이션/컨트롤: 캐러셀 화살표(`HiChevronLeft/Right`), 모달 닫기(`IoIosClose`), 확대(`LuExpand`), 맨 위로(`FaArrowUp`), 링크(`GoLink`, `RxNotionLogo`, `FaGithub`, `FaYoutube`, `FaBook`).
- **3D 아이콘 도입 시 영향 범위**: 이 아이콘들은 색상을 `currentColor`로 상속받아 배지/버튼 배경과 함께 움직이는 구조라, 3D(고정 조명/그림자를 가진 래스터 또는 별도 SVG) 아이콘으로 바꾸면 "배경색에 맞춰 아이콘 색이 바뀌는" 현재 방식을 포기해야 함 — 톤 매칭 전략이 별도로 필요.

---

## 12. Layout Pattern

- **페이지 폭 컨테이너**: `.home-wrapper`(`Home.scss`)가 `70vw → 80vw(≤1439) → 85vw(≤1024) → 100vw+padding(≤768)` 단계로 좁아지는 유동폭 패턴. `.header-container`(`Header.scss`)도 동일한 4단계(`70%→80%→85%→100%`)를 **독립적으로 재정의** — 두 파일이 같은 브레이크포인트 세트를 값만 `vw`/`%`로 바꿔 중복.
- **섹션 리스트**: `about-me-info`/`experiences-info`는 2열 grid(`repeat(2, minmax(0,1fr))`) → 모바일 1열, 완전히 동일한 그리드 로직이 두 파일에 중복(§13).
- **캐러셀**: `Projects.tsx`가 Swiper 기반 "peek carousel"(가장자리 카드가 흐려지고 mask로 페이드아웃) — 코드베이스에서 가장 복잡한 레이아웃 트릭(오버플로우 축별 clip, mask-image, 패딩 보정)이 몰려 있음(`Projects.scss:6-91`, 주석에 트레이드오프가 상세히 기록됨).
- **가로 스크롤 스트립**: `project-screens`(스크린샷), `filtered-buttons-container`(모바일 필터 칩)가 동일한 "overflow-x:auto + scroll-snap + hidden scrollbar" 패턴을 각각 구현.
- **모달/라이트박스**: `read-me-modal-wrapper`(중앙 정렬 카드 모달), `hl-diagram-zoom-lightbox`, `project-screens-lightbox` 3개가 `position:fixed;inset:0;z-index:10000~10060` 구조를 거의 동일하게 반복(z-index만 계층적으로 다름 — README(10000) < 스크린샷(10050) < 다이어그램(10060), 주석에 명시적으로 그 이유가 적혀 있음: `DiagramZoom.scss:43`).
- **버블 차트**: `KeywordBubbleChart`는 절대 좌표(`left/top %`) + `transform` 애니메이션 조합의 독자적인 물리 시뮬레이션 레이아웃(다른 곳과 공유되는 패턴 없음).

---

## 13. Animation / Transition

### 13-1. Transition 관찰
- `transition-duration`가 `0.1s/0.15s/0.2s/0.25s/0.28s/0.3s/0.35s` 등 **7종**으로 흩어짐(§Spacing 조사와 유사하게 grep 기준 상위 3개가 `0.15s`(17회) `0.25s`(10회) `0.2s`(8회)). "빠른 상호작용=0.15s, 일반 hover=0.25s" 정도의 암묵적 규칙은 있으나 명문화된 토큰 없음.
- Easing은 기본 `ease`가 대부분이나, **바운스 계열**(`cubic-bezier(0.34, 1.56, 0.64, 1)`)이 `GlassButton.scss:31-32`, `ProjectCard.scss:17-18`에서 동일하게 반복되고, **팝 계열**(`cubic-bezier(0.22, 1, 0.36, 1)`)이 `KeywordBubbleChart.scss:59,64`에 있음.

### 13-2. Keyframe 애니메이션 (총 7개)
| 이름 | 위치 | 용도 |
|---|---|---|
| `read-me-pulse` | `ProjectCard.scss:307-319` | README 버튼 box-shadow 펄스 |
| `read-me-shimmer` | `ProjectCard.scss:321-329` | README 버튼 대각선 shimmer sweep |
| `glass-shine-sweep` | `Introduction.scss:151-160` | 프로필 유리판 위 shimmer sweep — read-me-shimmer와 **동일 계열의 sweep 로직을 별도 구현**(주석에서도 "같은 결"이라 명시) |
| `hl-diagram-zoom-fade` | `DiagramZoom.scss:55-62` | 라이트박스 페이드인 |
| `project-screens-lightbox-fade` | `ProjectScreens.scss:120-127` | 위와 **완전히 동일한 fade** 별도 정의 |
| `keyword-pop`/`keyword-float-a`/`keyword-float-b`/`keyword-pulse` | `KeywordBubbleChart.scss:132-172` | 버블 등장/부유/스켈레톤 펄스 |

- `prefers-reduced-motion: reduce` 대응이 `ProjectCard.scss:332-341`, `Introduction.scss:162-169`, `KeywordBubbleChart.scss:174-178` **3곳에만** 존재 — 나머지 애니메이션(라이트박스 fade, 캐러셀 hover 등)은 모션 감소 설정을 무시함.
- "카드 idle 둥둥 애니메이션"(주석에서 언급되는 `y: 0→-6px` float)이 `Projects.scss:23-34` 주석에는 등장하지만 **정작 keyframe 정의가 scss에 없음** → JS(Framer Motion 등)로 처리되는 것으로 추정, 문서화 시 컴포넌트 쪽 확인 필요.

---

## 14. Responsive Breakpoint

`max-width` 매직 넘버 사용 빈도(전체 26개 scss 파일 기준):

| 브레이크포인트 | 의미(주석 기준) | 사용 파일 수 |
|---|---|---|
| `1439px` | 중형 모니터 | `Home.scss`, `Header.scss`, `ProjectCard.scss` |
| `1280px` | (Nav 전용, 다른 곳엔 없음) | `Nav.scss` |
| `1024px` | 노트북 | `Home.scss`, `Header.scss`, `Introduction.scss`, `ProjectCard.scss`, `TopBtn.scss`(빈 블록) |
| `768px` | 태블릿 | 거의 전 파일(20곳 이상) |
| `560px` | (HighlightDiagrams 전용) | `HighlightDiagrams.scss` |
| `480px` | 모바일 | 15곳 이상 |

- 네이밍이 통일된 한국어 주석(`// 중형 모니터`, `// 노트북`, `// 태블릿`, `// 모바일`)으로 **의도는 4단계 스케일**임이 분명하지만, `$breakpoints` 맵이나 mixin이 없어 **동일한 숫자를 26개 파일에 매번 리터럴로 재입력**하고 있음. 오탈자/누락 리스크가 가장 큰 지점(예: `TopBtn.scss:16-17`은 1024px 블록이 비어있는 채로 남아 있음).
- `1280px`(Nav), `560px`(HighlightDiagrams)처럼 표준 4단계에서 벗어난 **1회성 임의 값**도 존재.

---

## 15. 반복되는 CSS (요약 목록)

1. **섹션 컨테이너 셸**: `margin:72px 0; scroll-margin-top:72px;` — 6개 파일.
2. **정보 그리드 아이템**: `about-me-info-item` ≡ `experiences-info-item` (아이콘 28px + 제목/본문 텍스트 컬럼) — 완전 중복, `AboutMe.scss` vs `Experiences.scss`.
3. **프로젝트 타입 배지(company/team/personal)**: `ProjectCard.scss:104-132` ≡ `ReadMe.scss:107-129`.
4. **카드 피처 리스트(`project-card-features`) & 링크(`project-card-link`)**: `ProjectCard.scss`와 `ReadMe.scss`가 동일 클래스명으로 각각 재정의.
5. **확대 힌트 원형 배지**: `hl-diagram-zoom-badge`(26px) ≡ `project-screens-badge`(22px) — 로직 100% 동일, 크기값만 다름.
6. **라이트박스 셸(오버레이+프레임+닫기/네비 버튼)**: `read-me-modal-wrapper`, `hl-diagram-zoom-lightbox`+`-frame`+`-close`, `project-screens-lightbox`+`-frame`+`-close`+`-nav` 3벌.
7. **페이드인 keyframe**: `hl-diagram-zoom-fade` ≡ `project-screens-lightbox-fade`.
8. **유리 다층 그림자 레시피**(`inset 0 1px 0 highlight` + `inset 0 -1px 1px black` + outer): `GlassButton`, `Introduction`(유리판), `Projects`(nav-button 유사).
9. **shimmer/sweep 애니메이션**: `read-me-shimmer` ≡ `glass-shine-sweep`(대각선 sweep, 각도/트리거만 다름).
10. **"카드형 미니 위젯" 셸**(`1px border + var(--card) + radius 8~10px`): `hl-stat-card`, `hl-funnel-stage`, `hl-compare-card`, `hl-flow-step`, `hl-chip` — `HighlightDiagrams.scss` 내부에서만 5번 반복.
11. **`color-mix(in srgb, var(--accent) NN%, X)` 그림자/보더 레시피**: 파일 전역 30회 이상, 퍼센트 값(12/18/22/28/30/35/40/45/55/78/88%)이 표준화되어 있지 않음.
12. **브레이크포인트 리터럴**(§14): 26개 파일 전체.
13. **`font-family: var(--font-body), sans-serif`류 폴백 반복**: 약 20곳.
14. **원형 아이콘 버튼(닫기/네비) 스타일**: `ReadMe`(사각형이지만 유사 의도), `DiagramZoom`, `ProjectScreens`에서 각각.

---

## 16. 디자인 시스템으로 추출 가능한 컴포넌트

이미 존재하거나 명확히 뽑아낼 수 있는 컴포넌트 후보(§18 Primitive/Composite 제안과 연결):

- `GlassButton` — 이미 존재, 확장만 필요(§16 참고).
- `IconButton`(circle, glass/solid 2 variant) — theme-toggle, 캐러셀 nav-button, 라이트박스 close/nav, readme close-modal-btn 통합.
- `Card`(surface: base/elevated/accent, padding/radius 스케일) — ProjectCard 셸, hl-diagram-box, blog-post-card, README 컨테이너 통합.
- `Badge`/`Chip`(tone: neutral/accent/success/company/danger, state: default/highlighted) — 프로젝트 타입 배지, 스킬 칩, hl-chip/flow-step/compare-card 라벨 통합.
- `InfoListItem`(icon + title + content) — about-me/experiences 완전 중복 제거.
- `SectionHeader`(InfoHeader) — 이미 독립 컴포넌트, 토큰만 정리하면 됨.
- `Modal`/`Lightbox` 셸(overlay + frame + close + optional prev/next) — README 모달, DiagramZoom, ProjectScreens 라이트박스 통합.
- `StatCard`/`MiniWidgetCard` — HighlightDiagrams 내부 5variant 통합용 베이스.
- `HorizontalScrollStrip` — project-screens, filtering-button 모바일 스크롤 로직 통합.

---

## 17. 통합하거나 제거할 수 있는 스타일

- **완전 죽은 코드**: `Nav.scss:36-44`의 `.hire-me-btn`(마크업에서 주석 처리됨, `Nav.tsx:36`) — 스타일만 남아있어 제거 대상.
- **레거시 폰트 별칭**: `globals.scss:4-8`의 `--font-nanum-gothic-coding`, `--font-jua` 등 4개 — 전부 `--font-body`/`--font-display`로 매핑되어 실질적 구분 없음. 참조하는 곳(`Skills.scss:45`의 `--font-poesen-one`) 하나 정리하면 삭제 가능.
- **빈 미디어쿼리 블록**: `TopBtn.scss:16-17`(`@media (max-width:1024px) {}`) — 내용 없이 남아있음.
- **중복 정의 통합 대상**(§15와 동일): 정보 그리드 아이템, 프로젝트 타입 배지, 카드 피처 리스트, 확대 힌트 배지, 라이트박스 셸, fade keyframe.
- **CSS Module 단독 사용 정리**: `InfoHeader.module.scss` 하나만 CSS Module이라 컨벤션이 혼재 — 전역 클래스 방식으로 통일하거나, 반대로 신규 디자인 시스템에서 CSS Module/CSS-in-JS로 전환한다면 이 파일을 표준으로 확장.
- **`nav-button`(Projects) vs `GlassButton circle`**: 목적과 시각효과가 사실상 동일 — GlassButton으로 대체 가능.
- **`more-btn`(Navigator), 20px radius pill**: 표준 radius 스케일(8/10/12/16/18/999)에서 벗어난 유일한 값 — GlassButton pill로 흡수.

---

## 18. 제안

### 18-1. Foundation Token 후보

| 카테고리 | 제안 토큰 | 근거 |
|---|---|---|
| Color | 기존 `--bg/--bg-elevated/--bg-muted/--card/--text*/--border/--accent*/--glass-*` 유지 + **`--danger`, `--warning`, `--info` 신설**(현재 `#dc2626` 하드코딩 1건 해소) | §1 |
| Spacing | `--space-1..9` = `4/8/12/16/20/24/32/40/48/64/72px` 4px 그리드 | §3 |
| Radius | `--radius-sm(8) / -md(12) / -lg(16) / -xl(18) / -pill(999) / -full(50%)` | §4 |
| Shadow | `--shadow-xs/-sm/-md/-lg`(중립) + `--shadow-glow`(accent 틴트) + `--shadow-glass`(3겹 유리 프리셋 자체를 mixin/컴포지트 토큰으로) | §6 |
| Blur | `--blur-sm(8px)/-md(12~16px)/-lg(20~24px)` — 현재 4/8/10/20/24px로 파일마다 제각각인 backdrop-filter 강도 정리 | §7 |
| Motion | `--duration-fast(150ms)/-base(250ms)/-slow(350ms)`, `--ease-standard`, `--ease-bounce(cubic-bezier(0.34,1.56,0.64,1))`, `--ease-pop(cubic-bezier(0.22,1,0.36,1))` | §13 |
| Breakpoint | `$bp-xl(1439)/-lg(1024)/-md(768)/-sm(480)` SCSS 맵 + `respond-to()` mixin | §14 |
| Typography | `--text-2xs(10)/-xs(11~12)/-sm(13~14)/-md(15~16)/-lg(17~18)/-xl(22)/-2xl(26~28)/-3xl(32)/-display(56~60)` + `--font-weight-regular/-medium/-semibold/-bold/-black` | §2 |
| z-index | `--z-header(1000)/-mobile-nav(1100)/-fixed-cta(5000)/-modal(10000)/-lightbox(10050)/-lightbox-top(10060)` — 현재 하드코딩된 계층을 명시적 스케일로 승격 | §12 |

### 18-2. Primitive Component 후보

- `GlassSurface`(base mixin/컴포넌트) — 배경/보더/blur/3겹 그림자를 한 번에 적용하는 기반. `GlassButton`, 헤더, `nav-button`, 프로필 유리판이 모두 이걸 합성해서 쓰도록.
- `IconButton` — circle, size(sm/md/lg), tone(glass/solid/ghost).
- `Button`(=현재 GlassButton 확장) — shape(pill/circle/square), tone(neutral/accent/ghost/solid).
- `Badge`/`Chip` — tone(neutral/accent/success/company/danger), interactive(boolean, hover 강조 여부).
- `Card` — surface(base/elevated/glass), padding/radius 스케일 prop화.
- `Divider`/hairline — 반복되는 `border-bottom:1px solid var(--border)` 패턴 표준화.
- `Icon3D` (신규) — 기존 `react-icons` 자리 대체용 래퍼. 사이즈/톤 매칭 규약을 새로 정의해야 함(§11 참고).

### 18-3. Composite Component 후보

- `InfoListItem`(아이콘+타이틀+본문) — AboutMe/Experiences 통합.
- `SectionShell`(margin/scroll-margin 규칙을 감싸는 레이아웃 컴포넌트) — 6개 섹션 공통 셸.
- `ProjectTypeBadge`(company/team/personal) — ProjectCard/ReadMe 중복 제거.
- `MiniStatCard` 계열(`StatCard`, `FunnelStage`, `CompareCard`, `FlowStep`, `Chip`) — HighlightDiagrams 5variant를 하나의 `DiagramWidgetCard`로 합성.
- `Lightbox`(overlay+frame+close+optional prev/next) — README 모달, DiagramZoom, ProjectScreens 통합, z-index 스케일을 prop으로 주입.
- `HorizontalScrollStrip` — ProjectScreens/FilteringButton 모바일 가로 스크롤 통합.
- `CarouselNavButton` — Projects 캐러셀 화살표를 IconButton(glass) 기반으로 재구성.

### 18-4. Glass 스타일 적용이 적절한 부분

- **Header/모바일 Nav 드롭다운**: 이미 유리 적용 중, 톤/블러값만 토큰화하면 됨.
- **캐러셀 nav-button, TopBtn, 소셜 버튼(IntroductionBtns)**: 콘텐츠 위를 "떠다니는" 부유 컨트롤이라 유리 질감이 배경과의 분리감을 주는 데 효과적 — 이미 GlassButton/유사 구현 적용됨.
- **프로필 이미지 프레임(Introduction)**: 이미 유리판+shine 적용 중, 히어로 섹션의 핵심 장식 요소라 3D 아이콘/유리 신규 시스템의 쇼케이스로 확장하기 좋음.
- **필터 칩(FilteringButton), 라이트박스 close/nav 버튼**: 배경(사진/다이어그램) 위에 떠 있는 컨트롤이라 유리 적용 시 대비와 심미성 모두 개선 가능.
- **모달 오버레이 자체(README)**: 현재도 `backdrop-filter: blur(4px)`(`ReadMe.scss:12`) 적용 중 — 유지·강화 적합.

### 18-5. Glass 사용 시 오히려 가독성이 떨어질 부분

- **기술 스택 배지(Skills), 프로젝트 타입/스킬 칩(ProjectCard, ReadMe)**: 브랜드 고유색이 배경 그 자체로 정보값을 가지는 요소(예: React=하늘색, Next.js=검정) — 유리 반투명을 씌우면 브랜드 색 인식성이 떨어짐. **불투명 유지 권장**.
- **본문 텍스트 위 카드(Career, AboutMe, ReadMe 본문 섹션)**: 긴 텍스트를 담는 카드는 배경 대비가 핵심이라 유리의 "뒤가 비치는" 특성이 가독성 리스크. 표면은 불투명(`--card`/`--bg-elevated`) 유지, 테두리/그림자만 유리 룩의 라이트터치 적용 권장.
- **HighlightDiagrams의 통계/수치 카드**: 작은 폰트(9~13px)로 정확한 숫자를 전달해야 하는 위젯이라, backdrop-filter로 인한 대비 저하나 렌더링 성능(다수 카드 동시 blur) 문제가 우려됨.
- **CodeSnap 터미널**: 의도적으로 "불투명한 짙은 터미널" 룩을 유지하는 컴포넌트라 유리 적용이 컨셉과 충돌.
- **다크 텍스트가 필요한 좁은 배지(예: `is-dark-text` 버블)**: 반투명 유리 위에서는 배경에 따라 대비가 불안정해질 위험.

### 18-6. 3D Icon으로 교체하면 좋은 기존 asset

- **`AboutMe`/`Experiences` 정보 아이콘**(`IoPersonSharp`, `MdPlace`, `IoIosMail`, `RiGraduationCapFill`, 28px 단색) — 섹션당 3~4개뿐이고 시각적 임팩트가 낮아 3D 아이콘으로 바꿨을 때 효과가 가장 크게 체감되는 지점.
- **소셜/CTA 아이콘**(`IntroductionBtns`의 GitHub/Velog/Resume/Notebook, `FaArrowUp`) — 히어로 영역 최상단 노출 요소라 3D 아이콘 도입의 쇼케이스로 적합.
- **`ThemeToggle`의 해/달 아이콘** — 단일 토글이라 정교한 3D 아이콘(라이트/다크 두 상태) 하나만 제작하면 임팩트 대비 비용이 낮음.
- **기술 스택 배지 아이콘**(`skillsInfo.tsx`) — 단, 브랜드 로고 아이콘은 각 서비스의 공식 아이덴티티라 "3D화"는 임의 재해석이 될 위험이 있으므로, 로고 자체보다는 **배지의 배경/컨테이너(칩 셸)에 3D 느낌(입체 그림자·베벨)을 주는 방향**을 권장하고 로고 자체는 원본 유지 검토.
- **`project-card-info-project-type` / `read-me-project-type` 배지 아이콘화 여지** — 현재 텍스트뿐인 company/team/personal 배지에 작은 3D 아이콘(빌딩/사람들/개인)을 추가하면 스캔성이 좋아짐(현재는 아이콘 없음, 신규 추가 여지).
- **확대 힌트 배지(⤢, `LuExpand`)** — DiagramZoom/ProjectScreens에 반복 등장하는 작은 UI 힌트라, 3D 아이콘 하나로 통일하면 §15의 중복 제거와 3D 도입을 동시에 달성.
- **비교적 유지 권장(2D가 나은 곳)**: 캐러셀 화살표(`HiChevronLeft/Right`), 모달 닫기(`IoIosClose`) 등 **고빈도·저지속(hover 순간만 보임) 컨트롤 아이콘**은 3D화 시 오히려 인지 속도가 느려질 수 있어 플랫 아이콘 유지를 우선 검토.

---

## 부록: 조사 대상 파일 목록

```
src/styles/globals.scss
src/styles/Home.scss
src/styles/components/AboutMe.scss
src/styles/components/AmbientBackground.scss
src/styles/components/BlogPostCard.scss
src/styles/components/Career.scss
src/styles/components/CodeSnap.scss
src/styles/components/DiagramZoom.scss
src/styles/components/Experiences.scss
src/styles/components/FilteringButton.scss
src/styles/components/GlassButton.scss
src/styles/components/Header.scss
src/styles/components/HighlightDiagrams.scss
src/styles/components/Highlights.scss
src/styles/components/InfoHeader.module.scss
src/styles/components/Introduction.scss
src/styles/components/IntroductionBtns.scss
src/styles/components/KeywordBubbleChart.scss
src/styles/components/Nav.scss
src/styles/components/Navigator.scss
src/styles/components/ProjectCard.scss
src/styles/components/Projects.scss
src/styles/components/ProjectScreens.scss
src/styles/components/ReadMe.scss
src/styles/components/Skills.scss
src/styles/components/ThemeToggle.scss
src/styles/components/TopBtn.scss
+ 관련 .tsx 컴포넌트/목데이터 전체(react-icons 사용처 확인용)
```
