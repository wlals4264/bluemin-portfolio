'use client';

import '@/styles/components/Career.scss';

import { careerData } from '@/mocks/careerData';

import { forwardRef } from 'react';

import InfoHeader from '../header/InfoHeader';

const Career = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="career-container">
      <InfoHeader title="Career" className="career-header" />
      <div className="career-list">
        {careerData.map((item, idx) => (
          <article className="career-item" key={idx}>
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
          </article>
        ))}
      </div>
    </div>
  );
});

Career.displayName = 'Career';

export default Career;
