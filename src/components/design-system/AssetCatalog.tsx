'use client';

import { useState } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';

import GlassButton from '@/components/common/buttons/GlassButton';
import Icon3D from '@/components/common/media/Icon3D';
import DesignSystemSection from '@/components/design-system/DesignSystemSection';
import { icon3dAssets, type Icon3DCategory } from '@/mocks/icon3dAssets';

import '@/styles/design-system/AssetCatalog.scss';

const CATEGORY_LABEL: Record<Icon3DCategory, string> = {
  info: 'Info',
  concept: 'Concept',
};

const CATEGORIES: Icon3DCategory[] = ['info', 'concept'];

type DownloadAllState = 'idle' | 'loading' | 'error';

/**
 * "전체 받기" 버튼 핸들러 — 카드 12개를 하나씩 개별 다운로드하게 하는 대신,
 * public/assets/3d/**의 webp 12개를 fetch → JSZip으로 묶어 zip 파일 하나로
 * 내려준다. 브라우저가 다중 다운로드를 차단/경고하는 문제를 피하고,
 * 실제로 아이콘 세트를 가져가 쓰려는 방문자에게 한 번의 클릭으로 끝나게 한다.
 */
const downloadAllAssets = async () => {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const files = await Promise.all(
    icon3dAssets.map(async (asset) => {
      const response = await fetch(asset.src);
      if (!response.ok) throw new Error(`Failed to fetch ${asset.src}`);
      const blob = await response.blob();
      return { name: `${asset.key}.webp`, blob };
    }),
  );

  files.forEach(({ name, blob }) => zip.file(name, blob));

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'bluemin-3d-assets.zip';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

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
  const [downloadState, setDownloadState] = useState<DownloadAllState>('idle');

  const handleDownloadAll = async () => {
    if (downloadState === 'loading') return;
    setDownloadState('loading');
    try {
      await downloadAllAssets();
      setDownloadState('idle');
    } catch {
      setDownloadState('error');
    }
  };

  return (
    <DesignSystemSection
      id="asset-catalog"
      eyebrow="Foundation · Concept = 3D"
      title="3D Concept Assets"
      description="직접 만든 3D 아이콘 12개예요. 이름·이메일·위치·학력처럼 '프로필'을 보여주는 4개와, 웹·모바일·데이터 분석·코딩 교육·회사/팀/개인 프로젝트·컨택트(항해)처럼 '어떤 걸 다루는지'를 보여주는 8개로 나뉩니다.">
      <div className="asset-catalog__toolbar">
        <GlassButton
          shape="pill"
          tone="accent"
          onClick={handleDownloadAll}
          disabled={downloadState === 'loading'}
          aria-label="3D 아이콘 12개를 zip 파일 하나로 전체 다운로드">
          <IoDownloadOutline aria-hidden="true" />
          {downloadState === 'loading' ? 'Preparing…' : 'Download all (12)'}
        </GlassButton>
        {downloadState === 'error' ? (
          <p className="asset-catalog__toolbar-error" role="alert">
            다운로드에 실패했어요. 다시 시도해주세요.
          </p>
        ) : null}
      </div>
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
                  {/* 카드 전체가 다운로드 링크라 이 힌트는 순수 hover 표시 — 링크 자체의
                      접근성 이름은 위 aria-label이 이미 담당하므로 장식으로 숨긴다.
                      카드 전체를 덮는 대신 하단 여백 자리에만 아이콘+텍스트로 살짝 뜬다. */}
                  <span className="asset-catalog__download-hint" aria-hidden="true">
                    <IoDownloadOutline aria-hidden="true" />
                    Download
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
