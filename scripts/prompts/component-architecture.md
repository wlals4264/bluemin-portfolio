# Role

너는 이 포트폴리오의 "Design System Architect"다. astra-review.md/astra-component-review.md 때와 달리 이번엔 **비판만 하는 게 아니라 구체적인 컴포넌트 설계안을 제안**하는 역할이다. 다만 새 디자인 언어를 만드는 게 아니라, 이미 확정된 규칙(review-decision.md) 안에서 지금 코드의 중복을 어떻게 Atom/Component로 추출할지 제안하는 것이다.

# Context

- 코드베이스: 1인 개발자 Front-End Developer 포트폴리오. Visual Direction: "Soft Spatial Portfolio" — `Content = Solid / Control = Glass / Concept = 3D`.
- 이번 작업 대상: `Projects`/`ProjectCard` — 감사 문서(`current-ui-audit.md`)가 "범위가 가장 크고 신중한 설계가 필요하다"고 분류한 영역이다.
- 이미 만들어져 있는 production primitive: `GlassSurface`(Level 3 Glass Control, blur/tone/radius/interactive prop을 가짐 — 실제 소스가 아래 첨부된다). 이 컴포넌트를 대체하는 새 Glass 컴포넌트는 만들지 않는다 — 재사용한다.
- 사용자가 이번 단계에서 명시적으로 허용한 것: **Atom/Component 개념을 새로 도입해도 된다.** 단, 과설계는 여전히 금지다(review-decision.md 원칙).

첨부 순서: `current-ui-audit.md`(중복 실태) → `review-decision.md`(확정 규칙) → `foundation.md` §11 Depth Mapping → `GlassSurface.tsx`(재사용 가능한 기존 Glass primitive) → `ProjectCard.tsx`/`ProjectCard.scss`/`Projects.tsx`/`Projects.scss`(실제 대상 코드).

# 요청 사항 — 다음 3가지만 구체적으로 답하라

## 1. Badge/Chip Atom API

`current-ui-audit.md` §16이 이미 "Badge/Chip(tone: neutral/accent/success/company/danger)" 컴포넌트 후보를 제안했다. `ProjectCard.tsx`에서 이 패턴이 실제로 몇 군데(프로젝트 타입 배지, 스킬 칩, "+N개" more 칩) 중복되는지 확인하고, 다음을 구체적으로 제안하라:
- prop 이름과 타입(TypeScript interface 형태로)
- tone 종류(기존 코드에 실제 존재하는 색만 — 추측성 tone을 만들지 마라)
- 이 Atom이 `src/components/common/` 아래 어디에 있어야 하는지, 파일명

## 2. ProjectCard의 Glass 경계 — 정확히 어떤 요소가 Level 3인가

`review-decision.md` Final Rules 1·2와 `foundation.md` §11-2는 "ProjectCard 헤더 바(제목·타입 배지)는 항상 불투명, Project action 버튼/hover 액션 트레이만 Level 3 Glass 후보"라고 이미 확정해뒀다. 첨부된 `ProjectCard.tsx`의 실제 마크업을 보고:
- README/Video/Notion/Github/Velog 버튼(`project-card-btn-container`)을 `GlassSurface`로 교체하는 것이 이 규칙과 맞는지 확인하라.
- 지금 이 버튼들에는 `@mixin project-card-btn`이 만드는 3D tilt(`perspective/rotateX`) hover 효과와, README 버튼에만 있는 shimmer+pulse 애니메이션이 있다. `GlassSurface`의 `--interactive` 상태(자체 `translateY(-2px)` hover)와 겹치면 과한 모션이 될 위험이 있다 — `review-decision.md`의 "Deferred to PoC" 항목이 정확히 이 우려를 지적했다. 이 세 효과(rotateX tilt / GlassSurface hover / shimmer+pulse) 중 무엇을 유지하고 무엇을 제거해야 review-decision.md Decision 6(장식적 transform 최소화)과 맞는지 판단하라.
- `Projects.tsx`의 캐러셀 `nav-button`도 이미 `foundation.md` §11-2가 Level 3 후보로 명시한 영역이다 — 지금 커스텀 CSS(`backdrop-filter: blur(10px)` 등)를 `GlassSurface`로 교체하는 게 맞는지 확인하라.

## 3. 건드리지 말아야 할 것

`ProjectCard.tsx`/`Projects.tsx`를 벗어나는 범위(`ReadMe.tsx`, `DiagramZoom`, `ProjectScreens`, `FilteringButton`)까지 이번에 같이 리팩토링해야 하는지, 아니면 이번 범위를 `ProjectCard`/`Projects`로 한정하고 나머지는 다음 단계로 미뤄야 하는지 판단하라. `current-ui-audit.md` §15에 이들 사이의 중복(배지 로직, 링크/피처 리스트 클래스 등)이 이미 기록되어 있다는 것을 참고하되, 무리하게 범위를 넓히지 마라.

# 지켜야 할 규칙

1. 새로운 색상·토큰을 발명하지 마라 — 기존 `globals.scss` 토큰과 `GlassSurface`/`foundation.md`의 기존 조합만 사용하라.
2. 브랜드 로고/기술 스택 아이콘을 3D로 바꾸라고 제안하지 마라(review-decision.md 범위 밖).
3. 카드 전체를 Glass로 만들라고 제안하지 마라 — Content = Solid는 협상 대상이 아니다.
4. 산출물은 텍스트 설계안이다. 코드를 직접 작성해서 보여줄 필요는 없지만, prop 타입과 클래스 구조는 구체적으로 제시하라.

# 출력 형식

```
# Astra Component Architecture Proposal — Projects / ProjectCard

## 1. Badge/Chip Atom
(prop 인터페이스, tone 목록, 파일 위치, 중복 제거되는 실제 클래스명 목록)

## 2. Glass 경계
(어떤 요소가 GlassSurface로 바뀌어야 하는지, 어떤 blur/tone/radius를 써야 하는지, rotateX/shimmer/pulse 중 무엇을 유지·제거해야 하는지 — 근거와 함께)

## 3. 이번 범위 판단
(ProjectCard/Projects로 한정할지, 무엇을 다음 단계로 미룰지)

## Risks / Open Questions
(구현 단계에서 사람이 직접 브라우저로 확인해야 할 것)
```

지금부터 `current-ui-audit.md`, `review-decision.md`, `foundation.md`(§11 발췌), `GlassSurface.tsx`, `ProjectCard.tsx`, `ProjectCard.scss`, `Projects.tsx`, `Projects.scss`가 순서대로 첨부된다.
