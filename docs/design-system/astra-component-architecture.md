# Astra Component Architecture Proposal — Projects / ProjectCard

**제안의 핵심은 비인터랙티브 `Badge` Atom 하나를 추출하고, 실제 액션에는 기존 `GlassSurface`를 직접 사용하는 것이다.** 카드 셸·헤더·본문을 위한 새 Glass 컴포넌트나 범용 `Card` 계층은 만들지 않는다.

## 1. Badge/Chip Atom

### 실제 중복: JSX 사용 패턴 3곳

| 위치 | 실제 마크업/셀렉터 | 역할 |
|---|---|---|
| 프로젝트 타입 | `.project-card-info-project-type` + `.company / .team / .personal` | 프로젝트 분류 |
| 스킬 목록 | `.project-card-skills-container span` | 기술 이름 |
| 초과 스킬 수 | `.project-card-skill-more` | 생략된 기술 개수 표시 |

카드당 **타입 배지 1개 + 스킬 칩 최대 8개 + 초과 스킬 칩 1개**, 최대 10개의 표시 요소가 같은 Atom을 사용하게 된다.

여기서 두 종류의 “더보기”를 구분해야 한다.

- `.project-card-skill-more`의 **`+N`**: 클릭하지 않는 정보 칩 → Badge 대상.
- `.project-card-more`의 **`+N개 더보기`**: `onClick`으로 README를 여는 실제 버튼 → Badge 대상 아님.

### API: `Badge` 하나로 통합

```ts
type BadgeTone = 'neutral' | 'accent' | 'success' | 'company';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;                 // 기본값: 'neutral'
  variant?: 'badge' | 'chip';       // 기본값: 'badge'
  className?: string;
  title?: string;
  'aria-label'?: string;
}
```

**렌더링 계약**

- 루트는 항상 `span`이다.
- Glass·클릭·선택 상태를 갖지 않는 **불투명 정보 표시 Atom**이다.
- `variant`는 새로운 디자인 변형이 아니라, 현재 타입 배지와 스킬 칩의 **배경 농도·보더·패딩 차이를 보존**하기 위한 구분이다. 둘 다 pill 형태다.
- `as`, `interactive`, `selected`, `onRemove`, `count`, `icon`, 추가 size 스케일은 도입하지 않는다.
- `projectTypeLabel()` 호출과 타입→tone 매핑은 `ProjectCard`에 남긴다. Atom이 프로젝트 도메인을 알 필요는 없다.

타입 매핑은 다음으로 고정한다.

| 프로젝트 타입 | Badge tone |
|---|---|
| `company` | `company` |
| `team` | `success` |
| `personal` | `accent` |
| 그 외 | `neutral` |

스킬 이름은 `variant="chip" tone="accent"`, 초과 스킬 수는 `variant="chip" tone="neutral"`이다.

### tone과 기존 색 조합

| 실제 사용 조합 | 배경 | 보더 | 텍스트 |
|---|---|---|---|
| neutral / badge | `--bg-muted` | `--border` | `--text-soft` |
| neutral / chip | `--bg-muted` | `--border` | `--text-muted` |
| accent / badge | `--accent-soft` | 기존 `accent 28% + border` 조합 | `--accent` |
| accent / chip | 기존 `accent-soft 45% + card` 조합 | 기존 `accent 18% + border` 조합 | `--accent` |
| success / badge | 기존 `success 12% + card` 조합 | 기존 `success 35% + border` 조합 | `--success` |
| company / badge | 기존 `company 12% + card` 조합 | 기존 `company 35% + border` 조합 | `--company` |

첫 추출에서는 위 기존 조합을 옮긴다. 배지 추출과 색 비율 정규화를 동시에 진행하지 않아 시각적 변경 원인을 분리한다.

**`danger`는 이번 API에서 제외한다.** 첨부된 최신 `ProjectCard.scss`에는 이미 `.project-card-trouble { color: var(--danger); }`가 있지만, 이는 링크 색이지 배지 사용처가 아니다. 감사 문서의 후보 목록을 이유로 사용처 없는 danger 배지를 구현하지 않는다. `warning`·`info` 역시 추가하지 않는다.

### 파일 위치와 클래스 구조

- 컴포넌트: **`src/components/common/badges/Badge.tsx`**
- 스타일: **`src/styles/components/Badge.scss`**

기존 plain SCSS 관례를 따른다. `Badge`와 `Chip`을 별도 구현하거나 별칭 컴포넌트로 나누지 않는다.

```text
.badge
├─ .badge--badge / .badge--chip
└─ .badge--neutral / .badge--accent / .badge--success / .badge--company
```

Atom이 display·패딩·pill radius·보더·배경·타이포그래피·nowrap을 소유한다. `ProjectCard`는 배치만 소유한다.

