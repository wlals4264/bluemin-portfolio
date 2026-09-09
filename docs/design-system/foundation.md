# Foundation Token 명세

> 근거 문서: [[current-ui-audit]](./current-ui-audit.md) · [[visual-direction]](./visual-direction.md)
> 이 문서는 **토큰 명세**이며, `globals.scss`/컴포넌트 SCSS/React 코드는 수정하지 않는다. 실제 적용은 별도 migration 단계에서 진행한다.
> Astra Design System Review 이후, 이 문서와 [[visual-direction]] 사이의 상충 지점은 [[review-decision]](./review-decision.md)에서 공식 조정되었다. 상충 시 review-decision.md가 우선한다.

## 원칙 (재확인)

1. **기존 토큰을 무조건 교체하지 않는다.** `globals.scss`에 이미 있는 토큰은 값과 이름을 그대로 유지하고, 부족한 부분만 semantic token으로 보강한다.
2. **새 토큰은 실제로 반복되는 값 또는 [[visual-direction]]의 5-Level Depth System에서 의미를 갖는 경우에만 추가**한다. 추측성 세분화(예: 쓰이지도 않는 `warning`/`info` 상태색, 불필요한 4단계 radius)는 만들지 않는다.
3. 모든 새 값은 [[current-ui-audit]]에서 실측된 값의 **클러스터링 결과**다 — 임의로 새 숫자를 발명한 곳은 각주로 명시한다.

---

## 1. Color

### 1-1. 분류 체계

| 분류 | 정의 | 이 코드베이스에서의 실태 |
|---|---|---|
| Primitive Color | 다른 모든 색의 근거가 되는 원시 값(HEX/RGB) | 현재 별도 primitive 계층이 없음 — semantic token이 HEX를 직접 들고 있음(예: `--accent: #2563eb`) |
| Semantic Color | 역할(의미) 기준 색 | `--accent`, `--success`, `--company` 등 이미 존재 |
| Surface Color | 배경/표면 | `--bg`, `--bg-elevated`, `--bg-muted`, `--card` |
| Text Color | 텍스트 | `--text`, `--text-muted`, `--text-soft` |
| Border Color | 테두리 | `--border` (1종류뿐) |
| Accent Color | 브랜드/강조 | `--accent`, `--accent-hover`, `--accent-soft`, `--accent-contrast` |
| Status Color | 상태 신호 | `--success`, `--company`만 존재, `danger` 누락 |
| Glass Color | Level 3 유리 표면 전용 | `--glass-bg`, `-strong`, `--glass-border`, `--glass-highlight`, `--glass-specular`, `--glass-shadow` |

**판단: Primitive Color 계층을 새로 만들 필요는 없다.** 현재 각 semantic 색은 서로 다른 HEX 1개씩만 참조하고 있어(예: `--accent`가 참조하는 파란색을 다른 3개 이상의 semantic 토큰이 재사용하는 경우가 없음), primitive 계층을 분리해도 중복 제거 효과가 거의 없다. 유일한 예외는 Glass Color 5종이 전부 `rgba(255,255,255, α)`(다크 모드는 동일 white, 라이트는 대부분 white 기반) 형태로 **같은 베이스 컬러의 알파 변주**라는 점이다 → §1-6에서 신규 토큰 후보로 별도 제안(우선순위 낮음, 필수 아님).

### 1-2. Surface Color — 유지

```
--bg            /* 페이지 배경 */
--bg-elevated   /* 카드보다 한 단 낮은 표면(다이어그램 박스, readme 섹션) */
--bg-muted      /* 배지·보조 표면 */
--card          /* 카드 배경 */
```
그대로 유지. Depth Mapping(§11)에서 Level 0~2에 각각 대응시킨다.

### 1-3. Text Color — 유지 + 역할 명시만 보강

```
--text          /* 본문 */
--text-muted    /* 보조 텍스트, 라벨 */
--text-soft     /* 본문보다 약하지만 muted보다 강한 중간 톤 */
--accent-contrast /* accent 배경 위 텍스트 — "text-on-accent" 역할로 재문서화 */
```
새 변수를 추가하지 않는다. `--accent-contrast`가 이미 "강조 배경 위 텍스트" 역할을 하고 있으므로 별도 `--text-on-accent`를 만들면 동일한 값을 가리키는 별칭이 하나 더 생길 뿐이다(불필요한 세분화).

### 1-4. Border Color — 유지 + semantic 변형 2종 신규

현재 `--border` 하나뿐이고, "accent가 살짝 섞인 강조 테두리"는 컴포넌트마다 `color-mix(in srgb, var(--accent) N%, var(--border))`를 즉석으로 조합해 왔다. 실측 비율 분포(전체 26개 파일 스캔):

| 비율 | 등장 횟수 |
|---|---|
| 35% | 5 |
| 28% | 4 |
| 45% | 3 |
| 30% | 2 |
| 기타(12~88% 사이 단발성) | 각 1~2 |

35%가 최빈값이고 28%가 그 다음으로 근접 클러스터를 이룬다. **신규 토큰**(반복 값 기준 정당화됨):

```
--border-accent-subtle: color-mix(in srgb, var(--accent) 35%, var(--border));
--border-accent-strong: color-mix(in srgb, var(--accent) 45%, var(--border));
```

28% 클러스터는 35%로 흡수(migration 시 시각 차이 미미), 그 외 단발성 비율(12/14/16/18/22/26/30%)은 이번 단계에서 토큰화하지 않고 point-of-use `color-mix`로 남겨둔다 — 반복성이 낮아 토큰화 실익이 없다.

### 1-5. Accent Color — 유지

```
--accent / --accent-hover / --accent-soft / --accent-contrast
```
그대로 유지. 추가 제안 없음.

### 1-6. Glass Color — 유지 + (선택) 신규 primitive 1개

```
--glass-bg / --glass-bg-strong
--glass-border
--glass-highlight
--glass-specular
--glass-shadow
```
6개 전부 유지. Level 3(Glass Control)의 핵심 토큰이며 [[visual-direction]] §2-3과 정확히 대응한다.

**선택적 신규 토큰(우선순위 낮음)**: 라이트 모드 5종 중 4종(`--glass-bg`, `-strong`, `--glass-border`, `--glass-highlight`, `--glass-specular`)이 전부 `rgba(255,255,255, α)`으로 베이스 컬러가 동일하다. 알파값만 다른 반복이므로:

```
--glass-base: 255 255 255; /* RGB 채널만, 라이트 모드 전용 — 다크 모드는 채널이 아닌 별도 저알파 백색 계열을 그대로 유지하므로 이 토큰을 공유하지 않는다 */
```
을 두고 `rgb(var(--glass-base) / 0.55)` 식으로 5종을 파생시킬 수 있다. **다만 이건 "코드 중복 제거"이지 "디자인 의미 추가"가 아니므로 원칙 3에 따라 이번 Foundation 확정 목록(§12)에는 넣지 않고, migration 단계에서 SCSS 리팩토링 편의를 위한 선택지로만 남겨둔다.**

### 1-7. Status Color — `--danger` 1개만 신규 추가

현재 `--success`, `--company` 2개만 있고 `--danger`는 없어 `ProjectCard.scss:221`이 `#dc2626`을 직접 하드코딩하고 있다(audit §1-2). 이 1건이 유일하게 실측된 상태색 공백이므로 **딱 이만큼만** 추가한다.

