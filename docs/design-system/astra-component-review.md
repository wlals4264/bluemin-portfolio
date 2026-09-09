# Astra Component Migration Review

검토 대상:

- `src/components/projects/ProjectCard.tsx` · `src/styles/components/ProjectCard.scss`
- `src/components/projects/Projects.tsx` · `src/styles/components/Projects.scss`
- `src/components/common/badges/Badge.tsx` · `src/styles/components/Badge.scss`

텍스트 콘텐츠와 Glass 액션의 분리, 비인터랙티브 배지의 재사용, 기본 typography·spacing 토큰 적용은 확정된 방향에 대체로 맞는다. 다만 **비활성 카드 전체의 투명도**, **Level 2 카드 셸의 표면·hover 레시피**, **캐러셀의 Reduced Motion 미연동**, **모바일 spacing 리터럴**은 수정이 필요한 부분이다.

`GlassSurface`, `ReadMe`, `RevealSection` 등의 구현과 `globals.scss`, 비교 대상인 About Me 소스는 제공되지 않았다. 따라서 해당 컴포넌트의 내부 재질·포커스·모션 처리와 실제 토큰 정의는 확인하지 못했다. 코드 주석에 등장하는 `astra-component-architecture.md` 역시 미첨부이므로 판정 근거로 사용하지 않았다.

## 항목별 검토

### Content = Solid

**정보의 텍스트 독립성은 문제 없음.**

- **규칙:** `review-decision.md` Final Rules 1, `3d-assets.md` 「Concept = 3D 원칙」·Usage Rules — 이미지를 제거해도 정보는 텍스트로 남아야 한다.
- **코드:** `ProjectCard.tsx`에서 제목·기간·설명은 각각 `.project-card-title`, `.project-card-info-date`, `.project-card-info-project-title`에 텍스트로 렌더링된다. 표시 대상 피처와 스킬도 `<li>{feature}</li>`, `<Badge>{skill}</Badge>`로 존재한다. 액션 아이콘 옆에도 README·Video 등의 텍스트가 남는다.

피처 3개·스킬 8개 제한은 표시량을 요약하는 결정이지 이미지로 정보를 대체하는 결정은 아니다. 다만 생략된 상세 정보가 `ReadMe`에 실제로 제공되는지는 미첨부 구현이라 확인하지 못했다.

**카드의 실제 불투명성에는 문제 있음.** `Projects.scss`에서 비활성 카드 전체에 `opacity: 0.45`, 이전·다음 카드에 `opacity: 0.78`을 적용한다. 배경뿐 아니라 제목·설명·배지도 함께 반투명하게 합성되므로 Final Rules 1의 “ProjectCard는 항상 불투명”과 어긋난다. **발견된 이슈 1**에 해당한다.

### Control = Glass 오남용 여부

**문제 없음 — 첨부된 호출 위치 기준.**

- **규칙:** `review-decision.md` Final Rules 1·2 — ProjectCard의 Glass는 Project action / floating control / carousel control로 한정한다.
- **코드:** `ProjectCard.tsx`의 `.project-card-action`은 README 및 외부 자료 액션이다. `.project-card-more`도 `onClick={onClick}`으로 상세 내용을 여는 실제 액션이다. `Projects.tsx`의 `.nav-button`은 캐러셀 이전·다음 제어다. 모두 허용 범위에 해당한다.
- **규칙:** Final Rules 3, `foundation.md` §7 — small control은 `blur-sm`, button/navigation은 `blur-md`를 사용한다.
- **코드:** 더보기·캐러셀 버튼은 `blur="sm"`, 주요 프로젝트 액션은 `blur="md"`다. 역할에 부합한다.

헤더·제목·피처 리스트·스킬 배지를 `GlassSurface`로 감싼 곳은 없다. 일반 `<a>`인 `.project-card-link`, `.project-card-trouble`도 **Glass 우선**을 모든 링크의 Glass 의무로 확대해 위반 처리하지 않는다.

다만 `GlassSurface`의 실제 background/border/specular/saturation/그림자 조합은 호출부만으로 확인할 수 없다.

### Depth Level 판정

판정 기준은 `review-decision.md` Final Rules 4와 `foundation.md` §11·§11-2다. DOM 중첩 깊이나 그림자 크기가 아니라 역할로 구분했다.

