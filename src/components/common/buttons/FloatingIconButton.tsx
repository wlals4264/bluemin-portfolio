'use client';

import { ReactNode } from 'react';

import GlassButton from '@/components/common/buttons/GlassButton';

import '@/styles/components/FloatingIconButton.scss';

type FloatingIconButtonProps = {
  /** 버튼 안에 들어갈 큰 아이콘 — 보통 Icon3D(size="lg" 이상) */
  icon: ReactNode;
  /**
   * 마우스 hover/키보드 focus 시 위에 뜨는 말풍선 카피. 순수 flavor 텍스트라
   * 스크린 리더에는 읽히지 않는다(aria-hidden) — 실제 동작 설명은 `label`이 맡는다.
   */
  tooltip?: string;
  /** 버튼의 실제 동작을 설명하는 접근성 레이블(예: "커피챗 제안하기") */
  label: string;
  onClick?: () => void;
  className?: string;
};

/**
 * Floating Icon Button — Level 3 Glass Control 프리미티브(GlassButton 기반).
 *
 * TopBtn처럼 화면에 항상 떠 있는 원형 진입점이지만, 일반 glyph 아이콘보다 훨씬 큰
 * Icon3D 콘텐츠를 담기 위해 `GlassButton`의 `size="lg"` 배리언트 위에 hover 툴팁을
 * 얹었다. 재질(유리)과 배치(fixed 위치)는 이 컴포넌트가 책임지지 않는다 — 호출부가
 * wrapper에 `className`으로 위치를 잡는다(GlassSurface와 동일한 원칙).
 */
const FloatingIconButton = ({ icon, tooltip, label, onClick, className = '' }: FloatingIconButtonProps) => {
  const classes = ['floating-icon-btn', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <GlassButton
        shape="circle"
        tone="accent"
        size="lg"
        className="floating-icon-btn__control"
        aria-label={label}
        onClick={onClick}>
        {icon}
      </GlassButton>
      {tooltip ? (
        <span className="floating-icon-btn__tooltip" role="tooltip" aria-hidden="true">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default FloatingIconButton;