```
--danger        (light: #dc2626 / dark: #f87171)
```
`--warning`, `--info`는 현재 코드베이스 어디에도 필요가 없다(사용처 0건) → **추가하지 않는다**(원칙 2·3).

---

## 2. Spacing & Layout

### 2-1. Spacing Scale

Audit §3에서 확인된 실측 spacing 값(4/6/8/10/12/14/16/18/20/22/24/28/30/32/36/40/48/56/64/72px, 19종)을 4px 그리드에 스냅해 11단계로 정규화한다.

| 토큰 | 값 | 흡수하는 기존 값 |
|---|---|---|
| `--space-1` | 4px | 4 |
| `--space-2` | 8px | 6, 8 |
| `--space-3` | 12px | 10, 12, 14 |
| `--space-4` | 16px | 16, 18 |
| `--space-5` | 20px | 20, 22 |
| `--space-6` | 24px | 24, 28 |
| `--space-7` | 32px | 30, 32, 36 |
| `--space-8` | 40px | 40 |
| `--space-9` | 48px | 48, 56 |
| `--space-10` | 64px | 64 |
| `--space-11` | 72px | 72 |

11단계가 많아 보일 수 있지만, 실측 19종을 그대로 두는 것보다는 뚜렷한 개선이며, 각 단계가 최소 1곳 이상의 실제 값에 대응한다(추측성 단계 없음). `56px`(라이트박스 padding)과 `30px`(TopBtn 우측 여백)처럼 스케일에서 조금 벗어나는 값은 인접 단계로 스냅한다 — 각각 4px(56→48), 2px(30→32) 차이라 시각적 영향은 미미하다.

### 2-2. Semantic Layout Token — `--section-gap`, `--header-offset`

audit §3에서 지적된 두 반복 값의 **역할을 분리해서 분석**한 결과:

- `margin: 72px 0;`(섹션 간 수직 리듬) — `AboutMe`, `Career`, `Experiences`, `Skills`, `Projects` 등 6개 섹션 컨테이너
- `scroll-margin-top: 72px;`(고정 헤더에 앵커가 가리지 않도록 하는 스크롤 오프셋) — 같은 6개 컨테이너

두 값이 현재 우연히 같은 숫자(72px)를 쓰고 있지만 **의미가 다르다**: 전자는 "섹션 사이 리듬감(디자인 결정)"이고 후자는 "헤더 실제 높이에 종속된 값(레이아웃 제약)"이다. 헤더 높이가 나중에 바뀌면 후자만 바뀌어야 하는데 지금처럼 같은 숫자를 두 곳에 따로 박아두면 그 연결이 코드에 드러나지 않는다. → **두 개의 별도 semantic 토큰으로 분리**한다.

```
--section-gap: var(--space-11);      /* 72px — 섹션 간 수직 리듬. 값이 바뀌면 시각적 리듬만 바뀜 */
--header-offset: var(--space-11);    /* 72px — 헤더 높이 기반 스크롤 오프셋. 값이 바뀌면 헤더 실제 높이와 반드시 같이 맞춰야 함 */
```

두 토큰이 지금은 같은 값을 참조하지만 **독립적으로 재정의 가능**하도록 분리해두는 것이 핵심이다 — 예를 들어 모바일에서 헤더 높이가 달라지면 `--header-offset`만 미디어쿼리 안에서 재정의하면 되고 `--section-gap`(리듬감)은 건드릴 필요가 없다.

---

## 3. Typography

### 3-1. 폰트 패밀리 — 역할 제한

```
--font-body     (Noto Sans KR) → Body / Label / Caption 전용
--font-display  (Poetsen One)  → Display / Heading, 그리고 브랜딩성 강조 텍스트 전용
```

**Poetsen One은 영문 전용 디스플레이 폰트라 한글에는 적용되지 않는다**(폰트에 한글 글리프가 없어 fallback으로 `--font-body`가 렌더링됨) — 즉 지금도 실질적으로는 "영문 대문자/숫자 조합에만 보이는 장식 폰트"로 동작 중이다. 이 특성을 그대로 원칙화한다: **Poetsen One은 짧은 영문 라벨(로고, 섹션 인덱스, 배지)에만 쓰고, 문장 단위 텍스트에는 쓰지 않는다.** 현재도 대체로 이 규칙을 따르고 있으나(`career-company`, `project-card-title` 등 짧은 고유명사 위주), 명문화된 적은 없었다.

**레거시 별칭 정리**: `--font-sans`, `--font-nanum-gothic-coding`, `--font-jua` — 코드베이스 전체에서 참조하는 곳이 **0건**(grep 확인 완료). → §14 Deprecated 대상. `--font-poesen-one`은 `Skills.scss:45` 단 1곳에서만 참조 — 그 1곳을 `var(--font-display)`로 바꾸는 순간 함께 제거 가능(§17 migration 우선순위에 포함).

### 3-2. Type Scale (rem 기준, base 16px)

audit §2-2에서 확인된 13단계(60/56/32/28/26/22/18/17/16/15/14/13/12/11/10/9/8px, 실제로는 16종에 가까움)를 **역할(Display/Heading/Body/Label/Caption) 기준 8단계**로 정리한다.

| 토큰 | rem | px(참고) | 역할 | 현재 대응 값 |
|---|---|---|---|---|
| `--text-display` | 3.5rem | 56px | Display(히어로 h1) | 56, 60(강조 span) |
| `--text-heading-lg` | 2rem | 32px | Heading — 큰 섹션/모달 제목 | 32, 28(InfoHeader) |
| `--text-heading-md` | 1.375rem | 22px | Heading — 카드/경력 제목 | 22, 26(project-card-title 상한) |
| `--text-heading-sm` | 1.0625rem | 17px | Heading — 소제목 | 17, 18 |
| `--text-body` | 0.9375rem | 15px | Body — 본문 | 15, 16 |
| `--text-body-sm` | 0.875rem | 14px | Body — 보조 본문 | 14, 13 |
| `--text-label` | 0.75rem | 12px | Label — 라벨/배지/캡션 상위 | 12, 11 |
| `--text-caption` | 0.6875rem | 11px | Caption — 최소 크기 | 11, 10, 9, 8 |

- `clamp()` 기반 유동 크기(`--text-heading-md`가 히어로/카드 제목에서 뷰포트에 따라 22~26px로 움직이는 경우 등)는 토큰 자체를 `clamp(1.375rem, 2.4vw, 1.625rem)`처럼 **정의할 수 있으나, 이번 단계에서는 고정 rem 값만 확정**하고 clamp 적용 여부는 컴포넌트 명세 단계에서 개별 판단한다(용도별로 clamp 필요성이 다르기 때문).
- 8px/9px 같은 극소 캡션(퍼널 서브 라벨 등)은 `--text-caption`(11px)보다 작지만, 실제로는 "다이어그램 목업 안에서만" 쓰이는 특수 사례라 별도 토큰을 만들지 않고 `--text-caption`을 하한으로 스냅한다 — 원칙 3(과도한 세분화 금지).

### 3-3. Font Weight

```
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
--font-weight-black: 800
```
현재 `bold` 키워드(1곳)는 `700`으로 통일. 5단계는 audit에서 실측된 400/500/600/700/800 그대로이며 더 줄이거나 늘릴 근거가 없다.

### 3-4. Line Height & Letter Spacing

새로운 숫자를 발명하지 않고 **현재 코드베이스가 실제로 쓰는 값**을 역할별로 묶는다.

