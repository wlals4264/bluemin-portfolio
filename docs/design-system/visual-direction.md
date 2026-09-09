# Visual Direction: Soft Spatial Portfolio

> 목적: [[current-ui-audit]](./current-ui-audit.md)에서 확인한 현재 UI 실태를 바탕으로, 다음 리팩토링 단계(토큰 명세 → 컴포넌트 명세)의 기준이 될 **비주얼 방향**을 정의한다.
> 이 문서는 **방향성 문서**이며, 최종 토큰 값(§4의 수치는 예시적 기준선)이나 컴포넌트 API를 확정하지 않는다. 코드/SCSS 변경 없음.
> Astra Design System Review 이후, 이 문서와 [[foundation]] 사이의 상충 지점은 [[review-decision]](./review-decision.md)에서 공식 조정되었다. 상충 시 review-decision.md가 우선한다.

---

## 0. 핵심 원칙 — Content / Control / Concept

새 디자인 시스템 전체를 관통하는 **가장 중요한 규칙**이다([[review-decision]] Decision 1). 이후의 모든 Glass/3D 적용 판단은 이 규칙을 최우선 기준으로 삼는다.

```
Content = Solid
Control = Glass
Concept = 3D
```

### Content — 기본적으로 불투명 Surface

다음은 항상 불투명 Surface(Level 2: Content, §2-3)를 유지한다.

- ProjectCard
- Project title
- Project description
- Feature list
- Skill / Technology badge
- Article / README content
- Diagram data card

### Control — 사용자와 상호작용하는 floating UI

사용자와 상호작용하는 floating UI에는 Glass를 우선 사용한다.

- Navigation
- Header controls
- CTA
- Project action
- Carousel control
- Floating button
- Modal control

### Concept — 정보를 직접 전달하지 않는 요소

3D는 콘텐츠 자체의 정보를 직접 전달하지 않는, 개념(concept)을 보조·표현하는 요소에만 사용한다(§2-4 3D Visual Language).

### ProjectCard의 Glass 적용 범위 (제한)

ProjectCard는 Content(카드 본문 전체)이면서 동시에 일부 Control(액션 영역)을 포함하는 복합 컴포넌트다. Glass 적용 후보는 다음으로 **제한**한다.

- Project action (README/GitHub/Notion 등 액션 버튼)
- floating control (hover 시 나타나는 액션 트레이 등)
- carousel control (캐러셀 nav-button)

카드의 **헤더 바(제목·타입 배지 영역)는 Glass 후보에서 제외**한다. 이 헤더 바를 Glass "검토 대상" 또는 확정 사용처로 표현한 이전 서술(§2-2, [[foundation]] §7·§17)은 이 결정으로 대체됐다 — 헤더 바는 프로젝트 식별 정보를 담은 Content이므로 항상 불투명을 유지한다.

---

## 1. Concept — "Soft Spatial Portfolio"

기존 포트폴리오의 **정보 구조와 가독성**을 그대로 유지한 채, **Glass Surface**와 **3D Icon**으로 화면에 공간감(depth)을 더한다.

> 이건 "포트폴리오를 유리로 뒤덮는" 리디자인이 아니다. 지금도 [[current-ui-audit]] §7·§8에서 확인했듯 헤더·버튼 일부에 이미 유리 질감이 적용돼 있고, 이번 방향은 **그 적용 범위를 의도적으로 통제**하면서 3D 아이콘이라는 새 레이어를 더하는 것에 가깝다.

핵심 태도: **Glass와 3D는 장식이 아니라 위계(hierarchy) 신호다.** 어떤 표면이 "떠 있는 컨트롤"인지, 어떤 표면이 "읽어야 할 콘텐츠"인지를 depth로 구분해서 보여주는 데 쓴다. 모든 표면을 같은 강도로 유리화하면 이 신호 자체가 무의미해지므로, 감사 문서에서 지적한 "유리 다층 그림자 레시피가 파일마다 제각각"(audit §6, §15-8) 같은 비일관성을 이번 기회에 "의도된 5단계 depth 시스템"으로 대체한다.

---

## 2. Visual Principles

### 2-1. Content First

