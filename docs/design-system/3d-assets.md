# 3D Asset Pipeline

> 근거 문서: [[review-decision]](./review-decision.md) Decision 1 · [[visual-direction]](./visual-direction.md) §2-4 · [[foundation]](./foundation.md) §11

**Family**: Soft Spatial 3D — v1
**Status**: Production — 8종 production WebP 전부 생성·검사 완료. About Me·Experiences는 실제로 통합됐다(각각 profile/email/location/education, laptop). 나머지 메인 포트폴리오 영역(Hero/Career/Skills/Projects/ProjectCard/Header/Footer)에는 아직 통합하지 않았다 — 섹션 단위로 순차 진행한다.

---

## Concept = 3D 원칙

```
Content = Solid
Control = Glass
Concept = 3D
```

3D는 콘텐츠 자체의 정보를 직접 전달하지 않는, 개념(concept)을 보조·표현하는 요소에만 쓴다([[review-decision]] Decision 1). 기술 스택 로고 같은 브랜드 아이덴티티를 대체하지 않고, 이름·위치·이메일·학력·프로젝트 유형 같은 텍스트 정보도 대체하지 않는다 — 3D 아이콘이 없어도(또는 로드에 실패해도) 정보 자체는 항상 텍스트로 남아 있어야 한다. 이 3D asset은 UI Control이 아니라 Concept를 표현하는 **Level 4 visual object**다 — Glass 처리를 하지 않는다.

---

## Material

- translucent pale-blue glass
- warm white / ivory soft plastic
- polished but not metallic
- soft rounded surfaces
- subtle subsurface-like softness

색은 white / warm ivory / very pale blue / transparent-translucent blue를 기본으로 하고, 포트폴리오의 primary accent blue는 강조 요소로만 소량 사용한다 — 강한 blue 오브젝트가 화면 대부분을 차지하지 않게 한다.

## Camera

- orthographic-like
- 3/4 front perspective
- slightly elevated view
- 8개 asset 사이에서 camera angle이 크게 달라지지 않는다(family로 보이기 위한 최우선 조건 중 하나)

## Lighting

- soft top-left key light
- soft highlights
- subtle ambient illumination
- soft grounding shadow(오브젝트 자체에 내장 — 별도 CSS shadow를 필요로 하지 않는다)
- dramatic studio lighting 금지

## Geometry

- rounded, minimal, friendly, slightly chunky
- clean silhouette, sharp edge 지양
- 외곽 형태(silhouette)까지 하나로 통일하지는 않는다 — profile은 identity card, location은 pin, education은 cap, web은 browser window, mobile은 phone, analytics는 bar chart, laptop은 열린 노트북처럼 subject 고유의 실루엣을 유지한다. 통일해야 하는 것은 재질·조명·카메라·둥글기·색·visual weight이지 외곽 형태가 아니다.

---

## Asset Categories

**Info** (About Me의 실제 정보 필드 4개 — 이름/위치/이메일/학력, `mocks/myInfoData.tsx` — 와 1:1 대응)
- `profile` — Personal information
- `email` — Contact
- `location` — Location information
- `education` — Education background

**Concept** (프로젝트에서 실제로 다루는 기술 개념 + 경력/경험 개념)
- `web` — Web platform
- `mobile` — Mobile app
- `analytics` — Data analytics
- `laptop` — Coding / development education (Experiences의 "교육" 항목 전용, About Me의 `education`과는 다른 의미)

### 향후 추가 후보 (아직 slot 없음)

[[visual-direction]] §2-4에서 이미 식별된 개념 후보 — 실제 콘텐츠에 정보 공백이 있는 지점부터 우선순위를 정해 추가한다.

```
sleep · health · ai · project · company · team · personal
```

---

## Source → Production Pipeline

