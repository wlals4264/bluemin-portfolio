'use client';

import '@/styles/components/AboutMe.scss';

import { myInfoData } from '@/mocks/myInfoData';

import { forwardRef } from 'react';

import InfoHeader from '../header/InfoHeader';

const AboutMe = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="about-me-container">
      <InfoHeader title="About Me" className="about-me-header" />
      <div className="about-me-info">
        {myInfoData.map((info, idx) => (
          <div className="about-me-info-item" key={idx}>
            <div className="about-me-info-icon">{info.icon}</div>
            <div className="about-me-info-text-container">
              <span className="about-me-info-title">{info.title}</span>
              <span className="about-me-info-content">{info.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

AboutMe.displayName = 'AboutMe';

export default AboutMe;
