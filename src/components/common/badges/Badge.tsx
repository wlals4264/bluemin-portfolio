import { ReactNode } from 'react';

import '@/styles/components/Badge.scss';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'company';
export type BadgeVariant = 'badge' | 'chip';

type BadgeProps = {
  children: ReactNode;
  /** 기본값: 'neutral' */
  tone?: BadgeTone;
  /** 기본값: 'badge' — 기존 프로젝트 타입 배지/스킬 칩의 배경 농도·보더 차이를 보존하는 구분일 뿐, 새 디자인 변형이 아니다. */
  variant?: BadgeVariant;
  className?: string;
  title?: string;
  'aria-label'?: string;
};

/**
 * Badge — 비인터랙티브 정보 표시 Atom(Level 2 Content의 일부, Glass 아님).
 * 근거: docs/design-system/astra-component-architecture.md §1.
 *
 * ProjectCard에서 3곳(프로젝트 타입 배지 / 스킬 칩 / 초과 스킬 수)에 중복되던
 * pill 배지 패턴을 하나로 통합한다. 클릭/선택/제거 같은 상호작용은 갖지 않는다 —
 * 그런 게 필요하면 이 컴포넌트를 확장하지 말고 GlassSurface나 별도 버튼을 쓴다.
 */
const Badge = ({ children, tone = 'neutral', variant = 'badge', className = '', title, ...rest }: BadgeProps) => {
  const classes = ['badge', `badge--${variant}`, `badge--${tone}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes} title={title} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