1. **생성**: `scripts/astra-image-test.ts`(Style Master `profile`) → `scripts/astra-3d-family.ts`(나머지 7종, `profile-poc.png`를 image input으로 참조) → `tmp/astra-3d/<key>-poc.png`(1024×1024 PNG, git에 커밋되지 않음). 새 subject를 추가할 때는 `scripts/prompts/subjects/<key>.md`를 쓰고 `SUBJECT_KEYS`에 추가한 뒤 `npm run astra:3d-family -- <key>`로 그 subject만 생성한다(기존 asset은 건드리지 않는다).
2. **검사 + 변환**: `scripts/promote-3d-assets.ts`(`npm run assets:promote-3d`) — 소스 PNG의 raw alpha 채널을 직접 읽어 검사하고, 진짜 transparency가 확인된 것만 512×512 WebP로 변환해 production 경로에 저장한다. 원본 PNG는 손상·삭제하지 않는다.

### Transparent Asset Policy

- "화면상 검게 보인다"는 이유만으로 opaque black background로 판단하지 않는다 — 이미지 뷰어는 흔히 투명 영역을 검게 렌더링한다. 판단은 항상 PNG의 raw alpha 채널 값(모서리 픽셀, 전체 투명 픽셀 비율)으로 한다.
- 배경이 실제로 baked-in 되어 있는 경우라도 **단순 black-threshold 삭제로 제거하지 않는다** — 이 asset들은 translucent glass material이라, 그런 방식은 유리 가장자리의 반투명 셰이딩까지 함께 지워 품질을 손상시킨다.
- alpha 채널이 정상으로 확인된 asset만 변환한다. 확인되지 않으면 **변환을 중단하고 보고한다** — 억지로 손상시켜 production에 올리지 않는다.
- 2026-09-09 실행 기준: 8개 전부 PASS(모서리 alpha=0, 투명 픽셀 53~72%, 완전 불투명 픽셀 0%) — 실제 raw pixel 검사 결과이며, 미리보기에서 검게 보이는 것은 뷰어의 렌더링 방식일 뿐 production 품질에는 영향이 없다.

## File Format

**Transparent WebP**, 512×512, quality 92 / alphaQuality 100(반투명 유리 가장자리 정밀도를 최우선으로 유지).

512는 `Icon3D`의 가장 큰 size 토큰인 `hero`(160px)를 3x DPR(Retina)까지 커버하는 최소 여유치(160×3=480 ≤ 512)를 기준으로 정했다 — 그 이상 해상도를 여러 벌 만들지 않는다(`next/image`가 요청 크기에 맞춰 자동으로 최적화해 서빙하므로, source가 하나만 있어도 충분하다).

## Naming

카테고리 디렉토리 안에서 `key.webp` 형태로 고정한다.

```
profile.webp
location.webp
email.webp
education.webp
web.webp
mobile.webp
analytics.webp
laptop.webp
```

## Directory

```
public/assets/3d/
  info/
    profile.webp
    location.webp
    email.webp
    education.webp
  concepts/
    web.webp
    mobile.webp
    analytics.webp
    laptop.webp
```

`public/images/`(프로젝트 스크린샷 등 콘텐츠 이미지)와는 다른 네임스페이스다 — `assets/3d/`는 디자인 시스템의 아이콘그래피 전용이라 분리했다.

---

## Usage Rules

- Technology logo 대체 금지 — 기술 스택 배지는 원본 브랜드 아이콘을 그대로 유지한다.
- 텍스트 정보 대체 금지 — 이름/위치/이메일/학력/프로젝트 유형 등은 이미지가 없어도(또는 로드 실패 시에도) 항상 텍스트로 존재해야 한다.
- 같은 조명 · 카메라 · material을 유지한다(Material/Camera/Lighting 참고) — 세트 안에서 톤이 갈리면 안 된다.
- continuous animation 금지 — `Icon3D`는 정적 이미지 컴포넌트다. 별도 애니메이션 래퍼가 추가되더라도 `prefers-reduced-motion`에서는 동작이 추가되지 않아야 한다.

## Minimum Recommended Visual Size