| 영역 | Level 판정 | 코드 및 평가 |
|---|---|---|
| 페이지 Canvas | **0 — 이 소스에 직접 구현되지 않음** | `Projects.scss`는 페이지의 `--bg` 표면을 정의하지 않는다. 상위 배경은 검토 범위 밖이다. |
| `.projects-container`, 캐러셀 배치 래퍼 | **1 — 섹션/컨테이너 역할** | 자체 배경·보더·그림자를 만들지 않는 구조적 컨테이너다. 독립적인 표면을 그리는 요소로 보지는 않는다. |
| `.project-card-item-container` | **2 — Content** | 기본 `--border`, `--radius-lg`, `--shadow-xs`는 부합한다. 배경과 hover 보더·그림자는 §11의 지정 조합과 다르다. **이슈 2**. |
| 카드 헤더·본문·피처 리스트 | **2의 콘텐츠 구성 요소** | 헤더는 `--border` hairline, 피처 항목은 `--card`와 `--border`를 사용한다. 별도 Glass 승격은 없다. |
| 타입 배지·스킬 칩 | **2의 보조 콘텐츠** | `Badge.scss`는 `--bg-muted`, `--accent-soft`, 불투명 색상 간 `color-mix()`를 사용한다. §1-2의 보조 표면 용도와 §11-2의 Glass 비적용 범위에 부합한다. 다만 부모 카드의 opacity 영향을 받는다. |
| 더보기·프로젝트 액션·캐러셀 버튼 | **3 — Glass Control** | 사용 역할과 blur prop은 적절하다. 실제 재질 토큰 조합은 `GlassSurface` 소스가 없어 판정 보류다. |
| 3D 개념 오브젝트 | **4 — 없음** | `Icon3D`나 다른 3D 에셋을 사용하지 않는다. |

카드의 불투명 그라디언트는 그 자체로 Glass가 아니다. 그러나 **Solid 여부와 Level 2 표면 레시피 준수 여부는 별개**다. `.project-card-item-container`의 그라디언트, hover의 `--border-accent-strong`, 직접 작성한 그림자는 §11의 Level 2 조합과 일치하지 않는다.

로컬 stacking은 **문제 없음**이다. `Projects.scss`의 `.swiper-slide-active { z-index: 2; }`, `.projects-carousel-nav-slot { z-index: 6; }`는 캐러셀 내부 순서다. Final Rules 6과 `foundation.md` §10-2에 따라 전역 z-index 토큰 등록 대상이 아니다.

### Icon3D 사용 규칙 준수

**문제 없음 — 적용 대상 없음.**

`ProjectCard.tsx`, `Projects.tsx`, `Badge.tsx`에는 `Icon3D` 사용이 없다. 따라서 `3d-assets.md`의 size·alt·최소 표시 크기·CSS Shadow Policy에 대한 위반도 확인되지 않는다.

`FaBook`, `FaGithub`, `GoLink` 등은 텍스트 액션을 보조하는 2D 아이콘이다. 카드의 `box-shadow`를 Icon3D의 CSS shadow 금지 규칙에 연결해 지적하지 않는다. 또한 이 영역에 아직 3D를 통합하지 않은 것은 `3d-assets.md` 「아직 하지 않은 것」에 명시된 상태와도 일치한다.

### 토큰 사용

**대부분 문제 없음. 일부 이탈 있음.**

- **규칙:** `foundation.md` §2·§3·§4·§8.
- **코드:** 세 SCSS 파일의 주요 padding/gap, 글자 크기·굵기·행간, radius, 색상, CSS transition은 기존 토큰을 사용한다. `Projects.scss`의 기본 섹션 간격과 앵커 오프셋도 각각 `--section-gap`, `--header-offset`으로 분리되어 있다.
- **이탈:** `ProjectCard.scss`의 모바일 `margin: 2px`는 §2-1 spacing 스케일 밖이다. **이슈 4**.
- **이탈:** 카드 hover의 직접 작성한 `box-shadow`는 §5·§11의 레시피를 재사용하지 않는다. **이슈 2**.

다음은 위반으로 보지 않는다.

- `ProjectCard.scss`의 `clamp(var(--text-heading-md), 2.4vw, 1.625rem)`은 `foundation.md` §3-2가 개별 컴포넌트에서 판단을 허용한 유동 제목 크기 범위와 맞는다.
- `Badge.scss`의 accent 18% 보더 혼합은 §1-4에서 허용한 단발성 point-of-use `color-mix()` 범주다.
- `1px` 보더는 §11의 hairline 용도다.
- `44px` 버튼, `22px` SVG, `540px` 슬라이드 상한 등의 **컴포넌트 치수**는 첨부 문서에 대응 크기 토큰 계약이 없다. 이를 spacing 리터럴과 동일하게 취급해 위반으로 단정하지 않는다.

