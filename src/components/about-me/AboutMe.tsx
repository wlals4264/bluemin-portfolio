'use client';

import '@/styles/components/AboutMe.scss';

import { myInfoData } from '@/mocks/myInfoData';

import { forwardRef } from 'react';

import InfoHeader from '../header/InfoHeader';
import { RevealGroup, RevealItem, RevealSection } from '../common/Reveal';

const AboutMe = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <RevealSection ref={ref} className="about-me-container">
      <InfoHeader title="About Me" className="about-me-header" />
      <RevealGroup className="about-me-info">
        {myInfoData.map((info, idx) => (
          <RevealItem className="about-me-info-item" key={idx}>
            <div className="about-me-info-icon">{info.icon}</div>
            <div className="about-me-info-text-container">
              <span className="about-me-info-title">{info.title}</span>
              <span className="about-me-info-content">{info.content}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealSection>
  );
});

AboutMe.displayName = 'AboutMe';

export default AboutMe;
