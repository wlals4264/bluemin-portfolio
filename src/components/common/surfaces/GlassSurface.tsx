'use client';

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useRef,
} from 'react';

import '@/styles/components/GlassSurface.scss';

export type GlassSurfaceBlur = 'sm' | 'md' | 'lg';
export type GlassSurfaceTone = 'neutral' | 'accent';
export type GlassSurfaceRadius = 'sm' | 'md' | 'lg' | 'pill';

type GlassSurfaceOwnProps = {
  /**
   * Glass 재질의 blur 강도 — semantic usage로 고른다(review-decision.md Decision 3).
   * - sm: small glass control
   * - md: button / navigation (기본값)
   * - lg: large floating surface / modal
   */
  blur?: GlassSurfaceBlur;
  /** accent = 브랜드 컬러가 배어든 진한 유리, neutral = 배경이 비치는 맑은 유리 */
  tone?: GlassSurfaceTone;
  radius?: GlassSurfaceRadius;
  /**
   * hover/active/focus 어포던스를 켠다. `as="button"` | `as="a"`는 항상 interactive로 취급된다.
   * `as="div"`에서 interactive를 켜면 role="button" · tabIndex · 키보드(Enter/Space) 활성화까지
   * GlassSurface가 직접 담당한다(§7 Accessibility) — 커스텀 interactive div를 만들 때
   * 호출부에서 별도로 role/keydown을 챙기지 않아도 된다.
   */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

type GlassSurfaceAsDiv = GlassSurfaceOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & { as?: 'div' };

type GlassSurfaceAsButton = GlassSurfaceOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { as: 'button' };

type GlassSurfaceAsAnchor = GlassSurfaceOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { as: 'a' };

export type GlassSurfaceProps = GlassSurfaceAsDiv | GlassSurfaceAsButton | GlassSurfaceAsAnchor;

/**
 * Level 3 — Glass Control production primitive.
 *
 * Content(ProjectCard 본문, 제목, 설명, 피처 리스트, 기술 배지 등)의 대체재가 아니다.
 * Navigation / Header controls / CTA / Project action / Carousel control / Floating button /
 * Modal control처럼 "콘텐츠 위에서 떠 있는 Control"에만 사용한다
 * (docs/design-system/review-decision.md Decision 1).
 *
 * 재질의 일관성은 blur 값이 아니라 glass background · border · highlight · specular · saturation
 * 조합으로 유지한다(Decision 3) — blur는 표면의 역할(semantic usage)에 따라 sm/md/lg 중 고른다.
 *
 * 패딩·레이아웃을 강제하지 않는다 — GlassSurface는 재질만 책임지고, 크기/여백은
 * className으로 호출부가 결정한다(Card 프리미티브의 대체재로 오용되지 않도록 하는 의도).
 */
const GlassSurface = ({
  as = 'div',
  blur = 'md',
  tone = 'neutral',
  radius = 'lg',
  interactive = false,
  className = '',
  children,
  ...rest
}: GlassSurfaceProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const isInteractive = as !== 'div' || interactive;

  const classes = [
    'glass-surface',
    `glass-surface--blur-${blur}`,
    `glass-surface--radius-${radius}`,
    `glass-surface--${tone}`,
    isInteractive ? 'glass-surface--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'a') {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorRest}>
        <span className="glass-surface__content">{children}</span>
      </a>
    );
  }

  if (as === 'button') {
    const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button type="button" className={classes} {...buttonRest}>
        <span className="glass-surface__content">{children}</span>
      </button>
    );
  }

  const divRest = rest as HTMLAttributes<HTMLDivElement>;

  // as="div"이면서 interactive인 경우 — 네이티브 button/a가 공짜로 주는 키보드 활성화가
  // 없으므로 GlassSurface가 직접 Enter/Space → click을 연결한다.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      divRef.current?.click();
    }
    divRest.onKeyDown?.(event);
  };

  return (
    <div
      ref={divRef}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...divRest}
      className={classes}
      onKeyDown={handleKeyDown}>
      <span className="glass-surface__content">{children}</span>
    </div>
  );
};

export default GlassSurface;
