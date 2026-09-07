'use client';

import '@/styles/components/Career.scss';

import { careerData } from '@/mocks/careerData';

import { forwardRef } from 'react';

import InfoHeader from '../header/InfoHeader';
import { RevealGroup, RevealItem, RevealSection } from '../common/Reveal';

const Career = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <RevealSection ref={ref} className="career-container">
      <InfoHeader title="Career" className="career-header" />
      <RevealGroup className="career-list">
        {careerData.map((item, idx) => (
          <RevealItem className="career-item" key={idx}>
            <div className="career-item-meta">
              <h3 className="career-company">{item.company}</h3>
              <span className="career-date">{item.date}</span>
            </div>
            <p className="career-role">{item.role}</p>
            <p className="career-summary">{item.summary}</p>
            <ul className="career-highlights">
              {item.highlights.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealSection>
  );
});

Career.displayName = 'Career';

export default Career;
