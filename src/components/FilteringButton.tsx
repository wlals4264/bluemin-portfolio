'use client';

import '../styles/components/FilteringButton.scss';
import { ProjectCardData } from '@/mocks/projects';
import React, { useState } from 'react';

interface FilteringButtonProps {
  setFilteredProjects: (projects: ProjectCardData[]) => void;
  projects: ProjectCardData[];
}

const FilteringButton = ({ projects, setFilteredProjects }: FilteringButtonProps) => {
  const [activeButton, setActiveButton] = useState<string>('default');

  const clickDefaultButton = () => {
    setFilteredProjects([...projects]);
    setActiveButton('default');
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
    setActiveButton('latest');
  };

  const clickTeamButton = () => {
    const teamProjects = [...projects].filter((project) => project.projectType === 'team');
    setFilteredProjects(teamProjects);
    setActiveButton('team');
  };

  const clickPersonalButton = () => {
    const personalProjects = [...projects].filter((project) => project.projectType === 'personal');
    setFilteredProjects(personalProjects);
    setActiveButton('personal');
  };

  return (
    <div className="filtered-buttons-container">
      <button
        className={`default-button ${activeButton === 'default' ? 'active' : ''}`}
        type="button"
        onClick={clickDefaultButton}>
        기본순
      </button>
      <button
        className={`latest-button ${activeButton === 'latest' ? 'active' : ''}`}
        type="button"
        onClick={clickLatestButton}>
        최신순
      </button>
      <button
        className={`team-button ${activeButton === 'team' ? 'active' : ''}`}
        type="button"
        onClick={clickTeamButton}>
        팀 프로젝트
      </button>
      <button
        className={`personal-button ${activeButton === 'personal' ? 'active' : ''}`}
        type="button"
        onClick={clickPersonalButton}>
        개인 프로젝트
      </button>
    </div>
  );
};

export default FilteringButton;