작은 크기에서도 실루엣이 즉시 읽혀야 한다는 원칙(각 subject 브리핑 공통 요구사항)에 따라, **48px 미만으로는 사용하지 않는다.** `Icon3D`의 최소 size 토큰은 `sm`(32px)이지만, 인라인 텍스트 옆(About Me 정보 리스트 등)처럼 실제로 작게 쓰이는 자리에서는 44~48px 이상을 권장한다. 정확한 하한은 asset이 실제 콘텐츠에 통합되는 다음 단계에서 육안으로 재확인한다.

## CSS Shadow Policy

`Icon3D`에는 강한 CSS drop-shadow를 적용하지 않는다 — asset 자체(Lighting 참고)에 이미 soft grounding shadow가 내장되어 있어서, CSS shadow를 더하면 이중 그림자(double-shadow)가 생긴다. `src/components/common/media/Icon3D.tsx` / `Icon3D.scss`에는 애초에 shadow 관련 스타일이 없다 — 앞으로도 추가하지 않는다.

---

## Icon3D Component

```tsx
<Icon3D src="/assets/3d/info/profile.webp" alt="" size="md" />
```

semantic name으로 쓰고 싶으면 `icon3dAssetsByKey`(단순 lookup, `src/mocks/icon3dAssets.ts`)를 함께 쓴다:

```tsx
import { icon3dAssetsByKey } from '@/mocks/icon3dAssets';

<Icon3D src={icon3dAssetsByKey.profile.src} alt="" size="md" />
```

- `size`: `sm(32px)` · `md(56px)` · `lg(96px)` · `hero(160px)`
- `alt`: 장식용이면 `""`, 텍스트 정보를 대체하는 경우에만 의미 있는 값
- `src`가 없거나 로드에 실패하면 깨진 이미지 아이콘 대신 조용한 placeholder(`pendingLabel`)를 보여준다.
- `next/image` 기반. 강한 CSS shadow를 기본 적용하지 않는다(CSS Shadow Policy 참고).

컴포넌트 자체 스펙은 `src/components/common/media/Icon3D.tsx` 참고.

---

## Generation Prompt Template

향후 새 asset을 생성할 때 쓰는 공통 템플릿. `[SUBJECT]`만 교체해서 세트 전체의 일관성을 유지한다. 실제 family 생성은 `scripts/astra-3d-family.ts` + `scripts/prompts/astra-3d-family-director.md`(공유 규칙) + `scripts/prompts/subjects/<key>.md`(subject별 브리핑) 구조로 이미 구현되어 있다 — 새 asset을 추가할 때는 이 템플릿을 참고해 `subjects/<key>.md`를 새로 쓰고 `astra-3d-family.ts`의 `SUBJECT_KEYS`에 추가한다.

```
Create a polished 3D icon of [SUBJECT] for a frontend developer portfolio design system.

Style:
- rounded geometry, minimal detail
- soft plastic + translucent glass material
- orthographic camera, 3/4 front perspective
- soft top-left lighting, subtle ambient shadow baked into the object
- clean silhouette, centered composition

Output:
- transparent background
- single centered object
- no text
- no logo
- no decorative background elements
```

`[SUBJECT]` 예시: "a simple rounded person silhouette representing a user profile", "an envelope representing email/contact", "a location pin", "a graduation cap", "a browser window representing the web", "a mobile phone", "a bar chart representing analytics".

---

## 아직 하지 않은 것

- Hero/Career/Skills/Projects/ProjectCard 등 나머지 콘텐츠 영역에 `Icon3D` 통합(About Me·Experiences는 완료) — 섹션 단위로 순차 진행
- `sleep`/`health`/`ai`/`project`/`company`/`team`/`personal` slot 추가
- Three.js/WebGL 기반 실시간 3D(review-decision.md Decision 4에 따라 기본 범위 밖, Hero 등 특정 영역에서 필요 시 별도 검토)

---

## 부록: 관련 문서

- [[review-decision]] — Decision 1(Content = Solid / Control = Glass / Concept = 3D), Decision 4(정적 에셋 우선)
- [[visual-direction]] — §2-4 3D Visual Language, 개념 매핑 표
- [[foundation]] — §11 Depth Mapping (Level 4 = 3D Object)
