import '../styles/components/Skills.scss';
import { skillsInfo } from '@/mocks/skillsInfo';
import InfoHeader from './InfoHeader';
import { forwardRef } from 'react';

const Skills = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="skills-container">
      <InfoHeader title="Skills" className="skills-header" />
      <div className="skills-list">
        {skillsInfo.map((info, index) => (
          <div className="skill-section" key={index}>
            <div className="skill-title">
              <span>{info.title}</span>
            </div>
            {info.contents.map((content, idx) => (
              <span className={`skill-item ${content.describe.toLocaleLowerCase().replace(/[\s.]/g, '-')}`} key={idx}>
                <span className="skill-item-icon">{content.icon}</span>
                <span>{content.describe}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

Skills.displayName = 'Skills';

export default Skills;