**제거·이관되는 실제 셀렉터**

- `.project-card-info-project-type`
- `.project-card-info-project-type.company`
- `.project-card-info-project-type.team`
- `.project-card-info-project-type.personal`
- `.project-card-skills-container span`
- `.project-card-skills-container .project-card-skill-more`
- 위 셀렉터의 모바일 표시 스타일

`.project-card-info`, `.project-card-skills-container`의 flex·wrap·gap은 유지한다. 특히 기존의 광범위한 `span` 스타일은 제거해 Atom 내부까지 우연히 스타일링하지 않도록 한다.

## 2. Glass 경계

### 2-1. Solid로 남는 영역

다음은 계속 **Level 2 Content**다.

- `.project-card-item-container`
- `.project-card-header` — 제목·날짜·타입 배지 포함
- 설명, 피처 리스트, 스킬 칩
- `.project-card-top`, `.project-card-bottom`의 콘텐츠 배경

현재 카드 배경의 그라디언트는 불투명 토큰끼리의 조합이므로 유지할 수 있다. 헤더에는 별도 Glass 배경이나 blur를 추가하지 않는다. 피처 항목의 `card 82% + transparent` 배경은 엄격한 Solid 계약에 맞춰 `var(--card)`로 정리하는 편이 명확하다.

본문의 `.project-card-link`, `.project-card-trouble`은 콘텐츠 링크로 유지한다. **모든 `<a>`를 Glass 버튼으로 바꾸는 작업은 아니다.**

### 2-2. 액션 버튼: 개별 `GlassSurface`로 교체

README/Video/Notion/Github/Velog는 모두 실제 Project action이므로, **각 버튼·링크를 `GlassSurface`로 교체하는 것이 Final Rules 1·2 및 Foundation §11-2와 일치한다.**

| 대상 | `as` | `blur` | `tone` | `radius` |
|---|---|---|---|---|
| README | `button` | `md` | `accent` | `pill` |
| Video / Notion / Github / Velog | `a` | `md` | `neutral` | `pill` |
| 피처 `+N개 더보기` 버튼 | `button` | `sm` | `neutral` | `pill` |
| 캐러셀 이전/다음 | `button` | `sm` | `neutral` | `pill` |

- 일반 프로젝트 액션은 **button 용도인 `md`**, 작은 보조 컨트롤과 원형 캐러셀 버튼은 **small control인 `sm`**을 선택한다.
- README의 우선순위는 `tone="accent"`로 표현한다. 기존 pulse·shimmer로 보완하지 않는다.
- 피처 더보기 역시 README를 여는 액션이므로, 본안에서는 작은 Glass 버튼으로 포함한다. 주변 피처 리스트를 Glass로 만드는 것은 아니다.

**`.project-card-btn-container` 자체는 일반 `div`로 유지한다.** flex·wrap·gap만 담당하며, Glass 배경을 갖지 않는다. 트레이와 개별 버튼에 이중으로 blur를 적용하지 않는다.

```text
.project-card-bottom                         ← 콘텐츠 영역 유지
├─ .project-card-skills-container
│  └─ Badge                                 ← Solid
└─ .project-card-btn-container               ← 레이아웃만
   ├─ GlassSurface.project-card-action       ← README, accent
   └─ GlassSurface.project-card-action × 0~4 ← 외부 링크, neutral
```

별도의 `ProjectActionButton`, `ProjectGlassButton`은 만들지 않는다. 공통 표시 클래스 **`.project-card-action`**이면 현재 중복을 제거하기에 충분하다.

#### 스타일 책임 분리

- `GlassSurface`: 배경·보더·blur·radius·그림자·스페큘러·상호작용 상태.
- `.project-card-action`: 패딩·글자 크기·아이콘 크기·배치.
- `.project-card-btn-container`: 액션 사이 간격과 줄바꿈.

`GlassSurface`는 내부에 `.glass-surface__content`를 생성한다. 따라서 아이콘과 텍스트 사이 정렬·gap은 필요하면 다음처럼 **직접 자식에 한정**해 적용한다.

```text
.project-card-action > .glass-surface__content
```

루트에 `gap`만 옮기면 내부 아이콘과 텍스트 사이 간격이 적용되지 않을 수 있다.

기존 `@mixin project-card-btn`과 서비스별 `.read-me-btn / .video-btn / .notion-btn / .github-btn / .velog-btn` 재질 스타일은 제거한다. `--accent-contrast` 등의 텍스트 색을 호출부에서 다시 강제하지 않고 primitive의 tone 처리를 따른다.

#### 네이티브 의미 보존

