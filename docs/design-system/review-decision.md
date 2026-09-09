# Review Decision — Astra Design System Review 반영 결정

> 근거 문서: [[current-ui-audit]](./current-ui-audit.md) · [[visual-direction]](./visual-direction.md) · [[foundation]](./foundation.md) · [[astra-review]](./astra-review.md)
> 이 문서는 Astra Review에 대한 **공식 결정 기록**이다. Astra의 지적을 전부 수용하지 않으며, 아래 8개 결정만 [[visual-direction]]/[[foundation]]에 반영한다. 이 문서와 두 문서가 상충하는 경우 **이 문서가 우선**한다.
> 코드(React/SCSS) 변경은 포함하지 않는다.

---

## Accepted — 반영한 Astra 지적

| Astra 지적 | 결정 | 반영 위치 |
|---|---|---|
| ProjectCard 헤더 바가 "검토 대상"(visual-direction §2-2)인데 Foundation(§7·§17)이 이를 확정 근거로 승격시켜 사용함(astra-review §2, §12-1) | **Decision 1** — Content/Control/Concept 규칙으로 ProjectCard Glass 후보를 Project action / floating control / carousel control로 한정하고, 헤더 바는 Glass 후보에서 완전히 제외 | [[visual-direction]] §0, §2-2 · [[foundation]] §11, §11-2 |
| Glass 블러 규칙 상충 — §6은 모든 Level 3에 `--blur-lg`(24px) 고정을 요구하지만 §7·§11은 용도별 블러를 허용(astra-review §3) | **Decision 3** — "모든 Level 3 Glass는 blur-lg 24px" 규칙 제거. `blur-sm`/`-md`/`-lg`의 semantic usage로 대체 | [[foundation]] §6, §7 |
| Level 1/2 이름·의미가 shadow 크기 차이로만 설명되어 다크 테마에서 두 Level이 완전히 같아질 수 있음(astra-review §1) | **Decision 4** — Depth Level의 의미를 Canvas/Surface/Content/Glass Control/3D Object로 명확화. Level은 shadow 크기가 아니라 UI 역할을 나타낸다는 원칙을 명문화 | [[foundation]] §11 · [[visual-direction]] §2-3 |
| 3D 아이콘 포맷(정적 vs 실시간)이 열린 질문으로 남아 있었음([[visual-direction]] §4 질문 2) | **Decision 4** — Level 4(3D Object)는 기본적으로 정적 에셋을 전제. Three.js/WebGL 기반 실시간 3D는 기본 디자인 시스템 범위에서 제외, Hero 등 특정 영역은 향후 별도 검토 | [[foundation]] §11 · [[visual-direction]] §4 |
| Reduced Motion 전략이 "즉시 스냅"과 "350ms 대체 애니메이션"을 동시에 표준으로 제시해 모순됨(astra-review §11, ProjectCard PoC Checklist) | **Decision 6** — 두 전략을 하나의 원칙으로 통합: continuous animation 제거, 장식적 transform 제거, scale/translate 최소화, opacity/color 중심 상태 변화. 상태 변화는 유지하되 공간 이동만 최소화 | [[foundation]] §8-4 |
| 모든 새 z-index를 전역 표에 등록하도록 한 규칙이 지역적 겹침(컴포넌트 내부, 장식 pseudo-element)까지 포괄해 범위가 과함(astra-review Simplify) | **Decision 7** — Global stacking(전역 UI Layer)과 local stacking(컴포넌트 내부/장식 요소)을 구분. 전역 토큰 등록 의무는 Global stacking에만 적용 | [[foundation]] §10 |

---

## Kept As-Is — 의도적으로 유지한 설계 (Decision 8)

Astra의 지적과 관계없이 다음은 현재 Foundation을 그대로 유지한다. Astra 본인도 이 항목들은 "GO WITH CHANGES" 결론에서 별도 수정이 불필요하다고 평가했다.