CSS breakpoint 값은 §9-1의 기본 스케일과 일치한다. 반면 `Projects.tsx`의 Swiper `1200` 분기는 기본 스케일 밖이다. 별도 튜닝이라는 주석만으로 시각적 필요성이 검증된 것은 아니므로, §9-2의 취지에 따라 브라우저 확인 대상으로 남긴다.

### Reduced Motion

**카드 자체는 대응 분기가 있으나, 캐러셀은 미연동이다.**

- **규칙:** `review-decision.md` Final Rules 5, `foundation.md` §8-4.
- **코드:** `ProjectCard.tsx`는 `useReducedMotion()`이 참이면 `animate`, `whileHover`, `whileTap`을 모두 `undefined`로 전달한다. 유휴 이동과 hover/tap 변형을 추가하지 않으려는 구현은 규칙에 맞는다. CSS의 border·shadow 상태 변화도 그대로 남는다.
- **위반:** `Projects.tsx`의 Swiper는 환경설정과 무관하게 `speed={420}`을 받으며, 이전·다음 버튼도 시간 인자 없이 `slidePrev()`·`slideNext()`를 호출한다. 이동을 줄이는 분기가 없다. **이슈 3**.

일반 모드의 `repeat: Infinity`는 이번 자료만으로 확정 위반 처리하지 않는다. `foundation.md` §8-3은 일반 장식 루프의 존치 판단을 유보했고, `3d-assets.md`의 continuous animation 금지는 여기서 사용하지 않는 Icon3D에 대한 규칙이다.

`Projects.scss`의 `translateY(-50%)`는 버튼 래퍼의 정적 위치 정렬이다. 장식적 이동 애니메이션으로 분류하지 않는다. 실행 중 Reduced Motion 설정을 바꿨을 때 Framer Motion의 기존 루프·transform이 실제로 정리되는지는 브라우저에서 직접 확인 필요다.

### Accessibility

**텍스트 이름과 색상 외 정보 전달은 문제 없음. 포커스 가시성은 판정 보류.**

- `ProjectCard.tsx`의 액션에는 README·Video 등의 텍스트가 있고, 장식 아이콘에는 `aria-hidden`이 있다.
- `Projects.tsx`의 캐러셀 버튼에는 `aria-label="이전 프로젝트"` / `"다음 프로젝트"`가 있다.
- 프로젝트 타입은 색상뿐 아니라 `projectTypeLabel(projectType)` 텍스트로 제공된다. 스킬과 초과 개수도 텍스트다.
- `Badge.tsx`는 비인터랙티브 `<span>`이므로 별도의 키보드 포커스를 요구할 이유가 없다.

`ProjectCard.scss`의 `.project-card-link`, `.project-card-trouble`에는 `:hover` 밑줄만 있고 **로컬 `:focus-visible` 선언은 없다**. 그러나 outline을 제거하는 선언도 없으며, 전역 포커스 스타일은 미첨부다. 따라서 이것만으로 “키보드 포커스 표시가 사라진다”고 확정하지 않는다. Glass 버튼의 포커스 역시 내부 구현 확인이 필요하다.

`review-decision.md` Deferred to PoC가 요구하는 텍스트 대비와 키보드·터치 포커스 검증은 아직 남아 있다. 특히 `Projects.scss`는 768px 이하에서 캐러셀 버튼을 숨기므로, 좁은 화면의 키보드 탐색 가능 여부를 직접 확인해야 한다.

### 일관성

**첨부 코드 내부에서는 문제 없음. About Me와의 비교는 불가.**

- `foundation.md` 원칙 1과 Final Rules 7의 기존 토큰 재사용 방향에 맞게, 타입 배지·스킬·초과 개수는 `Badge`를 공유한다.
- 액션 재질은 `GlassSurface`에 맡기고, 호출부 SCSS는 주로 배치와 typography를 담당한다.
- `Projects.scss`와 `ProjectCard.scss`의 transition 목록 중복은 상위의 더 구체적인 선택자가 shorthand를 덮어쓰는 상황에 대응한 것이다. 이 중복만으로 별도 추상화가 필요하다고 판단하지 않는다.

About Me 소스가 없으므로 섹션 구조·토큰 적용 방식이 불필요하게 달라졌는지는 검증할 수 없다.

