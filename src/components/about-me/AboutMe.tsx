'use client';

import '@/styles/components/AboutMe.scss';

import { forwardRef } from 'react';

import { myInfoData } from '@/mocks/myInfoData';
import { icon3dAssetsByKey, type Icon3DKey } from '@/mocks/icon3dAssets';
import Icon3D from '@/components/common/media/Icon3D';

import InfoHeader from '../header/InfoHeader';
import { RevealGroup, RevealItem, RevealSection } from '../common/Reveal';

/**
 * myInfoData(mocks/myInfoData.tsx)는 그대로 둔다 — 여기서는 각 항목에 대응하는
 * Icon3D asset만 붙인다. myInfoData의 실제 4개 필드(이름/위치/이메일/학력)는
 * docs/design-system/3d-assets.md의 Info asset 4종(profile/email/location/education)과
 * 이미 1:1 대응하고, 순서도 그대로 2x2 grid로 유지한다.
 *
 * 이메일 클릭(mailto 등) 인터랙션은 붙이지 않는다 — 별도 라이브러리로 붙일 예정이라
 * 이번 단계에서는 보류(사용자 지시). 지금은 다른 3개 항목과 동일하게 순수 텍스트다.
 */
const ASSET_KEY_BY_TITLE: Record<string, Icon3DKey> = {
  이름: 'profile',
  위치: 'location',
  이메일: 'email',
  학력: 'education',
};

const AboutMe = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <RevealSection ref={ref} className="about-me-container">
      <InfoHeader title="About Me" className="about-me-header" />
      <RevealGroup className="about-me-info">
        {myInfoData.map((info) => {
          const asset = icon3dAssetsByKey[ASSET_KEY_BY_TITLE[info.title]];

          return (
            <RevealItem className="about-me-info-item" key={info.title}>
              <Icon3D src={asset.src} alt="" size="md" className="about-me-info-icon" />
              <div className="about-me-info-text-container">
                <span className="about-me-info-title">{info.title}</span>
                <span className="about-me-info-content">{info.content}</span>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealSection>
  );
});

AboutMe.displayName = 'AboutMe';

export default AboutMe;