- **Spacing 11단계 스케일** — 단계 수만으로 과설계라고 볼 근거가 없다는 Astra 평가(astra-review §5)를 그대로 채택. 압축하지 않는다.
- **Typography 8단계 스케일** — 콘텐츠 역할(Display/Heading/Body/Label/Caption)과 실제 사용처가 맞다는 평가(astra-review §6)를 그대로 채택.
- **Primitive Color 계층 미도입** — 현재 semantic color가 서로 다른 HEX 1개씩만 참조해 중복 제거 효과가 없다는 [[foundation]] §1-1 판단 유지.
- **`--warning`/`--info` 미추가** — 사용처 0건인 상태색을 추측성으로 만들지 않는다는 원칙 2·3 유지.
- **기존 토큰 재사용 원칙(원칙 1)** — `globals.scss`의 기존 토큰 이름·값을 그대로 유지하고 부족한 부분만 보강하는 방침 유지.
- **Glass 3겹 그림자 레시피(§5-3)와 `saturate(180%)` 고정값** — Decision 3으로 블러 값만 semantic usage로 나뉘고, 그림자 레시피와 채도 고정값은 "같은 재질"의 근거로 그대로 유지.
- **z-index 6개 전역 토큰 목록 자체** — Decision 7은 "등록 의무의 범위"만 global stacking으로 좁혔을 뿐, 기존 6개 토큰(`--z-header` ~ `--z-lightbox-top`)은 그대로 유지한다.
- **Foundation 토큰 총량(93개)** — 총량이 많다는 이유만으로 임의 축소하지 않는다. 축소는 실제 반복 사용 여부로만 판단한다(astra-review §4).

---

## Deferred to PoC — 브라우저에서 검증할 내용

이 문서에서 결정하지 않고, ProjectCard PoC 및 이후 컴포넌트 구현 단계에서 실제 브라우저로 확인한다. Astra Review의 "Must Validate in Browser" / "ProjectCard PoC Checklist"에서 이번 8개 결정으로 해소되지 않은 항목을 그대로 승계한다.

- Level 1과 Level 2가 다크 테마에서 실제로 구분되는지 — 특히 `--bg-elevated`와 `--card`가 같은 값(`#111827`)인 조합.
- Level 2 → Level 3 전환 시, 균일한 배경 위에서도 유리 재질감이 실제로 인지되는지(블러로 흐릴 디테일이 없는 경우).
- Light/Dark Glass가 알파값 차이에도 불구하고 "같은 재질"로 인지되는지.
- `data-theme` 속성이 실제로 부착되는 요소와, `--shadow-*`/`--border-accent-*` 같은 합성 토큰의 computed value가 의도대로 반영되는지.
- 텍스트 대비 4.5:1 실측 — 특히 `--text-muted` on `--bg-muted` 조합(계산상 약 4.46:1로 경계선), Glass 표면 위 텍스트.
- 3D 에셋의 조명 방향(좌상단)과 Glass 스페큘러 하이라이트가 "같은 광원"으로 실제 인지되는지.
- 정적 3D 에셋(포맷 자체는 Decision 4로 확정)의 실제 표시 크기/DPR별 선명도, 파일 크기, 테마별 대응 방식.
- Hover/Motion 중첩 시 배율 누적(카드+내부 버튼 등)과 기존 `rotateX`/pulse/shimmer가 신규 효과와 의도치 않게 중복되지 않는지.
- Swiper mask/clip 내부에서 그림자·hover 변형·포커스 표시가 잘리지 않는지.
- ProjectCard 액션 영역에 Glass를 적용했을 때 캐러셀에 반복 배치된 다수 카드의 backdrop-filter 성능.
- Spacing/Typography 스냅 값 변경(예: 56→48px, 26→22px 등)이 실제 콘텐츠·좁은 화면에서 미치는 영향.
- 키보드/터치에서 hover 액션 트레이의 발견 가능성과 포커스 표시.

---

## Final Rules — 최종 확정된 핵심 디자인 규칙

