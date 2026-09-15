import DesignSystemSection from '@/components/design-system/DesignSystemSection';

import '@/styles/design-system/FoundationTokens.scss';

type ColorSwatch = { token: string; note?: string };
type ColorGroup = { title: string; kind: 'fill' | 'text' | 'border'; items: ColorSwatch[] };

/**
 * Glass 계열(--glass-*)은 GlassMaterialPreview가 이미 실사용 맥락(배경 위 blur)으로
 * 보여주고 있어 여기서 다시 평면 스와치로 보여주면 같은 토큰을 두 번 설명하게 된다
 * → Color 섹션에서는 의도적으로 제외한다.
 * 근거: docs/design-system/foundation.md §1
 */
const COLOR_GROUPS: ColorGroup[] = [
  {
    title: 'Surface',
    kind: 'fill',
    items: [
      { token: '--bg', note: 'Canvas' },
      { token: '--bg-elevated', note: 'Surface' },
      { token: '--bg-muted', note: '배지 · 보조 표면' },
      { token: '--card', note: 'Content' },
    ],
  },
  {
    title: 'Text',
    kind: 'text',
    items: [
      { token: '--text', note: '본문' },
      { token: '--text-soft', note: '중간 톤' },
      { token: '--text-muted', note: '보조 · 라벨' },
    ],
  },
  {
    title: 'Border',
    kind: 'border',
    items: [
      { token: '--border', note: '기본 테두리' },
      { token: '--border-accent-subtle', note: 'accent 35%' },
      { token: '--border-accent-strong', note: 'accent 45%' },
    ],
  },
  {
    title: 'Accent',
    kind: 'fill',
    items: [
      { token: '--accent', note: '기본' },
      { token: '--accent-hover', note: 'hover' },
      { token: '--accent-soft', note: '옅은 배경' },
    ],
  },
  {
    title: 'Status',
    kind: 'fill',
    items: [
      { token: '--success', note: '성공' },
      { token: '--danger', note: '위험' },
      { token: '--company', note: '회사 프로젝트 배지' },
    ],
  },
];

const SPACE_TOKENS: Array<{ token: string; px: number }> = [
  { token: '--space-1', px: 4 },
  { token: '--space-2', px: 8 },
  { token: '--space-3', px: 12 },
  { token: '--space-4', px: 16 },
  { token: '--space-5', px: 20 },
  { token: '--space-6', px: 24 },
  { token: '--space-7', px: 32 },
  { token: '--space-8', px: 40 },
  { token: '--space-9', px: 48 },
  { token: '--space-10', px: 64 },
  { token: '--space-11', px: 72 },
];

const RADIUS_TOKENS: Array<{ token: string; label: string }> = [
  { token: '--radius-sm', label: '8px' },
  { token: '--radius-md', label: '12px' },
  { token: '--radius-lg', label: '16px' },
  { token: '--radius-pill', label: 'pill' },
  { token: '--radius-full', label: 'full' },
];

const TYPE_TOKENS: Array<{ token: string; px: number; role: string }> = [
  { token: '--text-display', px: 56, role: 'Display' },
  { token: '--text-heading-lg', px: 32, role: 'Heading LG' },
  { token: '--text-heading-md', px: 22, role: 'Heading MD' },
  { token: '--text-heading-sm', px: 17, role: 'Heading SM' },
  { token: '--text-body', px: 15, role: 'Body' },
  { token: '--text-body-sm', px: 14, role: 'Body SM' },
  { token: '--text-label', px: 12, role: 'Label' },
  { token: '--text-caption', px: 11, role: 'Caption' },
];

const SHADOW_TOKENS: Array<{ token: string; role: string }> = [
  { token: '--shadow-xs', role: '카드 미세 경계' },
  { token: '--shadow-sm', role: '살짝 뜬 표면' },
  { token: '--shadow-md', role: '호버 · 강조' },
  { token: '--shadow-lg', role: '플로팅 · 모달' },
];

