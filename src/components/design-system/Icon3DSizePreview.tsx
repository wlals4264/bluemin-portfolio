import Icon3D, { type Icon3DSize } from '@/components/common/media/Icon3D';
import DesignSystemSection from '@/components/design-system/DesignSystemSection';
import { icon3dAssetsByKey } from '@/mocks/icon3dAssets';

import '@/styles/design-system/Icon3DSizePreview.scss';

const SIZES: Array<{ token: Icon3DSize; px: number }> = [
  { token: 'sm', px: 32 },
  { token: 'md', px: 56 },
  { token: 'lg', px: 96 },
  { token: 'hero', px: 160 },
];

const REPRESENTATIVE = icon3dAssetsByKey.profile;

/**
 * 3D Size Preview — documentation 전용 QA 섹션.
 * 대표 asset(profile) 하나를 Icon3D의 4개 semantic size(sm/md/lg/hero = 32/56/96/160px)로
 * 나란히 렌더링해, 작은 크기에서도 실루엣이 무너지지 않는지 확인한다.
 *
 * Icon3D는 임의 픽셀 값을 받지 않고 이 4단계만 지원한다(size API를 과도하게 세분화하지
 * 않는다는 원칙, docs/design-system/3d-assets.md 참고) — 그래서 여기서도 새로운 픽셀
 * 크기를 만들지 않고 이 4단계 그대로 QA한다.
 */
const Icon3DSizePreview = () => {
  return (
    <DesignSystemSection
      id="icon3d-size-preview"
      eyebrow="Icon3D · Size QA"
      title="3D Size Preview"
      description={`같은 아이콘(${REPRESENTATIVE.label})을 실제로 쓰이는 4가지 크기로 나란히 놓아봤어요. 아무리 작아져도 무엇을 그린 아이콘인지 바로 알아볼 수 있어야 하니까요.`}>
      <div className="icon3d-size-preview">
        {SIZES.map(({ token, px }) => (
          <div key={token} className="icon3d-size-preview__item">
            <Icon3D src={REPRESENTATIVE.src} alt="" size={token} />
            <p className="icon3d-size-preview__caption">
              {token} · {px}px
            </p>
          </div>
        ))}
      </div>
    </DesignSystemSection>
  );
};

export default Icon3DSizePreview;
