'use client';

import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import '@/styles/components/GlassButton.scss';

type GlassButtonOwnProps = {
  /** pill = 알약형(텍스트/텍스트+아이콘), circle = 아이콘 전용 원형 */
  shape?: 'pill' | 'circle';
  /** accent = 브랜드 컬러가 비치는 진한 유리, neutral = 배경이 비치는 맑은 유리 */
  tone?: 'neutral' | 'accent';
  /** 필터/토글처럼 선택된 상태를 accent 유리로 강조할 때 사용 */
  active?: boolean;
  className?: string;
  children: ReactNode;
};

type GlassButtonAsButton = GlassButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    as?: 'button';
  };

type GlassButtonAsAnchor = GlassButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    as: 'a';
  };

type GlassButtonProps = GlassButtonAsButton | GlassButtonAsAnchor;

/**
 * 아이폰 "liquid glass" 스타일의 버튼 프리미티브.
 * backdrop-filter 블러 + 상단 스페큘러 하이라이트 + 미묘한 채도로
 * 뒤 배경이 은은히 비치는 유리 질감을 낸다.
 */
const GlassButton = ({
  as = 'button',
  shape = 'pill',
  tone = 'neutral',
  active = false,
  className = '',
  children,
  ...rest
}: GlassButtonProps) => {
  const classes = [
    'glass-btn',
    `glass-btn--${shape}`,
    `glass-btn--${tone}`,
    active ? 'is-active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'a') {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span className="glass-btn__content">{children}</span>
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span className="glass-btn__content">{children}</span>
    </button>
  );
};

export default GlassButton;