/**
 * Foundation Token 시각화 — Color / Spacing / Radius / Typography / Shadow.
 * page.tsx가 v0.1에서 비워둔 "Foundation token 전체 시각화" 역할을 채운다.
 * 근거: docs/design-system/foundation.md(§1 Color, §2 Spacing, 방사형 Radius §미표기,
 * §3 Typography, Shadow는 globals.scss `--shadow-*` 스케일)
 *
 * 값을 새로 발명하지 않고 globals.scss에 이미 정의된 토큰을 var()로 그대로 읽어와
 * 보여준다 — 이 컴포넌트가 값을 하드코딩하면 토큰이 바뀔 때 문서가 조용히 거짓말을
 * 하게 되므로, 항상 실제 CSS 변수 참조만 사용한다.
 */
const FoundationTokens = () => {
  return (
    <DesignSystemSection
      id="foundation-tokens"
      eyebrow="Foundation · §1–§3"
      title="Foundation Tokens"
      description="색·여백·모서리·글자 크기·그림자처럼 화면 전체에서 반복해 쓰이는 가장 작은 단위예요. 컴포넌트는 이 값을 직접 정하지 않고 여기 있는 토큰을 가져다 씁니다 — 그래서 하나만 바꿔도 포트폴리오 전체가 같이 바뀌어요.">
      <div className="foundation-tokens">
        <div className="foundation-tokens__block">
          <p className="foundation-tokens__block-title">Color</p>
          <div className="foundation-tokens__color-groups">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title} className="foundation-tokens__color-group">
                <p className="foundation-tokens__color-group-title">{group.title}</p>
                <div className="foundation-tokens__color-row">
                  {group.items.map((item) => (
                    <div key={item.token} className="token-swatch">
                      {group.kind === 'text' ? (
                        <div className="token-swatch__box token-swatch__box--text">
                          <span style={{ color: `var(${item.token})` }}>Ag 가나</span>
                        </div>
                      ) : group.kind === 'border' ? (
                        <div className="token-swatch__box token-swatch__box--border" style={{ borderColor: `var(${item.token})` }} />
                      ) : (
                        <div className="token-swatch__box" style={{ background: `var(${item.token})` }} />
                      )}
                      <p className="token-swatch__label">{item.note}</p>
                      <code className="token-swatch__code">{item.token}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="foundation-tokens__block">
          <p className="foundation-tokens__block-title">Spacing</p>
          <div className="foundation-tokens__space-rows">
            {SPACE_TOKENS.map((item) => (
              <div key={item.token} className="foundation-tokens__space-row">
                <code className="foundation-tokens__space-token">{item.token}</code>
                <div className="foundation-tokens__space-bar" style={{ width: `var(${item.token})` }} />
                <span className="foundation-tokens__space-px">{item.px}px</span>
              </div>
            ))}
          </div>
        </div>

        <div className="foundation-tokens__block">
          <p className="foundation-tokens__block-title">Radius</p>
          <div className="foundation-tokens__radius-row">
            {RADIUS_TOKENS.map((item) => (
              <div key={item.token} className="token-swatch">
                <div className="token-swatch__box token-swatch__box--radius" style={{ borderRadius: `var(${item.token})` }} />
                <p className="token-swatch__label">{item.label}</p>
                <code className="token-swatch__code">{item.token}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="foundation-tokens__block">
          <p className="foundation-tokens__block-title">Typography</p>
          <div className="foundation-tokens__type-rows">
            {TYPE_TOKENS.map((item) => (
              <div key={item.token} className="foundation-tokens__type-row">
                <span className="foundation-tokens__type-sample" style={{ fontSize: `var(${item.token})` }}>
                  Ag 가나다
                </span>
                <span className="foundation-tokens__type-meta">
                  <code className="foundation-tokens__type-token">{item.token}</code>
                  <span className="foundation-tokens__type-role">
                    {item.role} · {item.px}px
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="foundation-tokens__block">
          <p className="foundation-tokens__block-title">Shadow</p>
          <div className="foundation-tokens__shadow-row">
            {SHADOW_TOKENS.map((item) => (
              <div key={item.token} className="token-swatch">
                <div className="token-swatch__box token-swatch__box--shadow" style={{ boxShadow: `var(${item.token})` }} />
                <p className="token-swatch__label">{item.role}</p>
                <code className="token-swatch__code">{item.token}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesignSystemSection>
  );
};

export default FoundationTokens;