| 토큰 | 값 | 적용 대상 |
|---|---|---|
| `--leading-tight` | 1.2 | Display/큰 Heading |
| `--leading-snug` | 1.35 | Heading (전역 `h1~h4` 기본값과 동일, `globals.scss:113`) |
| `--leading-normal` | 1.55 | Body |
| `--leading-relaxed` | 1.65~1.75 | 긴 본문(README 서술, career-summary) |
| `--tracking-tight` | -0.02em | Heading/Display(`globals.scss:114`와 동일) |
| `--tracking-normal` | -0.01em | Body(전역 기본값, `globals.scss:93`과 동일) |
| `--tracking-wide` | 0.04~0.1em | Uppercase 라벨(`hl-diagram-title`, `readme-section-title` 등) |

`--leading-relaxed`는 1.65~1.75 사이 값이 섞여 있어 폭을 허용 — 완전히 하나의 숫자로 강제하면 긴 한국어 문단의 줄간격 미세 조정 여지가 사라지므로, 이 토큰만 예외적으로 "권장 범위"로 문서화한다.

---

## 4. Radius

audit §4에서 확인된 값(8/10/12~14/16~18/20/999/50%)을 클러스터링한 결과, **`sm/md/lg/pill/full` 5단계면 충분**하고 별도 `xl`은 필요 없다는 결론이다.

| 토큰 | 값 | 흡수하는 기존 값 | 대표 사용처 |
|---|---|---|---|
| `--radius-sm` | 8px | 8 | 배지, 스텝 카드, 확대 힌트 배지 |
| `--radius-md` | 12px | 10, 12, 14 | 입력/소형 버튼/중간 카드/섹션 박스 |
| `--radius-lg` | 16px | 16, 18 | 프로젝트 카드, 모달, 스크린샷 아이템 |
| `--radius-pill` | 999px | 999, **20(레거시)** | 버튼, 칩, 스킬 배지 |
| `--radius-full` | 50% | 50% | 원형 아바타/아이콘 버튼/도트 |

**`xl` 티어는 도입하지 않는다.** 현재 `lg`(16~18px)보다 큰 non-pill 반경이 실제로 쓰이는 곳이 없고, [[visual-direction]]의 Level 4(3D Object)도 반경 개념이 없는(투명 배경) 레벨이라 `xl`을 미리 만들어둘 근거가 없다 — 원칙 2·3에 따라 보류.

**20px 레거시 값 판단**: `Nav.scss`의 `.hire-me-btn`(현재 마크업에서 주석 처리되어 미사용, audit §17)과 `Navigator.scss`의 `.more-btn`(사용 중)에서만 쓰인다. 두 버튼 모두 높이가 40~44px인 고정 높이 버튼이라, `border-radius: 20px`는 사실상 "그 버튼 높이의 절반"을 하드코딩한 것 — 의도 자체가 pill(알약형)이었다고 판단한다. **결론: 20px는 별도 티어로 승격하지 않고 `--radius-pill`(999px)로 흡수**한다. 999px든 높이/2든 고정 높이 버튼에서는 시각적으로 동일한 알약 모양이 나오므로 손실이 없다.

---

## 5. Shadow

Light/Dark 값은 기존 `--shadow`(중립 그림자 색, light `rgba(15,23,42,.08)` / dark `rgba(0,0,0,.45)`)를 그대로 베이스로 사용한다 — 새 그림자 색을 발명하지 않는다.

### 5-1. 중립 Shadow Scale (Level 1~2용)

| 토큰 | 값 | 대응하는 기존 값 |
|---|---|---|
| `--shadow-xs` | `0 1px 2px var(--shadow)` | 기본 카드(`ProjectCard.scss:53`) |
| `--shadow-sm` | `0 6px 14px var(--shadow)` | 스크린샷/블로그 카드 hover |
| `--shadow-md` | `0 10px 22px var(--shadow)` | 헤더(`0 8px 30px`), 캐러셀 nav-button 기본 |
| `--shadow-lg` | `0 16px 48px var(--shadow)` | 모달(README) |
| `--shadow-xl` | `0 24px 64px rgba(0,0,0,.5)` | 라이트박스 프레임(항상 어두운 오버레이 위이므로 다크값 고정, 테마 무관) |

### 5-2. Accent Glow (hover 강조, Level 2→3 전이에 사용)

accent 틴트 그림자는 컴포넌트마다 `color-mix` 퍼센트가 제각각이었다(audit §6-2번 계열). 실측 분포에서 accent 틴트 그림자에 가장 많이 쓰인 퍼센트대(22~35%)를 기준으로 2단계만 정의한다.

```
--shadow-glow-sm: 0 8px 20px color-mix(in srgb, var(--accent) 22%, transparent);
--shadow-glow-md: 0 14px 30px color-mix(in srgb, var(--accent) 35%, transparent);
```

### 5-3. Glass Shadow 3겹 레시피 (Level 3 전용)

`GlassButton.scss:23-26`에서 확인된 "outer + inset highlight + inset dark" 3겹 구조를 표준 레시피로 고정한다. 개별 값이 아니라 **조합 자체가 반복되는 패턴**이므로 세 요소를 각각 토큰화하고, 실제 적용은 세 토큰을 나열하는 방식으로 통일한다.

| 토큰 | Light | Dark |
|---|---|---|
| `--shadow-glass-outer` | `0 8px 20px var(--glass-shadow)` | `0 8px 20px var(--glass-shadow)` (glass-shadow 자체가 테마별로 이미 다름) |
| `--shadow-glass-highlight` | `inset 0 1px 0 var(--glass-highlight)` | 동일(토큰 참조) |
| `--shadow-glass-inner` | `inset 0 -1px 1px rgba(0,0,0,.06)` | `inset 0 -1px 1px rgba(0,0,0,.14)` |

`--shadow-glass-inner`만 라이트/다크에서 알파값이 다르다(다크 배경 위 유리는 아랫면 음영이 더 뚜렷해야 입체감이 유지됨 — 기존 `GlassButton.scss`의 hover 상태 값(.08~.14)에서 실측). 세 토큰을 합성한 최종 `box-shadow`는 컴포넌트 단에서 `var(--shadow-glass-outer), var(--shadow-glass-highlight), var(--shadow-glass-inner)`로 나열한다(CSS는 다중 `box-shadow` 값을 콤마로 이어붙이는 것을 지원하므로 이 조합 자체를 하나의 토큰으로 미리 합쳐두면 개별 레이어 커스터마이징이 막히기 때문에 3개로 분리 유지).

---

## 6. Glass (Surface 조합)

Glass Color(§1-6)와 Blur(§7)를 조합한 "Level 3 표면 레시피"를 명시적으로 정의해 컴포넌트 명세 단계에서 그대로 참조할 수 있게 한다.

| 요소 | 토큰 | 역할 |
|---|---|---|
| 배경 | `--glass-bg` / `--glass-bg-strong`(hover) | 반투명 표면 |
| 테두리 | `--glass-border` | 유리 테두리 |
| 스페큘러 그라디언트 | `--glass-specular` | `::before` 상단 하이라이트 그라디언트 시작색 |
| 그림자 | §5-3의 3겹 레시피 | 입체감 |
| 블러 | `--blur-sm`/`-md`/`-lg`(§7, 용도별) + `saturate(180%)` | 뒤 배경 흐림 + 채도 증폭. 블러 강도는 표면의 역할에 따라 3단계로 달라지지만, `saturate(180%)`는 모든 Level 3 표면에서 고정 |