- 우선순위: **프로젝트 콘텐츠와 개발 경험 서술 > 장식적 표현.** Glass·3D는 정보 전달 경로 위에 있어서는 안 되고, 정보 전달 경로 옆이나 뒤에 있어야 한다.
- 실행 규칙:
  - 텍스트가 주된 콘텐츠인 표면(경력 서술, README 본문, 프로젝트 카드의 feature 리스트)은 **항상 불투명 배경**을 유지한다 — audit §18-5에서 이미 식별한 "긴 텍스트 위 카드는 유리 리스크" 원칙을 그대로 채택.
  - 어떤 요소에 Glass/3D를 적용할지 판단할 때 기준은 하나: **"이 요소가 사라져도 사용자가 프로젝트 정보를 읽는 데 지장이 없는가?"** — 그렇다면(=컨트롤/장식) 적용 대상, 아니라면(=콘텐츠 본문) 제외 대상.
  - 대비(contrast) 기준: 텍스트가 놓이는 모든 표면은 WCAG AA(4.5:1, 작은 텍스트 기준) 이상을 유리 여부와 무관하게 유지해야 한다. 유리 표면 위에 텍스트를 얹어야 하는 경우(예: 헤더 로고) 배경 대비를 별도로 검증한다.

### 2-2. Controlled Glass

Glass는 **"떠 있는" 성격을 가진 표면**에만 적용한다. 콘텐츠 자체가 아니라 콘텐츠 위/앞에서 동작하는 레이어라는 뜻이다.

**적용 대상 (Glass 허용 영역)**

| 영역 | 현재 코드 위치 | 상태 |
|---|---|---|
| Header | `Header.scss`, `Nav.scss`(모바일 드롭다운) | 이미 적용됨 — 유지 |
| Navigation (캐러셀 화살표 등) | `Projects.scss:93-151` `.nav-button` | 이미 유사 적용 — `IconButton(glass)`로 정리 예정 |
| Floating Controls (TopBtn, 필터 칩, 라이트박스 닫기/이전·다음) | `TopBtn.tsx`, `FilteringButton.scss`, `DiagramZoom.scss`, `ProjectScreens.scss` | 일부만 적용(TopBtn) — 확대 대상 |
| CTA (소셜/이력서 버튼, README 열기 버튼) | `IntroductionBtns.tsx`, `ProjectCard.scss`(`read-me-btn`) | GlassButton은 적용됨, `read-me-btn`은 미적용(§2-2 하단 참고) — 확대 검토 |
| ProjectCard의 **액션 영역만** | `ProjectCard.scss:260-303`(액션 버튼), hover 액션 트레이(도입 시) | Project action / floating control로 한정(§0). 헤더 바·본문은 Content로 항상 불투명 |
| Hero decorative elements (프로필 유리판 프레임) | `Introduction.scss:60-149` `.glass-plate`, `.glass-shine` | 이미 적용됨 — 유지, 다만 §2-5 모션 원칙에 따라 continuous shine sweep은 재검토 대상 |

**비적용 대상 (Glass 금지 영역)**

| 영역 | 근거 |
|---|---|
| 긴 텍스트 블록(Career 서술, README 본문, About/Experiences 본문) | 가독성이 최우선 콘텐츠 — audit §18-5 |
| CodeSnap 터미널 | 의도된 불투명 터미널 컨셉과 충돌 — audit §18-5 |
| 기술 Stack Badge (Skills 섹션, 프로젝트 카드 스킬 칩) | 브랜드 고유색 자체가 정보값 — 반투명 시 인식성 저하, audit §1-2·§18-5 |
| Diagram의 작은 데이터 카드 (`hl-stat-card`, `hl-funnel-stage`, `hl-compare-card`, `hl-flow-step`, `hl-chip`) | 9~13px의 정밀한 수치 전달 목적, 다수 카드 동시 blur 시 렌더링 비용 우려 — audit §10, §18-5 |

**ProjectCard 관련 판단 근거(추가 설명)**: audit §9에서 프로젝트 카드는 "그라디언트 배경 + hover 시 accent 틴트 그림자"로 이미 Level 2(Content, §2-3 참고)에 해당하는 입체감을 갖고 있다. 카드 표면 전체를 유리화하면 그 안의 feature 리스트·스킬 칩(모두 비적용 대상)까지 유리 배경 위에 얹히게 되어 원칙이 충돌한다. §0(Content/Control/Concept)에 따라 카드의 **본문·헤더 바는 Level 2 불투명 표면을 항상 유지**하고, **Project action 버튼**과 **hover 시 나타나는 floating 액션 트레이**만 Level 3(Glass Control)로 격상한다. 헤더 바는 후보에서 제외됐으므로 더 이상 열린 질문이 아니다 — 정확한 트레이 UI 구현 방식만 컴포넌트 명세/PoC 단계에서 확정한다.