- README·피처 더보기: `as="button"`, 기존 `onClick` 유지.
- 외부 링크: `as="a"`, 기존 `href`, `target="_blank"`, `rel="noreferrer"` 유지.
- 현재 `GlassSurface`는 `as={Link}`나 `asChild`를 지원하지 않는다. 외부 URL 용도라면 일반 anchor로 충분하며, `Link`와 중첩해 이중 anchor를 만들지 않는다. 내부 경로가 섞여 있는지는 구현 전에 확인한다.

### 2-3. 모션: Glass 반응 하나만 남긴다

Decision 6은 특히 **Reduced Motion의 필수 계약**이다. 일반 모드에서 모든 transform을 금지한 결정으로 확대 해석하지는 않는다. 다만 이번 설계에서는 중첩을 줄이기 위해 다음처럼 정리한다.

| 효과 | 일반 모드 제안 | Reduced Motion |
|---|---|---|
| mixin의 `perspective / rotateX / scale` | **제거** — hover와 active 모두 | 제거 |
| GlassSurface의 `translateY(-2px)` hover | **유지** — 컨트롤의 유일한 미세 이동 | 제거 |
| README shimmer | **제거** | 제거 |
| README pulse | **제거** | 제거 |

근거는 다음과 같다.

- tilt는 기존 scale·이동까지 묶여 있으므로 `rotateX`만 빼는 것으로 충분하지 않다. mixin의 transform 계열 전체를 제거한다.
- shimmer는 지속적인 장식 이동이며, Glass의 기존 스페큘러와 역할이 겹친다.
- pulse는 transform이 아니라 **box-shadow 애니메이션**이다. Glass의 3겹 그림자를 애니메이션 값으로 덮을 수 있으므로 제거한다.
- **정적인 Glass 하이라이트·스페큘러는 유지**한다. 움직이는 shimmer와 같은 것으로 취급하지 않는다.

기존 README reduced-motion 규칙의 `::before / ::after { content: none; }`도 함께 정리한다. 이를 새 Glass 버튼에 그대로 적용하면 primitive의 정적 재질 표현까지 지울 수 있다.

**주의:** 현재 구현에서 `as="button"`과 `as="a"`는 `interactive={false}`여도 항상 interactive다. 이 prop으로 hover transform을 끌 수 있다고 설계하면 안 된다. Reduced Motion에서는 실제 SCSS의 hover/active transform 제거 여부를 확인하고, 필요하면 이번 액션·캐러셀 클래스에 국한해 보완한다.

#### 부모 카드의 모션도 함께 정리

버튼만 정리해도 현재 카드의 idle float, hover `y: -10 / scale: 1.02`, tap scale이 남으면 중첩은 계속된다.

따라서 본안은 **카드 자체의 idle·hover·tap 공간 이동도 제거**하고, border·shadow 상태 변화는 남기는 것을 권장한다. 클릭 핸들러가 없는 `article` 전체가 들썩이는 것보다 실제 액션만 반응하는 편이 역할 구분도 명확하다.

이는 일반 모드에 대한 이번 설계 제안이며, Decision 6이 모든 일반 모드 float를 이미 금지했다는 뜻은 아니다. 캐러셀의 실제 슬라이드 이동은 기능적 이동이므로 별개다.

### 2-4. 캐러셀 `nav-button`: 커스텀 Glass 제거

기존 `backdrop-filter: blur(10px)`, 반투명 배경, 개별 그림자·보더·hover 배경을 제거하고 **기존 `GlassSurface`로 통일하는 것이 맞다.**

- `blur="sm"`: 기존 10px을 Foundation의 small-control 8px tier로 대응.
- `tone="neutral"`: 기본 이동 컨트롤이며 README와 같은 primary CTA가 아니다.
- `radius="pill"`: 현재 primitive에는 `full`이나 `circle` 값이 없다. 정사각형 44×44px에 pill radius를 적용하면 원형이 된다.
- 기존 아이콘과 접근 가능한 이름, 클릭 동작은 유지한다.

여기서는 **위치 지정 transform과 hover transform을 분리**해야 한다. 현재 `translateY(-50%)`를 버튼에 남기면 Glass의 `translateY(-2px)`와 합성되지 않고 서로 덮어쓸 수 있다.

```text
.projects-carousel-wrapper
├─ .projects-carousel-nav-slot--prev         ← 위치 지정용 일반 wrapper
│  └─ GlassSurface.nav-button
├─ Swiper.projects-peek-carousel
└─ .projects-carousel-nav-slot--next
   └─ GlassSurface.nav-button
```

공통 `.projects-carousel-nav-slot`이 `position: absolute`, `top: 50%`, `translateY(-50%)`, 좌우 위치, 기존 local `z-index: 6`을 소유한다. `.nav-button`은 44×44px 크기와 아이콘 정렬만 담당한다.