1. **Content = Solid, Control = Glass, Concept = 3D.** ProjectCard/제목/설명/피처 리스트/기술 배지/Article·README 본문/다이어그램 데이터 카드는 항상 불투명. Navigation/Header controls/CTA/Project action/Carousel control/Floating button/Modal control은 Glass 우선. 정보를 직접 전달하지 않는 개념 표현에만 3D를 사용한다.
2. **ProjectCard의 Glass는 Project action / floating control / carousel control로 한정한다.** 헤더 바(제목·타입 배지 영역)는 Glass 후보가 아니다.
3. **Glass blur는 semantic usage로 결정한다.** `blur-sm` = small glass control, `blur-md` = button/navigation, `blur-lg` = large floating surface/modal. "모든 Level 3는 24px" 규칙은 폐기됐다. 재질의 일관성은 blur 값이 아니라 background/border/highlight/specular/saturation 조합으로 유지한다.
4. **Depth Level은 shadow 크기의 단계가 아니라 UI 역할이다.** Level 0 Canvas(Page background) · Level 1 Surface(Section/Container) · Level 2 Content(ProjectCard/Modal Content) · Level 3 Glass Control(Button/Navigation/Floating UI) · Level 4 3D Object(Concept Icon). 3D는 기본적으로 정적 에셋을 전제하며, Three.js/WebGL 실시간 3D는 기본 범위 밖이다(Hero 등 특정 영역은 향후 별도 검토).
5. **Reduced Motion은 이동을 없애고 상태 변화를 유지한다.** Continuous animation 제거, 장식적 transform 제거, scale/translate 최소화·제거, opacity/color 중심의 상태 변화를 기본으로 한다.
6. **Global stacking과 local stacking을 구분한다.** 전역 UI Layer(헤더/모달/라이트박스 등 페이지 전체 컨텍스트에서 겹치는 요소)만 semantic z-index 토큰 등록 의무를 진다. 컴포넌트 내부 로컬 스택과 장식용 pseudo-element는 전역 토큰 대상이 아니다.
7. **Spacing 11단계, Typography 8단계, 기존 색상 토큰 체계는 그대로 유지한다.** 총 토큰 개수가 많다는 이유만으로 축소하지 않는다.
8. **이 문서로 해소되지 않은 나머지 Astra 지적(위 Deferred to PoC 목록)은 ProjectCard PoC 및 후속 컴포넌트 구현 단계에서 브라우저로 검증한다.** 검증 전까지는 미확정 상태로 취급하고, Foundation에 확정 근거로 승격시키지 않는다.

---

## 향후 구현 방향 — Design System Page (`/design-system`)

이번 디자인 시스템은 내부 문서로 끝나지 않는다. 최종적으로 포트폴리오에 `/design-system` 라우트를 만들어, 방문자가 실제 디자인 시스템을 볼 수 있는 **living design system page**로 제공할 예정이다.

**역할**
1. Foundation token 시각화
2. Level 0~4 Depth 비교
3. Light / Dark Glass 비교
4. 실제 Component 상태 확인
5. Motion / Reduced Motion 확인
6. 3D Concept Asset catalog
7. ProjectCard Playground
8. 포트폴리오 디자인 의도 설명

**범위**: Storybook 수준의 범용 component documentation tool을 만드는 것이 목표가 아니다. 포트폴리오의 디자인 철학과 구현력을 보여주는 visual documentation page가 목적이다.

**설계 원칙**: 향후 PoC와 컴포넌트 설계는 일회성 테스트 페이지가 아니라, `/design-system` 페이지에서 그대로 재사용할 수 있도록 고려한다 — 즉 ProjectCard PoC를 포함해 이후 만드는 검증용 화면은 처음부터 이 페이지의 구성 요소가 될 수 있는 형태로 만든다.

**현재 단계**: route나 component를 구현하지 않는다. 이 요구사항은 향후 구현 방향으로만 [[visual-direction]]과 이 문서에 기록한다.

---

## 부록: 관련 문서

- [[current-ui-audit]] — 현재 UI 실태 조사
- [[visual-direction]] — 5-Level Depth System, Glass/3D 적용 원칙, Design System Page 계획
- [[foundation]] — 토큰 명세
- [[astra-review]] — 이 결정의 근거가 된 리뷰