`saturate(180%)`는 값 하나뿐이고 모든 유리 표면에서 동일하게 쓰여야 "같은 재질"로 인식되므로 별도 토큰화 없이 고정 상수로 문서화한다(토큰화하면 오히려 컴포넌트마다 다른 채도를 쓰도록 유도하는 셈이라 원칙 3에 위배).

### 6-1. Glass 재질 일관성 원칙 ([[review-decision]] Decision 3)

이전 버전은 "모든 Level 3 Glass는 `--blur-lg`(24px)를 사용한다"는 단일 규칙으로 재질 일관성을 보장하려 했으나, 이는 §7의 용도별 blur 스케일과 상충했다(astra-review §3). **이 고정 규칙은 폐기한다.**

Glass 표면의 blur는 다음 semantic usage로 결정한다(§7 참고):

- `--blur-sm` = small glass control
- `--blur-md` = button / navigation
- `--blur-lg` = large floating surface / modal

대신 Glass 재질의 "같은 재질처럼 보임"은 blur 값이 아니라 다음 다섯 요소의 조합으로 유지한다.

1. glass background (`--glass-bg` / `-strong`)
2. glass border (`--glass-border`)
3. highlight (`--shadow-glass-highlight`)
4. specular (`--glass-specular`)
5. saturation (`saturate(180%)`, 고정)

---

## 7. Blur (backdrop-filter)

audit §7에서 확인된 4/8/10/20/24px 값을 3단계로 정리한다. [[review-decision]] Decision 3에 따라, 이 3단계는 **표면의 역할(semantic usage)** 기준으로 정의한다 — "모든 Level 3는 24px" 같은 단일 고정값 규칙은 폐기했다.

| 토큰 | 값 | Semantic Usage | 흡수/대응하는 기존 값 |
|---|---|---|---|
| `--blur-sm` | 8px | small glass control | 8(프로필 유리판), 10(캐러셀 nav-button) |
| `--blur-md` | 16px | button / navigation | *(신규 — 아래 설명 참고)* |
| `--blur-lg` | 24px | large floating surface / modal | 24(Header) |

`--blur-md`(16px)는 현재 정확히 일치하는 기존 값이 없는 **유일한 신규 수치**다 — 근거: "button/navigation" 용도(GlassButton, 모바일 Nav 드롭다운 등)는 Header 같은 대형 floating surface만큼 진한 블러(`lg`)가 항상 필요하지는 않지만, 프로필 유리판 수준의 옅은 블러(`sm`)로는 버튼이 배경 위에서 떠 있다는 신호로 약하다 — 그 중간값이 필요한 semantic usage가 이미 정의되어 있으므로 "추측성 세분화"가 아니라 **다음 단계에서 쓰일 게 확정된 신규 토큰**으로 등록한다.

개별 컴포넌트를 어느 tier에 최종 배정할지(예: GlassButton을 `md`로 낮출지, 캐러셀 nav-button을 `md`로 올릴지)는 이 문서에서 전부 확정하지 않는다 — semantic usage 원칙만 Foundation 레벨에서 고정하고, 컴포넌트별 배정은 컴포넌트 명세/PoC 단계에서 이 원칙을 기준으로 판단한다.

모달 오버레이의 `blur(4px)`(`ReadMe.scss:12`)는 3단계 스케일보다 작은 값이지만, 의도적으로 "배경을 거의 그대로 보여주면서 아주 살짝만 흐리는" 효과라 `--blur-sm`(8px)으로 올리면 시각적 의도가 바뀐다 → **스케일에 편입하지 않고 예외로 유지**, 이름은 `--blur-overlay: 4px`로 별도 문서화(모달 오버레이 전용, 범용 아님을 이름에서부터 명시).

---

## 8. Motion

### 8-1. Duration

| 토큰 | 값 | 흡수하는 기존 값 |
|---|---|---|
| `--duration-fast` | 150ms | 100, 150 |
| `--duration-base` | 250ms | 200, 250, 280 |
| `--duration-slow` | 350ms | 300, 350 |

### 8-2. Easing

audit §13-1에서 실측된 커브가 정확히 3종이라 **그대로 이름만 붙인다**(발명 없음).

| 토큰 | 값 | 기존 사용처 |
|---|---|---|
| `--ease-standard` | `ease` | 대다수 hover/color 전환 |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `GlassButton`, `ProjectCard` 버튼 hover |
| `--ease-pop` | `cubic-bezier(0.22, 1, 0.36, 1)` | `KeywordBubbleChart` 버블 등장 |

### 8-3. 적용 규칙 ([[visual-direction]] §2-5 연동)

- Level이 바뀌는 hover 전환(예: Level 2 카드 → hover 시 그림자 강조)에는 `--duration-base` + `--ease-standard` 또는 `--ease-bounce`를 사용한다.
- 등장 애니메이션(모달 fade, 버블 pop)에는 `--duration-fast`~`--duration-base` + `--ease-pop`을 사용한다.
- **continuous(infinite) 애니메이션에는 이 duration 토큰을 적용하지 않는다** — `glass-shine-sweep`(6s), `read-me-pulse`/`shimmer`(1.8s), `keyword-float`(5.5~6.2s)는 [[visual-direction]] §2-5에서 이미 "재검토 대상"으로 표시했고, 이 값들은 fast/base/slow 3단계 스케일이 애초에 상정하는 "상호작용 반응 속도"와 성격이 다른 "주변부 장식 리듬"이므로 별도 스케일(`--duration-ambient` 류)이 필요한지는 해당 애니메이션의 존치 여부가 결정된 **이후에** 판단한다(지금 토큰화하면 존치를 기정사실화하는 셈이라 보류).

### 8-4. `prefers-reduced-motion` 전략

이전 버전은 "Duration을 0에 가깝게 줄이고 즉시 스냅"과 "더 짧은 대체 애니메이션(예: 0.35s)으로 교체"를 동시에 표준으로 제시해 서로 모순됐다(astra-review §11). [[review-decision]] Decision 6에 따라 다음 하나의 원칙으로 통합한다.

Reduced Motion에서는 다음을 기본으로 한다:

- **continuous animation 제거** — `glass-shine-sweep`, `keyword-float` 등 반복 재생되는 장식 애니메이션은 정지하고 정적 최종 프레임으로 대체한다(`Introduction.scss:162-169`의 `animation: none; opacity: 0.4;` 패턴을 표준으로 삼는다).
- **장식적 transform 제거** — shine sweep, float, pulse, shimmer처럼 정보 전달과 무관한 transform은 제거한다.
- **scale / translate 최소화 또는 제거** — hover의 `translateY`, `scale` 같은 공간 이동은 줄이거나 없앤다.
- **opacity / color 중심의 상태 변화 사용** — 위치·크기가 아니라 투명도·색상 변화로 상태를 전달한다.

**상태 변화 자체는 유지하되, 공간 이동만 최소화한다** — "애니메이션을 아예 없앤다"가 아니라 "이동을 없애고 opacity/color 변화로 상태를 전달한다"가 기본 원칙이다. 예를 들어 `keyword-pop`의 reduced-motion 대응은 translate/scale 없이 opacity 전환만 사용하도록 재작성하는 것을 표준으로 삼는다(기존 `KeywordBubbleChart.scss:176`의 `animation: keyword-pop 0.35s ease both !important;`는 이 원칙에 맞게 재검토 대상).