### 2-3. Spatial Depth — 5-Level 시스템

현재 코드베이스는 그림자·블러·보더가 컴포넌트마다 독립적으로 조합되어 있어(audit §6, §15-8, §15-11) "어떤 표면이 다른 표면보다 위에 있다"는 신호가 일관되지 않는다. 이를 명시적 5단계로 재정의한다. 아래 값은 **방향을 보여주는 기준선**이며 최종 수치는 토큰 명세 문서에서 확정한다.

**Level은 shadow 크기의 단계가 아니라 UI 요소의 역할(role)을 나타낸다**([[review-decision]] Decision 4) — §0의 Content/Control/Concept 원칙과 직접 대응한다: Level 0~2는 Content/배경, Level 3은 Control, Level 4는 Concept.

| Level | 이름 | 의미 | Shadow | Blur(backdrop) | Opacity/배경 | Border | 현재 코드 대응 예 |
|---|---|---|---|---|---|---|---|
| 0 | Canvas | 페이지 최하단 배경, 그 자체로는 상호작용 없음 | 없음 | 없음 | `--bg` 불투명 + ambient wash | 없음 | `AmbientBackground.scss` |
| 1 | Surface | 콘텐츠가 놓이는 기본 표면(Section/Container, 카드 아님) | 없음 또는 `xs`(거의 안 보임) | 없음 | `--bg` / `--bg-elevated` 불투명 | 없음 또는 hairline | `hl-diagram-box`, 섹션 본문 |
| 2 | Content | 명확히 구분되는 콘텐츠 컨테이너(ProjectCard/Modal Content) | `sm`~`md`, 중립색(`--shadow`) | 없음 | `--card` 불투명(그라디언트 허용) | `1px solid var(--border)` | `ProjectCard`, `BlogPostCard`, README 컨테이너 |
| 3 | Glass Control | 콘텐츠 위/앞에서 동작하는 Button/Navigation/Floating UI | `md`~`lg`, accent 틴트 가능 + inset 하이라이트(스페큘러) | `sm`~`lg`(§7 semantic usage) + saturate | `--glass-bg`/`-strong`(반투명) | `1px solid var(--glass-border)` | Header, GlassButton, 캐러셀 nav-button, TopBtn |
| 4 | 3D Object | 개념(Concept)을 표현하는 3D 아이콘·일러스트 자체 | 자체 ambient shadow(오브젝트에 내장, §2-4) | 배경 없음(투명) | 배경 투명, 오브젝트 자체 반투명/불투명 혼합 | 없음(오브젝트 실루엣이 경계) | (신규 도입 — §2-4) |

**구분 원칙**:
- Level이 하나 올라갈 때마다 **그림자가 진해지거나(Level 1→2), 블러가 생기거나(Level 2→3), 배경이 투명해지거나(Level 3→4)** 중 최소 하나는 반드시 바뀌어야 한다 — 두 레벨이 시각적으로 구분 안 되면 5단계 체계가 무의미해진다. 다만 이 구분이 모든 테마 조합(특히 다크 모드)에서 실제로 지켜지는지는 토큰 값만으로 보장되지 않으므로 [[review-decision]]의 Deferred to PoC 항목으로 별도 검증한다.
- **Level 3(Glass Control)는 항상 Level 0/1/2 위에 얹힌다는 전제**로만 설계한다 — 즉 유리 요소 뒤에 항상 콘텐츠나 배경이 비쳐야 자연스럽다. 유리 요소끼리 겹치는 상황(예: 모달 위의 유리 버튼)은 별도 검토 대상.
- Level 4(3D Object)는 위계상 가장 눈에 띄지만 **면적은 가장 작아야 한다** — 아이콘 크기 수준(§2-4)이지 배경을 채우는 용도가 아니다. 구현은 기본적으로 **정적 에셋을 전제**하며, Three.js/WebGL 기반 실시간 3D는 기본 디자인 시스템 범위에서 제외한다 — 향후 Hero 등 특정 영역에서 명확한 필요가 생길 경우에만 별도로 검토한다([[review-decision]] Decision 4).

### 2-4. 3D Visual Language

