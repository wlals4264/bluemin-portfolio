'use client';

import '@/styles/components/FilteringButton.scss';

import GlassButton from '@/components/common/buttons/GlassButton';
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
      <GlassButton className="all-button" active={activeButton === 'all'} onClick={showAll}>
        최신순
      </GlassButton>
      <GlassButton
        className="company-button"
        active={activeButton === 'company'}
        onClick={() => filterByType('company')}>
        회사 프로젝트
      </GlassButton>
      <GlassButton
        className="team-button"
        active={activeButton === 'team'}
        onClick={() => filterByType('team')}>
        팀 프로젝트
      </GlassButton>
      <GlassButton
        className="personal-button"
        active={activeButton === 'personal'}
        onClick={() => filterByType('personal')}>
        개인 프로젝트
      </GlassButton>
    </div>
  );
};

export default FilteringButton;
