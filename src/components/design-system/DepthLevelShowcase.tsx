import GlassSurface from '@/components/common/surfaces/GlassSurface';
import Icon3D from '@/components/common/media/Icon3D';
import DesignSystemSection from '@/components/design-system/DesignSystemSection';

import '@/styles/design-system/DepthLevelShowcase.scss';

type DepthLevel = {
  index: 0 | 1 | 2 | 3 | 4;
  name: string;
  role: string;
  tokens: string[];
};

const LEVELS: DepthLevel[] = [
  { index: 0, name: 'Canvas', role: 'Page background', tokens: ['--bg'] },
  { index: 1, name: 'Surface', role: 'Section / Container', tokens: ['--bg-elevated', '--shadow-xs'] },
  {
    index: 2,
    name: 'Content',
    role: 'ProjectCard / Modal Content',
    tokens: ['--card', '--border', '--shadow-xs'],
  },
  {
    index: 3,
    name: 'Glass Control',
    role: 'Button / Navigation / Floating UI',
    tokens: ['--glass-bg', '--glass-border', '--blur-md'],
  },
  { index: 4, name: '3D Object', role: 'Concept Icon', tokens: ['/assets/3d/info/profile.webp'] },
];

/**
 * Level 0~4 Depth 비교. Level 0~3은 실제 Foundation 토큰/CSS로 렌더링하고,
 * Level 4는 Soft Spatial 3D Family v1의 flagship asset(profile — Style Master)을
 * 실제 Icon3D로 보여준다. Level 3(Glass Control)와 재질·형태가 완전히 다른 정적
 * 이미지라는 점 자체가 "Level 4 = Concept" 위계를 시각적으로 드러낸다.
 * 근거: docs/design-system/foundation.md §11, docs/design-system/3d-assets.md
 */
const DepthLevelShowcase = () => {
  return (
    <DesignSystemSection
      id="depth"
      eyebrow="Foundation · §11"
      title="Depth: Level 0–4"
      description="아래 5단계는 화면 요소가 그림자 크기로 얼마나 '떠 보이는지'가 아니라, 실제로 무슨 역할을 하는지를 보여주는 기준이에요. 배경(Canvas) → 섹션(Surface) → 카드 같은 콘텐츠(Content) → 누르는 버튼(Glass Control) → 개념을 표현하는 3D 아이콘 순으로, 아래로 갈수록 역할이 더 뚜렷해집니다.">
      <ol className="depth-showcase">
        {LEVELS.map((level) => (
          <li key={level.index} className="depth-level">
            <div className="depth-level__meta">
              <span className="depth-level__index">Level {level.index}</span>
              <h3 className="depth-level__name">{level.name}</h3>
              <p className="depth-level__role">{level.role}</p>
              <div className="depth-level__tokens">
                {level.tokens.map((token) => (
                  <code key={token} className="depth-level__token">
                    {token}
                  </code>
                ))}
              </div>
            </div>

            <div className={`depth-level__swatch depth-level__swatch--${level.index}`}>
              {level.index === 0 && <span className="depth-level__swatch-label">Canvas</span>}
              {level.index === 1 && <span className="depth-level__swatch-label">Surface</span>}
              {level.index === 2 && <span className="depth-level__swatch-label">Content</span>}
              {level.index === 3 && (
                <div className="depth-level__glass-row">
                  <GlassSurface as="button" blur="md" radius="pill" className="depth-level__glass-chip">
                    Button
                  </GlassSurface>
                  <GlassSurface as="button" blur="md" radius="pill" className="depth-level__glass-chip">
                    Navigation
                  </GlassSurface>
                  <GlassSurface as="button" blur="lg" radius="pill" className="depth-level__glass-chip">
                    Floating UI
                  </GlassSurface>
                </div>
              )}
              {level.index === 4 && (
                <Icon3D src="/assets/3d/info/profile.webp" alt="" size="lg" pendingLabel="Asset pending" />
              )}
            </div>
          </li>
        ))}
      </ol>
    </DesignSystemSection>
  );
};

export default DepthLevelShowcase;