신규로 추가되는 모든 애니메이션(3D 아이콘의 등장 효과 등 포함)은 이 원칙을 **필수로** 따라야 하며, 이 규칙 자체를 Foundation 레벨의 "motion 토큰 사용 계약"으로 문서화한다 — 개별 값이 아니라 프로세스 규칙이지만, Foundation 문서에 있어야 이후 컴포넌트 명세들이 일관되게 참조할 수 있다.

---

## 9. Breakpoint

### 9-1. 기본 스케일 채택

```
$bp-xl: 1439px   /* 중형 모니터 */
$bp-lg: 1024px   /* 노트북 */
$bp-md: 768px    /* 태블릿 */
$bp-sm: 480px    /* 모바일 */
```

### 9-2. One-off 값 검토

| One-off 값 | 위치 | 판단 |
|---|---|---|
| `1280px` | `Nav.scss` (nav 폰트/gap 축소 시점) | 헤더 로고+내비+CTA가 좁아지며 겹치기 시작하는 지점을 `1439`(xl)보다 늦게 잡은 것으로 추정. **`$bp-xl`(1439)로 흡수 권장** — 축소 시점을 1439로 앞당겨도 그 사이 구간(1280~1439px)에서 잃는 여백은 미미하고, 브레이크포인트 수를 늘리지 않는 이득이 더 크다. 다만 실제 스냅 시 겹침이 생기는지는 **시각 검증이 필요**(이 문서에서 코드를 바꾸지 않으므로 migration 단계의 QA 항목으로 남긴다). |
| `560px` | `HighlightDiagrams.scss` (스텝싱크/퍼널 그리드 열 수 축소) | `$bp-sm`(480)과 `$bp-md`(768) 사이 — 다이어그램 카드가 유독 좁은 공간에서 열이 깨지는 지점을 별도로 잡은 것으로 보인다. **`$bp-md`(768)로 흡수 권장**(768 이하에서 이미 다른 컴포넌트들도 레이아웃을 바꾸므로 같은 지점에서 함께 바뀌는 편이 예측 가능성이 높음). 다만 768에서 바로 축소하면 768~560px 구간에서 다이어그램이 상대적으로 넓게 나오는 과도기가 생길 수 있어 **역시 시각 검증 필요**. |

두 값 모두 "존재 이유가 아예 없는" 임의값은 아니지만(각각 특정 컴포넌트의 좁아지는 지점을 잡은 의도가 있음), Foundation 토큰 원칙(원칙 2·3)상 **검증되지 않은 2개의 추가 브레이크포인트를 스케일에 영구 편입시키기보다는, 먼저 기본 4단계로 흡수를 시도**하는 쪽을 권장한다. 흡수 후 실제로 레이아웃이 깨지면 그때 "예외가 필요하다"는 근거가 생기므로, 그 시점에 다시 전용 브레이크포인트로 복원해도 늦지 않다.

### 9-3. SCSS Mixin 전략 (문서화, 미적용)

```scss
// 향후 도입 시 참고용 — 이 문서 자체는 코드를 만들지 않는다
@use 'sass:map';

$breakpoints: (
  'sm': 480px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1439px,
);

@mixin respond-to($key) {
  @media (max-width: map.get($breakpoints, $key)) {
    @content;
  }
}

// 사용 예
.home-wrapper {
  width: 70vw;

  @include respond-to('xl') { width: 80vw; }
  @include respond-to('lg') { width: 85vw; }
  @include respond-to('md') { width: 100%; }
}
```

현재 26개 scss 파일이 전부 `@media (max-width: 768px) { ... }` 리터럴을 직접 쓰고 있으므로(audit §14), migration 시 이 mixin으로 **일괄 치환**하는 것이 1순위 기계적 작업이 된다(§17).

---

## 10. Z-index

[[review-decision]] Decision 7에 따라 **Global stacking**(전역 UI Layer)과 **Local stacking**(컴포넌트 내부 지역 스택)을 구분한다. 전역 토큰 등록 의무는 Global stacking에만 적용한다 — 모든 `z-index`를 전역 표에 등록하도록 한 이전 규칙은 지역적 겹침까지 포괄해 범위가 과했다(astra-review Simplify).

### 10-1. Global Stacking — semantic 토큰 사용

audit §12에서 확인된 계층(`z-index` 리터럴 6종)을 semantic 토큰으로 고정한다. 다른 컴포넌트/섹션의 콘텐츠 위에 페이지 전체 컨텍스트에서 떠야 하는 요소(헤더, 모달, 라이트박스 등)가 대상이다.

| 토큰 | 값 | 현재 대응 |
|---|---|---|
| `--z-header` | 1000 | `Header.scss` 헤더, `Nav.scss` 모바일 드롭다운(헤더와 같은 레이어로 동작) |
| `--z-nav-toggle` | 1100 | `Nav.scss` 햄버거 버튼 — 드롭다운이 열려도 항상 클릭 가능해야 하므로 헤더보다 한 단 위 |
| `--z-fixed-cta` | 5000 | `TopBtn.scss` |
| `--z-modal` | 10000 | `ReadMe.scss` 모달 |
| `--z-lightbox` | 10050 | `ProjectScreens.scss` 스크린샷 라이트박스 |
| `--z-lightbox-top` | 10060 | `DiagramZoom.scss` 다이어그램 확대(다른 모든 오버레이보다 위) |

**규칙**: Global stacking에 새로운 겹침 레이어가 필요하면 이 표에 먼저 이름과 순서를 추가한 뒤(이 문서를 갱신) 구현한다 — audit에서 지적된 "숫자가 컴포넌트마다 주석으로만 설명되어 있고 근거 문서가 없던" 상태(`DiagramZoom.scss:43`)를 해소한다.

### 10-2. Local Stacking — 전역 등록 대상 아님

컴포넌트 내부에서만 의미를 갖는 겹침은 전역 토큰으로 등록하지 않는다. 예: 카드 안에서 배지가 같은 카드의 다른 레이어 위에 오는 경우, `::before`/`::after` 장식 pseudo-element의 순서 등. `position: relative` 컨테이너 안에서 `z-index: 1` 같은 작은 로컬 값을 그대로 사용해도 된다 — 이 값은 같은 stacking context 안에서만 유효하고 전역 레이어와 절대 비교되지 않으므로 전역 스케일에 편입할 필요가 없다.

**구분 기준**: "이 요소가 다른 컴포넌트/섹션의 콘텐츠 위에 떠야 하는가?"라면 Global stacking 대상, "같은 컴포넌트 내부의 레이어 순서 문제일 뿐인가?"라면 Local stacking 대상이다.

---

## 11. Depth Mapping — [[visual-direction]] 5-Level ↔ Foundation Token

가장 중요한 섹션. 이후 컴포넌트별 migration 작업은 이 표를 참조해 "이 요소가 어떤 Level인지" 먼저 판정하고, 해당 Level의 토큰 조합을 그대로 적용하는 방식으로 진행한다.

**Level은 shadow 크기의 단계가 아니라 UI 요소의 역할(role)을 나타낸다**([[review-decision]] Decision 4). Level 0~2는 [[visual-direction]] §0의 Content, Level 3은 Control, Level 4는 Concept에 대응한다. 다만 두 Level이 토큰 조합만으로 실제 화면에서 항상 시각적으로 구분되는지는 별개 문제이며(특히 다크 모드에서 Level 1/2가 같은 값을 참조하는 경우), 이는 [[review-decision]]의 Deferred to PoC 항목에서 브라우저로 검증한다.

