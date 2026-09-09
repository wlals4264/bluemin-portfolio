'use client';

import Image from 'next/image';
import { useState } from 'react';

import '@/styles/components/Icon3D.scss';

export type Icon3DSize = 'sm' | 'md' | 'lg' | 'hero';

/**
 * 픽셀 매핑 근거:
 * - sm(32px)  — About Me/Experiences의 기존 2D 정보 아이콘(28px)과 나란히 놓일 인라인 크기
 * - md(56px)  — 카드 안에서 단독으로 쓰이는 기본 크기
 * - lg(96px)  — /design-system 카탈로그, 배지 등 미리보기용 크기
 * - hero(160px) — 향후 Hero 등 대형 쇼케이스 영역용
 */
const SIZE_PX: Record<Icon3DSize, number> = {
  sm: 32,
  md: 56,
  lg: 96,
  hero: 160,
};

type Icon3DProps = {
  /**
   * 3D asset 경로(예: /assets/3d/info/profile.webp). 아직 파일이 없거나 로드에 실패하면
   * 깨진 이미지 아이콘 대신 조용한 placeholder를 자동으로 보여준다 — 나중에 같은 경로에
   * 실제 webp 파일만 넣으면 코드 변경 없이 이미지가 나타난다.
   */
  src?: string;
  /**
   * 장식용이면 반드시 빈 문자열("") — 텍스트 정보(이름/위치/학력/프로젝트 유형 등)를
   * 대체하는 경우에만 의미 있는 값을 채운다(review-decision.md §10 Accessibility).
   */
  alt: string;
  size?: Icon3DSize;
  /** src가 없거나 로드 실패 시 placeholder 안에 보여줄 짧은 라벨(예: "Asset pending"). */
  pendingLabel?: string;
  className?: string;
};

/**
 * Level 4(3D Object) / Concept = 3D 원칙의 실제 구현체 — production primitive.
 * 근거: docs/design-system/review-decision.md Decision 1, docs/design-system/3d-assets.md
 *
 * animation component가 아니다 — 정적 이미지 렌더링만 담당한다. 3D asset 자체에 이미
 * ambient shadow가 포함되어 있을 수 있어 강한 CSS shadow를 기본 적용하지 않는다.
 */
const Icon3D = ({ src, alt, size = 'md', pendingLabel, className = '' }: Icon3DProps) => {
  const [failed, setFailed] = useState(false);
  const px = SIZE_PX[size];
  const showPending = !src || failed;

  const classes = ['icon-3d', `icon-3d--${size}`, showPending ? 'icon-3d--pending' : '', className]
    .filter(Boolean)
    .join(' ');

  if (showPending) {
    return (
      <div
        className={classes}
        style={{ width: px, height: px }}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}>
        {pendingLabel ? <span className="icon-3d__pending-label">{pendingLabel}</span> : null}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={px}
      height={px}
      className={classes}
      onError={() => setFailed(true)}
    />
  );
};

export default Icon3D;
