import '../styles/components/FilteringButton.scss';
import { ProjectCardData } from '@/mocks/projects';
import React from 'react';

interface FilteringButtonProps {
  setFilteredProjects: (projects: ProjectCardData[]) => void;
  projects: ProjectCardData[];
}

const FilteringButton = ({ projects, setFilteredProjects }: FilteringButtonProps) => {
  const clickDefaultButton = () => {
    setFilteredProjects([...projects]);
  };

  const clickLatestButton = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      const getStartDate = (dateStr: string) => {
        const startDate = dateStr.split('~')[0].trim().replace(/\./g, '-');
        return new Date(startDate).getTime();
      };

      // 내림차순 정렬
      return getStartDate(b.date) - getStartDate(a.date);
    });

    setFilteredProjects(sortedProjects);
  };

  const clickTeamButton = () => {
    const teamProjects = [...projects].filter((project) => project.projectType === 'team');
    setFilteredProjects(teamProjects);
  };

  const clickPersonalButton = () => {
    const personalProjects = [...projects].filter((project) => project.projectType === 'personal');
    setFilteredProjects(personalProjects);
  };

  return (
    <div className="filtered-buttons-container">
      <button className="default-button" type="button" onClick={clickDefaultButton}>
        기본순
      </button>
      <button className="latest-button" type="button" onClick={clickLatestButton}>
        최신순
      </button>
      <button className="team-button" type="button" onClick={clickTeamButton}>
        팀 프로젝트
      </button>
      <button className="personal-button" type="button" onClick={clickPersonalButton}>
        개인 프로젝트
      </button>
    </div>
  );
};

export default FilteringButton;