| Level | 이름 | Surface | Border | Shadow | Blur | Z-index 관례 |
|---|---|---|---|---|---|---|
| **0** | Canvas | `--bg` | 없음 | 없음 | 없음 | (배경, z-index 없음/음수) |
| **1** | Surface | `--bg-elevated` / `--bg-muted` | 없음 또는 `--border` (hairline) | 없음 또는 `--shadow-xs` | 없음 | 기본 문서 흐름 |
| **2** | Content | `--card` | `--border` (hover 시 `--border-accent-subtle`) | `--shadow-xs` (hover 시 `--shadow-sm`~`--shadow-glow-sm`) | 없음 | 기본 문서 흐름 |
| **3** | Glass Control | `--glass-bg` (hover `--glass-bg-strong`) | `--glass-border` | §5-3 3겹 레시피 (hover 시 `--shadow-glow-md`로 outer 대체) | `--blur-sm`~`--blur-lg` (§7 semantic usage) | `--z-header` ~ `--z-lightbox-top` 중 해당 컨텍스트 값(Global stacking, §10-1) |
| **4** | 3D Object | 투명(배경 없음) | 없음(오브젝트 실루엣) | 오브젝트에 내장(별도 에셋 파이프라인 문서에서 정의) | 없음 | 해당 컨테이너의 z-index를 상속(Local stacking, §10-2) |

**Level 4 구현 범위**: 기본적으로 **정적 에셋**을 전제로 한다. Three.js/WebGL 기반 실시간 3D는 기본 디자인 시스템 범위에서 제외하며, 향후 Hero 등 특정 영역에서 명확한 필요가 생길 경우에만 별도로 검토한다([[review-decision]] Decision 4).

### 11-1. 대표 매핑 예시 (migration 참조용)

| 기존 코드 | 신규 토큰 |
|---|---|
| `margin: 72px 0;` (섹션 컨테이너) | `margin: var(--section-gap) 0;` |
| `scroll-margin-top: 72px;` | `scroll-margin-top: var(--header-offset);` |
| `border-radius: 999px;` | `border-radius: var(--radius-pill);` |
| `border-radius: 20px;` (Nav/Navigator 레거시) | `border-radius: var(--radius-pill);` |
| `transition: … 0.15s ease;` | `transition: … var(--duration-fast) var(--ease-standard);` |
| `transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);` | `transition: transform var(--duration-base) var(--ease-bounce);` |
| `box-shadow: 0 1px 2px var(--shadow);` | `box-shadow: var(--shadow-xs);` |
| `box-shadow: 0 16px 48px var(--shadow);` (모달) | `box-shadow: var(--shadow-lg);` |
| `backdrop-filter: blur(20px) saturate(180%);` | `backdrop-filter: blur(var(--blur-lg)) saturate(180%);` |
| `backdrop-filter: blur(4px);` (모달 오버레이) | `backdrop-filter: blur(var(--blur-overlay));` |
| `z-index: 10000;` | `z-index: var(--z-modal);` |
| `@media (max-width: 768px) { … }` | `@include respond-to('md') { … }` |
| `color: #dc2626;` (trouble 링크) | `color: var(--danger);` |
| `color-mix(in srgb, var(--accent) 35%, var(--border))` | `var(--border-accent-subtle)` |

### 11-2. 컴포넌트 → Level 판정 예시

| 컴포넌트/영역 | Level | 비고 |
|---|---|---|
| `AmbientBackground` | 0 | |
| `hl-diagram-box`, 섹션 본문 텍스트 | 1 | |
| `ProjectCard` 본문(제목, 설명, 타입 배지, 피처 리스트, 스킬 칩 포함 — 헤더 바 포함) | 2 | [[visual-direction]] §0 Content/Control/Concept 판단에 따라 카드 전체(헤더 바 포함) 항상 불투명, Glass 후보 아님 |
| `ProjectCard` Project action 버튼 / hover 액션 트레이 (도입 시) | 3 | [[visual-direction]] §0 — Glass 후보로 확정. 정확한 트레이 UI 구현은 컴포넌트 명세/PoC 단계에서 확정 |
| Header, 모바일 Nav 드롭다운, GlassButton, 캐러셀 nav-button, TopBtn | 3 | |
| 신규 3D 개념 아이콘(profile/location/project type 등) | 4 | |
| 기술 스택 배지, CodeSnap, 다이어그램 미니 카드 | **Glass 비적용** — Level 표기상 2 또는 1에 머무름(유리 승격 금지가 [[visual-direction]] §0·§2-2 원칙) | |

---

## 12. 최종 Foundation Token 목록

### 12-1. Color

`--bg` `--bg-elevated` `--bg-muted` `--card` `--text` `--text-muted` `--text-soft` `--border` `--border-accent-subtle`✨ `--border-accent-strong`✨ `--accent` `--accent-hover` `--accent-soft` `--accent-contrast` `--success` `--company` `--danger`✨ `--shadow` `--header-bg` `--header-hairline` `--modal-overlay` `--glass-bg` `--glass-bg-strong` `--glass-border` `--glass-highlight` `--glass-specular` `--glass-shadow`

### 12-2. Spacing & Layout

`--space-1` … `--space-11` `--section-gap`✨ `--header-offset`✨

### 12-3. Typography

`--font-body` `--font-display` `--text-display`✨ `--text-heading-lg`✨ `--text-heading-md`✨ `--text-heading-sm`✨ `--text-body`✨ `--text-body-sm`✨ `--text-label`✨ `--text-caption`✨ `--font-weight-regular`✨ `--font-weight-medium`✨ `--font-weight-semibold`✨ `--font-weight-bold`✨ `--font-weight-black`✨ `--leading-tight`✨ `--leading-snug`✨ `--leading-normal`✨ `--leading-relaxed`✨ `--tracking-tight`✨ `--tracking-normal`✨ `--tracking-wide`✨

### 12-4. Radius

`--radius-sm`✨ `--radius-md`✨ `--radius-lg`✨ `--radius-pill`✨ `--radius-full`✨

### 12-5. Shadow

`--shadow-xs`✨ `--shadow-sm`✨ `--shadow-md`✨ `--shadow-lg`✨ `--shadow-xl`✨ `--shadow-glow-sm`✨ `--shadow-glow-md`✨ `--shadow-glass-outer`✨ `--shadow-glass-highlight`✨ `--shadow-glass-inner`✨

### 12-6. Blur

`--blur-sm`✨ `--blur-md`✨ `--blur-lg`✨ `--blur-overlay`✨

### 12-7. Motion

`--duration-fast`✨ `--duration-base`✨ `--duration-slow`✨ `--ease-standard`✨ `--ease-bounce`✨ `--ease-pop`✨

### 12-8. Breakpoint (SCSS 변수, CSS 커스텀 프로퍼티 아님)

`$bp-xl(1439)` `$bp-lg(1024)` `$bp-md(768)` `$bp-sm(480)` + `respond-to()` mixin

### 12-9. Z-index

`--z-header`✨ `--z-nav-toggle`✨ `--z-fixed-cta`✨ `--z-modal`✨ `--z-lightbox`✨ `--z-lightbox-top`✨

