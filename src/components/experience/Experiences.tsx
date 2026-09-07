'use client';

import '@/styles/components/Experiences.scss';

import { experienceData } from '@/mocks/experienceData';

import { forwardRef, MouseEvent, useEffect, useState } from 'react';

import InfoHeader from '../header/InfoHeader';
import ExperienceList from './ExperienceList';
import { RevealSection } from '../common/Reveal';

const Experiences = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeName, setActiveName] = useState<'education' | 'team'>('education');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeName]);

  const handleClickBtn = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'education' | 'team';
    setActiveName(name);
  };

  return (
    <RevealSection ref={ref} className="experiences-wrapper">
      <InfoHeader title="Experiences" className="experiences-header" />
      <div className="experiences-container">
        <div className="experiences-nav-btn-box">
          {(['education', 'team'] as const).map((key) => (
            <button
              key={key}
              type="button"
              name={key}
              onClick={handleClickBtn}
              className={activeName === key ? 'active' : ''}>
              {key === 'education' ? 'Education' : 'Team'}
            </button>
          ))}
        </div>

        <div className="experiences-content-box">
          <ExperienceList data={experienceData[activeName]} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
      </div>
    </RevealSection>
  );
});

Experiences.displayName = 'Experiences';

export default Experiences;