- 기존 hover `scale(1.06)`·active `scale(0.98)`은 제거한다.
- 위치 지정 wrapper의 `translateY(-50%)`는 장식 애니메이션이 아니므로 Reduced Motion에서도 유지한다.
- wrapper는 Swiper 밖의 형제로 유지해 mask의 영향을 받지 않게 한다.
- 모바일 숨김도 wrapper 단위로 유지한다.
- 이 local stacking을 위해 새 전역 z-index 토큰을 만들지 않는다.

## 3. 이번 범위 판단

**이번 리팩토링은 `ProjectCard` / `Projects`와 신규 `Badge`로 한정한다.**

포함하는 작업은 다음 정도다.

1. `Badge.tsx` / `Badge.scss` 신설 및 ProjectCard의 세 표시 패턴 교체.
2. ProjectCard 액션과 캐러셀 컨트롤의 `GlassSurface` 적용.
3. 교체 대상의 중복 CSS·장식 모션 제거.
4. Glass 내부 래퍼에 맞춘 정렬, 캐러셀 위치 wrapper 추가.
5. 이번 변경 때문에 발생하는 포커스·Reduced Motion·스타일 충돌 보완.

다음은 별도 단계로 미룬다.

| 대상 | 미루는 작업 / 이유 |
|---|---|
| `ReadMe.tsx / ReadMe.scss` | 배지·스킬 칩 이관, 피처·링크 공통화. 특히 audit상 team 색이 ProjectCard와 다르므로 자동 통합하면 의미 있는 시각 변경이 발생한다. |
| `DiagramZoom` | 확대 힌트 배지, 라이트박스 셸·컨트롤 통합. 오버레이 대비·포커스·전역 stacking 검증이 별도로 필요하다. |
| `ProjectScreens` | 확대 배지·라이트박스·가로 스크롤 공통화. 이번 카드 액션 추출과 책임이 다르다. |
| `FilteringButton` | 필터 선택 상태와 모바일 스크롤 구조. 기존 필터링 계약을 그대로 유지한다. |

§15의 중복은 **후속 작업의 근거이지, 이번에 전부 추출해야 한다는 요구는 아니다.** 이번에는 `ProjectTypeBadge`, `Lightbox`, `IconButton`, `HorizontalScrollStrip`까지 추가하지 않는다.

다만 전역 SCSS 충돌은 무시하면 안 된다. `.project-card-features`와 `.project-card-link`의 공통화는 미루되, 이번 수정에서 실제 충돌이 확인되면 **ProjectCard 쪽 클래스만 전용 이름으로 격리**한다. `ReadMe`가 참조하는 정의를 확인 없이 삭제하거나 옮기지 않는다.

## Risks / Open Questions

- **Glass SCSS 확인:** 첨부에는 `GlassSurface.scss`가 없다. 실제 hover·active·focus·Reduced Motion 규칙과 CSS 우선순위는 구현 전에 확인해야 한다.
- **토큰의 실제 존재:** Foundation에 정의된 토큰과 현재 `globals.scss`에 배포된 토큰을 구분한다. 문서에 있다는 이유만으로 런타임 존재를 가정하지 않는다.
- **Light/Dark 대비:** Glass 위 버튼 텍스트, 타입 배지, neutral 초과 스킬 칩의 대비를 실측한다. 특히 `--text-muted` on `--bg-muted`는 기존 경계 사례다.
- **비활성 슬라이드 opacity:** 현재 `.45 / .78`은 카드 콘텐츠와 내부 Glass를 함께 흐린다. 카드 배경을 불투명하게 유지하는 것만으로 최종 합성 대비가 보장되지는 않는다. 활성·비활성 슬라이드를 각각 검증한다.
- **mask·clip·포커스:** 액션의 그림자·미세 hover·포커스 링이 잘리지 않는지 확인한다. 카드 이동을 제거했다고 기존 Swiper 패딩을 곧바로 축소하지 않는다.
- **레이아웃:** 다섯 액션이 모두 있는 카드, 긴 기술명, 긴 제목, 좁은 화면에서 줄바꿈과 카드 높이를 확인한다. `.glass-surface__content`가 정렬에 미치는 영향도 포함한다.
- **재질과 성능:** 균일한 카드 배경에서도 Glass가 인지되는지, 반복 배치된 여러 버튼의 blur가 스와이프 성능을 저하시키는지 확인한다. 재질이 약하다고 무조건 `lg`로 올리지 않는다.
- **키보드·터치:** 액션은 지금처럼 항상 노출한다. hover-only 트레이를 새로 만들지 않는다. 캐러셀 버튼의 조건부 제거로 포커스가 사라지는 기존 동작도 함께 확인한다.
- **README 회귀:** 모달 열기·닫기와 필터링 이후 동작을 점검하고, SCSS import 순서 때문에 README의 배지·피처·링크 표시가 달라지지 않았는지 확인한다.