**조형 스타일** (모든 3D 아이콘 공통):
- rounded geometry (각진 모서리 지양)
- minimal detail (실사 텍스처·복잡한 표면 디테일 지양)
- soft plastic + translucent glass 혼합 재질감(오브젝트에 따라 선택)
- orthographic camera, 3/4 front perspective (통일된 카메라 각도)
- soft top-left lighting, subtle ambient shadow (통일된 광원 방향 — Level 3 유리 표면의 스페큘러 하이라이트가 "왼쪽 위에서 오는 빛"이라는 전제와 동일한 광원 규칙을 공유해 Glass와 3D Icon이 같은 조명 세계관에 있는 것처럼 보이게 한다)
- transparent background, centered composition

**적용 범위 원칙**: 3D Icon은 **개념(concept)을 표현하는 데 사용**하고, **브랜드 아이덴티티를 표현하는 데는 사용하지 않는다.**

- ❌ React, Next.js, Flutter, TypeScript 등 기술 스택 로고(`skillsInfo.tsx`) — 각 서비스의 공식 브랜드 자산이므로 임의로 3D화하지 않고 **원본 아이덴티티(현재의 `react-icons` 플랫 로고) 유지**. audit §18-6에서도 동일하게 결론.
- ✅ 정보/개념 아이콘 — 현재 포트폴리오 콘텐츠에서 실제로 등장하는 개념들과 매핑하면:

| 개념(concept) | 현재 코드 대응 | 현재 구현 |
|---|---|---|
| profile | `myInfoData.tsx`(About Me), `IoPersonSharp` | 2D 아이콘, 28px 단색 |
| location | `myInfoData.tsx`, `MdPlace` | 2D 아이콘 |
| education | `experienceData.tsx`, `RiGraduationCapFill` | 2D 아이콘 |
| project type (company/team/personal) | `project-card-info-project-type` 배지(`ProjectCard.scss:104-132`, `ReadMe.scss:107-129`) | 현재 텍스트뿐, 아이콘 없음 — 신규 추가 여지 |
| sleep | 꿀잠닥터 프로젝트(`projects.ts`, 수면 루틴/알람 기능) | 현재 별도 아이콘 없음 |
| health | 꿀잠닥터의 걸음수·HealthKit 연동(`highlightsData.ts` "걸음수(HealthKit)"), `StepSyncCloseup.tsx` | 다이어그램 스크린샷으로만 표현 |
| mobile | Flutter/RN 마이그레이션 관련 프로젝트, 프로젝트 타입 구분 | 현재 별도 아이콘 없음 |
| web | Next.js 기반 프로젝트(OOOTTT, MOMO, OlaOla) | 현재 별도 아이콘 없음 |
| analytics | HighlightDiagrams 전 계열(`hl-stat-card`, `FunnelStatsPreview`, `SprintDashboardPreview`, `AdminDashboardPreview`) | 수치 카드로만 표현, 대표 아이콘 없음 |
| AI | Cursor 기반 AI 개발 워크플로우(`projects.ts:78`), `cursor` 스킬 배지 | 텍스트로만 언급 |

이 표는 "3D 아이콘을 만들어야 할 우선순위 후보"로도 읽을 수 있다 — 특히 project type / sleep / health / analytics / AI는 **현재 시각적 표현이 전혀 없거나 텍스트/스크린샷뿐**이라, 3D 아이콘 도입 시 정보 전달력이 실제로 개선되는 지점이다(audit §18-6과 연결).

**우선 적용 순서 제안** (Content First 원칙에 따라 "장식 효과가 큰 곳"이 아니라 "현재 정보 공백이 있는 곳"부터):
1. project type 배지(company/team/personal) — 현재 텍스트만 있어 스캔성이 낮음
2. About Me / Experiences 정보 아이콘(profile/location/education) — 이미 아이콘 자리가 있어 교체 난이도 낮음, 히어로 인접 영역이라 체감 효과 큼
3. 개념 아이콘(sleep/health/mobile/web/analytics/AI) — 프로젝트 하이라이트 섹션에 새로 도입, 정보 공백을 메움
4. CTA/소셜 아이콘 — 우선순위는 낮음(플랫 아이콘으로도 충분히 기능함), 다만 히어로 쇼케이스 목적이면 조기 적용도 가능

**3D화하지 않는 편이 나은 아이콘** (audit §18-6과 동일 결론 유지): 캐러셀 화살표, 모달 닫기(×) 등 고빈도·저지속 컨트롤 아이콘은 2D 유지 — 3D 오브젝트는 인지에 순간적인 "무게"를 부여하므로, 매 hover마다 반복 노출되는 마이크로 컨트롤에는 오히려 방해가 된다.

