import Icon3D from '@/components/common/media/Icon3D';
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
 *
 * 카드 자체가 다운로드 링크다(hover 시 포인터 커서 + 가운데 "Download" 라벨) —
 * 카드 한구석의 작은 아이콘 버튼을 따로 클릭하게 하는 대신, 카드 전체가 곧 액션이라는 걸
 * 커서 모양으로 먼저 알려주는 편이 3D 아이콘을 실제로 가져가 쓰려는 방문자에게 더 직관적이다.
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
                <a
                  key={asset.key}
                  href={asset.src}
                  download={`${asset.key}.webp`}
                  className="asset-catalog__card"
                  aria-label={`${asset.label} 아이콘 다운로드 (webp) — ${asset.meaning}`}>
                  <Icon3D src={asset.src} alt="" size="lg" pendingLabel="Asset pending" />
                  <div className="asset-catalog__card-text">
                    <p className="asset-catalog__card-label">{asset.label}</p>
                    <p className="asset-catalog__card-meaning">{asset.meaning}</p>
                  </div>
                  {/* 카드 전체가 다운로드 링크라 이 라벨은 순수 hover 힌트 — 링크 자체의
                      접근성 이름은 위 aria-label이 이미 담당하므로 장식으로 숨긴다. */}
                  <span className="asset-catalog__download-overlay" aria-hidden="true">
                    <span className="asset-catalog__download-label">Download</span>
                  </span>
                </a>
              ))}
          </div>
        </div>
      ))}
    </DesignSystemSection>
  );
};

export default AssetCatalog;