## 발견된 이슈

### 이슈 1 — 비활성 카드 전체가 지속적으로 반투명해짐

- **파일:** `src/styles/components/Projects.scss`
- **규칙 근거:** `review-decision.md` Final Rules 1·2, `foundation.md` §11-2 — ProjectCard는 헤더·본문·배지·피처·스킬을 포함해 항상 불투명한 Content다.
- **코드 근거:**
  - `.projects-peek-carousel .swiper-slide .project-card-item-container` → `opacity: 0.45`
  - `.swiper-slide-prev`, `.swiper-slide-next` 내부 카드 → `opacity: 0.78`
  - 활성 카드에서만 `opacity: 1`
- **판정:** 부모 카드의 opacity는 카드 배경과 모든 자식을 함께 반투명하게 합성한다. 개별 피처나 배지가 불투명 배경을 선언해도 이 효과에서 벗어나지 못한다. 이는 Glass 사용 여부와 별개로, ProjectCard의 항상 불투명 규칙에 어긋난다.

### 이슈 2 — Level 2 카드 셸의 표면·hover 조합이 확정 레시피와 다름

- **파일:** `src/styles/components/ProjectCard.scss`
- **규칙 근거:** `foundation.md` §11 — Level 2는 `--card`, `--border`, `--shadow-xs`; hover는 `--border-accent-subtle`, `--shadow-sm`~`--shadow-glow-sm` 조합이다. 그림자 정의는 §5-1·§5-2에 있다.
- **코드 근거:** `.project-card-item-container`
  - 배경: `linear-gradient(165deg, color-mix(in srgb, var(--card) 88%, var(--accent-soft)) 0%, var(--card) 42%, var(--bg-elevated) 100%)`
  - hover 보더: `border-color: var(--border-accent-strong)`
  - hover 그림자: `box-shadow: 0 10px 22px color-mix(in srgb, var(--accent) 22%, var(--shadow))`
- **판정:** 배경은 불투명하지만 지정된 `--card` 표면과 다른 조합이다. hover 보더도 지정된 subtle이 아니라 strong이며, 그림자는 문서화된 중립·glow 레시피 어느 쪽과도 일치하지 않는다. mask 여유 공간에 맞췄다는 코드 주석은 이 별도 레시피가 확정 규칙이라는 근거가 되지 않는다.

### 이슈 3 — 캐러셀 전환이 Reduced Motion 설정을 반영하지 않음

- **파일:** `src/components/projects/Projects.tsx`
- **규칙 근거:** `review-decision.md` Final Rules 5, `foundation.md` §8-4 — Reduced Motion에서는 scale/translate를 최소화·제거하고 상태 변화는 유지해야 한다.
- **코드 근거:**
  - `<Swiper speed={420}>`이 무조건 적용된다.
  - 버튼은 `swiperInstance?.slidePrev()` / `swiperInstance?.slideNext()`를 호출한다.
  - 이 컴포넌트에는 Reduced Motion에 따른 속도·전환 분기가 없다.
- **판정:** `ProjectCard.tsx`의 모션 분기는 카드의 유휴·hover 변형에만 적용된다. 슬라이드를 이동시키는 Swiper 전환 설정은 그대로 남으므로, 첨부 구현의 캐러셀 제어 경로는 Reduced Motion 계약을 반영하지 않는다.

### 이슈 4 — 모바일 카드 여백이 spacing 스케일을 벗어남

- **파일:** `src/styles/components/ProjectCard.scss`
- **규칙 근거:** `review-decision.md` Final Rules 7, `foundation.md` §2-1 — spacing은 확정된 11단계 스케일을 사용한다.
- **코드 근거:** `@media (max-width: 768px)` 안의 `.project-card-item-container { margin: 2px; }`
- **판정:** 기본 `margin: var(--space-1)`을 스케일에 없는 `2px` 리터럴로 덮어쓴다. 이는 보더 두께나 오브젝트 치수가 아니라 실제 외부 여백이므로 spacing 규칙의 직접 적용 대상이다.

## Must Validate in Browser

다음 항목은 **브라우저에서 직접 확인 필요**다. 코드 주석의 “잘리지 않음”, “같은 재질”, “모바일은 스와이프로 충분”을 검증 결과로 취급하지 않는다.

1. **테마와 토큰의 computed value**
   - **근거:** `review-decision.md` Deferred to PoC — `data-theme` 부착 위치와 합성 토큰 검증.
   - **대상:** `ProjectCard.scss`의 `--shadow-xs`, `--border-accent-*`, `Badge.scss`의 색상 혼합.
   - Light/Dark 각각에서 실제 토큰 정의·상속·합성 결과를 확인한다.

