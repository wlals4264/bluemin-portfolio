'use client';

import '@/styles/components/FilteringButton.scss';

import { ProjectCardData } from '@/mocks/projects';

import { useState } from 'react';

interface FilteringButtonProps {
  setFilteredProjects: (projects: ProjectCardData[]) => void;
  projects: ProjectCardData[];
}

function sortByLatest(list: ProjectCardData[]) {
  return [...list].sort((a, b) => {
    const getStartDate = (dateStr: string) => {
      const startDate = dateStr.split('~')[0].trim().replace(/\./g, '-');
      return new Date(startDate).getTime();
    };
    return getStartDate(b.date) - getStartDate(a.date);
  });
}

export function getLatestProjects(projects: ProjectCardData[]) {
  return sortByLatest(projects);
}

const FilteringButton = ({ projects, setFilteredProjects }: FilteringButtonProps) => {
  const [activeButton, setActiveButton] = useState<string>('all');

  const showAll = () => {
    setFilteredProjects(sortByLatest(projects));
    setActiveButton('all');
  };

  const filterByType = (type: 'company' | 'team' | 'personal') => {
    setFilteredProjects(sortByLatest(projects.filter((project) => project.projectType === type)));
    setActiveButton(type);
  };

  return (
    <div className="filtered-buttons-container">
      <button
        className={`all-button ${activeButton === 'all' ? 'active' : ''}`}
        type="button"
        onClick={showAll}>
        최신순
      </button>
      <button
        className={`company-button ${activeButton === 'company' ? 'active' : ''}`}
        type="button"
        onClick={() => filterByType('company')}>
        회사 프로젝트
      </button>
      <button
        className={`team-button ${activeButton === 'team' ? 'active' : ''}`}
        type="button"
        onClick={() => filterByType('team')}>
        팀 프로젝트
      </button>
      <button
        className={`personal-button ${activeButton === 'personal' ? 'active' : ''}`}
        type="button"
        onClick={() => filterByType('personal')}>
        개인 프로젝트
      </button>
    </div>
  );
};

export default FilteringButton;