### 2-5. Motion

Motion의 목적은 **물리적인 depth를 강조하는 것**으로 한정한다. 장식적 지속 애니메이션은 사용하지 않는다.

**Hover 시 허용되는 조합** (조합 가능, 전부 강제는 아님):
- subtle `translateY` (예: -2~-4px 수준 — audit §13에서 확인된 기존 `translateY(-2px)`~`translateY(-3px)` 범위를 상한으로 유지, 그 이상의 과장된 이동은 지양)
- slight `scale` (1.02~1.06 수준 — 기존 `GlassButton`의 `scale(1.05)`, 캐러셀 nav-button의 `scale(1.06)`이 이 범위의 참고 상한)
- shadow change (Level이 하나 진해지는 정도 — 예: Level 2 카드가 hover 시 Level 3에 준하는 그림자로 전환)
- specular highlight (Level 3 Glass 표면의 `inset` 하이라이트가 hover 시 밝아지는 정도)

**금지/축소 대상 — 과도한 continuous animation**: 이 원칙은 현재 코드베이스의 다음 항목들과 직접 충돌하므로, 이후 구현 단계에서 재검토가 필요하다는 점을 명시해 둔다(지금 문서에서는 코드 변경 없음, 방향만 표시):

| 현재 continuous 애니메이션 | 위치 | 이 원칙과의 관계 |
|---|---|---|
| `glass-shine-sweep`(6s infinite 대각선 shimmer) | `Introduction.scss:145` | Hero decorative element라 완전 배제 대상은 아니나, "hover가 아닌 항상 재생"이라는 점에서 축소·정지 검토 대상 |
| `read-me-pulse` + `read-me-shimmer`(1.8s infinite) | `ProjectCard.scss:274,289` | CTA 버튼의 지속 pulse — Controlled Glass 대상(§2-2)이자 Motion 원칙과 정면 충돌, hover-only 강조로 전환 검토 |
| `keyword-float-a`/`-b`(5.5~6.2s infinite 부유) | `KeywordBubbleChart.scss:58-66` | 버블 차트 고유의 물리 시뮬레이션 성격이 강해 다른 항목과 달리 유지 여지가 있음 — 콘텐츠 자체가 "떠다니는 키워드 구름"이라는 컨셉이므로 예외 검토 |
| 캐러셀 카드 "idle 둥둥" 애니메이션(주석상 언급, `Projects.scss:23` 주변) | `Projects.tsx` (JS 구현 추정) | 지속 float 애니메이션 — 이 원칙에 따라 제거 또는 hover 반응형으로 전환 검토 |

**Reduced Motion**: `prefers-reduced-motion: reduce`는 **모든 motion — 신규로 추가되는 것뿐 아니라 기존에 남기기로 한 것까지 포함해 예외 없이** 대응해야 한다. Audit §13-2에서 이미 3곳에만 대응이 있고 나머지(라이트박스 fade 등)는 누락된 상태임을 확인했다 — 이번 방향 전환을 계기로 **"새로 만드는 모든 애니메이션은 reduced-motion 분기를 함께 작성한다"를 필수 규칙으로 승격**한다.

Reduced Motion에서 무엇으로 대체할지는 다음을 기본 원칙으로 한다([[review-decision]] Decision 6 · [[foundation]] §8-4):
- continuous animation 제거
- 장식적 transform(shine sweep, float, pulse 등) 제거
- scale / translate 최소화 또는 제거
- opacity / color 중심의 상태 변화 사용

상태 변화 자체는 유지하되, 공간 이동(위치·크기 변화)만 최소화한다.

---

## 3. 이 방향이 audit의 어떤 문제를 해결하는가

[[current-ui-audit]]에서 지적된 항목 중 이 Visual Direction으로 직접 해소되는 것:

- §6(Shadow 3계열 비일관) → §2-3의 5-Level 시스템으로 흡수.
- §7(backdrop-filter blur 강도가 4/8/10/20/24px로 제각각) → Level 3 정의에서 `blur-sm`/`-md`/`-lg` semantic usage로 정리([[review-decision]] Decision 3 · [[foundation]] §7).
- §11(아이콘이 전부 2D 플랫) → §2-4에서 3D 도입 범위와 우선순위를 명시.
- §13(continuous animation 남발, reduced-motion 대응 3곳뿐) → §2-5에서 hover-only 원칙과 "신규 애니메이션 필수 규칙"으로 개선 경로 제시.
- §18-4/§18-5(Glass 적용/비적용 판단이 산발적 제안이었음) → §2-2에서 표 형태의 명확한 허용/금지 목록으로 확정.

