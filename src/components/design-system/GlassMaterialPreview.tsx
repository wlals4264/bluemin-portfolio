import GlassSurface, { GlassSurfaceBlur } from '@/components/common/surfaces/GlassSurface';
import DesignSystemSection from '@/components/design-system/DesignSystemSection';

import '@/styles/design-system/GlassMaterialPreview.scss';

type GlassTile = {
  blur: GlassSurfaceBlur;
  label: string;
  usage: string;
  token: string;
};

const TILES: GlassTile[] = [
  { blur: 'sm', label: 'Small Control', usage: 'small glass control', token: '--blur-sm (8px)' },
  { blur: 'md', label: 'Navigation / Button', usage: 'button / navigation', token: '--blur-md (16px)' },
  {
    blur: 'lg',
    label: 'Large Floating Surface',
    usage: 'large floating surface / modal',
    token: '--blur-lg (24px)',
  },
];

/**
 * Glass의 blur variation을 실제 ambient 배경 위에서 비교한다.
 * 재질 일관성은 blur 값이 아니라 background/border/highlight/specular/saturation로 유지되므로,
 * 세 타일 모두 같은 glass 토큰 조합 위에 blur만 다르게 적용해 차이를 보여준다.
 * 근거: docs/design-system/review-decision.md Decision 3
 */
const GlassMaterialPreview = () => {
  return (
    <DesignSystemSection
      id="glass-material"
      eyebrow="Foundation · §6–§7"
      title="Glass Material Preview"
      description="유리 표면이 얼마나 흐린지는 크기가 아니라 '어디에 쓰이는지'로 정해요. 작은 버튼, 내비게이션, 화면 위에 크게 떠 있는 패널이 서로 다른 흐림 정도를 쓰지만, 배경색·테두리·하이라이트 같은 나머지 요소는 항상 같아서 셋 다 '같은 유리 재질'처럼 느껴집니다.">
      <div className="glass-preview" aria-hidden={false}>
        <div className="glass-preview__grid">
          {TILES.map((tile) => (
            <div key={tile.blur} className="glass-preview__tile-wrap">
              <GlassSurface
                blur={tile.blur}
                radius="lg"
                interactive
                className="glass-preview__tile"
                aria-label={`${tile.label} 유리 표면 예시`}>
                <span className="glass-preview__tile-label">{tile.label}</span>
              </GlassSurface>
              <p className="glass-preview__tile-caption">
                <span className="glass-preview__tile-usage">{tile.usage}</span>
                <code className="glass-preview__tile-token">{tile.token}</code>
              </p>
            </div>
          ))}
        </div>
      </div>
    </DesignSystemSection>
  );
};

export default GlassMaterialPreview;
