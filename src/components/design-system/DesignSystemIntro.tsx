import GlassSurface from '@/components/common/surfaces/GlassSurface';
import Icon3D from '@/components/common/media/Icon3D';

import '@/styles/design-system/DesignSystemIntro.scss';

/**
 * 페이지 최상단 — "Soft Spatial Portfolio Design System" 컨셉과
 * 핵심 원칙(Content = Solid / Control = Glass / Concept = 3D)을 시각적으로 보여준다.
 * 근거: docs/design-system/visual-direction.md §0, §1
 */
const DesignSystemIntro = () => {
  return (
    <header className="ds-intro">
      <p className="ds-intro__eyebrow">Design System</p>
      <h1 className="ds-intro__title">
        <span className="ds-intro__title-display">Soft Spatial Portfolio</span>
        <span className="ds-intro__title-sub">Design System</span>
      </h1>
      <p className="ds-intro__lede">
        이 페이지는 포트폴리오 곳곳에서 반복해 쓰인 디자인 규칙을 한자리에 모아 보여줍니다. 흐릿한 유리 표면(Glass)과
        입체 아이콘(3D)은 꾸미기 위한 장식이 아니라 &ldquo;이건 읽는 정보&rdquo;, &ldquo;이건 누르는 버튼&rdquo;,
        &ldquo;이건 개념을 표현한 그림&rdquo;이라는 걸 한눈에 구분해 주는 신호예요. 아래에서 그 규칙이 실제 화면에
        어떻게 쓰였는지 하나씩 보여드릴게요.
      </p>

      <div className="ds-intro__principle" role="list" aria-label="핵심 원칙: Content, Control, Concept">
        <div className="ds-intro__rule" role="listitem">
          <div className="ds-intro__rule-demo ds-intro__rule-demo--solid" aria-hidden="true">
            Card
          </div>
          <p className="ds-intro__rule-label">
            Content <span aria-hidden="true">=</span> Solid
          </p>
        </div>

        <div className="ds-intro__rule" role="listitem">
          <GlassSurface
            as="div"
            blur="md"
            radius="md"
            className="ds-intro__rule-demo ds-intro__rule-demo--glass"
            aria-hidden="true">
            Nav
          </GlassSurface>
          <p className="ds-intro__rule-label">
            Control <span aria-hidden="true">=</span> Glass
          </p>
        </div>

        <div className="ds-intro__rule" role="listitem">
          <div className="ds-intro__rule-demo ds-intro__rule-demo--concept" aria-hidden="true">
            <Icon3D src="/assets/3d/info/profile.webp" alt="" size="sm" />
          </div>
          <p className="ds-intro__rule-label">
            Concept <span aria-hidden="true">=</span> 3D
          </p>
        </div>
      </div>
    </header>
  );
};

export default DesignSystemIntro;