(✨ = 신규 토큰. 표시 없는 항목은 기존 `globals.scss` 토큰 그대로 유지)

---

## 13. Light Theme 값

```css
:root {
  /* --- 기존 유지 (재게시) --- */
  --bg: #ffffff;
  --bg-elevated: #f8fafc;
  --bg-muted: #f1f6ff;
  --text: #111827;
  --text-muted: #6b7280;
  --text-soft: #374151;
  --border: #e5e7eb;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-soft: #dbeafe;
  --accent-contrast: #ffffff;
  --card: #ffffff;
  --shadow: rgba(15, 23, 42, 0.08);
  --header-bg: rgba(255, 255, 255, 0.6);
  --header-hairline: rgba(15, 23, 42, 0.08);
  --modal-overlay: rgba(15, 23, 42, 0.45);
  --success: #16a34a;
  --company: #0f766e;
  --glass-bg: rgba(255, 255, 255, 0.55);
  --glass-bg-strong: rgba(255, 255, 255, 0.75);
  --glass-border: rgba(255, 255, 255, 0.65);
  --glass-highlight: rgba(255, 255, 255, 0.85);
  --glass-specular: rgba(255, 255, 255, 0.95);
  --glass-shadow: rgba(15, 23, 42, 0.14);

  /* --- 신규: Status --- */
  --danger: #dc2626;

  /* --- 신규: Border 변형 --- */
  --border-accent-subtle: color-mix(in srgb, var(--accent) 35%, var(--border));
  --border-accent-strong: color-mix(in srgb, var(--accent) 45%, var(--border));

  /* --- 신규: Spacing --- */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 20px; --space-6: 24px;  --space-7: 32px;  --space-8: 40px;
  --space-9: 48px; --space-10: 64px; --space-11: 72px;
  --section-gap: var(--space-11);
  --header-offset: var(--space-11);

  /* --- 신규: Typography --- */
  --text-display: 3.5rem;      --text-heading-lg: 2rem;
  --text-heading-md: 1.375rem; --text-heading-sm: 1.0625rem;
  --text-body: 0.9375rem;      --text-body-sm: 0.875rem;
  --text-label: 0.75rem;       --text-caption: 0.6875rem;
  --font-weight-regular: 400;  --font-weight-medium: 500;
  --font-weight-semibold: 600; --font-weight-bold: 700; --font-weight-black: 800;
  --leading-tight: 1.2;   --leading-snug: 1.35;
  --leading-normal: 1.55; --leading-relaxed: 1.7;
  --tracking-tight: -0.02em; --tracking-normal: -0.01em; --tracking-wide: 0.06em;

  /* --- 신규: Radius --- */
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px;
  --radius-pill: 999px; --radius-full: 50%;

  /* --- 신규: Shadow --- */
  --shadow-xs: 0 1px 2px var(--shadow);
  --shadow-sm: 0 6px 14px var(--shadow);
  --shadow-md: 0 10px 22px var(--shadow);
  --shadow-lg: 0 16px 48px var(--shadow);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.5);
  --shadow-glow-sm: 0 8px 20px color-mix(in srgb, var(--accent) 22%, transparent);
  --shadow-glow-md: 0 14px 30px color-mix(in srgb, var(--accent) 35%, transparent);
  --shadow-glass-outer: 0 8px 20px var(--glass-shadow);
  --shadow-glass-highlight: inset 0 1px 0 var(--glass-highlight);
  --shadow-glass-inner: inset 0 -1px 1px rgba(0, 0, 0, 0.06);

  /* --- 신규: Blur --- */
  --blur-sm: 8px; --blur-md: 16px; --blur-lg: 24px; --blur-overlay: 4px;

  /* --- 신규: Motion --- */
  --duration-fast: 150ms; --duration-base: 250ms; --duration-slow: 350ms;
  --ease-standard: ease;
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-pop: cubic-bezier(0.22, 1, 0.36, 1);

  /* --- 신규: Z-index --- */
  --z-header: 1000; --z-nav-toggle: 1100; --z-fixed-cta: 5000;
  --z-modal: 10000; --z-lightbox: 10050; --z-lightbox-top: 10060;
}
```

## 14. Dark Theme 값

`[data-theme='dark']`에서 **재정의가 필요한 토큰만** 나열한다(값이 그대로인 토큰은 라이트와 동일하게 상속되므로 생략 — Spacing/Radius/Typography/Motion/Z-index/Breakpoint는 테마 무관이라 재정의 대상 없음).

```css
[data-theme='dark'] {
  /* --- 기존 유지 (재게시) --- */
  --bg: #0b1220;
  --bg-elevated: #111827;
  --bg-muted: #152033;
  --text: #e8edf5;
  --text-muted: #9aa4b2;
  --text-soft: #c5ced9;
  --border: #243044;
  --accent: #60a5fa;
  --accent-hover: #93c5fd;
  --accent-soft: #1e3a5f;
  --accent-contrast: #0b1220;
  --card: #111827;
  --shadow: rgba(0, 0, 0, 0.45);
  --header-bg: rgba(11, 18, 32, 0.5);
  --header-hairline: rgba(255, 255, 255, 0.1);
  --modal-overlay: rgba(0, 0, 0, 0.65);
  --success: #4ade80;
  --company: #2dd4bf;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-bg-strong: rgba(255, 255, 255, 0.16);
  --glass-border: rgba(255, 255, 255, 0.16);
  --glass-highlight: rgba(255, 255, 255, 0.22);
  --glass-specular: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.5);

  /* --- 신규: Status --- */
  --danger: #f87171; /* red-400 — 어두운 배경에서 #dc2626보다 대비 확보 */

  /* --- 신규: Border 변형 (참조 토큰이 이미 테마별로 갈리므로 값 재정의 불필요, color-mix 결과가 자동으로 다크 --accent/--border를 사용) --- */
  /* --border-accent-subtle, --border-accent-strong: 재정의 없음 */

  /* --- 신규: Shadow (아랫면 음영을 다크에서 더 진하게) --- */
  --shadow-glass-inner: inset 0 -1px 1px rgba(0, 0, 0, 0.14);

  /* --shadow-xs~xl, --shadow-glow-*, --shadow-glass-outer/-highlight: 재정의 없음(참조하는 --shadow/--glass-shadow/--glass-highlight/--accent가 이미 다크값이므로 자동 반영) */
}
```

**관찰**: 신규 토큰 대부분이 `var(--shadow)`, `var(--glass-shadow)`, `var(--accent)` 등 **이미 테마별로 정의된 토큰을 참조하는 합성 토큰**이라, 다크 테마에서 명시적으로 재정의해야 하는 신규 값은 `--danger`와 `--shadow-glass-inner` 단 2개뿐이다 — 이는 원칙 1(기존 토큰 재사용)이 실제로 작동한다는 증거로 볼 수 있다.

---

## 15. Deprecated 될 기존 토큰

| 토큰 | 사유 | Migration 조건 |
|---|---|---|
| `--font-sans` | 코드베이스 전체 참조 0건(grep 확인) | 즉시 제거 가능(참조 없음) |
| `--font-nanum-gothic-coding` | 참조 0건 | 즉시 제거 가능 |
| `--font-jua` | 참조 0건 | 즉시 제거 가능 |
| `--font-poesen-one` | 참조 1건(`Skills.scss:45`) | 해당 1곳을 `var(--font-display)`로 바꾼 뒤 제거 |
| `border-radius: 20px` (토큰 아님, 리터럴) | `--radius-pill`로 대체 | `Navigator.scss` `.more-btn` 수정 시 함께 정리, `Nav.scss` `.hire-me-btn`은 죽은 코드라 삭제 대상(별도) |

