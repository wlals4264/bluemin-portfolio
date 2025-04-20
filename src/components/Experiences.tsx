'use client';

import { MouseEvent, useEffect, useState } from 'react';
import '../styles/components/Experiences.scss';
import InfoHeader from './InfoHeader';
import ExperienceList from './ExperienceList';
import { experienceData } from '../mocks/experienceData';

const Experiences = () => {
  const [activeName, setActiveName] = useState<'education' | 'careerPath' | 'team'>('education');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeName]);

  const handleClickBtn = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'education' | 'careerPath' | 'team';
    setActiveName(name);
  };

  return (
    <div className="experiences-wrapper">
      <InfoHeader title="Experiences" className="experiences-header" />
      <div className="experiences-container">
        <div className="experiences-nav-btn-box">
          {['education', 'careerPath', 'team'].map((key) => (
            <button
              key={key}
              type="button"
              name={key}
              onClick={handleClickBtn}
              className={activeName === key ? 'active' : ''}>
              {key === 'education' ? 'Education' : key === 'careerPath' ? 'Career Path' : 'Team'}
            </button>
          ))}
        </div>

        <div className="experiences-content-box">
          <ExperienceList data={experienceData[activeName]} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
      </div>
    </div>
  );
};

export default Experiences;
