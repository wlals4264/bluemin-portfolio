'use client';

import '@/styles/components/Experiences.scss';

import { experienceData } from '@/mocks/experienceData';

import { forwardRef } from 'react';

import Icon3D from '@/components/common/media/Icon3D';
import { icon3dAssetsByKey } from '@/mocks/icon3dAssets';

import InfoHeader from '../header/InfoHeader';
import { RevealGroup, RevealItem, RevealSection } from '../common/Reveal';

/**
 * experienceData(mocks/experienceData.tsx)는 그대로 둔다. 현재 항목이 전부 "코딩 교육/수료"
 * 개념이라 laptop 3D asset(Astra로 신규 생성, docs/design-system/3d-assets.md 참고)을 쓴다 —
 * About Me의 education(졸업모자, 학력 필드용)과는 의미가 달라 재사용하지 않았다.
 * 항목 타입이 다양해지면(예: 근무 경험 등) 그때 항목별 asset 매핑을 다시 검토한다.
 */
const Experiences = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <RevealSection ref={ref} className="experiences-container">
      <InfoHeader title="Experiences" className="experiences-header" />
      <RevealGroup className="experiences-info">
        {experienceData.map((info, idx) => (
          <RevealItem className="experiences-info-item" key={idx}>
            <Icon3D
              src={icon3dAssetsByKey.laptop.src}
              alt=""
              size="md"
              className="experiences-info-icon"
            />
            <div className="experiences-info-text-container">
              <span className="experiences-info-title">{info.title}</span>
              <span className="experiences-info-content">{info.content}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealSection>
  );
});

Experiences.displayName = 'Experiences';

export default Experiences;