2. **텍스트 대비**
   - **근거:** 같은 문서의 텍스트 대비 4.5:1 실측 항목.
   - **대상:** `Badge.scss`의 `.badge--chip.badge--neutral`은 `--text-muted` on `--bg-muted` 조합이다. `.badge--success`는 작은 텍스트에 `--success`를 사용한다.
   - 카드의 비활성 opacity와 캐러셀 mask까지 적용된 최종 합성 결과도 함께 측정한다.

3. **Glass 재질 및 반복 렌더링 성능**
   - **근거:** `foundation.md` §5-3·§6·§7, `review-decision.md` Deferred to PoC의 Glass 재질·성능 항목.
   - **대상:** `ProjectCard.tsx`의 `.project-card-more`, `.project-card-action`, `Projects.tsx`의 `.nav-button`.
   - 실제 background/border/specular/saturation/3겹 그림자와 다수 액션의 backdrop-filter 비용을 확인한다. 전달된 blur prop만으로 내부 준수를 확정할 수 없다.

4. **키보드 포커스와 좁은 화면의 탐색**
   - **근거:** `review-decision.md` Deferred to PoC의 키보드·터치 발견 가능성 및 포커스 표시.
   - **대상:** `.project-card-link`, `.project-card-trouble`, Glass 액션·캐러셀 버튼.
   - 768px 이하의 `.projects-carousel-nav-slot { display: none; }` 상태에서도 키보드로 다른 프로젝트에 접근 가능한지 확인한다. `canGoPrev`/`canGoNext` 변경으로 누른 버튼이 사라질 때의 포커스 위치도 확인한다.

5. **hover·유휴 모션·mask의 상호작용**
   - **근거:** `review-decision.md` Deferred to PoC의 motion 중첩 및 Swiper mask/clip 검증.
   - **대상:** `ProjectCard.tsx`의 `animate.y: [0, -6, 0]`, `whileHover.y: -10`, `scale: 1.02`; `Projects.scss`의 mask와 padding.
   - 카드 모서리·그림자·포커스 표시가 잘리지 않는지 확인한다. 동일 요소의 `animate.y`와 `whileHover.y`를 단순 합산한 주석의 “약 16px”은 실측 근거가 아니다.

6. **Reduced Motion의 최초 진입 및 실행 중 변경**
   - **근거:** `foundation.md` §8-4.
   - **대상:** `ProjectCard.tsx`의 `undefined` 모션 분기, `Projects.tsx`의 Swiper 전환, 미첨부 `GlassSurface`·`RevealSection`.
   - 설정 변경 시 기존 무한 루프가 정지하고 잔여 transform이 남지 않는지, 액션·포커스의 상태 표시는 유지되는지 확인한다.

7. **반응형 경계와 콘텐츠 밀도**
   - **근거:** `foundation.md` §3-2·§9-2, `review-decision.md` Deferred to PoC의 spacing/typography 검증.
   - **대상:** `Projects.tsx`의 `1200` 분기, `Projects.scss`의 `min(540px, 82%)` 및 모바일 슬라이드 폭, `ProjectCard.scss`의 제목 clamp와 모바일 피처 글자 크기.
   - 긴 제목·링크·스킬, 액션이 많은 카드에서 줄바꿈·읽기 크기·peek 비율을 확인한다. `1200` 예외의 필요성도 이때 검증한다.

## Final Assessment

**GO WITH CHANGES**

Glass를 실제 액션에만 적용하고, 카드 정보와 배지를 텍스트 기반 Content로 유지한 방향은 적절하다. 현재 발견된 문제도 새로운 레이아웃이나 컴포넌트 구조를 요구하는 문제가 아니라 기존 선언과 전환 설정의 정합성 문제다.

다만 현재 상태를 그대로 최종 GO로 볼 수는 없다. `Projects.scss`의 카드 `opacity: 0.45/0.78`, `ProjectCard.scss`의 Level 2 표면·hover 레시피 이탈과 `margin: 2px`, `Projects.tsx`의 Reduced Motion과 무관한 `speed={420}` 전환은 확정 규칙과 맞지 않는다. **이 네 항목의 정합성을 확보하고, 재질·대비·포커스·클리핑에 대한 브라우저 검증을 완료하는 조건으로 진행 가능하다.**