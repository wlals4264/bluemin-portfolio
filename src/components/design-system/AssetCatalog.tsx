import { IoDownloadOutline } from 'react-icons/io5';

import Icon3D from '@/components/common/media/Icon3D';
import GlassSurface from '@/components/common/surfaces/GlassSurface';
import DesignSystemSection from '@/components/design-system/DesignSystemSection';
import { icon3dAssets, type Icon3DCategory } from '@/mocks/icon3dAssets';

import '@/styles/design-system/AssetCatalog.scss';

const CATEGORY_LABEL: Record<Icon3DCategory, string> = {
  info: 'Info',
  concept: 'Concept',
};

const CATEGORIES: Icon3DCategory[] = ['info', 'concept'];

/**
 * 3D Concept Assets — Soft Spatial 3D Family v1 카탈로그.
 * Icon3D의 onError → pending fallback 구조 덕분에, 이 컴포넌트는 asset이 있든 없든
 * 코드가 동일하다 — public/assets/3d/**에 실제 webp가 있으면 그대로 렌더링되고,
 * 없으면 자동으로 pending 상태를 보여준다.
 * 근거: docs/design-system/review-decision.md Decision 1 · docs/design-system/3d-assets.md
 */
const AssetCatalog = () => {
  return (
    <DesignSystemSection
      id="asset-catalog"
      eyebrow="Foundation · Concept = 3D"
      title="3D Concept Assets"
      description="직접 만든 3D 아이콘 12개예요. 이름·이메일·위치·학력처럼 '프로필'을 보여주는 4개와, 웹·모바일·데이터 분석·코딩 교육·회사/팀/개인 프로젝트·컨택트(항해)처럼 '어떤 걸 다루는지'를 보여주는 8개로 나뉩니다.">
      {CATEGORIES.map((category) => (
        <div key={category} className="asset-catalog__group">
          <p className="asset-catalog__group-title">{CATEGORY_LABEL[category]}</p>
          <div className="asset-catalog__grid">
            {icon3dAssets
              .filter((asset) => asset.category === category)
              .map((asset) => (
                <div key={asset.key} className="asset-catalog__card">
                  <GlassSurface
                    as="a"
                    href={asset.src}
                    download={`${asset.key}.webp`}
                    blur="sm"
                    radius="pill"
                    className="asset-catalog__download"
                    aria-label={`${asset.label} 아이콘 다운로드 (webp)`}
                    title="다운로드">
                    <IoDownloadOutline aria-hidden="true" />
                  </GlassSurface>
                  <Icon3D src={asset.src} alt="" size="lg" pendingLabel="Asset pending" />
                  <div className="asset-catalog__card-text">
                    <p className="asset-catalog__card-label">{asset.label}</p>
                    <p className="asset-catalog__card-meaning">{asset.meaning}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </DesignSystemSection>
  );
};

export default AssetCatalog;
