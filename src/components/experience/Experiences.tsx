'use client';

import '@/styles/components/Experiences.scss';

import { experienceData } from '@/mocks/experienceData';

import { forwardRef } from 'react';

import InfoHeader from '../header/InfoHeader';
import { RevealGroup, RevealItem, RevealSection } from '../common/Reveal';

const Experiences = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <RevealSection ref={ref} className="experiences-container">
      <InfoHeader title="Experiences" className="experiences-header" />
      <RevealGroup className="experiences-info">
        {experienceData.map((info, idx) => (
          <RevealItem className="experiences-info-item" key={idx}>
            <div className="experiences-info-icon">{info.icon}</div>
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
