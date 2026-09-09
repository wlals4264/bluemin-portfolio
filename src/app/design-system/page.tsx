import type { Metadata } from 'next';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

import ThemeToggle from '@/components/theme/ThemeToggle';
import GlassSurface from '@/components/common/surfaces/GlassSurface';
import DesignSystemIntro from '@/components/design-system/DesignSystemIntro';
import DepthLevelShowcase from '@/components/design-system/DepthLevelShowcase';
import GlassMaterialPreview from '@/components/design-system/GlassMaterialPreview';
import AssetCatalog from '@/components/design-system/AssetCatalog';
import Icon3DSizePreview from '@/components/design-system/Icon3DSizePreview';

import '@/styles/design-system/DesignSystemPage.scss';

export const metadata: Metadata = {
  title: `Design System :: Bluemin's portfolio`,
  description:
    'Bluemin 포트폴리오의 Soft Spatial Portfolio 디자인 시스템 — Foundation token, Depth Level, Glass Material을 실제 컴포넌트로 확인합니다.',
};

/**
 * /design-system — v0.1
 *
 * 일회성 테스트 페이지가 아니라 최종 포트폴리오에 남는 Living Design System Page의
 * 첫 버전이다. 근거: docs/design-system/review-decision.md "향후 구현 방향" 섹션.
 *
 * 이 단계에서 다루는 범위: Intro(핵심 원칙) · Depth Level 0~4 · Glass Material Preview ·
 * 3D Concept Assets 카탈로그(Soft Spatial 3D Family v1, 실제 asset 7종) · Icon3D Size QA.
 * 나머지 역할(Foundation token 전체 시각화, Component 상태, Motion 데모, ProjectCard
 * Playground)은 이후 iteration에서 이 페이지에 이어서 채운다.
 *
 * STEP 9 기준: 이 3D asset들은 아직 /design-system에서만 검증 중이다. About Me/Hero/
 * Career/Skills/Projects/ProjectCard/Experiences/Header/Footer 등 메인 포트폴리오
 * 콘텐츠에는 아직 통합하지 않았다(사람이 여기서 먼저 시각적으로 승인해야 다음 단계로
 * 넘어간다).
 */
export default function DesignSystemPage() {
  return (
    <div className="ds-page">
      {/* Navigation = Control = Glass(review-decision Decision 1). blur-md: button/navigation. */}
      <GlassSurface as="div" blur="md" className="ds-page__topbar">
        <Link href="/" className="ds-page__back">
          <IoArrowBack aria-hidden="true" />
          Portfolio
        </Link>
        <ThemeToggle />
      </GlassSurface>

      <div className="ds-page__content home-wrapper">
        <DesignSystemIntro />
        <DepthLevelShowcase />
        <GlassMaterialPreview />
        <AssetCatalog />
        <Icon3DSizePreview />
      </div>
    </div>
  );
}