반대로 이 방향이 **다루지 않는** 것(다음 단계 문서로 이관):
- 정확한 토큰 수치(`--space-*`, `--radius-*`, `--shadow-*` 등 최종 값) — audit §18-1 후보를 기반으로 별도 토큰 명세 문서에서 확정.
- 컴포넌트 API/props 설계(`GlassButton` 확장, `IconButton`, `Card` 등) — audit §18-2/§18-3 후보를 기반으로 별도 컴포넌트 명세 문서에서 확정.
- 3D 아이콘의 실제 제작 방식(모델링 툴, 포맷, 파일 크기 예산, 애니메이션 도입 여부) — 별도 3D 에셋 파이프라인 문서 필요.

---

## 4. 열린 질문 (다음 단계 착수 전 확인 필요)

1. ~~**ProjectCard 부분 유리화의 정확한 경계**~~ — **해결됨**([[review-decision]] Decision 1, §0 참고): Project action / floating control / carousel control로 한정, 헤더 바는 제외. 남은 것은 hover 트레이의 정확한 UI 구현 방식뿐이며 이는 컴포넌트 명세/PoC 단계 사안이다.
2. ~~**3D 아이콘 포맷**~~ — **해결됨**([[review-decision]] Decision 4): 기본적으로 정적 이미지(PNG/WebP)를 전제하고, Three.js/WebGL 기반 실시간 3D는 기본 범위에서 제외한다. Hero 등 특정 영역에서 명확한 필요가 생기면 그때 별도 검토한다. 정적 에셋의 구체 스펙(해상도, 압축, 파일 크기 예산)은 별도 3D 에셋 파이프라인 문서에서 확정한다.
3. **`glass-shine-sweep`/`read-me-pulse` 등 기존 continuous 애니메이션의 존치 여부** — 완전 제거 vs hover-trigger로 전환 vs 유지(예외 승인). (Reduced Motion에서의 처리 방식은 Decision 6으로 확정됐지만, 일반 모드에서 계속 재생할지 여부는 아직 열려 있다.)
4. **다크 모드에서의 Level 3 Glass 톤** — 현재 `--glass-bg`가 다크에서 `rgba(255,255,255,.08)`로 매우 옅은데(audit §1-1), 3D 아이콘의 "soft top-left lighting"이 다크 배경에서도 동일한 인상을 주는지 별도 검증 필요.

---

## 5. 향후 구현 방향 — Design System Page (`/design-system`)

이번 디자인 시스템은 내부 문서로 끝나지 않는다. 최종적으로 포트폴리오 내부에 `/design-system` route를 만들고, 실제 디자인 시스템을 방문자가 볼 수 있는 **living design system page**로 제공할 예정이다.

**Design System Page의 역할**:
1. Foundation token 시각화
2. Level 0~4 Depth 비교
3. Light / Dark Glass 비교
4. 실제 Component 상태 확인
5. Motion / Reduced Motion 확인
6. 3D Concept Asset catalog
7. ProjectCard Playground
8. 포트폴리오 디자인 의도 설명

**목표가 아닌 것**: Storybook 수준의 범용 component documentation tool을 만드는 것은 목표가 아니다. 포트폴리오의 디자인 철학과 구현력을 보여주는 visual documentation page가 목적이다.

**설계 원칙**: 향후 PoC와 component 설계는 일회성 테스트 페이지가 아니라, `/design-system` 페이지에서 그대로 재사용할 수 있도록 고려한다.

**현재 단계**: route나 component를 구현하지 않는다. 이 요구사항은 향후 구현 방향으로만 이 문서와 [[review-decision]]에 기록한다.

---

## 부록: 관련 문서

- [[current-ui-audit]] — 이 문서의 근거가 된 현재 UI 실태 조사
- [[review-decision]] — Astra Review에 대한 공식 결정, 이 문서와 [[foundation]]의 상충 조정
- (예정) `docs/design-system/tokens.md` — Foundation Token 최종 명세
- (예정) `docs/design-system/components.md` — Primitive/Composite Component 명세