**주의**: 위 4개 폰트 별칭은 "사용되지 않는다"는 사실만으로 이 문서에서 삭제를 확정하지 않는다 — 실제 삭제는 `globals.scss` 수정을 포함하므로 이번 문서 범위 밖이며, migration 단계의 첫 작업으로 넘긴다(§17).

---

## 16. 유지할 기존 토큰

Color 전부(§12-1 중 ✨ 표시 없는 항목) + `--font-body` + `--font-display`. 즉:

```
--bg --bg-elevated --bg-muted --card
--text --text-muted --text-soft
--border
--accent --accent-hover --accent-soft --accent-contrast
--success --company
--shadow
--header-bg --header-hairline --modal-overlay
--glass-bg --glass-bg-strong --glass-border --glass-highlight --glass-specular --glass-shadow
--font-body --font-display
```

이름과 값 모두 변경 없음. [[visual-direction]]의 Level 0~3이 전부 이 기존 토큰들을 그대로 활용해 설명 가능했다는 점이 — 애초에 이 포트폴리오의 토큰 설계가 이미 나쁘지 않았다는 근거다.

---

## 17. 신규 토큰

§12에서 ✨ 표시된 전체 목록(Color 3종, Spacing/Layout 2종, Typography 17종, Radius 5종, Shadow 10종, Blur 4종, Motion 6종, Z-index 6종 — 총 53종). 이 중 **필수 근거가 가장 뚜렷한 것부터 우선순위를 매기면**:

1. **확실한 반복값 정규화**(위험 없음): Spacing, Radius, Duration, Easing, Z-index — 전부 기존 코드에 이미 존재하던 값을 이름만 붙인 것.
2. **명확한 공백 해소**: `--danger`(하드코딩 1건 대체), `--border-accent-subtle/-strong`(가장 빈번한 color-mix 패턴 고정).
3. **앞으로 쓰일 것이 확정된 예측성 신규 값**: `--blur-md`(16px, button/navigation semantic usage — [[review-decision]] Decision 3), `--section-gap`/`--header-offset`(의미 분리).
4. **역할 재정의 성격**: Typography 8단계 + weight/leading/tracking — 기존 13~16종의 산발적 px 값을 대체하는 것이라 값 자체는 근사치이며, 적용 시 가장 넓은 범위의 시각적 diff가 발생할 카테고리.

---

## 18. Migration 우선순위

낮은 리스크 · 높은 확신 순으로 정렬. **이 문서 자체는 아무 코드도 바꾸지 않으며, 아래는 이후 별도 작업 단계를 위한 순서 제안이다.**

| 순서 | 작업 | 대상 | 리스크 |
|---|---|---|---|
| 1 | `globals.scss`에 §13/§14 토큰 값 추가(기존 토큰 불변) | `globals.scss` | 매우 낮음 — 새 변수 추가만, 기존 렌더링 영향 없음 |
| 2 | 죽은 폰트 별칭 4종 중 미사용 3종(`--font-sans`, `--font-nanum-gothic-coding`, `--font-jua`) 제거 | `globals.scss` | 매우 낮음 — 참조 0건 확인됨 |
| 3 | `Skills.scss:45`의 `--font-poesen-one` → `--font-display`로 교체 후 별칭 제거 | `Skills.scss`, `globals.scss` | 낮음 — 값이 동일하므로 렌더링 무변화 |
| 4 | SCSS `respond-to()` mixin 도입 + 26개 파일의 `@media (max-width: …)` 리터럴을 기계적으로 치환 | 전체 scss | 낮음 — 값 자체는 안 바뀌므로(1280/560 제외) 순수 리팩터 |
| 5 | `1280px`, `560px` one-off 브레이크포인트를 §9-2 권장대로 흡수 시도 + 시각 QA | `Nav.scss`, `HighlightDiagrams.scss` | 중간 — 실제 화면 확인 필요 |
| 6 | `z-index` 리터럴 6종 → `--z-*` 토큰 치환 | `Header`, `Nav`, `TopBtn`, `ReadMe`, `ProjectScreens`, `DiagramZoom` | 낮음 |
| 7 | `border-radius` 리터럴 → `--radius-*` 치환, 레거시 `20px` → `--radius-pill` | 전체 scss | 낮음~중간(20px 스냅 부분만 육안 확인 권장) |
| 8 | `transition-duration`/`cubic-bezier` 리터럴 → `--duration-*`/`--ease-*` 치환 | 전체 scss | 낮음 |
| 9 | `box-shadow` 리터럴 → `--shadow-*`/`--shadow-glow-*` 치환 | `ProjectCard`, `Projects`, `DiagramZoom` 등 | 중간(그림자 픽셀 값이 살짝 스냅되는 곳 존재) |
| 10 | `color-mix(accent NN%, border)` 반복 → `--border-accent-subtle/-strong` 치환 | `ProjectCard`, `ReadMe`, `Projects` 등 | 중간(28%→35% 스냅 지점 육안 확인) |
| 11 | `#dc2626` → `--danger` 치환 | `ProjectCard.scss` | 매우 낮음 |
| 12 | `margin:72px 0`/`scroll-margin-top:72px` → `--section-gap`/`--header-offset` 치환 | 6개 섹션 컨테이너 | 매우 낮음 |
| 13 | Typography 8단계 스케일 적용(px→rem 토큰 치환) | 전체 scss | **높음** — 가장 넓은 범위, 가장 많은 시각적 diff. 별도 컴포넌트 명세 문서와 함께 진행 권장 |
| 14 | Glass 3겹 그림자 레시피(`--shadow-glass-*`) 및 `--blur-*`(semantic usage) 적용 | `GlassButton`, `Header`, `Nav`, `Introduction`, `ProjectCard` Project action/floating control([[visual-direction]] §0 범위 내) | 중간~높음 — 헤더 바는 범위에서 제외됐으므로(Decision 1) 액션 영역의 정확한 UI만 PoC에서 확정 |
| 15 | continuous 애니메이션 존치 여부 결정(§4 열린 질문 3) + reduced-motion 규칙([[review-decision]] Decision 6) 전면 적용 | `ProjectCard`, `Introduction`, `KeywordBubbleChart`, `Projects` | 높음 — reduced-motion 대체 원칙은 확정됐으나, 일반 모드에서의 continuous 애니메이션 존치 여부는 디자인 의사결정 선행 필요 |

**권장 다음 단계**: 1~12번은 이 Foundation 토큰만으로 바로 착수 가능한 저위험 기계적 작업이라, 별도 컴포넌트 명세 없이도 먼저 진행할 수 있다. 13~15번은 [[visual-direction]]의 열린 질문이 해소되거나 컴포넌트 명세 문서(`docs/design-system/components.md`, 예정)가 나온 뒤 진행하는 것을 권장한다.

---

## 부록: 관련 문서

- [[current-ui-audit]] — 실측 근거
- [[visual-direction]] — 5-Level Depth System, Glass/3D 적용 원칙 출처
- [[review-decision]] — Astra Review에 대한 공식 결정, 이 문서와 [[visual-direction]]의 상충 조정
- (예정) `docs/design-system/components.md` — Primitive/Composite Component 명세
